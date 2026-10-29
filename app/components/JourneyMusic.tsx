"use client";
import { useState } from "react";
import { Music2 } from "lucide-react";
import eucharistic from "@/app/lib/eucharisticMusicManager";
import marian from "@/app/lib/marianMusicManager";
export default function JourneyMusic({
  kind,
}: {
  kind: "eucharistic" | "marian";
}) {
  const manager = kind === "marian" ? marian : eucharistic;
  const [playing, setPlaying] = useState(false);
  return (
    <div className="journey-music">
      <span>
        <Music2 size={15} /> A little space for contemplation
      </span>
      <button
        aria-pressed={playing}
        onClick={() => {
          if (manager.isPlaying()) {
            manager.stop();
            setPlaying(false);
          } else {
            manager.start();
            setPlaying(true);
          }
        }}
      >
        {playing ? "Stop background music" : "Enable background music"}{" "}
        <small>OPTIONAL</small>
      </button>
    </div>
  );
}
