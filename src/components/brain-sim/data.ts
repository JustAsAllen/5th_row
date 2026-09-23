export type Agent = {
  id: string;
  name: string;
  type: "builder" | "readonly";
  specialties: string[];
  strong: string;
  weak: string;
  badge: string;
};

export const AGENTS: Agent[] = [
  {
    id: "architect",
    name: "ARCHITECT",
    type: "builder",
    specialties: ["project DNA", "file maps", "phase plans"],
    strong: "turns intent into a phase-gated plan",
    weak: "no execution without approval",
    badge: "PLAN",
  },
  {
    id: "database",
    name: "DATABASE",
    type: "builder",
    specialties: ["supabase", "schemas", "rls", "postgres"],
    strong: "rows, policies, and migrations",
    weak: "never touches UI",
    badge: "ROWS",
  },
  {
    id: "backend",
    name: "BACKEND",
    type: "builder",
    specialties: ["next routes", "actions", "auth", "api contracts"],
    strong: "business logic behind typed contracts",
    weak: "design-blind",
    badge: "API",
  },
  {
    id: "frontend",
    name: "FRONTEND",
    type: "builder",
    specialties: ["react", "tailwind", "framer", "a11y"],
    strong: "shipping interfaces in the house style",
    weak: "no db access",
    badge: "UI",
  },
  {
    id: "security",
    name: "SECURITY",
    type: "readonly",
    specialties: ["zod", "rls", "headers", "secrets"],
    strong: "finds what can be abused",
    weak: "no code edits, only reports",
    badge: "READ",
  },
  {
    id: "qa",
    name: "QA",
    type: "builder",
    specialties: ["test strategy", "edge cases", "hardening"],
    strong: "breaks it before the client does",
    weak: "needs a running app",
    badge: "TEST",
  },
  {
    id: "redteam",
    name: "RED-TEAM",
    type: "readonly",
    specialties: ["attack simulation", "auth abuse", "injection"],
    strong: "plays the adversary",
    weak: "no fixes, only findings",
    badge: "ATTACK",
  },
  {
    id: "visualqa",
    name: "VISUAL-QA",
    type: "readonly",
    specialties: ["breakpoints", "overflow", "motion", "contrast"],
    strong: "sees the layout you miss",
    weak: "zero-edit, screenshot-only",
    badge: "PIXEL",
  },
  {
    id: "performance",
    name: "PERF",
    type: "readonly",
    specialties: ["lcp", "inp", "cls", "payload"],
    strong: "numbers, not opinions",
    weak: "cannot refactor",
    badge: "METRIC",
  },
  {
    id: "debugger",
    name: "DEBUGGER",
    type: "builder",
    specialties: ["stack traces", "repro steps", "bisection"],
    strong: "works the loop until root cause",
    weak: "needs evidence, hates guesses",
    badge: "LOOP",
  },
  {
    id: "researcher",
    name: "RESEARCHER",
    type: "readonly",
    specialties: ["docs", "versions", "migrations"],
    strong: "comes back with receipts",
    weak: "never ships code",
    badge: "READ",
  },
  {
    id: "devops",
    name: "DEVOPS",
    type: "builder",
    specialties: ["build", "env", "deploy", "commands"],
    strong: "gets it green and live",
    weak: "no product decisions",
    badge: "SHIP",
  },
];

export type Category = {
  id: string;
  label: string;
  route: string;
  modules: string[];
};

export const CATEGORIES: Category[] = [
  {
    id: "feature",
    label: "FEATURE",
    route: "/registry#feature",
    modules: ["intake", "dna", "war room", "gate"],
  },
  {
    id: "ui",
    label: "UI / DESIGN",
    route: "/registry#ui",
    modules: ["presets", "design intelligence", "visual qa"],
  },
  {
    id: "backend",
    label: "BACKEND / DATA",
    route: "/registry#data",
    modules: ["schemas", "rls", "api contracts"],
  },
  {
    id: "performance",
    label: "PERFORMANCE",
    route: "/registry#perf",
    modules: ["trace", "metrics", "budgets"],
  },
  {
    id: "bug",
    label: "BUG / LOOP",
    route: "/registry#bug",
    modules: ["debug loop", "root cause", "regression"],
  },
  {
    id: "security",
    label: "SECURITY",
    route: "/registry#security",
    modules: ["threat model", "red team", "report"],
  },
];

export type Task = {
  title: string;
  tag: string;
  category: string[]; // category ids
  level: "L2" | "L3" | "L4";
  agents: string[];
  verdict: string;
};

export const TASKS: Task[] = [
  {
    title: "BUILD AN AI SAAS DASHBOARD",
    tag: "intake#0042",
    category: ["feature", "ui", "backend"],
    level: "L4",
    agents: [
      "architect",
      "database",
      "backend",
      "frontend",
      "security",
      "qa",
      "visualqa",
    ],
    verdict: "SHIPPED — 7 agents · 0 findings.",
  },
  {
    title: "PREMIUM CLIENT LANDING PAGE",
    tag: "intake#0417",
    category: ["ui", "performance"],
    level: "L3",
    agents: ["architect", "frontend", "performance", "visualqa"],
    verdict: "SHIPPED — 4 agents · LCP 1.2s.",
  },
  {
    title: "ADD SUPABASE AUTH + RLS",
    tag: "intake#0091",
    category: ["backend", "security"],
    level: "L3",
    agents: ["database", "backend", "security", "redteam"],
    verdict: "HARDENED — 8 policies · 12 attacks repelled.",
  },
  {
    title: "REFACTOR THE PAYMENTS MODULE",
    tag: "intake#0233",
    category: ["feature", "bug"],
    level: "L4",
    agents: ["architect", "backend", "qa", "debugger"],
    verdict: "STABLE — 4 loops closed · 0 regressions.",
  },
];

export const LEVELS = ["L0", "L1", "L2", "L3", "L4"] as const;

export const ATTACKS: { name: string; vector: string }[] = [
  { name: "SESSION FORGERY", vector: "jwt" },
  { name: "ROW-LEVEL SNIFF", vector: "rls" },
  { name: "IDOR POKE", vector: "route" },
  { name: "PAYLOAD FLOOD", vector: "api" },
  { name: "ZOD EVASION", vector: "input" },
  { name: "RACE CONDITION", vector: "state" },
];

export const PERF_METRICS: { metric: string; value: string; state: "good" | "watch" }[] = [
  { metric: "LCP", value: "1.2s", state: "good" },
  { metric: "INP", value: "42ms", state: "good" },
  { metric: "CLS", value: "0.00", state: "good" },
  { metric: "JS MAIN", value: "89kb", state: "good" },
  { metric: "LARGEST PAINT", value: "2.1s", state: "watch" },
];

export const SECURITY_CHECKS: { name: string; status: "pass" | "warn" }[] = [
  { name: "tls + headers", status: "pass" },
  { name: "zod schema gate", status: "pass" },
  { name: "rls enforced", status: "pass" },
  { name: "no secrets in repo", status: "pass" },
  { name: "rate limit on auth", status: "pass" },
  { name: "dependency audit", status: "warn" },
];

export const VERIFY_GATE: { label: string; detail: string }[] = [
  { label: "IMPLEMENTED", detail: "code merged per ph-01..ph-04" },
  { label: "TESTED", detail: "loop evidence + edge cases" },
  { label: "VERIFIED", detail: "all engines green or documented" },
  { label: "REVIEWED", detail: "read-only agents signed off" },
];

export const LOG_LINES = [
  "kernel::dev-os v0.3.0 — 38 capabilities mapped, 12 agents in dex",
  "ibs::skill loader — lazily mounted workflow-recipes",
  "intake::task accepted → classifier.waiting",
  "classifier::category resolved → FEATURE+UI+BACKEND",
  "router::matches 5 of 12 agents · autonomy L4",
  "dna::stack loaded — next 16, tailwind 4, supa, framer",
  "planner::ph-01…ph-05 written · hand-offs keyed to specialists",
  "war-room::ARCHITECT → DATABASE → BACKEND → FRONTEND",
  "engines::red-team reports 12/12 attacks repelled",
  "engines::visual-qa — 3 breakpoints clean, 2 overflows logged",
  "engines::perf — LCP 1.2s INP 42ms CLS 0.00",
  "gate::verifications PASS · confidence ≥ 0.97",
  "memory::lessons appended · dna updated · scorecard archived",
  "delivery::SHIPPED — now 14 cleared artifacts, total schema 32",
];

export const WINDOW_MS = 4600;
export const STAGE_DELAY = 340;