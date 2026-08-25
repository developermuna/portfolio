import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useSupabaseData } from '../../hooks/useSupabaseData';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Design' },
  { id: 'app', label: 'App Design' },
  { id: 'interior', label: 'Interior Design' },
];

const AllProjectsPage = () => {
  const { projects } = useSupabaseData();
  const [activeCategory, setActiveCategory] = useState('all');

  // Parse URL search params or hash for category parameter and ensure page starts at top
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check search query (e.g. "?category=app") or hash (e.g. "#all-projects?category=app")
    const searchParams = new URLSearchParams(window.location.search);
    let categoryParam = searchParams.get('category');
    
    if (!categoryParam && window.location.hash.includes('?category=')) {
      categoryParam = window.location.hash.split('?category=')[1];
    }
    
    if (categoryParam && categories.some(c => c.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, []);

  const filteredProjects = useMemo(() => {
    return activeCategory === 'all' 
      ? projects 
      : projects.filter(p => p.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit pb-20 relative z-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-[#D7E2EA]/10 w-full pt-20 sm:pt-24 pb-4 px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.2 } }
            }}
          >
            <h1 className="hero-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase leading-none mb-2 overflow-hidden flex">
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
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full xl:w-auto mt-4 xl:mt-0">
            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-xs whitespace-nowrap transition-colors duration-300 flex-shrink-0 ${
                    activeCategory === cat.id 
                      ? 'bg-white text-[#0C0C0C]' 
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            
            <a 
              href="/#projects" 
              className="flex items-center justify-center gap-2 text-[#0C0C0C] bg-[#D7E2EA] hover:bg-white px-4 py-2 rounded-full transition-colors group flex-shrink-0 w-max text-xs sm:text-sm"
            >
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold tracking-wide uppercase">Back</span>
            </a>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-[1400px] mx-auto mt-8 px-6 sm:px-12 md:px-16 lg:px-24">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400 px-2 py-0.5 rounded-sm border border-white/10">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold uppercase tracking-wide mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed text-xs sm:text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <a
                    href={project.url || '#'}
                    target={project.url ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!project.url) {
                        e.preventDefault();
                        alert('Visit Site link is not available for this project.');
                      }
                    }}
                    className="mt-auto w-max rounded-full border border-gray-500 text-gray-300
                      font-medium uppercase tracking-widest
                      px-4 py-2 text-[10px] sm:text-xs flex items-center justify-center gap-2
                      cursor-pointer transition-all duration-300
                      hover:bg-white hover:text-black hover:border-white"
                  >
                    Visit Site
                  </a>
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
