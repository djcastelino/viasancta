'use client';

import { useState, useEffect } from 'react';

interface MemoryVerse {
  id: number;
  verse: string;
  reference: string;
  testament: string;
  category: string;
  difficulty: string;
  bibleTranslation: string;
}

interface MemoryProgress {
  verseId: number;
  verseMemorized: boolean;
  referenceMemorized: boolean;
  lastReviewedDate: string;
  nextReviewDate: string;
  attemptCount: number;
}

interface MemoryVerseClientProps {
  verses: MemoryVerse[];
}

export default function MemoryVerseClient({ verses }: MemoryVerseClientProps) {
  const [currentDay, setCurrentDay] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [coachResponse, setCoachResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<MemoryProgress[]>([]);
  const [currentPhase, setCurrentPhase] = useState<'learn' | 'practice' | 'review'>('learn');
  const [showStats, setShowStats] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('memoryVerseProgress');
    const savedDay = localStorage.getItem('memoryVerseCurrentDay');

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedDay) {
      setCurrentDay(parseInt(savedDay));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: MemoryProgress[]) => {
    setProgress(newProgress);
    localStorage.setItem('memoryVerseProgress', JSON.stringify(newProgress));
  };

  const saveCurrentDay = (day: number) => {
    setCurrentDay(day);
    localStorage.setItem('memoryVerseCurrentDay', day.toString());
  };

  // Get today's verse
  const todaysVerse = verses.find(v => v.id === currentDay) || verses[0];

  // Calculate statistics
  const totalMemorized = progress.filter(p => p.verseMemorized).length;
  const totalReferencesMemorized = progress.filter(p => p.referenceMemorized).length;

  // Get verses that need review (memorized more than 1 day ago)
  const getVersesNeedingReview = () => {
    const today = new Date().toISOString().split('T')[0];
    return progress
      .filter(p => p.verseMemorized && p.nextReviewDate <= today)
      .map(p => {
        const verse = verses.find(v => v.id === p.verseId);
        if (!verse) return null;

        const daysSinceMemorized = Math.floor(
          (new Date().getTime() - new Date(p.lastReviewedDate).getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
          reference: verse.reference,
          verse: verse.verse,
          daysSinceMemorized,
          needsReview: true,
        };
      })
      .filter(Boolean);
  };

  // Initial coaching prompt
  const startLearning = async () => {
    setIsLoading(true);
    setUserInput('');

    try {
      const response = await fetch('/api/memory-verse-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verse: todaysVerse.verse,
          reference: todaysVerse.reference,
          testament: todaysVerse.testament,
          category: todaysVerse.category,
          difficulty: todaysVerse.difficulty,
          bibleTranslation: todaysVerse.bibleTranslation,
          totalVersesMemorized: totalMemorized,
          totalReferencesMemorized: totalReferencesMemorized,
          currentPhase: 'learn',
          attemptNumber: 1,
          userTypedText: '',
          previousVersesToReview: getVersesNeedingReview(),
          isFirstVerse: currentDay === 1 && totalMemorized === 0,
          hasCompletedReviewToday: false,
          userMessage: 'Ready to learn today\'s verse!',
        }),
      });

      const data = await response.json();
      setCoachResponse(data.coachResponse);
    } catch (error) {
      console.error('Error starting learning:', error);
      setCoachResponse('Error connecting to coach. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit user's typed verse
  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/memory-verse-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verse: todaysVerse.verse,
          reference: todaysVerse.reference,
          testament: todaysVerse.testament,
          category: todaysVerse.category,
          difficulty: todaysVerse.difficulty,
          bibleTranslation: todaysVerse.bibleTranslation,
          totalVersesMemorized: totalMemorized,
          totalReferencesMemorized: totalReferencesMemorized,
          currentPhase: currentPhase,
          attemptNumber: progress.find(p => p.verseId === currentDay)?.attemptCount || 1,
          userTypedText: userInput,
          previousVersesToReview: getVersesNeedingReview(),
          isFirstVerse: false,
          hasCompletedReviewToday: false,
          userMessage: 'Here is what I typed',
        }),
      });

      const data = await response.json();
      setCoachResponse(data.coachResponse);

      // Check if verse is correct (simple check - should be more sophisticated)
      if (userInput.toLowerCase().trim() === todaysVerse.verse.toLowerCase().trim()) {
        // Mark as memorized
        const existingProgress = progress.find(p => p.verseId === currentDay);
        const today = new Date().toISOString().split('T')[0];
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + 7); // Review in 7 days

        if (existingProgress) {
          const updatedProgress = progress.map(p =>
            p.verseId === currentDay
              ? { ...p, verseMemorized: true, lastReviewedDate: today, nextReviewDate: nextReview.toISOString().split('T')[0] }
              : p
          );
          saveProgress(updatedProgress);
        } else {
          saveProgress([
            ...progress,
            {
              verseId: currentDay,
              verseMemorized: true,
              referenceMemorized: false,
              lastReviewedDate: today,
              nextReviewDate: nextReview.toISOString().split('T')[0],
              attemptCount: 1,
            },
          ]);
        }
      }

      setUserInput('');
    } catch (error) {
      console.error('Error submitting verse:', error);
      setCoachResponse('Error submitting. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Move to next verse
  const nextVerse = () => {
    if (currentDay < 77) {
      saveCurrentDay(currentDay + 1);
      setCoachResponse('');
      setUserInput('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Stats */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Day {currentDay} of 77</h3>
          <button
            onClick={() => setShowStats(!showStats)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>

        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-3xl font-bold">{totalMemorized}</div>
              <div className="text-sm text-amber-100">Verses Memorized</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-3xl font-bold">{totalReferencesMemorized}</div>
              <div className="text-sm text-amber-100">References Mastered</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-3xl font-bold">{Math.round((totalMemorized / 77) * 100)}%</div>
              <div className="text-sm text-amber-100">Progress</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-3xl font-bold">{getVersesNeedingReview().length}</div>
              <div className="text-sm text-amber-100">Need Review</div>
            </div>
          </div>
        )}
      </div>

      {/* Today's Verse Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">Today's Verse</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              todaysVerse.difficulty === 'short' ? 'bg-green-100 text-green-700' :
              todaysVerse.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {todaysVerse.difficulty}
            </span>
          </div>
          <p className="text-2xl text-gray-700 mb-2 leading-relaxed">
            "{todaysVerse.verse}"
          </p>
          <p className="text-lg text-amber-600 font-semibold">
            {todaysVerse.reference} ({todaysVerse.bibleTranslation})
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Category: {todaysVerse.category} • {todaysVerse.testament === 'OT' ? 'Old Testament' : 'New Testament'}
          </p>
        </div>

        {!coachResponse ? (
          <button
            onClick={startLearning}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Loading Coach...' : '🎯 Start Learning'}
          </button>
        ) : (
          <div className="space-y-4">
            {/* Coach Response */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <p className="text-gray-800 whitespace-pre-line">{coachResponse}</p>
            </div>

            {/* User Input */}
            <div>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your answer here..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !userInput.trim()}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
              >
                {isLoading ? 'Checking...' : '✓ Submit'}
              </button>
              <button
                onClick={nextVerse}
                disabled={currentDay >= 77}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
              >
                Next Verse →
              </button>
            </div>

            {/* Hint Button */}
            <button
              onClick={() => setCoachResponse(coachResponse + `\n\n💡 Hint: The verse starts with "${todaysVerse.verse.split(' ').slice(0, 3).join(' ')}..."`)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition text-sm"
            >
              💡 Need a hint?
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      {currentDay > 1 && (
        <div className="flex justify-center">
          <button
            onClick={() => saveCurrentDay(currentDay - 1)}
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-6 rounded-lg shadow transition"
          >
            ← Previous Verse
          </button>
        </div>
      )}
    </div>
  );
}
