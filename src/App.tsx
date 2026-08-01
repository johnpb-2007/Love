import { useState } from "react";
import { Footer, LoadingScreen, Navbar, Providers, SectionDots } from "@/components/layout";
import { sectionIds } from "@/config/sections";
import { InteractionLayer } from "@/interaction";
import { Story } from "@/sections";

/** App only owns global chrome. The story itself is composable in sections/. */
export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <Providers>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <InteractionLayer />
          <Navbar />
          <SectionDots sectionIds={sectionIds} />
          <Story />
          <Footer />
        </>
      )}
    </Providers>
  );
}
