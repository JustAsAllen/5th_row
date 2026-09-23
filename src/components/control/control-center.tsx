"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  Activity,
  History,
  LayoutDashboard,
  RefreshCw,
  Settings,
  ShieldCheck,
  Terminal,
  Workflow as WorkflowIcon,
  Zap,
  ScanSearch,
} from "lucide-react";
import { useControl } from "@/lib/control/store";
import type { ControlView } from "@/lib/control/types";
import { PixGlyph } from "@/components/landing/pix-glyph";
import { CommandBar } from "@/components/control/command-bar";
import { WorkflowView } from "@/components/control/workflow-view";
import { PromptPanel } from "@/components/control/prompt-panel";
import { TerminalView } from "@/components/control/terminal-view";
import { XrayView } from "@/components/control/xray-view";
import { GoatedView } from "@/components/control/goated-view";
import { HistoryView } from "@/components/control/history-view";
import { SettingsView } from "@/components/control/settings-view";
import { CommandPalette } from "@/components/control/command-palette";
import { LiveClock } from "@/components/control/live-clock";

const NAV: { id: ControlView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Command", icon: LayoutDashboard },
  { id: "workflow", label: "Workflow", icon: WorkflowIcon },
  { id: "terminal", label: "Terminal", icon: Terminal },
  { id: "xray", label: "X-Ray", icon: ScanSearch },
  { id: "goated", label: "GOATED", icon: Zap },
  { id: "history", label: "History", icon: History },
  { id: "settings", label: "Settings", icon: Settings },
];

const VIEW_TITLES: Record<ControlView, { eyebrow: string; title: string }> = {
  dashboard: { eyebrow: "type work, get a workflow", title: "Master Command Center" },
  workflow: { eyebrow: "the plan, visible and honest", title: "Workflow" },
  terminal: { eyebrow: "live dispatch + activity", title: "Terminal" },
  xray: { eyebrow: "how the project really looks", title: "Project X-Ray" },
  goated: { eyebrow: "derive, don't invent", title: "GOATED Mode" },
  history: { eyebrow: "local memory, per request", title: "History" },
  settings: { eyebrow: "defaults, saved locally", title: "Settings" },
};

export function ControlCenter() {
  const {
    view,
    setView,
    status,
    statusLoading,
    refreshStatus,
    analyzing,
    executing,
    workflow,
    xray,
    loadHistoryFromStorage,
  } = useControl();

  const [paletteOpen, setPaletteOpen] = useState(false);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    loadHistoryFromStorage();
    void refreshStatus();
  }, [refreshStatus, loadHistoryFromStorage]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setPaletteOpen((v) => !v);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const head = VIEW_TITLES[view];
  const online = Boolean(status?.available);

  return (
    <div className="min-h-screen bg-black text-[#F2F2F2]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1416px] items-center justify-between gap-4 px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <PixGlyph type="bracket-l" className="h-4 w-[6px] text-[#D2FF00]" />
              <Activity className="h-5 w-5 text-[#D2FF00]" />
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

          <div className="flex items-center gap-4">
            <LiveClock />
            <div className="hidden items-center gap-5 lg:flex">
            {online ? (
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D2FF00] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D2FF00]" />
                </span>
                opencode · v{status?.version ?? "?"}
              </span>
            ) : (
              <button
                onClick={() => void refreshStatus()}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4px] text-amber-400/80 transition-colors hover:text-amber-300"
              >
                <ShieldCheck className="h-4 w-4" />
                not linked · retry
              </button>
            )}
            {executing && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D2FF00] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D2FF00]" />
              </span>
            )}
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 border border-white/[0.1] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:border-[#D2FF00]/40 hover:text-[#D2FF00]"
            >
              <span>⌘K</span> palette
            </button>
            <button
              onClick={() => void refreshStatus()}
              disabled={statusLoading}
              aria-label="Refresh status"
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D] transition-colors hover:text-[#F2F2F2] disabled:opacity-40"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${statusLoading ? "animate-spin" : ""}`} />
            </button>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="border-t border-white/[0.06]" aria-label="Sections">
          <div className="mx-auto flex max-w-[1416px] items-center gap-1 overflow-x-auto px-6 py-2 md:px-10">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3px] transition-colors ${
                    active
                      ? "bg-[#D2FF00]/10 text-[#D2FF00]"
                      : "text-[#7D7D7D] hover:bg-white/[0.03] hover:text-[#F2F2F2]"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${active ? "text-[#D2FF00]" : "text-[#7D7D7D]"}`} />
                  {item.label}
                </button>
              );
            })}
            {analyzing && (
              <span className="ml-auto hidden shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3px] text-[#D2FF00]/80 md:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#D2FF00]" />
                resolving
              </span>
            )}
            {workflow && !executing && !analyzing && (
              <span className="ml-auto hidden shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D]/60 md:flex">
                <PixGlyph type="ticks" className="h-3 w-[6px] text-[#D2FF00]" />
                {workflow.steps.length}-step plan ready
              </span>
            )}
            {xray && (
              <span className="hidden shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.3px] text-[#7D7D7D]/60 md:flex">
                <PixGlyph type="diamond" className="h-2 w-2 text-[#D2FF00]/70" />
                {xray.framework} · {xray.sourceFiles} files
              </span>
            )}
          </div>
        </nav>
      </header>

      {/* Page heading */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1416px] flex-wrap items-center gap-3 px-6 py-6 md:px-10">
          <PixGlyph type="dottule" className="h-1 w-12 text-[#D2FF00]/40" />
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
              {head.eyebrow}
            </div>
            <h1 className="font-display text-3xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
              {head.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <main className="mx-auto max-w-[1416px] px-6 py-8 md:px-10">
        {!isClient ? (
          <div className="flex h-48 items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D]">
              loading control plane…
            </span>
          </div>
        ) : view === "dashboard" ? (
          <div className="space-y-12">
            <CommandBar />
            {(workflow || analyzing) && (
              <div className="border-t border-white/[0.06] pt-8">
                <WorkflowView />
                <PromptPanel />
              </div>
            )}
          </div>
        ) : view === "workflow" ? (
          <div>
            <WorkflowView />
            <PromptPanel />
          </div>
        ) : view === "terminal" ? (
          <TerminalView />
        ) : view === "xray" ? (
          <XrayView />
        ) : view === "goated" ? (
          <GoatedView />
        ) : view === "history" ? (
          <HistoryView />
        ) : (
          <SettingsView />
        )}
      </main>

      {isClient && <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />}
    </div>
  );
}