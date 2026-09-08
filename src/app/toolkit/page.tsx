"use client";

import { ToolkitSidebar } from "@/components/toolkit/toolkit-sidebar";
import { ToolSection } from "@/components/toolkit/tool-section";
import { CodeBlock } from "@/components/toolkit/code-block";
import { PromptSnippet } from "@/components/toolkit/prompt-snippet";
import { InfoCard } from "@/components/toolkit/info-card";
import { CodeGroup } from "@/components/toolkit/code-group";
import { motion } from "framer-motion";
import {
  Terminal,
  Palette,
  Database,
  Rocket,
  Copy,
  Clapperboard,
  Blocks,
  Zap,
  Sparkles,
  Workflow,
  FolderGit2,
  BarChart3,
  Lock,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function ToolkitPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <ToolkitSidebar />

      <main className="lg:pl-72">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-12">
          {/* ============ HERO / OVERVIEW ============ */}
          <ToolSection id="overview" step="Welcome" title="The Complete 5th_row Toolkit" subtitle="Zero-to-deploy master guide. Open this whenever you empty out. Everything you need to build gaand-faad client websites, from a blank folder to a live URL.">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Terminal, label: "Setup", desc: "Scratch → Stack" },
                { icon: Palette, label: "Design", desc: "Premium formula" },
                { icon: Database, label: "Backend", desc: "Supabase global" },
                { icon: Rocket, label: "Deploy", desc: "Live in minutes" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 text-center backdrop-blur-sm"
                >
                  <item.icon className="mx-auto mb-3 h-6 w-6 text-violet-400" />
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                  <div className="mt-1 text-xs text-zinc-500">{item.desc}</div>
                </motion.div>
              ))}
            </div>

            <InfoCard title="The Stack (everything pre-installed)">
              Next.js 16 • React 19 • TypeScript • Tailwind CSS v4 • shadcn/ui • lucide-react • Three.js + R3F + drei • framer-motion • sonner • Supabase • react-hook-form + zod • zustand • recharts • date-fns • cmdk
            </InfoCard>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                <div className="mb-3 text-sm font-semibold text-white">5 Skills Auto-Trigger</div>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>• <span className="text-zinc-300">website-cloner</span> — rebuild any site</li>
                  <li>• <span className="text-zinc-300">ui-ux-premium</span> — expensive look</li>
                  <li>• <span className="text-zinc-300">client-project</span> — get paid</li>
                  <li>• <span className="text-zinc-300">responsive-testing</span> — every screen</li>
                  <li>• <span className="text-zinc-300">supabase-backend</span> — build backend</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                <div className="mb-3 text-sm font-semibold text-white">The Magic Prompt Formula</div>
                <p className="text-sm leading-relaxed text-zinc-400">
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5">[What you want] + [the look/style] + [reference link]</code>
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                <div className="mb-3 text-sm font-semibold text-white">One-Time Accounts</div>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>• GitHub — code + backup</li>
                  <li>• Vercel — free hosting</li>
                  <li>• Supabase — free backend</li>
                </ul>
              </div>
            </div>
          </ToolSection>

          {/* ============ STEP 1: SETUP ============ */}
          <ToolSection id="setup" step="Step 1" title="Start From Scratch" subtitle="Create a fresh Next.js project with everything preconfigured. Takes under 5 minutes.">
            <CodeGroup title="Create the project">
              <CodeBlock code={`npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`} />
            </CodeGroup>

            <InfoCard variant="warning" title="If asked about Turbopack">
              Answer <strong>Yes</strong> — it makes dev faster. For the rest, accept defaults or choose: TypeScript: Yes, ESLint: Yes, Tailwind: Yes, src dir: Yes, App Router: Yes, import alias: @/*
            </InfoCard>

            <CodeGroup title="Enter the project">
              <CodeBlock code={`cd my-app`} />
            </CodeGroup>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: FolderGit2, name: "GitHub", url: "github.com", note: "Host code + portfolio" },
                { icon: Rocket, name: "Vercel", url: "vercel.com", note: "Free hosting" },
                { icon: Database, name: "Supabase", url: "supabase.com", note: "Free backend" },
              ].map((s) => (
                <div key={s.name} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                  <s.icon className="mb-3 h-6 w-6 text-violet-400" />
                  <div className="text-sm font-semibold text-white">{s.name}</div>
                  <div className="text-xs text-zinc-500">{s.url}</div>
                  <div className="mt-1 text-xs text-zinc-600">{s.note}</div>
                </div>
              ))}
            </div>

            <PromptSnippet prompt="Create a complete Next.js project for [business]. Pages: home, about, services, contact. Premium dark theme with violet accent." />
          </ToolSection>

          {/* ============ STEP 2: INSTALL + CONFIG ============ */}
          <ToolSection id="deps" step="Step 2" title="Install + Configure" subtitle="Install the full premium toolkit stack and wire up shadcn/ui. This is the power setup.">
            <CodeGroup title="Install premium dependencies">
              <CodeBlock code={`npm install @supabase/ssr @supabase/supabase-js
npm install three @react-three/fiber @react-three/drei
npm install framer-motion sonner cmdk zustand
npm install react-hook-form zod recharts date-fns lucide-react`} />
            </CodeGroup>

            <CodeGroup title="Set up shadcn/ui">
              <CodeBlock code={`npx shadcn@latest init
npx shadcn@latest add button card input label textarea dialog dropdown-menu tabs badge avatar skeleton command`} />
            </CodeGroup>

            <InfoCard title="After shadcn init : enable dark mode">
              In <code className="rounded bg-zinc-800 px-1.5 py-0.5">components.json</code> ensure the theme is set, and add <code className="rounded bg-zinc-800 px-1.5 py-0.5">dark</code> class to the html tag for a dark-first app.
            </InfoCard>

            <CodeGroup title="Set fonts (layout.tsx)">
              <CodeBlock code={`import { Geist, Geist_Mono, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

<html className={cn("dark h-full antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}>`} />
            </CodeGroup>

            <InfoCard variant="success" title="Verify it works">
              Run <code className="rounded bg-zinc-800 px-1.5 py-0.5">npm run dev</code> → open http://localhost:3000. Then <code className="rounded bg-zinc-800 px-1.5 py-0.5">npm run build</code> to confirm no errors.
            </InfoCard>
          </ToolSection>

          {/* ============ STEP 3: DESIGN SYSTEM ============ */}
          <ToolSection id="design" step="Step 3" title="The Premium Design Formula" subtitle="The secret to making everything look expensive. Apply this baseline to every single page.">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                <div className="mb-4 text-sm font-semibold text-white">Color Strategy</div>
                <ul className="space-y-3 text-sm">
                  {[
                    ["Background", "bg-zinc-950", "text-zinc-100"],
                    ["Cards", "bg-zinc-900", "border-zinc-800"],
                    ["Muted text", "text-zinc-500", "text-zinc-400"],
                    ["Accent", "violet-500/600", "glow shadows"],
                    ["Success", "emerald-500", "Warning: amber-500"],
                    ["Error", "red-500", "Info: blue-500"],
                  ].map(([label, a, b]) => (
                    <li key={label} className="flex items-center justify-between gap-2">
                      <span className="text-zinc-500">{label}</span>
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-white">{a}</code>
                        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-white">{b}</code>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                <div className="mb-4 text-sm font-semibold text-white">Typography</div>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li><strong className="text-white">Hero:</strong> text-5xl md:text-7xl font-semibold tracking-tight</li>
                  <li><strong className="text-white">Gradient text:</strong> bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500</li>
                  <li><strong className="text-white">Body:</strong> text-base md:text-lg text-zinc-400</li>
                  <li><strong className="text-white">Spacing:</strong> py-24 md:py-32 per section</li>
                  <li><strong className="text-white">Container:</strong> max-w-7xl mx-auto px-4 sm:px-6 lg:px-8</li>
                </ul>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                <div className="mb-4 text-sm font-semibold text-white">Premium Page Structure</div>
                <ol className="space-y-1.5 text-sm text-zinc-400">
                  {["Hero → headline + gradient CTA + product preview","Logos → trusted-by grayscale strip","Features → 3-6 cards with hover glow","Highlight → alternating image + text","Stats → animated counters"].map((s,i)=>(<li key={s} className="flex gap-2"><span className="text-violet-400">{i+1}.</span>{s}</li>))}
                  <li className="flex gap-2"><span className="text-violet-400">6.</span>Testimonials → 3 quote cards</li>
                  <li className="flex gap-2"><span className="text-violet-400">7.</span>Pricing → 3 tiers, middle = Most Popular</li>
                  <li className="flex gap-2"><span className="text-violet-400">8.</span>FAQ → accordion</li>
                  <li className="flex gap-2"><span className="text-violet-400">9.</span>Final CTA → gradient band</li>
                  <li className="flex gap-2"><span className="text-violet-400">10.</span>Footer → 4 columns + socials</li>
                </ol>
              </div>

              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                <div className="mb-4 text-sm font-semibold text-white">Premium Button (copy-paste)</div>
                <CodeBlock code={`<button className="rounded-full bg-violet-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
  Get Started
</button>`} />
              </div>
            </div>
          </ToolSection>

          {/* ============ STEP 4: FRONTEND ============ */}
          <ToolSection id="frontend" step="Step 4" title="Frontend Building Blocks" subtitle="Components, 3D, and animations. The bread and butter of building beautiful pages fast.">
            <CodeGroup title="3D Hero Scene">
              <CodeBlock code={`"use client";
import { Canvas } from "@react-three/fiber";
import { Float, ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

export function Hero3D() {
  return (
    <div className="relative h-[450px] w-full">
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
}`} />
            </CodeGroup>

            <InfoCard variant="warning" title="3D Rules">
              1. Always &apos;use client&apos; on 3D files. 2. Container needs explicit height. 3. Wrap in Suspense. 4. Use Environment preset for good lighting.
            </InfoCard>

            <CodeGroup title="Framer-motion Fade-Up">
              <CodeBlock code={`"use client";
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>`} />
            </CodeGroup>

            <CodeGroup title="Stagger List">
              <CodeBlock code={`<motion.div initial="hidden" whileInView="visible"
  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
  {items.map(i => (
    <motion.div key={i.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
      {i.name}
    </motion.div>
  ))}
</motion.div>`} />
            </CodeGroup>

            <CodeGroup title="Sonner Toasts">
              <CodeBlock code={`import { toast } from "sonner";
toast.success("Saved!");
toast.error("Something failed");
toast.promise(save(), { loading: "Saving…", success: "Done!", error: "Failed" });`} />
            </CodeGroup>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <CodeGroup title="Navbar — glassmorphic premium">
                  <CodeBlock code={`"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  // add scroll listener...
  return (
    <nav className={\`fixed top-0 z-50 w-full transition-all duration-500 \${
      scrolled ? "border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl" : "bg-transparent"
    }\`}>
      {/* logo + links + hamburger */}
    </nav>
  );
}`} />
                </CodeGroup>
              </div>
              <div>
                <CodeGroup title="Animated Counter (stats)">
                  <CodeBlock code={`const ref = useRef(null);
const isInView = useInView(ref, { once: true });
useEffect(() => {
  if (!isInView) return;
  let s = 0; const step = target / (2000 / 16);
  const t = setInterval(() => {
    s += step;
    if (s >= target) { setCount(target); clearInterval(t); }
    else setCount(Math.floor(s));
  }, 16);
  return () => clearInterval(t);
}, [isInView]);`} />
                </CodeGroup>
              </div>
            </div>
          </ToolSection>

          {/* ============ STEP 5: BACKEND ============ */}
          <ToolSection id="backend" step="Step 5" title="Backend + Supabase (Global Setup)" subtitle="Set up the backend ONCE, reuse it in every project. No more reconnecting every time.">
            <CodeGroup title="1. Create .env.local">
              <CodeBlock code={`# Get these from supabase.com → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`} />
            </CodeGroup>

            <InfoCard title="The Global Files (already in src/lib/supabase/ of the 5th_row project)">
              Copy this folder <code className="rounded bg-zinc-800 px-1.5 py-0.5">src/lib/supabase/</code> into every new project. It has: client.ts, server.ts, middleware.ts, use-user.ts, use-auth.ts, use-storage.ts, use-realtime.ts. Then just change the .env.local keys.
            </InfoCard>

            <CodeGroup title="2. Auth — login/signup/signout hooks">
              <CodeBlock code={`"use client";
import { useAuth } from "@/lib/supabase/use-auth";
import { useUser } from "@/lib/supabase/use-user";

export function AuthUI() {
  const { signIn, signUp, signOut, loading } = useAuth();
  const { user } = useUser();

  if (user) return <button onClick={signOut}>Sign Out ({user.email})</button>;
  return (
    <div className="flex gap-2">
      <button onClick={() => signUp("email@x.com", "pass123", "Name")} disabled={loading}>Sign Up</button>
      <button onClick={() => signIn("email@x.com", "pass123")} disabled={loading}>Sign In</button>
    </div>
  );
}`} />
            </CodeGroup>

            <CodeGroup title="3. Database CRUD">
              <CodeBlock code={`import { createClient } from "@/lib/supabase/server";
const supabase = await createClient();

// INSERT
await supabase.from("contacts").insert({ name, email, message }).select().single();
// SELECT
const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
// UPDATE
await supabase.from("users").update({ name: "New" }).eq("id", id);
// DELETE
await supabase.from("users").delete().eq("id", id);`} />
            </CodeGroup>

            <CodeGroup title="4. Storage — file uploads">
              <CodeBlock code={`"use client";
import { useStorage } from "@/lib/supabase/use-storage";

export function Upload() {
  const { upload, uploading } = useStorage("avatars");
  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { url } = await upload(file, \`user-\${Date.now()}.png\`);
    console.log("Public URL:", url);
  };
  return <input type="file" onChange={onFile} disabled={uploading} />;
}`} />
            </CodeGroup>

            <CodeGroup title="5. Realtime — live updates">
              <CodeBlock code={`"use client";
import { useRealtime } from "@/lib/supabase/use-realtime";

export function LiveMessages() {
  const msgs = useRealtime({ table: "messages", event: "INSERT" });
  return <ul>{msgs.map(m => <li key={m.id}>{m.content}</li>)}</ul>;
}`} />
            </CodeGroup>

            <InfoCard variant="success" title="RLS — ALWAYS enable">
              Turn on Row Level Security in Supabase dashboard. Example: users can only edit their own row — <code className="rounded bg-zinc-800 px-1.5 py-0.5">USING (auth.uid() = user_id)</code>
            </InfoCard>
          </ToolSection>

          {/* ============ STEP 6: TEMPLATES ============ */}
          <ToolSection id="templates" step="Step 6" title="Ready-to-Use Templates" subtitle="Complete starter templates. Copy the structure, customize, ship.">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { icon: Blocks, name: "Landing Page", desc: "Hero, logos, features, stats, testimonials, pricing, FAQ, CTA, footer", code: "Perfect for any business site. Use the premium formula." },
                { icon: Lock, name: "Auth App", desc: "Login, signup, logout, protected routes, user profile", code: "Wired to Supabase auth with useAuth + useUser hooks." },
                { icon: BarChart3, name: "Dashboard", desc: "Recharts analytics, stat cards, live data, sidebar layout", code: "Use useRealtime for live updates." },
                { icon: Clapperboard, name: "3D Showcase", desc: "Three.js hero, interactive product viewer, particles", code: "Hero3D with Suspense + Environment." },
                { icon: Workflow, name: "E-Comm Store", desc: "Product grid, cart, checkout, Supabase orders", code: "Storage for products, DB for cart." },
              ].map((t) => (
                <div key={t.name} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all hover:-translate-y-1 hover:border-violet-500/30">
                  <t.icon className="mb-3 h-6 w-6 text-violet-400" />
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="mt-1 text-xs text-zinc-500">{t.desc}</div>
                  <div className="mt-2 text-xs text-zinc-600">{t.code}</div>
                </div>
              ))}
              <div className="rounded-2xl border-2 border-dashed border-violet-500/30 bg-violet-500/5 p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-violet-400" />
                  <div>
                    <div className="text-sm font-semibold text-white">Need a custom template?</div>
                    <div className="mt-1 text-xs text-zinc-500">Ask opencode to build it for you.</div>
                  </div>
                </div>
              </div>
            </div>

            <PromptSnippet prompt="Create a premium landing page for [business]. Sections: hero with gradient CTA, trust logos, 3 feature cards, stats, 3 testimonials, pricing (3 tiers, middle highlighted), FAQ, footer. Dark zinc theme, violet accent, mobile responsive, framer-motion animations." />
          </ToolSection>

          {/* ============ STEP 7: DEPLOY ============ */}
          <ToolSection id="deploy" step="Step 7" title="Deployment + Getting Paid" subtitle="Ship to a live URL in minutes and hand off like a pro.">
            <CodeGroup title="Deploy to Vercel">
              <CodeBlock code={`# Push to GitHub first
git add .
git commit -m "Ready to deploy"
git push origin main

# Then deploy
vercel
vercel --prod`} />
            </CodeGroup>

            <InfoCard title="Or use the Vercel dashboard">
              vercel.com → Add New Project → import your GitHub repo → Deploy. Vercel auto-detects Next.js.
            </InfoCard>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                <div className="mb-3 text-sm font-semibold text-white">Post-deploy checklist</div>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>• Live URL works</li>
                  <li>• Forms submit (test them!)</li>
                  <li>• Env vars set on Vercel dashboard</li>
                  <li>• Custom domain connected (if client gave one)</li>
                  <li>• Page title + favicon + meta description</li>
                  <li>• Redirect www → non-www</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                <div className="mb-3 text-sm font-semibold text-white">Client quick pricing</div>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>• Landing page: $300 – $800</li>
                  <li>• Multi-page site: $800 – $2,000</li>
                  <li>• E-comm / booking: $2,000 – $5,000+</li>
                  <li>• Maintenance: $50 – $200/mo</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="text-sm font-semibold text-emerald-400">Workflow that gets you paid</div>
              <ol className="mt-2 space-y-1.5 text-sm text-zinc-400">
                <li>1. 50% deposit upfront → start building</li>
                <li>2. Show draft → 1 revision round included</li>
                <li>3. 50% on launch → deploy + hand over</li>
                <li>4. Ask for a Google review + testimonial</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-rose-400">
                <ShieldCheck className="h-4 w-4" /> Security Hardening (already built-in to 5th_row)
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                  <div className="text-sm font-semibold text-white">Security Headers (next.config.ts)</div>
                  <ul className="mt-2 space-y-1.5 text-sm text-zinc-400">
                    <li>• CSP — blocks XSS &amp; injected scripts</li>
                    <li>• X-Frame-Options DENY — stops clickjacking</li>
                    <li>• X-Content-Type-Options — stops MIME sniffing</li>
                    <li>• HSTS — forces HTTPS</li>
                    <li>• Referrer-Policy — hides full URLs on navigation</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                  <div className="text-sm font-semibold text-white">Action API Protection</div>
                  <ul className="mt-2 space-y-1.5 text-sm text-zinc-400">
                    <li>• Whitelisted commands only — no raw input</li>
                    <li>• Rate limited (20/min per IP)</li>
                    <li>• Working dir locked to project folder (no ..)</li>
                    <li>• Timeout on every command</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="text-sm font-semibold text-white">Non-negotiable basics for every deployed site</div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {["NEVER expose service role key (server only)","Always enable Supabase RLS on every table","Keep secrets in .env.local + Vercel env vars","Use rate limiting on all forms/APIs","Validate all input with zod on server","Never trust client data — recheck on server","Use next/image (no raw img for remote)","Add catch-all 404 / error boundary"].map((s) => (
                    <div key={s} className="flex items-start gap-2 text-sm text-zinc-400">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ToolSection>

          {/* ============ STEP 8: FIXES + SKILLS ============ */}
          <ToolSection id="help" step="Step 8" title="Help, Fixes, & Skills" subtitle="The troubleshooting guide and the full reference for every skill with all trigger keywords.">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["&quot;use client&quot; errors", "Add \"use client\" as the FIRST line of the file."],
                ["3D canvas blank", "Container needs height (h-[450px]) + Suspense + 'use client'."],
                ["Tailwind not working", "Rebuild/restart dev server. Check globals.css imports @import \"tailwindcss\"."],
                ["Form not submitting", "Check API route path + action. Open console for errors."],
                ["Env vars missing after deploy", "Add them in Vercel dashboard → Settings → Environment Variables. Restart."],
                ["Build fails", "Run npm run lint first. Check for missing 'use client' and un-awaited params."],
                ["Images broken", "Use next/image with width/height. Allow remote domains in next.config.ts."],
                ["Page slow", "Check performance with Chrome DevTools, optimize images + lazy load."],
              ].map(([q, a]) => (
                <div key={q} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                  <div className="text-sm font-semibold text-white">{q}</div>
                  <div className="mt-2 text-sm leading-relaxed text-zinc-500">{a}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: "website-cloner", icon: Copy, keywords: ["clone website","learn from site","make it look like","copy design","reference website","analyze website","extract design from [URL]"], desc: "Analyzes colors/typography/layout and rebuilds it" },
                { name: "ui-ux-premium", icon: Sparkles, keywords: ["make it premium","make it look expensive","high class","goated","beautiful design","amazing UI","luxury look","modern aesthetic"], desc: "Applies the premium design formula" },
                { name: "client-project", icon: Workflow, keywords: ["client","client project","client work","client website","paid work","freelance","deliver to client","requirements"], desc: "Guides the full paid-client workflow" },
                { name: "responsive-testing", icon: Blocks, keywords: ["mobile responsive","check mobile","responsive","fix mobile","test on phone","mobile view","breakpoints","tablet view","desktop view"], desc: "Screenshots + fixes every screen size" },
                { name: "supabase-backend", icon: Database, keywords: ["database","backend","supabase","auth","login","signup","realtime","storage","API","tables","rows","postgres","sign in","user accounts","forms data"], desc: "Builds backend features correctly" },
              ].map((skill) => (
                <div key={skill.name} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                  <div className="flex items-center gap-2">
                    <skill.icon className="h-5 w-5 text-violet-400" />
                    <div className="text-sm font-semibold text-white">{skill.name}</div>
                  </div>
                  <div className="mt-2 text-xs text-zinc-500">{skill.desc}</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {skill.keywords.map((k) => (
                      <span key={k} className="rounded-full border border-zinc-800 bg-zinc-800/50 px-2 py-0.5 text-[11px] text-zinc-400">{k}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <CodeGroup title="Master prompt — build anything">
              <CodeBlock code={`"Create a complete client website for [business]. Pages: home, about, services, portfolio, contact. Home has hero, features, testimonials, CTA. Contact form saves to Supabase. Premium dark theme. Deploy it and give me the link."`} />
            </CodeGroup>
          </ToolSection>

          {/* ============ FOOTER ============ */}
          <footer className="border-t border-zinc-800/50 py-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-bold text-white">5TH_ROW TOOLKIT</span>
              </div>
              <p className="text-xs text-zinc-600">
                The Doraemon magic pocket — stack, skills, and prompts all in one place.
              </p>
              <p className="text-xs text-zinc-700">Use this pocket. Ship great sites. Make that money.</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
