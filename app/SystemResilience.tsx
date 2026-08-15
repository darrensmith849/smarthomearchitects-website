"use client";

import Link from "next/link";
import { useState } from "react";
import { ConsultationCta } from "./components";
import { SectionLabel } from "./product-kit";

/**
 * Intelligence · 05. Claiming a system degrades gracefully is cheap; showing it
 * is not. So the page is a fault panel — cut the internet, the hub, the power,
 * and watch which capabilities survive.
 *
 * Faults are independent toggles rather than a one-of-four selector, because
 * the interesting cases are combinations: losing the internet is survivable,
 * losing the internet *and* the hub is the one worth designing for. Three
 * switches give eight states from one small data table.
 */
const faults = [
  { id: "internet", label: "Internet", detail: "The line to the outside world" },
  { id: "hub", label: "Controller", detail: "The processor coordinating the house" },
  { id: "power", label: "Grid power", detail: "Mains supply to the building" },
] as const;

type FaultId = (typeof faults)[number]["id"];
type Faults = Record<FaultId, boolean>;

/** Each capability decides its own fate from the fault state. Written as a
 *  predicate rather than a lookup table so the reasoning stays readable. */
const capabilities = [
  {
    id: "lighting", label: "Lighting", basis: "Wired keypads, local dimmers",
    state: (f: Faults) => (f.power ? "reduced" : "held"),
    note: (f: Faults) => (f.power ? "Battery-backed circuits hold the escape routes and one lamp per level." : "Unaffected. Keypads talk to dimmers on a wired bus with no dependency above them."),
  },
  {
    id: "scenes", label: "Scenes", basis: "Held on the local controller",
    state: (f: Faults) => (f.power ? "lost" : f.hub ? "reduced" : "held"),
    note: (f: Faults) => (f.power ? "Restored automatically when supply returns." : f.hub ? "Keypads fall back to direct circuit control — one key, one circuit." : "Composed and recalled locally. The internet is not in this path."),
  },
  {
    id: "climate", label: "Climate", basis: "Thermostats with local schedules",
    state: (f: Faults) => (f.power ? "lost" : f.hub ? "reduced" : "held"),
    note: (f: Faults) => (f.power ? "Plant is offline. The building's mass carries several hours." : f.hub ? "Each zone runs its own last schedule until coordination returns." : "Zoned and scheduled locally."),
  },
  {
    id: "security", label: "Security", basis: "Battery backed, wired sensors",
    state: () => "held",
    note: (f: Faults) => (f.internet ? "Local alarm and recording continue; remote notification queues until the line returns." : "Full function. This is the one system specified to survive everything else."),
  },
  {
    id: "remote", label: "Remote access", basis: "Requires the outside line",
    state: (f: Faults) => (f.internet || f.power ? "lost" : "held"),
    note: (f: Faults) => (f.power ? "Nothing to reach." : f.internet ? "Expected. Remote access is a convenience layer, never a dependency." : "Available."),
  },
  {
    id: "voice", label: "Voice", basis: "Cloud speech recognition",
    state: (f: Faults) => (f.internet || f.power || f.hub ? "lost" : "held"),
    note: (f: Faults) => (f.internet ? "The first thing to go, by design — which is why nothing is voice-only." : f.hub || f.power ? "Offline." : "Available."),
  },
] as const;

const VERDICT: Record<string, string> = {
  clear: "Everything nominal.",
  degraded: "The house is quieter, and everything a resident touches still works.",
  manual: "Direct control only. Every circuit still has a key that moves it.",
};

export function SystemResilience() {
  const [faultState, setFaultState] = useState<Faults>({ internet: false, hub: false, power: false });
  const active = faults.filter((fault) => faultState[fault.id]);
  const results = capabilities.map((capability) => ({
    ...capability,
    now: capability.state(faultState) as "held" | "reduced" | "lost",
  }));
  const held = results.filter((item) => item.now === "held").length;
  const verdict = faultState.power ? VERDICT.manual : faultState.hub ? VERDICT.manual : active.length ? VERDICT.degraded : VERDICT.clear;

  return (
    <>
      <section className="resilience-lab">
        <div className="resilience-lab-copy">
          <p className="eyebrow">Intelligence · 05</p>
          <h1>Ready for the<br />imperfect day.</h1>
          <p>Break something and watch what survives. Every capability below states what it rests on, so the failure is predictable rather than surprising.</p>
        </div>

        <div className="resilience-faults" role="group" aria-label="Introduce a fault">
          <p className="resilience-faults-head"><span>FAULT PANEL</span><b aria-live="polite">{active.length ? `${active.length} ACTIVE` : "ALL NOMINAL"}</b></p>
          {faults.map((fault) => (
            <button
              type="button"
              key={fault.id}
              className={faultState[fault.id] ? "is-cut" : ""}
              aria-pressed={faultState[fault.id]}
              onClick={() => setFaultState((current) => ({ ...current, [fault.id]: !current[fault.id] }))}
            >
              <i aria-hidden="true" />
              <strong>{fault.label}</strong>
              <small>{fault.detail}</small>
              <em>{faultState[fault.id] ? "CUT" : "UP"}</em>
            </button>
          ))}
          <p className="resilience-verdict">{verdict}</p>
        </div>

        <div className="resilience-capabilities">
          <p className="resilience-capabilities-head">
            <span>CAPABILITY</span>
            <b>{held} / {results.length} FULLY HELD</b>
          </p>
          {results.map((item) => (
            <article key={item.id} className={`resilience-row is-${item.now}`}>
              <div>
                <strong>{item.label}</strong>
                <small>{item.basis}</small>
              </div>
              <p>{item.note(faultState)}</p>
              <span>{item.now}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="resilience-principle section-pad">
        <SectionLabel index="02" title="How failure is designed" />
        <div>
          <p className="eyebrow">Graceful degradation</p>
          <h2>Every layer falls back<br />to the one beneath it.</h2>
          <p>Nothing in the house depends on a service that could be discontinued. Scenes live on local hardware, circuits answer to wired keypads, and the outside line carries convenience rather than function. When something does fail, the recovery is written down and handed over with the drawings.</p>
          <Link className="text-link" href="/systems/architecture">See the layers it falls back through <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
