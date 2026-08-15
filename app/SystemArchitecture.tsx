"use client";

import Link from "next/link";
import { useState } from "react";
import { ConsultationCta } from "./components";
import { SectionLabel } from "./product-kit";
import { SystemCanvas } from "./SystemCanvas";

/**
 * The Intelligence menu's first page. It used to be the generic editorial
 * template, which meant the page describing the technical foundation of the
 * whole practice showed the same two hardcoded bands as the other seven.
 *
 * The idea here is the stack itself: three layers, each resting on the one
 * below, selected one at a time. The vertical dependency is the argument — you
 * cannot have the experience without the integration, and neither survives bad
 * infrastructure — so the diagram is a stack rather than the four-state console
 * the service studies use.
 */
const layers = [
  {
    id: "experience",
    index: "01",
    title: "Experience",
    role: "What the house feels like",
    headline: "One language, learned once.",
    copy: "Scenes, keypads and rituals. Everything a resident actually touches lives here, and it is deliberately the thinnest layer — the less of the system that surfaces, the better the rest has been designed.",
    holds: ["Scenes and rituals", "Keypads and wall controls", "Voice, app and presence"],
    rule: "Nothing reaches this layer that a guest would need explaining.",
    readings: [["Scene response", "32 ms"], ["Interfaces to learn", "01"], ["Visible devices", "minimum"]],
  },
  {
    id: "integration",
    index: "02",
    title: "Integration",
    role: "What the disciplines agree on",
    headline: "Eight systems, one vocabulary.",
    copy: "Lighting, shading, climate, audio, security and energy each speak their own protocol. This layer translates them into one shared language, so a single instruction can move all of them together without any of them knowing about the others.",
    holds: ["Shared logic and schedules", "Sensing and context", "Protocol translation"],
    rule: "Every discipline is mapped once, into a common control language.",
    readings: [["Coordinated systems", "08"], ["Shared context", "continuous"], ["Vendor lock", "none"]],
  },
  {
    id: "infrastructure",
    index: "03",
    title: "Infrastructure",
    role: "What everything else assumes",
    headline: "The layer you never think about.",
    copy: "Power, network, cable and bus. It is specified for the building rather than the fit-out, because it is the only layer that cannot be revised later without opening walls — and every promise made above it depends on it being right first.",
    holds: ["Structured cabling and bus", "Network and power resilience", "Documented capacity"],
    rule: "Sized for the home in fifteen years, not the home on handover.",
    readings: [["Local resilience", "24/7"], ["Spare capacity", "planned"], ["Service access", "documented"]],
  },
] as const;

type LayerId = (typeof layers)[number]["id"];

export function SystemArchitecture() {
  const [layerId, setLayerId] = useState<LayerId>("integration");
  const layer = layers.find((item) => item.id === layerId) ?? layers[1];
  const depth = layers.findIndex((item) => item.id === layerId);

  return (
    <>
      <section className={`architecture-lab is-${layer.id}`}>
        <SystemCanvas variant="home" />
        <div className="architecture-lab-copy">
          <p className="eyebrow">Intelligence · 01</p>
          <h1>One invisible<br />foundation.</h1>
          <p>The technical backbone that lets every discipline behave like part of one home. Three layers, each resting on the one beneath it.</p>
        </div>

        <div className="architecture-stack" role="group" aria-label="System layers">
          {layers.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={`architecture-slab${item.id === layer.id ? " is-active" : ""}`}
              style={{ "--slab": index } as React.CSSProperties}
              aria-pressed={item.id === layer.id}
              onClick={() => setLayerId(item.id)}
            >
              <span>{item.index}</span>
              <strong>{item.title}</strong>
              <small>{item.role}</small>
              <i aria-hidden="true" />
            </button>
          ))}
          <p className="architecture-stack-foot" aria-hidden="true">
            <span>SURFACE</span>
            <i />
            <span>STRUCTURE</span>
          </p>
        </div>

        <aside className="architecture-readout">
          <div className="architecture-readout-head">
            <span>LAYER / {layer.index}</span>
            {/* Scoped to the changing value, so a screen reader announces the
                layer rather than re-reading the whole panel on every press. */}
            <b aria-live="polite">{layer.title.toUpperCase()}</b>
          </div>
          <h2>{layer.headline}</h2>
          <p>{layer.copy}</p>
          <ul>
            {layer.holds.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <dl>
            {layer.readings.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="architecture-rule section-pad">
        <SectionLabel index="02" title="The rule at this layer" />
        <div>
          <p className="eyebrow">{layer.title}</p>
          <h2>{layer.rule}</h2>
          <p>
            Depth {depth + 1} of 3 — {depth === 0
              ? "everything below this is invisible to the people living here."
              : depth === 1
                ? "this is where a collection of devices becomes a single system."
                : "nothing above this layer can be better than this layer is."}
          </p>
          <Link className="text-link" href="/systems/interfaces">See how it surfaces <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="architecture-notes section-pad">
        <SectionLabel index="03" title="Why it is built this way" />
        <div className="architecture-notes-grid">
          <article>
            <span>01</span>
            <h3>Open standards</h3>
            <p>DALI-2, KNX, Matter and native APIs, chosen so the home is never dependent on one manufacturer remaining interested in it.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Control hierarchy</h3>
            <p>Local first, then the network, then the cloud. Each level degrades to the one beneath it rather than to nothing.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Future capacity</h3>
            <p>Containment, spare cores and power are specified at first fix, because that is the only moment they are cheap.</p>
          </article>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
