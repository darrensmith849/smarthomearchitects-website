"use client";

import { useState } from "react";

const forestMoments = [
  {
    id: "dawn", index: "01", time: "06:42", name: "Open the house",
    line: "Cool garden air and first light arrive before mechanical comfort is needed.",
    image: "/images/forest-dawn.webp",
    readings: [["AIR", "NATURAL / OPEN"], ["COMFORT", "20.8 °C"], ["LIGHT", "11%"]],
  },
  {
    id: "midday", index: "02", time: "12:18", name: "Shade and breathe",
    line: "The tree canopy, glazing and thermal mass do the quiet work first.",
    image: "/images/courtyard.webp",
    readings: [["SHADE", "NORTH / 38%"], ["COMFORT", "22.1 °C"], ["CO₂", "612 PPM"]],
  },
  {
    id: "rain", index: "03", time: "15:36", name: "Receive the weather",
    line: "The courtyard drinks in the rain while the living spaces remain settled.",
    image: "/images/forest-rain.webp",
    readings: [["GLAZING", "CLOSED"], ["HUMIDITY", "58%"], ["IRRIGATION", "PAUSED"]],
  },
  {
    id: "evening", index: "04", time: "19:18", name: "Gather",
    line: "Warm circulation light frames the garden without turning night into day.",
    image: "/images/forest-evening.webp",
    readings: [["LIGHT", "2,400 K / 34%"], ["COMFORT", "21.4 °C"], ["GARDEN", "LOW / ON"]],
  },
];

export function ForestRhythm() {
  const [momentId, setMomentId] = useState("midday");
  const moment = forestMoments.find((item) => item.id === momentId) ?? forestMoments[1];

  return (
    <section className="forest-rhythm section-pad">
      <div className="forest-rhythm-intro">
        <div className="section-label"><span>02</span><span>Environmental rhythm</span></div>
        <div><p className="eyebrow">A day at Forest House</p><h2>The garden is part<br />of the system.</h2></div>
        <p>Architecture, weather and technology share responsibility for comfort. Select a moment to see how the home responds without separating itself from the landscape.</p>
      </div>

      <div className="forest-rhythm-visual">
        <img decoding="async" className="forest-rhythm-image" key={moment.id} src={moment.image} alt={`Forest House courtyard during ${moment.name.toLowerCase()}`} />
        <div className="forest-rhythm-map" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="forest-rhythm-location">COURTYARD / LIVING EDGE</p>
        <div className="forest-rhythm-readout" aria-live="polite">
          <div><span>ENVIRONMENT / LIVE</span><b>{moment.time}</b></div>
          <strong>{moment.name}</strong><p>{moment.line}</p>
          <dl>{moment.readings.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
      </div>

      <div className="forest-rhythm-controls" role="group" aria-label="Choose a Forest House moment">
        {forestMoments.map((item) => (
          <button type="button" className={item.id === moment.id ? "is-active" : ""} key={item.id} onClick={() => setMomentId(item.id)} aria-pressed={item.id === moment.id}>
            <span>{item.index}</span><b>{item.time}</b><strong>{item.name}</strong><i aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
