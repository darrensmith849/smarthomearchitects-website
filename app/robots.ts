import type { MetadataRoute } from "next";

/** The only hostnames whose content should be indexed. */
const PRODUCTION_HOSTS = ["smarthomearchitects.co.za", "www.smarthomearchitects.co.za"];

/**
 * The sitemap listed every route but nothing pointed a crawler at it, so it was
 * only ever found by guessing the conventional path. The host is read from the
 * request rather than hardcoded, so a deployment advertises its own sitemap
 * instead of the production one.
 *
 * Anything that is not the production hostname is disallowed outright. A
 * workers.dev or preview URL carries the same pages as production, so left
 * open it competes with the real site for the same queries — and while the
 * project pages are still placeholders, it would be publishing residences that
 * have not been built. Indexing is opt-in, by hostname.
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

  if (!PRODUCTION_HOSTS.includes(host.split(":")[0])) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${protocol}://${host}/sitemap.xml`,
  };
}
