"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { ConsultationCta, ProductCollection } from "./components";
import type { Product } from "./data";
import { ExplodeToggle, LayerList, SectionLabel } from "./product-kit";

/**
 * Reveal — the shading system. Drawn rather than photographed: the argument is
 * fabric behaviour against sun angle, which is a diagram, not an object. Veil's
 * strongest section is a CSS wall build-up for the same reason.
 *
 * The laboratory is a window in elevation. Move the sun and the shade answers
 * on its own — that autonomy is the product, so the visitor does not set the
 * height, they set the hour and watch what the system decides.
 */
const fabrics = [
  { id: "sheer", name: "Sheer", openness: "5%", keeps: 82, blocks: 0.42, glareFloor: 22, note: "Holds the view and the daylight. Softens contrast at the glass without darkening the room." },
  { id: "dimout", name: "Dim-out", openness: "1%", keeps: 34, blocks: 0.72, glareFloor: 12, note: "The working compromise. Enough of the outside to keep the room oriented, enough density to protect art and screens." },
  { id: "blackout", name: "Blackout", openness: "0%", keeps: 0, blocks: 0.97, glareFloor: 4, note: "Total. Specified for bedrooms and cinema, and never as the only fabric on a facade." },
] as const;

const layers: readonly (readonly [string, string, string])[] = [
  ["01", "Pocket and closure", "A 92 × 100 mm void formed in the ceiling before plaster, with a removable closure detailed to a 1 mm tolerance against the finished line."],
  ["02", "Tube and motor", "A 35 mm silent tubular motor inside the roller. Selected and mounted so the movement registers below the room's own noise floor."],
  ["03", "Fabric", "Chosen per facade rather than per house — openness, colour and weave decided against orientation, art and the view worth keeping."],
  ["04", "Side channels", "Optional guides that take the fabric to the reveal, removing the light leak at the edge that undoes a blackout."],
  ["05", "Bottom bar", "Weighted and concealed, sized so the fabric hangs true across a four-metre span without a visible batten."],
];

type FabricId = (typeof fabrics)[number]["id"];

/** Sun altitude across the day, 0 at 06:00 and 18:00, peak at noon. */
const altitude = (hour: number) => Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI));

export function RevealProductPage({ product }: { product: Product }) {
  const [hour, setHour] = useState(9);
  const [fabricId, setFabricId] = useState<FabricId>("dimout");
  const [exploded, setExploded] = useState(false);
  const fabric = fabrics.find((item) => item.id === fabricId) ?? fabrics[1];

  const sun = altitude(hour);
  // The shade answers the sun: high sun on a west facade means more descent.
  const descent = Math.min(1, Math.max(0, sun * 1.15 - 0.08));
  const gain = Math.round((1 - descent * fabric.blocks) * 100);
  const glare = Math.max(fabric.glareFloor, Math.round(46 - descent * 34));
  const view = Math.round(fabric.keeps * (1 - descent * 0.45));
  const clock = `${String(Math.floor(hour)).padStart(2, "0")}:${String(Math.round((hour % 1) * 60)).padStart(2, "0")}`;

  return (
    <div className="reveal-product-page">
      <section className="reveal-hero">
        <div className="reveal-hero-copy">
          <p className="breadcrumb"><Link href="/products">Collection</Link> / {product.category}</p>
          <p className="eyebrow">Studio series · {product.number}</p>
          <h1>{product.name}</h1>
          <h2>{product.line}</h2>
          <p>{product.longDescription}</p>
          <div className="reveal-hero-actions">
            <Link className="button button-dark" href="/contact">Specify {product.name} <span aria-hidden="true">↗</span></Link>
            <a href="#daylight">Move the sun <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="reveal-hero-object" aria-hidden="true">
          <div className="reveal-window" style={{ "--descent": 0.42 } as CSSProperties}>
            <i className="reveal-pocket" />
            <i className="reveal-fabric" />
            <i className="reveal-bar" />
            <span className="reveal-dim">92 MM POCKET</span>
          </div>
        </div>
      </section>

      <section className="reveal-stat-band">
        {product.highlights.map((item) => (
          <article key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>
        ))}
      </section>

      <section className="reveal-daylight section-pad" id="daylight">
        <SectionLabel index="01" title="Daylight laboratory" />
        <div className="reveal-daylight-head">
          <p className="eyebrow">Set the hour, not the height</p>
          <h2>The shade decides.<br />You set the day.</h2>
        </div>

        <div className="reveal-console">
          <div
            className={`reveal-stage fabric-${fabric.id}`}
            style={{ "--descent": descent, "--sun": sun } as CSSProperties}
          >
            <i className="reveal-sky" aria-hidden="true" />
            <i className="reveal-sun" aria-hidden="true" />
            <div className="reveal-window is-live">
              <i className="reveal-pocket" aria-hidden="true" />
              <i className="reveal-fabric" aria-hidden="true" />
              <i className="reveal-bar" aria-hidden="true" />
            </div>
            <p className="reveal-stage-foot"><span>WEST FACADE</span><b>{clock}</b></p>
          </div>

          <aside className="reveal-readout">
            <div className="reveal-readout-head">
              <span>FABRIC</span>
              <b aria-live="polite">{fabric.name.toUpperCase()} / {fabric.openness}</b>
            </div>
            <dl>
              <div><dt>Shade descent</dt><dd>{Math.round(descent * 100)}%</dd></div>
              <div><dt>Solar gain</dt><dd>{gain}%</dd></div>
              <div><dt>Glare index</dt><dd>{glare}</dd></div>
              <div><dt>View retained</dt><dd>{view}%</dd></div>
            </dl>
            <p>{fabric.note}</p>

            <label className="reveal-slider">
              <span>TIME OF DAY</span>
              <b>{clock}</b>
              <input
                type="range" min={6} max={20} step={0.25} value={hour}
                aria-label="Time of day"
                onChange={(event) => setHour(Number(event.target.value))}
              />
            </label>

            <div className="reveal-fabric-picker" role="group" aria-label="Choose a fabric">
              {fabrics.map((item) => (
                <button
                  type="button" key={item.id}
                  className={item.id === fabric.id ? "is-active" : ""}
                  aria-pressed={item.id === fabric.id}
                  onClick={() => setFabricId(item.id)}
                >
                  <strong>{item.name}</strong><small>{item.openness}</small>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="reveal-anatomy section-pad">
        <div className="reveal-anatomy-head">
          <SectionLabel index="02" title="Anatomy" />
          <div>
            <p className="eyebrow">Five parts, one line in the ceiling</p>
            <h2>Detailed before<br />the plaster.</h2>
          </div>
          <ExplodeToggle
            exploded={exploded}
            onToggle={() => setExploded((value) => !value)}
            assembleLabel="Assemble Reveal"
            separateLabel="Separate the assembly"
          />
        </div>
        <div className="reveal-anatomy-body">
          <div className={`reveal-assembly${exploded ? " is-exploded" : ""}`} aria-hidden="true">
            {layers.map((layer, index) => (
              <i key={layer[0]} className={`reveal-part part-${index + 1}`} style={{ "--part": index } as CSSProperties} />
            ))}
          </div>
          <LayerList layers={layers} className="reveal-layer-list" />
        </div>
      </section>

      <section className="reveal-spec section-pad">
        <SectionLabel index="03" title="Technical library" />
        <div className="reveal-spec-body">
          <h2>Specified per<br />opening.</h2>
          <dl className="reveal-spec-table">
            {product.specifications.map(({ label, value }, index) => (
              <div key={label} style={{ animationDelay: `${index * 45}ms` }}>
                <dt>{label}</dt><dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="reveal-spec-meta">
          <span>MODEL / RVL-05</span><span>REVISION / STUDIO 2026.2</span><span>FABRIC LIBRARY / 34 WEAVES</span>
        </p>
      </section>

      <section className="related-products section-pad reveal-related">
        <SectionLabel index="04" title="Complete the system" />
        <ProductCollection compact exclude={product.slug} limit={4} />
      </section>

      <ConsultationCta />
    </div>
  );
}
