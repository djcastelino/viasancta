'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HistoryEntry {
  date: string;
  challenge: {
    name: string;
    testament: string;
    difficulty: string;
  };
  won: boolean;
  guessCount: number;
  cluesUsed: number;
}

interface Stats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  winRate: number;
  avgGuesses: number;
  avgClues: number;
  perfectGames: number; // Won in 1 guess
  byDifficulty: {
    easy: { played: number; won: number };
    medium: { played: number; won: number };
    hard: { played: number; won: number };
  };
  guessDistribution: { [key: number]: number };
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    // Get current game state
    const gameState = JSON.parse(localStorage.getItem('scriptureChallenge') || '{}');

    // Get history
    const history: HistoryEntry[] = JSON.parse(localStorage.getItem('challengeHistory') || '[]');

    // Calculate stats
    const wonGames = history.filter(h => h.won);
    const byDifficulty = {
      easy: { played: 0, won: 0 },
      medium: { played: 0, won: 0 },
      hard: { played: 0, won: 0 }
    };

    history.forEach(h => {
      const diff = h.challenge.difficulty as 'easy' | 'medium' | 'hard';
      byDifficulty[diff].played++;
      if (h.won) byDifficulty[diff].won++;
    });

    // Calculate guess distribution
    const guessDistribution: { [key: number]: number } = {};
    wonGames.forEach(h => {
      guessDistribution[h.guessCount] = (guessDistribution[h.guessCount] || 0) + 1;
    });

    setStats({
      gamesPlayed: gameState.gamesPlayed || 0,
      gamesWon: gameState.gamesWon || 0,
      currentStreak: gameState.currentStreak || 0,
      maxStreak: gameState.maxStreak || 0,
      winRate: history.length > 0 ? (wonGames.length / history.length) * 100 : 0,
      avgGuesses: wonGames.length > 0
        ? wonGames.reduce((sum, h) => sum + h.guessCount, 0) / wonGames.length
        : 0,
      avgClues: history.length > 0
        ? history.reduce((sum, h) => sum + h.cluesUsed, 0) / history.length
        : 0,
      perfectGames: wonGames.filter(h => h.guessCount === 1).length,
      byDifficulty,
      guessDistribution
    });
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5] flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  const maxGuessCount = Math.max(...Object.values(stats.guessDistribution), 1);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5]">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-5 pt-8 pb-4">
        <Link href="/challenge" className="text-gray-600 hover:text-[#D4AF37] text-sm font-semibold">
          ← Back to Challenge
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-5 pb-16">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] bg-clip-text text-transparent font-serif">
            📊 Your Statistics
          </h1>
          <p className="text-gray-600 text-lg">
            Track your scripture knowledge progress
          </p>
        </div>

        {/* Main Stats */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#D4AF37]">{stats.gamesPlayed}</div>
              <div className="text-sm text-gray-500 mt-1">Played</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">{stats.winRate.toFixed(0)}%</div>
              <div className="text-sm text-gray-500 mt-1">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6e3a6c]">{stats.currentStreak}</div>
              <div className="text-sm text-gray-500 mt-1">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2C5F87]">{stats.maxStreak}</div>
              <div className="text-sm text-gray-500 mt-1">Best Streak</div>
            </div>
          </div>
        </div>

        {/* Guess Distribution */}
        {stats.gamesWon > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-[#2C5F87] mb-6 text-center">
              Guess Distribution
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map(guesses => {
                const count = stats.guessDistribution[guesses] || 0;
                const percentage = maxGuessCount > 0 ? (count / maxGuessCount) * 100 : 0;

                return (
                  <div key={guesses} className="flex items-center gap-3">
                    <div className="w-8 text-right font-semibold text-gray-700">
                      {guesses}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] h-full flex items-center justify-end px-3 text-white font-semibold transition-all duration-500"
                        style={{ width: `${Math.max(percentage, count > 0 ? 10 : 0)}%` }}
                      >
                        {count > 0 && count}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Performance by Difficulty */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#2C5F87] mb-6 text-center">
            Performance by Difficulty
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-3xl mb-2">😊</div>
              <div className="text-lg font-bold text-green-600 mb-1">Easy</div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.byDifficulty.easy.won}/{stats.byDifficulty.easy.played}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {stats.byDifficulty.easy.played > 0
                  ? `${Math.round((stats.byDifficulty.easy.won / stats.byDifficulty.easy.played) * 100)}%`
                  : '0%'}
              </div>
            </div>

            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-3xl mb-2">🤔</div>
              <div className="text-lg font-bold text-yellow-600 mb-1">Medium</div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.byDifficulty.medium.won}/{stats.byDifficulty.medium.played}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {stats.byDifficulty.medium.played > 0
                  ? `${Math.round((stats.byDifficulty.medium.won / stats.byDifficulty.medium.played) * 100)}%`
                  : '0%'}
              </div>
            </div>

            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-lg font-bold text-red-600 mb-1">Hard</div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.byDifficulty.hard.won}/{stats.byDifficulty.hard.played}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {stats.byDifficulty.hard.played > 0
                  ? `${Math.round((stats.byDifficulty.hard.won / stats.byDifficulty.hard.played) * 100)}%`
                  : '0%'}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-[#2C5F87] mb-6 text-center">
            More Stats
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37]">
                {stats.avgGuesses > 0 ? stats.avgGuesses.toFixed(1) : '0'}
              </div>
              <div className="text-sm text-gray-500 mt-1">Avg Guesses to Win</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#6e3a6c]">
                {stats.avgClues > 0 ? stats.avgClues.toFixed(1) : '0'}
              </div>
              <div className="text-sm text-gray-500 mt-1">Avg Clues Used</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.perfectGames}</div>
              <div className="text-sm text-gray-500 mt-1">Perfect Games (1 Guess)</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
