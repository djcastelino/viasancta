"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Volume2,
  VolumeX,
  Music,
  Award,
  ChevronDown,
  Check,
  Bell,
  Radio,
  ArrowUpRight,
  Sparkles,
  Lock,
  Unlock,
  Calendar,
} from 'lucide-react';
import {
  SAINT_TRAILS,
  SaintId,
  SaintTrailProfile,
  getDailySaintTrail,
} from './data/saintsTrails';
import {
  soundEngine,
  SOUNDTRACK_OPTIONS,
  SacredAmbientPreset,
} from './utils/soundEngine';
import { Version2GlobeDetective } from './components/Version2GlobeDetective';

export default function App() {
  const dailyTrail = getDailySaintTrail();
  // Default to St. Francis Xavier if unlocked/featured or Today's Saint so the user can immediately experience the new trail
  const [selectedSaintId, setSelectedSaintId] = useState<SaintId>('xavier');
  const [v2SolvedCount, setV2SolvedCount] = useState<number>(0);

  // Weekly Lock Mode vs. Preview All 7 Days Mode
  // In standard weekly mode, Today (and earlier days + St. Francis Xavier) are unlocked,
  // while Tomorrow & future days of the week hide the saint's name ("🔒 Tomorrow · Mystery").
  const [isPreviewAllDays, setIsPreviewAllDays] = useState<boolean>(false);
  const [lockedDayNotice, setLockedDayNotice] = useState<SaintTrailProfile | null>(null);

  const activeSaintTrail =
    SAINT_TRAILS.find((t) => t.id === selectedSaintId) || SAINT_TRAILS[0];

  // Determine the effective "Today" index for the weekly schedule bar.
  // Ensure up through Tuesday (index 2 = St. Francis Xavier) or local today is unlocked in standard mode,
  // while Tomorrow and future days are hidden behind the weekly lock unless Preview All 7 Days is active.
  const rawTodayIndex = dailyTrail.weekdayIndex;
  const effectiveUnlockedUpToIndex = Math.max(rawTodayIndex, 2); // Ensures Sun (Augustine), Mon (Thomas), Tue (Francis Xavier) are open while Wed-Sat demonstrate the Hidden Tomorrow Lock

  const isTrailUnlocked = (trail: SaintTrailProfile): boolean => {
    if (isPreviewAllDays) return true;
    return trail.weekdayIndex <= effectiveUnlockedUpToIndex;
  };

  // Audio state & 5-Preset Soundtrack Dropdown (Gregorian Chant set as default)
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [masterVolume, setMasterVolume] = useState<number>(7);
  const [selectedSoundtrack, setSelectedSoundtrack] =
    useState<SacredAmbientPreset>('cathedral_organ');
  const [isAudioMenuOpen, setIsAudioMenuOpen] = useState<boolean>(false);
  const audioMenuRef = useRef<HTMLDivElement | null>(null);

  // Start Gregorian Chant by default on initial mount
  useEffect(() => {
    soundEngine.setVolume(0.07);
    soundEngine.startAmbient('cathedral_organ');
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
    if (selectedSoundtrack === 'none' && newPct > 0) {
      setSelectedSoundtrack('gregorian_chant');
      soundEngine.setVolume(0.07);
    soundEngine.startAmbient('cathedral_organ');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (audioMenuRef.current && !audioMenuRef.current.contains(e.target as Node)) {
        setIsAudioMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelectSoundtrack = (preset: SacredAmbientPreset) => {
    setSelectedSoundtrack(preset);
    setIsAudioMenuOpen(false);
    if (preset === 'none') {
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

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#f4efe6] selection:bg-[#d4af37]/30 selection:text-[#fef08a]">
      {/* TOP BAR CONTRACT: Clean, Focused Header for Divine Pilgrim · Sacred Trails */}
      <header className="sticky top-0 z-40 border-b border-[#262018] bg-[#0e0c09]/95 px-3 py-2.5 backdrop-blur-md sm:px-8 sm:py-3">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          {/* Zone 1: Divine Pilgrim · Sacred Trails Brand & Active Saint Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-t-2xl border border-[#d4af37]/50 bg-[#1a150e] text-[#d4af37] shadow-inner sm:h-10 sm:w-10">
              <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d4af37] sm:text-[10px]">
                  Divine Pilgrim · Sacred Trails
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-[#d4af37]/40 bg-[#241d12] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#fef08a]">
                  <Calendar className="h-2.5 w-2.5 text-[#d4af37]" />
                  {activeSaintTrail.weekdayName}’s Trail
                </span>
                {activeSaintTrail.id === 'xavier' && (
                  <span className="inline-flex items-center gap-1 rounded-md border border-amber-400/50 bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300">
                    <Sparkles className="h-2.5 w-2.5 text-amber-300" />
                    Featured · 60,000-Mile Voyage
                  </span>
                )}
              </div>
              <h1 className="font-serif text-base font-bold tracking-tight text-[#f4efe6] sm:text-xl">
                {activeSaintTrail.saintName}
              </h1>
            </div>
          </div>

          {/* Zone 2: Progress Counter, Weekly Preview Toggle & 5-Preset Sacred Soundtrack Dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 1-Click Toggle between Weekly Lock Mode (Tomorrow Hidden) and Preview All 7 Days */}
            <button
              onClick={() => {
                soundEngine.playEffect('compass_click');
                setIsPreviewAllDays((prev) => !prev);
                setLockedDayNotice(null);
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[11px] font-bold transition sm:px-3 sm:py-1.5 sm:text-xs ${
                isPreviewAllDays
                  ? 'border-emerald-400/60 bg-emerald-950/50 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  : 'border-[#3a2f21] bg-[#1a150e] text-[#e6d5b8] hover:border-[#d4af37]'
              }`}
              title={
                isPreviewAllDays
                  ? 'All 7 Weekly Saints are unlocked for testing. Click to test how Tomorrow’s Saint is hidden for daily players.'
                  : 'Tomorrow & future days of the week are hidden as Mystery Trails. Click to unlock and preview all 7 saints today!'
              }
            >
              {isPreviewAllDays ? (
                <>
                  <Unlock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>All 7 Days Unlocked</span>
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5 text-[#d4af37]" />
                  <span>Preview All 7 Days</span>
                </>
              )}
            </button>

            <div className="hidden items-center gap-1.5 rounded-xl border border-[#2a231a] bg-[#16120d] px-3 py-1.5 text-xs md:flex">
              <Award className="h-4 w-4 text-[#d4af37]" />
              <span className="text-[#a39783]">Seals:</span>
              <strong className="text-[#f4efe6]">
                {v2SolvedCount} / {activeSaintTrail.stops.length}
              </strong>
            </div>

            {/* Direct Link to Divine Pilgrim Android App on Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.divinepilgrim.www.twa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-2.5 py-1.5 text-[11px] font-bold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-900/40 sm:px-3 sm:text-xs"
              title="Get the official Divine Pilgrim Android App on Google Play"
            >
              <span>📱 Android App</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
            </a>

            {/* 5-Option Soundtrack Dropdown Menu */}
            <div ref={audioMenuRef} className="relative">
              <button
                onClick={() => setIsAudioMenuOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[11px] font-semibold transition sm:gap-2 sm:px-3.5 sm:py-2 sm:text-xs ${
                  selectedSoundtrack !== 'none'
                    ? 'border-[#d4af37] bg-[#261f14] text-[#fef08a] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    : 'border-[#2c241b] bg-[#17130e] text-[#cfc3ae] hover:border-[#d4af37]/60 hover:text-[#f4efe6]'
                }`}
                title="Choose Sacred Soundtrack or Cinematic Score"
              >
                <Music className="h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
                <span className="max-w-[120px] truncate sm:max-w-none">
                  {activeOptionObj ? activeOptionObj.label : 'Sacred Audio (5 Styles)'}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                    isAudioMenuOpen ? 'rotate-180' : ''
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

                  {/* Smooth Master Volume Control */}
                  <div className="border-b border-[#262018] px-3 py-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#cfc3ae]">Master Volume</span>
                      <span className="font-bold text-[#d4af37]">{masterVolume}%</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      step={1}
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
                              ? 'border border-[#d4af37]/60 bg-[#251e13] text-[#fef08a]'
                              : 'border border-transparent hover:bg-[#1c1711] text-[#e6dccb]'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[#382e21] bg-[#18140f] text-[#d4af37]">
                              {option.id === 'church_bells' ? (
                                <Bell className="h-3.5 w-3.5" />
                              ) : option.id === 'gregorian_chant' ? (
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
                      onClick={() => handleSelectSoundtrack('none')}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                        selectedSoundtrack === 'none'
                          ? 'bg-[#221c15] text-[#f3d27a]'
                          : 'text-[#9a8e7a] hover:bg-[#1c1711] hover:text-[#e6dccb]'
                      }`}
                    >
                      <span>Turn Background Music Off (Foley Only)</span>
                      {selectedSoundtrack === 'none' && (
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
              title={isMuted ? 'Unmute All Audio' : 'Mute All Audio'}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-rose-400" />
              ) : (
                <Volume2 className="h-4 w-4 text-[#d4af37]" />
              )}
            </button>
          </div>
        </div>

        {/* 7-DAY WEEKLY PILGRIMAGE CYCLE BAR (Sun – Sat) with Hidden Tomorrow's Saint Lock */}
        <div className="mx-auto mt-2.5 max-w-[1440px] border-t border-[#1f1a13] pt-2">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
            <div
              role="group"
              aria-label="7-Day Weekly Saint Pilgrimage Rotation"
              className="flex items-center gap-1.5"
            >
              {SAINT_TRAILS.map((trail) => {
                const unlocked = isTrailUnlocked(trail);
                const isSelected = trail.id === activeSaintTrail.id;
                const isTomorrow =
                  !isPreviewAllDays &&
                  trail.weekdayIndex === effectiveUnlockedUpToIndex + 1;

                return (
                  <button
                    key={trail.id}
                    onClick={() => {
                      soundEngine.playEffect('compass_click');
                      if (unlocked) {
                        setSelectedSaintId(trail.id);
                        setLockedDayNotice(null);
                      } else {
                        setLockedDayNotice(trail);
                      }
                    }}
                    className={`group relative flex shrink-0 items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-left text-[11px] transition sm:px-3 ${
                      isSelected
                        ? 'border-[#d4af37] bg-gradient-to-r from-[#d4af37] to-[#b58922] font-bold text-[#120f0b] shadow-[0_0_16px_rgba(212,175,55,0.28)]'
                        : unlocked
                        ? 'border-[#2c241b] bg-[#15110c] font-semibold text-[#e6dccb] hover:border-[#d4af37]/60 hover:text-[#fef08a]'
                        : 'border-[#221c14] bg-[#100d09]/90 text-[#7c705e] hover:border-[#3d3122] hover:text-[#b0a28c]'
                    }`}
                    title={
                      unlocked
                        ? `${trail.weekdayName}: ${trail.saintName} (${trail.trailSubtitle})`
                        : `Locked until ${trail.weekdayName} — Tomorrow’s Saint is hidden until midnight!`
                    }
                  >
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                        isSelected
                          ? 'bg-[#120f0b]/20 text-[#120f0b]'
                          : unlocked
                          ? 'bg-[#241d13] text-[#d4af37]'
                          : 'bg-[#1b1610] text-[#6e6250]'
                      }`}
                    >
                      {trail.weekdayShort}
                    </span>

                    {unlocked ? (
                      <span className="whitespace-nowrap">{trail.shortTitle}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 whitespace-nowrap italic">
                        <Lock className="h-3 w-3 text-[#8a7960]" />
                        <span>{isTomorrow ? 'Tomorrow · Mystery' : 'Mystery Saint'}</span>
                      </span>
                    )}

                    {unlocked && trail.id === 'xavier' && !isSelected && (
                      <span className="rounded bg-amber-500/20 px-1 py-0.2 text-[8px] font-extrabold uppercase tracking-wider text-amber-300">
                        New
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-[#847866] xl:inline">
              7-Day Weekly Cycle · {isPreviewAllDays ? 'All 7 Unlocked' : 'Future Days Hidden'}
            </span>
          </div>

          {/* Interactive Notice when clicking a Locked Future Day ("Tomorrow's Saint Hidden") */}
          {lockedDayNotice && !isPreviewAllDays && (
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#d4af37]/40 bg-[#19140d] px-3.5 py-2 text-xs text-[#e6dccb]">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 shrink-0 text-[#d4af37]" />
                <span>
                  <strong className="text-[#fef08a]">
                    {lockedDayNotice.weekdayName}’s Mystery Saint
                  </strong>{' '}
                  is hidden until {lockedDayNotice.weekdayName} at midnight so pilgrims return each day of the week!
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEngine.playEffect('relic_discovered');
                    setIsPreviewAllDays(true);
                    setSelectedSaintId(lockedDayNotice.id);
                    setLockedDayNotice(null);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b58922] px-3 py-1 text-[11px] font-bold text-[#120f0b] shadow-sm transition hover:brightness-110"
                >
                  <Unlock className="h-3 w-3" />
                  <span>Unlock & Preview {lockedDayNotice.weekdayName}’s Saint Now</span>
                </button>
                <button
                  onClick={() => setLockedDayNotice(null)}
                  className="rounded-lg border border-[#33291d] px-2 py-1 text-[11px] text-[#9a8e7a] hover:text-[#f4efe6]"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sub-Navigation Collection Bar matching divinepilgrim.com (/sacred-mountains, /sacred-architecture, /sacred-trails) */}
        <nav
          aria-label="Sacred journey collections"
          className="mx-auto mt-2 flex max-w-[1440px] items-center justify-between gap-4 overflow-x-auto border-t border-[#1f1a13] pt-2 text-[11px]"
        >
          <div className="flex items-center gap-5 shrink-0">
            <a
              href="https://divinepilgrim.com/sacred-mountains"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#9a8e7a] transition hover:text-[#e6dccb]"
            >
              <span>Sacred mountains</span>
              <ArrowUpRight className="h-3 w-3 opacity-70" />
            </a>
            <a
              href="https://divinepilgrim.com/sacred-architecture"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#9a8e7a] transition hover:text-[#e6dccb]"
            >
              <span>Sacred architecture</span>
              <ArrowUpRight className="h-3 w-3 opacity-70" />
            </a>
            <span
              aria-current="page"
              className="border-b-2 border-[#d4af37] pb-0.5 font-semibold text-[#fef08a]"
            >
              Sacred trails
            </span>
          </div>

          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[#847866] sm:inline">
            01 / PLACES OF GRACE · {activeSaintTrail.eraSpan.toUpperCase()}
          </span>
        </nav>
      </header>

      {/* Active Sacred Trails 3D Globe Experience */}
      <main>
        <Version2GlobeDetective
          saintTrail={activeSaintTrail}
          onSolvedCountChange={setV2SolvedCount}
        />
      </main>
    </div>
  );
}
