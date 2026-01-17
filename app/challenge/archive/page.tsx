'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HistoryEntry {
  date: string;
  challenge: {
    name: string;
    testament: string;
    role: string;
    difficulty: string;
  };
  won: boolean;
  guessCount: number;
  cluesUsed: number;
}

export default function ArchivePage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('challengeHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Sort by date descending (most recent first)
      parsed.sort((a: HistoryEntry, b: HistoryEntry) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setHistory(parsed);
    }
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

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
            📜 Challenge Archive
          </h1>
          <p className="text-gray-600 text-lg">
            Review your past daily challenges
          </p>
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No History Yet</h2>
            <p className="text-gray-600 mb-6">
              Complete your first daily challenge to see it here!
            </p>
            <Link
              href="/challenge"
              className="inline-block bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Play Today's Challenge
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((entry, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`text-4xl ${entry.won ? '' : 'opacity-50'}`}>
                    {entry.won ? '✅' : '❌'}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-[#6e3a6c]">
                        {entry.challenge.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getDifficultyColor(entry.challenge.difficulty)}`}>
                        {entry.challenge.difficulty}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3">
                      <strong>{entry.challenge.role}</strong> • {entry.challenge.testament} Testament
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        📅 {formatDate(entry.date)}
                      </span>
                      {entry.won && (
                        <span className="flex items-center gap-1">
                          🎯 {entry.guessCount} {entry.guessCount === 1 ? 'guess' : 'guesses'}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        💡 {entry.cluesUsed}/{6} clues
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {history.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#2C5F87] mb-4 text-center">
              Archive Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#D4AF37]">
                  {history.length}
                </div>
                <div className="text-xs text-gray-500">Total Played</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {history.filter(h => h.won).length}
                </div>
                <div className="text-xs text-gray-500">Won</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {history.filter(h => !h.won).length}
                </div>
                <div className="text-xs text-gray-500">Lost</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#6e3a6c]">
                  {history.length > 0
                    ? Math.round((history.filter(h => h.won).length / history.length) * 100)
                    : 0}%
                </div>
                <div className="text-xs text-gray-500">Win Rate</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
