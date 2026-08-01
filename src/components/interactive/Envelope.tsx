import { useState } from "react";
import { motion } from "framer-motion";
import { burstParticles, playSound, unlockAchievement } from "@/interaction";

interface EnvelopeProps {
  children: React.ReactNode;
  className?: string;
}

/** Opens with an upward drag but keeps a click/keyboard path for all visitors. */
export function Envelope({ children, className }: EnvelopeProps) {
  const [open, setOpen] = useState(false);

  const reveal = () => {
    if (!open) {
      setOpen(true);
      unlockAchievement("letter-reader");
      playSound("chime");
    }
  };

  return (
    <motion.div
      className={`relative mx-auto min-h-[23rem] max-w-2xl cursor-grab select-none rounded-3xl border border-moonlight-gold/25 bg-paper-cream p-5 text-ink-navy shadow-lift-paper active:cursor-grabbing sm:min-h-[25rem] sm:p-8 ${className ?? ""}`}
      drag={open ? false : "y"}
      dragConstraints={{ top: -150, bottom: 0 }}
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        if (info.offset.y < -38) reveal();
      }}
      role="button"
      tabIndex={0}
      onClick={reveal}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") reveal();
      }}
      aria-label={open ? "Birthday letter is open" : "Drag upward or tap to open birthday letter"}
    >
      {!open && (
        <motion.div
          className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center rounded-3xl bg-[linear-gradient(135deg,#fff6ea_0%,#f4e0cc_100%)] p-8 text-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-lantern-rose text-2xl text-paper-cream shadow-glow-rose">
            ♡
          </span>
          <p className="font-display text-3xl font-semibold">For the birthday girl</p>
          <p className="mt-3 font-accent text-2xl text-twilight-plum/75">drag up or tap the seal</p>
        </motion.div>
      )}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 28, rotateX: -12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          onClick={(event) => {
            burstParticles({ x: event.clientX, y: event.clientY, kind: "petal", count: 5 });
          }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
