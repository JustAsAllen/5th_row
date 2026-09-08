---
name: responsive-testing
description: Use when the user wants to test a website on different screen sizes, check mobile responsiveness, verify the design works across devices, or find/fix responsive layout issues. Trigger keywords: mobile responsive, check mobile, responsive, fix mobile, test on phone, mobile view, breakpoints, tablet view, desktop view.
---

# Responsive Design Testing & Fixes

Follow this workflow to verify and fix responsive layouts.

## Step 1: Test Every Breakpoint

Use Puppeteer/Playwright browser tools to screenshot the site at:

| Device | Width | Purpose |
|--------|-------|---------|
| Mobile S | 320px | Old phones |
| Mobile M | 375px | Standard iPhone |
| Mobile L | 425px | Larger phones |
| Tablet | 768px | iPads |
| Laptop | 1024px | Small laptops |
| Desktop | 1280px | Standard desktop |
| Widescreen | 1536px | Large monitors |

> **No Chrome on the machine? On Windows, drive Edge instead:** `npx puppeteer-core` with `executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"`, or grab a single headless shot with: `msedge.exe --headless --disable-gpu --screenshot=out.png --window-size=414,896 "<url>"`. For editors that can't "see" images, also dump per-breakpoint DOM facts (e.g. `document.documentElement.scrollWidth vs innerWidth` to detect horizontal overflow) and let the user view saved screenshots.

## Step 2: Check The Critical Rules

### Layout
```
[ ] No horizontal scroll (overflow-x hidden): check document.documentElement.scrollWidth > innerWidth at every breakpoint
[ ] Grids collapse: grid-cols-1 on mobile
[ ] Stack sections vertically on mobile
[ ] Padding scales: p-4 mobile, md:p-8, lg:p-16
[ ] Text scales: text-3xl mobile, md:text-5xl, lg:text-7xl
[ ] Tap targets >= 44px
```

### Components
```
[ ] Navbar correct: hamburger on mobile, full menu on desktop
[ ] Cards stack in one column on mobile
[ ] Tables become scrollable (overflow-x-auto) on mobile
[ ] Forms: full width inputs on mobile
[ ] Images: w-full h-auto, never overflow
[ ] Fixed elements don't cover content
```

### Common Breakpoint Pattern
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
<div className="hidden md:block">desktop nav</div>
<div className="md:hidden">mobile nav (hamburger)</div>
<h1 className="text-3xl sm:text-4xl lg:text-6xl">Heading</h1>
<div className="p-4 md:p-6 lg:p-8">Card</div>
```

## Step 3: Find & Fix Common Issues

| Problem | Fix |
|---------|-----|
| Horizontal scroll | `overflow-x-hidden` on body or root, find wide element |
| Images overflow | Add `max-w-full h-auto` |
| Text too small | Never below `text-sm`, mobile can be `text-base` |
| Tap targets too small | `min-h-[44px]` on buttons/links |
| Fixed nav overlapping content | Add scroll-margin-top or padding-top to sections |
| Grid too cramped | Reduce columns on mobile |
| Long words overflow | `break-words` / `min-w-0` on flex children |
| Font too large on mobile | Use responsive text classes |

## Step 4: Verify Visually
1. Take screenshots at mobile, tablet, desktop
2. Compare with desktop layout
3. Confirm no elements cut off, overlapping, or overflowing
4. Report the results to the user with a summary