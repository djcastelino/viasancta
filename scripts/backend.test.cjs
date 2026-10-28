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

test('all six migrated endpoints preserve their response fields and supplied context', async () => {
  process.env.GROQ_API_KEY = 'test-key';
  const examples = [
    ['promise-narration', { promise: { verse: 'Seek me with all your heart.', reference: 'Jeremiah 29:13' } }, 'script'],
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
      assert.match(JSON.parse(options.body).messages[1].content, new RegExp(Object.values(body)[0]?.reference || Object.values(body)[0]?.name || Object.values(body)[0]?.title || 'SUPPLIED DATA'));
      return completion('A complete narration.');
    };
    const response = await load(`app/api/${endpoint}/route.ts`).POST(request(body));
    assert.equal(response.status, 200, endpoint);
    assert.equal((await response.json())[field], 'A complete narration.', endpoint);
  }
});
test('all narration endpoints reject missing input rather than return fake success', async () => {
  for (const endpoint of ['promise-narration', 'challenge-trivia', 'jesus-ot-reflection', 'marian-apparition-narration', 'memory-verse-coach', 'narration']) {
    const result = await load(`app/api/${endpoint}/route.ts`).POST(request({}));
    assert.equal(result.status, 400, endpoint);
  }
});
test('JSON parsing and payload size failures are 400 and 413', async () => {
  await assert.rejects(ai.readInput(new NextRequest('http://localhost', { method: 'POST', body: '{' })), error => error.status === 400);
  await assert.rejects(ai.readInput(request({ text: 'x'.repeat(65000) })), error => error.status === 413);
});
test('configuration errors are actionable and upstream secrets are not reflected', async () => {
  delete process.env.GROQ_API_KEY;
  const post = load('app/api/promise-narration/route.ts').POST;
  const body = { promise: { verse: 'Jesus wept.', reference: 'John 11:35' } };
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
