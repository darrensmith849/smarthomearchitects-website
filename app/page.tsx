import Link from "next/link";
import { ConsultationCta, ProductCollection } from "./components";
import { LocalTime } from "./LocalTime";

const systems = [
  {
    number: "01",
    name: "Light",
    line: "Every room finds its natural rhythm.",
    copy: "Architectural dimming, circadian scenes and one-touch moods—commissioned by eye, not by spreadsheet.",
  },
  {
    number: "02",
    name: "Climate",
    line: "Comfort that arrives before you notice.",
    copy: "Quiet zoning, air-quality insight and passive responses that work with the building, not against it.",
  },
  {
    number: "03",
    name: "Shade",
    line: "Daylight, beautifully managed.",
    copy: "Sheers, blockout and exterior shading track heat, glare and privacy without interrupting the view.",
  },
  {
    number: "04",
    name: "Sound",
    line: "Music in the room. Speakers out of sight.",
    copy: "Invisible and architectural loudspeakers, tuned to make every space feel generous and effortless.",
  },
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <img className="hero-image" src="/images/hero.jpg" alt="A calm coastal living room at blue hour" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">Whole-home intelligence</p>
          <h1>A home that notices.<br />Never announces.</h1>
          <p className="hero-intro">
            We design technology into the architecture—so light, climate, sound and security move with you, quietly.
          </p>
          <div className="hero-actions">
            <Link className="button button-light" href="/contact">Plan your home <span>↗</span></Link>
            <Link className="text-link text-link-light" href="/approach">See our approach <span>→</span></Link>
          </div>
        </div>
        <div className="hero-status">
          <div><span className="status-dot" /> Evening scene</div>
          <span>FIREPLACE · SHADE · 22 °C</span>
        </div>
        <div className="hero-time">
          <span>LOCAL</span>
          <LocalTime />
        </div>
        <div className="scroll-note"><span /> Scroll to feel the difference</div>
      </section>

      <section className="manifesto section-pad">
        <div className="section-label"><span>01</span><span>Our point of view</span></div>
        <div className="manifesto-copy">
          <h2>Nothing looks smart.<br />Everything feels right.</h2>
          <p>
            The best technology is not a collection of gadgets. It is a layer of calm—planned with the architect, detailed with the interior designer and tuned around the people who live there.
          </p>
        </div>
        <div className="manifesto-stats">
          <div><strong>1</strong><span>considered interface</span></div>
          <div><strong>0</strong><span>visual clutter</span></div>
          <div><strong>24/7</strong><span>quiet resilience</span></div>
        </div>
      </section>

      <section className="systems-section section-pad">
        <div className="section-head">
          <div className="section-label"><span>02</span><span>The invisible layer</span></div>
          <h2>One home.<br />Four senses.</h2>
          <p>Planned as one connected experience from the first cable to the final scene.</p>
        </div>
        <div className="systems-grid">
          {systems.map((system) => (
            <article className="system-card" key={system.name}>
              <span className="system-number">{system.number}</span>
              <div className={`system-orbit orbit-${system.number}`} aria-hidden="true"><i /><i /></div>
              <h3>{system.name}</h3>
              <h4>{system.line}</h4>
              <p>{system.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-feature">
        <img src="/images/courtyard.jpg" alt="A sunlit courtyard home with technology integrated into the architecture" />
        <div className="case-overlay" />
        <div className="case-copy">
          <p className="eyebrow eyebrow-light">Selected residence · Cape Town</p>
          <h2>Courtyard House</h2>
          <p>Where daylight became the interface.</p>
          <Link className="button button-light" href="/projects/vista-house">View the residence <span>↗</span></Link>
        </div>
        <div className="case-metrics">
          <div><strong>18</strong><span>quiet zones</span></div>
          <div><strong>42%</strong><span>less cooling demand</span></div>
          <div><strong>7</strong><span>signature scenes</span></div>
        </div>
      </section>

      <section className="collection-section section-pad">
        <div className="section-head collection-head">
          <div className="section-label"><span>03</span><span>The studio collection</span></div>
          <h2>Objects worth seeing.<br />Systems designed not to be.</h2>
          <p>A tightly edited family of controls and infrastructure, chosen for longevity, tactility and quiet performance.</p>
        </div>
        <ProductCollection />
        <div className="center-action"><Link className="text-link" href="/products">Explore the full collection <span>→</span></Link></div>
      </section>

      <section className="process section-pad">
        <div className="section-head">
          <div className="section-label"><span>04</span><span>How we work</span></div>
          <h2>From first sketch<br />to final scene.</h2>
        </div>
        <div className="process-list">
          {[
            ["01", "Listen", "We map rituals, rooms and priorities before we specify a single device."],
            ["02", "Architect", "Infrastructure, lighting, networks and interfaces are coordinated into the drawing set."],
            ["03", "Compose", "Every scene is tuned in the finished home, by eye and with the people who live there."],
            ["04", "Care", "We monitor only what matters, maintain the system and keep it beautifully current."],
          ].map(([n, title, copy]) => (
            <div className="process-row" key={n}>
              <span>{n}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true">↗</i>
            </div>
          ))}
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
