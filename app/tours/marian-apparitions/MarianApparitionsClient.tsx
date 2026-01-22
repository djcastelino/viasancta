'use client';

import { useState, useMemo, useRef } from 'react';
import ApparitionCard from '@/app/components/ApparitionCard';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

interface MarianApparitionsClientProps {
  apparitions: any[];
  countries: string[];
}

export default function MarianApparitionsClient({ apparitions, countries }: MarianApparitionsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedApparition, setSelectedApparition] = useState<any>(null);
  const [showNarration, setShowNarration] = useState(false);
  const [narrationText, setNarrationText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  // Voice rotation - different voice for each apparition
  const voices = [
    { name: 'en-US-AndrewNeural', displayName: 'Andrew' },
    { name: 'en-US-BrianNeural', displayName: 'Brian' },
    { name: 'en-US-ChristopherNeural', displayName: 'Christopher' },
    { name: 'en-US-EricNeural', displayName: 'Eric' },
    { name: 'en-US-SteffanNeural', displayName: 'Steffan' },
    { name: 'en-US-RogerNeural', displayName: 'Roger' },
  ];

  // Background music
  const musicOptions = [
    'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
    'https://www.bensound.com/bensound-music/bensound-relaxing.mp3',
  ];

  // Filter apparitions
  const filteredApparitions = useMemo(() => {
    return apparitions.filter((apparition) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          apparition.name?.toLowerCase().includes(query) ||
          apparition.location.city.toLowerCase().includes(query) ||
          apparition.location.country.toLowerCase().includes(query) ||
          apparition.year.toString().includes(query);

        if (!matchesSearch) return false;
      }

      if (selectedCountry && apparition.location.country !== selectedCountry) {
        return false;
      }

      return true;
    });
  }, [apparitions, searchQuery, selectedCountry]);

  const handleCardClick = (apparition: any) => {
    setSelectedApparition(apparition);
    setShowNarration(false);
    setNarrationText('');
    setError('');
  };

  const handleCloseModal = () => {
    if (isPlaying) {
      handleStop();
    }
    setSelectedApparition(null);
    setShowNarration(false);
    setNarrationText('');
    setError('');
  };

  const handleReadText = () => {
    if (!selectedApparition) return;

    // Just display the story text from the apparition data
    setNarrationText(selectedApparition.story);
    setShowNarration(true);
  };

  const handleListen = async () => {
    if (!selectedApparition) return;

    setError('');

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
      setLoadingMessage('Generating narration...');

      const response = await fetch('/api/marian-apparition-narration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apparition: selectedApparition })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      setNarrationText(data.narrationText);

      setLoadingMessage('Generating audio...');

      // Azure TTS
      const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!speechKey || !speechRegion) {
        throw new Error('Azure Speech credentials not configured');
      }

      // Select voice based on apparition ID
      const voiceIndex = selectedApparition.id % 6;
      const selectedVoice = voices[voiceIndex];
      console.log(`🎙️ Selected voice: ${selectedVoice.displayName} for apparition ${selectedApparition.id}`);

      const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
      speechConfig.speechSynthesisVoiceName = selectedVoice.name;
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="${selectedVoice.name}">
          <prosody rate="0.95">
            ${data.narrationText}
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
          synthesizer.close();
        }
      );

    } catch (error) {
      setIsGenerating(false);
      setLoadingMessage('');
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
  };

  const startBackgroundMusic = () => {
    if (!backgroundMusicRef.current) {
      const bgMusic = new Audio(musicOptions[0]);
      bgMusic.loop = true;
      bgMusic.volume = 0;
      backgroundMusicRef.current = bgMusic;

      bgMusic.play().catch(console.error);

      let volume = 0;
      const fadeIn = setInterval(() => {
        if (volume < 0.15) {
          volume += 0.01;
          bgMusic.volume = Math.min(volume, 0.15);
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
              placeholder="Search by name, location, or year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Country Filter */}
          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {(searchQuery || selectedCountry) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCountry('');
                }}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Apparitions Grid */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        {filteredApparitions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApparitions.map((apparition: any) => (
              <ApparitionCard
                key={apparition.id}
                apparition={apparition}
                onClick={() => handleCardClick(apparition)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No apparitions found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('');
              }}
              className="bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedApparition && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedApparition.name}</h2>
                  <p className="text-white/90">
                    {selectedApparition.location.city}, {selectedApparition.location.country} • {selectedApparition.year}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleReadText}
                  disabled={isGenerating}
                  className="flex-1 bg-[#2C5F87] hover:bg-[#1e4a5f] text-white px-6 py-3 rounded-full font-semibold disabled:opacity-50 transition-colors"
                >
                  {isGenerating && !isPlaying ? loadingMessage : 'Read Story'}
                </button>
                <button
                  onClick={handleListen}
                  disabled={isGenerating}
                  className="flex-1 bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-6 py-3 rounded-full font-semibold disabled:opacity-50 transition-colors"
                >
                  {isPlaying ? 'Stop Audio' : isGenerating ? loadingMessage : 'Listen'}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Narration Text */}
              {showNarration && narrationText && (
                <div className="bg-[#f5f5f0] p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-[#2C5F87] mb-4">Tour Narration</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {narrationText}
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#2C5F87] mb-2">Visionaries</h3>
                  <p className="text-gray-700">{selectedApparition.visionaries.join(', ')}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#2C5F87] mb-2">Key Messages</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    {selectedApparition.keyMessages.map((msg: string, i: number) => (
                      <li key={i}>{msg}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#2C5F87] mb-2">Miracles & Signs</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    {selectedApparition.miracles.map((miracle: string, i: number) => (
                      <li key={i}>{miracle}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#2C5F87] mb-2">Church Approval</h3>
                  <p className="text-gray-700">{selectedApparition.churchApproval}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#2C5F87] mb-2">The Story</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedApparition.story}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#2C5F87] mb-2">Shrine Today</h3>
                  <p className="text-gray-700">{selectedApparition.shrine}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
