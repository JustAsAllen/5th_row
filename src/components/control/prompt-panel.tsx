"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Download, Play, Loader2, Terminal, AlertTriangle } from "lucide-react";
import { useControl } from "@/lib/control/store";
import { PixGlyph } from "@/components/landing/pix-glyph";

const STYLE_OPTIONS: { id: "concise" | "standard" | "detailed"; label: string }[] = [
  { id: "concise", label: "Concise" },
  { id: "standard", label: "Standard" },
  { id: "detailed", label: "Detailed" },
];

export function PromptPanel() {
  const {
    prompt,
    promptStyle,
    setPromptStyle,
    copyPrompt,
    downloadPrompt,
    execute,
    executing,
    status,
    workflow,
  } = useControl();
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    if (!prompt) return null;
    const paragraphs = prompt.split("\n\n").filter((p) => p.trim().length > 0).length;
    const sections = prompt.match(/^##\s+.+$/gm)?.length ?? 0;
    const words = prompt.trim().split(/\s+/).length;
    return { sections, paragraphs, words };
  }, [prompt]);

  if (!prompt) return null;

  const available = Boolean(status?.available);
  const dispatchStep = workflow?.steps.find((s) => s.capability === "opencode-run");

  const onCopy = async () => {
    const ok = await copyPrompt();
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="mt-10" aria-labelledby="prompt-panel-title">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <PixGlyph type="bracket-l" className="h-4 w-[6px] text-[#D2FF00]" />
        <h2 id="prompt-panel-title" className="font-display text-xl uppercase tracking-[-0.01em] text-[#F2F2F2]">
          Built Prompt
        </h2>
        <PixGlyph type="bracket-r" className="h-4 w-[6px] text-[#D2FF00]" />
        <div className="h-px flex-1 bg-white/[0.06]" />
        <div className="flex items-center gap-1.5">
          {STYLE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setPromptStyle(opt.id)}
              className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.3px] transition-colors ${
                promptStyle === opt.id
                  ? "border-[#D2FF00]/60 bg-[#D2FF00]/10 text-[#D2FF00]"
                  : "border-white/[0.1] text-[#7D7D7D] hover:border-[#D2FF00]/30 hover:text-[#F2F2F2]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden border border-white/[0.08] bg-black">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
            <Terminal className="h-3.5 w-3.5 text-[#D2FF00]" />
            <span>opencode run</span>
            {stats && (
              <span className="text-[#7D7D7D]/50">
                · {stats.words} words · {stats.sections} sections · {stats.paragraphs} paragraphs
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
              className="flex items-center gap-1.5 border border-white/[0.1] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:border-[#D2FF00]/40 hover:text-[#D2FF00]"
            >
              {copied ? <Check className="h-3 w-3 text-[#D2FF00]" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              onClick={downloadPrompt}
              className="flex items-center gap-1.5 border border-white/[0.1] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:border-[#D2FF00]/40 hover:text-[#D2FF00]"
            >
              <Download className="h-3 w-3" />
              .md
            </button>
          </div>
        </div>
        <pre className="max-h-[480px] overflow-y-auto whitespace-pre-wrap break-words p-5 font-mono text-[12px] leading-relaxed text-[#B8B8B8]">
          {prompt}
        </pre>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4px]">
            {available ? (
              <span className="flex items-center gap-2 text-[#7D7D7D]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D2FF00] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D2FF00]" />
                </span>
                opencode linked · v{status?.version ?? "?"}
              </span>
            ) : (
              <span className="flex items-center gap-2 text-amber-400/80">
                <AlertTriangle className="h-3.5 w-3.5" />
                opencode not reachable — copy or export the prompt instead
              </span>
            )}
            {dispatchStep?.status !== "waiting" && dispatchStep?.status !== undefined && (
              <span className="text-[#7D7D7D]/50">
                · dispatch {dispatchStep.status}
              </span>
            )}
          </div>
          <button
            onClick={() => void execute()}
            disabled={executing || !available}
            className="flex items-center gap-2 bg-[#D2FF00] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.4px] text-black transition-colors hover:bg-transparent hover:text-[#D2FF00] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {executing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
            {executing ? "Running…" : "Execute via opencode"}
          </button>
        </div>
      </div>
    </section>
  );
}