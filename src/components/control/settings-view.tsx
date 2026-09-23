"use client";

import { Save, RotateCcw, AlertTriangle } from "lucide-react";
import { useControl } from "@/lib/control/store";
import { DEFAULT_SETTINGS } from "@/lib/control/memory";
import { PixGlyph } from "@/components/landing/pix-glyph";

const MODES: { id: "plan" | "prompt" | "approval" | "autonomous" | "expert"; label: string; desc: string }[] = [
  { id: "plan", label: "Plan", desc: "Build workflow + prompt only. Never dispatches." },
  { id: "prompt", label: "Prompt", desc: "Build the prompt; you copy or export it." },
  { id: "approval", label: "Approval", desc: "Prompt ready; you press Execute." },
  { id: "autonomous", label: "Autonomous", desc: "Auto-dispatches once workflow is built." },
  { id: "expert", label: "Expert", desc: "Fastest path — fewer confirmations." },
];

const STYLES: { id: "concise" | "standard" | "detailed"; label: string }[] = [
  { id: "concise", label: "Concise" },
  { id: "standard", label: "Standard" },
  { id: "detailed", label: "Detailed" },
];

const QA_CHOICES = [
  { id: "lint", label: "Lint (eslint)" },
  { id: "typecheck", label: "Typecheck (tsc)" },
];

export function SettingsView() {
  const { settings, updateSettings, status } = useControl();

  return (
    <div className="max-w-3xl space-y-10">
      <div className="flex flex-wrap items-center gap-3">
        <PixGlyph type="bracket-l" className="h-4 w-[6px] text-[#D2FF00]" />
        <h2 id="settings-title" className="font-display text-2xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
          Settings
        </h2>
        <PixGlyph type="bracket-r" className="h-4 w-[6px] text-[#D2FF00]" />
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
          saved locally · never uploaded
        </span>
      </div>

      {/* Default mode */}
      <section aria-labelledby="mode-title">
        <h3 id="mode-title" className="mb-1 font-mono text-xs font-semibold uppercase tracking-[0.4px] text-[#F2F2F2]">
          Default execution mode
        </h3>
        <p className="mb-3 font-serif text-xs font-light text-[#F2F2F2]/40">
          Controls how an analyzed request proceeds to execution.
        </p>
        <div className="grid gap-px sm:grid-cols-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => updateSettings({ defaultMode: m.id })}
              aria-pressed={settings.defaultMode === m.id}
              className={`border p-4 text-left transition-colors ${
                settings.defaultMode === m.id
                  ? "border-[#D2FF00]/50 bg-[#D2FF00]/[0.04]"
                  : "border-white/[0.06] bg-black hover:border-white/[0.15]"
              }`}
            >
              <div className="flex items-center gap-2">
                <PixGlyph
                  type="diamond"
                  className={`h-2 w-2 ${settings.defaultMode === m.id ? "text-[#D2FF00]" : "text-[#7D7D7D]/40"}`}
                />
                <span
                  className={`font-display text-sm font-bold uppercase tracking-[0.02em] ${
                    settings.defaultMode === m.id ? "text-[#D2FF00]" : "text-[#F2F2F2]"
                  }`}
                >
                  {m.label}
                </span>
              </div>
              <p className="mt-1.5 font-serif text-xs font-light leading-relaxed text-[#F2F2F2]/40">
                {m.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Prompt style */}
      <section aria-labelledby="style-title">
        <h3 id="style-title" className="mb-1 font-mono text-xs font-semibold uppercase tracking-[0.4px] text-[#F2F2F2]">
          Prompt style
        </h3>
        <p className="mb-3 font-serif text-xs font-light text-[#F2F2F2]/40">
          Tone of the generated OpenCode prompt.
        </p>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => updateSettings({ promptStyle: s.id })}
              className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.3px] transition-colors ${
                settings.promptStyle === s.id
                  ? "border-[#D2FF00]/60 bg-[#D2FF00]/10 text-[#D2FF00]"
                  : "border-white/[0.1] text-[#7D7D7D] hover:border-[#D2FF00]/30 hover:text-[#F2F2F2]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* Model */}
      <section aria-labelledby="model-title">
        <h3 id="model-title" className="mb-1 font-mono text-xs font-semibold uppercase tracking-[0.4px] text-[#F2F2F2]">
          Model override
        </h3>
        <p className="mb-3 font-serif text-xs font-light text-[#F2F2F2]/40">
          Passed as <span className="font-mono text-[#D2FF00]/70">-m</span> to opencode. Leave empty to use its
          default.
        </p>
        <div className="flex items-center gap-2">
          <PixGlyph type="bracket-l" className="h-3 w-[5px] text-[#7D7D7D]" />
          <input
            value={settings.model}
            onChange={(e) => updateSettings({ model: e.target.value })}
            placeholder="e.g. grok-4-fast"
            aria-label="Model override"
            className="w-full border-b border-white/[0.15] bg-transparent px-2 py-1.5 font-mono text-xs text-[#F2F2F2] placeholder:text-[#7D7D7D]/50 focus:border-[#D2FF00] focus:outline-none"
          />
          <PixGlyph type="bracket-r" className="h-3 w-[5px] text-[#7D7D7D]" />
        </div>
      </section>

      {/* Execution timeout */}
      <section aria-labelledby="timeout-title">
        <h3 id="timeout-title" className="mb-1 font-mono text-xs font-semibold uppercase tracking-[0.4px] text-[#F2F2F2]">
          Execution timeout
        </h3>
        <p className="mb-3 font-serif text-xs font-light text-[#F2F2F2]/40">
          Seconds before the OpenCode job is killed (30–900). Long tasks benefit from a higher cap.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={30}
            max={900}
            step={30}
            value={settings.executionTimeoutSec}
            onChange={(e) => updateSettings({ executionTimeoutSec: Number(e.target.value) })}
            aria-label="Execution timeout in seconds"
            className="flex-1 accent-[#D2FF00]"
          />
          <span className="w-16 text-right font-mono text-xs text-[#D2FF00]">
            {settings.executionTimeoutSec}s
          </span>
        </div>
      </section>

      {/* QA actions */}
      <section aria-labelledby="qa-title">
        <h3 id="qa-title" className="mb-1 font-mono text-xs font-semibold uppercase tracking-[0.4px] text-[#F2F2F2]">
          Post-run verification
        </h3>
        <p className="mb-3 font-serif text-xs font-light text-[#F2F2F2]/40">
          Whitelisted shell checks you can re-run from the terminal tab after a dispatch.
        </p>
        <div className="space-y-2">
          {QA_CHOICES.map((q) => (
            <label key={q.id} className="flex cursor-pointer items-center gap-3 border border-white/[0.06] bg-black p-3">
              <input
                type="checkbox"
                checked={settings.qaActions.includes(q.id)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...settings.qaActions, q.id]
                    : settings.qaActions.filter((a) => a !== q.id);
                  updateSettings({ qaActions: next });
                }}
                className="h-3.5 w-3.5 accent-[#D2FF00]"
              />
              <span className="font-mono text-xs text-[#F2F2F2]">{q.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Compatibility toggles */}
      <section aria-labelledby="compat-title" className="grid gap-px sm:grid-cols-2">
        <label className="flex cursor-pointer items-center justify-between border border-white/[0.06] bg-black p-4">
          <div>
            <div className="font-mono text-xs text-[#F2F2F2]">Reduced motion</div>
            <div className="font-serif text-xs font-light text-[#F2F2F2]/40">Honor prefers-reduced-motion</div>
          </div>
          <input
            type="checkbox"
            checked={settings.reducedMotion}
            onChange={(e) => updateSettings({ reducedMotion: e.target.checked })}
            aria-label="Reduced motion"
            className="h-3.5 w-3.5 accent-[#D2FF00]"
          />
        </label>
        <label className="flex cursor-pointer items-center justify-between border border-white/[0.06] bg-black p-4">
          <div>
            <div className="font-mono text-xs text-[#F2F2F2]">Run QA after</div>
            <div className="font-serif text-xs font-light text-[#F2F2F2]/40">Surface checks post-dispatch</div>
          </div>
          <input
            type="checkbox"
            checked={settings.runQaAfter}
            onChange={(e) => updateSettings({ runQaAfter: e.target.checked })}
            aria-label="Run QA after dispatch"
            className="h-3.5 w-3.5 accent-[#D2FF00]"
          />
        </label>
      </section>

      {/* Link status note */}
      <section aria-labelledby="link-title" className="border border-white/[0.06] bg-black p-4">
        <div className="flex items-start gap-3">
          {status?.available ? (
            <PixGlyph type="plus" className="mt-1 h-2 w-2 text-[#D2FF00]" />
          ) : (
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          )}
          <div>
            <div className="font-mono text-xs text-[#F2F2F2]">
              {status?.available ? `OpenCode linked · v${status.version ?? "?"}` : "OpenCode not linked"}
            </div>
            <p className="mt-1 font-serif text-xs font-light text-[#F2F2F2]/40">
              {status?.available
                ? `${status.agents.length} agents · ${status.mcpServers.length} mcp servers · ${status.gitBranch ? `branch ${status.gitBranch}` : "no git branch"}`
                : "Copy or download generated prompts from the workflow tab and run them in a terminal."}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-4">
          <Save className="h-3.5 w-3.5 text-[#D2FF00]/70" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D]">
            changes auto-save to local storage
          </span>
          <button
            onClick={() => updateSettings({ ...DEFAULT_SETTINGS })}
            className="ml-auto flex items-center gap-1.5 border border-white/[0.1] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:border-[#D2FF00]/40 hover:text-[#D2FF00]"
          >
            <RotateCcw className="h-3 w-3" /> Reset defaults
          </button>
        </div>
      </section>
    </div>
  );
}