import { Heading, Body, Script } from "@/components/ui";
import { Butterflies, CollectibleHeart, PhotoCard } from "@/components/interactive";
import { SectionShell } from "@/components/layout";
import { galleryMemories } from "./content";

export function GallerySection() {
  return (
    <SectionShell id="gallery" className="relative overflow-hidden">
      <Butterflies count={3} />
      <CollectibleHeart id="gallery-heart" className="absolute right-[10%] top-24 z-20" label="A heart hiding beside the gallery" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Script>the star of every scene</Script>
          <Heading className="mt-3 text-4xl sm:text-5xl">A few favourite moments</Heading>
          <Body className="mt-4 text-paper-cream/70">Tap a memory to make it bigger. These cards are ready for the photos that tell your story best.</Body>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {galleryMemories.map((memory, index) => <PhotoCard key={memory.caption} {...memory} index={index} />)}
        </div>
      </div>
    </SectionShell>
  );
}
