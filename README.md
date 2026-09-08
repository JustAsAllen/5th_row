# 🎒 5th_row — The Doraemon Magic Pocket

> **Your all-in-one web development super-toolkit.** Stack, skills, prompts, and patterns for building **gaand-faad client websites** with opencode. Everything you need is inside this pocket — just pull it out and use it.

---

## TABLE OF CONTENTS

1. [What Is This?](#1-what-is-this)
2. [Your Complete Setup (Everything Installed)](#2-your-complete-setup)
3. [How To Talk To opencode (Prompting Cheat Codes)](#3-how-to-talk-to-opencode)
4. [MCP Servers — What They Do](#4-mcp-servers)
5. [Skills Installed — Your Superpowers](#5-skills-installed)
6. [The Premium Design Formula](#6-the-premium-design-formula)
7. [Frontend Building Blocks](#7-frontend-building-blocks)
8. [3D Graphics](#8-3d-graphics)
9. [Animations](#9-animations)
10. [Backend + Database (Supabase)](#10-backend--database)
11. [Authentication](#11-authentication)
12. [Making Client Money $$$](#12-making-client-money)
13. [Deploying Like A Pro](#13-deploying-like-a-pro)
14. [Reusable Prompts Gallery](#14-reusable-prompts-gallery)
15. [Common Problems & Fixes](#15-common-problems--fixes)
16. [Quick Reference Card](#16-quick-reference-card)

---

## 1. What Is This?

This folder is your **magic pocket / backup / super-toolbox**. You bring it anywhere and it contains:

- A **battle-tested Next.js stack** (preconfigured, ready to code)
- An **opencode setup** (MCP servers + skills) that makes AI builds look premium
- **Prompting cheat codes** so you never freeze on "what do I say?"
- **Design formulas** that make everything look expensive
- **Client money-making workflow**

> If you blank on anything, open this README. It is your manual.

---

## 2. Your Complete Setup (Everything Installed)

### Stack (already installed in this project)
```
Next.js 16 + React 19 + TypeScript + Tailwind CSS v4
shadcn/ui (Base UI, Vega preset) + lucide-react icons
Three.js + @react-three/fiber + @react-three/drei (3D)
framer-motion (animations) + sonner (toasts)
Supabase (auth, database, storage, realtime) — GLOBAL SETUP DONE
react-hook-form + zod (forms/validation) + zustand (state)
recharts (charts) + date-fns (dates) + cmdk (command menu)
```

### Backend Files (already wired up)
```
src/lib/supabase/client.ts      → Browser client
src/lib/supabase/server.ts      → Server client
src/lib/supabase/middleware.ts  → Auth session refresh
src/lib/supabase/use-user.ts    → useUser() hook
src/lib/supabase/use-auth.ts    → useAuth() hook (signUp/signIn/signOut)
src/lib/supabase/use-storage.ts → useStorage() hook (upload/delete files)
src/lib/supabase/use-realtime.ts → useRealtime() hook (live DB updates)
src/middleware.ts                → Auto-refreshes auth sessions
.env.example                    → Copy to .env.local and fill in keys
```

### Commands
```bash
npm run dev        # start dev server -> http://localhost:3000
npm run build      # production build
npm run lint       # check for errors
npx shadcn@latest add <component>   # add UI components
vercel --prod      # deploy to live URL
```

### The Control Center (MAIN PAGE)
Root `/` redirects to the **Control Center** (`http://localhost:3000/control`) — a real dashboard with **click-to-run buttons** that execute commands (lint, typecheck, build, shadcn add, deploy, etc.) and show output in a live console. The step-by-step guide lives at `/toolkit`.

> This project is the **5th_row toolkit itself**: the Control Center + guide + global Supabase backend files. Copy this folder (or its `src/lib/supabase/`) into every new client project.

### Account Setup (All Free — Make These Now)
| Service | Why | Link |
|---------|-----|------|
| GitHub | Host code, backup projects, portfolio | https://github.com |
| Vercel | Free hosting + live URLs for clients | https://vercel.com |
| Supabase | Free database + auth + storage | https://supabase.com |

---

## 3. How To Talk To opencode

### The Magic Formula
Open a new opencode session inside any project folder and just say:

```
[What you want] + [the look/style] + [any reference link]
```

### Real Examples
```
"Create a landing page for a coffee shop. Premium dark theme. Make it like bluebottle.com"
"Add a pricing section with 3 tiers, middle one highlighted as most popular"
"Make my hero more impactful with a gradient heading and animated button"
"Fix the contact form — it's not sending"
"Deploy this to Vercel"
"Check how this looks on mobile"
"Make a navbar with a hamburger menu that works on phones"
```

### Better Prompts = Better Sites
| Weak prompt | Strong prompt |
|---|---|
| "Make a website" | "Make a one-page site for a real estate agent: hero, services, properties grid, contact form" |
| "Make it look nice" | "Premium dark theme, violet accent, rounded cards, smooth animations" |
| "Add a button" | "Add a 'Get Started' button in the hero — violet with a glow on hover" |
| "Fix the bug" | "The submit button does nothing when clicked — no error shows, fix it" |

### 3 Rules
1. **One thing per message** when starting out
2. **Say the style** you want (premium, clean, dark, colorful, minimal)
3. **Send reference links** — I'll learn from them automatically

---

## 4. MCP Servers

These are "superpowers" wired into opencode globally (`~/.config/opencode/opencode.json`). All **free**.

| Server | Superpower | You Say |
|--------|-----------|---------|
| **Playwright** | Opens a real browser, clicks, screenshots | "Screenshot my homepage" |
| **Puppeteer** | Browser automation + page capture | "Open this link and tell me what it looks like" |
| **Context7** | Pulls real library docs (no wrong APIs) | (automatic — keeps code accurate) |
| **Chrome DevTools** | Reads console errors, network, performance | "Why is my page slow?" |
| **Filesystem** | Reads files anywhere on your PC | "Find my design files" |
| **Firecrawl** | Scrapes any website into clean text | "Learn the design of [URL]" |

> To add GitHub/Vercel/Supabase MCP later (optional), logs into those accounts and I'll wire them up — they're free too.

---

## 5. Skills Installed (ALL Trigger Keywords)

Skills live in `~/.config/opencode/skills/`. They **auto-trigger** when you mention any of these keywords in your message.

### website-cloner
> Analyzes any website's design (colors, typography, layout, spacing, components) and recreates it as premium modern code.

| Trigger Keywords |
|-----------------|
| `clone website` |
| `learn from site` |
| `make it look like` |
| `copy design` |
| `reference website` |
| `analyze website` |
| `extract design from [URL]` |
| `clone this` |
| `rebuild this style` |
| `make it like [URL]` |

**Example prompts:**
- "Clone https://stripe.com and make it like that for my SaaS"
- "Learn from https://linear.app and rebuild its design style for my site"
- "Extract the design from https://vercel.com and apply it here"

---

### ui-ux-premium
> Applies the premium design formula — expensive-looking colors, typography, spacing, animations, and components.

| Trigger Keywords |
|-----------------|
| `make it premium` |
| `make it look expensive` |
| `high class` |
| `goated interface` |
| `beautiful design` |
| `amazing UI` |
| `moon-worthy design` |
| `upgrade the design` |
| `luxury look` |
| `modern aesthetic` |
| `expensive` |
| `goated` |
| `polished` |
| `premium look` |

**Example prompts:**
- "Make this page look premium with gradient text and hover glows"
- "Upgrade the design to look expensive — luxury aesthetic"
- "Give it a goated interface with smooth animations"

---

### client-project
> Guides the full paid-client workflow — discovery, proposal, build, delivery, handoff, and getting paid.

| Trigger Keywords |
|-----------------|
| `client` |
| `client project` |
| `client work` |
| `client website` |
| `paid work` |
| `freelance` |
| `deliver to client` |
| `requirements` |

**Example prompts:**
- "I have a client project for a restaurant — let's start"
- "Help me scope this freelance gig"
- "What do I need before delivering to the client?"

---

### responsive-testing
> Screenshots and fixes responsive layouts at every breakpoint (320px → 1536px).

| Trigger Keywords |
|-----------------|
| `mobile responsive` |
| `check mobile` |
| `responsive` |
| `fix mobile` |
| `test on phone` |
| `mobile view` |
| `breakpoints` |
| `tablet view` |
| `desktop view` |

**Example prompts:**
- "Check my site at mobile (375px), tablet (768px), and desktop (1280px)"
- "Fix mobile — the navbar is overlapping content"
- "Test responsive at every breakpoint and show me screenshots"

---

### supabase-backend
> Builds backend features correctly — database, auth, storage, realtime, API routes, and security.

| Trigger Keywords |
|-----------------|
| `database` |
| `backend` |
| `supabase` |
| `auth` |
| `login` |
| `signup` |
| `realtime` |
| `storage` |
| `API` |
| `tables` |
| `rows` |
| `postgres` |
| `sign in` |
| `user accounts` |
| `forms data` |

**Example prompts:**
- "Create a contacts form connected to Supabase"
- "Add login/signup pages with auth"
- "Set up realtime chat messages in the database"
- "Upload images to Supabase storage"

---

## 6. The Premium Design Formula

Use this whenever the user wants an expensive-looking site.

### Colors
```
Background: zinc-950 / zinc-900 (cards)
Text: zinc-100 / zinc-400 (muted)
Border: zinc-800
Accent: violet-500 (or brand color) + glow shadows
```

### Typography
```
Hero: text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight
Gradient text: bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500
Body: text-base md:text-lg text-zinc-400
```

### The Premium Page Structure
```
1. Hero         → headline + gradient text + CTA + product preview
2. Logos        → "Trusted by" grayscale strip
3. Features     → 3-6 cards, icons, hover glow
4. Highlight    → alternating image + text blocks
5. Stats        → animated number counters
6. Testimonials → 3 quote cards
7. Pricing      → 3 tiers, middle = "Most Popular"
8. FAQ          → accordion
9. Final CTA    → big gradient band
10. Footer      → 4 columns + socials
```

### Premium Details Checklist
```
[ ] Buttons: rounded-full, border, backdrop-blur, hover glow + scale
[ ] Cards: rounded-2xl border-zinc-800 bg-zinc-900/60, hover:-translate-y-1
[ ] Navbar: sticky top-0 backdrop-blur-xl bg-zinc-950/80 border-b
[ ] Micro-animations with framer-motion (fade-up, stagger)
[ ] Generous spacing: py-24 md:py-32 per section
[ ] Loading skeletons + toast feedback everywhere
```

### Example Button
```tsx
<button className="rounded-full bg-violet-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
  Get Started
</button>
```

---

## 7. Frontend Building Blocks

### Page Template
```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">Big Headline</h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-2xl">Subheadline goes here…</p>
        <button className="mt-8 rounded-full bg-violet-600 px-6 py-3 hover:scale-105 transition-all">
          Get Started
        </button>
      </section>
    </main>
  );
}
```

### Client vs Server Components
```tsx
// Server Component (default) — for data, SEO, static content
async function Users() {
  const data = await fetch("https://api.example.com/users");
  return <div>{/* render */}</div>;
}

// Client Component — needs "use client" first line (interactions/state)
"use client";
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Responsive (Mobile-First)
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>
<h1 className="text-3xl sm:text-4xl lg:text-6xl">Responsive Heading</h1>
```

### API Route Template
```ts
// src/app/api/items/route.ts
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ items: [] });
}
export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name) return NextResponse.json({ error: "Missing name" }, { status: 400 });
  return NextResponse.json({ ok: true, body });
}
```

---

## 8. 3D Graphics

Works out of the box in this project.

### Standard 3D Scene
```tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { Float, ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

export function Hero3D() {
  return (
    <div className="w-full h-[450px] relative">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={1}>
            <mesh>
              <torusKnotGeometry args={[1, 0.3, 128, 32]} />
              <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
            </mesh>
          </Float>
          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} blur={2} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### 3D Rules
- Always `'use client'` on 3D files
- Container needs explicit height (`h-[450px]`)
- Wrap in `<Suspense>`
- Use `Environment preset="city"` for good lighting fast

---

## 9. Animations (framer-motion)

### Fade-Up (most used)
```tsx
"use client";
import { motion } from "framer-motion";
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
  Content
</motion.div>
```

### Stagger List
```tsx
<motion.div initial="hidden" whileInView="visible"
  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
  {items.map(i => (
    <motion.div key={i.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
      {i.name}
    </motion.div>
  ))}
</motion.div>
```

### Hover + Tap
```tsx
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
  className="bg-violet-600 px-6 py-3 rounded-xl text-white">
  Click Me
</motion.button>
```

### Toasts (sonner)
```tsx
import { toast } from "sonner";
toast.success("Saved!");               // success
toast.error("Something failed");       // error
toast.promise(save(), { loading: "Saving…", success: "Done!", error: "Failed" });
```

---

## 10. Backend + Database (Global Setup — One Time Only)

### One-Time Setup (Never Do This Again)

1. Go to https://supabase.com → **New Project** → pick a name + password
2. Go to **Project Settings → API** → copy these 3 keys
3. Create `.env.local` in your project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Done — the global backend files are already wired up in `src/lib/supabase/`:

```
src/lib/supabase/
├── client.ts      → Browser client (use in "use client" components)
├── server.ts      → Server client (use in Server Components, API routes)
├── middleware.ts  → Auth session refresh (auto-logged in via middleware.ts)
├── use-user.ts    → Hook: get current logged-in user
├── use-auth.ts    → Hook: signUp(), signIn(), signOut() with toasts
├── use-storage.ts → Hook: upload files, get public URL, delete
└── use-realtime.ts → Hook: live database updates in real-time
```

### Quick Usage (Copy-Paste Ready)

**Get current user:**
```tsx
"use client";
import { useUser } from "@/lib/supabase/use-user";

export function Profile() {
  const { user, loading } = useUser();
  if (loading) return <div>Loading…</div>;
  if (!user) return <div>Not logged in</div>;
  return <div>Welcome, {user.email}</div>;
}
```

**Login / Signup / Logout:**
```tsx
"use client";
import { useAuth } from "@/lib/supabase/use-auth";

export function AuthButtons() {
  const { signIn, signUp, signOut, loading } = useAuth();
  return (
    <div>
      <button onClick={() => signIn("email@test.com", "password123")} disabled={loading}>
        Sign In
      </button>
      <button onClick={() => signUp("email@test.com", "password123", "John")} disabled={loading}>
        Sign Up
      </button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

**Upload file to storage:**
```tsx
"use client";
import { useStorage } from "@/lib/supabase/use-storage";

export function AvatarUpload() {
  const { upload, uploading } = useStorage("avatars");
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { url } = await upload(file, `user-${Date.now()}.png`);
    console.log("Public URL:", url);
  };
  return <input type="file" onChange={handleUpload} disabled={uploading} />;
}
```

**Realtime live updates:**
```tsx
"use client";
import { useRealtime } from "@/lib/supabase/use-realtime";

interface Message {
  id: string;
  content: string;
  created_at: string;
}

export function LiveChat() {
  const messages = useRealtime<Message>({ table: "messages", event: "INSERT" });
  return (
    <div>
      {messages.map((m) => <p key={m.id}>{m.content}</p>)}
    </div>
  );
}
```

**Server Component (data fetching):**
```tsx
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
  return <div>{posts?.map(p => <p key={p.id}>{p.title}</p>)}</div>;
}
```

**API Route (protected):**
```ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { data, error } = await supabase.from("items").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
```

### CRUD Cheat Sheet
```ts
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

// INSERT
await supabase.from("contacts").insert({ name, email, message }).select().single();
// SELECT
const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
// UPDATE
await supabase.from("users").update({ name: "New" }).eq("id", id);
// DELETE
await supabase.from("users").delete().eq("id", id);
```

> Ask opencode: *"Create a contacts form connected to Supabase"* — done in minutes.

---

## 11. Authentication (Already Set Up)

Auth is ready to use — the `useAuth` hook handles everything:

```tsx
import { useAuth } from "@/lib/supabase/use-auth";
const { signIn, signUp, signOut, loading } = useAuth();
```

### Raw Supabase Auth (if you need it)
```ts
await supabase.auth.signInWithPassword({ email, password });
await supabase.auth.signUp({ email, password, options: { data: { name } } });
await supabase.auth.signOut();
const { data: { user } } = await supabase.auth.getUser();
```

> The middleware in `src/middleware.ts` auto-refreshes sessions — users stay logged in across page loads.

---

## 12. Making Client Money $$$

### Ask The Client (before coding)
```
What do you sell? Who is it for?
Which pages? (Home, About, Services, Contact…)
Brand colors / logo? Reference sites you like?
Do you need bookings/payments/forms?
```

### Quick Pricing (simple starter)
```
Landing page (1-5 sections, responsive):        $300 - $800
Multi-page site (5-8 pages + contact):          $800 - $2,000
E-commerce / booking / membership:              $2,000 - $5,000+
Monthly maintenance (updates, backups, support): $50 - $200/mo
```

### Workflow That Gets You Paid
```
1. 50% deposit upfront → start building
2. Show draft → 1 revision round included
3. 50% on launch → deploy + hand over
4. Ask for a Google review + testimonial
```

### Prompts To Run With opencode While Building
```
"Create a client site: [business], pages [list], style [premium/dark/color], primary color #hex"
"Make a contact form that saves to Supabase and emails the client"
"Deploy this to Vercel and give me the live URL"
"Check it looks perfect on mobile + desktop"
```

---

## 13. Deploying Like A Pro

### Vercel (fastest, free)
```bash
vercel          # first deploy
vercel --prod   # production
```
Or GUI: **vercel.com → Add New Project → import your GitHub repo → Deploy**. Auto-detects Next.js.

### Post-deploy checklist
```
[ ] Live URL works
[ ] Forms submit (test it!)
[ ] Env vars set on Vercel dashboard
[ ] Custom domain connected (if client provided)
[ ] Page title + favicon + meta description set
[ ] Redirects www → non-www
```

---

## 14. Reusable Prompts Gallery

Copy-paste these into opencode for instant results.

### Landing Page
```
Create a premium landing page for [business/purpose].
Sections: hero with gradient headline + CTA, trust logos, 3 feature cards,
stats row, 3 testimonials, pricing (3 tiers, middle highlighted), FAQ, footer.
Theme: dark zinc with violet accent. Mobile responsive. Smooth animations.
```

### Website Clone/Learn
```
Look at https://[reference-website] and rebuild its design style for my site.
Match the colors, typography, and layout feel — but make it my [business].
```

### Fix Mobile
```
Check my site at mobile (375px), tablet (768px), and desktop (1280px).
Fix any overflow, stacking, or sizing issues. Show me screenshots.
```

### Contact Form (with backend)
```
Build a contact form (name, email, message) that saves submissions to a
Supabase table and shows a success toast. Validate with zod. Mobile responsive.
```

### Premium Polish
```
Make this page look premium: rounded cards, hover glows, gradient text,
staggered entrance animations, sticky blurred navbar, generous spacing.
```

### Deploy
```
Build the project, check for errors, then deploy to Vercel. Give me the live URL.
```

### Complete Client Site
```
Build a complete client website for [business]. Pages: home, about, services,
portfolio, contact. Home has hero, features, testimonials, CTA. Contact form
saves to Supabase. Premium dark theme. Deploy it and give me the link.
```

---

## 15. Common Problems & Fixes

### "use client" errors
Add `"use client"` as the FIRST line of the file.

### 3D canvas blank
Container needs height (`h-[450px]`) + `<Suspense>` + `'use client'`.

### Tailwind classes not working
Rebuild/restart dev server. Check `globals.css` imports `@import "tailwindcss"`.

### Form not submitting
Check the API route path and `action` attr. Open DevTools console for errors. Query `console: errors` via Chrome DevTools MCP.

### Env vars missing after deploy
Add them in Vercel dashboard (Settings → Environment Variables). Restart.

### Build fails
Run `npm run lint` first. Check for missing `"use client"` and un-awaited `params`.

### Images broken
Use `next/image` with `width`/`height`. Remote images need domain allow-list in `next.config.ts`.

### Page slow
Ask opencode: *"Check performance with Chrome DevTools and optimize"* — images, lazy loading, bundle size.

---

## 16. Quick Reference Card

### Color Palette
```
Background:  bg-zinc-950   Cards:  bg-zinc-900
Border:      border-zinc-800  Text:  text-zinc-100
Muted:       text-zinc-400    Accent: violet-500/600
Success:     emerald-500   Warning: amber-500   Error: red-500
```

### Spacing
```
px-2 py-1   badges    |  px-4 py-2  buttons    |  px-6 py-3  cards
px-8 py-6   sections  |  gap-2/4/6/8  grid gaps |  max-w-7xl  page width
```

### Everything Happens Via opencode
Don't memorize code — memorize prompts. When stuck, run:
- "Add a premium hero section"
- "Make it look like [URL]"
- "Fix the mobile layout"
- "Connect this form to Supabase"
- "Deploy it"
- "Polish everything to look expensive"

---

### 🎒 Use this pocket. Ship great sites. Make that money. 💪

*Built as the Doraemon magic pocket backup — stack, skills, and prompts all in one place.*