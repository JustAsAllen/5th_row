# Decision Rules — Task Classifier → Planner → Tool/Agent Selection (S5, S10, S11)

Read `capability-registry.json` alongside this. Rules are ordered: first match wins.

## 1. Task classifier (category infer)

Classify BEFORE editing. Categories: `ui`, `ux`, `architecture`, `performance`,
`security`, `bug`, `refactoring`, `feature`, `research`, `database`, `testing`,
`devops`, `documentation`, `ambiguous`.

- Vague intent ("make this better") → `ambiguous` → run the disambiguation gate (below).
- Contains "premium/goated/polish" → `ui` (+ `ux`).
- Contains "not working / error / broken / crash" → `bug`.
- Contains "add/a build/new module/dashboard" → `feature`.
- Contains "fast / slow / bundle / lighthouse" → `performance`.
- Contains "leak / key / auth / login / secure" → `security`.
- Contains "schema / table / query / supabase" → `database`.
- Contains "clone / look like / reference" → design research.
- Otherwise: inspect the project, then pick the dominant category.

## 2. Disambiguation gate (minimum necessary question)

For `ambiguous` tasks, ask ONE question with concrete options (e.g.
"better in what dimension: visual polish, performance, architecture,
or robustness?"). Only ask if the answer changes what you do. Never
interrogate the user.

## 3. Autonomy level (S36)

| Level | Meaning | Applied when |
|---|---|---|
| L0 | Explain only | user asks a question / wants analysis |
| L1 | Suggest changes (no edits) | plan mode / user says "how should I" |
| L2 | Modify files + test | default for concrete tasks |
| L3 | Autonomous multi-step | "BUILD THIS", "make it goated", big features |
| L4 | Full workflow + verification | "production check", "ship it" |

**Irreversible actions always require explicit authorization** regardless of level:
deleting repos/data, committing/pushing, publishing, production deploy,
credential changes. (The one exception: user has explicitly configured otherwise.)

## 4. Selection rules (smallest necessary set — S10)

1. Prefer existing capabilities over new ones. New MCP/server = flag it.
2. For any coding task: `read`/`grep`/`glob` → `edit`/`write` → verify via bash.
3. Library/framework questions → `context7` first.
4. Unknown/current topics → firecrawl/web search.
5. Web projects that will render → visual QA pipeline (see quality-engines).
6. For complex features: war-room (see war-room skill). Do NOT optimize early —
   architect → design → implement → review → test, sequentially.
7. Delegation: use agents only when parallelism or specialization clearly helps.
   Small tasks stay local.

## 5. Fallback (never hammer a failing service)

- MCP A fails: diagnose (is it config, auth, or the target?), try a different
  tool for the same job (see `fallback_routes` in the registry), then native.
- Max ~2 attempts on the same failing endpoint, then pivot and note it only if
  it affects the result. Do not repeat identical failed provider calls.
- If a provider's outputs failed but the call itself was counted/charged, don't
  resend the identical payload; reconcile the returned ID.

## 6. Tool fusion (S11) — think in workflows

- GitHub + browser ⇒ implement PR then live-test it.
- context7 + web research + coding ⇒ current-docs-aware implementation.
- firecrawl + researcher + database ⇒ data pipeline (scrape → normalize → store).
- Supabase + frontend + QA ⇒ full-stack feature with backend verification.
- Git + testing + reviewer ⇒ safe refactor (checkpoint, change, test, diff, review).