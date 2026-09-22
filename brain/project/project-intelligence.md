# PROJECT INTELLIGENCE — templates & checklists

These templates create the persistent memory layer of the Development OS.
Per-project artifacts live in the project root under `.opencode/brain/`
(created on first scan). Secrets are NEVER stored here.

## PROJECT DNA — `PROJECT_DNA.md` (S4)

Written when entering a project or after major changes. Compact, internal-use.

```markdown
# PROJECT DNA
Stack: <framework, language, styling, data, deploy>
Architecture: <app router / pages / mono / micro / etc.>
Conventions: <naming, imports, component isolation, no `any`, ...>
Commands: build=`...` lint=`...` typecheck=`...` test=`...` dev=`...`
Entry points: <files that matter most>
Components: <core dirs/patterns>
API routes: <list>
Database: <provider, tables, RLS notes>
Security baseline: <headers, zod validation, rate limits enforced?>
Testing strategy: <framework/commands or NONE-to-add>
Deployment: <vercel/ci/docker + env needs>
Risk areas: <tech debt, known fragility>
Known TODOs: <...>
Known technical debt: <...>
```

## PROJECT MEMORY — `MEMORY.md` (S12)

Long-term decisions. Append-only; add timestamp + confidence. Never trust stale
entries blindly — re-verify if >1 quarter old.

```markdown
## Decisions
- <date> <confidence> <decision + why + who-what-trades>
## Conventions
- <date> <rule> (e.g. "use proxy.ts not middleware.ts", "no `as` casts")
## APIs / services
- <name> → <purpose / how to use>
## UI language
- <tokens, fonts, accent, spacing pattern>
## Rejected approaches
- <date> <what + why rejected>  ← prevents re-litigating
## Bugs already solved
- <bug + fix + file>
## Testing / deployment setup
- <commands, pipelines, env assumptions>
## User preferences
- point to preferences.md
```

## LESSONS — `LESSONS.md` (S3, S34) failure + evolution memory

```markdown
## Pattern: <short name>
Observed: 2+ occurrences (list events w/ dates)
Cause: <root cause>
Fix: <what worked>
Prevention: <rule to apply next time>
Confidence: high|medium|low
```
Single failures are logged in the session only — NOT promoted to lessons until
the same class repeats. Never mutate behavior on one data point.

## PREFERENCES — `PREFERENCES.md` (S35)

User corrections that repeat (≥2×) become stable preferences:
coding style · libraries · UI style · structure · explanation depth · testing.
Mark `stable` vs `temporary`. Do not overlearn from one-off requests.

## IMPACT ANALYSIS — `IMPACT.md` (S14)

Run before large modifications:

```markdown
FILES AFFECTED
DEPENDENCIES AFFECTED
APIS AFFECTED
DATABASE IMPACT
TEST IMPACT
UI IMPACT
SECURITY IMPACT
DEPLOYMENT IMPACT
→ VERIFICATION SCOPE (what to run after: tsc/lint/build/tests/browser/DB check)
```

## STATE SUMMARY — `STATE.md` (S22) context compression

`PROJECT_STATE · ARCHITECTURE · CURRENT_TASK · RECENT_CHANGES · KNOWN_ISSUES ·
IMPORTANT_FILES`. Refresh after major changes so a new session can catch up
in one read instead of re-reading the tree.

## CHANGE PLAN (S20) — used inside command prompts

```markdown
GOAL / AFFECTED FILES / DEPENDENCIES / IMPLEMENTATION STEPS
TESTS / RISKS / ROLLBACK (backup or git checkpoint)
```

## GIT INTELLIGENCE (S21)

- Before risky work: `git status` + `git diff`; create a checkpoint if useful
  (stash/commit only when the user allows commits).
- After: re-run tests, inspect `git diff`, summarize changes.
- NEVER commit/push without explicit instruction.