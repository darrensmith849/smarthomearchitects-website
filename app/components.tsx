import Link from "next/link";
import { LocalTime } from "./LocalTime";
import { products } from "./data";
import { MegaNav } from "./MegaNav";

export function SiteHeader() {
  return <MegaNav />;
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p className="footer-kicker">A quieter kind of intelligence.</p>
        <h2>Let the architecture lead.</h2>
        <Link className="circle-link" href="/contact" aria-label="Start a project">
          ↗
        </Link>
      </div>
      <div className="footer-grid">
        <div>
          <p className="footer-label">Studio</p>
          <p>Cape Town · Johannesburg</p>
          <a href="mailto:studio@smarthomearchitects.co.za">studio@smarthomearchitects.co.za</a>
        </div>
        <div>
          <p className="footer-label">Experience</p>
          <Link href="/experience/live-residence">Live residence</Link>
          <Link href="/experience/shading-atelier">Shading atelier</Link>
          <Link href="/experience/climate-atelier">Climate atelier</Link>
          <Link href="/services/lighting">Lighting</Link>
          <Link href="/services/shading">Shading</Link>
          <Link href="/services/climate">Climate</Link>
          <Link href="/services/audio">Audio</Link>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <Link href="/projects">Selected projects</Link>
          <Link href="/products">The collection</Link>
          <Link href="/professionals">For professionals</Link>
        </div>
        <div>
          <p className="footer-label">Local studio time</p>
          <p className="footer-time"><LocalTime /> <span>SAST</span></p>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} Smart Home Architects</span>
        <span>40 pages · One connected point of view</span>
      </div>
    </footer>
  );
}

export function ProductCollection({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`product-grid${compact ? " product-grid-compact" : ""}`}>
      {products.map((product) => (
        <Link className="product-card" href={`/products/${product.slug}`} key={product.slug}>
          <div className="product-image-wrap">
            <img src={product.image} alt={`${product.name} ${product.category}`} />
            <span className="product-index">{product.number}</span>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </div>
          <div className="product-card-copy">
            <span>{product.category}</span>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ConsultationCta() {
  return (
    <section className="consultation-cta">
      <div className="orbital-mark" aria-hidden="true">
        <span /><span /><span />
      </div>
      <p className="eyebrow">Private consultation</p>
      <h2>We begin with how<br />you want to live.</h2>
      <p>
        Bring us the plans early. We will map the experience, coordinate the infrastructure and make the technology disappear into the detail.
      </p>
      <Link className="button button-light" href="/contact">Book a design session <span>↗</span></Link>
    </section>
  );
}
