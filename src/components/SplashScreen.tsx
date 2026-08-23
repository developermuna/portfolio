import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const fullText = "MUNA'S ERA";

  useEffect(() => {
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
    const intervalTime = 15; // 60fps update rate
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      // Smooth easing function (easeOutExpo) for the progress bar
      const t = currentStep / steps;
      const easedProgress = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      
      setProgress(easedProgress * 100);

      if (currentStep >= steps) {
        clearInterval(interval);
        setProgress(100);
        // Slight pause at 100% before sliding out
        setTimeout(() => setIsVisible(false), 200);
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      clearTimeout(startDelay);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#0C0C0C] flex flex-col items-center justify-center text-[#D7E2EA] overflow-hidden"
          initial={{ x: 0 }}
          exit={{ x: '100%' }} // Slides out to the right
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center justify-center w-full max-w-lg px-6">
            <motion.img
              src="/logo.png"
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
              className="text-sm sm:text-base font-light tracking-[0.3em] uppercase mb-2 opacity-70 whitespace-nowrap"
            >
              Welcome to
            </motion.p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-8 flex items-center justify-center min-h-[1.2em] whitespace-nowrap text-center">
              <span>{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block w-[3px] sm:w-[4px] h-[0.8em] bg-[#D7E2EA] ml-1.5 align-middle"
              />
            </h1>

            {/* Progress Bar Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-full flex flex-col items-center mt-2"
            >
              <div className="w-full h-[3px] bg-white/25 relative overflow-hidden rounded-full shadow-inner">
                {/* Progress Bar Fill */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="w-full flex justify-between items-center mt-2 px-0.5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D7E2EA]/40 font-mono">Loading</span>
                <span className="text-[11px] font-mono text-[#D7E2EA]/80 font-medium tracking-wider">
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
