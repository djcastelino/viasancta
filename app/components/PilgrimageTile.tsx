"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Headphones } from "lucide-react";
export default function PilgrimageTile({
  title,
  eyebrow,
  meta,
  description,
  image,
  fallback,
  href,
  onClick,
}: {
  title: string;
  eyebrow: string;
  meta: string;
  description?: string;
  image?: string;
  fallback: string;
  href?: string;
  onClick?: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const content = (
    <>
      <div className="journey-tile-image">
        <img
          src={failed || !image ? fallback : image}
          alt={title}
          loading="lazy"
          onError={() => setFailed(true)}
        />
        <span className="journey-tile-audio">
          <Headphones size={21} aria-hidden="true" /> Audio guide
        </span>
        <span className="journey-tile-arrow">
          <ArrowUpRight size={21} />
        </span>
      </div>
      <div className="journey-tile-copy">
        <p className="pilgrim-eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p className="journey-tile-meta">{meta}</p>
        {description && <p>{description}</p>}
        <span className="journey-tile-cta">
          <Headphones size={19} aria-hidden="true" /> Open audio journey
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
    </>
  );
  return href ? (
    <Link href={href} className="journey-tile">
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className="journey-tile">
      {content}
    </button>
  );
}
