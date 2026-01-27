'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface JesusInOTEntry {
  id: number;
  dayOfYear: number;
  title: string;
  category: string;
  otBook: string;
  otReference: string;
  otText: string;
  historicalContext: string;
  howItPointsToJesus: string;
  keyInsights: string[];
  sources?: string[];
}

export default function JesusInOT() {
  const [todaysEntry, setTodaysEntry] = useState<JesusInOTEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTodaysEntry = async () => {
      try {
        const response = await fetch('/jesus-in-ot.json');
        const entries: JesusInOTEntry[] = await response.json();

        // Calculate day of year (1-365)
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        // Find today's entry
        const entry = entries.find(e => e.dayOfYear === dayOfYear) || entries[0];
        setTodaysEntry(entry);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading Jesus in OT entry:', error);
        setIsLoading(false);
      }
    };

    loadTodaysEntry();
  }, []);

  if (isLoading || !todaysEntry) {
    return null;
  }

  return (
    <Link href="/jesus-in-ot" className="block group">
      <div className="bg-gradient-to-br from-[#2C5F87] to-[#325847] rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full">
        <div className="p-8 text-white relative h-full flex flex-col">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#D4AF37] px-4 py-1 rounded-full text-sm font-bold">
                365 DAILY
              </span>
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                DAY {todaysEntry.dayOfYear}
              </span>
            </div>

            <h3 className="text-3xl font-bold mb-2 font-serif">
              Jesus in the Old Testament
            </h3>
            <p className="text-xl text-[#D4AF37] italic mb-4">
              {todaysEntry.category}
            </p>

            {/* Today's Entry Preview */}
            <div className="mb-4 flex-1">
              <h4 className="text-lg font-semibold mb-2">{todaysEntry.title}</h4>
              <p className="text-white/90 text-sm mb-3 leading-relaxed">
                {todaysEntry.otReference}
              </p>
              <blockquote className="text-white/80 italic text-sm border-l-2 border-[#D4AF37] pl-3">
                &quot;{todaysEntry.otText.substring(0, 120)}...&quot;
              </blockquote>
            </div>

            <div className="flex flex-wrap gap-3 text-sm mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📖</span>
                <span>365 Entries</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✝️</span>
                <span>Christ-Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🔍</span>
                <span>Daily Discovery</span>
              </div>
            </div>

            <span className="inline-block bg-white text-[#2C5F87] hover:bg-[#D4AF37] hover:text-white px-6 py-3 rounded-full font-semibold transition-colors text-center">
              Read Today's Entry →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
