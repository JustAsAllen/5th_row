"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

export function PromptSnippet({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="group flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 text-left backdrop-blur-sm transition-all hover:border-violet-500/30 hover:bg-zinc-900/60"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-500/15">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
        </div>
        <span className="text-sm leading-relaxed text-zinc-300">{prompt}</span>
      </div>
      {copied ? (
        <Check className="h-4 w-4 shrink-0 text-emerald-400" />
      ) : (
        <Copy className="h-4 w-4 shrink-0 text-zinc-600 transition-colors group-hover:text-zinc-400" />
      )}
    </button>
  );
}
