import { useState, useEffect } from 'react';
import { navConfig } from '../config';
import { Code2 } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = navConfig.navItems.map(item => item.sectionId);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-nav py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-10 xl:px-14 2xl:px-20 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 border border-[#facc15]/30 rounded rotate-45 group-hover:border-[#facc15]/60 transition-colors" />
              <span className="font-display text-xl text-[#facc15]">{navConfig.brandName}</span>
            </div>
            <span className="font-japanese text-[#facc15]/50 text-sm hidden sm:block">
              {navConfig.brandSubtitle}
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {navConfig.navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className={`nav-pill px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.sectionId
                    ? 'bg-[#facc15]/20 text-[#facc15] border-[#facc15]/40'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`hamburger-line transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`hamburger-line transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-6">
          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#facc15]/10 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-[#facc15]/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          {/* Kanji Decoration */}
          <div className="absolute top-20 right-10 font-japanese text-6xl text-[#facc15]/5">
            技術
          </div>
          <div className="absolute bottom-20 left-10 font-japanese text-6xl text-[#facc15]/5">
            コード
          </div>

          {/* Menu Items */}
          {navConfig.navItems.map((item, index) => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className={`text-3xl font-display tracking-wider transition-all duration-300 ${
                activeSection === item.sectionId
                  ? 'text-[#facc15] text-glow-green'
                  : 'text-white/70 hover:text-white'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {item.label}
            </button>
          ))}

          {/* Decorative Line */}
          <div 
            className="w-24 h-px bg-gradient-to-r from-transparent via-[#facc15]/50 to-transparent mt-8"
            style={{
              transitionDelay: isMobileMenuOpen ? '300ms' : '0ms',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          />

          {/* Social Links */}
          <div 
            className="flex gap-6 mt-4"
            style={{
              transitionDelay: isMobileMenuOpen ? '350ms' : '0ms',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#facc15] transition-colors">
              <Code2 size={24} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
