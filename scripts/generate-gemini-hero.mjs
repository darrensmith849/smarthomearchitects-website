import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { GoogleGenAI } from "@google/genai";

const siteRoot = resolve(import.meta.dirname, "..");
const envPath = resolve(siteRoot, ".env.local");
const sourcePath = resolve(siteRoot, "public/images/hero.jpg");
const outputPath = resolve(siteRoot, "public/video/home-hero-veo-candidate.mp4");
const model = "veo-3.1-generate-preview";

const prompt = [
  "Animate the supplied image as the opening frame of an original, photorealistic architectural film.",
  "Preserve the exact architecture, furniture placement, composition, blue-hour colour grade, ocean outlook, and quiet luxury of the supplied image.",
  "The camera is completely locked off: no zoom, pan, dolly, crop, shake, reframing, or parallax.",
  "Inside the built-in fireplace, natural flames move gently with irregular, realistic intensity and cast a restrained warm flicker on the nearby stone hearth.",
  "Only two additional motions: the sheer curtains barely breathe, and the distant ocean and cloud layers drift almost imperceptibly.",
  "No people, text, logos, interface graphics, new furniture, new lights, smoke, rain, wind, dramatic weather, or sudden change.",
  "The result should feel like a premium smart-home film: calm, refined, and unhurried. Generate no useful audio."
].join(" ");

function getApiKey(envText) {
  const match = envText.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
  const value = match?.[1]?.trim().replace(/^['\"]|['\"]$/g, "");
  if (!value || value === "PASTE_YOUR_GEMINI_API_KEY_HERE") {
    throw new Error("GEMINI_API_KEY is missing from .env.local.");
  }
  return value;
}

const [envText, imageBytes] = await Promise.all([
  readFile(envPath, "utf8"),
  readFile(sourcePath),
]);
const apiKey = getApiKey(envText);
const ai = new GoogleGenAI({ apiKey });

let operation = await ai.models.generateVideos({
  model,
  prompt,
  image: {
    imageBytes: imageBytes.toString("base64"),
    mimeType: "image/jpeg",
  },
  config: {
    aspectRatio: "16:9",
    durationSeconds: 8,
    resolution: "1080p",
    personGeneration: "allow_adult",
  },
});

if (!operation.name) {
  throw new Error("Gemini API did not return a generation operation.");
}

console.log("Video generation started.");
for (let attempt = 1; attempt <= 42 && !operation.done; attempt += 1) {
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 10_000));
  operation = await ai.operations.getVideosOperation({ operation });
  console.log(`Waiting for video generation (${attempt}/42)…`);
}

if (!operation.done) {
  throw new Error("Gemini video generation did not finish in time.");
}
if (operation.error) {
  throw new Error(String(operation.error.message ?? "Gemini video generation failed."));
}

const video = operation.response?.generatedVideos?.[0]?.video;
if (!video) {
  throw new Error("Gemini API completed without returning a video file.");
}

await ai.files.download({ file: video, downloadPath: outputPath });
console.log(`Saved candidate to ${outputPath}`);
