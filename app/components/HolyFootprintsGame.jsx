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

  function handleListenToStory() {
    const text = `Correct. This was ${challenge.displayAnswer}. ${challenge.finalExplanation}`;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      setStatus("Playing story audio...");
    } else {
      setStatus("Text-to-speech is not available in this browser.");
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

        {/* Main Content - Map and Sidebars */}
        <div className="relative">
          {/* Journey List - Top Left Overlay */}
          <div className="absolute left-4 top-4 z-10 w-48 rounded-xl bg-[#f4ead8] p-4 shadow-2xl">
            <div className="mb-3 border-b-2 border-[#8b7355] pb-2">
              <h2 className="font-bold uppercase text-[#0c2847]">The Journey</h2>
            </div>
            <ul className="space-y-1">
              {challenge.stops.map((stop, index) => (
                <li
                  key={stop.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    index < currentStop
                      ? "bg-[#b4463a] text-white"
                      : "bg-white text-gray-500 border border-gray-300"
                  }`}>
                    {index + 1}
                  </span>
                  <span className={index < currentStop ? "font-semibold text-[#0c2847]" : "text-gray-600"}>
                    {stop.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Container */}
          <div className="relative h-[600px] overflow-hidden">
            {/* World Map Background - Vintage Style */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8fb7d4] via-[#6ba3c5] to-[#5a96ba]">
              {/* Landmasses */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Africa */}
                <path d="M 35,45 L 42,42 L 48,45 L 50,52 L 48,65 L 45,72 L 40,75 L 35,72 L 32,65 L 30,55 L 32,48 Z" 
                      fill="#d4ba8e" stroke="#a89668" strokeWidth="0.3" />
                
                {/* Europe */}
                <path d="M 35,35 L 45,32 L 52,30 L 58,32 L 62,35 L 58,40 L 52,42 L 45,40 L 38,38 Z"
                      fill="#d8be92" stroke="#aa9a6c" strokeWidth="0.3" />
                
                {/* Middle East / Asia Minor */}
                <path d="M 58,35 L 68,32 L 75,35 L 78,40 L 75,48 L 70,52 L 65,50 L 60,46 L 58,40 Z"
                      fill="#d2b886" stroke="#a8946a" strokeWidth="0.3" />
                
                {/* Asia */}
                <path d="M 75,35 L 85,30 L 92,35 L 96,45 L 94,55 L 90,62 L 85,68 L 78,65 L 72,58 L 70,48 L 72,40 Z"
                      fill="#ceb482" stroke="#a49066" strokeWidth="0.3" />
                
                {/* Italy */}
                <path d="M 38,38 L 40,35 L 42,38 L 42,45 L 40,52 L 38,48 Z"
                      fill="#d6bc90" stroke="#ac986e" strokeWidth="0.2" />
                
                {/* Greece */}
                <path d="M 48,40 L 52,38 L 54,42 L 52,46 L 48,44 Z"
                      fill="#d5bb8f" stroke="#ab976d" strokeWidth="0.2" />
                
                {/* Americas */}
                <path d="M 12,35 L 18,32 L 22,35 L 24,45 L 22,55 L 18,62 L 15,68 L 12,70 L 8,65 L 6,55 L 8,42 Z"
                      fill="#cfb583" stroke="#a59165" strokeWidth="0.3" />
                
                {/* Texture overlay */}
                <rect width="100" height="100" fill="url(#grain)" opacity="0.15" />
                
                <defs>
                  <pattern id="grain" width="2" height="2" patternUnits="userSpaceOnUse">
                    <rect width="2" height="2" fill="#8b7355" opacity="0.1" />
                  </pattern>
                </defs>
                
                {/* Water texture lines */}
                <path d="M 0,48 Q 20,46 40,48 T 80,48 T 100,48" stroke="#5a8fb5" strokeWidth="0.3" fill="none" opacity="0.3" />
                <path d="M 0,52 Q 25,50 50,52 T 100,52" stroke="#5a8fb5" strokeWidth="0.2" fill="none" opacity="0.2" />
                <text x="42" y="58" fontSize="4" fill="#5a8fb5" opacity="0.4" fontStyle="italic">Mediterranean Sea</text>
              </svg>

              {/* Progressive Trail */}
              {visibleStops.length > 1 && (
                <svg className="absolute inset-0 h-full w-full pointer-events-none">
                  <defs>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  <polyline
                    points={visibleStops.map((stop) => `${stop.x}%,${stop.y}%`).join(" ")}
                    fill="none"
                    stroke="#b4463a"
                    strokeWidth="3"
                    strokeDasharray="10 5"
                    strokeLinecap="round"
                    filter="url(#shadow)"
                  />
                </svg>
              )}

              {/* Progressive Markers */}
              {visibleStops.map((stop, index) => (
                <div
                  key={`${challenge.id}-${stop.name}`}
                  className="absolute -translate-x-1/2 -translate-y-full pointer-events-none"
                  style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-5xl drop-shadow-2xl" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))" }}>
                      {stop.name.includes("Rome") ? "🏛️" : 
                       stop.name.includes("Athens") ? "🏛️" :
                       stop.name.includes("Damascus") || stop.name.includes("Tarsus") ? "🕌" : "⛪"}
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#b4463a] shadow-xl">
                      <span className="text-lg font-bold text-white">{index + 1}</span>
                    </div>
                    <div className="rounded-lg bg-[#0c2847] px-3 py-1 shadow-xl">
                      <span className="text-sm font-bold text-white">{stop.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Guide - Top Right Overlay */}
          <div className="absolute right-4 top-4 z-10 w-64 rounded-xl bg-[#f4ead8] p-4 shadow-2xl">
            <div className="mb-3 flex items-center gap-2 border-b-2 border-[#8b7355] pb-2">
              <span className="text-[#c9a55a]">ℹ️</span>
              <h2 className="font-bold uppercase text-[#0c2847]">Game Guide</h2>
            </div>
            <p className="mb-3 text-xs text-gray-700">
              You earn more points the earlier you guess the correct answer!
            </p>
            <ul className="space-y-1.5 text-xs">
              {[100, 80, 60, 40, 20].map((points, index) => (
                <li key={points} className="flex items-center gap-2">
                  <span className="text-[#c9a55a]">⭐</span>
                  <span>Guess at Stop {index + 1} = <strong>{points} points</strong></span>
                </li>
              ))}
            </ul>
            
            {!isSolved && (
              <button
                onClick={handleRevealNextStop}
                disabled={currentStop >= challenge.stops.length}
                className="mt-4 w-full rounded-lg bg-[#c9a55a] px-4 py-2.5 text-sm font-bold uppercase text-[#0c2847] shadow-lg transition hover:bg-[#b8944c] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Lightbulb size={16} />
                Reveal Next Stop ({Math.min(currentStop + 1, challenge.stops.length)} of {challenge.stops.length})
              </button>
            )}
          </div>

          {/* Test Challenge Selector - Bottom Right */}
          <div className="absolute bottom-4 right-4 z-10">
            <select
              value={selectedIndex}
              onChange={(event) => resetGame(event.target.value)}
              className="rounded-lg border-2 border-[#8b7355] bg-[#f4ead8] px-3 py-2 text-xs font-semibold text-[#0c2847] shadow-xl"
            >
              <option value="">Daily Challenge</option>
              {holyFootprintsChallenges.map((item, index) => (
                <option key={item.id} value={index}>
                  Test: {item.displayAnswer}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bottom Section - Clue Card and Answer */}
        <div className="bg-[#0c2847] p-6">
          <div className="mx-auto max-w-5xl">
            {!isSolved ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left: Clue Card */}
                <div className="rounded-xl bg-[#f4ead8] p-6 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between border-b-2 border-[#8b7355] pb-3">
                    <h2 className="text-lg font-bold text-[#0c2847]">CLUE {currentStop} OF {challenge.stops.length}</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg border-2 border-[#8b7355] bg-white p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <MapPin size={20} className="text-[#5a96ba]" />
                        <span className="font-bold text-sm uppercase text-[#0c2847]">Location Clue</span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-800">{activeStop.locationClue}</p>
                    </div>

                    <div className="rounded-lg border-2 border-[#8b7355] bg-white p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Cross size={20} className="text-[#b4463a]" />
                        <span className="font-bold text-sm uppercase text-[#0c2847]">Faith Clue</span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-800">{activeStop.faithClue}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Answer Section */}
                <div className="flex flex-col">
                  <div className="flex-1 rounded-xl bg-[#f4ead8] p-6 shadow-2xl">
                    <h3 className="mb-4 text-center text-lg font-semibold text-[#0c2847]">
                      Who is the holy figure<br />whose journey is shown here?
                    </h3>
                    
                    <input
                      value={guess}
                      onChange={(event) => setGuess(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") handleSubmitGuess();
                      }}
                      placeholder="Type your answer..."
                      className="mb-4 w-full rounded-lg border-2 border-[#8b7355] bg-white px-4 py-3 text-center text-base outline-none focus:ring-2 focus:ring-[#c9a55a]"
                    />
                    
                    <button
                      onClick={handleSubmitGuess}
                      className="mb-3 w-full rounded-lg bg-[#0c2847] px-6 py-3 font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#1a3a5f]"
                    >
                      Submit Answer
                    </button>

                    {status && (
                      <div className="rounded-lg bg-white border-2 border-[#8b7355] p-3 text-center">
                        <p className="text-sm font-semibold text-[#0c2847]">{status}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 text-[#d4c4a8]">
                    <Lightbulb size={18} className="text-[#c9a55a]" />
                    <span className="text-sm">Reveal next stop for another clue</span>
                  </div>
                </div>
              </div>
            ) : (
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
