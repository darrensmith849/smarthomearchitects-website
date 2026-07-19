"use client";

import { useEffect, useRef } from "react";

type Variant = "light" | "shade" | "climate" | "sound" | "security" | "network" | "home" | "cinema" | "energy";

const accents: Record<Variant, string> = {
  light: "216, 137, 99",
  shade: "231, 222, 199",
  climate: "157, 207, 189",
  sound: "215, 147, 100",
  security: "117, 174, 221",
  network: "125, 194, 229",
  home: "216, 137, 99",
  cinema: "188, 132, 111",
  energy: "192, 210, 130",
};

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function SystemCanvas({ variant }: { variant: Variant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const random = seededRandom(Array.from(variant).reduce((total, char) => total + char.charCodeAt(0), 0));
    const pointCount = variant === "network" || variant === "home" ? 16 : 11;
    const points = Array.from({ length: pointCount }, () => ({
      x: .08 + random() * .84,
      y: .1 + random() * .8,
      phase: random() * Math.PI * 2,
      size: 1 + random() * 1.7,
    }));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let width = 0;
    let height = 0;
    let last = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time = 0) => {
      if (!reduceMotion && time - last < 32) {
        frame = requestAnimationFrame(draw);
        return;
      }
      last = time;
      context.clearRect(0, 0, width, height);
      const accent = accents[variant];

      context.strokeStyle = "rgba(255,255,255,.075)";
      context.lineWidth = .6;
      const grid = Math.max(64, Math.min(width, height) / 8);
      for (let x = grid; x < width; x += grid) {
        context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
      }
      for (let y = grid; y < height; y += grid) {
        context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
      }

      if (variant === "shade") {
        context.strokeStyle = `rgba(${accent},.18)`;
        for (let x = width * .52; x < width; x += 42) {
          context.beginPath(); context.moveTo(x, 0); context.lineTo(x - height * .18, height); context.stroke();
        }
      }

      if (variant === "sound" || variant === "cinema") {
        const centreX = width * .7;
        const centreY = height * .58;
        for (let radius = 70; radius < Math.min(width, height) * .62; radius += 68) {
          context.strokeStyle = `rgba(${accent},${.16 - radius / Math.max(width, height) * .08})`;
          context.beginPath(); context.arc(centreX, centreY, radius + Math.sin(time / 1000) * 4, 0, Math.PI * 2); context.stroke();
        }
      }

      const resolved = points.map((point, index) => ({
        ...point,
        px: point.x * width + (reduceMotion ? 0 : Math.sin(time / 1800 + point.phase) * 8),
        py: point.y * height + (reduceMotion ? 0 : Math.cos(time / 2200 + point.phase) * 7),
        pulse: .55 + .45 * Math.sin(time / 850 + point.phase + index),
      }));

      for (let i = 0; i < resolved.length; i += 1) {
        for (let j = i + 1; j < resolved.length; j += 1) {
          const a = resolved[i];
          const b = resolved[j];
          const distance = Math.hypot(a.px - b.px, a.py - b.py);
          const limit = Math.min(width, height) * (variant === "network" ? .38 : .28);
          if (distance < limit) {
            context.strokeStyle = `rgba(${accent},${(1 - distance / limit) * .22})`;
            context.beginPath(); context.moveTo(a.px, a.py); context.lineTo(b.px, b.py); context.stroke();
          }
        }
      }

      resolved.forEach((point, index) => {
        const distanceToPointer = Math.hypot(point.px - pointerRef.current.x, point.py - pointerRef.current.y);
        const near = Math.max(0, 1 - distanceToPointer / 180);
        const radius = point.size + near * 3 + point.pulse * .7;
        context.fillStyle = `rgba(${accent},${.45 + near * .5})`;
        context.beginPath(); context.arc(point.px, point.py, radius, 0, Math.PI * 2); context.fill();
        if ((index + Math.floor(time / 1200)) % 5 === 0) {
          context.strokeStyle = `rgba(${accent},${.12 + point.pulse * .18})`;
          context.beginPath(); context.arc(point.px, point.py, 10 + point.pulse * 12, 0, Math.PI * 2); context.stroke();
        }
      });

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => { resize(); if (reduceMotion) draw(); });
    observer.observe(parent);
    resize();
    draw();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="system-canvas"
      aria-hidden="true"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      }}
      onPointerLeave={() => { pointerRef.current = { x: -1000, y: -1000 }; }}
    />
  );
}
