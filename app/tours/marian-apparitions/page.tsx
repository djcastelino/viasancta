import Link from 'next/link';
import apparitions from '@/public/marian-apparitions.json';
import MarianApparitionsClient from './MarianApparitionsClient';

export const metadata = {
  title: 'Marian Apparitions Tour - Divine Pilgrim',
  description: 'Journey through 20 Church-approved Marian apparitions worldwide with AI-guided narrations.',
}

export default async function MarianApparitionsPage() {
  // Count unique countries
  const countries = [...new Set(apparitions.map((a: any) => a.location.country))];

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
          Marian Apparitions Tour
        </h1>
        <p className="text-xl text-[#8B7355] italic mb-3">
          Church-Approved Appearances of Our Lady
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Journey through documented Marian apparitions from around the world
        </p>
      </header>

      {/* Search, Filter, and Apparitions Grid */}
      <MarianApparitionsClient apparitions={apparitions} countries={countries} />
    </main>
  );
}
