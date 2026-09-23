// Quick action tiles — Stream-Deck style entry points.
// Each tile seeds the command bar with a template + biases the intent engine.
import type { IntentCategory } from "./types";

export interface QuickAction {
  id: string;
  label: string;
  glyph: string;
  description: string;
  seed: string;
  category: IntentCategory | null;
  featured: boolean;
}

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "build",
    label: "BUILD",
    glyph: "⌘",
    description: "Ship a feature end-to-end",
    seed: "Build ",
    category: "feature",
    featured: true,
  },
  {
    id: "fix",
    label: "FIX",
    glyph: "⚡",
    description: "Root-cause and repair",
    seed: "Fix ",
    category: "bug",
    featured: true,
  },
  {
    id: "design",
    label: "DESIGN",
    glyph: "◈",
    description: "Elevate the visual language",
    seed: "Redesign ",
    category: "ui",
    featured: true,
  },
  {
    id: "research",
    label: "RESEARCH",
    glyph: "◎",
    description: "Investigate with receipts",
    seed: "Research ",
    category: "research",
    featured: true,
  },
  {
    id: "refactor",
    label: "REFACTOR",
    glyph: "⧉",
    description: "Restructure without regressions",
    seed: "Refactor ",
    category: "refactoring",
    featured: true,
  },
  {
    id: "audit",
    label: "AUDIT",
    glyph: "☰",
    description: "Health check across dimensions",
    seed: "Audit the project for ",
    category: "testing",
    featured: true,
  },
  {
    id: "deploy",
    label: "DEPLOY",
    glyph: "▲",
    description: "Verify and ship to production",
    seed: "Deploy ",
    category: "devops",
    featured: true,
  },
  {
    id: "goated",
    label: "GOATED",
    glyph: "⚡",
    description: "Holistic intelligent upgrade",
    seed: "Make this project goated: ",
    category: "ui",
    featured: true,
  },
  {
    id: "security",
    label: "SECURITY",
    glyph: "⬡",
    description: "Harden auth, headers, secrets",
    seed: "Security audit: ",
    category: "security",
    featured: false,
  },
  {
    id: "performance",
    label: "PERFORMANCE",
    glyph: "↯",
    description: "Find and fix slow paths",
    seed: "Performance audit: ",
    category: "performance",
    featured: false,
  },
  {
    id: "visual-qa",
    label: "VISUAL QA",
    glyph: "◉",
    description: "Screenshots across breakpoints",
    seed: "Visual QA: check ",
    category: "ui",
    featured: false,
  },
  {
    id: "production-check",
    label: "PRODUCTION",
    glyph: "✓",
    description: "Ship-readiness verification",
    seed: "Production check: verify ",
    category: "devops",
    featured: false,
  },
  {
    id: "test",
    label: "TEST",
    glyph: "⊞",
    description: "Coverage for critical paths",
    seed: "Add tests for ",
    category: "testing",
    featured: false,
  },
  {
    id: "debug",
    label: "DEBUG",
    glyph: "⌕",
    description: "Self-healing diagnosis loop",
    seed: "Debug: ",
    category: "bug",
    featured: false,
  },
  {
    id: "document",
    label: "DOCUMENT",
    glyph: "¶",
    description: "Docs a teammate can use",
    seed: "Document ",
    category: "documentation",
    featured: false,
  },
  {
    id: "experiment",
    label: "EXPERIMENT",
    glyph: "⚗",
    description: "Sandboxed spike, no commitment",
    seed: "Experiment: try ",
    category: "feature",
    featured: false,
  },
];

export const STYLE_CHIPS: { id: string; label: string; seed: string }[] = [
  { id: "visual-impact", label: "Visual Impact", seed: "with bold visual hierarchy and striking composition — " },
  { id: "professional", label: "Professional", seed: "with a professional, trustworthy tone — " },
  { id: "premium", label: "Premium", seed: "in a premium, expensive-feeling style — " },
  { id: "minimal", label: "Minimal", seed: "in a minimal, restrained style — " },
  { id: "experimental", label: "Experimental", seed: "with an experimental, unconventional approach — " },
  { id: "decide", label: "Let 5th Row Decide", seed: "using your best judgment on direction — " },
];
