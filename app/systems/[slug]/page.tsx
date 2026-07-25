import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialTemplate } from "../../page-templates";
import { SceneExperience } from "../../SceneExperience";
import { getSystemPage, systemPages } from "../../site-map";

export function generateStaticParams() { return systemPages.map((page) => ({ slug: page.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getSystemPage((await params).slug);
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function SystemPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const page = getSystemPage((await params).slug);
  if (!page) notFound();
  if (page.slug === "scenes") return <SceneExperience />;
  return <EditorialTemplate section="Intelligence" number={page.number} title={page.title} headline={page.headline} intro={page.intro} image={page.image} topics={page.topics} />;
}
