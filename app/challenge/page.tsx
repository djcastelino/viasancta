"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SCRIPTURE_CHALLENGES } from "@/src/scripture-challenges";
import type {
  ScriptureChallenge,
  ChallengeGameState,
} from "@/src/types/scripture";
import { dailyChallengeIndex, localDateKey, previousLocalDate, watchLocalDay } from "@/app/lib/localCalendar";
import { applyScriptureGuess, restoreScriptureDay } from "@/app/lib/challengeProgress";
import { useSacredAudio } from "@/app/lib/useSacredAudio";
import {
  ScriptureHeader,
  ScriptureFooter,
} from "@/app/components/ScriptureShell";
import {
  ArrowUpRight,
  LockKeyhole,
  Headphones,
  BarChart3,
  Archive,
  Check,
} from "lucide-react";

interface TriviaResponse {
  trivia: string;
}

export default function ChallengePage() {
  const [gameState, setGameState] = useState<ChallengeGameState | null>(null);
  const [guess, setGuess] = useState("");
  const [revealedClues, setRevealedClues] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [trivia, setTrivia] = useState<string>("");
  const [loadingTrivia, setLoadingTrivia] = useState(false);
  const audio = useSacredAudio();
  const { isPlaying: isPlayingAudio, isLoading: loadingAudio } = audio;
  const [withMusic, setWithMusic] = useState(false);
  const [triviaError, setTriviaError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [localToday, setLocalToday] = useState("");
  const reflectionRequest = useRef(0);
  const { stop: stopAudio } = audio;

  useEffect(() => watchLocalDay(setLocalToday), []);

  useEffect(() => {
    if (!localToday) return;
    let saved: ChallengeGameState | null = null;
    try {
      const raw = localStorage.getItem("scriptureChallenge");
      if (raw) saved = JSON.parse(raw);
    } catch { /* An unreadable save starts a fresh challenge. */ }
    const now = new Date();
    const target = SCRIPTURE_CHALLENGES[dailyChallengeIndex(SCRIPTURE_CHALLENGES.length, now)];
    const next = restoreScriptureDay(saved, target, now);
    reflectionRequest.current++;
    stopAudio();
    setGameState(next);
    setRevealedClues(next.cluesRevealed);
    setShowAnswer(next.isComplete);
    setGuess("");
    setSuggestions([]);
    setShowSuggestions(false);
    setTrivia("");
    setTriviaError("");
    setLoadingTrivia(false);
    localStorage.setItem("scriptureChallenge", JSON.stringify(next));
  }, [localToday, stopAudio]);

  const submitGuess = (answer: string) => {
    if (!gameState || !answer.trim() || gameState.isComplete) return;
    const next = applyScriptureGuess(gameState, answer, revealedClues);
    setGameState(next);
    setRevealedClues(next.cluesRevealed);
    localStorage.setItem("scriptureChallenge", JSON.stringify(next));
    if (next.isComplete) {
      setShowAnswer(true);
      saveToHistory(
        next.targetChallenge!,
        next.isWon,
        next.guesses.length,
        revealedClues,
      );
    }
    setGuess("");
    setSuggestions([]);
    setShowSuggestions(false);
  };
  const handleGuess = () => submitGuess(guess);

  const handleSkip = () => {
    if (!gameState || revealedClues >= 6 || gameState.isComplete) return;

    const newRevealed = revealedClues + 1;
    setRevealedClues(newRevealed);

    const updatedState = {
      ...gameState,
      cluesRevealed: newRevealed,
    };
    setGameState(updatedState);
    localStorage.setItem("scriptureChallenge", JSON.stringify(updatedState));
  };

  // Get autocomplete suggestions based on input
  const handleInputChange = (value: string) => {
    setGuess(value);

    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Get all unique challenge names
    const allNames = Array.from(
      new Set(SCRIPTURE_CHALLENGES.map((c) => c.name)),
    );

    // Filter names that contain the input (case-insensitive)
    const input = value.toLowerCase();
    const matches = allNames
      .filter((name) => name.toLowerCase().includes(input))
      .slice(0, 5); // Limit to 5 suggestions

    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const selectSuggestion = (suggestion: string) => submitGuess(suggestion);

  const saveToHistory = (
    challenge: ScriptureChallenge,
    won: boolean,
    guessCount: number,
    cluesUsed: number,
  ) => {
    // Use the challenge's date, not today's date
    // This ensures if user completes yesterday's challenge today, it saves with yesterday's date
    const challengeDate =
      gameState?.challengeDate || localDateKey();
    const history = JSON.parse(
      localStorage.getItem("challengeHistory") || "[]",
    );

    console.log("💾 Saving to history:", {
      challengeDate,
      challengeName: challenge.name,
      won,
      guessCount,
      cluesUsed,
    });

    // Don't add duplicate for same challenge date
    if (history.some((h: { date: string }) => h.date === challengeDate)) {
      console.log(
        "⚠️ History entry already exists for this challenge date, skipping",
      );
      return;
    }

    history.push({
      date: challengeDate,
      challenge,
      won,
      guessCount,
      cluesUsed,
    });

    localStorage.setItem("challengeHistory", JSON.stringify(history));
    console.log("✅ Saved to history successfully");
  };

  const fetchTriviaAndPlay = async () => {
    if (!gameState?.targetChallenge) return;

    // If trivia already loaded, just play it
    if (trivia) {
      playTrivia(trivia);
      return;
    }

    setTriviaError("");
    setLoadingTrivia(true);
    const requestId = ++reflectionRequest.current;
    try {
      const response = await fetch("/api/challenge-trivia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge: gameState.targetChallenge }),
      });

      if (!response.ok) {
        const problem = await response.json().catch(() => ({}));
        throw new Error(
          problem.error || "This reflection could not load. Please try again.",
        );
      }
      const data: TriviaResponse = await response.json();
      if (requestId !== reflectionRequest.current) return;
      const fetchedTrivia = data.trivia;
      console.log("✅ Trivia fetched:", fetchedTrivia);
      setTrivia(fetchedTrivia);
      setLoadingTrivia(false);

      // Auto-play the audio immediately with the fetched trivia
      if (requestId === reflectionRequest.current) playTrivia(fetchedTrivia);
    } catch (error) {
      if (requestId !== reflectionRequest.current) return;
      console.error("Failed to fetch trivia:", error);
      setTriviaError(
        error instanceof Error ? error.message : "Please try again.",
      );
      setLoadingTrivia(false);
    }
  };

  const playTrivia = (text?: string) => {
    if (isPlayingAudio || loadingAudio) {
      audio.stop();
      return;
    }
    const script = text || trivia;
    if (script)
      void audio.play(
        script,
        "en-US-AndrewMultilingualNeural",
        0.95,
        withMusic,
      );
  };

  const handleShare = async () => {
    const result = gameState?.isWon
      ? `✅ ${gameState.guesses.length} ${gameState.guesses.length === 1 ? "guess" : "guesses"}`
      : "❌";

    const text = `Daily Scripture Challenge\n${result}\n🔴${"🟠🟡🔵🟢🟣".slice(0, Math.min(revealedClues - 1, 5) * 2)}\n\ndivinepilgrim.com/challenge`;

    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // User cancelled or error - copy to clipboard instead
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  const handleGiveUp = () => {
    if (!gameState || gameState.isComplete) return;

    const today = gameState.challengeDate || localDateKey();

    const updatedState: ChallengeGameState = {
      ...gameState,
      isComplete: true,
      isWon: false,
      gamesPlayed: gameState.gamesPlayed + 1,
      currentStreak: 0,
      lastPlayedDate: today, // Update lastPlayedDate when completing
    };

    setGameState(updatedState);
    setShowAnswer(true);
    localStorage.setItem("scriptureChallenge", JSON.stringify(updatedState));

    // Save to history
    saveToHistory(
      gameState.targetChallenge!,
      false,
      gameState.guesses.length,
      revealedClues,
    );
  };

  const loadYesterdaysChallenge = () => {
    audio.stop();
    const yesterday = previousLocalDate();
    const yesterdayDate = localDateKey(yesterday);
    reflectionRequest.current++;
    const yesterdaysChallenge = SCRIPTURE_CHALLENGES[dailyChallengeIndex(SCRIPTURE_CHALLENGES.length, yesterday)];

    // Reset game state with yesterday's challenge
    const newState: ChallengeGameState = {
      targetChallenge: yesterdaysChallenge,
      guesses: [],
      isComplete: false,
      isWon: false,
      currentStreak: gameState?.currentStreak || 0,
      maxStreak: gameState?.maxStreak || 0,
      gamesPlayed: gameState?.gamesPlayed || 0,
      gamesWon: gameState?.gamesWon || 0,
      lastPlayedDate: gameState?.lastPlayedDate || yesterdayDate,
      challengeDate: yesterdayDate, // Set to yesterday's date
      cluesRevealed: 1,
    };

    setGameState(newState);
    setRevealedClues(1);
    setShowAnswer(false);
    setGuess("");
    setTrivia("");

    console.log("📅 Loaded yesterday's challenge:", yesterdaysChallenge.name);
  };

  if (!gameState)
    return (
      <main className="scripture-shell">
        <div className="scripture-container scripture-loading" role="status">
          Opening today’s Scripture…
        </div>
      </main>
    );
  const challenge = gameState.targetChallenge!;
  return (
    <main className="scripture-shell">
      <div className="scripture-container">
        <ScriptureHeader
          active="challenge"
          eyebrow="A DAILY DISCOVERY IN SACRED SCRIPTURE"
          title="Let the Word"
          emphasis="surprise you."
          description="Six clues. A person, event, or miracle. Follow each hint and discover a little more of Scripture."
        />
        <p className="scripture-reset-note">A new challenge every day at midnight in your device’s local time.</p>
        <div className="scripture-challenge-toolbar">
          <p className="pilgrim-eyebrow">
            {gameState.challengeDate === localDateKey()
              ? "TODAY’S EDITION"
              : "YESTERDAY’S EDITION"}{" "}
            /{" "}
            {showAnswer
              ? "CHAPTER COMPLETE"
              : `${revealedClues} OF 6 CLUES OPEN`}
          </p>
          <div>
            <Link href="/challenge/stats">
              <BarChart3 size={15} /> Your record
            </Link>
            <Link href="/challenge/archive">
              <Archive size={15} /> Past discoveries
            </Link>
          </div>
        </div>
        <div className="scripture-stats-strip">
          {[
            [gameState.currentStreak, "CURRENT STREAK"],
            [gameState.maxStreak, "BEST STREAK"],
            [gameState.gamesPlayed, "PLAYED"],
            [gameState.gamesWon, "DISCOVERED"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="scripture-challenge-grid">
          <section
            className="scripture-clue-board"
            aria-labelledby="clue-title"
          >
            <p className="pilgrim-eyebrow">READ BETWEEN THE LINES</p>
            <h2 id="clue-title">
              Every clue,
              <br />
              <em>a little closer.</em>
            </h2>
            <ol>
              {challenge.clues.map((clue, index) => (
                <li
                  key={index}
                  className={
                    index < revealedClues || showAnswer
                      ? "is-revealed"
                      : "is-locked"
                  }
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>
                    {index < revealedClues || showAnswer ? (
                      clue
                    ) : (
                      <>
                        <LockKeyhole size={13} /> A new clue awaits your next
                        step.
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ol>
          </section>
          <aside className="scripture-answer-panel">
            <p className="pilgrim-eyebrow">A MOMENT OF DISCOVERY</p>
            <h2>
              {showAnswer ? (
                <>
                  {gameState.isWon ? "You found" : "A story"}
                  <br />
                  <em>{gameState.isWon ? "the story." : "to remember."}</em>
                </>
              ) : (
                <>
                  Who or what
                  <br />
                  <em>could it be?</em>
                </>
              )}
            </h2>
            <div
              className="scripture-clue-dots"
              aria-label={`${revealedClues} clues revealed`}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className={i < revealedClues ? "is-open" : ""} />
              ))}
            </div>
            {!showAnswer ? (
              <>
                <p className="scripture-current-clue">
                  <span>LATEST CLUE</span>
                  {challenge.clues[revealedClues - 1]}
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleGuess();
                  }}
                >
                  <label htmlFor="scripture-guess">Your answer</label>
                  <div className="scripture-suggestion-wrap">
                    <input
                      ref={inputRef}
                      id="scripture-guess"
                      role="combobox"
                      value={guess}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onBlur={() =>
                        setTimeout(() => setShowSuggestions(false), 200)
                      }
                      placeholder="A person, event, or miracle…"
                      autoComplete="off"
                      aria-autocomplete="list"
                      aria-expanded={showSuggestions && suggestions.length > 0}
                      aria-controls={
                        showSuggestions ? "scripture-suggestions" : undefined
                      }
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div
                        id="scripture-suggestions"
                        className="scripture-suggestions"
                        aria-label="Suggested answers"
                      >
                        {suggestions.map((suggestion) => (
                          <button
                            type="button"
                            key={suggestion}
                            onClick={() => selectSuggestion(suggestion)}
                          >
                            {suggestion}
                            <ArrowUpRight size={14} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    className="scripture-button scripture-button-gold"
                    type="submit"
                    disabled={!guess.trim()}
                  >
                    Make a discovery <ArrowUpRight size={17} />
                  </button>
                </form>
                {revealedClues < 6 && (
                  <button className="scripture-skip" onClick={handleSkip}>
                    Not quite sure? Reveal the next clue →
                  </button>
                )}
                {revealedClues >= 3 && !gameState.isComplete && (
                  <button className="scripture-skip" onClick={handleGiveUp}>
                    Reveal the answer
                  </button>
                )}
              </>
            ) : (
              <div className="scripture-found">
                <p className="pilgrim-eyebrow">
                  {gameState.isWon ? "YOUR DISCOVERY" : "THE ANSWER"}
                </p>
                <h3>{challenge.name}</h3>
                <p>{challenge.role}</p>
                {gameState.isWon && (
                  <p>
                    <Check size={15} /> Found in {gameState.guesses.length}{" "}
                    {gameState.guesses.length === 1 ? "guess" : "guesses"}.
                  </p>
                )}
                <button
                  className="scripture-button scripture-button-gold"
                  onClick={handleShare}
                >
                  Share your discovery <ArrowUpRight size={17} />
                </button>
              </div>
            )}
            {gameState.guesses.length > 0 && (
              <div className="scripture-guess-history">
                <p className="pilgrim-eyebrow">YOUR STEPS ALONG THE WAY</p>
                {gameState.guesses.map((g, i) => (
                  <div key={i}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <p>{g}</p>
                    <span>
                      {g.trim().toLowerCase() === challenge.name.toLowerCase()
                        ? "FOUND"
                        : "NOT YET"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
        {showAnswer && (
          <section className="scripture-reflection">
            <div>
              <p className="pilgrim-eyebrow">BEYOND THE ANSWER</p>
              <h2>
                There is always
                <br />
                <em>more to discover.</em>
              </h2>
              <p>{challenge.famousFor}</p>
              <dl>
                <div>
                  <dt>TESTAMENT</dt>
                  <dd>{challenge.testament}</dd>
                </div>
                <div>
                  <dt>FIND THE STORY</dt>
                  <dd>{challenge.books.join(", ")}</dd>
                </div>
              </dl>
            </div>
            <div className="scripture-reflection-audio">
              <Headphones size={30} strokeWidth={1} />
              <h3>
                A little more
                <br />
                <em>understanding.</em>
              </h3>
              <p>Listen to a short reflection on {challenge.name}.</p>
              {trivia && (
                <details>
                  <summary>Read the reflection</summary>
                  <p>{trivia}</p>
                </details>
              )}
              <button
                className="scripture-button scripture-button-plum"
                disabled={loadingTrivia}
                onClick={
                  isPlayingAudio || loadingAudio
                    ? audio.stop
                    : () => fetchTriviaAndPlay()
                }
              >
                {loadingTrivia
                  ? "Finding the story…"
                  : loadingAudio
                    ? "Cancel audio"
                    : isPlayingAudio
                      ? "Stop reflection"
                      : "Listen to the reflection"}
                <ArrowUpRight size={17} />
              </button>
              <label className="scripture-music">
                <input
                  type="checkbox"
                  checked={withMusic}
                  disabled={isPlayingAudio || loadingAudio}
                  onChange={(e) => setWithMusic(e.target.checked)}
                />{" "}
                Quiet background music <span>OPTIONAL</span>
              </label>
              {(triviaError || audio.error) && (
                <p className="scripture-error" role="alert">
                  {triviaError || audio.error}
                </p>
              )}
            </div>
          </section>
        )}
        <div className="scripture-next-note">
          <p>
            Faith grows one discovery at a time.{" "}
            <em>Return tomorrow for another.</em>
          </p>
          {gameState.challengeDate ===
            localDateKey() && (
            <button onClick={loadYesterdaysChallenge}>
              Explore yesterday’s challenge <ArrowUpRight size={15} />
            </button>
          )}
        </div>
        <ScriptureFooter />
      </div>
    </main>
  );
}
