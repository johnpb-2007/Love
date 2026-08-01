import { create } from "zustand";
import type { SectionId } from "@/config/sections";

interface ProgressState {
  activeSection: SectionId | null;
  visitedSections: SectionId[];
  secretEndingUnlocked: boolean;
  setActiveSection: (id: SectionId) => void;
  unlockSecretEnding: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  activeSection: null,
  visitedSections: [],
  secretEndingUnlocked: false,
  setActiveSection: (id) =>
    set((state) => ({
      activeSection: id,
      visitedSections: state.visitedSections.includes(id)
        ? state.visitedSections
        : [...state.visitedSections, id],
    })),
  unlockSecretEnding: () => set({ secretEndingUnlocked: true }),
}));
