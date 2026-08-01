import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeInUp, staggerContainer } from "@/lib/motion";

interface SectionShellProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/** Every section (Hero, Gallery, Reasons, ...) mounts through this so
 * scroll-reveal, spacing, and the anchor id SectionDots reads stay
 * consistent instead of each section re-implementing whileInView.
 * Sections nest their own variants inside for staggered items
 * (e.g. a gallery grid) -- this only handles the section-level reveal. */
export function SectionShell({ id, children, className }: SectionShellProps) {
  return (
    <motion.section
      id={id}
      className={cn("section-padding relative", className)}
      variants={staggerContainer()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={fadeInUp}>{children}</motion.div>
    </motion.section>
  );
}
