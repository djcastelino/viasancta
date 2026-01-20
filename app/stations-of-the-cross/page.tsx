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
  const [isPrayerMode, setIsPrayerMode] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  // Music options
  const musicOptions = [
    'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
    'https://www.bensound.com/bensound-music/bensound-relaxing.mp3',
  ];

  const handleStationChange = (station: Station) => {
    setCurrentStation(station);
    setShowText(false);
    setError('');
    if (isPlaying) {
      handleStop();
    }
  };

  // Initialize interactive Google Map with all station markers
  useEffect(() => {
    if (mapsLoaded && mapRef.current && (window as any).google && !googleMapRef.current) {
      console.log('Initializing Google Map...');
      const google = (window as any).google;

      // Create map centered on Via Dolorosa with custom styling
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 31.7798, lng: 35.2343 },
        zoom: 15,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      googleMapRef.current = map;
      console.log('Map created successfully');

      // Draw path line connecting all stations (the Via Dolorosa route)
      const pathCoordinates = stations.map(station => ({
        lat: station.location.lat,
        lng: station.location.lng
      }));

      const viaDolorosaPath = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#9333EA', // Purple to match theme
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: map,
      });

      // Add markers for all stations
      stations.forEach((station) => {
        const marker = new google.maps.Marker({
          position: { lat: station.location.lat, lng: station.location.lng },
          map: map,
          label: {
            text: station.number.toString(),
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
          },
          title: station.title,
        });

        // Make markers clickable
        marker.addListener('click', () => {
          handleStationChange(station as Station);
        });

        markersRef.current.push({ marker, stationId: station.id });
      });

      console.log('Map initialization complete with', stations.length, 'markers');
    }
  }, [mapsLoaded, handleStationChange]);

  // Update marker colors when current station changes
  useEffect(() => {
    if (googleMapRef.current && markersRef.current.length > 0) {
      const google = (window as any).google;

      markersRef.current.forEach(({ marker, stationId }) => {
        // Highlight current station in yellow, others in red
        marker.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: stationId === currentStation.id ? '#EAB308' : '#DC2626',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
        });
      });

      // Pan map to center on current station
      googleMapRef.current.panTo({
        lat: currentStation.location.lat,
        lng: currentStation.location.lng,
      });
    }
  }, [currentStation]);

  // Fix map display when exiting prayer mode
  useEffect(() => {
    if (!isPrayerMode && googleMapRef.current && mapsLoaded) {
      // Trigger map resize after prayer mode exits and DOM updates
      // Use multiple delays to ensure proper rendering
      const timeouts = [50, 150, 300].map(delay =>
        setTimeout(() => {
          const google = (window as any).google;
          if (google && google.maps && googleMapRef.current) {
            google.maps.event.trigger(googleMapRef.current, 'resize');
            // Re-center the map
            googleMapRef.current.setCenter({
              lat: currentStation.location.lat,
              lng: currentStation.location.lng,
            });
            googleMapRef.current.setZoom(15);
          }
        }, delay)
      );

      return () => timeouts.forEach(clearTimeout);
    }
  }, [isPrayerMode, currentStation, mapsLoaded]);

  // Generate Static Street View URL
  const getStreetViewImageUrl = (lat: number, lng: number) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const size = '800x600';
    const heading = 100; // Direction the camera is facing
    const pitch = 0; // Up/down angle
    const fov = 90; // Field of view

    return `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&fov=${fov}&key=${apiKey}`;
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
      {!isPrayerMode && (
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
      )}

      {/* Overview Map */}
      <div className={`bg-gray-800 py-4 transition-opacity duration-300 ${isPrayerMode ? 'hidden' : ''}`}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl">
            <div
              ref={mapRef}
              className="w-full"
              style={{ height: '300px' }}
            >
              {/* Interactive Google Map will load here */}
              {!mapsLoaded && (
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <p className="text-gray-600">Loading map...</p>
                </div>
              )}
            </div>
          </div>
          <div className="text-center mt-2 mb-4">
            <p className="text-sm text-gray-300">
              🗺️ The Via Dolorosa - Jesus' Path to Calvary
            </p>
            <p className="text-xs text-gray-400 mt-1">
              <span className="text-purple-400">━━ The Journey Path</span>
              <span className="ml-3 text-yellow-400">● Current Station</span>
              <span className="ml-3 text-red-400">● Other Stations</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Click any marker to jump to that station
            </p>
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
      <div className={`${isPrayerMode ? 'fixed inset-0 z-50' : 'max-w-7xl mx-auto px-5 py-8'}`}>
        <div className={`${isPrayerMode ? 'h-screen' : 'grid lg:grid-cols-3 gap-6'}`}>
          {/* Street View - Large Area */}
          <div className={isPrayerMode ? 'h-full relative' : 'lg:col-span-2'}>
            <div className={isPrayerMode ? 'h-full relative' : 'bg-gray-800 rounded-xl overflow-hidden shadow-2xl'}>
              <div className={`relative ${isPrayerMode ? 'h-full' : 'w-full h-96 lg:h-[600px]'} bg-gray-700`}>
                {/* Vignette overlay for prayer mode */}
                {isPrayerMode && (
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60 pointer-events-none z-10"></div>
                )}

                <img
                  src={getStreetViewImageUrl(currentStation.location.lat, currentStation.location.lng)}
                  alt={`Street View of ${currentStation.location.name}`}
                  className={`w-full h-full object-cover ${isPrayerMode ? 'opacity-90' : ''}`}
                  onError={(e) => {
                    console.error('Failed to load Street View image');
                    setError('Street View image unavailable for this location');
                  }}
                />

                {/* Prayer Mode Overlay */}
                {isPrayerMode && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                    <div className="text-center px-8 animate-fade-in">
                      <div className="text-white/90 text-sm font-semibold mb-3 tracking-wider uppercase">
                        Station {currentStation.number} of 14
                      </div>
                      <h2 className="text-white text-3xl md:text-5xl font-serif font-bold mb-4 drop-shadow-2xl">
                        {currentStation.title}
                      </h2>
                      <div className="text-white/80 text-lg md:text-xl font-serif italic max-w-2xl mx-auto drop-shadow-lg">
                        "{currentStation.scripture.text}"
                      </div>
                      <p className="text-white/70 text-sm mt-3">
                        {currentStation.scripture.reference}
                      </p>
                    </div>
                  </div>
                )}

                {/* Exit Prayer Mode Button */}
                {isPrayerMode && (
                  <button
                    onClick={() => setIsPrayerMode(false)}
                    className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all pointer-events-auto"
                  >
                    Exit Prayer Mode
                  </button>
                )}
              </div>

              {!isPrayerMode && (
                <div className="p-4 bg-gray-900 text-white">
                  <p className="text-sm">
                    📍 {currentStation.location.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {currentStation.location.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Station Content Panel */}
          {!isPrayerMode && (
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

              {/* Prayer Mode Button */}
              <button
                onClick={() => setIsPrayerMode(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all mb-4 shadow-lg"
              >
                🙏 Enter Prayer Mode
              </button>

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
          )}
        </div>
      </div>

      {/* Footer */}
      {!isPrayerMode && (
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
      )}

      </main>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </>
  );
}
