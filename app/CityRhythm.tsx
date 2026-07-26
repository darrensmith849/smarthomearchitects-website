"use client";

import { useState } from "react";

const cityMoments = [
  {
    id: "morning",
    index: "01",
    time: "07:12",
    name: "First silence",
    line: "Clear glass and quiet circuitry let the room wake to daylight alone.",
    image: "/images/city-morning.jpg",
    status: "SYSTEM / RESTING",
    readings: [["AUDIO", "QUIET"], ["GLAZING", "CLEAR"], ["ROOM", "26 dBA"]],
  },
  {
    id: "focus",
    index: "02",
    time: "14:20",
    name: "Private focus",
    line: "Glare and exposure recede while the courtyard remains present.",
    image: "/images/city-focus.jpg",
    status: "PRIVACY / BALANCED",
    readings: [["AUDIO", "NEARFIELD"], ["GLAZING", "42%"], ["NOISE", "28 dBA"]],
  },
  {
    id: "listening",
    index: "03",
    time: "21:10",
    name: "Deep listening",
    line: "The room becomes the instrument—immersive, warm and precisely contained.",
    image: "/images/service-audio.jpg",
    status: "SOUND FIELD / LIVE",
    readings: [["SOURCE", "VINYL / PHONO"], ["LEVEL", "−28 dB"], ["ZONES", "04 LINKED"]],
  },
  {
    id: "night",
    index: "04",
    time: "23:28",
    name: "Quiet secure",
    line: "Sound sleeps, glass darkens and a four-percent path remains.",
    image: "/images/city-night.jpg",
    status: "SHELL / SECURE",
    readings: [["AUDIO", "OFF"], ["PRIVACY", "NIGHT"], ["PATH", "4%"]],
  },
];

export function CityRhythm() {
  const [momentId, setMomentId] = useState("listening");
  const moment = cityMoments.find((item) => item.id === momentId) ?? cityMoments[2];

  return (
    <section className="city-rhythm section-pad">
      <div className="city-rhythm-intro">
        <div className="section-label section-label-light"><span>02</span><span>Sound + privacy</span></div>
        <div>
          <p className="eyebrow eyebrow-light">A day at City Penthouse</p>
          <h2>Music when you want it.<br />Silence when you don&apos;t.</h2>
        </div>
        <p>Sound, glass and light behave as one discreet system. Select a moment to see the same room move from open morning calm to complete nighttime privacy.</p>
      </div>

      <div className="city-rhythm-console">
        <div className="city-rhythm-visual">
          <img className="city-rhythm-image" key={moment.id} src={moment.image} alt={`City Penthouse listening room during ${moment.name.toLowerCase()}`} />
          <div className="city-rhythm-scan" aria-hidden="true" />
          <div className={`city-rhythm-soundfield ${moment.id === "listening" ? "is-live" : ""}`} aria-hidden="true"><i /><i /><i /><b /></div>
          <p className="city-rhythm-zone">LISTENING ROOM / ZONE 04</p>
          <div className="city-rhythm-readout" aria-live="polite">
            <div><span>{moment.status}</span><b>{moment.time}</b></div>
            <strong>{moment.name}</strong>
            <p>{moment.line}</p>
            <dl>{moment.readings.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </div>
        </div>

        <div className="city-rhythm-controls" role="group" aria-label="Choose a City Penthouse sound and privacy scene">
          <div className="city-rhythm-controls-head"><span>ROOM LOGIC</span><b>04 SCENES</b></div>
          {cityMoments.map((item) => (
            <button type="button" className={item.id === moment.id ? "is-active" : ""} key={item.id} onClick={() => setMomentId(item.id)} aria-pressed={item.id === moment.id}>
              <span>{item.index}</span>
              <span><b>{item.time}</b><strong>{item.name}</strong></span>
              <i aria-hidden="true" />
            </button>
          ))}
          <p>Four authored scenes. Local control.<br />No cloud dependency.</p>
        </div>
      </div>
    </section>
  );
}
