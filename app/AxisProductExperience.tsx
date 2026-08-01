"use client";

import { useState, type CSSProperties } from "react";
import type { Product } from "./data";

const axisScenes = [
  {
    id: "welcome",
    index: "01",
    name: "Welcome home",
    gesture: "PRESS / ZONE 01",
    description: "The hall warms first, living spaces follow and the garden remains visible. One deliberate touch replaces four separate instructions.",
    signals: [["LIGHT", "38% / 2700 K"], ["SHADES", "OPEN / COURTYARD"], ["CLIMATE", "22.0 °C / QUIET"], ["AUDIO", "LIVING / RESUME"]],
  },
  {
    id: "reading",
    index: "02",
    name: "Read",
    gesture: "PRESS / ZONE 02",
    description: "Task light rises at the chair while the surrounding room settles. Glare is removed, temperature holds and audio remains still.",
    signals: [["LIGHT", "72% / TASK"], ["SHADES", "SHEER / 18%"], ["CLIMATE", "21.5 °C / HOLD"], ["AUDIO", "SILENT"]],
  },
  {
    id: "dinner",
    index: "03",
    name: "Dinner at eight",
    gesture: "PRESS / ZONE 03",
    description: "Pendant, art and landscape light balance together. The kitchen recedes, the table becomes the centre and music crosses into dining.",
    signals: [["LIGHT", "31% / WARM"], ["SHADES", "PRIVACY / CLOSED"], ["CLIMATE", "21.0 °C / DINING"], ["AUDIO", "DINING / −28 dB"]],
  },
  {
    id: "away",
    index: "04",
    name: "House at rest",
    gesture: "HOLD / ZONE 04",
    description: "A considered departure sequence checks openings, closes the envelope and releases unnecessary loads without making the house feel abandoned.",
    signals: [["LIGHT", "OFF / PATH 8%"], ["SHADES", "SECURE"], ["CLIMATE", "18.0 °C / ECO"], ["SECURITY", "PERIMETER / SET"]],
  },
];

const assembly = [
  ["01", "Smoked-glass lens", "Optically bonded, oleophobic and tuned for a low-reflection architectural black."],
  ["02", "Pressure interface", "Four continuous sensing zones resolve intent without visible buttons or moving parts."],
  ["03", "Linear haptic engine", "A calibrated impulse confirms the command locally before the room begins to change."],
  ["04", "Shadow-gap mount", "The 1.5 mm reveal aligns the control precisely while allowing future service access."],
];

export function AxisProductExperience({ product }: { product: Product }) {
  const [sceneId, setSceneId] = useState(axisScenes[0].id);
  const [exploded, setExploded] = useState(true);
  const [finishIndex, setFinishIndex] = useState(0);
  const scene = axisScenes.find((item) => item.id === sceneId) ?? axisScenes[0];
  const finish = product.finishes[finishIndex] ?? product.finishes[0];
  const finishStyle = { "--axis-finish": finish.color } as CSSProperties;

  return (
    <>
      <section className={`axis-scene-lab is-${scene.id}`}>
        <div className="axis-lab-intro">
          <div className="section-label section-label-light"><span>01</span><span>Scene laboratory</span></div>
          <div><p className="eyebrow eyebrow-light">Four touch zones · Whole-room response</p><h2>Touch one line.<br />Move the room.</h2></div>
          <p>Axis is not a collection of switches. Each zone recalls a coordinated architectural state across light, shade, comfort, sound and security.</p>
        </div>

        <div className="axis-lab-console">
          <div className="axis-object-stage">
            <div className="axis-object-grid" aria-hidden="true"><i /><i /><i /><i /></div>
            <img decoding="async" src={product.image} alt="Axis scene keypad in architectural bronze and smoked glass" />
            <div className="axis-touch-map" aria-label="Choose an Axis touch zone">
              {axisScenes.map((item) => <button key={item.id} type="button" className={item.id === scene.id ? "is-active" : ""} onClick={() => setSceneId(item.id)} aria-label={`${item.index}: ${item.name}`} aria-pressed={item.id === scene.id}><span>{item.index}</span></button>)}
            </div>
            <p className="axis-object-caption"><span>AXIS / FRONT SURFACE</span><b>88 × 88 MM</b></p>
          </div>

          <div className="axis-scene-readout" aria-live="polite">
            <div><span>SCENE ENGINE / LOCAL</span><b>READY / {scene.index}</b></div>
            <p>{scene.gesture}</p>
            <strong>{scene.name}</strong>
            <p>{scene.description}</p>
            <dl key={scene.id}>{scene.signals.map(([label, value], index) => <div key={label} style={{ animationDelay: `${index * 90}ms` }}><dt>{label}</dt><dd>{value}</dd><i /></div>)}</dl>
          </div>
        </div>

        <div className="axis-scene-controls" role="group" aria-label="Axis reference scenes">
          {axisScenes.map((item) => <button type="button" key={item.id} className={item.id === scene.id ? "is-active" : ""} onClick={() => setSceneId(item.id)} aria-pressed={item.id === scene.id}><span>{item.index}</span><b>{item.gesture}</b><strong>{item.name}</strong><i /></button>)}
        </div>
      </section>

      <section className="axis-anatomy section-pad">
        <div className="axis-anatomy-intro">
          <div className="section-label"><span>02</span><span>Product anatomy</span></div>
          <div><p className="eyebrow">8.6 millimetres from architecture</p><h2>Depth you feel.<br />Not see.</h2></div>
          <button type="button" onClick={() => setExploded((value) => !value)} aria-pressed={exploded}><span>{exploded ? "Assemble object" : "Separate layers"}</span><b>{exploded ? "−" : "+"}</b></button>
        </div>

        <div className="axis-anatomy-grid">
          <div className={`axis-exploded-model${exploded ? " is-exploded" : ""}`} aria-hidden="true">
            <div className="axis-stack">
              <div className="axis-stack-part axis-stack-glass"><span>01 / GLASS</span><i /><i /><i /><i /><b /></div>
              <div className="axis-stack-part axis-stack-sensor"><span>02 / TOUCH</span><i /><i /><i /><i /></div>
              <div className="axis-stack-part axis-stack-haptic"><span>03 / HAPTIC</span><b /></div>
              <div className="axis-stack-part axis-stack-mount"><span>04 / MOUNT</span><i /></div>
            </div>
            <p><span>VISIBLE DEPTH</span><strong>8.6</strong><b>MM</b></p>
          </div>

          <div className="axis-assembly-list">
            {assembly.map(([index, title, copy]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="axis-finish-lab section-pad" style={finishStyle}>
        <div className="axis-finish-copy">
          <div className="section-label"><span>03</span><span>Finish laboratory</span></div>
          <p className="eyebrow">Sampled under project light</p>
          <h2>The control belongs<br />to the material board.</h2>
          <p>Each finish is reviewed beside stone, timber, metalwork and wall colour under the same light that will exist in the completed room.</p>
          <div className="axis-finish-picker" role="group" aria-label="Axis finish">
            {product.finishes.map((item, index) => <button type="button" key={item.name} className={index === finishIndex ? "is-active" : ""} onClick={() => setFinishIndex(index)} aria-pressed={index === finishIndex}><i style={{ background: item.color }} /><span>{item.name}</span><b>{String(index + 1).padStart(2, "0")}</b></button>)}
          </div>
        </div>

        <div className="axis-finish-object" aria-label={`Axis shown in ${finish.name}`}>
          <div className="axis-finish-frame"><div className="axis-finish-glass"><i /><i /><i /><i /><b /></div></div>
          <p><span>SELECTED FINISH</span><strong>{finish.name}</strong></p>
        </div>
      </section>

      <section className="axis-signal-path section-pad">
        <div className="axis-signal-intro">
          <div className="section-label section-label-light"><span>04</span><span>Signal path</span></div>
          <h2>One gesture.<br />Thirty-four milliseconds.</h2>
          <p>The response is processed locally. No cloud round trip, visible loading state or collection of unrelated commands.</p>
        </div>
        <div className="axis-signal-rail">
          <i aria-hidden="true" />
          {[["00 ms", "Touch resolved", "Pressure and zone confirmed locally"], ["08 ms", "Bus encrypted", "Intent travels on the dedicated two-wire bus"], ["18 ms", "Scene recalled", "Atlas resolves every linked system state"], ["34 ms", "Room responds", "Light, shade, climate and audio begin together"]].map(([time, title, copy], index) => <article key={time}><span>0{index + 1}</span><strong>{time}</strong><h3>{title}</h3><p>{copy}</p><b /></article>)}
        </div>
      </section>
    </>
  );
}
