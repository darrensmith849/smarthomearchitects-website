import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectTemplate } from "../../page-templates";
import { getProjectPage, projectPages } from "../../site-map";

export function generateStaticParams() { return projectPages.map((page) => ({ slug: page.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getProjectPage((await params).slug);
  return page ? { title: page.title, description: `${page.line} A Smart Home Architects residence in ${page.location}.` } : {};
}

export default async function DynamicProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = getProjectPage((await params).slug);
  if (!page) notFound();
  return <ProjectTemplate page={page} />;
}
