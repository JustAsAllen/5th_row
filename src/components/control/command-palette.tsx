"use client";

import { useEffect, useRef } from "react";
import { Command } from "cmdk";
import { useControl } from "@/lib/control/store";
import { QUICK_ACTIONS, STYLE_CHIPS } from "@/lib/control/quick-actions";
import type { ControlView } from "@/lib/control/types";
import { PixGlyph } from "@/components/landing/pix-glyph";

const VIEWS: { id: ControlView; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "workflow", label: "Workflow" },
  { id: "terminal", label: "Terminal" },
  { id: "xray", label: "Project X-Ray" },
  { id: "goated", label: "GOATED Mode" },
  { id: "history", label: "History" },
  { id: "settings", label: "Settings" },
];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { setView, seedRequest, analyze } = useControl();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  const jump = (seed: string) => {
    seedRequest(seed);
    onOpenChange(false);
    setTimeout(() => void analyze(), 50);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-[15vh] backdrop-blur-sm"
      overlayClassName="fixed inset-0 z-40 bg-black/70"
    >
      <div className="w-full max-w-xl overflow-hidden border border-white/[0.12] bg-black shadow-2xl shadow-[#D2FF00]/5">
        <Command.Input
          ref={inputRef}
          placeholder="Navigate or describe work…"
          className="w-full border-b border-white/[0.08] bg-transparent px-5 py-4 font-mono text-sm text-[#F2F2F2] placeholder:text-[#7D7D7D]/50 focus:outline-none"
        />
        <Command.List className="max-h-[45vh] overflow-y-auto p-2">
          <Command.Empty className="px-4 py-6 text-center font-mono text-xs text-[#7D7D7D]">
            no match — run it as a request anyway
          </Command.Empty>

          <Command.Group
            heading="Views"
            className="px-2 font-mono text-[9px] uppercase tracking-[0.4px] text-[#7D7D7D]/60"
          >
            {VIEWS.map((v) => (
              <Command.Item
                key={v.id}
                onSelect={() => {
                  setView(v.id);
                  onOpenChange(false);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-[#F2F2F2] data-[selected=true]:bg-[#D2FF00]/10"
              >
                <PixGlyph type="diamond" className="h-2 w-2 text-[#D2FF00]/70" />
                {v.label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group
            heading="Quick actions"
            className="px-2 font-mono text-[9px] uppercase tracking-[0.4px] text-[#7D7D7D]/60"
          >
            {QUICK_ACTIONS.filter((a) => a.featured).map((a) => (
              <Command.Item
                key={a.id}
                onSelect={() => jump(a.seed)}
                className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-[#F2F2F2] data-[selected=true]:bg-[#D2FF00]/10"
              >
                <span className="w-5 text-center font-mono text-[#D2FF00]">{a.glyph}</span>
                <span>{a.label}</span>
                <span className="ml-auto font-serif text-xs font-light text-[#F2F2F2]/40">{a.description}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group
            heading="Dictionary"
            className="px-2 font-mono text-[9px] uppercase tracking-[0.4px] text-[#7D7D7D]/60"
          >
            {STYLE_CHIPS.map((s) => (
              <Command.Item
                key={s.id}
                onSelect={() => seedRequest(s.seed)}
                className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-[#F2F2F2] data-[selected=true]:bg-[#D2FF00]/10"
              >
                <PixGlyph type="plus" className="h-2 w-2 text-[#D2FF00]/70" />
                {s.label}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
        <div className="flex items-center gap-3 border-t border-white/[0.06] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.3px] text-[#7D7D7D]/60">
          <span>↑↓ navigate</span>
          <span>enter select</span>
          <span>esc close</span>
        </div>
      </div>
    </Command.Dialog>
  );
}