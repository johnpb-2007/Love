import { useState } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { burstParticles, playSound } from "@/interaction";
import { pickRandom } from "@/lib/random";

const wishes = [
  "May every room you enter feel a little brighter because you are in it.",
  "I hope the year ahead gives you soft mornings and brave, beautiful dreams.",
  "May you always remember how deeply you are loved.",
  "Here is to more laughing until it hurts, more little adventures, and more us.",
  "I hope your happiest surprises are still waiting for you.",
] as const;

export function WishJar() {
  const [wish, setWish] = useState<string | null>(null);

  const releaseWish = (event: React.MouseEvent<HTMLButtonElement>) => {
    setWish(pickRandom(wishes));
    burstParticles({ x: event.clientX, y: event.clientY, kind: "sparkle", count: 12 });
    playSound("chime");
  };

  return (
    <div className="text-center">
      <motion.button
        type="button"
        className="cursor-interactive relative mx-auto grid h-36 w-28 place-items-center rounded-b-[2.4rem] rounded-t-[1.2rem] border border-moonlight-gold/55 bg-moonlight-gold/10 shadow-[inset_0_0_30px_rgba(244,200,104,0.12),0_0_28px_rgba(244,200,104,0.14)]"
        onClick={releaseWish}
        whileHover={{ y: -6, rotate: 2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 210, damping: 16 }}
        aria-label="Release a birthday wish"
        data-no-heart-trail
      >
        <span className="absolute -top-3 h-5 w-16 rounded-full border border-moonlight-gold/50 bg-twilight-plum" />
        <Sparkles className="h-9 w-9 text-moonlight-gold" aria-hidden />
      </motion.button>
      <p className="mt-3 font-accent text-2xl text-sakura-blush">open a wish</p>
      {wish && (
        <motion.p
          className="mx-auto mt-4 max-w-sm rounded-2xl border border-paper-cream/10 bg-paper-cream/5 p-4 text-sm leading-relaxed text-paper-cream/85"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {wish}
        </motion.p>
      )}
    </div>
  );
}
