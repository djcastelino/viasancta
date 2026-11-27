import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/jesus-in-ot/test"],
      },
    ],
    sitemap: "https://www.divinepilgrim.com/sitemap.xml",
    host: "https://www.divinepilgrim.com",
  };
}
