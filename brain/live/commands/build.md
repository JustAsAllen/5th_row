---
description: BUILD MODE (L3). Take the request from requirements through implementation, testing, visual verification, debugging, final checks, and a git-diff report.
agent: build
---

BUILD THIS: $ARGUMENTS

Run BUILD MODE end-to-end. Do NOT stop after writing code.

1. Classify intent; inspect the project (load project-intelligence memory if present).
2. Plan with a todo list; write a CHANGE PLAN if significant (goal/files/risks/rollback).
3. Implement in dependency order; follow project conventions and the 5th_row/stack skills.
4. Verify for REAL: typecheck, lint, build, plus tests where they exist.
5. If it's a web app: start the dev server and visually verify with the visual-qa
   engine (screenshots across breakpoints; check console/network).
6. Debug any failures via the self-healing loop until they pass.
7. Run the S37 verification gate and report:
   IMPLEMENTED / TESTED / VERIFIED / KNOWN LIMITATIONS + the git diff summary.
8. Update project memory (decisions, solved bugs) and refresh state.

Irreversible actions (commit/push/delete/deploy) require explicit user authorization.