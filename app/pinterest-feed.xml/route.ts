import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import miracles from "@/src/eucharistic-miracles.json";

const SITE = "https://www.divinepilgrim.com";

function escXml(str = ""): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function resolvePublicImg(rel?: string): string {
  if (!rel || !rel.startsWith("/")) return `${SITE}/feature_graphic.png`;
  const full = path.join(process.cwd(), "public", rel.replace(/^\/+/, ""));
  return fs.existsSync(full) ? `${SITE}${rel}` : `${SITE}/feature_graphic.png`;
}

export async function GET() {
  const items: Array<{ title: string; link: string; description: string; image: string }> = [
    {
      title: "Ask the Doctors of the Church — Search Aquinas, Augustine & Chrysostom",
      link: `${SITE}/ask-the-doctors`,
      description:
        "Explore faithful Catholic answers grounded directly in primary texts of St. Thomas Aquinas, St. Augustine, St. John Chrysostom, and the Doctors of the Church.",
      image: `${SITE}/feature_graphic.png`,
    },
    {
      title: "Daily 6-Clue Scripture Challenge — Test Your Biblical Knowledge",
      link: `${SITE}/challenge`,
      description:
        "Play a free daily 6-clue Scripture mystery and share your spoiler-free score grid with friends and family on Divine Pilgrim.",
      image: `${SITE}/feature_graphic.png`,
    },
    {
      title: "Sacred Trails — Interactive Saint Mystery Pilgrimages",
      link: `${SITE}/sacred-trails`,
      description:
        "Follow the real geographic footsteps of St. Paul, St. Augustine, St. Francis Xavier, St. Joan of Arc, and St. Thomas across an interactive globe.",
      image: `${SITE}/feature_graphic.png`,
    },
    {
      title: "Sacred Architecture — 30 Iconic Cathedrals & Basilicas",
      link: `${SITE}/sacred-architecture`,
      description:
        "Step inside the world's greatest Catholic cathedrals, basilicas, and shrines with architectural guides and history.",
      image: `${SITE}/feature_graphic.png`,
    },
    {
      title: "163 Vatican-Documented Eucharistic Miracles Archive",
      link: `${SITE}/tours/eucharistic-miracles`,
      description:
        "Explore 163 historical Eucharistic miracles across centuries and continents with audio narrations and primary sources.",
      image: `${SITE}/feature_graphic.png`,
    },
    {
      title: "Pray Without Ceasing — Join the Global Prayer Chain",
      link: `${SITE}/pray-without-ceasing`,
      description:
        "Offer quiet minutes of praise and join a continuous worldwide Catholic prayer chain on Divine Pilgrim.",
      image: `${SITE}/feature_graphic.png`,
    },
  ];

  if (Array.isArray(miracles)) {
    for (const m of miracles as unknown as Array<{
      id?: string;
      name?: string;
      date?: string | number;
      description?: string;
      images?: Array<{ url?: string }>;
      location?: { city?: string; country?: string };
    }>) {
      if (!m?.id || !m?.name) continue;
      const rawImg = Array.isArray(m.images) && m.images[0]?.url ? m.images[0].url : "";
      const loc = [m.location?.city, m.location?.country].filter(Boolean).join(", ");
      const img = resolvePublicImg(rawImg);
      // Prefer items with distinct miracle photography first, cap feed at 100 clean pins
      if (rawImg && img !== `${SITE}/feature_graphic.png` && items.length < 100) {
        items.push({
          title: `${m.name}${m.date ? ` (${m.date})` : ""} — Eucharistic Miracle`,
          link: `${SITE}/miracles/${encodeURIComponent(m.id)}`,
          description: `${loc ? `${loc}: ` : ""}${m.description || "Read the full historical account and evidence on Divine Pilgrim."}`,
          image: img,
        });
      }
    }
  }

  const now = Date.now();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Divine Pilgrim — Catholic Pilgrimages, Eucharistic Miracles &amp; Saints</title>
    <link>${SITE}</link>
    <description>Interactive Catholic sacred pilgrimages, 163 Eucharistic miracles, Doctors of the Church, sacred architecture, and daily Scripture challenges.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(now).toUTCString()}</lastBuildDate>
${items
  .map(
    (item, idx) => `    <item>
      <title>${escXml(item.title)}</title>
      <link>${escXml(item.link)}</link>
      <guid isPermaLink="true">${escXml(item.link)}</guid>
      <description>${escXml(item.description)}</description>
      <pubDate>${new Date(now - idx * 3600 * 1000).toUTCString()}</pubDate>
      <enclosure url="${escXml(item.image)}" type="image/png" />
      <media:content url="${escXml(item.image)}" medium="image" />
    </item>`
  )
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
