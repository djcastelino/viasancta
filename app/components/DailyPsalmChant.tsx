'use client';

import { useState, useRef } from 'react';
import psalms from '@/src/daily-psalms.json';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

interface DailyPsalm {
  id: number;
  psalmNumber: number;
  title: string;
  verses: string[];
  reference: string;
  theme: string;
}

function getTodaysPsalm(): DailyPsalm | null {
  const today = new Date();

  // Use day-of-year to cycle through psalms
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = dayOfYear % psalms.length;
  const todaysPsalm = psalms[index] as DailyPsalm;

  return todaysPsalm || null;
}

export default function DailyPsalmChant() {
  const psalm = getTodaysPsalm();
  const [isPlayingChant, setIsPlayingChant] = useState(false);
  const [loadingChant, setLoadingChant] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const isProcessingRef = useRef(false);

  if (!psalm) {
    return null;
  }

  const startBackgroundMusic = () => {
    if (!backgroundMusicRef.current) {
      // Use slower, more meditative music for Psalm chanting
      const musicOptions = [
        'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
        'https://www.bensound.com/bensound-music/bensound-relaxing.mp3',
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

    bgMusic.play()
      .then(() => {
        console.log('🎵 Background music started');
        // Fade in to 8% volume (even softer for chant)
        fadeInMusic(bgMusic, 0.08);
      })
      .catch(err => {
        console.log('Background music autoplay blocked');
      });
  };

  const fadeInMusic = (audio: HTMLAudioElement, targetVolume: number) => {
    const fadeInterval = setInterval(() => {
      if (audio.volume < targetVolume - 0.01) {
        audio.volume = Math.min(audio.volume + 0.01, targetVolume);
      } else {
        audio.volume = targetVolume;
        clearInterval(fadeInterval);
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
      }
    }, 100);
  };

  const handleStop = () => {
    if (isPlayingChant && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;

      if (backgroundMusicRef.current) {
        fadeOutMusic(backgroundMusicRef.current);
      }

      setIsPlayingChant(false);
      setLoadingMessage('');
    }
  };

  const handlePlayChant = async () => {
    setError('');

    if (isPlayingChant) {
      handleStop();
      return;
    }

    if (isProcessingRef.current || loadingChant) {
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    isProcessingRef.current = true;

    try {
      setLoadingChant(true);
      setLoadingMessage('Preparing chant...');
      console.log('🎵 Generating Psalm chant...');

      // Get Azure credentials
      const azureKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const azureRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!azureKey || !azureRegion) {
        throw new Error('Azure Speech API credentials not configured');
      }

      // Configure Azure Speech SDK
      const speechConfig = sdk.SpeechConfig.fromSubscription(azureKey, azureRegion);

      // Use Andrew (deeper, more reverent voice for Gregorian-style chant)
      const voice = 'en-US-AndrewNeural';
      console.log(`🎙️ Using voice: Andrew (reverent tone)`);

      speechConfig.speechSynthesisVoiceName = voice;
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      // Build Psalm text with pauses between verses (chant-style)
      const psalmText = psalm.verses.join(' ');

      // Create SSML for Gregorian-style chant
      // - Very slow rate (0.80 = 20% slower)
      // - Slightly lower pitch for reverent tone
      // - Pauses between verses
      const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
          <voice name="${voice}">
            <prosody rate="0.80" pitch="-5%">
              ${psalm.verses.map(verse =>
                `${verse.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}<break time="800ms"/>`
              ).join('')}
            </prosody>
          </voice>
        </speak>
      `;

      // Synthesize speech
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

      const audioBlob: Blob = await new Promise((resolve, reject) => {
        synthesizer.speakSsmlAsync(
          ssml,
          (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              console.log('✅ Psalm chant synthesis completed');
              const audioData = result.audioData;
              const blob = new Blob([audioData], { type: 'audio/mp3' });
              synthesizer.close();
              resolve(blob);
            } else {
              console.error('❌ Chant synthesis failed:', result.errorDetails);
              synthesizer.close();
              reject(new Error(`Synthesis failed: ${result.errorDetails}`));
            }
          },
          (error) => {
            console.error('❌ Azure TTS error:', error);
            synthesizer.close();
            reject(new Error(`Azure TTS error: ${error}`));
          }
        );
      });

      console.log('🎵 Chant audio created, size:', audioBlob.size, 'bytes');

      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);

      audioElement.onended = () => {
        setIsPlayingChant(false);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);

        if (backgroundMusicRef.current) {
          fadeOutMusic(backgroundMusicRef.current);
        }
      };

      audioElement.onerror = () => {
        console.error('Failed to play chant');
        setIsPlayingChant(false);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);

        if (backgroundMusicRef.current) {
          fadeOutMusic(backgroundMusicRef.current);
        }
      };

      setLoadingChant(false);
      setLoadingMessage('');

      // Start background music
      startBackgroundMusic();

      // Small delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Start playback
      audioRef.current = audioElement;
      setIsPlayingChant(true);
      console.log('▶️ Starting Psalm chant...');
      await audioElement.play();
      console.log('🎶 Chant is now playing');

      isProcessingRef.current = false;

    } catch (error) {
      console.error('❌ Error generating chant:', error);
      setLoadingChant(false);
      setLoadingMessage('');
      isProcessingRef.current = false;

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Failed to generate chant: ${errorMessage}`);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-5 py-16 relative z-20">
      <div className="bg-gradient-to-br from-purple-900/10 via-indigo-900/10 to-blue-900/10 rounded-3xl shadow-xl p-8 md:p-12 border border-purple-300/20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl">🎵</span>
            <h2 className="text-3xl font-serif font-bold text-purple-900">
              Daily Psalm Chant
            </h2>
          </div>

          <p className="text-purple-700 mb-6 text-lg italic">
            {psalm.theme}
          </p>

          {/* Psalm Text */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6 border border-purple-200">
            <div className="mb-4">
              <h3 className="text-2xl font-serif font-bold text-purple-900 mb-2">
                Psalm {psalm.psalmNumber}
              </h3>
              <p className="text-lg text-purple-800 italic">{psalm.title}</p>
            </div>

            <div className="space-y-3 text-left max-w-2xl mx-auto">
              {psalm.verses.map((verse, index) => (
                <p key={index} className="text-gray-800 leading-relaxed text-lg">
                  {verse}
                </p>
              ))}
            </div>
          </div>

          {/* Reference */}
          <div className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md mb-6">
            {psalm.reference}
          </div>

          {/* Chant Player Button */}
          <div className="mt-6">
            {error && (
              <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {!isPlayingChant && !loadingChant && (
              <button
                onClick={handlePlayChant}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
              >
                🎧 Listen to Gregorian-Style Chant
              </button>
            )}

            {loadingChant && (
              <div className="text-gray-600 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-bounce">⏳</span>
                  <span>{loadingMessage}</span>
                </div>
                <div className="flex justify-center gap-1 mt-2">
                  <span className="inline-block w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="inline-block w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="inline-block w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}

            {isPlayingChant && (
              <button
                onClick={handleStop}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
              >
                ⏹️ Stop Chant
              </button>
            )}

            <p className="text-xs text-purple-600 mt-4 italic">
              Experience the ancient tradition of chanted Psalms
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
