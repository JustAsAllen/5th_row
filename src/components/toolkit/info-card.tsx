"use client";

import type { ReactNode } from "react";

export function InfoCard({
  title,
  children,
  variant = "default",
}: {
  title: string;
  children: ReactNode;
  variant?: "default" | "warning" | "success";
}) {
  const variants = {
    default: "border-violet-500/20 bg-violet-500/5",
    warning: "border-amber-500/20 bg-amber-500/5",
    success: "border-emerald-500/20 bg-emerald-500/5",
  };

  const titleColors = {
    default: "text-violet-400",
    warning: "text-amber-400",
    success: "text-emerald-400",
  };

  return (
    <div className={`rounded-xl border p-4 md:p-5 ${variants[variant]}`}>
      <div className={`text-sm font-semibold ${titleColors[variant]}`}>{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}
