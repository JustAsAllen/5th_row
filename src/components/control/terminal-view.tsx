"use client";

import { useEffect, useRef } from "react";
import { Power, Trash2, Square, RotateCw, CheckCircle2, XCircle, Terminal, AlertTriangle } from "lucide-react";
import { useControl } from "@/lib/control/store";
import { PixGlyph } from "@/components/landing/pix-glyph";

export function TerminalView() {
  const { job, executing, cancelExecution, log, clearLog, status, refreshStatus } = useControl();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [job?.output, log]);

  const running = executing || job?.status === "running";
  const output = job?.output ?? "";

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      {/* Live execution output */}
      <div className="lg:col-span-3">
        <div className="mb-6 flex items-center gap-3">
          <PixGlyph type="bracket-l" className="h-4 w-[6px] text-[#D2FF00]" />
          <h2 id="terminal-title" className="font-display text-2xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
            Execution
          </h2>
          <PixGlyph type="bracket-r" className="h-4 w-[6px] text-[#D2FF00]" />
          <div className="h-px flex-1 bg-white/[0.06]" />
          {running && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D2FF00] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D2FF00]" />
            </span>
          )}
        </div>

        <div className="flex h-[520px] flex-col overflow-hidden border border-white/[0.08] bg-black">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-white/[0.15]" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/[0.15]" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/[0.15]" />
            <span className="ml-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
              <PixGlyph type="bracket-l" className="h-3 w-[5px] text-[#D2FF00]" />
              <Terminal className="h-3 w-3 text-[#D2FF00]" /> opencode — {running ? "streaming" : job ? "closed" : "idle"}
              <PixGlyph type="bracket-r" className="h-3 w-[5px] text-[#D2FF00]" />
            </span>
          </div>
          <div ref={scrollerRef} className="flex-1 overflow-y-auto p-5 font-mono text-[12px] leading-relaxed">
            {!output && !running && (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <Terminal className="h-8 w-8 text-white/[0.08]" />
                <p className="font-mono text-xs text-[#7D7D7D]">$ no execution yet</p>
                <p className="font-mono text-[10px] text-[#7D7D7D]/50">
                  run a workflow step and output streams here
                </p>
              </div>
            )}
            {output ? (
              <pre className="whitespace-pre-wrap break-words text-[#B8B8B8]">{output}</pre>
            ) : (
              <span className="animate-pulse text-[#D2FF00]/70">▍waiting for output…</span>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
              {job?.status === "completed" ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#D2FF00]" />
                  <span className="text-[#D2FF00]">exit {job.exitCode ?? 0}</span>
                  <span>· {job.ms}ms</span>
                </>
              ) : job?.status === "failed" ? (
                <>
                  <XCircle className="h-3.5 w-3.5 text-red-400" />
                  <span className="text-red-400">exit {job.exitCode ?? "timed out"}</span>
                  <span>· {job.ms}ms</span>
                </>
              ) : running ? (
                <span className="animate-pulse text-[#D2FF00]">streaming job {job?.id ?? ""}</span>
              ) : (
                <span>no job queued</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {running && (
                <button
                  onClick={cancelExecution}
                  className="flex items-center gap-1.5 border border-red-400/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-red-400 transition-colors hover:bg-red-400/10"
                >
                  <Square className="h-3 w-3" /> Cancel
                </button>
              )}
              <button
                onClick={() => void refreshStatus()}
                className="flex items-center gap-1.5 border border-white/[0.1] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:border-[#D2FF00]/40 hover:text-[#D2FF00]"
              >
                <RotateCw className="h-3 w-3" /> Re-check link
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 border border-white/[0.06] bg-black p-3">
          <Power className={`h-4 w-4 ${status?.available ? "text-[#D2FF00]" : "text-[#7D7D7D]"}`} />
          <div className="flex-1 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
            {status?.available
              ? `opencode ${status.version ?? ""} linked · ${status.agents.length} agents · ${status.mcpServers.length} mcp`
              : "opencode offline — copy the built prompt from the workflow tab and run it elsewhere"}
          </div>
          {status?.gitBranch && (
            <span className="font-mono text-[10px] text-[#D2FF00]/70">⎇ {status.gitBranch}</span>
          )}
        </div>
      </div>

      {/* Activity log */}
      <div className="lg:col-span-2">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <PixGlyph type="dottule" className="h-1 w-10 text-[#D2FF00]/40" />
            <h2 className="font-display text-2xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
              Activity
            </h2>
          </div>
          <button
            onClick={clearLog}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:text-red-400"
          >
            <Trash2 className="h-3 w-3" /> clear
          </button>
        </div>

        <div className="sticky top-24 max-h-[70vh] space-y-0 overflow-y-auto border border-white/[0.06] bg-black">
          {log.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
              <PixGlyph type="plus" className="h-3 w-3 text-[#D2FF00]/30" />
              <p className="font-mono text-xs text-[#7D7D7D]">no activity yet</p>
            </div>
          ) : (
            log.map((entry) => (
              <div key={entry.id} className="border-b border-white/[0.04] p-4 last:border-b-0">
                <div className="flex items-center gap-2">
                  {entry.kind === "warn" ? (
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                  ) : entry.ok ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D2FF00]" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 shrink-0 text-red-400" />
                  )}
                  <span className="font-mono text-[11px] text-[#F2F2F2]">{entry.label}</span>
                </div>
                <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-[#7D7D7D] break-words">
                  {entry.output}
                </p>
                <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.3px] text-[#7D7D7D]/40">
                  {entry.time} · {entry.ms}ms
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}