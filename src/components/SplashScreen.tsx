import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const fullText = "MUNA'S ERA";

  useEffect(() => {
    // Lock body scroll while splash is active
    document.body.style.overflow = 'hidden';

    // Typewriter effect for MUNA'S ERA
    let charIndex = 0;
    const startDelay = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (charIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 55);
      return () => clearInterval(typeInterval);
    }, 300);

    const duration = 1500; // 1.5 seconds total loading time
    
    const finishTimeout = setTimeout(() => {
      // Trigger the GSAP Curve Transition
      const styles = ['liquid', 'wave'];
      const transitionStyle = styles[Math.floor(Math.random() * styles.length)];
      const directions = ['bottom', 'top', 'left', 'right', 'top-left', 'bottom-right'];
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      const layerType = Math.random() > 0.5 ? 'multi' : 'single';
      
      const event = new CustomEvent('trigger-curve-transition', { 
        detail: { isSplashExit: true, type: transitionStyle, direction: randomDirection, layerType } 
      });
      window.dispatchEvent(event);

      // Wait exactly until the screen is fully covered by GSAP before unmounting (approx 850ms)
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = ''; // Release scroll lock
      }, 850);
    }, duration + 200);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(finishTimeout);
      clearTimeout(startDelay);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="splash-container"
          className="fixed inset-0 z-[99999] h-[100dvh] w-screen bg-[#0C0C0C] flex flex-col items-center justify-center text-[#D7E2EA] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Instantly disappear underneath the GSAP cover
          transition={{ duration: 0 }}
        >
          <div className="flex flex-col items-center justify-center w-full max-w-lg px-4 sm:px-6">
            <motion.img
              src="https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/logo.png"
              alt="Muna Logo"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-4 shadow-[0_0_20px_rgba(215,226,234,0.1)] border border-[#D7E2EA]/20 bg-[#0C0C0C]"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-base font-light tracking-[0.3em] uppercase mb-2 opacity-70 whitespace-nowrap"
            >
              Welcome to
            </motion.p>
            <h1 className="text-[8vw] sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-8 flex items-center justify-center min-h-[1.2em] whitespace-nowrap text-center">
              <span>{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block w-[3px] sm:w-[4px] h-[0.8em] bg-[#D7E2EA] ml-1.5 align-middle"
              />
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
