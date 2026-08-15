"use client";

import { useState } from "react";

const audioModes = [
  {
    id: "silence",
    index: "01",
    time: "07:12",
    title: "Noise floor",
    headline: "Quiet begins before music.",
    description: "Low background noise, silent ventilation and stable electronics create the contrast that lets detail arrive without excessive volume.",
    image: "/images/city-morning.webp",
    primary: "26",
    unit: "dBA",
    status: "SYSTEM / DORMANT",
    readings: [["AMPLIFICATION", "STANDBY"], ["ROOM TONE", "NEUTRAL"], ["ZONES", "00 LIVE"]],
  },
  {
    id: "focus",
    index: "02",
    time: "14:20",
    title: "Nearfield focus",
    headline: "A private field, not a loud room.",
    description: "One listening position receives clear, balanced sound at modest level while adjacent spaces remain visually and acoustically calm.",
    image: "/images/city-focus.webp",
    primary: "58",
    unit: "dBA",
    status: "FOCUS / SEAT 02",
    readings: [["SOURCE", "LOSSLESS / LOCAL"], ["FIELD", "NEAR / FOCUSED"], ["ZONES", "01 LIVE"]],
  },
  {
    id: "reference",
    index: "03",
    time: "21:10",
    title: "Reference listening",
    headline: "The room becomes the instrument.",
    description: "Time alignment, room correction and low-frequency control build a stable image across the seating area without calling attention to the speakers.",
    image: "/images/service-audio.webp",
    primary: "74",
    unit: "dBA",
    status: "SOUND FIELD / LOCKED",
    readings: [["SOURCE", "VINYL / PHONO"], ["RT60", "0.38 S"], ["PHASE", "±0.4 MS"]],
  },
  {
    id: "contained",
    index: "04",
    time: "23:28",
    title: "Night containment",
    headline: "Music stays in the room.",
    description: "Bass trims, boundary-aware equalisation and lower listening level preserve the programme while protecting bedrooms and neighbouring spaces.",
    image: "/images/city-night.webp",
    primary: "48",
    unit: "dBA",
    status: "BOUNDARY / PROTECTED",
    readings: [["BASS TRIM", "−8 dB"], ["LEAKAGE", "< 22 dBA"], ["BEDROOMS", "PROTECTED"]],
  },
];

export function AudioStudy() {
  const [modeId, setModeId] = useState("reference");
  const mode = audioModes.find((item) => item.id === modeId) ?? audioModes[2];

  return (
    <section className="audio-study section-pad">
      <div className="audio-study-intro">
        <div className="section-label"><span>02</span><span>Sound laboratory</span></div>
        <div>
          <p className="eyebrow eyebrow-light">One room · Four sound fields</p>
          <h2>Great sound has<br />no visible source.</h2>
        </div>
        <p>The system disappears because the room, speakers, structure and control logic were designed together. Explore what changes beneath the surface.</p>
      </div>

      <div className="audio-study-stage">
        <img decoding="async" key={mode.id} src={mode.image} alt={`City Penthouse listening room in ${mode.title.toLowerCase()} mode`} />
        <div className={`audio-study-field is-${mode.id}`} aria-hidden="true"><i /><i /><i /><i /><b /></div>
        <div className={`audio-study-spectrum is-${mode.id}`} aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <p className="audio-study-location">LISTENING ROOM / ACOUSTIC ZONE 04</p>
        <div className="audio-study-readout" aria-live="polite">
          <div><span>{mode.status}</span><b>{mode.time}</b></div>
          <strong>{mode.primary}<small>{mode.unit}</small></strong>
          <h3>{mode.title}</h3>
          <h4>{mode.headline}</h4>
          <p>{mode.description}</p>
          <dl>{mode.readings.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
        <div className="audio-study-zones"><span>ZONE STATUS</span><i /><i /><i /><i /><b>{mode.id === "reference" ? "04 LINKED" : mode.id === "focus" ? "01 FOCUSED" : mode.id === "contained" ? "01 LOW" : "RESTING"}</b></div>
      </div>

      <div className="audio-study-controls" role="group" aria-label="Choose an audio listening mode">
        {audioModes.map((item) => (
          <button type="button" key={item.id} className={item.id === mode.id ? "is-active" : ""} onClick={() => setModeId(item.id)} aria-pressed={item.id === mode.id}>
            <span>{item.index}</span><b>{item.time}</b><strong>{item.title}</strong><i aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="audio-study-notes">
        <article><span>01 / ROOM FIRST</span><h3>Acoustics before correction.</h3><p>Placement, construction, furnishing and reflection control solve the large problems before software refines the result.</p></article>
        <article><span>02 / INVISIBLE SOURCE</span><h3>Speakers serve the architecture.</h3><p>Apertures, grilles and bass management are coordinated so generous sound never becomes visual clutter.</p></article>
        <article><span>03 / SIMPLE EVERY DAY</span><h3>Complexity stays backstage.</h3><p>Sources, zones and volume feel immediate at the keypad or app, while local control keeps listening dependable.</p></article>
      </div>
    </section>
  );
}
