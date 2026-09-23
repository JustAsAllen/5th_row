"use client";

import { RefreshCw, Loader2, CheckCircle2, AlertTriangle, Circle } from "lucide-react";
import { useControl } from "@/lib/control/store";
import type { HealthSignal } from "@/lib/control/types";
import { PixGlyph } from "@/components/landing/pix-glyph";

export function XrayView() {
  const { xray, xrayLoading, refreshXray } = useControl();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <PixGlyph type="bracket-l" className="h-4 w-[6px] text-[#D2FF00]" />
        <h2 id="xray-title" className="font-display text-2xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
          Project X-Ray
        </h2>
        <PixGlyph type="bracket-r" className="h-4 w-[6px] text-[#D2FF00]" />
        <div className="h-px flex-1 bg-white/[0.06]" />
        <button
          onClick={() => void refreshXray()}
          disabled={xrayLoading}
          className="flex items-center gap-1.5 border border-white/[0.1] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:border-[#D2FF00]/40 hover:text-[#D2FF00] disabled:opacity-40"
        >
          {xrayLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
          Rescan
        </button>
      </div>

      {!xray && !xrayLoading && (
        <div className="flex h-64 flex-col items-center justify-center gap-3 border border-white/[0.06] bg-black">
          <PixGlyph type="plus" className="h-4 w-4 text-[#D2FF00]/40" />
          <p className="font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D]">
            run the first analysis to generate an x-ray, or hit rescan
          </p>
        </div>
      )}

      {xrayLoading && (
        <div className="flex h-64 flex-col items-center justify-center gap-3 border border-white/[0.06] bg-black">
          <Loader2 className="h-5 w-5 animate-spin text-[#D2FF00]" />
          <p className="font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D]">
            scanning project structure…
          </p>
        </div>
      )}

      {xray && (
        <div className="space-y-10">
          {/* Facts strip */}
          <div className="grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Stack", value: `${xray.framework} ${xray.frameworkVersion || ""}` },
              { label: "Language", value: xray.language },
              { label: "Package manager", value: xray.packageManager },
              { label: "Database", value: xray.database },
            ].map((f) => (
              <div key={f.label} className="border border-white/[0.06] bg-black p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
                  {f.label}
                </div>
                <div className="mt-1.5 font-display text-sm font-bold text-[#F2F2F2]">{f.value}</div>
              </div>
            ))}
          </div>

          {/* Health signals */}
          <section aria-labelledby="health-title">
            <div className="mb-4 flex items-center gap-3">
              <PixGlyph type="ticks" className="h-5 w-2 text-[#D2FF00]" />
              <h3 id="health-title" className="font-display text-xl uppercase tracking-[-0.01em] text-[#F2F2F2]">
                Health signals
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
                heuristic · not guarantees
              </span>
            </div>
            <div className="grid gap-px sm:grid-cols-2">
              {xray.health.map((signal) => (
                <HealthCard key={signal.id} signal={signal} />
              ))}
            </div>
          </section>

          {/* Routes */}
          <div className="grid gap-8 lg:grid-cols-2">
            <section aria-labelledby="routes-title">
              <div className="mb-3 flex items-center gap-2">
                <PixGlyph type="dottule" className="h-1 w-8 text-[#D2FF00]/40" />
                <h3 id="routes-title" className="font-mono text-xs font-semibold uppercase tracking-[0.4px] text-[#7D7D7D]">
                  Routes ({xray.routes.length})
                </h3>
              </div>
              <div className="border border-white/[0.06] bg-black p-4">
                {xray.routes.length === 0 ? (
                  <p className="font-mono text-xs text-[#7D7D7D]/50">no pages detected</p>
                ) : (
                  <ul className="space-y-1.5">
                    {xray.routes.map((r) => (
                      <li key={r} className="flex items-center gap-2 font-mono text-[11px] text-[#B8B8B8]">
                        <span className="text-[#D2FF00]/50">→</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            <section aria-labelledby="api-title">
              <div className="mb-3 flex items-center gap-2">
                <PixGlyph type="dottule" className="h-1 w-8 text-[#D2FF00]/40" />
                <h3 id="api-title" className="font-mono text-xs font-semibold uppercase tracking-[0.4px] text-[#7D7D7D]">
                  API routes ({xray.apiRoutes.length})
                </h3>
              </div>
              <div className="border border-white/[0.06] bg-black p-4">
                {xray.apiRoutes.length === 0 ? (
                  <p className="font-mono text-xs text-[#7D7D7D]/50">no api routes detected</p>
                ) : (
                  <ul className="space-y-1.5">
                    {xray.apiRoutes.map((r) => (
                      <li key={r} className="flex items-center gap-2 font-mono text-[11px] text-[#B8B8B8]">
                        <span className="text-[#D2FF00]/50">⚡</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>

          {/* Integrations + scripts */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <PixGlyph type="dottule" className="h-1 w-8 text-[#D2FF00]/40" />
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.4px] text-[#7D7D7D]">
                  Integrations
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5 border border-white/[0.06] bg-black p-4">
                {xray.integrations.length === 0 ? (
                  <span className="font-mono text-xs text-[#7D7D7D]/50">none detected</span>
                ) : (
                  xray.integrations.map((i) => (
                    <span key={i} className="border border-[#D2FF00]/20 px-2 py-0.5 font-mono text-[10px] text-[#D2FF00]">
                      {i}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div>
              <div className="mb-3 flex items-center gap-2">
                <PixGlyph type="dottule" className="h-1 w-8 text-[#D2FF00]/40" />
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.4px] text-[#7D7D7D]">
                  Scripts
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5 border border-white/[0.06] bg-black p-4">
                {xray.scripts.length === 0 ? (
                  <span className="font-mono text-xs text-[#7D7D7D]/50">none detected</span>
                ) : (
                  xray.scripts.map((s) => (
                    <span key={s} className="border border-white/[0.1] px-2 py-0.5 font-mono text-[10px] text-[#F2F2F2]/60">
                      {s}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]/50">
            scanned {new Date(xray.scannedAt).toLocaleString()} · counts from a capped file walk (first{" "}
            {600} files) · signals are heuristics
          </p>
        </div>
      )}
    </div>
  );
}

function HealthCard({ signal }: { signal: HealthSignal }) {
  const Icon =
    signal.status === "good" ? CheckCircle2 : signal.status === "watch" ? AlertTriangle : Circle;
  const color =
    signal.status === "good"
      ? "text-[#D2FF00]"
      : signal.status === "watch"
        ? "text-amber-400"
        : "text-[#7D7D7D]/60";

  return (
    <div className="flex items-start gap-3 border border-white/[0.06] bg-black p-4">
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${color}`} />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display text-xs font-bold uppercase tracking-[0.02em] text-[#F2F2F2]">
            {signal.label}
          </span>
          <span className={`font-mono text-[9px] uppercase tracking-[0.3px] ${color}`}>
            {signal.status}
          </span>
        </div>
        <p className="mt-1 font-serif text-xs font-light leading-relaxed text-[#F2F2F2]/40">
          {signal.evidence}
        </p>
      </div>
    </div>
  );
}