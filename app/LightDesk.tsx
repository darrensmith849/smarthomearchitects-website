"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { useExperienceExit } from "./nav-return";

/**
 * Experience · 07. Every other atelier on this site is a state selector: four
 * buttons, four photographs, cross-fade between them. This one has no states.
 * There is a single frame — the Bantry Bay living room at blue hour — and every
 * control moves continuously over it, so what the visitor operates is the
 * dimming curve rather than a set of pre-baked pictures.
 *
 * Two things follow from that, and both are the point:
 *
 *  - A scene stops being a picture and becomes a row of levels. Pressing
 *    "Dinner" *moves the faders*, visibly, to the numbers that make dinner.
 *    Move one afterwards and the scene name falls back to Custom, which is
 *    exactly what a real keypad does.
 *  - Daylight and electric light compete. At 13:00 with the shade up, pushing
 *    the cove to 100% changes almost nothing, and the readout says why. No
 *    four-button console can show that, because the interesting part is the
 *    ground between the buttons.
 *
 * What one photograph cannot do is honest and stated on the page: the frame was
 * shot with the hearth alight and the stone already grazed, so those two read
 * faintly at zero. Isolating a circuit properly needs a bracketed capture — one
 * locked-off camera, one frame per circuit, composited by opacity. This page is
 * the argument for commissioning that shoot.
 */
const circuits = [
  { id: "cove", address: "L1", name: "Ceiling cove", basis: "Perimeter uplight, plastered slot", watts: 96, lumens: 268, note: "The room's base layer. Everything else is composed on top of it, which is why it is the one circuit specified before the ceiling is set out." },
  { id: "graze", address: "L2", name: "Stone graze", basis: "Adjustables at 12°, 180 mm off the face", watts: 48, lumens: 44, note: "Light aimed at a surface rather than into a room. The travertine becomes the light source, and the fitting disappears." },
  { id: "pools", address: "L3", name: "Table pools", basis: "Narrow downlights, console and table", watts: 34, lumens: 96, note: "Where people actually put their hands. Pooled deliberately tight so the rest of the room can stay dark around them." },
  { id: "hearth", address: "L4", name: "Hearth", basis: "Gas fire, no electrical load", watts: 0, lumens: 16, note: "Not a luminaire, but the room reads it as one. It is on the desk because a scene that ignores the fire is wrong by about 400 K." },
  { id: "terrace", address: "L5", name: "Terrace", basis: "Exterior wash beyond the glass", watts: 62, lumens: 26, note: "The circuit that keeps the glass from turning into a black mirror after dark. Outside stays legible, so the room still feels open." },
] as const;

type CircuitId = (typeof circuits)[number]["id"];
type Levels = Record<CircuitId, number>;

/** Where each luminaire sits in the frame, as a percentage of the image box.
 *  The hearth is deliberately absent: it is a fire, and a marker on it would
 *  claim a fitting that is not there. */
const fixtures: readonly (readonly [CircuitId, number, number])[] = [
  ["cove", 53, 4.6], ["cove", 64, 3.6], ["cove", 88, 4.4],
  ["graze", 74, 7],
  ["pools", 52, 70.5], ["pools", 36, 89],
  ["terrace", 96, 44], ["terrace", 22, 74],
];

type Scene = { id: string; name: string; hour: number; shade: number; cct: number; levels: Levels; line: string };

const scenes: readonly Scene[] = [
  { id: "off", name: "Off", hour: 21.5, shade: 0, cct: 2700, line: "Nothing running. The room is whatever the sky is giving it.", levels: { cove: 0, graze: 0, pools: 0, hearth: 0, terrace: 0 } },
  { id: "morning", name: "Morning", hour: 7.25, shade: 15, cct: 3400, line: "Electric light filling in behind a sun that has not cleared the headland yet.", levels: { cove: 54, graze: 12, pools: 30, hearth: 0, terrace: 0 } },
  { id: "day", name: "Day", hour: 13, shade: 55, cct: 3800, line: "The shade is doing the work. Almost nothing electric is needed, and the desk shows it.", levels: { cove: 18, graze: 0, pools: 14, hearth: 0, terrace: 0 } },
  { id: "dinner", name: "Dinner", hour: 19.5, shade: 0, cct: 2400, line: "Bright where the food is, dark everywhere else, and the fire carrying the warmth.", levels: { cove: 16, graze: 56, pools: 64, hearth: 72, terrace: 34 } },
  { id: "unwind", name: "Unwind", hour: 20.75, shade: 0, cct: 2200, line: "The lowest usable level in the house. Below this the room stops being a room.", levels: { cove: 9, graze: 34, pools: 20, hearth: 92, terrace: 46 } },
  { id: "path", name: "Night path", hour: 2, shade: 100, cct: 1900, line: "Enough to cross the room at three in the morning without waking up properly.", levels: { cove: 3, graze: 0, pools: 0, hearth: 0, terrace: 10 } },
];

/** Daylight available outside, 0 before 05:30 and after 18:30, peak at noon. */
const daylightAt = (hour: number) => Math.max(0, Math.sin(((hour - 5.5) / 13) * Math.PI)) ** 0.7;

const skyAnchors: readonly (readonly [number, number, number, number])[] = [
  [0, 7, 11, 24], [5, 32, 40, 68], [6.5, 122, 100, 106], [8, 152, 180, 214],
  [13, 178, 206, 236], [17.5, 192, 170, 150], [19, 124, 98, 112], [20.5, 27, 35, 61], [24, 7, 11, 24],
];

const skyAt = (hour: number) => {
  const index = skyAnchors.findIndex((anchor) => anchor[0] > hour);
  const next = skyAnchors[index === -1 ? skyAnchors.length - 1 : index];
  const previous = skyAnchors[(index === -1 ? skyAnchors.length - 1 : index) - 1] ?? skyAnchors[0];
  const span = next[0] - previous[0] || 1;
  const t = (hour - previous[0]) / span;
  return [1, 2, 3].map((channel) => Math.round(previous[channel] + (next[channel] - previous[channel]) * t)).join(" ");
};

/** Blackbody approximation, adequate between 1800 K and 4500 K. */
const lampAt = (kelvin: number) => {
  const t = Math.max(1000, Math.min(6500, kelvin)) / 100;
  const clamp = (value: number) => Math.round(Math.max(0, Math.min(255, value)));
  return `255 ${clamp(99.4708 * Math.log(t) - 161.1196)} ${t <= 19 ? 0 : clamp(138.5177 * Math.log(t - 10) - 305.0448)}`;
};

const clock = (hour: number) => `${String(Math.floor(hour)).padStart(2, "0")}:${String(Math.round((hour % 1) * 60)).padStart(2, "0")}`;

export function LightDesk() {
  const exit = useExperienceExit();
  const [levels, setLevels] = useState<Levels>(scenes[3].levels);
  const [cct, setCct] = useState(scenes[3].cct);
  const [shade, setShade] = useState(scenes[3].shade);
  const [hour, setHour] = useState(scenes[3].hour);
  const [focus, setFocus] = useState<CircuitId | null>(null);

  const recall = (scene: Scene) => {
    setLevels(scene.levels);
    setCct(scene.cct);
    setShade(scene.shade);
    setHour(scene.hour);
  };

  const setLevel = (id: CircuitId, value: number) => setLevels((current) => ({ ...current, [id]: value }));

  // A scene is a set of levels, so "which scene is this" is a distance
  // question. Touch any fader and the answer becomes Custom, exactly as a
  // keypad drops its indicator the moment you override it.
  const matched = scenes.find((scene) =>
    scene.hour === hour && scene.shade === shade && scene.cct === cct &&
    circuits.every((circuit) => scene.levels[circuit.id] === levels[circuit.id]));

  const day = daylightAt(hour);
  const aperture = 1 - (shade / 100) * 0.92;
  const daylightLux = day * 640 * aperture;
  // The fire is the one source with a fixed colour, so it is weighed separately
  // from the lamps when the mixed temperature is worked out.
  const hearth = circuits.find((circuit) => circuit.id === "hearth")!;
  const hearthLux = hearth.lumens * (levels.hearth / 100);
  const lampLux = circuits.reduce((total, circuit) => total + (circuit.id === "hearth" ? 0 : circuit.lumens * (levels[circuit.id] / 100)), 0);
  const lux = Math.round(daylightLux + lampLux + hearthLux);
  const weight = daylightLux + lampLux + hearthLux;
  const mixed = weight < 1 ? cct : Math.round((daylightLux * 5600 + lampLux * cct + hearthLux * 1900) / weight / 10) * 10;
  const load = Math.round(circuits.reduce((total, circuit) => total + circuit.watts * (levels[circuit.id] / 100), 0));
  const share = Math.round((daylightLux / Math.max(1, weight)) * 100);

  // Perceived room level, which is what drives the exposure of the frame.
  // Electric light is weighted above daylight per lux because the lamps are
  // aimed into the room while most of the daylight lands on the ocean.
  const roomLight = Math.min(1, (daylightLux * 1.05 + (lampLux + hearthLux) * 1.55) / 620);

  const stageStyle = {
    "--lamp": lampAt(cct),
    "--sky": skyAt(hour),
    "--sky-a": 0.18 + day * 0.62,
    "--day-a": day * aperture,
    "--shade": shade / 100,
    // Switching a lamp off in a room the sun is already filling should not
    // leave a dark patch where the fitting was, so the subtractive layers
    // relax as daylight takes over.
    "--douse-day": 1 - day * aperture * 0.5,
    "--exposure": 0.46 + roomLight * 1.05,
    "--sat": 0.84 + roomLight * 0.3 - day * 0.18,
    "--contrast": 1 + (1 - roomLight) * 0.12,
    ...Object.fromEntries(circuits.map((circuit) => [`--l-${circuit.id}`, levels[circuit.id] / 100])),
  } as CSSProperties;

  return (
    <div className="light-desk" style={stageStyle}>
      <div className="light-desk-topbar">
        <Link className="light-desk-brand" href="/"><i /><span>Smart Home Architects</span></Link>
        <div className="light-desk-title"><span>07</span><b>Light desk</b></div>
        <div className="light-desk-links">
          <Link href="/services/lighting">Lighting, in writing</Link>
          <Link href="/experience/shading-atelier">Shading atelier</Link>
          <Link className="light-desk-exit" href={exit.href} onClick={exit.onClick} aria-label="Close the light desk">×</Link>
        </div>
      </div>

      <section className="light-desk-stage">
        <div className={`desk-frame${focus ? ` is-focus-${focus}` : ""}`}>
          <img src="/images/hero.webp" alt="Ocean-facing living room with a travertine hearth, lit by the levels set on the desk" />
          <i className="desk-layer layer-sky" aria-hidden="true" />
          <i className="desk-layer layer-daysplash" aria-hidden="true" />
          <i className="desk-shade" aria-hidden="true"><b /></i>
          <i className="desk-douse douse-graze" aria-hidden="true" />
          <i className="desk-douse douse-pools" aria-hidden="true" />
          <i className="desk-douse douse-hearth" aria-hidden="true" />
          <i className="desk-douse douse-terrace" aria-hidden="true" />
          <i className="desk-layer layer-cove" aria-hidden="true" />
          <i className="desk-layer layer-graze" aria-hidden="true" />
          <i className="desk-layer layer-pools" aria-hidden="true" />
          <i className="desk-layer layer-hearth" aria-hidden="true" />
          <i className="desk-layer layer-terrace" aria-hidden="true" />
          <div className="desk-fixtures" aria-hidden="true">
            {fixtures.map(([id, x, y], index) => (
              <i key={`${id}-${index}`} className={`desk-fixture fixture-${id}`} style={{ left: `${x}%`, top: `${y}%` } as CSSProperties} />
            ))}
          </div>
        </div>

        <div className="desk-wash" aria-hidden="true" />

        <div className="desk-copy">
          <p>ONE FRAME / EIGHT CONTROLS</p>
          <h1>Light,<br />by the number.</h1>
          <span>Atlantic House · Living room · Circuits L1–L5</span>
        </div>

        <aside className="desk-console" aria-label="Lighting desk">
          <div className="desk-console-top">
            <div className="desk-scene-name">
              <span>SCENE</span>
              <b aria-live="polite">{matched ? matched.name.toUpperCase() : "CUSTOM"}</b>
              <p>{matched ? matched.line : "Your own levels. Recall a scene to see how far you have moved from it."}</p>
            </div>

            <div className="desk-scenes" role="group" aria-label="Recall a scene">
              {scenes.map((scene) => (
                <button
                  type="button"
                  key={scene.id}
                  className={matched?.id === scene.id ? "is-active" : ""}
                  aria-pressed={matched?.id === scene.id}
                  onClick={() => recall(scene)}
                >
                  {scene.name}
                </button>
              ))}
            </div>

            <dl className="desk-readout">
              <div><dt>ILLUMINANCE</dt><dd>{lux} lx</dd></div>
              <div><dt>MIXED CCT</dt><dd>{lux > 0 ? `${mixed} K` : "—"}</dd></div>
              <div><dt>DAYLIGHT</dt><dd>{share}%</dd></div>
              <div><dt>LOAD</dt><dd>{load} W</dd></div>
            </dl>
          </div>

          <div className="desk-faders">
            {circuits.map((circuit) => (
              <label
                key={circuit.id}
                className={`desk-fader${levels[circuit.id] > 0 ? " is-live" : ""}`}
                onPointerEnter={() => setFocus(circuit.id)}
                onPointerLeave={() => setFocus(null)}
              >
                <span className="desk-fader-head">
                  <em>{circuit.address}</em>
                  <b>{circuit.name}</b>
                  <i>{levels[circuit.id]}%</i>
                </span>
                <input
                  type="range" min={0} max={100} step={1}
                  value={levels[circuit.id]}
                  aria-label={`${circuit.name} level`}
                  onFocus={() => setFocus(circuit.id)}
                  onBlur={() => setFocus(null)}
                  onChange={(event) => setLevel(circuit.id, Number(event.target.value))}
                />
                <small>{circuit.basis}{circuit.watts ? ` · ${circuit.watts} W` : ""}</small>
              </label>
            ))}
          </div>

          <div className="desk-globals">
            <label className="desk-global desk-cct">
              <span>COLOUR TEMPERATURE</span><b>{cct} K</b>
              <input type="range" min={1900} max={4000} step={50} value={cct} aria-label="Colour temperature" onChange={(event) => setCct(Number(event.target.value))} />
            </label>
            <label className="desk-global">
              <span>SHADE</span><b>{shade}% DOWN</b>
              <input type="range" min={0} max={100} step={1} value={shade} aria-label="Shade position" onChange={(event) => setShade(Number(event.target.value))} />
            </label>
            <label className="desk-global desk-clock">
              <span>TIME OF DAY</span><b>{clock(hour)}</b>
              <input type="range" min={0} max={23.75} step={0.25} value={hour} aria-label="Time of day" onChange={(event) => setHour(Number(event.target.value))} />
            </label>

            <p className="desk-note">
              {focus
                ? circuits.find((circuit) => circuit.id === focus)?.note
                : "One photograph, modulated live — no second image is ever loaded. The hearth and the stone were alight when the frame was shot, so every circuit here both adds light and takes it back out again. That goes a long way, and it is still a dodge: separating circuits properly needs a bracketed capture — one locked-off camera, one frame per circuit."}
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
