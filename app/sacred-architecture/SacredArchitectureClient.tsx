'use client';

import { useState, useMemo, useRef } from 'react';
import ChurchCard from '@/app/components/ChurchCard';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

interface SacredArchitectureClientProps {
  churches: any[];
  countries: string[];
  styles: string[];
}

export default function SacredArchitectureClient({ churches, countries, styles }: SacredArchitectureClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedChurch, setSelectedChurch] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');
  const [currentSection, setCurrentSection] = useState<'history' | 'architecture' | 'funFacts' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  // Contemplative organ music for churches
  const musicOptions = [
    '/audio/background/gregorian-chant.mp3',
  ];

  // Filter churches
  const filteredChurches = useMemo(() => {
    return churches.filter((church) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          church.name?.toLowerCase().includes(query) ||
          church.location.city.toLowerCase().includes(query) ||
          church.location.country.toLowerCase().includes(query) ||
          church.architectureStyle.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      if (selectedCountry && church.location.country !== selectedCountry) {
        return false;
      }

      if (selectedStyle && !church.architectureStyle.includes(selectedStyle)) {
        return false;
      }

      return true;
    });
  }, [churches, searchQuery, selectedCountry, selectedStyle]);

  const handleCardClick = (church: any) => {
    setSelectedChurch(church);
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
    setSelectedChurch(null);
  };

  const handleListen = async (section: 'history' | 'architecture' | 'funFacts') => {
    if (!selectedChurch) return;

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
        textContent = selectedChurch.history;
        sectionTitle = 'History';
      } else if (section === 'architecture') {
        textContent = selectedChurch.architecture;
        sectionTitle = 'Architecture';
      } else if (section === 'funFacts') {
        textContent = "Did you know? " + selectedChurch.quickFacts.join('. ');
        sectionTitle = 'Fun Facts';
      }

      // Azure TTS
      const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!speechKey || !speechRegion) {
        throw new Error('Azure Speech credentials not configured');
      }

      const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
      speechConfig.speechSynthesisVoiceName = 'en-US-AndrewNeural'; // Professional male voice for architecture
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

  return (
    <>
      {/* Search and Filter */}
      <section className="max-w-7xl mx-auto px-5 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search by name, location, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="">All Countries</option>
              {countries.sort().map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="">All Styles</option>
              {styles.sort().map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>

            {(searchQuery || selectedCountry || selectedStyle) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCountry('');
                  setSelectedStyle('');
                }}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600 text-center">
            Showing {filteredChurches.length} {filteredChurches.length === 1 ? 'church' : 'churches'}
          </p>
        </div>
      </section>

      {/* Churches Grid */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        {filteredChurches.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChurches.map((church: any) => (
              <ChurchCard
                key={church.id}
                church={church}
                onClick={() => handleCardClick(church)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No churches found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('');
                setSelectedStyle('');
              }}
              className="bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedChurch && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header with Image */}
            <div className="relative h-80 rounded-t-3xl overflow-hidden">
              <img
                src={selectedChurch.images[0].url}
                alt={selectedChurch.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-4xl font-bold mb-2">{selectedChurch.name}</h2>
                <p className="text-white/90 text-lg">
                  {selectedChurch.location.city}, {selectedChurch.location.country} • {selectedChurch.built}
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
                  Listen to detailed narrations about this magnificent church
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
                    onClick={() => handleListen('architecture')}
                    disabled={isGenerating}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                      currentSection === 'architecture' && isPlaying
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-[#2C5F87] hover:bg-[#1e4a5f] text-white'
                    } disabled:opacity-50`}
                  >
                    {currentSection === 'architecture' && isPlaying ? '⏹️ Stop' : '🏛️ Architecture'}
                  </button>
                  <button
                    onClick={() => handleListen('funFacts')}
                    disabled={isGenerating}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                      currentSection === 'funFacts' && isPlaying
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-[#D4AF37] hover:bg-[#c49d2f] text-white'
                    } disabled:opacity-50`}
                  >
                    {currentSection === 'funFacts' && isPlaying ? '⏹️ Stop' : '💡 Fun Facts'}
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
                  <span>⚡</span>
                  <span>Did You Know?</span>
                </h3>
                <ul className="space-y-2">
                  {selectedChurch.quickFacts.map((fact: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#D4AF37] font-bold mt-1">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Style & Architects */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-gray-200 p-4 rounded-xl">
                  <h4 className="font-bold text-[#2C5F87] mb-2">Architecture Style</h4>
                  <p className="text-gray-700">{selectedChurch.architectureStyle}</p>
                </div>
                <div className="bg-white border-2 border-gray-200 p-4 rounded-xl">
                  <h4 className="font-bold text-[#2C5F87] mb-2">Architects</h4>
                  <p className="text-gray-700">{selectedChurch.architects.join(', ')}</p>
                </div>
              </div>

              {/* History */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>📜</span>
                  <span>History</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedChurch.history}</p>
              </div>

              {/* Architecture */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>🏛️</span>
                  <span>Architecture</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedChurch.architecture}</p>
              </div>

              {/* Notable Art */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>🎨</span>
                  <span>Notable Art & Features</span>
                </h3>
                <ul className="space-y-2">
                  {selectedChurch.notableArt.map((art: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#D4AF37] font-bold mt-1">•</span>
                      <span>{art}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visit Info */}
              <div className="bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>ℹ️</span>
                  <span>Visitor Information</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedChurch.visitInfo}</p>
              </div>

              {/* Google Maps Link */}
              <div className="text-center">
                <a
                  href={selectedChurch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  📍 View on Google Maps
                </a>
              </div>

              {/* Image Credit */}
              <p className="text-xs text-gray-400 text-center">
                Image: {selectedChurch.images[0].credit}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
