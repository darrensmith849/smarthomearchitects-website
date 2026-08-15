import type { Metadata } from "next";
import { LightDesk } from "../../LightDesk";

export const metadata: Metadata = {
  title: "Light Desk · Every circuit, continuously",
  description: "A full-screen lighting desk: five circuits, colour temperature, shade and time of day, all dimmed continuously over one room.",
};

export default function LightDeskPage() {
  return <LightDesk />;
}
