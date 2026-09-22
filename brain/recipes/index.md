# Automation Recipes (S28) — workflows that combine existing tools

Every recipe = a named sequence of the existing capabilities (no new tools).
The `workflow-recipes` skill loads the full bodies; this is a quick index.

| Recipe | Purpose | Pipeline |
|---|---|---|
| new-next-app | scaffold a portable Next.js app | `create-next-app` → 5th_row skill patterns → shadcn → supabase layer → security headers |
| premium-dashboard | SaaS-grade dashboard page | de-sign preset → shadcn → framer-motion → visual QA |
| auth-setup | Supabase email auth + protected routes | supabase-backend skill → proxy.ts session → RLS → test signup |
| api-feature | one API route hardened | zod validation → rate-limit headers → tests |
| database-migration | schema change safely | schema audit → migration → RLS re-check → impact analysis |
| bug-investigation | root-cause a failure | debug loop engine → fix → regression |
| responsive-audit | breakpoint checks | visual-qa engine (desktop/tablet/mobile) |
| security-audit | pre-release security pass | security engine → npm audit → red-team criticals |
| performance-audit | measure + improve speed | performance engine → trace → fix → re-measure |
| landing-upgrade | bring landing to premium | design DNA → ui-ux-premium → rive micro-interactions → visual QA |
| github-pr-review | review PR without merging to main | `gh` → read diff → reviewer agent → report |
| dependency-upgrade | safe dep bump | context7 docs → npm audit → changelog → test → build |
| refactor-module | contained refactor | codebase graph (S13) → impact (S14) → checkpoint → change → test → diff |
| production-check | full ship gate | production-check command |

## Feature discovery (S27)
Maintain in project memory under `IDEAS/SHORTLIST/APPROVED/IMPLEMENTED/REJECTED`.
NEVER auto-implement speculative features — surface ideas, let the user approve.

## Dependency intelligence (S19)
Before adding any dependency:
1. does an existing dep already solve it?  2. current docs (context7).
3. maintenance status + weekly downloads.  4. compatibility with the stack.
5. bundle impact.  6. security advisories. Prefer project conventions.