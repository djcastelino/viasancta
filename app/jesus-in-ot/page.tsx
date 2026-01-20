'use client';

import { useEffect, useState, useRef } from 'react';
import SourceLinks from '@/app/components/SourceLinks';

interface JesusInOTEntry {
  id: number;
  dayOfYear: number;
  title: string;
  category: string;
  otBook: string;
  otReference: string;
  otText: string;
  historicalContext: string;
  howItPointsToJesus: string;
  keyInsights: string[];
  sources?: string[];
}

export default function JesusInOTPage() {
  const [todaysEntry, setTodaysEntry] = useState<JesusInOTEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Reflection states
  const [reflectionMode, setReflectionMode] = useState<'none' | 'text' | 'audio'>('none');
  const [reflectionText, setReflectionText] = useState('');
  const [isGeneratingReflection, setIsGeneratingReflection] = useState(false);
  const [reflectionError, setReflectionError] = useState('');

  // Audio states
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  // Background music options
  const musicOptions = [
    'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
    'https://www.bensound.com/bensound-music/bensound-relaxing.mp3',
    'https://www.bensound.com/bensound-music/bensound-pianomoment.mp3',
  ];

  useEffect(() => {
    const loadTodaysEntry = async () => {
      try {
        const response = await fetch('/jesus-in-ot.json');
        const entries: JesusInOTEntry[] = await response.json();

        // Calculate day of year (1-365)
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        // Find today's entry
        const entry = entries.find(e => e.dayOfYear === dayOfYear) || entries[0];
        setTodaysEntry(entry);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading Jesus in OT entry:', error);
        setIsLoading(false);
      }
    };

    loadTodaysEntry();
  }, []);

  // Handle Get Reflection button click
  const handleGetReflection = () => {
    setReflectionMode('text'); // Default to text mode
  };

  // Generate reflection text
  const handleGenerateReflectionText = async () => {
    if (!todaysEntry) return;

    setIsGeneratingReflection(true);
    setReflectionError('');
    setLoadingMessage('Generating reflection...');

    try {
      const response = await fetch('/api/jesus-ot-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entry: todaysEntry,
          includeAudio: false
        })
      });

      const data = await response.json();
      setReflectionText(data.reflectionText);
    } catch (error) {
      console.error('Error generating reflection:', error);
      setReflectionError('Failed to generate reflection. Please try again.');
    } finally {
      setIsGeneratingReflection(false);
      setLoadingMessage('');
    }
  };

  // Generate reflection with audio
  const handlePlayAudio = async () => {
    if (!todaysEntry) return;

    if (isPlaying && audioRef.current) {
      // Stop playback
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;

      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
        backgroundMusicRef.current.volume = 0;
      }

      setIsPlaying(false);
      setLoadingMessage('');
      return;
    }

    setIsGeneratingReflection(true);
    setReflectionError('');
    setLoadingMessage('Generating reflection...');

    try {
      const response = await fetch('/api/jesus-ot-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entry: todaysEntry,
          includeAudio: true
        })
      });

      const data = await response.json();

      if (!data.audioUrl) {
        setReflectionError('Audio generation failed. Please try again.');
        return;
      }

      setLoadingMessage('Creating audio...');

      // Create audio element
      const audio = new Audio(data.audioUrl);
      audioRef.current = audio;

      // Start background music
      const musicIndex = Math.floor(Math.random() * musicOptions.length);
      const bgMusic = new Audio(musicOptions[musicIndex]);
      backgroundMusicRef.current = bgMusic;
      bgMusic.loop = true;
      bgMusic.volume = 0;

      bgMusic.play().catch(err => {
        console.log('Background music autoplay prevented:', err);
      });

      // Fade in background music
      fadeInMusic();

      // Delay slightly before playing narration
      await new Promise(resolve => setTimeout(resolve, 300));

      // Play narration
      audio.play();
      setIsPlaying(true);
      setIsGeneratingReflection(false);
      setLoadingMessage('');

      // Handle audio end
      audio.onended = () => {
        fadeOutMusic();
        setIsPlaying(false);
      };

      audio.onerror = () => {
        setReflectionError('Audio playback failed.');
        setIsPlaying(false);
        if (backgroundMusicRef.current) {
          backgroundMusicRef.current.pause();
        }
      };

    } catch (error) {
      console.error('Error playing audio:', error);
      setReflectionError('Failed to play audio. Please try again.');
      setIsGeneratingReflection(false);
      setLoadingMessage('');
    }
  };

  // Fade in background music
  const fadeInMusic = () => {
    if (!backgroundMusicRef.current) return;

    const music = backgroundMusicRef.current;
    const targetVolume = 0.1; // 10% volume
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepDuration = duration / steps;
    const volumeStep = targetVolume / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      if (!music || currentStep >= steps) {
        clearInterval(interval);
        return;
      }
      music.volume = Math.min(volumeStep * currentStep, targetVolume);
      currentStep++;
    }, stepDuration);
  };

  // Fade out background music
  const fadeOutMusic = () => {
    if (!backgroundMusicRef.current) return;

    const music = backgroundMusicRef.current;
    const duration = 2000;
    const steps = 50;
    const stepDuration = duration / steps;
    const volumeStep = music.volume / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      if (!music || currentStep >= steps) {
        clearInterval(interval);
        if (music) {
          music.pause();
          music.currentTime = 0;
        }
        return;
      }
      music.volume = Math.max(music.volume - volumeStep, 0);
      currentStep++;
    }, stepDuration);
  };

  // Handle mode switch
  useEffect(() => {
    if (reflectionMode === 'text' && !reflectionText && !isGeneratingReflection) {
      handleGenerateReflectionText();
    }
  }, [reflectionMode]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6e3a6c]/5 via-[#2C5F87]/5 to-[#325847]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
          <p className="mt-4 text-gray-600">Loading today&apos;s entry...</p>
        </div>
      </div>
    );
  }

  if (!todaysEntry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6e3a6c]/5 via-[#2C5F87]/5 to-[#325847]/5 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p>No entry found for today.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#6e3a6c]/5 via-[#2C5F87]/5 to-[#325847]/5">
        <div className="max-w-5xl mx-auto px-5 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">📖</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] bg-clip-text text-transparent">
                Jesus in the Old Testament
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Day {todaysEntry.dayOfYear} of 365 • {todaysEntry.category}
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/20">
            {/* Title Section */}
            <div className="bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] text-white p-8 md:p-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                {todaysEntry.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                  {todaysEntry.otBook}
                </span>
                <span className="inline-block bg-[#D4AF37] px-4 py-2 rounded-full text-sm font-semibold">
                  {todaysEntry.otReference}
                </span>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-8 md:p-10 space-y-8">
              {/* Old Testament Text */}
              <section>
                <h3 className="text-xl font-bold text-[#2C5F87] mb-4 flex items-center gap-2">
                  <span>📜</span>
                  <span>The Scripture</span>
                </h3>
                <blockquote className="border-l-4 border-[#D4AF37] pl-6 py-2">
                  <p className="text-xl md:text-2xl text-gray-800 font-serif italic leading-relaxed">
                    &quot;{todaysEntry.otText}&quot;
                  </p>
                </blockquote>
              </section>

              {/* Historical Context */}
              <section className="bg-gradient-to-br from-[#6e3a6c]/5 to-[#2C5F87]/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>🏛️</span>
                  <span>Historical Context</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {todaysEntry.historicalContext}
                </p>
              </section>

              {/* How It Points to Jesus */}
              <section className="bg-gradient-to-br from-[#D4AF37]/10 to-[#8B4789]/10 rounded-2xl p-6 border-2 border-[#D4AF37]/30">
                <h3 className="text-xl font-bold text-[#6e3a6c] mb-3 flex items-center gap-2">
                  <span>✝️</span>
                  <span>How It Points to Jesus</span>
                </h3>
                <p className="text-gray-800 leading-relaxed">
                  {todaysEntry.howItPointsToJesus}
                </p>
              </section>

              {/* Key Insights */}
              <section>
                <h3 className="text-xl font-bold text-[#2C5F87] mb-4 flex items-center gap-2">
                  <span>💡</span>
                  <span>Key Insights</span>
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {todaysEntry.keyInsights.map((insight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 bg-gradient-to-r from-[#325847]/10 to-transparent rounded-lg p-4"
                    >
                      <span className="text-[#D4AF37] text-xl flex-shrink-0">✦</span>
                      <span className="text-gray-700 leading-relaxed">{insight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Sources & References */}
              {todaysEntry.sources && todaysEntry.sources.length > 0 && (
                <section className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-[#D4AF37]/30">
                  <h3 className="text-xl font-bold text-[#6e3a6c] mb-4 flex items-center gap-2">
                    <span>📚</span>
                    <span>Sources & References</span>
                  </h3>
                  <SourceLinks sources={todaysEntry.sources} />
                  <p className="text-xs text-gray-500 mt-4 italic">
                    References include Catechism of the Catholic Church (CCC), Sacred Scripture, Church Fathers, Doctors of the Church, and Magisterial documents. Click links to read more.
                  </p>
                </section>
              )}

              {/* Reflection Section */}
              <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-[#6e3a6c]/30">
                {reflectionMode === 'none' ? (
                  // Initial state - show Get Reflection button
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#6e3a6c] mb-3 flex items-center justify-center gap-2">
                      <span>💭</span>
                      <span>Deeper Reflection</span>
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Get a thoughtful theological reflection on this passage from a Catholic perspective
                    </p>
                    <button
                      onClick={handleGetReflection}
                      className="bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] hover:from-[#8B4789] hover:to-[#6e3a6c] text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      🎯 Get Reflection
                    </button>
                  </div>
                ) : (
                  // Reflection mode active - show toggle and content
                  <div>
                    <h3 className="text-xl font-bold text-[#6e3a6c] mb-4 flex items-center gap-2">
                      <span>💭</span>
                      <span>Theological Reflection</span>
                    </h3>

                    {/* Toggle Buttons */}
                    <div className="flex gap-2 mb-6 bg-white/50 rounded-full p-1 max-w-md mx-auto">
                      <button
                        onClick={() => setReflectionMode('text')}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                          reflectionMode === 'text'
                            ? 'bg-white text-[#6e3a6c] shadow-md'
                            : 'text-gray-600 hover:text-[#6e3a6c]'
                        }`}
                      >
                        <span>📖</span>
                        <span>Read Text</span>
                      </button>
                      <button
                        onClick={() => setReflectionMode('audio')}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                          reflectionMode === 'audio'
                            ? 'bg-white text-[#6e3a6c] shadow-md'
                            : 'text-gray-600 hover:text-[#6e3a6c]'
                        }`}
                      >
                        <span>🔊</span>
                        <span>Listen</span>
                      </button>
                    </div>

                    {/* Error Message */}
                    {reflectionError && (
                      <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {reflectionError}
                      </div>
                    )}

                    {/* Loading State */}
                    {isGeneratingReflection && (
                      <div className="text-center py-8">
                        <div className="flex justify-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <p className="text-gray-600 font-medium">{loadingMessage}</p>
                      </div>
                    )}

                    {/* Read Text Mode */}
                    {reflectionMode === 'text' && reflectionText && !isGeneratingReflection && (
                      <div className="bg-white rounded-xl p-6 shadow-inner">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
                          {reflectionText}
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                          <p className="text-xs text-gray-500 italic">
                            Reflection generated by Catholic theological AI
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Listen Mode */}
                    {reflectionMode === 'audio' && !isGeneratingReflection && (
                      <div className="text-center">
                        <button
                          onClick={handlePlayAudio}
                          disabled={isGeneratingReflection}
                          className={`${
                            isPlaying
                              ? 'bg-red-500 hover:bg-red-600'
                              : 'bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] hover:from-[#8B4789] hover:to-[#6e3a6c]'
                          } text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isPlaying ? '⏹️ Stop' : '🔊 Listen to Reflection'}
                        </button>
                        <p className="text-xs text-gray-500 mt-4 italic">
                          Narration with background music • 2-3 minutes
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* Call to Action */}
              <section className="text-center pt-6 border-t border-gray-200">
                <p className="text-gray-600 italic mb-4">
                  &quot;For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures.&quot;
                  <br />
                  <span className="text-sm text-[#D4AF37] font-semibold">— 1 Corinthians 15:3</span>
                </p>
              </section>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Come back tomorrow for a new discovery of Jesus in the Old Testament
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/"
                className="bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-md hover:shadow-xl"
              >
                ← Back to Home
              </a>
              <a
                href="/challenge"
                className="bg-[#6e3a6c] hover:bg-[#8B4789] text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-md hover:shadow-xl"
              >
                Daily Challenge 🎯
              </a>
            </div>
          </div>
        </div>
      </main>
  );
}
