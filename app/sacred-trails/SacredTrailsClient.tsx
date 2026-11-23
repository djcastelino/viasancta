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
  Calendar,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Loader2,
  Info,
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

const PROGRESS_STORAGE_KEY = 'dp_sacred_trails_progress_v1';

interface PilgrimProgress {
  completedIds: string[];
  completedDates: string[];
  solvedByTrail: Record<string, number>;
}

const DEFAULT_PROGRESS: PilgrimProgress = {
  completedIds: [],
  completedDates: [],
  solvedByTrail: {},
};

function getLocalDateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatShortDate(dateKey: string): { monthShort: string; dayNum: string; weekdayShort: string } {
  const [y, m, d] = dateKey.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    monthShort: months[dt.getUTCMonth()],
    dayNum: String(dt.getUTCDate()),
    weekdayShort: weekdays[dt.getUTCDay()],
  };
}

function formatMonthHeading(monthKey: string): string {
  const [y, m] = monthKey.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[m - 1] || monthKey} ${y}`;
}

export default function SacredTrailsClient() {
  const [todayKey, setTodayKey] = useState<string>(() => getLocalDateKey());
  const [calendarIndex, setCalendarIndex] = useState<CalendarIndexEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [activeSaintTrail, setActiveSaintTrail] = useState<SaintTrailProfile | null>(null);
  const [isLoadingTrail, setIsLoadingTrail] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const monthCacheRef = useRef<Record<string, SaintTrailProfile[]>>({});

  // Local visited memory (quiet personal bookmarking, non-gamified)
  const [progress, setProgress] = useState<PilgrimProgress>(DEFAULT_PROGRESS);

  // Searchable 365-Day Saints Atlas drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerQuery, setDrawerQuery] = useState<string>('');
  const [drawerFilter, setDrawerFilter] = useState<'all' | 'feast' | 'visited'>('all');

  // Ambient Audio state (Sound Off by default; Listen with Andrew always works independently)
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [masterVolume, setMasterVolume] = useState<number>(7);
  const [selectedSoundtrack, setSelectedSoundtrack] =
    useState<SacredAmbientPreset>('none');
  const [isAudioMenuOpen, setIsAudioMenuOpen] = useState<boolean>(false);
  const audioMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PilgrimProgress>;
        setProgress({
          completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
          completedDates: Array.isArray(parsed.completedDates) ? parsed.completedDates : [],
          solvedByTrail:
            parsed.solvedByTrail && typeof parsed.solvedByTrail === 'object'
              ? parsed.solvedByTrail
              : {},
        });
      }
    } catch {
      // ignore storage read failures
    }

    const timer = window.setInterval(() => {
      setTodayKey(getLocalDateKey());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    soundEngine.setVolume(0.07);
    soundEngine.setMuted(true);
    soundEngine.stopAmbient();
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
        throw new Error('Trail not found in monthly archive');
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

        let initialEntry: CalendarIndexEntry | undefined;
        if (requestedDate) {
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

  const handleVisitedCountChange = useCallback(
    (count: number) => {
      if (!activeSaintTrail || count <= 0) return;
      setProgress((prev) => {
        const prevMax = prev.solvedByTrail[activeSaintTrail.id] || 0;
        const nextSolvedByTrail =
          count > prevMax
            ? { ...prev.solvedByTrail, [activeSaintTrail.id]: count }
            : prev.solvedByTrail;
        const isFullyVisited = count >= activeSaintTrail.stops.length;
        const trailDate = activeSaintTrail.calendarDate || selectedDate || todayKey;
        const nextCompletedIds =
          isFullyVisited && !prev.completedIds.includes(activeSaintTrail.id)
            ? [...prev.completedIds, activeSaintTrail.id]
            : prev.completedIds;
        const nextCompletedDates =
          isFullyVisited && !prev.completedDates.includes(trailDate)
            ? [...prev.completedDates, trailDate]
            : prev.completedDates;

        const changed =
          nextSolvedByTrail !== prev.solvedByTrail ||
          nextCompletedIds !== prev.completedIds ||
          nextCompletedDates !== prev.completedDates;
        if (!changed) return prev;

        const updated: PilgrimProgress = {
          completedIds: nextCompletedIds,
          completedDates: nextCompletedDates,
          solvedByTrail: nextSolvedByTrail,
        };
        try {
          window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore storage write failures
        }
        return updated;
      });
    },
    [activeSaintTrail, selectedDate, todayKey]
  );

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

  const handleSelectEntry = (entry: CalendarIndexEntry) => {
    soundEngine.playEffect('compass_click');
    trackUmami('sacred_trail_selected', { saint: entry.id, date: entry.date });
    setIsDrawerOpen(false);
    void loadTrailForEntry(entry);
  };

  const selectedIndex = useMemo(
    () => calendarIndex.findIndex((e) => e.date === selectedDate),
    [calendarIndex, selectedDate]
  );

  const stripEntries = useMemo(() => {
    if (!calendarIndex.length) return [];
    const anchor = selectedIndex >= 0 ? selectedIndex : 0;
    const total = calendarIndex.length;
    const windowSize = Math.min(7, total);
    let start = Math.max(0, anchor - 3);
    if (start + windowSize > total) {
      start = Math.max(0, total - windowSize);
    }
    return calendarIndex.slice(start, start + windowSize);
  }, [calendarIndex, selectedIndex]);

  const prevEntry = selectedIndex > 0 ? calendarIndex[selectedIndex - 1] : null;
  const nextEntry =
    selectedIndex >= 0 && selectedIndex < calendarIndex.length - 1
      ? calendarIndex[selectedIndex + 1]
      : null;

  const todayEntry = useMemo(
    () => calendarIndex.find((e) => e.date === todayKey) || null,
    [calendarIndex, todayKey]
  );

  const drawerGroups = useMemo(() => {
    const q = drawerQuery.trim().toLowerCase();
    const filtered = calendarIndex.filter((e) => {
      if (drawerFilter === 'feast' && !e.isFeastDay) return false;
      if (drawerFilter === 'visited' && !progress.completedIds.includes(e.id)) return false;
      if (!q) return true;
      return (
        e.saintName.toLowerCase().includes(q) ||
        e.shortTitle.toLowerCase().includes(q) ||
        e.date.includes(q) ||
        e.feastDay.toLowerCase().includes(q) ||
        e.eraSpan.toLowerCase().includes(q)
      );
    });

    const groups: Record<string, CalendarIndexEntry[]> = {};
    for (const entry of filtered) {
      if (!groups[entry.monthKey]) groups[entry.monthKey] = [];
      groups[entry.monthKey].push(entry);
    }
    return Object.entries(groups);
  }, [calendarIndex, drawerQuery, drawerFilter, progress.completedIds]);

  const activeOptionObj = SOUNDTRACK_OPTIONS.find((o) => o.id === selectedSoundtrack);

  return (
    <div className="min-h-screen bg-[#F3EDE2] text-[#221E1A] selection:bg-[#4F6348]/20">
      {/* Sunlit Travertine Gallery Header */}
      <header className="sticky top-0 z-30 border-b border-[#DCD2C0] bg-[#FCFBF8]/95 px-3 py-2.5 backdrop-blur-md sm:px-6 sm:py-3">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2.5">
          {/* Brand + Active Saint */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C8D4C2] bg-[#EAEFE7] sm:h-10 sm:w-10">
              <Compass className="h-4 w-4 text-[#4F6348] sm:h-5 sm:w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A65B3A]">
                  Sacred Trails · 365-Day Guided Pilgrimage Atlas
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

          {/* Right Controls: Today shortcut, 365 Atlas Drawer, Ambient Sound Menu */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {todayEntry && selectedDate !== todayKey && (
              <button
                onClick={() => handleSelectEntry(todayEntry)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#C8D4C2] bg-[#EAEFE7] px-2.5 py-1.5 text-[11px] font-semibold text-[#35462F] transition hover:bg-[#DFE8DA] sm:px-3 sm:text-xs cursor-pointer"
              >
                <span>Today’s Saint</span>
              </button>
            )}

            <button
              onClick={() => {
                soundEngine.playEffect('compass_click');
                setIsDrawerOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#4F6348] bg-[#4F6348] px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#3F5139] sm:px-3.5 sm:text-xs cursor-pointer"
              title="Browse all 365 Saints"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Browse 365 Saints</span>
            </button>

            {/* Optional Ambient Audio Menu (Defaults to Sound Off) */}
            <div ref={audioMenuRef} className="relative flex items-center gap-1">
              <button
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
                aria-label={isMuted || selectedSoundtrack === 'none' ? 'Unmute ambient audio' : 'Mute ambient audio'}
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[#DCD2C0] bg-[#F5F0E6] text-[#655C50] transition hover:border-[#4F6348] hover:text-[#221E1A] cursor-pointer"
              >
                {isMuted || selectedSoundtrack === 'none' ? (
                  <VolumeX className="h-3.5 w-3.5 text-[#8A7F70]" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5 text-[#4F6348]" />
                )}
              </button>

              <button
                onClick={() => setIsAudioMenuOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[11px] font-semibold transition sm:gap-2 sm:px-3 sm:text-xs cursor-pointer ${
                  selectedSoundtrack !== 'none' && !isMuted
                    ? 'border-[#4F6348] bg-[#EAEFE7] text-[#2F402A]'
                    : 'border-[#DCD2C0] bg-[#F5F0E6] text-[#5C5347] hover:border-[#4F6348]/60 hover:text-[#221E1A]'
                }`}
                title="Choose Optional Ambient Background Music"
              >
                <Music className="h-3.5 w-3.5 shrink-0 text-[#4F6348]" />
                <span className="max-w-[110px] truncate sm:max-w-[155px]">
                  {activeOptionObj ? activeOptionObj.label : 'Sound Off'}
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

        {/* Clean 7-Day Calendar Strip (All Saints Open to Explore Anytime) */}
        {stripEntries.length > 0 && (
          <div className="mx-auto mt-2.5 flex max-w-[1440px] items-center gap-1.5 border-t border-[#EAE2D6] pt-2.5">
            <button
              onClick={() => prevEntry && handleSelectEntry(prevEntry)}
              disabled={!prevEntry}
              aria-label="Previous day"
              className="hidden h-10 w-8 shrink-0 items-center justify-center rounded-xl border border-[#DCD2C0] bg-[#F5F0E6] text-[#655C50] transition hover:border-[#4F6348] hover:text-[#221E1A] disabled:opacity-30 sm:flex cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="grid flex-1 grid-cols-7 gap-1.5 overflow-x-auto">
              {stripEntries.map((entry) => {
                const isSelected = entry.date === selectedDate;
                const isToday = entry.date === todayKey;
                const isVisited = progress.completedIds.includes(entry.id);
                const { monthShort, dayNum } = formatShortDate(entry.date);
                return (
                  <button
                    key={entry.date}
                    onClick={() => handleSelectEntry(entry)}
                    className={`group relative flex min-w-[82px] flex-col items-start rounded-xl border px-2.5 py-1.5 text-left transition sm:min-w-0 cursor-pointer ${
                      isSelected
                        ? 'border-[#4F6348] bg-[#4F6348] text-white shadow-sm'
                        : isToday
                          ? 'border-[#A65B3A]/60 bg-[#F7ECE6] text-[#221E1A] hover:border-[#4F6348]'
                          : 'border-[#DCD2C0] bg-[#F5F0E6] text-[#221E1A] hover:border-[#4F6348]/60 hover:bg-[#ECE4D6]'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between gap-1">
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                          isSelected
                            ? 'text-[#E1EAD8]'
                            : isToday
                              ? 'text-[#A65B3A]'
                              : 'text-[#756B5E]'
                        }`}
                      >
                        {isToday ? 'Today' : `${monthShort} ${dayNum}`}
                      </span>
                      {isVisited ? (
                        <Check
                          className={`h-3 w-3 ${isSelected ? 'text-[#E1EAD8]' : 'text-[#4F6348]'}`}
                        />
                      ) : entry.isFeastDay ? (
                        <Star
                          className={`h-2.5 w-2.5 ${
                            isSelected
                              ? 'fill-[#F3D9B1] text-[#F3D9B1]'
                              : 'fill-[#A65B3A] text-[#A65B3A]'
                          }`}
                        />
                      ) : null}
                    </div>
                    <span
                      className={`mt-0.5 w-full truncate text-[11px] font-semibold ${
                        isSelected ? 'text-white' : 'text-[#221E1A]'
                      }`}
                    >
                      {entry.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => nextEntry && handleSelectEntry(nextEntry)}
              disabled={!nextEntry}
              aria-label="Next day"
              className="hidden h-10 w-8 shrink-0 items-center justify-center rounded-xl border border-[#DCD2C0] bg-[#F5F0E6] text-[#655C50] transition hover:border-[#4F6348] hover:text-[#221E1A] disabled:opacity-30 sm:flex cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Sub-Navigation Collection Bar */}
        <nav
          aria-label="Sacred journey collections"
          className="mx-auto mt-2 flex max-w-[1440px] items-center justify-between gap-4 overflow-x-auto border-t border-[#EAE2D6] pt-2 text-[11px]"
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
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[#7A7062] sm:inline">
            {activeSaintTrail ? activeSaintTrail.eraSpan : '365 SAINTS · 65 COUNTRIES'}
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
              onSolvedCountChange={handleVisitedCountChange}
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
              Sacred Trails pairs interactive 3D world geography with concise, AI-assisted historical summaries of the lives, sanctuaries, and traditional quotes of 365 Catholic Saints, accompanied by custom museum-style illustrations. Divine Pilgrim is an independent educational project without ecclesiastical approval; for primary writings of the Saints, explore{' '}
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

      {/* Slide-Over 365-Day Saints Atlas Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#1A1612]/45 backdrop-blur-sm">
          <div className="flex h-full w-full max-w-md flex-col border-l border-[#DCD2C0] bg-[#FCFBF8] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EAE2D6] px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A65B3A]">
                  365-Day Pilgrimage Atlas
                </p>
                <h2 className="font-serif text-xl font-bold text-[#221E1A]">
                  Browse All Saints
                </h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close Atlas"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#DCD2C0] bg-[#F5F0E6] text-[#655C50] hover:border-[#4F6348] hover:text-[#221E1A] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2.5 border-b border-[#EAE2D6] px-5 py-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#857A6B]" />
                <input
                  type="text"
                  value={drawerQuery}
                  onChange={(e) => setDrawerQuery(e.target.value)}
                  placeholder="Search any saint, country, or date..."
                  className="w-full rounded-xl border border-[#DCD2C0] bg-[#F5F0E6] py-2 pl-9 pr-3 text-xs text-[#221E1A] placeholder-[#857A6B] outline-none focus:border-[#4F6348]"
                />
              </div>

              <div className="flex gap-1.5">
                {(['all', 'feast', 'visited'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDrawerFilter(tab)}
                    className={`flex-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold capitalize transition cursor-pointer ${
                      drawerFilter === tab
                        ? 'border-[#4F6348] bg-[#4F6348] text-white'
                        : 'border-[#DCD2C0] bg-[#F5F0E6] text-[#5C5347] hover:text-[#221E1A]'
                    }`}
                  >
                    {tab === 'all' ? `All (${calendarIndex.length || 365})` : tab === 'feast' ? 'Feast Days' : 'Visited'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
              {drawerGroups.length === 0 ? (
                <p className="py-10 text-center text-xs text-[#786E60]">
                  No saints match this search yet.
                </p>
              ) : (
                drawerGroups.map(([monthKey, entries]) => (
                  <div key={monthKey}>
                    <h3 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#A65B3A]">
                      {formatMonthHeading(monthKey)}
                    </h3>
                    <div className="space-y-1.5">
                      {entries.map((entry) => {
                        const isSelected = entry.date === selectedDate;
                        const isDone = progress.completedIds.includes(entry.id);
                        const { monthShort, dayNum } = formatShortDate(entry.date);
                        return (
                          <button
                            key={entry.date}
                            onClick={() => handleSelectEntry(entry)}
                            className={`flex w-full items-center gap-3 rounded-xl border p-2 text-left transition cursor-pointer ${
                              isSelected
                                ? 'border-[#4F6348] bg-[#EAEFE7]'
                                : 'border-[#E6DDD0] bg-[#FAF7F2] hover:border-[#4F6348]/60 hover:bg-[#F1EAE0]'
                            }`}
                          >
                            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-[#DCD2C0] bg-[#E8E0D2]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={entry.previewImage}
                                alt={entry.shortTitle}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] font-bold uppercase text-[#A65B3A]">
                                  {monthShort} {dayNum}
                                </span>
                                {entry.date === todayKey && (
                                  <span className="rounded bg-[#4F6348] px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                                    Today
                                  </span>
                                )}
                                {entry.isFeastDay && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase text-[#A65B3A]">
                                    <Star className="h-2.5 w-2.5 fill-[#A65B3A]" />
                                    Feast
                                  </span>
                                )}
                              </div>
                              <div className="truncate font-serif text-sm font-bold text-[#221E1A]">
                                {entry.saintName}
                              </div>
                              <div className="truncate text-[10px] text-[#655C50]">
                                {entry.eraSpan}
                              </div>
                            </div>
                            {isDone && <Check className="h-4 w-4 shrink-0 text-[#4F6348]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
