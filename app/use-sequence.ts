"use client";

import { useEffect } from "react";

/**
 * Advances a set of ids on an interval while `running`, wrapping at the end.
 *
 * This effect was written out by hand in Atlas and Aura — byte-equivalent apart
 * from the state setter and the cadence — and again in three of the ateliers.
 * Two things get dropped when it is copied rather than called: the
 * reduced-motion guard, and clearing the interval on unmount. Both are here.
 *
 * The caller keeps ownership of the state; this only decides when to step.
 */
export function useSequence<Id extends string>(
  ids: readonly Id[],
  running: boolean,
  intervalMs: number,
  setId: (next: (current: Id) => Id) => void,
) {
  useEffect(() => {
    if (!running || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setId((current) => {
        const index = ids.findIndex((id) => id === current);
        return ids[(index + 1) % ids.length];
      });
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [ids, running, intervalMs, setId]);
}
