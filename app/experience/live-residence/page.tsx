import type { Metadata } from "next";
import { LiveResidence } from "../../LiveResidence";

export const metadata: Metadata = {
  title: "Control Studio · Lighting scenes and keypad designer",
  description: "A full-screen interactive lighting scene studio and architectural keypad configurator.",
};

export default function LiveResidencePage() {
  return <LiveResidence />;
}
