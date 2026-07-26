import type { Metadata } from "next";
import { WaterLandscapeAtelier } from "../../WaterLandscapeAtelier";

export const metadata: Metadata = {
  title: "Water & Landscape Atelier · Every drop has a purpose",
  description: "A full-screen water-wise garden experience with an interactive rainwater, pool, home and irrigation system map.",
};

export default function WaterLandscapeAtelierPage() {
  return <WaterLandscapeAtelier />;
}
