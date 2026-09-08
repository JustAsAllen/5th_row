---
name: ui-ux-premium
description: Use when the user wants a website or UI to look premium, high-end, professional, polished, goated, expensive, modern, beautiful, like a top SaaS or agency website. Trigger keywords: make it premium, make it look expensive, high class, goated interface, beautiful design, amazing UI, moon-worthy design, upgrade the design, luxury look, modern aesthetic.
---

# Premium UI/UX Design System

Apply these principles whenever the user asks for a premium-looking interface.

> There are **two premium modes**. Pick based on the project: the **SaaS/dark mode** (below — shadcn cards, violet glow, gradients) for dashboards & product sites, or the **Editorial-void mode** (after it — Dragonfly/landonorris style) for portfolio/brand/client marketing sites. Don't mix them.

## The Premium Formula (SaaS / dark mode)

### 1. Color Strategy
- **Neutral base**: zinc/neutral/slate with high contrast
- **One accent color** used sparingly (violet, indigo, or brand color)
- **Gradients**: subtle dark-background gradients (e.g. `from-zinc-900 via-zinc-950 to-black`)
- **Glow effects**: `shadow-[0_0_30px_rgba(139,92,246,0.3)]` style accents on key CTAs
- **Depth**: layered backgrounds with radial gradients: `bg-[radial-gradient(...)]`

### 2. Typography That Commands Respect
- Large display headings: `text-5xl md:text-7xl font-semibold tracking-tight`
- Gradient text for hero headings: `bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500`
- Generous line-height `leading-tight`/`leading-none`
- Consistent body scale: `text-base md:text-lg text-zinc-400`
- Use `font-sans` with tight `tracking-tight` for modern feel

### 3. Spacing & Layout
- **Massive breathing room**: `py-24 md:py-32` for sections
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container standard
- Consistent vertical rhythm: 8px spacing scale
- Asymmetric layouts for interest (2/3 + 1/3 splits, bento grids)

### 4. Premium Component Details
- **Buttons**: rounded-full, subtle borders, `backdrop-blur`, hover glow + scale
- **Cards**: `rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm` with hover lift `hover:-translate-y-1 hover:border-zinc-700 transition-all duration-300`
- **Navbars**: `sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl`
- **Badges**: tiny pill `rounded-full px-3 py-1 text-xs font-medium border`
- **Dividers**: `border-zinc-800/50`
- **Glassy elements**: `bg-white/5 backdrop-blur-md border-white/10`

### 5. Professional Animation
- Entrance animations: fade-up `initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}`
- Staggered reveals for grids and lists
- Hover states everywhere (`hover:scale-[1.02]`, `hover:shadow-xl`)
- Smooth scroll and transition timing `duration-300` / `ease-out`
- Subtle marquee for logos, infinite scroll for testimonials

### 6. Real Products Have
- Hero with headline + subheadline + CTAs + social proof
- Logo cloud or "Trusted by" strip
- Feature sections with icons and hover states
- Testimonial section (3-column cards)
- Pricing section (3 tiers, middle highlighted)
- FAQ accordion
- Final CTA section with gradient background
- Footer with 4 columns

## Example Premium Page Structure

```
[Hero] → headline + gradient text + CTAs + product mockup/dashboard preview
[Logos] → "Trusted by" strip, grayscale logos
[Features] → 3 or 6 cards with icons, hover glow
[Highlight] → alternating image + text sections
[Stats] → animated counters (grid of numbers)
[Testimonials] → 3 cards with quotes
[Pricing] → 3 tiers, middle "Most Popular"
[FAQ] → accordion
[CTA] → big gradient background section
[Footer] → 4 columns + social
```

## Rules (SaaS mode)
1. Always mobile-first: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
2. Use shadcn/ui components when they help (Button, Card, Badge, etc.)
3. Every interactive element needs hover + transition
4. Every async action shows toast/skeleton feedback
5. Never use default browser styling
6. Match existing project theme (dark zinc palette unless told otherwise)
7. Test at mobile (375px), tablet (768px), desktop (1280px)

---

# Editorial-Void Mode (Dragonfly.xyz / landonorris.com style)

Use this for portfolio, brand, client, and "wow" marketing sites. It reads *expensive* through **restraint** — black void, near-white type, one accent, no decoration. This is the style the 5th_row landing + control center use.

## The Rules

### 1. Color — the void
- Background is pure `#000000`. Text is near-white `#F2F2F2`, muted `#7D7D7D`, deepest `#F2F2F2/40`.
- **ONE accent, used sparingly** — a lime `#D2FF00`, signal orange `#FA4C14`, or electric color. Reserve it for: key CTAs, one word per heading, live "online" dots, selected hover accents, and tiny glyph marks.
- A faint grid in the hero only: `linear-gradient(rgba(242,242,242,0.02) 1px, transparent 1px)` at 81px.
- NO cards, NO gradients, NO glass, NO glow shadows. Borders are hairlines `white/[0.06]`.

### 2. Typography — a 3-voice stack
- **Display font** (e.g. Archivo Black) for giant headings: `text-[10vw]`-scale, `uppercase`, `tracking-[-0.03em]`, `leading-[0.82]`.
- **Serif body** (Instrument Serif / FK Roman Standard): 24–28px, `font-light`, generous line height. The signature "editorial" move.
- **Mono micro-labels** (Geist Mono / NON Natural Mono): 10px `uppercase tracking-[0.4px]` for section tags, numbers, meta, coordinates ("EST. 2024", "SCROLL", "01").

### 3. Space — measure & rhythm
- Container `max-w-[1416px]` (NOT `max-w-7xl`). Content edges at `px-6 md:px-10`.
- Sections `py-24 md:py-32`. Asymmetry: label top-left, huge heading, body right or centered-left.
- `100svh` full-viewport hero (never `vh`), rest scrolls.

### 4. Components — text-first
- **CTAs are text links only**: `<span class="font-mono text-sm uppercase tracking-[0.4px] text-[accent]">Open the Pocket →</span>`. No pill backgrounds. Hover = slight color shift + arrow translate.
- **Navbar**: transparent → `bg-black/80 backdrop-blur-xl` on scroll. Text links. Mobile = full-screen black overlay.
- **Sections**: hairline `divide-y divide-white/[0.06]` or `border-y border-white/[0.06]`. Hover = `bg-white/[0.02]` (imperceptible) + accent reveal.
- No chevron icons, no badges, no rounded cards replacing everything.

### 5. Pixel-glyph ornaments (the "ASCII" signature)
Editorial-void sites scatter **tiny SVG glyph marks** made of 4px blocks — corner brackets, dotted rules, crosshairs, ticks. Build ONE reusable component (name:: pattern→cells→viewBox) and scatter it:
- `[ label ]` brackets around mono text
- dotted rule after a label
- crosshair/plus at empty intersections
- corner marks on the hero frame and card edges
- tick columns beside paragraphs

### 6. Motion — minimal, scroll-driven
- Framer-motion fade-up on entrance; stagger lists by 0.05s.
- Lenis smooth scroll + horizontal pinned track (`useScroll`/`useTransform`, sticky section, `h-[420vh]` wrapper) for a "what's inside" strip.
- Rive for subtle ambient canvas in the hero (dim to `opacity-20`, see `rive-animation`).
- NO bounce/pop keyframes, NO glass morph.

## Editorial page structure
```
[Navbar]  hairline bottom, text links, [ logo glyph ]
[Hero]    full-100svh: micro-label, giant display word, serif sub, text CTAs, faint grid + scattered glyphs, scroll cue
[Marquee] 2-3 word strip, `#F2F2F2/40` with accent arrows
[Track]   horizontal pinned cards (01-06), hairline separators, text-only links
[Stack]   icon grid, hairline cell borders, mono labels
[Skills]  numbered editorial list (01-07), divide-y hairline, serif descriptions
[CTA]     oversized display heading + serif italic line + text CTA, scattered glyphs
[Footer]  hairline top, 3 quiet columns, mono copyright + plus marks
```

## Rules (Editorial mode)
1. Void background, one accent, hairline only — NEVER cards/glow/shadows.
2. 3-voice type: display + serif + mono micro-labels.
3. Text-only CTAs; arrow shifts on hover.
4. `max-w-[1416px] px-6 md:px-10`, sections `py-24 md:py-32`, hero `100svh`.
5. Scatter pixel-glyph marks via one reusable component.
6. Motion = scroll-driven + fade-up, no bounce keyframes.