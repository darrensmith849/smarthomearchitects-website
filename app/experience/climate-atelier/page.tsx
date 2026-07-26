import type { Metadata } from "next";
import { ClimateAtelier } from "../../ClimateAtelier";

export const metadata: Metadata = {
  title: "Climate Atelier · Comfort, air and silence",
  description: "A full-screen interactive climate study with live comfort controls and an architectural airflow section.",
};

export default function ClimateAtelierPage() {
  return <ClimateAtelier />;
}
