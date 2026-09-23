import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import { join, relative, basename, sep } from "node:path";
import { checkRate, clientIp } from "@/lib/control/rate-limit";
import type { HealthSignal, ProjectXRay } from "@/lib/control/types";

const SCAN_CAP = 600;
const READ_CAP_BYTES = 200_000;

async function exists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function readJson(path: string): Promise<Record<string, unknown> | null> {
  try {
    const raw = await fs.readFile(path, "utf8");
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

interface WalkResult {
  files: string[];
  truncated: boolean;
}

async function walk(dir: string, root: string, out: string[], cap: number): Promise<WalkResult> {
  let truncated = false;
  const queue: string[] = [dir];
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;
    let entries: import("node:fs").Dirent[];
    try {
      entries = (await fs.readdir(current, { withFileTypes: true })) as import("node:fs").Dirent[];
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        queue.push(full);
      } else if (entry.isFile()) {
        if (out.length >= cap) {
          truncated = true;
          return { files: out, truncated };
        }
        out.push(relative(root, full));
      }
    }
  }
  return { files: out, truncated };
}

async function grepCount(root: string, relFiles: string[], pattern: RegExp): Promise<number> {
  let total = 0;
  for (const rel of relFiles) {
    try {
      const stat = await fs.stat(join(root, rel));
      if (stat.size > READ_CAP_BYTES) continue;
      const content = await fs.readFile(join(root, rel), "utf8");
      const matches = content.match(pattern);
      if (matches) total += matches.length;
    } catch {
      // Unreadable file — skip.
    }
  }
  return total;
}

const FRIENDLY_DEPS: { match: RegExp; label: string }[] = [
  { match: /^@supabase\//, label: "Supabase" },
  { match: /^three$|^@react-three\//, label: "Three.js / R3F" },
  { match: /rive/, label: "Rive" },
  { match: /framer-motion/, label: "Framer Motion" },
  { match: /tailwind/, label: "Tailwind CSS" },
  { match: /^zod$/, label: "Zod" },
  { match: /^zustand$/, label: "Zustand" },
  { match: /react-hook-form/, label: "React Hook Form" },
  { match: /^recharts$/, label: "Recharts" },
  { match: /^cmdk$/, label: "cmdk" },
  { match: /^lenis$/, label: "Lenis" },
  { match: /^sonner$/, label: "Sonner" },
  { match: /lucide/, label: "Lucide icons" },
  { match: /^shadcn$|@base-ui/, label: "shadcn / Base UI" },
  { match: /playwright/, label: "Playwright" },
  { match: /^vitest$|^jest$/, label: "Test runner" },
  { match: /^stripe/, label: "Stripe" },
  { match: /resend|nodemailer/, label: "Email" },
  { match: /gsap|animejs/, label: "Animation lib" },
];

function detectIntegrations(pkg: Record<string, unknown>): string[] {
  const deps = {
    ...(typeof pkg.dependencies === "object" && pkg.dependencies ? (pkg.dependencies as Record<string, string>) : {}),
    ...(typeof pkg.devDependencies === "object" && pkg.devDependencies ? (pkg.devDependencies as Record<string, string>) : {}),
  };
  const labels = new Set<string>();
  for (const name of Object.keys(deps)) {
    for (const rule of FRIENDLY_DEPS) {
      if (rule.match.test(name)) labels.add(rule.label);
    }
  }
  return [...labels];
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const { limited, headers } = checkRate(ip, 20);
  if (limited) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers });
  }

  const root = process.cwd();

  const [pkg, tsconfig, readme, agentsMd, nextConfig, globalsCss, lockNpm, lockPnpm, lockBun, lockYarn] =
    await Promise.all([
      readJson(join(root, "package.json")),
      exists(join(root, "tsconfig.json")),
      exists(join(root, "README.md")),
      exists(join(root, "AGENTS.md")),
      exists(join(root, "next.config.ts")) || exists(join(root, "next.config.js")) || exists(join(root, "next.config.mjs")),
      exists(join(root, "src", "app", "globals.css")),
      exists(join(root, "package-lock.json")),
      exists(join(root, "pnpm-lock.yaml")),
      exists(join(root, "bun.lockb")) || exists(join(root, "bun.lock")),
      exists(join(root, "yarn.lock")),
    ]);

  const packageManager = lockPnpm ? "pnpm" : lockBun ? "bun" : lockYarn ? "yarn" : lockNpm ? "npm" : "unknown";

  const deps = pkg
    ? {
        ...(typeof pkg.dependencies === "object" && pkg.dependencies ? (pkg.dependencies as Record<string, string>) : {}),
        ...(typeof pkg.devDependencies === "object" && pkg.devDependencies ? (pkg.devDependencies as Record<string, string>) : {}),
      }
    : {};
  const scripts = pkg && typeof pkg.scripts === "object" && pkg.scripts
    ? Object.keys(pkg.scripts as Record<string, string>)
    : [];

  const framework = deps.next ? "Next.js" : deps["@remix-run/react"] ? "Remix" : deps.nuxt ? "Nuxt" : deps.react ? "React (no framework detected)" : "Unknown";
  const frameworkVersion = deps.next ? String(deps.next) : deps.react ? String(deps.react) : "—";

  let strictTs = false;
  if (tsconfig) {
    try {
      const raw = await fs.readFile(join(root, "tsconfig.json"), "utf8");
      strictTs = /"strict"\s*:\s*true/.test(raw);
    } catch {
      strictTs = false;
    }
  }

  let hasSecurityHeaders = false;
  if (nextConfig) {
    const cfgName = (await exists(join(root, "next.config.ts")))
      ? "next.config.ts"
      : (await exists(join(root, "next.config.js")))
        ? "next.config.js"
        : "next.config.mjs";
    try {
      const content = await fs.readFile(join(root, cfgName), "utf8");
      hasSecurityHeaders = /headers\s*\(/.test(content) && /X-Frame-Options|Content-Security-Policy/.test(content);
    } catch {
      hasSecurityHeaders = false;
    }
  }

  const srcDir = join(root, "src");
  const scanRoot = (await exists(srcDir)) ? srcDir : root;
  const { files: allFiles } = await walk(scanRoot, root, [], SCAN_CAP);

  const sourceFiles = allFiles.filter((f) => /\.(ts|tsx|js|jsx|mjs)$/.test(f) && !f.endsWith(".d.ts"));
  const testFiles = allFiles.filter((f) => /\.(test|spec)\.[tj]sx?$/.test(f) || f.includes(`${sep}__tests__${sep}`) || f.includes("/__tests__/"));
  const componentFiles = allFiles.filter((f) => f.includes(`components${sep}`) || f.includes("/components/"));

  const routes = allFiles
    .filter((f) => /(^|[\\/])page\.(tsx|jsx|ts|js)$/.test(f))
    .map((f) => "/" + f.replace(/[\\/]?page\.(tsx|jsx|ts|js)$/, "").replace(/^[\\/]?src[\\/]app[\\/]?/, "").split(sep).filter(Boolean).join("/"))
    .map((r) => (r === "/" || r === "" ? "/" : r.replace(/\/$/, "")))
    .filter((r, i, arr) => arr.indexOf(r) === i)
    .sort();

  const apiRoutes = allFiles
    .filter((f) => /route\.(ts|js)$/.test(f) && f.includes("app"))
    .map((f) => "/" + f.replace(/^[\\/]?src[\\/]app[\\/]?/, "").replace(/[\\/]route\.(ts|js)$/, "").split(sep).filter(Boolean).join("/"))
    .map((r) => (r === "" ? "/" : r))
    .sort();

  const textFiles = sourceFiles;
  const [anyCasts, consoleCount, todoCount] = await Promise.all([
    grepCount(root, textFiles, /\bas\s+any\b|:\s*any\b/g),
    grepCount(root, textFiles, /console\.(log|debug|info)\s*\(/g),
    grepCount(root, textFiles, /\b(TODO|FIXME|HACK)\b/g),
  ]);

  const hasTests = testFiles.length > 0 || scripts.includes("test");
  const hasStrictConfig = tsconfig && strictTs;
  const database = deps["@supabase/supabase-js"] || deps["@supabase/ssr"]
    ? "Supabase"
    : deps.pg || deps["postgres"]
      ? "Postgres"
      : deps.prisma
        ? "Prisma"
        : deps.mongoose
          ? "MongoDB"
          : "None detected";

  let styling = "None detected";
  if (deps.tailwindcss || deps["@tailwindcss/postcss"]) styling = "Tailwind CSS";
  if (globalsCss) {
    try {
      const css = await fs.readFile(join(root, "src", "app", "globals.css"), "utf8");
      if (css.includes("@import \"tailwindcss\"") || css.includes("@tailwind")) styling = "Tailwind CSS v4";
    } catch {
      // Keep dep-based detection.
    }
  }

  const architecture = routes.length > 0 && (await exists(join(srcDir, "app")))
    ? "Next.js App Router"
    : (await exists(join(root, "pages")) || (await exists(join(srcDir, "pages"))))
      ? "Pages Router"
      : deps.react
        ? "React SPA (structure varies)"
        : "Unknown";

  const health: HealthSignal[] = [
    {
      id: "testing",
      label: "Testing",
      status: hasTests ? "good" : "watch",
      evidence: hasTests
        ? `${testFiles.length} test file(s)${scripts.includes("test") ? " + test script" : ""}`
        : "No test files or test script detected",
      heuristic: true,
    },
    {
      id: "documentation",
      label: "Documentation",
      status: readme && agentsMd ? "good" : readme || agentsMd ? "watch" : "unknown",
      evidence: `README: ${readme ? "yes" : "no"} · AGENTS.md: ${agentsMd ? "yes" : "no"}`,
      heuristic: true,
    },
    {
      id: "type-hygiene",
      label: "Type hygiene",
      status: !tsconfig ? "unknown" : anyCasts === 0 ? "good" : "watch",
      evidence: tsconfig
        ? `${anyCasts} unsafe cast(s)/any across ${sourceFiles.length} files (heuristic grep)`
        : "No tsconfig",
      heuristic: true,
    },
    {
      id: "console-hygiene",
      label: "Console hygiene",
      status: consoleCount === 0 ? "good" : "watch",
      evidence: `${consoleCount} console.log/debug call(s) in source`,
      heuristic: true,
    },
    {
      id: "todo-density",
      label: "TODO density",
      status: todoCount === 0 ? "good" : "watch",
      evidence: `${todoCount} TODO/FIXME/HACK marker(s)`,
      heuristic: true,
    },
    {
      id: "security-baseline",
      label: "Security baseline",
      status: hasSecurityHeaders && hasStrictConfig ? "good" : "watch",
      evidence: `security headers: ${hasSecurityHeaders ? "yes" : "no"} · strict TS: ${hasStrictConfig ? "yes" : "no"}`,
      heuristic: true,
    },
    {
      id: "performance-readiness",
      label: "Performance",
      status: "unknown",
      evidence: "Requires runtime measurement (open Performance Audit)",
      heuristic: true,
    },
  ];

  const xray: ProjectXRay = {
    scannedAt: new Date().toISOString(),
    rootName: basename(root),
    framework,
    frameworkVersion,
    language: tsconfig ? "TypeScript" : deps.javascript ? "JavaScript" : "Unknown",
    packageManager,
    database,
    architecture,
    styling,
    routes: routes.slice(0, 40),
    apiRoutes: apiRoutes.slice(0, 40),
    integrations: detectIntegrations(pkg ?? {}),
    scripts,
    testFiles: testFiles.length,
    sourceFiles: sourceFiles.length,
    componentCount: componentFiles.length,
    hasReadme: readme,
    hasAgentsMd: agentsMd,
    hasTests,
    hasStrictTs: hasStrictConfig,
    hasSecurityHeaders,
    health,
  };

  return NextResponse.json(xray, { headers });
}
