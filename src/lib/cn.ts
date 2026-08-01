import { clsx, type ClassValue } from "clsx";

/** Thin wrapper around clsx so components import one thing consistently.
 * No Tailwind class-conflict resolution (e.g. tailwind-merge) is included
 * on purpose -- this design system doesn't override utility classes at the
 * call site often enough to justify the extra dependency. Revisit if that
 * changes. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
