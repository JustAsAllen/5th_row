import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="text-center">
        <div className="mb-4 text-7xl font-bold text-violet-500">404</div>
        <h1 className="mb-2 text-xl font-semibold">Page not found</h1>
        <p className="mb-8 text-sm text-zinc-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          Back to Control Center
        </Link>
      </div>
    </div>
  );
}
