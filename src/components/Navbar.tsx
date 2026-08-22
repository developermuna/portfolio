import { motion } from 'framer-motion';

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Services', 'Testimonials', 'Contact'];

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[100] px-4 md:px-10 py-4 md:py-6 bg-[#0C0C0C]/80 backdrop-blur-md border-b border-[#D7E2EA]/10"
    >
      <div className="max-w-7xl mx-auto flex justify-center sm:justify-between items-center gap-4 flex-wrap">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider
              text-xs sm:text-sm md:text-base lg:text-lg
              transition-opacity duration-200 hover:opacity-70"
          >
            {link}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
