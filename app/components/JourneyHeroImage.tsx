"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

export default function JourneyHeroImage({ src, alt, fallback, className }: {
  src: string; alt: string; fallback: string; className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return <>
    <img
      className={className}
      src={failed ? fallback : src}
      alt={failed ? "Illustrative sacred architecture; today's photograph is unavailable" : alt}
      fetchPriority="high"
      onError={() => setFailed(true)}
    />
    {failed && <p className="journey-hero-image-note">Illustrative image · Today’s photograph is unavailable</p>}
  </>;
}
