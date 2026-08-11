"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The Music button on the wall control is the one place this site makes a
 * sound, so it behaves like everything else in the house: it arrives and leaves
 * on a ramp rather than a switch. Nothing plays until a visitor presses Music —
 * there is no autoplay to suppress and no transport to dismiss until there is
 * something to transport.
 *
 * Track: "At The Edge Of Space (II)" by Andrewkn, CC0, trimmed to a seamless
 * 80-second loop. public/audio/CREDITS.md carries the provenance.
 */
const FADE_MS = 1100;
/** Well under the room tone it is meant to sit in. */
const LEVEL = 0.5;

export type ScenePhase = "off" | "playing" | "paused";

export function useSceneAudio() {
  const element = useRef<HTMLAudioElement>(null);
  const ramp = useRef(0);
  const [phase, setPhase] = useState<ScenePhase>("off");

  /** Cancels any ramp already in flight, so a fast pause/resume never leaves a
   *  stale `settled` callback to pause a track the visitor just restarted. */
  const rampTo = useCallback((target: number, settled?: () => void) => {
    const audio = element.current;
    if (!audio) return;
    cancelAnimationFrame(ramp.current);
    const from = audio.volume;
    const started = performance.now();
    const step = (now: number) => {
      // Clamped at both ends. The top end is the obvious one; the bottom end is
      // not, and it throws: a frame's rAF timestamp is taken when the frame
      // begins, so a ramp started mid-frame — as this one is, out of the
      // promise `play()` returns — gets a first callback whose `now` predates
      // `started`. That drives volume very slightly negative, and `volume` is a
      // range-checked property, so the assignment raises IndexSizeError.
      const progress = Math.min(1, Math.max(0, (now - started) / FADE_MS));
      audio.volume = from + (target - from) * progress;
      if (progress < 1) ramp.current = requestAnimationFrame(step);
      else settled?.();
    };
    ramp.current = requestAnimationFrame(step);
  }, []);

  const play = useCallback(() => {
    const audio = element.current;
    if (!audio) return;
    audio.volume = 0;
    // Called straight out of a click, which is what keeps autoplay policy happy.
    audio.play().then(
      () => { setPhase("playing"); rampTo(LEVEL); },
      () => setPhase("off"),
    );
  }, [rampTo]);

  const pause = useCallback(() => {
    const audio = element.current;
    if (!audio) return;
    setPhase("paused");
    rampTo(0, () => audio.pause());
  }, [rampTo]);

  const stop = useCallback(() => {
    const audio = element.current;
    if (!audio) return;
    setPhase("off");
    rampTo(0, () => { audio.pause(); audio.currentTime = 0; });
  }, [rampTo]);

  useEffect(() => () => cancelAnimationFrame(ramp.current), []);

  return { phase, element, play, pause, stop };
}

export function SceneAudioElement({ audio }: { audio: ReturnType<typeof useSceneAudio> }) {
  const { element } = audio;
  return (
    <audio ref={element} loop preload="none">
      <source src="/audio/music-scene-loop.webm" type="audio/webm" />
      <source src="/audio/music-scene-loop.mp3" type="audio/mpeg" />
    </audio>
  );
}

export function SceneAudioTransport({ audio }: { audio: ReturnType<typeof useSceneAudio> }) {
  if (audio.phase === "off") return null;
  const playing = audio.phase === "playing";

  return (
    <div className={`scene-audio-transport${playing ? " is-playing" : ""}`}>
      <button
        type="button"
        onClick={playing ? audio.pause : audio.play}
        aria-label={playing ? "Pause the music scene" : "Resume the music scene"}
      >
        {playing ? <i className="transport-pause" /> : <i className="transport-play" />}
      </button>
      <span>{playing ? "MUSIC / PLAYING" : "MUSIC / PAUSED"}</span>
      <b className="scene-audio-meter" aria-hidden="true">
        <i style={{ "--bar-delay": "0s" } as React.CSSProperties} />
        <i style={{ "--bar-delay": ".28s" } as React.CSSProperties} />
        <i style={{ "--bar-delay": ".54s" } as React.CSSProperties} />
        <i style={{ "--bar-delay": ".16s" } as React.CSSProperties} />
      </b>
    </div>
  );
}
