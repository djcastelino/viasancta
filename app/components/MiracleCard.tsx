'use client';

import Link from 'next/link';
import { useState } from 'react';

interface MiracleCardProps {
  miracle: {
    id: string;
    name?: string;
    location: {
      city: string;
      country: string;
    };
    date: {
      year: number;
      displayDate?: string;
    };
    description: string;
    images?: Array<{
      url: string;
      alt: string;
    }>;
  };
}

export default function MiracleCard({ miracle }: MiracleCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Get background image or fallback
  const backgroundImage = miracle.images?.[0]?.url;
  const hasImage = backgroundImage && !imageError;
  
  // Fallback gradient based on country (for variety)
  const gradients = [
    'from-[#193d52] to-[#325847]', // Teal
    'from-[#2d5fa8] to-[#524aaa]', // Blue-Purple
    'from-[#5e3159] to-[#692f15]', // Purple-Brown
    'from-[#b8921c] to-[#9e7d18]', // Gold
    'from-[#56442f] to-[#6a5540]', // Brown
    'from-[#3e6d7e] to-[#4d8a96]', // Cyan
  ];
  
  // Simple hash to pick consistent gradient per miracle
  const gradientIndex = miracle.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <Link
      href={`/miracles/${miracle.id}`}
      className="block group"
    >
      <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        {/* Background Image or Gradient */}
        {hasImage ? (
          <>
            <img 
              src={backgroundImage}
              alt={miracle.images![0].alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6 text-white">
          {/* Tag */}
          <div className="flex justify-start">
            <span className="bg-[#D4AF37] px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              Eucharistic Miracle
            </span>
          </div>
          
          {/* Bottom Content */}
          <div>
            {/* Location */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{getCountryFlag(miracle.location.country)}</span>
              <span className="text-lg font-medium">
                {miracle.location.city}, {miracle.location.country}
              </span>
            </div>
            
            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
              {miracle.name || `Miracle of ${miracle.location.city}`}
            </h3>
            
            {/* Description */}
            <p className="text-white/90 mb-4 line-clamp-2 text-sm md:text-base leading-relaxed">
              {miracle.description}
            </p>
            
            {/* Date */}
            <div className="text-white/80 text-sm mb-4">
              {miracle.date.displayDate || miracle.date.year}
            </div>
            
            {/* Button */}
            <div className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c49d2f] px-6 py-3 rounded-full font-semibold transition-colors shadow-lg">
              <span>Discover</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Helper function
function getCountryFlag(country: string): string {
  const flags: { [key: string]: string } = {
    'Argentina': '🇦🇷',
    'Italy': '🇮🇹',
    'Poland': '🇵🇱',
    'France': '🇫🇷',
    'Germany': '🇩🇪',
    'Spain': '🇪🇸',
    'Portugal': '🇵🇹',
    'Austria': '🇦🇹',
    'Belgium': '🇧🇪',
    'India': '🇮🇳',
    'Mexico': '🇲🇽',
    'Venezuela': '🇻🇪',
    'Croatia': '🇭🇷',
    'Netherlands': '🇳🇱',
    'Colombia': '🇨🇴',
    'Peru': '🇵🇪',
    'Switzerland': '🇨🇭',
    'Egypt': '🇪🇬',
    'Martinique': '🇲🇶',
    'United States': '🇺🇸',
    'Philippines': '🇵🇭',
    // Add more as needed
  };
  return flags[country] || '🌍';
}

