---
description: VISUAL QA. Screenshot + inspect a running app across desktop/tablet/mobile: overflow, spacing, typography, layout, states, console/network errors. Evidence required.
agent: build
---

Visual QA: $ARGUMENTS

Run engines/visual-qa.md. Ensure the dev server is running (start it if not),
then capture desktop → tablet → mobile via chrome-devtools/playwright. Judge
against the project's design DNA (design-intelligence). Check overflow, spacing,
typography, broken layouts, loading/empty/error states, console errors, network
4xx/5xx, hit areas, focus. Capture screenshots as evidence for every breakpoint.
Fix findings, re-capture, then report PASS/FAIL per breakpoint + evidence.
If a breakpoint could not be tested, list it explicitly.