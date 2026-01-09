import Link from 'next/link';
import miracles from '@/src/eucharistic-miracles.json';

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
          <Link href="/" className="text-gray-600 hover:text-[#2C5F87] text-sm">
            ← Back to All Tours
          </Link>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#193d52] to-[#325847] bg-clip-text text-transparent font-serif">
          ✦ Eucharistic Miracles Tour ✦
        </h1>
        <p className="text-xl text-[#8B7355] italic mb-3">
          Based on St. Carlo Acutis Research
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Journey through documented Eucharistic miracles from around the world
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="bg-white rounded-2xl shadow-md p-5 min-w-[120px]">
            <div className="text-3xl font-bold text-[#D4AF37]">{miracles.length}</div>
            <div className="text-sm text-gray-500">Sacred Stops</div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5 min-w-[120px]">
            <div className="text-3xl font-bold text-[#D4AF37]">{countries.length}</div>
            <div className="text-sm text-gray-500">Countries</div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5 min-w-[120px]">
            <div className="text-3xl font-bold text-[#D4AF37]">2,000+</div>
            <div className="text-sm text-gray-500">Years of History</div>
          </div>
        </div>
      </header>

      {/* Miracles Grid */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {miracles.map((miracle: any, index: number) => {
            const countryFlag = getCountryFlag(miracle.location.country);
            const cardGradient = getCardGradient(index);
            
            return (
              <Link
                key={miracle.id}
                href={`/miracles/${miracle.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Hero Section */}
                <div className={`h-48 bg-gradient-to-br ${cardGradient} relative flex items-center justify-center`}>
                  <div className="text-center text-white z-10">
                    <div className="text-6xl mb-3">{countryFlag}</div>
                    <div className="text-sm opacity-90">{miracle.location.country}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2C5F87] mb-2">
                    {miracle.location.city}
                  </h3>
                  <div className="text-sm text-gray-500 mb-4">
                    {miracle.date.displayDate || miracle.date.year}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {miracle.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D4AF37] font-semibold text-sm">
                      🎧 Listen to Story →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

// Helper function to get country flag emoji
function getCountryFlag(country: string): string {
  const flags: { [key: string]: string } = {
    'Argentina': '🇦🇷',
    'Colombia': '🇨🇴',
    'Netherlands': '🇳🇱',
    'Italy': '🇮🇹',
    'Poland': '🇵🇱',
    'France': '🇫🇷',
    'Germany': '🇩🇪',
    'Spain': '🇪🇸',
    'Portugal': '🇵🇹',
    'Austria': '🇦🇹',
    'Belgium': '🇧🇪',
    'India': '🇮🇳',
  };
  return flags[country] || '🌍';
}

// Helper function to get card gradient colors (rotating through sacred colors)
function getCardGradient(index: number): string {
  const gradients = [
    'from-[#193d52] to-[#325847]',  // Deep teal/green (original)
    'from-[#6B3E8C] to-[#4A2C5F]',  // Rich purple/violet
    'from-[#8B4513] to-[#654321]',  // Warm brown/bronze
    'from-[#1B4B5A] to-[#0D3A4A]',  // Deep ocean blue
    'from-[#7B3F2B] to-[#5C2E1F]',  // Earthy terracotta
    'from-[#2C5282] to-[#1A3A5C]',  // Royal blue
  ];
  return gradients[index % gradients.length];
}

export function generateStaticParams() {
  return [
    { tourId: 'eucharistic-miracles' },
    { tourId: 'marian-apparitions' },
    { tourId: 'stations-of-cross' },
    { tourId: 'saint-shrines' },
    { tourId: 'sacred-architecture' },
    { tourId: 'biblical-sites' },
  ];
}

export const metadata = {
  title: 'Eucharistic Miracles Tour | Via Sancta',
  description: 'Journey through 11 documented Eucharistic miracles from around the world, based on St. Carlo Acutis research.',
};

