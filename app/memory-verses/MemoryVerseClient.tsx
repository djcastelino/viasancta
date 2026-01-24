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

type Phase = 'phase1_read' | 'phase2_type' | 'phase3_round1' | 'phase3_round2' | 'phase3_round3' | 'phase3_round4' | 'phase5_reference';

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
  const [isPlayingCoachAudio, setIsPlayingCoachAudio] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewVerseId, setReviewVerseId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const coachAudioRef = useRef<HTMLAudioElement | null>(null);

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

  // Get today's verse (or review verse if in review mode)
  const displayVerseId = isReviewMode && reviewVerseId ? reviewVerseId : currentDay;
  const todaysVerse = verses.find(v => v.id === displayVerseId) || verses[0];

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

  // Play coach audio with Azure TTS
  const playCoachAudio = async (text: string) => {
    // Stop any existing coach audio
    if (coachAudioRef.current) {
      coachAudioRef.current.pause();
      coachAudioRef.current = null;
    }

    setIsPlayingCoachAudio(true);

    try {
      const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!speechKey || !speechRegion) {
        console.error('Azure Speech credentials not configured');
        setIsPlayingCoachAudio(false);
        return;
      }

      const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
      speechConfig.speechSynthesisVoiceName = 'en-US-GuyNeural'; // Different voice for coach
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

      // Clean text: remove emojis, phase indicators, and special formatting for better TTS
      let cleanText = text
        .replace(/[📖✍️🧠💎✓🎉📚🌙🌅📝🗣️⏰🏆]/g, '') // Remove emojis
        .replace(/PHASE \d+:\s*(READ IT|TYPE IT|MEMORIZE IT|MASTER IT|REFERENCE BONUS|Reference)/gi, '') // Remove old phase indicators
        .replace(/Phase \d+-\d+/gi, '') // Remove phase indicators like "Phase 3-1"
        .trim();

      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="en-US-GuyNeural">
          <prosody rate="0.95">
            ${cleanText}
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
            coachAudioRef.current = audioElement;

            audioElement.play();
            audioElement.onended = () => {
              setIsPlayingCoachAudio(false);
            };
          } else {
            console.error('Speech synthesis failed:', result.errorDetails);
            setIsPlayingCoachAudio(false);
          }
          synthesizer.close();
        },
        error => {
          console.error('Error:', error);
          setIsPlayingCoachAudio(false);
          synthesizer.close();
        }
      );
    } catch (error) {
      console.error('Error playing coach audio:', error);
      setIsPlayingCoachAudio(false);
    }
  };

  // Stop coach audio
  const stopCoachAudio = () => {
    if (coachAudioRef.current) {
      coachAudioRef.current.pause();
      coachAudioRef.current.currentTime = 0;
      coachAudioRef.current = null;
    }
    setIsPlayingCoachAudio(false);
  };

  // Generate context for Phase 1 based on verse reference and category
  const generateVerseContext = (reference: string, category: string, testament: string): string => {
    // Extract book name from reference
    const book = reference.split(' ')[0];
    const isPsalm = book === 'Psalms' || book === 'Psalm';

    // Generate appropriate context based on book and category
    const contexts: { [key: string]: string } = {
      'John 15:5': "Jesus teaches that we are completely dependent on Him for spiritual life and fruitfulness.",
      'Nehemiah 8:10': "This verse reminds us that true strength comes from the joy we find in God's presence.",
      'Hosea 4:6': "God's prophet warns that lacking knowledge of Him leads to spiritual destruction.",
      'Joshua 24:15': "Joshua's bold declaration of commitment challenges us to choose whom we will serve.",
      'Exodus 33:14': "God promises Moses His constant presence and the rest that comes from being with Him.",
      'Hebrews 13:8': "This verse from Hebrews reminds us of Christ's unchanging nature and eternal faithfulness.",
      'Psalms 119:105': "The psalmist beautifully describes how God's Word guides our steps through life.",
      '1 Peter 5:7': "Peter encourages us to cast all anxiety on God because He genuinely cares for us.",
      'Psalms 115:14': "A blessing prayer for God's abundance and increase on His people and their families.",
      'Philippians 4:13': "Paul's powerful declaration of strength and confidence through Christ in all circumstances.",
      'Psalms 37:4': "This psalm teaches that delighting in God aligns our desires with His perfect will.",
      'John 10:10': "Jesus declares His purpose: to give abundant, full life to all who follow Him.",
      'Isaiah 43:21': "God reveals the purpose for which He formed His people - to declare His praise.",
      'Zechariah 4:6': "The prophet reveals that true success comes through God's Spirit, not human strength.",
      'Psalms 3:3': "David expresses confidence in God as his protector and the one who lifts his head.",
      'Psalms 16:11': "The psalmist celebrates the complete joy found in God's presence.",
      'John 14:16': "Jesus promises the Holy Spirit who will be our constant Helper and companion.",
      'Nahum 1:7': "This verse from the prophet Nahum reveals God as our refuge in times of trouble.",
      '1 Peter 5:6': "Peter instructs believers to humble themselves so God can lift them up at the right time.",
      'Acts 20:35': "Paul quotes Jesus' teaching about the blessing that comes from giving generously.",
      'John 6:35': "Jesus declares Himself as the bread of life who satisfies our deepest spiritual hunger.",
      'Zechariah 2:5': "God promises to be a protective wall of fire around His people and to dwell among them.",
      '2 Corinthians 9:8': "Paul assures believers that God provides abundantly so we can give generously.",
      'Malachi 4:2': "The prophet promises God's healing power like the rising sun for those who obey Him.",
      'Zephaniah 3:17': "This beautiful verse describes how God delights in us and rejoices over us with singing.",
      'Hebrews 4:12': "This verse describes the living, active, and penetrating power of God's Word."
    };

    console.log('🔍 Context Lookup:', {
      lookingFor: reference,
      found: contexts[reference] ? 'YES' : 'NO',
      availableKeys: Object.keys(contexts),
      book: book,
      isPsalm: isPsalm
    });

    // Use specific context if available, otherwise generate generic one
    if (contexts[reference]) {
      return contexts[reference];
    }

    // Generic context based on testament and category
    const bookType = isPsalm ? 'psalm' : testament === 'OT' ? 'Old Testament passage' : 'New Testament passage';
    return `This ${bookType} teaches us about ${category.toLowerCase()} and God's character.`;
  };

  // Initial coaching prompt
  const startLearning = async (forceVerseId?: number) => {
    // Use forced verse ID (for post-review) or current day
    const targetVerseId = forceVerseId || currentDay;
    const targetVerse = verses.find(v => v.id === targetVerseId) || verses[0];

    // Check if we need to review yesterday's verse first (only if not forced)
    if (!forceVerseId && currentDay > 1 && !isReviewMode) {
      const yesterdayVerseId = currentDay - 1;
      const yesterdayProgress = progress.find(p => p.verseId === yesterdayVerseId);

      // If yesterday's verse was memorized, make them review it first
      if (yesterdayProgress?.verseMemorized) {
        setIsReviewMode(true);
        setReviewVerseId(yesterdayVerseId);
        setCurrentPhase('phase3_round4');
        setUserInput('');

        const yesterdayVerse = verses.find(v => v.id === yesterdayVerseId);
        if (yesterdayVerse) {
          const reviewMessage = `📖 REVIEW TIME!\n\nBefore learning today's verse, let's review yesterday's verse.\n\nType from memory: ${yesterdayVerse.reference}`;
          setCoachResponse(reviewMessage);
          // Auto-play review audio
          playCoachAudio(reviewMessage);
        }
        return;
      }
    }

    setUserInput('');
    setCurrentPhase('phase1_read');
    setPhaseRound(1);

    // Generate Phase 1 message client-side (more reliable than AI)
    const context = generateVerseContext(targetVerse.reference, targetVerse.category, targetVerse.testament);
    const phase1Message = `Phase 1. Read this verse aloud 3 times and click Play Audio. ${context}`;

    console.log('🔍 DEBUG Phase 1 Generation:', {
      targetVerseId,
      reference: targetVerse.reference,
      category: targetVerse.category,
      testament: targetVerse.testament,
      generatedContext: context,
      fullMessage: phase1Message
    });

    setCoachResponse(phase1Message);
    playCoachAudio(phase1Message);
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

      case 'phase3_round4': // Completely blank - final memory test
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
      case 'phase3_round4': return 'phase5_reference'; // Skip phase4, go straight to reference
      case 'phase5_reference': return null; // Done, move to next verse
      default: return null;
    }
  };

  // Get phase display name for validation messages
  const getPhaseDisplayName = (phase: Phase): string => {
    switch (phase) {
      case 'phase1_read': return 'Phase 1';
      case 'phase2_type': return 'Phase 2';
      case 'phase3_round1': return 'Phase 3 Round 1';
      case 'phase3_round2': return 'Phase 3 Round 2';
      case 'phase3_round3': return 'Phase 3 Round 3';
      case 'phase3_round4': return 'Phase 3 Round 4';
      case 'phase5_reference': return 'Phase 4';
      default: return 'next phase';
    }
  };

  // Client-side validation (more reliable than AI)
  const validateUserInput = (userText: string): { isCorrect: boolean; feedback: string } => {
    const cleanInput = userText.trim().toLowerCase().replace(/[.,!?;:"']/g, '');

    // For Phase 5, expect "reference - verse" format
    if (currentPhase === 'phase5_reference') {
      const expectedFull = `${todaysVerse.reference} - ${todaysVerse.verse}`;
      const cleanExpected = expectedFull.toLowerCase().replace(/[.,!?;:"']/g, '');

      if (cleanInput === cleanExpected) {
        const nextPhase = getNextPhase();
        const nextPhaseName = nextPhase ? getPhaseDisplayName(nextPhase) : 'completion';
        return {
          isCorrect: true,
          feedback: `Perfect! You've mastered the complete verse with reference!`
        };
      } else {
        return {
          isCorrect: false,
          feedback: `Almost! Remember to type BOTH the reference AND verse together.\n\nExpected format: "${todaysVerse.reference} - ${todaysVerse.verse}"\n\nYou typed: "${userText}"\n\nTry again!`
        };
      }
    }

    // For all other phases, validate verse text only
    const cleanVerse = todaysVerse.verse.toLowerCase().replace(/[.,!?;:"']/g, '');

    if (cleanInput === cleanVerse) {
      const nextPhase = getNextPhase();
      const nextPhaseName = nextPhase ? getPhaseDisplayName(nextPhase) : 'completion';
      return {
        isCorrect: true,
        feedback: `Perfect! Moving to ${nextPhaseName}.`
      };
    } else if (cleanInput === '') {
      return {
        isCorrect: false,
        feedback: 'Please type your answer.'
      };
    } else {
      // Show diff for incorrect answer
      return {
        isCorrect: false,
        feedback: `Not quite right. Try again!\n\nYou typed: "${userText}"\n\nCorrect verse: "${todaysVerse.verse}"`
      };
    }
  };

  // Generate phase instruction message client-side
  const getPhaseInstruction = (phase: Phase): string => {
    switch (phase) {
      case 'phase1_read':
        const context = generateVerseContext(todaysVerse.reference, todaysVerse.category, todaysVerse.testament);
        return `Phase 1. Read this verse aloud 3 times and click Play Audio. ${context}`;
      case 'phase2_type':
        return 'Phase 2. Type the full verse shown above.';
      case 'phase3_round1':
        return 'Phase 3 Round 1. Type the FULL verse using the hints above.';
      case 'phase3_round2':
        return 'Phase 3 Round 2. Type the FULL verse using the hints above.';
      case 'phase3_round3':
        return 'Phase 3 Round 3. Type the FULL verse using the hints above.';
      case 'phase3_round4':
        return 'Phase 3 Round 4. Type the verse from pure memory.';
      case 'phase5_reference':
        return `Phase 4. Type the reference AND verse together. Format: '${todaysVerse.reference} - ${todaysVerse.verse}'`;
      default:
        return 'Continue to the next phase.';
    }
  };

  // Advance to next phase (client-side instruction generation)
  const advancePhase = async (nextPhase: Phase) => {
    setUserInput('');
    setCurrentPhase(nextPhase);

    // Generate instruction client-side (no AI needed for simple instructions)
    const instruction = getPhaseInstruction(nextPhase);
    setCoachResponse(instruction);
    playCoachAudio(instruction);
  };

  // Submit user's typed verse (client-side validation)
  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);

    // Client-side validation (faster and more reliable than AI)
    const validation = validateUserInput(userInput);
    const responseText = validation.feedback;
    setCoachResponse(responseText);

    // Only play audio if NOT auto-advancing (let next phase audio play instead)
    if (responseText && !validation.isCorrect) {
      playCoachAudio(responseText);
    }

    if (validation.isCorrect) {
      // Stop any playing audio before advancing
      stopCoachAudio();
      // Auto-advance to next phase after a brief delay
      setTimeout(() => {
        // Handle review mode completion
        if (isReviewMode && currentPhase === 'phase3_round4') {
          setIsReviewMode(false);
          setReviewVerseId(null);
          setCurrentPhase('phase1_read');
          // Now start today's verse - pass currentDay explicitly to avoid state delay
          startLearning(currentDay);
          return;
        }

        const next = getNextPhase();
        if (next) {
          setCurrentPhase(next);
          // Immediately fetch next phase instructions (will set coachResponse immediately)
          advancePhase(next);
        } else if (currentPhase === 'phase5_reference') {
          // Phase 5 complete - show celebration (user clicks button to see homework)
          const celebrationMessage = `🎉 FANTASTIC! You've mastered this verse!\n\nThis is now permanently stored in your heart. Come back tomorrow to review it and learn the next treasure from God's Word!`;

          setCoachResponse(celebrationMessage);
          // Play celebration audio
          playCoachAudio(celebrationMessage);

          // Mark verse as memorized and schedule next day
          const newProgress = [...progress];
          const verseProgress = newProgress.find(p => p.verseId === currentDay);
          if (verseProgress) {
            verseProgress.verseMemorized = true;
            verseProgress.referenceMemorized = true;
            verseProgress.lastReviewedDate = new Date().toISOString().split('T')[0];
            verseProgress.nextReviewDate = new Date(Date.now() + 86400000).toISOString().split('T')[0]; // Tomorrow
          } else {
            newProgress.push({
              verseId: currentDay,
              verseMemorized: true,
              referenceMemorized: true,
              lastReviewedDate: new Date().toISOString().split('T')[0],
              nextReviewDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
              attemptCount: 1,
              currentPhase: 'phase5_reference',
              phaseRound: 1,
            });
          }
          saveProgress(newProgress);
        }
      }, 1500); // 1.5 second delay to let user see validation
    }

    setUserInput('');
    setIsLoading(false);
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

  // Show homework tips (called after celebration)
  const showHomework = () => {
    stopCoachAudio(); // Stop celebration audio if still playing
    const homeworkMessage = `🎉 VERSE MASTERED!\n\n📚 HOMEWORK TO REINFORCE LEARNING:\n\n1. 🌙 BEFORE SLEEP: If you're lying in bed and can't fall asleep immediately, recite this verse in your mind. Fall asleep with God's Word on your heart.\n\n2. 🌅 UPON WAKING: First thing tomorrow morning, speak this verse aloud before checking your phone.\n\n3. 📝 WRITE IT: Write the verse by hand 3 times - this reinforces memory pathways.\n\n4. 🗣️ SHARE IT: Quote this verse to someone today.\n\n"Let the word of Christ dwell in you richly." - Colossians 3:16\n\n⏰ ONE VERSE PER DAY: This is your verse for today! Come back tomorrow to review it and learn the next one. Slow, steady memorization leads to permanent retention.`;
    setCoachResponse(homeworkMessage);
  };

  return (
    <div className="space-y-6">
      {/* Progress Stats */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-bold">Scripture Memory Journey</h3>
            <p className="text-amber-100 text-sm mt-1">
              {totalMemorized > 0 ? (
                `${totalMemorized} verse${totalMemorized === 1 ? '' : 's'} mastered • Day ${currentDay} of 77`
              ) : (
                'Begin your journey of hiding God\'s Word in your heart'
              )}
            </p>
          </div>
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
                  {currentPhase === 'phase3_round4' && '🧠 Phase 3-4 (Final)'}
                  {currentPhase === 'phase5_reference' && '💎 Phase 4: Reference'}
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

          {/* Hide verse during pure memory phase */}
          {!coachResponse || currentPhase !== 'phase3_round4' ? (
            <>
              <p className="text-2xl text-gray-700 mb-2 leading-relaxed">
                "{todaysVerse.verse}"
              </p>
              <p className="text-lg text-amber-600 font-semibold">
                {todaysVerse.reference} ({todaysVerse.bibleTranslation})
              </p>
            </>
          ) : (
            <div className="bg-gray-100 border-2 border-dashed border-gray-400 p-6 rounded-lg text-center">
              <p className="text-lg text-gray-600 font-semibold">🧠 Pure Memory Test</p>
              <p className="text-sm text-gray-500 mt-1">Verse hidden - recall from memory!</p>
            </div>
          )}

          <p className="text-sm text-gray-500 mt-2">
            Category: {todaysVerse.category} • {todaysVerse.testament === 'OT' ? 'Old Testament' : 'New Testament'}
          </p>
        </div>

        {!coachResponse ? (
          <button
            onClick={() => startLearning()}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Loading Coach...' : '🎯 Start Learning'}
          </button>
        ) : (
          <div className="space-y-4">
            {/* Coach Response */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <div className="flex items-start justify-between gap-4">
                <p className="text-gray-800 whitespace-pre-line flex-1">{coachResponse}</p>
                <button
                  onClick={() => playCoachAudio(coachResponse)}
                  disabled={isPlayingCoachAudio}
                  className="flex-shrink-0 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm transition disabled:opacity-50"
                  title="Replay coach audio"
                >
                  {isPlayingCoachAudio ? '🔊 Playing...' : '🔊 Replay'}
                </button>
              </div>
            </div>

            {/* Blanked Verse Display (Phase 3) */}
            {currentPhase.startsWith('phase3_') && (
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

            {/* Phase 5 Reference Display */}
            {currentPhase === 'phase5_reference' && (
              <div className="bg-purple-50 border-2 border-purple-300 p-4 rounded-lg">
                <p className="text-sm text-purple-600 font-semibold mb-2">Type in this format:</p>
                <p className="text-lg text-gray-800 leading-relaxed">
                  {todaysVerse.reference} - {todaysVerse.verse}
                </p>
                <p className="text-xs text-purple-500 mt-2">Example: "John 3:16 - For God so loved the world..."</p>
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

                {/* Action Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !userInput.trim()}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
                >
                  {isLoading ? 'Checking...' : '✓ Submit Answer'}
                </button>
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

            {/* View Homework button after celebration */}
            {coachResponse.includes('FANTASTIC! You\'ve mastered this verse!') && (
              <button
                onClick={showHomework}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-lg transition shadow-lg"
              >
                📚 View Homework Tips
              </button>
            )}

            {/* Continue button after homework completion */}
            {coachResponse.includes('HOMEWORK TO REINFORCE LEARNING') && (
              <button
                onClick={nextVerse}
                disabled={currentDay >= 77}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50 shadow-lg"
              >
                {currentDay >= 77 ? '🎉 All Verses Completed!' : '📖 Back to Memory Verses'}
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
