"use client";

import React, { useState, useRef } from "react";
import { Volume2 } from "lucide-react";
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

export default function HolyFootprintsGame() {
  const [currentStop, setCurrentStop] = useState(1);
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef(null);

  const correctAnswer = "padre pio";
  const totalStops = 5;

  function handleSubmitGuess() {
    const cleanGuess = guess.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, " ");
    
    if (!cleanGuess) {
      setStatus("Please type your answer first.");
      return;
    }

    if (cleanGuess === correctAnswer || 
        cleanGuess === "saint padre pio" || 
        cleanGuess === "st padre pio" ||
        cleanGuess === "padre pio" ||
        cleanGuess === "pio" ||
        cleanGuess === "saint pio") {
      setIsSolved(true);
      setStatus("✓ CORRECT! This was Padre Pio, the beloved Capuchin friar with the stigmata!");
      return;
    }

    // If at final stop and answer is wrong, reveal the answer
    if (currentStop >= totalStops) {
      setIsSolved(true);
      setStatus("The answer was Padre Pio! Click below to hear the full story.");
    } else {
      setStatus("❌ Not quite. Try revealing the next stop for another clue.");
    }
  }

  function handleRevealNextStop() {
    if (currentStop < totalStops) {
      setCurrentStop(currentStop + 1);
      setStatus("");
    } else {
      setStatus("You've reached the final stop. Take one more guess!");
    }
  }

  async function handlePlayAudioTour() {
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setIsPlayingAudio(false);
      setStatus('');
      return;
    }

    const text = `Correct! This was Padre Pio. Born Francesco Forgione in 1887 in Pietrelcina, Italy, he became one of the most beloved saints of the twentieth century. As a Capuchin friar, he bore the stigmata, the wounds of Christ, for fifty years. He was known for his deep prayer life, his ability to read hearts in confession, and numerous miraculous healings. He founded the Casa Sollievo della Sofferenza, a hospital in San Giovanni Rotondo, to care for the sick and suffering. Padre Pio died in 1968 and was canonized by Pope John Paul the Second in 2002. His tomb in San Giovanni Rotondo remains one of the most visited pilgrimage sites in the world.`;

    setIsPlayingAudio(true);
    setStatus("Creating audio...");

    try {
      const azureKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const azureRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

      if (!azureKey || !azureRegion) {
        throw new Error('Azure Speech API credentials not configured.');
      }

      const speechConfig = sdk.SpeechConfig.fromSubscription(azureKey, azureRegion);
      speechConfig.speechSynthesisVoiceName = 'en-US-AndrewMultilingualNeural';
      speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

      const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
          <voice name="en-US-AndrewMultilingualNeural">
            <prosody rate="0.95">
              ${text}
            </prosody>
          </voice>
        </speak>
      `;

      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

      synthesizer.speakSsmlAsync(
        ssml,
        (result) => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            const audioBlob = new Blob([result.audioData], { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audioRef.current = audio;

            audio.onended = () => {
              URL.revokeObjectURL(audioUrl);
              setIsPlayingAudio(false);
              setStatus("✓ Audio tour complete!");
              audioRef.current = null;
            };

            audio.onerror = () => {
              URL.revokeObjectURL(audioUrl);
              setIsPlayingAudio(false);
              setStatus("Error playing audio.");
              audioRef.current = null;
            };

            audio.play();
            setStatus("🔊 Playing Andrew's narration...");
          } else {
            setIsPlayingAudio(false);
            setStatus("Failed to generate audio.");
          }
          synthesizer.close();
        },
        (error) => {
          console.error('Azure TTS error:', error);
          setIsPlayingAudio(false);
          setStatus("Audio generation failed.");
          synthesizer.close();
        }
      );
    } catch (error) {
      console.error('Audio error:', error);
      setIsPlayingAudio(false);
      setStatus("Audio not available.");
    }
  }

  function handleReset() {
    setCurrentStop(1);
    setGuess("");
    setStatus("");
    setIsSolved(false);
    setIsPlayingAudio(false);
  }

  return (
    <main className="min-h-screen bg-[#0c2847] py-8 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#c9a55a] mb-2">HOLY FOOTPRINTS</h1>
          <p className="text-xl text-[#f4ead8]">Trail of {isSolved ? "Padre Pio" : "???"}</p>
          <p className="text-sm text-[#d4c4a8] mt-2">Stop {currentStop} of {totalStops}</p>
        </div>

        {/* Trail Card Display */}
        <div className="flex flex-col items-center gap-6">
          {/* Trail Card Image */}
          <div className="w-full max-w-2xl bg-[#0c2847] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={`/images/holy-footprints/st_padre_pio/stop${currentStop}.png`}
              alt={`Stop ${currentStop} Trail Card`}
              className="w-full h-auto block"
            />
          </div>

          {/* Controls Below Card */}
          {!isSolved && (
            <div className="w-full max-w-2xl space-y-4">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitGuess()}
                placeholder="Type your answer here..."
                className="w-full bg-[#1a1a1a] text-white placeholder-gray-400 px-6 py-4 rounded-lg text-lg border-2 border-[#8b7355] focus:border-[#c9a55a] focus:outline-none"
              />
              
              <div className="flex gap-4">
                <button
                  onClick={handleSubmitGuess}
                  disabled={!guess.trim()}
                  className="flex-1 bg-gradient-to-b from-[#8B6914] to-[#6B5010] text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:from-[#9B7914] hover:to-[#7B6010] disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase"
                >
                  Submit Answer
                </button>
                <button
                  onClick={handleRevealNextStop}
                  disabled={currentStop >= totalStops}
                  className="flex-1 bg-gradient-to-b from-[#2B5F6F] to-[#1B4F5F] text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:from-[#3B6F7F] hover:to-[#2B5F6F] disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase"
                >
                  Reveal Next Stop
                </button>
              </div>
            </div>
          )}

          {/* Status Message */}
          {status && (
            <div className="w-full max-w-2xl text-center">
              <p className="text-xl font-semibold text-[#c9a55a] bg-[#1a1a1a] px-6 py-4 rounded-lg">{status}</p>
            </div>
          )}

          {/* Success Screen */}
          {isSolved && (
            <div className="w-full max-w-2xl space-y-4">
              <button
                onClick={handlePlayAudioTour}
                disabled={isPlayingAudio}
                className="w-full bg-gradient-to-b from-[#1d6b41] to-[#2a8556] text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:from-[#2a8556] hover:to-[#1d6b41] disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase flex items-center justify-center gap-3"
              >
                <Volume2 size={24} />
                {isPlayingAudio ? "Playing Audio Tour..." : "Play Audio Tour"}
              </button>
              
              <button
                onClick={handleReset}
                className="w-full bg-[#c9a55a] text-[#0c2847] font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-[#b8944c] transition-all uppercase"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
