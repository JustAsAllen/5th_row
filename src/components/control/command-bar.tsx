"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useControl } from "@/lib/control/store";
import { QUICK_ACTIONS, STYLE_CHIPS } from "@/lib/control/quick-actions";
import { PixGlyph } from "@/components/landing/pix-glyph";

export function CommandBar() {
  const { request, setRequest, seedRequest, analyze, analyzing, intent } = useControl();
  const [touched, setTouched] = useState(false);

  const submit = () => {
    if (!request.trim() || analyzing) return;
    void analyze();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <section aria-labelledby="command-bar-title" className="grid gap-8 lg:grid-cols-5">
      {/* Prompt entry */}
      <div className="lg:col-span-3">
        <div className="mb-4 flex items-center gap-3">
          <PixGlyph type="bracket-l" className="h-4 w-[6px] text-[#D2FF00]" />
          <h2 id="command-bar-title" className="font-display text-2xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
            Command
          </h2>
          <PixGlyph type="bracket-r" className="h-4 w-[6px] text-[#D2FF00]" />
          <div className="h-px flex-1 bg-white/[0.06]" />
          <PixGlyph type="diamond" className="h-2 w-2 text-[#D2FF00]" />
        </div>

        <div className="overflow-hidden border border-white/[0.08] bg-black transition-colors focus-within:border-[#D2FF00]/40">
          <textarea
            value={request}
            onChange={(e) => {
              setRequest(e.target.value);
              setTouched(true);
            }}
            onKeyDown={onKeyDown}
            placeholder="Describe the work… e.g. Elevate the landing page into something premium"
            rows={4}
            aria-label="Describe the work to execute"
            className="w-full resize-none bg-transparent px-5 py-4 font-serif text-lg font-light leading-relaxed text-[#F2F2F2] placeholder:text-[#7D7D7D]/40 focus:outline-none"
          />
          <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-3">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
              <PixGlyph type="plus" className="h-2 w-2 text-[#D2FF00]/60" />
              <span>enter — run engine</span>
              <span className="text-[#7D7D7D]/50">shift+enter — newline</span>
            </div>
            <button
              onClick={submit}
              disabled={!request.trim() || analyzing}
              className="group flex items-center gap-2 border border-[#D2FF00]/60 bg-[#D2FF00] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.4px] text-black transition-colors hover:bg-transparent hover:text-[#D2FF00] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {analyzing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              {analyzing ? "Analyzing…" : "Analyze"}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Style chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <PixGlyph type="dottule" className="h-1 w-8 text-[#D2FF00]/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">dictionary</span>
          {STYLE_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => seedRequest(chip.seed)}
              disabled={analyzing}
              className="border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:border-[#D2FF00]/40 hover:text-[#D2FF00] disabled:opacity-40"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick action grid */}
      <div className="lg:col-span-2">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <PixGlyph type="ticks" className="h-3 w-[6px] text-[#D2FF00]/60" />
          <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.4px] text-[#7D7D7D]">
            quick start
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden">
          {QUICK_ACTIONS.filter((a) => a.featured).map((a) => (
            <button
              key={a.id}
              onClick={() => seedRequest(a.seed)}
              disabled={analyzing}
              className="group relative flex flex-col items-start gap-2 border border-white/[0.06] bg-black p-4 text-left transition-colors hover:border-[#D2FF00]/30 disabled:opacity-40"
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-mono text-lg text-[#D2FF00]">{a.glyph}</span>
                <PixGlyph type="diamond" className="h-2 w-2 text-[#7D7D7D]/30 transition-colors group-hover:text-[#D2FF00]" />
              </div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.02em] text-[#F2F2F2]">
                {a.label}
              </span>
              <span className="font-serif text-xs font-light leading-snug text-[#F2F2F2]/40">
                {a.description}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-px flex flex-wrap gap-1.5">
          {QUICK_ACTIONS.filter((a) => !a.featured).map((a) => (
            <button
              key={a.id}
              onClick={() => seedRequest(a.seed)}
              disabled={analyzing}
              className="flex items-center gap-1.5 border border-white/[0.06] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:border-[#D2FF00]/40 hover:text-[#D2FF00] disabled:opacity-40"
            >
              <span className="text-[#D2FF00]/60">{a.glyph}</span>
              {a.label}
            </button>
          ))}
        </div>

        {touched && intent && (
          <div className="mt-4 border border-[#D2FF00]/20 bg-[#D2FF00]/[0.03] p-3">
            <div className="flex items-start gap-2">
              <PixGlyph type="plus" className="mt-1 h-2 w-2 shrink-0 text-[#D2FF00]" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#D2FF00]">
                  signal — {intent.primary}
                </div>
                <p className="mt-1 font-serif text-xs font-light leading-relaxed text-[#F2F2F2]/60">
                  {intent.surfaces.length > 0
                    ? `Surfaces in scope: ${intent.surfaces.join(", ")}.`
                    : "No surface detected — the workflow will inspect first."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}