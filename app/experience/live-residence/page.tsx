import type { Metadata } from "next";
import { ConsultationCta } from "../../components";
import { LiveResidence } from "../../LiveResidence";

export const metadata: Metadata = {
  title: "Live Residence · Interactive smart home experience",
  description: "Explore a home through rooms, scenes, schedules and coordinated whole-home responses in an interactive architectural demonstration.",
};

export default function LiveResidencePage() {
  return <><LiveResidence /><ConsultationCta /></>;
}
