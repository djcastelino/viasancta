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
  sources?: string[];
}

export default function TestEntriesPage() {
  const [entries, setEntries] = useState<JesusInOTEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JesusInOTEntry | null>(null);
  const [entryNumber, setEntryNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await fetch('/jesus-in-ot.json');
        const data: JesusInOTEntry[] = await response.json();
        setEntries(data);
        setSelectedEntry(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading entries:', error);
        setIsLoading(false);
      }
    };

    loadEntries();
  }, []);

  const loadEntry = (num: number) => {
    const entry = entries.find(e => e.id === num);
    if (entry) {
      setSelectedEntry(entry);
      setEntryNumber(num);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6e3a6c]/5 via-[#2C5F87]/5 to-[#325847]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
          <p className="mt-4 text-gray-600">Loading entries...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#6e3a6c]/5 via-[#2C5F87]/5 to-[#325847]/5">
      <div className="max-w-5xl mx-auto px-5 py-12">
        {/* Header with Entry Selector */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] bg-clip-text text-transparent mb-6">
            Test Jesus in OT Entries
          </h1>

          {/* Entry Selector */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <label className="text-gray-700 font-semibold">Entry Number:</label>
            <input
              type="number"
              min="1"
              max="365"
              value={entryNumber}
              onChange={(e) => setEntryNumber(parseInt(e.target.value) || 1)}
              className="px-4 py-2 border-2 border-[#D4AF37] rounded-lg text-center font-bold text-xl w-24"
            />
            <button
              onClick={() => loadEntry(entryNumber)}
              className="bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-6 py-2 rounded-full font-semibold transition-all hover:scale-105"
            >
              Load Entry
            </button>
          </div>

          {/* Quick Jump Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[1, 5, 12, 18, 31, 45, 50, 75, 85, 98, 100].map(num => (
              <button
                key={num}
                onClick={() => loadEntry(num)}
                className="bg-[#6e3a6c] hover:bg-[#8B4789] text-white px-4 py-1 rounded-full text-sm transition-all"
              >
                Entry {num}
              </button>
            ))}
          </div>

          <p className="text-gray-600">
            Testing entries 1-100 (fixed with proper sources) vs 101-365 (still need fixing)
          </p>
        </div>

        {/* Display Selected Entry */}
        {selectedEntry && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/20">
            {/* Title Section */}
            <div className="bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] text-white p-8 md:p-10">
              <div className="text-sm mb-2 opacity-90">
                Entry {selectedEntry.id} of 365 • {selectedEntry.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                {selectedEntry.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                  {selectedEntry.otBook}
                </span>
                <span className="inline-block bg-[#D4AF37] px-4 py-2 rounded-full text-sm font-semibold">
                  {selectedEntry.otReference}
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
                    &quot;{selectedEntry.otText}&quot;
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
                  {selectedEntry.historicalContext}
                </p>
              </section>

              {/* How It Points to Jesus */}
              <section className="bg-gradient-to-br from-[#D4AF37]/10 to-[#8B4789]/10 rounded-2xl p-6 border-2 border-[#D4AF37]/30">
                <h3 className="text-xl font-bold text-[#6e3a6c] mb-3 flex items-center gap-2">
                  <span>✝️</span>
                  <span>How It Points to Jesus</span>
                </h3>
                <p className="text-gray-800 leading-relaxed">
                  {selectedEntry.howItPointsToJesus}
                </p>
              </section>

              {/* Key Insights */}
              <section>
                <h3 className="text-xl font-bold text-[#2C5F87] mb-4 flex items-center gap-2">
                  <span>💡</span>
                  <span>Key Insights</span>
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {selectedEntry.keyInsights.map((insight, index) => (
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

              {/* Sources & References */}
              {selectedEntry.sources && selectedEntry.sources.length > 0 && (
                <section className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-[#D4AF37]/30">
                  <h3 className="text-xl font-bold text-[#6e3a6c] mb-4 flex items-center gap-2">
                    <span>📚</span>
                    <span>Sources & References</span>
                  </h3>
                  <ul className="space-y-2">
                    {selectedEntry.sources.map((source, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="text-[#D4AF37] flex-shrink-0">•</span>
                        <span className="text-gray-700 leading-relaxed font-serif">{source}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 mt-4 italic">
                    References include Catechism of the Catholic Church (CCC), Sacred Scripture, Church Fathers, Doctors of the Church, and Magisterial documents.
                  </p>
                </section>
              )}

              {/* Navigation */}
              <div className="flex justify-center gap-4 pt-6">
                <button
                  onClick={() => loadEntry(Math.max(1, selectedEntry.id - 1))}
                  disabled={selectedEntry.id === 1}
                  className="bg-[#2C5F87] hover:bg-[#325847] disabled:bg-gray-400 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => loadEntry(Math.min(365, selectedEntry.id + 1))}
                  disabled={selectedEntry.id === 365}
                  className="bg-[#2C5F87] hover:bg-[#325847] disabled:bg-gray-400 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
