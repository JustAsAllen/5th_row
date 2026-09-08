"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiveScene } from "./rive-scene";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black">
      {/* Rive canvas — subtle, dark */}
      <div className="absolute inset-0 opacity-20">
        <RiveScene
          src="/animations/vehicles.riv"
          className="h-full w-full [&_canvas]:h-full [&_canvas]:w-full"
        />
      </div>

      {/* Dragonfly-style grid lines — barely visible */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,242,242,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(242,242,242,0.02) 1px, transparent 1px)",
          backgroundSize: "81px 81px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1416px] flex-1 flex-col justify-center px-6 md:px-10">
        {/* Mono micro-label */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
            EST. 2024 — THE ALL-IN-ONE WEB DEV TOOLKIT
          </span>
        </motion.div>

        {/* Giant display title — Archivo Black, tight tracking */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-6 font-display text-[22vw] uppercase leading-[0.82] tracking-[-0.03em] text-[#F2F2F2] md:text-[13vw] lg:text-[10vw]"
        >
          5TH
          <br />
          <span className="text-[#D2FF00]">ROW</span>
        </motion.h1>

        {/* Serif body — Dragonfly's signature move */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 max-w-xl font-serif text-[24px] font-light leading-[1.4] tracking-[-0.02em] text-[#F2F2F2]/80 md:text-[28px]"
        >
          The all-in-one web development super-toolkit. Stack, skills, and patterns
          for building goated client websites.
        </motion.p>

        {/* CTAs — text only, no button styling (Dragonfly way) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <Link
            href="/control"
            className="group flex items-center gap-2 font-mono text-sm uppercase tracking-[0.4px] text-[#D2FF00] transition-colors hover:text-[#D2FF00]/80"
          >
            Open the Pocket
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/toolkit"
            className="font-mono text-sm uppercase tracking-[0.4px] text-[#7D7D7D] transition-colors hover:text-[#F2F2F2]"
          >
            Read the Manual
          </Link>
        </motion.div>
      </div>

      {/* Bottom scroll cue — mono label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-lg text-[#D2FF00]"
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
