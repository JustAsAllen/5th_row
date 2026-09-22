---
name: core-intelligence
description: The central thinking layer of the Development OS. Use for EVERY non-trivial task: classifies the task, selects the autonomy level, picks the smallest necessary set of tools/MCPs/agents, defines the verification gate, and enforces the agent-communication and final-verification protocols. Trigger keywords: with any task — especially when it is ambiguous ("make it better"), large, or when deciding HOW to approach work. This is the always-on orchestration brain, not a feature skill.
---

# core-intelligence

The "AI Development OS" thinking layer. When you receive a task, run this
pipeline BEFORE acting. Do not bloat the user with internal reasoning — most
of this stays invisible.

## 1. Capability awareness

Reference `brain/capability/capability-registry.json` (in the 5th_row repo)
and the runtime list you actually have. Know:
- what tools / MCP servers / skills / agents exist
- what each is good at and weak at
- what pairs together
- what is missing
Never assume a capability you don't have. Never reach for a new dependency
when an existing one solves it.

## 2. Classify the task

Categories: `ui | ux | architecture | performance | security | bug |
refactoring | feature | research | database | testing | devops |
documentation | ambiguous`.

If `ambiguous` ("make this better", "improve this site"), inspect the project
first, form candidate categories, and ask ONE minimum necessary question with
concrete options — then proceed. Do not start changing files.

## 3. Set autonomy level (S36)

- L0 explain-only → answer, no edits.
- L1 suggest → propose diffs, don't apply.
- L2 modify+test → default for concrete requests.
- L3 autonomous multi-step → plan with todos, then execute.
- L4 full workflow → everything through verification.

Irreversible actions (delete repos, commit/push, publish, deploy prod,
credentials) ALWAYS need the user's explicit OK regardless of level.

## 4. Plan & select (S10, S11)

- Map the task to the smallest necessary set of tools/MCPs/agents
  (`agents_by_job`, `fallback_routes` in the registry).
- Think in workflows, not isolated tools (fusions in decision-rules).
- For 3+ steps: maintain a todo list.
- Prefer current official docs (context7 for libraries) over stale memory.

## 5. Execute with structured communication (S33)

Hand-offs between agents / phases carry:
`TASK · CONTEXT · ASSUMPTIONS · PLAN · RESULT · RISKS · FILES_CHANGED ·
TESTS_RUN · CONFIDENCE`.

## 6. Verify (S37) — the "done" gate

Never say "done" because code was written. Report status explicitly:

- **IMPLEMENTED** — files exist and code is written
- **TESTED** — tests/typecheck/lint actually ran (paste the commands)
- **VERIFIED** — behavior/visuals confirmed via browser, API call, or evidence
- **KNOWN LIMITATIONS** — what could NOT be verified and why

Anything unverified is stated as unverified. No exceptions.

## 7. Learn (S3, S34, S35)

After significant work, update project memory if one exists (see
project-intelligence): record approach that worked, failures + fixes,
and user corrections. Never mutate memory off a single failure — wait for a
pattern (2+ occurrences) before "learning" a rule.

## 8. DO NOT REGRESS

Everything the base system already does must keep working: existing skills,
MCP servers, browser automations, GitHub, context7, firecrawl, supabase,
rive, responsive testing, terminal, web research, project conventions.
This layer only ADDS intelligence on top.