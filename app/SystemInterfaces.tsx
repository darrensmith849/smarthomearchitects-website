"use client";

import Link from "next/link";
import { useState } from "react";
import { ConsultationCta } from "./components";
import { SectionLabel } from "./product-kit";

/**
 * Intelligence · 02. The argument is that no single control surface is right
 * for every task, so the page compares them rather than advocating one: pick a
 * task, see what a keypad, a screen and voice each cost you to do it.
 *
 * A comparison, not a selector — three columns side by side, all visible at
 * once, because the point is the difference between them. Deliberately unlike
 * the layer stack on /systems/architecture.
 */
const tasks = [
  {
    id: "evening",
    label: "Set the evening",
    detail: "Six rooms, one intent, at the end of the day.",
    surfaces: {
      keypad: { verdict: "best", steps: "1", time: "0.4 s", attention: "none", note: "One press on the way through the room. The scene is already composed; nothing to choose." },
      screen: { verdict: "workable", steps: "4", time: "11 s", attention: "full", note: "Unlock, find the room, find the scene, confirm. Fine when you are already holding the phone." },
      voice: { verdict: "workable", steps: "1", time: "3 s", attention: "partial", note: "Fast and hands-free, but it announces itself to everyone in the room." },
    },
  },
  {
    id: "dim",
    label: "Dim one lamp",
    detail: "A small, precise correction to a single circuit.",
    surfaces: {
      keypad: { verdict: "workable", steps: "2", time: "3 s", attention: "partial", note: "Hold to dim. Precise, but you have to know which key holds that circuit." },
      screen: { verdict: "best", steps: "3", time: "7 s", attention: "full", note: "The only surface that shows you every circuit at once and lets you set a number." },
      voice: { verdict: "poor", steps: "2", time: "9 s", attention: "partial", note: "Naming one lamp and a percentage out loud is slower than reaching for it." },
    },
  },
  {
    id: "leaving",
    label: "Leave the house",
    detail: "Secure, set back and quiet, in one movement.",
    surfaces: {
      keypad: { verdict: "best", steps: "1", time: "0.4 s", attention: "none", note: "By the door, where the decision is already being made. Confirms with a single light." },
      screen: { verdict: "poor", steps: "5", time: "16 s", attention: "full", note: "Nobody unlocks a phone on the doorstep with their hands full." },
      voice: { verdict: "workable", steps: "1", time: "3 s", attention: "partial", note: "Works, but broadcasts that the house is about to be empty." },
    },
  },
  {
    id: "night",
    label: "Something at 3am",
    detail: "Half awake, in the dark, without waking anyone.",
    surfaces: {
      keypad: { verdict: "best", steps: "1", time: "0.6 s", attention: "none", note: "Found by touch, backlit at two percent. No screen, no glare, no decisions." },
      screen: { verdict: "poor", steps: "4", time: "14 s", attention: "full", note: "A bright screen at 3am undoes the reason you got up quietly." },
      voice: { verdict: "poor", steps: "1", time: "3 s", attention: "partial", note: "Speaking aloud in a dark bedroom wakes the person you were trying not to." },
    },
  },
] as const;

const surfaces = [
  { id: "keypad", index: "01", title: "Keypad", sub: "Tactile, fixed, always in the same place" },
  { id: "screen", index: "02", title: "Screen", sub: "Everything, when you can give it attention" },
  { id: "voice", index: "03", title: "Voice", sub: "Hands free, at the cost of privacy" },
] as const;

type TaskId = (typeof tasks)[number]["id"];
type SurfaceId = (typeof surfaces)[number]["id"];

export function SystemInterfaces() {
  const [taskId, setTaskId] = useState<TaskId>("evening");
  const task = tasks.find((item) => item.id === taskId) ?? tasks[0];

  return (
    <>
      <section className="interface-lab">
        <div className="interface-lab-copy">
          <p className="eyebrow">Intelligence · 02</p>
          <h1>Control without<br />complexity.</h1>
          <p>No single surface is right for everything. Choose a task and compare what a keypad, a screen and your voice each cost you to complete it.</p>
        </div>

        <div className="interface-tasks" role="group" aria-label="Choose a task">
          {tasks.map((item) => (
            <button
              type="button"
              key={item.id}
              className={item.id === task.id ? "is-active" : ""}
              aria-pressed={item.id === task.id}
              onClick={() => setTaskId(item.id)}
            >
              <strong>{item.label}</strong>
              <small>{item.detail}</small>
            </button>
          ))}
        </div>

        <div className="interface-compare">
          {surfaces.map((surface) => {
            const result = task.surfaces[surface.id as SurfaceId];
            return (
              <article key={surface.id} className={`interface-card verdict-${result.verdict}`}>
                <header>
                  <span>{surface.index}</span>
                  <h2>{surface.title}</h2>
                  <small>{surface.sub}</small>
                </header>
                <p className="interface-verdict" aria-live="polite">{result.verdict}</p>
                <dl>
                  <div><dt>Steps</dt><dd>{result.steps}</dd></div>
                  <div><dt>Time</dt><dd>{result.time}</dd></div>
                  <div><dt>Attention</dt><dd>{result.attention}</dd></div>
                </dl>
                <p className="interface-note">{result.note}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="interface-principle section-pad">
        <SectionLabel index="02" title="What follows from that" />
        <div>
          <p className="eyebrow">Specified per room</p>
          <h2>The right surface is<br />the one already there.</h2>
          <p>Every room gets the control its use actually calls for. A bedroom earns a keypad by the bed and nothing else. A kitchen can carry a screen. Voice is offered where hands are busy and privacy is not the point — and never as the only way to do something.</p>
          <Link className="text-link" href="/systems/privacy">Where voice stops <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
