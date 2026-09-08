import { Box, FileType2, FolderLock, Cloud, Container, Puzzle } from "lucide-react";

export function Stack() {
  return (
    <section className="border-y border-[#3B3C38] bg-[#282C20] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#B4B8A5]">The Battle-Tested Stack</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none tracking-tight text-[#F4F4ED] md:text-6xl">
              Built on <span className="text-[#D2FF00]">Winners</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#B4B8A5]">
            Every tool already installed and configured. No setup grunt work — just clone and the
            pocket is open.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#3B3C38] bg-[#3B3C38] sm:grid-cols-3 lg:grid-cols-6">
          {STACK.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center gap-2 bg-[#1b1e16] p-8 text-center transition-colors hover:bg-[#242722]"
            >
              <item.Icon className="h-7 w-7 text-[#D2FF00]" />
              <span className="text-sm font-semibold uppercase tracking-wide text-[#F4F4ED]">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-[#3B3C38] bg-[#1b1e16] p-6">
              <p className="font-mono text-3xl font-bold text-[#D2FF00] md:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-[#B4B8A5]">{s.label}</p>
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