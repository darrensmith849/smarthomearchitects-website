"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { Product } from "./data";
import { ConsultationCta, ProductCollection } from "./components";

const listeningModes = [
  { id: "architectural", index: "01", name: "Architectural", label: "OPEN / EVEN", spread: 160, bass: 0, presence: 1, level: 72, description: "A broad, unforced field keeps music coherent while people move through the room." },
  { id: "cinematic", index: "02", name: "Cinematic", label: "FOCUSED / DEEP", spread: 112, bass: 4, presence: 2, level: 84, description: "The image tightens around the seating position while low-frequency headroom opens for film." },
  { id: "evening", index: "03", name: "Quiet evening", label: "WARM / LOW", spread: 146, bass: 2, presence: -2, level: 58, description: "Loudness compensation restores warmth and detail without asking the room to become loud." },
] as const;

const roomProfiles = [
  { id: "salon", name: "Open salon", width: 8.4, depth: 6.6, speakers: 2, coverage: "96%", listenerX: 52, listenerY: 66 },
  { id: "cinema", name: "Media room", width: 10.8, depth: 7.2, speakers: 5, coverage: "98%", listenerX: 50, listenerY: 70 },
  { id: "gallery", name: "Long gallery", width: 12.4, depth: 5.4, speakers: 4, coverage: "94%", listenerX: 60, listenerY: 53 },
] as const;

const installationStages = [
  { id: "structure", index: "01", name: "Structure", status: "OPEN WALL", copy: "The sealed backbox fixes between framing before services close, protecting the designed acoustic volume." },
  { id: "surface", index: "02", name: "Surface", status: "FLUSH SET", copy: "The exciter frame lands flush with the substrate. A mineral face accepts the same skim and finish as the wall." },
  { id: "commission", index: "03", name: "Commission", status: "MEASURED", copy: "After decoration, every channel is measured in the finished room and tuned from the listening position." },
  { id: "complete", index: "04", name: "Complete", status: "0 MM VISIBLE", copy: "What remains is architecture: one continuous plane, with the entire loudspeaker concealed behind it." },
] as const;

const veilLayers = [
  ["01", "Mineral acoustic face", "A rigid micro-porous composite transfers energy while accepting plaster, paint or a matched specialist finish."],
  ["02", "Planar exciter array", "Four mechanically isolated exciters distribute energy across the entire panel instead of driving a visible cone."],
  ["03", "Honeycomb diaphragm", "A low-mass cellular core controls breakup and extends useful high-frequency response across a wide field."],
  ["04", "Isolation chassis", "A graphite aluminium frame decouples the active surface from the surrounding architecture."],
  ["05", "Sealed backbox", "A predictable 18.6 litre volume protects performance from framing, insulation and neighbouring services."],
] as const;

const specifications = {
  acoustic: [
    ["Frequency response", "40 Hz–25 kHz · ±3 dB in commissioned room"],
    ["Nominal dispersion", "160° horizontal × 160° vertical"],
    ["Sensitivity", "87 dB · 2.83 V / 1 m"],
    ["Maximum output", "109 dB continuous programme at 1 m"],
    ["Nominal impedance", "6 Ω · 4.8 Ω minimum"],
    ["Crossover", "70 Hz minimum · 24 dB/octave recommended"],
  ],
  architecture: [
    ["Finished face", "420 × 420 mm · concealed after decoration"],
    ["Installation depth", "92 mm including sealed backbox"],
    ["Framing aperture", "448 × 448 mm coordinated opening"],
    ["Assembly weight", "5.4 kg before project finish"],
    ["Finish build-up", "Up to 2 mm approved mineral skim and coating"],
    ["Locations", "Wall or ceiling · indoor conditioned spaces"],
  ],
  electrical: [
    ["Recommended power", "50–200 W continuous into 6 Ω"],
    ["Programme power", "250 W peak with commissioned protection"],
    ["Connection", "Locking low-profile terminal behind service edge"],
    ["Cable", "2 × 2.5 mm² low-smoke speaker cable recommended"],
    ["Protection", "Thermal and excursion profiles in Atlas Audio DSP"],
    ["System topology", "Passive speaker · central amplification"],
  ],
  commissioning: [
    ["Measurement", "Nine-position room average with time alignment"],
    ["Equalisation", "12-band parametric room correction per channel"],
    ["Delay resolution", "0.02 ms per channel"],
    ["Level matching", "±0.25 dB across commissioned array"],
    ["Service access", "Decor-safe perimeter release procedure"],
    ["Studio care", "10-year driver and tuning support"],
  ],
} as const;

const spectrum = [36, 48, 58, 67, 72, 78, 83, 76, 70, 73, 81, 88, 82, 74, 68, 64, 72, 79, 84, 77, 69, 61, 55, 49, 44, 38, 34, 29];

type ModeId = (typeof listeningModes)[number]["id"];
type RoomId = (typeof roomProfiles)[number]["id"];
type StageId = (typeof installationStages)[number]["id"];
type SpecGroup = keyof typeof specifications;

export function VeilProductPage({ product }: { product: Product }) {
  const [revealed, setRevealed] = useState(true);
  const [modeId, setModeId] = useState<ModeId>("architectural");
  const [roomId, setRoomId] = useState<RoomId>("salon");
  const [stageId, setStageId] = useState<StageId>("complete");
  const [warmth, setWarmth] = useState(52);
  const [treatment, setTreatment] = useState(68);
  const [preset, setPreset] = useState<"natural" | "warm" | "precise">("natural");
  const [specGroup, setSpecGroup] = useState<SpecGroup>("acoustic");
  const mode = listeningModes.find((item) => item.id === modeId) ?? listeningModes[0];
  const room = roomProfiles.find((item) => item.id === roomId) ?? roomProfiles[0];
  const stage = installationStages.find((item) => item.id === stageId) ?? installationStages[3];
  const rt60 = Math.max(.24, 1.02 - treatment * .009).toFixed(2);
  const style = {
    "--veil-spread": `${mode.spread / 160}`,
    "--listener-x": `${room.listenerX}%`,
    "--listener-y": `${room.listenerY}%`,
    "--veil-warmth": `${warmth}%`,
  } as CSSProperties;

  const speakerPositions = room.id === "salon"
    ? [[28, 18], [72, 18]]
    : room.id === "cinema"
      ? [[22, 16], [50, 12], [78, 16], [22, 78], [78, 78]]
      : [[16, 24], [39, 24], [63, 24], [86, 24]];

  return (
    <div className={`veil-product-page mode-${mode.id}`} style={style}>
      <section className="veil-hero">
        <div className="veil-hero-copy">
          <div className="breadcrumb"><Link href="/products">Collection</Link><span>/</span><span>{product.category}</span></div>
          <p className="eyebrow">Studio series · {product.number}</p>
          <h1>Veil</h1>
          <h2>Sound, without<br />the object.</h2>
          <p>{product.longDescription}</p>
          <div className="veil-hero-actions">
            <Link className="button button-light" href="/contact">Specify Veil <span>↗</span></Link>
            <a href="#sound-field">Enter the sound field <span>↓</span></a>
          </div>
          <div className="veil-hero-foot"><span>INVISIBLE LOUDSPEAKER</span><b>04 / STUDIO SERIES</b></div>
        </div>
        <div className={`veil-hero-object ${revealed ? "is-revealed" : "is-concealed"}`}>
          <div className="veil-object-grid" aria-hidden="true" />
          <div className="veil-finished-plane" aria-hidden="true"><i /><span>PAINT / PLASTER / SILENCE</span></div>
          <img decoding="async" src="/images/veil-isolated.webp" alt="Veil invisible loudspeaker exploded into its acoustic face, planar array and sealed backbox" />
          <div className="veil-object-readout"><span>ENGINEERING VIEW</span><strong>{revealed ? "REVEALED" : "CONCEALED"}</strong><i /></div>
          <button type="button" onClick={() => setRevealed((value) => !value)} aria-pressed={revealed}>
            <span>{revealed ? "Finish the wall" : "Reveal the engineering"}</span><b>{revealed ? "−" : "+"}</b>
          </button>
          <div className="veil-dimension dimension-width"><i /><span>420 MM FINISHED FACE</span><i /></div>
          <div className="veil-dimension dimension-depth"><i /><span>92 MM DEPTH</span><i /></div>
          <div className="veil-zero"><strong>0 mm</strong><span>visible hardware</span></div>
        </div>
      </section>

      <section className="veil-stat-band" aria-label="Veil headline specifications">
        {product.highlights.map((item) => <article key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>)}
      </section>

      <section className="veil-sound-field section-pad" id="sound-field">
        <div className="veil-section-head">
          <div className="section-label"><span>01</span><span>Acoustic field</span></div>
          <h2>The room becomes<br />the loudspeaker.</h2>
          <p>Move between listening intentions and room types. Veil’s unusually wide planar field creates even energy without a visible point source.</p>
        </div>
        <div className="veil-field-console">
          <div className={`veil-room-map room-${room.id}`}>
            <div className="veil-room-grid" aria-hidden="true" />
            <div className="veil-room-boundary" aria-hidden="true"><i /><i /><i /><i /></div>
            <div className="veil-screen" aria-hidden="true"><span>ARCHITECTURAL FRONT</span></div>
            <div className="veil-sofa" aria-hidden="true"><i /><i /><i /></div>
            <div className="veil-table" aria-hidden="true" />
            {speakerPositions.map(([x, y], index) => (
              <div className="veil-map-speaker" key={`${room.id}-${index}`} style={{ left: `${x}%`, top: `${y}%` }}>
                <b>V{index + 1}</b><i /><i /><i />
              </div>
            ))}
            <div className="veil-listener"><i /><b /><span>LISTENING FIELD</span></div>
            <div className="veil-map-meta"><span>{room.width.toFixed(1)} × {room.depth.toFixed(1)} M</span><b>{room.coverage} EVEN COVERAGE</b></div>
          </div>
          <aside className="veil-field-readout">
            <div><span>FIELD MODEL / LIVE</span><b><i /> ACTIVE</b></div>
            <p>LISTENING INTENTION</p>
            <strong>{mode.name}</strong>
            <p>{mode.description}</p>
            <dl>
              <div><dt>DISPERSION</dt><dd>{mode.spread}°</dd></div>
              <div><dt>REFERENCE</dt><dd>{mode.level} dB</dd></div>
              <div><dt>LOW SHELF</dt><dd>{mode.bass > 0 ? "+" : ""}{mode.bass} dB</dd></div>
              <div><dt>PRESENCE</dt><dd>{mode.presence > 0 ? "+" : ""}{mode.presence} dB</dd></div>
            </dl>
            <div className="veil-room-selector">
              <span>ROOM PROFILE</span>
              {roomProfiles.map((item) => <button type="button" className={item.id === roomId ? "is-active" : ""} onClick={() => setRoomId(item.id)} key={item.id}><i />{item.name}<b>{item.speakers} × VEIL</b></button>)}
            </div>
          </aside>
        </div>
        <div className="veil-mode-buttons">
          {listeningModes.map((item) => <button type="button" className={item.id === modeId ? "is-active" : ""} onClick={() => setModeId(item.id)} key={item.id}><span>{item.index}</span><b>{item.label}</b><strong>{item.name}</strong><i /></button>)}
        </div>
      </section>

      <section className={`veil-installation section-pad stage-${stage.id}`}>
        <div className="veil-install-copy">
          <div className="section-label"><span>02</span><span>Installation sequence</span></div>
          <p className="eyebrow">From structure to silence</p>
          <h2>Made to<br />disappear.</h2>
          <p>{stage.copy}</p>
          <div className="veil-stage-readout"><span>CURRENT STAGE</span><strong>{stage.index} / {stage.name}</strong><b>{stage.status}</b></div>
        </div>
        <div className="veil-wall-section">
          <div className="veil-stud stud-left"><span>FRAMING</span></div>
          <div className="veil-stud stud-right" />
          <div className="veil-wall-cavity" />
          <div className="veil-install-product"><img loading="lazy" decoding="async" src="/images/veil-isolated.webp" alt="Veil exploded speaker installation assembly" /></div>
          <div className="veil-board-layer"><span>SUBSTRATE / 12.5 MM</span></div>
          <div className="veil-skim-layer"><span>MINERAL SKIM / 2 MM</span></div>
          <div className="veil-paint-layer"><i /><span>FINISHED ARCHITECTURAL PLANE</span></div>
          <div className="veil-install-depth"><span>92 MM COORDINATED DEPTH</span><i /></div>
          <div className="veil-install-status"><i />{stage.status}</div>
        </div>
        <div className="veil-stage-buttons">
          {installationStages.map((item) => <button type="button" className={item.id === stageId ? "is-active" : ""} onClick={() => setStageId(item.id)} key={item.id}><span>{item.index}</span><strong>{item.name}</strong><b>{item.status}</b></button>)}
        </div>
      </section>

      <section className="veil-tuning section-pad">
        <div className="veil-tuning-head">
          <div className="section-label"><span>03</span><span>Room tuning</span></div>
          <h2>Calibrated after<br />the room is real.</h2>
          <p>Materials, furnishings and geometry change the sound. The final character is measured and voiced after the architecture is complete.</p>
        </div>
        <div className="veil-tuning-console">
          <div className="veil-spectrum">
            <div className="veil-spectrum-grid" aria-hidden="true"><span>+6</span><span>0</span><span>−6</span></div>
            <div className="veil-spectrum-bars" aria-label="Responsive acoustic equalisation curve">
              {spectrum.map((height, index) => {
                const lowLift = index < 8 ? (warmth - 50) * .16 : 0;
                const presetShift = preset === "warm" ? (index < 12 ? 8 : -2) : preset === "precise" ? (index > 12 ? 7 : -3) : 0;
                const treated = (treatment - 50) * (index % 4 === 0 ? .08 : -.025);
                return <i key={index} style={{ "--bar": `${Math.max(18, Math.min(96, height + lowLift + presetShift + treated))}%`, "--delay": `${index * 16}ms` } as CSSProperties} />;
              })}
            </div>
            <div className="veil-spectrum-axis"><span>40 HZ</span><span>250</span><span>1K</span><span>4K</span><span>16K</span><span>25 KHZ</span></div>
            <div className="veil-target-line"><span>COMMISSIONED TARGET</span></div>
            <div className="veil-spectrum-meta"><span>12-BAND PARAMETRIC CORRECTION</span><b>ROOM AVERAGE / 9 POSITIONS</b></div>
          </div>
          <aside className="veil-tuning-controls">
            <div><span>VEIL ROOM EQ</span><b><i /> MEASURED</b></div>
            <strong>{preset === "natural" ? "Natural" : preset === "warm" ? "Warm" : "Precise"}</strong>
            <p>Commissioned voicing</p>
            <div className="veil-preset-buttons">
              {(["natural", "warm", "precise"] as const).map((item) => <button type="button" className={preset === item ? "is-active" : ""} onClick={() => setPreset(item)} key={item}>{item}</button>)}
            </div>
            <label><span>LOW-FREQUENCY WARMTH</span><b>{warmth}%</b><input aria-label="Low-frequency warmth" type="range" min="20" max="85" value={warmth} onChange={(event) => setWarmth(Number(event.target.value))} /></label>
            <label><span>SOFT-SURFACE TREATMENT</span><b>{treatment}%</b><input aria-label="Soft-surface treatment" type="range" min="20" max="90" value={treatment} onChange={(event) => setTreatment(Number(event.target.value))} /></label>
            <dl>
              <div><dt>RT60</dt><dd>{rt60} s</dd></div>
              <div><dt>TIME ALIGN</dt><dd>0.18 ms</dd></div>
              <div><dt>HEADROOM</dt><dd>+8.4 dB</dd></div>
              <div><dt>CHANNEL MATCH</dt><dd>±0.2 dB</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="veil-anatomy section-pad">
        <div className="veil-anatomy-head">
          <div className="section-label"><span>04</span><span>Inside the surface</span></div>
          <h2>Five layers.<br />Nothing visible.</h2>
        </div>
        <div className="veil-anatomy-body">
          <div className="veil-anatomy-object">
            <img loading="lazy" decoding="async" src="/images/veil-isolated.webp" alt="Veil acoustic assembly with five engineered layers" />
            {veilLayers.map((layer, index) => <span className={`veil-callout callout-${index + 1}`} key={layer[1]}><i />{layer[0]}</span>)}
            <div className="veil-object-scale"><i /><span>420 MM</span><i /></div>
          </div>
          <div className="veil-layer-list">
            {veilLayers.map((layer) => <article key={layer[1]}><span>{layer[0]}</span><div><h3>{layer[1]}</h3><p>{layer[2]}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="veil-spec-library section-pad">
        <div className="veil-spec-head">
          <div className="section-label"><span>05</span><span>Technical library</span></div>
          <h2>Designed to be<br />specified early.</h2>
          <p>Architectural coordination, amplification and finish build-up are resolved as one system before the wall closes.</p>
        </div>
        <div className="veil-spec-console">
          <div className="veil-spec-tabs">
            {(Object.keys(specifications) as SpecGroup[]).map((group, index) => <button type="button" className={group === specGroup ? "is-active" : ""} onClick={() => setSpecGroup(group)} key={group}><span>0{index + 1}</span><b>{group}</b></button>)}
          </div>
          <div className="veil-spec-table">
            {specifications[specGroup].map((row, index) => <div key={row[0]} style={{ animationDelay: `${index * 45}ms` }}><span>{row[0]}</span><strong>{row[1]}</strong></div>)}
          </div>
          <div className="veil-spec-meta"><span>VEIL / REVISION 04</span><span>FINAL VALUES CONFIRMED PER PROJECT</span></div>
        </div>
      </section>

      <section className="related-products veil-related section-pad">
        <div className="section-head collection-head"><div className="section-label"><span>06</span><span>Complete the system</span></div><h2>Designed together.</h2></div>
        <ProductCollection compact />
      </section>
      <ConsultationCta />
    </div>
  );
}
