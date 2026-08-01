import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useCollectiblesStore } from "@/store";
import { collectHeart } from "@/interaction";

interface CollectibleHeartProps {
  id: string;
  className?: string;
  label?: string;
}

/** A hidden heart is deliberately self-contained: its id is all it needs to
 * contribute to the global collection, visual burst, and secret ending. */
export function CollectibleHeart({ id, className, label = "Collect hidden heart" }: CollectibleHeartProps) {
  const collected = useCollectiblesStore((state) => state.collectedHeartIds.includes(id));

  if (collected) return null;

  return (
    <motion.button
      type="button"
      className={cn(
        "cursor-interactive group inline-flex h-9 w-9 items-center justify-center rounded-full text-sakura-blush/65 transition-colors hover:bg-sakura-blush/10 hover:text-sakura-blush focus-visible:text-sakura-blush",
        className,
      )}
      aria-label={label}
      title={label}
      initial={{ opacity: 0.2, scale: 0.8 }}
      animate={{ opacity: [0.2, 0.75, 0.2], scale: [0.8, 1.03, 0.8] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.18 }}
      whileTap={{ scale: 0.82 }}
      onClick={(event) => collectHeart(id, { x: event.clientX, y: event.clientY })}
      data-no-heart-trail
    >
      <Heart className="h-4 w-4 fill-current" aria-hidden />
    </motion.button>
  );
}
