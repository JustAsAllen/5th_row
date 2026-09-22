# Opencode DEVELOPMENT OS — Central Brain

This is the persistent knowledge + orchestration layer of the AI Development
OS. Architecture: see `ARCHITECTURE.md`.

## Layout

| Path | Contents |
|---|---|
| `capability/` | Capability registry (tools/MCP/skills/agents map) + decision rules (classifier → planner → selector) |
| `dex/` | Agent dex (roster/specialties/weaknesses) + tool profiles & fallbacks |
| `project/` | Templates: PROJECT DNA, memory, lessons, preferences, impact, state summary |
| `engines/` | Self-healing debug, red-team, visual QA, performance, security, scorecard |
| `design/` | DESIGN DNA presets (APPLE-LIKE, PREMIUM-SAAS, EDITORIAL, CYBERPUNK, ...) |
| `recipes/` | Automation recipe index |
| `live/agents/` | Authoritative subagent definitions (12) |
| `live/commands/` | Authoritative mode-command definitions (11) |
| `skills/` | Lazy-loaded workflow skills (6) — registered via `skills.paths` |
| `tools/sync.mjs` | Mirrors `live/agents` + `live/commands` into `~/.config/opencode/` |
| `backups/` | Config backups (DELIBERATELY gitignored — may contain secrets; kept out of the repo) |

## How a task flows (S38)

```
INTENT → CAPABILITY LOOKUP → CLASSIFIER → PROJECT DNA → PLANNER
→ AGENT/MCP/TOOL SELECTION → EXECUTION → VERIFICATION → RED TEAM
→ SELF-REVIEW → DELIVERY (IMPLEMENTED/TESTED/VERIFIED/LIMITATIONS)
```

## Skills (lazy-loaded, zero cost until triggered)

- `core-intelligence` — classify, autonomy level, select, verify, learn
- `war-room` — multi-agent sequencing + hand-off protocol
- `project-intelligence` — DNA/memory/impact/state
- `quality-engines` — debug/red-team/visual/perf/security/scorecard
- `design-intelligence` — design DNA + presets
- `workflow-recipes` — recipes, test-gen, dependency, feature triage

## Commands (modes)

`/build` · `/goated` · `/red-team` · `/production-check` · `/security-audit` ·
`/performance-audit` · `/visual-qa` · `/benchmark` · `/research` ·
`/experiment` · `/recipe`

## Agents (dex)

`architect` · `frontend` · `backend` · `database` · `security`(RO) ·
`debugger` · `researcher`(RO) · `performance`(RO) · `red-team`(RO) ·
`qa` · `visual-qa`(RO) · `devops`
(RO = read-only auditor; never self-fix its own findings.)

## Keeping brain ↔ live config in sync

After editing anything under `live/`:

```
node brain/tools/sync.mjs
```

Then restart opencode (config is loaded at startup, not hot-reloaded).

## Rules that hold everywhere

- Preserve all existing capabilities; this layer only adds intelligence.
- NEVER store secrets in memory/doc files. `.env.local` stays gitignored.
- Irreversible actions (delete, commit/push, deploy prod, credentials) always
  require explicit user authorization.
- `VERIFIED` only when evidenced; `UNKNOWN` stays UNKNOWN.