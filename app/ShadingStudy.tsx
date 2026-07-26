"use client";

import { useState } from "react";

const shadingStates = [
  {
    id: "open",
    index: "01",
    time: "08:10",
    title: "Open view",
    headline: "Let the horizon into the room.",
    description: "With soft morning light and low solar load, every sheer disappears into its pocket. The architecture receives the full view without unnecessary intervention.",
    image: "/images/shading-open.jpg",
    readings: [["OPENNESS", "100%"], ["GLARE", "LOW"], ["UV INDEX", "1.8"]],
  },
  {
    id: "glare",
    index: "02",
    time: "11:42",
    title: "Glare control",
    headline: "Filter the light. Keep the view.",
    description: "Only the brightest zones move. A fine woven sheer softens contrast at the glass while the coastline remains clear through the unprotected openings.",
    image: "/images/service-shading.jpg",
    readings: [["RIGHT SHEER", "42%"], ["VIEW", "PRESERVED"], ["GLARE", "CONTROLLED"]],
  },
  {
    id: "solar",
    index: "03",
    time: "14:35",
    title: "Solar protection",
    headline: "Reduce heat before cooling begins.",
    description: "Sun-facing zones lower in coordinated heights, cutting floor glare and peak heat gain while the weave keeps the ocean softly present.",
    image: "/images/shading-solar.jpg",
    readings: [["WEST", "72%"], ["SEAWARD", "52%"], ["HEAT GAIN", "−42%"]],
  },
  {
    id: "privacy",
    index: "04",
    time: "20:15",
    title: "Night privacy",
    headline: "Close the view in. Keep the room alive.",
    description: "The façade becomes a softly illuminated boundary. Layered interior light remains generous enough for reading while the home is protected from outside view.",
    image: "/images/shading-privacy.jpg",
    readings: [["SHELL", "PRIVATE"], ["TASK LIGHT", "320 LX"], ["CCT", "2700 K"]],
  },
];

export function ShadingStudy() {
  const [stateId, setStateId] = useState("glare");
  const state = shadingStates.find((item) => item.id === stateId) ?? shadingStates[1];

  return (
    <section className="shading-study section-pad">
      <div className="shading-study-intro">
        <div className="section-label"><span>02</span><span>Daylight laboratory</span></div>
        <div>
          <p className="eyebrow">One façade · Four responses</p>
          <h2>Keep the view.<br />Edit everything else.</h2>
        </div>
        <p>Shading is not open or closed. It is a precise response to orientation, glare, heat and privacy—zone by zone, hour by hour.</p>
      </div>

      <div className="shading-study-console">
        <div className="shading-study-panel">
          <div className="shading-study-panel-head"><span>FAÇADE / SOUTHWEST</span><b>{state.time}</b></div>
          <div className="shading-study-copy" aria-live="polite">
            <span>{state.index} / RESPONSE</span>
            <h3>{state.title}</h3>
            <strong>{state.headline}</strong>
            <p>{state.description}</p>
            <dl>{state.readings.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </div>
          <div className="shading-study-controls" role="group" aria-label="Choose a shading and daylight state">
            {shadingStates.map((item) => (
              <button type="button" key={item.id} className={item.id === state.id ? "is-active" : ""} onClick={() => setStateId(item.id)} aria-pressed={item.id === state.id}>
                <span>{item.index}</span><b>{item.time}</b><strong>{item.title}</strong><i aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <div className="shading-study-visual">
          <img key={state.id} src={state.image} alt={`Coastal living room in the ${state.title.toLowerCase()} shading state`} />
          <div className={`shading-study-map is-${state.id}`} aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="shading-study-live"><span>SHADE POSITION / LIVE</span><b>{state.title.toUpperCase()}</b></div>
          <p>GLAZING LINE / 05 COORDINATED ZONES</p>
        </div>
      </div>

      <div className="shading-study-principles">
        <article><span>01 / ORIENTATION</span><h3>Each façade gets its own logic.</h3><p>Sun path, reflected glare and room use determine the response—not one schedule for the whole house.</p></article>
        <article><span>02 / FABRIC</span><h3>The weave is part of the architecture.</h3><p>Openness, colour and reflection are selected against the real view, glazing and interior material palette.</p></article>
        <article><span>03 / DETAIL</span><h3>Everything disappears when open.</h3><p>Pockets, tracks, access and fabric stack are resolved before ceilings close, keeping every elevation visually calm.</p></article>
      </div>
    </section>
  );
}
