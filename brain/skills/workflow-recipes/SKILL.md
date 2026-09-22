---
name: workflow-recipes
description: Reusable end-to-end workflows for common jobs — scaffolding apps, adding features, audits, refactors, upgrades. Also governs test generation, feature-discovery triage, and dependency intelligence. Use when the user asks for a recipe-level job ("scaffold", "add auth", "audit", "upgrade", "refactor", "dashboard", "migration"). Trigger keywords: recipe, scaffold, add auth, new feature, audit, upgrade, refactor, migration, feature idea.
---

# workflow-recipes

Compose existing tools into proven sequences. Full index: `brain/recipes/index.md`.

## Core editing rules
1. **Test generation (S15):** add tests around HIGH-RISK logic only (auth,
   payments, transforms, edge cases). Do NOT generate pointless tests for
   trivial code. Use the project's existing test setup; never invent a stack.
2. **Feature discovery (S27):** file ideas as IDEAS → SHORTLIST. Only
   APPROVED (by the user) items get built. No speculative features.
3. **Dependency intelligence (S19):** check existing deps → context7 docs →
   maintenance → compatibility → bundle → security before adding anything.
4. **Auto-documentation (S32):** after major changes, update README + setup +
   env var docs ONLY where truth changed. Don't rewrite documentation for fun.
5. **Change plans (S20):** for significant work, run:
   `GOAL · FILES · DEPS · STEPS · TESTS · RISKS · ROLLBACK`. Backup / git
   checkpoint before destructive parts. After: inspect diff, summarize.
6. **Experiment lab (S30):** try uncertain ideas in an isolated dir (e.g.
   `scratch/<idea>/`), benchmark vs the real thing, then integrate or discard.
   Never let experiments contaminate the main tree.
7. **Research mode (S23):** QUESTION → web search → primary/official sources →
   docs/papers → cross-check → synthesize → THEN implement. Current docs beat memory.

## Common recipes (full list in recipes/index.md)
- **new-next-app** — scaffold + apply 5th_row hardened patterns.
- **auth-setup** / **api-feature** / **database-migration** — backend slices.
- **responsive-audit** / **security-audit** / **performance-audit** — audits.
- **landing-upgrade** — design DNA + premium polish + rive + visual QA.
- **dependency-upgrade** / **refactor-module** / **production-check**.

Pick the narrowest recipe; don't run a fleet for a small change.