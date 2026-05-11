import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSectionById } from '../lib/scrollPage';
import { navConfig } from '../config';
import { Code2 } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionNavIds = navConfig.navItems
      .map((item) => item.sectionId)
      .filter((id): id is string => Boolean(id));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      if (!isHome) return;

      const sections = [...sectionNavIds].reverse();
      for (const section of sections) {
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

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const scrollToSection = (sectionId: string) => {
    scrollToSectionById(sectionId);
    setIsMobileMenuOpen(false);
  };

  const navKey = (item: (typeof navConfig.navItems)[number]) => item.to ?? item.sectionId ?? item.label;

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-10 xl:px-14 2xl:px-20 flex items-center justify-between">
          {/* Logo */}
          {isHome ? (
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
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
          ) : (
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 border border-[#facc15]/30 rounded rotate-45 group-hover:border-[#facc15]/60 transition-colors" />
                <span className="font-display text-xl text-[#facc15]">{navConfig.brandName}</span>
              </div>
              <span className="font-japanese text-[#facc15]/50 text-sm hidden sm:block">
                {navConfig.brandSubtitle}
              </span>
            </Link>
          )}

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {navConfig.navItems.map((item) => {
              if (item.to) {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={navKey(item)}
                    to={item.to}
                    className={`nav-pill px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      active
                        ? 'bg-[#facc15]/20 text-[#facc15] border-[#facc15]/40'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }
              const sid = item.sectionId!;
              const active = isHome && activeSection === sid;
              return isHome ? (
                <button
                  key={navKey(item)}
                  type="button"
                  onClick={() => scrollToSection(sid)}
                  className={`nav-pill px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    active
                      ? 'bg-[#facc15]/20 text-[#facc15] border-[#facc15]/40'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={navKey(item)}
                  href={`/#${sid}`}
                  className="nav-pill px-5 py-2 rounded-full text-sm font-medium text-white/70 transition-all duration-300 hover:text-white"
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`hamburger-line transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span className={`hamburger-line transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span
              className={`hamburger-line transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden
        />

        <div className="relative h-full flex flex-col items-center justify-center gap-6">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#facc15]/10 rounded-full animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-[#facc15]/10 rounded-full animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />

          <div className="absolute top-20 right-10 font-japanese text-6xl text-[#facc15]/5">技術</div>
          <div className="absolute bottom-20 left-10 font-japanese text-6xl text-[#facc15]/5">コード</div>

          {navConfig.navItems.map((item, index) => {
            const style = {
              transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
            };

            if (item.to) {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={navKey(item)}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-3xl font-display tracking-wider transition-all duration-300 ${
                    active ? 'text-[#facc15] text-glow-green' : 'text-white/70 hover:text-white'
                  }`}
                  style={style}
                >
                  {item.label}
                </Link>
              );
            }

            const sid = item.sectionId!;
            const active = isHome && activeSection === sid;

            return isHome ? (
              <button
                key={navKey(item)}
                type="button"
                onClick={() => scrollToSection(sid)}
                className={`text-3xl font-display tracking-wider transition-all duration-300 ${
                  active ? 'text-[#facc15] text-glow-green' : 'text-white/70 hover:text-white'
                }`}
                style={style}
              >
                {item.label}
              </button>
            ) : (
              <a
                key={navKey(item)}
                href={`/#${sid}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-display tracking-wider text-white/70 transition-all duration-300 hover:text-white"
                style={style}
              >
                {item.label}
              </a>
            );
          })}

          <div
            className="w-24 h-px bg-gradient-to-r from-transparent via-[#facc15]/50 to-transparent mt-8"
            style={{
              transitionDelay: isMobileMenuOpen ? '300ms' : '0ms',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          />

          <div
            className="flex gap-6 mt-4"
            style={{
              transitionDelay: isMobileMenuOpen ? '350ms' : '0ms',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            <a
              href="https://github.com/chathuka55"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-[#facc15] transition-colors"
            >
              <Code2 size={24} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
