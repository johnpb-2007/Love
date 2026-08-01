import { create } from "zustand";
import type { AchievementId } from "@/types/interaction";

interface AchievementsState {
  unlockedIds: AchievementId[];
  toastQueue: AchievementId[];
  unlock: (id: AchievementId) => boolean;
  dismissNextToast: () => void;
}

export const useAchievementsStore = create<AchievementsState>((set, get) => ({
  unlockedIds: [],
  toastQueue: [],
  unlock: (id) => {
    if (get().unlockedIds.includes(id)) return false;

    set((state) => ({
      unlockedIds: [...state.unlockedIds, id],
      toastQueue: [...state.toastQueue, id],
    }));
    return true;
  },
  dismissNextToast: () => {
    set((state) => ({ toastQueue: state.toastQueue.slice(1) }));
  },
}));
