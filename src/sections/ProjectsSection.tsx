import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FadeIn from '../components/FadeIn';

import { getProjects, type Project } from '../utils/dataStore';

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
    <div className="w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] flex-shrink-0 h-full flex flex-col justify-center px-4 sm:px-6">
      <div className="flex flex-col gap-3 sm:gap-4 border-l-2 border-[#D7E2EA]/20 pl-4 sm:pl-6 py-4 h-[55vh] sm:h-[45vh] justify-center perspective-[1000px]">
        
        {/* Project Image */}
        <motion.div 
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-full h-40 sm:h-48 md:h-56 rounded-2xl overflow-hidden mb-2 relative group flex-shrink-0 cursor-pointer"
        >
          <div className="absolute inset-0 bg-[#0C0C0C]/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </motion.div>

        {/* Top Info Row: Number and Visit Button */}
        <div className="flex justify-between items-center w-full">
          <span
            className="hero-heading font-black leading-none opacity-50"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 40px)' }}
          >
            {project.number}
          </span>
          
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
            className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA]
              font-medium uppercase tracking-widest
              px-4 py-1.5 sm:px-5 sm:py-2 w-max
              text-[9px] sm:text-[10px] flex items-center justify-center gap-2
              cursor-pointer transition-colors duration-200
              hover:bg-[#D7E2EA] hover:text-[#0C0C0C]"
          >
            Visit Site
          </a>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3
            className="font-medium uppercase text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}
          >
            {project.name}
          </h3>
          <p
            className="font-light leading-relaxed text-[#D7E2EA] opacity-60 line-clamp-3"
            style={{ fontSize: 'clamp(0.8rem, 1vw, 0.95rem)' }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const projects = getProjects();
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
  }, [isMobile]); // Re-run effect when mobile state changes the items array length

  return (
    <section id="projects" className="bg-[#0C0C0C] relative z-20">
      <div ref={containerRef} className="h-screen w-full overflow-hidden flex flex-col justify-center rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C]">
        
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
        <div ref={trackRef} className="flex h-full items-center pt-48 pb-10 sm:pt-64 sm:pb-16 px-5 sm:px-10 w-max">
          {/* Project Cards */}
          {(isMobile ? projects.slice(0, 2) : projects.slice(0, 5)).map((project) => (
            <HorizontalProjectCard key={project.number} project={project} />
          ))}

          {/* Final "Show More" Card */}
          <div className="w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] flex-shrink-0 h-full flex flex-col items-center justify-center px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center gap-8 border-2 border-[#D7E2EA]/10 rounded-3xl w-full h-[55vh] sm:h-[45vh] bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/10 transition-colors duration-300">
              <h3 className="text-[#D7E2EA] font-medium text-2xl sm:text-3xl uppercase tracking-widest text-center">
                More Projects
              </h3>
              <a
                href="#all-projects"
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
