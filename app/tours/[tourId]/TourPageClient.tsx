'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import MiracleCard from '@/app/components/MiracleCard';
import SearchFilter from '@/app/components/SearchFilter';

interface TourPageClientProps {
  miracles: any[];
  countries: string[];
}

export default function TourPageClient({ miracles, countries }: TourPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCentury, setSelectedCentury] = useState('');

  // Filter miracles based on search and filters
  const filteredMiracles = useMemo(() => {
    return miracles.filter((miracle) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          miracle.name?.toLowerCase().includes(query) ||
          miracle.location.city.toLowerCase().includes(query) ||
          miracle.location.country.toLowerCase().includes(query) ||
          miracle.description.toLowerCase().includes(query) ||
          miracle.date.year.toString().includes(query);

        if (!matchesSearch) return false;
      }

      // Country filter
      if (selectedCountry && miracle.location.country !== selectedCountry) {
        return false;
      }

      // Century filter
      if (selectedCentury && selectedCentury !== 'All Centuries') {
        const centuryNum = parseInt(selectedCentury);
        const miracleCentury = Math.ceil(miracle.date.year / 100);
        if (miracleCentury !== centuryNum) return false;
      }

      return true;
    });
  }, [miracles, searchQuery, selectedCountry, selectedCentury]);

  return (
    <>
      {/* Search and Filter */}
      <SearchFilter
        onSearch={setSearchQuery}
        onFilterCountry={setSelectedCountry}
        onFilterCentury={setSelectedCentury}
        countries={countries}
      />

      {/* Miracles Grid */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        {filteredMiracles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMiracles.map((miracle: any) => (
              <MiracleCard key={miracle.id} miracle={miracle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No miracles found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('');
                setSelectedCentury('');
              }}
              className="bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
