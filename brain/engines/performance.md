# Performance Engine (S17)

## Web apps — measure before optimizing
- Bundle: chunk sizes, code splitting, dynamic imports used where heavy.
- Renders: unnecessary re-renders, missing keys, memo misuse.
- Images: format (AVIF/WebP), dimensions, `next/image`/allow-list, lazy-load.
- Network waterfall: blocking requests, render-blocking CSS/JS, preload.
- Cache: static assets headers, SW/cache-control, API response caching.
- CWV: LCP, INP, CLS from lighthouse/chrome-devtools.
- Memory: leaks via heap snapshot after repeated interactions.
- DB: slow queries, N+1, missing indexes (pair with database agent).

## Tools
chrome-devtools performance trace + lighthouse audit +
`list_network_requests`/waterfall + heapsnapshot.

## Reporting (S31/baseline-friendly)
Only report measurements actually collected. Format:
`METRIC | BEFORE | AFTER | TOOL | VERIFIED?`. Never claim a perf win you didn't measure.