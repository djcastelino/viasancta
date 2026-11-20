"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Compass,
  Volume2,
  VolumeX,
  Music,
  Award,
  ChevronDown,
  Check,
  ArrowUpRight,
  Sparkles,
  Lock,
  Unlock,
  Calendar,
  Flame,
  Search,
  X,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  Loader2,
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

function formatLongDate(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[dt.getUTCMonth()]} ${dt.getUTCDate()}, ${dt.getUTCFullYear()}`;
}

function formatMonthHeading(monthKey: string): string {
  const [y, m] = monthKey.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[m - 1] || monthKey} ${y}`;
}

function computeStreak(completedDates: string[], todayKey: string): number {
  if (!completedDates.length) return 0;
  const set = new Set(completedDates);
  const parse = (k: string) => {
    const [y, m, d] = k.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
  };
  const fmt = (dt: Date) => dt.toISOString().slice(0, 10);

  const cursor = parse(todayKey);
  if (!set.has(fmt(cursor))) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
    if (!set.has(fmt(cursor))) return 0;
  }
  let streak = 0;
  while (set.has(fmt(cursor))) {
    streak++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

function getTimeUntilMidnight(): string {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const diffMs = Math.max(0, midnight.getTime() - now.getTime());
  const hrs = Math.floor(diffMs / 3_600_000);
  const mins = Math.floor((diffMs % 3_600_000) / 60_000);
  return `${hrs}h ${String(mins).padStart(2, '0')}m`;
}

function daysUntilDec1(todayKey: string): number | null {
  if (todayKey < '2026-11-20' || todayKey >= '2026-12-01') return null;
  const [y, m, d] = todayKey.split('-').map(Number);
  const todayUtc = Date.UTC(y, m - 1, d);
  const dec1Utc = Date.UTC(2026, 11, 1);
  return Math.max(0, Math.round((dec1Utc - todayUtc) / 86_400_000));
}

export default function SacredTrailsClient() {
  const [todayKey, setTodayKey] = useState<string>(() => getLocalDateKey());
  const [midnightCountdown, setMidnightCountdown] = useState<string>(() => getTimeUntilMidnight());

  // Discreet Admin QA mode (?preview=all) — invisible to regular visitors
  const [isAdminPreview, setIsAdminPreview] = useState<boolean>(false);

  // Calendar index & lazy-loaded monthly trail data
  const [calendarIndex, setCalendarIndex] = useState<CalendarIndexEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [activeSaintTrail, setActiveSaintTrail] = useState<SaintTrailProfile | null>(null);
  const [isLoadingTrail, setIsLoadingTrail] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const monthCacheRef = useRef<Record<string, SaintTrailProfile[]>>({});

  // Interactive progress & streak
  const [v2SolvedCount, setV2SolvedCount] = useState<number>(0);
  const [progress, setProgress] = useState<PilgrimProgress>(DEFAULT_PROGRESS);
  const [lockedNoticeDate, setLockedNoticeDate] = useState<string | null>(null);

  // Archive drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerQuery, setDrawerQuery] = useState<string>('');
  const [drawerFilter, setDrawerFilter] = useState<'all' | 'feast' | 'completed'>('all');

  // Audio state (preserves default Instrumental Hymns at 7% volume)
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [masterVolume, setMasterVolume] = useState<number>(7);
  const [selectedSoundtrack, setSelectedSoundtrack] =
    useState<SacredAmbientPreset>('instrumental_hymns');
  const [isAudioMenuOpen, setIsAudioMenuOpen] = useState<boolean>(false);
  const audioMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('preview') === 'all') {
      setIsAdminPreview(true);
    }

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
      setMidnightCountdown(getTimeUntilMidnight());
    }, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    soundEngine.setVolume(0.07);
    soundEngine.startAmbient('instrumental_hymns');
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

  const isDateUnlocked = useCallback(
    (dateKey: string): boolean => {
      if (isAdminPreview) return true;
      return dateKey <= todayKey;
    },
    [isAdminPreview, todayKey]
  );

  const loadTrailForEntry = useCallback(async (entry: CalendarIndexEntry) => {
    setIsLoadingTrail(true);
    setLoadError(null);
    setSelectedDate(entry.date);
    setV2SolvedCount(0);
    setLockedNoticeDate(null);

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
      setLoadError('Showing offline featured trail.');
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
        if (requestedDate) {
          const match = list.find((e) => e.date === requestedDate);
          if (match && (previewAll || match.date <= localToday)) {
            initialEntry = match;
          }
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

  const handleSolvedCountChange = useCallback(
    (count: number) => {
      setV2SolvedCount(count);
      if (!activeSaintTrail || count <= 0) return;

      setProgress((prev) => {
        const prevMax = prev.solvedByTrail[activeSaintTrail.id] || 0;
        const nextSolvedByTrail =
          count > prevMax
            ? { ...prev.solvedByTrail, [activeSaintTrail.id]: count }
            : prev.solvedByTrail;

        const isFullySolved = count >= activeSaintTrail.stops.length;
        const trailDate = activeSaintTrail.calendarDate || selectedDate || todayKey;
        const nextCompletedIds =
          isFullySolved && !prev.completedIds.includes(activeSaintTrail.id)
            ? [...prev.completedIds, activeSaintTrail.id]
            : prev.completedIds;
        const nextCompletedDates =
          isFullySolved && !prev.completedDates.includes(trailDate)
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
    if (!isDateUnlocked(entry.date)) {
      soundEngine.playEffect('compass_click');
      setLockedNoticeDate(entry.date);
      return;
    }
    soundEngine.playEffect('compass_click');
    trackUmami('sacred_trail_selected', { saint: entry.id, date: entry.date });
    setIsDrawerOpen(false);
    void loadTrailForEntry(entry);
  };

  const stripEntries = useMemo(() => {
    if (!calendarIndex.length) return [];
    const anchorDate = selectedDate || todayKey;
    let centerIdx = calendarIndex.findIndex((e) => e.date === anchorDate);
    if (centerIdx === -1) {
      centerIdx = calendarIndex.findIndex((e) => e.date === todayKey);
    }
    if (centerIdx === -1) centerIdx = 0;

    const windowSize = 7;
    let start = Math.max(0, centerIdx - 3);
    let end = start + windowSize;
    if (end > calendarIndex.length) {
      end = calendarIndex.length;
      start = Math.max(0, end - windowSize);
    }
    return calendarIndex.slice(start, end);
  }, [calendarIndex, selectedDate, todayKey]);

  const currentIdx = useMemo(
    () => calendarIndex.findIndex((e) => e.date === selectedDate),
    [calendarIndex, selectedDate]
  );
  const prevEntry = currentIdx > 0 ? calendarIndex[currentIdx - 1] : null;
  const nextEntry =
    currentIdx >= 0 && currentIdx < calendarIndex.length - 1
      ? calendarIndex[currentIdx + 1]
      : null;

  const activeEntry = useMemo(
    () => calendarIndex.find((e) => e.date === selectedDate) || null,
    [calendarIndex, selectedDate]
  );

  const drawerGroups = useMemo(() => {
    const q = drawerQuery.trim().toLowerCase();
    const filtered = calendarIndex.filter((entry) => {
      const unlocked = isDateUnlocked(entry.date);
      if (drawerFilter === 'feast' && !entry.isFeastDay) return false;
      if (drawerFilter === 'completed' && !progress.completedIds.includes(entry.id)) return false;
      if (!q) return true;
      if (!unlocked) return entry.date.includes(q);
      return (
        entry.saintName.toLowerCase().includes(q) ||
        entry.feastDay.toLowerCase().includes(q) ||
        entry.eraSpan.toLowerCase().includes(q) ||
        entry.date.includes(q)
      );
    });

    const grouped: Record<string, CalendarIndexEntry[]> = {};
    for (const item of filtered) {
      if (!grouped[item.monthKey]) grouped[item.monthKey] = [];
      grouped[item.monthKey].push(item);
    }
    return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]));
  }, [calendarIndex, drawerQuery, drawerFilter, isDateUnlocked, progress.completedIds]);

  const unlockedCount = useMemo(
    () => calendarIndex.filter((e) => isDateUnlocked(e.date)).length,
    [calendarIndex, isDateUnlocked]
  );
  const streakCount = useMemo(
    () => computeStreak(progress.completedDates, todayKey),
    [progress.completedDates, todayKey]
  );
  const adventDaysLeft = useMemo(() => daysUntilDec1(todayKey), [todayKey]);
  const activeOptionObj = SOUNDTRACK_OPTIONS.find((o) => o.id === selectedSoundtrack);

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#f4efe6] selection:bg-[#d4af37]/30 selection:text-[#fef08a]">
      {/* Slim Advent Launch Ribbon (Nov 20 - Nov 30 only; auto-hides Dec 1) */}
      {adventDaysLeft !== null && (
        <div className="border-b border-[#d4af37]/25 bg-gradient-to-r from-[#1c150c] via-[#261d10] to-[#1c150c] px-3 py-1.5 text-center text-[11px] text-[#e6d5b8] sm:text-xs">
          <span className="inline-flex flex-wrap items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
            <strong className="text-[#fef08a]">Daily Sacred Calendar is Live!</strong>
            <span>
              A new saint unlocks every midnight — {adventDaysLeft}{' '}
              {adventDaysLeft === 1 ? 'day' : 'days'} until our 31-Day December Advent &amp; Christmas Trail.
            </span>
          </span>
        </div>
      )}

      {/* Discreet Admin Preview Banner (only when ?preview=all is in URL) */}
      {isAdminPreview && (
        <div className="border-b border-emerald-500/30 bg-emerald-950/70 px-3 py-1.5 text-xs text-emerald-200">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Unlock className="h-3.5 w-3.5 text-emerald-400" />
              <span>
                Admin Preview Mode · All {calendarIndex.length || 42} Daily Trails unlocked for inspection
              </span>
            </span>
            <button
              onClick={() => {
                setIsAdminPreview(false);
                const url = new URL(window.location.href);
                url.searchParams.delete('preview');
                window.history.replaceState({}, '', url.toString());
              }}
              className="rounded-lg border border-emerald-400/40 bg-emerald-900/50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-100 transition hover:bg-emerald-800/70"
            >
              Exit Preview Mode
            </button>
          </div>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#262018] bg-[#0e0c09]/95 px-3 py-2.5 backdrop-blur-md sm:px-8 sm:py-3">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          {/* Zone 1: Brand & Today's Saint */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-t-2xl border border-[#d4af37]/50 bg-[#1a150e] text-[#d4af37] shadow-inner sm:h-10 sm:w-10">
              <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d4af37] sm:text-[10px]">
                  Divine Pilgrim · Sacred Trails
                </span>
                {selectedDate && (
                  <span className="inline-flex items-center gap-1 rounded-md border border-[#d4af37]/40 bg-[#241d12] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#fef08a]">
                    <Calendar className="h-2.5 w-2.5 text-[#d4af37]" />
                    {selectedDate === todayKey ? 'Today · ' : ''}
                    {formatLongDate(selectedDate)}
                  </span>
                )}
                {activeEntry?.isFeastDay && (
                  <span className="inline-flex items-center gap-1 rounded-md border border-amber-400/50 bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300">
                    <Star className="h-2.5 w-2.5 fill-amber-300 text-amber-300" />
                    Feast Day
                  </span>
                )}
              </div>
              <h1 className="font-serif text-base font-bold tracking-tight text-[#f4efe6] sm:text-xl">
                {activeSaintTrail ? activeSaintTrail.saintName : 'Loading Today’s Sacred Trail...'}
              </h1>
            </div>
          </div>

          {/* Zone 2: Calendar Archive, Streak/Seals, Android App & Audio */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playEffect('compass_click');
                setIsDrawerOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#d4af37]/45 bg-[#201a11] px-2.5 py-1.5 text-[11px] font-bold text-[#fef08a] transition hover:border-[#d4af37] hover:bg-[#2a2114] sm:px-3 sm:text-xs"
            >
              <Calendar className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>Calendar</span>
              <span className="rounded-md bg-[#342919] px-1.5 py-0.5 font-mono text-[10px] text-[#e6d5b8]">
                {unlockedCount}/{calendarIndex.length || 42}
              </span>
            </button>

            <div
              className="hidden items-center gap-1.5 rounded-xl border border-[#2a231a] bg-[#16120d] px-2.5 py-1.5 text-xs lg:flex"
              title="Your personal pilgrimage streak and completed trails (saved privately on this device)"
            >
              <Flame className={`h-3.5 w-3.5 ${streakCount > 0 ? 'text-amber-400' : 'text-[#6c6150]'}`} />
              <span className="font-bold text-[#f4efe6]">{streakCount}d</span>
              <span className="text-[#6c6150]">·</span>
              <span className="text-[#a39783]">Completed:</span>
              <strong className="text-[#fef08a]">{progress.completedIds.length}</strong>
            </div>

            {activeSaintTrail && (
              <div className="hidden items-center gap-1.5 rounded-xl border border-[#2a231a] bg-[#16120d] px-3 py-1.5 text-xs md:flex">
                <Award className="h-4 w-4 text-[#d4af37]" />
                <span className="text-[#a39783]">Seals:</span>
                <strong className="text-[#f4efe6]">
                  {v2SolvedCount} / {activeSaintTrail.stops.length}
                </strong>
              </div>
            )}

            <a
              href="https://play.google.com/store/apps/details?id=com.divinepilgrim.www.twa"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-2.5 py-1.5 text-[11px] font-bold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-900/40 sm:inline-flex sm:px-3 sm:text-xs"
              title="Get the official Divine Pilgrim Android App on Google Play"
            >
              <span>Android App</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
            </a>

            <div ref={audioMenuRef} className="relative flex items-center gap-1">
              <button
                onClick={() => setIsMuted((m) => !m)}
                aria-label={isMuted ? 'Unmute sacred audio' : 'Mute sacred audio'}
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[#2c241b] bg-[#17130e] text-[#cfc3ae] transition hover:border-[#d4af37]/60 hover:text-[#fef08a]"
              >
                {isMuted || selectedSoundtrack === 'none' ? (
                  <VolumeX className="h-3.5 w-3.5 text-[#8c7f6c]" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5 text-[#d4af37]" />
                )}
              </button>

              <button
                onClick={() => setIsAudioMenuOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[11px] font-semibold transition sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs ${
                  selectedSoundtrack !== 'none'
                    ? 'border-[#d4af37] bg-[#261f14] text-[#fef08a] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    : 'border-[#2c241b] bg-[#17130e] text-[#cfc3ae] hover:border-[#d4af37]/60 hover:text-[#f4efe6]'
                }`}
                title="Choose Sacred Soundtrack or Cinematic Score"
              >
                <Music className="h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
                <span className="max-w-[100px] truncate sm:max-w-[140px]">
                  {activeOptionObj ? activeOptionObj.label : 'Sacred Audio'}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                    isAudioMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isAudioMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-[calc(100vw-1.5rem)] max-w-80 overflow-hidden rounded-2xl border border-[#3d3224] bg-[#14110d] p-2 shadow-2xl">
                  <div className="border-b border-[#262018] px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                      Sacred &amp; Cinematic Soundscapes
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#9a8e7a]">
                      Studio-Mastered Cathedral Acoustics
                    </p>
                  </div>
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
                    {SOUNDTRACK_OPTIONS.map((opt) => {
                      const active = opt.id === selectedSoundtrack;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectSoundtrack(opt.id)}
                          className={`flex w-full items-start justify-between gap-2 rounded-xl px-3 py-2 text-left transition ${
                            active
                              ? 'bg-[#2a2114] text-[#fef08a] ring-1 ring-[#d4af37]/50'
                              : 'text-[#cfc3ae] hover:bg-[#1e1912] hover:text-[#f4efe6]'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-semibold">{opt.label}</div>
                            <div className="text-[10px] text-[#9a8e7a]">{opt.subtitle}</div>
                          </div>
                          {active && <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SINGLE UNCLUTTERED DAILY CALENDAR STRIP */}
        {stripEntries.length > 0 && (
          <div className="mx-auto mt-2.5 flex max-w-[1440px] items-center gap-1.5 border-t border-[#1f1a13] pt-2.5">
            <button
              onClick={() => prevEntry && handleSelectEntry(prevEntry)}
              disabled={!prevEntry}
              aria-label="Previous day"
              className="hidden h-10 w-8 shrink-0 items-center justify-center rounded-xl border border-[#2a2218] bg-[#14110c] text-[#a39783] transition hover:border-[#d4af37]/50 hover:text-[#fef08a] disabled:opacity-30 sm:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="grid flex-1 grid-cols-7 gap-1.5 overflow-x-auto">
              {stripEntries.map((entry) => {
                const unlocked = isDateUnlocked(entry.date);
                const isSelected = entry.date === selectedDate;
                const isToday = entry.date === todayKey;
                const isDone = progress.completedIds.includes(entry.id);
                const { monthShort, dayNum } = formatShortDate(entry.date);

                return (
                  <button
                    key={entry.date}
                    onClick={() => handleSelectEntry(entry)}
                    className={`group relative flex min-w-[76px] flex-col items-start rounded-xl border px-2 py-1.5 text-left transition sm:min-w-0 sm:px-2.5 ${
                      isSelected
                        ? 'border-[#d4af37] bg-gradient-to-b from-[#2b2214] to-[#1b150d] shadow-[0_0_16px_rgba(212,175,55,0.18)]'
                        : unlocked
                        ? 'border-[#272017] bg-[#14110c] hover:border-[#d4af37]/50 hover:bg-[#1b160f]'
                        : 'border-[#1d1812] bg-[#100d0a] opacity-75 hover:border-[#33291d]'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between gap-1">
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                          isSelected
                            ? 'text-[#fef08a]'
                            : isToday
                            ? 'text-[#d4af37]'
                            : 'text-[#8c7f6c]'
                        }`}
                      >
                        {monthShort} {dayNum}
                      </span>
                      {isDone ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : !unlocked ? (
                        <Lock className="h-2.5 w-2.5 text-[#756856]" />
                      ) : entry.isFeastDay ? (
                        <Star className="h-2.5 w-2.5 fill-amber-400/80 text-amber-400" />
                      ) : null}
                    </div>
                    <span
                      className={`mt-0.5 w-full truncate text-[11px] font-semibold ${
                        isSelected
                          ? 'text-[#f4efe6]'
                          : unlocked
                          ? 'text-[#cfc3ae] group-hover:text-[#f4efe6]'
                          : 'italic text-[#756856]'
                      }`}
                    >
                      {unlocked ? entry.shortTitle : 'Mystery'}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => nextEntry && handleSelectEntry(nextEntry)}
              disabled={!nextEntry || !isDateUnlocked(nextEntry.date)}
              aria-label="Next unlocked day"
              className="hidden h-10 w-8 shrink-0 items-center justify-center rounded-xl border border-[#2a2218] bg-[#14110c] text-[#a39783] transition hover:border-[#d4af37]/50 hover:text-[#fef08a] disabled:opacity-30 sm:flex"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Locked Future Day Notice */}
        {lockedNoticeDate && (
          <div className="mx-auto mt-2 flex max-w-[1440px] items-center justify-between gap-2 rounded-xl border border-[#d4af37]/30 bg-[#1a140c] px-3 py-2 text-xs text-[#e6d5b8]">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
              <span>
                <strong className="text-[#fef08a]">{formatLongDate(lockedNoticeDate)}</strong> is a
                sealed Mystery Trail. Next saint unlocks at midnight (in{' '}
                <strong className="font-mono text-[#fef08a]">{midnightCountdown}</strong>).
              </span>
            </div>
            <button
              onClick={() => setLockedNoticeDate(null)}
              className="text-[#8c7f6c] hover:text-[#f4efe6]"
              aria-label="Dismiss notice"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Sub-Navigation Collection Bar */}
        <nav
          aria-label="Sacred journey collections"
          className="mx-auto mt-2 flex max-w-[1440px] items-center justify-between gap-4 overflow-x-auto border-t border-[#1f1a13] pt-2 text-[11px]"
        >
          <div className="flex shrink-0 items-center gap-5">
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
            {activeSaintTrail
              ? `DAILY PILGRIMAGE · ${activeSaintTrail.eraSpan.toUpperCase()}`
              : 'DAILY PILGRIMAGE CALENDAR'}
          </span>
        </nav>
      </header>

      {/* Main 3D Globe Sacred Trail Canvas */}
      <main>
        {isLoadingTrail || !activeSaintTrail ? (
          <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#d4af37]" />
            <p className="font-serif text-lg text-[#e6d5b8]">
              Preparing today’s sacred footsteps...
            </p>
          </div>
        ) : (
          <>
            {loadError && (
              <div className="mx-auto mt-2 max-w-[1440px] px-4 text-center text-xs text-amber-300/80">
                {loadError}
              </div>
            )}
            <Version2GlobeDetective
              key={activeSaintTrail.id}
              saintTrail={activeSaintTrail}
              onSolvedCountChange={handleSolvedCountChange}
            />
          </>
        )}
      </main>

      {/* SLIDE-OVER CALENDAR ARCHIVE DRAWER */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
          <aside className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[#33291c] bg-[#120f0b] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#262018] px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  Sacred Trails Archive
                </p>
                <h2 className="font-serif text-lg font-bold text-[#f4efe6]">
                  Daily Saints Calendar
                </h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close calendar drawer"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#2d2419] bg-[#1a150f] text-[#a39783] transition hover:border-[#d4af37]/60 hover:text-[#f4efe6]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 border-b border-[#262018] bg-[#16120d] px-5 py-3 text-center">
              <div className="rounded-xl border border-[#2a2218] bg-[#110e0a] py-2">
                <div className="font-mono text-sm font-bold text-[#fef08a]">
                  {unlockedCount}/{calendarIndex.length || 42}
                </div>
                <div className="text-[10px] text-[#8c7f6c]">Unlocked</div>
              </div>
              <div className="rounded-xl border border-[#2a2218] bg-[#110e0a] py-2">
                <div className="font-mono text-sm font-bold text-emerald-300">
                  {progress.completedIds.length}
                </div>
                <div className="text-[10px] text-[#8c7f6c]">Completed</div>
              </div>
              <div className="rounded-xl border border-[#2a2218] bg-[#110e0a] py-2">
                <div className="font-mono text-sm font-bold text-amber-300">
                  {midnightCountdown}
                </div>
                <div className="text-[10px] text-[#8c7f6c]">Next Unlock</div>
              </div>
            </div>

            <div className="space-y-2.5 border-b border-[#262018] px-5 py-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8c7f6c]" />
                <input
                  type="text"
                  value={drawerQuery}
                  onChange={(e) => setDrawerQuery(e.target.value)}
                  placeholder="Search unlocked saints or dates..."
                  className="w-full rounded-xl border border-[#2e261b] bg-[#18140f] py-2 pl-9 pr-3 text-xs text-[#f4efe6] placeholder-[#756856] outline-none focus:border-[#d4af37]"
                />
              </div>
              <div className="flex gap-1.5">
                {(['all', 'feast', 'completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDrawerFilter(tab)}
                    className={`flex-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold capitalize transition ${
                      drawerFilter === tab
                        ? 'border-[#d4af37] bg-[#261f14] text-[#fef08a]'
                        : 'border-[#272017] bg-[#15110c] text-[#9a8e7a] hover:text-[#f4efe6]'
                    }`}
                  >
                    {tab === 'feast' ? 'Feast Days' : tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
              {drawerGroups.length === 0 ? (
                <p className="py-10 text-center text-xs text-[#8c7f6c]">
                  No trails match this filter yet.
                </p>
              ) : (
                drawerGroups.map(([monthKey, entries]) => (
                  <div key={monthKey}>
                    <h3 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
                      {formatMonthHeading(monthKey)}
                    </h3>
                    <div className="space-y-1.5">
                      {entries.map((entry) => {
                        const unlocked = isDateUnlocked(entry.date);
                        const isSelected = entry.date === selectedDate;
                        const isDone = progress.completedIds.includes(entry.id);
                        const { monthShort, dayNum } = formatShortDate(entry.date);

                        return (
                          <button
                            key={entry.date}
                            onClick={() => handleSelectEntry(entry)}
                            className={`flex w-full items-center gap-3 rounded-xl border p-2 text-left transition ${
                              isSelected
                                ? 'border-[#d4af37] bg-[#241c11]'
                                : unlocked
                                ? 'border-[#251f16] bg-[#17130e] hover:border-[#d4af37]/50 hover:bg-[#1e1810]'
                                : 'border-[#1d1812] bg-[#100d0a] opacity-70'
                            }`}
                          >
                            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-[#33291c] bg-[#1c160f]">
                              {unlocked ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                  src={entry.previewImage}
                                  alt={entry.shortTitle}
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[#756856]">
                                  <Lock className="h-4 w-4" />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] font-bold uppercase text-[#d4af37]">
                                  {monthShort} {dayNum}
                                </span>
                                {entry.date === todayKey && (
                                  <span className="rounded bg-[#d4af37]/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#fef08a]">
                                    Today
                                  </span>
                                )}
                                {unlocked && entry.isFeastDay && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase text-amber-300">
                                    <Star className="h-2.5 w-2.5 fill-amber-300" />
                                    Feast
                                  </span>
                                )}
                              </div>
                              <div
                                className={`truncate text-xs font-semibold ${
                                  unlocked ? 'text-[#f4efe6]' : 'italic text-[#756856]'
                                }`}
                              >
                                {unlocked ? entry.saintName : 'Mystery Saint · Unlocks at Midnight'}
                              </div>
                              {unlocked && (
                                <div className="truncate text-[10px] text-[#8c7f6c]">
                                  {entry.stopCount} Stops · {entry.eraSpan}
                                </div>
                              )}
                            </div>

                            {isDone && (
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                                <Check className="h-3.5 w-3.5" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
