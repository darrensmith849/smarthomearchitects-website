import type { Metadata } from "next";
import { ShadingAtelier } from "../../ShadingAtelier";

export const metadata: Metadata = {
  title: "Shading Atelier · Daylight, privacy and view",
  description: "A full-screen interactive study of architectural shading, filtered daylight, privacy and blackout control.",
};

export default function ShadingAtelierPage() {
  return <ShadingAtelier />;
}
