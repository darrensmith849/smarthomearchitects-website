"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

const shadeStates = [
  { id: "open", name: "Open view", short: "Open", image: "/images/scene-morning.webp", position: 0, openness: "100%", description: "The pocket disappears and the architecture opens completely to the horizon.", metrics: [["INTERIOR", "780 LX"], ["GLARE", "0.46 DGP"], ["SOLAR GAIN", "100%"], ["VIEW", "100%"]] },
  { id: "filtered", name: "Filtered view", short: "Filter", image: "/images/shading-atelier-filtered.webp", position: 100, openness: "5%", description: "A woven solar textile keeps the ocean legible while glare and heat fall away.", metrics: [["INTERIOR", "520 LX"], ["GLARE", "0.32 DGP"], ["SOLAR GAIN", "58%"], ["VIEW", "82%"]] },
  { id: "privacy", name: "Soft privacy", short: "Privacy", image: "/images/shading-atelier-privacy.webp", position: 100, openness: "1%", description: "A luminous privacy layer admits daylight while dissolving the exterior into silhouettes.", metrics: [["INTERIOR", "340 LX"], ["GLARE", "0.22 DGP"], ["SOLAR GAIN", "32%"], ["VIEW", "18%"]] },
  { id: "blackout", name: "Blackout", short: "Blackout", image: "/images/shading-atelier-blackout.webp", position: 100, openness: "0%", description: "Opaque textile closes the aperture as warm task and ambient light restore the room.", metrics: [["INTERIOR", "260 LX"], ["GLARE", "0.05 DGP"], ["SOLAR GAIN", "3%"], ["VIEW", "0%"]] },
] as const;

export function ShadingAtelier() {
  const [stateId, setStateId] = useState<(typeof shadeStates)[number]["id"]>("filtered");
  const [automatic, setAutomatic] = useState(true);
  const [setpoint, setSetpoint] = useState(520);
  const [privacyTime, setPrivacyTime] = useState("18:30");
  const [playing, setPlaying] = useState(false);
  const stateIndex = shadeStates.findIndex((item) => item.id === stateId);
  const state = shadeStates[stateIndex] ?? shadeStates[1];

  useEffect(() => {
    shadeStates.forEach((item) => {
      const image = new Image();
      image.src = item.image;
    });
  }, []);

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setStateId((current) => {
      const index = shadeStates.findIndex((item) => item.id === current);
      return shadeStates[(index + 1) % shadeStates.length].id;
    }), 3600);
    return () => window.clearInterval(timer);
  }, [playing]);

  const chooseState = (id: (typeof shadeStates)[number]["id"]) => {
    setPlaying(false);
    setStateId(id);
  };

  const atelierStyle = {
    "--shade-progress": `${state.position}%`,
    "--shade-filter": state.id === "blackout" ? "#37322e" : state.id === "privacy" ? "#e4e2dd" : state.id === "filtered" ? "#aaa9a4" : "#d9d7d0",
  } as CSSProperties;

  return (
    <div className={`shading-atelier is-${state.id}`} style={atelierStyle}>
      <div className="shading-atelier-topbar">
        <Link className="shading-atelier-brand" href="/"><i /><span>Smart Home Architects</span></Link>
        <div className="shading-atelier-title"><span>03</span><b>Shading atelier</b></div>
        <div className="shading-atelier-links"><Link href="/experience/live-residence">Lighting studio</Link><Link className="shading-atelier-exit" href="/" aria-label="Close Shading Atelier">×</Link></div>
      </div>

      <section className="shading-atelier-stage">
        <img decoding="async" key={state.id} src={state.image} alt={`Ocean-facing living room with shades in the ${state.name.toLowerCase()} state`} />
        <div className="shading-atelier-wash" />
        <div className="shading-atelier-copy">
          <p>DAYLIGHT / PRIVACY / VIEW</p>
          <h1>Daylight,<br />composed.</h1>
          <span>West elevation · Aperture W01</span>
        </div>

        <div className="shade-position-rail" aria-hidden="true"><span>0</span><i><b /></i><span>100</span><em>{state.position}%</em></div>

        <aside className="shading-atelier-controls" aria-label="Shading controls">
          <div className="shading-controls-head"><span>APERTURE / W01</span><b>{automatic ? "AUTO / ACTIVE" : "MANUAL"}</b></div>
          <strong>{state.name}</strong>
          <p>{state.description}</p>
          <div className="shade-state-buttons">
            {shadeStates.map((item, index) => <button type="button" key={item.id} className={item.id === state.id ? "is-active" : ""} onClick={() => chooseState(item.id)} aria-pressed={item.id === state.id}><span><i className={`shade-swatch swatch-${item.id}`} /><b>{item.short}</b></span><em>{item.openness}</em><small>0{index + 1}</small></button>)}
          </div>

          <div className="shade-auto-row"><span>AUTOMATIC SOLAR RESPONSE</span><button type="button" className={automatic ? "is-on" : ""} onClick={() => setAutomatic((value) => !value)} aria-pressed={automatic}><i /></button></div>
          <label className="shade-setpoint"><span>GLARE SETPOINT</span><b>{setpoint} LX</b><input type="range" min="300" max="900" step="10" value={setpoint} onChange={(event) => setSetpoint(Number(event.target.value))} /></label>
          <div className="shade-schedule"><span>PRIVACY SCHEDULE</span><div>{["18:00","18:30","19:00"].map((time) => <button type="button" key={time} className={privacyTime === time ? "is-active" : ""} onClick={() => setPrivacyTime(time)}>{time}</button>)}</div></div>

          <div className="shade-pocket-diagram" aria-hidden="true"><span>CONCEALED DUAL-TEXTILE POCKET</span><div><i /><i /><b /></div><em>24 V / SILENT DRIVE / LOCAL CONTROL</em></div>
          <button className={`shade-sequence-button${playing ? " is-playing" : ""}`} type="button" onClick={() => setPlaying((value) => !value)}><span>{playing ? "PAUSE DAYLIGHT SEQUENCE" : "RUN DAYLIGHT SEQUENCE"}</span><b>{playing ? "Ⅱ" : "▶"}</b></button>
        </aside>

        <div className="shading-atelier-footer">
          <div><span>CURRENT STATE</span><strong>{state.name}</strong></div>
          <dl>{state.metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <Link href="/experience/live-residence"><span>RETURN TO CONTROL STUDIO</span><b>→</b></Link>
        </div>
      </section>
    </div>
  );
}
