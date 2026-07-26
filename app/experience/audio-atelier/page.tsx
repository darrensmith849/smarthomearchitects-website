import type { Metadata } from "next";
import { AudioAtelier } from "../../AudioAtelier";

export const metadata: Metadata = {
  title: "Audio Atelier · Place the sound",
  description: "A full-screen interactive architectural audio study with live listening focus, speaker fields and multi-zone routing.",
};

export default function AudioAtelierPage() {
  return <AudioAtelier />;
}
