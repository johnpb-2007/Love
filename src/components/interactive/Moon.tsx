import { useState } from "react";
import { MoonStar } from "lucide-react";
import { motion } from "framer-motion";
import { burstParticles, playSound, unlockAchievement } from "@/interaction";
import { useReducedMotionContext } from "@/components/layout/Providers";

interface MoonProps {
  className?: string;
}

/** Five gentle taps turn the moon from a decorative orb into an early secret. */
export function Moon({ className }: MoonProps) {
  const [visits, setVisits] = useState(0);
  const reducedMotion = useReducedMotionContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = visits + 1;
    setVisits(next);
    burstParticles({ x: event.clientX, y: event.clientY, kind: "sparkle", count: 10 });
    playSound("sparkle");
    if (next === 1) unlockAchievement("first-spark");
    if (next === 5) unlockAchievement("moon-whisper");
  };

  return (
    <motion.button
      type="button"
      className={`cursor-interactive relative flex h-28 w-28 items-center justify-center rounded-full bg-moonlight-gold/90 text-ink-navy shadow-[0_0_55px_rgba(244,200,104,0.42)] sm:h-36 sm:w-36 ${className ?? ""}`}
      aria-label={visits >= 5 ? "The moon is smiling at you" : "Tap the moon"}
      onClick={handleClick}
      whileHover={reducedMotion ? undefined : { scale: 1.05, rotate: 3 }}
      whileTap={{ scale: 0.94 }}
      animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      data-no-heart-trail
    >
      <MoonStar className="h-12 w-12 sm:h-16 sm:w-16" strokeWidth={1.25} aria-hidden />
      {visits > 0 && (
        <motion.span
          className="absolute -bottom-8 whitespace-nowrap font-accent text-xl text-moonlight-gold"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {visits >= 5 ? "A secret for you" : `${5 - visits} more little taps`}
        </motion.span>
      )}
    </motion.button>
  );
}
