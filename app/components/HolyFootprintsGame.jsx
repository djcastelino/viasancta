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

          {/* Map Container - Stylized Parchment Game Board */}
          <div className="relative h-[600px] overflow-hidden rounded-lg">
            {/* Parchment background with vintage texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0e4d0] via-[#e8dcc8] to-[#d4c4a8]">
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b7355' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />
              
              {/* Decorative sea/water blobs */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  {/* Water gradient */}
                  <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#7eb3d5', stopOpacity: 0.6 }} />
                    <stop offset="50%" style={{ stopColor: '#6ba3c5', stopOpacity: 0.7 }} />
                    <stop offset="100%" style={{ stopColor: '#5a96ba', stopOpacity: 0.6 }} />
                  </linearGradient>
                  
                  {/* Subtle texture pattern */}
                  <pattern id="waterTexture" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 0 10 Q 5 8 10 10 T 20 10" stroke="#ffffff" strokeWidth="0.3" fill="none" opacity="0.3"/>
                  </pattern>
                </defs>
                
                {/* Decorative water bodies - organic flowing shapes */}
                <path d="M 0,45 Q 15,42 30,45 T 60,48 Q 80,50 100,48 L 100,60 Q 85,58 70,60 T 40,62 Q 20,63 0,60 Z" 
                      fill="url(#waterGrad)" opacity="0.8" />
                
                <path d="M 5,50 Q 20,48 35,51 T 65,53 Q 82,54 98,52 L 98,68 Q 80,66 60,69 T 30,70 Q 12,71 5,68 Z" 
                      fill="url(#waterGrad)" opacity="0.6" />
                
                {/* Decorative water texture */}
                <rect x="0" y="45" width="100" height="30" fill="url(#waterTexture)" opacity="0.3" />
                
                {/* Decorative compass rose in corner */}
                <g transform="translate(8, 8)" opacity="0.3">
                  <circle cx="0" cy="0" r="3" fill="none" stroke="#8b7355" strokeWidth="0.2"/>
                  <path d="M 0,-3 L 0,3 M -3,0 L 3,0" stroke="#8b7355" strokeWidth="0.2"/>
                  <path d="M -2,-2 L 2,2 M 2,-2 L -2,2" stroke="#8b7355" strokeWidth="0.15"/>
                </g>
                
                {/* Decorative border frame */}
                <rect x="1" y="1" width="98" height="98" fill="none" stroke="#8b7355" strokeWidth="0.5" opacity="0.2" strokeDasharray="2,1"/>
              </svg>

              {/* Progressive Trail Line */}
              {visibleStops.length > 1 && (
                <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ zIndex: 1 }}>
                  <defs>
                    <filter id="trailShadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4"/>
                    </filter>
                  </defs>
                  <polyline
                    points={visibleStops.map((stop) => `${stop.x}%,${stop.y}%`).join(" ")}
                    fill="none"
                    stroke="#b4463a"
                    strokeWidth="4"
                    strokeDasharray="12 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#trailShadow)"
                  />
                </svg>
              )}

              {/* Progressive Markers and Labels */}
              {visibleStops.map((stop, index) => (
                <div
                  key={`${challenge.id}-${stop.name}`}
                  className="absolute -translate-x-1/2 -translate-y-full pointer-events-none"
                  style={{ left: `${stop.x}%`, top: `${stop.y}%`, zIndex: 10 }}
                >
                  <div className="flex flex-col items-center gap-1">
                    {/* Landmark Icon */}
                    <div className="text-5xl drop-shadow-2xl" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}>
                      {stop.name.includes("Rome") ? "🏛️" : 
                       stop.name.includes("Athens") ? "🏛️" :
                       stop.name.includes("Damascus") || stop.name.includes("Tarsus") ? "🕌" : 
                       stop.name.includes("Kolkata") || stop.name.includes("Darjeeling") ? "🛕" :
                       "⛪"}
                    </div>
                    {/* Number Badge */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-3 border-white bg-[#b4463a] shadow-2xl">
                      <span className="text-xl font-bold text-white">{index + 1}</span>
                    </div>
                    {/* Location Label */}
                    <div className="rounded-lg bg-[#0c2847] px-3 py-1.5 shadow-2xl border-2 border-[#c9a55a]">
                      <span className="text-sm font-bold text-white whitespace-nowrap">{stop.name}</span>
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
