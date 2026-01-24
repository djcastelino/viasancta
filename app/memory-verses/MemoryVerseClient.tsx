'use client';

import { useState, useEffect, useRef } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

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
  currentPhase: string;
  phaseRound: number;
}

interface MemoryVerseClientProps {
  verses: MemoryVerse[];
}

type Phase = 'phase1_read' | 'phase2_type' | 'phase3_round1' | 'phase3_round2' | 'phase3_round3' | 'phase3_round4' | 'phase4_master' | 'phase5_reference';

export default function MemoryVerseClient({ verses }: MemoryVerseClientProps) {
  const [currentDay, setCurrentDay] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [coachResponse, setCoachResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<MemoryProgress[]>([]);
  const [currentPhase, setCurrentPhase] = useState<Phase>('phase1_read');
  const [phaseRound, setPhaseRound] = useState(1);
  const [showStats, setShowStats] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Get verses that need review
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

  // Play audio with Azure TTS
  const playAudio = async () => {
    setIsPlayingAudio(true);

    try {
      const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!speechKey || !speechRegion) {
        alert('Azure Speech credentials not configured');
        setIsPlayingAudio(false);
        return;
      }

      const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
      speechConfig.speechSynthesisVoiceName = 'en-US-ChristopherNeural';
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="en-US-ChristopherNeural">
          <prosody rate="0.85">
            ${todaysVerse.verse}
          </prosody>
        </voice>
      </speak>`;

      synthesizer.speakSsmlAsync(
        ssml,
        result => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            const audioBlob = new Blob([result.audioData], { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = new Audio(audioUrl);
            audioRef.current = audioElement;

            audioElement.play();
            audioElement.onended = () => {
              setIsPlayingAudio(false);
            };
          } else {
            console.error('Speech synthesis failed:', result.errorDetails);
            setIsPlayingAudio(false);
          }
          synthesizer.close();
        },
        error => {
          console.error('Error:', error);
          setIsPlayingAudio(false);
          synthesizer.close();
        }
      );
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlayingAudio(false);
    }
  };

  // Stop audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  // Initial coaching prompt
  const startLearning = async () => {
    setIsLoading(true);
    setUserInput('');
    setCurrentPhase('phase1_read');
    setPhaseRound(1);

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
          currentPhase: 'phase1_read',
          phaseRound: 1,
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

  // Generate blanked verse based on phase
  const getBlankedVerse = (phase: Phase): string => {
    const words = todaysVerse.verse.split(' ');

    switch (phase) {
      case 'phase3_round1': // Hide every 3rd word
        return words.map((word, i) => (i + 1) % 3 === 0 ? '___' : word).join(' ');

      case 'phase3_round2': // Hide every 2nd word
        return words.map((word, i) => (i + 1) % 2 === 0 ? '___' : word).join(' ');

      case 'phase3_round3': // First letters only
        return words.map(word => {
          const firstLetter = word[0];
          const underscores = '_'.repeat(Math.max(1, word.length - 1));
          return firstLetter + underscores;
        }).join(' ');

      case 'phase3_round4': // Completely blank
      case 'phase4_master':
        return '___________________________';

      default:
        return todaysVerse.verse;
    }
  };

  // Get next phase
  const getNextPhase = (): Phase | null => {
    switch (currentPhase) {
      case 'phase1_read': return 'phase2_type';
      case 'phase2_type': return 'phase3_round1';
      case 'phase3_round1': return 'phase3_round2';
      case 'phase3_round2': return 'phase3_round3';
      case 'phase3_round3': return 'phase3_round4';
      case 'phase3_round4': return 'phase4_master';
      case 'phase4_master': return 'phase5_reference';
      case 'phase5_reference': return null; // Done, move to next verse
      default: return null;
    }
  };

  // Advance to next phase
  const advancePhase = async (nextPhase: Phase) => {
    setIsLoading(true);
    setUserInput('');
    setCurrentPhase(nextPhase);

    const blankedVerse = getBlankedVerse(nextPhase);

    try {
      const response = await fetch('/api/memory-verse-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verse: todaysVerse.verse,
          blankedVerse: blankedVerse,
          reference: todaysVerse.reference,
          testament: todaysVerse.testament,
          category: todaysVerse.category,
          difficulty: todaysVerse.difficulty,
          bibleTranslation: todaysVerse.bibleTranslation,
          totalVersesMemorized: totalMemorized,
          totalReferencesMemorized: totalReferencesMemorized,
          currentPhase: nextPhase,
          phaseRound: phaseRound,
          attemptNumber: 1,
          userTypedText: '',
          previousVersesToReview: getVersesNeedingReview(),
          isFirstVerse: false,
          hasCompletedReviewToday: false,
          userMessage: 'Ready for next phase!',
        }),
      });

      const data = await response.json();
      setCoachResponse(data.coachResponse);
    } catch (error) {
      console.error('Error advancing phase:', error);
      setCoachResponse('Error advancing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit user's typed verse
  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);

    const blankedVerse = getBlankedVerse(currentPhase);

    try {
      const response = await fetch('/api/memory-verse-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verse: todaysVerse.verse,
          blankedVerse: blankedVerse,
          reference: todaysVerse.reference,
          testament: todaysVerse.testament,
          category: todaysVerse.category,
          difficulty: todaysVerse.difficulty,
          bibleTranslation: todaysVerse.bibleTranslation,
          totalVersesMemorized: totalMemorized,
          totalReferencesMemorized: totalReferencesMemorized,
          currentPhase: currentPhase,
          phaseRound: phaseRound,
          attemptNumber: progress.find(p => p.verseId === currentDay)?.attemptCount || 1,
          userTypedText: userInput,
          previousVersesToReview: getVersesNeedingReview(),
          isFirstVerse: false,
          hasCompletedReviewToday: false,
          userMessage: 'Here is what I typed',
        }),
      });

      const data = await response.json();
      const responseText = data.coachResponse;
      setCoachResponse(responseText);

      // Auto-advance if AI says correct and suggests next phase
      const correctKeywords = ['✓', 'correct', 'perfect', 'moving to', 'let\'s move', 'proceed to', 'ready for', 'mastered', 'great job'];
      const isCorrect = correctKeywords.some(keyword => responseText.toLowerCase().includes(keyword.toLowerCase()));

      if (isCorrect) {
        // Auto-advance to next phase after a brief delay
        setTimeout(() => {
          const next = getNextPhase();
          if (next) {
            setCurrentPhase(next);
            setCoachResponse('');
            // Immediately fetch next phase instructions
            advancePhase(next);
          } else if (currentPhase === 'phase5_reference') {
            // Phase 5 complete - show completion message
            setCoachResponse('🎉 Verse and reference MASTERED! Click "Skip →" to move to the next verse.');
          }
        }, 1500); // 1.5 second delay to let user see validation
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
      setCurrentPhase('phase1_read');
      setPhaseRound(1);
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
            <div className="flex gap-2">
              {coachResponse && (
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                  {currentPhase === 'phase1_read' && '📖 Phase 1: Read'}
                  {currentPhase === 'phase2_type' && '✍️ Phase 2: Type'}
                  {currentPhase === 'phase3_round1' && '🧠 Phase 3-1'}
                  {currentPhase === 'phase3_round2' && '🧠 Phase 3-2'}
                  {currentPhase === 'phase3_round3' && '🧠 Phase 3-3'}
                  {currentPhase === 'phase3_round4' && '🧠 Phase 3-4'}
                  {currentPhase === 'phase4_master' && '🏆 Phase 4: Master'}
                  {currentPhase === 'phase5_reference' && '💎 Phase 5: Bonus'}
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                todaysVerse.difficulty === 'short' ? 'bg-green-100 text-green-700' :
                todaysVerse.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {todaysVerse.difficulty}
              </span>
            </div>
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

            {/* Blanked Verse Display (Phase 3 & 4) */}
            {(currentPhase.startsWith('phase3_') || currentPhase === 'phase4_master') && (
              <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-semibold mb-2">Hints:</p>
                <p className="text-xl text-gray-800 leading-relaxed font-mono">
                  {getBlankedVerse(currentPhase)}
                </p>
              </div>
            )}

            {/* Full Verse Display (Phase 2) */}
            {currentPhase === 'phase2_type' && (
              <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-semibold mb-2">Type this:</p>
                <p className="text-xl text-gray-800 leading-relaxed">
                  {todaysVerse.verse}
                </p>
              </div>
            )}

            {/* Audio Player (Phase 1) */}
            {currentPhase === 'phase1_read' && (
              <div className="flex gap-3">
                <button
                  onClick={isPlayingAudio ? stopAudio : playAudio}
                  disabled={isPlayingAudio && audioRef.current !== null}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPlayingAudio ? '⏸️ Stop Audio' : '🔊 Play Audio'}
                </button>
              </div>
            )}

            {/* User Input (Phases 2-5) */}
            {currentPhase !== 'phase1_read' && (
              <>
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
                    {isLoading ? 'Checking...' : '✓ Submit Answer'}
                  </button>

                  {/* Skip to Next Verse button */}
                  <button
                    onClick={nextVerse}
                    disabled={currentDay >= 77 || isLoading}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 whitespace-nowrap"
                  >
                    Skip →
                  </button>
                </div>
              </>
            )}

            {/* Next button for Phase 1 */}
            {currentPhase === 'phase1_read' && (
              <button
                onClick={() => {
                  const next = getNextPhase();
                  if (next) advancePhase(next);
                }}
                disabled={isLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Next: Start Typing →'}
              </button>
            )}
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
