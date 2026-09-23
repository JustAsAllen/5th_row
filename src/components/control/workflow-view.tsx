"use client";

import { useMemo } from "react";
import {
  CheckCircle2,
  CircleDashed,
  AlertTriangle,
  XCircle,
  Play,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useControl } from "@/lib/control/store";
import type { StepStatus } from "@/lib/control/types";
import { PixGlyph } from "@/components/landing/pix-glyph";

const STATUS_META: Record<StepStatus, { icon: typeof CircleDashed; className: string; label: string }> = {
  waiting: { icon: CircleDashed, className: "text-[#7D7D7D]/50", label: "waiting" },
  running: { icon: Loader2, className: "text-[#D2FF00] animate-spin", label: "running" },
  success: { icon: CheckCircle2, className: "text-[#D2FF00]", label: "success" },
  warning: { icon: AlertTriangle, className: "text-amber-400", label: "warning" },
  failed: { icon: XCircle, className: "text-red-400", label: "failed" },
  skipped: { icon: CircleDashed, className: "text-[#7D7D7D]/30", label: "skipped" },
};

export function WorkflowView() {
  const { workflow, intent, route, analyzing, runStep, executing, xrayLoading } = useControl();

  const summary = useMemo(() => {
    if (!workflow || !intent) return null;
    return {
      primary: intent.primary,
      domain: intent.domain,
      styles: intent.styles,
      constraints: intent.constraints,
      surfaces: intent.surfaces,
    };
  }, [workflow, intent]);

  if (analyzing) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3 border border-white/[0.06] bg-black">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4px] text-[#D2FF00]">
          <Loader2 className="h-4 w-4 animate-spin" />
          <PixGlyph type="bracket-l" className="h-3 w-[5px]" />
          resolving request
          <PixGlyph type="bracket-r" className="h-3 w-[5px]" />
        </div>
        <p className="font-serif text-sm font-light text-[#F2F2F2]/40">
          {xrayLoading ? "Scanning project structure…" : "Routing capabilities…"}
        </p>
      </div>
    );
  }

  if (!workflow || !intent || !route) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3 border border-white/[0.06] bg-black">
        <PixGlyph type="plus" className="h-4 w-4 text-[#D2FF00]/40" />
        <p className="font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D]">
          describe the work in the command bar to build a workflow
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      {/* Workflow steps */}
      <div className="lg:col-span-3">
        <div className="mb-6 flex items-center gap-3">
          <PixGlyph type="ticks" className="h-5 w-2 text-[#D2FF00]" />
          <h2 className="font-display text-2xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
            Workflow
          </h2>
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
            {workflow.steps.length} steps
          </span>
        </div>

        {summary && (
          <div className="mb-6 border border-white/[0.06] bg-black p-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4px]">
              <span className="border border-[#D2FF00]/40 px-2 py-0.5 text-[#D2FF00]">{summary.primary}</span>
              <span className="border border-white/[0.12] px-2 py-0.5 text-[#7D7D7D]">{summary.domain}</span>
              {summary.styles.map((s) => (
                <span key={s} className="border border-white/[0.12] px-2 py-0.5 text-[#7D7D7D]">{s}</span>
              ))}
            </div>
            <p className="mt-3 font-serif text-sm font-light leading-relaxed text-[#F2F2F2]/60">
              {intent.objective}
            </p>
            {intent.ambiguity && (
              <div className="mt-3 flex items-start gap-2 border border-amber-400/20 bg-amber-400/[0.04] p-3">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.4px] text-amber-400">
                    ambiguity detected
                  </div>
                  <p className="mt-1 font-serif text-xs font-light leading-relaxed text-[#F2F2F2]/50">
                    {intent.ambiguity.reason} Holding this open-ended direction for confirmation — the workflow
                    still proposes the strongest inferred route.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <ol className="relative space-y-0" aria-label="Workflow steps">
          {workflow.steps.map((step, i) => (
            <li key={step.id} className="relative pl-8 pb-6 last:pb-0">
              {i < workflow.steps.length - 1 && (
                <div className="absolute left-[11px] top-5 h-full w-px bg-white/[0.08]" />
              )}
              <div className="absolute left-0 top-0.5">
                <StatusDot status={step.status} />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]/60">
                      step {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-sm font-bold uppercase tracking-[0.02em] text-[#F2F2F2]">
                      {step.label}
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.3px] ${STATUS_META[step.status].className}`}
                    >
                      {STATUS_META[step.status].label}
                    </span>
                  </div>
                  <p className="mt-1 max-w-prose font-serif text-sm font-light leading-relaxed text-[#F2F2F2]/50">
                    {step.description}
                  </p>
                  {(step.detail || step.output || step.error) && (
                    <pre className="mt-2 max-h-32 overflow-y-auto whitespace-pre-wrap break-words border border-white/[0.05] bg-black p-2.5 font-mono text-[10px] leading-relaxed text-[#7D7D7D]">
                      {step.error && (
                        <span className="block text-red-400">error: {step.error}</span>
                      )}
                      {step.detail || step.output}
                    </pre>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D]/40">
                    <span>{step.executor}</span>
                    <span className="text-[#D2FF00]/50">{step.capability}</span>
                    {step.agent !== "—" && <span>agent: {step.agent}</span>}
                    <span>{step.tool}</span>
                  </div>
                </div>
                {step.executor !== "none" && (
                  <ActionButton step={step} executing={executing} onRun={runStep} />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Route + prompt summary sidebar */}
      <aside className="lg:col-span-2">
        <div className="sticky top-24 space-y-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <PixGlyph type="dottule" className="h-1 w-10 text-[#D2FF00]/40" />
              <h3 className="font-display text-lg uppercase tracking-[-0.01em] text-[#F2F2F2]">
                Routing
              </h3>
            </div>
            <div className="space-y-2 border border-white/[0.06] bg-black p-4">
              {[
                { label: "Agents", items: route.agents.slice(0, 5) },
                { label: "Skills", items: route.skills.slice(0, 5) },
                { label: "Commands", items: route.commands.slice(0, 4) },
                { label: "MCP", items: route.mcps.slice(0, 4) },
              ].map((group) => (
                <div key={group.label} className="flex items-start gap-3">
                  <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.length > 0 ? (
                      group.items.map((item) => (
                        <span
                          key={item}
                          className="border border-white/[0.1] px-2 py-0.5 font-mono text-[10px] text-[#D2FF00]"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="font-mono text-[10px] text-[#7D7D7D]/40">none mapped</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1.5">
              {route.rationale.map((line, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-[#D2FF00]/40" />
                  <p className="font-mono text-[10px] leading-relaxed text-[#7D7D7D]">{line}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <PixGlyph type="dottule" className="h-1 w-10 text-[#D2FF00]/40" />
              <h3 className="font-display text-lg uppercase tracking-[-0.01em] text-[#F2F2F2]">
                Top capabilities
              </h3>
            </div>
            <ol className="space-y-2">
              {route.capabilities.slice(0, 6).map((cap, i) => (
                <li key={cap.id} className="flex items-start justify-between gap-3 border-b border-white/[0.04] pb-2">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-[#D2FF00]/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#F2F2F2]">{cap.label}</span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.3px] text-[#7D7D7D]">
                          {cap.kind}
                        </span>
                      </div>
                      <p className="mt-0.5 font-serif text-xs font-light leading-relaxed text-[#F2F2F2]/40">
                        {cap.reason}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-[#D2FF00]/70">{cap.score}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </aside>
    </div>
  );
}

function StatusDot({ status }: { status: StepStatus }) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;
  return <Icon className={`h-6 w-6 ${meta.className}`} />;
}

function ActionButton({
  step,
  executing,
  onRun,
}: {
  step: { id: string; executor: string; status: StepStatus; label: string };
  executing: boolean;
  onRun: (id: string) => void;
}) {
  const isRunning = step.status === "running";
  const isDone = step.status === "success" || step.status === "warning";
  return (
    <button
      onClick={() => onRun(step.id)}
      disabled={isRunning || (executing && step.executor === "opencode")}
      className="flex shrink-0 items-center gap-1.5 border border-white/[0.1] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:border-[#D2FF00]/40 hover:text-[#D2FF00] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {isRunning ? <Loader2 className="h-3 w-3 animate-spin text-[#D2FF00]" /> : isDone ? <CheckCircle2 className="h-3 w-3 text-[#D2FF00]" /> : <Play className="h-3 w-3" />}
      {isRunning ? "Running" : isDone ? "Rerun" : "Run"}
    </button>
  );
}