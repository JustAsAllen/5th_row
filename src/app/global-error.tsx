"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="text-center">
          <div className="mb-4 text-7xl font-bold text-red-500">!</div>
          <h1 className="mb-2 text-xl font-semibold">Application error</h1>
          <p className="mb-8 max-w-md text-sm text-zinc-500">
            A critical error has occurred. Please reload the page.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            Reload page
          </button>
        </div>
      </body>
    </html>
  );
}
