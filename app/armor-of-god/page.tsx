'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface ArmorPiece {
  id: number;
  number: number;
  name: string;
  imageName: string;
  scripture: {
    reference: string;
    text: string;
  };
  protectsAgainst: string;
  prayer: string;
  practicalApplication: string;
  category: 'defensive' | 'offensive';
}

const armorPieces: ArmorPiece[] = [
  {
    id: 1,
    number: 1,
    name: "Belt of Truth",
    imageName: "belt",
    scripture: {
      reference: "Ephesians 6:14a",
      text: "Stand firm then, with the belt of truth buckled around your waist"
    },
    protectsAgainst: "Lies, deception, confusion, half-truths, and the father of lies",
    prayer: "Heavenly Father, I put on the Belt of Truth today. Gird me with Your truth that sets me free. Let Your Word be a lamp to my feet and a light to my path. Expose every lie of the enemy. Help me walk in truth, speak truth, and live truth. Let no deception take root in my mind. I reject every false narrative and embrace Your truth revealed in Scripture and in Christ Jesus. Holy Spirit, guide me into all truth today. Amen.",
    practicalApplication: "Today, test every thought against Scripture. Ask: 'Is this true according to God's Word?' Reject anxious thoughts, condemning thoughts, and hopeless thoughts that contradict biblical truth.",
    category: 'defensive'
  },
  {
    id: 2,
    number: 2,
    name: "Breastplate of Righteousness",
    imageName: "breastplate",
    scripture: {
      reference: "Ephesians 6:14b",
      text: "with the breastplate of righteousness in place"
    },
    protectsAgainst: "Condemnation, guilt, shame, accusation, unworthiness, and attacks on your identity",
    prayer: "Lord Jesus, I put on the Breastplate of Righteousness today. Thank You that I am the righteousness of God in Christ. I am not righteous by my works but by Your blood shed for me. Protect my heart from condemnation, guilt, and shame. When the accuser comes, remind me that there is no condemnation for those in Christ Jesus. Guard my heart from pride and self-righteousness. Let me walk in the righteousness You have given me, living holy because You are holy. Cover my heart with Your righteousness today. Amen.",
    practicalApplication: "When guilt or shame attack today, declare: 'I am the righteousness of God in Christ Jesus (2 Cor 5:21). I am justified by faith (Rom 5:1). There is no condemnation for me (Rom 8:1).' Stand firm in your identity.",
    category: 'defensive'
  },
  {
    id: 3,
    number: 3,
    name: "Shoes of Peace",
    imageName: "shoes",
    scripture: {
      reference: "Ephesians 6:15",
      text: "and with your feet fitted with the readiness that comes from the gospel of peace"
    },
    protectsAgainst: "Fear, anxiety, panic, instability, spiritual paralysis, and inability to advance",
    prayer: "Prince of Peace, I put on the Shoes of Peace today. Plant my feet on the solid rock of Christ. Give me the readiness to advance the Gospel wherever I go. Let me not be moved by fear, anxiety, or circumstances. You have given me a spirit not of fear but of power, love, and a sound mind. Establish my steps according to Your Word. Let me walk in Your peace that surpasses understanding. Make my feet swift to share the good news. I will not be shaken, for You are with me. Thank You for perfect peace as I keep my mind on You. Amen.",
    practicalApplication: "When anxiety rises today, stop and breathe. Declare: 'God has not given me a spirit of fear (2 Tim 1:7). The peace of Christ rules in my heart (Col 3:15).' Stand firm, don't retreat. You are equipped to advance.",
    category: 'defensive'
  },
  {
    id: 4,
    number: 4,
    name: "Shield of Faith",
    imageName: "shield",
    scripture: {
      reference: "Ephesians 6:16",
      text: "In addition to all this, take up the shield of faith, with which you can extinguish all the flaming arrows of the evil one"
    },
    protectsAgainst: "Doubt, unbelief, temptation, fiery darts, sudden attacks, and accusations against God's character",
    prayer: "Lord God, I take up the Shield of Faith today. Increase my faith to believe Your promises. When fiery darts come—thoughts of doubt, temptation, fear, or accusation—let this shield extinguish them all. I believe You are who You say You are. I believe Your Word is true. I believe Your promises are Yes and Amen in Christ. Strengthen my faith to trust You when I cannot see. Let my faith be a shield that protects me and a weapon that moves mountains. I walk by faith, not by sight. My faith is not in my strength but in Your faithfulness. Amen.",
    practicalApplication: "Today, when doubt or temptation strikes, lift your 'shield'—speak God's promises aloud. 'God is faithful (1 Cor 1:9). He who promised is faithful (Heb 10:23). He will not let me be tempted beyond what I can bear (1 Cor 10:13).'",
    category: 'defensive'
  },
  {
    id: 5,
    number: 5,
    name: "Helmet of Salvation",
    imageName: "helmet",
    scripture: {
      reference: "Ephesians 6:17a",
      text: "Take the helmet of salvation"
    },
    protectsAgainst: "Mental attacks, confusion, depression, despair, hopelessness, wrong thinking, and assaults on your assurance",
    prayer: "Savior and Lord, I put on the Helmet of Salvation today. Protect my mind, my thoughts, and my mental health. Guard me from depression, despair, and hopelessness. Remind me that my salvation is secure—sealed by the Holy Spirit, purchased by Christ's blood, guaranteed by the Father's promise. Renew my mind according to Your Word. Cast down every argument and pretension that sets itself against the knowledge of God. Take every thought captive to the obedience of Christ. Let the mind of Christ be in me. Cover my mind with the hope of salvation today. I am saved, I am being saved, and I will be saved. Amen.",
    practicalApplication: "Protect your mind today. Guard what you watch, read, and listen to. When negative or destructive thoughts come, replace them immediately with Scripture. 'Set your mind on things above (Col 3:2). Be transformed by the renewing of your mind (Rom 12:2).'",
    category: 'defensive'
  },
  {
    id: 6,
    number: 6,
    name: "Sword of the Spirit",
    imageName: "sword",
    scripture: {
      reference: "Ephesians 6:17b",
      text: "and the sword of the Spirit, which is the word of God"
    },
    protectsAgainst: "Every enemy attack (OFFENSIVE WEAPON) - used to attack darkness, speak truth, and advance God's kingdom",
    prayer: "Lord, I take up the Sword of the Spirit today—Your living and active Word. Sharpen my knowledge of Scripture. Help me to wield Your Word with precision and power. When the enemy attacks, let Your Word be my weapon. When I face temptation, let me respond as Jesus did: 'It is written.' Let Your Word dwell richly in me. Make me quick to speak Your truth, to declare Your promises, and to proclaim Your victory. Your Word is a lamp to my feet, a hammer that breaks rocks, a fire that purifies, and a sword that divides soul and spirit. Equip me to fight with Your Word today. Amen.",
    practicalApplication: "This is your offensive weapon! Speak Scripture aloud today. When attacked: quote God's Word. Memorize one verse this week. The enemy flees when you declare, 'It is written!' Use your sword—don't just carry it.",
    category: 'offensive'
  }
];

export default function ArmorOfGod() {
  const [currentPiece, setCurrentPiece] = useState<ArmorPiece>(armorPieces[0]);
  const [isPrayerMode, setIsPrayerMode] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [remainingTime, setRemainingTime] = useState(120); // 2 minutes per piece
  const [armoredPieces, setArmoredPieces] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [lastArmorDate, setLastArmorDate] = useState<string>('');

  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const contentTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load streak from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('armorStreak');
    const savedDate = localStorage.getItem('lastArmorDate');
    const today = new Date().toDateString();

    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedDate) {
      setLastArmorDate(savedDate);
      // Check if streak should continue or reset
      const lastDate = new Date(savedDate);
      const daysDiff = Math.floor((new Date(today).getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff > 1) {
        // Streak broken
        setStreak(0);
        localStorage.setItem('armorStreak', '0');
      }
    }
  }, []);

  // Update streak when all 6 pieces are armed
  useEffect(() => {
    if (armoredPieces.length === 6) {
      const today = new Date().toDateString();
      if (lastArmorDate !== today) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setLastArmorDate(today);
        localStorage.setItem('armorStreak', newStreak.toString());
        localStorage.setItem('lastArmorDate', today);
      }
    }
  }, [armoredPieces, lastArmorDate, streak]);

  const playBellSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(900, audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  };

  const handlePieceChange = (piece: ArmorPiece) => {
    setCurrentPiece(piece);
    setShowContent(false);

    if (contentTimerRef.current) {
      clearTimeout(contentTimerRef.current);
    }

    if (isPrayerMode) {
      playBellSound();
      contentTimerRef.current = setTimeout(() => {
        setShowContent(true);
      }, 2000);
    }

    setRemainingTime(120);

    // Mark piece as armed
    if (!armoredPieces.includes(piece.number)) {
      setArmoredPieces([...armoredPieces, piece.number]);
    }
  };

  const startDailyArmor = () => {
    setIsPrayerMode(true);
    setAutoAdvance(true);
    setCurrentPiece(armorPieces[0]);
    setArmoredPieces([]);
  };

  useEffect(() => {
    if (isPrayerMode) {
      playBellSound();

      setShowContent(false);
      contentTimerRef.current = setTimeout(() => {
        setShowContent(true);
      }, 2000);

      setRemainingTime(120);

      // Mark first piece as armed
      if (!armoredPieces.includes(currentPiece.number)) {
        setArmoredPieces([currentPiece.number]);
      }
    } else {
      setShowContent(false);
      setAutoAdvance(false);

      if (contentTimerRef.current) {
        clearTimeout(contentTimerRef.current);
      }
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }
    }
  }, [isPrayerMode]);

  // Auto-advance timer
  useEffect(() => {
    if (isPrayerMode && autoAdvance) {
      autoAdvanceTimerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setCurrentPiece((current) => {
              const nextIndex = current.number % armorPieces.length;
              const nextPiece = armorPieces[nextIndex];

              playBellSound();
              setShowContent(false);
              if (contentTimerRef.current) {
                clearTimeout(contentTimerRef.current);
              }
              contentTimerRef.current = setTimeout(() => {
                setShowContent(true);
              }, 2000);

              // Mark piece as armed
              if (!armoredPieces.includes(nextPiece.number)) {
                setArmoredPieces([...armoredPieces, nextPiece.number]);
              }

              return nextPiece;
            });
            return 120;
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
  }, [isPrayerMode, autoAdvance, armoredPieces]);

  const handleNext = () => {
    const nextIndex = currentPiece.number % armorPieces.length;
    handlePieceChange(armorPieces[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = currentPiece.number === 1 ? armorPieces.length - 1 : currentPiece.number - 2;
    handlePieceChange(armorPieces[prevIndex]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Header */}
      {!isPrayerMode && (
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-5">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-center">
              🛡️ Armor of God
            </h1>
            <p className="text-xl text-center text-slate-300">
              Put on the Full Armor - Stand Firm Against the Enemy
            </p>
            <p className="text-sm text-center text-slate-400 mt-2 italic">
              Ephesians 6:10-18
            </p>
          </div>
        </div>
      )}

      {/* Streak Tracker */}
      {!isPrayerMode && streak > 0 && (
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="bg-amber-500/20 border-2 border-amber-500 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">🔥</div>
            <div className="text-white font-bold text-lg">
              {streak} Day Streak!
            </div>
            <div className="text-amber-200 text-sm">
              You've armed up daily
            </div>
          </div>
        </div>
      )}

      {/* Main Selection Area */}
      {!isPrayerMode && (
        <div className="max-w-7xl mx-auto px-5 py-8">
          {/* Daily Armor Up Button */}
          <div className="text-center mb-8">
            <button
              onClick={startDailyArmor}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 rounded-xl font-bold text-2xl shadow-2xl transition-all hover:scale-105"
            >
              🛡️ Daily Armor Up - All 6 Pieces
            </button>
            <p className="text-gray-400 text-sm mt-3 italic">
              Auto-advance through all armor pieces (12 minutes)
            </p>
          </div>

          {/* Individual Armor Pieces */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Or Choose Individual Pieces
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {armorPieces.map((piece) => (
                <button
                  key={piece.id}
                  onClick={() => {
                    handlePieceChange(piece);
                    setIsPrayerMode(true);
                  }}
                  className={`p-6 rounded-xl text-left transition-all ${
                    armoredPieces.includes(piece.number)
                      ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white scale-105'
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl">
                      {piece.category === 'offensive' ? '⚔️' : '🛡️'}
                    </div>
                    {armoredPieces.includes(piece.number) && (
                      <div className="text-xl">✓</div>
                    )}
                  </div>
                  <div className="font-bold text-lg mb-1">{piece.name}</div>
                  <div className="text-xs opacity-75">{piece.scripture.reference}</div>
                </button>
              ))}
            </div>

            {/* Progress indicator */}
            {armoredPieces.length > 0 && (
              <div className="mt-6 text-center">
                <div className="text-white text-lg mb-2">
                  Progress: {armoredPieces.length} / 6 pieces
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${(armoredPieces.length / 6) * 100}%` }}
                  ></div>
                </div>
                {armoredPieces.length === 6 && (
                  <div className="text-green-400 font-bold mt-2 animate-pulse">
                    ✓ Fully Armed!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Prayer Mode - Full Screen */}
      {isPrayerMode && (
        <div className="fixed inset-0 z-50">
          <div className="h-screen relative">
            {/* Blurred Background Layer - Mobile only */}
            <div className="absolute inset-0 z-0 block md:hidden">
              <img
                src={`/images/armor/${currentPiece.imageName}_portrait.png`}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: 'blur(50px) brightness(0.3) saturate(0.5)', transform: 'scale(1.1)' }}
              />
            </div>

            {/* Main Image - Desktop */}
            <img
              src={`/images/armor/${currentPiece.imageName}.png`}
              alt={currentPiece.name}
              className="absolute inset-0 w-full h-full object-cover opacity-90 hidden md:block"
            />

            {/* Main Image - Mobile */}
            <img
              src={`/images/armor/${currentPiece.imageName}_portrait.png`}
              alt={currentPiece.name}
              className="absolute inset-0 w-full h-full object-contain opacity-95 block md:hidden z-5"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">

              {showContent && (
                <div className="max-w-3xl w-full animate-fade-in-slow">
                  {/* Title */}
                  <div className="text-center mb-6">
                    <div className="bg-black/70 backdrop-blur-md p-6 rounded-xl">
                      <div className="text-blue-400 text-sm font-semibold mb-2 tracking-wider uppercase">
                        Piece {currentPiece.number} of 6
                      </div>
                      <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
                        {currentPiece.name}
                      </h2>
                      <div className="text-gray-200 text-lg italic mb-2">
                        "{currentPiece.scripture.text}"
                      </div>
                      <div className="text-gray-400 text-sm">
                        {currentPiece.scripture.reference}
                      </div>
                    </div>
                  </div>

                  {/* Protects Against */}
                  <div className="bg-red-900/80 backdrop-blur-md border-2 border-red-500/50 rounded-lg p-4 mb-4">
                    <div className="text-red-200 font-bold text-sm mb-2">PROTECTS AGAINST:</div>
                    <div className="text-red-100 text-sm">{currentPiece.protectsAgainst}</div>
                  </div>

                  {/* Prayer */}
                  <div className="bg-black/70 backdrop-blur-md rounded-lg p-6 mb-4">
                    <div className="text-blue-300 font-bold mb-3">Prayer:</div>
                    <div className="text-gray-200 leading-relaxed text-sm">
                      {currentPiece.prayer}
                    </div>
                  </div>

                  {/* Practical Application */}
                  <div className="bg-green-900/80 backdrop-blur-md border-2 border-green-500/50 rounded-lg p-4">
                    <div className="text-green-200 font-bold text-sm mb-2">TODAY'S APPLICATION:</div>
                    <div className="text-green-100 text-sm">{currentPiece.practicalApplication}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <button
              onClick={() => setIsPrayerMode(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all"
            >
              ✕ Exit
            </button>

            <div className="absolute bottom-6 left-6">
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

            <div className="absolute bottom-6 right-6 flex gap-2">
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
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {armorPieces.map((piece) => (
                <div
                  key={piece.id}
                  className={`w-3 h-3 rounded-full transition-all ${
                    armoredPieces.includes(piece.number)
                      ? 'bg-green-500 scale-125'
                      : currentPiece.number === piece.number
                      ? 'bg-blue-500 scale-110'
                      : 'bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {!isPrayerMode && (
        <div className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <p className="text-gray-400 mb-4">
              "Be strong in the Lord and in his mighty power. Put on the full armor of God."
            </p>
            <p className="text-xs text-gray-500 mb-6">
              Ephesians 6:10-11
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

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
            filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
            filter: drop-shadow(0 0 40px rgba(59, 130, 246, 0.8));
          }
        }
        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
