import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { randomBetween, randomInt } from "@/lib/math";
import { interactionManager } from "./InteractionManager";
import { useReducedMotionContext } from "@/components/layout/Providers";
import type { ParticleBurst, ParticleKind } from "@/types/interaction";

interface Particle {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotate: number;
  size: number;
  kind: ParticleKind;
  glyph: string;
  colorClass: string;
}

const glyphs: Record<ParticleKind, string[]> = {
  heart: ["♡", "♥"],
  sparkle: ["✦", "·", "✧"],
  petal: ["✿", "·"],
  confetti: ["◆", "●", "✦"],
};

const colors: Record<ParticleKind, string[]> = {
  heart: ["text-sakura-blush", "text-lantern-rose", "text-paper-cream"],
  sparkle: ["text-moonlight-gold", "text-paper-cream", "text-sakura-blush"],
  petal: ["text-sakura-blush", "text-paper-cream"],
  confetti: ["text-moonlight-gold", "text-lantern-rose", "text-sakura-blush"],
};

function createParticles(burst: ParticleBurst, reduced: boolean): Particle[] {
  const count = reduced ? Math.min(burst.count ?? 8, 3) : burst.count ?? 8;
  return Array.from({ length: count }, (_, index) => ({
    id: `${Date.now()}-${index}-${Math.random()}`,
    x: burst.x,
    y: burst.y,
    dx: randomBetween(-80, 80),
    dy: randomBetween(-115, -35),
    rotate: randomBetween(-150, 150),
    size: randomInt(13, 23),
    kind: burst.kind,
    glyph: glyphs[burst.kind][Math.floor(Math.random() * glyphs[burst.kind].length)],
    colorClass: colors[burst.kind][Math.floor(Math.random() * colors[burst.kind].length)],
  }));
}

/** The only fixed particle overlay. All interactions publish bursts to it. */
export function ParticleManager() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    return interactionManager.subscribe((event) => {
      if (event.type !== "particle:burst") return;
      const next = createParticles(event.payload, reducedMotion);
      setParticles((current) => [...current, ...next]);
      window.setTimeout(() => {
        setParticles((current) => current.filter((particle) => !next.includes(particle)));
      }, reducedMotion ? 250 : 1250);
    });
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden>
      {particles.map((particle) => {
        return (
          <motion.span
            key={particle.id}
            className={`absolute leading-none ${particle.colorClass}`}
            style={{ left: particle.x, top: particle.y, fontSize: particle.size }}
            initial={{ opacity: 1, scale: 0.65, x: "-50%", y: "-50%" }}
            animate={{
              opacity: 0,
              scale: 1.25,
              x: `calc(-50% + ${particle.dx}px)`,
              y: `calc(-50% + ${particle.dy}px)`,
              rotate: particle.rotate,
            }}
            transition={{ duration: reducedMotion ? 0.2 : 1.1, ease: "easeOut" }}
          >
            {particle.glyph}
          </motion.span>
        );
      })}
    </div>
  );
}
