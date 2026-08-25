import { useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import LetsTalkModal from '../LetsTalkModal';

const ContactMeButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Captures the global window scroll progress from 0 (top) to 1 (bottom)
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Open contact form"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100000] group cursor-pointer"
        // Floating animation continuously going up and down
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative px-4 sm:px-6 py-3 h-[48px] flex items-center justify-center bg-[#0C0C0C] rounded-full shadow-2xl overflow-visible">
          
          {/* SVG Progress Border */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Background Track (Very dim outline) */}
            <rect
              x="1.5" y="1.5"
              width="calc(100% - 3px)" height="calc(100% - 3px)"
              rx="22.5"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
            />
            {/* Active Progress Track with Glow */}
            <motion.rect
              x="1.5" y="1.5"
              width="calc(100% - 3px)" height="calc(100% - 3px)"
              rx="22.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              style={{ 
                pathLength: scrollYProgress,
                filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,0.8))'
              }}
              strokeLinecap="round"
            />
          </svg>

          {/* Content */}
          <span className="text-white font-kanit font-medium tracking-wide uppercase text-sm flex items-center gap-2 relative z-10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
              <rect x="3" y="5" width="18" height="14" rx="2" />
            </svg>
            <span className="hidden sm:inline">Contact Me</span>
            <span className="sm:hidden">Me</span>
          </span>
        </div>
      </motion.button>

      <LetsTalkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultMessage="Hi Muna, I'd like to get in touch with you."
      />
    </>
  );
};

export default ContactMeButton;
