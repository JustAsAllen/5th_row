"use client";

import type { ReactNode } from "react";

export function CodeGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">{title}</div>
      {children}
    </div>
  );
}
