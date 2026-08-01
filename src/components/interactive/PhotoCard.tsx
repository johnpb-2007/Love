import { useEffect, useState } from "react";
import { Expand, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { burstParticles, playSound } from "@/interaction";
import { useFinePointer } from "@/hooks/usePointerType";

interface PhotoCardProps {
  caption: string;
  note: string;
  imageUrl?: string;
  index: number;
  className?: string;
}

/** A gallery card can render a real image when supplied, while its elegant
 * fallback keeps the project presentable until private photos are added. */
export function PhotoCard({ caption, note, imageUrl, index, className }: PhotoCardProps) {
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const finePointer = useFinePointer();

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const show = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    burstParticles({ x: event.clientX, y: event.clientY, kind: "sparkle", count: 6 });
    playSound("sparkle");
  };

  return (
    <>
      <motion.button
        type="button"
        className={cn(
          "group cursor-interactive relative isolate min-h-72 overflow-hidden rounded-3xl border border-paper-cream/10 bg-twilight-plum/45 p-5 text-left shadow-lift-paper sm:min-h-80",
          className,
        )}
        style={{ transformPerspective: 900 }}
        animate={tilt}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        whileHover={{ y: -7 }}
        onPointerMove={(event) => {
          if (!finePointer) return;
          const rect = event.currentTarget.getBoundingClientRect();
          setTilt({
            rotateX: ((event.clientY - rect.top) / rect.height - 0.5) * -5,
            rotateY: ((event.clientX - rect.left) / rect.width - 0.5) * 5,
          });
        }}
        onPointerLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
        onClick={show}
        aria-label={`Open ${caption}`}
        data-no-heart-trail
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={caption}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(255,182,213,0.34),transparent_33%),linear-gradient(145deg,rgba(244,200,104,0.2),rgba(44,27,71,0.2)_44%,rgba(255,111,145,0.16))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-navy/90 via-ink-navy/10 to-transparent" />
        <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-paper-cream/15 bg-ink-navy/25 text-paper-cream/80 opacity-100 backdrop-blur-md transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <Expand className="h-4 w-4" aria-hidden />
        </span>
        <div className="relative mt-auto flex min-h-60 flex-col justify-end">
          <span className="font-accent text-2xl text-sakura-blush/85">memory {String(index + 1).padStart(2, "0")}</span>
          <span className="mt-1 font-display text-2xl font-semibold text-paper-cream">{caption}</span>
          <span className="mt-1 text-sm leading-relaxed text-paper-cream/72">{note}</span>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-navy/80 p-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={caption}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.article
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-paper-cream/15 bg-twilight-plum/85 shadow-lift-paper"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 210, damping: 22 }}
            >
              <button
                type="button"
                className="cursor-interactive absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink-navy/65 text-paper-cream backdrop-blur transition-colors hover:bg-ink-navy"
                onClick={() => setOpen(false)}
                aria-label="Close memory"
                data-no-heart-trail
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
              <div className="min-h-64 bg-[radial-gradient(circle_at_30%_20%,rgba(255,182,213,0.4),transparent_34%),linear-gradient(145deg,rgba(244,200,104,0.24),rgba(20,16,43,0.8))] sm:min-h-80">
                {imageUrl && <img src={imageUrl} alt={caption} className="h-full w-full object-cover" />}
              </div>
              <div className="p-6 sm:p-8">
                <p className="font-accent text-2xl text-sakura-blush">a favorite moment</p>
                <h3 className="mt-1 font-display text-3xl font-semibold text-paper-cream">{caption}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-paper-cream/75">{note}</p>
                {!imageUrl && (
                  <p className="mt-5 rounded-2xl border border-sakura-blush/20 bg-sakura-blush/5 p-3 text-sm text-sakura-blush/90">
                    Add a private photo URL in <code>src/sections/content.ts</code> when you are ready to personalise this memory.
                  </p>
                )}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
