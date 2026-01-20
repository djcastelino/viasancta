import Link from 'next/link';
import miracles from '@/src/eucharistic-miracles.json';
import TourPageClient from './TourPageClient';

export default async function TourPage({ params }: { params: Promise<{ tourId: string }> }) {
  const { tourId } = await params;

  // For now, only Eucharistic Miracles is available
  if (tourId !== 'eucharistic-miracles') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5] flex items-center justify-center p-5">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2C5F87] mb-4">Coming Soon</h1>
          <p className="text-gray-600 mb-8">This tour is not yet available.</p>
          <Link
            href="/"
            className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors"
          >
            ← Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  // Count unique countries
  const countries = [...new Set(miracles.map((m: any) => m.location.country))];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5]">
      {/* Header */}
      <header className="text-center pt-12 pb-8 px-5">
        <div className="mb-4">
          <Link href="/" className="text-gray-600 hover:text-[#2C5F87] text-sm font-semibold hover:underline">
            ← Back to All Tours
          </Link>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#193d52] to-[#325847] bg-clip-text text-transparent font-serif">
          Eucharistic Miracles Tour
        </h1>
        <p className="text-xl text-[#8B7355] italic mb-3">
          Based on St. Carlo Acutis Research
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Journey through documented Eucharistic miracles from around the world
        </p>
      </header>

      {/* Search, Filter, and Miracles Grid */}
      <TourPageClient miracles={miracles} countries={countries} />
    </main>
  );
}
