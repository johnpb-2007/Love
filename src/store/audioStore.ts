import { create } from "zustand";

interface AudioState {
  muted: boolean;
  musicPlaying: boolean;
  setMuted: (muted: boolean) => void;
  toggleMuted: () => void;
  toggleMusic: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  muted: false,
  musicPlaying: false,
  setMuted: (muted) => set({ muted }),
  toggleMuted: () => set((state) => ({ muted: !state.muted })),
  toggleMusic: () => set((state) => ({ musicPlaying: !state.musicPlaying })),
}));
