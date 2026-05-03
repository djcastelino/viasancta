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
    <main className="min-h-screen bg-[#1a2332] p-2 text-slate-950 md:p-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-[#e8dcc8] shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between border-b-4 border-[#d4c4a8] bg-[#0c2847] p-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#d4a574] bg-[#0c2847]">
              <Cross size={24} className="text-[#d4a574]" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-wide text-[#d4a574]">HOLY</p>
              <p className="text-xl font-bold tracking-wide text-[#d4a574]">FOOTPRINTS</p>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-white md:text-3xl">Trail of {challenge.displayAnswer}</h1>
            <p className="text-sm text-slate-300">Follow the journey. Guess the holy figure.</p>
          </div>

          <div className="rounded-xl bg-[#0c2847] border-2 border-[#d4a574] px-4 py-2 text-center">
            <p className="text-sm font-bold text-white">STOP {currentStop} OF {challenge.stops.length}</p>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid gap-4 p-4 lg:grid-cols-[240px_1fr_280px]">
          {/* Left Sidebar - Journey List */}
          <aside className="rounded-2xl bg-[#f4ead8] p-4 shadow-lg border-2 border-[#d4c4a8]">
            <div className="mb-3 flex items-center gap-2 border-b-2 border-[#d4c4a8] pb-2">
              <span className="text-lg">🗺️</span>
              <h2 className="font-bold uppercase text-[#0c2847]">The Journey</h2>
            </div>
            <ul className="space-y-2">
              {challenge.stops.map((stop, index) => (
                <li
                  key={stop.name}
                  className={`flex items-center gap-2 rounded-lg p-2 text-sm ${
                    index < currentStop
                      ? "bg-[#a83227] text-white font-semibold"
                      : "bg-white/50 text-gray-600"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      index < currentStop
                        ? "bg-white text-[#a83227]"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span>{stop.name}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t-2 border-[#d4c4a8] pt-4">
              <label className="mb-2 block text-xs font-bold uppercase text-[#0c2847]">
                Test Challenge
              </label>
              <select
                value={selectedIndex}
                onChange={(event) => resetGame(event.target.value)}
                className="w-full rounded-lg border-2 border-[#d4c4a8] bg-white px-2 py-2 text-sm font-semibold text-[#0c2847]"
              >
                {holyFootprintsChallenges.map((item, index) => (
                  <option key={item.id} value={index}>
                    {item.displayAnswer}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* Center - Map */}
          <section className="relative min-h-[500px] overflow-hidden rounded-2xl border-4 border-[#8b7355] shadow-2xl">
            {/* Realistic World Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#b8d4e8] via-[#9ec7dd] to-[#7fb3d1]">
              {/* Land masses with texture */}
              <div className="absolute inset-0 opacity-90">
                {/* Mediterranean region landmasses */}
                <div className="absolute left-[8%] top-[15%] h-[70%] w-[25%] rounded-[60%] bg-gradient-to-br from-[#d4b896] to-[#b89968] shadow-lg" 
                     style={{ clipPath: "polygon(20% 0%, 100% 0%, 90% 100%, 0% 95%)" }} />
                <div className="absolute left-[28%] top-[8%] h-[75%] w-[35%] rounded-[50%] bg-gradient-to-br from-[#c9b389] to-[#a89461] shadow-lg"
                     style={{ clipPath: "polygon(10% 15%, 95% 5%, 100% 85%, 5% 90%)" }} />
                <div className="absolute left-[58%] top-[5%] h-[80%] w-[38%] rounded-[55%] bg-gradient-to-br from-[#d1b58a] to-[#b39866] shadow-lg"
                     style={{ clipPath: "polygon(5% 10%, 98% 0%, 100% 95%, 0% 85%)" }} />
                
                {/* Terrain texture overlay */}
                <div className="absolute inset-0 opacity-30 mix-blend-overlay"
                     style={{ 
                       backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,.05) 2px, rgba(0,0,0,.05) 4px)` 
                     }} />
              </div>

              {/* Water texture */}
              <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full bg-gradient-to-br from-transparent via-[#6ba3c5]/30 to-transparent" />
              </div>

              {/* Dotted trail connecting stops */}
              {visibleStops.length > 1 && (
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  <polyline
                    points={visibleStops.map((stop) => `${stop.x}%,${stop.y}%`).join(" ")}
                    fill="none"
                    stroke="#a83227"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                  />
                </svg>
              )}

              {/* Location markers with landmark icons */}
              {visibleStops.map((stop, index) => (
                <div
                  key={`${challenge.id}-${stop.name}`}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                >
                  <div className="flex flex-col items-center gap-1">
                    {/* Landmark building icon */}
                    <div className="text-4xl drop-shadow-lg">
                      {index === currentStop - 1 ? "🏛️" : "⛪"}
                    </div>
                    {/* Number badge */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#a83227] text-base font-bold text-white shadow-xl">
                      {index + 1}
                    </div>
                    {/* Location label */}
                    <span className="rounded-lg bg-[#0c2847] px-2 py-1 text-xs font-bold text-white shadow-lg">
                      {stop.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right Sidebar - Game Guide */}
          <aside className="space-y-4">
            <div className="rounded-2xl bg-[#f4ead8] p-4 shadow-lg border-2 border-[#d4c4a8]">
              <div className="mb-3 flex items-center gap-2 border-b-2 border-[#d4c4a8] pb-2">
                <Lightbulb size={18} className="text-[#d4a574]" />
                <h2 className="font-bold uppercase text-[#0c2847]">Game Guide</h2>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-gray-700">
                You earn more points the earlier you guess the correct answer!
              </p>
              <ul className="space-y-2 text-sm">
                {[100, 80, 60, 40, 20].map((points, index) => (
                  <li key={points} className="flex items-center gap-2">
                    <span className="text-lg">⭐</span>
                    <span className="text-xs">
                      Guess at Stop {index + 1} = <strong>{points} points</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {!isSolved && (
              <div className="rounded-2xl bg-white p-4 shadow-lg border-2 border-[#d4c4a8]">
                <button
                  onClick={handleRevealNextStop}
                  disabled={currentStop >= challenge.stops.length}
                  className="w-full rounded-xl bg-[#d4a574] px-4 py-3 font-bold uppercase tracking-wide text-[#0c2847] shadow-lg transition hover:bg-[#c49564] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Lightbulb size={18} />
                  Reveal Next Stop ({currentStop + 1} of {challenge.stops.length})
                </button>
              </div>
            )}
          </aside>
        </div>

        {/* Bottom Section - Clues and Input */}
        <div className="grid gap-4 border-t-4 border-[#d4c4a8] bg-[#0c2847] p-4 lg:grid-cols-[1fr_1fr_400px]">
          {!isSolved ? (
            <>
              {/* Location Clue */}
              <div className="rounded-xl bg-[#f4ead8] p-4 shadow-lg border-2 border-[#d4c4a8]">
                <div className="mb-2 flex items-center gap-2 font-bold uppercase text-[#0c2847]">
                  <MapPin size={18} className="text-[#4a7c9e]" />
                  <span className="text-sm">Location Clue</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-800">{activeStop.locationClue}</p>
              </div>

              {/* Faith Clue */}
              <div className="rounded-xl bg-[#f4ead8] p-4 shadow-lg border-2 border-[#d4c4a8]">
                <div className="mb-2 flex items-center gap-2 font-bold uppercase text-[#0c2847]">
                  <Cross size={18} className="text-[#a83227]" />
                  <span className="text-sm">Faith Clue</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-800">{activeStop.faithClue}</p>
              </div>

              {/* Answer Input */}
              <div className="rounded-xl bg-[#f4ead8] p-4 shadow-lg border-2 border-[#d4c4a8]">
                <label className="mb-2 block text-sm font-bold text-[#0c2847]">
                  Who is the holy figure whose journey is shown here?
                </label>
                <input
                  value={guess}
                  onChange={(event) => setGuess(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleSubmitGuess();
                  }}
                  placeholder="Type your answer..."
                  className="mb-3 w-full rounded-lg border-2 border-[#d4c4a8] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#4a7c9e]"
                />
                <button
                  onClick={handleSubmitGuess}
                  className="w-full rounded-lg bg-[#0c2847] px-4 py-3 font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#1a3a5f]"
                >
                  Submit Answer
                </button>
                {status && (
                  <p className="mt-3 rounded-lg bg-white p-2 text-center text-xs font-semibold text-[#0c2847]">
                    {status}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="col-span-3 rounded-xl bg-[#f4ead8] p-6 shadow-lg border-2 border-[#d4c4a8]">
              <div className="mb-4 rounded-xl bg-[#1d6b41] px-4 py-3 text-center font-bold uppercase tracking-wide text-white">
                ✓ Correct!
              </div>

              <h2 className="text-center text-2xl font-bold text-[#0c2847] mb-4">
                This was {challenge.displayAnswer}.
              </h2>

              <p className="mb-4 rounded-lg bg-white p-4 text-sm leading-relaxed text-gray-800">
                {challenge.finalExplanation}
              </p>

              <div className="mb-4 rounded-lg bg-white p-4 border-2 border-[#d4c4a8]">
                <p className="font-bold text-sm text-[#0c2847] mb-2">Full Trail:</p>
                <p className="text-sm text-gray-800">
                  {challenge.stops.map((stop) => stop.name).join(" → ")}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={handleListenToStory}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#0c2847] px-4 py-3 font-bold uppercase tracking-wide text-white shadow-lg"
                >
                  <Volume2 size={16} /> Listen to Story
                </button>

                <button
                  onClick={() => setShowFacts((prev) => !prev)}
                  className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#d4c4a8] bg-[#d4a574] px-4 py-3 font-bold uppercase tracking-wide text-[#0c2847] shadow-lg"
                >
                  <Sparkles size={16} /> Fun Facts
                </button>
              </div>

              {showFacts && (
                <ul className="mt-4 space-y-2 rounded-lg bg-white p-4 text-sm leading-relaxed">
                  {challenge.funFacts.map((fact) => (
                    <li key={fact} className="flex gap-2">
                      <span className="text-[#d4a574]">★</span>
                      <span className="text-gray-800">{fact}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
