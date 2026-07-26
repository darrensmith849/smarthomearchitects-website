import type { Metadata } from "next";
import { SecurityObservatory } from "../../SecurityObservatory";

export const metadata: Metadata = {
  title: "Security Observatory · Protected by design",
  description: "A full-screen architectural security and privacy experience with an interactive estate plan and composed arrival sequence.",
};

export default function SecurityObservatoryPage() {
  return <SecurityObservatory />;
}
