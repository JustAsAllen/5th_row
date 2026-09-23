// Intent Engine — deterministic natural-language → structured intent.
// Follows brain/capability/decision-rules.md. No fake AI: rule-based signals only.
import type { AmbiguitySignal, Intent, IntentCategory, ProjectDomain } from "./types";

interface Rule {
  category: IntentCategory;
  patterns: RegExp[];
  weight: number;
}

const RULES: Rule[] = [
  {
    category: "ui",
    patterns: [
      /\b(ui|ux|design|visual|layout|typography|colors?|colours?|spacing|hero|landing|navbar|footer|card|button|theme|premium|luxury|futuristic|minimal(ist)?|editorial|brutalist|cyberpunk|elegant|beautiful|gorgeous|ugly|boring|bland|outdated|modern|style|aesthetic|polish(ed)?|goated|clutter(ed)?|clean look)\b/i,
    ],
    weight: 3,
  },
  {
    category: "ux",
    patterns: [
      /\b(flow|usab|intuiti|onboard|empty state|loading state|error state|micro-?interact|hover|transition|feedback|confus|hard to use|easy to use|accessib|a11y|keyboard|contrast|screen reader)\b/i,
    ],
    weight: 2,
  },
  {
    category: "bug",
    patterns: [
      /\b(bug|broken|not work(ing)?|doesn'?t work|fails?|failing|error|crash|exception|stack ?trace|regression|wrong|fix(ing|ed)?|debug|issue|glitch|stuck|hangs?|freeze[sd]?)\b/i,
    ],
    weight: 3,
  },
  {
    category: "feature",
    patterns: [
      /\b(add|build|create|implement|new|feature|page|section|component|dashboard|form|integrat|support for|wire up|set up|setup|enable)\b/i,
    ],
    weight: 2,
  },
  {
    category: "performance",
    patterns: [
      /\b(performance|slow|speed|fast|bundle|lighthouse|lcp|inp|cls|optimi[sz]e|lazy|memoi[sz]|cache|payload|bytes?|kb|mb|render(s|ing)?|jank|fps)\b/i,
    ],
    weight: 3,
  },
  {
    category: "security",
    patterns: [
      /\b(secur(ity|e)|vulnerab|auth(entication|orization)?|rls|inject|xss|csrf|secret|leak|token|permission|hardening|audit.*secur|penetrat)\b/i,
    ],
    weight: 3,
  },
  {
    category: "database",
    patterns: [
      /\b(supabase|postgres|database|schema|table|migration|query|sql|row|rls|storage bucket|realtime|foreign key|index)\b/i,
    ],
    weight: 3,
  },
  {
    category: "refactoring",
    patterns: [
      /\b(refactor|restructur|clean ?up|reorganiz|extract|decoupl|technical debt|tangled|duplicate[sd]? code|mega?component)\b/i,
    ],
    weight: 3,
  },
  {
    category: "architecture",
    patterns: [
      /\b(architect(ure|ural)?|structure|data flow|trade-?offs?|monorepo|microservic|boundary|layer(s|ing)?|system design|scalab)\b/i,
    ],
    weight: 2,
  },
  {
    category: "testing",
    patterns: [
      /\b(test(s|ing)?|coverage|unit test|integration test|e2e|playwright test|vitest|jest|spec(s)?|assert)\b/i,
    ],
    weight: 3,
  },
  {
    category: "devops",
    patterns: [
      /\b(deploy|vercel|ci\/?cd|pipeline|docker|env(ironment)? vars?|release|ship it|production|hosting|domain)\b/i,
    ],
    weight: 3,
  },
  {
    category: "documentation",
    patterns: [
      /\b(doc(s|umentation)?|readme|comment(s)?|jsdoc|inline docs|changelog|write.?up|manual)\b/i,
    ],
    weight: 2,
  },
  {
    category: "research",
    patterns: [
      /\b(research|investigat|compare|evaluat|what is|how does|find out|explore|analy[sz]e why|why is|best (practice|approach)|options?)\b/i,
    ],
    weight: 2,
  },
];

const VAGUE_PHRASES: RegExp[] = [
  /^\s*(make|improve|better|fix up|upgrade|elevate|spice)\s+(it|this|the (site|page|project|app|thing))\s*$/i,
  /\b(feels?|feel) (boring|bland|meh|flat|off|wrong|muddy|cheap| dated)\b/i,
  /\bjust make it (better|good|nice|amazing|sick)\b/i,
  /\bsomething'?s off\b/i,
  /\bi don'?t know what to ask\b/i,
  /^\s*hmm+\s*$/i,
];

const STYLE_WORDS: Record<string, RegExp> = {
  premium: /\b(premium|luxury|expensive|high-?end|high class)\b/i,
  futuristic: /\b(futurist(ic|ic)?|sci-?fi|next-?gen|space-?age|cyber)\b/i,
  minimal: /\b(minimal(ist)?|clean|sparse|bare|simple)\b/i,
  editorial: /\b(editorial|magazine|serif|typographic|print-?like)\b/i,
  brutalist: /\b(brutalist|raw|concrete)\b/i,
  playful: /\b(playful|fun|quirky|bouncy|cartoon)\b/i,
  dark: /\b(dark (mode|theme|mode)|noir|black)\b/i,
  bold: /\b(bold|loud|high contrast|striking)\b/i,
  goated: /\b(goated|goat|insane|crazy good|fire|wild)\b/i,
  professional: /\b(professional|corporate|trustworthy|serious|business)\b/i,
  experimental: /\b(experimental|avant-?garde|weird|unconventional)\b/i,
  responsive: /\b(responsive|mobile[- ]?first|all devices|breakpoints?)\b/i,
};

const CONSTRAINT_RULES: { re: RegExp; label: string }[] = [
  { re: /\b(without|don'?t|do not|never|avoid|no)\s+(make\s+)?(it\s+)?clutter/i, label: "avoid clutter" },
  { re: /\bwithout (making|adding|introducing) (it )?(any )?(bloat|clutter|noise|complexity)\b/i, label: "avoid bloat/clutter" },
  { re: /\bkeep (it |things )?(simple|minimal|fast|light)\b/i, label: "keep it simple" },
  { re: /\bdon'?t (break|regress|destroy|rewrite|touch) (existing|working|anything|the)/i, label: "do not break existing functionality" },
  { re: /\bno (new|extra|unnecessary) (dependencies|packages|deps)\b/i, label: "no unnecessary dependencies" },
  { re: /\b backwards?\b|\bbackward[s]? compat/i, label: "maintain backwards compatibility" },
  { re: /\bsmall (changes|diff|patches?)\b/i, label: "prefer small changes" },
  { re: /\bunder (\d+|a few) (minutes|hours|days)\b/i, label: "time-boxed" },
];

const SURFACE_RULES: { re: RegExp; label: string }[] = [
  { re: /\b(landing|hero|home ?page)\b/i, label: "landing page" },
  { re: /\bdashboard\b/i, label: "dashboard" },
  { re: /\b(auth|login|sign ?in|sign ?up|onboard)\b/i, label: "authentication" },
  { re: /\b(navbar|navigation|header|menu)\b/i, label: "navigation" },
  { re: /\b(footer)\b/i, label: "footer" },
  { re: /\b(contact|form)s?\b/i, label: "forms" },
  { re: /\b(pricing|plans?)\b/i, label: "pricing" },
  { re: /\b(checkout|payment|cart|stripe)\b/i, label: "checkout/payments" },
  { re: /\b(blog|articles?|posts?)\b/i, label: "blog/content" },
  { re: /\b(settings?|profile|account)\b/i, label: "settings/profile" },
  { re: /\b(search|filter)\b/i, label: "search/filtering" },
  { re: /\b(chat|comment|notif(y|ication)|real-?time|message)\b/i, label: "realtime/messaging" },
  { re: /\b(api|endpoint|route|webhook)\b/i, label: "API layer" },
  { re: /\b(mobile|phone|tablet)\b/i, label: "mobile layout" },
  { re: /\b(animation|motion|transition|scroll)\b/i, label: "motion/animation" },
];

const CAPABILITY_HINTS: { re: RegExp; caps: string[] }[] = [
  { re: /\b(premium|goated|luxury|expensive|polish|beautiful|design|ui|ux|aesthetic)\b/i, caps: ["ui-ux-premium", "design-intelligence", "visual-qa"] },
  { re: /\b(mobile|responsive|breakpoint|tablet|phone)\b/i, caps: ["responsive-testing", "visual-qa"] },
  { re: /\b(clone|reference|look like|make it like|inspiration|\bhttps?:\/\/)\b/i, caps: ["website-cloner", "firecrawl"] },
  { re: /\b(supabase|database|auth|rls|realtime|storage|postgres)\b/i, caps: ["supabase-backend", "database"] },
  { re: /\b(rive|animated vector|motion graphic|micro-?interaction)\b/i, caps: ["rive-animation"] },
  { re: /\b(client|freelance|deliver|proposal|invoice)\b/i, caps: ["client-project"] },
  { re: /\b(slow|performance|bundle|lighthouse|lcp)\b/i, caps: ["performance-audit", "chrome-devtools"] },
  { re: /\b(security|vulnerab|leak|secret|harden)\b/i, caps: ["security-audit", "red-team"] },
  { re: /\b(test|coverage|e2e|vitest|jest)\b/i, caps: ["qa"] },
  { re: /\b(debug|error|crash|broken|stack ?trace)\b/i, caps: ["debug"] },
  { re: /\b(deploy|vercel|ship|production)\b/i, caps: ["production-check", "devops"] },
  { re: /\b(research|compare|find out|investigate|docs?)\b/i, caps: ["research", "context7", "firecrawl"] },
  { re: /\b(document|readme|docs|changelog)\b/i, caps: ["workflow-recipes"] },
  { re: /\b(refactor|debt|clean ?up|restructure)\b/i, caps: ["architect", "project-intelligence"] },
];

function detectDomain(categories: IntentCategory[], raw: string): ProjectDomain {
  const frontendCats: IntentCategory[] = ["ui", "ux"];
  const backendCats: IntentCategory[] = ["database", "devops"];
  const hasFront = categories.some((c) => frontendCats.includes(c));
  const hasBack = categories.some((c) => backendCats.includes(c));
  if (/\b(server|api|endpoint|webhook|queue|cron)\b/i.test(raw) && !hasFront) return "backend";
  if (hasFront && hasBack) return "fullstack";
  if (hasFront) return "frontend";
  if (hasBack) return backendCats.includes(categories[0] ?? "") ? (categories[0] === "devops" ? "infrastructure" : "backend") : "backend";
  if ((categories[0] ?? "") === "research") return "research";
  if ((categories[0] ?? "") === "devops") return "infrastructure";
  return "unknown";
}

function buildStrategy(categories: IntentCategory[], hasAmbiguity: boolean): string[] {
  const strategy: string[] = [];
  if (hasAmbiguity) strategy.push("clarify-direction");
  strategy.push("inspect");
  if (categories.includes("bug")) strategy.push("reproduce", "root-cause");
  else strategy.push("analyze");
  strategy.push("plan");
  if (!categories.includes("research") && !categories.includes("documentation")) {
    strategy.push("implement");
  }
  if (categories.includes("testing") || categories.includes("bug")) strategy.push("test");
  if (categories.some((c) => ["ui", "ux"].includes(c))) strategy.push("visual-qa");
  if (categories.includes("security")) strategy.push("security-review");
  if (categories.includes("performance")) strategy.push("performance-check");
  strategy.push("verify", "report");
  return strategy;
}

export function analyzeIntent(raw: string, actionSeed: string | null = null): Intent {
  const text = raw.trim();

  const scored = RULES.map((rule) => ({
    category: rule.category,
    weight: rule.patterns.reduce((acc, p) => acc + (p.test(text) ? 1 : 0), 0) * rule.weight,
  }))
    .filter((s) => s.weight > 0)
    .sort((a, b) => b.weight - a.weight);

  let categories = scored.map((s) => s.category);
  if (categories.length === 0) categories = ["ambiguous"];

  // Action seeds bias the primary category without overriding explicit signals.
  if (actionSeed && scored.length > 0) {
    const seeded: IntentCategory = actionSeed as IntentCategory;
    if (!categories.includes(seeded) && RULES.some((r) => r.category === seeded)) {
      categories = [seeded, ...categories];
    }
  }

  const primary = categories[0] ?? "ambiguous";
  const styles = Object.entries(STYLE_WORDS)
    .filter(([, re]) => re.test(text))
    .map(([name]) => name);
  const constraints = CONSTRAINT_RULES.filter((c) => c.re.test(text)).map((c) => c.label);
  const surfaces = SURFACE_RULES.filter((s) => s.re.test(text)).map((s) => s.label);
  const likelyCapabilities = [
    ...new Set(CAPABILITY_HINTS.filter((h) => h.re.test(text)).flatMap((h) => h.caps)),
  ];

  const vague = VAGUE_PHRASES.some((re) => re.test(text));
  const signalCount =
    categories.filter((c) => c !== "ambiguous").length +
    styles.length +
    constraints.length +
    surfaces.length;
  const ambiguous = vague || signalCount === 0 || (primary === "ambiguous" && signalCount < 2);

  const dimensions = inferDimensions(text, primary, styles);
  const ambiguity: AmbiguitySignal | null = ambiguous
    ? {
        detected: true,
        reason: vague
          ? "The request is open-ended — inferred possible improvement areas."
          : "Not enough specific signals — inferred possible improvement areas.",
        dimensions,
      }
    : null;

  const objective = buildObjective(text, primary, styles, constraints);

  return {
    raw: text,
    objective,
    categories,
    primary,
    domain: detectDomain(categories, text),
    styles,
    constraints,
    surfaces,
    likelyCapabilities,
    strategy: buildStrategy(categories, ambiguous),
    actionSeed,
    ambiguity,
    signalStrength: Math.min(1, signalCount / 5),
  };
}

function inferDimensions(text: string, primary: IntentCategory, styles: string[]): string[] {
  const dims: string[] = [];
  const uiish = primary === "ui" || primary === "ux" || /\b(site|page|website|app|interface|look|feel)\b/i.test(text);
  if (uiish || styles.length > 0) {
    dims.push(
      "Visual hierarchy",
      "Typography",
      "Spacing",
      "Motion",
      "Color system",
      "Interactions",
      "Content structure"
    );
  }
  if (primary === "performance" || /\b(slow|fast)\b/i.test(text)) dims.push("Load performance", "Bundle size");
  if (primary === "bug") dims.push("Runtime errors", "State handling", "Edge cases");
  if (primary === "architecture" || primary === "refactoring") dims.push("Code structure", "Data flow", "Duplication");
  if (dims.length === 0) dims.push("Visual hierarchy", "Content structure", "Interactions");
  return dims;
}

function buildObjective(
  text: string,
  primary: IntentCategory,
  styles: string[],
  constraints: string[]
): string {
  const short = text.length > 140 ? `${text.slice(0, 137)}…` : text;
  const parts: string[] = [];
  const labelMap: Record<string, string> = {
    ui: "UI improvement",
    ux: "UX improvement",
    bug: "Bug fix",
    feature: "Feature work",
    performance: "Performance work",
    security: "Security work",
    database: "Data layer work",
    refactoring: "Refactoring",
    architecture: "Architecture work",
    testing: "Testing work",
    devops: "Deployment work",
    documentation: "Documentation work",
    research: "Research",
    ambiguous: "Open-ended improvement",
  };
  parts.push(labelMap[primary] ?? primary);
  if (styles.length > 0) parts.push(`${styles.join(" + ")} style`);
  if (constraints.length > 0) parts.push(`with ${constraints.join("; ")}`);
  return `${parts.join(" — ")} · "${short}"`;
}
