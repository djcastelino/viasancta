'use client';

import { useState, useRef, useEffect } from 'react';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import SourceLinks from '@/app/components/SourceLinks';

interface AudioSection {
  id: string;
  title: string;
  type: string;
  voice: string;
  duration: number;
  icon: string;
  script: string;
}

interface MountainImage {
  url: string;
  caption: string;
  attribution: string;
  isHero: boolean;
}

interface Mountain {
  id: number;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  elevation: string;
  testament: string;
  category: string;
  significance: string;
  biblicalReferences: string[];
  keyEvents: string[];
  cccReferences: string[];
  sources: string[];
  historicalContext: string;
  theologicalSignificance: string;
  funFacts: string[];
  audioSections: AudioSection[];
  images: MountainImage[];
  mapUrl: string;
  totalAudioDuration: number;
}

interface SacredMountainClientProps {
  mountains: Mountain[];
}

export default function SacredMountainClient({ mountains }: SacredMountainClientProps) {
  const [selectedMountain, setSelectedMountain] = useState<Mountain>(mountains[0]);
  const [isPlayingSection, setIsPlayingSection] = useState<string | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [showFullContext, setShowFullContext] = useState(false);
  const [showTheology, setShowTheology] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  // Background music URL
  const backgroundMusicUrl = 'https://www.bensound.com/bensound-music/bensound-pianomoment.mp3';

  // Play individual audio section with background music
  const playAudioSection = async (section: AudioSection) => {
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

    try {
      const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!speechKey || !speechRegion) {
        alert('Azure Speech credentials not configured');
        setIsPlayingSection(null);
        return;
      }

      const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
      speechConfig.speechSynthesisVoiceName = section.voice;
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="${section.voice}">
          <prosody rate="0.90">
            ${section.script}
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

            audioElement.play();
            audioElement.onended = () => {
              setIsPlayingSection(null);
              URL.revokeObjectURL(audioUrl);
              // Stop background music when narration ends
              if (musicRef.current) {
                musicRef.current.pause();
                musicRef.current = null;
              }
            };
          } else {
            console.error('Speech synthesis failed:', result.errorDetails);
            setIsPlayingSection(null);
          }
          synthesizer.close();
        },
        error => {
          console.error('Error:', error);
          setIsPlayingSection(null);
          synthesizer.close();
        }
      );
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlayingSection(null);
    }
  };

  // Play all sections in sequence
  const playAllSections = async () => {
    setIsPlayingAll(true);

    for (const section of selectedMountain.audioSections) {
      await new Promise<void>((resolve) => {
        playAudioSection(section);

        // Wait for section to finish
        const checkInterval = setInterval(() => {
          if (!audioRef.current || audioRef.current.ended) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
      });
    }

    setIsPlayingAll(false);
  };

  // Stop audio and music
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
    setIsPlayingAll(false);
  };

  // Toggle background music
  const toggleMusic = () => {
    if (!musicRef.current) {
      const music = new Audio(backgroundMusicUrl);
      music.loop = true;
      music.volume = 0.2;
      musicRef.current = music;
    }

    if (isMusicPlaying) {
      musicRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      musicRef.current.play().catch(err => {
        console.log('Music autoplay prevented:', err);
      });
      setIsMusicPlaying(true);
    }
  };


  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const heroImage = selectedMountain.images.find(img => img.isHero) || selectedMountain.images[0];
  const galleryImages = selectedMountain.images.filter(img => !img.isHero);

  return (
    <div className="space-y-8">
      {/* Mountain Selection (if multiple mountains) */}
      {mountains.length > 1 && (
        <div className="bg-slate-100 rounded-lg p-4">
          <h3 className="text-lg font-bold text-slate-800 mb-3">Choose a Mountain:</h3>
          <div className="flex flex-wrap gap-2">
            {mountains.map(mountain => (
              <button
                key={mountain.id}
                onClick={() => setSelectedMountain(mountain)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedMountain.id === mountain.id
                    ? 'bg-slate-700 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                {mountain.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={heroImage.url}
          alt={heroImage.caption}
          className="w-full h-[400px] md:h-[500px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {selectedMountain.name}
          </h2>
          <p className="text-white/90 text-lg">{selectedMountain.significance}</p>
          <p className="text-white/70 text-sm mt-2">
            📍 {selectedMountain.location} • {selectedMountain.elevation}
          </p>
        </div>
      </div>

      {/* Image Gallery */}
      {galleryImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
              onClick={() => setSelectedImage(index + 1)}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Audio Sections */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">🎧 Audio Tour</h3>
            <p className="text-slate-600 text-sm mt-1">
              {selectedMountain.audioSections.length} sections • {formatDuration(selectedMountain.totalAudioDuration)} total
            </p>
          </div>
          <button
            onClick={isPlayingAll ? stopAudio : playAllSections}
            disabled={isPlayingSection !== null && !isPlayingAll}
            className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-bold transition disabled:opacity-50"
          >
            {isPlayingAll ? '⏸️ Stop All' : '▶️ Play Full Tour'}
          </button>
        </div>

        <div className="space-y-3">
          {selectedMountain.audioSections.map(section => (
            <div
              key={section.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition ${
                isPlayingSection === section.id
                  ? 'border-slate-700 bg-slate-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <span className="text-3xl">{section.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-800">{section.title}</h4>
                  <p className="text-sm text-slate-600">
                    {formatDuration(section.duration)} • {section.voice.split('-')[2].replace('Neural', '')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (isPlayingSection === section.id) {
                    stopAudio();
                  } else {
                    playAudioSection(section);
                  }
                }}
                disabled={isPlayingAll}
                className={`px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50 ${
                  isPlayingSection === section.id
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                }`}
              >
                {isPlayingSection === section.id ? '⏸️ Stop' : '▶️ Play'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Key Events */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">✝️ Key Biblical Events</h3>
        <div className="space-y-3">
          {selectedMountain.keyEvents.map((event, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-slate-600 font-bold text-sm mt-1">{index + 1}.</span>
              <p className="text-slate-700">{event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Facts */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-amber-900 mb-4">💡 Fascinating Facts</h3>
        <div className="space-y-3">
          {selectedMountain.funFacts.map((fact, index) => (
            <div key={index} className="flex items-start gap-3 bg-white/60 rounded-lg p-3">
              <p className="text-slate-700">{fact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Context */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">📜 Historical Context</h3>
        <p className="text-slate-700 leading-relaxed">
          {showFullContext
            ? selectedMountain.historicalContext
            : `${selectedMountain.historicalContext.substring(0, 300)}...`}
        </p>
        {selectedMountain.historicalContext.length > 300 && (
          <button
            onClick={() => setShowFullContext(!showFullContext)}
            className="text-slate-600 hover:text-slate-800 font-semibold mt-3"
          >
            {showFullContext ? '← Read Less' : 'Read More →'}
          </button>
        )}
      </div>

      {/* Theological Significance */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">📖 Theological Significance</h3>
        <p className="text-slate-700 leading-relaxed">
          {showTheology
            ? selectedMountain.theologicalSignificance
            : `${selectedMountain.theologicalSignificance.substring(0, 300)}...`}
        </p>
        {selectedMountain.theologicalSignificance.length > 300 && (
          <button
            onClick={() => setShowTheology(!showTheology)}
            className="text-slate-600 hover:text-slate-800 font-semibold mt-3"
          >
            {showTheology ? '← Read Less' : 'Read More →'}
          </button>
        )}
      </div>

      {/* Biblical References */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">📖 Biblical References</h3>
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

      {/* Catechism References */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">✝️ Catechism References</h3>
        <div className="space-y-2">
          {selectedMountain.cccReferences.map((ref, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-slate-600">•</span>
              <p className="text-slate-700 text-sm">{ref}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
        <h3 className="text-xl font-bold text-slate-800 mb-3">📚 Sources & References</h3>
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
          className="inline-block bg-slate-700 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition"
        >
          📍 View {selectedMountain.name} on Google Maps
        </a>
      </div>
    </div>
  );
}
