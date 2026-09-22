#!/usr/bin/env node
// brain/tools/sync.mjs — mirrors authoritative agents + commands from the
// 5th_row brain repo into the LIVE opencode config directory.
//
//   node brain/tools/sync.mjs
//
// Copies:
//   brain/live/agents/*.md   -> ~/.config/opencode/agent/
//   brain/live/commands/*.md -> ~/.config/opencode/command/
//
// Skills load directly via "skills.paths" in opencode.jsonc (no copy needed).
// This is idempotent: safe to run any time after editing brain/live/*.

import { readdir, copyFile, mkdir, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const BRAIN = resolve(HERE, "..");
const CONFIG_DIR = join(homedir(), ".config", "opencode");

const MAPPINGS = [
  { from: join(BRAIN, "live", "agents"), to: join(CONFIG_DIR, "agent") },
  { from: join(BRAIN, "live", "commands"), to: join(CONFIG_DIR, "command") },
];

async function sync(fromDir, toDir) {
  await mkdir(toDir, { recursive: true });
  let files = [];
  try {
    files = await readdir(fromDir);
  } catch {
    console.warn(`  [skip] source missing: ${fromDir}`);
    return;
  }
  const md = files.filter((f) => f.endsWith(".md"));
  for (const f of md) {
    const src = join(fromDir, f);
    const s = await stat(src);
    if (!s.isFile()) continue;
    const dest = join(toDir, f);
    await copyFile(src, dest);
    console.log(`  synced ${f}`);
  }
  console.log(`  -> ${md.length} file(s) into ${toDir}`);
}

console.log(`Syncing brain/live -> ${CONFIG_DIR}`);
for (const m of MAPPINGS) {
  await sync(m.from, m.to);
}
console.log("Done. Restart opencode for changes to take effect.");