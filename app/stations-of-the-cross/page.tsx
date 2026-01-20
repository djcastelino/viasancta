'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import stations from '@/src/stations-of-the-cross.json';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

interface Station {
  id: number;
  number: number;
  title: string;
  location: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    description: string;
  };
  scripture: {
    reference: string;
    text: string;
  };
  meditation: string;
  prayer: string;
  historicalContext: string;
}

export default function StationsOfTheCross() {
  const [currentStation, setCurrentStation] = useState<Station>(stations[0] as Station);
  const [showText, setShowText] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const streetViewRef = useRef<HTMLDivElement>(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const panoramaRef = useRef<any>(null);

  // Music options
  const musicOptions = [
    'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
    'https://www.bensound.com/bensound-music/bensound-relaxing.mp3',
  ];

  // Initialize Google Maps Street View when maps loads and station changes
  useEffect(() => {
    if (mapsLoaded && streetViewRef.current && (window as any).google) {
      console.log('Initializing Street View for station:', currentStation.number, 'at', currentStation.location.lat, currentStation.location.lng);

      // Create or update panorama
      if (!panoramaRef.current) {
        panoramaRef.current = new (window as any).google.maps.StreetViewPanorama(
          streetViewRef.current,
          {
            position: { lat: currentStation.location.lat, lng: currentStation.location.lng },
            pov: { heading: 100, pitch: 0 },
            zoom: 1,
            addressControl: false,
            linksControl: true,
            panControl: true,
            enableCloseButton: false,
          }
        );
      } else {
        // Update existing panorama position
        panoramaRef.current.setPosition({
          lat: currentStation.location.lat,
          lng: currentStation.location.lng
        });
      }
    }
  }, [currentStation, mapsLoaded]);

  const handleStationChange = (station: Station) => {
    setCurrentStation(station);
    setShowText(false);
    setError('');
    if (isPlaying) {
      handleStop();
    }
  };

  const handleReadText = () => {
    setShowText(true);
  };

  const fadeInMusic = () => {
    if (!backgroundMusicRef.current) return;
    const music = backgroundMusicRef.current;
    const targetVolume = 0.08;
    const fadeInterval = setInterval(() => {
      if (music.volume < targetVolume - 0.01) {
        music.volume = Math.min(music.volume + 0.01, targetVolume);
      } else {
        music.volume = targetVolume;
        clearInterval(fadeInterval);
      }
    }, 100);
  };

  const fadeOutMusic = () => {
    if (!backgroundMusicRef.current) return;
    const music = backgroundMusicRef.current;
    const fadeInterval = setInterval(() => {
      if (music.volume > 0.01) {
        music.volume = Math.max(music.volume - 0.01, 0);
      } else {
        music.pause();
        music.volume = 0;
        clearInterval(fadeInterval);
      }
    }, 100);
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

  const handleListen = async () => {
    setError('');

    if (isPlaying) {
      handleStop();
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    try {
      setIsGeneratingAudio(true);
      setLoadingMessage('Preparing meditation...');

      // Get Azure credentials
      const azureKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const azureRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!azureKey || !azureRegion) {
        throw new Error('Azure Speech API credentials not configured');
      }

      const speechConfig = sdk.SpeechConfig.fromSubscription(azureKey, azureRegion);

      // Use Andrew (deeper, reverent voice)
      const voice = 'en-US-AndrewNeural';
      speechConfig.speechSynthesisVoiceName = voice;
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      // Build narration text
      const narrationText = `
        Station ${currentStation.number}: ${currentStation.title}.

        ${currentStation.historicalContext}

        Scripture: ${currentStation.scripture.reference}. ${currentStation.scripture.text}

        Meditation: ${currentStation.meditation}

        ${currentStation.prayer}
      `;

      // Create SSML for reverent narration
      const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
          <voice name="${voice}">
            <prosody rate="0.85" pitch="-3%">
              ${narrationText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </prosody>
          </voice>
        </speak>
      `;

      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

      const audioBlob: Blob = await new Promise((resolve, reject) => {
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
              reject(new Error(`Synthesis failed: ${result.errorDetails}`));
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
        if (backgroundMusicRef.current) {
          fadeOutMusic();
        }
      };

      audioElement.onerror = () => {
        setIsPlaying(false);
        audioRef.current = null;
        URL.revokeObjectURL(audioUrl);
        if (backgroundMusicRef.current) {
          fadeOutMusic();
        }
      };

      setIsGeneratingAudio(false);
      setLoadingMessage('');

      // Start background music
      const musicIndex = Math.floor(Math.random() * musicOptions.length);
      const bgMusic = new Audio(musicOptions[musicIndex]);
      backgroundMusicRef.current = bgMusic;
      bgMusic.loop = true;
      bgMusic.volume = 0;

      bgMusic.play().catch(err => console.log('Background music autoplay prevented'));
      fadeInMusic();

      await new Promise(resolve => setTimeout(resolve, 300));

      audioRef.current = audioElement;
      setIsPlaying(true);
      await audioElement.play();

    } catch (error) {
      setIsGeneratingAudio(false);
      setLoadingMessage('');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Failed to generate audio: ${errorMessage}`);
    }
  };

  const handleNext = () => {
    const nextIndex = currentStation.number % stations.length;
    setCurrentStation(stations[nextIndex] as Station);
    setShowText(false);
    if (isPlaying) handleStop();
  };

  const handlePrevious = () => {
    const prevIndex = currentStation.number === 1 ? stations.length - 1 : currentStation.number - 2;
    setCurrentStation(stations[prevIndex] as Station);
    setShowText(false);
    if (isPlaying) handleStop();
  };

  return (
    <>
      {/* Load Google Maps Script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        onLoad={() => {
          console.log('Google Maps loaded successfully');
          setMapsLoaded(true);
        }}
        onError={(e) => {
          console.error('Error loading Google Maps:', e);
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-center">
            ✝️ Stations of the Cross
          </h1>
          <p className="text-xl text-center text-purple-200">
            Walk the Via Dolorosa - The Way of Suffering
          </p>
        </div>
      </div>

      {/* Overview Map */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-5">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3387.1!d35.2343!d31.7798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ2JzQ3LjMiTiAzNcKwMTQnMDMuNSJF!5e0!3m2!1sen!2s!4v1234567890`}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {stations.map((station) => (
              <button
                key={station.id}
                onClick={() => handleStationChange(station as Station)}
                className={`w-10 h-10 rounded-full font-bold transition-all ${
                  currentStation.id === station.id
                    ? 'bg-yellow-500 text-gray-900 scale-125'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {station.number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Street View - Large Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
              <div
                ref={streetViewRef}
                className="w-full h-96 lg:h-[600px] bg-gray-700"
              >
                {/* Google Street View will load here */}
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <p className="text-xl mb-4">🗺️ Street View Loading...</p>
                    <p className="text-sm text-gray-400">
                      Requires Google Maps API key
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-900 text-white">
                <p className="text-sm">
                  📍 {currentStation.location.name}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {currentStation.location.description}
                </p>
              </div>
            </div>
          </div>

          {/* Station Content Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-2xl p-6 sticky top-4">
              <div className="text-center mb-4">
                <div className="inline-block bg-purple-900 text-white px-4 py-2 rounded-full font-bold mb-2">
                  Station {currentStation.number} of 14
                </div>
                <h2 className="text-2xl font-serif font-bold text-purple-900 mb-2">
                  {currentStation.title}
                </h2>
              </div>

              {/* Scripture */}
              <div className="mb-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-900">
                <p className="text-sm font-semibold text-purple-900 mb-2">
                  {currentStation.scripture.reference}
                </p>
                <p className="text-sm text-gray-700 italic">
                  "{currentStation.scripture.text}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleReadText}
                  disabled={isGeneratingAudio}
                  className="flex-1 bg-purple-900 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
                >
                  📖 Read
                </button>
                <button
                  onClick={handleListen}
                  disabled={isGeneratingAudio}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 ${
                    isPlaying
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-indigo-900 hover:bg-indigo-800 text-white'
                  }`}
                >
                  {isPlaying ? '⏹️ Stop' : '🔊 Listen'}
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Loading */}
              {isGeneratingAudio && (
                <div className="mb-4 text-center py-4">
                  <div className="flex justify-center gap-1 mb-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <p className="text-sm text-gray-600">{loadingMessage}</p>
                </div>
              )}

              {/* Text Content */}
              {showText && !isGeneratingAudio && (
                <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-bold text-purple-900 mb-2">Historical Context:</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {currentStation.historicalContext}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-900 mb-2">Meditation:</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {currentStation.meditation}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-300">
                    <p className="text-sm text-gray-700 italic">
                      {currentStation.prayer}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={handlePrevious}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-all"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-3 rounded-lg font-semibold transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <p className="text-gray-400 mb-4">
            "Were you there when they crucified my Lord?"
          </p>
          <a
            href="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all"
          >
            ← Back to Home
          </a>
        </div>
      </div>

      </main>
    </>
  );
}
