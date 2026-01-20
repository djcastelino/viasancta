'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-3xl transition-transform group-hover:scale-110">✝️</span>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] bg-clip-text text-transparent font-serif">
                Divine Pilgrim
              </span>
              <span className="text-xs text-[#D4AF37] italic hidden sm:block">Virtual Sacred Journeys</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#tours"
              className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors"
            >
              Sacred Pilgrimages
            </Link>
            <Link
              href="/challenge"
              className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors"
            >
              Daily Challenge
            </Link>
            <Link
              href="/jesus-in-ot"
              className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors"
            >
              Jesus in the Old Testament
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors"
            >
              About
            </Link>
            <Link
              href="/tours/eucharistic-miracles"
              className="bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 shadow-md hover:shadow-xl"
            >
              Start Journey →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 hover:text-[#D4AF37]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
