import { motion } from 'framer-motion';

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Services', 'Testimonials', 'Contact'];

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[100] px-4 md:px-10 py-3 bg-[#0C0C0C]/80 backdrop-blur-md border-b border-[#D7E2EA]/10"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        
        {/* Nav Links */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider
                text-[10px] sm:text-xs md:text-sm lg:text-base
                transition-opacity duration-200 hover:opacity-70"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Download CV Button */}
        <a 
          href="/munakousalya CV.pdf" 
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2 bg-[#D7E2EA] text-[#0C0C0C] rounded-full font-semibold uppercase tracking-wide text-[10px] sm:text-xs md:text-sm hover:scale-105 transition-transform duration-300 whitespace-nowrap shadow-[0_0_15px_rgba(215,226,234,0.2)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          <span className="hidden sm:inline">Download CV</span>
          <span className="sm:hidden">CV</span>
        </a>

      </div>
    </motion.nav>
  );
};

export default Navbar;
