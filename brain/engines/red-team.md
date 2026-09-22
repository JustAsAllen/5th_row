# Red Team — Adversarial Review Checklist (S7)

Run BEFORE declaring a major feature complete (on request or as part of
`/production-check`). Attempt, don't just eyeball.

## Attack surface
- Security: auth bypass, authz escalation, IDOR, injection, CSRF, open CORS,
  secrets in bundle, headers missing.
- Edge cases: empty states, nulls, max lengths, unicode, duplicate submits.
- Bad inputs: malformed JSON, oversized payloads, wrong types, negative numbers.
- Races: double-click, rapid refresh, concurrent writes, stale sessions.
- Mobile: cramped layout, tapped targets, scroll traps, 100vh bugs.
- Accessibility: missing labels/alt, focus order, contrast, keyboard nav.
- Performance: big bundle, unoptimized images, N+1, blocking waterfall.
- API/DB failures: timeout handling, error surfaces, transaction safety.
- Dependency: known-vulnerable or outdated critical deps.

## Protocol
1. For each attack: `HOW_TO_ATTACK → EXPECTED → ACTUAL → SEVERITY[CRIT|HIGH|MED|LOW]`.
2. Only real exploitability matters; no fake "must be perfect" nits.
3. Reviewer stays adversarial + read-only. A SEPARATE fix pass applies changes.
4. After fixes: re-attempt the critical/high ones; report re-verify results.
5. Output: `ATTACKS_TRIED · BREACHES (fixed or open) · NON_ISSUES_CHECKED · CONF`.