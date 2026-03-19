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
    currentSite?: string;
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
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true); // Default ON
  const [remainingTime, setRemainingTime] = useState(150); // 2.5 minutes in seconds

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const prayerMusicRef = useRef<HTMLAudioElement | null>(null);
  const bellSoundRef = useRef<HTMLAudioElement | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const meditationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Contemplative background music (royalty-free from Incompetech)
  // Music by Kevin MacLeod (incompetech.com)
  // Licensed under Creative Commons: By Attribution 4.0 License
  const musicOptions = [
    '/audio/background/contemplative-1.mp3',
    '/audio/background/contemplative-2.mp3',
  ];

  // Prayer Mode background music - Gregorian chant
  const prayerMusicUrl = '/audio/background/gregorian-chant.mp3';

  // Play soft bell sound
  const playBellSound = () => {
    // Create simple bell sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // C note
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  };

  const handleStationChange = (station: Station) => {
    setCurrentStation(station);
    setShowText(false);
    setShowMeditation(false);
    setError('');
    if (isPlaying) {
      handleStop();
    }

    // Reset meditation timer for new station
    if (meditationTimerRef.current) {
      clearTimeout(meditationTimerRef.current);
    }

    // In prayer mode, play bell and restart meditation reveal
    if (isPrayerMode) {
      playBellSound();
      meditationTimerRef.current = setTimeout(() => {
        setShowMeditation(true);
      }, 4000); // Show meditation after 4 seconds
    }

    // Reset auto-advance timer
    setRemainingTime(150);
  };

  // Handle Prayer Mode music
  const startPrayerMusic = () => {
    if (!prayerMusicRef.current) {
      const music = new Audio(prayerMusicUrl);
      music.loop = true;
      music.volume = 0;
      prayerMusicRef.current = music;

      // Fallback to contemplative-3.mp3 if gregorian chant not found
      music.addEventListener('error', () => {
        console.log('Gregorian chant not found, using fallback music');
        music.src = '/audio/background/contemplative-3.mp3';
        music.load();
      });

      music.play().then(() => {
        setShowMusicPrompt(false);
        // Fade in
        const fadeInterval = setInterval(() => {
          if (music.volume < 0.15) {
            music.volume = Math.min(music.volume + 0.01, 0.15);
          } else {
            clearInterval(fadeInterval);
          }
        }, 100);
      }).catch(err => {
        console.log('Prayer music autoplay prevented, showing prompt');
        setShowMusicPrompt(true);
      });
    }
  };

  useEffect(() => {
    if (isPrayerMode) {
      // Play bell sound when entering prayer mode
      playBellSound();

      // Start sequential text reveal
      setShowMeditation(false);
      meditationTimerRef.current = setTimeout(() => {
        setShowMeditation(true);
      }, 4000);

      // Try to start music automatically
      startPrayerMusic();

      // Reset timer
      setRemainingTime(150);
    } else {
      // Fade out and stop prayer music when exiting
      setShowMusicPrompt(false);
      setShowMeditation(false);

      // Clear timers
      if (meditationTimerRef.current) {
        clearTimeout(meditationTimerRef.current);
      }
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }

      if (prayerMusicRef.current) {
        const music = prayerMusicRef.current;
        const fadeInterval = setInterval(() => {
          if (music.volume > 0.01) {
            music.volume = Math.max(music.volume - 0.01, 0);
          } else {
            music.pause();
            music.currentTime = 0;
            prayerMusicRef.current = null;
            clearInterval(fadeInterval);
          }
        }, 100);
      }
    }
  }, [isPrayerMode]);

  // Auto-advance timer
  useEffect(() => {
    if (isPrayerMode && autoAdvance) {
      autoAdvanceTimerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            // Auto-advance to next station
            setCurrentStation((current) => {
              const nextIndex = current.number % stations.length;
              const nextStation = stations[nextIndex] as Station;

              // Play bell and reset meditation for new station
              playBellSound();
              setShowMeditation(false);
              if (meditationTimerRef.current) {
                clearTimeout(meditationTimerRef.current);
              }
              meditationTimerRef.current = setTimeout(() => {
                setShowMeditation(true);
              }, 4000);

              return nextStation;
            });
            return 150;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }
    };
  }, [isPrayerMode, autoAdvance]);

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


  const handleReadText = () => {
    setShowText(true);
  };

  const fadeInMusic = () => {
    if (!backgroundMusicRef.current) return;
    const music = backgroundMusicRef.current;
    const targetVolume = 0.15;
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
                  src={isPrayerMode && currentStation.number === 1
                    ? `/images/stations/prayer-mode/station_${currentStation.number}.png`
                    : `/images/stations/station_${currentStation.number}.png`
                  }
                  alt={`${currentStation.location.name}`}
                  className={`w-full h-full object-cover ${isPrayerMode && currentStation.number === 1 ? 'prayer-mode-zoom opacity-90' : isPrayerMode ? 'opacity-90' : ''}`}
                  style={isPrayerMode && currentStation.number === 1 ? { objectPosition: 'center 30%' } : {}}
                  onError={(e) => {
                    console.error('Failed to load station image');
                    setError('Station image unavailable');
                  }}
                />

                {/* Prayer Mode Overlay */}
                {isPrayerMode && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    {/* Glowing Cross */}
                    <div className="absolute top-8 left-8 z-30 pointer-events-none">
                      <div className="text-white/80 text-4xl animate-glow-pulse drop-shadow-lg">✝</div>
                    </div>

                    {/* Minimal Dark Overlay at Bottom - Appears after 4 seconds */}
                    {showMeditation && (
                      <div className="absolute bottom-0 left-0 right-0 text-center px-4 pb-4 z-30 animate-fade-in-slow">
                        <div className="bg-black/70 backdrop-blur-md p-4 max-w-3xl mx-auto">
                          <div className="text-purple-300 text-xs font-semibold mb-2 tracking-wider uppercase">
                            Station {currentStation.number} of 14
                          </div>
                          <h2 className="text-white text-xl md:text-2xl font-serif font-bold mb-3">
                            {currentStation.title}
                          </h2>

                          {/* Scripture - minimal */}
                          <div className="text-gray-200 text-sm md:text-base font-serif italic">
                            "{currentStation.scripture.text}"
                          </div>
                          <p className="text-gray-400 text-xs mt-1">
                            {currentStation.scripture.reference}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Prayer Mode Controls */}
                {isPrayerMode && (
                  <>
                    {/* Exit Button */}
                    <button
                      onClick={() => setIsPrayerMode(false)}
                      className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all pointer-events-auto"
                    >
                      ✕ Exit
                    </button>

                    {/* Control Panel - Bottom Left */}
                    <div className="absolute bottom-6 left-6 z-30 pointer-events-auto">
                      {/* Auto-Advance Toggle */}
                      <button
                        onClick={() => setAutoAdvance(!autoAdvance)}
                        className={`px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all shadow-lg ${
                          autoAdvance
                            ? 'bg-purple-600/90 hover:bg-purple-700/90 text-white'
                            : 'bg-white/90 hover:bg-white text-gray-700'
                        }`}
                        title="Auto-advance after 2.5 minutes"
                      >
                        {autoAdvance ? `⏱️ ${Math.floor(remainingTime / 60)}:${String(remainingTime % 60).padStart(2, '0')}` : '⏱️ Auto-Advance'}
                      </button>
                    </div>

                    {/* Navigation - Bottom Right */}
                    <div className="absolute bottom-6 right-6 z-30 flex gap-2 pointer-events-auto">
                      <button
                        onClick={handlePrevious}
                        className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full text-sm backdrop-blur-sm transition-all"
                        title="Previous station"
                      >
                        ←
                      </button>
                      <button
                        onClick={handleNext}
                        className="bg-purple-600/80 hover:bg-purple-700/80 text-white p-3 rounded-full text-sm backdrop-blur-sm transition-all"
                        title="Next station"
                      >
                        →
                      </button>
                    </div>
                  </>
                )}

                {/* Music Prompt (if autoplay blocked) */}
                {isPrayerMode && showMusicPrompt && (
                  <button
                    onClick={startPrayerMusic}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 bg-purple-600/90 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm transition-all pointer-events-auto shadow-lg animate-pulse"
                  >
                    🎵 Enable Background Music
                  </button>
                )}
              </div>

              {!isPrayerMode && (
                <div className="p-4 bg-gray-900 text-white">
                  <p className="text-xs text-gray-400">
                    {currentStation.location.description}
                  </p>
                  {currentStation.location.currentSite && (
                    <p className="text-xs text-purple-300 mt-2 italic">
                      🏛️ Today: {currentStation.location.currentSite}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Station Content Panel */}
          {!isPrayerMode && (
            <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-2xl p-6 flex flex-col h-full">
              <div className="flex-grow">
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
              </div>

              {/* Navigation */}
              <div className="flex gap-2 mt-auto pt-6">
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
          <p className="text-xs text-gray-500 mb-6">
            Images of the Via Dolorosa locations sourced from Google Earth.
            Map powered by Google Maps. Background music by Kevin MacLeod (incompetech.com)
            licensed under Creative Commons: By Attribution 4.0 License.
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

        @keyframes fade-in-slow {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 2s ease-out;
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.7;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.9);
          }
        }
        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        /* Prayer Mode - Slow Breathing Zoom Effect */
        .prayer-mode-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }

        @keyframes slow-zoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </>
  );
}
