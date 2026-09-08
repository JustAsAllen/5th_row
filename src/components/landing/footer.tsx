import Link from "next/link";
import { PixGlyph } from "./pix-glyph";

export function Footer() {
  return (
    <>
      {/* Final CTA — Dragonfly-style editorial, no decoration */}
      <section className="relative overflow-hidden bg-black px-6 py-32 md:px-10 md:py-40">
        {/* Scattered glyphs */}
        <div className="pointer-events-none absolute inset-0">
          <PixGlyph type="corners" className="absolute left-6 top-16 h-4 w-4 text-[#7D7D7D]/30 md:left-10" />
          <PixGlyph type="ticks" className="absolute right-10 top-1/3 hidden h-5 w-2 text-[#D2FF00]/40 md:block" />
          <PixGlyph type="plus" className="absolute bottom-16 left-1/2 hidden h-2 w-2 text-[#7D7D7D]/30 lg:block" />
          <PixGlyph type="plus" className="absolute right-1/4 bottom-40 hidden h-2 w-2 text-[#D2FF00]/40 xl:block" />
        </div>
        <div className="relative mx-auto max-w-[1416px]">
          <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
            Always bringing the pocket.
            <PixGlyph type="dottule" className="h-1 w-7 text-[#D2FF00]/50" />
          </span>
          <h2 className="mt-6 max-w-4xl font-display text-5xl uppercase leading-[0.88] tracking-[-0.02em] text-[#F2F2F2] md:text-8xl">
            5th_row —
            <br />
            <span className="font-serif text-[0.65em] font-normal lowercase italic tracking-normal text-[#F2F2F2]/60">
              the pocket is open
            </span>
          </h2>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Link
              href="/control"
              className="group flex items-center gap-2 font-mono text-sm uppercase tracking-[0.4px] text-[#D2FF00] transition-colors hover:text-[#D2FF00]/80"
            >
              <PixGlyph type="bracket-l" className="h-3 w-[5px] text-[#D2FF00]" />
              Open the Pocket <span className="transition-transform group-hover:translate-x-1">→</span>
              <PixGlyph type="bracket-r" className="hidden h-3 w-[5px] text-[#D2FF00] sm:block" />
            </Link>
            <Link
              href="/toolkit"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4px] text-[#7D7D7D] transition-colors hover:text-[#F2F2F2]"
            >
              <PixGlyph type="diamond" className="h-2 w-2 text-[#D2FF00]/60" />
              Read the Manual
            </Link>
          </div>
        </div>
      </section>

      {/* Footer — minimal, editorial */}
      <footer className="border-t border-white/[0.06] bg-black px-6 py-12 md:px-10">
        <div className="mx-auto flex max-w-[1416px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col">
            <span className="flex items-center gap-2.5 font-display text-base uppercase tracking-tight text-[#F2F2F2]">
              <PixGlyph type="bracket-l" className="h-3.5 w-[5px] text-[#D2FF00]/70" />
              5th_row
              <PixGlyph type="bracket-r" className="h-3.5 w-[5px] text-[#D2FF00]/70" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
              The Doraemon Magic Pocket · MIT
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/control" className="text-sm text-[#7D7D7D] transition-colors hover:text-[#F2F2F2]">
              Control Center
            </Link>
            <Link href="/toolkit" className="text-sm text-[#7D7D7D] transition-colors hover:text-[#F2F2F2]">
              The Guide
            </Link>
            <a
              href="https://github.com/JustAsAllen/5th_row"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#7D7D7D] transition-colors hover:text-[#F2F2F2]"
            >
              GitHub
            </a>
          </nav>

          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
            <PixGlyph type="plus" className="h-2 w-2 text-[#D2FF00]/60" />
            © {new Date().getFullYear()} 5th_row — always shipping.
          </p>
        </div>
      </footer>
    </>
  );
}
