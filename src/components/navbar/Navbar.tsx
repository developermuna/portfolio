import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Products', href: '/products' },
  { name: 'Testimonials', href: '/#testimonials' }
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Reusable Pill component for both desktop and mobile
  const ActionPill = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center bg-[#D7E2EA] p-1 rounded-full shadow-[0_0_15px_rgba(215,226,234,0.2)] hover:scale-105 transition-transform duration-300 ${className}`}>
      <a 
        href="/#services"
        onClick={() => setIsOpen(false)}
        className="flex items-center justify-center pl-3 pr-2 sm:pl-5 sm:pr-3 py-1.5 text-[#0C0C0C] font-bold uppercase tracking-wide text-xs md:text-sm whitespace-nowrap"
      >
        Services
      </a>
      <a 
        href="https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/MunaKousalya%20CV.pdf" 
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0C0C0C] text-[#D7E2EA] rounded-full font-semibold uppercase tracking-wide text-xs md:text-sm hover:bg-[#0C0C0C]/80 transition-colors whitespace-nowrap"
      >
        <span>CV</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
      </a>
    </div>
  );

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[100000] px-4 md:px-10 py-3 bg-[#0C0C0C] border-b border-[#D7E2EA]/10"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          
          <div className="flex items-center gap-8 sm:gap-10 md:gap-14">
            {/* Logo */}
            <a href="/" className="flex-shrink-0" onClick={() => setIsOpen(false)}>
              <img 
                src="https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/logo.png" 
                alt="Muna Logo" 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(215,226,234,0.1)] border border-[#D7E2EA]/20 bg-[#0C0C0C]"
              />
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-7 lg:gap-9">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm lg:text-base transition-opacity duration-200 hover:opacity-70"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop & Mobile Action Pill */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ActionPill />

            {/* Mobile Hamburger Toggle */}
            <button 
              className="md:hidden flex flex-col items-end justify-center w-10 h-10 p-2 gap-[5px] focus:outline-none group z-[100001]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className={`h-[2px] bg-[#D7E2EA] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6 group-hover:w-6'}`} />
              <div className={`h-[2px] bg-[#D7E2EA] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'w-0 opacity-0 translate-x-2' : 'w-5 group-hover:w-6'}`} />
              <div className={`h-[2px] bg-[#D7E2EA] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-4 group-hover:w-6'}`} />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 bottom-0 z-[90] bg-[#0C0C0C] flex flex-col items-center justify-center pt-16 pb-20 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-8 w-full">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: isOpen ? 0.1 + (i * 0.05) : 0, ease: [0.16, 1, 0.3, 1] }}
                  key={link.name}
                  className="w-full"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-[#D7E2EA] font-black uppercase tracking-widest text-2xl sm:text-3xl hover:text-white hover:scale-105 transition-all w-full text-center py-2"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
