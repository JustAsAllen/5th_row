"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function ToolSection({
  id,
  step,
  title,
  subtitle,
  children,
}: {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-zinc-800/50 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-400">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          {step}
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-base text-zinc-400 md:text-lg">{subtitle}</p>
        <div className="mt-8 space-y-6">{children}</div>
      </motion.div>
    </section>
  );
}
