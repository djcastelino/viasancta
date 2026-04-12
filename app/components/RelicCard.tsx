'use client';

import { useState } from 'react';

interface RelicCardProps {
  relic: {
    id: number;
    name: string;
    location: {
      church: string;
      city: string;
      country: string;
    };
    type: string;
    relatedTo: string;
    dateOrigin: string;
    quickFacts: string[];
    images: Array<{
      url: string;
      caption: string;
      credit: string;
    }>;
  };
  onClick: () => void;
}

export default function RelicCard({ relic, onClick }: RelicCardProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback images for relics
  const fallbackImages = [
    'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80', // Church interior with golden light
    'https://images.unsplash.com/photo-1544128398-147446a27a2f?w=800&q=80', // Cathedral stained glass
    'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80', // Ancient religious art
  ];

  const fallbackIndex = relic.id % fallbackImages.length;
  const imageUrl = imageError ? fallbackImages[fallbackIndex] : relic.images[0].url;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={relic.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
            {relic.type}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-2xl font-bold mb-2 drop-shadow-md">
            {relic.name}
          </h3>
          <p className="text-sm text-gray-200 mb-1">
            {relic.location.church}
          </p>
          <p className="text-sm font-semibold text-[#D4AF37]">
            {relic.location.city}, {relic.location.country}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#2C5F87] font-semibold text-sm">Related to:</span>
          <span className="text-gray-700 text-sm">{relic.relatedTo}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#2C5F87] font-semibold text-sm">Origin:</span>
          <span className="text-gray-700 text-sm">{relic.dateOrigin}</span>
        </div>

        {/* First Quick Fact */}
        {relic.quickFacts && relic.quickFacts.length > 0 && (
          <div className="bg-[#f5f5f0] rounded-lg p-3 mb-4">
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-[#D4AF37]">💡</span> {relic.quickFacts[0]}
            </p>
          </div>
        )}

        <button className="w-full bg-[#2C5F87] hover:bg-[#1e4a5f] text-white px-6 py-3 rounded-full font-semibold transition-colors">
          Explore Relic →
        </button>
      </div>
    </div>
  );
}
