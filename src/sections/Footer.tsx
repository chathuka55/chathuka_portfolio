import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { footerConfig, navConfig } from '../config';
import { scrollToSectionById } from '../lib/scrollPage';
import { ArrowUp, Github, Linkedin, Facebook, Instagram, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const trigger = ScrollTrigger.create({
      trigger: footer,
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo(
          footer.querySelectorAll('.animate-in'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
        );
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    scrollToSectionById(sectionId);
  };

  return (
    <footer 
      ref={footerRef}
      className="relative z-[2] w-full py-16 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 wave-pattern opacity-10" />

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#facc15]/30 to-transparent" />

      <div className="relative z-10 w-full px-6 lg:px-10 xl:px-14 2xl:px-20">
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-8xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div className="animate-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 border border-[#facc15]/30 rounded rotate-45" />
                  <span className="font-display text-2xl text-[#facc15]">{navConfig.brandName}</span>
                </div>
                <div>
                  <div className="font-display text-lg text-white">{footerConfig.brandName}</div>
                  <div className="font-japanese text-[#facc15]/40 text-xs">{footerConfig.brandSubtitle}</div>
                </div>
              </div>
              <p className="text-white/50 text-sm mb-6">
                {footerConfig.tagline}
              </p>
              <div className="font-japanese text-[#facc15]/20 text-4xl">
                {footerConfig.kanjiAccent}
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-in">
              <h4 className="font-display text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footerConfig.quickLinks.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-white/50 hover:text-[#facc15] transition-colors text-sm interactive block"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => link.sectionId && scrollToSection(link.sectionId)}
                        className="text-white/50 hover:text-[#facc15] transition-colors text-sm interactive"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="animate-in">
              <h4 className="font-display text-white mb-4">Connect</h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com/chathuka55"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white/50 hover:text-[#facc15] hover:border-[#facc15]/50 transition-all interactive"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/chathuka-jayasekara-013595216/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white/50 hover:text-[#facc15] hover:border-[#facc15]/50 transition-all interactive"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.facebook.com/chathuka.jayasekara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white/50 hover:text-[#facc15] hover:border-[#facc15]/50 transition-all interactive"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/chathux_j/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-white/50 hover:text-[#facc15] hover:border-[#facc15]/50 transition-all interactive"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#facc15]/10 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="animate-in flex items-center gap-2 text-white/40 text-sm">
              <span>{footerConfig.copyright}</span>
              <span className="font-japanese text-[#facc15]/30 text-xs">{footerConfig.copyrightKanji}</span>
            </div>

            {/* Made With */}
            <div className="animate-in flex items-center gap-2 text-white/40 text-sm">
              <span>Made with</span>
              <Heart size={14} className="text-[#facc15] fill-[#facc15]" />
              <span>and</span>
              <span className="font-japanese text-[#facc15]/50">コード</span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="animate-in group flex items-center gap-2 text-white/50 hover:text-[#facc15] transition-colors interactive"
            >
              <span className="text-sm">{footerConfig.backToTop}</span>
              <span className="font-japanese text-xs text-[#facc15]/50">{footerConfig.backToTopKanji}</span>
              <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center group-hover:border-[#facc15]/50 transition-all">
                <ArrowUp size={16} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-[#facc15]/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-[#facc15]/10" />
    </footer>
  );
};

export default Footer;
