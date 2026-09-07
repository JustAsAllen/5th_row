# AGENTS.md — 5th_row Project Instructions

## 1. Project Mission & Tech Stack
- **Framework:** Next.js (App Router, TypeScript, React 19)
- **Styling:** Tailwind CSS (Dark-mode palette: `zinc`/`slate`, CSS variables enabled)
- **UI Components:** Shadcn UI (`Base UI` primitives, `Vega` preset, `Lucide` icons)
- **3D & WebGL:** Three.js, `@react-three/fiber` (R3F), `@react-three/drei`
- **Animation & Feedback:** `framer-motion`, `sonner` (Toasts)
- **Testing & Verification:** Puppeteer MCP Server (Headless browser layout capture)

---

## 2. Essential Commands
- **Dev Server:** `npm run dev` (Runs locally at `http://localhost:3000`)
- **Build / Lint:** `npm run build` / `npm run lint`
- **Install Packages:** `npm install <package-name>`
- **Add Shadcn Primitives:** `npx shadcn@latest add <component-name>`

---

## 3. Directory Layout & Structure
- `src/app/` — Application pages, routes, layouts, and `globals.css`.
- `src/components/ui/` — Installed Shadcn UI primitives (`button.tsx`, `card.tsx`, `dialog.tsx`, `toast.tsx`, `dropdown-menu.tsx`).
- `src/components/` — Custom domain components, interactive cards, and 3D scenes (e.g., `Hero3D.tsx`, `Navbar.tsx`, `Dashboard.tsx`).
- `src/lib/utils.ts` — Shared helper functions, class merging (`cn()` utility).
- `public/` — Static assets, textures, fonts, and 3D models (`.glb`, `.gltf`).

---

## 4. UI/UX & Design Guidelines
- **Aesthetic:** Clean, high-contrast dark theme by default (`bg-zinc-950 text-zinc-100`, subtle borders `border-zinc-800`).
- **Interactive Polish:** 
  - Add micro-animations using Framer Motion (`whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}`).
  - Provide immediate user feedback on async actions using Sonner: `toast.success("Action complete")` or `toast.error("Failed")`.
  - Use vector iconography from `lucide-react` with standardized sizes (`w-4 h-4` or `w-5 h-5`).

---

## 5. 3D Graphics Standards (@react-three/fiber)
- **Client Directive:** Mark all 3D canvas files with `'use client'`.
- **Performance & Asset Loading:** 
  - Always wrap 3D components in `<Suspense fallback={<LoadingSpinner />}>`.
  - Use `@react-three/drei` helpers (`<OrbitControls enableZoom={false} />`, `<Float>`, `<ContactShadows />`, `<Environment preset="city" />`).
  - Ensure the parent container defines explicit width/height (e.g., `w-full h-[450px] relative`) to avoid rendering collapses.

---

## 6. Development Rules for Agents
- **TypeScript Strictness:** Never use `any`. Always declare explicit interfaces and prop types.
- **Component Isolation:** Keep UI presentational components separate from API/state logic.
- **Verification:** After editing or creating files, check for missing imports or syntax mismatches before completing tasks.