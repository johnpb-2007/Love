import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { achievements, type AchievementId } from "@/types/interaction";
import { useAchievementsStore } from "@/store";
import { playSound } from "./InteractionManager";

/** Unlocks an achievement once. The toast is rendered by the global layer. */
export function unlockAchievement(id: AchievementId): boolean {
  const didUnlock = useAchievementsStore.getState().unlock(id);
  if (didUnlock) playSound("success");
  return didUnlock;
}

export function AchievementManager() {
  const nextToast = useAchievementsStore((state) => state.toastQueue[0]);
  const dismissNextToast = useAchievementsStore((state) => state.dismissNextToast);

  useEffect(() => {
    if (!nextToast) return;
    const timeout = window.setTimeout(dismissNextToast, 4300);
    return () => window.clearTimeout(timeout);
  }, [dismissNextToast, nextToast]);

  const achievement = nextToast ? achievements[nextToast] : null;

  return (
    <div
      className="pointer-events-none fixed inset-x-4 top-20 z-[90] flex justify-center sm:inset-x-auto sm:right-6 sm:top-20 sm:justify-end"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        {achievement && (
          <motion.article
            key={achievement.id}
            className="pointer-events-auto glass-panel flex w-full max-w-sm items-center gap-3 rounded-3xl p-3 pr-2 shadow-glow-gold sm:w-80"
            initial={{ opacity: 0, y: -14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-moonlight-gold/15 text-xl text-moonlight-gold">
              {achievement.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-moonlight-gold">
                <Trophy className="h-3.5 w-3.5" aria-hidden /> Achievement unlocked
              </p>
              <p className="mt-0.5 font-display text-xl font-semibold text-paper-cream">
                {achievement.title}
              </p>
              <p className="text-xs leading-relaxed text-paper-cream/65">{achievement.description}</p>
            </div>
            <button
              type="button"
              className="cursor-interactive self-start rounded-full p-1 text-paper-cream/60 transition-colors hover:bg-paper-cream/10 hover:text-paper-cream"
              onClick={dismissNextToast}
              aria-label="Dismiss achievement"
              data-no-heart-trail
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
