"use client";

import { useState } from "react";

const energyModes = [
  {
    id: "balance",
    index: "01",
    time: "07:15",
    title: "Daybreak balance",
    primary: "3.2",
    unit: "kW",
    status: "MIX / BALANCED",
    headline: "The day begins from the best available source.",
    description: "Early solar joins a small grid contribution while storage holds its reserve. Comfort arrives normally; the energy choreography stays backstage.",
    readings: [["SOLAR", "2.1 kW"], ["GRID", "1.1 kW"], ["BATTERY", "64% / HOLD"]],
    event: "Morning demand balanced without battery discharge",
  },
  {
    id: "harvest",
    index: "02",
    time: "10:20",
    title: "Solar harvest",
    primary: "8.4",
    unit: "kW",
    status: "SOLAR / SURPLUS",
    headline: "Daylight serves the home, then stores itself.",
    description: "Solar generation supplies current household demand first. The surplus charges storage quietly, preserving capacity for the expensive or imperfect hours ahead.",
    readings: [["HOME", "4.6 kW"], ["CHARGING", "+3.8 kW"], ["GRID", "STANDBY"]],
    event: "Home supplied and storage charging from solar",
  },
  {
    id: "peak",
    index: "03",
    time: "18:10",
    title: "Peak protection",
    primary: "5.8",
    unit: "kW",
    status: "STORAGE / SUPPORT",
    headline: "Peak living without peak dependence.",
    description: "As cooking, climate and evening lighting overlap, storage carries the majority of demand and limits the home's exposure to the grid's busiest period.",
    readings: [["BATTERY", "−4.9 kW"], ["SOLAR", "0.6 kW"], ["GRID", "0.3 kW"]],
    event: "Grid import held below the household peak limit",
  },
  {
    id: "reserve",
    index: "04",
    time: "23:40",
    title: "Resilient reserve",
    primary: "12",
    unit: "h",
    status: "GRID / UNAVAILABLE",
    headline: "An outage becomes a quieter operating mode.",
    description: "The house protects essential circuits, preserves a defined storage floor and pauses discretionary loads. Safety, communication and core comfort remain intact.",
    readings: [["RESERVE", "52%"], ["ESSENTIAL", "1.6 kW"], ["TRANSFER", "86 ms"]],
    event: "Essential household circuits operating from reserve",
  },
];

export function EnergyStudy() {
  const [modeId, setModeId] = useState("harvest");
  const mode = energyModes.find((item) => item.id === modeId) ?? energyModes[1];
  const solarActive = mode.id !== "reserve";
  const gridActive = mode.id === "balance" || mode.id === "peak";
  const batteryActive = mode.id === "harvest" || mode.id === "peak" || mode.id === "reserve";

  return (
    <section className="energy-study section-pad">
      <div className="energy-study-intro">
        <div className="section-label"><span>02</span><span>Energy observatory</span></div>
        <div>
          <p className="eyebrow eyebrow-light">One home · Four energy conditions</p>
          <h2>Power moves.<br />Comfort remains.</h2>
        </div>
        <p>See the system as built: roof generation, utility entry, conversion, storage and protected circuits—then explore how their roles change through the day.</p>
      </div>

      <div className={`energy-study-console is-${mode.id}`}>
        <div className="energy-study-visual">
          <img decoding="async" src="/images/energy-cutaway.webp" alt="Architectural cutaway showing roof solar panels, grid entry, inverters, battery storage and protected household circuits" />
          <div className={`energy-cutaway-label label-solar ${solarActive ? "is-active" : ""}`}><i /><span>01 / ROOF ARRAY</span><strong>{mode.id === "harvest" ? "8.4 kW" : mode.id === "peak" ? "0.6 kW" : mode.id === "reserve" ? "DORMANT" : "2.1 kW"}</strong></div>
          <div className={`energy-cutaway-label label-grid ${gridActive ? "is-active" : ""} ${mode.id === "reserve" ? "is-fault" : ""}`}><i /><span>02 / UTILITY ENTRY</span><strong>{mode.id === "reserve" ? "OFFLINE" : mode.id === "harvest" ? "STANDBY" : mode.id === "peak" ? "0.3 kW" : "1.1 kW"}</strong></div>
          <div className={`energy-cutaway-label label-battery ${batteryActive ? "is-active" : ""}`}><i /><span>03 / STORAGE + INVERTER</span><strong>{mode.id === "harvest" ? "+3.8 kW" : mode.id === "peak" ? "−4.9 kW" : mode.id === "reserve" ? "52% RESERVE" : "64% HOLD"}</strong></div>
          <div className="energy-cutaway-label label-home is-active"><i /><span>04 / PROTECTED HOME</span><strong>{mode.id === "reserve" ? "ESSENTIAL LOADS" : `${mode.primary} ${mode.unit}`}</strong></div>

          <div className="energy-visual-head"><span>RESIDENCE / ENERGY MODEL 09</span><b>{mode.time} / LIVE</b></div>
          <p className="energy-event"><i /><span>{mode.event}</span><b>ORCHESTRATED</b></p>
        </div>

        <aside className="energy-study-panel" aria-live="polite">
          <div className="energy-panel-head"><span>{mode.status}</span><b>{mode.time}</b></div>
          <p>HOUSEHOLD FLOW</p>
          <strong>{mode.primary}<small>{mode.unit}</small></strong>
          <h3>{mode.title}</h3>
          <h4>{mode.headline}</h4>
          <p>{mode.description}</p>
          <dl>{mode.readings.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </aside>
      </div>

      <div className="energy-hardware" aria-label="Residential energy system specification">
        <article><span>01 / GENERATION</span><strong>21</strong><h3>Flush photovoltaic modules</h3><p>8.4 kWp roof array · low-reflection black glass · monitored strings</p></article>
        <article><span>02 / STORAGE</span><strong>26</strong><h3>kWh usable battery capacity</h3><p>Two modular LFP cabinets · protected plant room · service clearance retained</p></article>
        <article><span>03 / CONVERSION</span><strong>12</strong><h3>kW hybrid inverter</h3><p>Solar conversion · battery management · automatic islanding and recovery</p></article>
        <article><span>04 / DISTRIBUTION</span><strong>86</strong><h3>ms transfer target</h3><p>Dedicated essential board · selective load control · manual bypass</p></article>
      </div>

      <div className="energy-study-controls" role="group" aria-label="Choose a household energy condition">
        {energyModes.map((item) => (
          <button type="button" key={item.id} className={item.id === mode.id ? "is-active" : ""} onClick={() => setModeId(item.id)} aria-pressed={item.id === mode.id}>
            <span>{item.index}</span><b>{item.time}</b><strong>{item.title}</strong><i aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="energy-study-notes">
        <article><span>01 / PRIORITISE</span><h3>Comfort is a defined load, not an accident.</h3><p>Essential, flexible and discretionary circuits are agreed with the household so resilience reflects real life.</p></article>
        <article><span>02 / ANTICIPATE</span><h3>Tomorrow changes what storage does today.</h3><p>Weather, expected occupancy and reserve requirements shape charging without asking the family to manage the forecast.</p></article>
        <article><span>03 / EXPLAIN</span><h3>One calm view replaces five technical systems.</h3><p>Generation, consumption, storage and resilience become legible in a single interface while detailed engineering remains available backstage.</p></article>
      </div>
    </section>
  );
}
