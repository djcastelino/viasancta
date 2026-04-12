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

      {/* Modal */}
      {selectedRelic && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header with Image */}
            <div className="relative h-80 rounded-t-3xl overflow-hidden">
              <img
                src={selectedRelic.images[0].url}
                alt={selectedRelic.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold">
                    {selectedRelic.type}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                    {selectedRelic.relatedTo}
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-2">{selectedRelic.name}</h2>
                <p className="text-white/90 text-lg">
                  {selectedRelic.location.church}
                </p>
                <p className="text-white/90">
                  {selectedRelic.location.city}, {selectedRelic.location.country}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Audio Tour Buttons */}
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-amber-100/50 p-6 rounded-xl border-2 border-[#D4AF37]/30">
                <h3 className="text-xl font-bold text-[#2C5F87] mb-4 flex items-center gap-2">
                  <span>🎧</span>
                  <span>Audio Tours</span>
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Listen to detailed narrations with soothing Gregorian chant background
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleListen('history')}
                    disabled={isGenerating}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                      currentSection === 'history' && isPlaying
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-[#2C5F87] hover:bg-[#1e4a5f] text-white'
                    } disabled:opacity-50`}
                  >
                    {currentSection === 'history' && isPlaying ? '⏹️ Stop' : '📜 History'}
                  </button>
                  <button
                    onClick={() => handleListen('description')}
                    disabled={isGenerating}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                      currentSection === 'description' && isPlaying
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-[#2C5F87] hover:bg-[#1e4a5f] text-white'
                    } disabled:opacity-50`}
                  >
                    {currentSection === 'description' && isPlaying ? '⏹️ Stop' : '📖 Description'}
                  </button>
                  <button
                    onClick={() => handleListen('studies')}
                    disabled={isGenerating}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                      currentSection === 'studies' && isPlaying
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-[#D4AF37] hover:bg-[#c49d2f] text-white'
                    } disabled:opacity-50`}
                  >
                    {currentSection === 'studies' && isPlaying ? '⏹️ Stop' : '🔬 Studies'}
                  </button>
                </div>
                {isGenerating && (
                  <p className="text-center text-sm text-gray-600 mt-3">
                    {loadingMessage}
                  </p>
                )}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-3 text-sm">
                    {error}
                  </div>
                )}
              </div>

              {/* Quick Facts */}
              <div className="bg-gradient-to-br from-[#f5f5f0] to-[#e8e8f5] p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#2C5F87] mb-4 flex items-center gap-2">
                  <span>💡</span>
                  <span>Quick Facts</span>
                </h3>
                <ul className="space-y-2">
                  {selectedRelic.quickFacts.map((fact: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#D4AF37] font-bold mt-1">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Origin & Discovery */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-gray-200 p-4 rounded-xl">
                  <h4 className="font-bold text-[#2C5F87] mb-2">Date of Origin</h4>
                  <p className="text-gray-700">{selectedRelic.dateOrigin}</p>
                </div>
                <div className="bg-white border-2 border-gray-200 p-4 rounded-xl">
                  <h4 className="font-bold text-[#2C5F87] mb-2">Date Discovered</h4>
                  <p className="text-gray-700">{selectedRelic.dateDiscovered}</p>
                </div>
              </div>

              {/* History */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>📜</span>
                  <span>History</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedRelic.history}</p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>📖</span>
                  <span>Description</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedRelic.description}</p>
              </div>

              {/* Scientific Studies */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>🔬</span>
                  <span>Scientific Studies</span>
                </h3>
                <ul className="space-y-2">
                  {selectedRelic.scientificStudies.map((study: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#D4AF37] font-bold mt-1">•</span>
                      <span>{study}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Veneration */}
              <div className="bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>🙏</span>
                  <span>Veneration</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedRelic.veneration}</p>
              </div>

              {/* Google Maps Link */}
              <div className="text-center">
                <a
                  href={selectedRelic.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  📍 View on Google Maps
                </a>
              </div>

              {/* Image Credit */}
              <p className="text-xs text-gray-400 text-center">
                Image: {selectedRelic.images[0].credit}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
