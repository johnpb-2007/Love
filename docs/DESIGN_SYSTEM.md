# Design System — Phase 2

Turns the plan in `docs/DESIGN_PLAN.md` into real, reusable code. Nothing here
is birthday-specific yet (no teddy bear, no gift box) — this is the shared
foundation every interactive component and section will build on from
Phase 3 onward.

## What was built

| Area | File(s) | Notes |
|------|---------|-------|
| Color variables | `tailwind.config.ts`, `src/styles/tokens.css`, `src/config/theme.ts` | Same six Night Bloom colors defined three times *on purpose* — Tailwind classes for markup, CSS variables for raw CSS/inline SVG, a typed JS object for canvas-confetti and other JS consumers. All three must be kept in sync if a color ever changes. |
| Typography | `src/styles/globals.css` (font imports), `src/components/ui/Typography.tsx` | `Display` / `Heading` / `Body` / `Script` components, one factory function instead of four near-duplicate components. |
| Buttons | `src/components/ui/Button.tsx` | `primary` / `secondary` / `ghost` variants, `sm` / `md` / `lg` sizes, spring hover/tap built in via `src/lib/motion.ts`. |
| Cards | `src/components/ui/Card.tsx` | `paper` (love-letter cream) and `glass` (translucent night-sky) variants, optional `hoverLift`. |
| Glass effects | `.glass-panel` in `src/styles/globals.css` | One definition, used by `Card`'s glass variant and reusable later for modals/envelopes rather than redefined per component. |
| Shadows | `boxShadow` in `tailwind.config.ts` | `glow-gold`, `glow-rose`, `lift-paper` — tinted glows in the theme's own colors instead of generic gray drop-shadows. |
| Spacing system | `.section-padding` in `globals.css`, `--space-section-y` in `tokens.css` | Tailwind's default 4px scale is kept as-is; the one addition is a shared section rhythm so Hero/Gallery/Letter/etc. don't each invent their own padding. |
| Animation presets | `src/lib/motion.ts` | `springs.gentle/bouncy/snappy` (the three presets from `DESIGN_PLAN.md`, now real Framer Motion `Transition` objects), plus reusable `Variants`: `fadeInUp`, `scaleIn`, `popIn`, `staggerContainer`, and a `getSpring()` helper for the reduced-motion swap. |
| Cursor styles | `.custom-cursor-active` / `.cursor-interactive` in `globals.css` | CSS hook points only — the actual glowing-heart custom cursor is a Phase 4 component ("Interactive Components"); this just gives it something to toggle. |
| Reusable utilities | `src/lib/cn.ts`, `src/lib/math.ts`, `src/lib/random.ts` | Classname merging, numeric helpers (`clamp`, `lerp`, `randomBetween`), and array pickers (`pickRandom`, `pickRandomUnique`) that the compliment/wish/fortune pools and positioning logic will use from Phase 4 onward. |

## How later phases should use this

- Never hardcode a hex value, a `type: "spring"` config, or a `backdrop-blur`
  stack in a new component — import from `theme.ts` / `motion.ts` / the
  `.glass-panel` class instead.
- New UI primitives (Modal, Tooltip, etc.) get added to `src/components/ui`
  and exported from its `index.ts` as they're needed, rather than all at
  once now — Phase 2 only builds what Phase 3+ is already known to need.
- `Button`, `Card`, and the `Typography` set are intentionally generic
  (no birthday copy, no icons baked in) so Phase 4/5 compose them into the
  actual interactive pieces and sections.
