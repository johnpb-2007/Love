import { useEffect } from "react";
import { Howl, Howler } from "howler";
import { Music2, Volume2, VolumeX } from "lucide-react";
import { useAudioStore } from "@/store";
import type { SoundCue } from "@/types/interaction";
import { interactionManager, playSound } from "./InteractionManager";

const sounds = new Map<SoundCue, Howl>();
let music: Howl | null = null;
let audioContext: AudioContext | null = null;

/** Registers optional real audio assets. The experience remains functional
 * without files, which keeps the current Phase 3 archive immediately runnable. */
export function registerSound(cue: SoundCue, source: string) {
  sounds.get(cue)?.unload();
  sounds.set(cue, new Howl({ src: [source], preload: true, volume: 0.55 }));
}

export function registerMusic(source: string) {
  music?.unload();
  music = new Howl({ src: [source], loop: true, preload: true, volume: 0.28 });
}

/** Tiny synthesized cues give the empty-asset starter a gentle response.
 * Registered Howler files take priority as soon as real audio is added. */
function playFallbackCue(cue: SoundCue) {
  const AudioContextConstructor = window.AudioContext;
  if (!AudioContextConstructor) return;
  audioContext ??= new AudioContextConstructor();
  const context = audioContext;
  const frequencies: Record<SoundCue, number> = {
    sparkle: 880,
    pop: 440,
    success: 660,
    chime: 740,
  };
  const start = () => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = cue === "pop" ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(frequencies[cue], now);
    oscillator.frequency.exponentialRampToValueAtTime(frequencies[cue] * 1.18, now + 0.12);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.22);
  };
  if (context.state === "suspended") {
    void context.resume().then(start).catch(() => undefined);
  } else {
    start();
  }
}

export function AudioManager() {
  const muted = useAudioStore((state) => state.muted);
  const musicPlaying = useAudioStore((state) => state.musicPlaying);

  useEffect(() => {
    Howler.mute(muted);
  }, [muted]);

  useEffect(() => {
    if (!music) return;
    if (musicPlaying && !music.playing()) music.play();
    if (!musicPlaying && music.playing()) music.pause();
  }, [musicPlaying]);

  useEffect(() => {
    return interactionManager.subscribe((event) => {
      if (event.type !== "audio:play" || muted) return;
      const sound = sounds.get(event.payload.cue);
      if (sound) sound.play();
      else playFallbackCue(event.payload.cue);
    });
  }, [muted]);

  return null;
}

export function MusicToggle() {
  const muted = useAudioStore((state) => state.muted);
  const musicPlaying = useAudioStore((state) => state.musicPlaying);
  const toggleMuted = useAudioStore((state) => state.toggleMuted);
  const toggleMusic = useAudioStore((state) => state.toggleMusic);
  const musicAvailable = Boolean(music);

  const handleToggle = () => {
    toggleMusic();
    playSound("chime");
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1 rounded-full border border-paper-cream/10 bg-ink-navy/60 p-1.5 backdrop-blur-md sm:bottom-6 sm:right-6">
      {musicAvailable && (
        <button
          type="button"
          className="cursor-interactive flex h-8 w-8 items-center justify-center rounded-full text-paper-cream transition-colors hover:bg-paper-cream/10"
          onClick={handleToggle}
          aria-label={musicPlaying ? "Pause background music" : "Play background music"}
          aria-pressed={musicPlaying}
          data-no-heart-trail
        >
          <Music2 className={`h-4 w-4 ${musicPlaying ? "animate-pulse text-moonlight-gold" : ""}`} aria-hidden />
        </button>
      )}
      <button
        type="button"
        className="cursor-interactive flex h-8 w-8 items-center justify-center rounded-full text-paper-cream transition-colors hover:bg-paper-cream/10"
        onClick={toggleMuted}
        aria-label={muted ? "Unmute sounds" : "Mute sounds"}
        aria-pressed={muted}
        data-no-heart-trail
      >
        {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
      </button>
    </div>
  );
}
