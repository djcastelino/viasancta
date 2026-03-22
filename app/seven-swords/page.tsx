'use client';

import { useState, useRef, useEffect } from 'react';

interface Sword {
  id: number;
  number: number;
  name: string;
  scripture: {
    reference: string;
    text: string;
  };
  biblicalEvent: string;
  prayer: string;
  spiritualPrinciple: string;
}

const swords: Sword[] = [
  {
    id: 1,
    number: 1,
    name: "Pauline Sword",
    scripture: {
      reference: "Acts 13:11",
      text: "Now, behold, the hand of the Lord is upon you, and you will be blind and not see the sun for a time."
    },
    biblicalEvent: "Paul struck Elymas the sorcerer blind to stop his opposition to the Gospel. This temporary blindness led to the proconsul's conversion.",
    prayer: "Lord Jesus, as You struck Elymas with blindness through Your servant Paul, I ask You to strike spiritual blindness upon [name/situation] who opposes Your work. Let them be unable to see their plans of harm succeed. Use this time of darkness to bring them to the light of Your truth. Transform their heart from opposition to faith, that they may serve You as Paul once did. May their spiritual eyes be opened to see Your glory. Amen.",
    spiritualPrinciple: "Temporary blindness to bring spiritual sight"
  },
  {
    id: 2,
    number: 2,
    name: "Petrine Sword",
    scripture: {
      reference: "Acts 8:20",
      text: "May your silver perish with you, because you thought you could obtain the gift of God with money!"
    },
    biblicalEvent: "Peter rebuked Simon the sorcerer who tried to buy the Holy Spirit's power with money, calling him to repentance.",
    prayer: "Heavenly Father, as Peter confronted Simon's corrupt heart with bold rebuke, I pray You would expose the wickedness in [name/situation]. Let their schemes perish and come to nothing. Strike their heart with conviction of sin. May they recognize the poison of bitterness and the bondage of iniquity within them. Lead them to genuine repentance and transformation. Turn their heart from darkness to light, from the power of Satan to God. Amen.",
    spiritualPrinciple: "Bold rebuke to bring repentance"
  },
  {
    id: 3,
    number: 3,
    name: "Elishian Sword",
    scripture: {
      reference: "2 Kings 6:18",
      text: "When they came down to him, Elisha prayed to the Lord and said, 'Strike this people with blindness, I pray.' So He struck them with blindness according to the word of Elisha."
    },
    biblicalEvent: "Elisha prayed for the Syrian army to be struck blind, then led them to safety and fed them, turning enemies into friends.",
    prayer: "Lord God Almighty, as You struck the Syrian army with blindness at Elisha's prayer, I ask You to strike confusion and blindness upon those who come against me with evil intent. Blind their plans, confuse their strategies, and render their weapons useless. Then, Lord, in Your mercy, lead them to Your truth. Let them encounter Your kindness as the Syrians did. Transform their hostility into friendship, their violence into peace. May they see Your goodness and turn from their ways. Amen.",
    spiritualPrinciple: "Blindness and confusion leading to peace"
  },
  {
    id: 4,
    number: 4,
    name: "Messianic Sword",
    scripture: {
      reference: "John 18:6",
      text: "When Jesus said to them, 'I AM,' they drew back and fell to the ground."
    },
    biblicalEvent: "When Jesus revealed His divine identity with 'I AM,' the soldiers and officials sent to arrest Him fell backward to the ground.",
    prayer: "Lord Jesus Christ, You are the Great I AM, before whom all creation must bow. I pray that You would reveal Your divine power to [name/situation]. Let them encounter Your majesty and fall before You in awe. Strike them with the reality of who You are - the Alpha and Omega, the Beginning and the End. May they be overwhelmed by Your presence and unable to stand in their rebellion. Bring them to their knees in surrender, not in defeat but in worship. Transform their resistance into reverence. Amen.",
    spiritualPrinciple: "Divine revelation causing surrender"
  },
  {
    id: 5,
    number: 5,
    name: "Jehoshaphat Sword",
    scripture: {
      reference: "2 Chronicles 20:22",
      text: "When they began singing and praising, the Lord set ambushes against the sons of Ammon, Moab and Mount Seir, who had come against Judah; so they were routed."
    },
    biblicalEvent: "As Jehoshaphat's army worshiped and praised God, the Lord caused their enemies to destroy each other without Judah lifting a sword.",
    prayer: "Lord God of Hosts, as You fought for Jehoshaphat through worship and praise, I lift up worship to You now. Set confusion in the camp of my adversaries. Let their plans turn against themselves. May their weapons wound only each other, not me. As they plot harm, cause division and discord among them. Let them be routed by their own schemes. While I worship You, Lord, You fight my battles. Give me victory without lifting a sword, that all may know You are God. Transform my enemies' hearts to fear and worship You. Amen.",
    spiritualPrinciple: "Worship brings divine intervention"
  },
  {
    id: 6,
    number: 6,
    name: "Gabriel Sword",
    scripture: {
      reference: "Luke 1:20",
      text: "Behold, you shall be silent and unable to speak until the day when these things take place, because you did not believe my words."
    },
    biblicalEvent: "Angel Gabriel struck Zechariah mute for his unbelief, giving him time to reflect. When his son John was born, his speech and faith returned.",
    prayer: "Lord God, as You struck Zechariah silent through Your angel Gabriel until he could believe and worship, I pray You would silence the voices speaking against Your purposes. Close the mouths of those spreading lies, accusations, and curses. Let their words fall to the ground powerless. Give them time in silence to reflect on Your truth. Remove their platform to harm with words. When their time of silence ends, may they speak only faith, blessing, and praise. Transform their tongue from a weapon of destruction to an instrument of worship. Amen.",
    spiritualPrinciple: "Silence to restore faith and worship"
  },
  {
    id: 7,
    number: 7,
    name: "Jacob Sword",
    scripture: {
      reference: "Genesis 33:10",
      text: "Jacob said, 'If now I have found favor in your sight, then take my present from my hand, for I see your face as one sees the face of God, and you have received me favorably.'"
    },
    biblicalEvent: "After years of fear and separation, Jacob's humility and God's grace transformed his brother Esau's murderous intent into tearful reconciliation.",
    prayer: "Father God, as You transformed Esau's heart from hatred to love, melting his desire for revenge into tears of joy, I pray for complete transformation of [name/situation]. Where there is hatred, plant love. Where there is vengeance, create forgiveness. Where there is enmity, birth reconciliation. Soften hardened hearts as Jacob softened Esau's. Let past wounds be healed and broken relationships restored. May they see Your face in mine and embrace me as family. Complete the miracle of transformation - from enemy to friend, from curse to blessing. Amen.",
    spiritualPrinciple: "Humility and grace bring reconciliation"
  }
];

export default function SevenSwords() {
  const [currentSword, setCurrentSword] = useState<Sword>(swords[0]);
  const [isPrayerMode, setIsPrayerMode] = useState(false);
  const [showPrayer, setShowPrayer] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180); // 3 minutes per sword
  const [personName, setPersonName] = useState('');

  const prayerMusicRef = useRef<HTMLAudioElement | null>(null);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prayerTimerRef = useRef<NodeJS.Timeout | null>(null);

  const prayerMusicUrl = '/audio/background/gregorian-chant.mp3';

  // Play soft bell sound
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

  const handleSwordChange = (sword: Sword) => {
    setCurrentSword(sword);
    setShowPrayer(false);
    setRemainingTime(180);
  };

  const startPrayerMusic = () => {
    if (!prayerMusicRef.current) {
      const music = new Audio(prayerMusicUrl);
      music.loop = true;
      music.volume = 0;
      prayerMusicRef.current = music;

      music.addEventListener('error', () => {
        console.log('Prayer music not found');
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
        console.log('Prayer music autoplay prevented');
        setShowMusicPrompt(true);
      });
    }
  };

  // Handle Prayer Mode entry/exit
  useEffect(() => {
    if (isPrayerMode) {
      startPrayerMusic();
      setRemainingTime(180);
    } else {
      setShowMusicPrompt(false);
      setShowPrayer(false);

      if (prayerTimerRef.current) {
        clearTimeout(prayerTimerRef.current);
      }
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }

      if (prayerMusicRef.current) {
        const music = prayerMusicRef.current;
        try {
          music.pause();
          music.currentTime = 0;
          music.volume = 0;
        } catch (e) {
          console.log('Error stopping music:', e);
        }
        prayerMusicRef.current = null;
      }
    }
  }, [isPrayerMode]);

  // Handle sword changes in Prayer Mode
  useEffect(() => {
    if (isPrayerMode) {
      playBellSound();
      setShowPrayer(false);

      if (prayerTimerRef.current) {
        clearTimeout(prayerTimerRef.current);
      }

      prayerTimerRef.current = setTimeout(() => {
        setShowPrayer(true);
      }, 3000);
    }
  }, [currentSword, isPrayerMode]);

  // Auto-advance timer
  useEffect(() => {
    if (isPrayerMode && autoAdvance) {
      autoAdvanceTimerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setCurrentSword((current) => {
              const nextIndex = current.number % swords.length;
              return swords[nextIndex];
            });
            return 180;
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
    const nextIndex = currentSword.number % swords.length;
    handleSwordChange(swords[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = currentSword.number === 1 ? swords.length - 1 : currentSword.number - 2;
    handleSwordChange(swords[prevIndex]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Header */}
      {!isPrayerMode && (
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-5">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-center">
              ⚔️ Seven Striking Swords
            </h1>
            <p className="text-xl text-center text-slate-300">
              Prayers of Transformation, Not Destruction
            </p>
            <p className="text-sm text-center text-slate-400 mt-2 italic">
              Inspired by the teaching of Logos Ministries, Bangalore
            </p>
          </div>
        </div>
      )}

      {/* Sword Selection Grid */}
      {!isPrayerMode && (
        <div className="max-w-7xl mx-auto px-5 py-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Choose Your Sword</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {swords.map((sword) => (
                <button
                  key={sword.id}
                  onClick={() => handleSwordChange(sword)}
                  className={`p-4 rounded-lg text-left transition-all ${
                    currentSword.id === sword.id
                      ? 'bg-blue-600 text-white scale-105'
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-2">⚔️</div>
                  <div className="font-bold mb-1">{sword.name}</div>
                  <div className="text-xs opacity-75">{sword.scripture.reference}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mb-6">
            <button
              onClick={() => setIsPrayerMode(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all"
            >
              🙏 Enter Prayer Mode - Pray All Seven
            </button>
            <p className="text-xs text-gray-400 mt-2 italic">
              Immersive prayer experience with auto-advance
            </p>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`${isPrayerMode ? 'fixed inset-0 z-50' : 'max-w-7xl mx-auto px-5 py-8'}`}>
        <div className={`${isPrayerMode ? 'h-screen' : 'grid lg:grid-cols-3 gap-6'}`}>
          {/* Image Display */}
          <div className={isPrayerMode ? 'h-full relative' : 'lg:col-span-2'}>
            <div className={isPrayerMode ? 'h-full relative' : 'bg-gray-800 rounded-xl overflow-hidden shadow-2xl h-full'}>
              <div className={`relative ${isPrayerMode ? 'h-full' : 'w-full h-full'} bg-gray-700 overflow-hidden`}>
                {/* Blurred Background Layer - Mobile only (for portrait images) */}
                {isPrayerMode && (
                  <div className="absolute inset-0 z-0 block md:hidden">
                    <img
                      src={`/images/swords/sword_${currentSword.number}_portrait.png`}
                      alt=""
                      className="w-full h-full object-cover blur-background"
                      style={{ filter: 'blur(50px) brightness(0.3) saturate(0.5)', transform: 'scale(1.1)' }}
                    />
                  </div>
                )}

                {/* Main Image - Desktop (landscape) */}
                <img
                  src={`/images/swords/sword_${currentSword.number}.png`}
                  alt={currentSword.name}
                  className={`w-full h-full relative z-5 hidden md:block ${
                    isPrayerMode ? 'object-cover opacity-95' : 'object-cover opacity-90'
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-sword.png';
                  }}
                />

                {/* Main Image - Mobile (portrait) */}
                <img
                  src={isPrayerMode
                    ? `/images/swords/sword_${currentSword.number}_portrait.png`
                    : `/images/swords/sword_${currentSword.number}.png`
                  }
                  alt={currentSword.name}
                  className={`w-full h-full relative z-5 block md:hidden ${
                    isPrayerMode ? 'object-contain opacity-95' : 'object-cover opacity-90'
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-sword.png';
                  }}
                />

                {/* Vignette overlay for prayer mode */}
                {isPrayerMode && (
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60 pointer-events-none z-10"></div>
                )}

                {/* Prayer Mode Overlay */}
                {isPrayerMode && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    {/* Glowing Sword Icon */}
                    <div className="absolute top-8 left-8 z-30 pointer-events-none">
                      <div className="text-white/80 text-4xl animate-glow-pulse drop-shadow-lg">⚔️</div>
                    </div>

                    {/* Prayer Text Overlay */}
                    {showPrayer && (
                      <div className="absolute bottom-0 left-0 right-0 text-center px-4 pb-4 z-30 animate-fade-in-slow">
                        <div className="bg-black/70 backdrop-blur-md p-4 max-w-3xl mx-auto">
                          <div className="text-blue-300 text-xs font-semibold mb-2 tracking-wider uppercase">
                            Sword {currentSword.number} of 7
                          </div>
                          <h2 className="text-white text-xl md:text-2xl font-serif font-bold mb-3">
                            {currentSword.name}
                          </h2>

                          <div className="text-gray-200 text-sm md:text-base font-serif italic">
                            "{currentSword.scripture.text}"
                          </div>
                          <p className="text-gray-400 text-xs mt-1">
                            {currentSword.scripture.reference}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Prayer Mode Controls */}
                {isPrayerMode && (
                  <>
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
                  </>
                )}

                {/* Music Prompt */}
                {isPrayerMode && showMusicPrompt && (
                  <button
                    onClick={startPrayerMusic}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 bg-blue-600/90 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm transition-all pointer-events-auto shadow-lg animate-pulse"
                  >
                    🎵 Enable Background Music
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content Panel */}
          {!isPrayerMode && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-2xl p-6">
                <div className="text-center mb-4">
                  <div className="inline-block bg-slate-900 text-white px-4 py-2 rounded-full font-bold mb-2">
                    Sword {currentSword.number} of 7
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                    {currentSword.name}
                  </h2>
                </div>

                {/* Scripture */}
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-900">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    {currentSword.scripture.reference}
                  </p>
                  <p className="text-sm text-gray-700 italic">
                    "{currentSword.scripture.text}"
                  </p>
                </div>

                {/* Biblical Event */}
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 mb-2">Biblical Event:</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentSword.biblicalEvent}
                  </p>
                </div>

                {/* Spiritual Principle */}
                <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                  <h3 className="font-bold text-purple-900 mb-1 text-sm">Spiritual Principle:</h3>
                  <p className="text-sm text-purple-800 italic">
                    {currentSword.spiritualPrinciple}
                  </p>
                </div>

                {/* Person Name Input */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Praying for (optional):
                  </label>
                  <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="Enter name or situation..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Prayer Text */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg max-h-64 overflow-y-auto">
                  <h3 className="font-bold text-gray-900 mb-2">Prayer:</h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {currentSword.prayer}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevious}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-all"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {!isPrayerMode && (
        <div className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <p className="text-gray-400 mb-4">
              "Not by might nor by power, but by My Spirit," says the Lord of hosts.
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Prayers inspired by the Seven Striking Swords teaching from Logos Ministries, Bangalore.
            </p>
            <p className="text-xs text-gray-500 mb-6">
              These prayers seek transformation and conversion, not destruction. We pray for our enemies as Jesus commanded.
            </p>
            <a
              href="/"
              className="inline-block bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-semibold transition-all"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      )}

      {/* CSS for animations */}
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
          animation: fade-in-slow 2s ease-out;
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.7;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.9);
          }
        }
        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </main>
  );
}
