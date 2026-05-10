import { useEffect, useRef, useState } from 'react';
import { aboutConfig, contactConfig } from '../config';
import { Download, MapPin, Mail, Code2, Cpu, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [statValues, setStatValues] = useState<string[]>(
    aboutConfig.stats.map(() => '0')
  );

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
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

    // Image parallax
    if (image) {
      const imageTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          gsap.to(image, {
            y: self.progress * 30 - 15,
            duration: 0.1,
            ease: 'none',
          });
        },
      });
      triggers.push(imageTrigger);
    }

    // Stats counter animation
    const stats = section.querySelectorAll('.stat-value');
    stats.forEach((stat, index) => {
      const value = aboutConfig.stats[index].value;
      const numValue = parseInt(value.replace(/\D/g, ''));
      const suffix = value.replace(/[0-9]/g, '');
      
      const statTrigger = ScrollTrigger.create({
        trigger: stat,
        start: 'top 90%',
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: numValue,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              setStatValues(prev => {
                const newValues = [...prev];
                newValues[index] = Math.round(obj.val) + suffix;
                return newValues;
              });
            }
          });
        },
        once: true,
      });
      triggers.push(statTrigger);
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative z-[2] w-full py-20 lg:py-28 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 font-japanese text-[7rem] text-[#facc15]/5 leading-none select-none">
        自己紹介
      </div>
      <div className="absolute bottom-20 left-10 font-japanese text-[5rem] text-[#facc15]/5 leading-none select-none">
        私について
      </div>

      <div className="relative z-10 w-full px-6 lg:px-10 xl:px-14 2xl:px-20">
        {/* Section Header */}
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl mx-auto mb-14">
          <div className="flex items-center gap-3 mb-4 animate-in">
            <div className="w-12 h-px bg-gradient-to-r from-[#facc15] to-transparent" />
            <span className="section-label">{aboutConfig.sectionLabel}</span>
          </div>
          
          <div className="flex items-end gap-4 animate-in">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white">
              {aboutConfig.sectionTitle}
            </h2>
            <span className="font-japanese text-2xl xl:text-3xl text-[#facc15]/40 mb-2">
              {aboutConfig.kanjiAccent}
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative animate-in">
            <div className="relative aspect-square max-w-sm xl:max-w-md mx-auto flex items-center justify-center">
              {/* Decorative Rings - centered */}
              <div className="absolute inset-0 border-2 border-[#facc15]/20 rounded-full animate-rotate-slow" />
              <div className="absolute inset-4 border border-[#fbbf24]/15 rounded-full" style={{ animation: 'rotate-slow 15s linear infinite reverse' }} />
              
              {/* Image Container - perfectly centered within rings */}
              <div className="absolute left-1/2 top-1/2 w-[calc(100%-4rem)] h-[calc(100%-4rem)] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden glass-card bg-gradient-to-br from-[#262626] to-[#141414]">
                <img
                  src={aboutConfig.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 w-full h-full bg-gradient-to-br from-[#262626] to-[#141414] flex items-center justify-center text-center">
                  <div>
                    <Code2 size={80} className="mx-auto text-[#facc15]/30 mb-4" />
                    <span className="font-japanese text-4xl text-[#facc15]/20">CJ</span>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute top-0 right-0 glass-card rounded-full p-3 xl:p-3.5 2xl:p-4 3xl:p-5 animate-float">
                <Cpu size={24} className="text-[#facc15] xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 3xl:w-10 3xl:h-10" />
              </div>
              <div className="absolute bottom-8 left-0 glass-card rounded-full p-3 xl:p-3.5 2xl:p-4 3xl:p-5 animate-float" style={{ animationDelay: '0.5s' }}>
                <Globe size={24} className="text-[#fbbf24] xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 3xl:w-10 3xl:h-10" />
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="animate-in">
            <div className="glass-card rounded-2xl p-8 mb-8">
              {aboutConfig.bio.map((paragraph, index) => (
                <p key={index} className="text-white/70 mb-4 last:mb-0 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-white/60">
                <MapPin size={18} className="text-[#facc15]" />
                <span>{contactConfig.location}</span>
                <span className="font-japanese text-[#facc15]/50 text-sm">{contactConfig.locationKanji}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Mail size={18} className="text-[#facc15]" />
                <span>{contactConfig.email}</span>
              </div>
            </div>

            {/* Download CV Button */}
            <a
              href={aboutConfig.cvUrl}
              download
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display tracking-wider interactive"
            >
              <Download size={18} />
              Download CV
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-5">
          {aboutConfig.stats.map((stat, index) => (
            <div 
              key={index}
              className="glass-card rounded-xl p-6 text-center hover:border-[#facc15]/40 transition-all group"
            >
              <div className="stat-value font-display text-4xl text-[#facc15] mb-2 group-hover:scale-110 transition-transform">
                {statValues[index]}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
              <div className="font-japanese text-[#facc15]/30 text-xs mt-1">{stat.kanji}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
