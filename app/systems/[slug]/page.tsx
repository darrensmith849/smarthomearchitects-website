import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialTemplate } from "../../page-templates";
import { SceneExperience } from "../../SceneExperience";
import { SystemArchitecture } from "../../SystemArchitecture";
import { SystemInterfaces } from "../../SystemInterfaces";
import { SystemPrivacy } from "../../SystemPrivacy";
import { SystemResilience } from "../../SystemResilience";
import { SystemWellness } from "../../SystemWellness";
import { getSystemPage, systemPages } from "../../site-map";

export function generateStaticParams() { return systemPages.map((page) => ({ slug: page.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getSystemPage((await params).slug);
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function SystemPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const page = getSystemPage((await params).slug);
  if (!page) notFound();
  // Every Intelligence page now has its own idea; EditorialTemplate is left
  // serving only the three Studio pages.
  if (page.slug === "scenes") return <SceneExperience />;
  if (page.slug === "architecture") return <SystemArchitecture />;
  if (page.slug === "interfaces") return <SystemInterfaces />;
  if (page.slug === "privacy") return <SystemPrivacy />;
  if (page.slug === "resilience") return <SystemResilience />;
  if (page.slug === "wellness") return <SystemWellness />;
  return <EditorialTemplate section="Intelligence" number={page.number} title={page.title} headline={page.headline} intro={page.intro} image={page.image} topics={page.topics} />;
}
