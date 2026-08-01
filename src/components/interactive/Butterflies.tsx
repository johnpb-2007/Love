import { useMemo } from "react";
import { motion } from "framer-motion";
import { burstParticles, playSound, unlockAchievement } from "@/interaction";
import { randomBetween } from "@/lib/math";
import { useReducedMotionContext } from "@/components/layout/Providers";

interface ButterfliesProps {
  count?: number;
  className?: string;
}

interface ButterflyPosition {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  scale: number;
}

/** A local, bounded flock. It can live in a gallery card or a full section. */
export function Butterflies({ count = 3, className }: ButterfliesProps) {
  const reducedMotion = useReducedMotionContext();
  const butterflies = useMemo<ButterflyPosition[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: randomBetween(8, 88),
        top: randomBetween(8, 78),
        delay: randomBetween(-4, 0),
        duration: randomBetween(3.8, 6.5),
        scale: randomBetween(0.72, 1.12),
      })),
    [count],
  );

  const befriend = (event: React.MouseEvent<HTMLButtonElement>) => {
    burstParticles({ x: event.clientX, y: event.clientY, kind: "sparkle", count: 8 });
    playSound("sparkle");
    unlockAchievement("butterfly-friend");
  };

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      {butterflies.map((butterfly) => (
        <motion.button
          key={butterfly.id}
          type="button"
          className="pointer-events-auto cursor-interactive absolute text-2xl drop-shadow-[0_0_10px_rgba(255,182,213,0.6)]"
          style={{ left: `${butterfly.left}%`, top: `${butterfly.top}%` }}
          aria-label="Say hello to a butterfly"
          onClick={befriend}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            reducedMotion
              ? { opacity: 0.72, scale: butterfly.scale }
              : {
                  opacity: [0, 0.9, 0.76],
                  x: [0, 20, -12, 0],
                  y: [0, -17, -4, 0],
                  rotate: [-8, 7, -6, -8],
                  scale: [butterfly.scale * 0.86, butterfly.scale, butterfly.scale * 0.9],
                }
          }
          transition={{
            duration: butterfly.duration,
            delay: butterfly.delay,
            repeat: reducedMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: butterfly.scale * 1.18 }}
          whileTap={{ scale: butterfly.scale * 0.8 }}
          data-no-heart-trail
        >
          🦋
        </motion.button>
      ))}
    </div>
  );
}
