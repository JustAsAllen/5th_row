---
name: 5th-row
description: Use when working on, building into, copying, or extending the 5th_row toolkit — a portable Next.js starter for premium AI-assisted client websites. Trigger keywords: 5th_row, 5th row, fifth row, toolkit, control center, /control, /toolkit, super-toolkit, Doraemon, client site starter, 5th_row stack. Captures the stack, hardened patterns, and fixes so future sessions don't re-learn them.
---

# 5th_row — The Super-Toolkit

A portable single-folder Next.js starter for rapidly shipping premium client websites with AI help ("The Doraemon Magic Pocket"). Two live functions:

- **Landing `/`** — editorial hero + horizontal pocket track, stack, skills gallery.
- **`/control`** — Control Center dashboard that runs whitelisted terminal commands (lint, build, deploy, etc.) via the `/api/actions` API, with a live console panel.
- **`/toolkit`** — Step-by-step zero-to-deploy guide (8 sections).

Root `/` is a **landing page** (NOT a redirect to `/control`).

## Location & Stack

- Repo: `https://github.com/JustAsAllen/5th_row.git` (a copy lives at `~/Desktop/5th_row`)
- **Framework:** Next.js 16 (App Router, TypeScript strict, React 19)
- **Styling:** Tailwind CSS v4. **Current design language = Dragonfly-style editorial minimalism fused with the 5th_row pixel-glyph aesthetic** (see "Design Language" below). Dark `#000000` void bg, near-white `#F2F2F2` text, lime accent `#D2FF00`, muted `#7D7D7D`, hairline borders `white/[0.06]`.
- **UI:** shadcn/ui (Base UI, Vega preset) + Lucide icons — the `src/components/ui/` folder is **not shipped**; add components per-project via `npx shadcn@latest add`
- **3D & motion:** **Rive for decorative "3D" visuals** (vector motion graphics → WebGL canvas, e.g. landonorris.com uses Rive not Three.js) — see `rive-animation` skill. Three.js + @react-three/fiber + @react-three/drei ONLY for true real-time 3D (mark files `'use client'`, wrap in `<Suspense>`, give containers explicit width/height)
- **Typography:** `Archivo Black` display font (`--font-display`), `Instrument Serif` body (`--font-serif`), `Geist Mono` micro-labels — all via `next/font/google` in `src/app/layout.tsx`
- **Animations:** framer-motion (incl. scroll-driven `useScroll`/`useTransform`), **Lenis** for buttery smooth scroll (pair with `svh` full-viewport sections, pinned horizontal tracks), sonner (toasts)
- **State/Forms:** zustand, react-hook-form, zod, recharts, date-fns, cmdk
- **Backend:** Supabase (auth, DB, storage, realtime) — global copy-paste layer at `src/lib/supabase/`
- **Deploy:** Vercel

## Design Language (current — do NOT regress to zinc/violet cards)

Landing + control center use a **Dragonfly.xyz editorial style** instead of the old shadcn SaaS look:

1. **Pure black void** `#000000` — content floats on nothing; no card backgrounds, borders are hairline `white/[0.06]`.
2. **Serif body** — `font-serif` (Instrument Serif) for body copy, 24–28px light; the signature Dragonfly move.
3. **Mono micro-labels** — 10px uppercase `tracking-[0.4px]` (`font-mono`) for section tags, meta, numbers.
4. **Display type** — `font-display` (Archivo Black) huge tight-tracked headings (`tracking-[-0.03em]`, `leading-[0.82]`).
5. **Text-only CTAs** — no pill buttons; lime `text-[#D2FF00]` mono links with `→`.
6. **Pixel-glyph ASCII marks** — `src/components/landing/pix-glyph.tsx` exports `PixGlyph` with patterns: `plus` (crosshair), `dottule` (dotted rule), `bracket-l/r` (corner brackets), `corners`, `diamond`, `ticks`. **Scatter these everywhere** — next to labels, framing big text, as dividers, on section corners. They're the site's ASCII signature (origin: dragonfly.xyz's pixel-block ornaments).
7. **Grid/measure** — `max-w-[1416px]` container, 81px faint grid lines in hero, `px-6 md:px-10`.
8. Keep the lime `#D2FF00` pop on black — it's the brand accent.

When starting a NEW client project from 5th_row, keep this editorial fusion unless the client wants the SaaS look (then `ui-ux-premium` has the standard approach).

## Commands

```
npm run dev        # http://localhost:3000
npm run build      # next build (Turbopack)
npm run lint       # eslint
npx tsc --noEmit   # typecheck — MUST pass before completing work
```

All three (`tsc`, `lint`, `build`) must pass before finishing a task.

## Hardened Patterns (learned this session — do not regress)

These were fixed up and must be preserved in new / copied projects:

1. **Proxy NOT middleware** — Next 16 deprecates `middleware.ts`. Session refresh lives in `src/proxy.ts` (exports `proxy`) which delegates to `src/lib/supabase/middleware.ts` (`updateSession`). Use the `proxy.ts` convention.
2. **Rate-limit the action API with response headers** — `/api/actions` POST returns `X-RateLimit-Limit/Remaining/Reset` and `Retry-After` headers. Keep the whitelist-only command pattern + `resolveSafeCwd` (rejects `..` and absolute paths) + 120s timeout + per-IP 20 req/min sliding window.
3. **Error + 404 pages required** — `src/app/not-found.tsx`, `error.tsx`, `global-error.tsx` exist (dark themed with retry/back buttons). Don't remove them.
4. **No `process.cwd()` in client components** — it's `undefined` in the browser. Use descriptive placeholders instead.
5. **No `as`/`never` type assertions** — use type guards (`instanceof Error`, `isExecError()`) and proper generic typing. For Supabase realtime use the real `RealtimePostgresChangesFilter<"*"|"INSERT"|"UPDATE"|"DELETE">` type, not casts.
6. **Supabase env guards** — `client.ts`/`server.ts` throw a clear error (and `isSupabaseConfigured()` exists) instead of crashing on `process.env.X!` when unconfigured. Middleware gracefully skips when env vars are missing.
7. **Remote images allow-listed** — `next.config.ts` `images.remotePatterns` includes Supabase, GitHub avatars, Google, Unsplash. Extend it, don't use `unoptimized`.
8. **Hardened security headers** — `next.config.ts` `headers()` applies CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, HSTS, `poweredByHeader: false`.
9. **Metadata** — layout has full `metadataBase`, openGraph, twitter, robots; app has `icon.svg` and `opengraph-image.svg` (auto-detected by App Router).

## Security rules (MANDATORY)

- Validate all request bodies with zod on the server.
- Supabase RLS on every table; NEVER expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
- Rate-limit all public endpoints.
- Secrets only in `.env.local` / Vercel env vars (never committed).
- `next/image` only for remote domains on the allow-list.

## Env vars

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # server-only
```

## Supabase layer (`src/lib/supabase/`)

Copy-paste into every new project: `client.ts`, `server.ts`, `middleware.ts` (updateSession used by `src/proxy.ts`), plus hooks `use-user.ts` (useUser), `use-auth.ts` (useAuth: signUp/signIn/signOut with toasts), `use-storage.ts` (useStorage), `use-realtime.ts` (useRealtime). Only the `.env.local` keys change per project.

**RLS default for public/form tables** (see `supabase-backend` skill): anon can INSERT with no `.select()` chain (chaining `.select()` returns 401 code 42501), only authenticated can SELECT. E.g. `anon_can_insert` / `auth_can_read`.

## Workflow for building a client site with 5th_row

1. Copy the project / fresh `create-next-app`. Reset git remote for the new client.
2. `npm install` + `npx shadcn@latest add <components>` as needed.
3. Copy `src/lib/supabase/` in, fill `.env.local` from `.env.example`.
4. Enforce RLS + security headers + rate limiting (above patterns).
5. Deploy via Vercel.

## opencode skills that pair with this

- `rive-animation` — when adding animated "3D" vector graphics / micro-interactions (RECOMMENDED instead of Three.js for decorative visuals); includes Lenis smooth-scroll + scroll-pinned track patterns
- `supabase-backend` — when wiring backend/auth/storage/realtime
- `ui-ux-premium` — when making the site premium/polished
- `client-project` — when building for a paying client
- `website-cloner` — when cloning/inspired-by a reference site
- `responsive-testing` — when checking mobile/layout responsiveness
