import ScrollVelocity from './ScrollVelocity';

/** Full-width velocity marquee between About and Contact */
export default function NameScrollBand() {
  return (
    <section
      className="relative z-[2] border-y border-[#facc15]/15 bg-[#050505]/75 py-6 backdrop-blur-sm md:py-8"
      aria-label="Portfolio author"
    >
      <ScrollVelocity
        texts={['Chathuka Jayasekara', 'Full-Stack Developer · Build · Ship · Scale']}
        velocity={95}
        className="bg-gradient-to-r from-[#fde047] via-[#facc15] to-[#fbbf24] bg-clip-text font-display tracking-tight text-transparent drop-shadow-[0_0_24px_rgba(250,204,21,0.35)]"
        numCopies={7}
        damping={50}
        stiffness={400}
      />
    </section>
  );
}
