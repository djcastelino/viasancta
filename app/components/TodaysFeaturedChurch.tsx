'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Church {
  id: number;
  name: string;
  location: {
    city: string;
    country: string;
  };
  built: string;
  architectureStyle: string;
  quickFacts: string[];
  images: Array<{
    url: string;
    caption: string;
  }>;
}

export default function TodaysFeaturedChurch() {
  const [featuredChurch, setFeaturedChurch] = useState<Church | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedChurch = async () => {
      try {
        const response = await fetch('/sacred-architecture.json');
        const churches: Church[] = await response.json();

        // Calculate day of year (1-365/366)
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        // Rotate through churches based on day of year
        const churchIndex = (dayOfYear - 1) % churches.length;
        const church = churches[churchIndex];

        setFeaturedChurch(church);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading featured church:', error);
        setIsLoading(false);
      }
    };

    loadFeaturedChurch();
  }, []);

  if (isLoading || !featuredChurch) {
    return null;
  }

  return (
    <section id="featured-church" className="max-w-7xl mx-auto px-5 py-8">
      <Link href="/sacred-architecture" className="block group">
        <div className="bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-600 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-80 md:h-auto overflow-hidden">
              <img
                src={featuredChurch.images[0].url}
                alt={featuredChurch.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/60 md:to-transparent" />
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 text-white relative">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-start gap-2 mb-3">
                  <span className="bg-white/30 px-4 py-1 rounded-full text-sm font-bold">
                    TODAY'S FEATURED CHURCH
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-2 font-serif">
                  {featuredChurch.name}
                </h2>
                <p className="text-xl text-amber-100 mb-4">
                  {featuredChurch.location.city}, {featuredChurch.location.country}
                </p>

                {/* Quick Info */}
                <div className="mb-6 space-y-2">
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="font-semibold">Built:</span>
                    <span>{featuredChurch.built}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="font-semibold">Style:</span>
                    <span>{featuredChurch.architectureStyle}</span>
                  </div>
                </div>

                {/* Did You Know? */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span>💡</span>
                    <span>Did You Know?</span>
                  </h3>
                  <p className="text-white/95 text-sm leading-relaxed">
                    {featuredChurch.quickFacts[0]}
                  </p>
                </div>

                <div className="inline-block bg-white text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-full font-bold text-lg shadow-xl group-hover:scale-105 transition-transform">
                  Explore This Church →
                </div>

                <p className="text-white/70 text-xs mt-6 italic">
                  ✨ Come back tomorrow for another stunning sacred space
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
