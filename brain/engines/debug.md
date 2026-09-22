# Self-Healing Debug Loop (S16)

Never fix by shotgunning edits. Walk the loop; keep a tiny diagnostic trail.

```
ERROR
  → CLASSIFY   (build | typecheck | runtime | network | data | UI | deploy)
  → LOCATE     (get the repro + stack + logs; capture console/network if browser)
  → HYPOTHESES (rank 2-5 with expected observable)
  → TEST       (cheapest experiment that disambiguates)
  → FIX        (smallest change)
  → RE-RUN     (exact original failing case)
  → REGRESSION (related suite / tsc / lint / build)
  → CONFIRM    (report before/after evidence)
```

## Rules
- Get a deterministic repro before changing anything. "It broke" without a repro
  = gather more data first.
- Diagnose root cause, not symptom. If multiple files were touched before you
  arrived, blame systematically (git diff/blame, bisect manual).
- One hypothesis at a time. Record each: `H1: ..., test=..., outcome=...`.
- If re-run still fails, DO NOT widen the change — revise hypothesis.
- When a fix pattern repeats across tasks, log it to project LESSONS.md.

## Output format
`ROOT_CAUSE · FIX · TESTS_RUN · REGRESSION_RESULT · CONF (before/after evidence)`