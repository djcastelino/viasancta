'use client';

import { useEffect, useState } from 'react';

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
}

export default function JesusInOTPage() {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6e3a6c]/5 via-[#2C5F87]/5 to-[#325847]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
          <p className="mt-4 text-gray-600">Loading today&apos;s entry...</p>
        </div>
      </div>
    );
  }

  if (!todaysEntry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6e3a6c]/5 via-[#2C5F87]/5 to-[#325847]/5 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p>No entry found for today.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#6e3a6c]/5 via-[#2C5F87]/5 to-[#325847]/5">
        <div className="max-w-5xl mx-auto px-5 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">📖</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] bg-clip-text text-transparent">
                Jesus in the Old Testament
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Day {todaysEntry.dayOfYear} of 365 • {todaysEntry.category}
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/20">
            {/* Title Section */}
            <div className="bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] text-white p-8 md:p-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                {todaysEntry.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                  {todaysEntry.otBook}
                </span>
                <span className="inline-block bg-[#D4AF37] px-4 py-2 rounded-full text-sm font-semibold">
                  {todaysEntry.otReference}
                </span>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-8 md:p-10 space-y-8">
              {/* Old Testament Text */}
              <section>
                <h3 className="text-xl font-bold text-[#2C5F87] mb-4 flex items-center gap-2">
                  <span>📜</span>
                  <span>The Scripture</span>
                </h3>
                <blockquote className="border-l-4 border-[#D4AF37] pl-6 py-2">
                  <p className="text-xl md:text-2xl text-gray-800 font-serif italic leading-relaxed">
                    &quot;{todaysEntry.otText}&quot;
                  </p>
                </blockquote>
              </section>

              {/* Historical Context */}
              <section className="bg-gradient-to-br from-[#6e3a6c]/5 to-[#2C5F87]/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>🏛️</span>
                  <span>Historical Context</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {todaysEntry.historicalContext}
                </p>
              </section>

              {/* How It Points to Jesus */}
              <section className="bg-gradient-to-br from-[#D4AF37]/10 to-[#8B4789]/10 rounded-2xl p-6 border-2 border-[#D4AF37]/30">
                <h3 className="text-xl font-bold text-[#6e3a6c] mb-3 flex items-center gap-2">
                  <span>✝️</span>
                  <span>How It Points to Jesus</span>
                </h3>
                <p className="text-gray-800 leading-relaxed">
                  {todaysEntry.howItPointsToJesus}
                </p>
              </section>

              {/* Key Insights */}
              <section>
                <h3 className="text-xl font-bold text-[#2C5F87] mb-4 flex items-center gap-2">
                  <span>💡</span>
                  <span>Key Insights</span>
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {todaysEntry.keyInsights.map((insight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 bg-gradient-to-r from-[#325847]/10 to-transparent rounded-lg p-4"
                    >
                      <span className="text-[#D4AF37] text-xl flex-shrink-0">✦</span>
                      <span className="text-gray-700 leading-relaxed">{insight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Call to Action */}
              <section className="text-center pt-6 border-t border-gray-200">
                <p className="text-gray-600 italic mb-4">
                  &quot;For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures.&quot;
                  <br />
                  <span className="text-sm text-[#D4AF37] font-semibold">— 1 Corinthians 15:3</span>
                </p>
              </section>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Come back tomorrow for a new discovery of Jesus in the Old Testament
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/"
                className="bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-md hover:shadow-xl"
              >
                ← Back to Home
              </a>
              <a
                href="/challenge"
                className="bg-[#6e3a6c] hover:bg-[#8B4789] text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-md hover:shadow-xl"
              >
                Daily Challenge 🎯
              </a>
            </div>
          </div>
        </div>
      </main>
  );
}
