"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { ConsultationCta } from "./components";
import { SectionLabel } from "./product-kit";

/**
 * Intelligence · 06. The subject is a daily cycle, so the control is a
 * continuous one — a scrubber across twenty-four hours — rather than the
 * discrete selectors the other Intelligence pages use. Dragging it is the
 * argument: nothing steps, everything eases.
 *
 * Values are interpolated between four anchor points rather than listed per
 * hour, so the readouts move smoothly and the data stays small.
 */
const anchors = [
  { hour: 0, cct: 1900, lux: 2, temp: 18.5, noise: 24, label: "Deep night", note: "Paths only, warm enough not to wake anyone fully. The house is at its quietest and coolest." },
  { hour: 7, cct: 3600, lux: 180, temp: 20.5, noise: 30, label: "Waking", note: "Colour temperature climbs before the lamps do, so the rise reads as daylight arriving rather than a light switching on." },
  { hour: 13, cct: 5200, lux: 520, temp: 22.0, noise: 34, label: "Full day", note: "Electric light steps back as daylight carries the room. Ventilation is at its highest while the house is busiest." },
  { hour: 19, cct: 2700, lux: 140, temp: 21.5, noise: 28, label: "Evening", note: "Warm, low and layered. Blue content falls away two hours before anyone thinks about sleeping." },
] as const;

const between = (hour: number) => {
  const wrapped = ((hour % 24) + 24) % 24;
  const points = [...anchors, { ...anchors[0], hour: 24 }];
  const next = points.findIndex((point) => point.hour > wrapped);
  const b = points[next === -1 ? points.length - 1 : next];
  const a = points[(next === -1 ? points.length - 1 : next) - 1] ?? points[0];
  const span = b.hour - a.hour || 1;
  const t = (wrapped - a.hour) / span;
  const mix = (x: number, y: number) => x + (y - x) * t;
  return {
    cct: Math.round(mix(a.cct, b.cct) / 10) * 10,
    lux: Math.round(mix(a.lux, b.lux)),
    temp: mix(a.temp, b.temp),
    noise: Math.round(mix(a.noise, b.noise)),
    nearest: t < 0.5 ? a : b,
  };
};

const clock = (hour: number) => `${String(Math.floor(hour)).padStart(2, "0")}:${String(Math.round((hour % 1) * 60)).padStart(2, "0")}`;

export function SystemWellness() {
  const [hour, setHour] = useState(7.5);
  const now = between(hour);
  const daylight = Math.max(0, Math.min(1, (now.lux - 2) / 520));

  return (
    <>
      <section
        className="wellness-lab"
        style={{ "--daylight": daylight, "--cct": `${now.cct}` } as CSSProperties}
      >
        <div className="wellness-lab-copy">
          <p className="eyebrow">Intelligence · 06</p>
          <h1>A home in rhythm<br />with you.</h1>
          <p>Drag through the day. Light, air, temperature and quiet move together on one curve — nothing here steps between settings, because a body does not.</p>
        </div>

        <div className="wellness-scrubber">
          <div className="wellness-sky" aria-hidden="true">
            <i className="wellness-sun" />
            <i className="wellness-horizon" />
          </div>

          <label className="wellness-control">
            <span>TIME OF DAY</span>
            <b>{clock(hour)}</b>
            <input
              type="range"
              min={0}
              max={23.75}
              step={0.25}
              value={hour}
              aria-label="Time of day"
              onChange={(event) => setHour(Number(event.target.value))}
            />
          </label>

          <div className="wellness-marks" aria-hidden="true">
            {anchors.map((anchor) => (
              <button
                type="button"
                key={anchor.hour}
                className={anchor.hour === now.nearest.hour ? "is-near" : ""}
                style={{ "--at": anchor.hour / 24 } as CSSProperties}
                onClick={() => setHour(anchor.hour)}
                tabIndex={-1}
              >
                {anchor.label}
              </button>
            ))}
          </div>
        </div>

        <aside className="wellness-readout">
          <div className="wellness-readout-head">
            <span>PHASE</span>
            <b aria-live="polite">{now.nearest.label.toUpperCase()}</b>
          </div>
          <dl>
            <div><dt>Colour temperature</dt><dd>{now.cct} K</dd></div>
            <div><dt>Illuminance</dt><dd>{now.lux} lx</dd></div>
            <div><dt>Air temperature</dt><dd>{now.temp.toFixed(1)} °C</dd></div>
            <div><dt>Background noise</dt><dd>{now.noise} dB</dd></div>
          </dl>
          <p>{now.nearest.note}</p>
        </aside>
      </section>

      <section className="wellness-principle section-pad">
        <SectionLabel index="02" title="Why it moves at all" />
        <div>
          <p className="eyebrow">Circadian light</p>
          <h2>The house should not<br />argue with the hour.</h2>
          <p>Bright, blue-rich light late in the evening delays sleep; flat, dim light through the morning dulls the day. The system follows the sun rather than a timetable, and every part of it stays overridable — a manual change always wins, and holds until the next natural boundary.</p>
          <Link className="text-link" href="/services/lighting">How the light itself is built <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
