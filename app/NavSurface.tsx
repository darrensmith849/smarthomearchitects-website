"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Height of the floating header plus its top offset. The header is treated as
   sitting "on" the hero until the hero has scrolled clear of this band. */
const HEADER_BAND = 88;

function isDarkSurface(color: string) {
  const parts = color.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return false;
  const [r, g, b, a = "1"] = parts.map(Number) as [number, number, number, number?];
  if (Number(a) < 0.5) return false; // effectively transparent — nothing to judge
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
}

/**
 * Sets `data-nav-surface` on <html> so the header can invert instead of sitting
 * as a translucent grey slab over cream. Written as a class toggle on the
 * document rather than React state: the value changes on every scroll frame and
 * has no business re-rendering the tree.
 */
export function NavSurface() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector("main > *");
    const clear = () => delete root.dataset.navSurface;

    // A hero is "dark" if it carries full-bleed media or a dark background.
    const heroIsDark =
      !!hero &&
      (!!hero.querySelector("img, video") || isDarkSurface(getComputedStyle(hero).backgroundColor));

    if (!hero || !heroIsDark) {
      root.dataset.navSurface = "light";
      return clear;
    }

    root.dataset.navSurface = "dark";
    const observer = new IntersectionObserver(
      ([entry]) => {
        root.dataset.navSurface = entry.isIntersecting ? "dark" : "light";
      },
      { rootMargin: `-${HEADER_BAND}px 0px 0px 0px` },
    );
    observer.observe(hero);

    return () => {
      observer.disconnect();
      clear();
    };
  }, [pathname]);

  return null;
}
