"use client";

import { ChevronDown, ChevronUp, Trash2, ThumbsUp, ThumbsDown, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { useControl } from "@/lib/control/store";
import { PixGlyph } from "@/components/landing/pix-glyph";

export function HistoryView() {
  const { history, feedback, clearHistoryAll } = useControl();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <PixGlyph type="bracket-l" className="h-4 w-[6px] text-[#D2FF00]" />
        <h2 id="history-title" className="font-display text-2xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
          History
        </h2>
        <PixGlyph type="bracket-r" className="h-4 w-[6px] text-[#D2FF00]" />
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
          {history.length} recorded
        </span>
        {history.length > 0 && (
          <button
            onClick={clearHistoryAll}
            className="flex items-center gap-1.5 border border-white/[0.1] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:border-red-400/40 hover:text-red-400"
          >
            <Trash2 className="h-3 w-3" /> Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 border border-white/[0.06] bg-black">
          <PixGlyph type="plus" className="h-4 w-4 text-[#D2FF00]/40" />
          <p className="font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D]">
            execute a workflow and it lands here
          </p>
          <p className="max-w-md text-center font-serif text-sm font-light text-[#F2F2F2]/40">
            Stored locally in your browser — never sent to a server.
          </p>
        </div>
      ) : (
        <div className="space-y-px">
          {history.map((entry) => {
            const open = openId === entry.id;
            return (
              <div key={entry.id} className="border border-white/[0.06] bg-black">
                <button
                  onClick={() => setOpenId(open ? null : entry.id)}
                  className="flex w-full flex-wrap items-center gap-3 p-4 text-left transition-colors hover:bg-white/[0.015]"
                  aria-expanded={open}
                >
                  {entry.executionStatus === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D2FF00]" />
                  ) : (
                    <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-serif text-sm font-light text-[#F2F2F2]">
                      {entry.request}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D]">
                      {entry.intentPrimary} · {entry.agents.slice(0, 2).join(", ") || "no agent"} ·{" "}
                      {new Date(entry.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[9px] uppercase tracking-[0.3px] ${
                        entry.executionStatus === "completed" ? "text-[#D2FF00]/70" : "text-red-400/70"
                      }`}
                    >
                      {entry.executionStatus}
                    </span>
                    {open ? (
                      <ChevronUp className="h-3.5 w-3.5 text-[#7D7D7D]" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-[#7D7D7D]" />
                    )}
                  </div>
                </button>

                {open && (
                  <div className="border-t border-white/[0.06] px-4 pb-4 pt-3">
                    <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D]">
                      {entry.capabilities.slice(0, 6).map((c) => (
                        <span key={c} className="border border-white/[0.1] px-1.5 py-0.5 text-[#D2FF00]/80">
                          {c}
                        </span>
                      ))}
                      {entry.mcps.length > 0 && (
                        <span className="text-[#7D7D7D]/60">mcp: {entry.mcps.join(", ")}</span>
                      )}
                    </div>

                    <div className="mb-3 flex items-center gap-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.3px] text-[#7D7D7D]">
                        Feedback
                      </span>
                      <button
                        onClick={() => feedback(entry.id, "up")}
                        aria-label="Mark as helpful"
                        className={`border p-1.5 transition-colors ${
                          entry.feedback === "up"
                            ? "border-[#D2FF00]/60 text-[#D2FF00]"
                            : "border-white/[0.1] text-[#7D7D7D] hover:border-[#D2FF00]/40 hover:text-[#D2FF00]"
                        }`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => feedback(entry.id, "down")}
                        aria-label="Mark as unhelpful"
                        className={`border p-1.5 transition-colors ${
                          entry.feedback === "down"
                            ? "border-red-400/60 text-red-400"
                            : "border-white/[0.1] text-[#7D7D7D] hover:border-red-400/40 hover:text-red-400"
                        }`}
                      >
                        <ThumbsDown className="h-3.5 w-3.5" />
                      </button>
                      {entry.feedback && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.3px] text-[#7D7D7D]/50">
                          recorded locally
                        </span>
                      )}
                    </div>

                    <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.3px] text-[#7D7D7D]">
                      Workflow steps
                    </div>
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {entry.workflowSteps.map((s, i) => (
                        <span
                          key={i}
                          className={`border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2px] ${
                            s.status === "success"
                              ? "border-[#D2FF00]/25 text-[#D2FF00]/80"
                              : s.status === "failed"
                                ? "border-red-400/25 text-red-400/80"
                                : "border-white/[0.08] text-[#7D7D7D]/70"
                          }`}
                        >
                          {s.label}
                        </span>
                      ))}
                    </div>

                    <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.3px] text-[#7D7D7D]">
                      Execution output
                    </div>
                    <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap break-words border border-white/[0.05] bg-black p-3 font-mono text-[11px] leading-relaxed text-[#9A9A9A]">
                      {entry.executionOutput || "(no output captured)"}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}