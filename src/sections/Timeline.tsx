import { useEffect, useRef } from 'react';
import { timelineConfig } from '../config';
import { GraduationCap, Briefcase, Zap, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const typeIcons = {
  education: GraduationCap,
  project: Briefcase,
  skill: Zap,
  milestone: Award,
};

const typeColors = {
  education: '#facc15',
  project: '#fbbf24',
  skill: '#fde047',
  milestone: '#d4af37',
};

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const triggers: ScrollTrigger[] = [];

    // Title animation
    const titleTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          section.querySelectorAll('.animate-in'),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
      },
      once: true,
    });
    triggers.push(titleTrigger);

    // Timeline line animation
    const lineTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 80%',
      onUpdate: (self) => {
        gsap.to(line, {
          height: `${self.progress * 100}%`,
          duration: 0.1,
          ease: 'none',
        });
      },
    });
    triggers.push(lineTrigger);

    // Timeline items animation
    const items = section.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      const itemTrigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            item,
            { 
              x: index % 2 === 0 ? -50 : 50, 
              opacity: 0 
            },
            { 
              x: 0, 
              opacity: 1, 
              duration: 0.6, 
              delay: index * 0.1,
              ease: 'power3.out' 
            }
          );
        },
        once: true,
      });
      triggers.push(itemTrigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="timeline" 
      className="relative z-[2] w-full py-20 lg:py-28 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute top-20 left-10 z-[1] font-japanese text-[7rem] text-[#facc15]/5 leading-none select-none">
        経歴
      </div>
      <div className="pointer-events-none absolute bottom-20 right-10 z-[1] font-japanese text-[5rem] text-[#facc15]/5 leading-none select-none">
        旅
      </div>

      <div className="relative z-10 w-full px-6 lg:px-10 xl:px-14 2xl:px-20">
        {/* Section Header */}
        <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-4 animate-in">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#facc15] to-transparent" />
            <span className="section-label">{timelineConfig.sectionLabel}</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#facc15] to-transparent" />
          </div>
          
          <div className="flex items-center justify-center gap-4 animate-in">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white">
              {timelineConfig.sectionTitle}
            </h2>
            <span className="font-japanese text-2xl xl:text-3xl text-[#facc15]/40">
              {timelineConfig.kanjiAccent}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto relative">
          {/* Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#262626]">
            <div 
              ref={lineRef}
              className="timeline-line w-full"
              style={{ height: '0%' }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-10 xl:space-y-14 2xl:space-y-16 3xl:space-y-20">
            {timelineConfig.events.map((event, index) => {
              const Icon = typeIcons[event.type];
              const color = typeColors[event.type];
              const isLeft = index % 2 === 0;

              return (
                <div 
                  key={event.id}
                  className={`timeline-item relative flex items-start ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-12 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div 
                      className="glass-card rounded-xl p-6 xl:p-7 2xl:p-8 3xl:p-10 xl:min-h-[180px] 2xl:min-h-[210px] 3xl:min-h-[240px] hover:border-[#facc15]/40 transition-all"
                      style={{ borderLeftColor: color, borderLeftWidth: '3px' }}
                    >
                      {/* Date Badge */}
                      <div className={`flex items-center gap-2 mb-3 xl:mb-4 2xl:mb-5 ${isLeft ? 'md:justify-end' : ''}`}>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-mono-custom"
                          style={{ backgroundColor: `${color}20`, color }}
                        >
                          {event.date}
                        </span>
                        <span 
                          className="text-xs uppercase tracking-wider"
                          style={{ color: `${color}80` }}
                        >
                          {event.type}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg xl:text-lg 2xl:text-xl text-white mb-2">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 text-sm xl:text-sm 2xl:text-base">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-6">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${color}20`,
                        border: `2px solid ${color}`,
                        boxShadow: `0 0 20px ${color}40`
                      }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Decorative Bottom */}
        <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto mt-14 flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-[#facc15]/30 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-[#facc15] rounded-full" />
            </div>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-japanese text-[#facc15]/40 text-sm whitespace-nowrap">
              継続中
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
