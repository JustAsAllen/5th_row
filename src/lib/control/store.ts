// Client-side control-plane store. Orchestrates intent → route → workflow →
// prompt → execution against the local OpenCode CLI. Honest statuses only:
// every step reflects what actually happened (or its fallback reason).
"use client";

import { create } from "zustand";
import { analyzeIntent } from "./intent-engine";
import { routeIntent } from "./capability-router";
import { buildWorkflow, workflowKey } from "./workflow-builder";
import { buildPrompt } from "./prompt-architect";
import {
  clearHistory,
  loadHistory,
  loadProjectMemory,
  loadSettings,
  loadWorkflowStats,
  pushHistory,
  recordWorkflowOutcome,
  saveSettings,
  setHistoryFeedback,
} from "./memory";
import type {
  ControlSettings,
  ControlView,
  GoatedOpportunity,
  HistoryEntry,
  Intent,
  OpencodeStatus,
  ProjectXRay,
  RouteResult,
  StepStatus,
  Workflow,
  WorkflowStep,
} from "./types";

export interface ActionResult {
  ok: boolean;
  output: string;
  ms: number;
}

export interface ExecuteJob {
  id: string;
  status: "running" | "completed" | "failed";
  output: string;
  exitCode: number | null;
  ms: number;
  error?: string;
}

interface WorkflowLog {
  id: number;
  kind: "analysis" | "action" | "execute" | "warn";
  label: string;
  ok: boolean;
  output: string;
  ms: number;
  time: string;
}

interface ControlState {
  request: string;
  intent: Intent | null;
  route: RouteResult | null;
  workflow: Workflow | null;
  prompt: string;
  promptStyle: "concise" | "standard" | "detailed";
  xray: ProjectXRay | null;
  xrayScannedAt: string | null;
  xrayLoading: boolean;
  status: OpencodeStatus | null;
  statusLoading: boolean;
  history: HistoryEntry[];
  goated: GoatedOpportunity[];
  settings: ControlSettings;
  view: ControlView;
  analyzing: boolean;
  executing: boolean;
  job: ExecuteJob | null;
  log: WorkflowLog[];
  goalTouched: string[];
  error: string | null;

  setView: (view: ControlView) => void;
  setRequest: (request: string) => void;
  seedRequest: (seed: string) => void;
  analyze: () => Promise<void>;
  clearAnalysis: () => void;
  setPromptStyle: (style: "concise" | "standard" | "detailed") => void;
  regeneratePrompt: () => void;
  copyPrompt: () => Promise<boolean>;
  downloadPrompt: () => void;
  execute: () => Promise<void>;
  cancelExecution: () => void;
  pollJob: (id: string) => void;
  runStep: (stepId: string) => Promise<void>;
  setStepStatus: (stepId: string, status: StepStatus, output?: string, error?: string) => void;
  refreshXray: () => Promise<void>;
  refreshStatus: () => Promise<void>;
  loadHistoryFromStorage: () => void;
  feedback: (id: string, dir: "up" | "down") => void;
  clearHistoryAll: () => void;
  updateSettings: (patch: Partial<ControlSettings>) => void;
  setGoalTouched: (touched: string[]) => void;
  clearLog: () => void;
}

let logId = 0;
let pollTimer: ReturnType<typeof setInterval> | null = null;

function now(): string {
  return new Date().toLocaleTimeString();
}

export const useControl = create<ControlState>((set, get) => ({
  request: "",
  intent: null,
  route: null,
  workflow: null,
  prompt: "",
  promptStyle: "standard",
  xray: null,
  xrayScannedAt: null,
  xrayLoading: false,
  status: null,
  statusLoading: false,
  history: [],
  goated: [],
  settings: loadSettings(),
  view: "dashboard",
  analyzing: false,
  executing: false,
  job: null,
  log: [],
  goalTouched: [],
  error: null,

  setView: (view) => set({ view }),

  setRequest: (request) => set({ request }),

  seedRequest: (seed) => set({ request: get().request ? `${get().request} ${seed}` : seed }),

  analyze: async () => {
    const { request } = get();
    const text = request.trim();
    if (!text) return;
    set({ analyzing: true, error: null });

    try {
      const intent = analyzeIntent(text);
      let xray = get().xray;
      if (!xray) {
        set({ xrayLoading: true });
        try {
          const res = await fetch("/api/xray", { method: "POST" });
          if (res.ok) {
            xray = (await res.json()) as ProjectXRay;
            set({ xray, xrayScannedAt: xray.scannedAt });
          } else {
            xray = null;
          }
        } catch {
          xray = null;
        } finally {
          set({ xrayLoading: false });
        }
      }

      const route = routeIntent(intent, xray);
      const workflow = buildWorkflow(intent, route);
      const projectMemory = loadProjectMemory();
      const promptStyle = get().promptStyle;
      const prompt = buildPrompt(intent, route, workflow, {
        xray,
        projectMemory,
        promptStyle,
      });

      const goated = xray ? get().goated : [];

      set({
        intent,
        route,
        workflow,
        prompt,
        goated,
        view: "workflow",
        analyzing: false,
        log: [
          {
            id: ++logId,
            kind: "analysis",
            label: `Intent resolved via ${intent.signalStrength > 0 ? "explicit signals" : "fallback heuristic"} · ${intent.primary.toUpperCase()}`,
            ok: true,
            output: intent.objective,
            ms: 0,
            time: now(),
          },
          {
            id: ++logId,
            kind: "analysis",
            label: `Workflow assembled · ${workflow.steps.length} steps`,
            ok: true,
            output: `${route.agents.slice(0, 4).join(", ") || "no agent mapped"} · ${route.skills.slice(0, 3).join(", ") || "no skill mapped"} · ${route.mcps.slice(0, 3).join(", ") || "no mcp mapped"}`,
            ms: 0,
            time: now(),
          },
        ],
      });
      if (xray) get().setStepStatus("xray", "success", `${xray.framework} · ${xray.sourceFiles} files · ${xray.apiRoutes.length} API routes`);
      get().setStepStatus("intent-engine", "success", intent.objective);

      if (get().settings.defaultMode === "autonomous") {
        void get().execute();
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Analysis failed";
      set({
        analyzing: false,
        error: message,
        log: [...get().log, { id: ++logId, kind: "warn", label: "Analysis failed", ok: false, output: message, ms: 0, time: now() }],
      });
    }
  },

  clearAnalysis: () => set({ intent: null, route: null, workflow: null, prompt: "", job: null, executing: false }),

  setPromptStyle: (promptStyle) => {
    set({ promptStyle, settings: { ...get().settings, promptStyle } });
    saveSettings({ ...get().settings, promptStyle });
    get().regeneratePrompt();
  },

  regeneratePrompt: () => {
    const { intent, route, workflow, xray } = get();
    if (!intent || !route || !workflow) return;
    const prompt = buildPrompt(intent, route, workflow, {
      xray,
      projectMemory: loadProjectMemory(),
      promptStyle: get().promptStyle,
    });
    set({ prompt });
  },

  copyPrompt: async () => {
    const { prompt } = get();
    if (!prompt) return false;
    try {
      await navigator.clipboard.writeText(prompt);
      return true;
    } catch {
      return false;
    }
  },

  downloadPrompt: () => {
    const { prompt, intent } = get();
    if (!prompt) return;
    const safe = (
      intent?.objective.replace(/[^\w\s-]/g, "").trim().slice(0, 40) || "request"
    ).replace(/\s+/g, "-").toLowerCase();
    const blob = new Blob([prompt], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safe}-prompt.md`;
    a.click();
    URL.revokeObjectURL(url);
  },

  execute: async () => {
    const { prompt, settings, workflow } = get();
    if (!prompt || !workflow) return;

    set({ executing: true, job: null, view: "terminal", error: null });
    get().setStepStatus("opencode-run", "running", "Dispatching to local OpenCode CLI…");

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          agent: workflow.route.agents[0] ?? undefined,
          model: settings.model || undefined,
          timeoutSec: settings.executionTimeoutSec,
        }),
      });
      const data = (await res.json()) as { id?: string; error?: string };
      if (!res.ok || !data.id) {
        const msg = data.error ?? "Execution not available";
        get().setStepStatus("opencode-run", "failed", undefined, msg);
        set({
          executing: false,
          log: [...get().log, { id: ++logId, kind: "warn", label: "Dispatch failed", ok: false, output: msg, ms: 0, time: now() }],
        });
        return;
      }
      get().pollJob(data.id);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Execution failed";
      get().setStepStatus("opencode-run", "failed", undefined, message);
      set({
        executing: false,
        log: [...get().log, { id: ++logId, kind: "warn", label: "Dispatch failed", ok: false, output: message, ms: 0, time: now() }],
      });
    }
  },

  pollJob: (id: string) => {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(async () => {
      try {
        const res = await fetch(`/api/execute?id=${id}`);
        if (!res.ok) return;
        const job = (await res.json()) as ExecuteJob;
        set({ job });
        if (job.status !== "running") {
          if (pollTimer) clearInterval(pollTimer);
          pollTimer = null;
          const ok = job.status === "completed";
          get().setStepStatus(
            "opencode-run",
            ok ? "success" : "failed",
            job.status === "completed" ? `exit ${job.exitCode ?? 0} · ${job.ms}ms` : `exit ${job.exitCode ?? "?"} · ${job.ms}ms`,
            job.status === "completed" ? undefined : "OpenCode returned a non-zero exit — inspect output below."
          );

          const entry: HistoryEntry = {
            id: job.id,
            request: get().request,
            prompt: get().prompt,
            createdAt: new Date().toISOString(),
            mode: get().settings.defaultMode,
            intentPrimary: get().intent?.primary ?? "ambiguous",
            capabilities: get().route?.capabilities.slice(0, 8).map((c) => c.label) ?? [],
            agents: get().route?.agents ?? [],
            skills: get().route?.skills ?? [],
            mcps: get().route?.mcps ?? [],
            workflowSteps: get().workflow?.steps.map((s) => ({ label: s.label, status: s.status })) ?? [],
            executionStatus: ok ? "completed" : "failed",
            executionOutput: job.output.slice(0, 4000),
            warnings: [],
            feedback: null,
          };
          const history = pushHistory(entry);
          set({ history, executing: false });
          const wf = get().workflow;
          if (wf) recordWorkflowOutcome(workflowKey(wf), ok);
          set({
            log: [
              ...get().log,
              { id: ++logId, kind: ok ? "action" : "warn", label: ok ? "Execution completed" : "Execution failed", ok, output: `exit ${job.exitCode ?? "?"} · ${job.ms}ms`, ms: job.ms, time: now() },
            ],
          });
        }
      } catch {
        // Ignore transient poll failures; next tick retries.
      }
    }, 1500);
  },

  cancelExecution: () => {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = null;
    set({ executing: false });
  },

  runStep: async (stepId: string) => {
    const { workflow } = get();
    if (!workflow) return;
    const step = workflow.steps.find((s) => s.id === stepId);
    if (!step || step.executor === "none" || step.executor === "local") return;

    get().setStepStatus(stepId, "running", `Running ${step.tool}…`);

    if (step.executor === "shell" && step.actionId) {
      const res = await fetch("/api/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: step.actionId }),
      });
      const data = (await res.json()) as ActionResult;
      const ok = Boolean(data.ok);
      get().setStepStatus(stepId, ok ? "success" : "failed", data.output?.slice(0, 2000), ok ? undefined : data.output?.slice(0, 2000));
      set({
        log: [...get().log, { id: ++logId, kind: ok ? "action" : "warn", label: step.label, ok, output: (data.output ?? "").slice(0, 2000), ms: data.ms ?? 0, time: now() }],
      });
      return;
    }

    if (step.executor === "opencode" && step.capability === "opencode-run") {
      await get().execute();
      return;
    }

    get().setStepStatus(stepId, "success", `${step.tool} · ready`);
  },

  setStepStatus: (stepId, status, output, error) => {
    const { workflow } = get();
    if (!workflow) return;
    const matcher = (s: WorkflowStep): boolean =>
      s.id === stepId || s.capability === stepId || s.localKind === stepId || s.actionId === stepId;
    const updated: WorkflowStep[] = workflow.steps.map((s) =>
      matcher(s) ? { ...s, status, ...(output ? { output } : {}), ...(error ? { error } : {}) } : s
    );
    set({ workflow: { ...workflow, steps: updated } });
  },

  refreshXray: async () => {
    set({ xrayLoading: true });
    try {
      const res = await fetch("/api/xray", { method: "POST" });
      if (res.ok) {
        const xray = (await res.json()) as ProjectXRay;
        set({ xray, xrayScannedAt: xray.scannedAt, xrayLoading: false });
      } else {
        set({ xrayLoading: false, error: "X-Ray scan refused" });
      }
    } catch {
      set({ xrayLoading: false, error: "X-Ray unavailable" });
    }
  },

  refreshStatus: async () => {
    if (get().statusLoading) return;
    set({ statusLoading: true });
    try {
      const res = await fetch("/api/status");
      if (res.ok) set({ status: (await res.json()) as OpencodeStatus });
    } catch {
      // Server down — leave last status.
    } finally {
      set({ statusLoading: false });
    }
  },

  loadHistoryFromStorage: () => set({ history: loadHistory() }),

  feedback: (id, dir) => set({ history: setHistoryFeedback(id, dir) }),

  clearHistoryAll: () => {
    clearHistory();
    set({ history: [] });
  },

  updateSettings: (patch) => {
    const next = { ...get().settings, ...patch };
    saveSettings(next);
    set({ settings: next });
  },

  setGoalTouched: (touched) => set({ goalTouched: touched }),
  clearLog: () => set({ log: [] }),
}));

export function useOpencode(): OpencodeStatus | null {
  return useControl((s) => s.status);
}

export function useExecutionAvailable(): boolean {
  const status = useControl((s) => s.status);
  return Boolean(status?.available);
}

export function useWorkflowStats(): Record<string, { success: number; failed: number }> {
  return loadWorkflowStats();
}