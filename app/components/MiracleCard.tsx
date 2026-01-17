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
  
  // Fallback sunrise/sunset landscapes (Unsplash - free to use)
  const landscapes = [
    'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80', // Golden sunrise over mountains
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', // Mountain sunrise
    'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?w=800&q=80', // Sunset over hills
    'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800&q=80', // Sunrise meadow
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80', // Mountain peak sunrise
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80', // Sunset lake reflection
    'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80', // Golden hour landscape
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80', // Sunset field
  ];

  // Simple hash to pick consistent landscape per miracle
  const landscapeIndex = miracle.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % landscapes.length;
  const fallbackLandscape = landscapes[landscapeIndex];

  return (
    <Link
      href={`/miracles/${miracle.id}`}
      className="block group"
    >
      <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        {/* Background Image (miracle image or landscape fallback) */}
        <img
          src={hasImage ? backgroundImage : fallbackLandscape}
          alt={hasImage ? miracle.images![0].alt : `Sunrise/sunset landscape for ${miracle.location.city}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
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
            <div className="mb-3">
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

