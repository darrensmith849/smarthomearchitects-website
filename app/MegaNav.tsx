"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const groups = [
  {
    id: "experience",
    label: "Experience",
    index: "01",
    description: "The systems that shape everyday life.",
    image: "/images/scene-welcome.jpg",
    links: [
      ["Live residence", "/experience/live-residence", "Explore the home in motion"],
      ["Shading atelier", "/experience/shading-atelier", "Compose daylight, privacy and view"],
      ["Climate atelier", "/experience/climate-atelier", "See comfort, air and silence"],
      ["Audio atelier", "/experience/audio-atelier", "Place sound through the room"],
      ["Whole home", "/services/whole-home", "One connected experience"],
      ["Lighting", "/services/lighting", "Light in rhythm with the day"],
      ["Shading", "/services/shading", "Daylight and privacy"],
      ["Climate", "/services/climate", "Comfort and air"],
      ["Audio", "/services/audio", "Architectural sound"],
      ["Cinema", "/services/cinema", "Private immersion"],
      ["Security", "/services/security", "Discreet protection"],
      ["Networking", "/services/networking", "Invisible infrastructure"],
      ["Energy", "/services/energy", "Resilience and control"],
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    index: "02",
    description: "How the invisible layer is designed.",
    image: "/images/atlas.jpg",
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
    index: "03",
    description: "Objects worth seeing. Systems designed not to be.",
    image: "/images/axis.jpg",
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
    index: "04",
    description: "The thinking, people and homes behind the work.",
    image: "/images/courtyard.jpg",
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

export function MegaNav() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const group = groups.find((item) => item.id === active);

  useEffect(() => setActive(null), [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
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
              onClick={() => setActive(active === item.id ? null : item.id)}
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
                {item.links.slice(0, 6).map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
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
            <div className="mega-links">
              {group.links.map(([label, href, note], index) => (
                <Link href={href} key={href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{label}</strong>
                  <small>{note}</small>
                  <i aria-hidden="true">↗</i>
                </Link>
              ))}
            </div>
            <Link className="mega-feature" href={group.links[0][1]}>
              <img src={group.image} alt="" />
              <div><span>Explore {group.label}</span><i aria-hidden="true">↗</i></div>
            </Link>
            <div className="mega-panel-base"><span>40-page architecture</span><span>South Africa · SAST</span></div>
          </div>
        )}
      </header>
      {group && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setActive(null)} />}
    </>
  );
}
