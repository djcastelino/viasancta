'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface PsalmSection {
  id: number;
  number: number;
  title: string;
  verses: string;
  verseRange: string;
}

const psalmSections: PsalmSection[] = [
  {
    id: 1,
    number: 1,
    title: "The Dwelling Place",
    verseRange: "Verses 1-2",
    verses: "You who dwell in the shelter of the Most High,\n    who abide in the shade of the Almighty,\nSay to the LORD, "My refuge and fortress,\n    my God in whom I trust.""
  },
  {
    id: 2,
    number: 2,
    title: "His Protection",
    verseRange: "Verses 3-8",
    verses: "He will rescue you from the fowler's snare,\n    from the destroying plague,\nHe will shelter you with his pinions,\n    and under his wings you may take refuge;\n    his faithfulness is a protecting shield.\n\nYou shall not fear the terror of the night\n    nor the arrow that flies by day,\nNor the pestilence that roams in darkness,\n    nor the plague that ravages at noon.\nThough a thousand fall at your side,\n    ten thousand at your right hand,\n    near you it shall not come.\nYou need simply watch;\n    the punishment of the wicked you will see."
  },
  {
    id: 3,
    number: 3,
    title: "His Angels",
    verseRange: "Verses 9-13",
    verses: "Because you have the LORD for your refuge\n    and have made the Most High your stronghold,\nNo evil shall befall you,\n    no affliction come near your tent.\nFor he commands his angels with regard to you,\n    to guard you wherever you go.\nWith their hands they shall support you,\n    lest you strike your foot against a stone.\nYou can tread upon the asp and the viper,\n    trample the lion and the dragon."
  },
  {
    id: 4,
    number: 4,
    title: "His Answer",
    verseRange: "Verses 14-16",
    verses: "Because he clings to me I will deliver him;\n    because he knows my name I will set him on high.\nHe will call upon me and I will answer;\n    I will be with him in distress;\n    I will deliver him and give him honor.\nWith length of days I will satisfy him,\n    and fill him with my saving power."
  }
];

export default function Psalm91() {
  const [currentSection, setCurrentSection] = useState<PsalmSection>(psalmSections[0]);
  const [isPrayerMode, setIsPrayerMode] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true); // Default ON
  const [remainingTime, setRemainingTime] = useState(45); // 45 seconds per section

  const psalmMusicRef = useRef<HTMLAudioElement | null>(null);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const textTimerRef = useRef<NodeJS.Timeout | null>(null);

  const psalmMusicUrl = '/audio/background/gregorian-chant.mp3';

  const playBellSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  };

  const handleSectionChange = (section: PsalmSection) => {
    setCurrentSection(section);
    setShowText(false);
    setRemainingTime(45);
  };

  const startPsalmMusic = () => {
    if (!psalmMusicRef.current) {
      const music = new Audio(psalmMusicUrl);
      music.loop = true;
      music.volume = 0;
      psalmMusicRef.current = music;

      music.addEventListener('error', () => {
        console.log('Psalm music not found');
      });

      music.play().then(() => {
        setShowMusicPrompt(false);
        const fadeInterval = setInterval(() => {
          if (music.volume < 0.15) {
            music.volume = Math.min(music.volume + 0.01, 0.15);
          } else {
            clearInterval(fadeInterval);
          }
        }, 100);
      }).catch(err => {
        console.log('Psalm music autoplay prevented');
        setShowMusicPrompt(true);
      });
    }
  };

  // Handle Prayer Mode entry/exit
  useEffect(() => {
    if (isPrayerMode) {
      startPsalmMusic();
      setRemainingTime(45);
    } else {
      setShowMusicPrompt(false);
      setShowText(false);

      if (textTimerRef.current) {
        clearTimeout(textTimerRef.current);
      }
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }

      if (psalmMusicRef.current) {
        const music = psalmMusicRef.current;
        try {
          music.pause();
          music.currentTime = 0;
          music.volume = 0;
        } catch (e) {
          console.log('Error stopping music:', e);
        }
        psalmMusicRef.current = null;
      }
    }
  }, [isPrayerMode]);

  // Handle section changes in Prayer Mode
  useEffect(() => {
    if (isPrayerMode) {
      playBellSound();
      setShowText(false);

      if (textTimerRef.current) {
        clearTimeout(textTimerRef.current);
      }

      textTimerRef.current = setTimeout(() => {
        setShowText(true);
      }, 2000);
    }
  }, [currentSection, isPrayerMode]);

  // Auto-advance timer
  useEffect(() => {
    if (isPrayerMode && autoAdvance) {
      autoAdvanceTimerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setCurrentSection((current) => {
              const nextIndex = current.number % psalmSections.length;
              return psalmSections[nextIndex];
            });
            return 45;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }
    };
  }, [isPrayerMode, autoAdvance]);

  const handleNext = () => {
    const nextIndex = currentSection.number % psalmSections.length;
    handleSectionChange(psalmSections[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = currentSection.number === 1 ? psalmSections.length - 1 : currentSection.number - 2;
    handleSectionChange(psalmSections[prevIndex]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Header */}
      {!isPrayerMode && (
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-5">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-center">
              🛡️ Psalm 91
            </h1>
            <p className="text-xl text-center text-slate-300">
              Security Under God's Protection
            </p>
            <p className="text-sm text-center text-slate-400 mt-2 italic">
              Declare God's promises of protection over your life
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isPrayerMode && (
        <div className="max-w-4xl mx-auto px-5 py-8">
          <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6 text-center">
              Psalm 91 - NABRE Translation
            </h2>

            {psalmSections.map((section) => (
              <div key={section.id} className="mb-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {section.title} <span className="text-sm font-normal text-gray-600">({section.verseRange})</span>
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line font-serif">
                  {section.verses}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsPrayerMode(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 rounded-xl font-bold text-2xl shadow-2xl transition-all hover:scale-105"
            >
              🙏 Declare in Prayer Mode
            </button>
            <p className="text-gray-500 text-sm mt-3 italic">
              Immersive experience - speak these promises over yourself
            </p>
          </div>
        </div>
      )}

      {/* Prayer Mode - Full Screen */}
      {isPrayerMode && (
        <div className="fixed inset-0 z-50">
          <div className="h-screen relative">
            {/* Blurred Background Layer - Mobile only */}
            <div className="absolute inset-0 z-0 block md:hidden pointer-events-none">
              <img
                src="/images/psalm91/psalm91_portrait.png"
                alt=""
                className="w-full h-full object-cover pointer-events-none"
                style={{ filter: 'blur(50px) brightness(0.3) saturate(0.5)', transform: 'scale(1.1)' }}
              />
            </div>

            {/* Main Image - Desktop */}
            <img
              src="/images/psalm91/psalm91.png"
              alt="Psalm 91"
              className="absolute inset-0 w-full h-full object-cover opacity-90 hidden md:block pointer-events-none"
            />

            {/* Main Image - Mobile */}
            <img
              src="/images/psalm91/psalm91_portrait.png"
              alt="Psalm 91"
              className="absolute inset-0 w-full h-full object-contain opacity-95 block md:hidden z-5 pointer-events-none"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none z-10"></div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 pointer-events-none">
              {showText && (
                <div className="max-w-4xl w-full animate-fade-in-slow pointer-events-auto">
                  <div className="bg-black/80 backdrop-blur-md p-8 rounded-xl">
                    <div className="text-blue-300 text-sm font-semibold mb-3 tracking-wider uppercase text-center">
                      Psalm 91 - Section {currentSection.number} of 4
                    </div>
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 text-center font-serif">
                      {currentSection.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-6 text-center">
                      {currentSection.verseRange}
                    </p>
                    <div className="text-white text-lg md:text-xl leading-relaxed whitespace-pre-line font-serif">
                      {currentSection.verses}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <button
              onClick={() => setIsPrayerMode(false)}
              className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all pointer-events-auto"
            >
              ✕ Exit
            </button>

            <div className="absolute bottom-6 left-6 z-30 pointer-events-auto">
              <button
                onClick={() => setAutoAdvance(!autoAdvance)}
                className={`px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all shadow-lg ${
                  autoAdvance
                    ? 'bg-blue-600/90 hover:bg-blue-700/90 text-white'
                    : 'bg-white/90 hover:bg-white text-gray-700'
                }`}
              >
                {autoAdvance ? `⏱️ ${Math.floor(remainingTime / 60)}:${String(remainingTime % 60).padStart(2, '0')}` : '⏱️ Auto-Advance'}
              </button>
            </div>

            <div className="absolute bottom-6 right-6 z-30 flex gap-2 pointer-events-auto">
              <button
                onClick={handlePrevious}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full text-sm backdrop-blur-sm transition-all"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-600/80 hover:bg-blue-700/80 text-white p-3 rounded-full text-sm backdrop-blur-sm transition-all"
              >
                →
              </button>
            </div>

            {/* Progress dots */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
              {psalmSections.map((section) => (
                <div
                  key={section.id}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSection.number === section.number
                      ? 'bg-blue-500 scale-125'
                      : 'bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>

            {/* Music Prompt */}
            {showMusicPrompt && (
              <button
                onClick={startPsalmMusic}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 bg-blue-600/90 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm transition-all pointer-events-auto shadow-lg animate-pulse"
              >
                🎵 Enable Background Music
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      {!isPrayerMode && (
        <div className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <p className="text-gray-400 mb-4">
              "You who dwell in the shelter of the Most High, who abide in the shade of the Almighty..."
            </p>
            <p className="text-xs text-gray-500 mb-6">
              Psalm 91:1 - NABRE Translation
            </p>
            <Link
              href="/"
              className="inline-block bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-semibold transition-all"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      )}

      {/* CSS */}
      <style jsx>{`
        @keyframes fade-in-slow {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 1.5s ease-out;
        }
      `}</style>
    </main>
  );
}
