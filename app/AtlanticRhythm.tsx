"use client";

import { useState } from "react";

const moments = [
  {
    id: "morning",
    time: "06:28",
    name: "First light",
    line: "The ocean arrives before the household does.",
    image: "/images/scene-morning.webp",
    data: ["EAST LIGHT / 18%", "AIR / 21.2 °C", "FIRE / RESTING"],
  },
  {
    id: "welcome",
    time: "18:42",
    name: "Welcome",
    line: "The house receives you at the pace of the evening.",
    image: "/images/scene-welcome.webp",
    data: ["LIVING / 42%", "AIR / 22.0 °C", "FIRE / ON"],
  },
  {
    id: "dinner",
    time: "20:08",
    name: "At table",
    line: "The room holds the conversation and leaves the view alone.",
    image: "/images/scene-dinner.webp",
    data: ["WARMTH / 2,300 K", "GARDEN / OPEN", "AUDIO / −36 dB"],
  },
  {
    id: "night",
    time: "23:10",
    name: "Goodnight",
    line: "The calm remains. The house quietly takes over the rest.",
    image: "/images/scene-night.webp",
    data: ["PATHS / 4%", "SHELL / SECURE", "AIR / 19.4 °C"],
  },
];

export function AtlanticRhythm() {
  const [momentId, setMomentId] = useState("welcome");
  const moment = moments.find((item) => item.id === momentId) ?? moments[1];

  return (
    <section className="atlantic-rhythm">
      <div className="atlantic-rhythm-copy">
        <p className="eyebrow eyebrow-light">A day at Atlantic House</p>
        <h2>One residence.<br />Four atmospheres.</h2>
        <p>Every scene is a real moment in the same room. The intelligence is not a spectacle—it simply protects the pace, comfort and character of the home as the day moves.</p>
        <div className="atlantic-rhythm-controls" role="group" aria-label="Choose a moment at Atlantic House">
          {moments.map((item, index) => (
            <button type="button" className={item.id === moment.id ? "is-active" : ""} key={item.id} onClick={() => setMomentId(item.id)} aria-pressed={item.id === moment.id}>
              <span>0{index + 1}</span><b>{item.time}</b><strong>{item.name}</strong><i aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <div className="atlantic-rhythm-visual">
        <img decoding="async" className="atlantic-rhythm-image" key={moment.id} src={moment.image} alt={`Atlantic House at ${moment.name.toLowerCase()}`} />
        <div className="atlantic-rhythm-grid" aria-hidden="true"><i /><i /><i /></div>
        <div className="atlantic-rhythm-panel" aria-live="polite">
          <div><span>ATLANTIC HOUSE / LIVE</span><b>{moment.time}</b></div>
          <strong>{moment.name}</strong>
          <p>{moment.line}</p>
          <ul>{moment.data.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
