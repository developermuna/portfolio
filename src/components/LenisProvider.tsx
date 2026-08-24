import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
    });

    // Expose lenis globally
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global scroll interceptor for hash links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          
          const targetHref = href === '#' ? '#home' : href;
          
          // Use both the Curve Swipe (liquid) and Dynamic Morphing (wave) styles
          const styles = ['liquid', 'wave'];
          const transitionStyle = styles[Math.floor(Math.random() * styles.length)];
          
          // Keep the multi-directional sweeps as requested previously
          const directions = ['bottom', 'top', 'left', 'right', 'top-left', 'bottom-right'];
          const randomDirection = directions[Math.floor(Math.random() * directions.length)];
          
          // Randomly decide if it should be a single layer wipe or a multi-layer cascade
          const layerType = Math.random() > 0.5 ? 'multi' : 'single';
          
          // Dispatch a global event to trigger the GSAP transition
          const event = new CustomEvent('trigger-curve-transition', { 
            detail: { target: targetHref, type: transitionStyle, direction: randomDirection, layerType: layerType } 
          });
          window.dispatchEvent(event);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  return <>{children}</>;
};

export default LenisProvider;
