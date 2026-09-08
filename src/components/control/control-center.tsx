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

const categoryMeta: Record<string, { icon: LucideIcon; color: string; ring: string }> = {
  Verify: { icon: Activity, color: "text-emerald-400", ring: "hover:border-emerald-500/40" },
  Setup: { icon: Wrench, color: "text-violet-400", ring: "hover:border-violet-500/40" },
  Backend: { icon: Database, color: "text-blue-400", ring: "hover:border-blue-500/40" },
  Deploy: { icon: Ship, color: "text-amber-400", ring: "hover:border-amber-500/40" },
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white">5TH_ROW CONTROL</div>
              <div className="text-xs text-zinc-500">Master Command Center</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-400 transition-all hover:border-zinc-700 hover:text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              onClick={clearLogs}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-400 transition-all hover:border-red-500/40 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear Logs
            </button>
          </div>
        </div>
      </header>

      {/* Status strip */}
      <div className="border-b border-zinc-800/50 bg-zinc-900/20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-zinc-400">Control center <span className="text-white">online</span></span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Activity className="h-4 w-4 text-violet-400" />
            <span>{actions.length} actions available</span>
          </div>
          <div className="flex grow items-center gap-2">
            <div className="ml-auto flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-zinc-500">
                <FolderOpen className="h-4 w-4 text-zinc-500" />
                Run in:
              </label>
              <input
                value={dir}
                onChange={(e) => setDir(e.target.value)}
                placeholder="project root (leave empty for current directory)"
                className="w-64 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-violet-500/40 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Action panel */}
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-lg font-semibold text-white">Available Actions</h2>
            <div className="space-y-8">
              {CATEGORIES.map((cat) => (
                <div key={cat}>
                  <div className="mb-3 flex items-center gap-2">
                    {(() => {
                      const Icon = categoryMeta[cat].icon;
                      return <Icon className={`h-4 w-4 ${categoryMeta[cat].color}`} />;
                    })()}
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">{cat}</h3>
                    <div className="h-px flex-1 bg-zinc-800/50" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {actions
                      .filter((a) => a.category === cat)
                      .map((a) => (
                        <motion.div
                          key={a.id}
                          whileHover={{ y: -2 }}
                          className={`group rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 backdrop-blur-sm transition-all ${categoryMeta[cat].ring}`}
                        >
                          <button
                            onClick={() => run(a.id)}
                            disabled={runningId !== null}
                            className="flex w-full items-start justify-between gap-3 text-left disabled:opacity-60"
                          >
                            <div>
                              <div className="text-sm font-semibold text-white">{a.name}</div>
                              <div className="mt-1 text-xs leading-relaxed text-zinc-500">{a.description}</div>
                            </div>
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-800/50 transition-all group-hover:bg-zinc-700/50">
                              {runningId === a.id ? (
                                <Loader2 className="h-4 w-4 animate-spin text-violet-400" />
                              ) : (
                                <Play className={`h-4 w-4 ${categoryMeta[cat].color}`} />
                              )}
                            </div>
                          </button>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Log / console panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <h2 className="mb-4 text-lg font-semibold text-white">Console Output</h2>
              <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-black/60">
                <div className="flex items-center gap-2 border-b border-zinc-800/60 px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 flex items-center gap-1.5 text-xs text-zinc-500">
                    <Terminal className="h-3 w-3" /> 5th_row — bash
                  </span>
                </div>
                <div
                  ref={logRef}
                  className="h-[460px] space-y-2 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed"
                >
                  {logs.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <Terminal className="mb-3 h-8 w-8 text-zinc-700" />
                      <p className="text-zinc-600">No commands run yet.</p>
                      <p className="mt-1 text-xs text-zinc-700">Click an action to execute it.</p>
                    </div>
                  ) : (
                    logs.map((log) => (
                      <div
                        key={log.id}
                        className="rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-3"
                      >
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {log.ok ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5 text-red-400" />
                            )}
                            <span className="text-xs font-medium text-zinc-300">{log.action}</span>
                          </div>
                          <span className="text-[10px] text-zinc-600">
                            {log.time} · {log.ms}ms
                          </span>
                        </div>
                        <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap break-words text-zinc-400">
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
