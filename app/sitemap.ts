import type { MetadataRoute } from "next";
import miracles from "@/src/eucharistic-miracles.json";

const BASE = "https://www.divinepilgrim.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "", priority: 1.0, freq: "daily" },
    { path: "/ask-the-doctors", priority: 0.95, freq: "weekly" },
    { path: "/sacred-trails", priority: 0.95, freq: "weekly" },
    { path: "/sacred-architecture", priority: 0.9, freq: "weekly" },
    { path: "/tours/eucharistic-miracles", priority: 0.9, freq: "weekly" },
    { path: "/tours/marian-apparitions", priority: 0.9, freq: "weekly" },
    { path: "/challenge", priority: 0.9, freq: "daily" },
    { path: "/challenge/archive", priority: 0.7, freq: "daily" },
    { path: "/pray-without-ceasing", priority: 0.85, freq: "daily" },
    { path: "/sacred-mountains", priority: 0.85, freq: "monthly" },
    { path: "/sacred-relics", priority: 0.85, freq: "monthly" },
    { path: "/biblical-timeline", priority: 0.85, freq: "monthly" },
    { path: "/jesus-in-ot", priority: 0.85, freq: "monthly" },
    { path: "/stations-of-the-cross", priority: 0.85, freq: "monthly" },
    { path: "/armor-of-god", priority: 0.8, freq: "monthly" },
    { path: "/seven-swords", priority: 0.8, freq: "monthly" },
    { path: "/psalm91", priority: 0.8, freq: "monthly" },
    { path: "/memory-verses", priority: 0.8, freq: "monthly" },
    { path: "/discover", priority: 0.8, freq: "weekly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  if (Array.isArray(miracles)) {
    for (const m of miracles as Array<{ id?: string }>) {
      if (m && typeof m.id === "string" && m.id.trim()) {
        entries.push({
          url: `${BASE}/miracles/${encodeURIComponent(m.id.trim())}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.75,
        });
      }
    }
  }

  return entries;
}
