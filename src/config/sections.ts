export const sections = [
  { id: "hero", label: "A little beginning" },
  { id: "gallery", label: "The star of the story" },
  { id: "reasons", label: "Reasons to smile" },
  { id: "letter", label: "A letter for you" },
  { id: "timeline", label: "Pages ahead" },
  { id: "gift", label: "One more surprise" },
  { id: "ending", label: "Always" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const sectionIds = sections.map((section) => section.id) as SectionId[];
