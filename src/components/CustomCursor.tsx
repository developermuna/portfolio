import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      } else if ('clientX' in e) {
        setMousePosition({ x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY });
      }
    };

    const handleMouseOver = (e: MouseEvent | TouchEvent) => {
      let target = e.target as HTMLElement;
      if ('touches' in e && e.touches.length > 0) {
        const touch = e.touches[0];
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        if (el) target = el as HTMLElement;
      }
      
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

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('touchmove', updateMousePosition, { passive: true });
    window.addEventListener('touchstart', updateMousePosition, { passive: true });
    window.addEventListener('touchmove', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchmove', updateMousePosition);
      window.removeEventListener('touchstart', updateMousePosition);
      window.removeEventListener('touchmove', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[60px] h-[60px] rounded-full border-2 border-white pointer-events-none z-[9999] overflow-hidden mix-blend-difference"
      animate={{
        x: mousePosition.x - 30,
        y: mousePosition.y - 30,
        scale: isHovering ? 0 : 1,
        opacity: isHovering ? 0 : 1,
      }}
      transition={
        window.innerWidth < 768 
          ? { type: 'tween', duration: 0 } 
          : { type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }
      }
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
