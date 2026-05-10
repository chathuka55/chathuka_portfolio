import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Stars } from '@react-three/drei';
import { heroConfig } from '../config';
import LightPillar from '../components/effects/LightPillar';
import { heroLightPillarPreset } from '../components/effects/lightPillarTheme';
import { ChevronDown, Github, Linkedin, Twitter } from 'lucide-react';
import * as THREE from 'three';

// Preload samurai model for smoother loading
useGLTF.preload('/models/samurai.glb');

// Samurai GLB Model Component - 3D turns according to cursor with smooth interpolation
const SamuraiModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const { scene } = useGLTF('/models/samurai.glb');
  const targetRot = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });
  const lerpFactor = 0.08;

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    // Auto-float when cursor is idle (gentle bobbing)
    const autoFloatY = Math.sin(t * 0.3) * 0.1;
    const autoFloatX = Math.cos(t * 0.2) * 0.05;

    // Target rotation from cursor (mouse is normalized -1 to 1)
    targetRot.current.y = mouse.x * 0.4 + autoFloatY;
    targetRot.current.x = -mouse.y * 0.4 + autoFloatX;

    // Smooth lerp towards target for fluid cursor-follow effect
    currentRot.current.y += (targetRot.current.y - currentRot.current.y) * lerpFactor;
    currentRot.current.x += (targetRot.current.x - currentRot.current.x) * lerpFactor;

    groupRef.current.rotation.y = currentRot.current.y;
    groupRef.current.rotation.x = currentRot.current.x;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene.clone()} scale={32} position={[0, -2, 0]} />
      {/* Orbiting Rings - same as before */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[4, 0.015, 16, 100]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

// Floating Particles
const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#facc15"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Scene Component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#facc15" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#fbbf24" />
      <pointLight position={[0, 0, 15]} intensity={5} color="#facc15" />
      <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2.5} color="#fde047" />
      
      <SamuraiModel />
      <FloatingParticles />
      <Stars radius={50} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
    </>
  );
};

// Text Decode Effect Component
const DecodeText = ({ text, chars }: { text: string; chars: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(true);

  useEffect(() => {
    if (!isDecoding) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 1 / 2;

      if (iteration >= text.length) {
        setIsDecoding(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, chars, isDecoding]);

  return <span className="decode-text">{displayText}</span>;
};

// Typewriter Effect Component
const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayText}
      <span className="inline-block w-0.5 h-5 bg-[#facc15] ml-1 animate-blink" />
    </span>
  );
};

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative z-[2] flex min-h-screen w-full items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Three.js light pillar — gold/charcoal; keeps 3D + UI above */}
      <div className="pointer-events-none absolute inset-0 z-0 min-h-[100dvh] w-full">
        <LightPillar {...heroLightPillarPreset} />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#0a0a0a]/25"
        aria-hidden
      />

      <div className="relative z-[2] flex min-h-[min(100dvh,100svh)] w-full flex-col justify-center">
        {/* 3D Canvas */}
        <div className="absolute right-0 top-1/2 z-[2] -translate-y-1/2 h-[60vh] w-full lg:h-[78vh] lg:w-1/2 xl:h-[80vh] 2xl:h-[84vh]">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 lg:px-10 xl:px-14 2xl:px-20 pt-24">
        <div className="max-w-3xl xl:max-w-3xl 2xl:max-w-4xl">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-[#facc15] to-transparent" />
            <span className="section-label">FULL-STACK DEVELOPER</span>
            <span className="font-japanese text-[#facc15]/40 text-sm">開発者</span>
          </div>

          {/* Name with Decode Effect */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl text-white mb-4 tracking-wider">
            <DecodeText text={heroConfig.name} chars={heroConfig.decodeChars} />
          </h1>

          {/* Role with Typewriter */}
          <p className="text-lg sm:text-xl xl:text-xl 2xl:text-2xl text-[#facc15]/80 font-mono-custom mb-6">
            <TypewriterText text={heroConfig.role} />
          </p>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl xl:text-2xl 2xl:text-3xl text-white/60 mb-10 font-light">
            {heroConfig.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
              className="btn-primary px-8 py-4 rounded-lg font-display tracking-wider flex items-center gap-2 interactive"
            >
              {heroConfig.ctaPrimary}
              <ChevronDown size={18} />
            </button>
            <button
              onClick={() => scrollToSection(heroConfig.ctaSecondaryTarget)}
              className="btn-outline px-8 py-4 rounded-lg font-display tracking-wider interactive"
            >
              {heroConfig.ctaSecondary}
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white/60 hover:text-[#facc15] hover:border-[#facc15]/50 transition-all interactive"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white/60 hover:text-[#facc15] hover:border-[#facc15]/50 transition-all interactive"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-white/60 hover:text-[#facc15] hover:border-[#facc15]/50 transition-all interactive"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Decorative Kanji */}
        <div className="absolute bottom-20 right-10 hidden lg:block">
          <div className="font-japanese text-[10rem] text-[#facc15]/5 leading-none select-none">
            技
          </div>
        </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-white/40 text-xs font-mono-custom tracking-wider">SCROLL</span>
          <div className="w-6 h-10 border-2 border-[#facc15]/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#facc15] rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="pointer-events-none absolute left-6 top-24 z-10 h-20 w-20 border-l-2 border-t-2 border-[#facc15]/20" />
      <div className="pointer-events-none absolute bottom-8 right-6 z-10 h-20 w-20 border-r-2 border-b-2 border-[#facc15]/20" />
    </section>
  );
};

export default Hero;
