# Visual QA Pipeline (S8)

Code compiling ≠ looks right. For any web project that renders:

```
BUILD → START DEV SERVER → OPEN BROWSER → DESKTOP → TABLET → MOBILE
→ SCREENSHOT → INSPECT (dom/layout/console/network) → FIX → RE-CHECK → REPEAT
```

## Checks per breakpoint
- horizontal/vertical overflow, clipped content
- spacing/alignment drift, broken grids
- typography scale, line-height collapse, font loading (FOUT/FOIT)
- broken layout at tablet/mobile, sticky/fixed elements
- console errors, network 4xx/5xx, failed assets
- loading states, empty states, error states
- interactive hit areas ≥ 44px, focus rings reachable
- reduced-motion / color-scheme respected when relevant

## Evidence
- Screenshots per breakpoint are REQUIRED. Save to a report dir/file.
- Capture console + network logs alongside.
- If a server couldn't be started or a viewport was skipped, say so explicitly.

## Tooling order
chrome-devtools (traces, screenshots, console/network, lighthouse) →
playwright (snapshot flows, wait/text) → puppeteer (scripted captures).

## Judgement
- Judge against the project's DESIGN language (design-intelligence presets / 5th_row)
  — not a vague "looks okay". If no preset exists, note the observed language.
- Fix findings, re-capture, then report `PASS/FAIL per breakpoint + evidence`.