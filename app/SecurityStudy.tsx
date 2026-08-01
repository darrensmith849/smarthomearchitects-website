"use client";

import { useState } from "react";

const securityStates = [
  {
    id: "away",
    index: "01",
    time: "10:30",
    title: "Away mode",
    primary: "SECURE",
    headline: "The house closes without looking closed.",
    description: "Access, openings and life-safety systems move to an unoccupied profile while the architecture remains calm and entirely itself.",
    image: "/images/security-away.webp",
    status: "SITE / ARMED",
    readings: [["SHELL", "LOCKED"], ["PRESENCE", "00"], ["RECORDING", "LOCAL"]],
    events: ["Access schedule set", "Openings verified", "Remote audit active"],
  },
  {
    id: "arrival",
    index: "02",
    time: "18:40",
    title: "Verified arrival",
    primary: "WELCOME",
    headline: "Protection becomes hospitality.",
    description: "A known arrival is verified once. The gate, entry and path lighting respond together without exposing security as a separate ritual.",
    image: "/images/service-security.webp",
    status: "ENTRY / VERIFIED",
    readings: [["IDENTITY", "TRUSTED"], ["GATE", "RELEASE / 8 S"], ["PATH", "ARRIVAL"]],
    events: ["Credential matched", "Approach clear", "Entry scene released"],
  },
  {
    id: "occupied",
    index: "03",
    time: "23:15",
    title: "Occupied night",
    primary: "AT HOME",
    headline: "The shell is secure. Life stays free.",
    description: "Perimeter and access layers remain active while interior movement, late arrivals and family routines continue without alarms or friction.",
    image: "/images/security-night.webp",
    status: "SHELL / ACTIVE",
    readings: [["PERIMETER", "ARMED"], ["INTERIOR", "FREE"], ["PATH", "LOW / READY"]],
    events: ["Outer shell active", "Interior zones open", "Sleep profile normal"],
  },
  {
    id: "perimeter",
    index: "04",
    time: "02:12",
    title: "Perimeter awareness",
    primary: "CLEAR",
    headline: "Awareness without illumination.",
    description: "Local sensors share context at the property edge. Only correlated activity becomes an event, keeping the home dark, quiet and undisturbed.",
    image: "/images/security-perimeter.webp",
    status: "BOUNDARY / AWARE",
    readings: [["ZONES", "12 CLEAR"], ["EVENTS", "00"], ["LIGHT", "SAFETY / 4%"]],
    events: ["Boundary stable", "Motion uncorrelated", "Recording on edge"],
  },
];

export function SecurityStudy() {
  const [stateId, setStateId] = useState("arrival");
  const state = securityStates.find((item) => item.id === stateId) ?? securityStates[1];

  return (
    <section className="security-study section-pad">
      <div className="security-study-intro">
        <div className="section-label section-label-light"><span>02</span><span>Protection laboratory</span></div>
        <div>
          <p className="eyebrow eyebrow-light">One residence · Four boundaries</p>
          <h2>Four layers.<br />Zero theatre.</h2>
        </div>
        <p>Security should understand the difference between family life, a delivery and a genuine event—then respond with the least possible interruption.</p>
      </div>

      <div className="security-study-stage">
        <img decoding="async" key={state.id} src={state.image} alt={`Mountainside residence in ${state.title.toLowerCase()} state`} />
        <div className={`security-study-boundaries is-${state.id}`} aria-hidden="true"><i /><i /><i /><b /><span /></div>
        <p className="security-study-location">ENTRY APPROACH / PROTECTION ZONE 02</p>
        <div className="security-study-readout" aria-live="polite">
          <div><span>{state.status}</span><b>{state.time}</b></div>
          <strong>{state.primary}</strong>
          <h3>{state.title}</h3>
          <h4>{state.headline}</h4>
          <p>{state.description}</p>
          <dl>{state.readings.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>
        <div className="security-study-log" aria-live="polite">
          <div><span>EVENT CORRELATION</span><b>LOCAL / LIVE</b></div>
          {state.events.map((event, index) => <p key={event}><i />{event}<span>0{index + 1}</span></p>)}
        </div>
      </div>

      <div className="security-study-controls" role="group" aria-label="Choose a residential security state">
        {securityStates.map((item) => (
          <button type="button" key={item.id} className={item.id === state.id ? "is-active" : ""} onClick={() => setStateId(item.id)} aria-pressed={item.id === state.id}>
            <span>{item.index}</span><b>{item.time}</b><strong>{item.title}</strong><i aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="security-study-notes">
        <article><span>01 / VERIFY</span><h3>Context before notification.</h3><p>Access, perimeter and video signals corroborate one another so routine movement does not become noise.</p></article>
        <article><span>02 / PRIVATE</span><h3>Recording stays at home.</h3><p>Encrypted local storage and auditable remote access keep household activity out of an unnecessary cloud stream.</p></article>
        <article><span>03 / GRACEFUL</span><h3>Human control remains obvious.</h3><p>Clear keypads, deliberate overrides and documented response paths keep protection understandable under pressure.</p></article>
      </div>
    </section>
  );
}
