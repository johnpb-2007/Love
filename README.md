# Birthday Experience

A romantic, interactive birthday site built as a sequence of small discoveries
rather than a scrolling brochure. It is a static React + TypeScript + Vite app
and can be deployed directly to GitHub Pages.

## Status: Phase 5 complete

- [x] Phase 1 — Project architecture
- [x] Phase 2 — Design system
- [x] Phase 3 — App shell and page wayfinding
- [x] Phase 4 — Interaction engine and reusable interactive components
- [x] Phase 5 — Seven integrated story sections
- [ ] Phase 6 — Final cinematic animation pass
- [ ] Phase 7 — Optional custom music and recorded sound assets
- [ ] Phase 8 — Content, accessibility, and deployment polish
- [ ] Phase 9 — Final personal review

## What is included

- One global interaction layer for ambient atmosphere, particles, achievements,
  hidden-heart progress, lightweight sound cues, and a desktop custom cursor.
- Self-contained components for the moon, butterflies, teddy, gift sequence,
  envelope, storybook, wish jar, photo lightbox, No-button game, and hug ending.
- A `Story` composition that keeps narrative sections out of `App.tsx`.
- One canonical `src/config/sections.ts` list used by both the story and
  section navigation.
- Keyboard and touch paths for every core interaction, plus reduced-motion
  support and a static GitHub Pages-friendly build.

## Personalise it

Update [src/sections/content.ts](src/sections/content.ts) for the letter,
reasons, memories, and future-story text. Add private photos under
`public/images/`, then set each `imageUrl` in the same content file, for
example `/images/favourite-photo.jpg`.

The app provides gentle synthesised UI cues by default. To add real music or
effects later, use `registerMusic()` or `registerSound()` from
`src/interaction/AudioManager.tsx` with files stored under `public/music/`.

## Run and deploy

```bash
npm install
npm run dev
npm run lint
npm run build
```

The deployable static site is generated in `dist/`. The Vite base path is
relative, so its assets work in a GitHub Pages project subdirectory as well as
at a domain root.
