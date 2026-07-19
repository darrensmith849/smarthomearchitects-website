import type { MetadataRoute } from "next";
import { architectureLinks } from "./site-map";

export default function sitemap(): MetadataRoute.Sitemap {
  return architectureLinks.map((item) => ({ url: `https://smarthomearchitects.co.za${item.href}`, changeFrequency: item.href === "/" ? "weekly" : "monthly", priority: item.href === "/" ? 1 : .7 }));
}
