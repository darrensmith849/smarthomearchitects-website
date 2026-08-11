import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { architectureLinks } from "./site-map";

/**
 * The host is read from the request, matching how layout.tsx builds
 * metadataBase and how robots.ts advertises this file. It used to be the one
 * place the production domain was hardcoded, which meant every preview
 * deployment published a sitemap pointing at a different site — its canonical
 * URLs disagreed with the og:url on the very pages it listed.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "smarthomearchitects.co.za";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;

  return architectureLinks.map((item) => ({
    url: `${baseUrl}${item.href}`,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
