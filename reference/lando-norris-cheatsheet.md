# Lando Norris Design Patterns — Quick Reference Cheat Sheet

## Color Tokens
```
--color--black: #101400          (near-black green, main bg)
--color--white: #FFFFFF          (text, light bg)
--color--lime: #D2FF00           (primary accent)
--color--lime-off: (desaturated) (impact text accent)
--color--dark-green: (dark)      (theme transitions)
--color--grey-1: (light grey)    (nav brand)
--color--grey-2: (medium grey)   (nav brand)
--color--green-off-white-2: (off-white green) (off-track text)
```

## Animation Tokens
```
--cubic-default: cubic-bezier(0.65, 0.05, 0, 1)   /* Deceleration curve */
--duration-default: 0.75s
--animation-default: 0.75s cubic-bezier(0.65, 0.05, 0, 1)
```

## Fluid Font Formula
```css
html {
  font-size: calc(clamp(min-width, 100vw, max-width) / 1728 * 16 * 1);
}
/* Desktop: min=992 max=1920 unit=16 */
/* Tablet:  min=768  max=991  unit=20 */
/* Mobile:  min=320  max=479  unit=48 */
```

## Typography Specs
```
Impact headline:   8.25rem / 83% / -0.1875ls / Brier 700
Partnership h3:     var(--text--impact) / 90.6% / -0.0625ls / Mona 660(wght) 93(wdth) / uppercase
Partnership p:      2.25rem / 1.1 / -0.0625ls / Mona 500(wght) 100(wdth)
Calendar body:      1rem / 1.3 / -0.0125ls / Mona 500
Rich text body:     1.6 line-height
```

## CSS Mask Pattern
```css
.masked-element {
  --mask-url: url('path.svg');
  -webkit-mask-image: var(--mask-url);
  mask-image: var(--mask-url);
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}
```

## Clip-Path Patterns
```
Text reveal:        polygon(0 -2%, 0 94%, 100% 94%, 100% -2%)
Helmet hover:       ellipse(100% 120% at 50% 0%)
Video default:      ellipse(100% 50% at 50% 50%)
Video hover:        ellipse(80% 50% at 50% 50%)
```

## Hover Effects
```
Helmet grid:        clip-path ellipse reveal + scale(1.1) + lime color
Partnership video:  clip-path ellipse shrink (100% → 80%)
Calendar row:       line hides + round SVG color changes
Trophy:             filter: invert(100%) grayscale(100%)
Nav brand:          fill color transition
```

## Scrollbar Hiding
```css
body ::-webkit-scrollbar { display: none; }
body { -ms-overflow-style: none; }
html { scrollbar-width: none; }
```

## Text Selection
```css
::selection { background: #D2FF00; color: #101400; }
[data-theme="lime"] *::selection { background: #101400; color: #D2FF00; }
```

## Focus Visible
```css
:focus-visible { outline: 2px solid var(--color--lime); outline-offset: 2px; }
```

## Screen Reader
```css
[screen-reader]:not(:focus,:active,:focus-within) {
  clip-path: inset(50%); height: 1px; width: 1px; overflow: hidden;
  position: absolute; white-space: nowrap; border: 0;
}
```

## Marquee Keyframes
```css
@keyframes translateXLeft  { to { transform: translateX(-100%); } }
@keyframes translateXRight { to { transform: translateX(100%); } }
/* 30s linear infinite paused, JS toggles play-state */
```

## Horizontal Scroll Structure
```
.horizontal-pin-wrap
  └── .horizontal-pin-spacer (scroll distance)
      └── .horizontal-pin-sticky (sticky, top:0)
          └── .horizontal-track (translateX driven by scroll)
              └── .horizontal-item-w (panels)
```

## Key Design Principles
1. Void aesthetic — pure dark bg, no cards, no borders
2. Serif body + mono micro-labels (10px uppercase)
3. Lime accent on black, used sparingly
4. Non-standard shapes via CSS masks
5. Scroll-driven nav theme + section colors + animations
6. Text-only CTAs with lime → arrow
7. Split-text character animation everywhere
8. Rive for decorative "3D" motion (not Three.js)
9. Marquee for rhythm and energy
10. Progressive complexity — simple at first, layered on inspection

## Section Order (Homepage)
1. Navigation (fixed, theme-switching)
2. Hero (sticky, WebGL parallax portrait + 3D helmet)
3. Marquee (signature + GL carousel)
4. Impact statement (Brier bold text)
5. Horizontal scroll track (On-Track / Off-Track split)
6. Helmet grid (2019-2025, masked shapes)
7. Store / Lando Exe (champion merch)
8. Social callouts (video cards)
9. Footer (SVG mask clip, partner marquee)

## Responsive Breakpoints
```
>=1920px:  Large desktop (marquee fade masks)
>=992px:   Desktop (hover states active)
<=991px:   Tablet (impact text inherits size)
<=767px:   Mobile landscape
<=479px:   Mobile portrait (masks swap, font scales to 48px)
```

## Data-Hide Pattern
```html
<div data-hide="d">Desktop only</div>
<div data-hide="t">Hidden on tablet</div>
<div data-hide="ml">Hidden on mobile landscape</div>
<div data-hide="m">Hidden on mobile</div>
```
