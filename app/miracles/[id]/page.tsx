'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import miracles from '@/src/eucharistic-miracles.json';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import MiracleImageGallery from '@/app/components/MiracleImageGallery';

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
    // Prevent multiple concurrent audio generations
    if (isLoading) {
      console.log('⏳ Already loading, ignoring duplicate click');
      return;
    }

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

      // Now call Microsoft Azure Speech Services to convert text to speech
      const azureKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const azureRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!azureKey || !azureRegion) {
        throw new Error('Azure Speech API credentials not configured. Please check your environment variables.');
      }

      // Configure Azure Speech SDK
      const speechConfig = sdk.SpeechConfig.fromSubscription(azureKey, azureRegion);

      // Multiple natural voices for variety
      const voices = [
        { name: 'en-US-AndrewMultilingualNeural', displayName: 'Andrew', gender: 'Male' },
        { name: 'en-US-AvaMultilingualNeural', displayName: 'Ava', gender: 'Female' },
        { name: 'en-US-EricNeural', displayName: 'Eric', gender: 'Male' },
        { name: 'en-US-JennyMultilingualNeural', displayName: 'Jenny', gender: 'Female' },
      ];

      // Randomly select a voice for variety
      const selectedVoice = voices[Math.floor(Math.random() * voices.length)];
      console.log(`🎙️ Selected voice: ${selectedVoice.displayName} (${selectedVoice.gender})`);

      speechConfig.speechSynthesisVoiceName = selectedVoice.name;

      // Set audio format to MP3
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      // Set speaking rate (0.95 = slightly slower)
      const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
          <voice name="${selectedVoice.name}">
            <prosody rate="0.95">
              ${cleanNarration}
            </prosody>
          </voice>
        </speak>
      `;

      // Create synthesizer with null audio output (we'll handle audio manually)
      // Passing null prevents SDK from auto-playing - we want to control playback ourselves
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

      // Synthesize speech
      const audioBlob = await new Promise<Blob>((resolve, reject) => {
        synthesizer.speakSsmlAsync(
          ssml,
          (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              const audioData = result.audioData;
              const blob = new Blob([audioData], { type: 'audio/mp3' });
              synthesizer.close();
              resolve(blob);
            } else {
              synthesizer.close();
              reject(new Error(`Speech synthesis failed: ${result.errorDetails}`));
            }
          },
          (error) => {
            synthesizer.close();
            reject(new Error(`Azure TTS error: ${error}`));
          }
        );
      });

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

      // IMPORTANT: Clear loading state BEFORE playing audio
      // This prevents spinner showing while audio is playing
      setIsLoading(false);
      setLoadingMessage('');

      // Start background music first
      startBackgroundMusic();

      // Small delay to let background music start smoothly
      await new Promise(resolve => setTimeout(resolve, 300));

      // Now play narration with music already playing
      await audioElement.play();
      audioRef.current = audioElement;
      setIsPlaying(true);
    } catch (err: any) {
      setError(err.message || 'Failed to play narration');
      setIsLoading(false);
      setLoadingMessage('');
      console.error('Narration error:', err);
    }
  };

  const startBackgroundMusic = () => {
    if (!backgroundMusicRef.current) {
      // Multiple soothing ambient music options (royalty-free)
      const musicOptions = [
        'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
        'https://www.bensound.com/bensound-music/bensound-relaxing.mp3',
        'https://www.bensound.com/bensound-music/bensound-pianomoment.mp3',
      ];

      // Use first option (you can randomize or let user choose)
      const bgMusic = new Audio(musicOptions[0]);
      bgMusic.loop = true;
      bgMusic.volume = 0; // Start at 0 for fade-in
      bgMusic.preload = 'auto'; // Preload for smoother playback

      // Add error handler with fallback
      bgMusic.onerror = (e) => {
        console.log('Background music failed to load, trying fallback...');
        // Try next music option if available
        if (musicOptions.length > 1) {
          bgMusic.src = musicOptions[1];
          bgMusic.load();
        }
      };

      backgroundMusicRef.current = bgMusic;
    }

    const bgMusic = backgroundMusicRef.current;

    // Reset to start if already playing
    if (!bgMusic.paused) {
      bgMusic.pause();
    }
    bgMusic.currentTime = 0;
    bgMusic.volume = 0;

    // Try to play with user interaction context
    bgMusic.play()
      .then(() => {
        console.log('🎵 Background music started successfully');
        // Fade in to 10% volume (very soft, soothing)
        fadeInMusic(bgMusic, 0.10);
      })
      .catch(err => {
        console.log('Background music autoplay blocked (normal browser behavior)');
        // User needs to interact first - this is expected
      });
  };

  const fadeInMusic = (audio: HTMLAudioElement, targetVolume: number) => {
    const fadeInterval = setInterval(() => {
      if (audio.volume < targetVolume - 0.01) {
        audio.volume = Math.min(audio.volume + 0.01, targetVolume);
      } else {
        audio.volume = targetVolume;
        clearInterval(fadeInterval);
        console.log(`🎵 Background music faded in to ${Math.round(targetVolume * 100)}% volume`);
      }
    }, 100);
  };

  const fadeOutMusic = (audio: HTMLAudioElement) => {
    const fadeInterval = setInterval(() => {
      if (audio.volume > 0.01) {
        audio.volume = Math.max(audio.volume - 0.01, 0);
      } else {
        audio.pause();
        audio.volume = 0;
        clearInterval(fadeInterval);
        console.log('🎵 Background music faded out');
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

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${miracle.location.coordinates.lat},${miracle.location.coordinates.lng}`;

  // Sunrise/sunset landscapes for header (same as cards)
  const landscapes = [
    'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1200&q=80', // Golden sunrise over mountains
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Mountain sunrise
    'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?w=1200&q=80', // Sunset over hills
    'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=1200&q=80', // Sunrise meadow
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80', // Mountain peak sunrise
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1200&q=80', // Sunset lake reflection
    'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80', // Golden hour landscape
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&q=80', // Sunset field
  ];

  // Pick consistent landscape based on miracle ID
  const landscapeIndex = miracleId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % landscapes.length;
  const headerLandscape = landscapes[landscapeIndex];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5]">
      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-5 pt-8 pb-4">
        <Link href="/tours/eucharistic-miracles" className="text-gray-600 hover:text-[#D4AF37] text-sm font-semibold">
          ← Back to Eucharistic Miracles Tour
        </Link>
      </div>

      {/* Header with Landscape */}
      <section className="max-w-4xl mx-auto px-5 pb-8">
        <div className="relative min-h-[300px] rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Landscape */}
          <img
            src={headerLandscape}
            alt={`Sunrise/sunset landscape for ${miracle.name}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Content */}
          <div className="relative text-center text-white p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif drop-shadow-2xl">{miracle.name}</h1>
            <div className="flex items-center justify-center gap-4 text-lg">
              <span>{miracle.location.city}, {miracle.location.country}</span>
              <span>•</span>
              <span>{miracle.date.displayDate || miracle.date.year}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 py-12">
        {/* Audio Player */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#2C5F87] mb-6">🎧 Listen to the Story</h2>
          <p className="text-gray-600 mb-6">Hear the full account with professional AI narration and soothing background music</p>
          <p className="text-xs text-gray-500 mb-6">
            🎙️ Natural voices (Andrew, Ava, Eric, or Jenny) • 🎵 Ambient music at 10% volume
          </p>
          
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

        {/* Image Gallery */}
        <MiracleImageGallery images={miracle.images || []} miracleName={miracle.name} />

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

// Removed getCountryFlag function - no longer using flags

