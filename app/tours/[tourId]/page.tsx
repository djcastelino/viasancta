import JourneyFrame from '@/app/components/JourneyFrame';
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

  return <JourneyFrame kind="miracles"><div className="journey-collection-intro"><p className="pilgrim-eyebrow">ENCOUNTERS OF FAITH / {miracles.length} ACCOUNTS</p><h2>Stories to contemplate.<br /><em>Places to discover.</em></h2><p>Search by place, country, or century to begin your pilgrimage.</p></div><TourPageClient miracles={miracles} countries={countries} /></JourneyFrame>;
}
