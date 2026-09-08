import type { ReactNode } from "react";
import { PixGlyph } from "./pix-glyph";

interface MarqueeItem {
  text: string;
  className?: string;
  glyph?: ReactNode;
}

export function Marquee({
  items,
  direction = "left",
  className,
  bg,
}: {
  items: MarqueeItem[];
  direction?: "left" | "right";
  className?: string;
  bg?: string;
}) {
  const repeat = items.concat(items);
  return (
    <div
      className={`relative flex overflow-hidden whitespace-nowrap border-y border-white/[0.06] ${bg ?? "bg-black"} ${className ?? ""}`}
    >
      {[0, 1].map((track) => (
        <div
          key={track}
          className={`flex shrink-0 animate-[marquee_30s_linear_infinite] ${
            direction === "right" ? "[animation-direction:reverse]" : ""
          }`}
        >
          {repeat.map((item, i) => (
            <span
              key={`${track}-${i}`}
              className={`flex items-center px-6 py-4 text-2xl font-semibold uppercase tracking-[-0.02em] md:text-3xl ${
                item.className ?? "text-[#F2F2F2]/40"
              }`}
            >
              {item.text}
              <span className="ml-6">
                {item.glyph ?? <PixGlyph type="plus" className="h-2 w-2 text-[#D2FF00]/50" />}
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
