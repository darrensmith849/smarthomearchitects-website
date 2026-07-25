"use client";

import { useEffect, useState } from "react";

type Signal = { label: string; value: string };

const telemetry: Record<string, Signal[]> = {
  axis: [
    { label: "SCENE", value: "EVENING / READY" },
    { label: "LIGHT", value: "2,700 K" },
    { label: "TOUCH", value: "CALIBRATED" },
    { label: "BUS", value: "24 V / STABLE" },
  ],
  aura: [
    { label: "PRESENCE", value: "CONFIRMED" },
    { label: "AMBIENT", value: "326 LX" },
    { label: "COMFORT", value: "22.0 °C" },
    { label: "PRIVACY", value: "LOCAL ONLY" },
  ],
  atlas: [
    { label: "CORE", value: "NOMINAL" },
    { label: "RESPONSE", value: "34 MS" },
    { label: "NETWORK", value: "ISOLATED" },
    { label: "BACKUP", value: "SIGNED" },
  ],
};

const cadences = [3900, 6200, 4700, 7100];

export function ProductTelemetry({ slug, number, name }: { slug: string; number: string; name: string }) {
  const signals = telemetry[slug] ?? telemetry.axis;
  const [active, setActive] = useState(0);

  useEffect(() => {
    let index = 0;
    let elapsed = 0;
    let timer: ReturnType<typeof setTimeout>;

    const advance = () => {
      const cadence = cadences[index % cadences.length];
      if (elapsed + cadence >= 30000) return;
      timer = setTimeout(() => {
        index = (index + 1) % signals.length;
        elapsed += cadence;
        setActive(index);
        advance();
      }, cadence);
    };

    advance();
    return () => clearTimeout(timer);
  }, [signals.length]);

  return (
    <div className="product-system-overlay" aria-hidden="true">
      <div className="product-system-panel">
        <div className="product-system-heading"><span>NODE / {number}</span><span>LOCAL / LIVE</span></div>
        <div className="product-system-trace"><i /><i /><i /></div>
        <p className="product-system-object">{name.toUpperCase()} / SYSTEM STATUS</p>
        <div className="product-system-readouts">
          {signals.map((signal, index) => (
            <p className={index === active ? "is-active" : ""} key={signal.label}>
              <span>{signal.label}</span><b>{signal.value}</b>
            </p>
          ))}
        </div>
        <div className="product-system-scale"><span>00</span><i /><span>30</span></div>
      </div>
    </div>
  );
}
