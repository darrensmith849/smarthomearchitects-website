export type Product = {
  slug: string;
  number: string;
  name: string;
  category: string;
  line: string;
  description: string;
  longDescription: string;
  image: string;
  accent: string;
  startingAt: string;
  dimensions: string;
  highlights: Array<{ value: string; label: string }>;
  features: Array<{ title: string; copy: string }>;
  specifications: Array<{ label: string; value: string }>;
  finishes: Array<{ name: string; color: string }>;
};

export const products: Product[] = [
  {
    slug: "axis",
    number: "01",
    name: "Axis",
    category: "Scene keypad",
    line: "One touch. The whole room changes.",
    description:
      "A precision-machined scene keypad with a smoked-glass surface, quiet haptics and no visual noise.",
    longDescription:
      "Axis turns a wall control into an architectural detail. Four pressure-aware zones can recall lighting, shading, climate and audio together, while its warm pin-light dims itself to the room. Every surface is finished by hand and every scene is programmed around the way you live.",
    image: "/images/axis.webp",
    accent: "#9b7251",
    startingAt: "Specified per project",
    dimensions: "88 × 88 × 8.6 mm",
    highlights: [
      { value: "4", label: "configurable zones" },
      { value: "8.6 mm", label: "visible depth" },
      { value: "2700 K", label: "adaptive pin-light" },
      { value: "32", label: "events per scene" },
    ],
    features: [
      {
        title: "Designed by touch",
        copy: "Subtle micro-texture and calibrated haptics let you find the right scene without looking down.",
      },
      {
        title: "Quietly contextual",
        copy: "Proximity sensing wakes only the control you need. Ambient light matching keeps it restful after dark.",
      },
      {
        title: "Made for architecture",
        copy: "A shadow-gap mounting plate, precise 1.5 mm frame and matched finish schedule make Axis sit with the interior.",
      },
    ],
    specifications: [
      { label: "Interface", value: "4 capacitive pressure zones with linear haptic feedback" },
      { label: "Power", value: "24 V DC, 2-wire system bus" },
      { label: "Control", value: "Lighting, shades, climate, audio and custom scenes" },
      { label: "Installation", value: "UK/EU flush box; shadow-gap mounting plate included" },
      { label: "Environment", value: "Indoor, 0–40 °C, up to 85% RH non-condensing" },
      { label: "Finish care", value: "Dry microfibre; no solvents or abrasive cleaners" },
      { label: "Integration", value: "Native Atlas bus; KNX and DALI scenes via Atlas Core" },
      { label: "Support", value: "5-year studio care with commissioned systems" },
    ],
    finishes: [
      { name: "Architectural bronze", color: "#8f6849" },
      { name: "Smoked nickel", color: "#5e5d5a" },
      { name: "Natural aluminium", color: "#c9c7c0" },
      { name: "Satin black", color: "#242322" },
    ],
  },
  {
    slug: "aura",
    number: "02",
    name: "Aura",
    category: "Presence sensor",
    line: "The room understands before you ask.",
    description:
      "A discreet multi-sensor that reads presence, light and comfort without cameras or cloud processing.",
    longDescription:
      "Aura gives a home the context to respond naturally. It can detect someone reading quietly, distinguish daylight from electric light and track thermal comfort—entirely on the local network. No camera. No recording. Just a room that knows when to help and when to be still.",
    image: "/images/aura-isolated.webp",
    accent: "#b5ad9e",
    startingAt: "Specified per project",
    dimensions: "Ø 82 × 18 mm",
    highlights: [
      { value: "7 m", label: "presence radius" },
      { value: "5", label: "environmental inputs" },
      { value: "0", label: "images captured" },
      { value: "30 ms", label: "local response" },
    ],
    features: [
      {
        title: "Still means present",
        copy: "Fine-motion sensing detects a seated person without requiring constant movement or intrusive cameras.",
      },
      {
        title: "Comfort in context",
        copy: "Lux, temperature, humidity and air-quality data give lighting and climate a shared understanding of the room.",
      },
      {
        title: "Private by design",
        copy: "All signals are interpreted locally. Aura contains no camera, microphone or cloud-dependent service.",
      },
    ],
    specifications: [
      { label: "Presence", value: "60 GHz fine-motion radar with 120° field of view" },
      { label: "Environment", value: "Ambient lux, temperature, relative humidity and VOC trend" },
      { label: "Coverage", value: "Up to 7 m radius at 2.7 m mounting height" },
      { label: "Power", value: "PoE Class 1 or 24 V DC system bus" },
      { label: "Network", value: "Encrypted local multicast; no internet connection required" },
      { label: "Installation", value: "Flush or 18 mm surface mount; paintable trim ring" },
      { label: "Operating range", value: "0–45 °C, 10–90% RH non-condensing" },
      { label: "Support", value: "5-year studio care with commissioned systems" },
    ],
    finishes: [
      { name: "Chalk", color: "#ece9e1" },
      { name: "Limestone", color: "#d8d0c1" },
      { name: "Graphite", color: "#363634" },
      { name: "Custom paint", color: "#b9b2a6" },
    ],
  },
  {
    slug: "atlas",
    number: "03",
    name: "Atlas Core",
    category: "Control processor",
    line: "The intelligence stays at home.",
    description:
      "A silent, local-first control processor that keeps the entire residence responsive—even when the internet is not.",
    longDescription:
      "Atlas Core is the calm centre of the system. It coordinates every room, stores every scene and bridges trusted building standards without sending the household to the cloud. A fanless aluminium enclosure, dual-network architecture and monitored power make it fit for homes designed to last for generations.",
    image: "/images/atlas-core-isolated.webp",
    accent: "#2a2927",
    startingAt: "Specified per project",
    dimensions: "320 × 240 × 68 mm",
    highlights: [
      { value: "0 dB", label: "fanless operation" },
      { value: "< 40 ms", label: "scene response" },
      { value: "2.5 Gb", label: "isolated network" },
      { value: "10 yr", label: "service horizon" },
    ],
    features: [
      {
        title: "Local, always",
        copy: "Core scenes, schedules and automations continue without a cloud account or an internet connection.",
      },
      {
        title: "Built to bridge",
        copy: "A single engineered layer coordinates DALI-2, KNX, Modbus, IP, dry-contact and serial systems.",
      },
      {
        title: "Serviceable by design",
        copy: "Versioned configuration, health monitoring and encrypted backup let the system evolve without being rebuilt.",
      },
    ],
    specifications: [
      { label: "Processor", value: "8-core local automation engine with secure hardware enclave" },
      { label: "Networking", value: "Dual isolated 2.5 GbE, VLAN-aware, IPv6 ready" },
      { label: "Building buses", value: "4 × isolated RS-485, KNX TP, DALI-2 gateway support" },
      { label: "I/O", value: "8 × dry contact, 4 × monitored relay, USB-C service port" },
      { label: "Power", value: "100–240 V AC, 48 W maximum, monitored UPS input" },
      { label: "Thermal", value: "Passive convection, 0 dB, 0–40 °C ambient" },
      { label: "Data", value: "Encrypted local storage and signed configuration backups" },
      { label: "Support", value: "10-year service plan; remote health review by consent" },
    ],
    finishes: [
      { name: "Satin graphite", color: "#2c2b29" },
      { name: "Rack black", color: "#151515" },
    ],
  },
  {
    slug: "veil",
    number: "04",
    name: "Veil",
    category: "Invisible loudspeaker",
    line: "Sound, without the object.",
    description:
      "A plaster-in planar loudspeaker that fills the room while disappearing completely into the architecture.",
    longDescription:
      "Veil turns the finished wall into an expansive acoustic surface. Its mineral face, planar exciter array and sealed backbox are installed before decoration, then measured and voiced in the completed room. Music remains vivid and spatial. The loudspeaker itself leaves no trace.",
    image: "/images/veil-isolated.webp",
    accent: "#9d835c",
    startingAt: "Specified per project",
    dimensions: "420 × 420 × 92 mm",
    highlights: [
      { value: "40 Hz", label: "in-room extension" },
      { value: "160°", label: "planar dispersion" },
      { value: "109 dB", label: "maximum output" },
      { value: "0 mm", label: "visible hardware" },
    ],
    features: [
      {
        title: "One continuous plane",
        copy: "The mineral acoustic face receives the project skim and coating so the wall remains visually uninterrupted.",
      },
      {
        title: "Sound beyond a point",
        copy: "A distributed planar array creates a wide, even field with less level change as you move through the room.",
      },
      {
        title: "Voiced in place",
        copy: "Every channel is measured after furnishing and tuned to the final room rather than a theoretical drawing.",
      },
    ],
    specifications: [
      { label: "Response", value: "40 Hz–25 kHz, ±3 dB in commissioned room" },
      { label: "Dispersion", value: "160° horizontal × 160° vertical" },
      { label: "Sensitivity", value: "87 dB, 2.83 V / 1 m" },
      { label: "Power", value: "50–200 W continuous, 250 W programme" },
      { label: "Impedance", value: "6 Ω nominal, 4.8 Ω minimum" },
      { label: "Installation", value: "Wall or ceiling; sealed 18.6 litre backbox" },
      { label: "Finish", value: "Approved mineral skim and project coating to 2 mm" },
      { label: "Support", value: "10-year driver and tuning support" },
    ],
    finishes: [
      { name: "Project plaster", color: "#e9e5dc" },
      { name: "Mineral paint", color: "#d6d0c4" },
      { name: "Acoustic clay", color: "#b8aa96" },
      { name: "Specialist finish", color: "#8b8277" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
