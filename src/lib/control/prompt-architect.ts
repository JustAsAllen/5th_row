// Prompt Architect — builds a structured OpenCode prompt from intent,
// route, workflow, and project context. Skips empty sections (no filler).
import type { Intent, PromptContext, RouteResult, Workflow } from "./types";

function section(title: string, body: string[]): string[] | null {
  const lines = body.filter((l) => l.trim().length > 0);
  if (lines.length === 0) return null;
  return [`## ${title}`, "", ...lines, ""];
}

function fileAreas(intent: Intent, ctx: PromptContext): string[] {
  const areas: string[] = [];
  const x = ctx.xray;
  if (x) {
    const interesting = x.routes.filter((r) =>
      intent.surfaces.some((s) => r.toLowerCase().includes(s.split("/")[0].slice(0, 6)))
    );
    if (interesting.length > 0) areas.push(...interesting.map((r) => `- ${r}`));
    if (intent.primary === "ui" || intent.primary === "ux") {
      areas.push("- src/components/ — existing UI components and patterns");
      areas.push("- src/app/globals.css — design tokens");
    }
    if (intent.primary === "bug" && x.apiRoutes.length > 0) {
      areas.push(...x.apiRoutes.slice(0, 6).map((r) => `- ${r}`));
    }
    if (intent.primary === "database") areas.push("- src/lib/supabase/ — backend client + hooks");
    if (x.hasAgentsMd) areas.push("- AGENTS.md — project conventions (must follow)");
  } else {
    areas.push("- Inspect the repo structure first; identify the relevant areas yourself.");
  }
  return [...new Set(areas)];
}

export function buildPrompt(
  intent: Intent,
  route: RouteResult,
  workflow: Workflow,
  ctx: PromptContext
): string {
  const out: string[] = [];
  const styleNote =
    ctx.promptStyle === "concise"
      ? "Be terse. No preamble."
      : ctx.promptStyle === "detailed"
        ? "Work carefully and explain key decisions briefly as you go."
        : "Work in clear steps and report as you go.";

  const objective = section("OBJECTIVE", [
    intent.objective,
    "",
    `Original request: "${intent.raw}"`,
  ]);
  if (objective) out.push(...objective);

  const contextLines: string[] = [];
  if (ctx.xray) {
    contextLines.push(
      `- Framework: ${ctx.xray.framework} ${ctx.xray.frameworkVersion} · Language: ${ctx.xray.language} · PM: ${ctx.xray.packageManager}`,
      `- Styling: ${ctx.xray.styling} · Database: ${ctx.xray.database}`,
      `- Architecture: ${ctx.xray.architecture} · ${ctx.xray.sourceFiles} source files, ${ctx.xray.componentCount} components, ${ctx.xray.apiRoutes.length} API routes`,
      `- Integrations: ${ctx.xray.integrations.slice(0, 10).join(", ") || "none detected"}`
    );
  } else {
    contextLines.push("- Project context unavailable — inspect the repository before making changes.");
  }
  if (ctx.projectMemory?.purpose.trim()) {
    contextLines.push(`- Project purpose: ${ctx.projectMemory.purpose.trim()}`);
  }
  if (ctx.projectMemory?.conventions.trim()) {
    contextLines.push(`- Conventions: ${ctx.projectMemory.conventions.trim()}`);
  }
  const context = section("PROJECT CONTEXT", contextLines);
  if (context) out.push(...context);

  const state: string[] = [];
  if (intent.surfaces.length > 0) state.push(`Surfaces in scope: ${intent.surfaces.join(", ")}.`);
  if (intent.styles.length > 0) state.push(`Target style: ${intent.styles.join(", ")}.`);
  state.push("Read the current implementation of affected areas before editing.");
  const stateSec = section("CURRENT STATE", state);
  if (stateSec) out.push(...stateSec);

  const taskLines = workflow.steps
    .filter((s) => s.executor === "opencode")
    .map((s, i) => `${i + 1}. ${s.label} — ${s.description}`);
  const task = section("TASK", taskLines.length > 0 ? taskLines : [intent.objective]);
  if (task) out.push(...task);

  const constraints = section("CONSTRAINTS", [
    ...intent.constraints.map((c) => `- ${c}`),
    ...(ctx.projectMemory?.constraints.trim()
      ? [`- ${ctx.projectMemory.constraints.trim()}`]
      : []),
    "- Do not introduce unnecessary dependencies.",
    "- Do not store or print secrets, env values, or tokens.",
  ]);
  if (constraints) out.push(...constraints);

  if (intent.primary === "ui" || intent.primary === "ux") {
    const design = section("DESIGN REQUIREMENTS", [
      intent.styles.includes("premium") || intent.styles.includes("goated")
        ? "- Apply the premium design formula: strong hierarchy, restrained glow, excellent spacing."
        : "- Match and elevate the existing design language — do not invent a parallel system.",
      intent.constraints.some((c) => c.includes("clutter"))
        ? "- Anti-clutter: prioritize whitespace and hierarchy over adding elements."
        : "- Keep density purposeful; every element earns its place.",
      "- Preserve keyboard accessibility and visible focus states.",
      "- Respect prefers-reduced-motion for animations.",
    ]);
    if (design) out.push(...design);
  }

  const tech = section("TECHNICAL REQUIREMENTS", [
    "- TypeScript strict — no `any`, explicit interfaces.",
    "- Follow existing component/pattern conventions in this repo (see AGENTS.md if present).",
    "- Validate server-side inputs with zod where forms/APIs are touched.",
    intent.categories.includes("database")
      ? "- RLS mandatory on any new table; server-only service role key."
      : "",
    intent.primary === "performance"
      ? "- Measure before/after with real numbers; no guessed metrics."
      : "",
  ]);
  if (tech) out.push(...tech);

  const files = section("FILES / AREAS TO INSPECT", fileAreas(intent, ctx));
  if (files) out.push(...files);

  const tools = section("TOOLS / MCP", [
    route.mcps.length > 0
      ? `- Prefer: ${route.mcps.join(", ")} (per capability registry).`
      : "- Native tools (read/grep/edit/bash) are sufficient.",
    intent.categories.some((c) => c === "ui" || c === "ux")
      ? "- Browser automation available for visual verification (chrome-devtools/playwright)."
      : "",
    "- context7 for any library/API questions — never stale memory.",
  ]);
  if (tools) out.push(...tools);

  const people = section("SKILLS / AGENTS", [
    route.skills.length > 0 ? `- Skills: ${route.skills.join(", ")}` : "",
    route.agents.length > 0 ? `- Agents: ${route.agents.join(", ")}` : "",
    route.commands.length > 0 ? `- Mode reference: /${route.commands[0]}` : "",
  ]);
  if (people) out.push(...people);

  const strategy = section(
    "EXECUTION STRATEGY",
    intent.strategy.map((s, i) => `${i + 1}. ${s}`)
  );
  if (strategy) out.push(...strategy);

  const validation: string[] = [];
  validation.push("- Run typecheck (`npx tsc --noEmit`) and lint (`npm run lint`).");
  if (intent.categories.some((c) => ["ui", "ux", "feature"].includes(c))) {
    validation.push("- If a dev server can run, verify visually across desktop/tablet/mobile.");
  }
  if (intent.primary === "bug") validation.push("- Prove the original failure case now passes.");
  validation.push("- Report honestly: IMPLEMENTED / TESTED / VERIFIED / KNOWN LIMITATIONS.");
  const validationSec = section("VALIDATION", validation);
  if (validationSec) out.push(...validationSec);

  const acceptance = section("ACCEPTANCE CRITERIA", [
    `- ${intent.objective.split("·")[0].trim()} achieved without regressions.`,
    ...intent.constraints.map((c) => `- Constraint honored: ${c}`),
    "- Existing functionality keeps working; diff stays scoped to the task.",
  ]);
  if (acceptance) out.push(...acceptance);

  out.push(
    "## DO NOT",
    "",
    "- break existing functionality",
    "- unnecessarily rewrite working code",
    "- introduce unnecessary dependencies",
    "- stop after describing changes — actually make them",
    "- fabricate test results, metrics, or verifications",
    "",
    "## STYLE",
    "",
    styleNote,
    ""
  );

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function improvePrompt(
  previousPrompt: string,
  feedback: string,
  failureNotes: string[]
): string {
  const additions: string[] = ["", "", "## IMPROVEMENTS FROM LAST RUN", "", `- User feedback: ${feedback}`];
  if (failureNotes.length > 0) {
    additions.push("- Past failures to avoid:");
    additions.push(...failureNotes.slice(0, 5).map((f) => `  - ${f}`));
  }
  additions.push(
    "- Re-verify every acceptance criterion from the previous run before finishing.",
    "- If a previous step was incomplete, finish it first — do not restart from scratch."
  );
  return previousPrompt + additions.join("\n");
}
