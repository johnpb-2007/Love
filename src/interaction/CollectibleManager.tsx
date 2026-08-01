import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { HEART_TOTAL, useCollectiblesStore, useProgressStore } from "@/store";
import { burstParticles, playSound } from "./InteractionManager";
import { unlockAchievement } from "./AchievementManager";

interface CollectHeartOptions {
  x?: number;
  y?: number;
}

/** Coordinates the collection side effects without making a hidden heart
 * know about toast, particle, or progress implementations. */
export function collectHeart(id: string, options: CollectHeartOptions = {}): boolean {
  const collected = useCollectiblesStore.getState().collectHeart(id);
  if (!collected) return false;

  const { x = window.innerWidth / 2, y = window.innerHeight / 2 } = options;
  burstParticles({ x, y, kind: "heart", count: 11 });
  playSound("sparkle");

  if (useCollectiblesStore.getState().collectedHeartIds.length >= HEART_TOTAL) {
    useProgressStore.getState().unlockSecretEnding();
    unlockAchievement("heart-collector");
    unlockAchievement("birthday-champion");
  }

  return true;
}

export function CollectibleCounter() {
  const total = useCollectiblesStore((state) => state.collectedHeartIds.length);

  return (
    <motion.div
      className="pointer-events-none fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-sakura-blush/25 bg-ink-navy/60 px-3 py-2 text-xs font-semibold text-paper-cream/85 backdrop-blur-md sm:bottom-6 sm:left-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      aria-label={`${total} of ${HEART_TOTAL} hidden hearts collected`}
    >
      <Heart className="h-3.5 w-3.5 fill-sakura-blush text-sakura-blush" aria-hidden />
      <span>
        {total}/{HEART_TOTAL}
      </span>
    </motion.div>
  );
}
