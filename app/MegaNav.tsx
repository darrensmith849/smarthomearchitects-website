"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavSurface } from "./NavSurface";
import { clearNavReopen, peekNavReopen, rememberNavReturn } from "./nav-return";
import { categoryPages, pageCount, projectPages, servicePages, studioPages, systemPages } from "./site-map";

const groups = [
  {
    id: "experience",
    label: "Experience",
    index: "01",
    description: "Rooms you can operate, not read about.",
    image: "/images/scene-welcome.webp",
    links: [
      ["Live residence", "/experience/live-residence", "Operate the home in motion"],
      ["Shading atelier", "/experience/shading-atelier", "Compose daylight, privacy and view"],
      ["Climate atelier", "/experience/climate-atelier", "See comfort, air and silence"],
      ["Audio atelier", "/experience/audio-atelier", "Place sound through the room"],
      ["Security observatory", "/experience/security-observatory", "Explore privacy in layers"],
      ["Water & landscape atelier", "/experience/water-landscape-atelier", "Follow every drop through the estate"],
    ],
  },
  {
    id: "disciplines",
    label: "Disciplines",
    index: "02",
    description: "How each system is designed, in writing.",
    image: "/images/service-lighting.webp",
    links: [
      ["Whole home", "/services/whole-home", "One connected experience"],
      ["Lighting", "/services/lighting", "Light in rhythm with the day"],
      ["Shading", "/services/shading", "Daylight and privacy · has an atelier"],
      ["Climate", "/services/climate", "Comfort and air · has an atelier"],
      ["Audio", "/services/audio", "Architectural sound · has an atelier"],
      ["Cinema", "/services/cinema", "Private immersion"],
      ["Security", "/services/security", "Discreet protection · has an observatory"],
      ["Networking", "/services/networking", "Invisible infrastructure"],
      ["Energy", "/services/energy", "Resilience and control"],
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    index: "03",
    description: "How the invisible layer is designed.",
    image: "/images/atlas.webp",
    links: [
      ["System architecture", "/systems/architecture", "One technical foundation"],
      ["Interfaces", "/systems/interfaces", "Control without complexity"],
      ["Scenes & automations", "/systems/scenes", "Many systems, one moment"],
      ["Privacy", "/systems/privacy", "The intelligence stays home"],
      ["Resilience", "/systems/resilience", "Ready for the imperfect day"],
      ["Wellness", "/systems/wellness", "A home in rhythm with you"],
    ],
  },
  {
    id: "collection",
    label: "Collection",
    index: "04",
    description: "Objects worth seeing. Systems designed not to be.",
    image: "/images/axis.webp",
    links: [
      ["The collection", "/products", "View all"],
      ["Controls", "/products/controls", "Touch"],
      ["Sensors", "/products/sensors", "Sense"],
      ["Processors", "/products/processors", "Think"],
      ["Architectural audio", "/products/speakers", "Listen"],
      ["Shades", "/products/shades", "Filter"],
      ["Climate", "/products/climate", "Breathe"],
      ["Networking", "/products/networking", "Connect"],
      ["Security", "/products/security", "Protect"],
    ],
  },
  {
    id: "studio",
    label: "Studio",
    index: "05",
    description: "The thinking, people and homes behind the work.",
    image: "/images/courtyard.webp",
    links: [
      ["Our approach", "/approach", "How we work"],
      ["Philosophy", "/studio/philosophy", "What we believe"],
      ["The studio", "/studio/team", "Who we are"],
      ["Partners", "/studio/partners", "Designed together"],
      ["Selected projects", "/projects", "Homes in context"],
      ["For professionals", "/professionals", "Architects and designers"],
    ],
  },
] as const;

/**
 * Art for the panel's preview pane, keyed by destination.
 *
 * Almost every page the panel links to already declares its own hero image in
 * the site map, so this reads from there rather than keeping a second copy that
 * would drift the first time a page was re-shot. The exceptions are listed
 * below: the six experience routes, whose art belongs to the component that
 * renders them, and the four index pages, which have no site-map entry.
 */
const byRoute = (prefix: string, pages: readonly { slug: string; image: string }[]) =>
  Object.fromEntries(pages.map((page) => [`${prefix}/${page.slug}`, page.image]));

const previews: Record<string, string> = {
  ...byRoute("/services", servicePages),
  ...byRoute("/systems", systemPages),
  ...byRoute("/studio", studioPages),
  ...byRoute("/products", categoryPages),
  ...byRoute("/projects", projectPages),
  "/experience/live-residence": "/images/scene-studio-relax.webp",
  "/experience/shading-atelier": "/images/shading-atelier-filtered.webp",
  "/experience/climate-atelier": "/images/climate-atelier-pavilion.webp",
  "/experience/audio-atelier": "/images/audio-atelier-salon.webp",
  "/experience/security-observatory": "/images/security-observatory-arrival.webp",
  "/experience/water-landscape-atelier": "/images/water-landscape-atelier.webp",
  "/products": "/images/axis.webp",
  "/projects": "/images/hero.webp",
  "/approach": "/images/courtyard.webp",
  "/professionals": "/images/service-shading.webp",
};

export function MegaNav() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  // Which link the pointer or keyboard focus is on, so the preview pane can
  // follow it. Null means nothing is hovered and the pane rests on the group.
  const [hovered, setHovered] = useState<number | null>(null);
  const group = groups.find((item) => item.id === active);

  const openGroup = (id: string | null) => {
    setActive(id);
    setHovered(null);
  };

  // Close the panel on navigation. Adjusting during render rather than in an
  // effect avoids rendering the open panel once against the new page first.
  // The one case that does not close is a visitor returning from an experience
  // page they opened from here: that reopens the group they chose it from, so
  // closing an experience puts them back on the list instead of the homepage.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setActive(peekNavReopen(pathname));
    setHovered(null);
  }

  // Spending the entry is the side effect, so it happens after the render that
  // read it — and it sets no state of its own.
  useEffect(() => clearNavReopen(pathname), [pathname]);

  // The preview swaps on hover, so the art has to be in cache before the
  // pointer arrives or the first pass over the list flickers through blanks.
  useEffect(() => {
    if (!group) return;
    group.links.forEach(([, href]) => {
      const source = previews[href];
      if (!source) return;
      const image = new Image();
      image.src = source;
    });
  }, [group]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") openGroup(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <NavSurface />
      <header className={`site-header${group ? " nav-open" : ""}`}>
        <Link className="brand" href="/" aria-label="Smart Home Architects home">
          <span className="brand-dot" />
          <span>Smart Home Architects</span>
        </Link>
        <nav className="desktop-nav mega-triggers" aria-label="Primary navigation">
          {groups.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-expanded={active === item.id}
              onClick={() => openGroup(active === item.id ? null : item.id)}
            >
              {item.label}<span aria-hidden="true">{active === item.id ? "−" : "+"}</span>
            </button>
          ))}
        </nav>
        <Link className="header-cta" href="/contact">Start a project <span aria-hidden="true">↗</span></Link>

        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {groups.map((item) => (
              <div className="mobile-nav-group" key={item.id}>
                <span>{item.label}</span>
                {item.links.map(([label, href]) => <Link href={href} key={href} onClick={() => rememberNavReturn(item.id, pathname)}>{label}</Link>)}
              </div>
            ))}
            <Link className="mobile-project-link" href="/contact">Start a project ↗</Link>
          </nav>
        </details>

        {group && (
          <div className="mega-panel" role="region" aria-label={`${group.label} navigation`}>
            <div className="mega-panel-intro">
              <span>{group.index}</span>
              <h2>{group.label}</h2>
              <p>{group.description}</p>
            </div>
            <div className="mega-links" onMouseLeave={() => setHovered(null)}>
              {group.links.map(([label, href, note], index) => (
                <Link
                  href={href}
                  key={href}
                  onMouseEnter={() => setHovered(index)}
                  onFocus={() => setHovered(index)}
                  onClick={() => rememberNavReturn(group.id, pathname)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{label}</strong>
                  <small>{note}</small>
                  <i aria-hidden="true">↗</i>
                </Link>
              ))}
            </div>
            {(() => {
              // At rest the pane shows the group; on hover it previews whatever
              // the pointer is over, and the link follows so the image is not
              // advertising somewhere the click will not go.
              const featured = hovered === null ? null : group.links[hovered];
              const href = featured ? featured[1] : group.links[0][1];
              const image = (featured && previews[featured[1]]) || group.image;
              return (
                <Link
                  className="mega-feature"
                  href={href}
                  onClick={() => rememberNavReturn(group.id, pathname)}
                >
                  {/* Keyed so React swaps the element and the fade restarts. */}
                  <img key={image} decoding="async" src={image} alt="" />
                  <div>
                    <span>Explore {featured ? featured[0] : group.label}</span>
                    <i aria-hidden="true">↗</i>
                  </div>
                </Link>
              );
            })()}
            <div className="mega-panel-base"><span>{pageCount}-page architecture</span><span>South Africa · SAST</span></div>
          </div>
        )}
      </header>
      {group && <button className="nav-scrim" aria-label="Close navigation" onClick={() => openGroup(null)} />}
    </>
  );
}
