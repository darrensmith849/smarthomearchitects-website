import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "../../page-templates";
import { getService, servicePages } from "../../site-map";

export function generateStaticParams() { return servicePages.map((page) => ({ slug: page.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getService((await params).slug);
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function ServicePageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const page = getService((await params).slug);
  if (!page) notFound();
  return <ServiceTemplate page={page} />;
}
