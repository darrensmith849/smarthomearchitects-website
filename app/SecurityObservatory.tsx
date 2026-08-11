"use client";

import Link from "next/link";
import { useExperienceExit } from "./nav-return";
import { useEffect, useState, type CSSProperties } from "react";

const securityModes = [
  { id: "home", name: "At home", points: 8, response: "Passive", light: 56, description: "The public edge is quietly watched while the house, courtyard and private garden remain visually private." },
  { id: "evening", name: "Evening", points: 11, response: "Considered", light: 72, description: "Arrival routes stay beautifully illuminated and boundary sensing becomes more attentive without changing life inside." },
  { id: "away", name: "Away", points: 16, response: "Active", light: 24, description: "The envelope, access points and service edge work together while private interior vision remains disabled." },
  { id: "night", name: "Night", points: 14, response: "Perimeter", light: 34, description: "Low-energy radar and thermal confirmation protect the exterior; movement within family zones is ignored." },
] as const;

const arrivalSteps = [
  { zone: "boundary", title: "Identity verified", detail: "Encrypted mobile credential · local" },
  { zone: "arrival", title: "Arrival path composed", detail: "Gate released · pathway at 62%" },
  { zone: "court", title: "Entrance prepared", detail: "Canopy and vestibule scenes active" },
  { zone: "house", title: "Welcome scene ready", detail: "Door released · perimeter restored" },
] as const;

const markerPositions = [
  { x: 10, y: 76 }, { x: 32, y: 67 }, { x: 51, y: 53 }, { x: 73, y: 35 },
] as const;

const sensorPoints = [
  { x: 7, y: 19, kind: "boundary" }, { x: 7, y: 48, kind: "boundary" }, { x: 8, y: 62, kind: "boundary" },
  { x: 27, y: 70, kind: "path" }, { x: 45, y: 60, kind: "path" }, { x: 60, y: 46, kind: "entry" },
  { x: 72, y: 28, kind: "envelope" }, { x: 91, y: 33, kind: "envelope" }, { x: 92, y: 76, kind: "envelope" },
  { x: 68, y: 84, kind: "garden" }, { x: 42, y: 88, kind: "garden" },
] as const;

type LayerName = "boundary" | "arrival" | "garden" | "interior";
type PlanZone = "boundary" | "arrival" | "court" | "house";

export function SecurityObservatory() {
  const exit = useExperienceExit();
  const [view, setView] = useState<"arrival" | "estate">("arrival");
  const [modeId, setModeId] = useState<(typeof securityModes)[number]["id"]>("home");
  const [privacy, setPrivacy] = useState<"private" | "balanced" | "verified">("private");
  const [layers, setLayers] = useState<Record<LayerName, boolean>>({ boundary: true, arrival: true, garden: true, interior: false });
  const [selectedZone, setSelectedZone] = useState<PlanZone>("boundary");
  const [arrivalStep, setArrivalStep] = useState(-1);
  const [simulating, setSimulating] = useState(false);
  const mode = securityModes.find((item) => item.id === modeId) ?? securityModes[0];

  useEffect(() => {
    if (!simulating) return;
    if (arrivalStep >= arrivalSteps.length - 1) {
      const finish = window.setTimeout(() => setSimulating(false), 1700);
      return () => window.clearTimeout(finish);
    }
    const timer = window.setTimeout(() => setArrivalStep((current) => current + 1), 1450);
    return () => window.clearTimeout(timer);
  }, [simulating, arrivalStep]);

  // The plan selection follows the arrival sequence, but is also set directly
  // by clicking a zone, so it stays state rather than becoming derived.
  const [renderedStep, setRenderedStep] = useState(arrivalStep);
  if (arrivalStep !== renderedStep) {
    setRenderedStep(arrivalStep);
    if (arrivalStep >= 0) setSelectedZone(arrivalSteps[arrivalStep].zone);
  }

  const chooseMode = (id: (typeof securityModes)[number]["id"]) => {
    setModeId(id); setSimulating(false); setArrivalStep(-1);
    if (id === "home") setLayers({ boundary: true, arrival: true, garden: true, interior: false });
    if (id === "evening") setLayers({ boundary: true, arrival: true, garden: true, interior: false });
    if (id === "away") setLayers({ boundary: true, arrival: true, garden: true, interior: true });
    if (id === "night") setLayers({ boundary: true, arrival: false, garden: true, interior: false });
  };

  const startArrival = () => {
    setView("estate"); setArrivalStep(0); setSimulating(true); setSelectedZone("boundary");
  };

  const marker = markerPositions[Math.max(0, arrivalStep)];
  const currentEvent = arrivalStep >= 0 ? arrivalSteps[arrivalStep] : null;
  const style = { "--security-light": `${mode.light / 100}`, "--marker-x": `${marker.x}%`, "--marker-y": `${marker.y}%` } as CSSProperties;

  return (
    <div className={`security-observatory view-${view} mode-${mode.id} privacy-${privacy}`} style={style}>
      <header className="security-topbar">
        <Link className="security-brand" href="/"><i /><span>Smart Home Architects</span></Link>
        <div className="security-view-switch" role="tablist" aria-label="Security Observatory view">
          <button type="button" role="tab" aria-selected={view === "arrival"} className={view === "arrival" ? "is-active" : ""} onClick={() => setView("arrival")}><span>01</span>Arrival</button>
          <button type="button" role="tab" aria-selected={view === "estate"} className={view === "estate" ? "is-active" : ""} onClick={() => setView("estate")}><span>02</span>Estate intelligence</button>
        </div>
        <div className="security-links"><Link href="/experience/audio-atelier">Audio atelier</Link><Link className="security-exit" href={exit.href} onClick={exit.onClick} aria-label="Close Security Observatory">×</Link></div>
      </header>

      <main className="security-stage">
        {view === "arrival" ? (
          <section className="security-arrival-view">
            <img decoding="async" src="/images/security-observatory-arrival.webp" alt="Serene illuminated entrance courtyard at blue hour" />
            <div className="security-arrival-wash" />
            <div className="security-arrival-copy"><p>SECURITY / PRIVACY / ARRIVAL</p><h1>Protected<br />by design.</h1><span>Cape estate · Boundary P01</span></div>
            <div className="security-arrival-status"><i /><div><span>ESTATE STATUS</span><strong>Everything is calm.</strong><small>{mode.points} discreet points · processing remains on site</small></div></div>
          </section>
        ) : (
          <section className="security-estate-view">
            <div className="security-estate-heading"><span>ESTATE P01 / LIVE MODEL</span><h1>Confidence,<br />in layers.</h1><p>Select any part of the estate. Every layer has its own sensing policy, response and privacy boundary.</p></div>
            <div className="security-site-plan">
              <div className="security-plan-north"><i />N</div>
              <div className="security-property-boundary" />
              <button type="button" className={`security-plan-zone zone-boundary${selectedZone === "boundary" ? " is-selected" : ""}`} onClick={() => setSelectedZone("boundary")}><span>PUBLIC EDGE</span><b>BOUNDARY</b></button>
              <button type="button" className={`security-plan-zone zone-arrival${selectedZone === "arrival" ? " is-selected" : ""}`} onClick={() => setSelectedZone("arrival")}><span>CONTROLLED ROUTE</span><b>ARRIVAL</b></button>
              <button type="button" className={`security-plan-zone zone-court${selectedZone === "court" ? " is-selected" : ""}`} onClick={() => setSelectedZone("court")}><span>PRIVATE EXTERIOR</span><b>COURT</b></button>
              <button type="button" className={`security-plan-zone zone-house${selectedZone === "house" ? " is-selected" : ""}`} onClick={() => setSelectedZone("house")}><span>NO CLOUD VISION</span><b>RESIDENCE</b></button>
              <div className="security-plan-pool"><i /></div><span className="security-pool-caption">REFLECTING COURT</span>
              <div className="security-plan-garden">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
              <div className="security-arrival-path" />
              {sensorPoints.map((point, index) => <div className={`security-sensor sensor-${point.kind}`} key={index} style={{ left: `${point.x}%`, top: `${point.y}%` }}><i /><b /><span>{index + 1}</span></div>)}
              <div className={`security-arrival-marker${simulating ? " is-moving" : ""}`}><i /><b /><span>VERIFIED ARRIVAL</span></div>
              <div className="security-privacy-mask"><i /><i /><i /><span>ARCHITECTURAL PRIVACY MASK</span></div>
              <div className="security-plan-key"><span><i />BOUNDARY RADAR</span><span><i />ACCESS</span><span><i />PRIVATE / MASKED</span><b>SELECT A ZONE TO INSPECT</b></div>
            </div>
          </section>
        )}

        <aside className="security-controls" aria-label="Security and privacy controls">
          <div className="security-controls-head"><span>ESTATE / P01</span><b><i />LOCAL / SECURE</b></div>
          <div className="security-state"><strong>All clear</strong><span>NO ACTION REQUIRED</span></div>
          <h2>{mode.name}</h2><p>{mode.description}</p>
          <div className="security-mode-buttons">{securityModes.map((item, index) => <button type="button" key={item.id} className={item.id === mode.id ? "is-active" : ""} aria-pressed={item.id === mode.id} onClick={() => chooseMode(item.id)}><span>0{index + 1}</span><b>{item.name}</b><i /></button>)}</div>
          <div className="security-privacy-policy"><span>VISION PRIVACY</span><div>{(["private", "balanced", "verified"] as const).map((item) => <button type="button" key={item} className={privacy === item ? "is-active" : ""} onClick={() => setPrivacy(item)}>{item}</button>)}</div><small>{privacy === "private" ? "Private areas are masked before analysis." : privacy === "balanced" ? "Only arrival and boundary detail is retained locally." : "Identity detail is available only after a verified event."}</small></div>
          <div className="security-layer-routing"><div><span>ACTIVE LAYERS</span><b>{Object.values(layers).filter(Boolean).length} / 4</b></div><div>{(Object.keys(layers) as LayerName[]).map((layer) => <button type="button" key={layer} className={layers[layer] ? "is-active" : ""} aria-pressed={layers[layer]} onClick={() => setLayers((current) => ({ ...current, [layer]: !current[layer] }))}><i />{layer}<b>{layer === "interior" ? "private" : "active"}</b></button>)}</div></div>
          <dl className="security-metrics"><div><dt>SENSING</dt><dd>{mode.points} PTS</dd></div><div><dt>DOORS</dt><dd>7 / 7</dd></div><div><dt>RESPONSE</dt><dd>{mode.response}</dd></div><div><dt>CLOUD VIDEO</dt><dd>ZERO</dd></div></dl>
          <div className="security-event"><span>LATEST EVENT</span><strong>{currentEvent?.title ?? "Perimeter check complete"}</strong><small>{currentEvent?.detail ?? "No unresolved events · 18:42"}</small></div>
          <button className={`security-simulate${simulating ? " is-playing" : ""}`} type="button" onClick={startArrival}><span>{simulating ? `ARRIVAL STEP 0${arrivalStep + 1} / 04` : "SIMULATE A PRIVATE ARRIVAL"}</span><b>{simulating ? "•••" : "→"}</b></button>
        </aside>

        <footer className="security-footer"><div><span>ESTATE STATUS</span><strong>Everything is calm.</strong></div><dl><div><dt>MODE</dt><dd>{mode.name}</dd></div><div><dt>ZONE</dt><dd>{selectedZone}</dd></div><div><dt>EVENTS</dt><dd>0 open</dd></div></dl><Link href="/experience/audio-atelier"><span>RETURN TO AUDIO ATELIER</span><b>→</b></Link></footer>
      </main>
    </div>
  );
}
