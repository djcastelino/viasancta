"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Compass,
  Volume2,
  VolumeX,
  Music,
  ChevronDown,
  Check,
  ArrowUpRight,
  Star,
  Loader2,
  Info,
  Clock,
} from 'lucide-react';
import { trackUmami } from '../lib/analytics';
import {
  SAINT_TRAILS,
  SaintTrailProfile,
  CalendarIndexEntry,
} from './data/saintsTrails';
import {
  soundEngine,
  SOUNDTRACK_OPTIONS,
  SacredAmbientPreset,
} from './utils/soundEngine';
import { Version2GlobeDetective } from './components/Version2GlobeDetective';

function getLocalDateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getYesterdayDateKey(todayKey: string): string {
  const [y, m, d] = todayKey.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() - 1);
  return dt.toISOString().slice(0, 10);
}

export default function SacredTrailsClient() {
  const [todayKey, setTodayKey] = useState<string>(() => getLocalDateKey());
  const [calendarIndex, setCalendarIndex] = useState<CalendarIndexEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [activeSaintTrail, setActiveSaintTrail] = useState<SaintTrailProfile | null>(null);
  const [isLoadingTrail, setIsLoadingTrail] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const monthCacheRef = useRef<Record<string, SaintTrailProfile[]>>({});

  // Ambient Audio state — ALWAYS Sound Off by default
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [masterVolume, setMasterVolume] = useState<number>(7);
  const [selectedSoundtrack, setSelectedSoundtrack] =
    useState<SacredAmbientPreset>('none');
  const [isAudioMenuOpen, setIsAudioMenuOpen] = useState<boolean>(false);
  const audioMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTodayKey(getLocalDateKey());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  // Ensure ambient sound & effects stay completely off on initial mount and clean up on unmount
  useEffect(() => {
    soundEngine.setVolume(0.07);
    soundEngine.setMuted(true);
    soundEngine.stopAmbient();
    return () => {
      soundEngine.stopAmbient();
      soundEngine.stopSpeaking();
    };
  }, []);

  useEffect(() => {
    soundEngine.setMuted(isMuted);
  }, [isMuted]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (audioMenuRef.current && !audioMenuRef.current.contains(e.target as Node)) {
        setIsAudioMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const loadTrailForEntry = useCallback(async (entry: CalendarIndexEntry) => {
    setIsLoadingTrail(true);
    setLoadError(null);
    setSelectedDate(entry.date);

    try {
      let monthTrails = monthCacheRef.current[entry.monthKey];
      if (!monthTrails) {
        const res = await fetch(`/data/trails/${entry.monthKey}.json`, { cache: 'force-cache' });
        if (!res.ok) throw new Error(`Unable to load ${entry.monthKey} trails`);
        monthTrails = (await res.json()) as SaintTrailProfile[];
        monthCacheRef.current[entry.monthKey] = monthTrails;
      }
      const found = monthTrails.find((t) => t.id === entry.id || t.calendarDate === entry.date);
      if (found) {
        setActiveSaintTrail(found);
      } else {
        throw new Error('Trail not found in archive');
      }
    } catch {
      const fallback = SAINT_TRAILS.find((t) => t.id === 'xavier') || SAINT_TRAILS[0];
      setActiveSaintTrail(fallback);
      setLoadError('Showing offline featured pilgrimage.');
    } finally {
      setIsLoadingTrail(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/data/trails/calendar-index.json');
        if (!res.ok) throw new Error('Calendar index unavailable');
        const list = (await res.json()) as CalendarIndexEntry[];
        if (cancelled) return;
        setCalendarIndex(list);

        const localToday = getLocalDateKey();
        const params = new URLSearchParams(window.location.search);
        const requestedDate = params.get('date');
        const previewAll = params.get('preview') === 'all';

        let initialEntry: CalendarIndexEntry | undefined;
        if (requestedDate && previewAll) {
          initialEntry = list.find((e) => e.date === requestedDate);
        }
        if (!initialEntry) {
          initialEntry = list.find((e) => e.date === localToday);
        }
        if (!initialEntry) {
          const past = list.filter((e) => e.date <= localToday);
          initialEntry = past.length > 0 ? past[past.length - 1] : list[0];
        }
        if (initialEntry) {
          await loadTrailForEntry(initialEntry);
        }
      } catch {
        if (!cancelled) {
          const fallback = SAINT_TRAILS.find((t) => t.id === 'xavier') || SAINT_TRAILS[0];
          setActiveSaintTrail(fallback);
          setIsLoadingTrail(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadTrailForEntry]);

  const todayEntry = useMemo(() => {
    if (!calendarIndex.length) return null;
    const exact = calendarIndex.find((e) => e.date === todayKey);
    if (exact) return exact;
    const past = calendarIndex.filter((e) => e.date <= todayKey);
    return past.length > 0 ? past[past.length - 1] : calendarIndex[0];
  }, [calendarIndex, todayKey]);

  const yesterdayEntry = useMemo(() => {
    if (!calendarIndex.length) return null;
    const yKey = getYesterdayDateKey(todayKey);
    const exact = calendarIndex.find((e) => e.date === yKey);
    if (exact) return exact;
    if (todayEntry) {
      const idx = calendarIndex.findIndex((e) => e.date === todayEntry.date);
      if (idx > 0) return calendarIndex[idx - 1];
    }
    return null;
  }, [calendarIndex, todayKey, todayEntry]);

  const handleSelectEntry = (entry: CalendarIndexEntry) => {
    if (entry.date === selectedDate) return;
    soundEngine.playEffect('compass_click');
    trackUmami('sacred_trail_selected', { saint: entry.id, date: entry.date });
    void loadTrailForEntry(entry);
  };

  const handleVolumeChange = (newPct: number) => {
    setMasterVolume(newPct);
    soundEngine.setVolume(newPct / 100);
    if (isMuted && newPct > 0) {
      setIsMuted(false);
      soundEngine.setMuted(false);
    }
    if (selectedSoundtrack === 'none' && newPct > 0) {
      setSelectedSoundtrack('instrumental_hymns');
      soundEngine.startAmbient('instrumental_hymns');
    }
  };

  const handleSelectSoundtrack = (preset: SacredAmbientPreset) => {
    trackUmami('sacred_audio_selected', { preset });
    setSelectedSoundtrack(preset);
    setIsAudioMenuOpen(false);
    if (preset === 'none') {
      setIsMuted(true);
      soundEngine.setMuted(true);
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
  const isViewingYesterday = Boolean(yesterdayEntry && selectedDate === yesterdayEntry.date);

  return (
    <div className="min-h-screen bg-[#F3EDE2] text-[#221E1A] selection:bg-[#4F6348]/20">
      {/* Sunlit Travertine Gallery Header */}
      <header className="sticky top-0 z-30 border-b border-[#DCD2C0] bg-[#FCFBF8]/95 px-3 py-2.5 backdrop-blur-md sm:px-6 sm:py-3">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3">
          {/* Brand + Active Saint */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C8D4C2] bg-[#EAEFE7] sm:h-10 sm:w-10">
              <Compass className="h-4 w-4 text-[#4F6348] sm:h-5 sm:w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A65B3A]">
                  Sacred Trails · {isViewingYesterday ? 'Yesterday’s Archive' : 'Today’s Saint'}
                </span>
                {activeSaintTrail?.isFeastDay && (
                  <span className="inline-flex items-center gap-1 rounded-md border border-[#E6C9B8] bg-[#F7ECE6] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#A65B3A]">
                    <Star className="h-2.5 w-2.5 fill-[#A65B3A] text-[#A65B3A]" />
                    Feast · {activeSaintTrail.feastDay}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-lg font-bold tracking-tight text-[#221E1A] sm:text-2xl">
                {activeSaintTrail ? activeSaintTrail.saintName : 'Sacred Trails of the Saints'}
              </h1>
            </div>
          </div>

          {/* Right Controls: Today's Saint / Yesterday's Archive + Sound Off Menu */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Simple 2-Button Daily Switcher: Today's Saint & Yesterday's Archive ONLY */}
            {todayEntry && (
              <div
                className="inline-flex items-center rounded-xl border border-[#DCD2C0] bg-[#F3EDE2] p-1"
                role="tablist"
                aria-label="Daily Saint selection"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={!isViewingYesterday}
                  onClick={() => handleSelectEntry(todayEntry)}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition sm:text-xs cursor-pointer ${
                    !isViewingYesterday
                      ? 'bg-[#4F6348] text-white shadow-sm'
                      : 'text-[#5C5347] hover:text-[#221E1A]'
                  }`}
                >
                  Today’s Saint
                  <span className="ml-1.5 hidden opacity-85 md:inline">
                    · {todayEntry.shortTitle}
                  </span>
                </button>
                {yesterdayEntry && (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isViewingYesterday}
                    onClick={() => handleSelectEntry(yesterdayEntry)}
                    className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition sm:text-xs cursor-pointer ${
                      isViewingYesterday
                        ? 'bg-[#4F6348] text-white shadow-sm'
                        : 'text-[#5C5347] hover:text-[#221E1A]'
                    }`}
                    title={`Yesterday’s Archive: ${yesterdayEntry.saintName}`}
                  >
                    Yesterday’s Archive
                    <span className="ml-1.5 hidden opacity-85 md:inline">
                      · {yesterdayEntry.shortTitle}
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* Optional Ambient Audio Menu (Defaults to Sound Off) */}
            <div ref={audioMenuRef} className="relative flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  if (isMuted || selectedSoundtrack === 'none') {
                    setIsMuted(false);
                    soundEngine.setMuted(false);
                    if (selectedSoundtrack === 'none') {
                      setSelectedSoundtrack('instrumental_hymns');
                      soundEngine.startAmbient('instrumental_hymns');
                    }
                  } else {
                    setIsMuted(true);
                    soundEngine.setMuted(true);
                  }
                }}
                aria-label={isMuted || selectedSoundtrack === 'none' ? 'Unmute ambient music' : 'Mute ambient music'}
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[#DCD2C0] bg-[#F5F0E6] text-[#655C50] transition hover:border-[#4F6348] hover:text-[#221E1A] cursor-pointer"
              >
                {isMuted || selectedSoundtrack === 'none' ? (
                  <VolumeX className="h-3.5 w-3.5 text-[#8A7F70]" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5 text-[#4F6348]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsAudioMenuOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[11px] font-semibold transition sm:gap-2 sm:px-3 sm:text-xs cursor-pointer ${
                  selectedSoundtrack !== 'none' && !isMuted
                    ? 'border-[#4F6348] bg-[#EAEFE7] text-[#2F402A]'
                    : 'border-[#DCD2C0] bg-[#F5F0E6] text-[#5C5347] hover:border-[#4F6348]/60 hover:text-[#221E1A]'
                }`}
                title="Optional Background Music (Off by default)"
              >
                <Music className="h-3.5 w-3.5 shrink-0 text-[#4F6348]" />
                <span className="max-w-[110px] truncate sm:max-w-[150px]">
                  {isMuted || selectedSoundtrack === 'none'
                    ? 'Sound Off'
                    : activeOptionObj?.label || 'Sacred Audio'}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                    isAudioMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isAudioMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-[calc(100vw-1.5rem)] max-w-80 overflow-hidden rounded-2xl border border-[#DCD2C0] bg-[#FCFBF8] p-2 shadow-2xl">
                  <div className="border-b border-[#EAE2D6] px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A65B3A]">
                      Optional Background Music
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#655C50]">
                      Off by default · Andrew voice narration works anytime
                    </p>
                  </div>

                  <div className="border-b border-[#EAE2D6] px-3 py-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#5C5347]">Music Volume</span>
                      <span className="font-bold text-[#4F6348]">{masterVolume}%</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      step={1}
                      value={masterVolume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="mt-1.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#E4DACB] accent-[#4F6348]"
                    />
                  </div>

                  <div className="mt-1.5 space-y-1">
                    {SOUNDTRACK_OPTIONS.map((opt) => {
                      const active = opt.id === selectedSoundtrack;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectSoundtrack(opt.id)}
                          className={`flex w-full items-start justify-between gap-2 rounded-xl px-3 py-2 text-left transition cursor-pointer ${
                            active
                              ? 'bg-[#EAEFE7] text-[#221E1A] ring-1 ring-[#4F6348]/40'
                              : 'text-[#4E463D] hover:bg-[#F3EDE2]'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-semibold">{opt.label}</div>
                            <div className="text-[10px] text-[#786E60]">{opt.subtitle}</div>
                          </div>
                          {active && <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4F6348]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sub-Navigation Collection Bar */}
        <nav
          aria-label="Sacred journey collections"
          className="mx-auto mt-2.5 flex max-w-[1440px] items-center justify-between gap-4 overflow-x-auto border-t border-[#EAE2D6] pt-2 text-[11px]"
        >
          <div className="flex shrink-0 items-center gap-5">
            <Link
              href="/sacred-mountains"
              className="inline-flex items-center gap-1 text-[#655C50] transition hover:text-[#221E1A]"
            >
              <span>Sacred mountains</span>
              <ArrowUpRight className="h-3 w-3 opacity-70" />
            </Link>
            <Link
              href="/sacred-architecture"
              className="inline-flex items-center gap-1 text-[#655C50] transition hover:text-[#221E1A]"
            >
              <span>Sacred architecture</span>
              <ArrowUpRight className="h-3 w-3 opacity-70" />
            </Link>
            <span
              aria-current="page"
              className="border-b-2 border-[#4F6348] pb-0.5 font-semibold text-[#221E1A]"
            >
              Sacred trails
            </span>
          </div>
          <span className="hidden items-center gap-1.5 text-[11px] font-medium text-[#655C50] sm:inline-flex">
            <Clock className="h-3 w-3 text-[#A65B3A]" />
            <span>One new Saint trail each day · Yesterday’s trail kept in archive</span>
          </span>
        </nav>
      </header>

      {/* Main 3D Globe Guided Pilgrimage Experience */}
      <main>
        {isLoadingTrail || !activeSaintTrail ? (
          <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#4F6348]" />
            <p className="font-serif text-lg text-[#4E463D]">
              Preparing today’s sacred pilgrimage...
            </p>
          </div>
        ) : (
          <>
            {loadError && (
              <div className="mx-auto mt-3 max-w-[1440px] px-4 text-center text-xs text-[#A65B3A]">
                {loadError}
              </div>
            )}
            <Version2GlobeDetective
              key={activeSaintTrail.id}
              saintTrail={activeSaintTrail}
            />
          </>
        )}

        {/* Transparent About Sacred Trails Editorial Note */}
        <section className="mx-auto max-w-[1440px] px-4 pb-12 pt-2 sm:px-8">
          <div className="rounded-2xl border border-[#DCD2C0] bg-[#FCFBF8] p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#A65B3A]">
              <Info className="h-4 w-4 text-[#4F6348]" />
              <span>About Sacred Trails &amp; Historical Notes</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#5C5347] sm:text-sm">
              A new Saint’s journey is featured each day, with yesterday’s trail kept available in case you missed it. Sacred Trails pairs interactive 3D world geography with concise, AI-assisted historical summaries of the lives, sanctuaries, and traditional quotes of Catholic Saints, accompanied by custom museum-style illustrations. Divine Pilgrim is an independent educational project without ecclesiastical approval; for primary writings of the Saints, explore{' '}
              <Link href="/ask-the-doctors" className="font-semibold text-[#4F6348] underline hover:text-[#35462F]">
                Ask the Doctors of the Church
              </Link>{' '}
              (grounded in verified pre-1929 public-domain PDFs). Suggestions or historical corrections are always welcome at{' '}
              <a href="mailto:feedback@divinepilgrim.com" className="font-semibold text-[#A65B3A] underline">
                feedback@divinepilgrim.com
              </a>.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
