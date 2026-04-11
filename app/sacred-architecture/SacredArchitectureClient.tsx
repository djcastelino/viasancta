'use client';

import { useState, useMemo } from 'react';
import ChurchCard from '@/app/components/ChurchCard';

interface SacredArchitectureClientProps {
  churches: any[];
  countries: string[];
  styles: string[];
}

export default function SacredArchitectureClient({ churches, countries, styles }: SacredArchitectureClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedChurch, setSelectedChurch] = useState<any>(null);

  // Filter churches
  const filteredChurches = useMemo(() => {
    return churches.filter((church) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          church.name?.toLowerCase().includes(query) ||
          church.location.city.toLowerCase().includes(query) ||
          church.location.country.toLowerCase().includes(query) ||
          church.architectureStyle.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      if (selectedCountry && church.location.country !== selectedCountry) {
        return false;
      }

      if (selectedStyle && !church.architectureStyle.includes(selectedStyle)) {
        return false;
      }

      return true;
    });
  }, [churches, searchQuery, selectedCountry, selectedStyle]);

  const handleCardClick = (church: any) => {
    setSelectedChurch(church);
  };

  const handleCloseModal = () => {
    setSelectedChurch(null);
  };

  return (
    <>
      {/* Search and Filter */}
      <section className="max-w-7xl mx-auto px-5 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search by name, location, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="">All Countries</option>
              {countries.sort().map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="">All Styles</option>
              {styles.sort().map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>

            {(searchQuery || selectedCountry || selectedStyle) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCountry('');
                  setSelectedStyle('');
                }}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600 text-center">
            Showing {filteredChurches.length} {filteredChurches.length === 1 ? 'church' : 'churches'}
          </p>
        </div>
      </section>

      {/* Churches Grid */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        {filteredChurches.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChurches.map((church: any) => (
              <ChurchCard
                key={church.id}
                church={church}
                onClick={() => handleCardClick(church)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No churches found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('');
                setSelectedStyle('');
              }}
              className="bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedChurch && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header with Image */}
            <div className="relative h-80 rounded-t-3xl overflow-hidden">
              <img
                src={selectedChurch.images[0].url}
                alt={selectedChurch.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-4xl font-bold mb-2">{selectedChurch.name}</h2>
                <p className="text-white/90 text-lg">
                  {selectedChurch.location.city}, {selectedChurch.location.country} • {selectedChurch.built}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Quick Facts */}
              <div className="bg-gradient-to-br from-[#f5f5f0] to-[#e8e8f5] p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#2C5F87] mb-4 flex items-center gap-2">
                  <span>⚡</span>
                  <span>Quick Facts</span>
                </h3>
                <ul className="space-y-2">
                  {selectedChurch.quickFacts.map((fact: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#D4AF37] font-bold mt-1">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Style & Architects */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-gray-200 p-4 rounded-xl">
                  <h4 className="font-bold text-[#2C5F87] mb-2">Architecture Style</h4>
                  <p className="text-gray-700">{selectedChurch.architectureStyle}</p>
                </div>
                <div className="bg-white border-2 border-gray-200 p-4 rounded-xl">
                  <h4 className="font-bold text-[#2C5F87] mb-2">Architects</h4>
                  <p className="text-gray-700">{selectedChurch.architects.join(', ')}</p>
                </div>
              </div>

              {/* History */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>📜</span>
                  <span>History</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedChurch.history}</p>
              </div>

              {/* Architecture */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>🏛️</span>
                  <span>Architecture</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedChurch.architecture}</p>
              </div>

              {/* Notable Art */}
              <div>
                <h3 className="text-2xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>🎨</span>
                  <span>Notable Art & Features</span>
                </h3>
                <ul className="space-y-2">
                  {selectedChurch.notableArt.map((art: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#D4AF37] font-bold mt-1">•</span>
                      <span>{art}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visit Info */}
              <div className="bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-[#2C5F87] mb-3 flex items-center gap-2">
                  <span>ℹ️</span>
                  <span>Visitor Information</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedChurch.visitInfo}</p>
              </div>

              {/* Google Maps Link */}
              <div className="text-center">
                <a
                  href={selectedChurch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  📍 View on Google Maps
                </a>
              </div>

              {/* Image Credit */}
              <p className="text-xs text-gray-400 text-center">
                Image: {selectedChurch.images[0].credit}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
