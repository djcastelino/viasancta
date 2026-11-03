import { SCRIPTURE_CHALLENGES } from '@/src/scripture-challenges';
import type { ScriptureChallenge, ChallengeGameState } from '@/src/types/scripture';
import { dailyChallengeIndex, localDateKey } from '@/app/lib/localCalendar';

const DAY = 86400000;
// A continuous cycle avoids repeating/skipping a puzzle at New Year or DST.
const START = Date.UTC(2026, 10, 3);
const LEVELS = ['easy', 'medium', 'hard'] as const;

function tieBreak(challenge: ScriptureChallenge) {
  let value = 2166136261;
  for (const char of `scripture-mix-v1:${challenge.id}:${challenge.name}`) {
    value = Math.imul(value ^ char.charCodeAt(0), 16777619);
  }
  return value >>> 0;
}

/** Use every existing question once, fairly interleaving the unequal level pools. */
export function buildScriptureRotation(bank: readonly ScriptureChallenge[]) {
  const pools = LEVELS.map(level => bank.filter(c => c.difficulty === level));
  const totals = pools.map(pool => pool.length);
  const used = LEVELS.map(() => 0);
  const testamentTotals = pools.map(pool => ({
    Old: pool.filter(c => c.testament === 'Old').length,
    New: pool.filter(c => c.testament === 'New').length,
  }));
  const testamentUsed = LEVELS.map(() => ({ Old: 0, New: 0 }));
  const result: ScriptureChallenge[] = [];
  while (result.length < bank.length) {
    const position = result.length;
    const previous = result.at(-1)?.difficulty;
    let available = LEVELS.map((_, i) => i).filter(i => pools[i].length && LEVELS[i] !== previous);
    if (!available.length) available = LEVELS.map((_, i) => i).filter(i => pools[i].length);
    // Keep enough separators for the remaining questions, including the next level.
    const feasible = available.filter(i => {
      const remaining = pools.map((pool, j) => pool.length - Number(i === j));
      const slots = bank.length - position - 1;
      return remaining.every((count, j) => count <= (j === i ? Math.floor(slots / 2) : Math.ceil(slots / 2))) &&
        (slots !== 0 || LEVELS[i] !== result[0]?.difficulty);
    });
    if (feasible.length) available = feasible;
    available.sort((a, b) => ((position + 1) * totals[b] / bank.length - used[b]) -
      ((position + 1) * totals[a] / bank.length - used[a]));
    const level = position === 0 && pools[0].length ? 0 : available[0];
    const recent = result.slice(-7).reverse();
    const penalty = (candidate: ScriptureChallenge) => recent.reduce((sum, prior, index) => {
      const duplicateAnswer = prior.name.toLowerCase() === candidate.name.toLowerCase();
      const sharedBooks = prior.books.filter(book => candidate.books.includes(book)).length;
      return sum + (duplicateAnswer ? 10000 : 0) + sharedBooks * (index === 0 ? 100 : 8 - index);
    }, 0);
    const deficit = (c: ScriptureChallenge) => (used[level] + 1) *
      testamentTotals[level][c.testament] / totals[level] - testamentUsed[level][c.testament];
    pools[level].sort((a, b) => deficit(b) - deficit(a) || penalty(a) - penalty(b) || tieBreak(a) - tieBreak(b));
    const selected = pools[level].shift()!;
    result.push(selected);
    used[level]++;
    testamentUsed[level][selected.testament]++;
  }
  // Repair any remaining three-day book runs (including the cycle boundary)
  // by swapping questions of the same difficulty. This keeps the level mix intact.
  const at = (i: number) => result[(i + result.length) % result.length];
  const repeatedBook = (i: number) => at(i).books.some(book =>
    at(i - 1).books.includes(book) && at(i - 2).books.includes(book));
  for (let pass = 0; pass < result.length; pass++) {
    const conflicts = result.map((_, i) => i).filter(repeatedBook);
    if (!conflicts.length) break;
    let repaired = false;
    for (const conflict of conflicts) {
      for (const offset of [0, -1, -2]) {
        const a = (conflict + offset + result.length) % result.length;
        for (let b = 0; b < result.length; b++) {
          if (a === b || result[a].difficulty !== result[b].difficulty) continue;
          const affected = [...new Set([a, a + 1, a + 2, b, b + 1, b + 2].map(i => i % result.length))];
          const before = affected.filter(repeatedBook).length;
          [result[a], result[b]] = [result[b], result[a]];
          if (affected.filter(repeatedBook).length < before) { repaired = true; break; }
          [result[a], result[b]] = [result[b], result[a]];
        }
        if (repaired) break;
      }
      if (repaired) break;
    }
    if (!repaired) break;
  }
  return result;
}


export const SCRIPTURE_ROTATION = buildScriptureRotation(SCRIPTURE_CHALLENGES);

export function scriptureChallengeForDate(date = new Date(), saved?: ChallengeGameState | null) {
  // A deployment must not replace a puzzle someone has already started today.
  if (saved?.challengeDate === localDateKey(date) && saved.targetChallenge &&
      (saved.isComplete || (saved.guesses?.length ?? 0) > 0 || (saved.cluesRevealed ?? 1) > 1)) {
    const started = SCRIPTURE_CHALLENGES.find(c => c.id === saved.targetChallenge!.id);
    if (started) return started;
  }
  const elapsed = Math.round((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - START) / DAY);
  // Past archives retain the question that was actually scheduled before this change.
  if (elapsed < 0) return SCRIPTURE_CHALLENGES[dailyChallengeIndex(SCRIPTURE_CHALLENGES.length, date)];
  return SCRIPTURE_ROTATION[elapsed % SCRIPTURE_ROTATION.length];
}
