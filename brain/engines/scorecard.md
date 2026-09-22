# Project Scorecard (S26)

Qualitative statuses per dimension (NEVER a single meaningless number):

```
UNKNOWN (not checked yet) · NEEDS WORK · GOOD · VERIFIED (evidence-backed)
```

## Dimensions
Architecture · Code quality · Security · Performance · Accessibility ·
Testing · UX · Responsive design · Maintainability · Documentation · Reliability

## Rules
- `VERIFIED` ONLY after actually checking (tests run, browser open, audit done).
- Track per-dimension with one-line evidence + date.
- Scorecard lives in `.opencode/brain/SCORECARD.md` per project.
- Re-read before production-check; re-verify stale rows.

## Format
```markdown
| Dimension | Status | Evidence | Date |
|---|---|---|---|
| Architecture | VERIFIED | typecheck+lint+build pass; no circular imports | 2026-09-22 |
| ...
```
DO NOT average dimensions into one score.