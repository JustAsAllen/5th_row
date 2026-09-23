// Capability Router — ranks registry capabilities for an intent using
// project context and prior workflow outcomes. Deterministic scoring.
import { buildCatalog, getRegistry, type CatalogEntry } from "./registry";
import type { Intent, ProjectXRay, RankedCapability, RouteResult } from "./types";
import { loadWorkflowStats } from "./memory";

interface Scored {
  entry: CatalogEntry;
  score: number;
  reasons: string[];
}

function categoryToJobs(intent: Intent): string[] {
  const jobs: string[] = [];
  const map: Record<string, string[]> = {
    ui: ["ui_work", "verification"],
    ux: ["ui_work", "verification"],
    bug: ["bug_runtime"],
    feature: ["architecture_planning", "ui_work"],
    performance: ["performance_review"],
    security: ["security_review"],
    database: ["database_schema"],
    testing: ["verification"],
    devops: ["deploy_ci"],
    research: ["research_unknown"],
    refactoring: ["architecture_planning"],
    architecture: ["architecture_planning"],
    documentation: ["research_unknown"],
    ambiguous: ["architecture_planning"],
  };
  for (const c of intent.categories) jobs.push(...(map[c] ?? []));
  return [...new Set(jobs)];
}

function scoreEntry(entry: CatalogEntry, intent: Intent, xray: ProjectXRay | null): Scored {
  let score = 0;
  const reasons: string[] = [];
  const haystack = `${intent.raw} ${intent.objective}`.toLowerCase();

  for (const trigger of entry.triggers) {
    if (trigger.length > 3 && haystack.includes(trigger)) {
      score += 2;
      reasons.push(`matches "${trigger}"`);
      break;
    }
  }

  // Explicit intent → capability boosts.
  const boosts: { re: RegExp; kinds: string[]; ids: string[]; points: number; why: string }[] = [
    { re: /\bui|ux\b/, kinds: [], ids: ["frontend", "ui-ux-premium", "design-intelligence", "visual-qa"], points: 3, why: "UI intent" },
    { re: /^bug$/, kinds: [], ids: ["debugger", "debug", "qa"], points: 3, why: "bug intent" },
    { re: /^performance$/, kinds: [], ids: ["performance", "performance-audit", "chrome-devtools"], points: 3, why: "performance intent" },
    { re: /^security$/, kinds: [], ids: ["security", "security-audit", "red-team"], points: 3, why: "security intent" },
    { re: /^database$/, kinds: [], ids: ["database", "supabase-backend"], points: 3, why: "database intent" },
    { re: /^devops$/, kinds: [], ids: ["devops", "production-check"], points: 3, why: "deployment intent" },
    { re: /^research$/, kinds: [], ids: ["researcher", "research", "context7", "firecrawl"], points: 3, why: "research intent" },
    { re: /^testing$/, kinds: [], ids: ["qa"], points: 3, why: "testing intent" },
    { re: /^refactoring$|^architecture$/, kinds: [], ids: ["architect", "project-intelligence"], points: 3, why: "structural intent" },
    { re: /^documentation$/, kinds: [], ids: ["workflow-recipes"], points: 3, why: "documentation intent" },
  ];
  for (const b of boosts) {
    if (b.re.test(intent.primary) && b.ids.includes(entry.id)) {
      score += b.points;
      reasons.push(b.why);
    }
  }

  // Intent.likelyCapabilities overlap.
  if (intent.likelyCapabilities.some((c) => c === entry.id || entry.id.includes(c) || c.includes(entry.id))) {
    score += 2.5;
    reasons.push("matched likely capability");
  }

  // Project context fit.
  if (xray) {
    const deps = xray.integrations.join(" ").toLowerCase();
    if (entry.id === "supabase-backend" && deps.includes("supabase")) {
      score += 2;
      reasons.push("project uses Supabase");
    }
    if (entry.id === "responsive-testing" && (intent.styles.includes("responsive") || xray.routes.length > 0)) {
      score += 1;
      reasons.push("web project with routes");
    }
    if (entry.id === "rive-animation" && deps.includes("rive")) {
      score += 2;
      reasons.push("project uses Rive");
    }
    if (entry.kind === "agent" && intent.surfaces.length > 0 && entry.id === "visual-qa") {
      score += 1;
      reasons.push("surface-level UI work");
    }
    if (entry.id === "5th-row" && xray.rootName.toLowerCase().includes("5th")) {
      score += 1.5;
      reasons.push("this is the 5th_row toolkit");
    }
  }

  // Always-relevant baseline for verification engines on any implement task.
  if (["visual-qa", "scorecard", "qa"].includes(entry.id) && intent.categories.some((c) => ["ui", "ux", "feature", "bug"].includes(c))) {
    score += 1;
    reasons.push("verification fits this task");
  }

  if (score === 0) {
    score = 0.1;
    reasons.push("available fallback");
  }

  return { entry, score, reasons: [...new Set(reasons)] };
}

export function routeIntent(intent: Intent, xray: ProjectXRay | null): RouteResult {
  const catalog = buildCatalog();
  const stats = loadWorkflowStats();

  const scored = catalog.map((entry) => scoreEntry(entry, intent, xray));

  // History boost: capabilities used in previously successful workflows.
  for (const s of scored) {
    const stat = stats[s.entry.id];
    if (stat && stat.success > stat.failed) {
      s.score += Math.min(2, stat.success * 0.4);
      s.reasons.push("worked well before");
    } else if (stat && stat.failed > stat.success) {
      s.score -= 0.5;
      s.reasons.push("failed before — double-check");
    }
  }

  const ranked: RankedCapability[] = scored
    .filter((s) => s.score >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((s) => ({
      id: s.entry.id,
      kind: s.entry.kind,
      label: s.entry.label,
      reason: [...new Set(s.reasons)].join(" · "),
      score: Math.round(s.score * 10) / 10,
    }));

  const agents = ranked.filter((r) => r.kind === "agent").map((r) => r.id);
  const skills = ranked.filter((r) => r.kind === "skill").map((r) => r.id);
  const commands = ranked.filter((r) => r.kind === "command").map((r) => r.id);
  const mcps = ranked.filter((r) => r.kind === "mcp").map((r) => r.id);

  // Guarantee agents from agents_by_job when nothing scored.
  const jobs = categoryToJobs(intent);
  const registry = getRegistry();
  for (const job of jobs) {
    const mapped = registry.agents_by_job[job] ?? [];
    for (const a of mapped) {
      if (!agents.includes(a) && agents.length < 5 && registry.agents[a]) {
        agents.push(a);
        ranked.push({
          id: a,
          kind: "agent",
          label: a,
          reason: `routed via ${job}`,
          score: 0.5,
        });
      }
    }
  }

  const rationale = buildRationale(intent, ranked, xray);

  return {
    domain: intent.domain,
    capabilities: ranked,
    agents: agents.slice(0, 5),
    skills: skills.slice(0, 5),
    commands: commands.slice(0, 4),
    mcps: mcps.slice(0, 4),
    rationale,
  };
}

function buildRationale(intent: Intent, ranked: RankedCapability[], xray: ProjectXRay | null): string[] {
  const lines: string[] = [];
  lines.push(`Domain → ${intent.domain.toUpperCase()} · primary intent → ${intent.primary.toUpperCase()}`);
  const top = ranked.slice(0, 3).map((r) => r.label);
  if (top.length > 0) lines.push(`Top capabilities → ${top.join(" → ")}`);
  if (intent.styles.length > 0) lines.push(`Style targets → ${intent.styles.join(", ")}`);
  if (intent.constraints.length > 0) lines.push(`Honoring constraints → ${intent.constraints.join("; ")}`);
  if (xray) lines.push(`Project context → ${xray.framework} · ${xray.sourceFiles} source files · ${xray.apiRoutes.length} API routes`);
  if (intent.ambiguity) lines.push("Ambiguity detected → offering direction chips before execution");
  return lines;
}
