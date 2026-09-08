"use client";

import { useState } from "react";
import {
  Terminal,
  Wrench,
  Palette,
  LayoutTemplate,
  Database,
  Rocket,
  LifeBuoy,
  Home,
  Play,
  Box,
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", step: "START", icon: Home },
  { id: "setup", label: "Project Setup", step: "STEP 1", icon: Terminal },
  { id: "deps", label: "Install + Config", step: "STEP 2", icon: Wrench },
  { id: "design", label: "Design System", step: "STEP 3", icon: Palette },
  { id: "frontend", label: "Frontend Basics", step: "STEP 4", icon: LayoutTemplate },
  { id: "backend", label: "Backend + Supabase", step: "STEP 5", icon: Database },
  { id: "templates", label: "Templates", step: "STEP 6", icon: Rocket },
  { id: "deploy", label: "Deployment", step: "STEP 7", icon: Play },
  { id: "help", label: "Help & Fixes", step: "STEP 8", icon: LifeBuoy },
];

export function ToolkitSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("overview");

  const scrollTo = (id: string) => {
    setActiveId(id);
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-xl border border-zinc-800 bg-zinc-900/90 p-2.5 text-zinc-300 backdrop-blur-xl lg:hidden"
      >
        <Wrench className="h-5 w-5" />
      </button>

      {/* Sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-zinc-800/60 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <Box className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white">5TH_ROW</div>
              <div className="text-xs text-violet-400">TOOLKIT</div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-zinc-500">
            Zero-to-deploy master guide. Open this whenever you blank.
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                activeId === item.id
                  ? "bg-violet-500/10 text-white ring-1 ring-violet-500/30"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className={`h-4 w-4 shrink-0 ${activeId === item.id ? "text-violet-400" : ""}`} />
              <div className="min-w-0">
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-600">{item.step}</div>
              </div>
            </button>
          ))}
        </nav>

        <div className="border-t border-zinc-800/60 p-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
            <div className="text-xs font-semibold text-white">Quick Tip</div>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
              Say &quot;clone this&quot; to use the website-cloner skill, or &quot;make it premium&quot; for the design formula.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
