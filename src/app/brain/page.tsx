import type { Metadata } from "next";
import { BrainOs } from "@/components/brain-sim/brain-os";

export const metadata: Metadata = {
  title: "Brain OS Sim",
  description:
    "A live simulation of the 5th_row Development OS — intake, classification, war room, engines, verification, and memory.",
};

export default function BrainPage() {
  return <BrainOs />;
}