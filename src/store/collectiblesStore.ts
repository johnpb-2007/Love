import { create } from "zustand";

export const HEART_TOTAL = 10;

interface CollectiblesState {
  collectedHeartIds: string[];
  collectHeart: (id: string) => boolean;
}

export const useCollectiblesStore = create<CollectiblesState>((set, get) => ({
  collectedHeartIds: [],
  collectHeart: (id) => {
    if (get().collectedHeartIds.includes(id)) return false;
    set((state) => ({ collectedHeartIds: [...state.collectedHeartIds, id] }));
    return true;
  },
}));
