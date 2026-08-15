"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { Product } from "./data";
import { ConsultationCta, ProductCollection } from "./components";
import { ExplodeToggle, LayerList } from "./product-kit";
import { useSequence } from "./use-sequence";

const presenceScenarios = [
  { id: "reading", index: "01", name: "Still reading", state: "PRESENT / STILL", motion: "0.8 mm", lux: "312 lx", temperature: "21.8°C", humidity: "46%", air: "Stable", x: 36, y: 64, decision: "Task light and comfort hold", description: "Fine-motion radar sees the small rhythm of a seated reader. The room stays composed without asking for a wave or button press." },
  { id: "focus", index: "02", name: "Working", state: "PRESENT / ACTIVE", motion: "2.4 mm", lux: "486 lx", temperature: "22.1°C", humidity: "45%", air: "Freshen", x: 70, y: 39, decision: "Focus scene continues", description: "Daylight, presence and air trend combine into one quiet interpretation. Task light remains balanced and fresh air increases gently." },
  { id: "sleep", index: "03", name: "Sleeping", state: "PRESENT / RESTING", motion: "0.3 mm", lux: "0.4 lx", temperature: "19.4°C", humidity: "49%", air: "Quiet", x: 49, y: 70, decision: "Night protection holds", description: "Aura recognises continued presence without a camera, keeping the room dark while climate and pathway logic remain available." },
  { id: "vacant", index: "04", name: "Room released", state: "VACANT / VERIFIED", motion: "0.0 mm", lux: "184 lx", temperature: "21.2°C", humidity: "47%", air: "Setback", x: 50, y: 50, decision: "Room releases after delay", description: "A considered vacancy timer confirms the room is empty before light, climate and audio are released together." },
] as const;

const roomProfiles = [
  { id: "bedroom", name: "Bedroom", width: 4.8, depth: 5.2, sensors: 1, label: "24.9 m² / ONE CENTRE" },
  { id: "living", name: "Living room", width: 7.2, depth: 6.4, sensors: 2, label: "46.1 m² / DUAL OVERLAP" },
  { id: "suite", name: "Open suite", width: 9.6, depth: 7.8, sensors: 3, label: "74.9 m² / TRIANGULATED" },
] as const;

const auraLayers = [
  ["01", "Mineral face", "A low-reflection, camera-free surface calibrated to sit quietly with plaster and paint."],
  ["02", "Fine-motion radar", "60 GHz sensing resolves presence through movement smaller than a millimetre."],
  ["03", "Environmental array", "Lux, temperature, humidity and air trend share a single calibrated room position."],
  ["04", "Local interpretation", "Signals become simple room states before leaving the sensor—never images or recordings."],
  ["05", "PoE + system bus", "One concealed connection provides power, encrypted local data and commissioning access."],
] as const;

const auraSpecifications = {
  presence: [
    ["Technology", "60 GHz fine-motion radar · no optical sensor"],
    ["Coverage", "Up to 7 m radius at 2.7 m finished mounting height"],
    ["Field of view", "120° configurable detection field"],
    ["Sensitivity", "Five commissioned levels with quiet-presence profile"],
    ["Zones", "Four software detection regions per sensor"],
    ["Response", "30 ms local state publication target"],
  ],
  environment: [
    ["Daylight", "Calibrated 0.1–100,000 lux ambient measurement"],
    ["Temperature", "0–45 °C · ±0.2 °C commissioned accuracy"],
    ["Humidity", "10–90% RH · ±2% typical"],
    ["Air trend", "Relative VOC trend for ventilation response"],
    ["Sampling", "Adaptive 1–60 second environmental interval"],
    ["Calibration", "Room-offset commissioning stored locally"],
  ],
  integration: [
    ["Power", "PoE Class 1 or 24 V DC encrypted system bus"],
    ["Network", "Encrypted local multicast · VLAN-aware"],
    ["Control outputs", "Presence · vacancy · lux · comfort · air trend"],
    ["Scene systems", "Lighting · shades · climate · audio · security"],
    ["Data policy", "No internet connection required · no cloud account"],
    ["Updates", "Signed local firmware through Atlas Core"],
  ],
  physical: [
    ["Dimensions", "Ø 82 × 18 mm surface profile"],
    ["Mounting", "Flush trimless or 18 mm architectural surface mount"],
    ["Cut-out", "68 mm commissioned ceiling aperture"],
    ["Finish", "Chalk · limestone · graphite · custom project paint"],
    ["Environment", "Indoor · 0–45 °C · 10–90% RH non-condensing"],
    ["Studio care", "5-year commissioned-system care"],
  ],
} as const;

type ScenarioId = (typeof presenceScenarios)[number]["id"];
type RoomId = (typeof roomProfiles)[number]["id"];
type AuraSpecGroup = keyof typeof auraSpecifications;

const scenarioIds = presenceScenarios.map((item) => item.id);

export function AuraProductPage({ product }: { product: Product }) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("reading");
  const [playing, setPlaying] = useState(false);
  const [privacyView, setPrivacyView] = useState<"signals" | "meaning">("meaning");
  const [roomId, setRoomId] = useState<RoomId>("bedroom");
  const [ceilingHeight, setCeilingHeight] = useState(2.7);
  const [mount, setMount] = useState<"flush" | "surface">("flush");
  const [exploded, setExploded] = useState(true);
  const [specGroup, setSpecGroup] = useState<AuraSpecGroup>("presence");
  const scenario = presenceScenarios.find((item) => item.id === scenarioId) ?? presenceScenarios[0];
  const room = roomProfiles.find((item) => item.id === roomId) ?? roomProfiles[0];
  const coverage = Math.max(4.8, 7 - Math.max(0, ceilingHeight - 2.7) * .85);

  useSequence(scenarioIds, playing, 3300, setScenarioId);

  const auraStyle = { "--presence-x": `${scenario.x}%`, "--presence-y": `${scenario.y}%`, "--coverage-scale": `${coverage / 7}`, "--mount-offset": mount === "flush" ? "2px" : "18px" } as CSSProperties;

  return (
    <div className={`aura-product-page scenario-${scenario.id}`} style={auraStyle}>
      <section className="aura-core-hero">
        <div className="aura-hero-object">
          <div className="aura-hero-field" aria-hidden="true"><i /><i /><i /><i /></div>
          <img decoding="async" src="/images/aura-isolated.webp" alt="Aura camera-free presence and environmental sensor in chalk white" />
          <div className="aura-dimension dimension-diameter"><i /><span>Ø 82 MM</span><i /></div><div className="aura-dimension dimension-depth"><i /><span>18 MM</span><i /></div>
          <div className="aura-hero-reading"><span>LOCAL INTERPRETATION</span><b><i />PRESENT / STILL</b><p>0 images · 0 recordings · 0 cloud calls</p></div>
        </div>
        <div className="aura-hero-copy">
          <div className="breadcrumb"><Link href="/products">Collection</Link><span>/</span><span>Presence sensor</span></div>
          <p className="eyebrow">Studio series · 02</p><h1>Aura</h1><h2>The room understands<br />before you ask.</h2><p>{product.longDescription}</p>
          <div className="aura-hero-actions"><Link className="button button-dark" href="/contact">Specify Aura <span>↗</span></Link><a href="#aura-presence-lab">Explore presence <span>↓</span></a></div>
        </div>
        <div className="aura-hero-foot"><span>AURA / PRESENCE + ENVIRONMENT</span><p>Camera-free · Local-first · Ceiling integrated</p><b>SCROLL TO EXPLORE</b></div>
      </section>

      <section className="aura-stat-band">{product.highlights.map((item, index) => <article key={item.label}><span>0{index + 1}</span><strong>{item.value}</strong><p>{item.label}</p></article>)}</section>

      <section className="aura-presence-lab" id="aura-presence-lab">
        <div className="aura-lab-head"><div className="section-label"><span>01</span><span>Presence laboratory</span></div><div><p className="eyebrow eyebrow-light">Stillness is not absence</p><h2>A room that<br />knows the difference.</h2></div><p>Aura combines fine-motion radar with environmental context. Choose a moment to see the signals become one useful room state.</p></div>
        <div className="aura-lab-console">
          <div className="aura-room-model" aria-label={`Aura room model showing ${scenario.name}`}>
            <div className="aura-room-grid" />
            <div className="aura-room-wall wall-top" /><div className="aura-room-wall wall-right" /><div className="aura-room-wall wall-bottom" /><div className="aura-room-wall wall-left" />
            <div className="aura-room-window"><i /><i /><i /></div>
            <div className="aura-room-bed"><i /><b /></div><div className="aura-room-desk"><i /><b /></div><div className="aura-room-chair"><i /></div>
            <div className="aura-ceiling-sensor"><img loading="lazy" decoding="async" src="/images/aura-isolated.webp" alt="" /><span>AURA / 01</span></div>
            <div className="aura-radar-field"><i /><i /><i /><i /><b /></div>
            <div className={`aura-presence-point${scenario.id === "vacant" ? " is-vacant" : ""}`}><i /><b /><span>{scenario.state}</span></div>
            <div className="aura-room-caption"><span>ROOM B03 / LIVE MODEL</span><b>NO OPTICAL SENSOR</b></div>
          </div>
          <aside className="aura-signal-readout" aria-live="polite"><div><span>SENSOR FUSION / {scenario.index}</span><b><i />LOCAL</b></div><p>{scenario.state}</p><strong>{scenario.name}</strong><p>{scenario.description}</p><dl><div><dt>FINE MOTION</dt><dd>{scenario.motion}</dd></div><div><dt>DAYLIGHT</dt><dd>{scenario.lux}</dd></div><div><dt>TEMPERATURE</dt><dd>{scenario.temperature}</dd></div><div><dt>HUMIDITY</dt><dd>{scenario.humidity}</dd></div><div><dt>AIR TREND</dt><dd>{scenario.air}</dd></div><div><dt>IDENTITY</dt><dd>UNKNOWN</dd></div></dl><div className="aura-decision"><span>ROOM DECISION</span><strong>{scenario.decision}</strong><i /></div><button type="button" className={playing ? "is-playing" : ""} onClick={() => setPlaying((value) => !value)}><span>{playing ? "PAUSE ROOM SEQUENCE" : "RUN ROOM SEQUENCE"}</span><b>{playing ? "Ⅱ" : "▶"}</b></button></aside>
        </div>
        <div className="aura-scenario-buttons" role="group" aria-label="Presence scenario">{presenceScenarios.map((item) => <button type="button" key={item.id} className={item.id === scenario.id ? "is-active" : ""} aria-pressed={item.id === scenario.id} onClick={() => { setScenarioId(item.id); setPlaying(false); }}><span>{item.index}</span><b>{item.state}</b><strong>{item.name}</strong><i /></button>)}</div>
      </section>

      <section className="aura-privacy-story section-pad">
        <div className="aura-privacy-copy"><div className="section-label"><span>02</span><span>Privacy architecture</span></div><p className="eyebrow">Context without surveillance</p><h2>It understands<br />a room. Never you.</h2><p>Raw signals are interpreted inside Aura and published as restrained room states. There is no optical path, microphone, identity model or household recording to protect later.</p><div className="aura-privacy-switch" role="tablist" aria-label="Aura data view"><button type="button" role="tab" aria-selected={privacyView === "signals"} className={privacyView === "signals" ? "is-active" : ""} onClick={() => setPrivacyView("signals")}><span>01</span>Signals</button><button type="button" role="tab" aria-selected={privacyView === "meaning"} className={privacyView === "meaning" ? "is-active" : ""} onClick={() => setPrivacyView("meaning")}><span>02</span>Meaning</button></div></div>
        <div className={`aura-privacy-diagram is-${privacyView}`}>
          <div className="aura-privacy-sensor"><img loading="lazy" decoding="async" src="/images/aura-isolated.webp" alt="Aura sensor" /><i /><i /><i /></div>
          <div className="aura-privacy-inputs"><span>ROOM INPUTS</span>{[["RADAR", "0.8 MM"], ["DAYLIGHT", "312 LX"], ["COMFORT", "21.8 °C"], ["AIR TREND", "STABLE"]].map(([label, value]) => <div key={label}><i /><b>{label}</b><strong>{value}</strong></div>)}</div>
          <div className="aura-privacy-output"><span>PUBLISHED MEANING</span><strong>{privacyView === "signals" ? "ENCRYPTED SIGNAL SET" : "PRESENT / STILL"}</strong><p>{privacyView === "signals" ? "Temporary sensor values · no personal content" : "One useful room state · identity remains unknown"}</p></div>
          <div className="aura-never-captured"><span>NEVER CAPTURED</span><div>{["IMAGE", "AUDIO", "IDENTITY", "CLOUD VIDEO"].map((item) => <p key={item}><i>×</i>{item}<b>NONE</b></p>)}</div></div>
        </div>
      </section>

      <section className="aura-coverage-planner section-pad">
        <div className="aura-coverage-head"><div className="section-label"><span>03</span><span>Coverage planner</span></div><div><p className="eyebrow eyebrow-light">Designed before the ceiling closes</p><h2>One quiet field.<br />Precisely placed.</h2></div><p>Adjust the ceiling height and room profile. Coverage is resolved with furniture, doors and quiet-use positions—not by dropping symbols onto a plan.</p></div>
        <div className="aura-coverage-console">
          <div className={`aura-coverage-plan room-${room.id}`}>
            <div className="aura-plan-grid" /><div className="aura-plan-boundary"><span>{room.name.toUpperCase()} / {room.label}</span><i /><i /><i /><i /></div>
            {Array.from({ length: room.sensors }, (_, index) => <div className={`aura-plan-sensor sensor-${index + 1}`} key={index}><img loading="lazy" decoding="async" src="/images/aura-isolated.webp" alt="" /><i /><i /><i /><span>A0{index + 1}</span></div>)}
            <div className="aura-plan-furniture"><i /><i /><i /><b /></div><div className="aura-plan-scale"><i /><span>{room.width.toFixed(1)} M</span><i /></div>
          </div>
          <aside className="aura-planner-controls"><div><span>ROOM / COVERAGE</span><b>{coverage.toFixed(1)} M RADIUS</b></div><strong>{ceilingHeight.toFixed(1)}<sup>M</sup></strong><h3>Finished ceiling height</h3><label><span>HEIGHT / 2.4—4.0 M</span><b>{ceilingHeight.toFixed(1)} M</b><input type="range" min="2.4" max="4" step="0.1" value={ceilingHeight} onChange={(event) => setCeilingHeight(Number(event.target.value))} /></label><div className="aura-room-profiles"><span>ROOM PROFILE</span>{roomProfiles.map((item) => <button type="button" key={item.id} className={item.id === room.id ? "is-active" : ""} onClick={() => setRoomId(item.id)}><i />{item.name}<b>{item.sensors} × AURA</b></button>)}</div><div className="aura-mount-choice"><span>MOUNTING</span><div>{(["flush", "surface"] as const).map((item) => <button type="button" key={item} className={mount === item ? "is-active" : ""} onClick={() => setMount(item)}>{item}</button>)}</div></div><dl><div><dt>DIAMETER</dt><dd>Ø 82 MM</dd></div><div><dt>VISIBLE DEPTH</dt><dd>{mount === "flush" ? "2" : "18"} MM</dd></div><div><dt>DESIGN RADIUS</dt><dd>{coverage.toFixed(1)} M</dd></div><div><dt>SENSORS</dt><dd>{room.sensors}</dd></div></dl></aside>
        </div>
      </section>

      <section className="aura-anatomy section-pad">
        <div className="aura-anatomy-head"><div className="section-label"><span>04</span><span>Product anatomy</span></div><div><p className="eyebrow">Five camera-free layers</p><h2>Less hardware.<br />More context.</h2></div><ExplodeToggle exploded={exploded} onToggle={() => setExploded((value) => !value)} assembleLabel="Assemble Aura" separateLabel="Separate layers" /></div>
        <div className="aura-anatomy-body"><div className={`aura-exploded-object${exploded ? " is-exploded" : ""}`} aria-hidden="true"><div className="aura-disc-stack">{auraLayers.map(([index, title], layerIndex) => <div className={`aura-hardware-disc disc-${layerIndex + 1}`} key={index} style={{ "--aura-layer": layerIndex } as CSSProperties}><span>{index} / {title.toUpperCase()}</span><i /><b /></div>)}</div><div className="aura-anatomy-depth"><span>18 MM</span><i /></div></div><LayerList layers={auraLayers} className="aura-anatomy-list" /></div>
      </section>

      <section className="aura-spec-library section-pad"><div className="aura-spec-head"><div className="section-label"><span>05</span><span>Specification library</span></div><h2>Everything sensed.<br />Nothing excessive.</h2><p>Indicative studio-series specifications. Final coverage, mounting and integration are confirmed against the reflected ceiling plan and room use.</p></div><div className="aura-spec-console"><div className="aura-spec-tabs" role="tablist" aria-label="Aura specification category">{(Object.keys(auraSpecifications) as AuraSpecGroup[]).map((group, index) => <button type="button" role="tab" aria-selected={group === specGroup} key={group} className={group === specGroup ? "is-active" : ""} onClick={() => setSpecGroup(group)}><span>0{index + 1}</span><b>{group}</b></button>)}</div><div className="aura-spec-table" key={specGroup}>{auraSpecifications[specGroup].map(([label, value], index) => <div key={label} style={{ animationDelay: `${index * 45}ms` }}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="aura-spec-meta"><span>MODEL / AUR-02</span><span>REVISION / STUDIO 2026.2</span><span>PRIVACY / CAMERA-FREE</span></div></div></section>

      <section className="related-products section-pad aura-related"><div className="section-head collection-head"><div className="section-label"><span>06</span><span>Explore the system</span></div><h2>Designed together.</h2></div><ProductCollection compact /></section>
      <ConsultationCta />
    </div>
  );
}
