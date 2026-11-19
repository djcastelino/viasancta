"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
import {
  Flame,
  Play,
  Pause,
  RotateCcw,
  Share2,
  Check,
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  MessageCircle,
  Copy,
  Award,
  BookOpen,
  Music,
  ArrowLeft,
} from 'lucide-react';

export interface LitanySegment {
  id: string;
  startSec: number;
  endSec: number;
  scriptureRef?: string;
  phrase: string;
  subtext: string;
}

export interface UnceasingLitanyTrack {
  id: 'litany-1' | 'litany-2' | 'litany-3';
  badge: string;
  title: string;
  subtitle: string;
  scriptureAnchor: string;
  scriptureQuote: string;
  audioUrl: string;
  durationSec: number;
  segments: LitanySegment[];
}

export const UNCEASING_LITANIES: UnceasingLitanyTrack[] = [
  {
    id: 'litany-1',
    badge: '01 · SIGNATURE 1-MINUTE CHAIN',
    title: 'The 60-Second Chain of Thanksgiving & Praise',
    subtitle: 'Isaiah 43:21 · 1 Thess 5:17 · Revelation 7:12 · The "I AM" Names of Jesus',
    scriptureAnchor: 'Isaiah 43:21 & 1 Thessalonians 5:16–18',
    scriptureQuote:
      '“This people I have formed for Myself; they shall declare My praise.” — “Rejoice always, pray without ceasing, in everything give thanks.”',
    audioUrl: '/audio/unceasing/litany-1.mp3',
    durationSec: 60,
    segments: [
      {
        id: 's1',
        startSec: 0,
        endSec: 6,
        scriptureRef: 'PSALM 100:4 · PRAISE AT THE GATES',
        phrase: '“Thank You, Jesus. Praise You, Jesus. Alleluia!”',
        subtext: 'Speak these words aloud from your heart as the 60-second flame begins.',
      },
      {
        id: 's2',
        startSec: 6,
        endSec: 17,
        scriptureRef: 'ISAIAH 43:21 · OUR CREATED PURPOSE',
        phrase:
          '“Lord God, You declared: This people I have formed for Myself; they shall declare My praise. Right now, we lift our voices without ceasing!”',
        subtext: 'You were created by God to declare His praise.',
      },
      {
        id: 's3',
        startSec: 17,
        endSec: 28,
        scriptureRef: 'REVELATION 7:12 · THRONE-ROOM DOXOLOGY',
        phrase:
          '“Thank You, Jesus! Praise You, Jesus! Alleluia! Amen! Blessing and glory and wisdom, thanksgiving and honor, power and might, belong to our God forever and ever!”',
        subtext: 'Joining the unbroken song of heaven.',
      },
      {
        id: 's4',
        startSec: 28,
        endSec: 46,
        scriptureRef: 'JOHN 6:35 · 8:12 · 10:11 · 11:25 · 14:6 · 15:1',
        phrase:
          '“Lord Jesus, You are the Bread of Life. You are the Light of the World. You are the Door of the Sheep, and the Good Shepherd. You are the Resurrection and the Life. You are the Way, the Truth, and the Life. You are the True Vine, and our Prince of Peace!”',
        subtext: 'Proclaiming the Seven “I AM” declarations of Christ.',
      },
      {
        id: 's5',
        startSec: 46,
        endSec: 60,
        scriptureRef: 'COLOSSIANS 1:20 · 1 PETER 1:19',
        phrase:
          '“Thank You, Jesus, for the breath in our lungs, for Your Cross, and Your precious Blood.”',
        subtext: 'Seal your 60 seconds of thanksgiving and pass the flame.',
      },
    ],
  },
  {
    id: 'litany-2',
    badge: '02 · THE NAMES OF JESUS',
    title: 'Who You Are, Lord — 60 Seconds of Adoration',
    subtitle: 'Bread of Life · Light of the World · Lamb of God · Alpha & Omega · King of Kings',
    scriptureAnchor: 'John 8:12 · Revelation 1:8 · Philippians 2:9–11',
    scriptureQuote:
      '“Therefore God also has highly exalted Him and given Him the name which is above every name.”',
    audioUrl: '/audio/unceasing/litany-2.mp3',
    durationSec: 60,
    segments: [
      {
        id: 'n1',
        startSec: 0,
        endSec: 12,
        scriptureRef: 'JOHN 6:35 & JOHN 8:12',
        phrase:
          '“Lord Jesus Christ, we exalt Your holy Name! You are the Bread of Life who satisfies every hungry soul. You are the Light of the World; whoever follows You will never walk in darkness.”',
        subtext: 'Exalting Christ as our sustenance and our light.',
      },
      {
        id: 'n2',
        startSec: 12,
        endSec: 25,
        scriptureRef: 'REVELATION 1:8 · JOHN 1:29 · REVELATION 5:5',
        phrase:
          '“You are the Alpha and the Omega, the First and the Last, the Beginning and the End. You are the Lamb of God who takes away the sin of the world, and the Lion of the tribe of Judah!”',
        subtext: 'Adoring the Eternal King and Redeemer.',
      },
      {
        id: 'n3',
        startSec: 25,
        endSec: 42,
        scriptureRef: 'ISAIAH 9:6 · JOHN 10:14 · JOHN 11:25 · JOHN 14:6',
        phrase:
          '“You are our Wonderful Counselor, Mighty God, Everlasting Father, and Prince of Peace. You are the Good Shepherd who calls us by name. You are the Resurrection and the Life. You are the Way, the Truth, and the Life!”',
        subtext: 'Speaking the saving titles of Jesus over your life and home.',
      },
      {
        id: 'n4',
        startSec: 42,
        endSec: 60,
        scriptureRef: 'EPHESIANS 2:20 · REVELATION 19:16 · PHILIPPIANS 2:10–11',
        phrase:
          '“You are the Cornerstone, our Living Hope, our Rock, and our Redeemer. King of kings, and Lord of lords, every knee shall bow and every tongue confess that Jesus Christ is Lord! Thank You, Jesus. Praise You, Jesus. Alleluia, Amen!”',
        subtext: 'Every tongue confessing that Jesus Christ is Lord.',
      },
    ],
  },
  {
    id: 'litany-3',
    badge: '03 · PURE THANKSGIVING',
    title: 'Fruit of Our Lips — 60 Seconds of Gratitude',
    subtitle: '1 Thessalonians 5:16–18 · Psalm 103:1–5 · Hebrews 13:15',
    scriptureAnchor: 'Hebrews 13:15 & Psalm 103:1–4',
    scriptureQuote:
      '“Therefore by Him let us continually offer the sacrifice of praise to God, that is, the fruit of our lips, giving thanks to His name.”',
    audioUrl: '/audio/unceasing/litany-3.mp3',
    durationSec: 60,
    segments: [
      {
        id: 't1',
        startSec: 0,
        endSec: 14,
        scriptureRef: '1 THESSALONIANS 5:16–18 · PSALM 118:24',
        phrase:
          '“Rejoice always, pray without ceasing, in everything give thanks; for this is the will of God in Christ Jesus for you. Thank You, Jesus, for this day that You have made!”',
        subtext: 'Entering God’s will through immediate thanksgiving.',
      },
      {
        id: 't2',
        startSec: 14,
        endSec: 30,
        scriptureRef: 'COLOSSIANS 1:20 · LAMENTATIONS 3:22–23',
        phrase:
          '“Thank You, Jesus, for every heartbeat and every breath in our lungs. Thank You for the Cross of Calvary, where Your blood washed us clean and set us free. Thank You for Your mercies that are new every single morning!”',
        subtext: 'Thanking Jesus for life, breath, salvation, and new mercies.',
      },
      {
        id: 't3',
        startSec: 30,
        endSec: 46,
        scriptureRef: 'PSALM 121:8 · PSALM 103:1–4',
        phrase:
          '“Thank You for watching over our families, our homes, our going out and our coming in. Bless the Lord, O my soul, and forget not all His benefits! He forgives all our iniquity; He heals all our diseases; He crowns us with steadfast love and compassion.”',
        subtext: 'Remembering all His benefits over our families and homes.',
      },
      {
        id: 't4',
        startSec: 46,
        endSec: 60,
        scriptureRef: 'HEBREWS 13:15 · REVELATION 7:12',
        phrase:
          '“We offer to You continually the sacrifice of praise, the fruit of our lips giving thanks to Your Name. Blessing and glory, wisdom and thanksgiving, honor and power belong to our God forever and ever! Thank You, Jesus. Praise You, Jesus. Alleluia, Amen!”',
        subtext: 'Offering the fruit of our lips in unbroken thanksgiving.',
      },
    ],
  },
];

export default function PrayWithoutCeasingClient() {
  const [selectedTrackId, setSelectedTrackId] = useState<'litany-1' | 'litany-2' | 'litany-3'>('litany-1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [voiceMuted, setVoiceMuted] = useState<boolean>(false);
  const [padEnabled, setPadEnabled] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Persistent Personal Chain of Praise counter
  const [personalMinutesOffered, setPersonalMinutesOffered] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('dp_unceasing_personal_mins') || '0');
    } catch {
      return 0;
    }
  });

  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const padAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  const activeTrack =
    UNCEASING_LITANIES.find((t) => t.id === selectedTrackId) || UNCEASING_LITANIES[0];

  const remainingSec = Math.max(0, 60 - Math.floor(elapsedSec));
  const progressPct = Math.min(100, (elapsedSec / 60) * 100);

  const activeSegment =
    activeTrack.segments.find(
      (seg) => elapsedSec >= seg.startSec && elapsedSec < seg.endSec
    ) || activeTrack.segments[activeTrack.segments.length - 1];

  // Clean up audio & timers on unmount
  useEffect(() => {
    return () => {
      stopAllAudioAndTimers();
    };
  }, []);

  const stopAllAudioAndTimers = () => {
    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (voiceAudioRef.current) {
      try {
        voiceAudioRef.current.pause();
        voiceAudioRef.current.currentTime = 0;
      } catch {
        // ignore
      }
    }
    if (padAudioRef.current) {
      try {
        padAudioRef.current.pause();
      } catch {
        // ignore
      }
    }
  };

  const handleCompleteMinute = () => {
    stopAllAudioAndTimers();
    setIsPlaying(false);
    setElapsedSec(60);
    setIsCompleted(true);
    

    const nextPersonal = personalMinutesOffered + 1;
    setPersonalMinutesOffered(nextPersonal);
    try {
      localStorage.setItem('dp_unceasing_personal_mins', String(nextPersonal));
    } catch {
      // ignore storage errors
    }
  };

  const startSixtySecondPraise = () => {
    
    // Pause main app ambient soundtrack while the 60-second sacred litany plays so voices never clash
    

    if (isCompleted || elapsedSec >= 60) {
      setElapsedSec(0);
      setIsCompleted(false);
    }

    // Initialize or resume spoken prayer audio
    if (!voiceAudioRef.current || voiceAudioRef.current.src.indexOf(activeTrack.audioUrl) === -1) {
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
      }
      const audio = new Audio(activeTrack.audioUrl);
      audio.volume = voiceMuted ? 0 : 1.0;
      voiceAudioRef.current = audio;
    }

    if (voiceAudioRef.current) {
      voiceAudioRef.current.muted = voiceMuted;
      if (elapsedSec === 0 || isCompleted) {
        voiceAudioRef.current.currentTime = 0;
      }
      voiceAudioRef.current.play().catch(() => {
        // Fallback if browser blocks autoplay
      });
    }

    // Gentle sacred background pad ("I Am the Bread of Life" instrumental)
    if (padEnabled) {
      if (!padAudioRef.current) {
        const pad = new Audio('/audio/background/i-am-the-bread-of-life.mp3');
        pad.loop = true;
        pad.volume = 0.16;
        padAudioRef.current = pad;
      }
      padAudioRef.current.play().catch(() => {});
    }

    setIsPlaying(true);

    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
    }

    const startTimestamp = Date.now() - elapsedSec * 1000;
    timerIntervalRef.current = window.setInterval(() => {
      const nextElapsed = (Date.now() - startTimestamp) / 1000;
      if (nextElapsed >= 60) {
        handleCompleteMinute();
      } else {
        setElapsedSec(nextElapsed);
      }
    }, 100);
  };

  const pauseSixtySecondPraise = () => {
    setIsPlaying(false);
    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
    }
    if (padAudioRef.current) {
      padAudioRef.current.pause();
    }
  };

  const resetSixtySecondPraise = () => {
    stopAllAudioAndTimers();
    setIsPlaying(false);
    setElapsedSec(0);
    setIsCompleted(false);
  };

  const handleSelectTrack = (trackId: 'litany-1' | 'litany-2' | 'litany-3') => {
    stopAllAudioAndTimers();
    voiceAudioRef.current = null;
    setSelectedTrackId(trackId);
    setIsPlaying(false);
    setElapsedSec(0);
    setIsCompleted(false);
  };

  const toggleVoiceMute = () => {
    const next = !voiceMuted;
    setVoiceMuted(next);
    if (voiceAudioRef.current) {
      voiceAudioRef.current.muted = next;
    }
  };

  const togglePad = () => {
    const next = !padEnabled;
    setPadEnabled(next);
    if (padAudioRef.current) {
      if (next && isPlaying) {
        padAudioRef.current.play().catch(() => {});
      } else {
        padAudioRef.current.pause();
      }
    }
  };

  const shareUrl = 'https://divinepilgrim.com/pray-without-ceasing';
  const shareMessage = `🙏 I just joined the 1-Minute "Pray Without Ceasing" Thanksgiving Chain to Jesus Christ (Isaiah 43:21 · 1 Thess 5:17).\n\nHelp keep the chain of praise to our Lord unbroken today — take 60 seconds and pray this aloud:\n${shareUrl}`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pray Without Ceasing — 1-Minute Thanksgiving Chain to Jesus Christ',
          text: shareMessage,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to copy
      }
    }
    handleCopyShare();
  };

  // SVG Circle Progress calculation
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPct / 100) * circumference;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/#spiritual-warfare"
          className="inline-flex items-center gap-2 rounded-xl border border-[#33281b] bg-[#16120c] px-3.5 py-2 text-xs font-semibold text-[#e6dccb] transition hover:border-[#d4af37] hover:text-[#fef08a]"
        >
          <ArrowLeft className="h-4 w-4 text-[#d4af37]" />
          <span>Back to Prayer Companion</span>
        </Link>
      </div>
      {/* HERO SANCTUARY BANNER */}
      <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-gradient-to-b from-[#1a140c] via-[#120e09] to-[#0c0a07] shadow-[0_25px_70px_rgba(0,0,0,0.75)]">
        {/* Dramatic Sacred Altar Painting Header */}
        <div className="relative h-64 w-full overflow-hidden sm:h-80">
          <img
            src="/images/home/unceasing.webp"
            alt="Pray Without Ceasing — Golden Incense of Thanksgiving Rising Before the Cross"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120e09] via-[#120e09]/45 to-transparent" />

          {/* Top Floating Badges over Artwork */}
          <div className="absolute top-4 right-4 left-4 flex flex-wrap items-center justify-between gap-2 sm:top-6 sm:right-8 sm:left-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-[#140f09]/85 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#fef08a] backdrop-blur-md">
              <Flame className="h-4 w-4 text-amber-400" />
              <span>Pray Without Ceasing · 1-Minute Thanksgiving Challenge</span>
            </div>

            {personalMinutesOffered > 0 && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/60 bg-[#140f09]/85 px-3.5 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span>Your Thanksgiving Offered: {personalMinutesOffered} min</span>
              </div>
            )}
          </div>

          {/* Bottom Title Overlaid on Sacred Painting */}
          <div className="absolute right-6 bottom-4 left-6 text-center sm:right-10 sm:left-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              ISAIAH 43:21 · 1 THESSALONIANS 5:16–18 · REVELATION 7:12
            </p>
            <h2 className="mt-1.5 font-serif text-3xl font-bold tracking-tight text-[#faf5eb] drop-shadow-lg sm:text-5xl">
              Created to Declare <em className="font-normal text-[#fef08a]">His Praise.</em>
            </h2>
          </div>
        </div>

        <div className="p-6 pt-3 sm:p-10 sm:pt-4">
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-[#cfc3ae] sm:text-base">
            God formed us so that our lips would continually declare His praise. Take{' '}
            <strong className="text-[#fef08a]">60 seconds right now</strong> to speak these words of
            thanksgiving and the saving Names of Jesus aloud—then pass the flame to a friend to keep
            a continual chain of praise rising to our Lord and God, Jesus Christ.
          </p>

        {/* 3-Litany Track Selector */}
        <div
          className="relative mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-3"
          role="tablist"
          aria-label="Choose a 60-Second Thanksgiving Litany"
        >
          {UNCEASING_LITANIES.map((track) => {
            const active = track.id === activeTrack.id;
            return (
              <button
                key={track.id}
                role="tab"
                aria-selected={active}
                onClick={() => handleSelectTrack(track.id)}
                className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition ${
                  active
                    ? 'border-[#d4af37] bg-gradient-to-b from-[#292013] to-[#1c160d] text-[#fef08a] shadow-[0_0_25px_rgba(212,175,55,0.22)]'
                    : 'border-[#2c2318] bg-[#14100b]/80 text-[#c9bda8] hover:border-[#d4af37]/50 hover:bg-[#1a150e]'
                }`}
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#d4af37]">
                    {track.badge}
                  </span>
                  <h3 className="mt-1 font-serif text-base font-bold text-[#f7f2e8]">
                    {track.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs leading-snug text-[#a39681]">{track.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* MAIN 60-SECOND ALTAR OF PRAISE STAGE */}
        <div className="relative mt-7 rounded-2xl border border-[#3a2e1e] bg-[#0e0b08]/95 p-6 sm:p-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Left Column: 60-Second Golden Halo Countdown & Controls */}
            <div className="flex flex-col items-center justify-center lg:col-span-4">
              <div className="relative flex h-36 w-36 items-center justify-center">
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 140 140">
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke="rgba(212, 175, 55, 0.16)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke="#d4af37"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-150"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <Flame
                    className={`h-5 w-5 ${
                      isPlaying
                        ? 'animate-bounce text-amber-400'
                        : isCompleted
                        ? 'text-emerald-400'
                        : 'text-[#d4af37]'
                    }`}
                  />
                  <span className="mt-1 font-mono text-3xl font-bold tracking-tight text-[#faf5eb]">
                    00:{String(remainingSec).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a39681]">
                    {isCompleted ? 'Completed' : isPlaying ? 'Pray Aloud' : '60-Sec Watch'}
                  </span>
                </div>
              </div>

              {/* Primary Play / Pause / Reset Controls */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                {!isPlaying ? (
                  <button
                    onClick={startSixtySecondPraise}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b58922] px-5 py-3 text-sm font-bold text-[#120f0b] shadow-[0_0_20px_rgba(212,175,55,0.35)] transition hover:brightness-110"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>
                      {isCompleted
                        ? 'Pray Another 60 Seconds'
                        : elapsedSec > 0
                        ? 'Resume 60-Sec Praise'
                        : 'Begin 60-Second Praise'}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={pauseSixtySecondPraise}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#d4af37] bg-[#261e12] px-5 py-3 text-sm font-bold text-[#fef08a] transition hover:bg-[#332818]"
                  >
                    <Pause className="h-4 w-4" />
                    <span>Pause</span>
                  </button>
                )}

                {(elapsedSec > 0 || isCompleted) && (
                  <button
                    onClick={resetSixtySecondPraise}
                    className="inline-flex items-center justify-center rounded-xl border border-[#33291d] bg-[#17130d] p-3 text-[#bfa882] transition hover:border-[#d4af37]/50 hover:text-[#fef08a]"
                    title="Reset 60-Second Timer"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Voice Guide & Background Pad Toggles */}
              <div className="mt-4 flex items-center gap-2 text-xs">
                <button
                  onClick={toggleVoiceMute}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 transition ${
                    !voiceMuted
                      ? 'border-[#d4af37]/50 bg-[#211a10] text-[#fef08a]'
                      : 'border-[#2c2318] bg-[#14100b] text-[#847764]'
                  }`}
                  title="Toggle Spoken Prayer Guide"
                >
                  {voiceMuted ? (
                    <VolumeX className="h-3.5 w-3.5 text-rose-400" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5 text-[#d4af37]" />
                  )}
                  <span>{voiceMuted ? 'Voice Off' : 'Spoken Guide On'}</span>
                </button>

                <button
                  onClick={togglePad}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 transition ${
                    padEnabled
                      ? 'border-[#d4af37]/50 bg-[#211a10] text-[#fef08a]'
                      : 'border-[#2c2318] bg-[#14100b] text-[#847764]'
                  }`}
                  title="Toggle Bread of Life Instrumental Pad"
                >
                  <Music className="h-3.5 w-3.5 text-[#d4af37]" />
                  <span>{padEnabled ? 'Hymn Pad On' : 'Hymn Pad Off'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Synchronized Illuminated Prayer Prompt */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#1b150d] to-[#120e09] p-6 shadow-inner">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#d4af37]">
                    <Sparkles className="h-3.5 w-3.5" />
                    {activeSegment.scriptureRef}
                  </span>
                  <span className="rounded-full border border-[#d4af37]/30 bg-[#261e12] px-2.5 py-0.5 text-[11px] font-semibold text-[#fef08a]">
                    Speak Aloud With Your Whole Heart
                  </span>
                </div>

                <blockquote className="mt-4 font-serif text-xl font-medium leading-relaxed text-[#fff9ed] sm:text-2xl">
                  {activeSegment.phrase}
                </blockquote>

                <p className="mt-3 text-xs italic text-[#b5a790]">{activeSegment.subtext}</p>

                {/* Step Indicators across the 60 seconds */}
                <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {activeTrack.segments.map((seg, idx) => {
                    const isCurrent = seg.id === activeSegment.id;
                    const isPast = elapsedSec >= seg.endSec;
                    return (
                      <button
                        key={seg.id}
                        onClick={() => {
                          setElapsedSec(seg.startSec);
                          if (voiceAudioRef.current) {
                            voiceAudioRef.current.currentTime = seg.startSec;
                          }
                        }}
                        className={`rounded-lg border px-2 py-1.5 text-left transition ${
                          isCurrent
                            ? 'border-[#d4af37] bg-[#2a2013] text-[#fef08a]'
                            : isPast
                            ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                            : 'border-[#2a2117] bg-[#14100b] text-[#847764] hover:border-[#d4af37]/40'
                        }`}
                      >
                        <div className="font-mono text-[10px] font-bold">
                          0:{String(seg.startSec).padStart(2, '0')}–0:
                          {String(seg.endSec).padStart(2, '0')}
                        </div>
                        <div className="truncate text-[11px] font-medium">Part {idx + 1}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full Tap-Along Praise Cloud (All the declarations from the user's vision) */}
              <div className="mt-4 rounded-2xl border border-[#2a2117] bg-[#130f0a] p-4">
                <div className="mb-2.5 flex items-center justify-between text-xs text-[#a39681]">
                  <span className="font-semibold uppercase tracking-wider text-[#d4af37]">
                    Unceasing Declarations of Jesus Christ
                  </span>
                  <span>Proclaim these names aloud throughout your day</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Thank You, Jesus',
                    'Praise You, Jesus',
                    'Alleluia!',
                    'Bread of Life (John 6:35)',
                    'Light of the World (John 8:12)',
                    'Door of the Sheep (John 10:7)',
                    'Good Shepherd (John 10:11)',
                    'Resurrection & the Life (John 11:25)',
                    'The Way, the Truth & the Life (John 14:6)',
                    'The True Vine (John 15:1)',
                    'Lamb of God (John 1:29)',
                    'Alpha & Omega (Rev 1:8)',
                    'Prince of Peace (Isa 9:6)',
                    'King of Kings & Lord of Lords (Rev 19:16)',
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="rounded-lg border border-[#33281b] bg-[#1b150e] px-2.5 py-1 text-xs font-medium text-[#e8decb]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PASS THE FLAME — CONTINUAL CHAIN OF THANKSGIVING SHARE PANEL */}
          <div
            className={`mt-7 rounded-2xl border p-5 transition-all sm:p-6 ${
              isCompleted
                ? 'border-emerald-400/60 bg-gradient-to-r from-emerald-950/50 via-[#1d180f] to-amber-950/40 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                : 'border-[#33281a] bg-[#15110b]'
            }`}
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#d4af37]">
                  <Heart className="h-4 w-4 text-amber-400" />
                  <span>
                    {isCompleted
                      ? 'Amen! You Added 1 Minute of Praise to the Global Altar'
                      : 'Keep the Chain of Thanksgiving Unbroken'}
                  </span>
                </div>
                <h3 className="mt-1 font-serif text-xl font-bold text-[#faf5eb]">
                  Pass the 1-Minute Thanksgiving Challenge to Your Friends &amp; Family
                </h3>
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[#c2b59f] sm:text-sm">
                  Invite someone you love to lift up 60 seconds of thanksgiving to Jesus Christ right
                  now so a continual chain of praise rises around the world without ceasing.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-500 sm:text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Share on WhatsApp</span>
                </a>

                <a
                  href={`sms:?&body=${encodeURIComponent(shareMessage)}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#d4af37]/60 bg-[#251d11] px-4 py-2.5 text-xs font-bold text-[#fef08a] transition hover:bg-[#322717] sm:text-sm"
                >
                  <Share2 className="h-4 w-4 text-[#d4af37]" />
                  <span>Send via Text / SMS</span>
                </a>

                <button
                  onClick={handleNativeShare}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#3c3020] bg-[#1a140d] px-4 py-2.5 text-xs font-semibold text-[#e6dccb] transition hover:border-[#d4af37] hover:text-[#fef08a] sm:text-sm"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-300">Challenge Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-[#d4af37]" />
                      <span>Copy Challenge Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Scriptural Reference Footer Box */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#241d14] bg-[#100d09] px-4 py-3 text-xs text-[#9e917c]">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 shrink-0 text-[#d4af37]" />
              <span>
                <strong className="text-[#e6dccb]">{activeTrack.scriptureAnchor}:</strong>{' '}
                {activeTrack.scriptureQuote}
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#d4af37]">
              Direct Link: divinepilgrim.com/pray-without-ceasing
            </span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
