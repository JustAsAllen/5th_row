"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PixGlyph } from "@/components/landing/pix-glyph";

type RawLine = string | { line: string; tone?: "lime" | "red" };

export function LogStream({
  runId,
  lines,
  speed = 520,
}: {
  runId: number;
  lines: RawLine[];
  speed?: number;
}) {
  const [visible, setVisible] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      i += 1;
      setVisible(i);
      if (i < lines.length) {
        timer.current = setTimeout(tick, speed);
      } else {
        timer.current = null;
      }
    };
    timer.current = setTimeout(tick, 400);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [runId, lines, speed]);

  const shown = lines.slice(0, visible);

  return (
    <div className="relative flex h-full flex-col justify-end gap-2.5 overflow-hidden px-5 py-5 md:px-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-black via-black/70 to-transparent" />
      <AnimatePresence initial={false} mode="popLayout">
        {shown.map((raw, idx) => {
          const line = typeof raw === "string" ? { line: raw } : raw;
          const ring = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-baseline gap-3"
            >
              <span
                className={`font-mono text-[9px] tabular-nums ${
                  line.tone === "red"
                    ? "text-red-400"
                    : line.tone === "lime"
                      ? "text-[#D2FF00]"
                      : "text-[#7D7D7D]"
                }`}
              >
                {String(idx + 1).padStart(3, "0")}
              </span>
              <PixGlyph
                type={ring ? "diamond" : "plus"}
                className={`h-1.5 w-1.5 shrink-0 ${
                  line.tone === "red"
                    ? "text-red-400"
                    : line.tone === "lime"
                      ? "text-[#D2FF00]"
                      : "text-[#7D7D7D]/60"
                }`}
              />
              <span
                className={`font-mono text-[11px] leading-snug transition-colors duration-200 ${
                  line.tone === "red"
                    ? "text-red-300"
                    : line.tone === "lime"
                      ? "text-[#D2FF00]/90"
                      : "text-[#A8A8A8]"
                } ${idx === shown.length - 1 && visible < lines.length ? "text-[#F2F2F2]" : ""}`}
              >
                {line.line}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}