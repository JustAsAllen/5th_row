"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PixGlyph } from "@/components/landing/pix-glyph";
import { LogStream } from "./log-stream";
import { WarRoom } from "./war-room";
import { RedTeamPanel, PerfPanel, SecurityPanel, VisualQaPanel } from "./engine-panels";
import {
  AGENTS,
  CATEGORIES,
  LEVELS,
  LOG_LINES,
  TASKS,
  VERIFY_GATE,
  WINDOW_MS,
  STAGE_DELAY,
} from "./data";

const FLOW = [0.22, 1, 0.36, 1] as const;

const STAGES = [
  { id: "intent", short: "INTENT", ms: 5600 },
  { id: "classify", short: "CLASSIFY", ms: 4100 },
  { id: "dna", short: "DNA", ms: 4200 },
  { id: "warroom", short: "WAR ROOM", ms: 11000 },
  { id: "engines", short: "ENGINES", ms: 4800 },
  { id: "gate", short: "GATE", ms: 5000 },
  { id: "memory", short: "MEMORY", ms: 5400 },
] as const;

type StageId = (typeof STAGES)[number]["id"];

const DNA_ROWS = [
  ["stack", "next 16 · tailwind 4 · supabase · framer-motion"],
  ["arch", "app router · server actions · edge-safe client split"],
  ["conventions", "house spacing · mono micro-labels · display type"],
  ["testing", "visual qa at 3 breakpoints · jsdoc-free, type-only"],
  ["memory", "5 prior builds · lessons → project-intelligence"],
];

function StageShell({
  title,
  index,
  children,
}: {
  title: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key="stage"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5, ease: FLOW }}
      className="mx-auto w-full max-w-[1180px]"
    >
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
            S{index} / 07
          </span>
          <h2 className="mt-1 font-display text-3xl uppercase tracking-[-0.01em] text-[#F2F2F2] md:text-4xl">
            {title}
          </h2>
        </div>
        <PixGlyph type="corners" className="h-4 w-4 text-[#7D7D7D]/50" />
      </div>
      {children}
    </motion.div>
  );
}

export function BrainOs() {
  const [runId, setRunId] = useState(0);
  const [stageIdx, setStageIdx] = useState(-1);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const running = runId > 0;
  const task = TASKS[runId % TASKS.length] ?? TASKS[0];
  const stage: (typeof STAGES)[number] | undefined =
    stageIdx >= 0 && stageIdx < STAGES.length ? STAGES[stageIdx] : undefined;
  const stageId: StageId | undefined = stage?.id;

  useEffect(() => {
    if (!running) return;
    if (timer.current) clearTimeout(timer.current);

    const chain = (i: number) => {
      if (i >= STAGES.length) {
        setDone(true);
        return;
      }
      setStageIdx(i);
      timer.current = setTimeout(() => chain(i + 1), STAGES[i].ms);
    };
    timer.current = setTimeout(() => chain(0), 600);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [runId, running]);

  const start = (next: number) => {
    if (timer.current) clearTimeout(timer.current);
    setDone(false);
    setStageIdx(0);
    setRunId(next);
  };

  const skip = () => {
    if (!running || done) return;
    if (timer.current) clearTimeout(timer.current);
    setStageIdx(STAGES.length - 1);
    timer.current = setTimeout(() => setDone(true), STAGES[STAGES.length - 1].ms);
  };

  const rerun = () => start(runId + 1);

  return (
    <div className="relative min-h-svh overflow-hidden bg-black">
      {/* Ambient grid + scattered glyphs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,242,242,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(242,242,242,0.025) 1px, transparent 1px)",
          backgroundSize: "81px 81px",
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        <PixGlyph type="corners" className="absolute right-10 top-28 h-4 w-4 text-[#7D7D7D]/40" />
        <PixGlyph type="plus" className="absolute left-8 top-1/2 h-2 w-2 text-[#DBFF00]/30" />
        <PixGlyph type="ticks" className="absolute bottom-48 left-12 h-5 w-2 text-[#7D7D7D]/30" />
        <PixGlyph type="diamond" className="absolute right-1/4 top-16 h-3 w-3 text-[#DBFF00]/25" />
      </div>

      {/* Header strip */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1416px] flex-col px-6 pt-24 md:px-10">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D] transition-colors hover:text-[#F2F2F2]"
          >
            <PixGlyph type="bracket-l" className="h-3 w-[5px] text-[#7D7D7D] transition-colors group-hover:text-[#D2FF00]" />
            5th_row
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <PixGlyph type="dottule" className="h-1 w-6 text-[#7D7D7D]/40" />
          <span className="font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D]">
            brain os · live simulation
          </span>
        </div>
        <p className="mt-4 max-w-2xl font-serif text-2xl font-light leading-snug tracking-[-0.02em] text-[#F2F2F2]/70">
          Watch the Development OS eat a mission — intake, classification, war room,
          attack engines, verification, and memory. One take. No cuts.
        </p>
      </div>

      {/* Progress rail */}
      <div className="relative z-10 mx-auto mt-10 flex w-full max-w-[1416px] items-center gap-2 px-6 md:px-10">
        {STAGES.map((s, i) => {
          const isCurrent = i === stageIdx;
          const isPast = stageIdx > i || (done && i < STAGES.length);
          return (
            <div key={s.id} className="flex flex-1 items-center gap-2">
              <div
                className={`flex w-full items-center gap-2 border px-3 py-2 transition-colors duration-300 ${
                  isCurrent
                    ? "border-[#D2FF00]/50 bg-[#D2FF00]/5"
                    : isPast
                      ? "border-white/[0.08]"
                      : "border-white/[0.06] opacity-50"
                }`}
              >
                <span
                  className={`font-mono text-[9px] tabular-nums ${
                    isCurrent ? "text-[#D2FF00]" : "text-[#7D7D7D]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`hidden font-mono text-[10px] uppercase tracking-[0.2em] sm:block ${
                    isCurrent ? "text-[#F2F2F2]" : "text-[#A8A8A8]"
                  }`}
                >
                  {s.short}
                </span>
                {isPast && <PixGlyph type="plus" className="ml-auto h-1.5 w-1.5 text-[#D2FF00]" />}
              </div>
              {i < STAGES.length - 1 && <div className="h-px w-2 shrink-0 bg-white/10" />}
            </div>
          );
        })}
        <button
          onClick={skip}
          disabled={!running || done}
          className="ml-2 shrink-0 border border-white/[0.08] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D7D7D] transition-colors hover:text-[#F2F2F2] disabled:opacity-30 disabled:hover:text-[#7D7D7D]"
        >
          skip ▸
        </button>
      </div>

      {/* Stage body */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1416px] flex-1 flex-col px-6 py-12 md:px-10 md:py-16">
        <AnimatePresence mode="wait">
          {!running && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: FLOW }}
              className="mx-auto flex w-full max-w-[880px] flex-col items-start"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]"
              >
                <PixGlyph type="ticks" className="h-4 w-[6px] text-[#D2FF00]" />
                38 capabilities · 12 agents · 6 engines · 10 presets · 11 commands
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: FLOW }}
                className="mt-7 font-display text-[17vw] uppercase leading-[0.8] tracking-[-0.02em] text-[#F2F2F2] md:text-[9vw] lg:text-[7.5vw]"
              >
                BRAIN
                <br />
                <span className="text-[#D2FF00]">OS SIM</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-5 flex items-center gap-3 text-[#7D7D7D]"
              >
                <PixGlyph type="bracket-l" className="h-3 w-[5px]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4px]">
                  boot the developer operating system
                </span>
                <PixGlyph type="bracket-r" className="h-3 w-[5px] text-[#D2FF00]/70" />
              </motion.div>
              <motion.button
                onClick={() => start(1)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                whileTap={{ scale: 0.99 }}
                className="group mt-10 flex items-center gap-3 border border-[#D2FF00]/40 px-6 py-4 font-mono text-sm uppercase tracking-[0.3em] text-[#D2FF00] transition-colors hover:bg-[#D2FF00] hover:text-black"
              >
                <span className="animate-pulse">▮</span>
                Initialize mission
                <span className="font-serif lowercase tracking-normal normal-case italic text-[#7D7D7D] transition-colors group-hover:text-black/60">
                  → drop the task
                </span>
              </motion.button>
            </motion.div>
          )}

          {running && stageId === "intent" && (
            <StageShell title="Intent" index="01">
              <IntentStage key={runId} task={task.title} tag={task.tag} level={task.level} />
            </StageShell>
          )}

          {running && stageId === "classify" && (
            <StageShell title="Classify / Route" index="02">
              <ClassifyStage taskId={runId} task={task} />
            </StageShell>
          )}

          {running && stageId === "dna" && (
            <StageShell title="Project DNA" index="03">
              <DnaStage taskId={runId} />
            </StageShell>
          )}

          {running && stageId === "warroom" && (
            <StageShell title="War Room" index="04">
              <WarRoom agents={task.agents} />
            </StageShell>
          )}

          {running && stageId === "engines" && (
            <StageShell title="Engines" index="05">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: FLOW }}
                className="grid gap-4 lg:grid-cols-2"
              >
                <RedTeamPanel />
                <PerfPanel />
                <SecurityPanel />
                <VisualQaPanel />
              </motion.div>
            </StageShell>
          )}

          {running && stageId === "gate" && (
            <StageShell title="Verification Gate" index="06">
              <GateStage key={runId} />
            </StageShell>
          )}

          {running && stageId === "memory" && (
            <StageShell title="Memory Write" index="07">
              <MemoryStage taskId={runId} task={task} onRerun={rerun} />
            </StageShell>
          )}
        </AnimatePresence>
      </div>

      {/* Console dock */}
      <div className="relative z-10 mx-auto mb-8 w-full max-w-[1416px] px-6 md:px-10">
        <div className="border border-white/[0.08] bg-black/85 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[#7D7D7D]">
              <PixGlyph type="diamond" className="h-1.5 w-1.5 text-[#D2FF00]" />
              kernel console :: ws /dev-os
            </span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.3em] text-[#7D7D7D] sm:block">
              {running && !done ? "streaming" : done ? "idle" : "standby"}
            </span>
          </div>
          <div className="h-44 overflow-hidden md:h-48">
            <LogStream key={runId} runId={runId} lines={LOG_LINES} speed={WINDOW_MS / LOG_LINES.length + STAGE_DELAY} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Intake: typewriter mission ---------- */

function IntentStage({
  task,
  tag,
  level,
}: {
  task: string;
  tag: string;
  level: string;
}) {
  const [chars, setChars] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    const cancelled = { ok: false };
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (cancelled.ok) return;
      n += 2;
      if (n >= task.length) {
        setChars(task.length);
        setHold(true);
        return;
      }
      setChars(n);
      timer = setTimeout(tick, 26);
    };
    timer = setTimeout(tick, 26);
    return () => {
      cancelled.ok = true;
      clearTimeout(timer);
    };
  }, [task]);

  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-16">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
          <span className="border border-white/[0.08] px-2 py-1">{tag}</span>
          <span className="border border-[#D2FF00]/30 px-2 py-1 text-[#D2FF00]">INTENT</span>
          <span className="flex items-center gap-1.5">
            <PixGlyph type="plus" className="h-1.5 w-1.5 text-[#D2FF00]" />
            autonomy {level}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap items-center font-display text-4xl uppercase leading-tight tracking-[-0.01em] text-[#F2F2F2] md:text-6xl">
          {task.slice(0, chars)}
          {hold ? (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-[#D2FF00]"
            >
              ▊
            </motion.span>
          ) : (
            <span className="text-[#D2FF00]">▊</span>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={hold ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]"
        >
          <PixGlyph type="ticks" className="h-4 w-[6px] text-[#D2FF00]" />
          accepted by intake → queued for classification
        </motion.div>
      </div>
      <div className="flex shrink-0 flex-col justify-end border-l border-white/[0.06] pl-8">
        <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#7D7D7D]">
          {["mode", "war room", "verbosity", "full"].map(([k, v]) => (
            <span key={k} className="flex justify-between gap-8">
              <span>{k}</span>
              <span className="text-[#A8A8A8]">{v as string}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Stage 2: classifier ---------- */

function ClassifyStage({ taskId, task }: { taskId: number; task: (typeof TASKS)[number] }) {
  const cats = CATEGORIES.filter((c) => task.category.includes(c.id));

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className="flex-1">
        <p className="font-mono text-[11px] uppercase leading-loose tracking-[0.2em] text-[#A8A8A8]">
          signal model → intent
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#7D7D7D]"
          >
            {" · "}
          </motion.span>
        </p>
        <div className="mt-5 flex flex-col gap-3">
          {cats.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.65, duration: 0.45, ease: FLOW }}
              className="flex items-center justify-between border border-white/[0.08] px-5 py-4"
            >
              <span className="font-display text-xl uppercase tracking-tight text-[#F2F2F2] md:text-2xl">
                +{c.label}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7D7D7D]">
                {c.modules.join(" · ")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col justify-end md:w-[340px] md:shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: cats.length * 0.65 + 0.3 }}
          className="border border-[#D2FF00]/30 bg-[#D2FF00]/5 p-5"
        >
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em]">
            <span className="text-[#D2FF00]">ROUTED</span>
            <span className="text-[#7D7D7D]">#{taskId}</span>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-[#F2F2F2]">
            {task.agents.length} of {AGENTS.length} specialists
          </p>
          <p className="mt-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#7D7D7D]">
            {LEVELS.filter((l) => l <= task.level).join(" → ")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Stage 3: DNA ---------- */

function DnaStage({ taskId }: { taskId: number }) {
  if (!(taskId >= 0)) return null;
  const rows = DNA_ROWS.slice((taskId - 1) % 3, (taskId - 1) % 3 + 5);

  return (
    <div className="flex flex-col gap-3">
      {rows.length === 0 && null}
      {rows.map(([k, v], i) => (
        <motion.div
          key={k}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.55, duration: 0.4, ease: FLOW }}
          className="flex flex-col gap-1 border-b border-white/[0.06] py-3 sm:flex-row sm:items-baseline sm:gap-8"
        >
          <span className="w-32 shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D2FF00]">
            {k}
          </span>
          <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#A8A8A8]">
            {v}
          </span>
        </motion.div>
      ))}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: rows.length * 0.55 + 0.2 }}
        className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#7D7D7D]"
      >
        <PixGlyph type="diamond" className="h-2 w-2 text-[#D2FF00]" />
        context assembled — phases written, ownership keyed
      </motion.p>
    </div>
  );
}

/* ---------- Stage 6: verification gate ---------- */

function GateStage() {
  const [conf, setConf] = useState(0);

  useEffect(() => {
    let v = 0;
    const iv = setInterval(() => {
      v += 1;
      setConf(Math.min(v, 97));
      if (v >= 97) clearInterval(iv);
    }, 22);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="flex flex-1 flex-col gap-2.5">
        {VERIFY_GATE.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.55, duration: 0.4, ease: FLOW }}
            className="flex items-center justify-between gap-4 border border-white/[0.08] px-5 py-3.5"
          >
            <span className="font-display text-sm uppercase tracking-tight text-[#F2F2F2] md:text-base">
              {g.label}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7D7D7D]">
              {g.detail}
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.55 + 0.2 }}
              className="font-mono text-sm text-[#D2FF00]"
            >
              ✓
            </motion.span>
          </motion.div>
        ))}
      </div>
      <div className="flex w-full flex-col justify-end lg:w-[340px] lg:shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="border border-[#D2FF00]/30 bg-[#D2FF00]/5 p-6"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#7D7D7D]">
            engine confidence
          </span>
          <div className="mt-2 font-display text-5xl tabular-nums text-[#D2FF00] md:text-6xl">
            {conf}
            <span className="text-2xl">%</span>
          </div>
          <div className="mt-3 h-1 w-full bg-white/[0.08]">
            <motion.div
              animate={{ width: `${conf}%` }}
              transition={{ ease: "linear" }}
              className="h-full bg-[#D2FF00]"
            />
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase leading-loose tracking-[0.2em] text-[#7D7D7D]">
            all engines green or documented → delivery approved
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Stage 7: memory write + closeout ---------- */

function MemoryStage({
  task,
  onRerun,
}: {
  taskId: number;
  task: (typeof TASKS)[number];
  onRerun: () => void;
}) {
  const rows = [
    ["phase plan", "small steps, verify every gate"],
    ["rls", "row-level security is non-negotiable"],
    ["visual qa", "breakpoint sweep before hand-off"],
    ["red team", "attack before the client does"],
  ];

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
          writing lessons → project-intelligence · brain/memory
        </p>
        <div className="mt-5 flex flex-col gap-2.5">
          {rows.map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4, duration: 0.4, ease: FLOW }}
              className="flex items-baseline gap-4 border-b border-white/[0.06] py-2.5"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D2FF00]">
                {k}
              </span>
              <span className="font-mono text-[11px] text-[#A8A8A8]">{v}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7D7D7D]"
        >
          <span className="text-[#D2FF00]">{task.verdict}</span>
          <span>{task.agents.length} agents on deck</span>
          <span>scorecard archived</span>
        </motion.div>
      </div>
      <div className="flex w-full flex-col justify-end lg:w-[340px] lg:shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
          className="flex flex-col gap-4"
        >
          <Link
            href="/control"
            className="group flex items-center justify-between border border-[#D2FF00]/40 px-6 py-4 font-mono text-sm uppercase tracking-[0.3em] text-[#D2FF00] transition-colors hover:bg-[#D2FF00] hover:text-black"
          >
            open the pocket <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <button
            onClick={onRerun}
            className="flex items-center justify-between border border-white/[0.1] px-6 py-4 font-mono text-sm uppercase tracking-[0.3em] text-[#F2F2F2] transition-colors hover:border-[#D2FF00]/60 hover:text-[#D2FF00]"
          >
            rerun mission <span>↻</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}