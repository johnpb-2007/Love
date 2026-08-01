import { Heading, Body, Script } from "@/components/ui";
import { CollectibleHeart, Storybook } from "@/components/interactive";
import { SectionShell } from "@/components/layout";
import { timelinePages } from "./content";

export function TimelineSection() {
  return (
    <SectionShell id="timeline" className="relative overflow-hidden">
      <CollectibleHeart id="timeline-heart" className="absolute left-[9%] top-32" label="A heart tucked between pages" />
      <div className="mx-auto max-w-5xl text-center">
        <Script>the best chapters are still ahead</Script>
        <Heading className="mt-3 text-4xl sm:text-5xl">Pages waiting for us</Heading>
        <Body className="mx-auto mt-4 max-w-xl text-paper-cream/70">Turn every page to complete this little storybook.</Body>
        <div className="mt-12"><Storybook pages={timelinePages} /></div>
      </div>
    </SectionShell>
  );
}
