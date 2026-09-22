---
description: BENCHMARK. Measure before vs after for performance, bundle size, build/test speed, API latency, DB query or render performance. Only real measurements get reported.
agent: build
---

Benchmark: $ARGUMENTS

Establish a BASELINE before any change, then apply the change, then measure again.
Scope: performance trace, bundle-size, build time, test speed, API latency, DB
query performance, render performance — whatever the request targets.
Report strictly `METRIC | BEFORE | AFTER | DELTA | TOOL | VERIFIED?`.
Never report estimates as measurements. If a metric couldn't be measured, say so.