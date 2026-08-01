/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation between a and b at t (0-1). Used for cursor-follow
 * easing and parallax offsets. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Random float in [min, max). */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/** Random integer in [min, max]. */
export function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1));
}
