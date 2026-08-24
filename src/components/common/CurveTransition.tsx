import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function CurveTransition() {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);
  const containerRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const handleTransition = (e: CustomEvent) => {
      const targetHash = e.detail?.target || e.detail;
      const transitionType = e.detail?.type || 'liquid';
      const direction = e.detail?.direction || 'bottom';
      const layerType = e.detail?.layerType || 'multi';
      const isSplashExit = e.detail?.isSplashExit || false;
      
      console.log(`GSAP ${transitionType} Transition from ${direction} (${layerType}) Triggered for:`, isSplashExit ? 'Splash Exit' : targetHash);

      // Calculate rotation based on direction
      let rotation = 0;
      switch (direction) {
        case 'bottom': rotation = 0; break;
        case 'top': rotation = 180; break;
        case 'left': rotation = 90; break;
        case 'right': rotation = 270; break;
        case 'top-left': rotation = 135; break;
        case 'bottom-right': rotation = 315; break;
        default: rotation = 0;
      }

      if (containerRef.current) {
        containerRef.current.style.display = 'flex';
        // Apply the rotation dynamically for this specific click
        containerRef.current.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
      }
      
      let initialPath, curveUpPath, fullPath, curveOutPath, finalPath;

      if (transitionType === 'wave') {
        initialPath   = `M 0 100 C 30 100 70 100 100 100 L 100 100 C 70 100 30 100 0 100 Z`;
        curveUpPath   = `M 0 50 C 30 0 70 100 100 50 L 100 100 C 70 100 30 100 0 100 Z`;
        fullPath      = `M 0 0 C 30 0 70 0 100 0 L 100 100 C 70 100 30 100 0 100 Z`;
        curveOutPath  = `M 0 0 C 30 0 70 0 100 0 L 100 50 C 70 100 30 0 0 50 Z`;
        finalPath     = `M 0 0 C 30 0 70 0 100 0 L 100 0 C 70 0 30 0 0 0 Z`;
      } else if (transitionType === 'sweep') {
        initialPath   = `M 0 100 L 100 100 L 100 100 L 0 100 Z`;
        curveUpPath   = `M 0 50 L 100 80 L 100 100 L 0 100 Z`; 
        fullPath      = `M 0 0 L 100 0 L 100 100 L 0 100 Z`;
        curveOutPath  = `M 0 0 L 100 0 L 100 20 L 0 50 Z`; 
        finalPath     = `M 0 0 L 100 0 L 100 0 L 0 0 Z`;
      } else {
        initialPath   = `M 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100 Z`;
        curveUpPath   = `M 0 50 Q 50 0 100 50 L 100 100 Q 50 100 0 100 Z`;
        fullPath      = `M 0 0 Q 50 0 100 0 L 100 100 Q 50 100 0 100 Z`;
        curveOutPath  = `M 0 0 Q 50 0 100 0 L 100 50 Q 50 0 0 50 Z`;
        finalPath     = `M 0 0 Q 50 0 100 0 L 100 0 Q 50 0 0 0 Z`;
      }

      // Configure paths based on single or multi layer wipe
      let paths: (SVGPathElement | null)[] = [];
      if (layerType === 'single') {
        if (path1Ref.current) path1Ref.current.style.display = 'none';
        if (path2Ref.current) path2Ref.current.style.display = 'none';
        paths = [path3Ref.current];
      } else {
        if (path1Ref.current) path1Ref.current.style.display = 'block';
        if (path2Ref.current) path2Ref.current.style.display = 'block';
        paths = [path1Ref.current, path2Ref.current, path3Ref.current];
      }

      gsap.set(paths, { attr: { d: initialPath } });

      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        }
      });

      tl.to(paths, {
        duration: 0.45,
        attr: { d: curveUpPath },
        ease: "power2.in",
        stagger: 0.08
      })
      .to(paths, {
        duration: 0.4,
        attr: { d: fullPath },
        ease: "power2.out",
        stagger: 0.08,
      }, "-=0.1")
      .add(() => {
          if (!isSplashExit) {
            if (targetHash.startsWith('/')) {
              // React router navigation
              const [path, hashPart] = targetHash.split('#');
              const finalPath = hashPart ? `${path}#${hashPart}` : path;
              navigateRef.current(finalPath);
              
              setTimeout(() => {
                if (!hashPart) {
                  window.scrollTo(0, 0);
                  if ((window as any).lenis) {
                    (window as any).lenis.scrollTo(0, { immediate: true });
                  }
                } else {
                  const newEl = document.getElementById(hashPart);
                  if (newEl) {
                    if ((window as any).lenis) {
                      (window as any).lenis.scrollTo(newEl, { immediate: true, offset: 0 });
                    } else {
                      newEl.scrollIntoView();
                    }
                  }
                }
              }, 50);
            } else {
              // Legacy hash navigation
              window.location.hash = targetHash === '#home' ? '' : targetHash;
              setTimeout(() => {
                try {
                  const isDedicatedPage = ['#privacy', '#terms', '#refund', '#admin', '#all-projects', '#all-products'].some(route => targetHash.startsWith(route));
                  if (isDedicatedPage || targetHash === '#home') {
                    window.scrollTo(0, 0);
                    if ((window as any).lenis) {
                      (window as any).lenis.scrollTo(0, { immediate: true });
                    }
                    return;
                  }

                  const cleanHash = targetHash.split('?')[0];
                  const newEl = document.querySelector(cleanHash);
                  if (newEl) {
                    if ((window as any).lenis) {
                      (window as any).lenis.scrollTo(newEl, { immediate: true, offset: 0 });
                    } else {
                      newEl.scrollIntoView();
                    }
                  }
                } catch (err) {
                  console.error('CurveTransition navigation error:', err);
                }
              }, 30); // 30ms is just enough for React to process the hash change
            }
          }
      }, "-=0.2") // Trigger scroll/hash slightly before fully covered
      .to(paths, {
        duration: 0.45,
        attr: { d: curveOutPath },
        ease: "power2.in",
        stagger: 0.08
      }, "-=0.15") // Start sweeping away immediately, no waiting on the white screen
      .to(paths, {
        duration: 0.4,
        attr: { d: finalPath },
        ease: "power2.out",
        stagger: 0.08
      }, "-=0.1");
    };

    window.addEventListener('trigger-curve-transition', handleTransition as EventListener);
    return () => window.removeEventListener('trigger-curve-transition', handleTransition as EventListener);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed pointer-events-none" 
      style={{ 
        display: 'none', 
        zIndex: 999999,
        width: '150vmax',
        height: '150vmax',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transformOrigin: 'center center'
      }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path ref={path1Ref} fill="#333333" />
        <path ref={path2Ref} fill="#888888" />
        <path ref={path3Ref} fill="#F5F5F5" />
      </svg>
    </div>
  );
}
