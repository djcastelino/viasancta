/* Existing local artwork is served as pre-optimized WebP assets. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Cross,
  Headphones,
  Heart,
  MoveUpRight,
  Sparkles,
} from "lucide-react";
import TodaysPromise from "./components/TodaysPromise";
import HomeDailyHero from "./components/HomeDailyHero";
import churches from "@/public/sacred-architecture.json";

export const metadata = {
  title: "Divine Pilgrim — Sacred journeys. A deeper faith.",
  description:
    "Discover sacred places, reflect on Scripture, and make room for prayer. Catholic virtual pilgrimages and daily spiritual companions.",
};
const pilgrimages = [
  {
    href: "/tours/eucharistic-miracles",
    image: "miracles",
    label: "THE MYSTERY OF HIS PRESENCE",
    title: "Eucharistic miracles",
    text: "Encounter the stories, places, and devotion surrounding extraordinary signs of the Eucharist.",
  },
  {
    href: "/tours/marian-apparitions",
    image: "marian",
    label: "WALK WITH OUR BLESSED MOTHER",
    title: "Marian apparitions",
    text: "Journey to places of Marian devotion, where generations have come in prayer and hope.",
  },
  {
    href: "/stations-of-the-cross",
    image: "stations",
    label: "THE WAY OF LOVE",
    title: "Stations of the Cross",
    text: "Pause at each station. Walk with Christ through His Passion, one prayerful step at a time.",
  },
  {
    href: "/sacred-mountains",
    image: "beatitudes",
    label: "WHERE HEAVEN MEETS EARTH",
    title: "Sacred mountains",
    text: "From Sinai to the Mount of Beatitudes, discover the landscapes woven through Scripture.",
  },
  {
    href: "/sacred-architecture",
    image: "architecture",
    label: "FAITH, BUILT IN STONE",
    title: "Sacred architecture",
    text: "Enter magnificent churches and basilicas, shaped by centuries of faith and craftsmanship.",
  },
];
const prayers = [
  {
    href: "/seven-swords",
    image: "sword",
    label: "PRAY WITH PURPOSE",
    title: "Seven Striking Swords",
    text: "Scripture-inspired prayers of conversion, strength, and renewal.",
  },
  {
    href: "/armor-of-god",
    image: "armor",
    label: "EPHESIANS 6:10–18",
    title: "The Armor of God",
    text: "Clothe each day in truth, righteousness, peace, and faith.",
  },
  {
    href: "/psalm91",
    image: "psalm",
    label: "REST IN HIS SHELTER",
    title: "Psalm 91",
    text: "A quiet meditation on God’s promises of refuge and protection.",
  },
];
export default function Home() {
  return (
    <main className="pilgrim-home">
      <HomeDailyHero churches={churches.map(({ name, location, images }) => ({ name, location, images: images.slice(0, 1) }))} />
      <div className="pilgrim-welcome">
        <Cross size={20} strokeWidth={1} />
        <p>
          Wherever you are, <em>let faith lead the way.</em>
        </p>
        <span>YOUR DAILY COMPANION IN FAITH</span>
      </div>
      <TodaysPromise editorial />
      <section
        className="pilgrim-section"
        id="tours"
        aria-labelledby="journeys-title"
      >
        <div className="pilgrim-section-top">
          <p className="pilgrim-eyebrow">02 / PLACES OF GRACE</p>
          <span>VIRTUAL PILGRIMAGES · REAL MOMENTS OF REFLECTION</span>
        </div>
        <div className="pilgrim-section-heading">
          <h2 id="journeys-title">
            Follow the footsteps.
            <br />
            <em>Feel the presence.</em>
          </h2>
          <p>
            Discover the places that have drawn hearts to God for centuries.
            Listen to their stories. Find a little space for wonder.
          </p>
        </div>
        <div className="pilgrim-journeys">
          {pilgrimages.map((item, i) => (
            <Link
              className={`pilgrim-journey ${i > 2 ? "pilgrim-journey-wide" : ""}`}
              href={item.href}
              key={item.href}
            >
              <div className="pilgrim-journey-image">
                <img
                  src={`/images/home/${item.image}.webp`}
                  alt={item.title}
                  loading="lazy"
                />
                <span className="pilgrim-image-label">
                  <Headphones size={20} /> AUDIO JOURNEY
                </span>
                <span className="pilgrim-round-arrow">
                  <ArrowUpRight size={22} />
                </span>
              </div>
              <div className="pilgrim-journey-copy">
                <p className="pilgrim-eyebrow">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section
        className="pilgrim-word"
        id="challenge"
        aria-labelledby="word-title"
      >
        <div className="pilgrim-word-intro">
          <BookOpen size={45} strokeWidth={0.8} />
          <p className="pilgrim-eyebrow">03 / GROW IN THE WORD</p>
          <h2 id="word-title">
            A little each day.
            <br />
            <em>Rooted for a lifetime.</em>
          </h2>
          <p>
            Make Scripture part of your everyday life. A question to ponder. A
            verse to carry with you.
          </p>
        </div>
        <div className="pilgrim-word-tools">
          <Link href="/challenge" className="pilgrim-word-card">
            <span className="pilgrim-eyebrow">
              A FRESH CHALLENGE, EVERY DAY
            </span>
            <h3>
              Daily Scripture
              <br />
              <em>Challenge</em>
            </h3>
            <p>
              Six clues. One biblical discovery. Let your knowledge grow
              alongside your faith.
            </p>
            <span className="pilgrim-card-link">
              Explore today’s challenge <ArrowUpRight size={19} />
            </span>
          </Link>
          <Link
            id="memory-verses"
            href="/memory-verses"
            className="pilgrim-word-card"
          >
            <span className="pilgrim-eyebrow">WORDS TO KEEP CLOSE</span>
            <h3>
              Scripture
              <br />
              <em>Memory Coach</em>
            </h3>
            <p>
              Learn essential verses, return to them, and let God’s Word take
              root in your heart.
            </p>
            <span className="pilgrim-card-link">
              Begin with a verse <ArrowUpRight size={19} />
            </span>
          </Link>
        </div>
      </section>
      <section
        className="pilgrim-section pilgrim-prayer"
        id="spiritual-warfare"
        aria-labelledby="prayer-title"
      >
        <div className="pilgrim-section-top">
          <p className="pilgrim-eyebrow">04 / STRENGTH FOR THE SOUL</p>
          <Heart size={22} strokeWidth={1} />
        </div>
        <div className="pilgrim-section-heading">
          <h2 id="prayer-title">
            Be still.
            <br />
            <em>Be strengthened.</em>
          </h2>
          <p>
            In moments of uncertainty, turn toward prayer. These companions
            invite you to rest in His presence and walk forward in faith.
          </p>
        </div>
        <div className="pilgrim-prayer-grid">
          {prayers.map((item) => (
            <Link
              href={item.href}
              className="pilgrim-prayer-card"
              key={item.href}
            >
              <div>
                <img
                  src={`/images/home/${item.image}.webp`}
                  alt={item.title}
                  loading="lazy"
                />
              </div>
              <p className="pilgrim-eyebrow">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="pilgrim-card-link">
                Enter into prayer <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section
        className="pilgrim-history"
        id="salvation-history"
        aria-labelledby="history-title"
      >
        <div>
          <p className="pilgrim-eyebrow">05 / ONE UNFOLDING STORY</p>
          <h2 id="history-title">
            Through every age,
            <br />
            <em>His love remains.</em>
          </h2>
          <p>
            Trace the story of salvation, and discover how the Old Testament
            points toward Jesus.
          </p>
        </div>
        <div className="pilgrim-history-links">
          <Link href="/biblical-timeline">
            <span>
              <BookOpen size={23} strokeWidth={1} />
              <span>
                <small>FROM CREATION TO THE CHURCH</small>
                <strong>Biblical Timeline</strong>
              </span>
            </span>
            <MoveUpRight size={23} />
          </Link>
          <Link href="/jesus-in-ot">
            <span>
              <Sparkles size={23} strokeWidth={1} />
              <span>
                <small>THE PROMISE AND THE FULFILMENT</small>
                <strong>Jesus in the Old Testament</strong>
              </span>
            </span>
            <MoveUpRight size={23} />
          </Link>
        </div>
      </section>
      <footer className="pilgrim-footer">
        <div className="pilgrim-footer-main">
          <div>
            <Cross size={32} strokeWidth={1} />
            <h2>Divine Pilgrim</h2>
            <p>Sacred journeys. Everyday grace.</p>
          </div>
          <p>
            A quiet invitation to discover,
            <br />
            to reflect, and to draw closer to God.
          </p>
          <div>
            <Link href="/about">
              Our story <ArrowUpRight size={14} />
            </Link>
            <Link href="/privacy">Privacy</Link>
            <a href="#promise">Today’s Promise</a>
          </div>
        </div>
        <div className="pilgrim-footer-bottom">
          <span>© {new Date().getFullYear()} DIVINE PILGRIM</span>
          <span>VIRTUAL SACRED JOURNEYS & DAILY SPIRITUAL TOOLS</span>
          <a href="#pilgrim-title">BACK TO THE LIGHT ↑</a>
        </div>
      </footer>
    </main>
  );
}
