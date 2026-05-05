"use client";

import React, { useState } from "react";
import { Volume2 } from "lucide-react";

export default function HolyFootprintsGame() {
  const [currentStop, setCurrentStop] = useState(1);
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const correctAnswer = "st francis xavier";
  const totalStops = 5;

  function handleSubmitGuess() {
    const cleanGuess = guess.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, " ");
    
    if (!cleanGuess) {
      setStatus("Please type your answer first.");
      return;
    }

    if (cleanGuess === correctAnswer || 
        cleanGuess === "saint francis xavier" || 
        cleanGuess === "francis xavier" ||
        cleanGuess === "st francis xavier" ||
        cleanGuess === "xavier") {
      setIsSolved(true);
      setStatus("✓ CORRECT! This was St. Francis Xavier, co-founder of the Jesuits and missionary to Asia!");
      return;
    }

    setStatus("❌ Not quite. Try revealing the next stop for another clue.");
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
    const text = `Correct! This was Saint Francis Xavier. Born in 1506 in Navarre, Spain, Francis Xavier was one of the founding members of the Society of Jesus, known as the Jesuits. He traveled extensively through Asia, bringing Christianity to India, Japan, and other parts of the Far East. His missionary journeys took him from Goa to Malacca, to the Moluccas, and finally to Japan. He died in 1552 on the island of Shangchuan, off the coast of China, while attempting to enter the Chinese mainland. Francis Xavier is considered one of the greatest missionaries in history and is the patron saint of missionaries and foreign missions. His body remains incorrupt and is venerated at the Basilica of Bom Jesus in Goa, India.`;

    setIsPlayingAudio(true);
    setStatus("Generating audio tour...");

    try {
      // Try Azure TTS first
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text,
          voice: 'en-US-AndrewMultilingualNeural'
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          setIsPlayingAudio(false);
          setStatus("Audio tour complete!");
        };

        audio.play();
        setStatus("🔊 Playing audio tour...");
        return;
      }
    } catch (error) {
      console.error('Azure TTS error:', error);
    }

    // Fallback to browser TTS
    try {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.onend = () => {
          setIsPlayingAudio(false);
          setStatus("Audio tour complete!");
        };
        window.speechSynthesis.speak(utterance);
        setStatus("🔊 Playing audio tour...");
      } else {
        throw new Error('No TTS available');
      }
    } catch (error) {
      console.error('Browser TTS error:', error);
      setIsPlayingAudio(false);
      setStatus("Audio not available in this browser.");
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
          <p className="text-xl text-[#f4ead8]">Trail of {isSolved ? "St. Francis Xavier" : "???"}</p>
          <p className="text-sm text-[#d4c4a8] mt-2">Stop {currentStop} of {totalStops}</p>
        </div>

        {/* Trail Card Display */}
        <div className="flex flex-col items-center gap-6">
          {/* Trail Card Image */}
          <div className="w-full max-w-2xl bg-[#1a1a1a] rounded-3xl p-2 shadow-2xl">
            <img
              src={`/images/holy-footprints/st_francis_xavier/stop${currentStop}.png`}
              alt={`Stop ${currentStop} Trail Card`}
              className="w-full h-auto rounded-2xl"
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
