import { useEffect, useState } from "react";

/** A single shared answer for components that need a hover and touch path. */
export function useFinePointer(): boolean {
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setIsFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isFinePointer;
}
