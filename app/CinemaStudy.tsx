"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Star = { x: number; y: number; size: number; opacity: number; delay: number };

function makeStars(count: number, seed: number, depth: number): Star[] {
  return Array.from({ length: count }, (_, index) => ({
    x: 2 + ((index * 37 + seed * 13) % 96),
    y: 2 + ((index * 61 + seed * 19) % 96),
    size: 0.7 + ((index * 11 + seed) % 4) * 0.42 * depth,
    opacity: 0.28 + ((index * 17 + seed) % 63) / 100,
    delay: (index * 0.47 + seed) % 8,
  }));
}

const starLayers = [makeStars(30, 3, 0.6), makeStars(23, 7, 1), makeStars(22, 11, 1.45)];

function starStyle(star: Star): CSSProperties {
  return { left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`, opacity: star.opacity, animationDelay: `-${star.delay}s` };
}

const cinemaFormats = [
  { id: "arrival", index: "01", time: "00:00", title: "Arrival", ratio: "CLOSED", status: "CUE / ENTER", headline: "Arrival is the first frame.", description: "The room cools, aisle edges settle at eighteen percent and the system wakes behind a closed screen. Nothing flashes. Nothing asks for setup.", cues: [["AISLES", "18%"], ["CLIMATE", "21 °C"], ["SYSTEM", "WAKING"]] },
  { id: "broadcast", index: "02", time: "00:18", title: "16:9 programme", ratio: "1.78:1", status: "MASKING / SIDE", headline: "Every image keeps its intended edge.", description: "Side masking closes precisely around broadcast, concert and episodic material. The unused screen disappears into velvet-black architecture.", cues: [["IMAGE", "4K HDR"], ["LENS", "MEMORY 01"], ["SOUND", "7.2.4"]] },
  { id: "flat", index: "03", time: "00:32", title: "Flat feature", ratio: "1.85:1", status: "MASKING / FLAT", headline: "The room frames the composition.", description: "A small lateral adjustment creates a perfectly bounded 1.85 image while projection geometry, brightness and reference level recall together.", cues: [["IMAGE", "DCI FLAT"], ["LENS", "MEMORY 02"], ["SOUND", "9.4.6"]] },
  { id: "scope", index: "04", time: "00:45", title: "Scope feature", ratio: "2.39:1", status: "FEATURE / REFERENCE", headline: "Architecture leaves only the film.", description: "Top and bottom masking meet the CinemaScope image, the final guide light releases and the calibrated room disappears into the feature.", cues: [["IMAGE", "DCI SCOPE"], ["LIGHT", "0.5% / EXIT"], ["LEVEL", "−3 dB REF"]] },
];

export function CinemaStudy() {
  const [formatId, setFormatId] = useState("scope");
  const format = cinemaFormats.find((item) => item.id === formatId) ?? cinemaFormats[3];
  const studyRef = useRef<HTMLElement>(null);
  const starfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = studyRef.current;
      const starfield = starfieldRef.current;
      if (!element || !starfield) return;
      const rect = starfield.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const travel = progress - 0.5;
      element.style.setProperty("--stars-far-x", `${travel * 18}px`);
      element.style.setProperty("--stars-far-y", `${travel * -58}px`);
      element.style.setProperty("--stars-far-scale", `${0.94 + progress * 0.1}`);
      element.style.setProperty("--stars-mid-x", `${travel * -38}px`);
      element.style.setProperty("--stars-mid-y", `${travel * -154}px`);
      element.style.setProperty("--stars-mid-scale", `${0.86 + progress * 0.36}`);
      element.style.setProperty("--stars-near-x", `${travel * 82}px`);
      element.style.setProperty("--stars-near-y", `${travel * -326}px`);
      element.style.setProperty("--stars-near-scale", `${0.68 + progress * 0.78}`);
      element.style.setProperty("--stars-near-roll", `${travel * 2.4}deg`);
      element.style.setProperty("--stars-copy-y", `${travel * -28}px`);

      const consoleElement = element.querySelector<HTMLElement>(".cinema-study-console");
      if (consoleElement) {
        const consoleRect = consoleElement.getBoundingClientRect();
        const ceilingProgress = Math.max(0, Math.min(1, (window.innerHeight - consoleRect.top) / (window.innerHeight + consoleRect.height)));
        const roomTravel = ceilingProgress - 0.5;
        const roomMotion = Math.min(1, Math.max(0.58, window.innerWidth / 1200));
        element.style.setProperty("--room-stars-far-x", `${roomTravel * 12 * roomMotion}px`);
        element.style.setProperty("--room-stars-far-y", `${roomTravel * -30 * roomMotion}px`);
        element.style.setProperty("--room-stars-far-scale", `${0.96 + ceilingProgress * 0.06}`);
        element.style.setProperty("--room-stars-mid-x", `${roomTravel * -32 * roomMotion}px`);
        element.style.setProperty("--room-stars-mid-y", `${roomTravel * -88 * roomMotion}px`);
        element.style.setProperty("--room-stars-mid-scale", `${0.88 + ceilingProgress * 0.26}`);
        element.style.setProperty("--room-stars-near-x", `${roomTravel * 72 * roomMotion}px`);
        element.style.setProperty("--room-stars-near-y", `${roomTravel * -184 * roomMotion}px`);
        element.style.setProperty("--room-stars-near-scale", `${0.72 + ceilingProgress * 0.62}`);
        element.style.setProperty("--room-stars-near-roll", `${roomTravel * 2.2}deg`);
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  return (
    <section ref={studyRef} className="cinema-study section-pad">
      <div className="cinema-study-intro">
        <div className="section-label section-label-light"><span>02</span><span>Masking room</span></div>
        <div><p className="eyebrow eyebrow-light">One room · Every intended frame</p><h2>The room edits<br />itself out.</h2></div>
        <p>A great private cinema is a sequence of physical decisions: proportion, silence, masking, calibration and one effortless beginning.</p>
      </div>

      <div ref={starfieldRef} className="cinema-star-descent">
        <div className="cinema-star-depth" aria-hidden="true">
          {starLayers.map((stars, layerIndex) => <div className={`cinema-star-layer layer-${layerIndex + 1}`} key={layerIndex}>{stars.map((star, index) => <i key={index} style={starStyle(star)} />)}</div>)}
        </div>
        <div className="cinema-star-copy"><span>FIBRE-OPTIC CEILING / FIELD 06</span><strong>2,400 points.<br />No repeated pattern.</strong><p>Three optical depths dissolve the ceiling plane before the film begins.</p><i /></div>
      </div>

      <div className="cinema-study-console">
        <div className="cinema-room-stage">
          <img src="/images/cinema-room.jpg" alt="Symmetrical private cinema with acoustic fabric, smoked oak and a mechanically masked projection screen" />
          <div className="cinema-room-star-depth" aria-hidden="true">
            {starLayers.map((stars, layerIndex) => <div className={`cinema-room-star-layer room-layer-${layerIndex + 1}`} key={layerIndex}>{stars.map((star, index) => <i key={index} style={starStyle(star)} />)}</div>)}
          </div>
          <div className={`cinema-aperture is-${format.id}`} aria-hidden="true"><i className="mask-top" /><i className="mask-right" /><i className="mask-bottom" /><i className="mask-left" /><span /></div>
          <div className="cinema-room-meta"><span>PRIVATE CINEMA / ROOM 06</span><b>MASKING / {format.ratio}</b></div>
          <p className="cinema-room-caption"><i /><span>Screen geometry recalled with projection, light and sound</span><b>{format.time}</b></p>
        </div>

        <aside className="cinema-cue-sheet" aria-live="polite">
          <div><span>{format.status}</span><b>{format.time}</b></div>
          <p>PICTURE FORMAT</p><strong>{format.ratio}</strong><h3>{format.title}</h3><h4>{format.headline}</h4><p>{format.description}</p>
          <dl>{format.cues.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </aside>
      </div>

      <div className="cinema-filmstrip" role="group" aria-label="Choose a cinema screen format">
        {cinemaFormats.map((item) => <button type="button" key={item.id} className={item.id === format.id ? "is-active" : ""} onClick={() => setFormatId(item.id)} aria-pressed={item.id === format.id}><span>{item.time}</span><i><b /></i><strong>{item.title}</strong><em>{item.ratio}</em></button>)}
      </div>

      <div className="cinema-spec-bench" aria-label="Private cinema specification">
        <article><span>01 / SCREEN</span><strong>145</strong><h3>inch scope image</h3><p>Acoustically transparent woven surface · four-way masking · reference viewing angle</p></article>
        <article><span>02 / PICTURE</span><strong>4K</strong><h3>calibrated HDR projection</h3><p>High-contrast optical path · lens memories · measured colour and luminance</p></article>
        <article><span>03 / SOUND</span><strong>9.4.6</strong><h3>concealed immersive field</h3><p>Screen channels · four-subwoofer strategy · six overhead channels · room correction</p></article>
        <article><span>04 / ROOM</span><strong>NC-20</strong><h3>background-noise target</h3><p>Isolated shell · silent air delivery · controlled decay · zero visible treatment</p></article>
      </div>

      <div className="cinema-study-notes">
        <article><span>01 / BUILD THE SILENCE</span><h3>The soundtrack begins with the room.</h3><p>Isolation, ventilation and acoustic decay are resolved before electronic correction touches the system.</p></article>
        <article><span>02 / HIDE THE MACHINE</span><h3>Performance remains physically invisible.</h3><p>Projection, loudspeakers, subwoofers, masking and treatments disappear behind coordinated architecture.</p></article>
        <article><span>03 / ONE RITUAL</span><h3>A feature starts with one deliberate action.</h3><p>Temperature, light, masking, picture and sound arrive in a timed sequence that never exposes the equipment stack.</p></article>
      </div>
    </section>
  );
}
