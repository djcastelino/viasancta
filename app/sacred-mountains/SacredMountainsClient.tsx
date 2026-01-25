'use client';

import { useState, useRef } from 'react';
import mountainsData from '@/public/sacred-mountains.json';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import SourceLinks from '@/app/components/SourceLinks';

interface Mountain {
  id: number;
  name: string;
  location: string;
  elevation: string;
  testament: string;
  significance: string;
  biblicalReferences: string[];
  keyEvents: string[];
  cccReferences: string[];
  sources: string[];
  historicalContext: string;
  theologicalSignificance: string;
  funFacts: string[];
  audioSections: any[];
  images: any[];
  mapUrl: string;
  totalAudioDuration: number;
}

export default function SacredMountainsClient() {
  const [selectedMountain, setSelectedMountain] = useState<Mountain | null>(null);
  const [isPlayingSection, setIsPlayingSection] = useState<string | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  const backgroundMusicUrl = 'https://www.bensound.com/bensound-music/bensound-pianomoment.mp3';

  const handleCardClick = (mountain: Mountain) => {
    setSelectedMountain(mountain);
  };

  const handleCloseModal = () => {
    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current = null;
    }
    setIsPlayingSection(null);
    setIsMusicPlaying(false);
    setSelectedMountain(null);
  };

  const playAudioSection = async (section: any) => {
    // Stop any current audio and music
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current = null;
    }

    setIsPlayingSection(section.id);

    // Start background music
    const music = new Audio(backgroundMusicUrl);
    music.loop = true;
    music.volume = 0.15;
    musicRef.current = music;
    music.play().catch(err => console.log('Music playback prevented:', err));

    // Generate Azure TTS narration
    try {
      const azureKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const azureRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!azureKey || !azureRegion) {
        console.error('Azure credentials not configured');
        return;
      }

      const speechConfig = sdk.SpeechConfig.fromSubscription(azureKey, azureRegion);
      speechConfig.speechSynthesisVoiceName = section.voice;
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
          <voice name="${section.voice}">
            <prosody rate="0.95">
              ${section.script}
            </prosody>
          </voice>
        </speak>
      `;

      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

      const audioBlob = await new Promise<Blob>((resolve, reject) => {
        synthesizer.speakSsmlAsync(
          ssml,
          (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              const blob = new Blob([result.audioData], { type: 'audio/mp3' });
              synthesizer.close();
              resolve(blob);
            } else {
              synthesizer.close();
              reject(new Error(`Speech synthesis failed: ${result.errorDetails}`));
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
        setIsPlayingSection(null);
        URL.revokeObjectURL(audioUrl);
        // Stop background music when narration ends
        if (musicRef.current) {
          musicRef.current.pause();
          musicRef.current = null;
        }
      };

      audioRef.current = audioElement;
      await audioElement.play();
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlayingSection(null);
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current = null;
    }
    setIsPlayingSection(null);
    setIsMusicPlaying(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Mountain Cards Grid */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mountainsData.map((mountain) => {
            const heroImage = mountain.images.find(img => img.isHero) || mountain.images[0];

            return (
              <button
                key={mountain.id}
                onClick={() => handleCardClick(mountain as Mountain)}
                className="block group text-left w-full"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="h-60 relative overflow-hidden">
                    <img
                      src={heroImage.url}
                      alt={mountain.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="text-sm text-[#D4AF37] font-semibold mb-1">
                        {mountain.testament}
                      </div>
                      <h3 className="text-2xl font-bold drop-shadow-md">
                        {mountain.name}
                      </h3>
                      <p className="text-sm text-slate-200 mt-1">
                        {mountain.elevation}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 font-semibold mb-3">
                      {mountain.significance}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <span>📍 {mountain.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>💡 {mountain.funFacts.length} Fun Facts</span>
                      <span>•</span>
                      <span>📖 {mountain.biblicalReferences.length} References</span>
                    </div>
                    <div className="mt-4">
                      <span className="inline-block bg-[#D4AF37] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Modal */}
      {selectedMountain && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] text-white p-6 rounded-t-3xl z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedMountain.name}</h2>
                  <p className="text-white/90">
                    {selectedMountain.location} • {selectedMountain.elevation}
                  </p>
                  <p className="text-sm text-[#D4AF37] font-semibold mt-1">
                    {selectedMountain.testament}
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
              {/* Hero Image */}
              {selectedMountain.images[0] && (
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={selectedMountain.images[0].url}
                    alt={selectedMountain.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Audio Sections */}
              {selectedMountain.audioSections.length > 0 && (
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-[#2C5F87] mb-4">🎧 Audio Tour</h3>
                  <div className="space-y-3">
                    {selectedMountain.audioSections.map((section) => (
                      <div key={section.id} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{section.icon}</span>
                            <div>
                              <h4 className="font-semibold text-slate-800">{section.title}</h4>
                              <p className="text-xs text-slate-500">{formatDuration(section.duration)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => isPlayingSection === section.id ? stopAudio() : playAudioSection(section)}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                              isPlayingSection === section.id
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-[#D4AF37] hover:bg-[#c49d2f] text-white'
                            }`}
                          >
                            {isPlayingSection === section.id ? '⏸ Stop' : '▶️ Play'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Significance */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3">Why This Mountain Matters</h3>
                <p className="text-gray-700 leading-relaxed">{selectedMountain.significance}</p>
              </div>

              {/* Historical Context */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3">Historical Context</h3>
                <p className="text-gray-700 leading-relaxed">{selectedMountain.historicalContext}</p>
              </div>

              {/* Theological Significance */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3">Theological Significance</h3>
                <p className="text-gray-700 leading-relaxed">{selectedMountain.theologicalSignificance}</p>
              </div>

              {/* Key Events */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3">Key Events</h3>
                <ul className="space-y-2">
                  {selectedMountain.keyEvents.map((event, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">•</span>
                      <p className="text-gray-700">{event}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fun Facts */}
              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-4">💡 Fun Facts</h3>
                <div className="space-y-3">
                  {selectedMountain.funFacts.map((fact, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-lg">{fact.substring(0, 2)}</span>
                      <p className="text-gray-700">{fact.substring(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Biblical References */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3">📖 Biblical References</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMountain.biblicalReferences.map((ref, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sources & References (includes CCC) */}
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">📚 Sources & References</h3>
                <SourceLinks sources={selectedMountain.sources} />
                <p className="text-xs text-gray-500 mt-4 italic">
                  References include Catechism of the Catholic Church (CCC), Sacred Scripture, Church Fathers, and Catholic Encyclopedia. Click links to read more.
                </p>
              </div>

              {/* View on Map */}
              <div className="text-center">
                <a
                  href={selectedMountain.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#2C5F87] hover:bg-[#1e4460] text-white px-8 py-4 rounded-full font-bold text-lg transition"
                >
                  📍 View {selectedMountain.name} on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
