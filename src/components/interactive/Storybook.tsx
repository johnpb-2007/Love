import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { playSound, unlockAchievement } from "@/interaction";

export interface StoryPage {
  eyebrow: string;
  title: string;
  body: string;
  note?: string;
}

interface StorybookProps {
  pages: StoryPage[];
}

/** A compact click-first page turner; keyboard buttons make the same story
 * usable on touch devices and without drag gestures. */
export function Storybook({ pages }: StorybookProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const page = pages[pageIndex];

  const turnTo = (nextIndex: number) => {
    const bounded = Math.min(Math.max(nextIndex, 0), pages.length - 1);
    if (bounded === pageIndex) return;
    setPageIndex(bounded);
    playSound("chime");
    if (bounded === pages.length - 1) unlockAchievement("storybook-complete");
  };

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] bg-paper-cream p-3 shadow-lift-paper sm:p-5">
      <div className="relative min-h-[19rem] overflow-hidden rounded-[1.45rem] border border-ink-navy/10 bg-[linear-gradient(130deg,#fffaf1,#f3dfc4)] p-7 text-ink-navy sm:min-h-[23rem] sm:p-11">
        <AnimatePresence mode="wait">
          <motion.article
            key={pageIndex}
            initial={{ opacity: 0, rotateY: -12, x: 24 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0, rotateY: 12, x: -24 }}
            transition={{ type: "spring", stiffness: 190, damping: 22 }}
            className="max-w-xl"
          >
            <p className="font-accent text-2xl text-lantern-rose">{page.eyebrow}</p>
            <h3 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">{page.title}</h3>
            <p className="mt-5 max-w-lg font-body leading-8 text-ink-navy/75">{page.body}</p>
            {page.note && <p className="mt-8 font-accent text-2xl text-twilight-plum/75">{page.note}</p>}
          </motion.article>
        </AnimatePresence>
        <p className="absolute bottom-5 right-6 text-xs font-semibold tracking-[0.18em] text-ink-navy/35">
          {String(pageIndex + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
        </p>
      </div>
      <div className="flex items-center justify-between px-2 pt-4">
        <button
          type="button"
          className="cursor-interactive inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink-navy/75 transition-colors hover:bg-ink-navy/5 disabled:opacity-35"
          onClick={() => turnTo(pageIndex - 1)}
          disabled={pageIndex === 0}
          data-no-heart-trail
        >
          <ChevronLeft className="h-4 w-4" aria-hidden /> Previous
        </button>
        <button
          type="button"
          className="cursor-interactive inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink-navy/75 transition-colors hover:bg-ink-navy/5 disabled:opacity-35"
          onClick={() => turnTo(pageIndex + 1)}
          disabled={pageIndex === pages.length - 1}
          data-no-heart-trail
        >
          Next <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
