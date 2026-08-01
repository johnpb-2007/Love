import { AnimatePresence, motion } from "framer-motion";
import { Heading, Body, Script } from "@/components/ui";
import { CollectibleHeart, HugButton } from "@/components/interactive";
import { SectionShell } from "@/components/layout";
import { HEART_TOTAL, useCollectiblesStore, useProgressStore } from "@/store";

export function EndingSection() {
  const secretUnlocked = useProgressStore((state) => state.secretEndingUnlocked);
  const hearts = useCollectiblesStore((state) => state.collectedHeartIds.length);
  const remaining = HEART_TOTAL - hearts;
  return (
    <SectionShell id="ending" className="relative flex min-h-[82vh] items-center overflow-hidden">
      <CollectibleHeart id="ending-heart" className="absolute right-[14%] top-[26%]" label="The final hidden heart" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Script>one last thing</Script>
        <Heading className="mt-3 text-5xl sm:text-6xl">I will choose you, always.</Heading>
        <Body className="mx-auto mt-5 max-w-xl text-paper-cream/75">Thank you for being exactly who you are. I hope this birthday is only the beginning of a year that is as wonderful as you deserve.</Body>
        <div className="mt-10"><HugButton /></div>
        <AnimatePresence>
          {secretUnlocked ? <motion.div className="mt-12 rounded-3xl border border-moonlight-gold/35 bg-moonlight-gold/10 p-6 shadow-glow-gold" initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 18 }}><p className="font-accent text-3xl text-moonlight-gold">A secret sunrise</p><p className="mt-2 font-display text-3xl font-semibold text-paper-cream">You found every little piece of my heart.</p><p className="mt-3 text-paper-cream/75">May every lifetime still lead me back to you.</p></motion.div> : <motion.p className="mt-12 text-sm text-paper-cream/45" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>A secret scene is waiting for {remaining} more hidden {remaining === 1 ? "heart" : "hearts"}.</motion.p>}
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}
