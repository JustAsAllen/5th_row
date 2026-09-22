---
name: war-room
description: Multi-agent orchestration for complex features. Use when a task is large enough to need specialization and sequencing — e.g. building a full dashboard, platform, or system — or when several specialist agents should critique before implementation. Trigger keywords: war room, multi-agent, build a system/dashboard/platform, complex feature, orchestrate agents.
---

# War-Room (S6 · S3 · S33)

For complex tasks, don't let specialists edit the same files independently.
Sequence them:

```
ARCHITECT → DESIGN → IMPLEMENT → REVIEW → TEST → FIX
```

## When to use

- Multi-surface feature (UI + API + DB + auth + tests).
- Architecture ambiguity ahead of implementation.
- "Build an AI SaaS dashboard"-scale requests.

Small tasks stay with the main agent/war-room is wasted latency.

## Protocol

1. **Assemble (select from dex)** — only the specialists actually needed:
   architect, frontend, backend, database, security, qa, visual-qa, red-team, ...
2. **Phase 1 Architect** — propose plan. **Phase 1.5 Critique** — one other
   specialist (database or security as relevant) critiques the plan BEFORE code.
   Resolve disagreements explicitly.
3. **Phase 2 Implement** — one implementer at a time per slice, in dependency
   order (DB→backend→frontend). Keep slices small and verified.
4. **Phase 3 Review** — security/performance red flags read-only.
5. **Phase 4 Test** — qa + visual-qa. **Phase 5 FIX loop** — findings return to
   the implementer; reviewers never self-fix their own findings.
6. **Deliver** — one consolidated hand-off (S33 card), files changed, tests
   run, confidence, known limitations. "done" only after verification (S37).

## Agent communication protocol (S33)

Every hand-off is the card:

```
AGENT <name> · TASK <asked> · CTX <loaded> · ASSUMPTIONS <made>
PLAN <approach> · RESULT <outcome> · RISKS <open>
FILES <changed/read> · TESTS <run + result> · CONF <high|medium|low>
```

## Evolution / learning (S3)

- After the feature: record in project memory what approach worked/failed,
  common errors hit, and user corrections. Apply learnings only when a pattern
  repeats (≥2×); never flip behavior on a single event.
- OBSERVE → RECORD → IDENTIFY PATTERN → VALIDATE → PROPOSE → APPLY-WHEN-SAFE.

## Invocation from a command

The bundled commands (`/build`, `/goated`, `/production-check`, ...) will call
this orchestration automatically for L3/L4 tasks.