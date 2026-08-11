"use client";

import Link from "next/link";
import { useExperienceExit } from "./nav-return";
import { useEffect, useState, type CSSProperties } from "react";

const waterModes = [
  { id: "balanced", name: "Balanced", tank: 78, pool: 26, irrigation: 42, capture: 64, description: "Stored rainwater, pool balance and soil moisture work together before the estate asks anything from the mains." },
  { id: "summer", name: "Summer", tank: 64, pool: 27.5, irrigation: 68, capture: 22, description: "Irrigation moves into the cool edges of the day while evaporation and pool temperature are held in balance." },
  { id: "capture", name: "Rain capture", tank: 91, pool: 24, irrigation: 0, capture: 94, description: "Gardens pause while roofs, rills and first-flush filters direct clean rainfall into the underground reserve." },
  { id: "away", name: "Away", tank: 86, pool: 22, irrigation: 18, capture: 46, description: "The landscape stays protected at minimum demand, with continuous leak isolation and water-quality circulation." },
] as const;

const waterNodes = [
  { id: "roof", name: "Roof catchment", status: "Receiving", detail: "412 m² of concealed collection channels feed the first-flush line.", x: 18, y: 20 },
  { id: "filter", name: "Filtration", status: "Clear", detail: "Leaf separation, first flush and fine filtration happen before storage.", x: 37, y: 36 },
  { id: "tank", name: "Rain reserve", status: "78%", detail: "Two linked underground tanks hold 36.4 kL beneath the arrival terrace.", x: 38, y: 74 },
  { id: "pool", name: "Natural pool", status: "Balanced", detail: "A low-energy circulation loop moves water through the planted bio-filter edge.", x: 66, y: 53 },
  { id: "garden", name: "Landscape", status: "Moisture-led", detail: "Four garden zones open only when soil and weather data agree.", x: 80, y: 76 },
  { id: "home", name: "Residence", status: "Protected", detail: "Pressure, flow and isolation valves watch each domestic branch locally.", x: 72, y: 20 },
  { id: "mains", name: "Mains backup", status: "Standby", detail: "The municipal connection remains isolated until stored supply requires support.", x: 10, y: 78 },
] as const;

const cycleSteps = ["roof", "filter", "tank", "pool", "garden", "home"] as const;
type WaterNodeId = (typeof waterNodes)[number]["id"];
type GardenZone = "fynbos" | "olive grove" | "roof herbs" | "orchard";

export function WaterLandscapeAtelier() {
  const exit = useExperienceExit();
  const [view, setView] = useState<"garden" | "system">("garden");
  const [modeId, setModeId] = useState<(typeof waterModes)[number]["id"]>("balanced");
  const [tankLevel, setTankLevel] = useState(78);
  const [poolTemperature, setPoolTemperature] = useState(26);
  const [irrigation, setIrrigation] = useState(42);
  const [zones, setZones] = useState<Record<GardenZone, boolean>>({ fynbos: true, "olive grove": true, "roof herbs": false, orchard: false });
  const [selectedNode, setSelectedNode] = useState<WaterNodeId>("tank");
  const [cycleIndex, setCycleIndex] = useState(-1);
  const [cycling, setCycling] = useState(false);
  const mode = waterModes.find((item) => item.id === modeId) ?? waterModes[0];
  const node = waterNodes.find((item) => item.id === selectedNode) ?? waterNodes[2];

  useEffect(() => {
    if (!cycling) return;
    if (cycleIndex >= cycleSteps.length - 1) {
      const finish = window.setTimeout(() => setCycling(false), 1600);
      return () => window.clearTimeout(finish);
    }
    const timer = window.setTimeout(() => setCycleIndex((current) => current + 1), 1250);
    return () => window.clearTimeout(timer);
  }, [cycling, cycleIndex]);

  // Same shape as the security observatory: the selected node follows the
  // cycle, but a click can also set it directly.
  const [renderedIndex, setRenderedIndex] = useState(cycleIndex);
  if (cycleIndex !== renderedIndex) {
    setRenderedIndex(cycleIndex);
    if (cycleIndex >= 0) setSelectedNode(cycleSteps[cycleIndex]);
  }

  const chooseMode = (id: (typeof waterModes)[number]["id"]) => {
    const next = waterModes.find((item) => item.id === id) ?? waterModes[0];
    setModeId(next.id); setTankLevel(next.tank); setPoolTemperature(next.pool); setIrrigation(next.irrigation); setCycling(false); setCycleIndex(-1);
    if (next.id === "capture") setZones({ fynbos: false, "olive grove": false, "roof herbs": false, orchard: false });
    if (next.id === "summer") setZones({ fynbos: true, "olive grove": true, "roof herbs": true, orchard: true });
    if (next.id === "away") setZones({ fynbos: true, "olive grove": false, "roof herbs": false, orchard: false });
  };

  const runCycle = () => { setView("system"); setCycleIndex(0); setSelectedNode("roof"); setCycling(true); };
  const style = { "--tank-level": `${tankLevel}%`, "--water-flow": `${.25 + mode.capture / 135}`, "--irrigation-flow": `${irrigation / 100}` } as CSSProperties;

  return (
    <div className={`water-atelier view-${view} mode-${mode.id}`} style={style}>
      <header className="water-topbar">
        <Link className="water-brand" href="/"><i /><span>Smart Home Architects</span></Link>
        <div className="water-view-switch" role="tablist" aria-label="Water and Landscape Atelier view">
          <button type="button" role="tab" aria-selected={view === "garden"} className={view === "garden" ? "is-active" : ""} onClick={() => setView("garden")}><span>01</span>Garden</button>
          <button type="button" role="tab" aria-selected={view === "system"} className={view === "system" ? "is-active" : ""} onClick={() => setView("system")}><span>02</span>Water system</button>
        </div>
        <div className="water-links"><Link href="/experience/security-observatory">Security observatory</Link><Link className="water-exit" href={exit.href} onClick={exit.onClick} aria-label="Close Water and Landscape Atelier">×</Link></div>
      </header>

      <main className="water-stage">
        {view === "garden" ? (
          <section className="water-garden-view">
            <img decoding="async" src="/images/water-landscape-atelier.webp" alt="Water-wise indigenous garden surrounding a long natural swimming pool" />
            <div className="water-garden-wash" />
            <div className="water-garden-copy"><p>WATER / LANDSCAPE / RESILIENCE</p><h1>Every drop<br />has a purpose.</h1><span>Fynbos estate · Water loop W01</span></div>
            <div className="water-garden-status"><div className="water-mini-tank"><i /></div><div><span>RAIN RESERVE / LIVE</span><strong>{tankLevel}% stored</strong><small>28.4 kL available · mains support 3%</small></div></div>
          </section>
        ) : (
          <section className="water-system-view">
            <div className="water-system-heading"><span>LOOP W01 / LIVE MODEL</span><h1>Water,<br />in circulation.</h1><p>Select any component to follow the journey from roof and reserve to pool, home and landscape.</p></div>
            <div className={`water-system-map${cycling ? " is-cycling" : ""}`}>
              <div className="water-system-ground"><span>BELOW GROUND / SERVICE TERRACE</span></div>
              <div className="water-pipe pipe-roof-filter">{Array.from({ length: 4 }, (_, index) => <i key={index} />)}</div>
              <div className="water-pipe pipe-filter-tank">{Array.from({ length: 4 }, (_, index) => <i key={index} />)}</div>
              <div className="water-pipe pipe-tank-pool">{Array.from({ length: 4 }, (_, index) => <i key={index} />)}</div>
              <div className="water-pipe pipe-tank-garden">{Array.from({ length: 4 }, (_, index) => <i key={index} />)}</div>
              <div className="water-pipe pipe-tank-home">{Array.from({ length: 4 }, (_, index) => <i key={index} />)}</div>
              <div className="water-pipe pipe-mains-tank">{Array.from({ length: 3 }, (_, index) => <i key={index} />)}</div>
              <div className="water-roof-form"><i /><i /><i /><span>412 M²</span></div>
              <div className="water-home-form"><i /><i /><i /><b /></div>
              <div className="water-pool-form"><i /><i /><span>BIO-FILTER EDGE</span></div>
              <div className="water-garden-form">{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div>
              {waterNodes.map((item, index) => <button type="button" key={item.id} className={`water-map-node node-${item.id}${selectedNode === item.id ? " is-selected" : ""}${cycleIndex === index ? " is-cycle-active" : ""}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} onClick={() => { setSelectedNode(item.id); setCycling(false); }}><i /><span>{item.name}</span><b>{item.id === "tank" ? `${tankLevel}%` : item.status}</b></button>)}
              <div className="water-node-detail"><span>SELECTED / {selectedNode.toUpperCase()}</span><strong>{node.name}</strong><p>{node.detail}</p></div>
              <div className="water-map-key"><span><i />RAINWATER</span><span><i />TREATED LOOP</span><span><i />MAINS BACKUP</span><b>SELECT A COMPONENT</b></div>
            </div>
          </section>
        )}

        <aside className="water-controls" aria-label="Water and landscape controls">
          <div className="water-controls-head"><span>WATER LOOP / W01</span><b><i />BALANCED / LIVE</b></div>
          <div className="water-reserve"><div><i /></div><strong>{tankLevel}<sup>%</sup></strong><span>RAIN RESERVE<br />{(tankLevel * .364).toFixed(1)} kL</span></div>
          <h2>{mode.name}</h2><p>{mode.description}</p>
          <div className="water-mode-buttons">{waterModes.map((item, index) => <button type="button" key={item.id} className={item.id === mode.id ? "is-active" : ""} aria-pressed={item.id === mode.id} onClick={() => chooseMode(item.id)}><span>0{index + 1}</span><b>{item.name}</b><i /></button>)}</div>
          <label className="water-control-slider"><span>POOL TEMPERATURE</span><b>{poolTemperature.toFixed(1)}°C</b><input type="range" min="18" max="30" step="0.5" value={poolTemperature} onChange={(event) => setPoolTemperature(Number(event.target.value))} /></label>
          <label className="water-control-slider"><span>IRRIGATION DEMAND</span><b>{irrigation}%</b><input type="range" min="0" max="100" value={irrigation} onChange={(event) => setIrrigation(Number(event.target.value))} /></label>
          <div className="water-zone-routing"><div><span>LANDSCAPE ZONES</span><b>{Object.values(zones).filter(Boolean).length} / 4 ACTIVE</b></div><div>{(Object.keys(zones) as GardenZone[]).map((zone) => <button type="button" key={zone} className={zones[zone] ? "is-active" : ""} aria-pressed={zones[zone]} onClick={() => setZones((current) => ({ ...current, [zone]: !current[zone] }))}><i />{zone}<b>{zones[zone] ? "ready" : "held"}</b></button>)}</div></div>
          <dl className="water-metrics"><div><dt>CAPTURE</dt><dd>{mode.capture}%</dd></div><div><dt>POOL LOOP</dt><dd>6.8 kL/H</dd></div><div><dt>LEAK STATE</dt><dd>CLEAR</dd></div><div><dt>MAINS</dt><dd>{tankLevel > 70 ? "3" : "12"}%</dd></div></dl>
          <button className={`water-cycle${cycling ? " is-playing" : ""}`} type="button" onClick={runCycle}><span>{cycling ? `FOLLOWING WATER 0${cycleIndex + 1} / 06` : "FOLLOW THE COMPLETE WATER CYCLE"}</span><b>{cycling ? "•••" : "→"}</b></button>
        </aside>

        <footer className="water-footer"><div><span>ACTIVE STRATEGY</span><strong>{mode.name}</strong></div><dl><div><dt>RESERVE</dt><dd>{tankLevel}%</dd></div><div><dt>POOL</dt><dd>{poolTemperature.toFixed(1)}°C</dd></div><div><dt>IRRIGATION</dt><dd>{irrigation}%</dd></div></dl><Link href="/experience/security-observatory"><span>RETURN TO SECURITY OBSERVATORY</span><b>→</b></Link></footer>
      </main>
    </div>
  );
}
