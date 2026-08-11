"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { SceneAudioElement, SceneAudioTransport, useSceneAudio } from "./SceneAudio";

const lightingScenes = [
  { id: "bright", name: "Bright", image: "/images/scene-morning.webp", level: 94, warmth: 18, time: "10:20", description: "Clear vertical light for working, choosing materials and seeing colour accurately.", metrics: [["DOWNLIGHT", "92%"], ["PENDANT", "76%"], ["ACCENT", "42%"]] },
  { id: "relax", name: "Relax", image: "/images/scene-studio-relax.webp", level: 54, warmth: 55, time: "18:42", description: "Cove, curtain and stone light hold the room while task light recedes.", metrics: [["COVE", "42%"], ["CURTAIN", "48%"], ["STONE", "56%"]] },
  { id: "entertain", name: "Entertain", image: "/images/scene-studio-entertain.webp", level: 34, warmth: 82, time: "20:08", description: "Stone, seating and low-level light balance around conversation and movement.", metrics: [["COVE", "28%"], ["SEATING", "42%"], ["STONE", "76%"]] },
  { id: "night", name: "Night", image: "/images/scene-studio-night.webp", level: 22, warmth: 96, time: "23:36", description: "A shielded reading pool and amber paths keep the room useful after dark.", metrics: [["READING", "32%"], ["PATH", "12%"], ["STONE", "22%"]] },
];

const finishes = [
  { name: "Architectural bronze", color: "#806046", text: "#f1e8dc" },
  { name: "Aged brass", color: "#9a7544", text: "#fff4d6" },
  { name: "Champagne", color: "#b8ad8f", text: "#28251e" },
  { name: "Smoked nickel", color: "#62615d", text: "#f3f0e8" },
  { name: "Natural aluminium", color: "#c6c5bf", text: "#252523" },
  { name: "Satin black", color: "#20201f", text: "#f3eee5" },
  { name: "Chalk", color: "#e7e4dc", text: "#2c2b28" },
  { name: "Graphite", color: "#3b3b39", text: "#f3eee6" },
  { name: "Burnished copper", color: "#965f43", text: "#fff0e7" },
  { name: "Custom match", color: "#817c70", text: "#f5f1e8" },
];

const sceneLabels = ["Welcome", "Bright", "Relax", "Dine", "Read", "Music", "Movie", "Night", "Away", "All off", "Sheers", "Blackout", "Cool", "Warm", "Garden"];
const assignmentScenes: Record<string, string> = {
  Welcome: "relax", Bright: "bright", Relax: "relax", Dine: "entertain", Read: "bright",
  Music: "entertain", Movie: "night", Night: "night", Cool: "bright", Warm: "relax", Garden: "entertain",
};

export function LiveResidence() {
  const [mode, setMode] = useState<"scenes" | "designer">("scenes");
  const [sceneId, setSceneId] = useState("relax");
  const scene = lightingScenes.find((item) => item.id === sceneId) ?? lightingScenes[1];
  const [level, setLevel] = useState(scene.level);
  const [warmth, setWarmth] = useState(scene.warmth);
  const [columns, setColumns] = useState(2);
  const [buttons, setButtons] = useState(3);
  const [controlType, setControlType] = useState<"scenes" | "hybrid" | "minimal">("scenes");
  const [engraving, setEngraving] = useState(true);
  const [backlight, setBacklight] = useState(68);
  const [mount, setMount] = useState<"shadow" | "flush" | "floating">("shadow");
  const [finishIndex, setFinishIndex] = useState(0);
  const [assignments, setAssignments] = useState(sceneLabels);
  const [selectedButton, setSelectedButton] = useState(0);
  const [specOpen, setSpecOpen] = useState(false);
  const [projectName, setProjectName] = useState("Residence 01");
  const [roomName, setRoomName] = useState("Living gallery");
  const [roomCommand, setRoomCommand] = useState("WELCOME / SCENE RECALLED");
  const music = useSceneAudio();
  const finish = finishes[finishIndex];
  const totalButtons = columns * buttons;
  const selectedIndex = Math.min(selectedButton, totalButtons - 1);
  const specificationId = `SHA-AX-${columns}${buttons}-${String(finishIndex + 1).padStart(2, "0")}`;

  useEffect(() => {
    lightingScenes.forEach((item) => {
      const sceneImage = new Image();
      sceneImage.src = item.image;
    });
  }, []);

  const chooseScene = (id: string, commandLabel?: string) => {
    const next = lightingScenes.find((item) => item.id === id) ?? lightingScenes[0];
    setSceneId(next.id); setLevel(next.level); setWarmth(next.warmth);
    setRoomCommand(`${(commandLabel ?? next.name).toUpperCase()} / SCENE RECALLED`);
  };

  const assignButton = (label: string) => {
    setAssignments((current) => current.map((item, index) => index === selectedIndex ? label : item));
  };

  const pressKeypadButton = (label: string, index: number) => {
    setSelectedButton(index);
    // Music recalls a scene like the others and, being the Music button, also
    // brings the room up to sound. Calling play() inside the click keeps the
    // browser's autoplay gate satisfied.
    if (label === "Music") music.play();
    const targetScene = assignmentScenes[label];
    if (targetScene) chooseScene(targetScene, label);
    else setRoomCommand(`${label.toUpperCase()} / COMMAND SENT`);
  };

  // The transport only lives on the room view, so the sound leaves with it
  // rather than playing on from a screen with no way to stop it.
  const showDesigner = () => { music.stop(); setMode("designer"); };

  const roomStyle = {
    "--room-level": `${1 + Math.max(0, level - scene.level) / 285}`,
    "--room-dim": `${Math.max(0, scene.level - level) / 160}`,
    "--room-warm": `${Math.max(0, warmth - scene.warmth) / 285}`,
    "--room-cool": `${Math.max(0, scene.warmth - warmth) / 330}`,
  } as CSSProperties;
  const keypadStyle = {
    "--keypad-finish": finish.color,
    "--keypad-text": finish.text,
    "--keypad-backlight": `${backlight / 100}`,
    "--keypad-columns": columns,
    "--keypad-rows": buttons,
  } as CSSProperties;
  return (
    <div className={`residence-control-suite mode-${mode}`}>
      <SceneAudioElement audio={music} />
      <div className="control-suite-topbar">
        <button className="control-suite-brand" type="button" onClick={() => setMode("scenes")}><i /><span>Smart Home Architects</span></button>
        <div className="control-suite-switch" role="tablist" aria-label="Interactive experience">
          <button type="button" role="tab" aria-selected={mode === "scenes"} className={mode === "scenes" ? "is-active" : ""} onClick={() => setMode("scenes")}><span>01</span>Lighting scenes</button>
          <button type="button" role="tab" aria-selected={mode === "designer"} className={mode === "designer" ? "is-active" : ""} onClick={showDesigner}><span>02</span>Keypad designer</button>
        </div>
        <Link className="control-suite-exit" href="/" aria-label="Close interactive experience">×</Link>
      </div>

      {mode === "scenes" ? (
        <section className={`lighting-scene-screen is-${scene.id}`} style={{ ...roomStyle, ...keypadStyle }}>
          <img decoding="async" key={scene.id} src={scene.image} alt={`Living room in the ${scene.name.toLowerCase()} lighting scene`} />
          <div className="lighting-scene-dim" />
          <div className="lighting-scene-warm" />
          <div className="lighting-scene-cool" />
          <div className="lighting-screen-title">
            <p>Lighting scenes</p>
            <h1>Living gallery</h1>
            <span>Residence 01 · Ground level</span>
          </div>
          <div className="lighting-screen-status"><span>LOCAL / LIVE</span><b>{scene.time}</b></div>

          <aside className="room-keypad-control" aria-label="Configured wall control">
            <div className="room-keypad-head"><span>WALL CONTROL / LIVE</span><button type="button" onClick={showDesigner}>EDIT</button></div>
            <div className={`room-keypad-plate mount-${mount} type-${controlType}`}>
              <div className="configured-keypad-surface">
                {Array.from({ length: totalButtons }, (_, index) => <button type="button" key={index} className={selectedIndex === index ? "is-selected" : ""} aria-label={`Recall ${assignments[index]}`} aria-pressed={selectedIndex === index} onClick={() => pressKeypadButton(assignments[index], index)}><i />{engraving && controlType !== "minimal" ? <span>{controlType === "hybrid" && index % 3 === 1 ? index % 2 ? "+" : "−" : assignments[index]}</span> : null}<b /></button>)}
              </div>
            </div>
            <p><i /><span>{roomCommand}</span></p>
            <SceneAudioTransport audio={music} />
          </aside>

          <aside className="lighting-control-panel" aria-label="Lighting scene controls">
            <div className="lighting-panel-head"><span>ROOM / 01</span><b>SCENES</b></div>
            <strong>{scene.name}</strong>
            <p>{scene.description}</p>
            <div className="lighting-scene-options">
              {lightingScenes.map((item) => <button type="button" key={item.id} className={item.id === scene.id ? "is-active" : ""} onClick={() => chooseScene(item.id)} aria-pressed={item.id === scene.id}><i /><span>{item.name}</span><b>{String(item.level).padStart(2, "0")}%</b></button>)}
            </div>
            <label><span>MASTER LEVEL</span><b>{level}%</b><input type="range" min="0" max="100" value={level} onChange={(event) => setLevel(Number(event.target.value))} /></label>
            <label><span>WARMTH</span><b>{warmth}%</b><input type="range" min="0" max="100" value={warmth} onChange={(event) => setWarmth(Number(event.target.value))} /></label>
          </aside>

          <div className="lighting-screen-footer">
            <div><span>ACTIVE SCENE</span><strong>{scene.name}</strong></div>
            <dl>{scene.metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            <button type="button" onClick={showDesigner}><span>DESIGN THE WALL CONTROL</span><b>→</b></button>
          </div>
        </section>
      ) : (
        <section className="keypad-designer-screen" style={keypadStyle}>
          <aside className="keypad-design-controls">
            <div className="designer-heading"><span>CONTROL / AXIS MODULAR</span><b>LIVE CONFIGURATION</b></div>
            <h1>Keypad<br />designer.</h1>
            <div className="designer-control-group">
              <p>KEYPAD COLUMNS</p>
              <div className="designer-segments columns">{[1,2,3].map((count) => <button type="button" key={count} className={columns === count ? "is-active" : ""} onClick={() => setColumns(count)} aria-label={`${count} columns`}><span>{Array.from({ length: count }, (_, index) => <i key={index} />)}</span><b>{count}</b></button>)}</div>
            </div>
            <div className="designer-control-group">
              <p>BUTTONS PER COLUMN</p>
              <div className="designer-segments buttons">{[2,3,4,5].map((count) => <button type="button" key={count} className={buttons === count ? "is-active" : ""} onClick={() => setButtons(count)}><span>{Array.from({ length: count }, (_, index) => <i key={index} />)}</span><b>{count}</b></button>)}</div>
            </div>
            <div className="designer-control-group">
              <p>CONTROL LANGUAGE</p>
              <div className="designer-text-options">{(["scenes","hybrid","minimal"] as const).map((type) => <button type="button" key={type} className={controlType === type ? "is-active" : ""} onClick={() => setControlType(type)}>{type}</button>)}</div>
            </div>
            <div className="designer-toggle-row"><span>ENGRAVING</span><button type="button" className={engraving ? "is-on" : ""} onClick={() => setEngraving((value) => !value)} aria-pressed={engraving}><i /></button></div>
            <label className="designer-slider"><span>BACKLIGHT</span><b>{backlight}%</b><input type="range" min="0" max="100" value={backlight} onChange={(event) => setBacklight(Number(event.target.value))} /></label>
            <div className="designer-control-group mount-group"><p>MOUNTING DETAIL</p><div className="designer-text-options">{(["shadow","flush","floating"] as const).map((type) => <button type="button" key={type} className={mount === type ? "is-active" : ""} onClick={() => setMount(type)}>{type}</button>)}</div></div>
            <div className="designer-control-group assignment-editor">
              <p>BUTTON ASSIGNMENT</p>
              <div><span>BUTTON {String(selectedIndex + 1).padStart(2, "0")}</span><select value={assignments[selectedIndex]} onChange={(event) => assignButton(event.target.value)} aria-label={`Assignment for button ${selectedIndex + 1}`}>{sceneLabels.map((label) => <option key={label}>{label}</option>)}</select></div>
              <small>Select a button on the keypad, then choose the scene or action it should recall.</small>
            </div>
          </aside>

          <div className="keypad-product-stage">
            <div className="keypad-stage-grid" aria-hidden="true" />
            <div className={`configured-keypad mount-${mount} type-${controlType}`}>
              <div className="configured-keypad-surface">
                {Array.from({ length: totalButtons }, (_, index) => <button type="button" key={index} className={selectedIndex === index ? "is-selected" : ""} aria-label={`Edit button ${index + 1}: ${assignments[index]}`} aria-pressed={selectedIndex === index} onClick={() => setSelectedButton(index)}><i />{engraving && controlType !== "minimal" ? <span>{controlType === "hybrid" && index % 3 === 1 ? index % 2 ? "+" : "−" : assignments[index]}</span> : null}<b /></button>)}
              </div>
            </div>
            <div className="keypad-dimensions" aria-hidden="true"><span>88 MM</span><i /><b>8.6 MM</b></div>
            <p className="keypad-configuration-summary"><span>{columns} COLUMN{columns > 1 ? "S" : ""} / {totalButtons} BUTTONS / {finish.name.toUpperCase()}</span><b>CONFIGURATION / LIVE</b></p>
          </div>

          <aside className="keypad-finish-controls">
            <div><span>MATERIAL / 0{finishIndex + 1}</span><b>{finish.name}</b></div>
            <h2>Wallplate<br />finish.</h2>
            <div className="keypad-finish-grid">{finishes.map((item, index) => <button type="button" key={item.name} className={finishIndex === index ? "is-active" : ""} onClick={() => setFinishIndex(index)} aria-pressed={finishIndex === index}><i style={{ background: item.color }} /><span>{item.name}</span></button>)}</div>
            <div className="keypad-designer-actions">
              <button className="keypad-specification-button" type="button" onClick={() => setSpecOpen(true)}><span>CREATE PROJECT SPECIFICATION</span><b>↗</b></button>
              <button className="keypad-room-preview" type="button" onClick={() => setMode("scenes")}><span>PREVIEW IN THE ROOM</span><b>→</b></button>
            </div>
          </aside>
        </section>
      )}

      {specOpen ? (
        <div className="keypad-spec-overlay" style={keypadStyle} role="dialog" aria-modal="true" aria-labelledby="keypad-spec-title">
          <div className="keypad-spec-shell">
            <div className="keypad-spec-toolbar">
              <div><i /><span>PROJECT DOCUMENT / LIVE CONFIGURATION</span></div>
              <div><button type="button" onClick={() => window.print()}>PRINT / SAVE PDF</button><button type="button" onClick={() => setSpecOpen(false)} aria-label="Close specification">×</button></div>
            </div>
            <article className="keypad-spec-sheet">
              <header>
                <div className="keypad-spec-brand"><i /><span>SMART HOME<br />ARCHITECTS</span></div>
                <div><span>CONTROL SCHEDULE</span><b>{specificationId}</b></div>
              </header>
              <section className="keypad-spec-title">
                <div className="keypad-spec-fields">
                  <label><span>PROJECT</span><input value={projectName} onChange={(event) => setProjectName(event.target.value)} /></label>
                  <label><span>ROOM / ZONE</span><input value={roomName} onChange={(event) => setRoomName(event.target.value)} /></label>
                </div>
                <h2 id="keypad-spec-title">Architectural<br />keypad schedule.</h2>
              </section>
              <section className="keypad-spec-overview">
                <div className="spec-keypad-render">
                  <div>{Array.from({ length: totalButtons }, (_, index) => <span key={index}>{assignments[index]}</span>)}</div>
                </div>
                <dl>
                  <div><dt>CONTROL</dt><dd>Axis modular keypad</dd></div>
                  <div><dt>CONFIGURATION</dt><dd>{columns} column{columns > 1 ? "s" : ""} / {totalButtons} buttons</dd></div>
                  <div><dt>FINISH</dt><dd><i style={{ background: finish.color }} />{finish.name}</dd></div>
                  <div><dt>MOUNTING</dt><dd>{mount}</dd></div>
                  <div><dt>LANGUAGE</dt><dd>{controlType}</dd></div>
                  <div><dt>ENGRAVING</dt><dd>{engraving ? "Included" : "None"}</dd></div>
                  <div><dt>BACKLIGHT</dt><dd>{backlight}%</dd></div>
                </dl>
              </section>
              <section className="keypad-spec-schedule">
                <div><span>BUTTON SCHEDULE</span><b>{totalButtons} ASSIGNMENTS</b></div>
                <ol>{Array.from({ length: totalButtons }, (_, index) => <li key={index}><span>{String(index + 1).padStart(2, "0")}</span><b>{assignments[index]}</b><em>C{Math.floor(index / buttons) + 1} / P{index % buttons + 1}</em></li>)}</ol>
              </section>
              <footer><p>Concept specification. Final electrical loading, compatibility, engraving and finish samples to be confirmed during detailed design.</p><div><span>SMART HOME ARCHITECTS</span><b>CONTROL / LIGHT / ATMOSPHERE</b></div></footer>
            </article>
          </div>
        </div>
      ) : null}
    </div>
  );
}
