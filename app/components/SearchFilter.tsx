'use client';

import { useState } from 'react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterCountry: (country: string) => void;
  onFilterCentury: (century: string) => void;
  countries: string[];
}

export default function SearchFilter({ onSearch, onFilterCountry, onFilterCentury, countries }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const centuries = [
    'All Centuries',
    '4th Century',
    '8th Century',
    '11th Century',
    '12th Century',
    '13th Century',
    '14th Century',
    '15th Century',
    '16th Century',
    '17th Century',
    '18th Century',
    '19th Century',
    '20th Century',
    '21st Century',
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search miracles by location, description, or year..."
                className="w-full px-6 py-4 pr-12 border-2 border-gray-200 rounded-full focus:border-[#D4AF37] focus:outline-none text-base transition-all"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Country Filter */}
          <select
            onChange={(e) => onFilterCountry(e.target.value)}
            className="px-6 py-4 border-2 border-gray-200 rounded-full focus:border-[#D4AF37] focus:outline-none bg-white cursor-pointer transition-all hover:border-[#D4AF37]"
          >
            <option value="">All Countries</option>
            {countries.sort().map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* Century Filter */}
          <select
            onChange={(e) => onFilterCentury(e.target.value)}
            className="px-6 py-4 border-2 border-gray-200 rounded-full focus:border-[#D4AF37] focus:outline-none bg-white cursor-pointer transition-all hover:border-[#D4AF37]"
          >
            {centuries.map((century) => (
              <option key={century} value={century}>
                {century}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        {searchQuery && (
          <div className="mt-4 text-sm text-gray-600">
            Searching for: <span className="font-semibold text-[#2C5F87]">"{searchQuery}"</span>
          </div>
        )}
      </div>
    </div>
  );
}
