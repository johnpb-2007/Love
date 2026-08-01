import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PolymorphicProps<E extends ElementType> = {
  as?: E;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<E>, "as" | "className" | "children">;

/** Factory so each role (Display/Heading/Body/Script) shares the same
 * polymorphic "as" behavior without duplicating it four times. */
function createTypographyComponent<Default extends ElementType>(
  defaultElement: Default,
  baseClassName: string,
) {
  return function TypographyComponent<E extends ElementType = Default>({
    as,
    className,
    children,
    ...rest
  }: PolymorphicProps<E>) {
    const Component = (as ?? defaultElement) as ElementType;
    return (
      <Component className={cn(baseClassName, className)} {...rest}>
        {children}
      </Component>
    );
  };
}

/** The title reveal, big section openers -- Cormorant Garamond, used sparingly. */
export const Display = createTypographyComponent(
  "h1",
  "font-display font-semibold tracking-tight text-paper-cream text-4xl sm:text-5xl md:text-6xl",
);

/** Section headings. */
export const Heading = createTypographyComponent(
  "h2",
  "font-display font-semibold text-paper-cream text-2xl sm:text-3xl md:text-4xl",
);

/** Everyday copy -- Quicksand, readable at small sizes. */
export const Body = createTypographyComponent(
  "p",
  "font-body text-paper-cream/90 text-base leading-relaxed",
);

/** Handwritten accent for compliments, wishes, and fortunes -- Caveat.
 * Kept as its own component so it's never reached for by accident. */
export const Script = createTypographyComponent(
  "span",
  "font-accent text-sakura-blush text-2xl sm:text-3xl leading-snug",
);
