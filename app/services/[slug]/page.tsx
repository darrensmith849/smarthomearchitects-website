import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "../../page-templates";
import { WholeHomeStory } from "../../WholeHomeStory";
import { getService, servicePages } from "../../site-map";

/**
 * Whole home is the one service that is not a discipline alongside the others —
 * it is all of them at once, which is what the homepage already says. So this
 * route serves the homepage's own body rather than a second, thinner telling
 * of the same thing.
 */
const WHOLE_HOME = "whole-home";

export function generateStaticParams() { return servicePages.map((page) => ({ slug: page.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getService((await params).slug);
  if (!page) return {};
  // One body at two addresses is duplicate content. The menu entry keeps its
  // own title so the tab and search snippet still read "Whole home", but the
  // canonical sends every ranking signal to the homepage.
  if (page.slug === WHOLE_HOME) {
    return { title: page.title, description: page.intro, alternates: { canonical: "/" } };
  }
  return { title: page.title, description: page.intro };
}

export default async function ServicePageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const page = getService((await params).slug);
  if (!page) notFound();
  if (page.slug === WHOLE_HOME) return <WholeHomeStory />;
  return <ServiceTemplate page={page} />;
}
