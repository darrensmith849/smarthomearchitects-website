"use client";

import Link from "next/link";
import { useExperienceExit } from "./nav-return";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

const audioModes = [
  { id: "reference", name: "Reference", level: 46, bass: 48, width: 82, focus: { x: 52, y: 59 }, source: "LOSSLESS / 24-BIT", description: "A precise stereo image settles around the principal seat, with architectural channels adding only the room the recording asks for." },
  { id: "gathering", name: "Gathering", level: 34, bass: 38, width: 100, focus: { x: 50, y: 48 }, source: "HOUSE MIX / LIVE", description: "Even coverage reaches the lounge, bar and courtyard without any one speaker becoming the centre of attention." },
  { id: "intimate", name: "Intimate", level: 25, bass: 27, width: 62, focus: { x: 40, y: 66 }, source: "ANALOG / VINYL", description: "The room falls away to a warm near-field presentation around the sunken sofa and its quietest listening position." },
  { id: "immersive", name: "Immersive", level: 52, bass: 61, width: 94, focus: { x: 55, y: 54 }, source: "SPATIAL / 9.2.4", description: "Concealed height, surround and low-frequency channels build one continuous field around the entire conversation pit." },
] as const;

const speakerPositions = [
  { x: 18, y: 25, type: "architectural" }, { x: 82, y: 25, type: "architectural" },
  { x: 24, y: 72, type: "reference" }, { x: 76, y: 72, type: "reference" },
  { x: 38, y: 16, type: "concealed" }, { x: 62, y: 16, type: "concealed" },
  { x: 36, y: 86, type: "concealed" }, { x: 64, y: 86, type: "concealed" },
] as const;

const focusPresets = [
  { name: "Sofa", x: 52, y: 63 },
  { name: "Social", x: 50, y: 49 },
  { name: "Bar", x: 76, y: 42 },
] as const;

type ZoneName = "salon" | "courtyard" | "bar" | "gallery";

export function AudioAtelier() {
  const exit = useExperienceExit();
  const [view, setView] = useState<"salon" | "field">("salon");
  const [modeId, setModeId] = useState<(typeof audioModes)[number]["id"]>("reference");
  const [level, setLevel] = useState(46);
  const [bass, setBass] = useState(48);
  const [focus, setFocus] = useState({ x: 52, y: 59 });
  const [zones, setZones] = useState<Record<ZoneName, boolean>>({ salon: true, courtyard: false, bar: false, gallery: false });
  const [touring, setTouring] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mode = audioModes.find((item) => item.id === modeId) ?? audioModes[0];

  useEffect(() => {
    if (!touring || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % focusPresets.length;
      setFocus({ x: focusPresets[index].x, y: focusPresets[index].y });
    }, 2700);
    return () => window.clearInterval(timer);
  }, [touring]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let request = 0;

    const draw = (time = 0) => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * ratio));
      const height = Math.max(1, Math.round(rect.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, rect.width, rect.height);
      const fx = rect.width * focus.x / 100;
      const fy = rect.height * focus.y / 100;
      const energy = .16 + level / 360;

      speakerPositions.forEach((speaker, index) => {
        const sx = rect.width * speaker.x / 100;
        const sy = rect.height * speaker.y / 100;
        const angle = Math.atan2(fy - sy, fx - sx);
        const spread = 6 + mode.width / 7;
        const distance = Math.hypot(fx - sx, fy - sy);
        const perpendicular = angle + Math.PI / 2;
        const gradient = context.createLinearGradient(sx, sy, fx, fy);
        gradient.addColorStop(0, `rgba(205,155,104,${energy})`);
        gradient.addColorStop(1, "rgba(205,155,104,0)");
        context.beginPath();
        context.moveTo(sx, sy);
        context.lineTo(fx + Math.cos(perpendicular) * spread, fy + Math.sin(perpendicular) * spread);
        context.lineTo(fx - Math.cos(perpendicular) * spread, fy - Math.sin(perpendicular) * spread);
        context.closePath();
        context.fillStyle = gradient;
        context.fill();

        context.beginPath();
        context.moveTo(sx, sy);
        context.lineTo(fx, fy);
        context.strokeStyle = `rgba(225,183,134,${.17 + level / 430})`;
        context.lineWidth = .65;
        context.setLineDash([2, 6]);
        context.stroke();
        context.setLineDash([]);

        const progress = ((time / (2600 - level * 11)) + index / speakerPositions.length) % 1;
        const px = sx + (fx - sx) * progress;
        const py = sy + (fy - sy) * progress;
        context.beginPath();
        context.arc(px, py, 1.3 + bass / 70, 0, Math.PI * 2);
        context.fillStyle = "rgba(246,214,174,.75)";
        context.fill();
        if (distance < 1) return;
      });
      if (!reducedMotion) request = window.requestAnimationFrame(draw);
    };
    draw();
    const observer = new ResizeObserver(() => { if (reducedMotion) draw(); });
    observer.observe(canvas);
    return () => { observer.disconnect(); window.cancelAnimationFrame(request); };
  }, [focus, level, bass, mode.width]);

  const chooseMode = (id: (typeof audioModes)[number]["id"]) => {
    const next = audioModes.find((item) => item.id === id) ?? audioModes[0];
    setModeId(next.id); setLevel(next.level); setBass(next.bass); setFocus(next.focus); setTouring(false);
    if (next.id === "gathering") setZones({ salon: true, courtyard: true, bar: true, gallery: true });
    else if (next.id === "immersive") setZones({ salon: true, courtyard: false, bar: true, gallery: false });
    else setZones({ salon: true, courtyard: false, bar: false, gallery: false });
  };

  const placeFocus = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTouring(false);
    setFocus({ x: Math.min(92, Math.max(8, (event.clientX - rect.left) / rect.width * 100)), y: Math.min(90, Math.max(10, (event.clientY - rect.top) / rect.height * 100)) });
  };

  const style = { "--audio-level": `${level / 80}`, "--audio-bass": `${bass / 100}`, "--focus-x": `${focus.x}%`, "--focus-y": `${focus.y}%` } as CSSProperties;

  return (
    <div className={`audio-atelier view-${view} mode-${mode.id}`} style={style}>
      <header className="audio-atelier-topbar">
        <Link className="audio-atelier-brand" href="/"><i /><span>Smart Home Architects</span></Link>
        <div className="audio-view-switch" role="tablist" aria-label="Audio Atelier view">
          <button type="button" role="tab" aria-selected={view === "salon"} className={view === "salon" ? "is-active" : ""} onClick={() => setView("salon")}><span>01</span>Salon</button>
          <button type="button" role="tab" aria-selected={view === "field"} className={view === "field" ? "is-active" : ""} onClick={() => setView("field")}><span>02</span>Sound field</button>
        </div>
        <div className="audio-atelier-links"><Link href="/services/audio">Audio, in writing</Link><Link href="/experience/climate-atelier">Climate atelier</Link><Link className="audio-atelier-exit" href={exit.href} onClick={exit.onClick} aria-label="Close Audio Atelier">×</Link></div>
      </header>

      <main className="audio-atelier-stage">
        {view === "salon" ? (
          <section className="audio-salon-view">
            <img decoding="async" src="/images/audio-atelier-salon.webp" alt="Double-height private listening salon opening to an internal courtyard" />
            <div className="audio-salon-wash" />
            <div className="audio-salon-copy"><p>ARCHITECTURAL AUDIO / SALON A01</p><h1>Every seat<br />at the centre.</h1><span>Reference sound · concealed intelligence</span></div>
            <div className="audio-now-playing"><i className="audio-play">▶</i><div><span>NOW PLAYING / LOSSLESS</span><strong>Evening Study No. 04</strong><small>Private library · 24-bit / 96 kHz</small></div><div className="audio-equalizer" aria-hidden="true">{Array.from({ length: 13 }, (_, index) => <i key={index} style={{ "--bar-delay": `${index * -.11}s`, "--bar-height": `${35 + (index * 17) % 62}%` } as CSSProperties} />)}</div></div>
          </section>
        ) : (
          <section className="audio-field-view">
            <div className="audio-field-heading"><span>PLAN A01 / LIVE FIELD</span><h1>Place the<br />sound.</h1><p>Tap anywhere in the plan. The room’s distributed array recalculates timing, level and low-frequency alignment around you.</p></div>
            <div className="audio-plan-shell">
              <div className="audio-plan-courtyard"><span>COURTYARD</span>{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</div>
              <div className="audio-plan-room" onPointerDown={placeFocus} role="application" aria-label="Interactive salon plan. Tap to move the listening focus.">
                <canvas ref={canvasRef} aria-hidden="true" />
                <span className="audio-room-label">SALON / 84 M²</span>
                <div className="audio-plan-art" />
                <div className="audio-plan-sofa sofa-one" /><div className="audio-plan-sofa sofa-two" /><div className="audio-plan-sofa sofa-three" />
                <div className="audio-plan-table" />
                <div className="audio-plan-bar"><span>BAR</span>{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</div>
                {speakerPositions.map((speaker, index) => <div className={`audio-plan-speaker ${speaker.type}`} key={index} style={{ left: `${speaker.x}%`, top: `${speaker.y}%` }}><i /><span>{speaker.type === "reference" ? `R${index - 1}` : `A${index + 1}`}</span></div>)}
                <div className="audio-focus-point"><i /><b /><span>LISTENING FOCUS<br />{focus.x.toFixed(0)} / {focus.y.toFixed(0)}</span></div>
              </div>
              <div className="audio-plan-legend"><span><i />REFERENCE</span><span><i />CONCEALED ARRAY</span><span><i />ACTIVE FOCUS</span><b>CLICK PLAN TO REPOSITION</b></div>
            </div>
          </section>
        )}

        <aside className="audio-atelier-controls" aria-label="Audio controls">
          <div className="audio-controls-head"><span>SALON / A01</span><b>{mode.source}</b></div>
          <div className="audio-output"><strong>{level}</strong><span>dB<br />ROOM LEVEL</span><i /></div>
          <h2>{mode.name}</h2><p>{mode.description}</p>
          <div className="audio-mode-buttons">{audioModes.map((item, index) => <button type="button" key={item.id} className={item.id === mode.id ? "is-active" : ""} aria-pressed={item.id === mode.id} onClick={() => chooseMode(item.id)}><span>0{index + 1}</span><b>{item.name}</b><i /></button>)}</div>
          <label className="audio-control-slider"><span>MASTER LEVEL</span><b>{level} dB</b><input type="range" min="0" max="80" value={level} onChange={(event) => setLevel(Number(event.target.value))} /></label>
          <label className="audio-control-slider"><span>LOW-FREQUENCY ENERGY</span><b>{bass}%</b><input type="range" min="0" max="100" value={bass} onChange={(event) => setBass(Number(event.target.value))} /></label>
          <div className="audio-focus-presets"><span>LISTENING FOCUS</span><div>{focusPresets.map((item) => <button type="button" key={item.name} onClick={() => { setFocus({ x: item.x, y: item.y }); setTouring(false); }}>{item.name}</button>)}</div></div>
          <div className="audio-zone-routing"><div><span>ZONE ROUTING</span><b>{Object.values(zones).filter(Boolean).length} / 4 ACTIVE</b></div><div>{(Object.keys(zones) as ZoneName[]).map((zone) => <button type="button" key={zone} className={zones[zone] ? "is-active" : ""} aria-pressed={zones[zone]} onClick={() => setZones((current) => ({ ...current, [zone]: !current[zone] }))}><i />{zone}</button>)}</div></div>
          <button className={`audio-tour${touring ? " is-playing" : ""}`} type="button" onClick={() => setTouring((value) => !value)}><span>{touring ? "PAUSE LISTENING TOUR" : "WALK THE LISTENING FIELD"}</span><b>{touring ? "Ⅱ" : "▶"}</b></button>
        </aside>

        <footer className="audio-atelier-footer"><div><span>ACTIVE SCENE</span><strong>{mode.name}</strong></div><dl><div><dt>LEVEL</dt><dd>{level} dB</dd></div><div><dt>BASS</dt><dd>{bass}%</dd></div><div><dt>ZONES</dt><dd>{Object.values(zones).filter(Boolean)} / 4</dd></div></dl><Link href="/experience/climate-atelier"><span>RETURN TO CLIMATE ATELIER</span><b>→</b></Link></footer>
      </main>
    </div>
  );
}
