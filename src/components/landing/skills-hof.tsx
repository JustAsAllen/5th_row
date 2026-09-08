"use client";

import { motion } from "framer-motion";
import { Copy, Palette, Briefcase, MonitorSmartphone, Database, Clapperboard, Wand2 } from "lucide-react";
import { PixGlyph } from "./pix-glyph";

export function SkillsHof() {
  return (
    <section id="skills" className="relative overflow-hidden bg-black px-6 py-24 md:px-10 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <PixGlyph type="corners" className="absolute left-6 top-14 h-4 w-4 text-[#7D7D7D]/25 md:left-10" />
        <PixGlyph type="ticks" className="absolute right-8 top-1/2 hidden h-5 w-2 text-[#D2FF00]/30 md:block" />
        <PixGlyph type="plus" className="absolute bottom-20 left-1/3 hidden h-2 w-2 text-[#7D7D7D]/25 lg:block" />
      </div>
      <div className="relative mx-auto max-w-[1416px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]">
              <PixGlyph type="bracket-l" className="h-3 w-[5px] text-[#D2FF00]/70" />
              Hall of Fame
              <PixGlyph type="bracket-r" className="h-3 w-[5px] text-[#D2FF00]/70" />
            </span>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none tracking-[-0.02em] text-[#F2F2F2] md:text-7xl">
              Your <span className="text-[#D2FF00]">Skills</span>
            </h2>
          </div>
          <p className="flex items-start gap-3 font-serif text-base font-light leading-relaxed text-[#F2F2F2]/60">
            <PixGlyph type="ticks" className="mt-1.5 h-5 w-2 shrink-0 text-[#D2FF00]/40" />
            Seven auto-triggering superpowers loaded into opencode. Named in one sentence, and
            they take over — cloning, designing, testing, and wiring backends.
          </p>
        </div>

        {/* ASCII art rule — block pixels */}
        <div className="mt-14 flex items-center gap-3 text-[#7D7D7D]/40">
          <PixGlyph type="bracket-l" className="h-4 w-[6px]" />
          <PixGlyph type="dottule" className="h-1 w-16" />
          <PixGlyph type="bracket-r" className="h-4 w-[6px]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4px] text-[#D2FF00]/50">
            ░░░░░░
          </span>
        </div>

        {/* Skills list — editorial, numbered, like Dragonfly's writing list */}
        <div className="mt-16 divide-y divide-white/[0.06]">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex items-start gap-6 py-8 transition-colors hover:bg-white/[0.01] -mx-6 px-6 md:-mx-10 md:px-10"
            >
              {/* Number — mono, framed */}
              <span className="flex items-center gap-2 pt-1 font-mono text-[10px] uppercase tracking-[0.4px] text-[#D2FF00]/80">
                <PixGlyph type="bracket-l" className="h-3 w-[5px] text-[#7D7D7D]/60" />
                {skill.code}
                <PixGlyph type="bracket-r" className="h-3 w-[5px] text-[#7D7D7D]/60" />
              </span>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <PixGlyph type="diamond" className="h-2 w-2 text-[#D2FF00]" />
                  <skill.icon className="h-4 w-4 text-[#F2F2F2]/70" />
                  <h3 className="font-display text-xl uppercase tracking-[-0.02em] text-[#F2F2F2]">
                    {skill.name}
                  </h3>
                  <PixGlyph type="dottule" className="hidden h-1 w-7 opacity-0 transition-opacity group-hover:opacity-100 md:block" />
                </div>
                <p className="mt-2 max-w-2xl font-serif text-base font-light leading-relaxed text-[#F2F2F2]/50">
                  {skill.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SKILLS = [
  {
    icon: Clapperboard,
    code: "01",
    name: "Website Cloner",
    desc: "Send any URL. Analyzes the reference site's design and rebuilds it as premium, modern code — colors, typography, layout, components.",
  },
  {
    icon: Palette,
    code: "02",
    name: "UI/UX Premium",
    desc: "Makes any interface look expensive. High-end gradients, refined spacing, and the polish of a top SaaS or agency site.",
  },
  {
    icon: Copy,
    code: "03",
    name: "Client Work",
    desc: "The professional workflow for paying clients: requirements, pricing, deposits, delivery — from brief to handover.",
  },
  {
    icon: MonitorSmartphone,
    code: "04",
    name: "Responsive Testing",
    desc: "Test any site across screen sizes and devices, then find and fix responsive layout issues before they reach the client.",
  },
  {
    icon: Database,
    code: "05",
    name: "Supabase Backend",
    desc: "Spin up database, auth, storage, and realtime features on demand. Tables, rows, sign-in — standard backend-on-call.",
  },
  {
    icon: Wand2,
    code: "06",
    name: "Rive Animation",
    desc: "Premium flat-vector animations rendered on WebGL canvas. Smooth like 3D, virtually zero bundle cost.",
  },
  {
    icon: Briefcase,
    code: "07",
    name: "5th Row Stack",
    desc: "The meta-skill that ties it all together — the standard stack, rulebook, and workflow of the 5th_row toolkit.",
  },
];
