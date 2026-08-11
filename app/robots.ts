import type { MetadataRoute } from "next";

/**
 * The sitemap listed all 46 routes but nothing pointed a crawler at it, so it
 * was only ever found by guessing the conventional path. The host is read from
 * the request rather than hardcoded, so a preview deployment advertises its own
 * sitemap instead of the production one.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const { headers } = await import("next/headers");
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "smarthomearchitects.co.za";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${protocol}://${host}/sitemap.xml`,
  };
}
