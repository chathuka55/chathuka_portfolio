import type { ReactNode } from 'react';
import CustomCursor from '../components/CustomCursor';
import ParticleBackground from '../components/ParticleBackground';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

type SubpageLayoutProps = {
  children: ReactNode;
};

const SubpageLayout = ({ children }: SubpageLayoutProps) => {
  return (
    <>
      <CustomCursor />
      <ParticleBackground />
      <Navigation />
      <main className="relative z-10 w-full min-h-screen overflow-x-hidden pt-20 md:pt-24">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default SubpageLayout;
