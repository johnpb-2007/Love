/** Pick one random item from a non-empty array. */
export function pickRandom<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error("pickRandom: items must not be empty");
  }
  return items[Math.floor(Math.random() * items.length)];
}

/** Pick `count` unique random items from an array (order not preserved).
 * Used for things like the Heart Collector, where the same hidden-heart
 * spot shouldn't repeat within a session. */
export function pickRandomUnique<T>(items: readonly T[], count: number): T[] {
  const pool = [...items];
  const result: T[] = [];
  const n = Math.min(count, pool.length);
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(index, 1)[0]);
  }
  return result;
}
