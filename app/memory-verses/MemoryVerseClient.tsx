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

type Phase = 'phase1_read' | 'phase2_type' | 'phase3_round1' | 'phase3_round2' | 'phase3_round3' | 'phase3_round4' | 'phase3_round5' | 'phase5_reference';

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
  const [lastCompletionDate, setLastCompletionDate] = useState<string>('');
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const coachAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('memoryVerseProgress');
    const savedDay = localStorage.getItem('memoryVerseCurrentDay');
    const savedLastCompletion = localStorage.getItem('memoryVerseLastCompletion');

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedDay) {
      setCurrentDay(parseInt(savedDay));
    }
    if (savedLastCompletion) {
      setLastCompletionDate(savedLastCompletion);
    }
  }, []);

  // Check if user can learn today (using local timezone)
  const getTodayDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const canLearnToday = lastCompletionDate !== getTodayDate();
  const hasCompletedToday = lastCompletionDate === getTodayDate();

  // Save progress to localStorage
  const saveProgress = (newProgress: MemoryProgress[]) => {
    setProgress(newProgress);
    localStorage.setItem('memoryVerseProgress', JSON.stringify(newProgress));
  };

  // Save partial progress (current phase) to prevent data loss
  const savePartialProgress = (phase: Phase) => {
    if (isPracticeMode) return; // Don't save progress in practice mode

    const newProgress = [...progress];
    const verseProgress = newProgress.find(p => p.verseId === currentDay);

    if (verseProgress) {
      verseProgress.currentPhase = phase;
      verseProgress.attemptCount = (verseProgress.attemptCount || 0) + 1;
    } else {
      newProgress.push({
        verseId: currentDay,
        verseMemorized: false,
        referenceMemorized: false,
        lastReviewedDate: getTodayDate(),
        nextReviewDate: getTomorrowDate(),
        attemptCount: 1,
        currentPhase: phase,
        phaseRound: 1,
      });
    }

    saveProgress(newProgress);
  };

  const saveCurrentDay = (day: number) => {
    setCurrentDay(day);
    localStorage.setItem('memoryVerseCurrentDay', day.toString());
  };

  // Get today's verse (or review verse if in review mode)
  const displayVerseId = isReviewMode && reviewVerseId ? reviewVerseId : currentDay;
  const todaysVerse = verses.find(v => v.id === displayVerseId) || verses[0];

  // Check if there's saved partial progress for today's verse
  const getSavedProgress = () => {
    return progress.find(p => p.verseId === currentDay);
  };

  const hasSavedProgress = () => {
    const saved = getSavedProgress();
    return saved && !saved.verseMemorized && saved.currentPhase && saved.currentPhase !== 'phase1_read';
  };

  // Resume from saved progress
  const resumeProgress = () => {
    const saved = getSavedProgress();
    if (saved && saved.currentPhase) {
      setCurrentPhase(saved.currentPhase as Phase);
      const instruction = getPhaseInstruction(saved.currentPhase as Phase);
      setCoachResponse(instruction);
      playCoachAudio(instruction);
    }
  };

  // Calculate statistics
  const totalMemorized = progress.filter(p => p.verseMemorized).length;
  const totalReferencesMemorized = progress.filter(p => p.referenceMemorized).length;

  // Calculate current streak (consecutive days)
  const calculateStreak = (): number => {
    const sortedProgress = [...progress]
      .filter(p => p.verseMemorized)
      .sort((a, b) => b.verseId - a.verseId); // Sort by verse ID descending

    if (sortedProgress.length === 0) return 0;

    let streak = 0;
    let expectedId = currentDay - 1; // Start from yesterday

    // Check if we completed today's verse
    const completedToday = sortedProgress.find(p => p.verseId === currentDay);
    if (completedToday) {
      streak = 1;
      expectedId = currentDay - 1;
    }

    // Count consecutive days backwards
    for (const item of sortedProgress) {
      if (item.verseId === expectedId) {
        streak++;
        expectedId--;
      } else if (item.verseId < expectedId) {
        break;
      }
    }

    return streak;
  };

  const currentStreak = calculateStreak();

  // Get verses that need review
  const getVersesNeedingReview = () => {
    const today = getTodayDate();
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
  const startLearning = async (forceVerseId?: number, skipYesterdayReview: boolean = false) => {
    // Use forced verse ID (for post-review) or current day
    const targetVerseId = forceVerseId || currentDay;
    const targetVerse = verses.find(v => v.id === targetVerseId) || verses[0];

    // Check if we need to review yesterday's verse first (only if not forced and not in practice mode and not skipped)
    if (!forceVerseId && !isPracticeMode && !skipYesterdayReview && currentDay > 1 && !isReviewMode) {
      const yesterdayVerseId = currentDay - 1;
      const yesterdayProgress = progress.find(p => p.verseId === yesterdayVerseId);

      // If yesterday's verse was memorized, suggest reviewing it first (but don't force)
      if (yesterdayProgress?.verseMemorized) {
        setIsReviewMode(true);
        setReviewVerseId(yesterdayVerseId);
        setCurrentPhase('phase3_round4');
        setUserInput('');

        const yesterdayVerse = verses.find(v => v.id === yesterdayVerseId);
        if (yesterdayVerse) {
          const reviewMessage = `📖 QUICK REVIEW FIRST?\n\nBefore learning today's verse, let's review yesterday's verse to reinforce it.\n\nType from memory: ${yesterdayVerse.reference}\n\n💡 Or click "Skip Review" below to go straight to today's verse.`;
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

  // Generate blanked verse based on phase and difficulty
  const getBlankedVerse = (phase: Phase): string => {
    const words = todaysVerse.verse.split(' ');
    const difficulty = todaysVerse.difficulty;

    switch (phase) {
      case 'phase3_round1':
        // Short: every 4th word hidden, Medium/Long: every 5th word
        const interval1 = difficulty === 'short' ? 4 : 5;
        return words.map((word, i) => (i + 1) % interval1 === 0 ? '___' : word).join(' ');

      case 'phase3_round2':
        // Short: every 3rd word, Medium/Long: every 4th word
        const interval2 = difficulty === 'short' ? 3 : 4;
        return words.map((word, i) => (i + 1) % interval2 === 0 ? '___' : word).join(' ');

      case 'phase3_round3':
        // Short: every 2nd word, Medium/Long: every 3rd word
        const interval3 = difficulty === 'short' ? 2 : 3;
        return words.map((word, i) => (i + 1) % interval3 === 0 ? '___' : word).join(' ');

      case 'phase3_round4':
        // In review mode, always use blank screen for pure memory test
        // Otherwise: Short = first letters only, Medium/Long = every 2nd word hidden
        if (isReviewMode) {
          return '___________________________';
        } else if (difficulty === 'short') {
          return words.map(word => {
            const firstLetter = word[0];
            const underscores = '_'.repeat(Math.max(1, word.length - 1));
            return firstLetter + underscores;
          }).join(' ');
        } else {
          return words.map((word, i) => (i + 1) % 2 === 0 ? '___' : word).join(' ');
        }

      case 'phase3_round5':
        // Only for medium/long verses: first letters only
        return words.map(word => {
          const firstLetter = word[0];
          const underscores = '_'.repeat(Math.max(1, word.length - 1));
          return firstLetter + underscores;
        }).join(' ');

      default:
        return todaysVerse.verse;
    }
  };

  // Get final memory test phase (blank screen) based on difficulty
  const getFinalMemoryPhase = (): Phase => {
    return todaysVerse.difficulty === 'short' ? 'phase3_round4' : 'phase3_round5';
  };

  // Check if current phase is the final memory test
  const isFinalMemoryTest = (phase: Phase): boolean => {
    if (todaysVerse.difficulty === 'short') {
      return phase === 'phase3_round4';
    } else {
      return phase === 'phase3_round5';
    }
  };

  // Get next phase based on difficulty
  const getNextPhase = (): Phase | null => {
    const difficulty = todaysVerse.difficulty;

    switch (currentPhase) {
      case 'phase1_read': return 'phase2_type';
      case 'phase2_type': return 'phase3_round1';
      case 'phase3_round1': return 'phase3_round2';
      case 'phase3_round2': return 'phase3_round3';
      case 'phase3_round3': return 'phase3_round4';
      case 'phase3_round4':
        // Short verses end here, medium/long continue
        return difficulty === 'short' ? 'phase5_reference' : 'phase3_round5';
      case 'phase3_round5':
        return 'phase5_reference';
      case 'phase5_reference': return null; // Done
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
      case 'phase3_round5': return 'Phase 3 Round 5';
      case 'phase5_reference': return 'Phase 4';
      default: return 'next phase';
    }
  };

  // Calculate similarity between two strings (Levenshtein distance based)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    const longerLength = longer.length;

    if (longerLength === 0) return 1.0;

    const editDistance = getEditDistance(longer, shorter);
    return (longerLength - editDistance) / longerLength;
  };

  // Levenshtein distance calculation
  const getEditDistance = (str1: string, str2: string): number => {
    const costs: number[] = [];
    for (let i = 0; i <= str1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (str1.charAt(i - 1) !== str2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[str2.length] = lastValue;
    }
    return costs[str2.length];
  };

  // Normalize text for comparison (lenient on spaces, punctuation)
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[.,!?;:"']/g, '') // Remove punctuation
      .replace(/\s+/g, ' ') // Collapse multiple spaces to single space
      .trim();
  };

  // Normalize reference format to handle variations
  const normalizeReference = (ref: string): string => {
    return ref
      .toLowerCase()
      .replace(/\s+/g, '') // Remove all spaces
      .replace(/[.,!?;:"']/g, ''); // Remove punctuation
  };

  // Client-side validation (more reliable than AI)
  const validateUserInput = (userText: string): { isCorrect: boolean; feedback: string } => {
    const normalizedInput = normalizeText(userText);

    // For Phase 5, expect "reference - verse" format
    if (currentPhase === 'phase5_reference') {
      // Try to extract reference and verse from user input
      // Support formats: "Reference - Verse", "Reference: Verse", "Reference Verse"
      const userTextLower = userText.trim();
      let userReference = '';
      let userVerse = '';

      // Try to split by common separators
      if (userTextLower.includes(' - ')) {
        [userReference, userVerse] = userTextLower.split(' - ', 2);
      } else if (userTextLower.includes(': ')) {
        [userReference, userVerse] = userTextLower.split(': ', 2);
      } else if (userTextLower.includes(' – ')) {
        [userReference, userVerse] = userTextLower.split(' – ', 2);
      } else {
        // Try to find where the verse starts (after the reference)
        // Look for the first quoted text or after book chapter:verse pattern
        const refMatch = userTextLower.match(/^([^\d]+ \d+:\d+(-\d+)?)/);
        if (refMatch) {
          userReference = refMatch[1];
          userVerse = userTextLower.substring(refMatch[1].length).trim();
        } else {
          // Can't parse format - use full text for both
          userReference = userTextLower;
          userVerse = userTextLower;
        }
      }

      // Normalize and compare reference
      const normalizedUserRef = normalizeReference(userReference);
      const normalizedExpectedRef = normalizeReference(todaysVerse.reference);
      const refMatch = normalizedUserRef === normalizedExpectedRef ||
                       normalizedUserRef.includes(normalizedExpectedRef) ||
                       normalizedExpectedRef.includes(normalizedUserRef);

      // Normalize and compare verse
      const normalizedUserVerse = normalizeText(userVerse);
      const normalizedExpectedVerse = normalizeText(todaysVerse.verse);
      const verseSimilarity = calculateSimilarity(normalizedUserVerse, normalizedExpectedVerse);

      if (refMatch && verseSimilarity >= 0.95) {
        return {
          isCorrect: true,
          feedback: `Perfect! You've mastered the complete verse with reference!`
        };
      } else if (!refMatch && verseSimilarity >= 0.95) {
        return {
          isCorrect: false,
          feedback: `Great verse! But the reference doesn't match.\n\nExpected reference: "${todaysVerse.reference}"\n\nYou typed: "${userReference}"\n\nTry again with the correct reference!`
        };
      } else if (refMatch && verseSimilarity < 0.95) {
        return {
          isCorrect: false,
          feedback: `Good reference! But the verse needs work.\n\nExpected: "${todaysVerse.verse}"\n\nYou typed: "${userVerse}"\n\nTry again!`
        };
      } else {
        return {
          isCorrect: false,
          feedback: `Almost! Remember to type BOTH the reference AND verse together.\n\nExpected: "${todaysVerse.reference} - ${todaysVerse.verse}"\n\nYou typed: "${userText}"\n\nTry again!`
        };
      }
    }

    // For all other phases, validate verse text only
    const normalizedVerse = normalizeText(todaysVerse.verse);

    // Calculate similarity (allow 95% match - about 1 typo per 20 characters)
    const similarity = calculateSimilarity(normalizedInput, normalizedVerse);

    if (similarity >= 0.95) {
      // Special message for review mode completion
      if (isReviewMode && isFinalMemoryTest(currentPhase)) {
        return {
          isCorrect: true,
          feedback: `Perfect! Review complete. Now let's learn today's verse.`
        };
      }

      const nextPhase = getNextPhase();
      const nextPhaseName = nextPhase ? getPhaseDisplayName(nextPhase) : 'completion';
      return {
        isCorrect: true,
        feedback: similarity === 1.0
          ? `Perfect! Moving to ${nextPhaseName}.`
          : `Great job! (Minor typo but close enough) Moving to ${nextPhaseName}.`
      };
    } else if (normalizedInput === '') {
      return {
        isCorrect: false,
        feedback: 'Please type your answer.'
      };
    } else {
      // Show similarity percentage for encouragement
      const percentMatch = Math.round(similarity * 100);
      return {
        isCorrect: false,
        feedback: `Not quite right (${percentMatch}% match). Try again!\n\nYou typed: "${userText}"\n\nCorrect verse: "${todaysVerse.verse}"`
      };
    }
  };

  // Generate phase instruction message client-side
  const getPhaseInstruction = (phase: Phase): string => {
    const difficulty = todaysVerse.difficulty;

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
        // Short verses: pure memory. Medium/Long: still has hints
        return difficulty === 'short'
          ? 'Phase 3 Round 4 (Final). Type the verse from pure memory.'
          : 'Phase 3 Round 4. Type the FULL verse using the hints above.';
      case 'phase3_round5':
        return 'Phase 3 Round 5 (Final). Type the verse from pure memory.';
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

    // Save partial progress to prevent data loss
    savePartialProgress(nextPhase);

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
        if (isReviewMode && isFinalMemoryTest(currentPhase)) {
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
          // Phase 5 complete - show celebration
          const celebrationMessage = isPracticeMode
            ? `🎉 GREAT PRACTICE! You've reviewed this verse successfully!\n\nKeep practicing to strengthen your memory. You can practice any verse anytime!`
            : `🎉 FANTASTIC! You've mastered this verse!\n\nThis is now permanently stored in your heart. Click below to see homework tips for reinforcing this verse!`;

          setCoachResponse(celebrationMessage);
          // Play celebration audio
          playCoachAudio(celebrationMessage);

          // Only save progress and completion date if NOT in practice mode
          if (!isPracticeMode) {
            // Mark verse as memorized and schedule next day
            const newProgress = [...progress];
            const verseProgress = newProgress.find(p => p.verseId === currentDay);
            if (verseProgress) {
              verseProgress.verseMemorized = true;
              verseProgress.referenceMemorized = true;
              verseProgress.lastReviewedDate = getTodayDate();
              verseProgress.nextReviewDate = getTomorrowDate();
            } else {
              newProgress.push({
                verseId: currentDay,
                verseMemorized: true,
                referenceMemorized: true,
                lastReviewedDate: getTodayDate(),
                nextReviewDate: getTomorrowDate(),
                attemptCount: 1,
                currentPhase: 'phase5_reference',
                phaseRound: 1,
              });
            }
            saveProgress(newProgress);

            // Save completion date (one verse per day enforcement)
            const today = getTodayDate();
            setLastCompletionDate(today);
            localStorage.setItem('memoryVerseLastCompletion', today);
          }
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

    const homeworkMessage = `🎉 VERSE MASTERED!\n\n📚 HOMEWORK TO REINFORCE LEARNING:\n\n1. 🌙 BEFORE SLEEP: If you're lying in bed and can't fall asleep immediately, recite this verse in your mind. Fall asleep with God's Word on your heart.\n\n2. 🌅 UPON WAKING: First thing tomorrow morning, speak this verse aloud before checking your phone.\n\n3. 📝 WRITE IT: Write the verse by hand 3 times - this reinforces memory pathways.\n\n4. 🗣️ SHARE IT: Quote this verse to someone today.\n\n"Let the word of Christ dwell in you richly." - Colossians 3:16\n\n⏰ WHAT'S NEXT?\n• We recommend learning one verse per day for deep retention\n• But you're free to navigate to the next verse below if you'd like to continue\n• Use Practice Mode anytime to review any verse\n• Check "Reviews Due" section for verses needing reinforcement\n\nSlow, steady pacing leads to permanent retention!`;
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

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-amber-100">Overall Progress</span>
            <span className="text-sm text-amber-100 font-semibold">{totalMemorized} / 77</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${(totalMemorized / 77) * 100}%` }}
            />
          </div>
        </div>

        {showStats && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-3xl font-bold">{totalMemorized}</div>
                <div className="text-sm text-amber-100">Verses Memorized</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-3xl font-bold">{currentStreak}</div>
                <div className="text-sm text-amber-100">Day Streak 🔥</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-3xl font-bold">{Math.round((totalMemorized / 77) * 100)}%</div>
                <div className="text-sm text-amber-100">Complete</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-3xl font-bold">{getVersesNeedingReview().length}</div>
                <div className="text-sm text-amber-100">Need Review</div>
              </div>
            </div>

            {/* Visual Calendar */}
            <div className="mt-6 bg-white/10 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-amber-100 mb-3">Progress Calendar</h4>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 77 }, (_, i) => i + 1).map(verseId => {
                  const isMemorized = progress.find(p => p.verseId === verseId)?.verseMemorized;
                  const isCurrent = verseId === currentDay;
                  return (
                    <div
                      key={verseId}
                      className={`
                        aspect-square rounded flex items-center justify-center text-xs font-semibold
                        ${isMemorized ? 'bg-green-500 text-white' : 'bg-white/20 text-amber-100'}
                        ${isCurrent ? 'ring-2 ring-white' : ''}
                      `}
                      title={`Day ${verseId}${isMemorized ? ' ✓' : ''}`}
                    >
                      {verseId}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-amber-100">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-white/20 rounded"></div>
                  <span>Not Started</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-white/20 rounded ring-2 ring-white"></div>
                  <span>Current</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Reviews Needed Section */}
      {getVersesNeedingReview().length > 0 && (
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
          <h3 className="text-lg font-bold text-orange-800 mb-3">📚 Reviews Due</h3>
          <p className="text-orange-700 text-sm mb-4">
            These verses are ready for review to reinforce your memory. Use Practice Mode to review them!
          </p>
          <div className="space-y-2">
            {getVersesNeedingReview().slice(0, 5).map((review: any, idx: number) => (
              <div key={idx} className="bg-white rounded-lg p-3 flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{review.reference}</p>
                  <p className="text-sm text-gray-600 truncate">{review.verse}</p>
                </div>
                <button
                  onClick={() => {
                    const verseToReview = verses.find(v => v.reference === review.reference);
                    if (verseToReview) {
                      saveCurrentDay(verseToReview.id);
                      setIsPracticeMode(true);
                      setCoachResponse('');
                    }
                  }}
                  className="ml-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
          {getVersesNeedingReview().length > 5 && (
            <p className="text-sm text-orange-600 mt-3 text-center">
              + {getVersesNeedingReview().length - 5} more verses need review
            </p>
          )}
        </div>
      )}

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
                  {currentPhase === 'phase3_round4' && (todaysVerse.difficulty === 'short' ? '🧠 Phase 3-4 (Final)' : '🧠 Phase 3-4')}
                  {currentPhase === 'phase3_round5' && '🧠 Phase 3-5 (Final)'}
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
          {!coachResponse || !isFinalMemoryTest(currentPhase) ? (
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
          <>
            {hasSavedProgress() && !hasCompletedToday && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-4">
                <p className="text-green-800 font-semibold">📝 Continue Where You Left Off</p>
                <p className="text-green-700 text-sm mt-2">
                  You have saved progress on this verse. Resume from {getPhaseDisplayName(getSavedProgress()?.currentPhase as Phase)} or start fresh.
                </p>
                <button
                  onClick={resumeProgress}
                  disabled={isLoading}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
                >
                  Resume Progress
                </button>
              </div>
            )}

            {hasCompletedToday && !isPracticeMode && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
                <p className="text-blue-800 font-semibold">✅ You've completed today's verse!</p>
                <p className="text-blue-700 text-sm mt-2">
                  Great work! We recommend one verse per day for deep retention, but you're free to continue.
                </p>
                <p className="text-blue-700 text-sm mt-2 font-semibold">
                  💡 Navigate to the next verse below, or use Practice Mode to review any verse!
                </p>
              </div>
            )}

            {isPracticeMode && (
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded mb-4">
                <p className="text-purple-800 font-semibold">🔄 Practice Mode Active</p>
                <p className="text-purple-700 text-sm mt-2">
                  You can practice any verse without affecting your daily progress or completion tracking.
                </p>
              </div>
            )}

            <div className="flex gap-3 mb-3">
              <button
                onClick={() => {
                  setIsPracticeMode(false);
                  startLearning();
                }}
                disabled={isLoading || (hasCompletedToday && !isPracticeMode)}
                className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50"
              >
                {hasCompletedToday ? '🔒 Come Back Tomorrow' : isLoading ? 'Loading...' : '🎯 Start Learning'}
              </button>

              <button
                onClick={() => {
                  setIsPracticeMode(true);
                  startLearning();
                }}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : '🔄 Practice Mode'}
              </button>
            </div>
          </>
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
              <>
                <div className="flex gap-3">
                  <button
                    onClick={isPlayingAudio ? stopAudio : playAudio}
                    disabled={isPlayingAudio && audioRef.current !== null}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isPlayingAudio ? '⏸️ Stop Audio' : '🔊 Play Audio'}
                  </button>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                  <p className="text-sm text-blue-700 text-center">
                    💡 Audio helps with memorization, but you can skip if needed
                  </p>
                </div>
              </>
            )}

            {/* User Input (Phases 2-5) */}
            {currentPhase !== 'phase1_read' && (
              <>
                <div>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onPaste={(e) => {
                      e.preventDefault();
                      setCoachResponse('⚠️ Copy-paste is disabled. Please type from memory to strengthen your learning!');
                      playCoachAudio('Copy-paste is disabled. Please type from memory to strengthen your learning!');
                    }}
                    onCopy={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
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

                  {/* Skip Review button (only show during review mode) */}
                  {isReviewMode && coachResponse.includes('QUICK REVIEW FIRST') && (
                    <button
                      onClick={() => {
                        setIsReviewMode(false);
                        setReviewVerseId(null);
                        startLearning(currentDay, true); // Skip review
                      }}
                      disabled={isLoading}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
                    >
                      Skip Review
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Next button for Phase 1 */}
            {currentPhase === 'phase1_read' && (
              <button
                onClick={() => {
                  stopAudio(); // Stop any playing audio
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

            {/* Continue button after homework/practice completion */}
            {(coachResponse.includes('HOMEWORK TO REINFORCE LEARNING') || coachResponse.includes('GREAT PRACTICE')) && (
              <button
                onClick={() => {
                  setCoachResponse('');
                  setIsPracticeMode(false);
                }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition shadow-lg"
              >
                📖 Back to Memory Verses
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Navigate to Any Verse</h3>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => saveCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay <= 1}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            ← Previous
          </button>

          <select
            value={currentDay}
            onChange={(e) => {
              saveCurrentDay(parseInt(e.target.value));
              setCoachResponse('');
              setIsPracticeMode(false);
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {verses.map(v => {
              const isMemorized = progress.find(p => p.verseId === v.id)?.verseMemorized;
              return (
                <option key={v.id} value={v.id}>
                  {isMemorized ? '✓ ' : ''}{v.reference} - {v.verse.substring(0, 50)}...
                </option>
              );
            })}
          </select>

          <button
            onClick={() => saveCurrentDay(Math.min(77, currentDay + 1))}
            disabled={currentDay >= 77}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            Next →
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-3 text-center">
          💡 Tip: Use Practice Mode to review any verse without affecting your daily progress
        </p>
      </div>
    </div>
  );
}
