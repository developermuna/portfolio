import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import InfinityBlackHole from '../components/InfinityBlackHole';
import { MapPin, Code2, Layers, Cpu } from 'lucide-react';

const techStack = [
  { name: 'React', icon: <Code2 size={16} /> },
  { name: 'Node.js', icon: <Cpu size={16} /> },
  { name: 'Supabase', icon: <Layers size={16} /> },
  { name: 'Cloudflare', icon: <Cpu size={16} /> },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative w-full bg-transparent text-[#D7E2EA]
        flex flex-col lg:flex-row items-center justify-center
        pt-4 pb-16 px-6 sm:px-12 md:px-16 lg:px-20 lg:py-0
        min-h-screen lg:h-screen lg:max-h-screen z-30"
    >

      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 h-full items-center relative">
        
        {/* LEFT COLUMN: Typography & Content (7 cols on desktop) */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-7 justify-center h-full lg:pr-10 xl:pr-20 relative z-40 pt-10 lg:pt-0">
          
          <FadeIn delay={0.1} y={20}>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#D7E2EA]/50" />
              <span className="text-[#D7E2EA]/70 uppercase tracking-[0.3em] text-xs font-bold">
                About Me
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <h2 className="hero-heading font-black leading-[1.1] tracking-tight text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.5vw] xl:text-[5vw] uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] to-[#8892A0]">
              I build digital experiences that turn ideas into reality.
            </h2>
          </FadeIn>

          <FadeIn delay={0.3} y={30} className="flex flex-col gap-5 sm:gap-6 max-w-2xl">
            <p className="text-[#D7E2EA]/80 font-light text-base sm:text-lg lg:text-xl leading-relaxed">
              I’m a Computer Science Engineering student and self-driven developer focused on building modern, responsive, and production-ready digital experiences. I enjoy turning ideas into clean interfaces, scalable web applications, and interactive products.
            </p>
            <p className="text-[#D7E2EA]/60 font-light text-sm sm:text-base lg:text-lg leading-relaxed">
              <strong className="text-[#D7E2EA]/90 font-medium">Current focus:</strong> Building real-world projects, expanding my full-stack skills, and turning creative ideas into useful digital products.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} y={20} className="flex flex-wrap items-center gap-6 mt-4 sm:mt-6">
            <div className="flex items-center gap-2 text-[#D7E2EA]/50 font-medium text-sm tracking-wide uppercase">
              <MapPin size={16} />
              <span>Odisha, India</span>
            </div>
          </FadeIn>
        </div>

        {/* RIGHT COLUMN: Visuals (Background on mobile, 5 cols on desktop) */}
        <div className="absolute inset-0 lg:relative lg:inset-auto w-full h-full lg:h-[75vh] lg:col-span-5 flex items-center justify-center lg:justify-end z-0 lg:z-10 pointer-events-none lg:pointer-events-auto overflow-hidden lg:overflow-visible opacity-30 lg:opacity-100">
          
          {/* Black Hole Animation Container */}
          <div className="relative w-[150vw] sm:w-[100vw] lg:w-full max-w-[600px] lg:max-w-[500px] h-[150vw] sm:h-[100vw] lg:h-[500px] flex-shrink-0">
            <InfinityBlackHole />
          </div>

          {/* Floating Tech Badges - Hide on mobile since it's background */}
          <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block">
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ 
                  duration: 4 + idx, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: idx * 0.5
                }}
                className={`absolute pointer-events-auto flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#0C0C0C]/40 backdrop-blur-md border border-[#D7E2EA]/10 text-[#D7E2EA]/90 font-medium text-xs sm:text-sm shadow-2xl transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 hover:scale-105 cursor-default
                  ${idx === 0 ? 'top-[15%] -left-[5%] sm:-left-[10%]' : ''}
                  ${idx === 1 ? 'top-[45%] -right-[5%] sm:-right-[10%]' : ''}
                  ${idx === 2 ? 'bottom-[25%] -left-[10%] sm:-left-[15%]' : ''}
                  ${idx === 3 ? 'bottom-[10%] right-[5%] sm:right-[15%]' : ''}
                `}
              >
                <span className="text-[#D7E2EA]/70">{tech.icon}</span>
                {tech.name}
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
