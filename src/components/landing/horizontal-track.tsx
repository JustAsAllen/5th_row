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
    <section ref={ref} id="track" className="relative h-[420vh] bg-[#111112]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* Section label */}
        <div className="pointer-events-none absolute left-6 top-8 z-10 md:left-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B4B8A5]">What&apos;s inside</p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-tight text-[#F4F4ED] md:text-5xl">
            The <span className="text-[#D2FF00]">Pocket</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex items-center gap-10 pl-10 pr-10 md:pl-48">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="group relative w-[78vw] shrink-0 overflow-hidden rounded-3xl border border-[#3B3C38] bg-[#1b1e16] p-8 md:w-[44vw] lg:w-[34vw] lg:p-10"
            >
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#3B3C38] bg-[#282C20]">
                    <card.icon className="h-6 w-6 text-[#D2FF00]" />
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#B4B8A5]">
                    {card.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-[#F4F4ED] md:text-4xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#B4B8A5] md:text-base">
                    {card.desc}
                  </p>
                </div>

                {card.href && (
                  <Link
                    href={card.href}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-[#D2FF00] px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#282C20] transition-transform group-hover:scale-105"
                  >
                    {card.cta} <span>→</span>
                  </Link>
                )}
              </div>
            </div>
          ))}

          {/* end cap */}
          <div className="flex w-[70vw] shrink-0 items-center justify-center md:w-[44vw]">
            <div className="text-center">
              <p className="font-display text-3xl uppercase leading-none tracking-tight text-[#F4F4ED] md:text-6xl">
                Ready to<br />
                <span className="text-[#D2FF00]">ship?</span>
              </p>
              <Link
                href="/control"
                className="mt-8 inline-block rounded-full bg-[#D2FF00] px-10 py-5 text-sm font-bold uppercase tracking-wide text-[#282C20] transition-transform hover:scale-105"
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
    tag: "Main Page",
    title: "Control Center",
    desc: "A real dashboard with click-to-run buttons. Lint, typecheck, build, add shadcn components, deploy to Vercel — all with live console output.",
    href: "/control",
    cta: "Open Dashboard",
  },
  {
    icon: BookOpen,
    tag: "The Manual",
    title: "Toolkit Guide",
    desc: "The zero-to-deploy step-by-step guide. Copy-paste ready code, prompts, and 8 sections of everything you need to ship premium sites.",
    href: "/toolkit",
    cta: "Read the Guide",
  },
  {
    icon: Database,
    tag: "Backend",
    title: "Supabase Global",
    desc: "Auth, database, storage and realtime — wired up and ready. Copy src/lib/supabase into any project and only the .env keys change.",
    cta: "Built-in",
  },
  {
    icon: Sparkles,
    tag: "Skills",
    title: "Your Superpowers",
    desc: "website-cloner, ui-ux-premium, client-project, responsive-testing, supabase-backend, rive-animation — auto-triggering skills.",
    cta: "Auto-Trigger",
  },
  {
    icon: DollarSign,
    tag: "Money",
    title: "Client Playbook",
    desc: "Pricing tiers, deposit-first workflow, revision rounds, and the exact prompts to run while building for paying clients.",
    cta: "$$$ Ready",
  },
  {
    icon: Rocket,
    tag: "Launch",
    title: "Zero to Live",
    desc: "Deploy to Vercel in minutes. Post-deploy checklist, env vars, custom domain — everything to hand over a professional result.",
    cta: "Deploy Time",
  },
];