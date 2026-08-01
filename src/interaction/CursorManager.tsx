import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/usePointerType";
import { useReducedMotionContext } from "@/components/layout/Providers";
import { burstParticles } from "./InteractionManager";

/** A desktop-only cursor with a delayed ring. It never replaces the native
 * cursor on touch devices or for people who ask for reduced motion. */
export function CursorManager() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotionContext();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 24 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24 });

  useEffect(() => {
    const active = finePointer && !reducedMotion;
    document.body.classList.toggle("custom-cursor-active", active);
    if (!active) return () => document.body.classList.remove("custom-cursor-active");

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const click = (event: PointerEvent) => {
      if ((event.target as HTMLElement | null)?.closest("[data-no-heart-trail]")) return;
      burstParticles({ x: event.clientX, y: event.clientY, kind: "heart", count: 3 });
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", click, { passive: true });
    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", click);
    };
  }, [finePointer, reducedMotion, x, y]);

  if (!finePointer || reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden lg:block" aria-hidden>
      <motion.span
        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sakura-blush shadow-glow-rose"
        style={{ x, y }}
      />
      <motion.span
        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-moonlight-gold/80"
        style={{ x: ringX, y: ringY }}
      />
    </div>
  );
}
