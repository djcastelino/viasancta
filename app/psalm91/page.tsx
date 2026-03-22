'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Psalm91() {
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const psalmMusicRef = useRef<HTMLAudioElement | null>(null);
  const psalmMusicUrl = '/audio/background/psalm91.mp3';

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
          if (music.volume < 0.2) {
            music.volume = Math.min(music.volume + 0.01, 0.2);
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

  useEffect(() => {
    // Start music on mount
    startPsalmMusic();

    return () => {
      // Cleanup music on unmount
      if (psalmMusicRef.current) {
        psalmMusicRef.current.pause();
        psalmMusicRef.current = null;
      }
    };
  }, []);

  return (
    <main className="fixed inset-0 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Main Image - Desktop */}
      <img
        src="/images/psalm91/wings.png"
        alt="Psalm 91"
        className="absolute inset-0 w-full h-full object-cover hidden md:block opacity-60"
        onError={(e) => {
          console.log('Desktop image failed to load');
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Main Image - Mobile */}
      <img
        src="/images/psalm91/wings_portrait.png"
        alt="Psalm 91"
        className="absolute inset-0 w-full h-full object-cover block md:hidden opacity-60"
        onError={(e) => {
          console.log('Mobile image failed to load');
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Exit Button */}
      <Link
        href="/"
        className="fixed top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all"
      >
        ✕ Exit
      </Link>

      {/* Scrolling Content */}
      <div className="fixed inset-0 flex items-end justify-center overflow-hidden z-20">
        <div className="scroll-content w-full max-w-4xl px-8 text-center pb-8">
          <div className="space-y-16">
            {/* Title */}
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-serif drop-shadow-lg">
                Psalm 91
              </h1>
              <p className="text-2xl text-blue-300 italic">
                Security Under God's Protection
              </p>
              <p className="text-lg text-gray-300 mt-2">
                NABRE Translation
              </p>
            </div>

            {/* Psalm Verses */}
            <div className="text-white text-xl md:text-2xl leading-relaxed space-y-8 font-serif">
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">1</sup> You who dwell in the shelter of the Most High,<br />
                who abide in the shade of the Almighty,
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">2</sup> Say to the LORD, "My refuge and fortress,<br />
                my God in whom I trust."
              </p>

              <p className="drop-shadow-lg">
                <sup className="text-blue-300">3</sup> He will rescue you from the fowler's snare,<br />
                from the destroying plague,
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">4</sup> He will shelter you with his pinions,<br />
                and under his wings you may take refuge;<br />
                his faithfulness is a protecting shield.
              </p>

              <p className="drop-shadow-lg">
                <sup className="text-blue-300">5</sup> You shall not fear the terror of the night<br />
                nor the arrow that flies by day,
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">6</sup> Nor the pestilence that roams in darkness,<br />
                nor the plague that ravages at noon.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">7</sup> Though a thousand fall at your side,<br />
                ten thousand at your right hand,<br />
                near you it shall not come.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">8</sup> You need simply watch;<br />
                the punishment of the wicked you will see.
              </p>

              <p className="drop-shadow-lg">
                <sup className="text-blue-300">9</sup> Because you have the LORD for your refuge<br />
                and have made the Most High your stronghold,
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">10</sup> No evil shall befall you,<br />
                no affliction come near your tent.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">11</sup> For he commands his angels with regard to you,<br />
                to guard you wherever you go.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">12</sup> With their hands they shall support you,<br />
                lest you strike your foot against a stone.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">13</sup> You can tread upon the asp and the viper,<br />
                trample the lion and the dragon.
              </p>

              <p className="drop-shadow-lg">
                <sup className="text-blue-300">14</sup> Because he clings to me I will deliver him;<br />
                because he knows my name I will set him on high.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">15</sup> He will call upon me and I will answer;<br />
                I will be with him in distress;<br />
                I will deliver him and give him honor.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-300">16</sup> With length of days I will satisfy him,<br />
                and fill him with my saving power.
              </p>

              <div className="mt-24 text-3xl text-blue-200">
                ✝
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Music Prompt */}
      {showMusicPrompt && (
        <button
          onClick={startPsalmMusic}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600/90 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm transition-all shadow-lg animate-pulse"
        >
          🎵 Enable Background Music
        </button>
      )}

      {/* CSS for scrolling animation */}
      <style jsx>{`
        .scroll-content {
          animation: scroll-up 180s linear infinite;
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(100vh);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </main>
  );
}
