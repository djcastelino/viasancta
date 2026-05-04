"use client";

import React, { useMemo, useState } from "react";
import { MapPin, Cross, Lightbulb, Volume2, Sparkles } from "lucide-react";
import { holyFootprintsChallenges } from "../data/holyFootprintsChallenges";

function normalizeGuess(value) {
  return value.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, " ");
}

function getScore(stopNumber) {
  const scores = [100, 80, 60, 40, 20];
  return scores[stopNumber - 1] || 20;
}

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export default function HolyFootprintsGame() {
  const todayIndex = getDayOfYear() % holyFootprintsChallenges.length;

  const [selectedIndex, setSelectedIndex] = useState(todayIndex);
  const [currentStop, setCurrentStop] = useState(1);
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [showFacts, setShowFacts] = useState(false);

  const challenge = holyFootprintsChallenges[selectedIndex];

  const visibleStops = useMemo(() => {
    return challenge.stops.slice(0, currentStop);
  }, [challenge, currentStop]);

  const activeStop = challenge.stops[currentStop - 1];
  const score = getScore(currentStop);

  // Select trail card based on challenge and current stop
  const trailCard = useMemo(() => {
    // St. Paul uses trail cards
    if (challenge.id === "holy-footprints-001") {
      return `/images/holy-footprints/st_paul/trail${currentStop}.png`;
    }
    // Default to world map for other challenges
    return "/images/holy-footprints/world-map.png";
  }, [challenge, currentStop]);

  function resetGame(index) {
    setSelectedIndex(Number(index));
    setCurrentStop(1);
    setGuess("");
    setStatus("");
    setIsSolved(false);
    setShowFacts(false);
  }

  function handleRevealNextStop() {
    setStatus("");

    if (currentStop < challenge.stops.length) {
      setCurrentStop((prev) => prev + 1);
      return;
    }

    setStatus("You reached the final stop. Try one more guess!");
  }

  function handleSubmitGuess() {
    const cleanGuess = normalizeGuess(guess);
    const acceptedAnswers = challenge.acceptedAnswers.map(normalizeGuess);

    if (!cleanGuess) {
      setStatus("Type a guess first.");
      return;
    }

    if (acceptedAnswers.includes(cleanGuess)) {
      setIsSolved(true);
      setStatus(`Correct! You solved it at Stop ${currentStop} for ${score} points.`);
      return;
    }

    setStatus("Not quite. Reveal the next stop for another clue.");
  }

  async function handleListenToStory() {
    const text = `Correct. This was ${challenge.displayAnswer}. ${challenge.finalExplanation}`;

    try {
      setStatus("Generating audio...");

      // Azure TTS using Andrew voice
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text,
          voice: 'en-US-AndrewMultilingualNeural'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setStatus("");
      };

      audio.play();
      setStatus("Playing story audio...");
    } catch (error) {
      console.error('TTS Error:', error);
      setStatus("Audio generation failed. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0c2847] p-0">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <header className="flex items-center justify-between bg-[#0c2847] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-[#c9a55a]">
              <Cross size={28} className="text-[#c9a55a]" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-wide text-[#c9a55a]">HOLY</p>
              <p className="text-xl font-bold tracking-wide text-[#c9a55a]">FOOTPRINTS</p>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-serif text-[#f4ead8]">Trail of {isSolved ? challenge.displayAnswer : "???"}</h1>
            <p className="text-sm text-[#d4c4a8]">Follow the journey. Guess the holy figure.</p>
          </div>

          <div className="rounded-xl bg-[#0c2847] border-2 border-[#c9a55a] px-6 py-3 text-center">
            <p className="text-sm font-bold text-[#c9a55a]">STOP {currentStop} OF {challenge.stops.length}</p>
          </div>
        </header>

        {/* Trail Card Display */}
        <div className="flex justify-center p-6">
          <div className="relative max-w-2xl">
            {/* Trail Card Image */}
            <img
              src={trailCard}
              alt={`Stop ${currentStop} Trail Card`}
              className="w-full h-auto block rounded-2xl shadow-2xl"
            />
            
            {/* Invisible Interactive Overlay - positioned over card's input/buttons for functionality */}
            <div className="absolute inset-0 z-10">
              {/* Input area - positioned over card's input field */}
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitGuess()}
                placeholder=""
                disabled={isSolved}
                className="absolute bottom-[14.5%] left-[5%] right-[5%] h-[7%] bg-transparent border-none outline-none text-transparent placeholder-transparent cursor-text"
                style={{ caretColor: 'white' }}
              />
              
              {/* Submit button area */}
              <button
                onClick={handleSubmitGuess}
                disabled={isSolved || !guess.trim()}
                className="absolute bottom-[3.5%] left-[5%] w-[43%] h-[9%] bg-transparent border-none cursor-pointer disabled:cursor-not-allowed opacity-0 hover:opacity-10 hover:bg-white/10 transition-opacity"
                aria-label="Submit Answer"
              />
              
              {/* Reveal button area */}
              <button
                onClick={handleRevealNextStop}
                disabled={isSolved || currentStop >= challenge.stops.length}
                className="absolute bottom-[3.5%] right-[5%] w-[43%] h-[9%] bg-transparent border-none cursor-pointer disabled:cursor-not-allowed opacity-0 hover:opacity-10 hover:bg-white/10 transition-opacity"
                aria-label="Reveal Next Stop"
              />
            </div>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className="text-center pb-4">
            <p className="text-lg font-semibold text-[#c9a55a]">{status}</p>
          </div>
        )}

        {/* Bottom Section - Answer Reveal */}
        <div className="bg-[#0c2847] p-6">
          {/* Test Challenge Selector */}
          <div className="text-center mb-4">
            <select
              value={selectedIndex}
              onChange={(event) => resetGame(event.target.value)}
              className="rounded-lg border-2 border-[#8b7355] bg-[#f4ead8] px-4 py-2 text-sm font-semibold text-[#0c2847] shadow-xl"
            >
              <option value="">Daily Challenge</option>
              {holyFootprintsChallenges.map((item, index) => (
                <option key={item.id} value={index}>
                  Test: {item.displayAnswer}
                </option>
              ))}
            </select>
          </div>
          <div className="mx-auto max-w-5xl">
            {isSolved && (
              <div className="rounded-xl bg-[#f4ead8] p-8 shadow-2xl">
                <div className="mb-6 rounded-xl bg-gradient-to-r from-[#1d6b41] to-[#2a8556] px-6 py-4 text-center">
                  <p className="text-2xl font-bold text-white">✓ CORRECT!</p>
                </div>

                <h2 className="mb-4 text-center text-3xl font-bold text-[#0c2847]">
                  This was {challenge.displayAnswer}
                </h2>

                <p className="mb-6 rounded-lg bg-white p-5 text-center text-base leading-relaxed text-gray-800 border-2 border-[#8b7355]">
                  {challenge.finalExplanation}
                </p>

                <div className="mb-6 rounded-lg bg-white p-5 border-2 border-[#8b7355]">
                  <p className="mb-2 font-bold text-[#0c2847]">Full Trail:</p>
                  <p className="text-base text-gray-800">
                    {challenge.stops.map((stop) => stop.name).join(" → ")}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mb-4">
                  <button
                    onClick={handleListenToStory}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#0c2847] px-5 py-3 font-bold uppercase tracking-wide text-white shadow-lg hover:bg-[#1a3a5f]"
                  >
                    <Volume2 size={18} /> Listen to Story
                  </button>

                  <button
                    onClick={() => setShowFacts((prev) => !prev)}
                    className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#8b7355] bg-[#c9a55a] px-5 py-3 font-bold uppercase tracking-wide text-[#0c2847] shadow-lg hover:bg-[#b8944c]"
                  >
                    <Sparkles size={18} /> {showFacts ? "Hide" : "Show"} Fun Facts
                  </button>
                </div>

                {showFacts && (
                  <div className="rounded-lg bg-white p-5 border-2 border-[#8b7355]">
                    <ul className="space-y-2 text-sm leading-relaxed">
                      {challenge.funFacts.map((fact) => (
                        <li key={fact} className="flex gap-2">
                          <span className="text-[#c9a55a]">★</span>
                          <span className="text-gray-800">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
