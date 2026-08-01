import { EndingSection } from "./EndingSection";
import { GallerySection } from "./GallerySection";
import { GiftSection } from "./GiftSection";
import { HeroSection } from "./HeroSection";
import { LetterSection } from "./LetterSection";
import { ReasonsSection } from "./ReasonsSection";
import { TimelineSection } from "./TimelineSection";

/** The narrative owns content order; App remains a shell and global chrome. */
export function Story() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <GallerySection />
      <ReasonsSection />
      <LetterSection />
      <TimelineSection />
      <GiftSection />
      <EndingSection />
    </main>
  );
}
