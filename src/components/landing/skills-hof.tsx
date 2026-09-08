"use client";

import { motion } from "framer-motion";
import { Copy, Palette, Briefcase, MonitorSmartphone, Database, Clapperboard, Wand2 } from "lucide-react";

export function SkillsHof() {
  return (
    <section id="skills" className="bg-[#1b1e16] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#B4B8A5]">Hall of Fame</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none tracking-tight text-[#F4F4ED] md:text-7xl">
              Your <span className="text-[#D2FF00]">Skills</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#B4B8A5]">
            Seven auto-triggering superpowers loaded into opencode. Named in one sentence, and
            they take over — cloning, designing, testing, and wiring backends.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-[#3B3C38] bg-[#282C20] p-7 transition-all hover:-translate-y-1 hover:border-[#D2FF00]/60"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1b1e16]">
                  <skill.icon className="h-5 w-5 text-[#D2FF00]" />
                </span>
                <span className="font-mono text-xs text-[#B4B8A5]">{skill.code}</span>
              </div>
              <h3 className="mt-6 font-display text-xl uppercase tracking-tight text-[#F4F4ED]">
                {skill.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#B4B8A5]">{skill.desc}</p>
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