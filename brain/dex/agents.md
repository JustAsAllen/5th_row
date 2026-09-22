# Agent Dex — Subagent Roster (S2)

Internal "Pokédex" of agents. The metaphor is internal architecture only —
never dress up the UX with it. Use this to pick the right specialist for a job.

Field meaning: `type` specialty · `strong` good at · `weak` poor at ·
`preferred` tasks · `deps` what it needs · `perm` edit access · `verify` check it must clear.

| Agent | Type | Strong against | Weak against | Preferred tasks | deps | perm | verify | confidence |
|---|---|---|---|---|---|---|---|---|
| architect | Planning | ambiguous projects, system design | tiny syntax fixes | structure, data flow, trade-offs | project DNA | edit | plan reviewed | high |
| frontend | UI | React/Next/Tailwind/Rive/shadcn | database architecture | pages, components, interactions | design preset, running app | edit | build + visual QA | high |
| backend | Backend | APIs, services, auth, rate limits | visual polish | endpoints, auth flows, validation | schema, env | edit | API tests | medium |
| database | Backend | schema, queries, Supabase/Postgres RLS | UI polish | tables, SQL, policies, seeds | Supabase creds | edit | migrations + RLS check | medium |
| security | Defense | vulnerabilities, secrets, authz | greenfield features | audits, secret scanning, CORS, headers | full access | READ-ONLY | findings reviewed | high |
| debugger | Diagnostics | runtime bugs, failures | clean greenfield | crash triage, logs, hypotheses | repro | edit | original repro passes | medium |
| researcher | Intelligence | web/docs/papers, unknowns | live debugging | tech discovery, ref sources | internet | READ-ONLY | sources cited | medium |
| performance | Performance | bundle, renders, CWV, queries | correctness logic | hot paths, images, memo, latency | trace access | READ-ONLY | measured values | medium |
| red-team | Defense | adversarial review | building features | edge cases, races, inputs, abuse | finished feature | READ-ONLY | report + fixes applied | high |
| qa | Verification | tests, regression, a11y | design taste | test authoring, browser flows | running app | edit | suite green | medium |
| visual-qa | UI QA | screenshots across breakpoints | logic | overflow, spacing, states, console | running app | READ-ONLY | screenshot set | medium |
| devops | Infrastructure | builds, deploy, env, CI | product logic | vercel/ci config, env, deps | project | edit | deploy works | medium |

## Selection guidance

- SMAAL: pick the narrowest agent(s) that get the job done. Small tasks stay
  with the main agent; war-room is for complex features only.
- REVIEWERS (security, performance, red-team) are read-only. Never let a
  reviewer also implement (conflict of interest) — a separate pass fixes.
- Multiple lanes only when truly parallelizable; otherwise sequential
  pipeline: architect → design → implement → review → test.

## Card format reference (used by war-room)

```
AGENT   <name>
TYPE    <type>
TASK    <what was asked>
CTX     <context given/loaded>
PLAN    <approach>
RESULT  <outcome>
RISKS   <open risks>
FILES   <changed/read>
TESTS   <run + result>
CONF    <high|medium|low>
```