"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

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
          scrolled ? "bg-[#1b1e16]/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#D2FF00] font-display text-sm text-[#282C20]">
              5R
            </span>
            <span className="font-display text-lg uppercase tracking-tight text-[#F4F4ED]">
              5th_row
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm uppercase tracking-widest text-[#B4B8A5] transition-colors hover:text-[#F4F4ED]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/control"
              className="flex items-center gap-2 rounded-full bg-[#D2FF00] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#282C20] transition-transform hover:scale-105"
            >
              Open the Pocket
            </Link>
          </nav>

          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#3B3C38] text-[#F4F4ED] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <motion.div
        initial={false}
        animate={open ? { y: 0 } : { y: "-100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-40 flex flex-col justify-end bg-[#171a13] p-8"
      >
        <nav className="flex flex-col gap-2">
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
                className="block py-3 font-display text-4xl uppercase tracking-tight text-[#F4F4ED]"
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
              className="inline-block rounded-full bg-[#D2FF00] px-8 py-4 font-semibold uppercase text-[#282C20]"
            >
              Open the Pocket
            </Link>
          </motion.div>
        </nav>
      </motion.div>
    </>
  );
}