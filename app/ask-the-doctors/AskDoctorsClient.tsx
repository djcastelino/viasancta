'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cross,
  FileText,
  Info,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
  Square,
  Volume2,
} from 'lucide-react';

interface DoctorInfo {
  slug: string;
  name: string;
  title: string;
  era: string;
  tier: string;
  bio: string;
  workCount: number;
  passageCount: number;
}

interface WorkInfo {
  slug: string;
  doctor_slug: string;
  author: string;
  title: string;
  edition: string;
  pub_year: string;
  pdf_filename: string;
  total_pages: number;
  passage_count: number;
}

interface CatalogStats {
  doctorCount: number;
  workCount: number;
  pdfCount: number;
  totalPdfPages: number;
  totalPassages: number;
}

interface RetrievedSource {
  id: number;
  workSlug: string;
  doctorSlug: string;
  seq: number;
  author: string;
  workTitle: string;
  edition: string;
  pdfFilename: string;
  heading: string;
  pdfPageStart: number;
  pdfPageEnd: number;
  pageLabel: string;
  excerpt: string;
}

interface AskResponse {
  question: string;
  doctor: string;
  answer: string;
  spokenText: string;
  scriptureRefs: string[];
  sources: RetrievedSource[];
  abstained: boolean;
}

const STARTER_QUESTIONS = [
  'What do the Doctors teach about the Eucharist and the Real Presence?',
  'What do St. Augustine and St. Thomas Aquinas teach about grace and free will?',
  'How do St. Teresa of Ávila and St. John of the Cross explain dry prayer?',
  'What did St. Ignatius of Antioch and St. Irenaeus write about the Church and Apostolic Tradition?',
  'How does St. Francis de Sales teach holiness in everyday lay life?',
  'What does St. Thérèse of Lisieux teach about humility and childlike trust?',
];

export default function AskDoctorsClient() {
  const [doctors, setDoctors] = useState<DoctorInfo[]>([]);
  const [works, setWorks] = useState<WorkInfo[]>([]);
  const [stats, setStats] = useState<CatalogStats>({
    doctorCount: 14,
    workCount: 18,
    pdfCount: 17,
    totalPdfPages: 17782,
    totalPassages: 14945,
  });

  const [selectedDoctor, setSelectedDoctor] = useState<string>('all');
  const [question, setQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [result, setResult] = useState<AskResponse | null>(null);
  const [expandedSources, setExpandedSources] = useState<Record<number, boolean>>({});
  const [highlightedSourceIdx, setHighlightedSourceIdx] = useState<number | null>(null);
  const [showBibliography, setShowBibliography] = useState<boolean>(false);

  // Andrew voice playback state
  const [audioLoading, setAudioLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    fetch('/api/doctors/catalog')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        if (Array.isArray(data.doctors)) setDoctors(data.doctors);
        if (Array.isArray(data.works)) setWorks(data.works);
        if (data.stats) setStats(data.stats);
      })
      .catch(() => {});

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }

  async function handleAsk(customQuestion?: string) {
    const q = (customQuestion ?? question).trim();
    if (!q || loading) return;
    if (customQuestion) setQuestion(customQuestion);

    stopAudio();
    setLoading(true);
    setErrorMsg('');
    setHighlightedSourceIdx(null);

    try {
      const res = await fetch('/api/doctors/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, doctor: selectedDoctor }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Unable to reach Andrew right now. Please try again.');
        return;
      }
      setResult(data);
      // Open the first 2 source excerpts by default for immediate verification
      const initExp: Record<number, boolean> = {};
      if (Array.isArray(data.sources)) {
        data.sources.slice(0, 2).forEach((s: RetrievedSource) => {
          initExp[s.id] = true;
        });
      }
      setExpandedSources(initExp);
    } catch {
      setErrorMsg('Connection interrupted. Please try asking Andrew again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleListenAndrew() {
    if (!result?.spokenText) return;
    if (isPlaying) {
      stopAudio();
      return;
    }
    setAudioLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/doctors/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: result.spokenText }),
      });
      if (!res.ok) {
        setErrorMsg('Andrew voice narration is momentarily busy. Please try again.');
        return;
      }
      const blob = await res.blob();
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;

      const audio = audioRef.current || new Audio();
      audioRef.current = audio;
      audio.src = url;
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      await audio.play();
      setIsPlaying(true);
    } catch {
      setErrorMsg('Could not play Andrew audio on this device.');
    } finally {
      setAudioLoading(false);
    }
  }

  function jumpToSource(numIndex: number) {
    if (!result || !result.sources[numIndex - 1]) return;
    const src = result.sources[numIndex - 1];
    setExpandedSources((prev) => ({ ...prev, [src.id]: true }));
    setHighlightedSourceIdx(numIndex);
    const el = document.getElementById(`doctor-source-${numIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function renderProseWithCitations(text: string) {
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());
    return paragraphs.map((para, pIdx) => {
      const tokens = para.split(/(\[\d+\]|\*\*[^*]+\*\*)/g);
      return (
        <p
          key={pIdx}
          className="mb-4 last:mb-0 text-[17px] leading-[1.8] text-[#f3ece0] font-serif"
        >
          {tokens.map((tok, tIdx) => {
            const mCite = tok.match(/^\[(\d+)\]$/);
            if (mCite) {
              const num = Number(mCite[1]);
              return (
                <button
                  key={tIdx}
                  type="button"
                  onClick={() => jumpToSource(num)}
                  title={`Verify verbatim PDF excerpt [${num}]`}
                  className="mx-0.5 inline-flex items-center justify-center rounded border border-[#d4af37]/45 bg-[#d4af37]/15 px-1.5 py-0.5 align-baseline font-sans text-[11px] font-semibold text-[#f5d57e] hover:bg-[#d4af37]/30 transition-colors cursor-pointer"
                >
                  {num}
                </button>
              );
            }
            const mBold = tok.match(/^\*\*([^*]+)\*\*$/);
            if (mBold) {
              return (
                <strong key={tIdx} className="font-semibold text-[#fff9ed]">
                  {mBold[1]}
                </strong>
              );
            }
            return <React.Fragment key={tIdx}>{tok}</React.Fragment>;
          })}
        </p>
      );
    });
  }

  const mag7 = doctors.filter((d) => d.tier === 'Magnificent 7');
  const earlyAndMystics = doctors.filter((d) => d.tier !== 'Magnificent 7');
  const activeDoctorObj = doctors.find((d) => d.slug === selectedDoctor);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      {/* HERO HEADER */}
      <section className="pt-8 pb-6 text-center border-b border-white/10">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
          <Cross className="h-3.5 w-3.5" strokeWidth={1.6} />
          <span>
            {stats.pdfCount} License-Free Public-Domain PDFs · {stats.doctorCount} Saints &amp; Doctors
          </span>
        </div>
        <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#fbf6ec]">
          Ask the Doctors of the Church
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[#cfc6b6]">
          Guided by <span className="text-[#f5d57e] font-medium">Andrew</span> — strictly grounded in{' '}
          {stats.totalPdfPages.toLocaleString()} pages of pre-1929 public-domain writings by St. Augustine,
          St. Thomas Aquinas, St. Jerome, St. John Chrysostom, St. Francis de Sales, St. Teresa of Ávila,
          St. Thérèse of Lisieux, St. Ignatius of Antioch, St. Irenaeus, and more.
        </p>
      </section>

      {/* COUNCIL / SAINT SELECTOR */}
      <section className="mt-6 rounded-2xl border border-[#d4af37]/25 bg-[#15110d] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d4af37]">
            Choose Your Inquiry Scope
          </span>
          <button
            type="button"
            onClick={() => setSelectedDoctor('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer border ${
              selectedDoctor === 'all'
                ? 'border-[#d4af37] bg-[#d4af37] text-[#14100b]'
                : 'border-white/15 bg-white/5 text-[#e8dfd0] hover:border-[#d4af37]/50'
            }`}
          >
            Council of All {stats.doctorCount} Saints (Recommended)
          </button>
        </div>

        {/* The Magnificent 7 */}
        {mag7.length > 0 && (
          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-[0.16em] text-[#a79c89] mb-1.5">
              The Magnificent 7 Doctors
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mag7.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => setSelectedDoctor(d.slug)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer border ${
                    selectedDoctor === d.slug
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#f9e199]'
                      : 'border-white/10 bg-white/[0.03] text-[#d7cebe] hover:border-[#d4af37]/40'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Early Fathers & Spiritual Masters */}
        {earlyAndMystics.length > 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-[#a79c89] mb-1.5">
              Early Church Fathers &amp; Spiritual Masters
            </div>
            <div className="flex flex-wrap gap-1.5">
              {earlyAndMystics.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => setSelectedDoctor(d.slug)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer border ${
                    selectedDoctor === d.slug
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#f9e199]'
                      : 'border-white/10 bg-white/[0.03] text-[#d7cebe] hover:border-[#d4af37]/40'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeDoctorObj && (
          <div className="mt-3 rounded-xl border border-[#d4af37]/20 bg-[#1d1711] px-3.5 py-2.5 text-xs text-[#dfd5c3]">
            <span className="font-semibold text-[#f5d57e]">{activeDoctorObj.name}</span>{' '}
            <span className="text-[#a89c87]">
              ({activeDoctorObj.title} · {activeDoctorObj.era})
            </span>
            <p className="mt-1 text-[#cfc5b4] leading-relaxed">{activeDoctorObj.bio}</p>
          </div>
        )}

        {/* QUESTION FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="mt-4 flex flex-col sm:flex-row gap-2.5"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a89c87]" />
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={400}
              placeholder={
                activeDoctorObj
                  ? `Ask Andrew what ${activeDoctorObj.name} wrote about...`
                  : 'Ask Andrew what the Doctors & Early Fathers teach about...'
              }
              className="w-full rounded-xl border border-white/15 bg-[#0e0b08] py-3 pl-10 pr-4 text-sm sm:text-base text-[#fbf6ec] placeholder-[#8f8472] focus:border-[#d4af37] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold text-[#14100b] hover:bg-[#e5c353] disabled:opacity-50 transition-colors cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Searching PDFs…</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Ask Andrew</span>
              </>
            )}
          </button>
        </form>

        {/* STARTER QUESTIONS */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {STARTER_QUESTIONS.map((sq) => (
            <button
              key={sq}
              type="button"
              onClick={() => handleAsk(sq)}
              disabled={loading}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-left text-xs text-[#cfc5b4] hover:border-[#d4af37]/45 hover:text-[#f8e7b0] transition-colors cursor-pointer"
            >
              {sq}
            </button>
          ))}
        </div>
      </section>

      {errorMsg && (
        <div className="mt-4 rounded-xl border border-red-400/30 bg-red-950/30 px-4 py-3 text-sm text-red-200">
          {errorMsg}
        </div>
      )}

      {/* ANDREW'S GROUNDED ANSWER */}
      {result && (
        <section className="mt-6 space-y-5">
          <div className="rounded-2xl border border-[#d4af37]/35 bg-[#16120d] p-5 sm:p-7 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-3 pb-4 mb-5 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d4af37]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>
                    Andrew · Divine Pilgrim Study Guide ·{' '}
                    {result.abstained
                      ? 'No Direct PDF Match'
                      : `Grounded in ${result.sources.length} Public-Domain PDF Excerpts`}
                  </span>
                </div>
                <h2 className="mt-1.5 font-serif text-xl sm:text-2xl font-semibold text-[#fbf6ec]">
                  {result.question}
                </h2>
              </div>

              {result.spokenText && (
                <button
                  type="button"
                  onClick={handleListenAndrew}
                  disabled={audioLoading}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#d4af37]/50 bg-[#d4af37]/15 px-3.5 py-2 text-xs font-semibold text-[#f5d57e] hover:bg-[#d4af37]/25 transition-colors cursor-pointer"
                >
                  {audioLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Preparing Andrew’s voice…</span>
                    </>
                  ) : isPlaying ? (
                    <>
                      <Square className="h-3.5 w-3.5 fill-current" />
                      <span>Stop Audio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-3.5 w-3.5" />
                      <span>Listen with Andrew</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div>{renderProseWithCitations(result.answer)}</div>

            {/* BIBLICAL CHAPTER:VERSE REFERENCES ONLY */}
            {result.scriptureRefs && result.scriptureRefs.length > 0 && (
              <div className="mt-6 rounded-xl border border-white/10 bg-[#100d0a] px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#d4af37]">
                    <BookOpen className="h-3.5 w-3.5" />
                    Scripture References (Chapter:Verse Only):
                  </span>
                  {result.scriptureRefs.map((ref) => (
                    <span
                      key={ref}
                      className="rounded-md border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-0.5 text-xs font-medium text-[#f5d57e]"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
                <p className="mt-1.5 text-[11px] text-[#9b907d]">
                  Scripture is cited by chapter and verse only so you may read it in your own Bible without reproducing copyrighted translations.
                </p>
              </div>
            )}

            <p className="mt-4 text-[11px] text-[#9b907d] leading-relaxed">
              Study reflection grounded strictly in pre-1929 public-domain PDFs below. AI synthesis can make mistakes—always verify against the verbatim excerpts underneath. Not spiritual counseling.
            </p>
          </div>

          {/* VERBATIM PUBLIC-DOMAIN PDF SOURCE CARDS */}
          {result.sources && result.sources.length > 0 && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af37]">
                  Verify Directly in the Public-Domain PDFs ({result.sources.length} Excerpts)
                </h3>
                <span className="text-[11px] text-[#9b907d]">Click any card to read verbatim</span>
              </div>

              <div className="space-y-2.5">
                {result.sources.map((src, idx) => {
                  const num = idx + 1;
                  const isOpen = Boolean(expandedSources[src.id]);
                  const isHi = highlightedSourceIdx === num;
                  return (
                    <div
                      key={src.id}
                      id={`doctor-source-${num}`}
                      className={`rounded-xl border transition-all ${
                        isHi
                          ? 'border-[#d4af37] bg-[#1e1811]'
                          : 'border-white/10 bg-[#14100c]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedSources((prev) => ({ ...prev, [src.id]: !prev[src.id] }))
                        }
                        className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-[#d4af37]/45 bg-[#d4af37]/15 px-1.5 text-[11px] font-bold text-[#f5d57e]">
                              {num}
                            </span>
                            <span className="text-sm font-semibold text-[#fbf6ec]">
                              {src.author}
                            </span>
                            <span className="text-xs text-[#d4af37]">— {src.workTitle}</span>
                            <span className="rounded border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-[#cfc5b4]">
                              {src.pageLabel}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-[#a89c87] truncate">
                            {src.heading} · {src.edition}
                          </div>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 shrink-0 text-[#a89c87] mt-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0 text-[#a89c87] mt-1" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="border-t border-white/10 px-4 py-3.5">
                          <div className="whitespace-pre-line font-serif text-[15px] leading-[1.75] text-[#e7dfd0]">
                            {src.excerpt}
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#9b907d]">
                            <FileText className="h-3.5 w-3.5 text-[#d4af37]" />
                            <span>
                              Source PDF: <code className="text-[#cfc5b4]">{src.pdfFilename}</code> ({src.pageLabel})
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ABOUT, COPYRIGHT-SAFE PDF SOURCES & PASTORAL NOTICE */}
      <section className="mt-12 rounded-2xl border border-white/10 bg-[#120f0b] p-5 sm:p-7">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af37]">
          <Info className="h-4 w-4" />
          <span>About This Archive, Public-Domain Sources &amp; Pastoral Notice</span>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold text-[#fbf6ec]">
              100% License-Free Public-Domain PDFs
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#bfb5a4]">
              Every answer is grounded strictly in{' '}
              <strong className="text-[#f5d57e]">{stats.pdfCount} verified pre-1929 public-domain PDFs</strong>{' '}
              ({stats.totalPdfPages.toLocaleString()} pages · {stats.totalPassages.toLocaleString()} indexed passages) of
              St. Augustine, St. Thomas Aquinas, St. Jerome, and fellow Doctors &amp; Early Fathers. Scripture is cited by{' '}
              <strong>Chapter:Verse only</strong> so copyrighted Bible translations are never reproduced.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold text-[#fbf6ec]">
              Closed-Book Grounding (Honest About AI Limits)
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#bfb5a4]">
              Andrew searches only our license-free PDF archive first and synthesizes exclusively from retrieved excerpts,
              refusing to answer when no direct passage is found. Even with strict anti-invention safeguards,{' '}
              <strong className="text-[#f5d57e]">AI summaries can still make mistakes</strong>—please always verify
              against the verbatim PDF excerpts displayed beneath each answer.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <h3 className="text-sm font-semibold text-[#fbf6ec]">
              Not Spiritual Counseling
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#bfb5a4]">
              This archive is an educational study companion to help you explore the historic writings of the Saints. It is{' '}
              <strong className="text-[#f5d57e]">not spiritual counseling, pastoral direction, or sacramental advice</strong>,
              and never replaces a Catholic priest, spiritual director, or the living Magisterium of the Church.
            </p>
          </div>
        </div>

        {/* COLLAPSIBLE FULL 17-PDF BIBLIOGRAPHY */}
        <div className="mt-5 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => setShowBibliography((v) => !v)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#f5d57e] hover:underline cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>
              {showBibliography ? 'Hide' : 'View'} Complete Bibliography ({works.length || 18} Public-Domain Works across {stats.pdfCount} PDFs)
            </span>
            {showBibliography ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {showBibliography && works.length > 0 && (
            <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.04] text-[#d4af37] uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-3 py-2.5">Saint / Doctor</th>
                    <th className="px-3 py-2.5">Work</th>
                    <th className="px-3 py-2.5">Public-Domain Edition</th>
                    <th className="px-3 py-2.5 text-right">PDF Pages</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-[#d7cebe]">
                  {works.map((w) => (
                    <tr key={w.slug} className="hover:bg-white/[0.02]">
                      <td className="px-3 py-2 font-medium text-[#fbf6ec] whitespace-nowrap">{w.author}</td>
                      <td className="px-3 py-2">{w.title}</td>
                      <td className="px-3 py-2 text-[#a89c87]">{w.edition}</td>
                      <td className="px-3 py-2 text-right font-mono text-[#cfc5b4]">
                        {w.total_pages.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
