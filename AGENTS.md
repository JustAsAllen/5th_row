# AGENTS.md — 5th_row Project Instructions

## 1. Project Mission & Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript, React 19)
- **Styling:** Tailwind CSS v4 (Dark-mode palette: `zinc`/`slate`, CSS variables enabled)
- **UI Components:** Shadcn UI (`Base UI` primitives, `Vega` preset, `Lucide` icons)
- **3D & WebGL:** Three.js, `@react-three/fiber` (R3F), `@react-three/drei`
- **Animation & Feedback:** `framer-motion`, `sonner` (Toasts)
- **State/Forms/Data:** `zustand`, `react-hook-form`, `zod`, `recharts`, `date-fns`, `cmdk`
- **Backend:** Supabase (auth, database, storage, realtime)
- **MCP Servers Available:** Playwright, Puppeteer, Chrome DevTools, Context7, Filesystem, Firecrawl — use them for screenshots, page capture, debugging, and reference-site analysis.

---

## 2. Essential Commands
- **Dev Server:** `npm run dev` (Runs locally at `http://localhost:3000`)
- **Build / Lint:** `npm run build` / `npm run lint`
- **Typecheck:** `npx tsc --noEmit`
- **Install Packages:** `npm install <package-name>`
- **Add Shadcn Primitives:** `npx shadcn@latest add <component-name>`
- **Deploy:** `vercel --prod` (or Vercel dashboard)

---

## 3. Directory Layout & Structure
- `src/app/` — Application pages, routes, API, layouts, and `globals.css`.
  - `src/app/control/` — The **Control Center** (main page). Root `/` redirects here.
  - `src/app/toolkit/` — The zero-to-deploy step-by-step guide.
  - `src/app/api/actions/` — Command-executor API for the control center (whitelisted, rate-limited).
- `src/components/control/` — `control-center.tsx` (dashboard UI + live console).
- `src/components/toolkit/` — Reusable doc components (`CodeBlock`, `ToolSection`, `PromptSnippet`, `InfoCard`, `CodeGroup`, `ToolkitSidebar`).
- `src/lib/supabase/` — Global backend files copied into every project (`client.ts`, `server.ts`, `middleware.ts`, `use-user.ts`, `use-auth.ts`, `use-storage.ts`, `use-realtime.ts`).
- `src/lib/utils.ts` — Shared helpers, `cn()` class merger.
- `src/proxy.ts` — Session refresh (uses `src/lib/supabase/middleware.ts`). Next 16 `proxy.ts` convention (formerly `middleware.ts`).
- `public/` — Static assets.

> Note: The `src/components/ui/` shadcn folder was removed during optimization. shadcn components should be added per-project via `npx shadcn@latest add`.

---

## 4. Security Requirements (MANDATORY)
This toolkit must produce hardened sites. Enforce these on every project you build:
- **Security headers** are applied globally via `next.config.ts` (`headers()`): CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS.
- **Never trust client input.** Validate all request bodies with `zod` on the server, not just the client.
- **Supabase RLS is mandatory** on every table. Never expose the `SERVICE_ROLE_KEY` to the browser (server-only).
- **Rate-limit all public API/action/form endpoints.** (See `src/app/api/actions/route.ts` for the pattern.)
- Keep secrets in `.env.local` and Vercel environment variables — never commit them.
- Use `next/image` for remote images (allow-list domains in `next.config.ts`).

---

## 5. UI/UX & Design Guidelines
- **Aesthetic:** Clean, high-contrast dark theme by default (`bg-zinc-950 text-zinc-100`, subtle borders `border-zinc-800`).
- **Interactive Polish:** 
  - Add micro-animations using Framer Motion (`whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}`).
  - Provide immediate user feedback on async actions using Sonner: `toast.success("Action complete")` or `toast.error("Failed")`.
  - Use vector iconography from `lucide-react` with standardized sizes (`w-4 h-4` or `w-5 h-5`).

---

## 6. 3D Graphics Standards (@react-three/fiber)
- **Client Directive:** Mark all 3D canvas files with `'use client'`.
- **Performance & Asset Loading:** 
  - Always wrap 3D components in `<Suspense fallback={<LoadingSpinner />}>`.
  - Use `@react-three/drei` helpers (`<OrbitControls enableZoom={false} />`, `<Float>`, `<ContactShadows />`, `<Environment preset="city" />`).
  - Ensure the parent container defines explicit width/height (e.g., `w-full h-[450px] relative`) to avoid rendering collapses.

---

## 7. Development Rules for Agents
- **TypeScript Strictness:** Never use `any`. Always declare explicit interfaces and prop types.
- **Component Isolation:** Keep UI presentational components separate from API/state logic.
- **Verification:** After editing or creating files, check for missing imports or syntax mismatches before completing tasks.

## 7. opencode Skills Available (Global)
The following skills auto-trigger from `~/.config/opencode/skills/`:
- `5th-row` — trigger keywords: `5th_row`, `fifth row`, `toolkit`, `control center`, `/control`, `/toolkit`. Captures THIS project's stack, hardened patterns (proxy not middleware, rate-limit headers, error pages, Supabase guards, no type assertions, remote-image allow-list) and the client-site build workflow. Load it before working here.
- `website-cloner` — triggers: `clone website`, `learn from site`, `make it look like`, `copy design`, `reference website`, `analyze website`, `extract design from [URL]`
- `ui-ux-premium` — triggers: `make it premium`, `make it look expensive`, `high class`, `goated interface`, `beautiful design`, `amazing UI`, `moon-worthy design`, `upgrade the design`, `luxury look`, `modern aesthetic`, `expensive`, `goated`, `polished`, `premium look`
- `client-project` — triggers: `client`, `client project`, `client work`, `client website`, `paid work`, `freelance`, `deliver to client`, `requirements`
- `responsive-testing` — triggers: `mobile responsive`, `check mobile`, `responsive`, `fix mobile`, `test on phone`, `mobile view`, `breakpoints`, `tablet view`, `desktop view`
- `supabase-backend` — triggers: `database`, `backend`, `supabase`, `auth`, `login`, `signup`, `realtime`, `storage`, `API`, `tables`, `rows`, `postgres`, `sign in`, `user accounts`, `forms data`

## 8. Premium Design Baseline
- Default look: `bg-zinc-950 text-zinc-100`, cards `bg-zinc-900 border-zinc-800`, accent violet-500/600 with glow shadows.
- Section spacing: `py-24 md:py-32`. Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Buttons: `rounded-full`, hover scale + glow. Cards: `rounded-2xl`, hover lift.
- Add micro-animations (framer-motion fade-up / stagger) and sonner toasts for async feedback by default.