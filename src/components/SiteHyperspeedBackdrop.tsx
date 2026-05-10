import { useMemo } from 'react';
import Hyperspeed from './effects/Hyperspeed';
import LightPillar from './effects/LightPillar';
import { portfolioHyperspeedPreset } from './effects/hyperspeedTheme';
import { portfolioLightPillarPreset } from './effects/lightPillarTheme';

/** Fixed stack: Light pillar → charcoal veil → tint → circuit → highway. Under main (z-10). */
export default function SiteHyperspeedBackdrop() {
  const effectOptions = useMemo(() => portfolioHyperspeedPreset, []);
  const pillarProps = useMemo(() => portfolioLightPillarPreset, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden>
      <div className="absolute inset-0 z-0 min-h-[100dvh] w-full">
        <LightPillar {...pillarProps} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#0a0a0a]/52" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-[#0a0a0a]/50 via-[#141414]/35 to-[#0a0a0a]/50" />
      <div className="pointer-events-none absolute inset-0 z-[3] circuit-pattern opacity-[0.12]" />
      <div className="absolute inset-0 z-[4] h-full min-h-[100dvh] w-full [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:max-h-none">
        <Hyperspeed effectOptions={effectOptions} />
      </div>
    </div>
  );
}
