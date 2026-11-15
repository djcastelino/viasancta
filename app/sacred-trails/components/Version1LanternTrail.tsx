"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  MapPin,
  Award,
  Sparkles,
  Bell,
  Flame,
  Search,
  Lock,
  Unlock,
  Eye,
} from 'lucide-react';
import {
  ST_AUGUSTINE_TRAIL_STOPS,
  TrailStop,
  HiddenSceneArtifact,
} from '../data/saintsTrails';
import { soundEngine } from '../utils/soundEngine';
import { ResilientImage } from './ResilientImage';

interface Version1LanternTrailProps {
  gracePoints: number;
  setGracePoints: React.Dispatch<React.SetStateAction<number>>;
  stampedStopNumbers: number[];
  setStampedStopNumbers: React.Dispatch<React.SetStateAction<number[]>>;
}

export const Version1LanternTrail: React.FC<Version1LanternTrailProps> = ({
  gracePoints,
  setGracePoints,
  stampedStopNumbers,
  setStampedStopNumbers,
}) => {
  const [currentStopIdx, setCurrentStopIdx] = useState<number>(0);
  const [foundArtifactIds, setFoundArtifactIds] = useState<string[]>([]);
  const [activeStoryArtifact, setActiveStoryArtifact] =
    useState<HiddenSceneArtifact | null>(null);
  const [targetRiddleIdx, setTargetRiddleIdx] = useState<number>(0);

  const [lanternPos, setLanternPos] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });
  const [isHoveringPhoto, setIsHoveringPhoto] = useState<boolean>(false);
  const [missClickPos, setMissClickPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showShimmerHint, setShowShimmerHint] = useState<boolean>(false);
  const lastProximityTickRef = useRef<number>(0);

  const [vaultSlots, setVaultSlots] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [activeVaultSlotIdx, setActiveVaultSlotIdx] = useState<number>(0);
  const [vaultFeedback, setVaultFeedback] = useState<string | null>(null);
  const [showTrailCompleteModal, setShowTrailCompleteModal] =
    useState<boolean>(false);

  const activeStop: TrailStop =
    ST_AUGUSTINE_TRAIL_STOPS[currentStopIdx] || ST_AUGUSTINE_TRAIL_STOPS[0];

  const currentTargetArtifact: HiddenSceneArtifact | undefined =
    activeStop.hiddenArtifacts[targetRiddleIdx] &&
    !foundArtifactIds.includes(activeStop.hiddenArtifacts[targetRiddleIdx].id)
      ? activeStop.hiddenArtifacts[targetRiddleIdx]
      : activeStop.hiddenArtifacts.find(
          (art) => !foundArtifactIds.includes(art.id)
        );

  const allThreeArtifactsFound =
    foundArtifactIds.length === activeStop.hiddenArtifacts.length;

  const allThreeVaultLocksSolved =
    vaultSlots[0] === activeStop.vaultPrompts[0].correctStoneId &&
    vaultSlots[1] === activeStop.vaultPrompts[1].correctStoneId &&
    vaultSlots[2] === activeStop.vaultPrompts[2].correctStoneId;

  let proximityLevel: 'COLD' | 'WARM' | 'HOT' = 'COLD';
  if (currentTargetArtifact && isHoveringPhoto) {
    const dx = lanternPos.x - currentTargetArtifact.xPercent;
    const dy = lanternPos.y - currentTargetArtifact.yPercent;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= currentTargetArtifact.hitRadius) {
      proximityLevel = 'HOT';
    } else if (dist <= currentTargetArtifact.hitRadius * 2.1) {
      proximityLevel = 'WARM';
    }
  }

  useEffect(() => {
    setFoundArtifactIds([]);
    setActiveStoryArtifact(null);
    setTargetRiddleIdx(0);
    setVaultSlots([null, null, null]);
    setActiveVaultSlotIdx(0);
    setVaultFeedback(null);
    setShowShimmerHint(false);
    setMissClickPos(null);
  }, [currentStopIdx]);

  const handleSelectStop = (index: number) => {
    soundEngine.play('vellum_page');
    setCurrentStopIdx(index);
    setShowTrailCompleteModal(false);
    document
      .getElementById('active-stop-stage')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSceneMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLanternPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });

    if (currentTargetArtifact) {
      const dx = x - currentTargetArtifact.xPercent;
      const dy = y - currentTargetArtifact.yPercent;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const now = Date.now();
      if (
        dist <= currentTargetArtifact.hitRadius &&
        now - lastProximityTickRef.current > 650
      ) {
        lastProximityTickRef.current = now;
        soundEngine.play('compass_click');
      }
    }
  };

  const handleSceneClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const matchedUnfound = activeStop.hiddenArtifacts.find((art) => {
      if (foundArtifactIds.includes(art.id)) return false;
      const dx = clickX - art.xPercent;
      const dy = clickY - art.yPercent;
      return Math.sqrt(dx * dx + dy * dy) <= art.hitRadius;
    });

    if (matchedUnfound) {
      soundEngine.play(matchedUnfound.soundCue);
      const updatedFound = [...foundArtifactIds, matchedUnfound.id];
      setFoundArtifactIds(updatedFound);
      setActiveStoryArtifact(matchedUnfound);
      setGracePoints((prev) => prev + 100);
      setShowShimmerHint(false);
      setMissClickPos(null);

      const nextUnfoundIdx = activeStop.hiddenArtifacts.findIndex(
        (a) => !updatedFound.includes(a.id)
      );
      if (nextUnfoundIdx !== -1) {
        setTargetRiddleIdx(nextUnfoundIdx);
      }
      return;
    }

    const matchedExisting = activeStop.hiddenArtifacts.find((art) => {
      const dx = clickX - art.xPercent;
      const dy = clickY - art.yPercent;
      return Math.sqrt(dx * dx + dy * dy) <= art.hitRadius;
    });

    if (matchedExisting) {
      soundEngine.play('compass_click');
      setActiveStoryArtifact(matchedExisting);
      return;
    }

    soundEngine.play('compass_click');
    setMissClickPos({ x: clickX, y: clickY });
    window.setTimeout(() => {
      setMissClickPos(null);
    }, 900);
  };

  const handleRingBellForHint = () => {
    soundEngine.play('sanctuary_bell');
    setShowShimmerHint(true);
    window.setTimeout(() => {
      setShowShimmerHint(false);
    }, 2600);
  };

  const handlePlaceStoneInVault = (stoneArtifact: HiddenSceneArtifact) => {
    const targetPrompt = activeStop.vaultPrompts[activeVaultSlotIdx];
    if (!targetPrompt) return;

    if (stoneArtifact.id === targetPrompt.correctStoneId) {
      const nextSlots = [...vaultSlots];
      nextSlots[activeVaultSlotIdx] = stoneArtifact.id;
      setVaultSlots(nextSlots);
      setVaultFeedback(null);
      setGracePoints((prev) => prev + 100);

      const allSolvedNow =
        nextSlots[0] === activeStop.vaultPrompts[0].correctStoneId &&
        nextSlots[1] === activeStop.vaultPrompts[1].correctStoneId &&
        nextSlots[2] === activeStop.vaultPrompts[2].correctStoneId;

      if (allSolvedNow) {
        soundEngine.play('wax_seal_stamp');
        if (!stampedStopNumbers.includes(activeStop.stopNumber)) {
          setStampedStopNumbers((prev) => [...prev, activeStop.stopNumber]);
          setGracePoints((prev) => prev + 250);
        }
      } else {
        soundEngine.play('gregorian_chime');
        const nextEmptyIdx = nextSlots.findIndex((s) => s === null);
        if (nextEmptyIdx !== -1) {
          setActiveVaultSlotIdx(nextEmptyIdx);
        }
      }
    } else {
      soundEngine.play('puzzle_mismatch');
      setVaultFeedback(
        `"${stoneArtifact.stoneKeyWord}" belongs to a different lock slot—read the prompt for ${targetPrompt.slotLabel}!`
      );
    }
  };

  const handleAdvanceToNextStop = () => {
    if (currentStopIdx + 1 < ST_AUGUSTINE_TRAIL_STOPS.length) {
      soundEngine.play('vellum_page');
      setCurrentStopIdx((prev) => prev + 1);
      document
        .getElementById('active-stop-stage')
        ?.scrollIntoView({ behavior: 'smooth' });
    } else {
      soundEngine.play('pilgrimage_complete');
      setShowTrailCompleteModal(true);
    }
  };

  const handleResetTrail = () => {
    soundEngine.play('vellum_page');
    setCurrentStopIdx(0);
    setStampedStopNumbers([]);
    setGracePoints(0);
    setShowTrailCompleteModal(false);
  };

  return (
    <div>
      {/* SECTION 1: Visual Trail Strip — All 6 Individual Pictures */}
      <section id="visual-trail-map" className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {ST_AUGUSTINE_TRAIL_STOPS.map((stop, idx) => {
            const isCurrent = idx === currentStopIdx;
            const isStamped = stampedStopNumbers.includes(stop.stopNumber);

            return (
              <button
                key={stop.stopNumber}
                type="button"
                onClick={() => handleSelectStop(idx)}
                className={`group text-left rounded-xl overflow-hidden border transition-all flex flex-col justify-between cursor-pointer ${
                  isCurrent
                    ? 'bg-[#1D1813] border-amber-500 ring-2 ring-amber-500/30'
                    : isStamped
                    ? 'bg-[#15120F] border-emerald-500/50 hover:border-emerald-400'
                    : 'bg-[#15120F] border-stone-800/90 hover:border-stone-600'
                }`}
              >
                <div className="relative h-28 w-full overflow-hidden bg-stone-900">
                  <ResilientImage
                    src={stop.image}
                    alt={stop.title}
                    fallbackTitle={stop.ancientPlaceName}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <div className="absolute top-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono">
                    <span
                      className={`px-1.5 py-0.5 rounded font-semibold ${
                        isCurrent
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-black/75 text-amber-300'
                      }`}
                    >
                      Stop 0{stop.stopNumber}
                    </span>
                    {isStamped && (
                      <span className="bg-emerald-500 text-stone-950 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        Unlocked
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2 left-2.5 right-2.5">
                    <div className="text-xs font-display font-semibold text-white truncate">
                      {stop.ancientPlaceName}
                    </div>
                  </div>
                </div>

                <div className="p-2.5">
                  <div className="text-[11px] font-mono text-emerald-300 truncate">
                    Today: {stop.modernPlaceName}, {stop.modernCountry}
                  </div>
                  <div className="text-xs text-stone-300 font-medium line-clamp-1 mt-0.5">
                    {stop.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: Active Stop — Lantern Hidden-Artifact Hunt & 3-Stone Vault Lock */}
      {showTrailCompleteModal ? (
        <section className="mb-14 bg-[#15120F] border border-amber-500/60 rounded-2xl p-8 md:p-10 text-center max-w-4xl mx-auto">
          <Award className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <p className="text-xs font-mono text-emerald-400 mb-2">
            All 6 Sanctuary Vaults Unlocked · St. Augustine Trail Completed
          </p>
          <h2 className="font-display text-3xl font-semibold text-stone-100 mb-3">
            You Discovered Every Hidden Relic on St. Augustine’s Trail!
          </h2>
          <p className="text-sm text-stone-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            From the olive tree of{' '}
            <span className="text-stone-100 font-medium">
              Souk Ahras (Algeria)
            </span>{' '}
            to the harbor scrolls of{' '}
            <span className="text-stone-100 font-medium">Tunis (Tunisia)</span>,
            the underground baptistery of{' '}
            <span className="text-stone-100 font-medium">Milan</span>, the 1945
            marble gravestone of{' '}
            <span className="text-stone-100 font-medium">
              Ostia Antica (Rome)
            </span>
            , the spared library of{' '}
            <span className="text-stone-100 font-medium">Annaba</span>, and the
            marble Ark of{' '}
            <span className="text-stone-100 font-medium">Pavia</span>—your
            Pilgrim Credencial is complete.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleResetTrail}
              className="px-6 py-3 text-sm font-semibold bg-amber-500 text-stone-950 rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play St. Augustine Trail Again</span>
            </button>
          </div>
        </section>
      ) : (
        <section
          id="active-stop-stage"
          className="mb-14 bg-[#15120F] border border-stone-800/90 rounded-2xl overflow-hidden"
        >
          <div className="bg-[#0E0C0A] border-b border-stone-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                <span>
                  Version 1 (Lantern Hunt) · Stop 0{activeStop.stopNumber} of 06
                </span>
                <span aria-hidden="true">·</span>
                <span>Ancient: {activeStop.ancientPlaceName}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-300 font-semibold">
                  Modern Day Now: {activeStop.modernPlaceName},{' '}
                  {activeStop.modernCountry}
                </span>
              </div>
              <h2 className="font-display text-2xl font-semibold text-stone-100">
                {activeStop.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {!allThreeArtifactsFound && (
                <div
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    proximityLevel === 'HOT'
                      ? 'bg-amber-500 text-stone-950 border-amber-300 font-bold'
                      : proximityLevel === 'WARM'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-semibold'
                      : 'bg-[#15120F] text-stone-400 border-stone-800'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>
                    {proximityLevel === 'HOT'
                      ? 'Lantern Burning Gold! Click Here!'
                      : proximityLevel === 'WARM'
                      ? 'Lantern Getting Warmer...'
                      : 'Sweep Lantern Over Photo'}
                  </span>
                </div>
              )}

              {!allThreeArtifactsFound && (
                <button
                  type="button"
                  onClick={handleRingBellForHint}
                  className="px-3 py-1.5 text-xs font-medium bg-[#181411] border border-stone-700 text-amber-300 rounded-lg hover:border-amber-500/60 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Ring Bell Hint</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT 7 COLUMNS: Interactive Lantern Hidden-Object Scene Canvas */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-4 rounded-xl bg-[#0E0C0A] border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {currentTargetArtifact ? (
                  <div className="flex items-start gap-3">
                    <Search className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-mono text-amber-400 font-semibold">
                        Hidden Clue {foundArtifactIds.length + 1} of 3 ·{' '}
                        {currentTargetArtifact.category}
                      </div>
                      <p className="text-sm font-medium text-stone-100 mt-0.5">
                        “{currentTargetArtifact.riddleToFind}”
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-semibold">
                      All 3 Hidden Artifacts Found! Now place your 3 Engraved
                      Stones into the Vault on the right.
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 shrink-0">
                  {activeStop.hiddenArtifacts.map((art, idx) => {
                    const isFound = foundArtifactIds.includes(art.id);
                    const isTargeting = currentTargetArtifact?.id === art.id;
                    return (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => {
                          soundEngine.play('compass_click');
                          setTargetRiddleIdx(idx);
                          if (isFound) setActiveStoryArtifact(art);
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer transition-colors ${
                          isFound
                            ? 'bg-emerald-500 text-stone-950 font-semibold'
                            : isTargeting
                            ? 'bg-amber-500 text-stone-950 font-semibold'
                            : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {isFound
                          ? `✓ 0${art.orderNumber}`
                          : `? 0${art.orderNumber}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                onMouseMove={handleSceneMouseMove}
                onMouseEnter={() => setIsHoveringPhoto(true)}
                onMouseLeave={() => setIsHoveringPhoto(false)}
                onClick={handleSceneClick}
                className="relative rounded-xl overflow-hidden border border-stone-800 bg-[#0E0C0A] aspect-video select-none cursor-crosshair"
              >
                <ResilientImage
                  src={activeStop.image}
                  alt={activeStop.imageCaption}
                  fallbackTitle={activeStop.title}
                  className="w-full h-full object-cover"
                />

                {!allThreeArtifactsFound && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                    style={{
                      background: isHoveringPhoto
                        ? `radial-gradient(circle 135px at ${lanternPos.x}% ${lanternPos.y}%, rgba(251, 191, 36, 0.18) 0%, rgba(14, 12, 10, 0.45) 55%, rgba(14, 12, 10, 0.82) 100%)`
                        : 'rgba(14, 12, 10, 0.42)',
                    }}
                  />
                )}

                {currentTargetArtifact &&
                  (showShimmerHint || proximityLevel === 'HOT') && (
                    <div
                      style={{
                        left: `${currentTargetArtifact.xPercent}%`,
                        top: `${currentTargetArtifact.yPercent}%`,
                      }}
                      className="-translate-x-1/2 -translate-y-1/2 absolute z-10 w-16 h-16 rounded-full border-2 border-amber-400/90 bg-amber-400/20 pointer-events-none flex items-center justify-center"
                    >
                      <Sparkles className="w-5 h-5 text-amber-300" />
                    </div>
                  )}

                {activeStop.hiddenArtifacts.map((art) => {
                  const isFound = foundArtifactIds.includes(art.id);
                  if (!isFound) return null;

                  const isViewing = activeStoryArtifact?.id === art.id;
                  return (
                    <button
                      key={art.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundEngine.play('compass_click');
                        setActiveStoryArtifact(art);
                      }}
                      style={{
                        left: `${art.xPercent}%`,
                        top: `${art.yPercent}%`,
                      }}
                      className={`-translate-x-1/2 -translate-y-1/2 absolute z-20 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg cursor-pointer transition-transform hover:scale-105 ${
                        isViewing
                          ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-300/50 font-bold'
                          : 'bg-emerald-500 text-stone-950 ring-2 ring-white/50 font-semibold'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="text-xs font-mono">
                        Found 0{art.orderNumber}
                      </span>
                    </button>
                  );
                })}

                {missClickPos && (
                  <div
                    style={{
                      left: `${missClickPos.x}%`,
                      top: `${missClickPos.y}%`,
                    }}
                    className="-translate-x-1/2 -translate-y-1/2 absolute z-30 px-2.5 py-1 rounded bg-black/85 border border-stone-600 text-[11px] font-mono text-amber-200 pointer-events-none whitespace-nowrap"
                  >
                    Keep searching with your lantern!
                  </div>
                )}

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-4 text-xs font-mono text-stone-200 pointer-events-none">
                  <span className="truncate">
                    {currentTargetArtifact
                      ? `Hint: ${currentTargetArtifact.hintDirection}`
                      : activeStop.imageCaption}
                  </span>
                  <span className="shrink-0 text-amber-300">
                    Found: {foundArtifactIds.length}/3
                  </span>
                </div>
              </div>

              {activeStoryArtifact ? (
                <div className="bg-[#0E0C0A] border border-amber-500/60 rounded-xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-amber-400 mb-1.5">
                    <span>
                      DISCOVERED IN SCENE ·{' '}
                      {activeStoryArtifact.category.toUpperCase()}
                    </span>
                    <span className="text-emerald-400">
                      + Stone Key Unearthed: “{activeStoryArtifact.stoneKeyWord}”
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-stone-100 mb-2">
                    {activeStoryArtifact.foundTitle}
                  </h3>
                  <p className="text-sm text-stone-200 leading-relaxed mb-4">
                    {activeStoryArtifact.storyUnlocked}
                  </p>
                  <div className="pt-3 border-t border-stone-800/80 font-display italic text-xs text-amber-200/90">
                    {activeStop.saintQuote}
                  </div>
                </div>
              ) : (
                <div className="bg-[#0E0C0A] border border-stone-800 rounded-xl p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono text-amber-400 mb-1">
                      How to Play Version 1 (Lantern Hunt)
                    </div>
                    <p className="text-sm text-stone-300">
                      Move your mouse or finger over the photograph above to
                      shine your Pilgrim’s Lantern. Watch the warmth meter and
                      click the 3 hidden spots described in the riddle to
                      unearth St. Augustine’s story and 3 Engraved Stone Keys!
                    </p>
                  </div>
                  <Flame className="w-8 h-8 text-amber-400 shrink-0" />
                </div>
              )}
            </div>

            {/* RIGHT 5 COLUMNS: Unearthed Stone Satchel + 3-Lock Sanctuary Vault */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0E0C0A] border border-stone-800 rounded-xl p-5">
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h3 className="font-display text-base font-semibold text-stone-100">
                      1. Unearthed Stone Keys ({foundArtifactIds.length}/3)
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-stone-400">
                    Found in Photo
                  </span>
                </div>

                <p className="text-xs text-stone-300 mb-3 leading-relaxed">
                  Each hidden detail you find in the photograph drops an
                  Engraved Stone Tablet below. Tap a stone to slot it into the
                  active Vault Lock!
                </p>

                <div className="space-y-2.5">
                  {activeStop.hiddenArtifacts.map((art) => {
                    const isFound = foundArtifactIds.includes(art.id);
                    const isAlreadySlotted = vaultSlots.includes(art.id);

                    if (!isFound) {
                      return (
                        <div
                          key={art.id}
                          className="p-3 rounded-lg bg-[#15120F]/60 border border-dashed border-stone-800 text-xs text-stone-500 flex items-center justify-between"
                        >
                          <span>
                            Hidden Stone 0{art.orderNumber} ({art.category})
                          </span>
                          <span className="font-mono text-[11px] text-amber-400/70">
                            Find in photo first
                          </span>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={art.id}
                        type="button"
                        disabled={isAlreadySlotted}
                        onClick={() => handlePlaceStoneInVault(art)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          isAlreadySlotted
                            ? 'bg-emerald-950/25 border-emerald-500/40 text-emerald-300 opacity-75 cursor-default'
                            : 'bg-[#1D1813] border-amber-500/80 hover:bg-amber-500/20 text-stone-100 cursor-pointer shadow-md'
                        }`}
                      >
                        <div>
                          <div className="font-mono text-xs font-bold text-amber-300">
                            {art.stoneKeyWord}
                          </div>
                          <div className="text-[11px] text-stone-300 mt-0.5">
                            {art.stoneKeyMeaning}
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded bg-amber-500 text-stone-950 text-[11px] font-mono font-semibold shrink-0">
                          {isAlreadySlotted
                            ? 'Locked In'
                            : `Slot into Lock ${activeVaultSlotIdx + 1}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#0E0C0A] border border-stone-800 rounded-xl p-5">
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    {allThreeVaultLocksSolved ? (
                      <Unlock className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-amber-400" />
                    )}
                    <h3 className="font-display text-base font-semibold text-stone-100">
                      2. Sanctuary Stone Vault
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">
                    {vaultSlots.filter((s) => s !== null).length}/3 Unlocked
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  {activeStop.vaultPrompts.map((vp, idx) => {
                    const slottedId = vaultSlots[idx];
                    const slottedArtifact = activeStop.hiddenArtifacts.find(
                      (a) => a.id === slottedId
                    );
                    const isSelectedSlot = activeVaultSlotIdx === idx;

                    return (
                      <div
                        key={vp.slotLabel}
                        onClick={() => {
                          soundEngine.play('compass_click');
                          setActiveVaultSlotIdx(idx);
                          setVaultFeedback(null);
                        }}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          slottedArtifact
                            ? 'bg-emerald-950/30 border-emerald-500/60'
                            : isSelectedSlot
                            ? 'bg-[#1C1713] border-amber-500'
                            : 'bg-[#15120F] border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-1">
                          <span
                            className={
                              slottedArtifact
                                ? 'text-emerald-400 font-semibold'
                                : 'text-amber-400 font-semibold'
                            }
                          >
                            {vp.slotLabel}
                          </span>
                          <span className="text-stone-400">
                            {slottedArtifact
                              ? '✓ Stone Fitted'
                              : isSelectedSlot
                              ? 'Active Socket — Tap a Stone Above'
                              : 'Click to Select Socket'}
                          </span>
                        </div>

                        <p className="text-xs text-stone-300 leading-snug">
                          {vp.questionPrompt}
                        </p>

                        {slottedArtifact && (
                          <div className="mt-2 pt-2 border-t border-emerald-500/30 text-xs font-mono text-emerald-300 font-semibold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>{slottedArtifact.stoneKeyWord}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {vaultFeedback && (
                  <div className="mb-4 p-3 rounded-lg bg-rose-950/40 border border-rose-500/50 text-xs text-rose-200">
                    {vaultFeedback}
                  </div>
                )}

                <button
                  type="button"
                  disabled={!allThreeVaultLocksSolved}
                  onClick={handleAdvanceToNextStop}
                  className={`w-full py-3.5 px-5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
                    allThreeVaultLocksSolved
                      ? 'bg-amber-500 text-stone-950 hover:bg-amber-400 cursor-pointer shadow-lg'
                      : 'bg-stone-800/80 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {allThreeVaultLocksSolved ? (
                    <>
                      <span>
                        {currentStopIdx + 1 < ST_AUGUSTINE_TRAIL_STOPS.length
                          ? `${activeStop.sealName} Unlocked! Continue to Stop 0${activeStop.stopNumber + 1}`
                          : `${activeStop.sealName} Unlocked! Complete St. Augustine Trail`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <span>
                      Find All 3 Hidden Clues in Photo & Fit All 3 Stones to
                      Unlock
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: Visual Ancient-to-Modern Picture Cards for All 6 Stops */}
      <section
        id="modern-day-summary"
        className="py-10 border-t border-stone-800/80"
      >
        <div className="mb-6">
          <p className="text-xs font-mono text-amber-400 mb-1">
            St. Augustine’s Complete Visual Trail · Ancient Name vs. Modern-Day
            Location Today
          </p>
          <h2 className="font-display text-2xl font-semibold text-stone-100">
            Where Are St. Augustine’s 6 Trail Stops Today?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ST_AUGUSTINE_TRAIL_STOPS.map((stop, idx) => {
            const isStamped = stampedStopNumbers.includes(stop.stopNumber);
            return (
              <div
                key={stop.stopNumber}
                className="bg-[#15120F] border border-stone-800/90 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-stone-900">
                    <ResilientImage
                      src={stop.image}
                      alt={stop.title}
                      fallbackTitle={stop.ancientPlaceName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15120F] via-black/25 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-300">
                        Stop 0{stop.stopNumber} · {stop.ancientPlaceName}
                      </span>
                      {isStamped && (
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Unlocked
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 mb-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        Modern Day Now: {stop.modernPlaceName},{' '}
                        {stop.modernCountry}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-stone-100 mb-2">
                      {stop.title}
                    </h3>

                    <p className="text-xs text-stone-300 leading-relaxed mb-3">
                      {stop.whatYouCanSeeToday}
                    </p>

                    <div className="p-3 rounded-lg bg-[#0E0C0A] border border-stone-800/80 text-xs text-stone-300 leading-relaxed">
                      <span className="text-amber-400 font-mono block mb-1">
                        Did You Know?
                      </span>
                      {stop.didYouKnowHighlight}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2">
                  <button
                    type="button"
                    onClick={() => handleSelectStop(idx)}
                    className="w-full py-2 px-4 text-xs font-semibold bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Search Stop 0{stop.stopNumber} with Lantern</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
