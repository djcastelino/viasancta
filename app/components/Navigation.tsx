'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
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
              href="/#promise"
              className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors whitespace-nowrap"
            >
              Today's Promise
            </Link>
            <Link
              href="/challenge"
              className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors whitespace-nowrap"
            >
              Daily Challenge
            </Link>
            <Link
              href="/jesus-in-ot"
              className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors whitespace-nowrap"
            >
              Jesus in the Old Testament
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors"
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-[#D4AF37]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 mt-4 pt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors px-4 py-2"
              >
                Home
              </Link>
              <Link
                href="/#tours"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors px-4 py-2"
              >
                Sacred Pilgrimages
              </Link>
              <Link
                href="/#promise"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors px-4 py-2"
              >
                Today's Promise
              </Link>
              <Link
                href="/challenge"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors px-4 py-2"
              >
                Daily Challenge
              </Link>
              <Link
                href="/jesus-in-ot"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors px-4 py-2"
              >
                Jesus in the Old Testament
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#D4AF37] font-semibold transition-colors px-4 py-2"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
