import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is touch-based
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Check for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .interactive');
      setIsHovering(!!isInteractive);
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Smooth cursor follow
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
      follower.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousemove', handleElementHover, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease, transform 0.1s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease',
        }}
      />
      
      {/* Follower ring */}
      <div
        ref={followerRef}
        className={`custom-cursor-follower ${isHovering ? 'hover' : ''}`}
        style={{
          opacity: isVisible ? 0.5 : 0,
          transition: 'opacity 0.2s ease, width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
        }}
      />

      {/* Click ripple effect container */}
      <div id="ripple-container" className="fixed inset-0 pointer-events-none z-[9997]" />
    </>
  );
};

export default CustomCursor;
