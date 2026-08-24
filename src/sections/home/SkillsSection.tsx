import { motion } from 'framer-motion';
import FadeIn from '../../components/common/FadeIn';
import { skillCategories } from '../../data/portfolioData';
import { Sparkles, Monitor, Smartphone, Cloud, Cuboid } from 'lucide-react';

const getBrandIcon = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes('react')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg';
  if (s.includes('javascript')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg';
  if (s.includes('node')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg';
  if (s.includes('express')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg'; 
  if (s.includes('mongo')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg';
  if (s.includes('flutter')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg';
  if (s.includes('github')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg';
  if (s.includes('vercel')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg';
  if (s.includes('blender')) return 'https://cdn.simpleicons.org/blender/0C0C0C';
  if (s.includes('revit')) return 'https://cdn.simpleicons.org/autodeskrevit/0C0C0C';
  if (s.includes('sketchup')) return 'https://cdn.simpleicons.org/sketchup/0C0C0C';
  return '';
};

const SkillsSection = () => {
  const ai = skillCategories[4];
  const tools = skillCategories[5];
  const core = skillCategories[6];

  return (
    <section 
      id="skills" 
      className="bg-white relative z-30 flex flex-col min-h-screen pt-12 sm:pt-24 pb-16 px-6 sm:px-12 lg:px-20"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col h-full gap-6 sm:gap-10 lg:gap-16">
        
        {/* Minimal Header & Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-6 lg:gap-10 border-b border-[#0C0C0C]/10 pb-6">
          <FadeIn delay={0.1} y={10}>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={16} className="text-[#0C0C0C]/50" />
              <span className="text-[#0C0C0C]/50 uppercase tracking-[0.3em] text-sm font-bold">My Tech Universe</span>
            </div>
            <h2 className="font-kanit font-black uppercase text-[#0C0C0C] text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none">
              Skills & Experience
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={10} className="flex items-center gap-4 sm:gap-12">
             <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl font-kanit font-black text-[#0C0C0C] leading-none">10<span className="text-[#0C0C0C]/30">+</span></span>
                <span className="text-[#0C0C0C]/50 uppercase tracking-[0.2em] text-xs mt-2 font-bold">Projects</span>
             </div>
             <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl font-kanit font-black text-[#0C0C0C] leading-none">2<span className="text-[#0C0C0C]/30">+</span></span>
                <span className="text-[#0C0C0C]/50 uppercase tracking-[0.2em] text-xs mt-2 font-bold">Years Exp</span>
             </div>
             <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl font-kanit font-black text-[#0C0C0C] leading-none">20<span className="text-[#0C0C0C]/30">+</span></span>
                <span className="text-[#0C0C0C]/50 uppercase tracking-[0.2em] text-xs mt-2 font-bold">Technologies</span>
             </div>
          </FadeIn>
        </div>

        {/* The Big Icons - Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 sm:pb-0">
          
          <motion.div whileHover={{ y: -5 }} className="flex flex-col gap-4 sm:gap-6 group min-w-[260px] sm:min-w-0 snap-center">
            <div className="flex items-center gap-3 text-[#0C0C0C]/40">
              <Monitor size={18} strokeWidth={2} />
              <span className="uppercase tracking-[0.2em] text-xs font-bold">Full-Stack MERN</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
               <img src={getBrandIcon('mongo')} className="w-8 h-8 sm:w-12 sm:h-12 object-contain brightness-0 opacity-80 group-hover:opacity-100 transition-opacity" alt="MongoDB" />
               <img src={getBrandIcon('express')} className="w-8 h-8 sm:w-12 sm:h-12 object-contain brightness-0 opacity-80 group-hover:opacity-100 transition-opacity" alt="Express" />
               <img src={getBrandIcon('react')} className="w-8 h-8 sm:w-12 sm:h-12 object-contain brightness-0 opacity-80 group-hover:opacity-100 transition-opacity" alt="React" />
               <img src={getBrandIcon('node')} className="w-8 h-8 sm:w-12 sm:h-12 object-contain brightness-0 opacity-80 group-hover:opacity-100 transition-opacity" alt="Node" />
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="flex flex-col gap-4 sm:gap-6 group min-w-[260px] sm:min-w-0 snap-center">
            <div className="flex items-center gap-3 text-[#0C0C0C]/40">
              <Smartphone size={18} strokeWidth={2} />
              <span className="uppercase tracking-[0.2em] text-xs font-bold">Cross-Platform App</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
               <img src={getBrandIcon('flutter')} className="w-8 h-8 sm:w-12 sm:h-12 object-contain brightness-0 opacity-80 group-hover:opacity-100 transition-opacity" alt="Flutter" />
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="flex flex-col gap-4 sm:gap-6 group min-w-[260px] sm:min-w-0 snap-center">
            <div className="flex items-center gap-3 text-[#0C0C0C]/40">
              <Cuboid size={18} strokeWidth={2} />
              <span className="uppercase tracking-[0.2em] text-xs font-bold">3D & Architecture</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
               <img src={getBrandIcon('revit')} className="w-8 h-8 sm:w-12 sm:h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity" alt="Revit" />
               <img src={getBrandIcon('sketchup')} className="w-8 h-8 sm:w-12 sm:h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity" alt="Sketchup" />
               <img src={getBrandIcon('blender')} className="w-8 h-8 sm:w-12 sm:h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity" alt="Blender" />
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="flex flex-col gap-4 sm:gap-6 group min-w-[260px] sm:min-w-0 snap-center">
            <div className="flex items-center gap-3 text-[#0C0C0C]/40">
              <Cloud size={18} strokeWidth={2} />
              <span className="uppercase tracking-[0.2em] text-xs font-bold">Cloud & DevOps</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
               <img src={getBrandIcon('vercel')} className="w-8 h-8 sm:w-12 sm:h-12 object-contain brightness-0 opacity-80 group-hover:opacity-100 transition-opacity" alt="Vercel" />
               <img src={getBrandIcon('github')} className="w-8 h-8 sm:w-12 sm:h-12 object-contain brightness-0 opacity-80 group-hover:opacity-100 transition-opacity" alt="GitHub" />
            </div>
          </motion.div>
        </div>

        {/* Minimal Bottom Grid: Workflow, Tags, Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-8 pt-6 sm:pt-8 border-t border-[#0C0C0C]/10">
          
          {/* Workflow */}
          <div className="flex flex-col gap-5 overflow-hidden">
            <span className="text-[#0C0C0C]/40 uppercase tracking-[0.2em] text-xs font-bold">Development Workflow</span>
            <div className="flex flex-row sm:flex-col gap-4 sm:gap-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 [scrollbar-width:none]">
              {['01. Design & Plan', '02. Develop', '03. Test & QA', '04. CI/CD Deploy'].map((step) => (
                <div key={step} className="text-[#0C0C0C]/80 font-medium text-base tracking-wide whitespace-nowrap snap-start bg-[#0C0C0C]/5 sm:bg-transparent px-3 py-1.5 sm:px-0 sm:py-0 rounded-md sm:rounded-none">{step}</div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-5 overflow-hidden">
            <span className="text-[#0C0C0C]/40 uppercase tracking-[0.2em] text-xs font-bold">Additional Competencies</span>
            <div className="flex flex-row sm:flex-col gap-6 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 [scrollbar-width:none]">
              {[ai, tools, core].map((cat, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:flex-wrap gap-2 min-w-[75vw] sm:min-w-0 snap-start">
                  <span className="text-[#0C0C0C]/60 text-sm sm:text-base font-bold mr-2 mb-1 sm:mb-0">{cat.title}:</span>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill: string) => (
                      <span key={skill} className="text-[#0C0C0C] text-sm sm:text-base font-medium bg-[#0C0C0C]/5 sm:bg-transparent px-2 py-1 sm:px-0 sm:py-0 rounded-md sm:rounded-none">
                        {skill} <span className="text-[#0C0C0C]/20 ml-1 font-normal hidden sm:inline">•</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Details */}
          <div className="flex flex-col gap-6">
            <span className="text-[#0C0C0C]/40 uppercase tracking-[0.2em] text-xs sm:text-sm font-bold">Personal</span>
            <div className="flex flex-col gap-4 text-base text-[#0C0C0C] font-medium leading-relaxed">
              <div><strong className="text-[#0C0C0C]/50 font-bold mr-2 uppercase text-sm tracking-widest">Programming:</strong> C, Java, Python, JavaScript</div>
              <div><strong className="text-[#0C0C0C]/50 font-bold mr-2 uppercase text-sm tracking-widest">Spoken:</strong> Odia (Native), English, Hindi</div>
              <div><strong className="text-[#0C0C0C]/50 font-bold mr-2 uppercase text-sm tracking-widest">Interests:</strong> Coding, Drawing, Tech Enthusiast, Tech Explorer</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
