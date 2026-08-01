import { useState } from "react";
import { motion } from "framer-motion";
import { Heading, Body, Script } from "@/components/ui";
import { CollectibleHeart, GiftBox, TeddyBear, WishJar } from "@/components/interactive";
import { SectionShell } from "@/components/layout";
import { burstParticles, playSound } from "@/interaction";

export function GiftSection() {
  const [catFound, setCatFound] = useState(false);

  return (
    <SectionShell id="gift" className="relative overflow-hidden">
      <CollectibleHeart id="gift-heart" className="absolute right-[11%] top-24" label="A heart hiding behind the present" />
      <div className="mx-auto max-w-5xl text-center">
        <Script>there is always one more surprise</Script>
        <Heading className="mt-3 text-4xl sm:text-5xl">Open when you are ready</Heading>
        <Body className="mx-auto mt-4 max-w-xl text-paper-cream/70">The gift needs three curious little taps. The jar holds a wish whenever you need one.</Body>
        <div className="mt-12 grid items-center gap-10 md:grid-cols-3">
          <div className="order-2 md:order-1"><WishJar /></div>
          <div className="order-1 flex justify-center md:order-2"><GiftBox /></div>
          <div className="order-3 flex flex-col items-center gap-8"><TeddyBear /><motion.button type="button" className="cursor-interactive text-3xl" animate={{ x: catFound ? 0 : [-3, 3, -3] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} onClick={(event) => { setCatFound(true); burstParticles({ x: event.clientX, y: event.clientY, kind: "sparkle", count: 8 }); playSound("pop"); }} aria-label="Find the tiny cat" data-no-heart-trail>{catFound ? "🐱 Meow! Happy birthday!" : "🐱"}</motion.button></div>
        </div>
      </div>
    </SectionShell>
  );
}
