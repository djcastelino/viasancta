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
    <section className="max-w-7xl mx-auto px-5 py-8">
      <Link href="/jesus-in-ot" className="block group">
        <div className="bg-gradient-to-br from-[#2C5F87]/10 via-[#325847]/10 to-[#6e3a6c]/10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-[#D4AF37]/20 overflow-hidden">
          <div className="p-8 md:p-12 relative">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-32 h-32 bg-[#D4AF37] rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#6e3a6c] rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2C5F87]">
                    Jesus in the Old Testament
                  </h2>
                </div>
                <p className="text-gray-600">
                  Day {todaysEntry.dayOfYear} of 365 • {todaysEntry.category}
                </p>
              </div>

              {/* Title and Reference */}
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-[#6e3a6c] mb-3">
                  {todaysEntry.title}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="inline-block bg-[#2C5F87] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {todaysEntry.otBook}
                  </span>
                  <span className="inline-block bg-[#D4AF37] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {todaysEntry.otReference}
                  </span>
                </div>
              </div>

              {/* Scripture Quote */}
              <blockquote className="mb-6 text-center max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-800 font-serif leading-relaxed italic">
                  &quot;{todaysEntry.otText}&quot;
                </p>
              </blockquote>

              {/* Key Insights Preview */}
              <div className="grid md:grid-cols-2 gap-3 mb-6 max-w-3xl mx-auto">
                {todaysEntry.keyInsights.slice(0, 2).map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white/50 rounded-lg p-4"
                  >
                    <span className="text-[#D4AF37] text-lg flex-shrink-0">✦</span>
                    <span className="text-gray-700 text-sm">{insight}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <div className="inline-block bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl group-hover:scale-105 transition-transform">
                  Read Full Entry →
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
