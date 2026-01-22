'use client';

import { useState } from 'react';

interface ApparitionCardProps {
  apparition: any;
  onClick: () => void;
}

export default function ApparitionCard({ apparition, onClick }: ApparitionCardProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback landscape images (free Unsplash images of churches/cathedrals/religious sites)
  const landscapes = [
    'https://images.unsplash.com/photo-1547586696-c1e8e8a34325?w=800&q=80', // Church
    'https://images.unsplash.com/photo-1548625361-1cabc72a4b4f?w=800&q=80', // Cathedral
    'https://images.unsplash.com/photo-1508803889403-b04e952aff7d?w=800&q=80', // Religious architecture
    'https://images.unsplash.com/photo-1605270012990-5c00855b4e26?w=800&q=80', // Chapel
    'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=800&q=80', // Basilica
    'https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800&q=80', // Cathedral interior
    'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800&q=80', // Church exterior
    'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80', // Historic church
  ];

  // Simple hash to pick consistent landscape per apparition
  const landscapeIndex = apparition.id % landscapes.length;
  const fallbackLandscape = landscapes[landscapeIndex];

  return (
    <div
      onClick={onClick}
      className="block group cursor-pointer"
    >
      <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        {/* Background Image */}
        <img
          src={fallbackLandscape}
          alt={`${apparition.name}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6 text-white">
          {/* Tag */}
          <div className="flex justify-start">
            <span className="bg-[#D4AF37] px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              Marian Apparition
            </span>
          </div>

          {/* Bottom Content */}
          <div>
            {/* Location */}
            <div className="mb-3">
              <span className="text-lg font-medium">
                {apparition.location.city}, {apparition.location.country}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
              {apparition.name}
            </h3>

            {/* Year */}
            <div className="text-white/90 mb-4">
              <span className="font-semibold">{apparition.year}</span>
              {' • '}
              <span>{apparition.apparitionCount} {typeof apparition.apparitionCount === 'number' && apparition.apparitionCount === 1 ? 'apparition' : 'apparitions'}</span>
            </div>

            {/* Button */}
            <div className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c49d2f] px-6 py-3 rounded-full font-semibold transition-colors shadow-lg">
              <span>Discover</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
