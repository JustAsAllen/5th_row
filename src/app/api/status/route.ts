import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { promises as fs } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { checkRate, clientIp } from "@/lib/control/rate-limit";
import type { OpencodeStatus } from "@/lib/control/types";

const execFileAsync = promisify(execFile);

async function safeListMd(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir);
    return entries
      .filter((e) => e.endsWith(".md"))
      .map((e) => e.replace(/\.md$/, ""))
      .sort();
  } catch {
    return [];
  }
}

async function opencodeVersion(): Promise<{ available: boolean; version: string | null }> {
  try {
    const { stdout, stderr } = await execFileAsync("opencode", ["--version"], {
      timeout: 10_000,
      windowsHide: true,
      shell: true,
    });
    const text = (stdout || stderr).trim();
    const match = text.match(/\d+\.\d+\.\d+/);
    return { available: Boolean(match), version: match ? match[0] : text.slice(0, 40) || null };
  } catch {
    return { available: false, version: null };
  }
}

interface McpEntry {
  enabled?: boolean;
  type?: string;
}

function stripJsonComments(raw: string): string {
  return raw
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

async function readMcpServers(): Promise<OpencodeStatus["mcpServers"]> {
  // Reads only names/enabled/type — NEVER environment values (secrets).
  const candidates = [
    join(homedir(), ".config", "opencode", "opencode.jsonc"),
    join(homedir(), ".config", "opencode", "opencode.json"),
  ];
  for (const file of candidates) {
    try {
      const raw = await fs.readFile(file, "utf8");
      const parsed = JSON.parse(stripJsonComments(raw)) as { mcp?: Record<string, McpEntry> };
      if (parsed.mcp) {
        return Object.entries(parsed.mcp).map(([name, cfg]) => ({
          name,
          enabled: cfg?.enabled !== false,
          type: cfg?.type ?? "local",
        }));
      }
    } catch {
      // Try next candidate.
    }
  }
  return [];
}

async function gitBranch(): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
      timeout: 5_000,
      windowsHide: true,
    });
    return stdout.trim() || null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const ip = clientIp(request);
  const { limited, headers } = checkRate(ip, 60);
  if (limited) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers });
  }

  const [version, mcpServers, agents, commands, projectSkills, brainSkills, branch] =
    await Promise.all([
      opencodeVersion(),
      readMcpServers(),
      safeListMd(join(homedir(), ".config", "opencode", "agent")),
      safeListMd(join(homedir(), ".config", "opencode", "command")),
      safeListMd(join(process.cwd(), ".opencode", "skills")),
      safeListMd(join(process.cwd(), "brain", "skills")),
      gitBranch(),
    ]);

  let configFound = false;
  try {
    await fs.access(join(homedir(), ".config", "opencode", "opencode.jsonc"));
    configFound = true;
  } catch {
    try {
      await fs.access(join(homedir(), ".config", "opencode", "opencode.json"));
      configFound = true;
    } catch {
      configFound = false;
    }
  }

  const status: OpencodeStatus = {
    available: version.available,
    version: version.version,
    configFound,
    agents,
    commands,
    projectSkills,
    brainSkills,
    mcpServers,
    gitBranch: branch,
  };

  return NextResponse.json(status, { headers });
}
