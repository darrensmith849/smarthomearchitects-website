"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SystemId = "lighting" | "shading" | "climate" | "audio";

type Scene = {
  id: string;
  time: string;
  name: string;
  line: string;
  image: string;
  values: Record<SystemId, string>;
};

const scenes: Scene[] = [
  {
    id: "morning",
    time: "06:28",
    name: "First light",
    line: "The house begins softly, before the day asks for anything.",
    image: "/images/scene-morning.webp",
    values: { lighting: "2,400 K / 18%", shading: "EAST / 26%", climate: "21.2 °C", audio: "QUIET" },
  },
  {
    id: "welcome",
    time: "18:42",
    name: "Welcome",
    line: "A warm arrival, composed around the room already waiting.",
    image: "/images/scene-welcome.webp",
    values: { lighting: "2,700 K / 42%", shading: "PRIVACY / 48%", climate: "22.0 °C", audio: "FAVOURITES / −28 dB" },
  },
  {
    id: "dinner",
    time: "20:08",
    name: "At table",
    line: "The room narrows its focus: people, food, and a slower evening.",
    image: "/images/scene-dinner.webp",
    values: { lighting: "2,300 K / 31%", shading: "GARDEN / OPEN", climate: "21.6 °C", audio: "DINING / −36 dB" },
  },
  {
    id: "night",
    time: "23:10",
    name: "Goodnight",
    line: "The house becomes protective, calm and quietly aware.",
    image: "/images/scene-night.webp",
    values: { lighting: "2,200 K / 4%", shading: "SHELL / SECURE", climate: "19.4 °C", audio: "OFF" },
  },
];

const systems: Array<{ id: SystemId; label: string; title: string; href: string; copy: string }> = [
  { id: "lighting", label: "01", title: "Light", href: "/services/lighting", copy: "Intensity and colour settle to the hour, material and activity." },
  { id: "shading", label: "02", title: "Shade", href: "/services/shading", copy: "Daylight, glare and privacy are edited without losing the view." },
  { id: "climate", label: "03", title: "Air", href: "/services/climate", copy: "Comfort is prepared before a room begins to feel different." },
  { id: "audio", label: "04", title: "Sound", href: "/services/audio", copy: "Music moves with the moment while the hardware stays unseen." },
];

export function SceneExperience() {
  const [sceneId, setSceneId] = useState("welcome");
  const [focusedSystem, setFocusedSystem] = useState<SystemId>("lighting");
  const [isPlaying, setIsPlaying] = useState(false);
  const scene = scenes.find((item) => item.id === sceneId) ?? scenes[1];
  const focused = systems.find((item) => item.id === focusedSystem) ?? systems[0];
  const sceneIndex = scenes.findIndex((item) => item.id === scene.id);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => {
      if (sceneIndex === scenes.length - 1) {
        setIsPlaying(false);
        return;
      }
      setSceneId(scenes[sceneIndex + 1].id);
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [isPlaying, sceneIndex]);

  const chooseScene = (id: string) => {
    setIsPlaying(false);
    setSceneId(id);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (sceneIndex === scenes.length - 1) setSceneId(scenes[0].id);
    setIsPlaying(true);
  };

  return (
    <>
      <section className={`scene-lab scene-${scene.id}`}>
        <div className="scene-lab-copy">
          <p className="eyebrow">Scene lab · 03</p>
          <h1>The room,<br />in rhythm.</h1>
          <p>Choose a moment. Light, shade, comfort and sound change together—leaving the people in the room with one simple feeling instead of four separate controls.</p>
          <button className={`scene-play${isPlaying ? " is-playing" : ""}`} type="button" onClick={togglePlayback} aria-pressed={isPlaying}>
            <i aria-hidden="true" /><span>{isPlaying ? "Pause the rhythm" : "Play the rhythm"}</span><b>{isPlaying ? "LIVE" : "17 SEC"}</b>
          </button>
          <div className="scene-lab-controls" role="group" aria-label="Choose a room moment">
            {scenes.map((item) => (
              <button className={item.id === scene.id ? "is-active" : ""} type="button" key={item.id} onClick={() => chooseScene(item.id)} aria-pressed={item.id === scene.id}>
                <span>{item.time}</span><b>{item.name}</b>
              </button>
            ))}
          </div>
        </div>

        <div className="scene-lab-room">
          <img decoding="async" className="scene-room-image" key={scene.id} src={scene.image} alt={`The coastal living room at ${scene.name.toLowerCase()}`} />
          <div className="scene-room-grid" aria-hidden="true"><i /><i /><i /><i /></div>

          <p className="scene-room-label">LIVING / GROUND FLOOR</p>
          <div className="scene-live-panel" aria-live="polite">
            <div className="scene-live-heading"><span>HOME / LIVE</span><span>{scene.time}</span></div>
            <strong>{scene.name}</strong>
            <p>{scene.line}</p>
            <div className="scene-live-readouts">
              {systems.map((system) => <div className={system.id === focusedSystem ? "is-selected" : ""} key={system.id}><span>{system.title}</span><b>{scene.values[system.id]}</b></div>)}
            </div>
          </div>

          <div className="scene-hotspots" aria-label="Inspect systems in this scene">
            {systems.map((system) => (
              <button className={`scene-hotspot ${system.id}${system.id === focusedSystem ? " is-selected" : ""}`} type="button" key={system.id} onClick={() => setFocusedSystem(system.id)} aria-pressed={system.id === focusedSystem}>
                <i /><span>{system.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="scene-system-detail section-pad">
        <div className="section-label"><span>{focused.label}</span><span>System in focus</span></div>
        <div className="scene-system-copy">
          <p className="eyebrow">{focused.title} / {scene.name}</p>
          <h2>{scene.values[focused.id]}</h2>
          <p>{focused.copy}</p>
          <Link className="text-link" href={focused.href}>Explore {focused.title.toLowerCase()} <span>→</span></Link>
        </div>
        <div className="scene-logic">
          <p>THE LOGIC</p>
          <div><span>01</span><b>Room context</b><small>Time, daylight and presence establish the starting point.</small></div>
          <div><span>02</span><b>Shared response</b><small>Every relevant system receives one considered scene instruction.</small></div>
          <div><span>03</span><b>Human always wins</b><small>Any control can be adjusted without breaking the whole composition.</small></div>
        </div>
      </section>

      <section className="scene-principle section-pad">
        <p className="eyebrow eyebrow-light">One experience, four systems</p>
        <h2>Automation is only useful when it feels like the room is simply ready.</h2>
        <div className="scene-principle-list">
          {systems.map((system) => <button type="button" key={system.id} onClick={() => setFocusedSystem(system.id)}><span>{system.label}</span><b>{system.title}</b><i className={system.id === focusedSystem ? "is-active" : ""} /></button>)}
        </div>
      </section>
    </>
  );
}
