import { Box, FileType2, FolderLock, Cloud, Container, Puzzle } from "lucide-react";

export function Stack() {
  return (
    <section className="border-y border-white/[0.06] bg-black px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1416px]">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
              The Battle-Tested Stack
            </span>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none tracking-[-0.02em] text-[#F2F2F2] md:text-6xl">
              Built on <span className="text-[#D2FF00]">Winners</span>
            </h2>
          </div>
          <p className="max-w-md font-serif text-base font-light leading-relaxed text-[#F2F2F2]/60">
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
              <p className="font-mono text-3xl font-bold text-[#D2FF00] md:text-4xl">{s.value}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
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
