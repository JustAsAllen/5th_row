# ULTIMATE HACKATHON CHEATCODE - 5th_row

> **Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + Shadcn UI + Three.js + Framer Motion

---

## TABLE OF CONTENTS

1. [Project Setup](#1-project-setup)
2. [Frontend Cheat Codes](#2-frontend-cheat-codes)
3. [Backend and API Routes](#3-backend-and-api-routes)
4. [Database Setup](#4-database-setup)
5. [Authentication](#5-authentication)
6. [3D Graphics](#6-3d-graphics)
7. [Animations](#7-animations)
8. [UI Components](#8-ui-components)
9. [State Management](#9-state-management)
10. [Real-Time Features](#10-real-time-features)
11. [Hosting and Deployment](#11-hosting-and-deployment)
12. [Hackathon Game Plan](#12-hackathon-game-plan)
13. [Judges Love This](#13-judges-love-this)
14. [Common Gotchas](#14-common-gotchas)
15. [Quick Reference](#15-quick-reference)

---

## 1. Project Setup

```bash
cd 5th_row
npm install
npm run dev
# -> http://localhost:3000

# Add Shadcn UI components
npx shadcn@latest add button card dialog dropdown-menu toast
npx shadcn@latest add input form table badge avatar tabs
npx shadcn@latest add select separator sheet skeleton tooltip

# Extra libs
npm install @supabase/supabase-js
npm install prisma @prisma/client
npm install axios date-fns recharts
npm install zustand react-hook-form zod
```

### First 30-Minute Checklist

```
[ ] npm install + npm run dev
[ ] npx shadcn@latest add (all components)
[ ] Set up database (Supabase)
[ ] Create .env.local
[ ] Define MVP scope
[ ] Split work
[ ] Create route structure
```

---

## 2. Frontend Cheat Codes

### Project Structure

```
src/
  app/
    layout.tsx          # Root layout
    page.tsx            # Homepage
    globals.css         # Theme + Tailwind
    about/page.tsx      # /about route
    api/hello/route.ts  # /api/hello
    dashboard/page.tsx  # /dashboard
  components/
    ui/                 # Shadcn primitives
    shared/             # Reusable
    features/           # Feature-specific
  lib/
    utils.ts            # cn() helper
    supabase.ts         # Supabase client
  hooks/                # Custom hooks
```

### Quick Page Template

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Dashboard | 5th_row" };

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">1,234</p></CardContent>
        </Card>
      </div>
    </main>
  );
}
```

### Client vs Server Components

```tsx
// Server Component (default) - no "use client"
// Good for: static content, data fetching, SEO
async function ServerComponent() {
  const data = await fetch("https://api.example.com/data");
  return <div>{/* render data */}</div>;
}

// Client Component - runs in browser
// Good for: forms, clicks, animations, state
"use client";
import { useState } from "react";
function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Responsive Design

```tsx
// Mobile-first breakpoints
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-8">
  {/* Content */}
</div>

<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
<h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">Responsive</h1>
```

---

## 3. Backend and API Routes

### API Route Template

```ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;
    if (!name || !email) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: { name, email } });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  return NextResponse.json({ results: [] });
}
```

### All HTTP Methods

```ts
// src/app/api/items/[id]/route.ts
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ id });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  return NextResponse.json({ id, ...body });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ deleted: id });
}
```

### Server Actions

```ts
"use server";
import { revalidatePath } from "next/cache";

export async function addUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  revalidatePath("/users");
  return { success: true };
}

// Usage: <form action={addUser}>
```

---

## 4. Database Setup

### Option A: Supabase (Fastest)

```bash
npm install @supabase/supabase-js
```

```ts
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

```ts
// CRUD Operations
const { data } = await supabase.from("users").select("*").eq("email", email).single();
const { data } = await supabase.from("users").insert({ name, email }).select();
const { data } = await supabase.from("users").update({ name: "New" }).eq("id", userId);
const { error } = await supabase.from("users").delete().eq("id", userId);
```

### Option B: Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

```prisma
datasource db { provider = "sqlite"; url = env("DATABASE_URL") }
generator client { provider = "prisma-client-js" }
model User { id Int @id @default(autoincrement()); name String; email String @unique }
```

```bash
npx prisma db push
npx prisma generate
npx prisma studio
```

---

## 5. Authentication

### Supabase Auth

```ts
// Login
await supabase.auth.signInWithPassword({ email, password });
// Register
await supabase.auth.signUp({ email, password });
// Logout
await supabase.auth.signOut();
// Get user
const { data: { user } } = await supabase.auth.getUser();
```

### Middleware Protection

```ts
// middleware.ts (project root)
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => request.cookies.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => response.cookies.set(name, value, options)) } }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return response;
}
export const config = { matcher: ["/dashboard/:path*"] };
```

### No Auth (Fastest)

```ts
const userId = localStorage.getItem("userId") || crypto.randomUUID();
localStorage.setItem("userId", userId);
```

---

## 6. 3D Graphics

### Basic R3F Canvas

```tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";

function Scene() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export function Hero3D() {
  return (
    <div className="w-full h-[450px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene />
          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} blur={2} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### Common 3D Objects

```tsx
// Box
<mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="orange" /></mesh>

// Sphere
<mesh position={[2, 0, 0]}>
  <sphereGeometry args={[0.5, 32, 32]} />
  <meshPhysicalMaterial color="cyan" metalness={0.9} roughness={0.1} />
</mesh>

// Text (drei)
import { Text } from "@react-three/drei";
<Text fontSize={1} color="white" anchorX="center" anchorY="middle">Hello</Text>

// GLTF Model (drei)
import { useGLTF } from "@react-three/drei";
function Model() {
  const { scene } = useGLTF("/model.glb");
  return <primitive object={scene} />;
}
```

### 3D Rules
- Always wrap in `<Suspense>` with fallback
- Set explicit width/height on Canvas container
- Use `Environment preset="city"` for quick lighting
- Mark every file with `use client`

---

## 7. Animations

### Framer Motion

```tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";

// Fade in
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
  Content
</motion.div>

// Stagger children
<motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
  {items.map((item) => (
    <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
      {item.name}
    </motion.div>
  ))}
</motion.div>

// Hover + Tap
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-violet-600 px-6 py-3 rounded-xl">
  Click Me
</motion.button>

// AnimatePresence
<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div key="modal" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
      Modal
    </motion.div>
  )}
</AnimatePresence>

// Scroll reveal
import { useInView } from "framer-motion";
import { useRef } from "react";
function ScrollReveal({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
}
```

### Sonner Toasts

```tsx
import { toast } from "sonner";
toast.success("Done!");
toast.error("Failed!");
toast("Created", { description: "Scheduled for Monday" });
toast.promise(saveData(), { loading: "Saving...", success: "Saved!", error: "Failed." });
```

---

## 8. UI Components

### Install All at Once

```bash
npx shadcn@latest add button card input label textarea dialog dropdown-menu toast table badge avatar tabs select separator sheet skeleton tooltip
```

### Component Reference

| Component | Import | Use For |
|-----------|--------|---------|
| Button | @/components/ui/button | Actions |
| Card | @/components/ui/card | Containers |
| Input | @/components/ui/input | Text fields |
| Dialog | @/components/ui/dialog | Modals |
| Sheet | @/components/ui/sheet | Side panels |
| Table | @/components/ui/table | Data display |
| Badge | @/components/ui/badge | Status |
| Tabs | @/components/ui/tabs | Navigation |
| Select | @/components/ui/select | Dropdowns |
| Skeleton | @/components/ui/skeleton | Loading |
| Toast | sonner | Notifications |

### Navigation Bar

```tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">5th_row</Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white">Dashboard</Link>
          <Button size="sm">Get Started</Button>
        </div>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon"><Menu className="w-5 h-5" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/dashboard" className="text-lg">Dashboard</Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
```

### Loading Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton";
export function CardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
```

### Data Table

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function DataTable({ data }: { data: User[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell><Badge>{user.status}</Badge></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

## 9. State Management

### React Hooks (Simple)

```tsx
const [count, setCount] = useState(0);
const [items, setItems] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
```

### Zustand (Global)

```bash
npm install zustand
```

```ts
import { create } from "zustand";

interface AppState {
  user: User | null;
  theme: "light" | "dark";
  setUser: (user: User | null) => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  theme: "dark",
  setUser: (user) => set({ user }),
  toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
}));
```

```tsx
"use client";
import { useAppStore } from "@/store/useAppStore";
function UserButton() {
  const { user, setUser } = useAppStore();
  return user ? <span>{user.name}</span> : <button onClick={() => setUser({ id: 1, name: "Allen" })}>Login</button>;
}
```

---

## 10. Real-Time Features

### Supabase Realtime

```ts
const channel = supabase
  .channel("messages")
  .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
    setMessages((prev) => [...prev, payload.new]);
  })
  .subscribe();

useEffect(() => { return () => { supabase.removeChannel(channel); }; }, []);
```

### Server-Sent Events

```ts
// src/app/api/stream/route.ts
export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        const data = "data: " + JSON.stringify({ time: new Date().toISOString() }) + "\n\n";
        controller.enqueue(encoder.encode(data));
      }, 1000);
      setTimeout(() => { clearInterval(interval); controller.close(); }, 30000);
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } });
}
```

---

## 11. Hosting and Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel          # Interactive deploy
vercel --prod   # Production deploy
```

**Setup Checklist:**
```
[ ] Push to GitHub
[ ] Go to vercel.com/new
[ ] Import repo (auto-detects Next.js)
[ ] Add env vars in dashboard
[ ] Deploy (30 seconds)
```

### Netlify

```bash
npm i -g netlify-cli
netlify init
netlify deploy --prod
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### Static Export

```ts
// next.config.ts
const nextConfig = { output: "export" };
```

```bash
npm run build  # generates /out
# Upload /out to any static host
```

---

## 12. Hackathon Game Plan

### 24-Hour Timeline

**Hours 0-2: Setup**
```
[ ] Project init + repo
[ ] npm install + dev server
[ ] Set up database
[ ] Define MVP scope (CUT AGGRESSIVELY)
[ ] Assign frontend/backend
```

**Hours 2-8: Core Build**
```
[ ] Backend: API routes + DB
[ ] Frontend: Layout + 2-3 pages
[ ] Connect frontend to backend
[ ] Basic CRUD working
```

**Hours 8-14: Features**
```
[ ] Polish core features
[ ] Add 3D / animations
[ ] Real-time features
[ ] Error handling + loading states
```

**Hours 14-20: Polish + Deploy**
```
[ ] Responsive design
[ ] Deploy to Vercel
[ ] Fix deployment bugs
[ ] Record demo video
```

**Hours 20-24: Presentation**
```
[ ] Practice demo (3 min)
[ ] Build slides (5 max)
[ ] Test on judges device
[ ] NO NEW FEATURES
```

### What Judges Score

| Category | Weight | What To Show |
|----------|--------|-------------|
| Impact | 30% | Solves a real problem |
| Tech | 25% | Clean code, modern stack |
| Design | 20% | Polished UI, animations |
| Demo | 15% | Smooth walkthrough |
| Innovation | 10% | Unique approach |

### Scope Rules
- **Must have:** 1 core feature working perfectly
- **Nice to have:** 1 secondary feature
- **Cut immediately:** Multi-language, complex auth, perfect mobile
- **Never skip:** Working demo, deployed link, clean UI

---

## 13. Judges Love This

### Visual Polish Checklist
```
[ ] Dark theme (zinc + violet accent)
[ ] Smooth transitions (Framer Motion)
[ ] Hover effects on buttons
[ ] Loading skeletons
[ ] Toast notifications
[ ] Responsive on laptop
[ ] Animated hero section
```

### Technical Wow Factors
```
[ ] Real-time updates
[ ] 3D element (R3F)
[ ] next/image optimization
[ ] Server-side rendering
[ ] API with error handling
[ ] TypeScript strict mode
[ ] Loading states everywhere
```

### Presentation Template (3 min)
```
1. HOOK (15s): "Have you ever [problem]?"
2. SOLUTION (30s): "We built [project]"
3. DEMO (90s): Live walkthrough
4. TECH (30s): "We used [stack]"
5. IMPACT (15s): "[X] users benefit"
6. FUTURE (10s): "Next we'd add..."
```

---

## 14. Common Gotchas

### "use client" Errors
```
Fix: Add "use client" at the TOP of the file (first line)
```

### Three.js Blank Canvas
```
Fix: 1. Container needs w-full h-[450px]
     2. Wrap in Suspense
     3. File needs "use client"
```

### Tailwind Not Working
```
Fix: Check globals.css imports and @theme block
Check: postcss.config.mjs has @tailwindcss/postcss
```

### Shadcn Not Found
```
Fix: npx shadcn@latest add <component>
Check: components.json aliases match paths
```

### Build Fails
```
Fix: 1. Check missing "use client"
     2. Check fetch error handling
     3. Run npm run lint
     4. await params (Next.js 16)
```

### Env Vars Not Loading
```
Fix: 1. NEXT_PUBLIC_ prefix for client-side
     2. Restart dev server after adding
     3. Use .env.local not .env
     4. Check Vercel dashboard for prod
```

### Image Broken
```
Fix: Use next/image with width/height
For remote: add domain to next.config.ts
```

### CORS Errors
```
Fix: Use Next.js API routes (same origin)
Or set Access-Control-Allow-Origin header
```

---

## 15. Quick Reference

### Commands
```bash
npm run dev              # Dev server
npm run build            # Production build
npm run lint             # Check errors
npx shadcn@latest add X  # Add component
npx prisma db push       # Push schema
npx prisma studio        # DB visual editor
vercel                   # Deploy
vercel --prod            # Production deploy
```

### Color Palette
```
Background: bg-zinc-950
Card: bg-zinc-900
Border: border-zinc-800
Text: text-zinc-100
Muted: text-zinc-400
Accent: violet-500/600
Success: emerald-500
Warning: amber-500
Error: red-500
```

### Spacing
```
px-2 py-1    - Badges
px-4 py-2    - Buttons
px-6 py-3    - Cards
px-8 py-6    - Sections
gap-2/4/6/8  - Grid gaps
max-w-7xl    - Page width
```

### Useful Links
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Framer Motion](https://motion.dev)
- [Three.js](https://threejs.org)
- [R3F Docs](https://r3f.docs.pmnd.rs)
- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com)
