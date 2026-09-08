import { Box, FileType2, FolderLock, Cloud, Container, Puzzle } from "lucide-react";
import { PixGlyph } from "./pix-glyph";

export function Stack() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-black px-6 py-24 md:px-10 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <PixGlyph type="corners" className="absolute right-6 top-10 h-4 w-4 text-[#7D7D7D]/25 md:right-10" />
        <PixGlyph type="ticks" className="absolute left-8 bottom-16 hidden h-5 w-2 text-[#7D7D7D]/25 md:block" />
      </div>
      <div className="relative mx-auto max-w-[1416px]">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
              <PixGlyph type="bracket-l" className="h-3 w-[5px] text-[#D2FF00]/70" />
              The Battle-Tested Stack
              <PixGlyph type="bracket-r" className="hidden h-3 w-[5px] text-[#D2FF00]/70 sm:block" />
            </span>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none tracking-[-0.02em] text-[#F2F2F2] md:text-6xl">
              Built on <span className="text-[#D2FF00]">Winners</span>
            </h2>
          </div>
          <p className="flex items-start gap-3 font-serif text-base font-light leading-relaxed text-[#F2F2F2]/60">
            <PixGlyph type="ticks" className="mt-1.5 h-5 w-2 shrink-0 text-[#D2FF00]/40" />
            Every tool already installed and configured. No setup grunt work — just clone and the
            pocket is open.
          </p>
        </div>

        {/* Stack grid — borderless, like Dragonfly's portfolio */}
        <div className="mt-14 grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-3 lg:grid-cols-6">
          {STACK.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center gap-3 bg-black p-8 text-center transition-colors hover:bg-white/[0.02]"
            >
              <item.Icon className="h-6 w-6 text-[#D2FF00]" />
              <span className="text-xs font-medium uppercase tracking-wide text-[#F2F2F2]">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Stats — clean text on void */}
        <div className="mt-16 grid grid-cols-2 gap-px bg-white/[0.06] md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-black p-8">
              <p className="flex items-center gap-2 font-mono text-3xl font-bold text-[#D2FF00] md:text-4xl">
                <PixGlyph type="diamond" className="hidden h-2 w-2 text-[#D2FF00]/50 sm:block" />
                {s.value}
              </p>
              <p className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
                <PixGlyph type="plus" className="h-2 w-2 text-[#D2FF00]/40" />
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STACK = [
  { name: "Next.js", Icon: Box },
  { name: "TypeScript", Icon: FileType2 },
  { name: "Supabase", Icon: Cloud },
  { name: "Tailwind", Icon: Container },
  { name: "shadcn/ui", Icon: Puzzle },
  { name: "Vercel", Icon: FolderLock },
];

const STATS = [
  { value: "08+", label: "Ready Sections" },
  { value: "07", label: "Auto Skills" },
  { value: "01", label: "Global Backend" },
  { value: "100%", label: "Free Forever" },
];
