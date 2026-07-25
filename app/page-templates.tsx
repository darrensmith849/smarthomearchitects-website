import Link from "next/link";
import { AtlanticRhythm } from "./AtlanticRhythm";
import { ConsultationCta, ProductCollection } from "./components";
import { ServicePage, projectPages, servicePages } from "./site-map";
import { SystemCanvas } from "./SystemCanvas";

export function ServiceTemplate({ page }: { page: ServicePage }) {
  const currentIndex = servicePages.findIndex((item) => item.slug === page.slug);
  const next = servicePages[(currentIndex + 1) % servicePages.length];

  return (
    <>
      <section className={`service-hero service-${page.overlay}`}>
        <img src={page.image} alt={page.imageAlt} />
        <div className="service-hero-wash" />
        <SystemCanvas variant={page.overlay} />
        <div className="tech-frame" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="service-hero-copy">
          <p className="eyebrow eyebrow-light">{page.eyebrow} · {page.number}</p>
          <h1>{page.headline}</h1>
          <p>{page.intro}</p>
          <Link className="button button-light" href="/contact">Design this system <span>↗</span></Link>
        </div>
        <div className="telemetry-stack">
          {page.telemetry.map((item, index) => (
            <div key={item.label}><i className={index === 0 ? "live" : ""} /><span>{item.label}</span><strong>{item.value}</strong></div>
          ))}
        </div>
        <div className="service-index"><span>SHA / SYSTEM</span><strong>{page.number}</strong></div>
      </section>

      <section className="service-philosophy section-pad">
        <div className="section-label"><span>01</span><span>The experience</span></div>
        <div>
          <p className="eyebrow">{page.title}</p>
          <h2>{page.philosophy}</h2>
        </div>
      </section>

      <section className="service-stats">
        {page.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </section>

      <section className="service-pillars section-pad">
        <div className="section-head">
          <div className="section-label"><span>02</span><span>Designed as a whole</span></div>
          <h2>Beautifully calm.<br />Technically deep.</h2>
          <p>Architecture and engineering stay in conversation from the first detail through final commissioning.</p>
        </div>
        <div className="service-pillar-grid">
          {page.pillars.map((pillar, index) => (
            <article key={pillar.title}><span>0{index + 1}</span><div className="pillar-signal" aria-hidden="true"><i /><i /><i /></div><h3>{pillar.title}</h3><p>{pillar.copy}</p></article>
          ))}
        </div>
      </section>

      <section className="scene-section section-pad">
        <div className="scene-intro">
          <div className="section-label"><span>03</span><span>A day in motion</span></div>
          <h2>Intelligence<br />as atmosphere.</h2>
          <p>Scroll through three moments. The visible interface stays simple because the system beneath it understands context.</p>
        </div>
        <div className="scene-sequence">
          <div className="scene-axis" aria-hidden="true"><i /><i /><i /></div>
          {page.scenes.map((scene, index) => (
            <article key={scene.name}>
              <div className="scene-time"><span>{scene.time}</span><i className={index === 1 ? "active" : ""} /></div>
              <div><span>Scene 0{index + 1}</span><h3>{scene.name}</h3><p>{scene.detail}</p></div>
              <b aria-hidden="true">{index === 1 ? "LIVE" : "READY"}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="system-layers section-pad">
        <div className="layers-visual" aria-hidden="true">
          <SystemCanvas variant={page.overlay} />
          <div className="layer-house"><i /><i /><i /><span>HOME / {page.title.toUpperCase()}</span></div>
        </div>
        <div className="layers-copy">
          <p className="eyebrow eyebrow-light">System anatomy</p>
          <h2>Three layers.<br />One experience.</h2>
          <div className="layers-list">
            {page.layers.map((layer, index) => <div key={layer.name}><span>0{index + 1}</span><strong>{layer.name}</strong><p>{layer.detail}</p></div>)}
          </div>
        </div>
      </section>

      <section className="service-next">
        <img src={next.image} alt="" />
        <div />
        <p className="eyebrow eyebrow-light">Next system · {next.number}</p>
        <h2>{next.title}</h2>
        <Link href={`/services/${next.slug}`}>Explore {next.title.toLowerCase()} <span>↗</span></Link>
      </section>

      <ConsultationCta />
    </>
  );
}

type EditorialProps = {
  section: string;
  number: string;
  title: string;
  headline: string;
  intro: string;
  image: string;
  topics?: readonly string[] | string[];
};

export function EditorialTemplate({ section, number, title, headline, intro, image, topics = ["Clarity", "Longevity", "Restraint"] }: EditorialProps) {
  return (
    <>
      <section className="editorial-hero">
        <div className="editorial-hero-copy">
          <p className="eyebrow">{section} · {number}</p>
          <h1>{headline}</h1>
          <p>{intro}</p>
        </div>
        <div className="editorial-hero-image">
          <img src={image} alt={`${title} at Smart Home Architects`} />
          <div className="editorial-grid" aria-hidden="true"><i /><i /><i /><span>SHA / {number}</span></div>
        </div>
      </section>

      <section className="editorial-statement section-pad">
        <div className="section-label"><span>01</span><span>{title}</span></div>
        <h2>We remove complexity from the room without pretending it does not exist.</h2>
        <p>The deeper the technical thinking, the calmer the lived result. Every decision is tested against architecture, human attention and the long service life of the home.</p>
      </section>

      <section className="editorial-topics section-pad">
        {topics.map((topic, index) => (
          <article key={topic}><span>0{index + 1}</span><h3>{topic}</h3><p>{index === 0 ? "A clear idea guides every interface, detail and technical choice." : index === 1 ? "Infrastructure is documented, serviceable and ready for thoughtful change." : "Technology earns its place by making daily life quieter, safer or more beautiful."}</p></article>
        ))}
      </section>

      <section className="editorial-tech-band">
        <div className="tech-band-grid" aria-hidden="true"><i /><i /><i /><i /><b /></div>
        <p className="eyebrow eyebrow-light">The invisible detail</p>
        <h2>Architecture above.<br />Intelligence within.</h2>
        <p>Experience design · systems architecture · coordination · commissioning · care</p>
      </section>
      <ConsultationCta />
    </>
  );
}

export function CategoryTemplate({ page }: { page: { slug: string; title: string; headline: string; intro: string; image: string; filter: string } }) {
  return (
    <>
      <section className="category-hero">
        <div className="category-copy">
          <p className="eyebrow">The collection · {page.filter}</p>
          <h1>{page.headline}</h1>
          <p>{page.intro}</p>
          <Link className="text-link" href="/contact">Request the specification set <span>→</span></Link>
        </div>
        <div className="category-image"><span>{page.filter}</span><img src={page.image} alt={`${page.title} collection`} /><i /><i /></div>
      </section>

      <section className="category-principles section-pad">
        <div className="section-label"><span>01</span><span>Selection standard</span></div>
        <div><h2>Chosen for the home.<br />Not the showroom.</h2><p>Every object is judged for material quality, serviceability, protocol openness, privacy and the clarity of its everyday interaction.</p></div>
      </section>

      <section className="category-products section-pad">
        <div className="section-head"><div className="section-label"><span>02</span><span>Studio edit</span></div><h2>Three reference<br />objects.</h2><p>The final product schedule is curated around the architecture, regional requirements and integration set.</p></div>
        <ProductCollection />
      </section>

      <section className="compatibility-band">
        {['LOCAL FIRST', 'OPEN STANDARD', 'SERVICEABLE', 'PRIVACY LED', 'ARCHITECTURAL'].map((item) => <span key={item}>{item}<i /></span>)}
      </section>
      <ConsultationCta />
    </>
  );
}

export function ProjectTemplate({ page }: { page: { slug: string; title: string; location: string; year: string; line: string; image: string; systems: string } }) {
  const current = projectPages.findIndex((item) => item.slug === page.slug);
  const next = projectPages[(current + 1) % projectPages.length];
  return (
    <>
      <section className="dynamic-project-hero">
        <img src={page.image} alt={`${page.title}, ${page.location}`} />
        <div />
        <p className="eyebrow eyebrow-light">Residence · {page.location}</p>
        <h1>{page.title}</h1>
        <aside><span>{page.year}</span><p>{page.line}</p></aside>
      </section>
      <section className="project-intro section-pad">
        <div className="section-label"><span>01</span><span>The residence</span></div>
        <h2>{page.line}</h2>
        <p>The design brief began with atmosphere, privacy and the natural rhythm of the site. Technology was coordinated into the architecture early, leaving the completed home visually quiet and deeply responsive.</p>
      </section>
      {page.slug === "atlantic-house" && <AtlanticRhythm />}
      <section className="project-system-story section-pad">
        <div className="project-system-image"><img src={page.image} alt="" /><div className="project-data-overlay"><span>SYSTEM / LIVE</span><i /><i /><i /></div></div>
        <div><p className="eyebrow">Integrated scope</p><h2>Many disciplines.<br />One calm result.</h2><p>{page.systems}</p><dl><div><dt>Experience</dt><dd>Daily scenes composed around the site and household</dd></div><div><dt>Infrastructure</dt><dd>Resilient, local-first and documented for long-term care</dd></div><div><dt>Detail</dt><dd>Controls, apertures and access coordinated with the interior</dd></div></dl></div>
      </section>
      <section className="project-quote"><blockquote>“The technology never asks to be noticed. The house simply feels ready.”</blockquote><p>Project reflection · Smart Home Architects</p></section>
      <section className="service-next"><img src={next.image} alt="" /><div /><p className="eyebrow eyebrow-light">Next residence</p><h2>{next.title}</h2><Link href={`/projects/${next.slug}`}>View the project <span>↗</span></Link></section>
      <ConsultationCta />
    </>
  );
}
