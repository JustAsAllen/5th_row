---
description: RED TEAM. Adversarially try to break the current build/feature: security, edge cases, bad inputs, races, mobile, a11y, performance, API/DB failures. Reports breaches; then a separate fix pass.
agent: build
---

Red-team the current feature/build: $ARGUMENTS

Follow engines/red-team.md. Adversarial, fair, evidence-based:
1. Enumerate the attack surface relevant to this change.
2. ACTIVELY attempt failures (browser, malformed payloads, unusual viewports,
   rapid interactions, missing auth) — don't only read code.
3. Report each: HOW_TO_ATTACK → EXPECTED → ACTUAL → SEVERITY[CRIT|HIGH|MED|LOW].
4. Keep the review read-only. Then run a SEPARATE fix pass, apply fixes for
   CRITICAL/HIGH (ask user before fixing CRITICALs if ambiguous), re-attempt,
   and report re-verified status.
5. Deliver the S37 gate + findings summary.

Never print secret values — report location + redacted hint.