"use client";

import { motion } from "framer-motion";
import { PixGlyph } from "@/components/landing/pix-glyph";
import { AGENTS, type Agent } from "./data";

const FLOW = [0.22, 1, 0.36, 1] as const;

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.85, ease: FLOW }}
      className="relative shrink-0 border border-white/[0.08] bg-white/[0.015] p-4 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3">
        <span className="flex items-center gap-2 font-display text-sm uppercase tracking-tight text-[#F2F2F2]">
          <PixGlyph
            type={agent.type === "readonly" ? "bracket-l" : "diamond"}
            className={`h-2.5 w-2.5 ${
              agent.type === "readonly" ? "text-[#7D7D7D]" : "text-[#D2FF00]"
            }`}
          />
          {agent.name}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#D2FF00]/80">
          {agent.badge}
        </span>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[#A8A8A8]">
        {agent.specialties.join(" · ")}
      </p>
      <p className="mt-2 font-mono text-[9px] leading-snug text-[#7D7D7D]">
        {agent.strong} — {agent.weak}
      </p>
      <div className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-[#7D7D7D]">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.85 + 0.3 }}
          className="h-1 w-1 rounded-full bg-[#D2FF00]"
        />
        germane · awaiting hand-off
      </div>
    </motion.div>
  );
}

export function WarRoom({ agents }: { agents: string[] }) {
  const deck = agents
    .map((id) => AGENTS.find((a) => a.id === id))
    .filter((a): a is Agent => Boolean(a));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
        <PixGlyph type="ticks" className="h-5 w-2 text-[#D2FF00]" />
        war room — {deck.length} specialists summoned by the router
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {deck.map((agent, i) => (
          <div key={agent.id} className="flex items-center gap-4">
            <AgentCard agent={agent} index={i} />
            {i < deck.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.85 + 0.4 }}
                className="flex flex-col items-center gap-1"
              >
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
                  className="font-mono text-[10px] text-[#D2FF00]"
                >
                  →
                </motion.div>
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#7D7D7D]">
                  ctx
                </span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#7D7D7D]">
        <span className="flex items-center gap-2">
          <PixGlyph type="diamond" className="h-2 w-2 text-[#D2FF00]" /> builder
        </span>
        <span className="flex items-center gap-2">
          <PixGlyph type="bracket-l" className="h-2 w-[4px] text-[#7D7D7D]" /> read-only
        </span>
        <span>hand-offs keyed to specialties</span>
      </div>
    </div>
  );
}