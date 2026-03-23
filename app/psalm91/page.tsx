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
        const music = psalmMusicRef.current;
        try {
          music.pause();
          music.currentTime = 0;
          music.volume = 0;
        } catch (e) {
          console.log('Error stopping music on unmount:', e);
        }
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
        className="absolute inset-0 w-full h-full object-cover hidden md:block opacity-70"
        onError={(e) => {
          console.log('Desktop image failed to load');
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Main Image - Mobile */}
      <img
        src="/images/psalm91/wings_portrait.png"
        alt="Psalm 91"
        className="absolute inset-0 w-full h-full object-cover block md:hidden opacity-70"
        onError={(e) => {
          console.log('Mobile image failed to load');
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Exit Button */}
      <Link
        href="/"
        className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all"
      >
        ✕ Exit
      </Link>

      {/* Scrolling Content */}
      <div className="fixed inset-0 flex items-end justify-center overflow-hidden z-20">
        <div className="scroll-content w-full max-w-4xl px-8 text-center pb-8">
          <div className="space-y-16">
            {/* Title */}
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 font-serif drop-shadow-lg">
                Psalm 91
              </h1>
              <p className="text-2xl text-gray-900 italic font-bold">
                God's Protection and Help
              </p>
            </div>

            {/* Psalm Verses */}
            <div className="text-black text-xl md:text-2xl leading-relaxed space-y-8 font-serif font-semibold">
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">1</sup> Whoever goes to the LORD for safety,<br />
                whoever remains under the protection of the Almighty,
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">2</sup> can say to him,<br />
                "You are my defender and protector.<br />
                You are my God; in you I trust."
              </p>

              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">3</sup> He will keep you safe from all hidden dangers<br />
                and from all deadly diseases.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">4</sup> He will cover you with his wings;<br />
                you will be safe in his care;<br />
                his faithfulness will protect and defend you.
              </p>

              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">5</sup> You need not fear any dangers at night<br />
                or sudden attacks during the day
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">6</sup> or the plagues that strike in the dark<br />
                or the evils that kill in daylight.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">7</sup> A thousand may fall dead beside you,<br />
                ten thousand all around you,<br />
                but you will not be harmed.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">8</sup> You will look and see<br />
                how the wicked are punished.
              </p>

              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">9</sup> You have made the LORD your defender,<br />
                the Most High your protector,
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">10</sup> and so no disaster will strike you,<br />
                no violence will come near your home.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">11</sup> God will put his angels in charge of you<br />
                to protect you wherever you go.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">12</sup> They will hold you up with their hands<br />
                to keep you from hurting your feet on the stones.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">13</sup> You will trample down lions and snakes,<br />
                fierce lions and poisonous snakes.
              </p>

              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">14</sup> God says, "I will save those who love me<br />
                and will protect those who acknowledge me as LORD.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">15</sup> When they call to me, I will answer them;<br />
                when they are in trouble, I will be with them.<br />
                I will rescue them and honor them.
              </p>
              <p className="drop-shadow-lg">
                <sup className="text-blue-700 font-bold">16</sup> I will reward them with long life;<br />
                I will save them."
              </p>

              <div className="mt-24 text-3xl text-blue-700 font-bold">
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
          animation: scroll-up 200s linear infinite;
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-150%);
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
