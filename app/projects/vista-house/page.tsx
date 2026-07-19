import type { Metadata } from "next";
import Link from "next/link";
import { ConsultationCta } from "../../components";

export const metadata: Metadata = {
  title: "Courtyard House",
  description: "A Cape Town residence where daylight, climate and quiet technology move as one.",
};

export default function VistaHousePage() {
  return (
    <>
      <section className="project-hero">
        <img src="/images/courtyard.jpg" alt="The sunlit courtyard of Courtyard House" />
        <div className="project-overlay" />
        <div className="project-title">
          <p className="eyebrow eyebrow-light">Residence 01 · Cape Town</p>
          <h1>Courtyard<br />House</h1>
        </div>
        <div className="project-summary">
          <p>A house that follows the sun, edits the heat and settles softly into evening.</p>
          <span>Completed 2026</span>
        </div>
      </section>

      <section className="project-intro section-pad">
        <div className="section-label"><span>01</span><span>The brief</span></div>
        <h2>Make the home<br />feel naturally right.</h2>
        <p>The owners wanted technology to protect the quiet character of the architecture—not compete with it. Daylight, privacy, thermal comfort and effortless hosting became the real brief.</p>
      </section>

      <section className="project-strip">
        <div className="project-image-main"><img src="/images/hero.jpg" alt="Living spaces settling into evening" /></div>
        <div className="project-caption"><span>Evening scene · 18:42</span><p>One gesture lowers the sheers, warms the room and carries music from kitchen to terrace.</p></div>
      </section>

      <section className="project-challenge section-pad">
        <div className="section-head">
          <div className="section-label"><span>02</span><span>The response</span></div>
          <h2>Daylight became<br />the interface.</h2>
        </div>
        <div className="response-grid">
          <article><span>Light</span><h3>2700 K after sunset</h3><p>High-CRI dim-to-warm lighting follows the architecture. Scenes are composed around art, materials and faces.</p></article>
          <article><span>Shade</span><h3>18 silent zones</h3><p>Sheers track glare and privacy; blockout is reserved for sleep. Every pocket and hem was detailed with the interiors.</p></article>
          <article><span>Climate</span><h3>42% less peak cooling</h3><p>Solar gain is anticipated before rooms overheat, using exterior conditions, orientation and measured comfort.</p></article>
          <article><span>Control</span><h3>7 signature scenes</h3><p>Morning, Away, Welcome, Lunch, Evening, Entertain and Goodnight. Fewer choices, tuned deeply.</p></article>
        </div>
      </section>

      <section className="project-quote">
        <blockquote>“We stopped thinking about the system. The house simply seems to know.”</blockquote>
        <p>Homeowner · Courtyard House</p>
      </section>

      <section className="project-spec section-pad">
        <div>
          <p className="eyebrow">Project team</p>
          <h2>A shared<br />piece of work.</h2>
        </div>
        <dl>
          <div><dt>Scope</dt><dd>Experience design, systems architecture, lighting control, shading, climate integration, audio, networking, security and commissioning</dd></div>
          <div><dt>Residence</dt><dd>620 m² · Cape Town</dd></div>
          <div><dt>Programme</dt><dd>26 months from concept to completion</dd></div>
          <div><dt>System care</dt><dd>SHA Studio Care · 10 years</dd></div>
        </dl>
      </section>

      <section className="next-project">
        <img src="/images/hero.jpg" alt="A coastal residence at blue hour" />
        <div />
        <p className="eyebrow eyebrow-light">Next residence</p>
        <h2>Atlantic House</h2>
        <Link href="/contact">Discuss a similar project <span>↗</span></Link>
      </section>

      <ConsultationCta />
    </>
  );
}
