import { NextResponse } from "next/server";
import sacredArchitecture from "@/public/sacred-architecture.json";
import sacredMountains from "@/public/sacred-mountains.json";
import sacredRelics from "@/public/sacred-relics.json";

export const dynamic = "force-static";

const SITE = "https://www.divinepilgrim.com";

function escXml(str = ""): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function resolveImg(raw?: string): string {
  if (!raw) return `${SITE}/feature_graphic.png`;
  if (raw.startsWith("https://") || raw.startsWith("http://")) return raw;
  if (raw.startsWith("/")) return `${SITE}${encodeURI(raw)}`;
  return `${SITE}/feature_graphic.png`;
}

function imgMime(url: string): string {
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".jpg") || clean.endsWith(".jpeg")) return "image/jpeg";
  if (clean.endsWith(".webp")) return "image/webp";
  return "image/png";
}

function formatLocation(loc: unknown): string {
  if (!loc) return "";
  if (typeof loc === "string") return loc;
  if (typeof loc === "object") {
    const o = loc as { city?: string; country?: string; region?: string };
    return [o.city, o.region, o.country].filter(Boolean).join(", ");
  }
  return "";
}

interface PinItem {
  title: string;
  link: string;
  guid: string;
  description: string;
  image: string;
}

export async function GET() {
  const items: PinItem[] = [
    {
      title: "Ask the Doctors of the Church — Search Aquinas, Augustine & Chrysostom",
      link: `${SITE}/ask-the-doctors`,
      guid: `${SITE}/ask-the-doctors`,
      description:
        "Explore faithful Catholic answers grounded directly in primary texts of St. Thomas Aquinas, St. Augustine, St. John Chrysostom, and the Doctors of the Church.",
      image: `${SITE}/feature_graphic.png`,
    },
    {
      title: "Daily 6-Clue Scripture Challenge — Test Your Biblical Knowledge",
      link: `${SITE}/challenge`,
      guid: `${SITE}/challenge`,
      description:
        "Play a free daily 6-clue Scripture mystery and share your spoiler-free score grid with friends and family on Divine Pilgrim.",
      image: `${SITE}/feature_graphic.png`,
    },
    {
      title: "Sacred Trails — Interactive Saint Mystery Pilgrimages",
      link: `${SITE}/sacred-trails`,
      guid: `${SITE}/sacred-trails`,
      description:
        "Follow the real geographic footsteps of St. Paul, St. Augustine, St. Francis Xavier, St. Joan of Arc, and St. Thomas across an interactive globe.",
      image: `${SITE}/feature_graphic.png`,
    },
    {
      title: "Sacred Architecture — 30 Iconic Cathedrals & Basilicas",
      link: `${SITE}/sacred-architecture`,
      guid: `${SITE}/sacred-architecture`,
      description:
        "Step inside 30 of the world's greatest Catholic cathedrals, basilicas, and shrines with architectural guides and history.",
      image: `${SITE}/images/architecture/peters-basilica.png`,
    },
    {
      title: "Sacred Mountains of Scripture — From Mount Sinai to Mount of Olives",
      link: `${SITE}/sacred-mountains`,
      guid: `${SITE}/sacred-mountains`,
      description:
        "Journey across 15 sacred mountains of the Old and New Testaments with historical context and Scripture references.",
      image: `${SITE}${encodeURI("/images/mountains/Mount of Olives.jpg")}`,
    },
    {
      title: "Sacred Relics of Christendom — Shroud of Turin & Holy Relics",
      link: `${SITE}/sacred-relics`,
      guid: `${SITE}/sacred-relics`,
      description:
        "Examine the history, provenance, and devotion surrounding the Shroud of Turin, Sudarium of Oviedo, and Crown of Thorns.",
      image: `${SITE}${encodeURI("/images/sacred relics/shroud of turin.png")}`,
    },
    {
      title: "Pray Without Ceasing — Join the Global Catholic Prayer Chain",
      link: `${SITE}/pray-without-ceasing`,
      guid: `${SITE}/pray-without-ceasing`,
      description:
        "Offer quiet minutes of praise and join a continuous worldwide Catholic prayer chain on Divine Pilgrim.",
      image: `${SITE}/feature_graphic.png`,
    },
    {
      title: "Holy Footprints — Walk the Pilgrimage Routes of the Saints",
      link: `${SITE}/sacred-pilgrimages/holy-footprints`,
      guid: `${SITE}/sacred-pilgrimages/holy-footprints`,
      description:
        "Discover historic Catholic pilgrimage paths and sacred shrines across Europe, the Holy Land, and beyond.",
      image: `${SITE}/feature_graphic.png`,
    },
    {
      title: "Armor of God & Psalm 91 — Daily Spiritual Reflection Guides",
      link: `${SITE}/armor-of-god`,
      guid: `${SITE}/armor-of-god`,
      description:
        "Reflect on Ephesians 6 and Psalm 91 with guided meditations and sacred audio on Divine Pilgrim.",
      image: `${SITE}/feature_graphic.png`,
    },
  ];

  // 30 Iconic Cathedrals & Basilicas (all live on /sacred-architecture)
  if (Array.isArray(sacredArchitecture)) {
    for (const a of sacredArchitecture as unknown as Array<{
      id?: string | number;
      name?: string;
      location?: unknown;
      architectureStyle?: string;
      history?: string;
      images?: Array<{ url?: string; caption?: string }>;
    }>) {
      if (!a?.name) continue;
      const rawImg = Array.isArray(a.images) && a.images[0]?.url ? a.images[0].url : "";
      if (!rawImg) continue;
      const loc = formatLocation(a.location);
      const slug = encodeURIComponent(String(a.id ?? a.name));
      const desc =
        typeof a.history === "string" && a.history.trim()
          ? a.history.trim().slice(0, 280)
          : `Explore ${a.name}${loc ? ` in ${loc}` : ""} on Divine Pilgrim's Sacred Architecture guide.`;
      items.push({
        title: `${a.name}${loc ? ` (${loc})` : ""} — Sacred Architecture`,
        link: `${SITE}/sacred-architecture`,
        guid: `${SITE}/sacred-architecture#${slug}`,
        description: `${a.architectureStyle ? `${a.architectureStyle}. ` : ""}${desc}`,
        image: resolveImg(rawImg),
      });
    }
  }

  // 15 Sacred Mountains of Scripture (all live on /sacred-mountains)
  if (Array.isArray(sacredMountains)) {
    for (const m of sacredMountains as unknown as Array<{
      id?: string | number;
      name?: string;
      location?: unknown;
      significance?: string;
      images?: Array<{ url?: string }>;
    }>) {
      if (!m?.name) continue;
      const rawImg = Array.isArray(m.images) && m.images[0]?.url ? m.images[0].url : "";
      if (!rawImg) continue;
      const loc = formatLocation(m.location);
      const slug = encodeURIComponent(String(m.id ?? m.name));
      const desc =
        typeof m.significance === "string" && m.significance.trim()
          ? m.significance.trim().slice(0, 280)
          : `Discover the biblical history of ${m.name} on Divine Pilgrim.`;
      items.push({
        title: `${m.name}${loc ? ` (${loc})` : ""} — Sacred Mountains of Scripture`,
        link: `${SITE}/sacred-mountains`,
        guid: `${SITE}/sacred-mountains#${slug}`,
        description: desc,
        image: resolveImg(rawImg),
      });
    }
  }

  // 3 Sacred Relics (all live on /sacred-relics)
  if (Array.isArray(sacredRelics)) {
    for (const r of sacredRelics as unknown as Array<{
      id?: string | number;
      name?: string;
      location?: unknown;
      description?: string;
      images?: Array<{ url?: string }>;
    }>) {
      if (!r?.name) continue;
      const rawImg = Array.isArray(r.images) && r.images[0]?.url ? r.images[0].url : "";
      if (!rawImg) continue;
      const loc = formatLocation(r.location);
      const slug = encodeURIComponent(String(r.id ?? r.name));
      const desc =
        typeof r.description === "string" && r.description.trim()
          ? r.description.trim().slice(0, 280)
          : `Learn the history and veneration of ${r.name} on Divine Pilgrim.`;
      items.push({
        title: `${r.name}${loc ? ` (${loc})` : ""} — Sacred Relics`,
        link: `${SITE}/sacred-relics`,
        guid: `${SITE}/sacred-relics#${slug}`,
        description: desc,
        image: resolveImg(rawImg),
      });
    }
  }

  const now = Date.now();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Divine Pilgrim — Catholic Sacred Pilgrimages, Cathedrals &amp; Scripture</title>
    <link>${SITE}</link>
    <description>Interactive Catholic sacred pilgrimages, iconic cathedrals and basilicas, sacred mountains, Doctors of the Church, and daily Scripture challenges.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(now).toUTCString()}</lastBuildDate>
${items
  .map((item, idx) => {
    const mime = imgMime(item.image);
    return `    <item>
      <title>${escXml(item.title)}</title>
      <link>${escXml(item.link)}</link>
      <guid isPermaLink="false">${escXml(item.guid)}</guid>
      <description>${escXml(item.description)}</description>
      <pubDate>${new Date(now - idx * 3600 * 1000).toUTCString()}</pubDate>
      <enclosure url="${escXml(item.image)}" type="${mime}" />
      <media:content url="${escXml(item.image)}" medium="image" />
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
