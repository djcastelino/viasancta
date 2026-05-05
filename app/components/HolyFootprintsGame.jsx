"use client";

import React, { useState } from "react";

export default function HolyFootprintsGame() {
  const [currentStop, setCurrentStop] = useState(1);
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState("");
  const [isSolved, setIsSolved] = useState(false);

  const correctAnswer = "st paul";
  const totalStops = 5;

  function handleSubmitGuess() {
    const cleanGuess = guess.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, " ");
    
    if (!cleanGuess) {
      setStatus("Please type your answer first.");
      return;
    }

    if (cleanGuess === correctAnswer || cleanGuess === "saint paul" || cleanGuess === "paul" || cleanGuess === "st paul") {
      setIsSolved(true);
      setStatus("✓ CORRECT! This was St. Paul, the Apostle to the Gentiles!");
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

  function handleReset() {
    setCurrentStop(1);
    setGuess("");
    setStatus("");
    setIsSolved(false);
  }

  return (
    <main className="min-h-screen bg-[#0c2847] py-8 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#c9a55a] mb-2">HOLY FOOTPRINTS</h1>
          <p className="text-xl text-[#f4ead8]">Trail of {isSolved ? "St. Paul" : "???"}</p>
          <p className="text-sm text-[#d4c4a8] mt-2">Stop {currentStop} of {totalStops}</p>
        </div>

        {/* Trail Card Display */}
        <div className="flex flex-col items-center gap-6">
          {/* Trail Card Image */}
          <div className="w-full max-w-2xl">
            <img
              src={`/images/holy-footprints/st_paul/trail${currentStop}.png`}
              alt={`Trail Card ${currentStop}`}
              className="w-full h-auto rounded-2xl shadow-2xl"
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
            <div className="w-full max-w-2xl">
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
