import type { Transition, Variants } from "framer-motion";

/**
 * Spring presets -- see docs/DESIGN_PLAN.md for the reasoning behind each.
 * Every interactive component should import one of these rather than
 * writing its own `type: "spring"` config, so motion feels consistent
 * across the whole site instead of ad hoc per component.
 */
export const springs = {
  /** Hover states, photo tilt, cloud drift -- soft, slow settle. */
  gentle: { type: "spring", stiffness: 120, damping: 14 } satisfies Transition,
  /** Balloon pops, gift box reactions, achievement toasts -- visible overshoot. */
  bouncy: { type: "spring", stiffness: 300, damping: 12 } satisfies Transition,
  /** The dodging "No" button, cursor-follow elements -- needs to feel immediate. */
  snappy: { type: "spring", stiffness: 500, damping: 30 } satisfies Transition,
} as const;

export type SpringPreset = keyof typeof springs;

/** Reduced-motion fallback: a quick opacity fade instead of a spring. */
export const reducedMotionTransition: Transition = { duration: 0.15, ease: "easeOut" };

/** Pick the right transition based on the visitor's motion preference --
 * pass the result of useReducedMotion() (Phase 6) as the second argument. */
export function getSpring(preset: SpringPreset, prefersReducedMotion: boolean): Transition {
  return prefersReducedMotion ? reducedMotionTransition : springs[preset];
}

/** Common enter/exit variants, built on the spring presets above. Use
 * directly for the majority of fades/pop-ins so components don't redefine
 * the same shape repeatedly. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: springs.gentle },
  exit: { opacity: 0, y: 12, transition: reducedMotionTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: springs.bouncy },
  exit: { opacity: 0, scale: 0.9, transition: reducedMotionTransition },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: springs.snappy },
  exit: { opacity: 0, scale: 0.6, transition: reducedMotionTransition },
};

/** Wraps a list of children with a staggered reveal (e.g. hundreds of stars
 * in the opening cinematic, or a grid of gallery photos) -- apply to the
 * *parent* motion component; children use `fadeInUp` / `scaleIn` etc. */
export const staggerContainer = (staggerChildren = 0.04): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren } },
});
