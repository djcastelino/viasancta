'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import miracles from '@/src/eucharistic-miracles.json';

export default function MiraclePage({ params }: { params: Promise<{ id: string }> }) {
  const [miracleId, setMiracleId] = useState<string>('');
  const [miracle, setMiracle] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Unwrap params promise
    params.then(({ id }) => {
      setMiracleId(id);
      const found = miracles.find((m: any) => m.id === id);
      setMiracle(found);
    });
  }, [params]);

  const handlePlayNarration = async () => {
    if (isPlaying && audioRef.current) {
      // Clear event handlers first to prevent error messages
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      
      // Stop current playback
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to beginning
      audioRef.current = null;
      
      // Stop background music immediately
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
        backgroundMusicRef.current.volume = 0;
      }
      
      setIsPlaying(false);
      setLoadingMessage('');
      setError(''); // Clear any error messages
      return;
    }

    setIsLoading(true);
    setLoadingMessage('Generating narration...');
    setError('');

    try {
      // Call n8n to get narration text
      const response = await fetch('https://workflowly.online/webhook/via-sancta-narration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: 'eucharistic-miracles',
          stopId: miracle.id,
          tourType: 'Eucharistic Miracles',
          stopData: {
            name: miracle.name,
            location: miracle.location,
            date: miracle.date,
            description: miracle.description,
            narrative: miracle.narrative,
            scientificEvidence: miracle.scientificEvidence,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get narration from n8n');
      }

      const data = await response.json();
      
      if (!data.narration) {
        throw new Error('No narration received from n8n');
      }

      // Clean the narration: remove stage directions like [Soothing music fades out...]
      const cleanNarration = data.narration.replace(/\[.*?\]/g, '').trim();

      setLoadingMessage('Creating audio...');

      // Now call Google TTS to convert text to speech
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TTS_API_KEY;
      
      if (!apiKey) {
        throw new Error('Google TTS API key not configured. Please add NEXT_PUBLIC_GOOGLE_TTS_API_KEY to Vercel environment variables.');
      }

      const ttsResponse = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: cleanNarration },
            voice: {
              languageCode: 'en-US',
              name: data.voice || 'en-US-Neural2-J',
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: 0.95,
            },
          }),
        }
      );

      if (!ttsResponse.ok) {
        const errorData = await ttsResponse.json();
        throw new Error(`Google TTS error: ${errorData.error?.message || 'Failed to generate audio'}`);
      }

      const ttsData = await ttsResponse.json();
      
      // Create audio element and play
      const audioContent = ttsData.audioContent;
      const audioBlob = base64ToBlob(audioContent, 'audio/mp3');
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audioElement = new Audio(audioUrl);
      audioElement.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);
        
        // Fade out background music
        if (backgroundMusicRef.current) {
          fadeOutMusic(backgroundMusicRef.current);
        }
      };
      audioElement.onerror = () => {
        setError('Failed to play audio');
        setIsPlaying(false);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);
        
        // Stop background music on error
        if (backgroundMusicRef.current) {
          fadeOutMusic(backgroundMusicRef.current);
        }
      };
      
      // Start background music
      startBackgroundMusic();
      
      await audioElement.play();
      audioRef.current = audioElement;
      setIsPlaying(true);
    } catch (err: any) {
      setError(err.message || 'Failed to play narration');
      console.error('Narration error:', err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const startBackgroundMusic = () => {
    if (!backgroundMusicRef.current) {
      // Using a working royalty-free ambient music source
      // You can replace this with your own file at /public/audio/background-music.mp3
      const bgMusic = new Audio('https://www.bensound.com/bensound-music/bensound-slowmotion.mp3');
      bgMusic.loop = true;
      bgMusic.volume = 0; // Start at 0 for fade-in
      
      // Add error handler
      bgMusic.onerror = (e) => {
        console.error('Background music failed to load:', e);
        // Silently fail - narration will still work
      };
      
      backgroundMusicRef.current = bgMusic;
    }

    const bgMusic = backgroundMusicRef.current;
    bgMusic.currentTime = 0;
    bgMusic.play()
      .then(() => {
        console.log('Background music started successfully');
        // Fade in to 10% volume (very soft)
        fadeInMusic(bgMusic, 0.10);
      })
      .catch(err => {
        console.log('Background music autoplay prevented or failed:', err);
        // This is normal - some browsers block autoplay
      });
  };

  const fadeInMusic = (audio: HTMLAudioElement, targetVolume: number) => {
    const fadeInterval = setInterval(() => {
      if (audio.volume < targetVolume) {
        audio.volume = Math.min(audio.volume + 0.02, targetVolume);
      } else {
        clearInterval(fadeInterval);
      }
    }, 100);
  };

  const fadeOutMusic = (audio: HTMLAudioElement) => {
    const fadeInterval = setInterval(() => {
      if (audio.volume > 0.02) {
        audio.volume = Math.max(audio.volume - 0.02, 0);
      } else {
        audio.pause();
        audio.volume = 0;
        clearInterval(fadeInterval);
      }
    }, 100);
  };

  if (!miracle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5] flex items-center justify-center p-5">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2C5F87] mb-4">Miracle Not Found</h1>
          <Link href="/tours/eucharistic-miracles" className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f]">
            ← Back to Tour
          </Link>
        </div>
      </div>
    );
  }

  const countryFlag = getCountryFlag(miracle.location.country);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${miracle.location.coordinates.lat},${miracle.location.coordinates.lng}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5]">
      <header className="bg-gradient-to-br from-[#193d52] to-[#325847] text-white pt-12 pb-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/tours/eucharistic-miracles" className="text-white/80 hover:text-white text-sm">
              ← Back to Eucharistic Miracles Tour
            </Link>
          </div>
          <div className="text-center">
            <div className="text-8xl mb-4">{countryFlag}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{miracle.name}</h1>
            <div className="flex items-center justify-center gap-4 text-lg">
              <span>{miracle.location.city}, {miracle.location.country}</span>
              <span>•</span>
              <span>{miracle.date.displayDate || miracle.date.year}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-5 py-12">
        {/* Audio Player */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#2C5F87] mb-6">🎧 Listen to the Story</h2>
          <p className="text-gray-600 mb-6">Hear the full account of this miracle with AI-generated narration</p>
          
          <button
            onClick={handlePlayNarration}
            disabled={isLoading}
            className={`inline-flex items-center gap-3 px-12 py-4 rounded-full font-bold text-lg transition-all ${
              isPlaying ? 'bg-red-500 hover:bg-red-600' : isLoading ? 'bg-gray-400 cursor-wait' : 'bg-[#D4AF37] hover:bg-[#c49d2f] hover:scale-105'
            } text-white`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span> 
                {loadingMessage || 'Loading...'}
              </>
            ) : isPlaying ? (
              <>⏹️ Stop</>
            ) : (
              <>▶️ Play Narration</>
            )}
          </button>
          
          {isLoading && (
            <div className="mt-4 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2C5F87] mb-4">About This Miracle</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{miracle.description}</p>
        </div>

        {/* Full Narrative */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2C5F87] mb-4">The Story</h2>
          <p className="text-gray-700 leading-relaxed">{miracle.narrative}</p>
        </div>

        {/* Scientific Evidence */}
        {miracle.scientificEvidence && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#2C5F87] mb-4">🔬 Scientific Evidence</h2>
            <p className="text-gray-700 leading-relaxed">{miracle.scientificEvidence}</p>
          </div>
        )}

        {/* Significance */}
        {miracle.significance && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#2C5F87] mb-4">✝️ Spiritual Significance</h2>
            <p className="text-gray-700 leading-relaxed">{miracle.significance}</p>
          </div>
        )}

        {/* Location & Links */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-[#2C5F87] mb-6">📍 Location & Resources</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Address</h3>
              <p className="text-gray-600">{miracle.location.address}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold">
                🗺️ View on Google Maps
              </a>
              {miracle.wikiUrl && (
                <a href={miracle.wikiUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold">
                  📖 Read on Wikipedia
                </a>
              )}
            </div>
          </div>
          {miracle.tags && miracle.tags.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-gray-700 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {miracle.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-[#f5f5f0] text-gray-700 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link href="/tours/eucharistic-miracles" className="inline-block bg-[#2C5F87] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1f4a6b]">
            ← Back to All Miracles
          </Link>
        </div>
      </div>
    </main>
  );
}

function getCountryFlag(country: string): string {
  const flags: { [key: string]: string } = {
    'Argentina': '🇦🇷', 'Colombia': '🇨🇴', 'Netherlands': '🇳🇱', 'Italy': '🇮🇹',
    'Poland': '🇵🇱', 'France': '🇫🇷', 'Germany': '🇩🇪', 'Spain': '🇪🇸',
    'Portugal': '🇵🇹', 'Austria': '🇦🇹', 'Belgium': '🇧🇪', 'India': '🇮🇳',
    'Mexico': '🇲🇽', 'Venezuela': '🇻🇪',
  };
  return flags[country] || '🌍';
}

function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

