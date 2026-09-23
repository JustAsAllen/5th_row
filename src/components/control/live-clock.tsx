"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { PixGlyph } from "@/components/landing/pix-glyph";

export interface LiveClockProps {
  className?: string;
}

export function LiveClock({ className }: LiveClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4px] text-[#7D7D7D]",
        className
      )}
      aria-label="Current local time"
    >
      <PixGlyph type="diamond" className="h-1.5 w-1.5 text-[#D2FF00]/70" />
      <time dateTime={now?.toISOString()}>
        {now ? (
          <>
            <span className="text-[#F2F2F2]">{format(now, "HH:mm")}</span>
            <span className="text-[#D2FF00]">:{format(now, "ss")}</span>
          </>
        ) : (
          <>
            <span className="text-[#F2F2F2]">--:--</span>
            <span className="text-[#D2FF00]/60">:--</span>
          </>
        )}
      </time>
    </div>
  );
}
