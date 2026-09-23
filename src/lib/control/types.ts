// Shared data models for the 5TH ROW Master Control Center.

export type ExecutionMode = "plan" | "prompt" | "approval" | "autonomous" | "expert";

export type IntentCategory =
  | "ui"
  | "ux"
  | "architecture"
  | "performance"
  | "security"
  | "bug"
  | "refactoring"
  | "feature"
  | "research"
  | "database"
  | "testing"
  | "devops"
  | "documentation"
  | "ambiguous";

export type ProjectDomain =
  | "frontend"
  | "backend"
  | "fullstack"
  | "infrastructure"
  | "research"
  | "unknown";

export interface AmbiguitySignal {
  detected: boolean;
  reason: string;
  dimensions: string[];
}

export interface Intent {
  raw: string;
  objective: string;
  categories: IntentCategory[];
  primary: IntentCategory;
  domain: ProjectDomain;
  styles: string[];
  constraints: string[];
  surfaces: string[];
  likelyCapabilities: string[];
  strategy: string[];
  actionSeed: string | null;
  ambiguity: AmbiguitySignal | null;
  /** Heuristic 0–1: how many clear signals matched. Not a real confidence score. */
  signalStrength: number;
}

export type CapabilityKind = "agent" | "skill" | "command" | "engine" | "mcp" | "tool";

export interface RankedCapability {
  id: string;
  kind: CapabilityKind;
  label: string;
  reason: string;
  score: number;
}

export interface RouteResult {
  domain: ProjectDomain;
  capabilities: RankedCapability[];
  agents: string[];
  skills: string[];
  commands: string[];
  mcps: string[];
  rationale: string[];
}

export type StepStatus = "waiting" | "running" | "success" | "warning" | "failed" | "skipped";
export type StepExecutor = "local" | "shell" | "opencode" | "none";

export interface WorkflowStep {
  id: string;
  label: string;
  description: string;
  status: StepStatus;
  executor: StepExecutor;
  capability: string;
  agent: string;
  tool: string;
  /** For shell executor: whitelisted action id from /api/actions. */
  actionId?: string;
  /** For local executor: xray | workflow | prompt. */
  localKind?: "xray" | "workflow" | "prompt";
  output?: string;
  error?: string;
  ms?: number;
  detail?: string;
}

export interface Workflow {
  id: string;
  createdAt: string;
  request: string;
  intent: Intent;
  route: RouteResult;
  steps: WorkflowStep[];
}

export interface PromptContext {
  xray: ProjectXRay | null;
  projectMemory: ProjectMemory | null;
  promptStyle: "concise" | "standard" | "detailed";
}

export interface OpencodeStatus {
  available: boolean;
  version: string | null;
  configFound: boolean;
  agents: string[];
  commands: string[];
  projectSkills: string[];
  brainSkills: string[];
  mcpServers: { name: string; enabled: boolean; type: string }[];
  gitBranch: string | null;
}

export interface HealthSignal {
  id: string;
  label: string;
  status: "good" | "watch" | "unknown";
  evidence: string;
  heuristic: boolean;
}

export interface ProjectXRay {
  scannedAt: string;
  rootName: string;
  framework: string;
  frameworkVersion: string;
  language: string;
  packageManager: string;
  database: string;
  architecture: string;
  styling: string;
  routes: string[];
  apiRoutes: string[];
  integrations: string[];
  scripts: string[];
  testFiles: number;
  sourceFiles: number;
  componentCount: number;
  hasReadme: boolean;
  hasAgentsMd: boolean;
  hasTests: boolean;
  hasStrictTs: boolean;
  hasSecurityHeaders: boolean;
  health: HealthSignal[];
}

export interface ProjectMemory {
  purpose: string;
  conventions: string;
  constraints: string;
  decisions: string;
  knownIssues: string;
  preferredWorkflows: string;
  updatedAt: string;
}

export interface HistoryEntry {
  id: string;
  request: string;
  prompt: string;
  createdAt: string;
  mode: ExecutionMode;
  intentPrimary: IntentCategory;
  capabilities: string[];
  agents: string[];
  skills: string[];
  mcps: string[];
  workflowSteps: { label: string; status: StepStatus }[];
  executionStatus: ExecutionStatus;
  executionOutput: string;
  warnings: string[];
  feedback: "up" | "down" | null;
}

export type ExecutionStatus =
  | "generated"
  | "awaiting-approval"
  | "executing"
  | "completed"
  | "failed"
  | "not-connected"
  | "cancelled";

export interface ControlSettings {
  defaultMode: ExecutionMode;
  model: string;
  promptStyle: "concise" | "standard" | "detailed";
  runQaAfter: boolean;
  qaActions: string[];
  executionTimeoutSec: number;
  reducedMotion: boolean;
}

export interface FailureNote {
  id: string;
  at: string;
  request: string;
  summary: string;
}

export interface GoatedOpportunity {
  id: string;
  category: string;
  title: string;
  why: string;
  evidence: string;
  workflowSeed: string;
}

export interface ActionResult {
  ok: boolean;
  action?: string;
  output?: string;
  error?: string;
  ms?: number;
}

export interface ExecuteJob {
  id: string;
  status: "running" | "completed" | "failed";
  output: string;
  exitCode: number | null;
  ms: number;
}

export type ControlView =
  | "dashboard"
  | "workflow"
  | "xray"
  | "goated"
  | "history"
  | "settings"
  | "terminal";
