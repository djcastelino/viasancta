"use client";

import React, { useMemo, useState } from "react";
import { MapPin, Cross, Lightbulb, Star, Volume2, Sparkles } from "lucide-react";
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
    <main className="min-h-screen bg-[#f6ecd6] p-4 text-slate-950 md:p-8">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#d6b56d] bg-[#fff8e8] shadow-2xl">
        <header className="grid gap-4 border-b border-[#d6b56d] bg-[#082c4c] p-5 text-white md:grid-cols-[260px_1fr_220px] md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#e5b94f] text-[#e5b94f]">
              <Cross size={30} />
            </div>

            <div>
              <p className="text-2xl font-bold tracking-wide text-[#e5b94f]">HOLY</p>
              <p className="text-2xl font-bold tracking-wide text-[#e5b94f]">FOOTPRINTS</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold md:text-4xl">{challenge.title}</p>
            <p className="mt-1 text-sm text-slate-200 md:text-base">
              {challenge.subtitle}: Follow the journey. Guess the holy figure.
            </p>
            <p className="mt-2 inline-flex rounded-full bg-[#e5b94f]/15 px-4 py-1 text-sm font-semibold text-[#f5d879]">
              Category: {challenge.category}
            </p>
          </div>

          <div className="space-y-2">
            <div className="rounded-2xl bg-[#021d35] px-5 py-3 text-center font-bold uppercase tracking-wide text-white shadow-lg">
              {isSolved ? "Solved" : `Stop ${currentStop} of ${challenge.stops.length}`}
            </div>

            <select
              value={selectedIndex}
              onChange={(event) => resetGame(event.target.value)}
              className="w-full rounded-xl border border-[#e5b94f] bg-[#fff8e8] px-3 py-2 text-sm font-semibold text-[#082c4c]"
            >
              {holyFootprintsChallenges.map((item, index) => (
                <option key={item.id} value={index}>
                  Test: {item.displayAnswer}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="grid gap-5 p-5 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="rounded-3xl border border-[#d6b56d] bg-[#ead7aa] p-4 shadow-inner">
            <div className="relative min-h-[430px] overflow-hidden rounded-2xl border border-[#b8944c] bg-gradient-to-br from-[#cfecff] via-[#f4ddb6] to-[#d4b27a]">
              <div className="absolute inset-0 opacity-70">
                <div className="absolute left-[3%] top-[18%] h-56 w-64 rounded-[45%] bg-[#d3b073] blur-sm" />
                <div className="absolute left-[32%] top-[9%] h-32 w-80 rounded-[50%] bg-[#d0b271] blur-sm" />
                <div className="absolute left-[58%] top-[8%] h-52 w-96 rounded-[45%] bg-[#d2b075] blur-sm" />
                <div className="absolute left-[2%] top-[58%] h-36 w-96 rounded-[45%] bg-[#cda86b] blur-sm" />
                <div className="absolute left-[42%] top-[64%] h-32 w-96 rounded-[45%] bg-[#d1ad70] blur-sm" />
              </div>

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M0,48 C16,52 24,34 39,46 C52,56 60,34 75,45 C86,53 91,41 100,45"
                  fill="none"
                  stroke="#1f83a7"
                  strokeWidth="15"
                  opacity="0.55"
                />

                <path
                  d="M8,84 C23,78 28,88 41,81 C55,74 64,89 80,77 C89,70 93,79 100,74"
                  fill="none"
                  stroke="#1f83a7"
                  strokeWidth="18"
                  opacity="0.42"
                />

                {visibleStops.length > 1 && (
                  <polyline
                    points={visibleStops.map((stop) => `${stop.x},${stop.y}`).join(" ")}
                    fill="none"
                    stroke="#9d2f24"
                    strokeWidth="1.4"
                    strokeDasharray="3 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>

              <p className="absolute left-[37%] top-[48%] -rotate-6 font-serif text-xl italic text-[#0c4661]/75">
                Pilgrimage Trail
              </p>

              {visibleStops.map((stop, index) => (
                <div
                  key={`${challenge.id}-${stop.name}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#a83227] text-lg font-bold text-white shadow-xl">
                      {index + 1}
                    </div>
                    <span className="rounded-lg bg-[#fff8e8]/90 px-2 py-1 text-sm font-bold shadow">
                      {stop.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-4">
            {!isSolved ? (
              <>
                <div className="rounded-3xl border border-[#d6b56d] bg-white/70 p-5 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                      Clue {currentStop} of {challenge.stops.length}
                    </h2>
                    <span className="rounded-full bg-[#082c4c] px-4 py-2 text-sm font-bold text-white">
                      {activeStop.name}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-[#e2c887] bg-[#fff8e8] p-4">
                      <div className="mb-2 flex items-center gap-2 font-bold uppercase text-[#082c4c]">
                        <MapPin size={20} /> Location Clue
                      </div>
                      <p className="leading-relaxed">{activeStop.locationClue}</p>
                    </div>

                    <div className="rounded-2xl border border-[#e2c887] bg-[#fff8e8] p-4">
                      <div className="mb-2 flex items-center gap-2 font-bold uppercase text-[#7e231c]">
                        <Cross size={20} /> Faith Clue
                      </div>
                      <p className="leading-relaxed">{activeStop.faithClue}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#d6b56d] bg-white/70 p-5 shadow-lg">
                  <label className="mb-2 block font-bold">Who is the holy figure?</label>

                  <input
                    value={guess}
                    onChange={(event) => setGuess(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleSubmitGuess();
                    }}
                    placeholder="Type your guess..."
                    className="w-full rounded-2xl border border-[#cdb279] bg-[#fff8e8] px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-[#082c4c]"
                  />

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button
                      onClick={handleSubmitGuess}
                      className="rounded-2xl bg-[#082c4c] px-5 py-3 font-bold uppercase tracking-wide text-white shadow-lg transition hover:scale-[1.02]"
                    >
                      Submit Guess
                    </button>

                    <button
                      onClick={handleRevealNextStop}
                      disabled={currentStop >= challenge.stops.length}
                      className="rounded-2xl border border-[#b8944c] bg-[#e5b94f] px-5 py-3 font-bold uppercase tracking-wide text-[#3d2b05] shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Reveal Next Stop
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#d6b56d] bg-[#fff8e8] p-5 shadow-lg">
                  <div className="mb-3 flex items-center gap-2 font-bold text-[#8b681c]">
                    <Lightbulb size={20} /> Game Guide
                  </div>

                  <ul className="space-y-2 text-sm">
                    {[100, 80, 60, 40, 20].map((points, index) => (
                      <li key={points} className="flex items-center gap-2">
                        <Star size={16} className="text-[#b98917]" />
                        Guess at Stop {index + 1} = {points} points
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-[#d6b56d] bg-white/80 p-6 shadow-xl">
                <div className="mb-4 rounded-2xl bg-[#1d6b41] px-4 py-3 text-center font-bold uppercase tracking-wide text-white">
                  Correct!
                </div>

                <h2 className="text-center text-3xl font-bold">
                  This was {challenge.displayAnswer}.
                </h2>

                <p className="mt-4 rounded-2xl bg-[#fff8e8] p-4 leading-relaxed">
                  {challenge.finalExplanation}
                </p>

                <div className="mt-4 rounded-2xl border border-[#e2c887] bg-[#fff8e8] p-4">
                  <p className="font-bold">Full Trail:</p>
                  <p className="mt-2 text-lg">
                    {challenge.stops.map((stop) => stop.name).join(" → ")}
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={handleListenToStory}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#082c4c] px-5 py-3 font-bold uppercase tracking-wide text-white shadow-lg"
                  >
                    <Volume2 size={18} /> Listen to Story
                  </button>

                  <button
                    onClick={() => setShowFacts((prev) => !prev)}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[#b8944c] bg-[#e5b94f] px-5 py-3 font-bold uppercase tracking-wide text-[#3d2b05] shadow-lg"
                  >
                    <Sparkles size={18} /> Fun Facts
                  </button>
                </div>

                {showFacts && (
                  <ul className="mt-4 space-y-2 rounded-2xl bg-[#fff8e8] p-4 text-sm leading-relaxed">
                    {challenge.funFacts.map((fact) => (
                      <li key={fact} className="flex gap-2">
                        <span className="text-[#b98917]">★</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {status && (
              <p className="rounded-2xl border border-[#d6b56d] bg-[#fff8e8] p-4 text-center font-semibold text-[#082c4c] shadow">
                {status}
              </p>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
