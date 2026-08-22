import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const projects = [
  {
    number: '01',
    name: 'Bakery Website',
    description:
      'A delightful bakery showcase with an elegant product catalog, online ordering system, and warm brand identity that brings the in-store experience online.',
    url: 'https://bakery.munakousalya.online',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '02',
    name: 'Muna Kousalya',
    description:
      'A polished personal portfolio and business website featuring project showcases, service offerings, and a refined visual identity built to impress.',
    url: 'https://munakousalya.online',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '03',
    name: 'NovaTech Solutions',
    description:
      'A sleek SaaS landing page for a tech startup featuring animated hero sections, interactive pricing tables, and conversion-optimized user flows.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '04',
    name: 'GreenLeaf Interiors',
    description:
      'An immersive interior design portfolio with 3D room visualizations, before-and-after galleries, and a consultation booking system.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
  },
  {
    number: '05',
    name: 'CloudSync Dashboard',
    description:
      'A data-driven web application dashboard with real-time analytics charts, team collaboration tools, and a clean, intuitive admin interface.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  }
];

const HorizontalProjectCard = ({ project }: { project: typeof projects[0] }) => {
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
    <div className="w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] flex-shrink-0 h-full flex flex-col justify-center px-4 sm:px-6">
      <div className="flex flex-col gap-3 sm:gap-4 border-l-2 border-[#D7E2EA]/20 pl-4 sm:pl-6 py-4 h-[60vh] sm:h-[50vh] justify-center perspective-[1000px]">
        
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

        {/* Project Number (Reduced Size) */}
        <span
          className="hero-heading font-black leading-none opacity-50"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 40px)' }}
        >
          {project.number}
        </span>
        
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
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA]
                font-medium uppercase tracking-widest
                px-5 py-2 sm:px-6 sm:py-2.5 w-max
                text-[10px] sm:text-xs
                cursor-pointer transition-colors duration-200
                hover:bg-[#D7E2EA] hover:text-[#0C0C0C]"
            >
              Visit Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We track the scroll progress of the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Map the vertical scroll (0 to 1) to horizontal translation
  // We translate left by an amount that reveals all cards.
  // 6 cards total (5 projects + 1 show more button).
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-85%']);

  return (
    <section id="projects" className="bg-[#0C0C0C] relative z-20">
      {/* Tall container to enable vertical scrolling for the horizontal effect */}
      <div ref={containerRef} className="h-[400vh]">
        
        {/* Sticky viewport-sized container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center
          rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C]"
        >
          
          {/* Absolute positioned header so it stays put while cards slide under/past it */}
          <div className="absolute top-16 sm:top-24 left-0 w-full px-5 sm:px-10 z-10 pointer-events-none">
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
          <motion.div style={{ x }} className="flex h-full items-center pt-20 sm:pt-32 px-5 sm:px-10">
            {/* Project Cards */}
            {projects.map((project) => (
              <HorizontalProjectCard key={project.number} project={project} />
            ))}

            {/* Final "Show More" Card */}
            <div className="w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] flex-shrink-0 h-full flex flex-col items-center justify-center px-4 sm:px-8">
              <div className="flex flex-col items-center justify-center gap-8 border-2 border-[#D7E2EA]/10 rounded-3xl w-full h-[60vh] sm:h-[50vh] bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/10 transition-colors duration-300">
                <h3 className="text-[#D7E2EA] font-medium text-2xl sm:text-3xl uppercase tracking-widest text-center">
                  More Projects
                </h3>
                <a
                  href="#"
                  className="rounded-full bg-[#D7E2EA] text-[#0C0C0C]
                    font-bold uppercase tracking-widest
                    px-8 py-4 text-sm sm:text-base
                    cursor-pointer transition-transform duration-200 hover:scale-105 shadow-xl"
                >
                  Show More
                </a>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
