import { useState } from "react";
import { motion } from "framer-motion";
import { burstParticles, playSound } from "@/interaction";

interface TeddyBearProps {
  className?: string;
}

const teddyMoods = ["wave", "dance", "snuggle", "happy"] as const;

/** A small, reusable character with a different response each tap. */
export function TeddyBear({ className }: TeddyBearProps) {
  const [moodIndex, setMoodIndex] = useState(0);
  const mood = teddyMoods[moodIndex];

  const react = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoodIndex((index) => (index + 1) % teddyMoods.length);
    burstParticles({ x: event.clientX, y: event.clientY, kind: "heart", count: 5 });
    playSound("sparkle");
  };

  return (
    <motion.button
      type="button"
      className={`cursor-interactive flex flex-col items-center gap-1 ${className ?? ""}`}
      aria-label="Tap the little teddy bear"
      onClick={react}
      animate={
        mood === "dance"
          ? { rotate: [-8, 8, -8], y: [0, -8, 0] }
          : mood === "wave"
            ? { rotate: [0, -6, 6, 0] }
            : { y: [0, -4, 0] }
      }
      transition={{ duration: mood === "dance" ? 0.62 : 1.7, repeat: mood === "dance" ? 2 : Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      data-no-heart-trail
    >
      <span className="text-5xl drop-shadow-[0_8px_14px_rgba(20,16,43,0.45)]" aria-hidden>
        🧸
      </span>
      <span className="font-accent text-lg text-sakura-blush">tap me</span>
    </motion.button>
  );
}
