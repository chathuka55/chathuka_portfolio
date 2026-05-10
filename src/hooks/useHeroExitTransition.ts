import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed transition as the hero leaves the viewport (into Projects).
 * Uses GSAP ScrollTrigger — pairs well with Lenis via ScrollTrigger.update.
 */
export function useHeroExitTransition(
  sectionRef: RefObject<HTMLElement | null>,
  parallaxRef: RefObject<HTMLElement | null>,
  wipeRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const parallax = parallaxRef.current;
    const wipe = wipeRef.current;
    if (!section || !parallax || !wipe) return;

    if (reduce) {
      gsap.set(wipe, { clearProps: 'clipPath' });
      return;
    }

    gsap.set(wipe, { clipPath: 'inset(0 0 100% 0)' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
      });
      tl.to(wipe, { clipPath: 'inset(0 0 0 0)', ease: 'none' }, 0).to(
        parallax,
        { yPercent: -5, opacity: 0.5, ease: 'none' },
        0
      );
    }, section);

    return () => ctx.revert();
  }, [sectionRef, parallaxRef, wipeRef]);
}
