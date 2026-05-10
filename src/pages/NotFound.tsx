import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { Link } from 'lucide-react';
import * as THREE from 'three';
import gsap from 'gsap';

// Lost Robot/Bot Component
const LostBot = () => {
  const botRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (botRef.current) {
      // Floating animation
      botRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
    if (headRef.current) {
      // Confused head tilt
      headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={botRef}>
      {/* Main Body */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.8]} />
        <meshStandardMaterial 
          color="#262626" 
          metalness={0.8} 
          roughness={0.3}
          emissive="#facc15"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Body Details - Chest Panel */}
      <mesh position={[0, -0.3, 0.45]}>
        <boxGeometry args={[0.8, 0.6, 0.1]} />
        <meshStandardMaterial 
          color="#141414" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>

      {/* Chest Light - Blinking Red (Error State) */}
      <mesh position={[0, -0.3, 0.52]}>
        <circleGeometry args={[0.15]} />
        <meshBasicMaterial color="#ff0040" />
      </mesh>

      {/* Head Group */}
      <group ref={headRef} position={[0, 0.8, 0]}>
        {/* Head Shape */}
        <mesh>
          <boxGeometry args={[1, 0.9, 0.9]} />
          <meshStandardMaterial 
            color="#262626" 
            metalness={0.8} 
            roughness={0.3}
          />
        </mesh>

        {/* Left Eye - Confused (Smaller) */}
        <mesh position={[-0.25, 0.1, 0.48]}>
          <circleGeometry args={[0.12]} />
          <meshBasicMaterial color="#ff0040" />
        </mesh>

        {/* Right Eye - Question Mark Shape */}
        <mesh position={[0.25, 0.1, 0.48]}>
          <ringGeometry args={[0.08, 0.15]} />
          <meshBasicMaterial color="#ff0040" />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4]} />
          <meshStandardMaterial color="#facc15" />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial color="#ff0040" />
        </mesh>

        {/* Question Mark Above Head */}
        <mesh position={[0.6, 0.6, 0]}>
          <torusGeometry args={[0.15, 0.04, 8, 16, Math.PI]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
        <mesh position={[0.75, 0.3, 0]}>
          <boxGeometry args={[0.04, 0.15, 0.04]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      </group>

      {/* Left Arm - Hanging down */}
      <mesh position={[-0.8, -0.3, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial 
          color="#262626" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>

      {/* Right Arm - Scratching head pose */}
      <mesh position={[0.6, 0.3, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial 
          color="#262626" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>

      {/* Floating Debris - 404 Numbers */}
      <mesh position={[-1.5, 0.5, -0.5]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.1]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0.5} />
      </mesh>

      <mesh position={[1.5, -0.3, -0.3]} rotation={[0.3, -0.5, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.1]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0.5} />
      </mesh>

      <mesh position={[0.8, 1.2, -0.8]} rotation={[-0.3, 0.3, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.1]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0.5} />
      </mesh>

      {/* Energy Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#ff0040" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// Glitch Particles
const GlitchParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = new Float32Array(100 * 3);
  const colors = new Float32Array(100 * 3);

  for (let i = 0; i < 100; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

    // Red and green glitch colors
    const isRed = Math.random() > 0.5;
    colors[i * 3] = isRed ? 1 : 0;
    colors[i * 3 + 1] = isRed ? 0 : 1;
    colors[i * 3 + 2] = 0.2;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      // Glitch effect - random position jumps
      if (Math.random() > 0.98) {
        pointsRef.current.position.x = (Math.random() - 0.5) * 0.1;
      } else {
        pointsRef.current.position.x = 0;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ff0040" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#facc15" />
      <spotLight position={[0, 10, 0]} angle={0.6} penumbra={1} intensity={0.6} color="#ffffff" />

      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <LostBot />
      </Float>

      <GlitchParticles />
      
      <Stars 
        radius={50} 
        depth={50} 
        count={500} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />
    </>
  );
};

const NotFound = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Glitch text animation
    const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    
    glitchTimeline
      .to(textRef.current, {
        x: 5,
        duration: 0.05,
        ease: 'power2.inOut',
      })
      .to(textRef.current, {
        x: -5,
        duration: 0.05,
        ease: 'power2.inOut',
      })
      .to(textRef.current, {
        x: 0,
        duration: 0.05,
        ease: 'power2.inOut',
      })
      .to(textRef.current, {
        skewX: 10,
        duration: 0.1,
        ease: 'power2.inOut',
      })
      .to(textRef.current, {
        skewX: 0,
        duration: 0.1,
        ease: 'power2.inOut',
      });

    return () => {
      glitchTimeline.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-transparent to-[#0a0a0a] z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50 z-[1] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 z-[1] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* 404 Number */}
        <div 
          ref={textRef}
          className="relative mb-8"
        >
          <h1 className="font-display text-[8rem] sm:text-[12rem] lg:text-[16rem] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#facc15] to-[#fbbf24] opacity-80">
            404
          </h1>
          {/* Glitch Shadow */}
          <span className="absolute top-0 left-1 font-display text-[8rem] sm:text-[12rem] lg:text-[16rem] font-bold leading-none text-[#ff0040] opacity-30 -z-10">
            404
          </span>
        </div>

        {/* Japanese Text */}
        <div className="font-japanese text-2xl sm:text-3xl text-[#facc15]/60 mb-4">
          ページが見つかりません
        </div>

        {/* English Message */}
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
          Page Not Found
        </h2>

        <p className="font-tech text-lg text-white/50 max-w-md mb-8">
          Looks like our cyber samurai got lost in the digital void. 
          The page you're looking for doesn't exist.
        </p>

        {/* Error Code */}
        <div className="flex items-center gap-2 mb-8 font-mono-custom text-sm text-[#ff0040]/60">
          <span className="w-2 h-2 bg-[#ff0040] rounded-full animate-pulse" />
          <span>ERROR_CODE: 0x404_NOT_FOUND</span>
        </div>

        {/* Back Home Button */}
        <a
          href="/"
          className="group relative px-8 py-4 bg-gradient-to-r from-[#facc15] to-[#fbbf24] rounded-xl font-display font-bold text-[#0a0a0a] text-lg overflow-hidden transition-transform hover:scale-105 flex items-center gap-3"
        >
          <Link className="w-5 h-5" />
          <span>Back to Home</span>
        </a>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-[#facc15]/50 to-transparent hidden lg:block" />
        <div className="absolute bottom-1/4 right-10 w-px h-32 bg-gradient-to-t from-[#fbbf24]/50 to-transparent hidden lg:block" />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-[#ff0040]/20 rounded-tl-xl" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-[#facc15]/20 rounded-tr-xl" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-[#facc15]/20 rounded-bl-xl" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-[#ff0040]/20 rounded-br-xl" />

      {/* Floating Kanji */}
      <div className="absolute top-20 right-20 font-japanese text-6xl text-[#ff0040]/10 select-none animate-pulse">
        迷
      </div>
      <div className="absolute bottom-20 left-20 font-japanese text-6xl text-[#facc15]/10 select-none animate-pulse" style={{ animationDelay: '1s' }}>
        失
      </div>
    </div>
  );
};

export default NotFound;
