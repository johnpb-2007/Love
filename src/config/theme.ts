/**
 * JS-side mirror of src/styles/tokens.css / tailwind.config.ts.
 * Keep all three in sync when a color changes -- this file exists only for
 * consumers that can't take a Tailwind class or CSS variable, e.g. passing
 * a color array into `canvas-confetti`, or setting an SVG `fill` from JS.
 * Everywhere else, prefer the Tailwind class (`bg-lantern-rose`) or the CSS
 * variable (`var(--color-lantern-rose)`).
 */
export const colors = {
  inkNavy: "#14102B",
  twilightPlum: "#2C1B47",
  sakuraBlush: "#FFB6D5",
  moonlightGold: "#F4C868",
  paperCream: "#FFF6EA",
  lanternRose: "#FF6F91",
} as const;

/** Palette used for confetti/particle bursts (gift box, ending) -- pulled
 * from `colors` rather than hardcoded so it can never drift from the theme. */
export const confettiPalette: string[] = [
  colors.moonlightGold,
  colors.sakuraBlush,
  colors.lanternRose,
  colors.paperCream,
];

export const fonts = {
  display: "'Cormorant Garamond', serif",
  body: "Quicksand, sans-serif",
  accent: "Caveat, cursive",
} as const;
