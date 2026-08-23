import { motion } from 'framer-motion';

const navLinks = ['About', 'Skills', 'Projects', 'Experience'];

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[100] px-4 md:px-10 py-3 bg-[#0C0C0C]/80 backdrop-blur-md border-b border-[#D7E2EA]/10"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        {/* Left Side: Logo + Nav Links */}
        <div className="flex items-center gap-8 sm:gap-10 md:gap-14 flex-wrap">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Muna Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(215,226,234,0.1)] border border-[#D7E2EA]/20 bg-[#0C0C0C]"
            />
          </a>

          {/* Nav Links */}
          <div className="flex items-center gap-5 sm:gap-7 md:gap-9 flex-wrap">
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
        </div>

        {/* Services & CV Action Pill */}
        <div className="flex items-center bg-[#D7E2EA] p-1 rounded-full shadow-[0_0_15px_rgba(215,226,234,0.2)] hover:scale-105 transition-transform duration-300">
          <a 
            href="#services"
            className="flex items-center justify-center pl-3 pr-2 sm:pl-5 sm:pr-3 py-1.5 text-[#0C0C0C] font-bold uppercase tracking-wide text-[10px] sm:text-xs md:text-sm whitespace-nowrap"
          >
            Services
          </a>
          <a 
            href="/MunaKousalya%20CV.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0C0C0C] text-[#D7E2EA] rounded-full font-semibold uppercase tracking-wide text-[10px] sm:text-xs md:text-sm hover:bg-[#0C0C0C]/80 transition-colors whitespace-nowrap"
          >
            <span>CV</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-3.5 sm:h-3.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          </a>
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;
