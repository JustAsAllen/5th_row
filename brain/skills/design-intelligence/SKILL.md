---
name: design-intelligence
description: Design analysis and design-language system. Use when a user wants a specific look ("make it look like X"), a design overhaul, brand work, or when generating DESIGN DNA from a reference site or preset. Pairs with website-cloner (analyze/extract) and ui-ux-premium (polish). Trigger keywords: design language, design system, design DNA, look like, aesthetic, brand, reference design, presets, visual identity.
---

# design-intelligence

Turn design preferences into a reusable, principled system.

## Workflow
1. Source: reference URL (analyze), user words ("premium cyberpunk"), or preset
   (from `brain/design/presets.md`).
2. Analyze/select per the DESIGN DNA fields (see presets.md).
3. Write the DNA block into project memory (`.opencode/brain/MEMORY.md` →
   "UI language") so future sessions reuse it.
4. Apply the tokens in code (CSS vars/theme): tokens FIRST, then components.

## Rules
- Extract principles; never clone protected branding/assets/typefaces.
- Judge visual QA against this DNA, not vague taste.
- Keep 5th_row's editorial baseline unless the client/user explicitly wants a
  different preset — then note the switch in memory.
- React/Next: implement tokens via globals.css CSS variables + Tailwind theme,
  then components consume them (no magic literals scattered).