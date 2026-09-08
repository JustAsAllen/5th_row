import { NextResponse } from "next/server";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { join, isAbsolute, normalize } from "node:path";

const execAsync = promisify(exec);

// ---- Rate limiter using sliding window + response headers ----
// Returns headers so clients know their quota. In-memory, resets on restart.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;
const hits = new Map<string, number[]>();

function getRateLimitHeaders(ip: string): { remaining: number; reset: number } {
  const now = Date.now();
  const timestamps = hits.get(ip)?.filter((t) => now - t < WINDOW_MS) ?? [];
  hits.set(ip, timestamps);
  const remaining = Math.max(0, MAX_REQUESTS - timestamps.length);
  const oldest = timestamps[0] ?? now;
  const reset = Math.ceil((oldest + WINDOW_MS - now) / 1000);
  return { remaining, reset: Math.max(reset, 1) };
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = hits.get(ip)?.filter((t) => now - t < WINDOW_MS) ?? [];
  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

// ----
// Registry of safe, predefined commands. Never accept raw user input here.
const ACTIONS: Record<
  string,
  { name: string; description: string; cmd: string; category: string; destructive?: boolean }
> = {
  // ===== Verify / health =====
  "lint": { name: "Run ESLint", description: "Check for code errors across the project", cmd: "npm run lint", category: "Verify" },
  "typecheck": { name: "Typecheck", description: "Check TypeScript types (tsc --noEmit)", cmd: "npx tsc --noEmit", category: "Verify" },
  "build": { name: "Production Build", description: "Build the project with npm run build", cmd: "npm run build", category: "Verify" },
  "dev": { name: "Start Dev Server", description: "Start Next.js dev server at localhost:3000", cmd: "npm run dev", category: "Verify" },

  // ===== Project scaffold =====
  "add-shadcn": {
    name: "Add shadcn/ui Components",
    description: "Install core shadcn/ui primitives",
    cmd: "npx shadcn@latest add button card input label textarea dialog dropdown-menu tabs badge avatar skeleton command -y",
    category: "Setup",
  },
  "install-stack": {
    name: "Install Premium Stack",
    description: "Install 3D, animation, backend, and utility libraries",
    cmd: "npm install @supabase/ssr @supabase/supabase-js three @react-three/fiber @react-three/drei framer-motion sonner cmdk zustand react-hook-form zod recharts date-fns lucide-react",
    category: "Setup",
  },

  // ===== Supabase =====
  "supabase-init": {
    name: "Initialize Supabase",
    description: "Install the Supabase CLI and start login",
    cmd: "npx supabase init",
    category: "Backend",
  },

  // ===== Deploy =====
  "deploy-prod": { name: "Deploy to Vercel (Prod)", description: "Build and deploy to the production URL", cmd: "vercel --prod --yes", category: "Deploy" },
  "deploy-preview": { name: "Deploy Preview", description: "Deploy a preview URL to Vercel", cmd: "vercel --yes", category: "Deploy" },
  "deploy-check": { name: "Check Vercel Projects", description: "List your Vercel projects", cmd: "vercel ls --yes", category: "Deploy" },

  // ===== Version info =====
  "versions": { name: "Check Versions", description: "Print Node, npm, Next, and key package versions", cmd: "node -v && npm -v && npx next --version", category: "Verify" },
};

function resolveSafeCwd(input: unknown): string {
  // Only allow a relative subdirectory under the server cwd.
  if (typeof input === "string" && input.trim() !== "" && !input.includes("..") && !isAbsolute(input)) {
    const candidate = join(/* turbopackIgnore: true */ process.cwd(), input);
    const base = process.cwd();
    if (candidate === base || candidate.startsWith(base)) {
      return normalize(candidate);
    }
  }
  return process.cwd();
}

interface ExecError {
  stdout?: string;
  stderr?: string;
  message?: string;
}

function isExecError(e: unknown): e is ExecError {
  return typeof e === "object" && e !== null && ("stdout" in e || "stderr" in e || "message" in e);
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  const rateHeaders = getRateLimitHeaders(ip);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many commands. Slow down." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(MAX_REQUESTS),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateHeaders.reset),
          "Retry-After": String(rateHeaders.reset),
        },
      }
    );
  }

  try {
    const body = await request.json() as { action?: string; dir?: string };
    const { action, dir } = body;
    const definition = action ? ACTIONS[action] : undefined;

    if (!definition) {
      return NextResponse.json(
        { error: `Unknown action: ${action ?? "none"}` },
        { status: 400 }
      );
    }

    const cwd = resolveSafeCwd(dir);
    const start = Date.now();

    try {
      const { stdout, stderr } = await execAsync(definition.cmd, { cwd, timeout: 120000 });
      return NextResponse.json(
        {
          ok: true,
          action: definition.name,
          output: stdout || stderr,
          ms: Date.now() - start,
        },
        {
          headers: {
            "X-RateLimit-Limit": String(MAX_REQUESTS),
            "X-RateLimit-Remaining": String(rateHeaders.remaining - 1),
            "X-RateLimit-Reset": String(rateHeaders.reset),
          },
        }
      );
    } catch (e: unknown) {
      const err: ExecError = isExecError(e) ? e : { message: String(e) };
      return NextResponse.json(
        {
          ok: false,
          action: definition.name,
          output: (err.stdout || "") + (err.stderr || err.message || "Command failed"),
          ms: Date.now() - start,
        },
        {
          headers: {
            "X-RateLimit-Limit": String(MAX_REQUESTS),
            "X-RateLimit-Remaining": String(rateHeaders.remaining - 1),
            "X-RateLimit-Reset": String(rateHeaders.reset),
          },
        }
      );
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  // Return the list of available (safe) actions for the control center UI.
  return NextResponse.json(
    Object.entries(ACTIONS).map(([id, def]) => ({
      id,
      name: def.name,
      description: def.description,
      category: def.category,
    }))
  );
}

