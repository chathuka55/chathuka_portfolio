import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Timeline from './sections/Timeline';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ParticleBackground from './components/ParticleBackground';
import SiteHyperspeedBackdrop from './components/SiteHyperspeedBackdrop';
import NameScrollBand from './components/NameScrollBand';
import NotFound from './pages/NotFound';

// Main Portfolio Component
const Portfolio = () => {
  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Particle Background */}
      <ParticleBackground />

      {/* Highway backdrop: all sections except Hero (Hero uses solid bg) */}
      <SiteHyperspeedBackdrop />
      
      {/* Navigation */}
      <Navigation />
      
      <main className="relative z-10 w-full min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <Hero />
        
        {/* Projects Section */}
        <Projects />
        
        {/* Skills Section */}
        <Skills />
        
        {/* Timeline Section */}
        <Timeline />
        
        {/* About Section */}
        <About />

        <NameScrollBand />
        
        {/* Contact Section */}
        <Contact />
        
        {/* Footer Section */}
        <Footer />
      </main>
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set page title from config
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }

    // Add viewport meta for better mobile experience
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
