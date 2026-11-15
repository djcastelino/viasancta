"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#131B2E] via-[#0F1624] to-[#1A1612] border border-slate-800/80 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Compass className="w-8 h-8 text-amber-500/70 mb-2 stroke-[1.5]" />
        <span className="font-display text-sm text-slate-200">
          {fallbackTitle || alt}
        </span>
        <span className="font-mono text-xs text-slate-400 mt-1">
          Archival Plate · Geonauts Dossier
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
