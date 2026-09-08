---
name: rive-animation
description: Use when the user wants lightweight animated vector graphics that LOOK 3D — motion graphics, animated mascots/characters, button hover micro-interactions, hero animations, marquees, or scroll-driven visual effects — without the overhead of Three.js. Trigger keywords: rive, .riv, 3d without three, animated vector, motion graphic, micro-interaction, interactive animation, smooth animation, gooey, character animation, WebGL canvas animation. Includes how to pair with Lenis smooth-scroll for scroll-driven choreography.
---

# Rive Animation (lightweight "3D" without Three.js)

Rive renders vector motion graphics to a WebGL `<canvas>` from compact `.riv` files. It produces the look of 3D/interactive animation at a fraction of the size and complexity of Three.js / react-three-fiber.

## Where this came from

Learned from analyzing **landonorris.com** — that site's "3D" hero, helmets, button micro-interactions, marquee, and collab visuals are NOT Three.js. They are **Rive** animations rendered into 21 `<canvas>` elements (`window.rive` exposes the full runtime: `Rive`, `Layout`, `Fit`, `EventType`, `StateMachineInput`, `RuntimeLoader`). Page scroll is driven by **Lenis** (`<body class="lenis">`). The site is Webflow + custom `.w-embed` scripts that lazily load Rive and Lenis. This is the modern, low-cost way to get "premium interactive 3D-looking" visuals.

## When to choose Rive vs Three.js

- **Rive** (RECOMMENDED default for decorative visuals): motion graphics, logos, characters, hover/click micro-interactions, hero animations, angled/perspective vector illustrations that read as "3D". Uses `.riv` files created in the Rive editor (rive.app). Tiny, GPU-rendered, no 3D math.
- **Three.js / R3F**: only when you need true real-time 3D (rotating 3D models, scenes, camera controls, GLTF assets).

For most client sites, Rive replaces what people think they need Three.js for — and it is dramatically lighter and easier to maintain.

## Install

```bash
# High-level React wrapper
npm install @rive-app/react-canvas

# OR framework-agnostic canvas runtime
npm install @rive-app/canvas
```

## React example (`@rive-app/react-canvas`)

```tsx
"use client";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export function AnimatedHero() {
  const { rive, RiveComponent } = useRive({
    src: "/animations/hero.riv",   // .riv file in /public/animations
    stateMachines: "Main",
    autoplay: true,
  });

  // Drive a boolean input on hover (e.g. trigger a play state)
  const hoverInput = useStateMachineInput(rive, "Main", "Hovered");
  const onMouseEnter = () => hoverInput && (hoverInput.value = true);

  return (
    <div
      onMouseEnter={onMouseEnter}
      className="h-[450px] w-full"
      style={{ aspectRatio: "800/571" }}
    >
      {/* MUST give the container explicit width + height */}
      <RiveComponent />
    </div>
  );
}
```

## Framework-agnostic canvas runtime (`@rive-app/canvas`)

```ts
import { Rive, Layout, Fit, Alignment } from "@rive-app/canvas";

const rive = new Rive({
  src: "/animations/hero.riv",
  canvas: document.getElementById("rive-canvas") as HTMLCanvasElement,
  autoplay: true,
  stateMachines: "Main",
  layout: new Layout({
    fit: Fit.Contain,
    alignment: Alignment.Center,
  }),
  onLoad: () => {
    // stateMachineInputs are safe to mutate only inside onLoad
    const inputs = rive.stateMachineInputs("Main");
    inputs?.forEach((i) => {
      if (i.type === rive.StateMachineInputType.Boolean) i.value = false;
    });
  },
});

// Hover → trigger state machine
el.addEventListener("mouseenter", () => {
  const inputs = rive.stateMachineInputs("Main");
  inputs?.forEach((i) => {
    if (i.type === rive.StateMachineInputType.Boolean && i.name === "Hovered") {
      i.value = true;
    }
  });
});

// Cleanup
export function cleanup() { rive.cleanup(); }
```

## Critical implementation rules

1. **Container must have explicit width AND height** (or an `aspect-ratio`) — otherwise the Rive `<canvas>` collapses to 0×0 and nothing renders. (landonorris uses e.g. 800×571 marquee, 300×150, 212×161 canvases.)
2. **`.riv` files live in `/public/animations/`** (or a CDN). Keep them small — they compress extremely well.
3. **React wrapper auto-creates the `<canvas>`.** For the raw runtime you provide the canvas and it manages it.
4. **Mutate `stateMachineInputs` only inside `onLoad`** (or after load) — the Load event fires before the first state machine advance so inputs are safe there.
5. Add **fallbacks**: Rive requires WebGL; provide a static image/`<noscript>`/poster for no-WebGL or blocked contexts.
6. Multiple instances: keep a ref to each `Rive`/component and call `cleanup()` / `unmount` on teardown.

## Ambient hero pattern (editorial-void sites)

For a full-bleed "atmosphere" Rive behind a black editorial hero (like dragonfly/landonorris), drop it absolutely-positioned and dim it — it should read as subtle texture, not an animation:

```tsx
<div className="absolute inset-0 opacity-20">
  <RiveScene src="/animations/vehicles.riv" className="h-full w-full [&_canvas]:h-full [&_canvas]:w-full" />
</div>
```

- `absolute inset-0` + `opacity-20` (or `opacity-[0.15]`) keeps the giant display text legible on top.
- Then overlay the faint 81px grid (`rgba(242,242,242,0.02)`) and set content `relative z-10`.
- Give the canvas `h-full w-full` so it fills without collapsing (rule 1 still applies).

## Pairing with Lenis for scroll-driven choreography

Rive handles the brush/vector motion; **Lenis** (@studio-freight/lenis) gives the buttery smooth scroll that these sites are known for, enabling scroll-pinned sections, horizontal tracks, and marquees.

```bash
npm install lenis
```

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);
}
```

Add `html { scroll-behavior: auto }` (Lenis manages its own smoothing) — do not combine with CSS `scroll-behavior: smooth`.

### Scroll-pinned horizontal track (the "is-horizontal-track" pattern, ~3143px)

Pin a tall section while a horizontal child translates across it as the user scrolls — classic premium-site effect.

```tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HorizontalTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={ref} className="relative h-[300vh]">       {/* tall, pins the effect */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {/* full-bleed cards / images that translate horizontally */}
        </motion.div>
      </div>
    </section>
  );
}
```

## Full-viewport section rhythm

Premium scroll sites (like landonorris) choreograph mostly `100vh`/`100svh` sections:

```css
.section { min-height: 100svh; }   /* svh avoids mobile address-bar jump */
```

Use `svh` not `vh` on mobile. Make the hero a full-viewport composition, then stack impact sections.

## Rules
1. Rive for decorative/animated vector "3D" — NOT Three.js, unless true real-time 3D is needed.
2. Always give containers explicit width + height / aspect ratio.
3. Mutate state-machine inputs only after load (in `onLoad`).
4. Provide no-WebGL fallback.
5. Pair with Lenis + framer-motion `useScroll`/`useTransform` for scroll-driven effects; use `svh` for full-viewport sections.
