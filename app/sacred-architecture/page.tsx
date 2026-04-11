import Link from 'next/link';
import churches from '@/public/sacred-architecture.json';
import SacredArchitectureClient from './SacredArchitectureClient';

export const metadata = {
  title: 'Sacred Architecture - Divine Pilgrim',
  description: 'Journey through 100 magnificent churches and cathedrals from around the world with audio tours.',
}

export default async function SacredArchitecturePage() {
  // Count unique countries and architecture styles
  const countries = [...new Set(churches.map((c: any) => c.location.country))];
  const styles = [...new Set(churches.flatMap((c: any) => c.architectureStyle.split(', ')))];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5]">
      {/* Hero Banner */}
      <section className="relative h-[450px] overflow-hidden">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/St_Peter%27s_Basilica_facade%2C_Rome%2C_Italy.jpg/1920px-St_Peter%27s_Basilica_facade%2C_Rome%2C_Italy.jpg"
          alt="Sacred Architecture - World's Most Magnificent Churches"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-5">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-serif drop-shadow-2xl text-center">
            Sacred Architecture
          </h1>
          <p className="text-2xl md:text-3xl italic mb-3 drop-shadow-lg text-[#D4AF37]">
            100 Magnificent Churches & Cathedrals
          </p>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl text-center drop-shadow-md">
            Journey through history's most stunning sacred spaces with audio tours of architecture, history, and divine artistry
          </p>
          <div className="mt-6 flex gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-semibold">{churches.length} Churches</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-semibold">{countries.length} Countries</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-semibold">10+ Centuries</span>
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

      {/* Search, Filter, and Churches Grid */}
      <SacredArchitectureClient churches={churches} countries={countries} styles={styles} />
    </main>
  );
}
