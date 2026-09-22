# DESIGN DNA — presets & analysis (S9)

Extract design PRINCIPLES, never clone protected branding/assets. Each preset is a
recipe the UI work can follow. When cloning a reference site, run this analysis
first, then pick/adjust a preset.

## Analysis fields (for any reference site)
layout · typography (families/sizes/weights/tracking) · spacing rhythm ·
colors (bg/surface/text/accent) · borders/shadows · radius · animation/
interaction patterns · info hierarchy · responsive behavior.

Output a DESIGN DNA block:

```markdown
BG           <bg color + reason>
SURFACE      <card/panel treatment or "none, hairlines only">
TEXT         <primary/secondary/muted, sizes, serif/sans>
ACCENT       <pop color + usage>
TYPE SCALE   <display/heading/body/label tokens>
SPACING      <base unit, section rhythm>
RADIUS       <0 / sm / full etc>
BORDERS      <width + alpha>
MOTION       <durations/easings, scroll behavior>
MICRO        <signature details: pixel glyphs, dotted rules, noise>
RESPONSIVE   <breakpoints, tablet/mobile transforms>
```

## Presets (principles, not clones)

### APPLE-LIKE
Clean white/#0a0a0a surfaces, huge SF-style display type, generous whitespace,
hairline borders, glassmorphism accents, minimal chrome, fade+slide scroll reveals.

### PREMIUM-SAAS
Dark ink `#0a0a0a`-ish or clean light; violet/indigo accent w/ glow, gradient
mesh hero, rounded-2xl cards + soft shadows, micro-interactions (hover lift,
motion scale 1.02/0.98), sticky glass nav, mono for data/labels.

### EDITORIAL (5th_row / dragonfly-inspired)
Pure black void `#000`; serif body, tight-tracked display type, 10px uppercase
mono labels, text-only CTAs in accent lime, pixel-glyph ornaments, hairline
`white/[0.06]` borders, `max-w` wide grid. See the 5th-row skill.

### CYBERPUNK
Neon on dark (cyan/magenta/lime), glitch/tilt effects, uppercase condensed
display, scanlines/grid overlays, sharp corners + offset shadows, terminal
mono details.

### MINIMAL
One ink color on off-white; no borders, whitespace does the work; single accent;
sans with tight tracking; motion reserved for state changes only.

### FINTECH
Dark navy/ink, one trust accent (green or blue), tabular numbers (mono for
figures), data-rich dense grids, focused microcopy, subtle elevation only on
interactive states.

### AI-LAB
Dark `#0a0a0a`, gradient orbs/beams, glass panels, mono terminal accents,
battery/status chips, smooth Lenis scroll, subtle grain, evidenc-typed legend
next to metrics.

### AUTOMOTIVE
High contrast, big numerals, carbon/brushed surface metaphors, orange/red
signal accent, diagonal type, telemetry HUD styling, fast cuts.

### GAMING
Vivid accent on dark, bold outlined display type, radial vignettes, XP/level
chips, starbursts, chromatic hover, arcade mono for stats.

### CREATIVE-AGENCY
Big serif/display contrast, editorial columns, oversized type, kinetic
marquee, cursor-follow effects, off-grid placements, minimal palette + loud
single accent.

## Pick rule
Match preset to client/industry + user's expressed taste. If the user gives a
reference URL, extract its DNA and merge with the closest preset. Never copy
brand logos, assets, or exact proprietary typefaces.