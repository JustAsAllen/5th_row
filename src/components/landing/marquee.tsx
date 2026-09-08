interface MarqueeItem {
  text: string;
  className?: string;
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
              <svg
                className="ml-6 h-4 w-4 text-[#D2FF00]/50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 12h11m0 0-4-4m4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
