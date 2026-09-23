// Persistent client-side memory (localStorage). Never stores secrets.
import type {
  ControlSettings,
  FailureNote,
  HistoryEntry,
  ProjectMemory,
} from "./types";

const PREFIX = "5row.control.";
const HISTORY_CAP = 100;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Quota exceeded or private mode — memory degrades gracefully.
  }
}

export const DEFAULT_SETTINGS: ControlSettings = {
  defaultMode: "approval",
  model: "",
  promptStyle: "standard",
  runQaAfter: true,
  qaActions: ["lint", "typecheck"],
  executionTimeoutSec: 300,
  reducedMotion: false,
};

export function loadSettings(): ControlSettings {
  return { ...DEFAULT_SETTINGS, ...read<Partial<ControlSettings>>("settings", {}) };
}

export function saveSettings(settings: ControlSettings): void {
  write("settings", settings);
}

export function loadHistory(): HistoryEntry[] {
  return read<HistoryEntry[]>("history", []);
}

export function pushHistory(entry: HistoryEntry): HistoryEntry[] {
  const next = [entry, ...loadHistory()].slice(0, HISTORY_CAP);
  write("history", next);
  return next;
}

export function setHistoryFeedback(id: string, feedback: "up" | "down"): HistoryEntry[] {
  const next = loadHistory().map((e) => (e.id === id ? { ...e, feedback } : e));
  write("history", next);
  return next;
}

export function clearHistory(): void {
  write("history", []);
}

export const EMPTY_PROJECT_MEMORY: ProjectMemory = {
  purpose: "",
  conventions: "",
  constraints: "",
  decisions: "",
  knownIssues: "",
  preferredWorkflows: "",
  updatedAt: "",
};

export function loadProjectMemory(): ProjectMemory {
  return { ...EMPTY_PROJECT_MEMORY, ...read<Partial<ProjectMemory>>("projectMemory", {}) };
}

export function saveProjectMemory(memory: ProjectMemory): void {
  write("projectMemory", { ...memory, updatedAt: new Date().toISOString() });
}

export function loadFailures(): FailureNote[] {
  return read<FailureNote[]>("failures", []);
}

export function pushFailure(note: FailureNote): FailureNote[] {
  const next = [note, ...loadFailures()].slice(0, 50);
  write("failures", next);
  return next;
}

interface WorkflowStat {
  success: number;
  failed: number;
}

export function recordWorkflowOutcome(key: string, ok: boolean): void {
  const stats = read<Record<string, WorkflowStat>>("workflowStats", {});
  const current = stats[key] ?? { success: 0, failed: 0 };
  if (ok) current.success += 1;
  else current.failed += 1;
  stats[key] = current;
  write("workflowStats", stats);
}

export function loadWorkflowStats(): Record<string, WorkflowStat> {
  return read<Record<string, WorkflowStat>>("workflowStats", {});
}

export function loadXrayCache<T>(scannedAt: string | null): T | null {
  if (!scannedAt) return null;
  const cached = read<{ scannedAt: string; data: T } | null>("xrayCache", null);
  if (!cached || cached.scannedAt !== scannedAt) return null;
  return cached.data;
}

export function saveXrayCache<T>(data: T): void {
  write("xrayCache", { scannedAt: new Date().toISOString(), data });
}
