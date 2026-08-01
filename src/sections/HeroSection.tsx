import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Display, Body, Script } from "@/components/ui";
import { CollectibleHeart, Moon, TeddyBear } from "@/components/interactive";
import { SectionShell } from "@/components/layout";
import { burstParticles, playSound } from "@/interaction";

export function HeroSection() {
  const begin = (event: React.MouseEvent<HTMLButtonElement>) => {
    burstParticles({ x: event.clientX, y: event.clientY, kind: "confetti", count: 18 });
    playSound("success");
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SectionShell id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <CollectibleHeart id="hero-heart" className="absolute left-[10%] top-[29%]" label="A shy little heart near the stars" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Script>for the one who makes every day warmer</Script>
          </motion.div>
          <Display className="mt-5 text-5xl leading-[0.94] sm:text-6xl md:text-7xl">
            Happy Birthday,<span className="block text-moonlight-gold">beautiful.</span>
          </Display>
          <Body className="mx-auto mt-6 max-w-xl text-paper-cream/75 lg:mx-0">
            Today is not just another day. It is a small celebration of your light, your laughter, and every wonderful way you make the world brighter.
          </Body>
          <div className="mt-8 flex justify-center lg:justify-start">
            <Button size="lg" onClick={begin} data-no-heart-trail>Begin our little story <ArrowDown className="h-4 w-4" aria-hidden /></Button>
          </div>
        </div>
        <div className="relative mx-auto flex min-h-64 w-full max-w-sm items-center justify-center sm:min-h-80">
          <div className="absolute inset-6 rounded-full bg-moonlight-gold/10 blur-3xl" aria-hidden />
          <Moon className="relative z-10" />
          <TeddyBear className="absolute bottom-0 right-1/4 z-10" />
        </div>
      </div>
    </SectionShell>
  );
}
