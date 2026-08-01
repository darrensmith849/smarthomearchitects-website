"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import type { Product } from "./data";
import { ConsultationCta, ProductCollection } from "./components";

const continuityModes = [
  { id: "normal", index: "01", name: "Normal", label: "PRIMARY / HEALTHY", latency: "24 ms", availability: "100%", power: "Mains + UPS", detail: "Every discipline resolves locally while the encrypted care path remains available by consent.", events: ["All room buses healthy", "Primary network path active", "Configuration backup current"] },
  { id: "internet", index: "02", name: "Internet absent", label: "LOCAL / AUTONOMOUS", latency: "26 ms", availability: "100%", power: "Mains + UPS", detail: "Scenes, schedules, occupancy logic and essential interfaces continue without an internet connection.", events: ["Internet path unavailable", "Local services unaffected", "Care channel held offline"] },
  { id: "failover", index: "03", name: "Network failover", label: "SECONDARY / ACTIVE", latency: "31 ms", availability: "100%", power: "Mains + UPS", detail: "The isolated secondary interface assumes essential traffic while every building bus retains its state.", events: ["Primary uplink degraded", "Secondary path confirmed", "Essential traffic prioritised"] },
  { id: "reserve", index: "04", name: "Power reserve", label: "UPS / PROTECTED", latency: "25 ms", availability: "100%", power: "42 min reserve", detail: "Atlas sheds non-essential service loads and protects the control layer through the transition to household backup.", events: ["Mains supply interrupted", "UPS transfer verified / 8 ms", "Essential control protected"] },
] as const;

const topologyNodes = [
  { id: "lighting", name: "Lighting", protocol: "DALI-2", x: 17, y: 18 },
  { id: "shading", name: "Shading", protocol: "RS-485", x: 50, y: 10 },
  { id: "climate", name: "Climate", protocol: "MODBUS", x: 83, y: 18 },
  { id: "audio", name: "Audio", protocol: "IP / AES67", x: 91, y: 51 },
  { id: "security", name: "Security", protocol: "LOCAL IP", x: 79, y: 83 },
  { id: "energy", name: "Energy", protocol: "MODBUS", x: 50, y: 91 },
  { id: "water", name: "Water", protocol: "I/O + IP", x: 21, y: 83 },
  { id: "interfaces", name: "Interfaces", protocol: "ATLAS BUS", x: 9, y: 51 },
] as const;

const atlasLayers = [
  ["01", "Machined enclosure", "A bead-blasted aluminium shell becomes the passive thermal path—no fan, filter or moving part."],
  ["02", "Thermal architecture", "A graphite heat spreader moves processor energy into the full upper chassis at complete silence."],
  ["03", "Local compute", "An eight-core automation engine resolves scenes, schedules, occupancy and system state on site."],
  ["04", "Secure storage", "Configuration, credentials and history are encrypted by a dedicated hardware trust layer."],
  ["05", "Isolated building I/O", "Galvanic isolation separates field wiring, network domains and service interfaces."],
  ["06", "Conditioned power", "Monitored input, ride-through logic and graceful shutdown protect the long-term system record."],
] as const;

const specificationGroups = {
  system: [
    ["Automation engine", "8-core local processor with isolated real-time building runtime"],
    ["System memory", "16 GB error-correcting memory"],
    ["Local storage", "512 GB encrypted solid-state storage"],
    ["Scene capacity", "2,048 coordinated scenes · 8,192 scheduled events"],
    ["Clock", "Hardware-backed real-time clock with network time validation"],
    ["Security", "Secure boot, signed runtime and dedicated hardware enclave"],
  ],
  connectivity: [
    ["Network", "2 × isolated 2.5 GbE · VLAN-aware · IPv6 ready"],
    ["Building buses", "4 × isolated RS-485 · KNX TP interface · DALI-2 gateway support"],
    ["Local I/O", "8 × monitored dry contact · 4 × protected relay output"],
    ["Serial", "4 × configurable RS-232 / RS-485 service channels"],
    ["Service", "Recessed USB-C commissioning port with physical enable"],
    ["Protocols", "KNX · DALI-2 · Modbus · BACnet/IP · MQTT · secure REST"],
  ],
  electrical: [
    ["Input", "100–240 V AC · 50/60 Hz · monitored UPS input"],
    ["Consumption", "21 W typical · 48 W maximum"],
    ["Cooling", "Passive convection · no fan · no moving parts"],
    ["Acoustic output", "0 dBA at 1 metre"],
    ["Operating range", "0–40 °C · 10–85% RH non-condensing"],
    ["Enclosure", "Satin graphite anodised aluminium · 320 × 240 × 68 mm"],
  ],
  lifecycle: [
    ["Configuration", "Versioned project record with encrypted local rollback"],
    ["Backups", "Signed local archive plus optional encrypted off-site copy"],
    ["Updates", "Signed, staged and reversible by the commissioning partner"],
    ["Health review", "Consent-based service channel with complete access log"],
    ["Service horizon", "10-year supported platform and documented migration path"],
    ["Studio care", "5-year commissioned-system care · extendable to 10 years"],
  ],
} as const;

type ContinuityId = (typeof continuityModes)[number]["id"];
type SpecGroup = keyof typeof specificationGroups;

export function AtlasProductPage({ product }: { product: Product }) {
  const [continuityId, setContinuityId] = useState<ContinuityId>("normal");
  const [testing, setTesting] = useState(false);
  const [exploded, setExploded] = useState(true);
  const [specGroup, setSpecGroup] = useState<SpecGroup>("system");
  const mode = continuityModes.find((item) => item.id === continuityId) ?? continuityModes[0];

  useEffect(() => {
    if (!testing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setContinuityId((current) => {
      const index = continuityModes.findIndex((item) => item.id === current);
      return continuityModes[(index + 1) % continuityModes.length].id;
    }), 3200);
    return () => window.clearInterval(timer);
  }, [testing]);

  return (
    <div className="atlas-product-page">
      <section className="atlas-core-hero">
        <div className="atlas-hero-grid" aria-hidden="true" />
        <div className="atlas-hero-copy">
          <div className="breadcrumb"><Link href="/products">Collection</Link><span>/</span><span>Control processor</span></div>
          <p className="eyebrow">Studio series · 03</p>
          <h1>Atlas<br />Core</h1>
          <h2>The intelligence<br />stays at home.</h2>
          <p>{product.longDescription}</p>
          <div className="atlas-hero-actions"><Link className="button button-dark" href="/contact">Specify Atlas Core <span>↗</span></Link><a href="#atlas-continuity">Explore the architecture <span>↓</span></a></div>
        </div>
        <div className="atlas-hero-object">
          <div className="atlas-object-halo" aria-hidden="true"><i /><i /><i /></div>
          <img decoding="async" src="/images/atlas-core-isolated.webp" alt="Atlas Core fanless local-first control processor in satin graphite" />
          <div className="atlas-hero-status"><span>SYSTEM / LOCAL</span><b><i />READY</b><dl><div><dt>RUNTIME</dt><dd>12D 08H</dd></div><div><dt>SCENES</dt><dd>128 LIVE</dd></div><div><dt>HEALTH</dt><dd>NORMAL</dd></div></dl></div>
          <div className="atlas-dimension dimension-width"><i /><span>320 MM</span><i /></div><div className="atlas-dimension dimension-height"><i /><span>68 MM</span><i /></div>
        </div>
        <div className="atlas-hero-foot"><span>LOCAL AUTOMATION ENGINE / ATC-03</span><p>Graphite aluminium · Fanless · Dual isolated network</p><b>SCROLL TO EXPLORE</b></div>
      </section>

      <section className="atlas-stat-band">{product.highlights.map((item, index) => <article key={item.label}><span>0{index + 1}</span><strong>{item.value}</strong><p>{item.label}</p></article>)}</section>

      <section className={`atlas-continuity mode-${mode.id}`} id="atlas-continuity">
        <div className="atlas-continuity-head">
          <div className="section-label section-label-light"><span>01</span><span>Local continuity laboratory</span></div>
          <div><p className="eyebrow eyebrow-light">The home remains itself</p><h2>Remove the cloud.<br />Nothing changes.</h2></div>
          <p>Atlas treats the internet as a useful service—not the place where the house lives. Test each continuity state to see what remains available.</p>
        </div>
        <div className="atlas-topology-console">
          <div className="atlas-topology-stage" aria-label="Live Atlas Core system topology">
            <div className="atlas-topology-links" aria-hidden="true">{topologyNodes.map((_, index) => <i key={index} style={{ "--link-angle": `${index * 45 - 135}deg` } as CSSProperties} />)}</div>
            <div className="atlas-topology-cloud"><i /><span>CARE PATH</span><b>{mode.id === "internet" ? "OFFLINE" : "BY CONSENT"}</b></div>
            <div className="atlas-topology-core"><img loading="lazy" decoding="async" src="/images/atlas-core-isolated.webp" alt="" /><span>ATLAS CORE</span><b>{mode.label}</b><i /></div>
            {topologyNodes.map((item) => <div className="atlas-topology-node" key={item.id} style={{ left: `${item.x}%`, top: `${item.y}%` }}><i /><span>{item.name}</span><b>{item.protocol}</b></div>)}
          </div>
          <aside className="atlas-continuity-readout" aria-live="polite">
            <div className="atlas-readout-head"><span>CONTINUITY TEST / {mode.index}</span><b><i />LIVE</b></div>
            <p>{mode.label}</p><strong>{mode.name}</strong><p>{mode.detail}</p>
            <dl><div><dt>ROOM RESPONSE</dt><dd>{mode.latency}</dd></div><div><dt>LOCAL AVAILABILITY</dt><dd>{mode.availability}</dd></div><div><dt>POWER STATE</dt><dd>{mode.power}</dd></div><div><dt>CLOUD DEPENDENCY</dt><dd>NONE</dd></div></dl>
            <div className="atlas-event-stream">{mode.events.map((event, index) => <p key={event} style={{ animationDelay: `${index * 120}ms` }}><span>0{index + 1}</span><i />{event}</p>)}</div>
            <button type="button" className={testing ? "is-testing" : ""} onClick={() => setTesting((value) => !value)}><span>{testing ? "PAUSE CONTINUITY SEQUENCE" : "RUN CONTINUITY SEQUENCE"}</span><b>{testing ? "Ⅱ" : "▶"}</b></button>
          </aside>
        </div>
        <div className="atlas-continuity-modes" role="group" aria-label="Atlas continuity mode">{continuityModes.map((item) => <button type="button" key={item.id} className={item.id === mode.id ? "is-active" : ""} aria-pressed={item.id === mode.id} onClick={() => { setContinuityId(item.id); setTesting(false); }}><span>{item.index}</span><b>{item.label}</b><strong>{item.name}</strong><i /></button>)}</div>
      </section>

      <section className="atlas-anatomy section-pad">
        <div className="atlas-anatomy-head">
          <div className="section-label"><span>02</span><span>Internal architecture</span></div>
          <div><p className="eyebrow">Six serviceable layers</p><h2>Built to think.<br />Designed to last.</h2></div>
          <button type="button" onClick={() => setExploded((value) => !value)} aria-pressed={exploded}><span>{exploded ? "Assemble Atlas" : "Separate architecture"}</span><b>{exploded ? "−" : "+"}</b></button>
        </div>
        <div className="atlas-anatomy-body">
          <div className={`atlas-exploded-model${exploded ? " is-exploded" : ""}`} aria-hidden="true">
            <div className="atlas-layer-stack">{atlasLayers.map(([index, title], layerIndex) => <div className={`atlas-hardware-layer layer-${layerIndex + 1}`} key={index} style={{ "--atlas-layer": layerIndex } as CSSProperties}><span>{index} / {title.toUpperCase()}</span><i /><i /><i /><b /></div>)}</div>
            <div className="atlas-model-axis"><span>68 MM</span><i /></div>
          </div>
          <div className="atlas-layer-list">{atlasLayers.map(([index, title, copy]) => <article key={index}><span>{index}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </div>
      </section>

      <section className="atlas-installation">
        <div className="atlas-install-object"><div className="atlas-install-grid" /><img loading="lazy" decoding="async" src="/images/atlas-core-isolated.webp" alt="Atlas Core isolated product view" /><div className="atlas-install-line line-w"><i /><span>320 MM / WIDTH</span><i /></div><div className="atlas-install-line line-d"><i /><span>240 MM / DEPTH</span><i /></div><div className="atlas-install-line line-h"><i /><span>68 MM</span><i /></div><p><span>PASSIVE THERMAL ENVELOPE</span><b>0 dBA / NO MOVING PARTS</b></p></div>
        <div className="atlas-install-copy"><div className="section-label"><span>03</span><span>Installation architecture</span></div><p className="eyebrow">One core. Scaled to the residence.</p><h2>Engineered for<br />the quiet rack.</h2><p>Atlas occupies a dedicated ventilated shelf, with every bus, network and power path labelled back to the project record. The same core scales through software and distributed I/O rather than a stack of unrelated processors.</p><div className="atlas-deployment-profiles">{[["A", "Apartment", "Up to 16 rooms · single control cabinet"], ["V", "Villa", "Up to 48 rooms · distributed building buses"], ["E", "Estate", "Multiple structures · one resilient project record"]].map(([index, title, copy]) => <article key={index}><span>{index}</span><div><strong>{title}</strong><p>{copy}</p></div><i /></article>)}</div></div>
      </section>

      <section className="atlas-spec-library section-pad">
        <div className="atlas-spec-head"><div className="section-label section-label-light"><span>04</span><span>Specification library</span></div><h2>Every interface.<br />Every condition.</h2><p>Indicative studio-series specifications. Final engineering, gateways and service scope are confirmed against the project architecture.</p></div>
        <div className="atlas-spec-console">
          <div className="atlas-spec-tabs" role="tablist" aria-label="Atlas specification category">{(Object.keys(specificationGroups) as SpecGroup[]).map((group, index) => <button type="button" role="tab" aria-selected={group === specGroup} key={group} className={group === specGroup ? "is-active" : ""} onClick={() => setSpecGroup(group)}><span>0{index + 1}</span><b>{group}</b></button>)}</div>
          <div className="atlas-spec-table" key={specGroup}>{specificationGroups[specGroup].map(([label, value], index) => <div key={label} style={{ animationDelay: `${index * 45}ms` }}><span>{label}</span><strong>{value}</strong></div>)}</div>
          <div className="atlas-spec-meta"><span>MODEL / ATC-03</span><span>REVISION / STUDIO 2026.2</span><span>ORIGIN / SOUTH AFRICA</span></div>
        </div>
      </section>

      <section className="related-products section-pad atlas-related"><div className="section-head collection-head"><div className="section-label"><span>05</span><span>Explore the system</span></div><h2>Designed together.</h2></div><ProductCollection compact /></section>
      <ConsultationCta />
    </div>
  );
}
