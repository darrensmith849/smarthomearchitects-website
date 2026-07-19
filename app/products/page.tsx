import type { Metadata } from "next";
import Link from "next/link";
import { ConsultationCta, ProductCollection } from "../components";

export const metadata: Metadata = {
  title: "The Collection",
  description: "A considered family of smart-home controls, sensors and infrastructure selected for architecture.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero product-list-hero">
        <div>
          <p className="eyebrow">The studio collection</p>
          <h1>Fewer objects.<br />Better ones.</h1>
        </div>
        <p className="page-hero-intro">
          We edit technology with the same discipline an architect applies to materials: only what belongs, built to last, and quietly beautiful.
        </p>
      </section>

      <section className="product-philosophy section-pad">
        <div className="section-label"><span>01</span><span>Selection principles</span></div>
        <div className="principle-grid">
          <div><span>01</span><h3>Less interface</h3><p>One clear action is worth more than a screen full of choices.</p></div>
          <div><span>02</span><h3>Local control</h3><p>Essential functions should remain at home and work without the internet.</p></div>
          <div><span>03</span><h3>Open systems</h3><p>We favour serviceable standards over short-lived, closed ecosystems.</p></div>
          <div><span>04</span><h3>Material honesty</h3><p>Metal feels like metal. Glass is quiet. Finishes belong to the room.</p></div>
        </div>
      </section>

      <section className="all-products section-pad">
        <div className="section-head collection-head">
          <div className="section-label"><span>02</span><span>Studio series · 2026</span></div>
          <h2>Three objects.<br />One calm system.</h2>
        </div>
        <ProductCollection />
      </section>

      <section className="system-note section-pad">
        <p className="eyebrow">A note on specification</p>
        <h2>No two homes need<br />the same system.</h2>
        <div>
          <p>These products form part of an engineered whole. Final quantities, finishes, integrations and performance are resolved against the architecture and project requirements.</p>
          <Link className="text-link" href="/approach">See how we specify <span>→</span></Link>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
