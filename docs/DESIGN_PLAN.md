# Design Plan — Phase 1

This is the plan; the actual reusable CSS/utilities that implement it are built in
Phase 2 (Design System). Nothing here is generic — every choice is pulled from
the brief's own imagery (night sky, cherry blossoms, moonlight, paper love
letters, lantern glow) rather than a default template palette.

## Signature element

**The starlight thread.** The opening cinematic has stars connect to spell her
name — that idea is reused as the visual throughline for the whole site: a
thin glowing gold trail follows collected hearts/stars into the counter,
connects constellation points behind the Moon, and reappears as the crack of
light when the gift box finally opens. One idea, spent deliberately, instead
of unrelated sparkle effects scattered everywhere.

## Color palette — "Night Bloom"

| Token              | Hex       | Role |
|---------------------|-----------|------|
| `ink-navy`           | `#14102B` | Primary background — the night sky itself, not a neutral black. |
| `twilight-plum`      | `#2C1B47` | Gradient partner to ink-navy for dusk transitions, card backgrounds on dark sections. |
| `sakura-blush`       | `#FFB6D5` | Cherry blossom pink — the site's warm accent, used sparingly (petals, highlights, hover glows). |
| `moonlight-gold`     | `#F4C868` | Starlight, moon glow, the starlight-thread motif, achievement highlights. |
| `paper-cream`        | `#FFF6EA` | Love-letter paper, card surfaces, primary text color on dark backgrounds. |
| `lantern-rose`       | `#FF6F91` | Primary interactive color — CTAs, the "YES ❤️" button, active states. |

Deliberately avoided: warm-cream-and-terracotta (the current AI-template
default), pure near-black with a single neon accent, and any broadsheet /
hairline-rule layout — none of those match a warm, romantic, night-sky brief.

## Typography

| Role     | Typeface              | Used for |
|----------|------------------------|----------|
| Display  | Cormorant Garamond      | "Happy Birthday" title reveal, section headings, the Book/Letter — an elegant, romantic serif, used with restraint (headings only, never body copy). |
| Body     | Quicksand                | UI copy, navigation, buttons, captions — soft, rounded, friendly without being childish. |
| Accent   | Caveat                    | Compliments, wishes, fortunes, achievement toasts — a handwritten feel for anything that reads like a personal note. Used sparingly so it stays special. |

All three load via `@fontsource` packages (self-hosted, no runtime Google
Fonts request) — added to `package.json` in Phase 2 alongside the actual CSS.

## Animation plan

**Principle:** Framer Motion springs for anything the user directly touches
(buttons, cards, drags, modals); cheap CSS keyframes for ambient background
motion that runs continuously in the background (stars, petals, fireflies) —
see `docs/ARCHITECTURE.md` for the performance reasoning.

Three spring presets, defined once in Phase 2 and reused everywhere so motion
feels consistent instead of ad hoc:

| Preset    | Config (Framer Motion)                              | Used for |
|-----------|-------------------------------------------------------|----------|
| `gentle`  | `{ type: "spring", stiffness: 120, damping: 14 }`     | Hover states, photo tilt, cloud drift — soft, slow settle. |
| `bouncy`  | `{ type: "spring", stiffness: 300, damping: 12 }`     | Balloon pops, gift box reactions, achievement toasts — visible overshoot. |
| `snappy`  | `{ type: "spring", stiffness: 500, damping: 30 }`     | The dodging "No" button, cursor-follow elements — needs to feel immediate. |

Additional rules:

- No `ease: "linear"` and no fixed-duration `ease-in-out` tweens for anything
  interactive — springs only, per the brief.
- Every mount/unmount (modals, toasts, envelopes opening) goes through
  `AnimatePresence` so exits animate instead of popping away.
- `prefers-reduced-motion` swaps springs for short opacity fades and disables
  camera-shake/vibration-style effects — implemented once in a shared
  `useReducedMotionVariants` hook (Phase 6), not per component.
- Stagger children (e.g. hundreds of stars appearing in the opening cinematic)
  use Framer Motion's `staggerChildren` on the parent rather than manual
  per-child delays.
