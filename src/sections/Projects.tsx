import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { projectsConfig, type Project } from '../config';
import { ExternalLink, Github, ChevronRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

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
  const [modalProject, setModalProject] = useState<Project | null>(null);
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

  const openDetails = (project: Project) => {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    } else {
      setModalProject(project);
    }
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
              key={panel.kind === 'intro' ? 'intro' : panel.project.id}
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
                    className="mt-2 flex flex-col items-center gap-4"
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
                    className="mt-10"
                  >
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive inline-flex items-center gap-2 text-sm font-medium text-[#facc15] transition-colors hover:text-[#fde047] sm:text-base"
                    >
                      <span className="font-mono-custom">View All Projects on GitHub</span>
                      <ChevronRight size={18} />
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
                        <img
                          src={panel.project.image}
                          alt={panel.project.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.opacity = '0.3';
                          }}
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
                        <button
                          type="button"
                          onClick={() => openDetails(panel.project)}
                          className="inline-flex items-center justify-center gap-2 min-h-[44px] lg:min-h-[52px] px-5 py-2.5 lg:px-8 lg:py-3.5 rounded-lg lg:rounded-xl border border-[#facc15]/40 bg-[#262626]/40 text-[#facc15] text-sm lg:text-base font-medium hover:bg-[#facc15]/10 transition-colors interactive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#facc15]"
                        >
                          <Github className="w-[18px] h-[18px] lg:w-5 lg:h-5 shrink-0" aria-hidden />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!modalProject} onOpenChange={(open) => !open && setModalProject(null)}>
        <DialogContent className="sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border-[#facc15]/20">
          {modalProject && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-white">{modalProject.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <p className="text-white/70">{modalProject.longDescription}</p>
                <div>
                  <h4 className="font-display text-sm text-[#facc15] mb-2 uppercase tracking-wider">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {modalProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-[#262626]/50 rounded text-xs font-mono-custom text-[#facc15]/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-display text-sm text-[#facc15] mb-2 uppercase tracking-wider">Features</h4>
                  <ul className="space-y-1">
                    {modalProject.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <ChevronRight size={14} className="text-[#facc15] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {modalProject.screenshots && modalProject.screenshots.length > 0 && (
                  <div>
                    <h4 className="font-display text-sm text-[#facc15] mb-3 uppercase tracking-wider">Screenshots</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {modalProject.screenshots.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`${modalProject.title} screenshot ${i + 1}`}
                          className="w-full rounded-lg border border-[#facc15]/20 object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-3 pt-4">
                  {modalProject.githubUrl && (
                    <a
                      href={modalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#262626]/50 rounded-lg text-sm text-white/70 hover:text-white hover:bg-[#262626] transition-all interactive"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  {modalProject.liveUrl && (
                    <a
                      href={modalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#facc15]/10 border border-[#facc15]/30 rounded-lg text-sm text-[#facc15] hover:bg-[#facc15]/20 transition-all interactive"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
