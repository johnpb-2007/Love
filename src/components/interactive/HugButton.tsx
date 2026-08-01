import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { burstParticles, playSound, unlockAchievement } from "@/interaction";

export function HugButton() {
  const [hugged, setHugged] = useState(false);

  const hug = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHugged(true);
    unlockAchievement("hug-received");
    burstParticles({ x: event.clientX, y: event.clientY, kind: "heart", count: 28 });
    playSound("success");
  };

  return (
    <div className="text-center">
      <Button size="lg" onClick={hug} className="min-w-40" data-no-heart-trail>
        <Heart className="h-5 w-5 fill-current" aria-hidden /> Hug me
      </Button>
      {hugged && (
        <motion.p
          className="mt-5 font-accent text-3xl text-sakura-blush"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
        >
          Hug received. I am keeping it forever.
        </motion.p>
      )}
    </div>
  );
}
