---
description: PERFORMANCE AUDIT. Measure then improve: bundle, renders, images, network, caching, queries, CWV, memory. Only reports real measured values before/after.
agent: build
---

Performance audit: $ARGUMENTS

Run engines/performance.md. For web apps use chrome-devtools performance trace +
lighthouse + network waterfall + heapsnapshot where applicable. Inspect bundle,
unnecessary renders, image optimization, caching, API latency, expensive
components, memory leaks. For DB: slow queries/N+1/indexes.

Report `METRIC | BEFORE | AFTER | TOOL | VERIFIED?` — only measurements actually
collected. Then fix the top bottlenecks and RE-MEASURE to prove the win.
Update the scorecard Performance row.