"use client";

import { Zap, ArrowRight } from "lucide-react";
import { useControl } from "@/lib/control/store";
import { analyzeGoated } from "@/lib/control/goated";
import type { GoatedOpportunity } from "@/lib/control/types";
import { PixGlyph } from "@/components/landing/pix-glyph";

export function GoatedView() {
  const { xray, xrayLoading, refreshXray, seedRequest, setView } = useControl();

  const opportunities = xray ? analyzeGoated(xray) : [];
  const baseCount = opportunities.length - 1; // dx always appended

  const openInWorkflow = (opp: GoatedOpportunity) => {
    seedRequest(opp.workflowSeed);
    setView("dashboard");
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <PixGlyph type="bracket-l" className="h-4 w-[6px] text-[#D2FF00]" />
        <h2 id="goated-title" className="font-display text-2xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
          GOATED Mode
        </h2>
        <PixGlyph type="bracket-r" className="h-4 w-[6px] text-[#D2FF00]" />
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4px] text-[#D2FF00]">
          <Zap className="h-3.5 w-3.5" /> holistic upgrade pass
        </span>
      </div>

      <p className="mb-6 max-w-prose font-serif text-sm font-light leading-relaxed text-[#F2F2F2]/50">
        Opportunities are derived only from real X-Ray signals — never invented percentages. Each one seeds
        a concrete workflow you can route and execute.
      </p>

      {!xray && !xrayLoading && (
        <div className="flex h-48 flex-col items-center justify-center gap-3 border border-white/[0.06] bg-black">
          <Zap className="h-5 w-5 text-[#D2FF00]/40" />
          <p className="font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D]">
            needs a project x-ray first
          </p>
          <button
            onClick={() => void refreshXray()}
            className="mt-1 border border-[#D2FF00]/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#D2FF00] transition-colors hover:bg-[#D2FF00]/10"
          >
            Scan now
          </button>
        </div>
      )}

      {xrayLoading && (
        <div className="flex h-48 flex-col items-center justify-center gap-3 border border-white/[0.06] bg-black">
          <Zap className="h-5 w-5 animate-pulse text-[#D2FF00]" />
          <p className="font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D]">scanning…</p>
        </div>
      )}

      {xray && (
        <div className="space-y-8">
          <div className="grid gap-px sm:grid-cols-2">
            {opportunities.slice(0, baseCount).map((opp) => (
              <GoatCard key={opp.id} opp={opp} onOpen={() => openInWorkflow(opp)} />
            ))}
          </div>

          <section aria-labelledby="dx-title">
            <div className="mb-3 flex items-center gap-3">
              <PixGlyph type="dottule" className="h-1 w-8 text-[#D2FF00]/40" />
              <h3 id="dx-title" className="font-display text-lg uppercase tracking-[-0.01em] text-[#F2F2F2]">
                Always on
              </h3>
            </div>
            <div className="grid gap-px sm:grid-cols-2">
              {opportunities.slice(baseCount).map((opp) => (
                <GoatCard key={opp.id} opp={opp} onOpen={() => openInWorkflow(opp)} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function GoatCard({ opp, onOpen }: { opp: GoatedOpportunity; onOpen: () => void }) {
  return (
    <div className="group relative flex flex-col border border-white/[0.06] bg-black p-5 transition-colors hover:border-[#D2FF00]/25">
      <div className="mb-3 flex items-center gap-2">
        <PixGlyph type="diamond" className="h-2 w-2 text-[#D2FF00]" />
        <span className="font-mono text-[9px] uppercase tracking-[0.4px] text-[#D2FF00]/70">
          {opp.category}
        </span>
      </div>
      <h3 className="font-display text-base font-bold uppercase tracking-[0.01em] text-[#F2F2F2]">
        {opp.title}
      </h3>
      <p className="mt-2 font-serif text-sm font-light leading-relaxed text-[#F2F2F2]/50">{opp.why}</p>
      <p className="mt-2 border-l border-white/[0.1] pl-3 font-mono text-[10px] leading-relaxed text-[#7D7D7D]">
        {opp.evidence}
      </p>
      <button
        onClick={onOpen}
        className="mt-4 flex items-center gap-1.5 self-start border border-white/[0.1] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors group-hover:border-[#D2FF00]/40 group-hover:text-[#D2FF00]"
      >
        Run workflow <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  );
}