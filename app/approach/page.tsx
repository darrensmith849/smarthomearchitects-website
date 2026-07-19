import type { Metadata } from "next";
import Link from "next/link";
import { ConsultationCta } from "../components";

export const metadata: Metadata = {
  title: "Our Approach",
  description: "How Smart Home Architects plans, engineers and commissions calm whole-home technology.",
};

const disciplines = [
  ["01", "Experience design", "We begin with moments—arriving home, hosting friends, waking gently—not a list of equipment."],
  ["02", "Systems architecture", "A resilient technical backbone is engineered around the building, with capacity for change."],
  ["03", "Detail coordination", "Controls, sensors, apertures and access panels are resolved with the design team before site."],
  ["04", "Scene composition", "In the finished home, we tune light, sound, shade and temperature as one atmosphere."],
  ["05", "Long-term care", "A home is never abandoned at handover. We document, maintain and thoughtfully evolve it."],
];

export default function ApproachPage() {
  return (
    <>
      <section className="approach-hero">
        <img src="/images/courtyard.jpg" alt="Architecture and landscape in quiet balance" />
        <div className="approach-hero-overlay" />
        <div>
          <p className="eyebrow eyebrow-light">Our approach</p>
          <h1>We design the<br />feeling first.</h1>
          <p>Then we engineer every invisible layer required to make that feeling dependable.</p>
        </div>
      </section>

      <section className="belief section-pad">
        <div className="section-label"><span>01</span><span>What we believe</span></div>
        <blockquote>“A smart home should give your attention back—not ask for more of it.”</blockquote>
        <p>Our work lives between architecture, engineering and hospitality. That is where technology stops behaving like equipment and starts behaving like the home.</p>
      </section>

      <section className="discipline-section section-pad">
        <div className="section-head">
          <div className="section-label"><span>02</span><span>Five disciplines</span></div>
          <h2>One continuous<br />design process.</h2>
        </div>
        <div className="discipline-list">
          {disciplines.map(([n, title, copy]) => (
            <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="dark-manifesto section-pad">
        <p className="eyebrow eyebrow-light">Designed for decades</p>
        <h2>Open where it matters.<br />Private by default.<br />Simple every day.</h2>
        <div className="dark-manifesto-grid">
          <div><strong>Local-first</strong><p>Core functions stay inside the home and keep working when the world outside does not.</p></div>
          <div><strong>Serviceable</strong><p>Clear documentation, accessible infrastructure and open standards protect the original investment.</p></div>
          <div><strong>Human</strong><p>Guests should understand it. Children should feel safe with it. Nobody should need a manual.</p></div>
        </div>
      </section>

      <section className="collaboration section-pad">
        <div className="collaboration-image"><img src="/images/hero.jpg" alt="A resolved smart home interior at dusk" /></div>
        <div className="collaboration-copy">
          <p className="eyebrow">Designed with the team</p>
          <h2>At the table<br />from day one.</h2>
          <p>We work alongside architects, interior designers, lighting designers, MEP consultants and contractors. Early coordination keeps ceilings clean, details precise and budgets honest.</p>
          <Link className="text-link" href="/contact">Invite us to the project <span>→</span></Link>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
