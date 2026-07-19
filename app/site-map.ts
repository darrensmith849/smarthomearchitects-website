export type LinkItem = { label: string; href: string; note?: string };

export type ServicePage = {
  slug: string;
  number: string;
  title: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  overlay: "light" | "shade" | "climate" | "sound" | "security" | "network" | "home" | "cinema" | "energy";
  telemetry: Array<{ label: string; value: string }>;
  stats: Array<{ value: string; label: string }>;
  philosophy: string;
  pillars: Array<{ title: string; copy: string }>;
  scenes: Array<{ time: string; name: string; detail: string }>;
  layers: Array<{ name: string; detail: string }>;
};

export const servicePages: ServicePage[] = [
  {
    slug: "whole-home",
    number: "01",
    title: "Whole home",
    navLabel: "Whole home",
    eyebrow: "One connected experience",
    headline: "The home behaves as one.",
    intro: "Lighting, climate, shading, sound, security and energy are designed as a single architectural layer—with one logic and far less interface.",
    image: "/images/hero.jpg",
    imageAlt: "A calm coastal smart home at blue hour",
    overlay: "home",
    telemetry: [{ label: "Systems online", value: "08 / 08" }, { label: "Scene", value: "EVENING" }, { label: "Response", value: "32 MS" }],
    stats: [{ value: "1", label: "considered interface" }, { value: "8", label: "coordinated systems" }, { value: "24/7", label: "local resilience" }, { value: "0", label: "visual clutter" }],
    philosophy: "A collection of smart devices is not a smart home. Intelligence appears when the systems understand one another, share context and respond with restraint.",
    pillars: [
      { title: "One architecture", copy: "Every discipline is mapped into a common control language and documented as part of the building." },
      { title: "One experience", copy: "Rooms behave consistently while still reflecting their purpose, daylight and the people using them." },
      { title: "One long view", copy: "Capacity, open standards and service access are planned so the home can evolve without starting over." },
    ],
    scenes: [{ time: "06:28", name: "Wake", detail: "Sheers open · 18% light · 21 °C" }, { time: "18:42", name: "Welcome", detail: "Arrival path · living warm · favourite radio" }, { time: "23:10", name: "Goodnight", detail: "House secure · climate rests · paths remain" }],
    layers: [{ name: "Experience", detail: "Scenes, rituals and human control" }, { name: "Integration", detail: "Shared logic, schedules and sensing" }, { name: "Infrastructure", detail: "Power, network, bus and resilience" }],
  },
  {
    slug: "lighting",
    number: "02",
    title: "Lighting",
    navLabel: "Lighting",
    eyebrow: "Architectural lighting control",
    headline: "Light that understands the hour.",
    intro: "We compose electric light around daylight, material, art and human rhythm—then make the result effortless to live with.",
    image: "/images/service-lighting.jpg",
    imageAlt: "A coastal living gallery illuminated at dusk",
    overlay: "light",
    telemetry: [{ label: "Scene", value: "BLUE HOUR" }, { label: "CCT", value: "2440 K" }, { label: "Level", value: "34%" }],
    stats: [{ value: "0.1%", label: "deep dimming" }, { value: "98+", label: "colour rendering" }, { value: "2200K", label: "evening warmth" }, { value: "32 ms", label: "scene response" }],
    philosophy: "The best lighting control does not draw attention to itself. It reveals texture, protects atmosphere and lets a room change character without exposing the machinery behind it.",
    pillars: [
      { title: "Commissioned by eye", copy: "Every circuit is balanced in the finished room against art, surfaces, daylight and sightlines." },
      { title: "Rhythm, not automation", copy: "Colour temperature and intensity follow the day gently, with simple manual control always close by." },
      { title: "One scene, many layers", copy: "Ambient, task, accent and decorative light move together as one architectural composition." },
    ],
    scenes: [{ time: "06:32", name: "First light", detail: "East sheers open · 2400 K · 12%" }, { time: "18:21", name: "Blue hour", detail: "Art 45% · joinery 28% · fire 16%" }, { time: "22:48", name: "Rest", detail: "Paths 4% · bedrooms 2200 K · façade off" }],
    layers: [{ name: "Light sources", detail: "High-fidelity dim-to-warm and tunable white" }, { name: "Control", detail: "DALI-2, phase, 0–10 V and native drivers" }, { name: "Experience", detail: "Scenes, daylight response and tactile keypads" }],
  },
  {
    slug: "shading",
    number: "03",
    title: "Shading",
    navLabel: "Shading",
    eyebrow: "Daylight and privacy",
    headline: "Keep the view. Edit the sun.",
    intro: "Architectural shading protects art, temperature and privacy while preserving the quality of natural light that makes the building special.",
    image: "/images/service-shading.jpg",
    imageAlt: "Automated sheer blinds filtering sunlight in a coastal pavilion",
    overlay: "shade",
    telemetry: [{ label: "Solar gain", value: "LOW" }, { label: "West sheer", value: "62%" }, { label: "UV index", value: "7.2" }],
    stats: [{ value: "1 mm", label: "pocket tolerance" }, { value: "42%", label: "peak heat reduction" }, { value: "< 35 dB", label: "motor noise" }, { value: "18", label: "coordinated zones" }],
    philosophy: "Daylight is a living material. We shape it across the day—softening glare, preserving the view and creating privacy without turning beautiful rooms into sealed boxes.",
    pillars: [
      { title: "Detailed into architecture", copy: "Pockets, side channels, access and fabric stacks are resolved before the ceiling is closed." },
      { title: "Measured daylight", copy: "Orientation, glare, UV exposure and solar gain guide each façade rather than one rule for the whole house." },
      { title: "Graceful control", copy: "Sheers move quietly in coordinated groups and always remain easy to adjust from the room." },
    ],
    scenes: [{ time: "08:10", name: "East light", detail: "Kitchen open · study sheer 35%" }, { time: "14:35", name: "Solar edit", detail: "West façade 68% · cooling pre-empted" }, { time: "19:02", name: "Privacy", detail: "Street sheers closed · garden remains open" }],
    layers: [{ name: "Fabric", detail: "Sheer, dimout, blackout and exterior screen" }, { name: "Mechanics", detail: "Silent motors, concealed pockets and service access" }, { name: "Intelligence", detail: "Sun path, glare, privacy and room scenes" }],
  },
  {
    slug: "climate",
    number: "04",
    title: "Climate",
    navLabel: "Climate",
    eyebrow: "Comfort and air",
    headline: "Comfort you never have to chase.",
    intro: "Temperature, air quality and passive solar response work together so rooms settle naturally—quietly and efficiently.",
    image: "/images/courtyard.jpg",
    imageAlt: "A naturally comfortable courtyard residence",
    overlay: "climate",
    telemetry: [{ label: "Living", value: "21.7 °C" }, { label: "Air quality", value: "EXCELLENT" }, { label: "Humidity", value: "48%" }],
    stats: [{ value: "±0.3°C", label: "comfort band" }, { value: "720 ppm", label: "typical occupied CO₂" }, { value: "18", label: "quiet zones" }, { value: "42%", label: "less peak demand" }],
    philosophy: "Comfort is not a thermostat number. It is temperature, radiant surfaces, airflow, humidity, sunlight and occupancy interpreted together—and adjusted before discomfort arrives.",
    pillars: [
      { title: "Room-level understanding", copy: "Presence and environmental sensing avoid conditioning empty rooms or averaging away real discomfort." },
      { title: "Passive first", copy: "Shading, natural ventilation and thermal mass are used before mechanical systems work harder." },
      { title: "Quietly coordinated", copy: "Underfloor, ducted, hydronic and ventilation systems share setpoints and do not fight one another." },
    ],
    scenes: [{ time: "05:50", name: "Pre-warm", detail: "Bathroom floor 23 °C · bedroom remains cool" }, { time: "13:20", name: "Solar guard", detail: "West shades lower · cooling trims 1.2 °C" }, { time: "22:30", name: "Night air", detail: "Bedrooms 19 °C · fresh-air rate low" }],
    layers: [{ name: "Sensing", detail: "Presence, temperature, humidity, CO₂ and VOC trend" }, { name: "Plant", detail: "HVAC, hydronic, ventilation and underfloor" }, { name: "Envelope", detail: "Shading, glazing, thermal mass and natural air" }],
  },
  {
    slug: "audio",
    number: "05",
    title: "Audio",
    navLabel: "Audio",
    eyebrow: "Architectural sound",
    headline: "Music in the room. Speakers out of sight.",
    intro: "We design sound into the volume of the architecture—balanced, generous and simple enough to enjoy every day.",
    image: "/images/service-audio.jpg",
    imageAlt: "An intimate architectural music lounge",
    overlay: "sound",
    telemetry: [{ label: "Source", value: "LISTENING ROOM" }, { label: "Level", value: "-28 DB" }, { label: "Zones", value: "04 LINKED" }],
    stats: [{ value: "20 Hz", label: "low-frequency extension" }, { value: "0", label: "visible speakers" }, { value: "18", label: "independent zones" }, { value: "96 kHz", label: "lossless distribution" }],
    philosophy: "Good residential audio does not sound loud or technical. It sounds effortless—stable across the room, emotionally present and completely in scale with the architecture.",
    pillars: [
      { title: "Architectural first", copy: "Invisible, plaster-in and precisely detailed speakers preserve ceilings, surfaces and visual calm." },
      { title: "Tuned in place", copy: "Every zone is measured, equalised and listened to with furniture, finishes and doors in their final positions." },
      { title: "Music, not menus", copy: "Favourite sources and volume are immediately available from the room without navigating an equipment stack." },
    ],
    scenes: [{ time: "07:12", name: "Morning radio", detail: "Kitchen + terrace · low level · news preset" }, { time: "19:30", name: "Dinner", detail: "Living muted · dining warm stereo image" }, { time: "22:05", name: "Listen", detail: "Lounge reference curve · other zones released" }],
    layers: [{ name: "Acoustics", detail: "Room behaviour, isolation and architectural treatment" }, { name: "Reproduction", detail: "Invisible, architectural and high-performance loudspeakers" }, { name: "Distribution", detail: "Lossless local sources, streaming and simple control" }],
  },
  {
    slug: "cinema",
    number: "06",
    title: "Cinema",
    navLabel: "Cinema",
    eyebrow: "Private cinema",
    headline: "A room that disappears into the story.",
    intro: "Picture, sound, acoustics and atmosphere are designed as one immersive room—with none of the equipment competing for attention.",
    image: "/images/service-audio.jpg",
    imageAlt: "A dark, quiet private entertainment room",
    overlay: "cinema",
    telemetry: [{ label: "Format", value: "4K HDR" }, { label: "Sound", value: "9.4.6" }, { label: "Scene", value: "FEATURE" }],
    stats: [{ value: "4K", label: "reference image" }, { value: "9.4.6", label: "immersive channels" }, { value: "NC-20", label: "room noise target" }, { value: "1 touch", label: "complete start-up" }],
    philosophy: "The best cinema is not a showroom for hardware. It is a perfectly controlled envelope where image, sound and comfort vanish into the film.",
    pillars: [{ title: "Calibrated image", copy: "Projection, screen and room reflectance are specified together for real contrast." }, { title: "Architectural acoustics", copy: "Isolation and treatment are concealed within the room build-up." }, { title: "Effortless ritual", copy: "One action prepares light, climate, picture and sound in the correct sequence." }],
    scenes: [{ time: "00:00", name: "Enter", detail: "Aisles 18% · room cools · system wakes" }, { time: "00:45", name: "Feature", detail: "Masking set · lights fade · phones quiet" }, { time: "02:18", name: "Intermission", detail: "Low paths · volume holds · doors released" }],
    layers: [{ name: "Room", detail: "Isolation, treatment, seating and ventilation" }, { name: "Image", detail: "Projection, display, masking and calibration" }, { name: "Sound", detail: "Immersive layout, bass strategy and tuning" }],
  },
  {
    slug: "security",
    number: "07",
    title: "Security",
    navLabel: "Security",
    eyebrow: "Discreet protection",
    headline: "Protection without the feeling of being watched.",
    intro: "Layered security is designed into arrival, landscape and daily routines—private, local and calm enough to disappear from family life.",
    image: "/images/service-security.jpg",
    imageAlt: "A secure mountainside residence at blue hour",
    overlay: "security",
    telemetry: [{ label: "Perimeter", value: "CLEAR" }, { label: "Arrival", value: "VERIFIED" }, { label: "Privacy", value: "LOCAL" }],
    stats: [{ value: "4", label: "protection layers" }, { value: "100%", label: "local recording" }, { value: "30 days", label: "encrypted retention" }, { value: "< 1 s", label: "event correlation" }],
    philosophy: "Security should create confidence, not anxiety. We layer architecture, detection, verification and response so that risk is understood early and daily life stays open.",
    pillars: [
      { title: "Designed into arrival", copy: "Access, lighting, intercom and landscape create a welcoming sequence with clear security boundaries." },
      { title: "Verified before alerted", copy: "Multiple local signals correlate events to reduce noise and make important notifications meaningful." },
      { title: "Private by default", copy: "Video and access records stay encrypted on site with tightly controlled, auditable remote access." },
    ],
    scenes: [{ time: "07:00", name: "Open house", detail: "Family access · perimeter remains active" }, { time: "18:40", name: "Arrival", detail: "Gate verified · path light · entry released" }, { time: "23:15", name: "Night secure", detail: "Shell armed · internal movement free" }],
    layers: [{ name: "Deter", detail: "Architecture, light and visible boundaries" }, { name: "Detect", detail: "Perimeter, access, life safety and video analytics" }, { name: "Respond", detail: "Verified alerts, local action and human escalation" }],
  },
  {
    slug: "networking",
    number: "08",
    title: "Networking",
    navLabel: "Networking",
    eyebrow: "Invisible infrastructure",
    headline: "The most important system you never see.",
    intro: "A resilient private network gives every room, service and person the bandwidth and protection to work without friction.",
    image: "/images/hero.jpg",
    imageAlt: "A connected home settling into evening",
    overlay: "network",
    telemetry: [{ label: "Core", value: "2.5 GB" }, { label: "Latency", value: "8 MS" }, { label: "Coverage", value: "-54 DBM" }],
    stats: [{ value: "99.99%", label: "target availability" }, { value: "2.5 Gb", label: "residential core" }, { value: "-55 dBm", label: "design coverage" }, { value: "6", label: "isolated trust zones" }],
    philosophy: "The network is now as fundamental as power and water. It must be architected, documented and maintained—not assembled from consumer boxes after the house is finished.",
    pillars: [
      { title: "Measured coverage", copy: "Wireless placement is modelled before ceilings close and validated room by room after occupation." },
      { title: "Designed trust", copy: "Family, guests, building systems, cameras and service access live in clearly separated security zones." },
      { title: "Resilient core", copy: "Power conditioning, monitored equipment, dual paths and clean documentation reduce both failure and recovery time." },
    ],
    scenes: [{ time: "00:00", name: "Normal", detail: "Primary uplink · all zones healthy" }, { time: "00:01", name: "Failover", detail: "Secondary WAN · essential traffic prioritised" }, { time: "02:00", name: "Care window", detail: "Encrypted backup · health review · no interruption" }],
    layers: [{ name: "Physical", detail: "Fibre, copper, wireless, racks and conditioned power" }, { name: "Logical", detail: "Segmentation, identity, quality and policy" }, { name: "Care", detail: "Monitoring, backup, updates and documented recovery" }],
  },
  {
    slug: "energy",
    number: "09",
    title: "Energy",
    navLabel: "Energy",
    eyebrow: "Residential energy",
    headline: "Use energy when it makes sense.",
    intro: "Solar, storage, generator, grid and household demand are orchestrated around resilience, comfort and the priorities of the home.",
    image: "/images/courtyard.jpg",
    imageAlt: "A daylight-led low-energy courtyard home",
    overlay: "energy",
    telemetry: [{ label: "Solar", value: "8.4 KW" }, { label: "Battery", value: "78%" }, { label: "Grid", value: "STANDBY" }],
    stats: [{ value: "4", label: "coordinated sources" }, { value: "12 h", label: "essential autonomy" }, { value: "100 ms", label: "transfer target" }, { value: "1", label: "clear energy view" }],
    philosophy: "Energy management should protect comfort and resilience without turning everyday life into an engineering exercise.",
    pillars: [{ title: "Prioritised loads", copy: "The home knows what must remain available and what can wait." }, { title: "Forecast-aware", copy: "Generation, weather and occupancy shape charging and demand." }, { title: "Visible when useful", copy: "A calm energy view explains performance without overwhelming the household." }],
    scenes: [{ time: "10:20", name: "Harvest", detail: "Solar serves home · surplus charges storage" }, { time: "18:10", name: "Peak protect", detail: "Battery supports kitchen + climate" }, { time: "23:40", name: "Reserve", detail: "Essential circuits · storage floor protected" }],
    layers: [{ name: "Supply", detail: "Grid, solar, storage and standby generation" }, { name: "Demand", detail: "Essential, flexible and discretionary loads" }, { name: "Intelligence", detail: "Forecast, tariffs, reserve and household priorities" }],
  },
];

export const systemPages = [
  { slug: "architecture", number: "01", title: "System architecture", headline: "One invisible foundation.", intro: "The technical backbone that lets every discipline behave like part of one home.", image: "/images/atlas.jpg", topics: ["Open standards", "Control hierarchy", "Future capacity"] },
  { slug: "interfaces", number: "02", title: "Interfaces", headline: "Control without complexity.", intro: "Tactile controls, quiet screens and voice only where each is genuinely useful.", image: "/images/axis.jpg", topics: ["Keypads", "Touch interfaces", "Voice and presence"] },
  { slug: "scenes", number: "03", title: "Scenes & automations", headline: "Many systems. One moment.", intro: "Scenes compose light, shade, temperature and sound around real household rituals.", image: "/images/service-lighting.jpg", topics: ["Daily rhythm", "Context", "Manual always wins"] },
  { slug: "privacy", number: "04", title: "Privacy", headline: "The intelligence stays at home.", intro: "Local processing, data restraint and explicit consent are designed into the system from the start.", image: "/images/aura.jpg", topics: ["Local-first", "Least data", "Auditable access"] },
  { slug: "resilience", number: "05", title: "Resilience", headline: "Ready for the imperfect day.", intro: "Power, network and control continue gracefully through outages, failures and change.", image: "/images/atlas.jpg", topics: ["Graceful failure", "Documented recovery", "Long service life"] },
  { slug: "wellness", number: "06", title: "Wellness", headline: "A home in rhythm with you.", intro: "Light, air, temperature and quiet are tuned around rest, focus and natural daily cycles.", image: "/images/courtyard.jpg", topics: ["Circadian light", "Air quality", "Acoustic calm"] },
];

export const studioPages = [
  { slug: "philosophy", number: "02", title: "Philosophy", headline: "Technology should return attention.", intro: "We believe the smartest home is the one that asks the least from the people inside it.", image: "/images/hero.jpg" },
  { slug: "team", number: "03", title: "The studio", headline: "Architects of the invisible.", intro: "A multidisciplinary team working across experience, engineering, lighting, acoustics and long-term care.", image: "/images/courtyard.jpg" },
  { slug: "partners", number: "04", title: "Partners", headline: "Designed with the whole table.", intro: "We work in close collaboration with architects, interior designers, consultants, contractors and trusted makers.", image: "/images/service-shading.jpg" },
];

export const categoryPages = [
  { slug: "controls", title: "Controls", headline: "One touch. No second thought.", intro: "Keypads and interfaces selected for tactility, clarity and architectural fit.", image: "/images/axis.jpg", filter: "Touch" },
  { slug: "sensors", title: "Sensors", headline: "Context without intrusion.", intro: "Presence and environmental sensing designed to inform the home while protecting privacy.", image: "/images/aura.jpg", filter: "Sense" },
  { slug: "processors", title: "Processors", headline: "Local intelligence, quietly working.", intro: "The resilient control cores and gateways that keep essential experience inside the home.", image: "/images/atlas.jpg", filter: "Think" },
  { slug: "speakers", title: "Architectural audio", headline: "Sound, not hardware.", intro: "Invisible, flush and sculptural loudspeakers for every level of listening.", image: "/images/service-audio.jpg", filter: "Listen" },
  { slug: "shades", title: "Shades", headline: "Daylight, precisely edited.", intro: "Sheer, blackout and exterior systems coordinated into the architecture.", image: "/images/service-shading.jpg", filter: "Filter" },
  { slug: "climate", title: "Climate", headline: "Comfort in context.", intro: "Room sensors, quiet controls and plant integration for a naturally settled home.", image: "/images/courtyard.jpg", filter: "Breathe" },
  { slug: "networking", title: "Networking", headline: "Infrastructure for modern life.", intro: "Enterprise-grade networks and resilient power made appropriate for a private home.", image: "/images/atlas.jpg", filter: "Connect" },
  { slug: "security", title: "Security", headline: "Confidence, not surveillance.", intro: "Private, local-first security components selected as part of a layered design.", image: "/images/service-security.jpg", filter: "Protect" },
];

export const projectPages = [
  { slug: "atlantic-house", title: "Atlantic House", location: "Bantry Bay", year: "2026", line: "Blue hour, composed.", image: "/images/hero.jpg", systems: "Lighting · shading · audio · climate" },
  { slug: "forest-house", title: "Forest House", location: "Constantia", year: "2025", line: "A home that breathes with the garden.", image: "/images/courtyard.jpg", systems: "Climate · wellness · security · energy" },
  { slug: "city-penthouse", title: "City Penthouse", location: "Johannesburg", year: "2026", line: "Quiet above the city.", image: "/images/service-audio.jpg", systems: "Audio · lighting · privacy · networking" },
  { slug: "wine-estate", title: "Wine Estate", location: "Stellenbosch", year: "2025", line: "Old landscape. New intelligence.", image: "/images/service-security.jpg", systems: "Whole home · energy · security · shading" },
];

export const architectureLinks: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Approach", href: "/approach" },
  ...studioPages.map((page) => ({ label: page.title, href: `/studio/${page.slug}` })),
  ...servicePages.map((page) => ({ label: page.title, href: `/services/${page.slug}` })),
  ...systemPages.map((page) => ({ label: page.title, href: `/systems/${page.slug}` })),
  { label: "Collection", href: "/products" },
  ...categoryPages.map((page) => ({ label: page.title, href: `/products/${page.slug}` })),
  { label: "Axis", href: "/products/axis" },
  { label: "Aura", href: "/products/aura" },
  { label: "Atlas Core", href: "/products/atlas" },
  { label: "Projects", href: "/projects" },
  { label: "Courtyard House", href: "/projects/vista-house" },
  ...projectPages.map((page) => ({ label: page.title, href: `/projects/${page.slug}` })),
  { label: "Start a project", href: "/contact" },
  { label: "For professionals", href: "/professionals" },
];

export const pageCount = architectureLinks.length;

export function getService(slug: string) { return servicePages.find((page) => page.slug === slug); }
export function getSystemPage(slug: string) { return systemPages.find((page) => page.slug === slug); }
export function getStudioPage(slug: string) { return studioPages.find((page) => page.slug === slug); }
export function getCategoryPage(slug: string) { return categoryPages.find((page) => page.slug === slug); }
export function getProjectPage(slug: string) { return projectPages.find((page) => page.slug === slug); }
