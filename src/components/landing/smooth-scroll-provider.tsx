"use client";

import { useSmoothScroll } from "./use-smooth-scroll";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}