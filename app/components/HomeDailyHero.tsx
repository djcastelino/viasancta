"use client";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import JourneyHeroImage from "./JourneyHeroImage";
import { useDailyArchitecture, architectureHeroImage, type DailyArchitecture } from "@/app/lib/useDailyArchitecture";

export default function HomeDailyHero({ churches }: { churches: DailyArchitecture[] }) {
  const church = useDailyArchitecture(churches);
  return (
      <section className="pilgrim-hero" aria-labelledby="pilgrim-title">
        {church && <JourneyHeroImage
          key={church.name}
          className="pilgrim-hero-image"
          src={architectureHeroImage(church)}
          alt={`${church.name} — ${church.location.city}, ${church.location.country}`}
          fallback="/images/home/architecture.webp"
        />}
        <div className="pilgrim-hero-shade" />
        <div className="pilgrim-hero-content">
          <p className="pilgrim-eyebrow">
            <span /> A PILGRIMAGE OF THE HEART
          </p>
          <h1 id="pilgrim-title">
            Sacred journeys.
            <br />
            <em>A deeper faith.</em>
          </h1>
          <p>
            Some journeys bring you to a place.
            <br />
            Others bring you closer to Him.
          </p>
          <div className="pilgrim-hero-actions">
            <a className="pilgrim-button pilgrim-button-gold" href="#tours">
              Begin your pilgrimage <ArrowUpRight size={18} />
            </a>
            <a className="pilgrim-quiet-link" href="#promise">
              A moment with His Word <ArrowDown size={16} />
            </a>
          </div>
        </div>
        <div className="pilgrim-hero-bottom">
          <span>EXPLORE. REFLECT. PRAY.</span>
          <div>
            <span>ARCHITECTURE OF THE DAY</span>
            <strong><Link href="/sacred-architecture">{church?.name || "Discover a new sacred space daily"}</Link></strong>
            <span>{church ? `${church.location.city}, ${church.location.country}` : "Opening today’s sacred space…"}</span>
          </div>
        </div>
      </section>
  );
}
