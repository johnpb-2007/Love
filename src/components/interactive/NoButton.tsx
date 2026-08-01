import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { randomBetween } from "@/lib/math";
import { burstParticles, playSound } from "@/interaction";
import { useFinePointer } from "@/hooks/usePointerType";

interface NoButtonProps {
  onYes?: () => void;
}

/** The dodge is triggered by hover on desktops and taps on phones, so the
 * joke never depends on a hover-only affordance. */
export function NoButton({ onYes }: NoButtonProps) {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const finePointer = useFinePointer();
  const caught = attempts >= 7;

  const dodge = (event?: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (caught) return;
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setPosition({ x: randomBetween(-92, 92), y: randomBetween(-28, 28) });
    if (event) playSound("pop");
  };

  const chooseYes = (event: React.MouseEvent<HTMLButtonElement>) => {
    burstParticles({ x: event.clientX, y: event.clientY, kind: "heart", count: 14 });
    playSound("success");
    onYes?.();
  };

  return (
    <div className="relative mx-auto flex min-h-24 max-w-sm items-center justify-center gap-4">
      <Button type="button" onClick={chooseYes} data-no-heart-trail>
        Yes, obviously
      </Button>
      <motion.button
        type="button"
        className="cursor-interactive rounded-2xl border border-paper-cream/20 bg-paper-cream/5 px-5 py-3 font-body text-sm font-semibold text-paper-cream/80 transition-colors hover:bg-paper-cream/10"
        animate={position}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        onPointerEnter={finePointer ? dodge : undefined}
        onClick={(event) => (finePointer ? dodge(event) : dodge(event))}
        aria-label={caught ? "Okay, maybe I am" : "No"}
        data-no-heart-trail
      >
        {caught ? "Okay, maybe I am" : attempts >= 5 ? "Nice try" : "No"}
      </motion.button>
      {attempts > 0 && !caught && (
        <span className="absolute -bottom-1 font-accent text-lg text-sakura-blush">
          {7 - attempts} tiny escapes left
        </span>
      )}
    </div>
  );
}
