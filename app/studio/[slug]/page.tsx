import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialTemplate } from "../../page-templates";
import { getStudioPage, studioPages } from "../../site-map";

export function generateStaticParams() { return studioPages.map((page) => ({ slug: page.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getStudioPage((await params).slug);
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function StudioPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const page = getStudioPage((await params).slug);
  if (!page) notFound();
  return <EditorialTemplate section="Studio" number={page.number} title={page.title} headline={page.headline} intro={page.intro} image={page.image} />;
}
