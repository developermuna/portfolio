import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { projects } from '../data/portfolioData';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Design' },
  { id: 'app', label: 'App Design' },
  { id: 'interior', label: 'Interior Design' },
];

const AllProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Parse URL hash for category parameter and ensure page starts at top
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // The hash might look like "#all-projects?category=app"
    const hash = window.location.hash;
    if (hash.includes('?category=')) {
      const categoryParam = hash.split('?category=')[1];
      if (categories.some(c => c.id === categoryParam)) {
        setActiveCategory(categoryParam);
      }
    }
  }, []);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-[#D7E2EA]/10 w-full pt-24 sm:pt-32 pb-6 px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.2 } }
            }}
          >
            <h1 className="hero-heading font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-none mb-2 overflow-hidden flex">
              {"All Projects".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 100, rotate: 10 },
                    show: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', damping: 15, stiffness: 100 } }
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="text-[#D7E2EA]/60 max-w-xl text-sm sm:text-base font-light"
            >
              A complete archive of my work and digital experiences.
            </motion.p>
          </motion.div>
          <a 
            href="#projects" 
            className="flex items-center gap-2 text-[#0C0C0C] bg-[#D7E2EA] hover:bg-white px-5 py-2.5 rounded-full transition-colors group flex-shrink-0 w-max"
          >
            <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold tracking-wide uppercase text-xs sm:text-sm">Back to Projects</span>
          </a>
        </div>
        
        {/* Filter Tabs */}
        <div className="max-w-[1400px] mx-auto mt-8 flex gap-2 sm:gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-bold uppercase tracking-widest text-xs whitespace-nowrap transition-colors duration-300 ${
                activeCategory === cat.id 
                  ? 'bg-white text-[#0C0C0C]' 
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-[1400px] mx-auto mt-8 px-6 sm:px-12 md:px-16 lg:px-24">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.number}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col group cursor-pointer"
              >
                {/* Image Container */}
                <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative mb-6">
                  <div className="absolute inset-0 bg-[#0C0C0C]/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 backdrop-blur-md bg-[#0C0C0C]/50 px-3 py-1 rounded-full border border-white/10">
                    <span className="font-bold text-sm tracking-widest">{project.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#D7E2EA]/40 px-2 py-0.5 rounded-sm border border-white/10">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold uppercase tracking-wide mb-3 group-hover:text-white transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-[#D7E2EA]/60 font-light leading-relaxed text-sm mb-6 flex-1">
                    {project.description}
                  </p>
                  
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-auto w-max rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]
                        font-medium uppercase tracking-widest
                        px-6 py-2.5 text-xs
                        cursor-pointer transition-all duration-300
                        hover:bg-[#D7E2EA] hover:text-[#0C0C0C] hover:border-[#D7E2EA]"
                    >
                      Visit Site
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AllProjectsPage;
