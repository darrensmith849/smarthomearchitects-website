"use client";

/**
 * The mechanical chrome every product page repeats.
 *
 * Deliberately small. The hero object, the section-01 laboratory and the
 * anatomy *visual* are the product's argument and stay hand-written per page —
 * a shared abstraction there would produce exactly the sameness these pages
 * exist to avoid. What is here is the part that was already identical, where
 * hand-copying only risks dropping an aria attribute.
 *
 * Extracted from the markup Atlas, Aura, Axis and Veil already emit, and
 * verified by diffing their rendered HTML before and after adoption.
 */

/** `[index, title, copy]` — the shape the anatomy tables already use. */
export type Layer = readonly [string, string, string];

/**
 * The assemble/separate control above an exploded diagram. Identical in Axis,
 * Atlas and Aura down to the − / + glyph; only the labels differ.
 */
export function ExplodeToggle({
  exploded,
  onToggle,
  assembleLabel,
  separateLabel,
}: {
  exploded: boolean;
  onToggle: () => void;
  assembleLabel: string;
  separateLabel: string;
}) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={exploded}>
      <span>{exploded ? assembleLabel : separateLabel}</span>
      <b>{exploded ? "−" : "+"}</b>
    </button>
  );
}

/**
 * The written half of an anatomy section — the numbered article list that sits
 * beside the visual. Byte-identical in Atlas and Aura today.
 */
export function LayerList({ layers, className }: { layers: readonly Layer[]; className: string }) {
  return (
    <div className={className}>
      {layers.map(([index, title, copy]) => (
        <article key={index}>
          <span>{index}</span>
          <div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * The numbered label that opens every section on every page of this site, not
 * just the product ones. Kept as its own component because it is the single
 * most repeated fragment in the codebase — roughly six per product page.
 */
export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span>{title}</span>
    </div>
  );
}
