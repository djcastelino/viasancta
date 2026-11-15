"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Compass,
  Volume2,
  VolumeX,
  Music,
  Globe,
  Flame,
  Award,
  ChevronDown,
  Check,
  Bell,
  Radio,
  ArrowLeft,
  ArrowUpRight,
  Cross,
} from "lucide-react";
import { ST_AUGUSTINE_TRAIL_STOPS } from "./data/saintsTrails";
import {
  soundEngine,
  SOUNDTRACK_OPTIONS,
  SacredAmbientPreset,
} from "./utils/soundEngine";
import { Version1LanternTrail } from "./components/Version1LanternTrail";
import { Version2GlobeDetective } from "./components/Version2GlobeDetective";

type GameVariation = "v2_globe_detective" | "v1_lantern_hunt";

export default function SacredTrailsClient() {
  const [activeVariation, setActiveVariation] = useState<GameVariation>("v2_globe_detective");
  const [v1GracePoints, setV1GracePoints] = useState<number>(0);
  const [v1StampedStopNumbers, setV1StampedStopNumbers] = useState<number[]>([]);
  const [v2SolvedCount, setV2SolvedCount] = useState<number>(0);

  // Audio state & 5-Preset Soundtrack Dropdown (Gregorian Chant set as default)
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [masterVolume, setMasterVolume] = useState<number>(75);
  const [selectedSoundtrack, setSelectedSoundtrack] =
    useState<SacredAmbientPreset>("gregorian_chant");
  const [isAudioMenuOpen, setIsAudioMenuOpen] = useState<boolean>(false);
  const audioMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    soundEngine.startAmbient("gregorian_chant");
    return () => {
      soundEngine.stopAmbient();
      soundEngine.stopSpeaking();
    };
  }, []);

  useEffect(() => {
    soundEngine.setMuted(isMuted);
  }, [isMuted]);

  const handleVolumeChange = (newPct: number) => {
    setMasterVolume(newPct);
    soundEngine.setVolume(newPct / 100);
    if (isMuted && newPct > 0) {
      setIsMuted(false);
      soundEngine.setMuted(false);
    }
    if (selectedSoundtrack === "none" && newPct > 0) {
      setSelectedSoundtrack("gregorian_chant");
      soundEngine.startAmbient("gregorian_chant");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (audioMenuRef.current && !audioMenuRef.current.contains(e.target as Node)) {
        setIsAudioMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelectSoundtrack = (preset: SacredAmbientPreset) => {
    setSelectedSoundtrack(preset);
    setIsAudioMenuOpen(false);
    if (preset === "none") {
      soundEngine.stopAmbient();
    } else {
      if (isMuted) {
        setIsMuted(false);
        soundEngine.setMuted(false);
      }
      soundEngine.startAmbient(preset);
    }
  };

  const activeOptionObj = SOUNDTRACK_OPTIONS.find((o) => o.id === selectedSoundtrack);
  const currentSolvedCount =
    activeVariation === "v2_globe_detective" ? v2SolvedCount : v1StampedStopNumbers.length;

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#f4efe6] selection:bg-[#d4af37]/30 selection:text-[#fef08a]">
      {/* Breadcrumb & Collection Bar matching Divine Pilgrim Sacred Journeys */}
      <div className="border-b border-[#262018] bg-[#110e0a] px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#a39783]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-medium text-[#cfc3ae] transition hover:text-[#fef08a]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span>Sacred journeys</span>
            <span>/</span>
            <span className="font-semibold text-[#d4af37]">Sacred trails</span>
          </div>

          <nav
            aria-label="Sacred journey collections"
            className="flex items-center gap-5 overflow-x-auto text-xs"
          >
            <Link
              href="/sacred-mountains"
              className="whitespace-nowrap text-[#a39783] transition hover:text-[#f4efe6]"
            >
              Sacred mountains
            </Link>
            <Link
              href="/sacred-architecture"
              className="whitespace-nowrap text-[#a39783] transition hover:text-[#f4efe6]"
            >
              Sacred architecture
            </Link>
            <Link
              href="/sacred-trails"
              aria-current="page"
              className="whitespace-nowrap border-b-2 border-[#d4af37] pb-0.5 font-semibold text-[#fef08a]"
            >
              Sacred trails
            </Link>
          </nav>
        </div>
      </div>

      {/* Saint Trail Control Bar: St. Augustine, Mode Switcher & 5-Style Sacred Audio */}
      <div className="sticky top-0 z-40 border-b border-[#262018] bg-[#0e0c09]/95 px-3 py-2.5 backdrop-blur-md sm:px-8 sm:py-3">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          {/* Brand & Saint Title */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/50 bg-[#1a150e] text-[#d4af37] shadow-inner sm:h-10 sm:w-10">
              <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d4af37] sm:text-[10px]">
                  Sacred Trails · Footsteps of the Saints
                </span>
              </div>
              <h1 className="font-serif text-base font-bold tracking-tight text-[#f4efe6] sm:text-xl">
                St. Augustine of Hippo
              </h1>
            </div>
          </div>

          {/* Interactive Mode Switcher */}
          <div className="order-3 flex w-full items-center gap-1 overflow-x-auto rounded-xl border border-[#332a1e] bg-[#15120d] p-1 lg:order-2 lg:w-auto">
            <button
              onClick={() => {
                soundEngine.playEffect("compass_click");
                setActiveVariation("v2_globe_detective");
              }}
              className={`inline-flex flex-1 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all sm:flex-initial sm:px-3.5 sm:py-2 sm:text-xs ${
                activeVariation === "v2_globe_detective"
                  ? "bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#120f0b] shadow-md"
                  : "text-[#cfc3ae] hover:text-[#f4efe6]"
              }`}
            >
              <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>3D Globe Detective</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playEffect("vellum_page");
                setActiveVariation("v1_lantern_hunt");
              }}
              className={`inline-flex flex-1 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all sm:flex-initial sm:px-3.5 sm:py-2 sm:text-xs ${
                activeVariation === "v1_lantern_hunt"
                  ? "bg-gradient-to-r from-[#d4af37] to-[#b58922] text-[#120f0b] shadow-md"
                  : "text-[#cfc3ae] hover:text-[#f4efe6]"
              }`}
            >
              <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Lantern Photo Hunt</span>
            </button>
          </div>

          {/* Progress Counter & 5-Preset Sacred Soundtrack Dropdown */}
          <div className="order-2 flex items-center gap-2 lg:order-3">
            <div className="hidden items-center gap-1.5 rounded-xl border border-[#2a231a] bg-[#16120d] px-3 py-1.5 text-xs md:flex">
              <Award className="h-4 w-4 text-[#d4af37]" />
              <span className="text-[#a39783]">Seals:</span>
              <strong className="text-[#f4efe6]">
                {currentSolvedCount} / {ST_AUGUSTINE_TRAIL_STOPS.length}
              </strong>
            </div>

            <div ref={audioMenuRef} className="relative">
              <button
                onClick={() => setIsAudioMenuOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[11px] font-semibold transition sm:gap-2 sm:px-3.5 sm:py-2 sm:text-xs ${
                  selectedSoundtrack !== "none"
                    ? "border-[#d4af37] bg-[#261f14] text-[#fef08a] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    : "border-[#2c241b] bg-[#17130e] text-[#cfc3ae] hover:border-[#d4af37]/60 hover:text-[#f4efe6]"
                }`}
                title="Choose Sacred Soundtrack or Cinematic Score"
              >
                <Music className="h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
                <span className="max-w-[130px] truncate sm:max-w-none">
                  {activeOptionObj ? activeOptionObj.label : "Sacred Audio (5 Styles)"}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                    isAudioMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAudioMenuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-[calc(100vw-1.5rem)] max-w-80 overflow-hidden rounded-2xl border border-[#3d3224] bg-[#14110d] p-2 shadow-2xl">
                  <div className="border-b border-[#262018] px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                      Sacred & Cinematic Soundscapes
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#9a8e7a]">
                      Studio-Mastered Cathedral Acoustics:
                    </p>
                  </div>

                  <div className="border-b border-[#262018] px-3 py-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#cfc3ae]">Master Volume</span>
                      <span className="font-bold text-[#d4af37]">{masterVolume}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      step={5}
                      value={masterVolume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="mt-1.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#2a231a] accent-[#d4af37]"
                    />
                  </div>

                  <div className="mt-1.5 space-y-1">
                    {SOUNDTRACK_OPTIONS.map((option) => {
                      const isSelected = selectedSoundtrack === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelectSoundtrack(option.id)}
                          className={`flex w-full items-start justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                            isSelected
                              ? "border border-[#d4af37]/60 bg-[#251e13] text-[#fef08a]"
                              : "border border-transparent hover:bg-[#1c1711] text-[#e6dccb]"
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[#382e21] bg-[#18140f] text-[#d4af37]">
                              {option.id === "church_bells" ? (
                                <Bell className="h-3.5 w-3.5" />
                              ) : option.id === "gregorian_chant" ? (
                                <Radio className="h-3.5 w-3.5" />
                              ) : (
                                <Music className="h-3.5 w-3.5" />
                              )}
                            </span>
                            <div>
                              <p className="text-xs font-bold leading-tight">
                                {option.label}
                              </p>
                              <p className="mt-0.5 text-[11px] leading-snug text-[#a39783]">
                                {option.subtitle}
                              </p>
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="mt-1 h-4 w-4 shrink-0 text-[#d4af37]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-2 border-t border-[#262018] pt-1.5">
                    <button
                      onClick={() => handleSelectSoundtrack("none")}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                        selectedSoundtrack === "none"
                          ? "bg-[#221c15] text-[#f3d27a]"
                          : "text-[#9a8e7a] hover:bg-[#1c1711] hover:text-[#e6dccb]"
                      }`}
                    >
                      <span>Turn Background Music Off (Foley Only)</span>
                      {selectedSoundtrack === "none" && (
                        <Check className="h-3.5 w-3.5 text-[#d4af37]" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#2c241b] bg-[#17130e] text-[#cfc3ae] transition hover:border-[#d4af37]/50 hover:text-[#f4efe6] sm:h-9 sm:w-9"
              title={isMuted ? "Unmute All Audio" : "Mute All Audio"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-rose-400" />
              ) : (
                <Volume2 className="h-4 w-4 text-[#d4af37]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Sacred Trails Experience */}
      <div>
        {activeVariation === "v2_globe_detective" ? (
          <Version2GlobeDetective onSolvedCountChange={setV2SolvedCount} />
        ) : (
          <Version1LanternTrail
            gracePoints={v1GracePoints}
            setGracePoints={setV1GracePoints}
            stampedStopNumbers={v1StampedStopNumbers}
            setStampedStopNumbers={setV1StampedStopNumbers}
          />
        )}
      </div>

      {/* Footer back to Divine Pilgrim */}
      <footer className="mt-10 border-t border-[#262018] bg-[#0e0c09] px-4 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 text-xs text-[#a39783]">
          <div className="flex items-center gap-2.5 text-[#d4af37]">
            <Cross className="h-5 w-5" />
            <p className="text-[#cfc3ae]">
              Every journey, <em className="font-serif text-base italic text-[#f4efe6]">a little closer to Him.</em>
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-semibold text-[#d4af37] transition hover:text-[#fef08a]"
          >
            <span>Return to Divine Pilgrim</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
