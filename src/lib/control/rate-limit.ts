// Minimal in-memory sliding-window rate limiter for control-center APIs.
const WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

export function rateHeaders(ip: string, max: number): Record<string, string> {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.set(ip, timestamps);
  const remaining = Math.max(0, max - timestamps.length);
  const oldest = timestamps[0] ?? now;
  const reset = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000));
  return {
    "X-RateLimit-Limit": String(max),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(reset),
  };
}

export function checkRate(ip: string, max: number): { limited: boolean; headers: Record<string, string> } {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= max) {
    hits.set(ip, timestamps);
    const oldest = timestamps[0] ?? now;
    const reset = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000));
    return {
      limited: true,
      headers: {
        "X-RateLimit-Limit": String(max),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(reset),
        "Retry-After": String(reset),
      },
    };
  }
  timestamps.push(now);
  hits.set(ip, timestamps);
  return { limited: false, headers: rateHeaders(ip, max) };
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}
