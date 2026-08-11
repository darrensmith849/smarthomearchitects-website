"use client";

import { useSyncExternalStore } from "react";

/**
 * The experience pages are full-screen takeovers, so their close button is the
 * only way out — and it went to the homepage. That throws away the visitor's
 * place: they were partway down a fifteen-item panel, not at the front door.
 *
 * The panel records where the visitor was standing and which group was open.
 * The close button hands that back, and the nav reopens the group it came
 * from, so closing an experience returns you to the list you chose it from
 * rather than to the top of the site.
 *
 * Session storage rather than a query string: this is incidental UI state and
 * it should not end up in a shared or bookmarked URL. Every read is guarded —
 * storage throws in private-mode Safari and when cookies are blocked, and a
 * close button that cannot fail is worth more than the convenience.
 *
 * Reads are split from the clear on purpose. `peekNavReopen` is pure, so the
 * nav can call it while rendering, the way React wants state adjusted in
 * response to a changing input. `clearNavReopen` is the side effect and runs
 * in an effect afterwards.
 */
const KEY = "sha:nav-return";

type NavReturn = { group: string; path: string; reopen: boolean };

function read(): NavReturn | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const { group, path, reopen } = parsed as Partial<NavReturn>;
    if (typeof group !== "string" || typeof path !== "string") return null;
    return { group, path, reopen: reopen === true };
  } catch {
    return null;
  }
}

function write(value: NavReturn | null) {
  try {
    if (value) sessionStorage.setItem(KEY, JSON.stringify(value));
    else sessionStorage.removeItem(KEY);
  } catch {
    /* Storage unavailable — the close button falls back to the homepage. */
  }
}

/** Called as a visitor leaves the mega panel for one of its destinations. */
export function rememberNavReturn(group: string, path: string) {
  write({ group, path, reopen: false });
}

/**
 * The group to reopen, or null. Pure — safe to call during render, and safe to
 * call twice. Matching on path means a stale entry cannot pop the panel open on
 * an unrelated page later in the session.
 */
export function peekNavReopen(path: string): string | null {
  const stored = read();
  return stored?.reopen && stored.path === path ? stored.group : null;
}

/** The matching side effect: spend the entry so it reopens exactly once. */
export function clearNavReopen(path: string) {
  if (peekNavReopen(path)) write(null);
}

const NO_STORE = "/";

/** Storage does not change under us while a page is open, so there is nothing
 *  to subscribe to — this exists to satisfy the store contract. */
function subscribe() {
  return () => {};
}

/**
 * Wires an experience page's close button. The href is a real href, so
 * middle-click, open-in-new-tab and pre-hydration clicks all still work; the
 * onClick only arms the reopen for the ordinary case.
 *
 * useSyncExternalStore rather than an effect: session storage is exactly the
 * kind of client-only external source it exists for, and it keeps the server
 * render ("/") from disagreeing with the first client paint.
 */
export function useExperienceExit() {
  const href = useSyncExternalStore(
    subscribe,
    () => read()?.path ?? NO_STORE,
    () => NO_STORE,
  );

  return {
    href,
    onClick: () => {
      const stored = read();
      if (stored) write({ ...stored, reopen: true });
    },
  };
}
