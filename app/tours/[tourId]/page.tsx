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
      {/* Hero Banner with AI Art */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src="/images/eucharistic miralces/buenos_aires.png"
          alt="Eucharistic Miracles - Sacred Journey"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-5">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-serif drop-shadow-2xl text-center">
            Eucharistic Miracles Tour
          </h1>
          <p className="text-2xl italic mb-2 drop-shadow-lg">
            Based on St. Carlo Acutis Research
          </p>
          <p className="text-lg text-gray-200 max-w-2xl text-center drop-shadow-md">
            Journey through documented Eucharistic miracles from around the world
          </p>
        </div>
      </section>

      {/* Header */}
      <header className="text-center pt-8 pb-8 px-5">
        <div className="mb-4">
          <Link href="/" className="text-gray-600 hover:text-[#2C5F87] text-sm font-semibold hover:underline">
            ← Back to All Tours
          </Link>
        </div>
      </header>

      {/* Search, Filter, and Miracles Grid */}
      <TourPageClient miracles={miracles} countries={countries} />
    </main>
  );
}
