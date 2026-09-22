---
description: PRODUCTION CHECK (L4 gate). Full readiness audit: build, env, security, auth, database, errors, performance, mobile, a11y, SEO, tests, deploy, dependencies. Only claims VERIFIED rows with evidence.
agent: build
---

Production readiness check: $ARGUMENTS

Run the full gate. Do NOT claim production-ready without verification:
- build (production build passes) + typecheck + lint
- env: referenced vars present in .env.example; no secrets committed
- security engines: headers, zod validation, rate limits, npm audit, secret scan
- auth: protected routes guarded, session refresh works (proxy.ts), RLS on tables
- error handling: error/404/global-error pages, no unhandled rejections in console
- performance engine: bundle/knowledge waterfall/CWV measured
- mobile/accessibility: visual QA at 3 breakpoints + a11y pass
- SEO: metadataBase/og/twitter/robots present (if a web marketing site)
- tests: run existing suites; add only high-risk coverage
- deploy check (devops): build on target (e.g. Vercel) ok, env set
- dependencies: audit clean for CRITICAL/HIGH

Output a per-dimension report with VERIFIED/GOOD/NEEDS WORK/UNKNOWN statuses
(engines/scorecard.md). Every VERIFIED row must cite evidence. List anything
not verifiable explicitly.