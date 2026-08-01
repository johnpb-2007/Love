import type { ParticleBurst, SoundCue } from "@/types/interaction";

type InteractionEvent =
  | { type: "particle:burst"; payload: ParticleBurst }
  | { type: "audio:play"; payload: { cue: SoundCue } };

type Listener = (event: InteractionEvent) => void;

/**
 * A tiny typed event channel for one-way visual/audio effects. Components
 * keep their own state and only publish an intent here; the global overlay
 * decides how that intent is rendered. It prevents competing fixed layers.
 */
class InteractionManager {
  private listeners = new Set<Listener>();

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(event: InteractionEvent) {
    this.listeners.forEach((listener) => listener(event));
  }
}

export const interactionManager = new InteractionManager();

export function burstParticles(payload: ParticleBurst) {
  interactionManager.emit({ type: "particle:burst", payload });
}

export function playSound(cue: SoundCue) {
  interactionManager.emit({ type: "audio:play", payload: { cue } });
}
