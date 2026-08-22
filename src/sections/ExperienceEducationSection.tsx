import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const experiences = [
  {
    year: '2032 — 2037',
    role: 'Ph.D.',
    company: 'XYZ College, India',
    description: '',
  },
  {
    year: '2029 — 2031',
    role: 'MBA',
    company: 'XYZ College, India',
    description: '',
  },
  {
    year: '2024 — 2028',
    role: 'B.Tech — Computer Science & Engineering',
    company: 'MITS, Rayagada, Odisha',
    description: "Currently pursuing my Bachelor's degree with a focus on software development, web technologies, and computer science.",
  },
  {
    year: '2022 — 2024',
    role: 'Higher Secondary (+2) — Science',
    company: 'Odisha Adarsha Vidyalaya (OAV), Kolnara, Rayagada',
    description: '59%',
  },
  {
    year: '2022',
    role: 'Secondary School — 10th',
    company: 'Odisha Adarsha Vidyalaya (OAV), Kalyansingpur, Rayagada',
    description: '82%',
  }
];

const SPACING = 200; // pixels between each item
const TOTAL_HEIGHT = (experiences.length - 1) * SPACING;

const TimelineItem = ({ 
  exp, 
  index, 
  progress, 
  total 
}: { 
  exp: typeof experiences[0], 
  index: number, 
  progress: MotionValue<number>, 
  total: number 
}) => {
  const isEven = index % 2 === 0;

  const DIM_SHADOW = '0px 0px 5px 0px rgba(215,226,234,0.1)';
  const GLOW_SHADOW = '0px 0px 35px 8px rgba(215,226,234,1)';
  const DIM_BG = '#0C0C0C';
  const GLOW_BG = '#D7E2EA';

  // Flawless strictly-increasing arrays for Framer Motion WAAPI
  const input = Array.from({ length: total }, (_, i) => i / (total - 1));
  
  const opacityOutput = input.map((_, i) => (i === index ? 1 : 0.15));
  const scaleOutput = input.map((_, i) => (i === index ? 1 : 0.9));
  const dotScaleOutput = input.map((_, i) => (i === index ? 2.2 : 1));
  const dotBgOutput = input.map((_, i) => (i === index ? GLOW_BG : DIM_BG));
  const dotShadowOutput = input.map((_, i) => (i === index ? GLOW_SHADOW : DIM_SHADOW));

  const opacity = useTransform(progress, input, opacityOutput);
  const scale = useTransform(progress, input, scaleOutput);
  const dotScale = useTransform(progress, input, dotScaleOutput);
  const dotBg = useTransform(progress, input, dotBgOutput);
  const dotShadow = useTransform(progress, input, dotShadowOutput);

  return (
    <motion.div 
      style={{ opacity, scale, top: index * SPACING }} 
      className="absolute w-full flex items-start z-20"
    >
      {/* MOBILE LAYOUT: All right-aligned */}
      <div className="md:hidden w-full pl-[70px] pr-6 relative">
        <div className="absolute left-[30px] top-5 w-[24px] h-[2px] bg-[#D7E2EA]/30" />
        <motion.div 
          style={{ scale: dotScale, backgroundColor: dotBg, boxShadow: dotShadow }}
          className="absolute left-[24px] top-[14px] w-[12px] h-[12px] rounded-full border-2 border-[#D7E2EA]" 
        />
        
        <h3 className="font-kanit font-light text-3xl text-[#D7E2EA] mb-1">{exp.year}</h3>
        <h4 className="font-kanit font-semibold text-lg text-[#D7E2EA]/90 mb-1 leading-tight">{exp.role}</h4>
        <p className="font-light text-[#D7E2EA]/60 text-sm">
          {exp.company}
          {exp.description && <span className="block mt-1 opacity-80">{exp.description}</span>}
        </p>
      </div>

      {/* DESKTOP LAYOUT: Alternating */}
      <div className="hidden md:flex w-full">
        {/* Left Side */}
        <div className="w-1/2 relative pr-12 lg:pr-24">
          {isEven && (
            <div className="flex flex-col items-end text-right w-full">
              <div className="absolute right-0 top-5 w-8 lg:w-16 h-[2px] bg-[#D7E2EA]/30" />
              <motion.div 
                style={{ scale: dotScale, backgroundColor: dotBg, boxShadow: dotShadow }}
                className="absolute -right-[6px] top-[14px] w-[12px] h-[12px] rounded-full border-2 border-[#D7E2EA]" 
              />
              
              <h3 className="font-kanit font-light text-4xl lg:text-5xl text-[#D7E2EA] mb-2">{exp.year}</h3>
              <h4 className="font-kanit font-semibold text-xl lg:text-2xl text-[#D7E2EA]/90 mb-2 leading-tight max-w-[400px]">{exp.role}</h4>
              <p className="font-light text-[#D7E2EA]/60 text-base max-w-[360px]">
                {exp.company}
                {exp.description && <span className="block mt-2 opacity-80">{exp.description}</span>}
              </p>
            </div>
          )}
        </div>
        
        {/* Right Side */}
        <div className="w-1/2 relative pl-12 lg:pl-24">
          {!isEven && (
            <div className="flex flex-col items-start text-left w-full">
              <div className="absolute left-0 top-5 w-8 lg:w-16 h-[2px] bg-[#D7E2EA]/30" />
              <motion.div 
                style={{ scale: dotScale, backgroundColor: dotBg, boxShadow: dotShadow }}
                className="absolute -left-[6px] top-[14px] w-[12px] h-[12px] rounded-full border-2 border-[#D7E2EA]" 
              />
              
              <h3 className="font-kanit font-light text-4xl lg:text-5xl text-[#D7E2EA] mb-2">{exp.year}</h3>
              <h4 className="font-kanit font-semibold text-xl lg:text-2xl text-[#D7E2EA]/90 mb-2 leading-tight max-w-[400px]">{exp.role}</h4>
              <p className="font-light text-[#D7E2EA]/60 text-base max-w-[360px]">
                {exp.company}
                {exp.description && <span className="block mt-2 opacity-80">{exp.description}</span>}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceEducationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Fixed focal point near the top of the screen (e.g. 35vh)
  const FOCUS_VH = 35;

  // The entire timeline block translates UPWARDS out of the bottom of the screen
  const y = useTransform(scrollYProgress, [0, 1], [0, -TOTAL_HEIGHT]);
  
  // The bright "drawing" line dynamically grows downwards inside the sliding container,
  // connecting the very first dot to the currently active dot perfectly.
  const brightLineHeight = useTransform(scrollYProgress, [0, 1], [0, TOTAL_HEIGHT]);

  return (
    <section id="experience" className="bg-[#0C0C0C] relative z-30 -mb-[55vh]">
      <div ref={containerRef} className="h-[250vh]">
        
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C]">
          
          <div className="absolute top-12 sm:top-20 left-0 w-full px-6 sm:px-10 z-30 pointer-events-none">
            <FadeIn delay={0} y={40}>
              <h2
                className="hero-heading font-black uppercase text-center leading-none tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 60px)' }}
              >
                Education
              </h2>
            </FadeIn>
          </div>

          <div className="absolute left-0 w-full" style={{ top: `${FOCUS_VH}vh` }}>
            <motion.div style={{ y }} className="relative w-full max-w-5xl mx-auto h-0 z-20">
              
              {/* Background Dim Line spanning exactly the distance between first and last dot */}
              <div 
                className="absolute left-[30px] md:left-1/2 -translate-x-1/2 w-[2px] bg-[#D7E2EA]/10 z-0" 
                style={{ top: '20px', height: `${TOTAL_HEIGHT}px` }} 
              />

              {/* Bright Active Line tracking exactly from first dot to active dot */}
              <motion.div 
                style={{ height: brightLineHeight }}
                className="absolute left-[30px] md:left-1/2 -translate-x-1/2 top-[20px] w-[2px] bg-[#D7E2EA] shadow-[0_0_15px_#D7E2EA] z-10 origin-top"
              />

              {experiences.map((exp, index) => (
                <TimelineItem 
                  key={index} 
                  exp={exp} 
                  index={index} 
                  progress={scrollYProgress} 
                  total={experiences.length} 
                />
              ))}

              {/* Dividing line to cap off the timeline */}
              <div 
                className="absolute left-[30px] md:left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#D7E2EA]/30 to-transparent w-[80%] max-w-[600px]"
                style={{ top: `${TOTAL_HEIGHT + 220}px` }} 
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ExperienceEducationSection;
