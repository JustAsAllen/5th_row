import { NextResponse } from "next/server";
import { spawn, type ChildProcess } from "node:child_process";
import { promises as fs } from "node:fs";
import { createHash } from "node:crypto";
import { join, isAbsolute, normalize } from "node:path";
import { tmpdir, homedir } from "node:os";
import { z } from "zod";
import { checkRate, clientIp } from "@/lib/control/rate-limit";

const JOB_DIR = join(tmpdir(), "5row-jobs");
const MAX_PROMPT_ARG = 28_000;
const HARD_TIMEOUT_MS = 900_000;

interface JobState {
  id: string;
  pid: number | undefined;
  startedAt: number;
  logPath: string;
  exitPath: string;
  child: ChildProcess | null;
  timedOut: boolean;
}

const jobs = new Map<string, JobState>();

const bodySchema = z.object({
  prompt: z.string().min(1).max(400_000),
  agent: z.string().max(64).regex(/^[a-z0-9-]*$/i, "invalid agent").optional(),
  model: z.string().max(128).regex(/^[a-z0-9._/-]*$/i, "invalid model").optional(),
  timeoutSec: z.number().int().min(30).max(900).optional(),
});

function resolveOpencode(): { cmd: string; shell: boolean } {
  const exe = join(
    process.env.APPDATA ?? join(homedir(), "AppData", "Roaming"),
    "npm",
    "node_modules",
    "opencode-ai",
    "bin",
    "opencode.exe"
  );
  return { cmd: exe, shell: false };
}

function safeCwd(input: unknown): string {
  if (typeof input === "string" && input.trim() !== "" && !input.includes("..") && !isAbsolute(input)) {
    const candidate = join(process.cwd(), input);
    const base = process.cwd();
    if (candidate === base || candidate.startsWith(base)) return normalize(candidate);
  }
  return process.cwd();
}

async function ensureJobDir(): Promise<void> {
  await fs.mkdir(JOB_DIR, { recursive: true });
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const { limited, headers } = checkRate(ip, 8);
  if (limited) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid body" },
      { status: 400 }
    );
  }

  const { prompt, agent, model, timeoutSec } = parsed.data;
  const rawDir = (json as { dir?: string }).dir;
  const cwd = safeCwd(rawDir);

  const { cmd } = resolveOpencode();
  try {
    await fs.access(cmd);
  } catch {
    return NextResponse.json(
      {
        error: "OpenCode CLI not found. Install opencode or use prompt copy/export.",
        code: "NOT_CONNECTED",
      },
      { status: 503, headers }
    );
  }

  await ensureJobDir();
  const id = createHash("sha1")
    .update(`${Date.now()}-${Math.random()}-${prompt.length}`)
    .digest("hex")
    .slice(0, 16);

  const logPath = join(JOB_DIR, `${id}.log`);
  const exitPath = join(JOB_DIR, `${id}.exit.json`);
  await fs.writeFile(logPath, "", "utf8");

  let args: string[];
  if (prompt.length <= MAX_PROMPT_ARG) {
    args = ["run", prompt];
  } else {
    // Avoid the Windows command-line length limit: attach the prompt as a file.
    const promptPath = join(JOB_DIR, `${id}.prompt.txt`);
    await fs.writeFile(promptPath, prompt, "utf8");
    args = ["run", "--file", promptPath, "Execute the instructions in the attached prompt file exactly."];
  }
  args.push("--format", "default");
  if (agent) args.push("--agent", agent);
  if (model) args.push("-m", model);

  const logStream = await fs.open(logPath, "a");
  const startedAt = Date.now();
  const timeoutMs = (timeoutSec ?? 300) * 1000;

  let child: ChildProcess;
  try {
    child = spawn(cmd, args, {
      cwd,
      env: { ...process.env },
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (e) {
    await logStream.close();
    const message = e instanceof Error ? e.message : "Failed to start OpenCode";
    return NextResponse.json({ error: message, code: "SPAWN_FAILED" }, { status: 500 });
  }

  const state: JobState = {
    id,
    pid: child.pid,
    startedAt,
    logPath,
    exitPath,
    child,
    timedOut: false,
  };
  jobs.set(id, state);

  const writeChunk = (chunk: Buffer | string): void => {
    const data = typeof chunk === "string" ? chunk : chunk.toString("utf8");
    void logStream.write(data).catch(() => {});
  };
  child.stdout?.on("data", writeChunk);
  child.stderr?.on("data", writeChunk);

  const timer = setTimeout(() => {
    state.timedOut = true;
    child.kill();
  }, Math.min(timeoutMs, HARD_TIMEOUT_MS));

  child.on("error", (err) => {
    clearTimeout(timer);
    writeChunk(`\n[spawn error] ${err.message}\n`);
    void logStream.close().catch(() => {});
    void fs
      .writeFile(exitPath, JSON.stringify({ code: -1, ms: Date.now() - startedAt, timedOut: false }), "utf8")
      .catch(() => {});
    jobs.delete(id);
  });

  child.on("close", (code) => {
    clearTimeout(timer);
    void logStream.close().catch(() => {});
    void fs
      .writeFile(
        exitPath,
        JSON.stringify({ code: state.timedOut ? null : code, ms: Date.now() - startedAt, timedOut: state.timedOut }),
        "utf8"
      )
      .catch(() => {});
    // Keep state for GET polling; child reference no longer needed.
    state.child = null;
  });

  return NextResponse.json({ id, status: "running" }, { headers });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id || !/^[a-f0-9]{16}$/.test(id)) {
    return NextResponse.json({ error: "Missing or invalid job id" }, { status: 400 });
  }

  const logPath = join(JOB_DIR, `${id}.log`);
  const exitPath = join(JOB_DIR, `${id}.exit.json`);

  let output = "";
  try {
    output = await fs.readFile(logPath, "utf8");
  } catch {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  let exit: { code: number | null; ms: number; timedOut: boolean } | null = null;
  try {
    exit = JSON.parse(await fs.readFile(exitPath, "utf8")) as { code: number | null; ms: number; timedOut: boolean };
  } catch {
    exit = null;
  }

  const live = jobs.get(id);
  if (!exit) {
    if (!live && !output) {
      return NextResponse.json({ id, status: "failed", output, exitCode: null, ms: 0, error: "Server restarted — result unavailable" });
    }
    return NextResponse.json({ id, status: "running", output, exitCode: null, ms: Date.now() - (live?.startedAt ?? Date.now()) });
  }

  const status = exit.timedOut ? "failed" : exit.code === 0 ? "completed" : "failed";
  jobs.delete(id);
  return NextResponse.json({
    id,
    status,
    output,
    exitCode: exit.code,
    ms: exit.ms,
    timedOut: exit.timedOut,
  });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing job id" }, { status: 400 });
  const live = jobs.get(id);
  if (!live) return NextResponse.json({ error: "Job not running" }, { status: 404 });
  live.timedOut = false;
  live.child?.kill();
  return NextResponse.json({ id, status: "cancelled" });
}
