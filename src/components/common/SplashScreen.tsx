import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isMinTimeElapsed, setIsMinTimeElapsed] = useState(false);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const fullText = "MUNA'S ERA";

  // Typewriter and Timer Effect
  useEffect(() => {
    document.body.style.overflow = 'hidden';

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

    const minTime = setTimeout(() => setIsMinTimeElapsed(true), 1500);

    const handleHeroLoaded = (e: any) => {
      const { loaded, total } = e.detail;
      setProgress(Math.round((loaded / total) * 100));
      if (loaded >= total) {
        setIsHeroLoaded(true);
      }
    };
    window.addEventListener('hero-image-loaded', handleHeroLoaded);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(minTime);
      window.removeEventListener('hero-image-loaded', handleHeroLoaded);
      document.body.style.overflow = '';
    };
  }, []);

  // Exit Effect
  useEffect(() => {
    if (isMinTimeElapsed && isHeroLoaded && isVisible) {
      const styles = ['liquid', 'wave'];
      const transitionStyle = styles[Math.floor(Math.random() * styles.length)];
      const directions = ['bottom', 'top', 'left', 'right', 'top-left', 'bottom-right'];
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      const layerType = Math.random() > 0.5 ? 'multi' : 'single';
      
      const event = new CustomEvent('trigger-curve-transition', { 
        detail: { isSplashExit: true, type: transitionStyle, direction: randomDirection, layerType } 
      });
      window.dispatchEvent(event);

      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 850);
    }
  }, [isMinTimeElapsed, isHeroLoaded, isVisible]);

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
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-32 sm:w-48 h-1 bg-[#D7E2EA]/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#D7E2EA]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
            <p className="text-[#D7E2EA]/50 text-xs sm:text-sm font-light tracking-widest uppercase">
              {progress === 100 ? 'Ready' : `Loading ${progress}%`}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
