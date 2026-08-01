import { Feather } from "lucide-react";
import { motion } from "framer-motion";
import { Heading, Body, Script } from "@/components/ui";
import { CollectibleHeart, Envelope } from "@/components/interactive";
import { SectionShell } from "@/components/layout";
import { burstParticles, playSound } from "@/interaction";
import { letterParagraphs } from "./content";

export function LetterSection() {
  return (
    <SectionShell id="letter" className="relative overflow-hidden">
      <CollectibleHeart id="letter-heart" className="absolute right-[9%] top-28" label="A heart folded into the letter" />
      <div className="mx-auto max-w-5xl text-center"><Script>read this one slowly</Script><Heading className="mt-3 text-4xl sm:text-5xl">A letter for you</Heading><Body className="mx-auto mt-4 max-w-xl text-paper-cream/70">Drag the envelope upward, or simply tap its seal.</Body>
        <div className="mt-12"><Envelope><div className="mx-auto max-w-xl text-left"><p className="font-accent text-3xl text-lantern-rose">My dearest,</p>{letterParagraphs.map((paragraph, index) => <p key={index} className="mt-5 font-display text-xl leading-relaxed text-ink-navy/80 sm:text-2xl">{paragraph}</p>)}<motion.button type="button" className="mt-8 inline-flex items-center gap-2 rounded-full px-3 py-2 font-accent text-2xl text-twilight-plum/65 transition-colors hover:bg-twilight-plum/5" onClick={(event) => { burstParticles({ x: event.clientX, y: event.clientY, kind: "petal", count: 9 }); playSound("chime"); }} aria-label="Play a little ink doodle" data-no-heart-trail><Feather className="h-5 w-5" aria-hidden /> a little doodle for you</motion.button></div></Envelope></div>
      </div>
    </SectionShell>
  );
}
