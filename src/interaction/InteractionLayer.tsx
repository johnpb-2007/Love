import { AchievementManager } from "./AchievementManager";
import { AmbientBackground } from "./AmbientBackground";
import { AudioManager, MusicToggle } from "./AudioManager";
import { CollectibleCounter } from "./CollectibleManager";
import { CursorManager } from "./CursorManager";
import { ParticleManager } from "./ParticleManager";

/** Mounted once under Providers: the app's shared visual interaction root. */
export function InteractionLayer() {
  return (
    <>
      <AmbientBackground />
      <AudioManager />
      <ParticleManager />
      <AchievementManager />
      <CollectibleCounter />
      <MusicToggle />
      <CursorManager />
    </>
  );
}
