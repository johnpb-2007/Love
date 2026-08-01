# Architecture — Phase 1

## Stack & why

| Concern            | Choice                       | Why |
|---------------------|-------------------------------|-----|
| Build tool           | Vite + React 18 + TypeScript | Fast dev loop, tiny prod bundles, trivial static export for GitHub Pages (Phase 8). |
| Animation            | Framer Motion                | Real spring physics (`type: "spring"`), gesture support (`whileHover`, `drag`), `AnimatePresence` for mount/unmount — covers ~90% of the brief's "everything springs, nothing linear" requirement without hand-rolled physics. |
| Ambient background    | Plain CSS keyframes (Tailwind `animation`) | Stars/petals can number in the hundreds; mounting that many Framer Motion nodes would hurt frame rate. CSS handles the cheap, repetitive drift/twinkle; Framer Motion is reserved for anything the user directly touches. |
| Global state          | Zustand                      | Collectibles (hearts/stars), achievements, unlocked secret section, and audio on/off all need to be read from far-apart components. Zustand does this with no provider tree and a tiny bundle footprint. |
| Audio                 | Howler.js                    | Manages many short SFX plus a looping background track, with fades, without fighting browser autoplay policies (everything is gated behind a user gesture per Phase 7). |
| Confetti              | canvas-confetti               | Purpose-built, ~zero-config, avoids hand-writing particle physics for the gift box / ending. |
| Styling                | Tailwind CSS + CSS variables  | Utility-first for layout speed; design tokens (`docs/DESIGN_PLAN.md`) are centralized in `tailwind.config.ts` so no component ever hardcodes a hex value. |

No router. This is a single continuous experience, not a multi-page site — navigation between "sections" and the "secret ending" is state-driven (Zustand + scroll position), matching the brief's storybook / unlock-a-hidden-section mechanics better than URL routes would.

## Folder structure

```
birthday-experience/
├── docs/                      Planning docs (this phase's deliverable)
├── public/                    Static files copied as-is (favicon, manifest)
├── src/
│   ├── main.tsx                (Phase 3) React entry point
│   ├── App.tsx                 (Phase 3) Root shell, providers, section order
│   ├── styles/
│   │   ├── globals.css         (Phase 2) Tailwind layers + base resets
│   │   └── tokens.css          (Phase 2) CSS variables mirroring tailwind.config.ts
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero/           Opening cinematic + hero art
│   │   │   ├── gallery/        Photo gallery source images
│   │   │   ├── gift/           Gift box, cake, confetti sprite art
│   │   │   └── misc/           Everything else (icons, textures)
│   │   └── sounds/
│   │       ├── ui/             Short one-shot SFX (pop, bell, sparkle, paper)
│   │       └── ambient/        Looping background piano track
│   ├── components/
│   │   ├── ui/                 (Phase 2) Generic building blocks: Button, Card,
│   │   │                       GlassPanel, Modal — no birthday-specific logic
│   │   ├── layout/              (Phase 3) Page chrome: Navbar, Footer,
│   │   │                        SectionShell, SectionDots, LoadingScreen, Providers
│   │   └── interactive/        (Phase 4) One file per "cute interaction":
│   │                           Cursor, FloatingHearts, Butterflies, CherryBlossoms,
│   │                           TeddyBear, Moon, GiftBox, WishJar, NoButton, etc.
│   ├── sections/                (Phase 5) Hero, Gallery, Reasons, Letter,
│   │                            Timeline, Gift, Ending — compose ui/ + interactive/
│   ├── hooks/                   Shared logic: useCursorPosition, useSound,
│   │                            usePrefersReducedMotion, useCollectible
│   ├── store/                   Zustand slices: collectiblesStore, achievementsStore,
│   │                            audioStore, progressStore (secret-section unlock)
│   ├── lib/                     Pure utility functions (random pickers for the
│   │                            compliment/wish/fortune pools, math helpers)
│   ├── types/                   Shared TypeScript types (Compliment, Achievement…)
│   └── config/
│       └── theme.ts              Typed re-export of design tokens for use in JS
│                                  (e.g. passing a color into a Framer Motion prop)
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

Directories are already created on disk (empty, ready for Phase 2 onward) — nothing above is aspirational.

## Component hierarchy (planned, built starting Phase 3)

```
App
├── LoadingScreen                 (Phase 3)
├── OpeningCinematic               (Phase 4/5 — stars → name → title)
├── CustomCursor                   (Phase 4, mounted once, global)
├── AmbientBackground               (Phase 4 — stars/petals/fireflies, CSS-driven)
├── MusicPlayer (vinyl)             (Phase 4, fixed position)
├── AchievementToastLayer           (Phase 4, fixed position, reads achievementsStore)
├── CollectibleCounter              (Phase 4, fixed position, reads collectiblesStore)
├── Navbar                          (Phase 3)
├── main
│   ├── HeroSection                 (Phase 5)
│   ├── GallerySection              (Phase 5) → PhotoCard × N (Phase 4)
│   ├── ReasonsSection               (Phase 5) → hidden hearts, butterflies, balloons
│   ├── NoButtonGame                 (Phase 4, embedded in Reasons or its own section)
│   ├── LetterSection                (Phase 5) → Envelope, Book (Phase 4)
│   ├── TimelineSection               (Phase 5) → Storybook page-flip (Phase 4)
│   ├── GiftSection                   (Phase 5) → GiftBox, Cake, WishJar, FortuneCookie
│   └── EndingSection                  (Phase 5) → secret-ending transform, "Hug Me"
└── Footer                            (Phase 3)
```

Every leaf under `interactive/` is self-contained (own local animation state) and only talks to the rest of the app through the Zustand stores — e.g. `GiftBox` doesn't know about `AchievementToastLayer`, it just calls `achievementsStore.unlock("gift-opened")`.

## Responsive strategy

- Mobile-first Tailwind breakpoints (`sm` 640px / `md` 768px / `lg` 1024px / `xl` 1280px).
- Hover-only interactions (butterflies fleeing, mirror fog, cloud separation) get a touch-equivalent: on coarse pointers (`@media (pointer: coarse)`) these trigger on tap instead of hover, detected once via a `usePointerType` hook rather than duplicated per component.
- Ambient particle density (stars, petals, fireflies) scales down on small viewports and respects `prefers-reduced-motion` globally (reduced-motion users get simple fades instead of springs/physics, per Phase 8 accessibility pass).
- The opening cinematic and secret ending are viewport-relative (`vh`/`vw` units + `ResizeObserver` where needed), not fixed pixel choreography, so they hold up from a small phone to an ultrawide monitor.

## Asset organization

- Images: source files land in the matching `assets/images/<section>` folder; optimized to WebP with `<img loading="lazy">` (or explicit eager-load only for the hero) — handled in Phase 8.
- Sounds: short one-shots live in `assets/sounds/ui`, the single ambient loop in `assets/sounds/ambient`; both are loaded through Howler via a small `useSound` hook so components never call `new Audio()` directly.
- Text content pools (100+ compliments, wishes, fortunes) live as typed data in `src/lib` (e.g. `compliments.ts`) rather than JSON-fetched at runtime, since the whole set is small enough to ship in the bundle and this keeps them type-checked.
