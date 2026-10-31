const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { NextRequest } = require('next/server');
const root = path.resolve(__dirname, '..');
const cache = new Map();
// Compile the actual route modules with the project's TypeScript compiler.
// Resolve app aliases here so these contract tests run without a live provider.
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const module = { exports: {} };
  const localRequire = name => {
    if (name.startsWith('@/')) {
      const target = name.slice(2);
      return target.endsWith('.json') ? JSON.parse(fs.readFileSync(path.join(root, target), 'utf8')) : load(target + '.ts');
    }
    if (name === './ai') return load('app/lib/ai.ts');
    return require(name);
  };
  new Function('require', 'module', 'exports', compiled)(localRequire, module, module.exports);
  cache.set(file, module.exports);
  return module.exports;
}
const ai = load('app/lib/ai.ts');
const speech = load('app/lib/speech.ts');
const originalFetch = global.fetch;
const originalEnv = { ...process.env };
afterEach(() => {
  global.fetch = originalFetch;
  for (const key of ['GROQ_API_KEY', 'AZURE_SPEECH_KEY', 'AZURE_SPEECH_REGION']) {
    if (originalEnv[key] === undefined) delete process.env[key]; else process.env[key] = originalEnv[key];
  }
});
const completion = content => Response.json({ choices: [{ finish_reason: 'stop', message: { content } }] });
const request = body => new NextRequest('http://localhost/api/test', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });

test('generated narration endpoints preserve their response fields and supplied context', async () => {
  process.env.GROQ_API_KEY = 'test-key';
  const examples = [
    ['challenge-trivia', { challenge: { name: 'Moses', books: ['Exodus'] } }, 'trivia'],
    ['jesus-ot-reflection', { entry: { title: 'The first promise', otReference: 'Genesis 3:15' } }, 'reflectionText'],
    ['marian-apparition-narration', { apparition: { name: 'Our Lady of Lourdes' } }, 'narrationText'],
    ['memory-verse-coach', { verse: 'Jesus wept.', reference: 'John 11:35', currentPhase: 'phase1_read' }, 'coachResponse'],
    ['narration', { tourType: 'Eucharistic Miracles', stopData: { name: 'Lanciano' } }, 'narration'],
  ];
  for (const [endpoint, body, field] of examples) {
    global.fetch = async (url, options) => {
      assert.equal(url, 'https://api.groq.com/openai/v1/chat/completions');
      assert.equal(options.headers.Authorization, 'Bearer test-key');
      const payload = JSON.parse(options.body);
      assert.equal(payload.model, 'qwen/qwen3.8-27b');
      assert.equal(payload.reasoning_effort, 'none');
      assert.equal(payload.reasoning_format, 'hidden');
      assert.match(JSON.parse(options.body).messages[1].content, new RegExp(Object.values(body)[0]?.reference || Object.values(body)[0]?.name || Object.values(body)[0]?.title || 'SUPPLIED DATA'));
      return completion('A complete narration.');
    };
    const response = await load(`app/api/${endpoint}/route.ts`).POST(request(body));
    assert.equal(response.status, 200, endpoint);
    assert.equal((await response.json())[field], 'A complete narration.', endpoint);
  }
});
test('all narration endpoints reject missing input rather than return fake success', async () => {
  for (const endpoint of ['challenge-trivia', 'jesus-ot-reflection', 'marian-apparition-narration', 'memory-verse-coach', 'narration']) {
    const result = await load(`app/api/${endpoint}/route.ts`).POST(request({}));
    assert.equal(result.status, 400, endpoint);
  }
});
test('Marian narration rejects the removed Amsterdam entry and ignores stale client claims', async () => {
  process.env.GROQ_API_KEY = 'test-key';
  const post = load('app/api/marian-apparition-narration/route.ts').POST;
  let calls = 0;
  global.fetch = async (url, options) => {
    calls++;
    const prompt = JSON.parse(options.body).messages[1].content;
    assert.match(prompt, /does not declare the alleged apparitions supernatural/);
    assert.doesNotMatch(prompt, /final verdict pending|client fabricated approval/);
    return completion('A complete narration.');
  };
  assert.equal((await post(request({ apparition: { id: 18, name: 'Our Lady of All Nations' } }))).status, 404);
  assert.equal((await post(request({ apparition: { name: 'Our Lady of All Nations' } }))).status, 404);
  assert.equal(calls, 0);
  assert.equal((await post(request({ apparition: { id: 20, name: 'Our Lady of Medjugorje', churchApproval: 'client fabricated approval', story: 'final verdict pending' } }))).status, 200);
  assert.equal(calls, 1);
});
test('JSON parsing and payload size failures are 400 and 413', async () => {
  await assert.rejects(ai.readInput(new NextRequest('http://localhost', { method: 'POST', body: '{' })), error => error.status === 400);
  await assert.rejects(ai.readInput(request({ text: 'x'.repeat(65000) })), error => error.status === 413);
});
test('configuration errors are actionable and upstream secrets are not reflected', async () => {
  delete process.env.GROQ_API_KEY;
  const post = load('app/api/challenge-trivia/route.ts').POST;
  const body = { challenge: { name: 'Moses' } };
  assert.equal((await post(request(body))).status, 503);
  process.env.GROQ_API_KEY = 'test-key';
  global.fetch = async () => new Response('upstream private details', { status: 401 });
  const result = await post(request(body));
  assert.equal(result.status, 503);
  assert.doesNotMatch(await result.text(), /upstream private details|test-key/);
});
test('AI rejects truncated, empty and rate-limited responses', async () => {
  process.env.GROQ_API_KEY = 'test-key';
  global.fetch = async () => new Response('', { status: 429 });
  await assert.rejects(ai.generateText('system', 'user'), error => error.status === 429);
  global.fetch = async () => completion('');
  await assert.rejects(ai.generateText('system', 'user'), /empty/);
  global.fetch = async () => Response.json({ choices: [{ finish_reason: 'length', message: { content: 'cut off' } }] });
  await assert.rejects(ai.generateText('system', 'user'), /incomplete/);
});
test('speech escapes SSML, preserves voice and rate, and returns audio bytes', async () => {
  process.env.AZURE_SPEECH_KEY = 'test-key'; process.env.AZURE_SPEECH_REGION = 'eastus';
  global.fetch = async (url, options) => {
    assert.match(url, /^https:\/\/eastus\.tts\.speech\.microsoft\.com/);
    assert.match(options.body, /A &amp; B &lt;test&gt;/);
    assert.match(options.body, /rate="0.95"/);
    assert.match(options.body, /en-US-AndrewMultilingualNeural/);
    return new Response(new Uint8Array([73, 68, 51]));
  };
  const response = await load('app/api/generate-audio/route.ts').POST(request({ text: 'A & B <test>', voice: 'en-US-AndrewMultilingualNeural', rate: 0.95 }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'audio/mpeg');
  assert.equal(Buffer.from(await response.arrayBuffer()).toString(), 'ID3');
});
test('speech validates voice/rate and rejects empty audio and missing credentials', async () => {
  const post = load('app/api/generate-audio/route.ts').POST;
  assert.equal((await post(request({ text: 'Hi', voice: 'en-US-AndrewNeural', rate: 0 }))).status, 400);
  delete process.env.AZURE_SPEECH_KEY;
  await assert.rejects(speech.synthesize('Hi', 'en-US-AndrewNeural'), error => error.status === 503);
  process.env.AZURE_SPEECH_KEY = 'test-key'; process.env.AZURE_SPEECH_REGION = 'eastus';
  await assert.rejects(speech.synthesize('Hi', '<bad>'), error => error.status === 400);
  global.fetch = async () => new Response(new Uint8Array());
  await assert.rejects(speech.synthesize('Hi', 'en-US-AndrewNeural'), /empty audio/);
});

test('scripture guesses preserve the next clue on reload and count completion once', () => {
  const { applyScriptureGuess } = load('app/lib/challengeProgress.ts');
  const initial = { targetChallenge: { name: 'Balaam' }, guesses: [], isComplete: false, isWon: false, cluesRevealed: 1,
    currentStreak: 3, maxStreak: 4, gamesPlayed: 5, gamesWon: 4, lastPlayedDate: '2026-10-27', challengeDate: '2026-10-28' };
  const now = new Date('2026-10-28T15:00:00Z');
  const wrong = JSON.parse(JSON.stringify(applyScriptureGuess(initial, 'Moses', 1, now)));
  assert.equal(wrong.cluesRevealed, 2); assert.equal(wrong.currentStreak, 3); assert.equal(initial.guesses.length, 0);
  const won = applyScriptureGuess(wrong, ' balaam ', wrong.cluesRevealed, now);
  assert.equal(won.gamesPlayed, 6); assert.equal(won.gamesWon, 5); assert.equal(won.currentStreak, 4);
  assert.equal(applyScriptureGuess(won, 'Balaam', 2, now), won);
  const lost = applyScriptureGuess(wrong, 'Moses', 6, now);
  assert.equal(lost.isComplete, true); assert.equal(lost.currentStreak, 0);
});

// Exercise playback lifecycle without speakers or a live provider.
function audioHookHarness(createSpeechBlob) {
  const cleanups = [];
  const react = { useCallback: fn => fn, useRef: value => ({ current: value }), useState: value => [value, () => {}],
    useEffect: effect => { cleanups.push(effect()); } };
  const source = fs.readFileSync(path.join(root, 'app/lib/useSacredAudio.ts'), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', compiled)(name => name === 'react' ? react : { createSpeechBlob }, module, module.exports);
  return { hook: module.exports.useSacredAudio(), unmount: () => cleanups.forEach(cleanup => cleanup()) };
}

test('Scripture audio cancels pending generation when stopped or unmounted', async () => {
  const originalAudio = global.Audio;
  let created = 0;
  global.Audio = class { constructor() { created++; } };
  try {
    for (const unmount of [false, true]) {
      let finish;
      const h = audioHookHarness(() => new Promise(resolve => { finish = resolve; }));
      const pending = h.hook.play('A reflection', 'en-US-GuyNeural');
      unmount ? h.unmount() : h.hook.stop();
      finish(new Blob(['audio'])); await pending;
    }
    assert.equal(created, 0);
  } finally { global.Audio = originalAudio; }
});

test('Scripture background music waits for speech playback and stops with it', async () => {
  const originalAudio = global.Audio;
  const tracks = [];
  let startSpeech;
  global.Audio = class {
    constructor(src) { this.src = src; this.paused = true; tracks.push(this); }
    play() { this.paused = false; return tracks.length === 1 ? new Promise(resolve => { startSpeech = resolve; }) : Promise.resolve(); }
    pause() { this.paused = true; }
  };
  try {
    const h = audioHookHarness(async () => new Blob(['audio']));
    const pending = h.hook.play('Reflection', 'en-US-GuyNeural', 1, true);
    await Promise.resolve();
    assert.equal(tracks.length, 1);
    startSpeech(); await pending;
    assert.equal(tracks.length, 2); assert.equal(tracks[1].volume, .12);
    h.hook.stop(); assert.ok(tracks.every(track => track.paused));
    h.unmount();
  } finally { global.Audio = originalAudio; }
});

test('daily challenge follows local midnight across timezones and DST', () => {
  const {localDateKey, dailyChallengeIndex, previousLocalDate, millisecondsUntilLocalMidnight} = load('app/lib/localCalendar.ts');
  const previousTZ = process.env.TZ;
  try {
    for (const tz of ['America/New_York', 'America/Los_Angeles', 'Asia/Kolkata', 'Pacific/Auckland']) {
      process.env.TZ = tz;
      const before = new Date(2026, 9, 28, 23, 59, 59);
      const after = new Date(2026, 9, 29, 0, 0, 0);
      assert.equal(localDateKey(before), '2026-10-28', tz);
      assert.equal(localDateKey(after), '2026-10-29', tz);
      assert.equal(dailyChallengeIndex(1000, after), dailyChallengeIndex(1000, before) + 1, tz);
      assert.equal(millisecondsUntilLocalMidnight(before), 1000, tz);
      assert.equal(localDateKey(previousLocalDate(after)), '2026-10-28', tz);
      for (const [month, day] of [[2,8], [10,1]]) {
        assert.equal(dailyChallengeIndex(1000,new Date(2026,month,day,0)),dailyChallengeIndex(1000,new Date(2026,month,day,23)),tz);
      }
      assert.equal(dailyChallengeIndex(1000,new Date(2027,0,1)),1,tz);
    }
    process.env.TZ='America/New_York';
    assert.equal(millisecondsUntilLocalMidnight(new Date(2026,2,8)),23*3600000);
    assert.equal(millisecondsUntilLocalMidnight(new Date(2026,10,1)),25*3600000);
  } finally { if(previousTZ===undefined) delete process.env.TZ; else process.env.TZ=previousTZ; }
});

test('local-day restore keeps progress, migrates UTC labels and resets stale puzzles without erasing totals', () => {
  const {restoreScriptureDay} = load('app/lib/challengeProgress.ts');
  const target={id:2,name:'David'};
  const now=new Date(2026,9,29,0,10);
  const saved={targetChallenge:target,guesses:['Moses'],cluesRevealed:2,isComplete:false,isWon:false,currentStreak:3,maxStreak:5,gamesPlayed:8,gamesWon:7,lastPlayedDate:'2026-10-28',challengeDate:'2026-10-29'};
  const restored=restoreScriptureDay(saved,target,now);
  assert.equal(restored.cluesRevealed,2);assert.deepEqual(restored.guesses,['Moses']);assert.equal(restored.calendarVersion,2);
  assert.equal(restoreScriptureDay({...saved,challengeDate:'2026-10-30'},target,now).challengeDate,'2026-10-29');
  const reset=restoreScriptureDay({...saved,targetChallenge:{id:1,name:'Moses'}},target,now);
  assert.deepEqual(reset.guesses,[]);assert.equal(reset.cluesRevealed,1);assert.equal(reset.gamesPlayed,8);assert.equal(reset.currentStreak,3);
  const old=restoreScriptureDay({...saved,challengeDate:'2026-08-01'},target,now);
  assert.deepEqual(old.guesses,[]);
});

test('day watcher refreshes an open or resumed page and removes timers/listeners', () => {
  const {watchLocalDay,localDateKey}=load('app/lib/localCalendar.ts');
  const originals={Date:global.Date,setTimeout:global.setTimeout,clearTimeout:global.clearTimeout,setInterval:global.setInterval,clearInterval:global.clearInterval,window:global.window,document:global.document};
  const RealDate=global.Date; let now=new RealDate(2026,9,28,23,59,59).getTime(); let id=0;
  const timeouts=new Map(),intervals=new Map(),listeners=new Map(),seen=[];
  try {
    global.Date=class extends RealDate {constructor(...args){super(...(args.length?args:[now]));}};
    global.setTimeout=(fn,ms)=>{const key=++id;timeouts.set(key,{fn,ms});return key;};global.clearTimeout=key=>timeouts.delete(key);
    global.setInterval=fn=>{const key=++id;intervals.set(key,fn);return key;};global.clearInterval=key=>intervals.delete(key);
    const events={addEventListener:(name,fn)=>listeners.set(name,fn),removeEventListener:name=>listeners.delete(name)};
    global.window=events;global.document={...events,visibilityState:'visible'};
    const cleanup=watchLocalDay(key=>seen.push(key));
    assert.equal(seen.at(-1),'2026-10-28');
    const timer=[...timeouts.values()][0];assert.equal(timer.ms,1050);
    now=new RealDate(2026,9,29,0,0,0,50).getTime();timer.fn();assert.equal(seen.at(-1),'2026-10-29');
    now=new RealDate(2026,9,30,8).getTime();listeners.get('focus')();assert.equal(seen.at(-1),'2026-10-30');
    cleanup();assert.equal(timeouts.size,0);assert.equal(intervals.size,0);assert.equal(listeners.size,0);
    assert.equal(localDateKey(new RealDate(now)),'2026-10-30');
  } finally {Object.assign(global,originals);}
});

// Keep the legacy endpoint safe for visitors with an older page open.
test('Today’s Promise reads only canonical Scripture without calling an AI provider', async () => {
  delete process.env.GROQ_API_KEY;
  global.fetch = async () => { throw new Error('No provider call expected'); };
  const promise = require('../src/daily-promises.json')[0];
  const post = load('app/api/promise-narration/route.ts').POST;
  for (const input of [{ id: promise.id, verse: 'Injected reflection', reference: 'Wrong reference' }, { verse: promise.verse, reference: promise.reference }]) {
    const response = await post(request({ promise: input }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { script: `${promise.verse} ${promise.reference}.` });
  }
  assert.equal((await post(request({ promise: { id: -1, verse: 'Unlisted verse', reference: 'Unknown' } }))).status, 404);
});

test('paused sections stay out of public navigation while core collections remain visible', () => {
  const visibility = load('app/lib/sectionVisibility.ts');
  assert.equal(visibility.showTodaysPromise, false);
  for (const path of ['/tours/eucharistic-miracles', '/tours/marian-apparitions', '/stations-of-the-cross', '/biblical-timeline', '/jesus-in-ot', '/memory-verses']) {
    assert.equal(visibility.isSectionVisible(path), false);
    assert.equal(visibility.isSectionVisible(path + '/archive'), false);
  }
  for (const path of ['/sacred-architecture', '/sacred-mountains', '/challenge', '/challenge/archive', '/challenge/stats']) {
    assert.equal(visibility.isSectionVisible(path), true);
  }
});

test('discovery JSON has valid coordinates, canonical links and public-domain photo records', () => {
 const places = require('../public/sacred-atlas.json');
 const photos = require('../public/discovery-photos.json');
 const guides = require('../public/architecture-guides.json');
 const churches = require('../public/sacred-architecture.json');
 const mountains = require('../public/sacred-mountains.json');
 const ids = new Set(places.map(p => p.id));
 assert.equal(ids.size, places.length);
 for (const p of places) {
   assert.ok(p.lat >= -90 && p.lat <= 90 && p.lng >= -180 && p.lng <= 180);
   assert.ok((p.kind === 'architecture' ? churches : mountains).some(record => record.id === p.recordId));
   if (p.image.startsWith('/')) assert.ok(fs.existsSync(path.join(root, 'public', p.image)));
 }
 for (const photo of photos) {
   assert.ok(ids.has(photo.placeId));
   assert.ok(['CC0', 'Public domain'].includes(photo.rights));
   assert.ok(photo.author && photo.sourceUrl.startsWith('https://commons.wikimedia.org/wiki/File:'));
   assert.ok(fs.existsSync(path.join(root, 'public', photo.src)));
 }
 for (const guide of guides) {
   assert.ok(ids.has(guide.placeId));
   assert.ok(photos.some(photo => photo.id === guide.photoId));
   assert.ok(guide.source.url.startsWith('https://'));
 }
});
