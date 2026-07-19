import type { Metadata } from "next";
import Link from "next/link";
import { ConsultationCta } from "../components";
import { projectPages } from "../site-map";

export const metadata: Metadata = { title: "Selected Projects", description: "Residences where architecture and intelligence have been designed as one." };

const projects = [
  { slug: "vista-house", title: "Courtyard House", location: "Cape Town", year: "2026", image: "/images/courtyard.jpg", line: "Daylight became the interface." },
  ...projectPages,
];

export default function ProjectsPage() {
  return <>
    <section className="projects-index-hero"><p className="eyebrow">Selected residences</p><h1>Homes in<br />their own rhythm.</h1><p>Each project begins with a different site, team and way of living. The technology follows.</p></section>
    <section className="projects-index section-pad">
      {projects.map((project, index) => <Link className="project-index-card" href={`/projects/${project.slug}`} key={project.slug}><div><img src={project.image} alt={`${project.title}, ${project.location}`} /><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true">↗</i></div><aside><span>{project.location} · {project.year}</span><h2>{project.title}</h2><p>{project.line}</p></aside></Link>)}
    </section>
    <ConsultationCta />
  </>;
}
