export type AchievementId =
  | "first-spark"
  | "moon-whisper"
  | "butterfly-friend"
  | "heart-collector"
  | "letter-reader"
  | "storybook-complete"
  | "gift-opened"
  | "birthday-champion"
  | "hug-received";

export type ParticleKind = "heart" | "sparkle" | "petal" | "confetti";

export type SoundCue = "sparkle" | "pop" | "success" | "chime";

export interface AchievementDefinition {
  id: AchievementId;
  icon: string;
  title: string;
  description: string;
}

export interface ParticleBurst {
  x: number;
  y: number;
  kind: ParticleKind;
  count?: number;
}

export const achievements: Record<AchievementId, AchievementDefinition> = {
  "first-spark": {
    id: "first-spark",
    icon: "✦",
    title: "First Spark",
    description: "You found a little piece of magic.",
  },
  "moon-whisper": {
    id: "moon-whisper",
    icon: "☾",
    title: "Moon Whisperer",
    description: "The moon has started telling you secrets.",
  },
  "butterfly-friend": {
    id: "butterfly-friend",
    icon: "🦋",
    title: "Butterfly Friend",
    description: "A tiny visitor has decided to stay.",
  },
  "heart-collector": {
    id: "heart-collector",
    icon: "♡",
    title: "Heart Collector",
    description: "Every hidden heart is safely with you now.",
  },
  "letter-reader": {
    id: "letter-reader",
    icon: "✉",
    title: "Read Between the Lines",
    description: "Some feelings are worth unfolding slowly.",
  },
  "storybook-complete": {
    id: "storybook-complete",
    icon: "✦",
    title: "Storybook Complete",
    description: "You turned every page of this little chapter.",
  },
  "gift-opened": {
    id: "gift-opened",
    icon: "✦",
    title: "Birthday Surprise",
    description: "A wish, wrapped just for you.",
  },
  "birthday-champion": {
    id: "birthday-champion",
    icon: "★",
    title: "Birthday Champion",
    description: "You discovered every secret this night had to offer.",
  },
  "hug-received": {
    id: "hug-received",
    icon: "♡",
    title: "Hug Received",
    description: "The warmest kind of ending.",
  },
};
