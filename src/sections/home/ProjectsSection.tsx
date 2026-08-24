import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FadeIn from '../../components/common/FadeIn';

import { useSupabaseData, type Project } from '../../hooks/useSupabaseData';

gsap.registerPlugin(ScrollTrigger);

const HorizontalProjectCard = ({ project }: { project: Project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-[75vw] sm:w-[45vw] md:w-[32vw] lg:w-[24vw] flex-shrink-0 h-full flex flex-col justify-center px-3 sm:px-4">
      <div className="flex flex-col border border-[#D7E2EA]/10 rounded-3xl p-4 sm:p-5 h-[48vh] sm:h-[50vh] bg-[#111111]/80 hover:bg-[#1A1A1A] transition-colors duration-300 perspective-[1000px] shadow-2xl relative overflow-hidden group/card">
        
        {/* Subtle gradient glow inside card */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Project Image */}
        <motion.div 
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-full aspect-video rounded-2xl overflow-hidden mb-4 relative group flex-shrink-0 cursor-pointer shadow-lg"
        >
          <div className="absolute inset-0 bg-[#0C0C0C]/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </motion.div>

        {/* Content Container */}
        <div className="flex flex-col flex-grow justify-between relative z-10">
          <div>
            <div className="flex justify-between items-start w-full mb-3">
              <span
                className="hero-heading font-black leading-none opacity-40 text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
              >
                {project.number}
              </span>
              <span className="bg-[#D7E2EA]/10 text-[#D7E2EA] px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                {project.category}
              </span>
            </div>
            
            <h3
              className="font-bold uppercase text-[#D7E2EA] mb-2 leading-tight"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
            >
              {project.name}
            </h3>
            <p
              className="font-light leading-relaxed text-[#D7E2EA]/60 line-clamp-3 text-base sm:text-lg"
            >
              {project.description}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-4 pt-4 border-t border-[#D7E2EA]/10">
            <a
              href={project.url || '#'}
              target={project.url ? "_blank" : "_self"}
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!project.url) {
                  e.preventDefault();
                  alert('Visit Site link is not available for this project.');
                }
              }}
              className="flex items-center justify-between w-full text-[#D7E2EA] group/btn"
            >
              <span className="font-bold uppercase tracking-widest text-sm sm:text-base group-hover/btn:text-white transition-colors">
                View Project
              </span>
              <div className="w-8 h-8 rounded-full bg-[#D7E2EA]/10 flex items-center justify-center group-hover/btn:bg-[#D7E2EA] group-hover/btn:text-[#0C0C0C] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const { projects } = useSupabaseData();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const measure = () => setIsMobile(window.innerWidth < 768);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    // Wait for the DOM to be fully ready before calculating width
    const ctx = gsap.context(() => {
      // Disable GSAP horizontal scroll translation on mobile
      if (isMobile) return;

      const getScrollAmount = () => {
        if (!trackRef.current) return 0;
        const trackWidth = trackRef.current.scrollWidth;
        const lastChild = trackRef.current.lastElementChild as HTMLElement;
        
        if (!lastChild) {
          return -(trackWidth - window.innerWidth);
        }
        
        const lastChildWidth = lastChild.offsetWidth;
        const scrollX = trackWidth - (lastChildWidth / 2) - (window.innerWidth / 2);
        
        return -Math.max(0, scrollX);
      };

      gsap.to(trackRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true, // Recalculate on resize
        }
      });
    }, containerRef);
    
    return () => ctx.revert(); // Cleanup GSAP
  }, [isMobile, projects.length]); // Re-run effect when mobile state changes or projects update

  return (
    <section id="projects" className="bg-[#0C0C0C] relative z-20">
      <div 
        ref={containerRef} 
        className={`h-[75vh] sm:h-screen w-full flex flex-col justify-center rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] ${isMobile ? '' : 'overflow-hidden'}`}
      >
        
        {/* Absolute positioned header so it stays put while cards slide under/past it */}
        <div className="absolute top-20 sm:top-24 left-0 w-full px-5 sm:px-10 z-10 pointer-events-none">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 60px)' }}
            >
              Projects
            </h2>
          </FadeIn>
        </div>

        {/* The moving horizontal track */}
        <div 
          ref={trackRef} 
          className={`flex h-full items-start pt-40 sm:items-center pb-6 sm:pt-64 sm:pb-16 px-5 sm:px-10 ${isMobile ? 'overflow-x-auto overflow-y-hidden snap-x snap-mandatory [&::-webkit-scrollbar]:hidden w-full' : 'w-max'}`}
        >
          {/* Project Cards */}
          {projects.slice(0, 5).map((project) => (
            <div key={project.number} className={isMobile ? 'snap-center' : ''}>
              <HorizontalProjectCard project={project} />
            </div>
          ))}

          {/* Final "Show More" Card */}
          <div className={`w-[75vw] sm:w-[45vw] md:w-[32vw] lg:w-[24vw] flex-shrink-0 flex flex-col sm:h-full items-center sm:justify-center px-3 sm:px-4 ${isMobile ? 'snap-center' : ''}`}>
            <div className="flex flex-col items-center justify-center gap-8 border-2 border-[#D7E2EA]/10 rounded-3xl w-full h-[48vh] sm:h-[50vh] bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/10 transition-colors duration-300">
              <h3 className="text-[#D7E2EA] font-medium text-2xl sm:text-3xl uppercase tracking-widest text-center">
                More Projects
              </h3>
              <a
                href="/projects"
                className="rounded-full bg-[#D7E2EA] text-[#0C0C0C]
                  font-bold uppercase tracking-widest
                  px-8 py-4 text-sm sm:text-base
                  cursor-pointer transition-transform duration-200 hover:scale-105 shadow-xl"
              >
                Show More
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ProjectsSection;
