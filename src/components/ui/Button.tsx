import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import { springs } from "@/lib/motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-lantern-rose text-ink-navy shadow-glow-rose",
  secondary: "glass-panel text-paper-cream hover:border-moonlight-gold/40",
  ghost: "bg-transparent text-paper-cream hover:bg-paper-cream/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

/**
 * The one Button every interactive element (No-button game, gift box CTA,
 * "Hug Me") should render through, so hover/tap motion stays consistent
 * across the whole site instead of each component re-implementing it.
 * Spring values come from src/lib/motion.ts, not hardcoded here.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, children, ...rest },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      className={cn(
        "cursor-interactive inline-flex items-center justify-center rounded-2xl font-body font-semibold transition-colors",
        "disabled:opacity-40 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={springs.gentle}
      {...rest}
    >
      {children}
    </motion.button>
  );
});
