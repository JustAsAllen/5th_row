---
description: SECURITY AUDIT. Read-only scan for secrets, authz, injection, CORS/headers, exposed endpoints, logging, file handling, and vulnerable deps. Prints findings + severity, suggests fixes.
agent: build
---

Security audit: $ARGUMENTS

Run engines/security.md as a READ-ONLY pass. Cover:
secrets/.env leakage in tree and bundles (~never print values), auth flows,
authorization + RLS on every table, injection vectors, CORS/security headers,
unvalidated public routes (zod), rate limiting, sensitive logging, file/path
handling, `npm audit` for CRITICAL/HIGH dependencies.

Output findings: `[CRITICAL|HIGH|MED|LOW] path → issue → suggested fix`.
Propose fixes but DO NOT apply until the user approves criticals. Update the
project scorecard Security row afterwards.