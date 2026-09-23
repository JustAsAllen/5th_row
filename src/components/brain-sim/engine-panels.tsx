"use client";

import { motion } from "framer-motion";
import { PixGlyph } from "@/components/landing/pix-glyph";
import { ATTACKS, PERF_METRICS, SECURITY_CHECKS } from "./data";

const FLOW = [0.22, 1, 0.36, 1] as const;

function PanelHeader({
  index,
  title,
  tone,
}: {
  index: string;
  title: string;
  tone?: "lime";
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
        <PixGlyph type="corners" className="h-3 w-3 text-[#7D7D7D]/60" />
        E{index} — {title}
      </span>
      <span
        className={`font-mono text-[9px] uppercase tracking-[0.25em] ${
          tone === "lime" ? "text-[#D2FF00]" : "text-[#7D7D7D]"
        }`}
      >
        engine
      </span>
    </div>
  );
}

export function RedTeamPanel() {
  return (
    <div className="border border-white/[0.08] bg-black p-5">
      <PanelHeader index="1" title="RED-TEAM" />
      <div className="mt-4 flex flex-col gap-2">
        {ATTACKS.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.22, duration: 0.3, ease: FLOW }}
            className="flex items-center justify-between gap-3 border border-white/[0.06] px-3 py-2"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#A8A8A8]">
              <span className="text-[#7D7D7D]">✕</span> {a.name}
            </span>
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em]">
              <span className="text-[#7D7D7D]">@{a.vector}</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.22 + 0.25, duration: 0.2 }}
                className="text-[#D2FF00]"
              >
                REPELLED
              </motion.span>
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#D2FF00]"
      >
        <PixGlyph type="plus" className="h-2 w-2 text-[#D2FF00]" />
        12/12 attacks repelled · 0 findings shipped
      </motion.div>
    </div>
  );
}

export function PerfPanel() {
  return (
    <div className="border border-white/[0.08] bg-black p-5">
      <PanelHeader index="2" title="PERFORMANCE" tone="lime" />
      <div className="mt-4 flex flex-col gap-3">
        {PERF_METRICS.map((m, i) => {
          const pct = i === 0 ? 96 : i === 1 ? 98 : i === 2 ? 100 : i === 3 ? 88 : 72;
          return (
            <div key={m.metric}>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em]">
                <span className="text-[#A8A8A8]">{m.metric}</span>
                <span
                  className={`tabular-nums ${
                    m.state === "good"
                      ? "text-[#D2FF00]"
                      : "text-[#7D7D7D]"
                  }`}
                >
                  {m.value}
                </span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden bg-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: i * 0.18, duration: 0.8, ease: FLOW }}
                  className="h-full bg-[#D2FF00]"
                />
              </div>
            </div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-[#7D7D7D]"
      >
        trace-driven · budget enforced · 1 entry in follow-up
      </motion.div>
    </div>
  );
}

export function SecurityPanel() {
  return (
    <div className="border border-white/[0.08] bg-black p-5">
      <PanelHeader index="3" title="SECURITY" />
      <div className="mt-4 flex flex-col gap-2">
        {SECURITY_CHECKS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.16, duration: 0.25, ease: FLOW }}
            className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em]"
          >
            <span className="flex items-center gap-2 text-[#A8A8A8]">
              <PixGlyph type="diamond" className="h-1.5 w-1.5 text-[#7D7D7D]/50" />
              {c.name}
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.16 + 0.12 }}
              className={
                c.status === "pass"
                  ? "text-[#D2FF00]"
                  : "text-[#7D7D7D]"
              }
            >
              {c.status === "pass" ? "PASS" : "FLAG"}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MiniFrame({ label, overflow }: { label: string; overflow?: boolean }) {
  return (
    <div className="flex flex-1 flex-col border border-white/[0.08] bg-black">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-2 py-1.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#7D7D7D]">
          {label}
        </span>
        <span className="flex gap-1">
          <span className="h-1 w-1 bg-[#7D7D7D]/40" />
          <span className="h-1 w-1 bg-[#7D7D7D]/40" />
          <span className="h-1 w-1 bg-[#7D7D7D]/40" />
        </span>
      </div>
      <div className="flex flex-col gap-1 p-2">
        <div className="h-3 w-4/5 bg-[#D2FF00]/20" />
        <div className="flex gap-1">
          <div className="h-6 w-1/3 bg-white/[0.07]" />
          <div className="h-6 w-1/3 bg-white/[0.05]" />
          <motion.div
            animate={overflow ? { x: [0, 4, 0] } : { x: 0 }}
            transition={{ repeat: overflow ? Infinity : 0, duration: 0.9 }}
            className="h-6 w-1/3 bg-[#D2FF00]/15"
          />
        </div>
        <div className="h-3 w-3/5 bg-white/[0.06]" />
      </div>
    </div>
  );
}

export function VisualQaPanel() {
  return (
    <div className="border border-white/[0.08] bg-black p-5">
      <PanelHeader index="4" title="VISUAL-QA" />
      <div className="mt-4 flex gap-2">
        <MiniFrame label="2560px" />
        <MiniFrame label="768px" overflow />
        <MiniFrame label="360px" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-[#7D7D7D]"
      >
        breakpoints clean · 1 overflow → visual-qa flag, captured
      </motion.div>
    </div>
  );
}