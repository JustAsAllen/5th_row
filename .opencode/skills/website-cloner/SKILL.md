---
name: website-cloner
description: Use when the user sends a website URL and wants to learn from it, clone it, get inspired by it, or rebuild something similar. Trigger keywords: clone website, learn from site, make it look like, copy design, reference website, analyze website, extract design from [URL]. Analyzes the reference site's design (colors, typography, layout, spacing, components) and recreates it as premium modern code.
---

# Website Cloner & Design Analysis

When the user provides a website URL, follow this workflow to learn from it and recreate it.

## Step 1: Analyze the Website

Use web fetching or Puppeteer browser tools to visit the URL and extract:

1. **Visual Design** - Colors, gradients, backgrounds, shadows
2. **Typography** - Fonts, sizes, weights, line-height
3. **Layout** - Grid structure, sections, spacing patterns, max-widths
4. **Components** - Navbar, hero, cards, forms, buttons, footer styles
5. **Interactive Elements** - Animations, hover states, transitions
6. **Responsive behavior** - How it looks at mobile/tablet/desktop widths

### Hard-won tech notes (Windows, no Chrome installed)
- **If Chrome/Puppeteer isn't installed, drive the installed Edge instead** — `npx puppeteer-core` + `executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"`. Or screenshot headlessly: `msedge.exe --headless --disable-gpu --screenshot=out.png --window-size=1440,900 "<url>"`.
- **You cannot literally "see" screenshots** in many setups — extract the real data from the DOM instead, and save screenshots to disk for the user to view.
- **Grab the raw HTML and regex-extract the SVGs**: `[regex]::Matches($html, '<svg[^>]*>.*?</svg>', 'Singleline')` isolates every little ornament. Sites like dragonfly.xyz encode their pixel-glyph "ASCII" bars/corners/crosshairs as tiny `<svg>`s (10–38px, made of 4px rects or stroked paths). These become a reusable glyph component.
- Fetch HTML with a browser UA header (`Invoke-WebRequest -Headers @{"User-Agent"="..."}`) so you get the full rendered markup, not a bot-blocked shell.

## Step 2: Extract the Design System

Produce a design breakdown:

```
# Design Reference: [Site Name]
## Colors
- Primary: #HEX
- Background: #HEX
- Accent: #HEX
## Typography
- Font family
- Heading sizes
- Body sizes
## Spacing
- Section padding
- Card padding
- Gaps
## Style
- Border radius
- Shadows
- Gradients
```

## Step 3: Recreate in Code

Build the components matching the reference design while following the project's existing conventions (Next.js + Tailwind + shadcn/ui in this project). Create:

1. `Navbar` - matching nav style
2. `Hero` - matching hero style
3. Feature/content sections
4. Footer
5. Each component gets proper TypeScript types, `'use client'` where needed, and clean Tailwind styling

## Step 4: Polish to Premium Quality

Make it BETTER than the reference:
- Add micro-animations (framer-motion)
- Smooth hover transitions
- Gradient overlays and glow effects where tasteful
- Responsive at all breakpoints
- Loading states and skeletons
- Toast feedback for async actions

### Editorial-void style is a top-tier target
Sites like **dragonfly.xyz** (and landonorris.com) win with **restraint**, not decoration:
- Pure `#000000` background, near-white text, ONE accent used sparingly (`#D2FF00` lime works great on black)
- **Serif body** (Instrument Serif/FK Roman) + **mono micro-labels** (10px, `tracking-[0.4px]`) + big bold display font
- **No cards, no borders, no button pills** — hairlines `white/[0.06]`, text-only CTAs with `→`
- **Pixel-glyph ornaments** (corner brackets, dotted rules, crosshairs, ticks) scattered around labels and section edges

When the reference is editorial-void style, build its ornaments as a **`PixGlyph`-style React component** (pattern name → viewBox + cells array → `<rect>`s/`<path>`s) and scatter instances across the hero, nav, section headers, cards, and footer. That component IS the perceived "ASCII art style" of the reference.

## Step 5: Verify

Always:
1. Run `npm run lint` to check errors
2. Run `npm run build` (or typecheck) to verify no type errors
3. If possible, use Puppeteer/Playwright to screenshot the page and confirm it matches the design intent