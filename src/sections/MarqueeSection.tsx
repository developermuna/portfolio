import { useEffect, useRef, useState } from 'react';

const textRow1 = "REACT • NEXT.JS • TYPESCRIPT • TAILWIND CSS • AI ASSIST SOFTWARE DEVELOPER • FRAMER MOTION • WEBGL • ".repeat(4);
const textRow2 = "UI/UX DESIGN • FULLSTACK DEVELOPMENT • AI ASSIST SOFTWARE DEVELOPER • DIGITAL EXPERIENCES • MOBILE APPS • ".repeat(4);

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const raw = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(raw);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-2 pb-0 sm:pb-10 overflow-hidden"
    >
      {/* Row 1 - moves RIGHT */}
      <div
        className="whitespace-nowrap flex items-center"
        style={{
          transform: `translateX(${offset - 1000}px)`,
          willChange: 'transform',
        }}
      >
        <h2 className="text-[#D7E2EA]/80 font-kanit font-black text-2xl sm:text-3xl md:text-4xl tracking-wider">
          {textRow1}
        </h2>
      </div>

      {/* Exactly 5px gap */}
      <div style={{ height: '5px' }} />

      {/* Row 2 - moves LEFT */}
      <div
        className="whitespace-nowrap flex items-center"
        style={{
          transform: `translateX(${-(offset)}px)`,
          willChange: 'transform',
        }}
      >
        <h2 className="text-transparent text-stroke-white font-kanit font-black text-2xl sm:text-3xl md:text-4xl tracking-wider" style={{ WebkitTextStroke: '1px rgba(215, 226, 234, 0.4)' }}>
          {textRow2}
        </h2>
      </div>
    </section>
  );
};

export default MarqueeSection;
