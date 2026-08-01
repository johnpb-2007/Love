import { useState } from "react";
import { motion } from "framer-motion";
import { Heading, Body, Script } from "@/components/ui";
import { CollectibleHeart, NoButton } from "@/components/interactive";
import { SectionShell } from "@/components/layout";
import { burstParticles, playSound } from "@/interaction";
import { reasons } from "./content";

function ReasonCard({ title, description, index }: { title: string; description: string; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.button type="button" className="cursor-interactive relative min-h-48 rounded-3xl border border-paper-cream/10 bg-paper-cream/[0.045] p-6 text-left shadow-lift-paper backdrop-blur-sm" onClick={(event) => { setFlipped((value) => !value); burstParticles({ x: event.clientX, y: event.clientY, kind: "sparkle", count: 5 }); playSound("pop"); }} whileHover={{ y: -6, borderColor: "rgba(244, 200, 104, 0.45)" }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 180, damping: 18 }} aria-pressed={flipped} data-no-heart-trail>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ type: "spring", stiffness: 190, damping: 20 }} style={{ transformStyle: "preserve-3d" }} className="relative min-h-36">
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          <span className="font-accent text-2xl text-sakura-blush/85">0{index + 1}</span>
          <h3 className="mt-4 font-display text-3xl font-semibold text-paper-cream">{title}</h3>
          <p className="mt-4 text-sm text-paper-cream/55">tap to turn the card</p>
        </div>
        <div className="absolute inset-0 flex items-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}><p className="font-body leading-relaxed text-paper-cream/82">{description}</p></div>
      </motion.div>
    </motion.button>
  );
}

export function ReasonsSection() {
  return (
    <SectionShell id="reasons" className="relative overflow-hidden">
      <CollectibleHeart id="reasons-heart-one" className="absolute left-[7%] top-28" label="A heart tucked among the reasons" />
      <CollectibleHeart id="reasons-heart-two" className="absolute right-[8%] top-1/2" label="A heart waiting by the cards" />
      <CollectibleHeart id="reasons-heart-three" className="absolute bottom-24 left-[18%]" label="One more hidden heart" />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center"><Script>there are far more than six</Script><Heading className="mt-3 text-4xl sm:text-5xl">Reasons I adore you</Heading><Body className="mt-4 text-paper-cream/70">Each card has a little more to say. Turn one over when you are ready.</Body></div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{reasons.map(([title, description], index) => <ReasonCard key={title} title={title} description={description} index={index} />)}</div>
        <div className="glass-panel mx-auto mt-12 max-w-xl rounded-3xl p-6 text-center sm:p-8"><p className="font-display text-2xl font-semibold text-paper-cream">Are you the cutest person ever?</p><NoButton /></div>
      </div>
    </SectionShell>
  );
}
