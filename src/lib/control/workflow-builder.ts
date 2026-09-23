// Workflow Builder — turns an intent + route into a visible, executable plan.
import type { Intent, RouteResult, Workflow, WorkflowStep } from "./types";

let counter = 0;
function stepId(prefix: string): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

function baseStep(partial: Omit<WorkflowStep, "id" | "status">): WorkflowStep {
  return { id: stepId("step"), status: "waiting", ...partial };
}

function standardSteps(intent: Intent, route: RouteResult): WorkflowStep[] {
  const topAgent = route.agents[0] ?? "build";
  const wantsVisual = intent.categories.some((c) => c === "ui" || c === "ux") || intent.styles.includes("responsive");
  const isResearchOnly = intent.categories.length === 1 && intent.categories[0] === "research";

  const steps: WorkflowStep[] = [
    baseStep({
      label: "Understand request",
      description: `Resolve intent: ${intent.objective}`,
      executor: "local",
      localKind: "workflow",
      capability: "intent-engine",
      agent: "—",
      tool: "deterministic classifier",
      detail: `Categories: ${intent.categories.join(", ")}${intent.constraints.length ? ` · Constraints: ${intent.constraints.join("; ")}` : ""}`,
    }),
    baseStep({
      label: "Inspect project",
      description: "Scan stack, routes, integrations, and health signals (Project X-Ray).",
      executor: "local",
      localKind: "xray",
      capability: "project-intelligence",
      agent: "explore",
      tool: "/api/xray",
    }),
    baseStep({
      label: isResearchOnly ? "Research" : "Analyze",
      description: isResearchOnly
        ? "Gather docs and current sources for the question."
        : `Assess current state of ${intent.surfaces.length > 0 ? intent.surfaces.join(", ") : "the relevant areas"} before changing anything.`,
      executor: "opencode",
      capability: route.commands[0] ?? "research",
      agent: route.agents[1] ?? topAgent,
      tool: route.mcps[0] ? `${route.mcps[0]} + native tools` : "native tools",
    }),
    baseStep({
      label: "Plan",
      description: "Produce a change plan: goal, files, risks, ordered steps.",
      executor: "opencode",
      capability: "project-intelligence",
      agent: "architect",
      tool: "planning + memory",
    }),
  ];

  if (!isResearchOnly) {
    steps.push(
      baseStep({
        label: intent.primary === "bug" ? "Fix" : "Implement",
        description:
          intent.primary === "bug"
            ? "Apply the root-cause fix without collateral changes."
            : "Execute the plan in dependency order, following project conventions.",
        executor: "opencode",
        capability: route.skills[0] ?? intent.likelyCapabilities[0] ?? "build",
        agent: topAgent,
        tool: "edit / write + read",
      })
    );
  }

  if (intent.categories.includes("testing") || intent.primary === "bug") {
    steps.push(
      baseStep({
        label: "Test",
        description: "Run existing tests; add coverage where the repo has a test setup.",
        executor: "opencode",
        capability: "qa",
        agent: "qa",
        tool: "test runner",
      })
    );
  }

  if (wantsVisual) {
    steps.push(
      baseStep({
        label: "Visual QA",
        description: "Screenshot desktop/tablet/mobile; check overflow, spacing, console errors.",
        executor: "opencode",
        capability: "visual-qa",
        agent: "visual-qa",
        tool: "chrome-devtools / playwright",
      })
    );
  }

  if (intent.primary === "security") {
    steps.push(
      baseStep({
        label: "Security review",
        description: "Review auth, headers, validation, and secret handling for the change.",
        executor: "opencode",
        capability: "security-audit",
        agent: "security",
        tool: "grep + security engine",
      })
    );
  }

  if (intent.primary === "performance") {
    steps.push(
      baseStep({
        label: "Performance check",
        description: "Measure the hot path before/after; record real numbers.",
        executor: "opencode",
        capability: "performance-audit",
        agent: "performance",
        tool: "chrome-devtools trace",
      })
    );
  }

  return steps;
}

export function buildWorkflow(intent: Intent, route: RouteResult): Workflow {
  const steps = standardSteps(intent, route);

  // Dispatch step: the actual OpenCode hand-off.
  steps.push(
    baseStep({
      label: "OpenCode dispatch",
      description: "Send the generated prompt to the local OpenCode CLI (or stop at copy/export if disconnected).",
      executor: "opencode",
      capability: "opencode-run",
      agent: "build",
      tool: "opencode run",
    })
  );

  // Post-execution QA shell steps (real commands via /api/actions).
  steps.push(
    baseStep({
      label: "Lint + typecheck",
      description: "Run whitelisted verification commands against the project.",
      executor: "shell",
      actionId: "lint",
      capability: "quality",
      agent: "—",
      tool: "npm run lint → then tsc",
      detail: "Runs eslint, then typecheck as follow-up actions.",
    })
  );

  steps.push(
    baseStep({
      label: "Report",
      description: "Summarize what changed, what was verified, and what remains.",
      executor: "none",
      capability: "scorecard",
      agent: "—",
      tool: "result panel",
    })
  );

  return {
    id: stepId("wf"),
    createdAt: new Date().toISOString(),
    request: intent.raw,
    intent,
    route,
    steps,
  };
}

export function workflowKey(workflow: Workflow): string {
  return `${workflow.intent.primary}:${workflow.route.capabilities.slice(0, 3).map((c) => c.id).join("+")}`;
}
