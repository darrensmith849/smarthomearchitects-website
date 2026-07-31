"use client";

import { useSyncExternalStore } from "react";

const WIDE = "(min-width: 768px)";
const STILL = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(WIDE), window.matchMedia(STILL)];
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

function shouldPlay() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return window.matchMedia(WIDE).matches && !window.matchMedia(STILL).matches && connection?.saveData !== true;
}

function neverOnServer() {
  return false;
}

/**
 * The loop is decorative, so it is only mounted once the client confirms a wide
 * viewport, motion is welcome and the visitor is not on a metered connection.
 * Rendering the element conditionally—rather than hiding it with CSS—is what
 * keeps phones from downloading the file at all. The poster image below it in
 * `page.tsx` carries the hero on its own.
 */
export function HeroVideo() {
  const play = useSyncExternalStore(subscribe, shouldPlay, neverOnServer);

  if (!play) return null;

  return (
    <video
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/images/hero.jpg"
      aria-hidden="true"
    >
      <source src="/video/home-hero-loop.webm" type="video/webm" />
      <source src="/video/home-hero-loop.mp4" type="video/mp4" />
    </video>
  );
}
