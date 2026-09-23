// Capability registry — wraps brain/capability/capability-registry.json (the
// committed source of truth) and exposes a flat catalog for the router.
import registryJson from "../../../brain/capability/capability-registry.json";
import type { CapabilityKind, RankedCapability } from "./types";

interface RegistrySkill {
  scope: string;
  trigger: string;
  always?: string;
}

interface RegistryAgent {
  mode: string;
  specialty: string;
  use_for?: string;
  read_only_edit_deny?: boolean;
}

interface RegistryMcp {
  specialty: string;
  use_when: string;
  type: string;
}

interface CapabilityRegistryFile {
  version: string;
  updated: string;
  native_tools: Record<string, { specialty: string }>;
  mcp_servers: Record<string, RegistryMcp>;
  skills: Record<string, RegistrySkill>;
  agents: Record<string, RegistryAgent>;
  agents_by_job: Record<string, string[]>;
  fallback_routes: Record<string, string[]>;
}

const registry = registryJson as unknown as CapabilityRegistryFile;

export interface CatalogEntry {
  id: string;
  kind: CapabilityKind;
  label: string;
  detail: string;
  triggers: string[];
}

export function getRegistry(): CapabilityRegistryFile {
  return registry;
}

export function buildCatalog(): CatalogEntry[] {
  const entries: CatalogEntry[] = [];

  for (const [id, agent] of Object.entries(registry.agents)) {
    entries.push({
      id,
      kind: "agent",
      label: id,
      detail: agent.specialty,
      triggers: `${agent.specialty} ${agent.use_for ?? ""}`.toLowerCase().split(/\s+/),
    });
  }

  for (const [id, skill] of Object.entries(registry.skills)) {
    entries.push({
      id,
      kind: "skill",
      label: id,
      detail: skill.scope,
      triggers: skill.trigger.toLowerCase().split(/[,\s]+/).filter((t) => t.length > 2),
    });
  }

  for (const [id, mcp] of Object.entries(registry.mcp_servers)) {
    entries.push({
      id,
      kind: "mcp",
      label: id,
      detail: mcp.specialty,
      triggers: `${mcp.specialty} ${mcp.use_when}`.toLowerCase().split(/\s+/),
    });
  }

  for (const [id, tool] of Object.entries(registry.native_tools)) {
    entries.push({
      id,
      kind: "tool",
      label: id,
      detail: tool.specialty,
      triggers: tool.specialty.toLowerCase().split(/\s+/),
    });
  }

  // Quality engines + mode commands derived from the brain's live command set.
  const engines: { id: string; label: string; detail: string; triggers: string[] }[] = [
    { id: "visual-qa", label: "visual-qa", detail: "breakpoint screenshots + layout inspection", triggers: ["visual", "screenshot", "responsive", "layout", "breakpoint", "mobile"] },
    { id: "performance", label: "performance-audit", detail: "bundle, renders, Core Web Vitals", triggers: ["performance", "slow", "fast", "bundle", "lcp", "lighthouse", "optimi"] },
    { id: "security", label: "security-audit", detail: "headers, secrets, authz, RLS", triggers: ["security", "vulnerab", "auth", "leak", "secret", "harden"] },
    { id: "red-team", label: "red-team", detail: "adversarial review of finished work", triggers: ["red-team", "adversar", "attack", "break it"] },
    { id: "debug", label: "debug", detail: "self-healing root-cause loop", triggers: ["debug", "error", "broken", "crash", "exception", "fails"] },
    { id: "scorecard", label: "scorecard", detail: "per-dimension qualitative status", triggers: ["scorecard", "audit", "health", "review"] },
    { id: "goated", label: "goated", detail: "holistic intelligent upgrade pass", triggers: ["goated", "upgrade", "polish", "premium", "better"] },
    { id: "production-check", label: "production-check", detail: "ship-readiness verification", triggers: ["production", "ship", "launch", "deploy check", "release"] },
    { id: "research", label: "research", detail: "docs + web research with receipts", triggers: ["research", "investigate", "compare", "find out", "why"] },
    { id: "benchmark", label: "benchmark", detail: "measure before/after", triggers: ["benchmark", "measure", "compare performance"] },
    { id: "experiment", label: "experiment", detail: "sandboxed spike", triggers: ["experiment", "spike", "try out", "poc"] },
  ];
  for (const e of engines) {
    entries.push({ id: e.id, kind: "command", label: e.label, detail: e.detail, triggers: e.triggers });
  }

  return entries;
}

export function listAgents(): string[] {
  return Object.keys(registry.agents);
}

export function listMcpServers(): string[] {
  return Object.keys(registry.mcp_servers);
}

export function listSkills(): string[] {
  return Object.keys(registry.skills);
}

export function toRanked(entries: { entry: CatalogEntry; score: number; reason: string }[]): RankedCapability[] {
  return entries
    .filter((e) => e.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((e) => ({
      id: e.entry.id,
      kind: e.entry.kind,
      label: e.entry.label,
      reason: e.reason,
      score: Math.round(e.score * 10) / 10,
    }));
}
