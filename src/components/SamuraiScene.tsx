import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Cyber Samurai Mask Component
const SamuraiMask = () => {
  const maskGroupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (maskGroupRef.current) {
      // Gentle floating animation
      maskGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Mouse parallax - mask follows cursor subtly
      maskGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        maskGroupRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      );
      maskGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        maskGroupRef.current.rotation.x,
        -mouse.y * 0.2,
        0.05
      );
    }

    // Glowing eye pulse
    if (leftEyeRef.current && rightEyeRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      leftEyeRef.current.scale.setScalar(pulse);
      rightEyeRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={maskGroupRef}>
      {/* Main Face Plate - Angular Samurai Style */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 3, 0.8]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.9} 
          roughness={0.2}
          emissive="#facc15"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Face Plate Details - Top Ridge */}
      <mesh position={[0, 1.4, 0.3]}>
        <boxGeometry args={[2, 0.3, 0.4]} />
        <meshStandardMaterial 
          color="#0f0f1a" 
          metalness={0.95} 
          roughness={0.1}
        />
      </mesh>

      {/* Central Vertical Ridge */}
      <mesh position={[0, 0, 0.5]}>
        <boxGeometry args={[0.15, 2.5, 0.3]} />
        <meshStandardMaterial 
          color="#facc15" 
          metalness={1} 
          roughness={0}
          emissive="#facc15"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Left Eye Socket */}
      <mesh position={[-0.6, 0.3, 0.35]}>
        <boxGeometry args={[0.7, 0.5, 0.2]} />
        <meshStandardMaterial 
          color="#0a0a0f" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>

      {/* Right Eye Socket */}
      <mesh position={[0.6, 0.3, 0.35]}>
        <boxGeometry args={[0.7, 0.5, 0.2]} />
        <meshStandardMaterial 
          color="#0a0a0f" 
          metalness={0.8} 
          roughness={0.3}
        />
      </mesh>

      {/* Left Glowing Eye */}
      <mesh ref={leftEyeRef} position={[-0.6, 0.3, 0.5]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshBasicMaterial 
          color="#facc15"
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right Glowing Eye */}
      <mesh ref={rightEyeRef} position={[0.6, 0.3, 0.5]}>
        <planeGeometry args={[0.5, 0.3]} />
        <meshBasicMaterial 
          color="#facc15"
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Eye Glow Effect */}
      <mesh position={[-0.6, 0.3, 0.45]}>
        <planeGeometry args={[0.7, 0.5]} />
        <meshBasicMaterial 
          color="#facc15"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0.6, 0.3, 0.45]}>
        <planeGeometry args={[0.7, 0.5]} />
        <meshBasicMaterial 
          color="#facc15"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Nose Guard */}
      <mesh position={[0, -0.5, 0.5]}>
        <coneGeometry args={[0.3, 0.8, 4]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>

      {/* Mouth Grill */}
      <mesh position={[0, -1.2, 0.35]}>
        <boxGeometry args={[1.2, 0.6, 0.15]} />
        <meshStandardMaterial 
          color="#0f0f1a" 
          metalness={0.95} 
          roughness={0.1}
        />
      </mesh>

      {/* Grill Lines */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={i} position={[x, -1.2, 0.45]}>
          <boxGeometry args={[0.05, 0.5, 0.05]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      ))}

      {/* Cheek Guards - Left */}
      <mesh position={[-1.3, -0.3, 0]}>
        <boxGeometry args={[0.5, 1.5, 0.6]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>

      {/* Cheek Guards - Right */}
      <mesh position={[1.3, -0.3, 0]}>
        <boxGeometry args={[0.5, 1.5, 0.6]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>

      {/* Horn/Accent - Left */}
      <mesh position={[-1.4, 1.2, -0.2]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.15, 0.8, 4]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1} 
          roughness={0.1}
          emissive="#d4af37"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Horn/Accent - Right */}
      <mesh position={[1.4, 1.2, -0.2]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.15, 0.8, 4]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1} 
          roughness={0.1}
          emissive="#d4af37"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Forehead Gem */}
      <mesh position={[0, 1, 0.5]}>
        <octahedronGeometry args={[0.2]} />
        <meshStandardMaterial 
          color="#facc15" 
          metalness={1} 
          roughness={0}
          emissive="#facc15"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Chin Guard */}
      <mesh position={[0, -1.8, 0.2]}>
        <boxGeometry args={[1.5, 0.5, 0.5]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>

      {/* Decorative Circuit Lines */}
      <mesh position={[-0.8, -1, 0.42]}>
        <boxGeometry args={[0.3, 0.05, 0.05]} />
        <meshBasicMaterial color="#facc15" />
      </mesh>
      <mesh position={[0.8, -1, 0.42]}>
        <boxGeometry args={[0.3, 0.05, 0.05]} />
        <meshBasicMaterial color="#facc15" />
      </mesh>

      {/* Energy Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[4, 0.015, 16, 100]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// Floating Energy Particles
const EnergyParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 150;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

    // Green color variation
    colors[i * 3] = 0;
    colors[i * 3 + 1] = 1;
    colors[i * 3 + 2] = 0.5 + Math.random() * 0.3;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
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
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Scene Setup
const Scene = () => {
  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />
      
      {/* Main Light */}
      <pointLight position={[5, 5, 5]} intensity={1} color="#facc15" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#fbbf24" />
      
      {/* Rim Light */}
      <spotLight 
        position={[0, 10, -5]} 
        angle={0.5} 
        penumbra={1} 
        intensity={0.8} 
        color="#fde047"
      />
      
      {/* Gold Accent Light */}
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#d4af37" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <SamuraiMask />
      </Float>

      <EnergyParticles />
      
      <Stars 
        radius={60} 
        depth={50} 
        count={800} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5} 
      />

      {/* Sparkles around the mask */}
      <Sparkles 
        count={30}
        scale={6}
        size={2}
        speed={0.4}
        color="#facc15"
      />
    </>
  );
};

// Main Component
const SamuraiScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SamuraiScene;
