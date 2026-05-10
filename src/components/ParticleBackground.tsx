import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  char: string;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isTouchDevice ? 30 : 60;

    // Japanese characters for particles
    const kanjiChars = ['技', '術', 'コ', 'ー', 'ド', '創', '造', '革', '新', '未', '来', '0', '1'];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 12 + 8,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -Math.random() * 0.5 - 0.2,
          opacity: Math.random() * 0.4 + 0.1,
          char: kanjiChars[Math.floor(Math.random() * kanjiChars.length)],
        });
      }
    };
    initParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Mouse repulsion effect (only process every 3rd particle for performance)
        if (index % 3 === 0) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.speedX -= (dx / distance) * force * 0.5;
            particle.speedY -= (dy / distance) * force * 0.5;
          }
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Damping
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Reset base upward movement
        particle.speedY -= 0.002;

        // Wrap around
        if (particle.y < -20) {
          particle.y = canvas.height + 20;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;

        // Draw particle
        ctx.save();
        ctx.font = `${particle.size}px "Noto Sans JP", sans-serif`;
        ctx.fillStyle = `rgba(250, 204, 21, ${particle.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add glow effect
        ctx.shadowColor = 'rgba(250, 204, 21, 0.5)';
        ctx.shadowBlur = 10;
        
        ctx.fillText(particle.char, particle.x, particle.y);
        ctx.restore();
      });

      // Draw connections (limited for performance)
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.05)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particlesRef.current.length; i += 5) {
        for (let j = i + 5; j < particlesRef.current.length; j += 5) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    />
  );
};

export default ParticleBackground;
