"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiveScene } from "./rive-scene";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#282C20]">
      {/* Animated Rive 3D background */}
      <div className="absolute inset-0 opacity-40">
        <RiveScene
          src="/animations/vehicles.riv"
          className="h-full w-full [&_canvas]:h-full [&_canvas]:w-full"
        />
      </div>

      {/* Olive grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,244,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,237,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 py-32 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#170F00]/60 px-4 py-2 text-xs uppercase tracking-widest text-[#D2FF00] backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#D2FF00]" />
            The Doraemon Magic Pocket
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-8 font-display text-[22vw] uppercase leading-[0.85] tracking-tight text-[#F4F4ED] md:text-[13vw] lg:text-[10vw]"
        >
          5TH
          <br />
          <span className="text-[#D2FF00]">ROW</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 max-w-xl text-base uppercase tracking-widest text-[#B4B8A5] md:text-lg"
        >
          The all-in-one web development super-toolkit.
          <br className="hidden md:block" />
          Stack, skills, and patterns for building gaand-faad client websites.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/control"
            className="group flex items-center gap-3 rounded-full bg-[#D2FF00] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#282C20] transition-transform hover:scale-105"
          >
            Open the Pocket
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/toolkit"
            className="rounded-full border border-[#F4F4ED]/30 px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#F4F4ED] transition-colors hover:border-[#F4F4ED]/60 hover:bg-[#F4F4ED]/5"
          >
            Read the Manual
          </Link>
        </motion.div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-[#B4B8A5]">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-2xl text-[#D2FF00]"
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}