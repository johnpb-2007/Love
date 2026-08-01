import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { springs } from "@/lib/motion";

interface LoadingScreenProps {
  onComplete: () => void;
  /** Floor so it never just flashes on a fast connection. Real asset-aware
   * preloading (waiting on hero images/fonts) lands in Phase 8 -- this is
   * time-based so the layout can be reviewed end-to-end now. */
  minDurationMs?: number;
}

export function LoadingScreen({ onComplete, minDurationMs = 1400 }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), minDurationMs);
    return () => clearTimeout(timer);
  }, [minDurationMs]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-navy"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={springs.gentle}
        >
          <motion.span
            className="text-5xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            ❤️
          </motion.span>
          <span className="sr-only">Loading…</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
