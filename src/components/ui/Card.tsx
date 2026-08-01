import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import { springs } from "@/lib/motion";

type CardVariant = "paper" | "glass";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  /** "paper" = love-letter/cream surface (light text needed inside).
   * "glass" = translucent night-sky surface, the more common default. */
  variant?: CardVariant;
  /** Lifts the card a few pixels on hover -- for cards that act like
   * buttons (gallery thumbnails, gift options), off by default. */
  hoverLift?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  paper: "bg-paper-cream text-ink-navy shadow-lift-paper",
  glass: "glass-panel text-paper-cream",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "glass", hoverLift = false, className, children, ...rest },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      className={cn("rounded-3xl p-6 sm:p-8", variantClasses[variant], className)}
      whileHover={hoverLift ? { y: -6 } : undefined}
      transition={springs.gentle}
      {...rest}
    >
      {children}
    </motion.div>
  );
});
