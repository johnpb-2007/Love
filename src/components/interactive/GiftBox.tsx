import { useState } from "react";
import confetti from "canvas-confetti";
import { Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { burstParticles, playSound, unlockAchievement } from "@/interaction";
import { confettiPalette } from "@/config/theme";
import { useReducedMotionContext } from "@/components/layout/Providers";

interface GiftBoxProps {
  onOpen?: () => void;
}

/** Three deliberately paced clicks create anticipation before the reward. */
export function GiftBox({ onOpen }: GiftBoxProps) {
  const [clicks, setClicks] = useState(0);
  const reducedMotion = useReducedMotionContext();
  const opened = clicks >= 3;

  const openGift = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (opened) return;
    const next = clicks + 1;
    setClicks(next);
    burstParticles({ x: event.clientX, y: event.clientY, kind: next === 3 ? "confetti" : "sparkle", count: next === 3 ? 22 : 7 });
    playSound(next === 3 ? "success" : "pop");

    if (next === 3) {
      unlockAchievement("gift-opened");
      if (!reducedMotion) {
        confetti({
          particleCount: 95,
          spread: 62,
          origin: { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight },
          colors: confettiPalette,
          disableForReducedMotion: true,
        });
      }
      onOpen?.();
    }
  };

  const prompt = opened ? "For you, always" : clicks === 0 ? "A little surprise" : clicks === 1 ? "Not yet..." : "Almost there...";

  return (
    <div className="text-center">
      <motion.button
        type="button"
        className="cursor-interactive relative grid h-40 w-40 place-items-center rounded-[1.7rem] border border-sakura-blush/45 bg-lantern-rose text-paper-cream shadow-glow-rose sm:h-48 sm:w-48"
        aria-label={opened ? "Gift opened" : `${3 - clicks} clicks left to open gift`}
        onClick={openGift}
        animate={opened ? { scale: [1, 1.08, 1], rotate: [0, -3, 3, 0] } : { rotate: [0, -1.5, 1.5, 0] }}
        transition={{ duration: opened ? 0.7 : 2.8, repeat: opened ? 1 : Infinity, ease: "easeInOut" }}
        whileHover={opened ? undefined : { scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        data-no-heart-trail
      >
        <span className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 bg-moonlight-gold/90" />
        <span className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-moonlight-gold/90" />
        <span className="relative z-10 grid h-20 w-20 place-items-center rounded-full bg-ink-navy/15 backdrop-blur-sm">
          {opened ? <Sparkles className="h-10 w-10" aria-hidden /> : <Gift className="h-10 w-10" aria-hidden />}
        </span>
      </motion.button>
      <motion.p
        key={prompt}
        className="mt-5 font-accent text-3xl text-sakura-blush"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {prompt}
      </motion.p>
    </div>
  );
}
