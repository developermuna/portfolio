import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouch) {
      setIsTouchDevice(true);
      return; // Do not attach any event listeners on touch devices!
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      
      if (
        target.tagName?.toLowerCase() === 'button' ||
        target.tagName?.toLowerCase() === 'a' ||
        target.closest?.('button') ||
        target.closest?.('a') ||
        target.closest?.('nav')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[60px] h-[60px] rounded-full border-2 border-white pointer-events-none z-[9999] overflow-hidden mix-blend-difference"
      animate={{
        x: mousePosition.x - 30,
        y: mousePosition.y - 30,
        scale: isHovering ? 0 : 1,
        opacity: isHovering ? 0 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      style={{ backdropFilter: 'url(#fluid-wave)' }}
    >
      <motion.div 
        className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ opacity: isHovering ? 0 : 1 }}
      />
    </motion.div>
  );
};

export default CustomCursor;
