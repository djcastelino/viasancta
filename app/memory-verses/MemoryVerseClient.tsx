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

type Phase = 'phase1_read' | 'phase2_type' | 'phase3_first_letters' | 'phase4_round1' | 'phase4_round2' | 'phase4_round3' | 'phase5_mastery' | 'phase6_reference';

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
      setCoachResponse(data.coachResponse);

      // Check if phase should advance (simple check - Llama should guide this)
      // You might want to parse Llama's response to detect phase advancement

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

            {/* User Input (Phases 2-6) */}
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
                    {isLoading ? 'Checking...' : '✓ Submit'}
                  </button>
                  <button
                    onClick={nextVerse}
                    disabled={currentDay >= 77}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
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
                  setCurrentPhase('phase2_type');
                  setCoachResponse('');
                  startLearning();
                }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Next: Start Typing →
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
