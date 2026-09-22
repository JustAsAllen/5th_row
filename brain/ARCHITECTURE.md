# ARCHITECTURE — Opencode as an AI Development OS

**Date:** 2026-09-22
**Status:** Proposed → Implemented incrementally
**Guiding principle:** MORE INTELLIGENCE PER TOOL. No new tools for the sake of new tools. Preserve everything that exists.

---

## 1. What already exists (inventory)

| Layer | What | Where |
|---|---|---|
| MCP servers | playwright, puppeteer, chrome-devtools, context7, filesystem, firecrawl | `~/.config/opencode/opencode.jsonc` |
| Skills (global) | 5th-row, client-project, responsive-testing, rive-animation, supabase-backend, ui-ux-premium, website-cloner | `~/.config/opencode/skills/` |
| Skills (repo mirror) | same 7 skills | `5th_row/.opencode/skills/` |
| Agents | built-in `build`, `plan`, `general`, `explore` | opencode built-ins |
| Commands | none | — |
| Plugins | none | — |
| Browser tools | chrome-devtools, playwright, puppeteer MCPs | config above |
| Web/research | firecrawl (search/scrape/crawl/agent), context7 (docs), webfetch, websearch | MCP + native |

**Everything above is preserved as-is. Nothing is removed or regressed.**

---

## 2. What is missing → what this upgrade adds

| # | Capability | Vehicle | Home |
|---|---|---|---|
| S1 | Capability registry + routing | skill `core-intelligence` + `brain/capability/capability-registry.json` | repo brain |
| S2 | Agent "dex" metadata | `brain/dex/agents.md` | repo brain |
| S3 | Agent evolution / lessons | `brain/project/lessons.md` + project memory rules | repo brain |
| S4 | Autonomous project scanner (PROJECT DNA) | skill `project-intelligence` + template | repo brain |
| S5 | Task intelligence engine | skill `core-intelligence` (classifier) | repo brain |
| S6 | Multi-agent war room | skill `war-room` + subagents | live agents + repo |
| S7 | Red-team mode | `/red-team` command + `brain/engines/red-team.md` | live commands + repo |
| S8 | Visual QA engine | skill `quality-engines` + `/visual-qa` | live + repo |
| S9 | Design intelligence + presets | skill `design-intelligence` + `brain/design/presets.md` | repo brain |
| S10 | MCP orchestrator (smallest necessary set + fallback) | `core-intelligence` decision rules | repo brain |
| S11 | Tool fusion workflows | `brain/recipes/index.md` + `workflow-recipes` skill | repo brain |
| S12 | Persistent project memory | `brain/project/memory.md` template | repo brain |
| S13 | Codebase graph | `project-intelligence` (implicit dependency map) | repo brain |
| S14 | Impact analysis | `brain/project/impact.md` checklist | repo brain |
| S15 | Automatic test generation | `workflow-recipes` + `core-intelligence` | repo brain |
| S16 | Self-healing debug loop | `brain/engines/debug.md` + `quality-engines` | repo brain |
| S17 | Performance engine | `/performance-audit` + `brain/engines/performance.md` | live + repo |
| S18 | Security engine | `/security-audit` + `brain/engines/security.md` | live + repo |
| S19 | Dependency intelligence | `workflow-recipes` | repo brain |
| S20 | Change management plan | `project-intelligence` (CHANGE PLAN) | repo brain |
| S21 | Git intelligence | `project-intelligence` | repo brain |
| S22 | Context compression | `brain/project/state.md` summary protocol | repo brain |
| S23 | Research mode | `/research` command | live + repo |
| S24 | Build mode | `/build` command | live + repo |
| S25 | "Make it goated" mode | `/goated` command | live + repo |
| S26 | Project scorecard | `brain/engines/scorecard.md` | repo brain |
| S27 | Feature discovery engine | `brain/recipes/index.md` (IDEA→REJECTED pipeline) | repo brain |
| S28 | Automation recipes | `/recipe` + `brain/recipes/index.md` | live + repo |
| S29 | Production readiness | `/production-check` command | live + repo |
| S30 | Experiment lab | `/experiment` command (sandbox) | live + repo |
| S31 | Benchmark mode | `/benchmark` command | live + repo |
| S32 | Auto-documentation | `workflow-recipes` | repo brain |
| S33 | Agent communication protocol | `war-room` skill (structured hand-off) | repo brain |
| S34 | Failure memory | `brain/project/lessons.md` | repo brain |
| S35 | User preference engine | `brain/project/preferences.md` | repo brain |
| S36 | Safe autonomy levels | `core-intelligence` (L0–L4 gating) | repo brain |
| S37 | Final verification engine | `core-intelligence` ("done" = TESTED+VERIFIED) | repo brain |
| S38 | Meta-architecture pipeline | ARCHITECTURE.md + brain README | repo brain |

---

## 3. Design decisions (why this shape)

1. **Skills = passive workflow knowledge.** Lazy-loaded only when triggered → zero token cost until needed. `skills.paths` in the global config points at `5th_row/brain/skills/`, so the **repo is the single source of truth** for new knowledge.
2. **Commands = explicit modes.** Slash commands are the correct vehicle for "modes" (`/build`, `/goated`, `/red-team`, ...). Each is a small prompt that wires the relevant skills + agents + tools.
3. **Agents = persistent subagents.** Defined as `.md` files in `~/.config/opencode/agent/`. Authoritative copies live in `brain/live/agents/`; a sync script mirrors them. Lazy — only spawned when explicitly invoked.
4. **Registry = one JSON file.** Machine-readable capability map that decision rules + skills reference (not a config dump).
5. **No new MCP servers.** The 6 existing ones already cover everything. Only routing intelligence is added.
6. **No plugins yet.** Hook-based plugins add startup hazard. If a real hook need appears (e.g. auto-logging), add one plugin carefully later.
7. **Backward compatible.** Existing config keys untouched except adding `skills.paths`. All new files are additive.

---

## 4. Where each component lives (final map)

```
C:\Users\Allen Saji\Desktop\5th_row\brain\        ← CENTRAL BRAIN (source of truth, committed)
├── README.md                                     ← index + how to use everything
├── ARCHITECTURE.md                               ← this document
├── backups\                                      ← config backups before changes
├── capability\
│   ├── capability-registry.json                  ← registry (S1)
│   └── decision-rules.md                         ← classifier → planner → selector (S5,S10,S11)
├── dex\
│   ├── agents.md                                 ← agent Pokédex (S2)
│   └── tools.md                                  ← tool profiles, pairings, fallbacks
├── project\
│   ├── project-dna.md                            ← scanner output template (S4)
│   ├── memory.md                                 ← project memory template (S12)
│   ├── lessons.md                                ← evolution + failure memory (S3,S34)
│   ├── preferences.md                            ← preference engine (S35)
│   ├── impact.md                                 ← impact analysis template (S14)
│   └── state.md                                  ← context compression summary (S22)
├── engines\
│   ├── debug.md                                  ← self-healing loop (S16)
│   ├── red-team.md                               ← adversarial checklist (S7)
│   ├── visual-qa.md                              ← visual pipeline (S8)
│   ├── performance.md                            ← perf checks (S17)
│   ├── security.md                               ← security checks (S18)
│   └── scorecard.md                              ← qualitative scorecard (S26)
├── design\
│   └── presets.md                                ← DESIGN DNA presets (S9)
├── recipes\
│   └── index.md                                  ← automation recipes (S28,S27,S11,S19,S32)
├── live\
│   ├── agents\*.md                               ← subagent definitions (copied → ~/.config/opencode/agent)
│   └── commands\*.md                             ← mode commands (copied → ~/.config/opencode/command)
├── tools\
│   └── sync.mjs                                  ← node sync script (agents + commands → live config)
└── skills\
    ├── core-intelligence\SKILL.md
    ├── war-room\SKILL.md
    ├── project-intelligence\SKILL.md
    ├── quality-engines\SKILL.md
    ├── design-intelligence\SKILL.md
    └── workflow-recipes\SKILL.md

Live config (`~/.config/opencode/`):
├── opencode.jsonc          ← + "skills.paths": ["C:\\Users\\Allen Saji\\Desktop\\5th_row\\brain\\skills"]
├── agent\*.md              ← synced from brain/live/agents
└── command\*.md            ← synced from brain/live/commands
```

---

## 5. Runtime pipeline (S38)

```
USER INTENT
  → CAPABILITY LOOKUP (registry)
  → TASK CLASSIFIER (category + autonomy level)
  → PROJECT DNA (loaded/refreshed)
  → MASTER PLANNER (change plan / hand-off)
  → AGENT + MCP + TOOL SELECTION (smallest necessary set)
  → EXECUTION
  → VERIFICATION (tests / visual / performance / security as appropriate)
  → RED TEAM (for major features, on request)
  → SELF-REVIEW (lessons, memory update)
  → DELIVERY (IMPLEMENTED / TESTED / VERIFIED / KNOWN LIMITATIONS)
```

---

## 6. Implementation phases

- **Phase 1 (done):** backup config, brain skeleton, this doc.
- **Phase 2:** capability registry + `core-intelligence` skill (S1,S5,S10,S33,S36,S37,S38).
- **Phase 3:** agent dex + 10 subagent definitions + `war-room` skill (S2,S3,S6).
- **Phase 4:** `project-intelligence` skill + project templates (S4,S12,S13,S14,S20,S21,S22,S34,S35).
- **Phase 5:** `quality-engines` skill + engine checklists (S7,S8,S16,S17,S18,S26).
- **Phase 6:** `design-intelligence` + presets (S9).
- **Phase 7:** mode commands (`/build`, `/goated`, `/red-team`, `/production-check`, `/security-audit`, `/performance-audit`, `/benchmark`, `/research`, `/experiment`, `/visual-qa`, `/recipe`) + `workflow-recipes` skill (remaining items).
- **Phase 8:** wire `skills.paths`, sync agents+commands, validate config, test, commit + push.

---

## 7. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Config schema error breaks startup | Validate against `https://opencode.ai/config.json`; only additive keys; backup first |
| Skill duplicate-name collision | New skills live in `brain/skills` only; existing 7 skills untouched |
| Token bloat | Skills lazy-loaded; registry is one JSON; commands are tiny prompts |
| Agents drift from repo | `tools/sync.mjs` + documented re-sync step |
| Committing secrets | `.env.local` stays gitignored; no keys written into brain files |
| Over-optimization (destructive) | No feature removed; everything additive |