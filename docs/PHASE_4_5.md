# Phase 4 + 5 — Interaction Engine and Story Sections

## Global interaction contract

`src/interaction/InteractionLayer.tsx` is mounted once beneath `Providers`.
It owns the fixed layers that should never be duplicated by individual
sections:

- CSS-driven stars and petals (`AmbientBackground`)
- pointer-follow cursor for fine pointers (`CursorManager`)
- all short-lived bursts (`ParticleManager`)
- achievement toast queue (`AchievementManager`)
- heart counter and unlock coordination (`CollectibleManager`)
- sound cue registry and mute control (`AudioManager`)

Components publish small typed events through `InteractionManager`; they do
not mount their own particle canvas or toast layer. Shared progress stays in
Zustand stores under `src/store/`.

## Implemented section contracts

| Section | Primary interaction | Hidden discovery | Reward |
| --- | --- | --- | --- |
| Hero | Moon + begin transition | Heart near the stars | First-spark / moon achievements |
| Gallery | Tilted memory cards and modal | Gallery heart + butterflies | Butterfly achievement |
| Reasons | Flip cards and the No-button game | Three hidden hearts | Heart counter progress |
| Letter | Drag-or-tap envelope | Folded heart + doodle | Read-the-letter achievement |
| Timeline | Click-through storybook | Heart between pages | Storybook achievement |
| Gift | Three-click present and wish jar | Cat + gift heart | Gift achievement and confetti |
| Ending | Hug ending | Final heart | Secret sunrise after all ten hearts |

## Intentional asset handling

The supplied Phase 3 archive contains no private images or recorded audio.
The gallery therefore uses polished image-free memory cards instead of broken
links, and audio uses short generated UI cues. Both paths are deliberate:
they keep the site functional until personal files are safely added.
