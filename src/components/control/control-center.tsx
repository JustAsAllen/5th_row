"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Loader2,
  CheckCircle2,
  XCircle,
  Terminal,
  Ship,
  Database,
  RefreshCw,
  Trash2,
  Wrench,
  Activity,
  FolderOpen,
  type LucideIcon,
} from "lucide-react";
import { PixGlyph } from "@/components/landing/pix-glyph";

type Action = {
  id: string;
  name: string;
  description: string;
  category: string;
};

type LogEntry = {
  id: number;
  action: string;
  ok: boolean;
  output: string;
  ms: number;
  time: string;
};

const CATEGORIES = ["Verify", "Setup", "Backend", "Deploy"] as const;

const categoryMeta: Record<string, { icon: LucideIcon; color: string }> = {
  Verify: { icon: Activity, color: "text-[#D2FF00]" },
  Setup: { icon: Wrench, color: "text-[#D2FF00]" },
  Backend: { icon: Database, color: "text-[#D2FF00]" },
  Deploy: { icon: Ship, color: "text-[#D2FF00]" },
};

export function ControlCenter() {
  const [actions, setActions] = useState<Action[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [runningId, setRunningId] = useState<string | null>(null);
  const [dir, setDir] = useState<string>("");
  const logRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/actions");
    const data = await res.json();
    setActions(data);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/actions")
      .then((r) => r.json())
      .then((data) => {
        if (active) setActions(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  const run = async (id: string) => {
    setRunningId(id);
    try {
      const res = await fetch("/api/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: id, dir: dir || undefined }),
      });
      const data: {
        ok?: boolean;
        output?: string;
        error?: string;
        ms?: number;
        action?: string;
      } = await res.json();
      setLogs((prev) => [
        {
          id: ++idRef.current,
          action: data.action || id,
          ok: data.ok ?? false,
          output: data.output || data.error || "",
          ms: data.ms ?? 0,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    } catch (e: unknown) {
      const err = e instanceof Error ? e : { message: "Request failed" };
      setLogs((prev) => [
        {
          id: ++idRef.current,
          action: id,
          ok: false,
          output: err.message || "Request failed",
          ms: 0,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    } finally {
      setRunningId(null);
    }
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2]">
      {/* Header — editorial, minimal */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1416px] items-center justify-between px-6 py-5 md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <PixGlyph type="bracket-l" className="h-4 w-[6px] text-[#D2FF00]" />
              <Terminal className="h-5 w-5 text-[#D2FF00]" />
              <PixGlyph type="bracket-r" className="h-4 w-[6px] text-[#D2FF00]" />
            </div>
            <div>
              <div className="font-display text-sm font-bold uppercase tracking-[-0.01em] text-[#F2F2F2]">
                5TH_ROW CONTROL
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
                / master command center
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <PixGlyph type="ticks" className="hidden h-5 w-2 text-[#D2FF00]/40 md:block" />
            <button
              onClick={refresh}
              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D] transition-colors hover:text-[#F2F2F2]"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              onClick={clearLogs}
              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D] transition-colors hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </button>
          </div>
        </div>
      </header>

      {/* Status strip — mono terminal readout */}
      <div className="relative border-b border-white/[0.06] bg-black">
        <PixGlyph type="dottule" className="absolute left-0 top-0 h-px w-full text-[#D2FF00]/20" />
        <div className="mx-auto flex max-w-[1416px] flex-wrap items-center gap-6 px-6 py-4 md:px-10">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D2FF00] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D2FF00]" />
            </span>
            <span className="text-[#7D7D7D]">
              status: <span className="text-[#D2FF00]">online</span>
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D]">
            <PixGlyph type="diamond" className="h-2 w-2 text-[#D2FF00]" />
            <Activity className="h-4 w-4 text-[#D2FF00]" />
            <span>{actions.length} actions available</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D]">
              <FolderOpen className="h-4 w-4 text-[#D2FF00]" /> run in:
            </label>
            <PixGlyph type="bracket-l" className="h-3 w-[5px] text-[#7D7D7D]" />
            <input
              value={dir}
              onChange={(e) => setDir(e.target.value)}
              placeholder="project root"
              className="w-56 rounded-none border-b border-white/[0.15] bg-transparent px-2 py-1 font-mono text-xs text-[#F2F2F2] placeholder:text-[#7D7D7D]/50 focus:border-[#D2FF00] focus:outline-none"
            />
            <PixGlyph type="bracket-r" className="h-3 w-[5px] text-[#7D7D7D]" />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1416px] px-6 py-10 md:px-10">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Action panel */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center gap-3">
              <PixGlyph type="ticks" className="h-5 w-2 text-[#D2FF00]" />
              <h2 className="font-display text-2xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
                Available Actions
              </h2>
              <PixGlyph type="dottule" className="h-1 w-10 text-[#D2FF00]/50" />
            </div>
            <div className="space-y-10">
              {CATEGORIES.map((cat) => (
                <div key={cat}>
                  <div className="mb-4 flex items-center gap-3">
                    <PixGlyph type="bracket-l" className="h-3 w-[5px] text-[#7D7D7D]/60" />
                    {(() => {
                      const Icon = categoryMeta[cat].icon;
                      return <Icon className={`h-4 w-4 ${categoryMeta[cat].color}`} />;
                    })()}
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.4px] text-[#7D7D7D]">
                      {cat}
                    </h3>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                    <PixGlyph type="bracket-r" className="h-3 w-[5px] text-[#7D7D7D]/60" />
                  </div>
                  <div className="grid gap-px sm:grid-cols-2">
                    {actions
                      .filter((a) => a.category === cat)
                      .map((a) => (
                        <motion.button
                          key={a.id}
                          whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                          onClick={() => run(a.id)}
                          disabled={runningId !== null}
                          className="group relative flex items-start justify-between gap-3 bg-black p-4 text-left disabled:opacity-60"
                        >
                          <PixGlyph
                            type="corners"
                            className="absolute right-2 top-2 h-3 w-3 text-[#7D7D7D]/20 transition-colors group-hover:text-[#D2FF00]/40"
                          />
                          <div>
                            <div className="flex items-center gap-2 text-sm text-[#F2F2F2]">
                              <PixGlyph type="diamond" className="hidden h-2 w-2 text-[#D2FF00]/0 transition-colors group-hover:text-[#D2FF00] sm:block" />
                              {a.name}
                            </div>
                            <div className="mt-1 font-serif text-xs font-light leading-relaxed text-[#F2F2F2]/40">
                              {a.description}
                            </div>
                          </div>
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                            {runningId === a.id ? (
                              <Loader2 className="h-4 w-4 animate-spin text-[#D2FF00]" />
                            ) : (
                              <Play className={`h-4 w-4 text-[#7D7D7D] transition-colors group-hover:text-[#D2FF00]`} />
                            )}
                          </div>
                        </motion.button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Log / console panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="mb-6 flex items-center gap-3">
                <PixGlyph type="dottule" className="h-1 w-10 text-[#D2FF00]/40" />
                <h2 className="font-display text-2xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
                  Console Output
                </h2>
                <PixGlyph type="bracket-r" className="h-4 w-[6px] text-[#7D7D7D]" />
              </div>
              <div className="overflow-hidden border border-white/[0.08] bg-black">
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/[0.15]" />
                  <div className="h-1.5 w-1.5 rounded-full bg-white/[0.15]" />
                  <div className="h-1.5 w-1.5 rounded-full bg-white/[0.15]" />
                  <span className="ml-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
                    <PixGlyph type="bracket-l" className="h-3 w-[5px] text-[#D2FF00]" />
                    <Terminal className="h-3 w-3 text-[#D2FF00]" /> 5th_row — bash
                    <PixGlyph type="bracket-r" className="h-3 w-[5px] text-[#D2FF00]" />
                  </span>
                </div>
                <div
                  ref={logRef}
                  className="h-[460px] space-y-2 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed"
                >
                  {logs.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="mb-3 flex items-center gap-2 text-white/[0.1]">
                        <PixGlyph type="bracket-l" className="h-5 w-[7px] text-[#D2FF00]/30" />
                        <Terminal className="h-8 w-8" />
                        <PixGlyph type="bracket-r" className="h-5 w-[7px] text-[#D2FF00]/30" />
                      </div>
                      <p className="font-mono text-xs text-[#7D7D7D]">$ no commands run yet</p>
                      <p className="mt-1 flex items-center gap-2 font-mono text-xs text-[#7D7D7D]/50">
                        <PixGlyph type="plus" className="h-2 w-2 text-[#D2FF00]/40" />
                        click an action to execute
                      </p>
                    </div>
                  ) : (
                    logs.map((log) => (
                      <div key={log.id} className="border-b border-white/[0.04] pb-3">
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {log.ok ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#D2FF00]" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5 text-red-400" />
                            )}
                            <span className="flex items-center gap-1.5 text-xs text-[#F2F2F2]">
                              <PixGlyph type="bracket-l" className="h-2.5 w-[4px] text-[#7D7D7D]/70" />
                              {log.action}
                              <PixGlyph type="bracket-r" className="h-2.5 w-[4px] text-[#7D7D7D]/70" />
                            </span>
                            <span className="text-[10px] text-[#7D7D7D]">
                              {log.time} · {log.ms}ms
                            </span>
                          </div>
                        </div>
                        <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap break-words text-[#7D7D7D]">
                          {log.output || "(no output)"}
                        </pre>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
