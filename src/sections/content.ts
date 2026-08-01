import type { StoryPage } from "@/components/interactive";

/** Personalise strings and optional image URLs here; section and interaction
 * code stays untouched. Private photos can be placed in public/images. */
export const galleryMemories = [
  {
    caption: "Hehehe my cure kitten..",
    note: "A place for the photo that makes you stop and smile every time.",
    imageUrl: "/images/1.png",
  },
  {
    caption: "A little adventure",
    note: "For the ordinary day that somehow became one of your favourites.",
    imageUrl: "/images/2.png",
  },
  {
    caption: "The laugh I remember",
    note: "The kind that is impossible not to catch from across the room.",
    imageUrl: "/images/3.png",
  },
  {
    caption: "A forever kind of moment",
    note: "One small memory, held close for a very long time.",
    imageUrl: "/images/4.png",
  },
] as const;

export const reasons = [
  ["Your warmth", "You make the people around you feel seen without even trying."],
  ["Your laugh", "It has a way of making every ordinary moment lighter."],
  ["Your courage", "You keep choosing growth, even when the brave thing is hard."],
  ["Your kindness", "It appears in the smallest details, which is where it matters most."],
  ["Your spark", "You bring the kind of energy that makes a room feel more alive."],
  ["Your whole heart", "There is no better place in the world to be than close to it."],
] as const;

export const timelinePages: StoryPage[] = [
  { eyebrow: "Chapter one", title: "More little adventures", body: "More detours that become the best part of the day. More windows down, songs too loud, and reasons to take the long way home.", note: "The fun is always better with you there." },
  { eyebrow: "Chapter two", title: "More soft places to land", body: "The kind of days that do not need to be extraordinary to matter: shared coffee, familiar jokes, and a hand to reach for.", note: "The quiet moments count too." },
  { eyebrow: "Chapter three", title: "More reasons to celebrate you", body: "More birthdays, more wishes, and more chances to remind you of the incredible person you already are.", note: "I am very glad you are here." },
];

export const letterParagraphs = [
  "Happy birthday, my love. Today feels brighter because it is the day the world got you.",
  "I hope you know how much beauty you bring into the lives around you—not only in the big moments, but in every small kindness and every laugh you share.",
  "May this next year meet you with the same care, courage, and joy that you give so freely. I will be here, cheering for every dream and holding close every little moment with you.",
  "Always yours.",
] as const;
