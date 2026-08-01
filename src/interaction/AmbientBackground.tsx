import { useMemo } from "react";
import { useReducedMotionContext } from "@/components/layout/Providers";
import { randomBetween } from "@/lib/math";

interface AmbientPoint {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

/** Cheap CSS-driven atmosphere; it sits behind content and never captures input. */
export function AmbientBackground() {
  const reducedMotion = useReducedMotionContext();
  const stars = useMemo<AmbientPoint[]>(
    () =>
      Array.from({ length: 34 }, (_, id) => ({
        id,
        left: randomBetween(1, 99),
        top: randomBetween(1, 94),
        size: randomBetween(2, 5),
        delay: randomBetween(-6, 0),
        duration: randomBetween(2.8, 6.4),
      })),
    [],
  );
  const petals = useMemo<AmbientPoint[]>(
    () =>
      Array.from({ length: 9 }, (_, id) => ({
        id,
        left: randomBetween(2, 96),
        top: randomBetween(-20, 25),
        size: randomBetween(7, 13),
        delay: randomBetween(-15, 0),
        duration: randomBetween(12, 20),
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-15%,rgba(244,200,104,0.14),transparent_38%),radial-gradient(circle_at_12%_42%,rgba(255,111,145,0.11),transparent_34%)]" />
      {stars.map((star) => (
        <span
          key={star.id}
          className="ambient-star absolute rounded-full bg-paper-cream shadow-[0_0_10px_rgba(244,200,104,0.65)]"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: reducedMotion ? 0.45 : undefined,
          }}
        />
      ))}
      {!reducedMotion &&
        petals.map((petal) => (
          <span
            key={petal.id}
            className="ambient-petal absolute text-sakura-blush/55"
            style={{
              left: `${petal.left}%`,
              top: `${petal.top}%`,
              fontSize: petal.size,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
            }}
          >
            ✿
          </span>
        ))}
    </div>
  );
}
