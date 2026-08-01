import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

/** The Worker expects bindings the site never reads on a page render, so a
 *  404-ing ASSETS stub is enough to exercise every HTML route. */
const ENV = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const CTX = { waitUntil() {}, passThroughOnException() {} };

let cached;
async function get(path) {
  if (!cached) {
    const url = new URL("dist/server/index.js", root);
    url.searchParams.set("test", `${process.pid}-${Date.now()}`);
    cached = (await import(url.href)).default;
  }
  return cached.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), ENV, CTX);
}

async function appSources() {
  const files = [];
  for await (const f of glob("app/**/*.{ts,tsx,css}", { cwd: root })) files.push(f);
  return Promise.all(files.map(async (f) => [f, await readFile(new URL(f, root), "utf8")]));
}

test("the homepage server-renders", async () => {
  const response = await get("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Smart Home Architects — Technology, beautifully resolved<\/title>/i);
  assert.match(html, /A home that notices/);
  assert.match(html, /property="og:image"/);
});

test("every route in the sitemap renders", async () => {
  const sitemap = await get("/sitemap.xml");
  assert.equal(sitemap.status, 200);

  const paths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname);

  // Guards against the sitemap silently emptying and this test passing vacuously.
  assert.ok(paths.length > 30, `sitemap listed only ${paths.length} routes`);

  const broken = [];
  for (const path of paths) {
    const response = await get(path);
    if (response.status !== 200) broken.push(`${response.status} ${path}`);
  }
  assert.deepEqual(broken, []);
});

test("every referenced image exists on disk", async () => {
  const sources = await appSources();
  const referenced = new Set();
  for (const [, source] of sources) {
    for (const m of source.matchAll(/\/images\/[A-Za-z0-9._-]+\.[a-z]{3,4}/g)) referenced.add(m[0]);
  }

  assert.ok(referenced.size > 20, `only found ${referenced.size} image references`);

  const missing = [];
  for (const ref of referenced) {
    await access(new URL(`public${ref}`, root)).catch(() => missing.push(ref));
  }
  assert.deepEqual(missing, [], "referenced images with no file — a rename probably missed a call site");
});

test("every image carries alt text", async () => {
  const sources = await appSources();
  const missing = [];
  for (const [file, source] of sources) {
    for (const m of source.matchAll(/<img\b[^>]*?\/?>/gs)) {
      if (!/\balt=/.test(m[0])) {
        const line = source.slice(0, m.index).split("\n").length;
        missing.push(`${file}:${line}`);
      }
    }
  }
  assert.deepEqual(missing, []);
});
