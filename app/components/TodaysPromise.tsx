'use client';

import { useState, useRef } from 'react';
import promises from '@/src/daily-promises.json';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

interface DailyPromise {
  id: number;
  verse: string;
  reference: string;
  testament: string;
  category: string;
  speaker: string;
}

function getTodaysPromise(): DailyPromise | null {
  const today = new Date();

  // Use day-of-year to cycle through promises
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = dayOfYear % promises.length;
  const todaysPromise = promises[index] as DailyPromise;

  return todaysPromise || null;
}

export default function TodaysPromise() {
  const promise = getTodaysPromise();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  if (!promise) {
    return null;
  }

  const startBackgroundMusic = () => {
    if (!backgroundMusicRef.current) {
      // Multiple soothing ambient music options (royalty-free)
      const musicOptions = [
        'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
        'https://www.bensound.com/bensound-music/bensound-relaxing.mp3',
        'https://www.bensound.com/bensound-music/bensound-pianomoment.mp3',
      ];

      const bgMusic = new Audio(musicOptions[0]);
      bgMusic.loop = true;

      bgMusic.onerror = () => {
        console.log('First background music failed, trying next option...');
        if (musicOptions[1]) {
          const bgMusic2 = new Audio(musicOptions[1]);
          bgMusic2.loop = true;
          bgMusic2.volume = 0;
          backgroundMusicRef.current = bgMusic2;
          bgMusic2.play().catch(() => console.log('All background music options failed'));
        }
      };

      backgroundMusicRef.current = bgMusic;
    }

    const bgMusic = backgroundMusicRef.current;
    if (bgMusic.paused) {
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

  const handleStop = () => {
    if (isPlayingAudio && audioRef.current) {
      // Stop current playback
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;

      // Stop background music
      if (backgroundMusicRef.current) {
        fadeOutMusic(backgroundMusicRef.current);
      }

      setIsPlayingAudio(false);
      setLoadingMessage('');
    }
  };

  const handlePlayNarration = async () => {
    setError('');

    // If already playing, stop
    if (isPlayingAudio) {
      handleStop();
      return;
    }

    // Prevent multiple concurrent requests
    if (loadingAudio) {
      console.log('⏳ Already loading, ignoring duplicate click');
      return;
    }

    try {
      setLoadingAudio(true);
      setLoadingMessage('Generating narration...');
      console.log('🎙️ Generating promise narration script...');

      // Call the promise narration API to get the script text
      const response = await fetch('/api/promise-narration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promise }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const script = data.script;
      console.log('✅ Received narration script from API');

      setLoadingMessage('Creating audio...');

      // Get Azure credentials
      const azureKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const azureRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!azureKey || !azureRegion) {
        throw new Error('Azure Speech API credentials not configured');
      }

      // Configure Azure Speech SDK
      const speechConfig = sdk.SpeechConfig.fromSubscription(azureKey, azureRegion);

      // Select voice based on promise ID (rotate through 4 voices)
      const voices = [
        { name: 'en-US-AndrewMultilingualNeural', displayName: 'Andrew' },
        { name: 'en-US-AvaMultilingualNeural', displayName: 'Ava' },
        { name: 'en-US-EricNeural', displayName: 'Eric' },
        { name: 'en-US-JennyNeural', displayName: 'Jenny' },
      ];

      const voiceIndex = promise.id % 4;
      const selectedVoice = voices[voiceIndex];
      console.log(`🎙️ Selected voice: ${selectedVoice.displayName} for promise ${promise.id}`);

      speechConfig.speechSynthesisVoiceName = selectedVoice.name;
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      // Set speaking rate (0.95 = slightly slower for meditation)
      const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
          <voice name="${selectedVoice.name}">
            <prosody rate="0.95">
              ${script}
            </prosody>
          </voice>
        </speak>
      `;

      // Synthesize speech
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, undefined);

      const audioBlob: Blob = await new Promise((resolve, reject) => {
        synthesizer.speakSsmlAsync(
          ssml,
          (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              console.log('✅ Azure TTS synthesis completed');
              const audioData = result.audioData;
              const blob = new Blob([audioData], { type: 'audio/mp3' });
              synthesizer.close();
              resolve(blob);
            } else {
              console.error('❌ Speech synthesis failed:', result.errorDetails);
              synthesizer.close();
              reject(new Error(`Speech synthesis failed: ${result.errorDetails}`));
            }
          },
          (error) => {
            console.error('❌ Azure TTS error:', error);
            synthesizer.close();
            reject(new Error(`Azure TTS error: ${error}`));
          }
        );
      });

      console.log('🎵 Audio blob created, size:', audioBlob.size, 'bytes');

      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);

      audioElement.onended = () => {
        setIsPlayingAudio(false);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);

        // Fade out background music
        if (backgroundMusicRef.current) {
          fadeOutMusic(backgroundMusicRef.current);
        }
      };

      audioElement.onerror = () => {
        console.error('Failed to play audio');
        setIsPlayingAudio(false);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);

        // Stop background music on error
        if (backgroundMusicRef.current) {
          fadeOutMusic(backgroundMusicRef.current);
        }
      };

      // Clear loading state BEFORE playing
      setLoadingAudio(false);
      setLoadingMessage('');

      // Start background music first
      startBackgroundMusic();

      // Small delay to let background music start smoothly
      await new Promise(resolve => setTimeout(resolve, 300));

      // Start playback
      audioRef.current = audioElement;
      setIsPlayingAudio(true);
      console.log('▶️ Starting playback with promise narration...');
      await audioElement.play();
      console.log('🎶 Audio is now playing');

    } catch (error) {
      console.error('❌ Error generating audio:', error);
      setLoadingAudio(false);
      setLoadingMessage('');

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Failed to generate audio: ${errorMessage}`);
      console.error('💥 Full error details:', errorMessage);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-5 py-16 relative z-20">
      <div className="bg-gradient-to-br from-[#6e3a6c]/10 via-[#2C5F87]/10 to-[#325847]/10 rounded-3xl shadow-xl p-8 md:p-12 border border-[#D4AF37]/20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl">📖</span>
            <h2 className="text-3xl font-serif font-bold text-[#2C5F87]">
              Today&apos;s Promise
            </h2>
          </div>

          {/* Promise Text */}
          <blockquote className="mb-6">
            <p className="text-2xl md:text-3xl text-gray-800 font-serif leading-relaxed italic">
              &quot;{promise.verse}&quot;
            </p>
          </blockquote>

          {/* Reference */}
          <div className="flex flex-col items-center gap-3">
            <div className="inline-block bg-[#D4AF37] text-white px-6 py-2 rounded-full font-semibold shadow-md">
              {promise.reference}
            </div>

            {/* Audio Player Button */}
            <div className="mt-4">
              {error && (
                <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {!isPlayingAudio && !loadingAudio && (
                <button
                  onClick={handlePlayNarration}
                  className="bg-[#6e3a6c] hover:bg-[#8B4789] text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Listen to Reflection
                </button>
              )}

              {loadingAudio && (
                <div className="text-gray-500 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="animate-bounce">⏳</span>
                    <span>{loadingMessage}</span>
                  </div>
                  <div className="flex justify-center gap-1 mt-2">
                    <span className="inline-block w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="inline-block w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="inline-block w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              {isPlayingAudio && (
                <button
                  onClick={handleStop}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  ⏹️ Stop
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
