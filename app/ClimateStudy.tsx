"use client";

import { useState } from "react";

const comfortStates = [
  {
    id: "natural",
    index: "01",
    time: "06:42",
    title: "Natural ventilation",
    headline: "Let the weather do the work.",
    description: "Cool garden air moves through open living edges before any mechanical plant is needed. The system watches comfort rather than interrupting it.",
    image: "/images/forest-dawn.webp",
    temperature: "20.8°",
    load: 0,
    readings: [["OUTSIDE", "17.6 °C"], ["AIR PATH", "OPEN"], ["MECHANICAL", "OFF"]],
  },
  {
    id: "passive",
    index: "02",
    time: "12:18",
    title: "Passive balance",
    headline: "Shade and mass settle the room first.",
    description: "Tree canopy, deep overhangs, glazing and thermal mass hold a stable comfort band while the active system remains almost completely at rest.",
    image: "/images/courtyard.webp",
    temperature: "22.1°",
    load: 6,
    readings: [["OUTSIDE", "28.6 °C"], ["SOLAR LOAD", "−38%"], ["PLANT", "STANDBY"]],
  },
  {
    id: "active",
    index: "03",
    time: "15:36",
    title: "Active trim",
    headline: "Only the last degree is mechanical.",
    description: "When weather closes the house, quiet low-speed conditioning and humidity control maintain the room without fighting the architecture.",
    image: "/images/forest-rain.webp",
    temperature: "21.7°",
    load: 34,
    readings: [["HUMIDITY", "58%"], ["GLAZING", "CLOSED"], ["SUPPLY", "LOW / ACTIVE"]],
  },
  {
    id: "night",
    index: "04",
    time: "19:18",
    title: "Quiet night",
    headline: "Comfort lowers its voice.",
    description: "Airflow reduces, bedrooms cool gently and the courtyard remains present. The home settles without fan noise, bright interfaces or temperature chasing.",
    image: "/images/forest-evening.webp",
    temperature: "21.4°",
    load: 12,
    readings: [["OUTSIDE", "16.3 °C"], ["ACOUSTIC", "24 dBA"], ["AIR", "SILENT / LOW"]],
  },
];

export function ClimateStudy() {
  const [stateId, setStateId] = useState("passive");
  const state = comfortStates.find((item) => item.id === stateId) ?? comfortStates[1];

  return (
    <section className="climate-study section-pad">
      <div className="climate-study-intro">
        <div className="section-label"><span>02</span><span>Comfort laboratory</span></div>
        <div>
          <p className="eyebrow eyebrow-light">One courtyard · Four strategies</p>
          <h2>Comfort is a field.<br />Not a number.</h2>
        </div>
        <p>Temperature is only one signal. Air movement, humidity, radiant surfaces, sunlight and sound determine whether a room truly feels settled.</p>
      </div>

      <div className="climate-study-stage">
        <img decoding="async" key={state.id} src={state.image} alt={`Forest House courtyard during ${state.title.toLowerCase()}`} />
        <div className={`climate-study-field is-${state.id}`} aria-hidden="true"><i /><i /><i /><span /><span /><span /></div>
        <p className="climate-study-location">COURTYARD / LIVING EDGE / ZONE 06</p>
        <div className="climate-study-readout" aria-live="polite">
          <div><span>COMFORT FIELD / LIVE</span><b>{state.time}</b></div>
          <strong>{state.temperature}<small>C</small></strong>
          <h3>{state.title}</h3>
          <h4>{state.headline}</h4>
          <p>{state.description}</p>
          <dl>{state.readings.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <div className="climate-study-load"><span>MECHANICAL LOAD</span><b>{state.load}%</b><i><span style={{ width: `${state.load}%` }} /></i></div>
        </div>
      </div>

      <div className="climate-study-controls" role="group" aria-label="Choose a climate and comfort strategy">
        {comfortStates.map((item) => (
          <button type="button" key={item.id} className={item.id === state.id ? "is-active" : ""} onClick={() => setStateId(item.id)} aria-pressed={item.id === state.id}>
            <span>{item.index}</span><b>{item.time}</b><strong>{item.title}</strong><i aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="climate-study-notes">
        <article><span>01 / PASSIVE FIRST</span><h3>Use architecture before energy.</h3><p>Shade, air paths and thermal mass reduce demand before cooling or heating is asked to respond.</p></article>
        <article><span>02 / ROOM LEVEL</span><h3>Comfort follows people.</h3><p>Each room reads occupancy and conditions independently instead of averaging discomfort across the house.</p></article>
        <article><span>03 / ONE PLANT</span><h3>Systems stop fighting.</h3><p>Shading, ventilation, underfloor and HVAC share context, setpoints and a single long-term operating strategy.</p></article>
      </div>
    </section>
  );
}
