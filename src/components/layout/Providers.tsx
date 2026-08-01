import { createContext, useContext, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ReducedMotionContext = createContext(false);

export function useReducedMotionContext() {
  return useContext(ReducedMotionContext);
}

/** App-wide "theme" context. Just motion preference for now -- this is the
 * seam later phases hang app-wide concerns off (e.g. Phase 7's audio
 * on/off) instead of prop-drilling or re-detecting matchMedia everywhere. */
export function Providers({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <ReducedMotionContext.Provider value={prefersReducedMotion}>
      {children}
    </ReducedMotionContext.Provider>
  );
}
