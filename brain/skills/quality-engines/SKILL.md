---
name: quality-engines
description: The verification layer of the Development OS. Use before declaring implementation complete or for audits — self-healing debug loop, red-team adversarial review, visual QA pipeline, performance measurement, security scan, and the qualitative scorecard. Trigger keywords: verify, does it work, test it, audit, red team, production check, performance, security, scorecard, visual check, is it broken.
---

# quality-engines

How the Development OS proves things work instead of assuming it.

## Choose the engine

| Want | Engine |
|---|---|
| runtime failure → fix | debug loop (`engines/debug.md`) |
| attempt to break a finished feature | red team (`engines/red-team.md`) |
| does the page actually look/behave right | visual QA (`engines/visual-qa.md`) |
| is it fast / measure the win | performance (`engines/performance.md`) |
| is it safe / no secrets / RLS ok | security (`engines/security.md`) |
| overall health per dimension | scorecard (`engines/scorecard.md`) |

## Verification gate (S37) — reused everywhere

Deliver as: **IMPLEMENTED · TESTED · VERIFIED · KNOWN LIMITATIONS**.
- `TESTED` = commands that actually ran (show them).
- `VERIFIED` = evidence (screenshots, responses, audit numbers).
- Never promote `UNKNOWN` results to `VERIFIED`.
- If a step couldn't run, list it under KNOWN LIMITATIONS.

## Integration

- `/red-team`, `/performance-audit`, `/security-audit`, `/visual-qa`,
  `/production-check`, `/benchmark` commands invoke these engines.
- Read-only auditors (security, performance, red-team) never fix their own
  findings; a separate pass does.
- Update the project scorecard after audits.