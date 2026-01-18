export interface ScriptureChallenge {
  id: number;
  name: string;
  testament: "Old" | "New";
  clues: string[];
  books: string[];
  role: string;
  famousFor: string;
  difficulty: "easy" | "medium" | "hard";
  imageUrl?: string; // Optional character portrait image
}

export interface ChallengeGameState {
  targetChallenge: ScriptureChallenge | null;
  guesses: string[];
  isComplete: boolean;
  isWon: boolean;
  currentStreak: number;
  maxStreak: number;
  gamesPlayed: number;
  gamesWon: number;
  lastPlayedDate: string; // Legacy field for backward compatibility
  challengeDate: string; // The date of the challenge being displayed (YYYY-MM-DD)
  cluesRevealed: number; // Track how many clues have been revealed
}

export interface ChallengeStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: { [key: number]: number }; // How many guesses it took to win
}

export interface ChallengeHistory {
  date: string;
  challenge: ScriptureChallenge;
  won: boolean;
  guessCount: number;
}
