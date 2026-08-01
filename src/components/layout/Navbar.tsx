import { motion, useScroll, useSpring } from "framer-motion";
import { Script } from "@/components/ui";

/** No link list -- this is one continuous narrative, not a multi-page site,
 * so a traditional nav would be decoration. The wordmark + scroll-progress
 * bar is the wayfinding; SectionDots handles jumping between sections. */
export function Navbar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="glass-panel flex items-center justify-center px-6 py-3 sm:px-10">
        <Script as="span" className="text-xl sm:text-2xl">
          Happy Birthday
        </Script>
      </div>
      <motion.div className="h-0.5 origin-left bg-moonlight-gold" style={{ scaleX: progress }} />
    </header>
  );
}
