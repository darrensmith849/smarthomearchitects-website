"use client";

import { useState } from "react";

const networkModes = [
  {
    id: "primary",
    index: "01",
    kicker: "PRIMARY FIBRE",
    title: "Everyday flow",
    primary: "2.5",
    unit: "Gb/s",
    status: "CORE / NOMINAL",
    headline: "The fastest path stays invisible.",
    description: "The primary circuit feeds a managed core, then each room and service receives exactly the capacity, priority and privacy it needs.",
    readings: [["TRANSIT", "FIBRE 01"], ["LATENCY", "8 MS"], ["AVAILABILITY", "99.99%"]],
    event: "Traffic balanced across seven active zones",
  },
  {
    id: "failover",
    index: "02",
    kicker: "AUTOMATIC FAILOVER",
    title: "Route around fault",
    primary: "34",
    unit: "ms",
    status: "BACKUP / ACTIVE",
    headline: "A fault becomes a route change.",
    description: "When the primary circuit disappears, the secondary path takes over automatically. Calls, security and essential work continue without a household reset.",
    readings: [["PRIMARY", "FAULT"], ["SECONDARY", "CELL 02"], ["CHANGEOVER", "1.8 S"]],
    event: "Essential services retained during carrier loss",
  },
  {
    id: "coverage",
    index: "03",
    kicker: "MEASURED WI-FI",
    title: "Room-to-room",
    primary: "−54",
    unit: "dBm",
    status: "FIELD / MEASURED",
    headline: "One network. No weak rooms.",
    description: "Access points are placed from predictive modelling, concealed with the architecture and validated after occupation for quiet, uninterrupted roaming.",
    readings: [["ACCESS POINTS", "06"], ["ROAMING", "LOCKED"], ["CHANNEL PLAN", "CLEAR"]],
    event: "Coverage held across living, work and garden zones",
  },
  {
    id: "local",
    index: "04",
    kicker: "LOCAL CONTINUITY",
    title: "Cloud independent",
    primary: "7/7",
    unit: "live",
    status: "WAN / ISOLATED",
    headline: "The house does not need the cloud.",
    description: "Lighting, comfort, access, audio and essential control remain available on the local core even when every outside connection is unavailable.",
    readings: [["INTERNET", "OFFLINE"], ["LOCAL CORE", "HEALTHY"], ["SERVICES", "7 LIVE"]],
    event: "All essential household systems operating locally",
  },
];

const zones = [
  { id: "living", label: "LIVING", detail: "AP 01", className: "zone-living" },
  { id: "studio", label: "STUDIO", detail: "AP 02", className: "zone-studio" },
  { id: "suite", label: "SUITE", detail: "AP 03", className: "zone-suite" },
  { id: "garden", label: "GARDEN", detail: "AP 04", className: "zone-garden" },
];

const services = ["LIGHT", "CLIMATE", "ACCESS", "AUDIO"];

export function NetworkingStudy() {
  const [modeId, setModeId] = useState("primary");
  const mode = networkModes.find((item) => item.id === modeId) ?? networkModes[0];

  return (
    <section className="network-study section-pad">
      <div className="network-study-intro">
        <div className="section-label"><span>02</span><span>Network observatory</span></div>
        <div>
          <p className="eyebrow eyebrow-light">One home · Every digital path</p>
          <h2>Always available.<br />Never demanding attention.</h2>
        </div>
        <p>Explore the infrastructure beneath the rooms: fast when connected, graceful during failure and fully useful without the cloud.</p>
      </div>

      <div className={`network-study-console is-${mode.id}`}>
        <div className="network-study-visual">
          <img decoding="async" src="/images/hero.webp" alt="Connected coastal home with its private network topology revealed" />
          <div className="network-grid" aria-hidden="true" />
          <div className="network-route route-fibre" aria-hidden="true"><i /><i /></div>
          <div className="network-route route-cell" aria-hidden="true"><i /><i /></div>
          <div className="network-route route-local" aria-hidden="true"><i /><i /></div>
          <div className="network-source source-fibre"><span>WAN 01</span><strong>FIBRE</strong><i /></div>
          <div className="network-source source-cell"><span>WAN 02</span><strong>FAILOVER</strong><i /></div>
          <div className="network-core"><span>PRIVATE CORE</span><strong>2.5 Gb</strong><i /><i /><i /></div>
          <div className="network-local"><span>LOCAL SERVICES</span><div>{services.map((service) => <b key={service}>{service}</b>)}</div></div>
          <div className="network-zones">
            {zones.map((zone) => <div className={`network-zone ${zone.className}`} key={zone.id}><i /><span>{zone.label}</span><b>{zone.detail}</b></div>)}
          </div>
          <div className="network-visual-head"><span>RESIDENCE / NETWORK MODEL 08</span><b>LOCAL / LIVE</b></div>
          <p className="network-event"><i /><span>{mode.event}</span><b>VERIFIED</b></p>
        </div>

        <aside className="network-study-panel" aria-live="polite">
          <div className="network-panel-head"><span>{mode.status}</span><b>08:42:16</b></div>
          <p>{mode.kicker}</p>
          <strong>{mode.primary}<small>{mode.unit}</small></strong>
          <h3>{mode.title}</h3>
          <h4>{mode.headline}</h4>
          <p>{mode.description}</p>
          <dl>{mode.readings.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </aside>
      </div>

      <div className="network-study-controls" role="group" aria-label="Choose a network operating condition">
        {networkModes.map((item) => (
          <button type="button" key={item.id} className={item.id === mode.id ? "is-active" : ""} onClick={() => setModeId(item.id)} aria-pressed={item.id === mode.id}>
            <span>{item.index}</span><b>{item.kicker}</b><strong>{item.title}</strong><i aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="network-study-notes">
        <article><span>01 / MODEL</span><h3>Coverage is designed before ceilings close.</h3><p>Predictive surveys coordinate access points, cabling and construction materials while changes are still easy to make.</p></article>
        <article><span>02 / SEPARATE</span><h3>Every device receives appropriate trust.</h3><p>Family, guest, building, security and service traffic remain deliberately isolated without creating daily friction.</p></article>
        <article><span>03 / MAINTAIN</span><h3>The invisible system stays legible.</h3><p>Clear documentation, managed updates and remote health checks turn a hidden network into maintainable architecture.</p></article>
      </div>
    </section>
  );
}
