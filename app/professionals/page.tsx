import type { Metadata } from "next";
import Link from "next/link";
import { ConsultationCta } from "../components";

export const metadata: Metadata = { title: "For Architects & Designers", description: "Technical collaboration for architects, interior designers and project teams." };

export default function ProfessionalsPage() {
  return <>
    <section className="professionals-hero"><div><p className="eyebrow eyebrow-light">For architects and designers</p><h1>Bring us in<br />before the ceiling.</h1><p>Early collaboration protects the architecture, clarifies infrastructure and turns technology into a resolved part of the drawing set.</p><Link className="button button-light" href="/contact">Invite us to the table <span>↗</span></Link></div><img loading="lazy" decoding="async" src="/images/service-shading.webp" alt="A precisely detailed automated shade within architecture" /><div className="professional-overlay" aria-hidden="true"><span>RCP / COORDINATION</span><i /><i /><i /><i /></div></section>
    <section className="professional-deliverables section-pad"><div className="section-head"><div className="section-label"><span>01</span><span>What we bring</span></div><h2>Design fluency.<br />Engineering depth.</h2><p>We translate the home experience into coordinated, buildable information for the full consultant team.</p></div><div className="deliverable-grid">{[["01","Concept narrative","Experience principles, room behaviours and an early order-of-cost."],["02","Coordinated design","Reflected ceiling plans, controls, containment, rack, power and interface schedules."],["03","Technical specification","System architecture, performance criteria, product schedules and tender scope."],["04","Commissioning record","Scene schedule, configuration backup, as-built information and care plan."]].map(([n,title,copy])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="professional-workflow section-pad"><div><p className="eyebrow eyebrow-light">Project workflow</p><h2>In step with<br />the design team.</h2></div><ol>{["Brief + concept","Spatial coordination","Detailed design","Tender + review","Site inspection","Commissioning + care"].map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span><strong>{item}</strong><i /></li>)}</ol></section>
    <ConsultationCta />
  </>;
}
