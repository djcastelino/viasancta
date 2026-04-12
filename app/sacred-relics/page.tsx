import Link from 'next/link';
import { Suspense } from 'react';
import relics from '@/public/sacred-relics.json';
import SacredRelicsClient from './SacredRelicsClient';

export const metadata = {
  title: 'Sacred Relics - Divine Pilgrim',
  description: 'Explore the most venerated relics in Christianity with detailed history, scientific studies, and audio tours.',
}

export default async function SacredRelicsPage() {
  // Count unique countries and types
  const countries = [...new Set(relics.map((r: any) => r.location.country))];
  const types = [...new Set(relics.map((r: any) => r.type))];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5]">
      {/* Hero Banner */}
      <section className="relative h-[450px] overflow-hidden">
        <img
          src="/images/relics/cover-image.jpg"
          alt="Sacred Relics - Treasures of Faith"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-5">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-serif drop-shadow-2xl text-center">
            Sacred Relics
          </h1>
          <p className="text-2xl md:text-3xl italic mb-3 drop-shadow-lg text-[#D4AF37]">
            Treasures of Faith
          </p>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl text-center drop-shadow-md">
            Journey through Christianity's most venerated relics with scientific studies, detailed history, and audio tours
          </p>
          <div className="mt-6 flex gap-4 text-sm flex-wrap justify-center">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-semibold">{relics.length} Sacred Relics</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-semibold">{countries.length} Countries</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-semibold">Scientific Studies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Header Navigation */}
      <header className="text-center pt-8 pb-6 px-5">
        <div className="mb-4">
          <Link href="/" className="text-gray-600 hover:text-[#2C5F87] text-sm font-semibold hover:underline">
            ← Back to All Tours
          </Link>
        </div>
      </header>

      {/* Relics Grid */}
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <SacredRelicsClient relics={relics} countries={countries} types={types} />
      </Suspense>
    </main>
  );
}
