import type { Config } from "tailwindcss";

// Design tokens are documented in full in docs/DESIGN_PLAN.md.
// This file is the single source of truth for their Tailwind names --
// components should reference these tokens, never raw hex values.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "ink-navy": "#14102B",     // deep night-sky background
        "twilight-plum": "#2C1B47", // dusk gradient companion
        "sakura-blush": "#FFB6D5",  // cherry blossom pink, warm accent
        "moonlight-gold": "#F4C868", // starlight / moon glow / achievements
        "paper-cream": "#FFF6EA",   // love-letter paper, light surfaces
        "lantern-rose": "#FF6F91",  // primary interactive / CTA
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],  // titles, letter, book
        body: ["Quicksand", "sans-serif"],            // UI copy, body text
        accent: ["Caveat", "cursive"],                 // handwritten notes, wishes
      },
      keyframes: {
        // Lightweight CSS-only motion for ambient background elements
        // (stars, petals) where mounting hundreds of Framer Motion
        // instances would be wasteful. Interactive elements use
        // Framer Motion springs instead -- see docs/DESIGN_PLAN.md.
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        drift: {
          "0%": { transform: "translateY(-5%) translateX(0)" },
          "50%": { transform: "translateY(50vh) translateX(2vw)" },
          "100%": { transform: "translateY(105vh) translateX(-2vw)" },
        },
      },
      animation: {
        twinkle: "twinkle 3.2s ease-in-out infinite",
        drift: "drift 14s linear infinite",
      },
      boxShadow: {
        // Tinted, glowing shadows in the theme's own colors rather than
        // generic gray drop-shadows -- keeps the "night sky / lantern"
        // feel even in shadow. Used by Button, Card, and achievement toasts.
        "glow-gold": "0 0 24px 0 rgba(244, 200, 104, 0.35)",
        "glow-rose": "0 0 24px 0 rgba(255, 111, 145, 0.4)",
        "lift-paper": "0 12px 32px -8px rgba(20, 16, 43, 0.45)",
      },
      borderRadius: {
        // A slightly softer max radius than Tailwind's default "3xl" for
        // the rounded, plush feel the brief calls for (cards, buttons).
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
