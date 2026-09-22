---
name: project-intelligence
description: Project understanding and memory system. Use when entering a project for the first time, before large refactors, when a major change is requested, or when the user says "remember this" / "why did we do that" / "what's the state". Generates/reads PROJECT DNA, project memory, impact analysis, change plans, and context-compression state summaries. Trigger keywords: scan project, project structure, remember, project memory, impact analysis, what changed, change plan.
---

# project-intelligence

Sets up and maintains the per-project knowledge layer.

## On entering a project

1. If `.opencode/brain/PROJECT_DNA.md` exists → read it (fast-context win).
   Verify it's current (spot-check package.json, git log) before trusting.
2. Else → scan (compact):
   package.json + lockfiles · tsconfig · eslint/prettier · `.env.example`
   (NEVER `.env.local` — do not read or echo secrets) · README · source tree ·
   database/schema · API routes · components · tests · CI/CD · Docker ·
   recent git history. Then WRITE `PROJECT_DNA.md`. Keep it compact; don't
   dump it to the user unless asked.
3. Read `MEMORY.md` + `LESSONS.md` + `PREFERENCES.md` if present.
4. Refresh `STATE.md` after the session's major changes.

## Before large modifications

Write an IMPACT analysis (files/deps/APIs/DB/test/UI/security/deploy +
verification scope). Use it to decide what to verify after.

## After significant work

- Update MEMORY.md (decisions, rejected approaches, solved bugs) with dates +
  confidence.
- Append to LESSONS.md only on repeated patterns (S3/S34 rule).
- Record stable user corrections in PREFERENCES.md.
- Refresh STATE.md.

## Codebase graph (S13)

When changing a core file, first map what depends on it:
`component → hook → service → api → db → auth → external`. Use grep/glob on
imports BEFORE editing. Flag ripple impact in the change plan.

## Context compression (S22)

For huge projects, do NOT re-read everything each session. Read STATE.md then
targeted files. Refresh summaries only when behavior actually changed.

## Safety

Never store secrets. Treat memory as stale when evidence contradicts it.
Prioritize evidence files (code, git, running app) over memories.