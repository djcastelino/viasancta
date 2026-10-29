import type { ChallengeGameState } from "@/src/types/scripture";
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
  const today = now.toISOString().split("T")[0];
  const yesterday = new Date(now.getTime() - 86400000)
    .toISOString()
    .split("T")[0];
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
