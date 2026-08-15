/**
 * WCAG AA colour-contrast audit over every route in the sitemap.
 *
 *   npm run dev              # in another shell
 *   npm run audit:contrast
 *
 * Two things this does that a plain axe run does not.
 *
 * It neutralises transitions and animations before measuring. Catching an
 * element mid-fade produces impossible numbers — an earlier run reported 1.02
 * for white on near-black — and sends you chasing failures that do not exist.
 *
 * It opens the interactive states. Most of this site's small type lives in
 * panels behind a tab or a view switch, and a default render never shows them.
 * That blind spot is what hid fourteen layout collisions from an earlier sweep
 * until it started clicking things.
 *
 * Failures are reported grouped by the CSS rule that set the colour, walking up
 * to the ancestor when the value was inherited, because that is the thing you
 * have to edit. Exits non-zero if anything fails.
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const AXE = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const BASE = process.env.BASE_URL ?? process.argv[2] ?? "http://localhost:3001";
const VIEWPORT = { width: 1440, height: 900 };

/** Controls that reveal another panel. Capped per page so one atelier with a
 *  long scene list cannot dominate the run — but the cap has to clear the
 *  densest page or it silently under-measures it. /products/veil carries 23
 *  buttons, aura 22, atlas 15; at the old cap of 10 roughly half of each was
 *  never measured. Raise this alongside any page that gets busier. */
const TOGGLES =
  '[role="tab"], [aria-expanded], [class*="-switch"] button, [class*="-tabs"] button, ' +
  '[class*="-mode-buttons"] button, [class*="-view-switch"] button, [class*="-controls"] button';
const MAX_TOGGLES = 26;

const SETTLE = `*,*::before,*::after{
  animation-duration:.001ms!important;animation-delay:0s!important;
  transition-duration:.001ms!important;transition-delay:0s!important}`;

async function routes() {
  const response = await fetch(`${BASE}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap returned ${response.status}`);
  return [...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

/** Runs inside the page: axe, then blame each failure on a CSS rule. */
async function measure(page, state) {
  return page.evaluate(async (label) => {
    const result = await window.axe.run(document, {
      runOnly: ["color-contrast"],
      resultTypes: ["violations"],
    });
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) if (rule.selectorText && rule.style?.color) rules.push(rule);
      } catch {
        /* cross-origin sheet */
      }
    }
    const blame = (el) => {
      for (let node = el; node?.nodeType === 1; node = node.parentElement) {
        let match = null;
        for (const rule of rules) {
          try {
            if (node.matches(rule.selectorText)) match = rule;
          } catch {
            /* selector axe injected, or one this browser cannot parse */
          }
        }
        if (match) return `${node === el ? "" : "(inherited) "}${match.selectorText} { color: ${match.style.color} }`;
      }
      return null;
    };
    return (result.violations[0]?.nodes ?? []).map((node) => {
      let el = null;
      try {
        el = document.querySelector(node.target[0]);
      } catch {
        /* compound target */
      }
      const data = node.any[0]?.data ?? {};
      return {
        rule: (el && blame(el)) || `unresolved: ${node.target[0]}`,
        bg: data.bgColor,
        ratio: data.contrastRatio,
        need: data.expectedContrastRatio,
        state: label,
      };
    });
  }, state);
}

const found = new Map();
function record(path, hits) {
  for (const hit of hits) {
    const key = `${hit.rule}  [bg ${hit.bg}, ${hit.ratio} needs ${hit.need}]`;
    const entry = found.get(key) ?? { count: 0, where: new Set() };
    entry.count += 1;
    entry.where.add(`${path}${hit.state === "default" ? "" : ` (${hit.state})`}`);
    found.set(key, entry);
  }
}

const paths = await routes();
console.log(`auditing ${paths.length} routes at ${VIEWPORT.width}x${VIEWPORT.height} against ${BASE}\n`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VIEWPORT, reducedMotion: "reduce" });
let states = 0;

for (const path of paths) {
  await page.goto(`${BASE}${path}`, { waitUntil: "load" });
  await page.addStyleTag({ content: SETTLE });
  await page.addScriptTag({ content: AXE });
  await page.waitForTimeout(250);

  record(path, await measure(page, "default"));
  states += 1;

  const toggles = await page.locator(TOGGLES).all();
  for (const [index, toggle] of toggles.slice(0, MAX_TOGGLES).entries()) {
    try {
      if (!(await toggle.isVisible())) continue;
      await toggle.click({ timeout: 1200, noWaitAfter: true });
      await page.waitForTimeout(140);
      record(path, await measure(page, `toggle ${index + 1}`));
      states += 1;
    } catch {
      /* control vanished, navigated, or is covered — not a contrast finding */
    }
    if (!page.url().startsWith(`${BASE}${path}`)) {
      await page.goto(`${BASE}${path}`, { waitUntil: "load" });
      await page.addStyleTag({ content: SETTLE });
      await page.addScriptTag({ content: AXE });
    }
  }
  process.stdout.write(".");
}

await browser.close();

const rows = [...found.entries()].sort((a, b) => b[1].count - a[1].count);
const total = rows.reduce((sum, [, v]) => sum + v.count, 0);
console.log(`\n\n${states} states measured across ${paths.length} routes`);

if (!rows.length) {
  console.log("no colour-contrast failures");
  process.exit(0);
}

console.log(`${total} failing nodes, ${rows.length} distinct rules\n`);
for (const [rule, { count, where }] of rows) {
  const places = [...where].slice(0, 3).join(", ");
  console.log(`${String(count).padStart(3)}  ${rule}\n     ${places}${where.size > 3 ? ` +${where.size - 3} more` : ""}`);
}
process.exit(1);
