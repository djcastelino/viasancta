import type { ChallengeGameState } from "@/src/types/scripture";
import { localDateKey, previousLocalDate } from "@/app/lib/localCalendar";
export function applyScriptureGuess(
  state: ChallengeGameState,
  answer: string,
  clues: number,
  now = new Date(),
) {
  if (state.isComplete || !state.targetChallenge || !answer.trim())
    return state;
  const isWon =
    answer.trim().toLowerCase() === state.targetChallenge.name.toLowerCase();
  const isComplete = isWon || clues >= 6;
  const today = state.challengeDate || localDateKey(now);
  const [year, month, day] = today.split("-").map(Number);
  const yesterday = localDateKey(previousLocalDate(new Date(year, month - 1, day, 12)));
  const streak = isWon
    ? state.lastPlayedDate === yesterday
      ? state.currentStreak + 1
      : 1
    : isComplete
      ? 0
      : state.currentStreak;
  return {
    ...state,
    guesses: [...state.guesses, answer.trim()],
    isWon,
    isComplete,
    cluesRevealed: !isComplete && clues < 6 ? clues + 1 : clues,
    gamesPlayed: state.gamesPlayed + (isComplete ? 1 : 0),
    gamesWon: state.gamesWon + (isWon ? 1 : 0),
    currentStreak: streak,
    maxStreak: Math.max(state.maxStreak, streak),
    lastPlayedDate: isComplete ? today : state.lastPlayedDate,
  };
}

export function restoreScriptureDay(
  saved: ChallengeGameState | null,
  targetChallenge: NonNullable<ChallengeGameState["targetChallenge"]>,
  now = new Date(),
): ChallengeGameState {
  const today = localDateKey(now);
  const legacyDate = saved?.challengeDate || saved?.lastPlayedDate;
  const legacyIsAdjacent = !!legacyDate && Math.abs(
    Date.parse(`${legacyDate}T12:00:00`) - new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12).getTime(),
  ) < 2 * 86400000;
  // Preserve nearby same-puzzle progress when migrating the former UTC labels.
  if (saved?.targetChallenge?.id === targetChallenge.id &&
      (saved.challengeDate === today || (saved.calendarVersion !== 2 && legacyIsAdjacent))) {
    return { ...saved, challengeDate: today, calendarVersion: 2 };
  }
  const yesterday = localDateKey(previousLocalDate(now));
  return {
    targetChallenge, guesses: [], isComplete: false, isWon: false,
    currentStreak: saved && [today, yesterday].includes(saved.lastPlayedDate) ? saved.currentStreak : 0,
    maxStreak: saved?.maxStreak || 0, gamesPlayed: saved?.gamesPlayed || 0,
    gamesWon: saved?.gamesWon || 0, lastPlayedDate: saved?.lastPlayedDate || "",
    challengeDate: today, cluesRevealed: 1, calendarVersion: 2,
  };
}
