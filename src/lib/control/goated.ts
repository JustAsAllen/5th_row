// GOATED MODE — holistic improvement opportunities derived from real
// X-Ray signals only. Never invents percentages.
import type { GoatedOpportunity, ProjectXRay } from "./types";

export function analyzeGoated(xray: ProjectXRay): GoatedOpportunity[] {
  const opps: GoatedOpportunity[] = [];
  const signal = (id: string) => xray.health.find((h) => h.id === id);

  const testing = signal("testing");
  if (testing && testing.status !== "good") {
    opps.push({
      id: "testing",
      category: "TESTING",
      title: "Establish a testing baseline",
      why: "Without tests, every change is a gamble — regressions ship silently.",
      evidence: testing.evidence,
      workflowSeed: "Add a pragmatic test setup covering the riskiest paths, then write tests for core flows.",
    });
  }

  const docs = signal("documentation");
  if (docs && docs.status !== "good") {
    opps.push({
      id: "docs",
      category: "DOCUMENTATION",
      title: "Documentation a newcomer can use",
      why: "Undocumented conventions live only in your head — they die in handoffs.",
      evidence: docs.evidence,
      workflowSeed: "Improve project documentation: README structure, setup steps, architecture notes, and convention summary.",
    });
  }

  const debt = signal("type-hygiene");
  if (debt && debt.status !== "good") {
    opps.push({
      id: "type-hygiene",
      category: "ARCHITECTURE",
      title: "Tighten type hygiene",
      why: "Type assertions and `any` disable the compiler — bugs surface at runtime instead.",
      evidence: debt.evidence,
      workflowSeed: "Remove unsafe type assertions and any-casts where feasible; introduce precise types instead.",
    });
  }

  const noise = signal("console-hygiene");
  if (noise && noise.status !== "good") {
    opps.push({
      id: "console-hygiene",
      category: "RELIABILITY",
      title: "Clean debug residue",
      why: "Stray console noise hides real signals and leaks internals in production.",
      evidence: noise.evidence,
      workflowSeed: "Remove leftover console.log/debug statements; keep intentional logging behind a level guard.",
    });
  }

  const todos = signal("todo-density");
  if (todos && todos.status !== "good") {
    opps.push({
      id: "todo-density",
      category: "DEVELOPER EXPERIENCE",
      title: "Resolve or ticket stale TODOs",
      why: "Orphaned TODOs rot into invisible debt nobody plans for.",
      evidence: todos.evidence,
      workflowSeed: "Audit TODO/FIXME comments: fix quick ones, convert the rest into tracked notes in project memory.",
    });
  }

  const sec = signal("security-baseline");
  if (sec && sec.status === "good") {
    opps.push({
      id: "security-deep",
      category: "SECURITY",
      title: "Adversarial pass on top of a solid baseline",
      why: `Baseline holds (${sec.evidence}) — a red-team pass finds the next layer of issues.`,
      evidence: sec.evidence,
      workflowSeed: "Run a red-team review of auth, validation, and API routes; apply the high-confidence fixes.",
    });
  } else if (sec) {
    opps.push({
      id: "security-fix",
      category: "SECURITY",
      title: "Close security baseline gaps",
      why: "Missing baseline protections are the cheapest attacks for an adversary.",
      evidence: sec.evidence,
      workflowSeed: "Restore the security baseline: headers, validation, rate limits, secret hygiene.",
    });
  }

  const perf = signal("performance-readiness");
  if (perf) {
    opps.push({
      id: "perf",
      category: "PERFORMANCE",
      title: "Measure, then trim the fat",
      why:
        perf.status === "good"
          ? `Baseline is measurable (${perf.evidence}) — protect it with a targeted audit.`
          : "No performance guardrails yet — first measurement finds the cheap wins.",
      evidence: perf.evidence,
      workflowSeed: "Run a performance audit: bundle, images, renders, and Core Web Vitals — fix the top three findings.",
    });
  }

  if (xray.hasTests && xray.hasStrictTs && xray.hasSecurityHeaders) {
    opps.push({
      id: "a11y",
      category: "ACCESSIBILITY",
      title: "Accessibility pass",
      why: "A11y issues exclude users and rarely get caught by build tooling.",
      evidence: "Heuristic: no dedicated a11y checks detected in scripts.",
      workflowSeed: "Audit keyboard navigation, focus states, contrast, labels, and reduced-motion support; fix findings.",
    });
  }

  if (xray.componentCount > 8) {
    opps.push({
      id: "ui-consistency",
      category: "UI / UX",
      title: "Design-system consistency sweep",
      why: `With ${xray.componentCount} components, drift between pages is likely — consistency reads as quality.`,
      evidence: `Heuristic: ${xray.componentCount} components detected.`,
      workflowSeed: "Sweep the UI for spacing, type scale, and interaction consistency; unify outliers.",
    });
  }

  opps.push({
    id: "dx",
    category: "DEVELOPER EXPERIENCE",
    title: "Smooth the inner loop",
    why: "Small friction in scripts and setup compounds every working day.",
    evidence: `Scripts available: ${xray.scripts.join(", ") || "none"}.`,
    workflowSeed: "Improve developer experience: tidy npm scripts, add a pre-commit verify script, document the loop.",
  });

  return opps;
}
