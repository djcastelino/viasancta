'use client';

import { useState } from 'react';

interface ChurchCardProps {
  church: any;
  onClick: () => void;
}

export default function ChurchCard({ church, onClick }: ChurchCardProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback image if Wikimedia fails
  const fallbackImage = 'https://images.unsplash.com/photo-1547586696-c1e8e8a34325?w=800&q=80';
  const displayImage = (church.images?.[0]?.url && !imageError) ? church.images[0].url : fallbackImage;

  return (
    <div
      onClick={onClick}
      className="block group cursor-pointer"
    >
      <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        {/* Background Image */}
        <img
          src={displayImage}
          alt={church.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 text-white">
          {/* Bottom Content */}
          <div>
            {/* Location */}
            <div className="mb-3">
              <span className="text-lg font-medium">
                {church.location.city}, {church.location.country}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
              {church.name}
            </h3>

            {/* Info */}
            <div className="text-white/90 mb-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Built:</span>
                <span>{church.built}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Style:</span>
                <span>{church.architectureStyle}</span>
              </div>
            </div>

            {/* Button */}
            <div className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c49d2f] px-6 py-3 rounded-full font-semibold transition-colors shadow-lg">
              <span>Explore</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
