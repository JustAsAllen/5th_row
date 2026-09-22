# Security Engine (S18)

Automatic mostly-read-only checks before release or after auth/deps changes.

## Scan list
- `.env*` in git index/tree; API keys/secrets in code, logs, or committed files
  (grep for `sk-`, `ai_`, `api[_-]key`, token patterns) — NEVER print values.
- Client bundles referencing server secrets (`SUPABASE_SERVICE_ROLE_KEY`, etc.).
- Auth: insecure flows, missing guards, weak password rules, session handling.
- Authorization: RLS policies on every table; id checks on resources.
- Injection: unsanitized SQL/HTML, dangerouslySetInnerHTML from user input.
- CORS/headers: CSP, frame/type/referrer/policy headers present (5th_row sets these).
- Exposed endpoints: public routes without rate limit or zod validation.
- Logging of sensitive data (passwords, tokens, emails).
- File handling: unsafe paths, upload validation, path traversal (`resolveSafeCwd`).
- Dependencies: `npm audit` for critical/high-knowns.

## Output
`FINDINGS: [CRITICAL|HIGH|MED|LOW] path → issue → suggested fix`
Separate the report from any fixes. Never fix silently — list first, fix after
user ok for criticals.