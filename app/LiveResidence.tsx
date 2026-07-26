"use client";

import { useEffect, useState, type CSSProperties } from "react";

const moments = [
  { id: "dawn", time: "06:30", label: "First light", image: "/images/scene-morning.jpg", line: "The house opens gently to the day.", systems: [["LIGHT", "24% / 3200 K"], ["SHADES", "EAST / OPENING"], ["CLIMATE", "21.5 °C"], ["SECURITY", "NIGHT / RELEASE"]] },
  { id: "arrival", time: "18:12", label: "Welcome", image: "/images/scene-welcome.jpg", line: "Arrival unfolds before the door opens.", systems: [["LIGHT", "38% / 2700 K"], ["SHADES", "COURTYARD / OPEN"], ["CLIMATE", "22.0 °C"], ["AUDIO", "LIVING / RESUME"]] },
  { id: "dinner", time: "20:04", label: "Dinner", image: "/images/scene-dinner.jpg", line: "The table becomes the centre of the room.", systems: [["LIGHT", "31% / 2400 K"], ["SHADES", "PRIVACY / CLOSED"], ["CLIMATE", "21.0 °C"], ["AUDIO", "DINING / −28 dB"]] },
  { id: "night", time: "23:36", label: "House at rest", image: "/images/scene-night.jpg", line: "Everything unnecessary becomes still.", systems: [["LIGHT", "PATH / 8%"], ["SHADES", "BLACKOUT / CLOSED"], ["CLIMATE", "19.0 °C"], ["SECURITY", "PERIMETER / SET"]] },
];

const rooms = [
  { id: "living", index: "01", name: "Living room", state: "OCCUPIED", note: "The courtyard remains visible while glare is held at the western glass.", values: [["LIGHT", "38% / AMBIENT"], ["SHADE", "WEST / 62%"], ["COMFORT", "22.0 °C"], ["SOUND", "PLAYING / −31 dB"]] },
  { id: "kitchen", index: "02", name: "Kitchen", state: "READY", note: "Task surfaces are clear; surrounding light stays below the working plane.", values: [["LIGHT", "64% / TASK"], ["SHADE", "NORTH / OPEN"], ["COMFORT", "21.5 °C"], ["AIR", "EXTRACT / IDLE"]] },
  { id: "suite", index: "03", name: "Principal suite", state: "SETTLED", note: "Warm low-level light and silent air prepare the room without announcing a mode.", values: [["LIGHT", "12% / AMBER"], ["SHADE", "BLACKOUT / OPEN"], ["COMFORT", "20.5 °C"], ["SOUND", "SILENT"]] },
  { id: "cinema", index: "04", name: "Private cinema", state: "READY", note: "Projection, masking, guide light and reference sound wait behind one action.", values: [["LIGHT", "GUIDE / 6%"], ["MASKING", "2.39:1 / READY"], ["COMFORT", "20.0 °C"], ["SOUND", "REFERENCE / ARMED"]] },
  { id: "courtyard", index: "05", name: "Courtyard", state: "CLEAR", note: "Landscape light and perimeter awareness protect the view without turning it into a boundary.", values: [["LIGHT", "18% / LANDSCAPE"], ["IRRIGATION", "NEXT / 05:20"], ["WEATHER", "18.4 °C / DRY"], ["PERIMETER", "CLEAR"]] },
];

const composerPresets = [
  { id: "focus", label: "Focus", light: 72, shade: 34, temperature: 3400, sound: 0 },
  { id: "dine", label: "Dine", light: 31, shade: 8, temperature: 2400, sound: 38 },
  { id: "unwind", label: "Unwind", light: 18, shade: 0, temperature: 2200, sound: 24 },
  { id: "clear", label: "Clear room", light: 0, shade: 0, temperature: 2700, sound: 0 },
];

const arrivalSteps = [
  ["01", "Perimeter recognises arrival", "Driveway and entry paths rise to eighteen percent."],
  ["02", "The envelope receives you", "Entry unlocks, blinds hold privacy and comfort returns."],
  ["03", "The living room gathers", "Courtyard light, ambient scene and preferred audio arrive together."],
  ["04", "The system disappears", "Temporary guide lights release. Only the intended atmosphere remains."],
];

export function LiveResidence() {
  const [momentIndex, setMomentIndex] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [roomId, setRoomId] = useState("living");
  const [light, setLight] = useState(31);
  const [shade, setShade] = useState(8);
  const [temperature, setTemperature] = useState(2400);
  const [sound, setSound] = useState(38);
  const [presetId, setPresetId] = useState("dine");
  const [arrivalStep, setArrivalStep] = useState(-1);
  const moment = moments[momentIndex];
  const room = rooms.find((item) => item.id === roomId) ?? rooms[0];

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setMomentIndex((index) => (index + 1) % moments.length), 4200);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (arrivalStep < 0 || arrivalStep >= arrivalSteps.length - 1) return;
    const timer = window.setTimeout(() => setArrivalStep((step) => step + 1), 1250);
    return () => window.clearTimeout(timer);
  }, [arrivalStep]);

  const chooseMoment = (index: number) => { setMomentIndex(index); setPlaying(false); };
  const applyPreset = (preset: typeof composerPresets[number]) => {
    setPresetId(preset.id); setLight(preset.light); setShade(preset.shade); setTemperature(preset.temperature); setSound(preset.sound);
  };
  const composerStyle = {
    "--composer-light": `${0.48 + light / 120}`,
    "--composer-dark": `${Math.max(0, (72 - light) / 100)}`,
    "--composer-warm": `${Math.max(0, 1 - (temperature - 2200) / 2800) * 0.42}`,
    "--composer-shade": `${shade - 100}%`,
    "--composer-sound": `${0.25 + sound / 100}`,
  } as CSSProperties;
  const composerControls: Array<{ label: string; value: number; unit: string; min: number; max: number; set: (value: number) => void }> = [
    { label: "LIGHT", value: light, unit: "%", min: 0, max: 100, set: setLight },
    { label: "SHADE", value: shade, unit: "% OPEN", min: 0, max: 100, set: setShade },
    { label: "WARMTH", value: temperature, unit: " K", min: 2200, max: 5000, set: setTemperature },
    { label: "SOUND", value: sound, unit: "%", min: 0, max: 70, set: setSound },
  ];

  return (
    <>
      <section className={`residence-live-hero is-${moment.id}`}>
        <img key={moment.id} src={moment.image} alt={`Architectural living space during ${moment.label.toLowerCase()}`} />
        <div className="residence-hero-wash" />
        <div className="residence-hero-frame" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="residence-hero-copy">
          <p className="eyebrow eyebrow-light">Interactive residence · Local demonstration</p>
          <h1>A home<br />in motion.</h1>
          <p>Move through one day. Enter the rooms. Compose a scene. See how the invisible system turns separate technologies into one calm experience.</p>
        </div>
        <div className="residence-live-readout" aria-live="polite">
          <div><span>RESIDENCE / 01</span><b>{playing ? "DAY RUNNING" : "LOCAL / LIVE"}</b></div>
          <strong>{moment.time}</strong>
          <h2>{moment.label}</h2>
          <p>{moment.line}</p>
          <dl key={moment.id}>{moment.systems.map(([label, value], index) => <div key={label} style={{ animationDelay: `${index * 90}ms` }}><dt>{label}</dt><dd>{value}</dd><i /></div>)}</dl>
        </div>
        <div className="residence-day-control">
          <button type="button" className="residence-play" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}><span>{playing ? "PAUSE DAY" : "PLAY THE DAY"}</span><b>{playing ? "Ⅱ" : "▶"}</b></button>
          <div className="residence-day-line" aria-hidden="true"><i style={{ left: `${(momentIndex / (moments.length - 1)) * 100}%` }} /></div>
          {moments.map((item, index) => <button type="button" key={item.id} className={index === momentIndex ? "is-active" : ""} onClick={() => chooseMoment(index)} aria-pressed={index === momentIndex}><span>{item.time}</span><strong>{item.label}</strong><i /></button>)}
        </div>
      </section>

      <section className="residence-room-section section-pad">
        <div className="residence-section-intro">
          <div className="section-label"><span>01</span><span>Room intelligence</span></div>
          <div><p className="eyebrow">The home, organised spatially</p><h2>Start with the room.<br />Not the device.</h2></div>
          <p>The interface follows the architecture. Select a room to see its current state across every connected discipline.</p>
        </div>
        <div className="residence-room-console">
          <div className="residence-floorplan" aria-label="Residence rooms">
            <div className="residence-plan-grid" aria-hidden="true"><i /><i /><i /><i /><b /><b /></div>
            {rooms.map((item) => <button type="button" key={item.id} className={`room-${item.id}${item.id === room.id ? " is-active" : ""}`} onClick={() => setRoomId(item.id)} aria-pressed={item.id === room.id}><span>{item.index}</span><strong>{item.name}</strong><i /></button>)}
            <p><span>GROUND + LOWER LEVEL / NOT TO SCALE</span><b>LIVE OCCUPANCY MAP</b></p>
          </div>
          <div className="residence-room-readout" aria-live="polite">
            <div><span>ROOM / {room.index}</span><b>{room.state}</b></div>
            <strong>{room.name}</strong>
            <p>{room.note}</p>
            <dl key={room.id}>{room.values.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd><i /></div>)}</dl>
          </div>
        </div>
        <div className="residence-room-tabs" role="group" aria-label="Choose a room">{rooms.map((item) => <button type="button" key={item.id} className={item.id === room.id ? "is-active" : ""} onClick={() => setRoomId(item.id)}><span>{item.index}</span><strong>{item.name}</strong><i /></button>)}</div>
      </section>

      <section className="residence-composer section-pad" style={composerStyle}>
        <div className="residence-composer-intro">
          <div className="section-label section-label-light"><span>02</span><span>Live scene composer</span></div>
          <h2>Dial the feeling.<br />Watch the room answer.</h2>
          <p>Adjust the four human-facing outcomes. The system resolves the technical commands behind them and previews the atmosphere immediately.</p>
        </div>
        <div className="residence-composer-console">
          <div className="residence-composer-visual">
            <img src="/images/scene-dinner.jpg" alt="Living room used for live scene composition" />
            <div className="residence-composer-dark" />
            <div className="residence-composer-warm" />
            <div className="residence-composer-shade" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className="residence-composer-sound" aria-hidden="true"><i /><i /><i /></div>
            <div className="residence-composer-meta"><span>LIVE PREVIEW / LIVING</span><b>{presetId.toUpperCase()} / UNSAVED STUDY</b></div>
          </div>
          <div className="residence-composer-panel">
            <div><span>SCENE PARAMETERS</span><b>LOCAL / PREVIEW</b></div>
            {composerControls.map((control) => <label key={control.label}><span>{control.label}</span><strong>{control.value}{control.unit}</strong><input type="range" min={control.min} max={control.max} value={control.value} onChange={(event) => { control.set(Number(event.target.value)); setPresetId("custom"); }} /></label>)}
            <div className="residence-presets">{composerPresets.map((preset) => <button type="button" key={preset.id} className={preset.id === presetId ? "is-active" : ""} onClick={() => applyPreset(preset)}>{preset.label}</button>)}</div>
          </div>
        </div>
      </section>

      <section className={`residence-arrival section-pad step-${arrivalStep}`}>
        <div className="residence-arrival-visual">
          <img src="/images/scene-welcome.jpg" alt="Home entrance and living space during an arrival sequence" />
          <div /><i /><i /><i /><i />
          <p><span>ARRIVAL SEQUENCE / LOCAL</span><b>{arrivalStep < 0 ? "READY" : arrivalStep >= arrivalSteps.length - 1 ? "COMPLETE" : `STEP 0${arrivalStep + 1}`}</b></p>
        </div>
        <div className="residence-arrival-copy">
          <div className="section-label"><span>03</span><span>Arrival choreography</span></div>
          <p className="eyebrow">One event · A sequence of considered changes</p>
          <h2>The home receives you.</h2>
          <button type="button" onClick={() => setArrivalStep(0)}><span>{arrivalStep >= 0 ? "Run arrival again" : "Run arrival"}</span><b>▶</b></button>
          <ol>{arrivalSteps.map(([index, title, copy], step) => <li key={index} className={step <= arrivalStep ? "is-active" : ""}><span>{index}</span><div><strong>{title}</strong><p>{copy}</p></div><i /></li>)}</ol>
        </div>
      </section>
    </>
  );
}
