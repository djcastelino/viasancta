'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SCRIPTURE_CHALLENGES } from '@/src/scripture-challenges';
import type { ScriptureChallenge, ChallengeGameState } from '@/src/types/scripture';

export default function ChallengePage() {
  const [gameState, setGameState] = useState<ChallengeGameState | null>(null);
  const [guess, setGuess] = useState('');
  const [revealedClues, setRevealedClues] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);

  // Get today's challenge based on date
  const getTodaysChallenge = (): ScriptureChallenge => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % SCRIPTURE_CHALLENGES.length;
    return SCRIPTURE_CHALLENGES[index];
  };

  // Initialize game state
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('scriptureChallenge');

    if (saved) {
      const savedState: ChallengeGameState = JSON.parse(saved);

      // Check if it's a new day
      if (savedState.lastPlayedDate !== today) {
        // New day - reset game
        const todaysChallenge = getTodaysChallenge();
        const newState: ChallengeGameState = {
          targetChallenge: todaysChallenge,
          guesses: [],
          isComplete: false,
          isWon: false,
          currentStreak: 0,
          maxStreak: savedState.maxStreak,
          gamesPlayed: savedState.gamesPlayed,
          gamesWon: savedState.gamesWon,
          lastPlayedDate: today,
          cluesRevealed: 1
        };
        setGameState(newState);
        localStorage.setItem('scriptureChallenge', JSON.stringify(newState));
      } else {
        // Same day - load saved state
        setGameState(savedState);
        setRevealedClues(savedState.cluesRevealed);
        if (savedState.isComplete) {
          setShowAnswer(true);
        }
      }
    } else {
      // First time playing
      const todaysChallenge = getTodaysChallenge();
      const newState: ChallengeGameState = {
        targetChallenge: todaysChallenge,
        guesses: [],
        isComplete: false,
        isWon: false,
        currentStreak: 0,
        maxStreak: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        lastPlayedDate: today,
        cluesRevealed: 1
      };
      setGameState(newState);
      localStorage.setItem('scriptureChallenge', JSON.stringify(newState));
    }
  }, []);

  const handleGuess = () => {
    if (!gameState || !guess.trim()) return;

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedAnswer = gameState.targetChallenge!.name.toLowerCase();

    const isCorrect = normalizedGuess === normalizedAnswer;

    const updatedState: ChallengeGameState = {
      ...gameState,
      guesses: [...gameState.guesses, guess],
      isComplete: isCorrect || revealedClues >= 6,
      isWon: isCorrect,
      gamesPlayed: isCorrect || revealedClues >= 6 ? gameState.gamesPlayed + 1 : gameState.gamesPlayed,
      gamesWon: isCorrect ? gameState.gamesWon + 1 : gameState.gamesWon,
      currentStreak: isCorrect ? gameState.currentStreak + 1 : 0,
      maxStreak: isCorrect ? Math.max(gameState.maxStreak, gameState.currentStreak + 1) : gameState.maxStreak,
      cluesRevealed: revealedClues
    };

    setGameState(updatedState);
    localStorage.setItem('scriptureChallenge', JSON.stringify(updatedState));

    if (isCorrect || revealedClues >= 6) {
      setShowAnswer(true);
    } else if (!isCorrect && revealedClues < 6) {
      setRevealedClues(prev => prev + 1);
      updatedState.cluesRevealed = revealedClues + 1;
      localStorage.setItem('scriptureChallenge', JSON.stringify(updatedState));
    }

    setGuess('');
  };

  const handleSkip = () => {
    if (!gameState || revealedClues >= 6) return;

    const newRevealed = revealedClues + 1;
    setRevealedClues(newRevealed);

    const updatedState = {
      ...gameState,
      cluesRevealed: newRevealed
    };
    setGameState(updatedState);
    localStorage.setItem('scriptureChallenge', JSON.stringify(updatedState));
  };

  const handleGiveUp = () => {
    if (!gameState) return;

    const updatedState: ChallengeGameState = {
      ...gameState,
      isComplete: true,
      isWon: false,
      gamesPlayed: gameState.gamesPlayed + 1,
      currentStreak: 0
    };

    setGameState(updatedState);
    setShowAnswer(true);
    localStorage.setItem('scriptureChallenge', JSON.stringify(updatedState));
  };

  if (!gameState) {
    return <div className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5] flex items-center justify-center">
      <div className="animate-spin text-4xl">⏳</div>
    </div>;
  }

  const challenge = gameState.targetChallenge!;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5]">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-5 pt-8 pb-4">
        <Link href="/" className="text-gray-600 hover:text-[#D4AF37] text-sm font-semibold">
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-5 pb-16">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] bg-clip-text text-transparent font-serif">
            📖 Daily Scripture Challenge
          </h1>
          <p className="text-gray-600 text-lg">
            Test your biblical knowledge! Can you guess who or what this is?
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-[#D4AF37]">{gameState.currentStreak}</div>
            <div className="text-xs text-gray-500">Current Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#D4AF37]">{gameState.maxStreak}</div>
            <div className="text-xs text-gray-500">Best Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#D4AF37]">{gameState.gamesPlayed}</div>
            <div className="text-xs text-gray-500">Games Played</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#D4AF37]">{gameState.gamesWon}</div>
            <div className="text-xs text-gray-500">Games Won</div>
          </div>
        </div>

        {/* Clues Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#2C5F87] mb-6 text-center">
            Clues {revealedClues}/6
          </h2>

          <div className="space-y-4">
            {challenge.clues.slice(0, revealedClues).map((clue, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 ${
                  index === 0 ? 'border-red-300 bg-red-50' :
                  index === 1 ? 'border-orange-300 bg-orange-50' :
                  index === 2 ? 'border-yellow-300 bg-yellow-50' :
                  index === 3 ? 'border-blue-300 bg-blue-50' :
                  index === 4 ? 'border-green-300 bg-green-50' :
                  'border-purple-300 bg-purple-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg font-bold">
                    {index === 0 ? '🔴' : index === 1 ? '🟠' : index === 2 ? '🟡' : index === 3 ? '🔵' : index === 4 ? '🟢' : '🟣'}
                  </span>
                  <p className="text-gray-800 flex-1">{clue}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Show Answer */}
          {showAnswer && (
            <div className="mt-8 p-6 bg-gradient-to-r from-[#6e3a6c]/10 to-[#8B4789]/10 rounded-2xl border-2 border-[#D4AF37]">
              <div className="text-center">
                <div className="text-3xl mb-2">
                  {gameState.isWon ? '🎉' : '📖'}
                </div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-2">
                  {gameState.isWon ? 'Correct!' : 'The Answer Was:'}
                </h3>
                <div className="text-4xl font-bold text-[#6e3a6c] mb-4">
                  {challenge.name}
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Testament:</strong> {challenge.testament}</p>
                  <p><strong>Role:</strong> {challenge.role}</p>
                  <p><strong>Famous For:</strong> {challenge.famousFor}</p>
                  <p><strong>Books:</strong> {challenge.books.join(', ')}</p>
                </div>
                {gameState.isWon && (
                  <div className="mt-4 text-lg font-semibold text-[#D4AF37]">
                    Solved in {gameState.guesses.length} {gameState.guesses.length === 1 ? 'guess' : 'guesses'}!
                  </div>
                )}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 italic">
                    Come back tomorrow for a new challenge! 🙏
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Guess Input (only if game not complete) */}
        {!showAnswer && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="space-y-4">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                placeholder="Type your guess..."
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg focus:outline-none focus:border-[#D4AF37]"
                disabled={gameState.isComplete}
              />

              <div className="flex gap-4">
                <button
                  onClick={handleGuess}
                  disabled={!guess.trim()}
                  className="flex-1 bg-[#D4AF37] hover:bg-[#c49d2f] disabled:bg-gray-300 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
                >
                  Submit Guess
                </button>

                {revealedClues < 6 && (
                  <button
                    onClick={handleSkip}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
                  >
                    Skip → Next Clue
                  </button>
                )}
              </div>

              {revealedClues >= 3 && !gameState.isComplete && (
                <button
                  onClick={handleGiveUp}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  Give Up & Show Answer
                </button>
              )}
            </div>

            {/* Previous Guesses */}
            {gameState.guesses.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Your Guesses:</h3>
                <div className="space-y-2">
                  {gameState.guesses.map((g, i) => (
                    <div key={i} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
                      {i + 1}. {g} ❌
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
