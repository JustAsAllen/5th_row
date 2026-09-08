"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, BookOpen, Database, Sparkles, DollarSign, Rocket } from "lucide-react";

export function HorizontalTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-74%"]);

  return (
    <section ref={ref} id="track" className="relative h-[420vh] bg-black">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* Section label — mono micro-label */}
        <div className="pointer-events-none absolute left-6 top-8 z-10 md:left-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
            What&apos;s inside
          </span>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-[-0.02em] text-[#F2F2F2] md:text-5xl">
            The <span className="text-[#D2FF00]">Pocket</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex items-stretch gap-px pl-10 pr-10 md:pl-48">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="group relative flex w-[78vw] shrink-0 flex-col justify-between bg-black p-8 transition-colors hover:bg-white/[0.02] md:w-[44vw] lg:w-[34vw] lg:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-10 w-10 place-items-center">
                  <card.icon className="h-5 w-5 text-[#D2FF00]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
                  {card.tag}
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl uppercase leading-none tracking-[-0.02em] text-[#F2F2F2] md:text-4xl">
                  {card.title}
                </h3>
                <p className="mt-4 max-w-sm font-serif text-base font-light leading-relaxed text-[#F2F2F2]/60 md:text-lg">
                  {card.desc}
                </p>
              </div>

              {card.href && (
                <Link
                  href={card.href}
                  className="mt-8 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.4px] text-[#D2FF00] transition-colors hover:text-[#D2FF00]/80"
                >
                  {card.cta} <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              )}
            </div>
          ))}

          {/* end cap */}
          <div className="flex w-[70vw] shrink-0 items-center justify-center md:w-[44vw]">
            <div className="text-center">
              <p className="font-display text-3xl uppercase leading-none tracking-[-0.02em] text-[#F2F2F2] md:text-6xl">
                Ready to
                <br />
                <span className="text-[#D2FF00]">ship?</span>
              </p>
              <Link
                href="/control"
                className="mt-8 inline-block font-mono text-sm uppercase tracking-[0.4px] text-[#D2FF00] transition-colors hover:text-[#D2FF00]/80"
              >
                Open the Pocket →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const CARDS = [
  {
    icon: Terminal,
    tag: "01",
    title: "Control Center",
    desc: "A real dashboard with click-to-run buttons. Lint, typecheck, build, add shadcn components, deploy to Vercel — all with live console output.",
    href: "/control",
    cta: "Open Dashboard",
  },
  {
    icon: BookOpen,
    tag: "02",
    title: "Toolkit Guide",
    desc: "The zero-to-deploy step-by-step guide. Copy-paste ready code, prompts, and everything you need to ship premium sites.",
    href: "/toolkit",
    cta: "Read the Guide",
  },
  {
    icon: Database,
    tag: "03",
    title: "Supabase Global",
    desc: "Auth, database, storage and realtime — wired up and ready. Copy src/lib/supabase into any project and only the .env keys change.",
    cta: "Built-in",
  },
  {
    icon: Sparkles,
    tag: "04",
    title: "Your Superpowers",
    desc: "Seven auto-triggering skills loaded into opencode. Named in one sentence, and they take over — cloning, designing, testing, wiring.",
    cta: "Auto-Trigger",
  },
  {
    icon: DollarSign,
    tag: "05",
    title: "Client Playbook",
    desc: "Pricing tiers, deposit-first workflow, revision rounds, and the exact prompts to run while building for paying clients.",
    cta: "$$$ Ready",
  },
  {
    icon: Rocket,
    tag: "06",
    title: "Zero to Live",
    desc: "Deploy to Vercel in minutes. Post-deploy checklist, env vars, custom domain — everything to hand over a professional result.",
    cta: "Deploy Time",
  },
];
