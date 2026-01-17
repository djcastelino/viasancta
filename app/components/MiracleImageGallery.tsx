'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MiracleImage {
  url: string;
  alt: string;
}

interface MiracleImageGalleryProps {
  images: MiracleImage[];
  miracleName: string;
}

export default function MiracleImageGallery({ images, miracleName }: MiracleImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null; // Don't show gallery if no images
  }

  return (
    <>
      {/* Gallery Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#2C5F87] mb-6 flex items-center gap-2">
          <span>📸</span>
          <span>Sacred Images</span>
        </h2>

        {/* Image Grid */}
        <div className={`grid gap-4 ${
          images.length === 1 ? 'grid-cols-1' :
          images.length === 2 ? 'grid-cols-2' :
          'grid-cols-2 md:grid-cols-3'
        }`}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-3xl">
                  🔍
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Caption for single image */}
        {images.length === 1 && (
          <p className="text-gray-600 text-sm text-center mt-4 italic">
            {images[0].alt}
          </p>
        )}

        <p className="text-gray-500 text-xs text-center mt-4">
          Click image to view full size
        </p>
      </div>

      {/* Full-Size Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-[#D4AF37] transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white text-5xl hover:text-[#D4AF37] transition-colors disabled:opacity-30"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(prev => prev === null ? null : Math.max(0, prev - 1));
                }}
                disabled={selectedImage === 0}
              >
                ‹
              </button>
              <button
                className="absolute right-4 text-white text-5xl hover:text-[#D4AF37] transition-colors disabled:opacity-30"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(prev => prev === null ? null : Math.min(images.length - 1, prev + 1));
                }}
                disabled={selectedImage === images.length - 1}
              >
                ›
              </button>
            </>
          )}

          {/* Image */}
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedImage].url}
              alt={images[selectedImage].alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Caption */}
            <div className="bg-white/95 backdrop-blur-sm rounded-b-lg p-4 text-center">
              <p className="text-gray-800 font-medium">
                {images[selectedImage].alt}
              </p>
              {images.length > 1 && (
                <p className="text-gray-500 text-sm mt-2">
                  Image {selectedImage + 1} of {images.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
