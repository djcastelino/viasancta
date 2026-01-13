'use client';

import { useState } from 'react';

interface MiracleImageProps {
  images: Array<{
    url: string;
    source: string;
    sourceUrl: string;
    credit: string;
    alt: string;
    type?: string;
  }>;
  miracleName: string;
  country: string;
}

export default function MiracleImage({ images, miracleName, country }: MiracleImageProps) {
  const [imageError, setImageError] = useState(false);
  
  // If no images or image failed to load, show fallback
  if (!images || images.length === 0 || imageError) {
    return (
      <div className="h-48 bg-gradient-to-br from-[#193d52] to-[#325847] flex items-center justify-center relative overflow-hidden">
        <div className="text-center text-white z-10">
          <div className="text-6xl mb-3">{getCountryFlag(country)}</div>
          <div className="text-sm opacity-90">{country}</div>
        </div>
      </div>
    );
  }

  const primaryImage = images[0];

  return (
    <div className="relative">
      <img
        src={primaryImage.url}
        alt={primaryImage.alt}
        className="w-full h-48 object-cover"
        onError={() => setImageError(true)}
      />
      {/* Optional: Show attribution on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 opacity-0 hover:opacity-100 transition-opacity">
        {primaryImage.credit}
      </div>
    </div>
  );
}

// Helper function to get country flag emoji
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
    // Add more as needed
  };
  return flags[country] || '🌍';
}

