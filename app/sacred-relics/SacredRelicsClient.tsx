'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import RelicCard from '@/app/components/RelicCard';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

interface SacredRelicsClientProps {
  relics: any[];
  countries: string[];
  types: string[];
}

export default function SacredRelicsClient({ relics, countries, types }: SacredRelicsClientProps) {
  const searchParams = useSearchParams();
  const isPreviewMode = searchParams.get('preview') === 'true';

  const [selectedRelic, setSelectedRelic] = useState<any>(null);
  const [todaysFeaturedRelic, setTodaysFeaturedRelic] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');
  const [currentSection, setCurrentSection] = useState<'history' | 'description' | 'studies' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  // Gregorian chant for sacred relics
  const musicOptions = [
    '/audio/background/gregorian-chant.mp3',
  ];

  // Calculate today's featured relic
  useEffect(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Rotate through relics based on day of year
    const relicIndex = (dayOfYear - 1) % relics.length;
    const featuredRelic = relics[relicIndex];

    setTodaysFeaturedRelic(featuredRelic);
  }, [relics]);

  const handleCardClick = (relic: any) => {
    setSelectedRelic(relic);
  };

  const handleCloseModal = () => {
    // Stop audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (backgroundMusicRef.current) {
      fadeOutMusic();
    }
    setIsPlaying(false);
    setCurrentSection(null);
    setError('');
    setSelectedRelic(null);
  };

  const handleListen = async (section: 'history' | 'description' | 'studies') => {
    if (!selectedRelic) return;

    setError('');

    // If already playing, stop
    if (isPlaying) {
      handleStop();
      return;
    }

    // Force cleanup
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    try {
      setIsGenerating(true);
      setCurrentSection(section);
      setLoadingMessage('Generating audio...');

      // Get the text content based on section
      let textContent = '';
      let sectionTitle = '';

      if (section === 'history') {
        textContent = selectedRelic.history;
        sectionTitle = 'History';
      } else if (section === 'description') {
        textContent = selectedRelic.description;
        sectionTitle = 'Description';
      } else if (section === 'studies') {
        textContent = "Scientific Studies: " + selectedRelic.scientificStudies.join('. ');
        sectionTitle = 'Scientific Studies';
      }

      // Azure TTS
      const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!speechKey || !speechRegion) {
        throw new Error('Azure Speech credentials not configured');
      }

      const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
      speechConfig.speechSynthesisVoiceName = 'en-US-AndrewNeural'; // Professional voice for relics
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="en-US-AndrewNeural">
          <prosody rate="0.92">
            ${textContent}
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

            startBackgroundMusic();

            audioElement.play();
            setIsPlaying(true);
            setIsGenerating(false);
            setLoadingMessage('');

            audioElement.onended = () => {
              setIsPlaying(false);
              setCurrentSection(null);
              fadeOutMusic();
            };
          } else {
            throw new Error('Speech synthesis failed');
          }

          synthesizer.close();
        },
        error => {
          console.error('Speech synthesis error:', error);
          setError('Failed to generate audio');
          setIsGenerating(false);
          setLoadingMessage('');
          setCurrentSection(null);
          synthesizer.close();
        }
      );

    } catch (error) {
      setIsGenerating(false);
      setLoadingMessage('');
      setCurrentSection(null);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Failed to generate audio: ${errorMessage}`);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (backgroundMusicRef.current) {
      fadeOutMusic();
    }
    setIsPlaying(false);
    setCurrentSection(null);
  };

  const startBackgroundMusic = () => {
    if (!backgroundMusicRef.current) {
      const bgMusic = new Audio(musicOptions[0]);
      bgMusic.loop = true;
      bgMusic.volume = 0;
      backgroundMusicRef.current = bgMusic;

      bgMusic.play().catch(console.error);

      // Fade in to 12% volume (subtle background)
      let volume = 0;
      const fadeIn = setInterval(() => {
        if (volume < 0.12) {
          volume += 0.01;
          bgMusic.volume = Math.min(volume, 0.12);
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }
  };

  const fadeOutMusic = () => {
    if (backgroundMusicRef.current) {
      const bgMusic = backgroundMusicRef.current;
      let volume = bgMusic.volume;

      const fadeOut = setInterval(() => {
        if (volume > 0.01) {
          volume -= 0.01;
          bgMusic.volume = Math.max(volume, 0);
        } else {
          clearInterval(fadeOut);
          bgMusic.pause();
          bgMusic.currentTime = 0;
          backgroundMusicRef.current = null;
        }
      }, 50);
    }
  };

  if (!todaysFeaturedRelic && !isPreviewMode) {
    return null;
  }

  // PREVIEW MODE - Show all relics (secret admin view)
  if (isPreviewMode) {
    return (
      <>
        <section className="max-w-7xl mx-auto px-5 pb-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-red-600 px-6 py-2 rounded-full text-white font-bold text-sm mb-4">
              🔒 PREVIEW MODE - Admin Only
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F87] mb-3 font-serif">
              All {relics.length} Sacred Relics Preview
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4">
              This view is only visible with the ?preview=true URL parameter
            </p>
            <p className="text-sm text-gray-500">
              Regular users will only see one relic per day
            </p>
          </div>

          {/* All Relics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relics.map((relic: any) => (
              <div key={relic.id}>
                <div className="text-xs text-gray-500 mb-2 text-center">
                  Relic #{relic.id} - Day {relic.id}
                </div>
                <RelicCard
                  relic={relic}
                  onClick={() => handleCardClick(relic)}
                />
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  // NORMAL MODE - Show only today's featured relic
  return (
    <>
      {/* Today's Featured Relic - ONLY THIS ONE */}
      <section className="max-w-7xl mx-auto px-5 pb-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-amber-700 to-yellow-700 px-6 py-2 rounded-full text-white font-bold text-sm mb-4">
            TODAY'S FEATURED RELIC
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C5F87] mb-3 font-serif">
            Discover One Sacred Relic Daily
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience a different sacred relic each day. Explore its history, scientific studies, and veneration with audio tours.
          </p>
        </div>

        {/* Featured Relic Card */}
        <div className="max-w-2xl mx-auto">
          <RelicCard
            relic={todaysFeaturedRelic}
            onClick={() => handleCardClick(todaysFeaturedRelic)}
          />
        </div>

        {/* Come Back Tomorrow Message */}
        <div className="text-center mt-8 p-6 bg-gradient-to-br from-[#f5f5f0] to-[#e8e8f5] rounded-2xl max-w-2xl mx-auto">
          <p className="text-lg text-gray-700 mb-2">
            <span className="text-2xl mr-2">✨</span>
            <strong>Come back tomorrow</strong> for another sacred relic
          </p>
          <p className="text-sm text-gray-600">
            Each day features a different relic from our collection of {relics.length} treasures of faith
          </p>
        </div>
      </section>

      {/* Modal - will add in next step */}
    </>
  );
}
