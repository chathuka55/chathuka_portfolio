import { useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from 'react-icons/si';
import { TbSql } from 'react-icons/tb';
import { skillsConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Official-style logos from Simple Icons; SQL uses Tabler “SQL” glyph */
const techIcons: Record<string, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  threejs: SiThreedotjs,
  tailwind: SiTailwindcss,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  java: SiOpenjdk,
  python: SiPython,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  mysql: SiMysql,
  git: SiGit,
  docker: SiDocker,
  linux: SiLinux,
  javascript: SiJavascript,
  sql: TbSql,
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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

    // Skill cards animation
    const cards = section.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
      const cardTrigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            card,
            { scale: 0.8, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.5, 
              delay: index * 0.05,
              ease: 'back.out(1.7)' 
            }
          );
        },
        once: true,
      });
      triggers.push(cardTrigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [activeCategory]);

  const filteredSkills = activeCategory === 'all' 
    ? skillsConfig.skills 
    : skillsConfig.skills.filter(skill => skill.category === activeCategory);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative z-[2] w-full py-20 lg:py-28 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 font-japanese text-[7rem] text-[#facc15]/5 leading-none select-none">
        技術
      </div>
      <div className="absolute bottom-20 left-10 font-japanese text-[5rem] text-[#facc15]/5 leading-none select-none">
        スキル
      </div>

      <div className="relative z-10 w-full px-6 lg:px-10 xl:px-14 2xl:px-20">
        {/* Section Header */}
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-4 animate-in">
            <div className="w-12 h-px bg-gradient-to-r from-[#facc15] to-transparent" />
            <span className="section-label">{skillsConfig.sectionLabel}</span>
          </div>
          
          <div className="flex items-end gap-4 animate-in">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white">
              {skillsConfig.sectionTitle}
            </h2>
            <span className="font-japanese text-2xl xl:text-3xl text-[#facc15]/40 mb-2">
              {skillsConfig.kanjiAccent}
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl mx-auto mb-12 animate-in">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#facc15]/20 text-[#facc15] border border-[#facc15]/40'
                  : 'bg-[#262626]/50 text-white/60 border border-transparent hover:border-[#facc15]/30'
              }`}
            >
              All
            </button>
            {skillsConfig.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-[#facc15]/20 text-[#facc15] border border-[#facc15]/40'
                    : 'bg-[#262626]/50 text-white/60 border border-transparent hover:border-[#facc15]/30'
                }`}
              >
                {cat.label}
                <span className="font-japanese text-xs text-[#facc15]/50">{cat.kanji}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {filteredSkills.map((skill, index) => {
            const IconComponent = techIcons[skill.icon];
            
            return (
              <div
                key={`${skill.name}-${index}`}
                className="skill-card group"
              >
                <div className="tech-icon-circle mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  {IconComponent && (
                    <IconComponent className="h-10 w-10 shrink-0" aria-hidden />
                  )}
                </div>
                
                <div className="text-center">
                  <h4 className="text-white font-medium text-sm mb-2">{skill.name}</h4>
                  
                  {/* Progress Bar */}
                  <div className="skill-progress">
                    <div 
                      className="skill-progress-bar"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  
                  <span className="text-[#facc15]/60 text-xs font-mono-custom">
                    {skill.level}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Summary */}
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 animate-in">
          {[
            { label: 'Frontend', value: '5+', kanji: '前端' },
            { label: 'Backend', value: '4+', kanji: '後端' },
            { label: 'Databases', value: '3+', kanji: 'DB' },
            { label: 'Tools', value: '10+', kanji: '工具' },
          ].map((stat, index) => (
            <div 
              key={index}
              className="glass-card rounded-xl p-6 text-center hover:border-[#facc15]/40 transition-all"
            >
              <div className="font-display text-3xl text-[#facc15] mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
              <div className="font-japanese text-[#facc15]/30 text-xs mt-1">{stat.kanji}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
