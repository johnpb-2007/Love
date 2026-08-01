import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { springs } from "@/lib/motion";
import { sections, type SectionId } from "@/config/sections";
import { useProgressStore } from "@/store";

interface SectionDotsProps {
  sectionIds: string[];
}

/** Desktop-only side dots showing which of the 7 sections is active, and
 * letting the visitor jump directly -- part of the "scrolling system"
 * (Phase 3) so orientation doesn't rely on scroll position alone. */
export function SectionDots({ sectionIds }: SectionDotsProps) {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const setActiveSection = useProgressStore((state) => state.setActiveSection);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const id = visible.target.id;
          setActiveId(id);
          if (sectionIds.includes(id)) setActiveSection(id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds, setActiveSection]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {sectionIds.map((id) => {
        const label = sections.find((section) => section.id === id)?.label ?? id;
        return (
        <a key={id} href={`#${id}`} aria-label={`Go to ${label}`}>
          <motion.span
            className={cn(
              "cursor-interactive block h-2.5 w-2.5 rounded-full border border-paper-cream/40",
              activeId === id ? "bg-moonlight-gold" : "bg-transparent",
            )}
            animate={{ scale: activeId === id ? 1.3 : 1 }}
            transition={springs.gentle}
          />
        </a>
        );
      })}
    </nav>
  );
}
