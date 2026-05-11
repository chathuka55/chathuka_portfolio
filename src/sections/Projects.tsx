import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { projectsConfig, type Project } from '../config';
import { ExternalLink, ChevronRight, ChevronDown, LayoutGrid } from 'lucide-react';
import ProjectShotImg from '../components/ProjectShotImg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Extra viewport height per panel so each project gets more scroll before advancing. */
const SCROLL_VH_MULTIPLIER = 1.55;

/**
 * Within each panel's scroll slice, this fraction keeps a single panel fully visible;
 * the remainder is used for the crossfade (reduces "two projects stacked" feel).
 */
const PANEL_HOLD_FRAC = 0.72;

/** Map pin progress (0–1) to a float panel index with plateaus between crossfades. */
function progressToFloatIndex(progress: number, panelCount: number, holdFrac: number): number {
  const scaled = progress * panelCount;
  const maxIdx = panelCount - 1;
  if (scaled >= maxIdx) return maxIdx;
  const i = Math.floor(scaled);
  const w = scaled - i;
  if (w < holdFrac) return i;
  const t = (w - holdFrac) / (1 - holdFrac);
  return Math.min(maxIdx, i + t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

type PanelItem =
  | { kind: 'intro' }
  | { kind: 'project'; project: Project };

const introContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.07 },
  },
};

const introItemHidden = { opacity: 0, y: 22 };
const introItemShow = {
  opacity: 1,
  y: 0,
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollProgressFillRef = useRef<HTMLDivElement>(null);
  const scrollProgressLabelRef = useRef<HTMLSpanElement>(null);
  const scrollProgressRegionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const panels: PanelItem[] = [
    { kind: 'intro' },
    ...projectsConfig.projects.map((project) => ({ kind: 'project' as const, project })),
  ];

  const panelCount = panels.length;

  useEffect(() => {
    const pinEl = pinRef.current;
    if (!pinEl) return;

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    const ctx = gsap.context(() => {
      const updatePanels = (floatIndex: number) => {
        const idxLow = Math.floor(floatIndex);
        const idxHigh = Math.min(panelCount - 1, Math.ceil(floatIndex));
        const t = floatIndex - idxLow;

        panelRefs.current.forEach((el, j) => {
          if (!el) return;

          let opacity = 0;
          let scale = 0.8;
          let visibility: 'visible' | 'hidden' = 'hidden';

          if (idxLow === idxHigh) {
            if (j === idxLow) {
              opacity = 1;
              scale = 1;
              visibility = 'visible';
            }
          } else {
            if (j === idxLow) {
              opacity = 1 - t;
              scale = lerp(1, 0.8, t);
              visibility = opacity > 0.02 ? 'visible' : 'hidden';
            } else if (j === idxHigh) {
              opacity = t;
              scale = lerp(0.8, 1, t);
              visibility = opacity > 0.02 ? 'visible' : 'hidden';
            }
          }

          gsap.set(el, {
            autoAlpha: opacity,
            scale,
            transformOrigin: '50% 50%',
            visibility,
          });
        });
      };

      ScrollTrigger.create({
        trigger: pinEl,
        start: 'top top',
        end: () => `+=${panelCount * window.innerHeight * SCROLL_VH_MULTIPLIER}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: 'projects-scroll-pin',
        onUpdate: (self) => {
          const floatIndex = progressToFloatIndex(
            self.progress,
            panelCount,
            PANEL_HOLD_FRAC
          );
          updatePanels(floatIndex);
          const fill = scrollProgressFillRef.current;
          if (fill) {
            fill.style.transform = `scaleX(${self.progress})`;
            fill.style.transformOrigin = 'left center';
          }
          const label = scrollProgressLabelRef.current;
          if (label) {
            label.textContent = `${Math.round(self.progress * 100)}%`;
          }
          const region = scrollProgressRegionRef.current;
          if (region) {
            region.setAttribute('aria-valuenow', String(Math.round(self.progress * 100)));
          }
        },
      });

      updatePanels(0);
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [panelCount]);

  const setPanelRef = (index: number) => (el: HTMLDivElement | null) => {
    panelRefs.current[index] = el;
  };

  const openLive = (project: Project) => {
    const url = project.liveUrl ?? project.githubUrl;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-scroll-section relative z-[2] w-full"
    >
      <div
        ref={pinRef}
        className="projects-scroll-pin relative h-[100dvh] min-h-[100svh] w-full overflow-hidden"
      >
        {/* Site-wide highway shows through; light veil for panel readability */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050505]/52 via-[#050505]/32 to-[#050505]/48"
          aria-hidden
        />

        <div className="absolute top-16 left-4 md:left-10 z-[2] font-japanese text-[4rem] sm:text-[6rem] md:text-[8rem] text-[#facc15]/5 leading-none select-none pointer-events-none">
          作品
        </div>
        <div className="absolute bottom-24 right-4 md:right-10 z-[2] font-japanese text-[3rem] sm:text-[5rem] md:text-[6rem] text-[#facc15]/5 leading-none select-none pointer-events-none">
          プロジェクト
        </div>

        {/* Panels */}
        <div className="absolute inset-0 z-10">
          {panels.map((panel, index) => (
            <div
              key={panel.kind === 'intro' ? 'intro' : panel.project.slug}
              ref={setPanelRef(index)}
              className="projects-scroll-panel absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-20 md:py-24"
            >
              {panel.kind === 'intro' ? (
                <motion.div
                  className="relative z-10 mx-auto w-full max-w-4xl px-2 text-center pointer-events-auto"
                  variants={prefersReducedMotion ? undefined : introContainer}
                  initial={prefersReducedMotion ? undefined : 'hidden'}
                  animate="show"
                >
                  <motion.div
                    variants={
                      prefersReducedMotion
                        ? undefined
                        : { hidden: introItemHidden, show: introItemShow }
                    }
                    className="mb-6 flex items-center justify-center gap-3"
                  >
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#facc15] to-transparent" />
                    <span className="section-label">{projectsConfig.sectionLabel}</span>
                    <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#facc15] to-transparent" />
                  </motion.div>
                  <motion.h2
                    variants={
                      prefersReducedMotion
                        ? undefined
                        : { hidden: introItemHidden, show: introItemShow }
                    }
                    className="font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4"
                  >
                    {projectsConfig.sectionTitle}
                    <span className="mt-2 block font-japanese text-2xl text-[#facc15]/75 sm:text-3xl">
                      {projectsConfig.kanjiAccent}
                    </span>
                  </motion.h2>
                  <motion.p
                    variants={
                      prefersReducedMotion
                        ? undefined
                        : { hidden: introItemHidden, show: introItemShow }
                    }
                    className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/88 sm:text-lg md:text-xl md:leading-relaxed"
                  >
                    Scroll to explore featured work — each project appears as you scroll.
                  </motion.p>
                  <motion.div
                    variants={
                      prefersReducedMotion
                        ? undefined
                        : { hidden: introItemHidden, show: introItemShow }
                    }
                    className="mt-8 flex justify-center"
                  >
                    <Link
                      to="/projects"
                      className="interactive inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#facc15] to-[#fbbf24] px-8 py-3.5 font-display text-sm font-semibold tracking-wider text-[#0a0a0a] shadow-[0_12px_40px_rgba(250,204,21,0.25)] transition-opacity hover:opacity-90 sm:text-base"
                    >
                      <LayoutGrid className="h-5 w-5 shrink-0" aria-hidden />
                      Project gallery
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={
                      prefersReducedMotion
                        ? undefined
                        : { hidden: introItemHidden, show: introItemShow }
                    }
                    className="mt-8 flex flex-col items-center gap-4"
                  >
                    <span className="text-base font-semibold tracking-wide text-[#facc15] sm:text-lg">
                      Scroll to see projects
                    </span>
                    <div className="relative flex h-16 w-10 items-start justify-center rounded-full border-2 border-[#facc15]/60 bg-[#0a0a0a]/50 pt-3 shadow-[0_0_28px_rgba(250,204,21,0.18)]">
                      {prefersReducedMotion ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#facc15]" />
                      ) : (
                        <motion.span
                          className="h-2.5 w-2.5 rounded-full bg-[#facc15]"
                          aria-hidden
                          animate={{
                            y: [0, 18, 0],
                            opacity: [1, 0.3, 1],
                          }}
                          transition={{
                            duration: 1.75,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </div>
                    <div className="-space-y-2 flex flex-col items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={
                            prefersReducedMotion
                              ? undefined
                              : { y: [0, 4, 0], opacity: [0.35, 1, 0.35] }
                          }
                          transition={
                            prefersReducedMotion
                              ? undefined
                              : {
                                  duration: 1.3,
                                  repeat: Infinity,
                                  delay: i * 0.14,
                                  ease: 'easeInOut',
                                }
                          }
                        >
                          <ChevronDown
                            className="h-7 w-7 text-[#facc15]"
                            strokeWidth={2.5}
                            aria-hidden
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    variants={
                      prefersReducedMotion
                        ? undefined
                        : { hidden: introItemHidden, show: introItemShow }
                    }
                    className="mt-8 flex justify-center"
                  >
                    <a
                      href="https://github.com/chathuka55"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-[#facc15] sm:text-base"
                    >
                      <span className="font-mono-custom">GitHub</span>
                      <ChevronRight size={18} aria-hidden />
                    </a>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[92rem] 3xl:max-w-[100rem] mx-auto pointer-events-auto px-1 sm:px-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 2xl:gap-20 items-center">
                    <div className="relative aspect-video lg:aspect-auto lg:min-h-[min(70vh,52rem)] xl:min-h-[min(72vh,56rem)] w-full rounded-2xl xl:rounded-3xl overflow-hidden border border-[#facc15]/20 shadow-[0_20px_60px_rgba(0,0,0,0.45)] bg-gradient-to-br from-[#262626] to-[#141414]">
                      {panel.project.videoUrl ? (
                        <video
                          className="absolute inset-0 w-full h-full object-cover"
                          src={panel.project.videoUrl}
                          muted
                          loop
                          playsInline
                          autoPlay
                          aria-label={`${panel.project.title} preview video`}
                        />
                      ) : (
                        <ProjectShotImg
                          src={panel.project.image}
                          alt={panel.project.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <span className="px-3 py-1 bg-[#facc15]/10 border border-[#facc15]/30 rounded-full text-[10px] sm:text-xs font-mono-custom text-[#facc15] uppercase">
                          {panel.project.category}
                        </span>
                      </div>
                    </div>

                    <div className="text-left space-y-5 sm:space-y-6 lg:space-y-7 xl:space-y-8">
                      <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white leading-[1.08] tracking-tight">
                        {panel.project.title}
                      </h3>
                      <p className="text-white/70 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed max-w-2xl xl:max-w-none">
                        {panel.project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 lg:gap-2.5">
                        {panel.project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 lg:px-3 lg:py-1.5 bg-[#262626]/70 border border-[#facc15]/15 rounded-md text-[10px] sm:text-xs lg:text-sm font-mono-custom text-[#facc15]/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4 pt-2 lg:pt-4">
                        <button
                          type="button"
                          onClick={() => openLive(panel.project)}
                          disabled={!panel.project.liveUrl && !panel.project.githubUrl}
                          className="inline-flex items-center justify-center gap-2 min-h-[44px] lg:min-h-[52px] px-5 py-2.5 lg:px-8 lg:py-3.5 rounded-lg lg:rounded-xl bg-gradient-to-r from-[#facc15] to-[#fbbf24] text-[#0a0a0a] text-sm lg:text-base font-semibold hover:opacity-90 transition-opacity interactive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#facc15] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ExternalLink className="w-[18px] h-[18px] lg:w-5 lg:h-5 shrink-0" aria-hidden />
                          View Project
                        </button>
                        <Link
                          to={`/projects/${panel.project.slug}`}
                          className="inline-flex items-center justify-center gap-2 min-h-[44px] lg:min-h-[52px] px-5 py-2.5 lg:px-8 lg:py-3.5 rounded-lg lg:rounded-xl border border-[#facc15]/40 bg-[#262626]/40 text-[#facc15] text-sm lg:text-base font-medium hover:bg-[#facc15]/10 transition-colors interactive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#facc15]"
                        >
                          <ChevronRight className="w-[18px] h-[18px] lg:w-5 lg:h-5 shrink-0" aria-hidden />
                          Case study
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          ref={scrollProgressRegionRef}
          className="pointer-events-none absolute bottom-5 left-1/2 z-[25] w-[min(92vw,24rem)] -translate-x-1/2 md:bottom-8"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          aria-label="Scroll progress through projects section"
        >
          <div className="mb-1 flex items-center justify-between px-0.5">
            <span className="font-mono-custom text-[10px] uppercase tracking-wider text-white/45">
              Section scroll
            </span>
            <span
              ref={scrollProgressLabelRef}
              className="font-mono-custom text-[10px] tabular-nums text-[#facc15]/85"
            >
              0%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/5">
            <div
              ref={scrollProgressFillRef}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#facc15] to-[#eab308]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Projects;
