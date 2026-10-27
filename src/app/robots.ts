import type { MetadataRoute } from "next";

// Admin panel: nothing should be indexed (metadata.robots in layout.tsx says the same).
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
