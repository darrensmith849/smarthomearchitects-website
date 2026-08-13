"use client";

import Link from "next/link";
import { useExperienceExit } from "./nav-return";
import { useEffect, useState, type CSSProperties } from "react";

const climateModes = [
  { id: "comfort", name: "Balanced", temperature: 22, humidity: 47, co2: 520, particles: 3, fan: 28, slab: 24, description: "Silent radiant warmth and low-velocity fresh air hold the room without announcing the system." },
  { id: "sleep", name: "Sleep", temperature: 19.5, humidity: 50, co2: 560, particles: 2, fan: 18, slab: 20, description: "The pavilion cools gently, fan velocity falls and fresh air continues beneath the threshold of hearing." },
  { id: "purge", name: "Air flush", temperature: 20.5, humidity: 44, co2: 410, particles: 1, fan: 78, slab: 19, description: "A brief high-air-change cycle clears the room, then hands control back to the quieter comfort layer." },
  { id: "away", name: "Away", temperature: 17, humidity: 48, co2: 440, particles: 2, fan: 12, slab: 17, description: "The envelope is protected at minimum energy while humidity and air quality remain continuously watched." },
] as const;

export function ClimateAtelier() {
  const exit = useExperienceExit();
  const [view, setView] = useState<"room" | "section">("room");
  const [modeId, setModeId] = useState<(typeof climateModes)[number]["id"]>("comfort");
  const [temperature, setTemperature] = useState(22);
  const [humidity, setHumidity] = useState(47);
  const [priority, setPriority] = useState<"quiet" | "balanced" | "pure">("balanced");
  const [playing, setPlaying] = useState(false);
  const mode = climateModes.find((item) => item.id === modeId) ?? climateModes[0];

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setModeId((current) => {
      const index = climateModes.findIndex((item) => item.id === current);
      const next = climateModes[(index + 1) % climateModes.length];
      setTemperature(next.temperature);
      setHumidity(next.humidity);
      return next.id;
    }), 3800);
    return () => window.clearInterval(timer);
  }, [playing]);

  const chooseMode = (id: (typeof climateModes)[number]["id"]) => {
    const next = climateModes.find((item) => item.id === id) ?? climateModes[0];
    setPlaying(false);
    setModeId(next.id);
    setTemperature(next.temperature);
    setHumidity(next.humidity);
  };

  const climateStyle = {
    "--comfort-ratio": `${(temperature - 16) / 10}`,
    "--air-opacity": `${0.3 + mode.fan / 130}`,
    "--air-speed": `${Math.max(1.8, 5.2 - mode.fan / 22)}s`,
  } as CSSProperties;

  return (
    <div className={`climate-atelier view-${view} mode-${mode.id}`} style={climateStyle}>
      <div className="climate-atelier-topbar">
        <Link className="climate-atelier-brand" href="/"><i /><span>Smart Home Architects</span></Link>
        <div className="climate-view-switch" role="tablist" aria-label="Climate Atelier view">
          <button type="button" role="tab" aria-selected={view === "room"} className={view === "room" ? "is-active" : ""} onClick={() => setView("room")}><span>01</span>Room</button>
          <button type="button" role="tab" aria-selected={view === "section"} className={view === "section" ? "is-active" : ""} onClick={() => setView("section")}><span>02</span>Air section</button>
        </div>
        <div className="climate-atelier-links"><Link href="/services/climate">Climate, in writing</Link><Link href="/experience/shading-atelier">Shading atelier</Link><Link className="climate-atelier-exit" href={exit.href} onClick={exit.onClick} aria-label="Close Climate Atelier">×</Link></div>
      </div>

      <section className="climate-atelier-stage">
        {view === "room" ? (
          <div className="climate-room-view">
            <img decoding="async" src="/images/climate-atelier-pavilion.webp" alt="Serene garden pavilion with concealed climate systems" />
            <div className="climate-room-wash" />
            <div className="climate-room-copy"><p>COMFORT / AIR / SILENCE</p><h1>Perfect air.<br />Nothing to see.</h1><span>Garden pavilion · Zone C04</span></div>
            <div className="climate-room-sense"><span>LOCAL SENSOR / 04</span><strong>{temperature.toFixed(1)}<sup>°C</sup></strong><p><i />AIR QUALITY / EXCELLENT</p></div>
          </div>
        ) : (
          <div className="climate-section-view">
            <div className="climate-section-heading"><span>SECTION C04 / LIVE MODEL</span><h1>Comfort,<br />in section.</h1><p>Fresh air arrives above the occupied zone. Radiant surfaces do the quiet work below.</p></div>
            <div className="climate-cross-section" aria-label="Interactive room climate section">
              <div className="climate-outside"><span>OUTSIDE</span><b>11.8°C</b><i /><i /><i /></div>
              <div className="climate-building">
                <div className="climate-roof"><span>SUPPLY / {mode.fan}%</span><i /></div>
                <div className="climate-glazing"><i /><i /><i /></div>
                <div className="climate-room-zone">
                  <span className="climate-zone-label">OCCUPIED ZONE / {temperature.toFixed(1)}°C</span>
                  <div className="climate-daybed"><i /><b /></div>
                  <div className="climate-section-tree"><i /><i /><i /><b /></div>
                  <div className="climate-sensor-node"><i /><span>CO₂<br />{mode.co2} PPM</span></div>
                  <div className="climate-air-loop">{Array.from({ length: 11 }, (_, index) => <i key={index} style={{ "--air-delay": `${index * -0.34}s` } as CSSProperties} />)}</div>
                </div>
                <div className="climate-return"><i /><span>RETURN</span></div>
                <div className="climate-radiant"><span>RADIANT SLAB / {mode.slab}°C</span>{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div>
                <div className="climate-service-void"><span>LOW-TEMPERATURE WATER</span><b /><b /><b /></div>
              </div>
              <div className="climate-section-legend"><span><i />FRESH AIR</span><span><i />RADIANT ENERGY</span><span><i />SENSING</span></div>
            </div>
          </div>
        )}

        <aside className="climate-atelier-controls" aria-label="Climate controls">
          <div className="climate-controls-head"><span>ZONE / C04</span><b>LOCAL / LIVE</b></div>
          <strong>{temperature.toFixed(1)}<sup>°C</sup></strong>
          <h2>{mode.name}</h2>
          <p>{mode.description}</p>
          <div className="climate-mode-buttons">{climateModes.map((item, index) => <button type="button" key={item.id} className={item.id === mode.id ? "is-active" : ""} onClick={() => chooseMode(item.id)} aria-pressed={item.id === mode.id}><span>0{index + 1}</span><b>{item.name}</b><i /></button>)}</div>
          <label className="climate-control-slider"><span>TEMPERATURE SETPOINT</span><b>{temperature.toFixed(1)}°C</b><input type="range" min="16" max="26" step="0.5" value={temperature} onChange={(event) => setTemperature(Number(event.target.value))} /></label>
          <label className="climate-control-slider"><span>HUMIDITY TARGET</span><b>{humidity}%</b><input type="range" min="35" max="60" value={humidity} onChange={(event) => setHumidity(Number(event.target.value))} /></label>
          <div className="climate-priority"><span>AIR QUALITY PRIORITY</span><div>{(["quiet","balanced","pure"] as const).map((item) => <button type="button" key={item} className={priority === item ? "is-active" : ""} onClick={() => setPriority(item)}>{item}</button>)}</div></div>
          <dl className="climate-live-metrics"><div><dt>CO₂</dt><dd>{mode.co2} PPM</dd></div><div><dt>PM2.5</dt><dd>{mode.particles} μG/M³</dd></div><div><dt>AIRFLOW</dt><dd>{mode.fan}%</dd></div><div><dt>NOISE</dt><dd>{mode.fan > 50 ? "28" : "19"} DBA</dd></div></dl>
          <button className={`climate-sequence${playing ? " is-playing" : ""}`} type="button" onClick={() => setPlaying((value) => !value)}><span>{playing ? "PAUSE COMFORT CYCLE" : "RUN COMFORT CYCLE"}</span><b>{playing ? "Ⅱ" : "▶"}</b></button>
        </aside>

        <div className="climate-atelier-footer"><div><span>ACTIVE MODE</span><strong>{mode.name}</strong></div><dl><div><dt>SETPOINT</dt><dd>{temperature.toFixed(1)}°C</dd></div><div><dt>HUMIDITY</dt><dd>{humidity}%</dd></div><div><dt>CO₂</dt><dd>{mode.co2} PPM</dd></div></dl><Link href="/experience/shading-atelier"><span>RETURN TO SHADING ATELIER</span><b>→</b></Link></div>
      </section>
    </div>
  );
}
