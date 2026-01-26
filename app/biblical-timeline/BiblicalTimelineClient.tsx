'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SourceLinks from '@/app/components/SourceLinks';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

interface KeyFigure {
  name: string;
  description: string;
}

interface AudioSection {
  id: string;
  title: string;
  voice: string;
  duration: number;
  script: string;
}

interface BiblicalPeriod {
  id: number;
  name: string;
  timeframe: string;
  color: string;
  keyFigures: (string | KeyFigure)[];  // Support both old and new format
  majorEvents: string[];
  biblicalBooks: string[];
  keyScriptures: string[];
  cccReferences: string[];
  sources: string[];
  theologicalSignificance: string;
  narrativeSummary: string;
  audioSections?: AudioSection[];
}

export default function BiblicalTimelineClient() {
  const [periods, setPeriods] = useState<BiblicalPeriod[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<BiblicalPeriod | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [backgroundMusicElement, setBackgroundMusicElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch('/biblical-timeline.json')
      .then(res => res.json())
      .then(data => {
        setPeriods(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading biblical timeline:', error);
        setIsLoading(false);
      });
  }, []);

  const startBackgroundMusic = () => {
    if (!backgroundMusicElement) {
      const bgMusic = new Audio('https://www.bensound.com/bensound-music/bensound-slowmotion.mp3');
      bgMusic.loop = true;
      bgMusic.volume = 0;
      setBackgroundMusicElement(bgMusic);

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
    if (backgroundMusicElement) {
      let volume = backgroundMusicElement.volume;

      const fadeOut = setInterval(() => {
        if (volume > 0.01) {
          volume -= 0.01;
          backgroundMusicElement.volume = Math.max(volume, 0);
        } else {
          clearInterval(fadeOut);
          backgroundMusicElement.pause();
          backgroundMusicElement.currentTime = 0;
          setBackgroundMusicElement(null);
        }
      }, 50);
    }
  };

  const playAudio = async (audioSection: AudioSection) => {
    // Stop current audio if playing
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }

    // Generate audio using Azure Speech SDK
    try {
      const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION || 'eastus';

      if (!speechKey) {
        console.error('Azure Speech Key not configured');
        alert('Azure Speech service not configured. Please add NEXT_PUBLIC_AZURE_SPEECH_KEY to your environment.');
        return;
      }

      const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
      speechConfig.speechSynthesisVoiceName = audioSection.voice;
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

      setPlayingAudio(audioSection.id);

      const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
          <voice name="${audioSection.voice}">
            ${audioSection.script}
          </voice>
        </speak>
      `;

      synthesizer.speakSsmlAsync(
        ssml,
        result => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            const audioBlob = new Blob([result.audioData], { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);

            setAudioElement(audio);

            audio.onended = () => {
              setPlayingAudio(null);
              setAudioElement(null);
              URL.revokeObjectURL(audioUrl);
            };

            audio.play();
            startBackgroundMusic();
          } else {
            console.error('Speech synthesis failed:', result.errorDetails);
            alert('Failed to generate audio. Please try again.');
            setPlayingAudio(null);
          }
          synthesizer.close();
        },
        error => {
          console.error('Error during speech synthesis:', error);
          alert('Failed to play audio. Please try again.');
          setPlayingAudio(null);
          synthesizer.close();
        }
      );
    } catch (error) {
      console.error('Error playing audio:', error);
      alert('Failed to play audio. Please try again.');
      setPlayingAudio(null);
    }
  };

  const stopAudio = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setAudioElement(null);
      setPlayingAudio(null);
    }
    if (backgroundMusicElement) {
      fadeOutMusic();
    }
  };

  const closeModal = () => {
    stopAudio();
    setSelectedPeriod(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Biblical Timeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">Biblical Timeline</h1>
            <p className="text-2xl text-purple-200 italic">From Adam to King of Kings</p>
          </div>
          <p className="text-lg text-center max-w-3xl mx-auto leading-relaxed">
            Journey through salvation history as God's redemptive plan unfolds across 12 key periods.
            From Creation's beauty to the Fall's tragedy, from patriarchs' faith to prophets' promises,
            from Christ's victory to the Church's mission—discover how every chapter points to Jesus,
            the King of Kings.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="relative">
          {/* Vertical timeline connector */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-300 via-purple-400 to-purple-500"></div>

          {/* Period Cards */}
          <div className="space-y-8">
            {periods.map((period, index) => (
              <div
                key={period.id}
                className={`relative ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto md:text-left'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg z-10"
                     style={{ backgroundColor: period.color }}></div>

                {/* Period Card */}
                <div
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer border-l-4"
                  style={{ borderLeftColor: period.color }}
                  onClick={() => setSelectedPeriod(period)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-2"
                           style={{ backgroundColor: period.color }}>
                        {period.timeframe}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{period.name}</h3>
                    </div>
                    <div className="text-3xl font-bold text-gray-300">#{period.id}</div>
                  </div>

                  <div className="space-y-2 text-left">
                    <div>
                      <span className="font-semibold text-gray-700">Key Figures:</span>
                      <p className="text-gray-600 text-sm">
                        {period.keyFigures.map(f => typeof f === 'string' ? f : f.name).join(', ')}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Major Events:</span>
                      <p className="text-gray-600 text-sm">{period.majorEvents.slice(0, 3).join(' • ')}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm italic text-gray-600">"{period.narrativeSummary}"</p>
                  </div>

                  <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    Explore This Period →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="text-center py-12">
        <Link
          href="/"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Modal */}
      {selectedPeriod && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => closeModal()}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 p-6 border-b border-gray-200"
                 style={{ background: `linear-gradient(135deg, ${selectedPeriod.color} 0%, ${selectedPeriod.color}dd 100%)` }}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-white text-sm font-semibold mb-1 opacity-90">
                    Period #{selectedPeriod.id} • {selectedPeriod.timeframe}
                  </div>
                  <h2 className="text-3xl font-bold text-white">{selectedPeriod.name}</h2>
                </div>
                <button
                  onClick={() => closeModal()}
                  className="text-white hover:text-gray-200 text-3xl font-bold leading-none ml-4"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Narrative Summary */}
              <div className="bg-purple-50 border-l-4 p-4 rounded"
                   style={{ borderLeftColor: selectedPeriod.color }}>
                <p className="text-gray-700 italic leading-relaxed">
                  {selectedPeriod.narrativeSummary}
                </p>
              </div>

              {/* Audio Tour */}
              {selectedPeriod.audioSections && selectedPeriod.audioSections.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">🎧</span> Audio Tour
                  </h3>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 space-y-3">
                    {selectedPeriod.audioSections.map((audio) => (
                      <div
                        key={audio.id}
                        className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{audio.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {Math.floor(audio.duration / 60)}:{(audio.duration % 60).toString().padStart(2, '0')} minutes
                            </p>
                          </div>
                          <button
                            onClick={() => playingAudio === audio.id ? stopAudio() : playAudio(audio)}
                            className="ml-4 px-4 py-2 rounded-full font-semibold text-white transition-colors flex items-center gap-2"
                            style={{ backgroundColor: selectedPeriod.color }}
                          >
                            {playingAudio === audio.id ? (
                              <>
                                <span>⏸</span>
                                <span>Stop</span>
                              </>
                            ) : (
                              <>
                                <span>▶</span>
                                <span>Play</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="text-xs text-gray-600 text-center pt-2 border-t border-gray-200">
                      💡 Audio generated using Azure AI Text-to-Speech
                    </div>
                  </div>
                </div>
              )}

              {/* Key Figures */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">👥</span> Key Figures
                </h3>
                <div className="space-y-3">
                  {selectedPeriod.keyFigures.map((figure, idx) => {
                    const isObject = typeof figure === 'object';
                    const figureName = isObject ? figure.name : figure;
                    const figureDesc = isObject ? figure.description : null;

                    return (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white mb-1"
                          style={{ backgroundColor: selectedPeriod.color }}
                        >
                          {figureName}
                        </span>
                        {figureDesc && (
                          <p className="text-sm text-gray-700 mt-2">{figureDesc}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Major Events */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">📜</span> Major Events
                </h3>
                <ul className="space-y-2">
                  {selectedPeriod.majorEvents.map((event, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-purple-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{event}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Biblical Books */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">📖</span> Biblical Books
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPeriod.biblicalBooks.map((book, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-700"
                    >
                      {book}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Scriptures */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">✝️</span> Key Scriptures
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {selectedPeriod.keyScriptures.map((scripture, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="font-semibold text-gray-800">
                        {scripture.split(' - ')[0]}
                      </span>
                      {scripture.includes(' - ') && (
                        <span className="text-gray-600"> - {scripture.split(' - ')[1]}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Theological Significance */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">🕊️</span> Theological Significance
                </h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedPeriod.theologicalSignificance}
                  </p>
                </div>
              </div>

              {/* Sources */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">📚</span> Sources & References
                </h3>
                <SourceLinks sources={selectedPeriod.sources} />
              </div>

              {/* CCC References */}
              {selectedPeriod.cccReferences.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">⛪</span> Catechism References
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedPeriod.cccReferences.map((ref, idx) => (
                      <div key={idx} className="text-sm text-gray-700 bg-gray-50 rounded p-2">
                        {ref}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-between">
              {selectedPeriod.id > 1 && (
                <button
                  onClick={() => setSelectedPeriod(periods[selectedPeriod.id - 2])}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  ← Previous Period
                </button>
              )}
              {selectedPeriod.id < periods.length && (
                <button
                  onClick={() => setSelectedPeriod(periods[selectedPeriod.id])}
                  className="px-6 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition-colors ml-auto"
                  style={{ backgroundColor: selectedPeriod.color }}
                >
                  Next Period →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
