import Link from "next/link";

export function Footer() {
  return (
    <>
      {/* Final CTA */}
      <section className="bg-[#F4F4ED] px-6 py-24 text-[#111112] md:px-10 md:py-32">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#5a5f4d]">
              Always bringing the pocket.
            </p>
            <h2 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-8xl">
              5th_row —<br />
              <span className="text-[#282C20]">the pocket is open</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href="/control"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#111112] px-10 py-5 text-sm font-bold uppercase tracking-wide text-[#D2FF00] transition-transform hover:scale-105"
            >
              Open the Pocket <span>→</span>
            </Link>
            <Link
              href="/toolkit"
              className="text-center text-sm font-semibold uppercase tracking-wide text-[#5a5f4d] underline-offset-4 hover:underline"
            >
              Read the Manual
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3B3C38] bg-[#111112] px-6 py-14 md:px-10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#D2FF00] font-display text-sm text-[#282C20]">
              5R
            </span>
            <span className="flex flex-col">
              <span className="font-display text-base uppercase tracking-tight text-[#F4F4ED]">
                5th_row
              </span>
              <span className="text-xs text-[#B4B8A5]">
                The Doraemon Magic Pocket · MIT
              </span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/control" className="text-sm uppercase tracking-widest text-[#B4B8A5] hover:text-[#F4F4ED]">
              Control Center
            </Link>
            <Link href="/toolkit" className="text-sm uppercase tracking-widest text-[#B4B8A5] hover:text-[#F4F4ED]">
              The Guide
            </Link>
            <a
              href="https://github.com/JustAsAllen/5th_row"
              target="_blank"
              rel="noreferrer"
              className="text-sm uppercase tracking-widest text-[#B4B8A5] hover:text-[#F4F4ED]"
            >
              GitHub
            </a>
          </nav>

          <p className="text-xs uppercase tracking-widest text-[#B4B8A5]">
            © {new Date().getFullYear()} 5th_row — always shipping.
          </p>
        </div>
      </footer>
    </>
  );
}