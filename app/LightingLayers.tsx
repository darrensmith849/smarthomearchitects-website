"use client";

import { useState } from "react";

const lightingLayers = [
  {
    id: "ambient",
    index: "01",
    title: "Ambient",
    role: "General light",
    headline: "Comfort without hotspots.",
    description: "A soft, even base gives the eye room to adapt. Circulation is clear, faces feel natural and no single fitting announces itself.",
    image: "/images/lighting-ambient.webp",
    readings: [["LEVEL", "36%"], ["CCT", "2700 K"], ["UNIFORMITY", "0.42"]],
  },
  {
    id: "task",
    index: "02",
    title: "Task",
    role: "Useful light",
    headline: "Brightness where life happens.",
    description: "Reading, preparing and working need generous, glare-free light. The rest of the room can remain calm without compromising what you came to do.",
    image: "/images/lighting-task.webp",
    readings: [["READING", "320 LX"], ["CRI", "98+"], ["GLARE", "UGR < 16"]],
  },
  {
    id: "accent",
    index: "03",
    title: "Accent",
    role: "Visual hierarchy",
    headline: "Light tells the eye where to rest.",
    description: "Controlled beams reveal art, stone, timber and objects. Contrast creates depth; restraint keeps the room from becoming a display window.",
    image: "/images/lighting-accent.webp",
    readings: [["BEAM", "18°"], ["ART", "42%"], ["SHELF", "28%"]],
  },
  {
    id: "architectural",
    index: "04",
    title: "Architectural",
    role: "Integrated light",
    headline: "The building becomes the luminaire.",
    description: "Coves, reveals, wall grazing and floor lines are detailed into the architecture so the source disappears and the composition remains.",
    image: "/images/service-lighting.webp",
    readings: [["COVE", "24%"], ["PATH", "6%"], ["SCENE", "BLUE HOUR"]],
  },
];

export function LightingLayers() {
  const [layerId, setLayerId] = useState("task");
  const layer = lightingLayers.find((item) => item.id === layerId) ?? lightingLayers[1];

  return (
    <section className="lighting-study section-pad">
      <div className="lighting-study-intro">
        <div className="section-label section-label-light"><span>02</span><span>Lighting laboratory</span></div>
        <div>
          <p className="eyebrow eyebrow-light">One room · Four layers</p>
          <h2>Good light is never<br />just one light.</h2>
        </div>
        <p>Explore the same room through the four jobs residential lighting must perform. Each layer is useful alone; the real craft is how they balance together.</p>
      </div>

      <div className="lighting-study-console">
        <div className="lighting-study-visual">
          <img decoding="async" key={layer.id} src={layer.image} alt={`${layer.title} lighting in a coastal living gallery at blue hour`} />
          <div className={`lighting-study-geometry is-${layer.id}`} aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="lighting-study-live"><i /><span>LAYER / {layer.index}</span><b>{layer.role.toUpperCase()}</b></div>
          <p className="lighting-study-location">COASTAL GALLERY / BLUE HOUR</p>
        </div>

        <div className="lighting-study-panel">
          <div className="lighting-study-panel-head"><span>SHA / LIGHT COMPOSITION</span><b>LIVE STUDY</b></div>
          <div className="lighting-study-copy" aria-live="polite">
            <span>{layer.index} / {layer.role}</span>
            <h3>{layer.title}</h3>
            <strong>{layer.headline}</strong>
            <p>{layer.description}</p>
            <dl>{layer.readings.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </div>
          <div className="lighting-study-controls" role="group" aria-label="Choose a residential lighting layer">
            {lightingLayers.map((item) => (
              <button type="button" key={item.id} className={item.id === layer.id ? "is-active" : ""} onClick={() => setLayerId(item.id)} aria-pressed={item.id === layer.id}>
                <span>{item.index}</span><strong>{item.title}</strong><i aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lighting-study-notes">
        <article><span>01 / HUMAN FIRST</span><h3>Enough light to live well.</h3><p>Atmosphere never comes at the expense of reading, cooking, dressing or seeing the people around you.</p></article>
        <article><span>02 / COMMISSIONED IN PLACE</span><h3>Measured, then judged by eye.</h3><p>Lux levels establish the floor. Materials, faces, reflection and the character of the room determine the final balance.</p></article>
        <article><span>03 / MANUAL ALWAYS WINS</span><h3>One touch changes the composition.</h3><p>Scenes make complexity disappear, while a clear keypad keeps personal control exactly where it belongs.</p></article>
      </div>
    </section>
  );
}
