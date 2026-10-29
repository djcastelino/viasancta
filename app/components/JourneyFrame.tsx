/* Existing local artwork is pre-optimized for the collection openings. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Cross, Headphones } from "lucide-react";
import JourneyHeroImage from "./JourneyHeroImage";
export interface FeaturedJourney {
  name: string;
  location: string;
  image: string;
}
export const journeys = {
  miracles: {
    href: "/tours/eucharistic-miracles",
    label: "Eucharistic miracles",
    title: "The mystery of",
    emphasis: "His presence.",
    image: "miracles",
    eyebrow: "EUCHARISTIC MIRACLES",
    description:
      "Explore accounts of Eucharistic miracles, their history, and the devotion they inspire. Based on the research of St. Carlo Acutis.",
  },
  marian: {
    href: "/tours/marian-apparitions",
    label: "Marian apparitions",
    title: "In the footsteps",
    emphasis: "of Our Lady.",
    image: "marian",
    eyebrow: "MARIAN APPARITIONS",
    description:
      "Enter the stories and places of Marian devotion. A quiet invitation to prayer, hope, and a deeper trust in God.",
  },
  mountains: {
    href: "/sacred-mountains",
    label: "Sacred mountains",
    title: "Where heaven",
    emphasis: "meets earth.",
    image: "beatitudes",
    eyebrow: "SACRED MOUNTAINS OF THE BIBLE",
    description:
      "From the giving of the Law to the Sermon on the Mount, discover the landscapes woven through Scripture.",
  },
  architecture: {
    href: "/sacred-architecture",
    label: "Sacred architecture",
    title: "Faith, built",
    emphasis: "in stone.",
    image: "architecture",
    eyebrow: "SACRED ARCHITECTURE",
    description:
      "Step inside the churches and basilicas shaped by centuries of belief. Discover one remarkable sacred space each day.",
  },
  stations: {
    href: "/stations-of-the-cross",
    label: "Stations of the Cross",
    title: "Walk the way.",
    emphasis: "Witness the love.",
    image: "stations",
    eyebrow: "STATIONS OF THE CROSS",
    description:
      "Fourteen stations. One immeasurable act of love. Walk the Via Dolorosa and make space for prayer along the way.",
  },
  timeline: {
    href: "/biblical-timeline",
    label: "Biblical Timeline",
    title: "Through every age,",
    emphasis: "His love remains.",
    image: "basilica",
    eyebrow: "THE STORY OF SALVATION",
    description:
      "Journey through twelve periods of salvation history, from Creation to the Church. Discover the threads that lead us to Christ.",
  },
  jesus: {
    href: "/jesus-in-ot",
    label: "Jesus in the Old Testament",
    title: "The promise.",
    emphasis: "The fulfilment.",
    image: "stations",
    eyebrow: "JESUS IN THE OLD TESTAMENT",
    description:
      "A daily encounter with the people, promises, and passages of the Old Testament that point toward Jesus.",
  },
};
export type JourneyKind = keyof typeof journeys;
export function JourneyHero({ kind, featured }: { kind: JourneyKind; featured?: FeaturedJourney }) {
  const item = journeys[kind];
  return (
    <>
      <div className="journey-breadcrumb">
        <Link href="/">
          <ArrowLeft size={14} /> Home
        </Link>
        <span>/ Sacred journeys</span>
        <span>/ {item.label}</span>
      </div>
      <section
        className="journey-hero"
        aria-labelledby={`journey-${kind}-title`}
      >
        {featured ? <JourneyHeroImage
          key={featured.image}
          src={featured.image}
          alt={`${featured.name} — ${featured.location}`}
          fallback={`/images/home/${item.image}.webp`}
        /> : <img src={`/images/home/${item.image}.webp`} alt={item.label} fetchPriority="high" />}
        <div className="journey-hero-shade" />
        <div className="journey-hero-copy">
          <p className="pilgrim-eyebrow">{item.eyebrow}</p>
          <h1 id={`journey-${kind}-title`}>
            {item.title}
            <br />
            <em>{item.emphasis}</em>
          </h1>
          <p>{item.description}</p>
          {featured && <div className="journey-featured-place">
            <span>TODAY’S SACRED SPACE</span>
            <strong>{featured.name}</strong>
            <span>{featured.location}</span>
          </div>}
          <a href="#journey-content" className="journey-hero-link">
            <Headphones size={15} /> Begin exploring <ArrowUpRight size={17} />
          </a>
        </div>
        <Cross
          className="journey-hero-cross"
          size={30}
          strokeWidth={0.7}
          aria-hidden="true"
        />
      </section>
      <nav
        className="journey-collections"
        aria-label="Sacred journey collections"
      >
        {Object.entries(journeys).map(([key, value]) => (
          <Link
            key={key}
            href={value.href}
            aria-current={key === kind ? "page" : undefined}
          >
            {value.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
export function JourneyFooter() {
  return (
    <footer className="journey-footer">
      <div>
        <Cross size={23} strokeWidth={1} />
        <p>
          Every journey, <em>a little closer to Him.</em>
        </p>
      </div>
      <Link href="/">
        Return to Divine Pilgrim <ArrowUpRight size={15} />
      </Link>
    </footer>
  );
}
export default function JourneyFrame({
  kind,
  children,
  featured,
}: {
  kind: JourneyKind;
  children: ReactNode;
  featured?: FeaturedJourney;
}) {
  return (
    <main className={`journey-shell journey-${kind}`}>
      <JourneyHero kind={kind} featured={featured} />
      <div className="journey-content" id="journey-content">
        {children}
      </div>
      <JourneyFooter />
    </main>
  );
}
