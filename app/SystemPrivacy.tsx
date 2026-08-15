"use client";

import Link from "next/link";
import { useState } from "react";
import { ConsultationCta } from "./components";
import { SectionLabel } from "./product-kit";

/**
 * Intelligence · 04. The claim is that the intelligence stays in the house, so
 * the page draws the boundary and puts every signal on one side of it.
 *
 * Two zones rather than a list, because the position of a thing relative to the
 * line is the whole point. Selecting a source moves its signals into the
 * diagram; nothing about the layout is a four-state console.
 */
const sources = [
  {
    id: "presence",
    index: "01",
    label: "Presence sensing",
    device: "Aura",
    inside: ["Occupancy per zone", "Movement direction", "Dwell time", "Ambient lux and temperature"],
    crosses: ["Nothing"],
    never: ["Images", "Audio", "Identity", "Anything that leaves the room it was measured in"],
    meaning: "The room knows someone is reading in the corner. It does not know who, and it cannot tell anyone.",
  },
  {
    id: "entry",
    index: "02",
    label: "Entry and access",
    device: "Threshold",
    inside: ["Credential match", "Door state", "Time of event", "Local event log"],
    crosses: ["An alert you asked for, when you asked for it"],
    never: ["A face database", "Continuous recording", "Third-party sharing"],
    meaning: "The house recognises a key, not a person. The record is yours and stays on your hardware.",
  },
  {
    id: "climate",
    index: "03",
    label: "Climate and air",
    device: "Plenum",
    inside: ["Temperature and humidity", "CO₂ and particulates", "Plant run hours"],
    crosses: ["Aggregate energy totals, if you enable them"],
    never: ["Room-by-room occupancy history", "Anything tied to a person"],
    meaning: "Comfort is computed where it is measured. Nothing about how you live needs to leave to make a room comfortable.",
  },
  {
    id: "voice",
    index: "04",
    label: "Voice",
    device: "Third party",
    inside: ["Nothing"],
    crosses: ["The phrase you speak, to the vendor you chose"],
    never: ["Anything, if you decline it — voice is optional everywhere"],
    meaning: "The one surface that genuinely leaves the house. It is offered, never assumed, and never the only way to do something.",
  },
] as const;

type SourceId = (typeof sources)[number]["id"];

export function SystemPrivacy() {
  const [sourceId, setSourceId] = useState<SourceId>("presence");
  const source = sources.find((item) => item.id === sourceId) ?? sources[0];
  const leaves = source.crosses[0] !== "Nothing";

  return (
    <>
      <section className={`privacy-lab${leaves ? " is-crossing" : ""}`}>
        <div className="privacy-lab-copy">
          <p className="eyebrow">Intelligence · 04</p>
          <h1>The intelligence<br />stays at home.</h1>
          <p>Pick a source and see exactly where its signals sit. The line is the property boundary — most things never approach it.</p>
        </div>

        <div className="privacy-sources" role="group" aria-label="Choose a signal source">
          {sources.map((item) => (
            <button
              type="button"
              key={item.id}
              className={item.id === source.id ? "is-active" : ""}
              aria-pressed={item.id === source.id}
              onClick={() => setSourceId(item.id)}
            >
              <span>{item.index}</span>
              <strong>{item.label}</strong>
              <small>{item.device}</small>
            </button>
          ))}
        </div>

        <div className="privacy-boundary">
          <section className="privacy-zone zone-inside">
            <p className="privacy-zone-head"><span>INSIDE THE HOUSE</span><b>STAYS</b></p>
            <ul aria-live="polite">
              {source.inside.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <p className="privacy-line" aria-hidden="true">
            <i />
            <span>{leaves ? "ONE CROSSING" : "NO CROSSING"}</span>
            <i />
          </p>

          <section className="privacy-zone zone-outside">
            <p className="privacy-zone-head"><span>LEAVES THE HOUSE</span><b>{leaves ? "CROSSES" : "NONE"}</b></p>
            <ul>
              {source.crosses.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="privacy-never-head">NEVER CAPTURED</p>
            <ul className="privacy-never">
              {source.never.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        </div>

        <p className="privacy-meaning">{source.meaning}</p>
      </section>

      <section className="privacy-principle section-pad">
        <SectionLabel index="02" title="How it is enforced" />
        <div>
          <p className="eyebrow">Least data</p>
          <h2>A system that cannot<br />leak what it never held.</h2>
          <p>Restraint is easier to guarantee than security. Sensors are specified so the data that would be sensitive is never produced — no cameras where presence will do, no identity where a credential will do. What remains is processed on hardware in the building, and every route out is something you switched on deliberately.</p>
          <Link className="text-link" href="/products/sensors">The sensors this relies on <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
