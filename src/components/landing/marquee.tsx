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
      className={`relative flex overflow-hidden whitespace-nowrap border-y border-[#3B3C38] ${bg ?? "bg-[#1b1e16]"} ${className ?? ""}`}
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
              className={`flex items-center px-6 py-4 text-2xl font-semibold uppercase tracking-tight md:text-3xl ${
                item.className ?? "text-[#F4F4ED]"
              }`}
            >
              {item.text}
              <svg
                className="ml-6 h-5 w-5 text-[#D2FF00]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
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