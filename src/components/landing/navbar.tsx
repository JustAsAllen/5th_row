"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PixGlyph } from "./pix-glyph";

const NAV_LINKS = [
  { label: "Control Center", href: "/control" },
  { label: "The Guide", href: "/toolkit" },
  { label: "Zero to Deploy", href: "/#track" },
  { label: "Skills", href: "/#skills" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1416px] items-center justify-between px-6 py-4 md:px-10">
          {/* Logo — text + pixel brackets, Dragonfly style */}
          <Link href="/" className="group flex items-center gap-2.5">
            <PixGlyph
              type="bracket-l"
              className="h-3.5 w-[5px] text-[#7D7D7D] transition-colors group-hover:text-[#D2FF00]"
            />
            <span className="font-display text-base uppercase tracking-tight text-[#F2F2F2]">
              5th_row
            </span>
            <PixGlyph type="plus" className="h-2 w-2 text-[#D2FF00]/60" />
          </Link>

          {/* Nav — text links only, Dragonfly style */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-center gap-2 text-sm text-[#F2F2F2]/70 transition-colors hover:text-[#F2F2F2]"
              >
                <PixGlyph
                  type="diamond"
                  className="hidden h-2 w-2 text-[#D2FF00]/0 transition-colors group-hover:text-[#D2FF00] xl:block"
                />
                {l.label}
              </Link>
            ))}
            <Link
              href="/control"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4px] text-[#D2FF00] transition-colors hover:text-[#D2FF00]/80"
            >
              <PixGlyph type="ticks" className="h-5 w-2 text-[#D2FF00]" />
              Open the Pocket →
            </Link>
          </nav>

          {/* Mobile hamburger — minimal */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center text-[#F2F2F2] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay — full-screen black */}
      <motion.div
        initial={false}
        animate={open ? { y: 0 } : { y: "-100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-40 flex flex-col justify-end bg-black p-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <PixGlyph type="bracket-l" className="h-4 w-[6px] text-[#D2FF00]" />
            <span className="font-display text-base uppercase tracking-tight text-[#F2F2F2]">
              5th_row
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center text-[#F2F2F2]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-16 flex flex-col gap-2">
          {NAV_LINKS.map((l, i) => (
            <motion.div
              key={l.href}
              initial={{ opacity: 0, y: 20 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-4xl uppercase tracking-tight text-[#F2F2F2]"
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <Link
              href="/control"
              onClick={() => setOpen(false)}
              className="font-mono text-sm uppercase tracking-[0.4px] text-[#D2FF00]"
            >
              Open the Pocket →
            </Link>
          </motion.div>
        </nav>
      </motion.div>
    </>
  );
}
