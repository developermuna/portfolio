import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import FadeIn from '../../components/common/FadeIn';

const TOTAL_FRAMES = 110;

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    const INITIAL_FRAMES = 15;
    let loadedCount = 0;
    
    // Create all image objects so the array is full size
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      loadedImages.push(new Image());
    }

    const loadFrame = (index: number) => {
      if (index >= TOTAL_FRAMES) return;
      const img = loadedImages[index];
      const frameNumber = String(index + 1).padStart(3, '0');
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        window.dispatchEvent(new CustomEvent('hero-image-loaded', { 
          detail: { loaded: loadedCount, total: TOTAL_FRAMES } 
        }));
      };
      
      img.src = `https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/myVideoFrames/frame_${frameNumber}_no_bg.webp`;
    };

    // Phase 1: Load initial frames immediately
    for (let i = 0; i < INITIAL_FRAMES; i++) {
      loadFrame(i);
    }
    
    // Phase 2: Load remaining frames asynchronously after a small delay
    setTimeout(() => {
      for (let i = INITIAL_FRAMES; i < TOTAL_FRAMES; i++) {
        // Stagger loading slightly
        setTimeout(() => loadFrame(i), (i - INITIAL_FRAMES) * 20);
      }
    }, 500);

    setImages(loadedImages);
  }, []);

  // Set up scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress (0-1) to frame index (0-100)
  // Hold the last frame for the final 15% of the scroll to create a pause effect
  const frameIndex = useTransform(scrollYProgress, [0, 0.85, 1], [0, TOTAL_FRAMES - 1, TOTAL_FRAMES - 1]);

  // Draw current frame to canvas using continuous requestAnimationFrame loop
  useEffect(() => {
    let lastDrawnIndex = -1;
    let animationFrameId: number;

    const render = () => {
      if (images.length > 0 && canvasRef.current) {
        const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(frameIndex.get())));
        
        // Only do the heavy pixel manipulation if the frame actually changed
        // Or if it failed to draw last time because the image wasn't complete
        if (index !== lastDrawnIndex) {
          const img = images[index];
          
          // Ensure image is fully loaded and valid
          if (img && img.complete && img.naturalWidth > 0) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d', { willReadFrequently: true });
            
            if (context) {
              // Render at full native HD resolution on desktop, but optimize heavily for mobile to prevent lag
              const isMobileWidth = window.innerWidth < 768;
              
              // On mobile, force DPR to 1 and scale down resolution (e.g., to ~720p) to keep scrolling silky smooth.
              // On desktop, use native device pixel ratio for crispness.
              const dpr = isMobileWidth ? 1 : (window.devicePixelRatio || 1);
              const scale = isMobileWidth ? 0.5 : 1; 
              
              const targetWidth = Math.round(img.naturalWidth * dpr * scale);
              const targetHeight = Math.round(img.naturalHeight * dpr * scale);

              if (canvas.width !== targetWidth) {
                canvas.width = targetWidth;
                canvas.height = targetHeight;
              }
              
              // Maximize sharpness and clarity on desktop, prioritize speed on mobile
              context.imageSmoothingEnabled = true;
              context.imageSmoothingQuality = isMobileWidth ? 'low' : 'high';

              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(img, 0, 0, canvas.width, canvas.height);
              
              lastDrawnIndex = index;
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [images, frameIndex]);

  return (
    <section id="home" ref={containerRef} className="h-[180vh] sm:h-[300vh] relative z-10 bg-[#0C0C0C]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col pt-20 sm:pt-24 overflow-hidden">
        
        {/* SVG Filters for Letter Attaching & Detaching Effects */}
        <svg className="pointer-events-none absolute w-0 h-0">
          {/* Subtle fluid effect for the main heading */}
          <filter id="heading-fluid">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise">
              <animate attributeName="baseFrequency" values="0.015; 0.025; 0.015" dur="6s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="B" />
          </filter>

          {/* Left Exit: Detaching & Peeling apart effect */}
          <filter id="letter-detach">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.02" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" values="0.03 0.02; 0.06 0.03; 0.03 0.02" dur="4s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="B" result="detached" />
            <feGaussianBlur in="detached" stdDeviation="0.8" />
          </filter>

          {/* Full fluid effect for the moving text */}
          <filter id="moving-text-fluid">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="2" result="noise">
              <animate attributeName="baseFrequency" values="0.01 0.02; 0.015 0.03; 0.01 0.02" dur="4s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="B" />
          </filter>

          {/* Right Entry: Magnetic Attaching & Converging effect */}
          <filter id="letter-attach">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="2" result="noise">
              <animate attributeName="baseFrequency" values="0.02 0.05; 0.04 0.08; 0.02 0.05" dur="4s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="G" yChannelSelector="R" result="attached" />
          </filter>
        </svg>

        {/* Hero Heading (Moved to back, z-0) */}
        <div 
          className="absolute inset-0 sm:top-12 left-0 w-full px-1 sm:px-6 md:px-10 z-0 flex flex-col items-center justify-start h-full pt-32 sm:pt-6"
          style={{ isolation: 'isolate', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
        >
          <FadeIn delay={0.15} y={40} className="overflow-visible w-full text-center">
            <motion.h1
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden', willChange: 'transform' }}
              className="hero-heading font-black uppercase tracking-tight leading-none
                whitespace-nowrap w-full
                text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]
                text-[#D7E2EA] drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] select-none"
            >
              Hi, i&apos;m muna
            </motion.h1>
          </FadeIn>
          
          <FadeIn delay={0.25} y={20} className="w-full absolute top-[35%] sm:relative sm:top-auto sm:bottom-auto overflow-visible sm:overflow-hidden sm:mt-2 sm:mb-0">
            {/* Left Exit: Detaching Letters Dissolve Zone (Narrowed to a small part) */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 z-20 pointer-events-none"
              style={{ 
                backdropFilter: 'url(#letter-detach)',
                WebkitBackdropFilter: 'url(#letter-detach)',
                maskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 100%)',
                transform: 'translateZ(0)'
              }}
            />

            {/* Right Entry: Attaching Letters Magnetic Zone */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-32 sm:w-56 md:w-72 z-20 pointer-events-none"
              style={{ 
                backdropFilter: 'url(#letter-attach)',
                WebkitBackdropFilter: 'url(#letter-attach)',
                maskImage: 'linear-gradient(to left, black 0%, black 20%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to left, black 0%, black 20%, transparent 100%)',
                transform: 'translateZ(0)'
              }}
            />

            {/* Ultra-smooth Feathered Floating Marquee Container */}
            <motion.div
              animate={{ y: [-26, 26, -26] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 6%, rgba(0,0,0,0.7) 16%, rgba(0,0,0,1) 26%, rgba(0,0,0,1) 74%, rgba(0,0,0,0.7) 84%, rgba(0,0,0,0.2) 94%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 6%, rgba(0,0,0,0.7) 16%, rgba(0,0,0,1) 26%, rgba(0,0,0,1) 74%, rgba(0,0,0,0.7) 84%, rgba(0,0,0,0.2) 94%, rgba(0,0,0,0) 100%)',
                filter: 'url(#moving-text-fluid)',
                transform: 'translate3d(0,0,0)',
                backfaceVisibility: 'hidden',
                willChange: 'transform'
              }}
              className="py-0 sm:py-8"
            >
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 55 }}
                style={{
                  transform: 'translate3d(0,0,0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform'
                }}
                className="flex w-max whitespace-nowrap font-black uppercase tracking-tight leading-none text-[6vw] sm:text-[6.5vw] md:text-[7.5vw] lg:text-[8vw] text-transparent [-webkit-text-stroke:1px_rgba(215,226,234,0.85)] sm:[-webkit-text-stroke:1.5px_rgba(215,226,234,0.85)] select-none"
              >
                <span className="shrink-0 pr-8">
                  ai assist developer &amp; designer • full stack developer • app developer • construction &amp; interior designer • 
                </span>
                <span className="shrink-0 pr-8">
                  ai assist developer &amp; designer • full stack developer • app developer • construction &amp; interior designer • 
                </span>
              </motion.div>
            </motion.div>
          </FadeIn>
        </div>
        
        {/* Full-screen Canvas Animation (Brought forward, z-10) */}
        {/* Removed mix-blend-screen because we are now making the black pixels genuinely transparent via Luma Keying! */}
        <div className="absolute inset-0 sm:pt-24 z-10 flex justify-center items-center pointer-events-none">
          {/* Show loading state until enough images are loaded */}
          {imagesLoaded < 15 && (
            <div className="absolute inset-0 flex items-center justify-center text-[#D7E2EA]/50 font-medium tracking-widest text-sm uppercase z-10">
              Loading... {Math.round((imagesLoaded / 15) * 100)}%
            </div>
          )}
          
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className={`w-full h-full object-contain sm:object-cover object-center sm:object-[center_10%] scale-[1.8] sm:scale-100 grayscale transition-opacity duration-500 ${imagesLoaded >= 15 ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Main hero area (Bottom bar) */}
        <div className="flex-1 relative z-20 flex flex-col justify-end px-4 sm:px-6 md:px-10 pb-10 sm:pb-8 md:pb-10 pointer-events-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end w-full relative gap-4 sm:gap-4">
            <FadeIn delay={0.35} y={20} className="w-full sm:w-auto">
              <p
                className="text-[#D7E2EA] font-bold sm:font-light uppercase tracking-wide leading-snug
                  max-w-[320px] sm:max-w-[260px] md:max-w-[300px] mx-auto sm:mx-0 text-center sm:text-left
                  text-[1.05rem] sm:text-[clamp(0.95rem,1.6vw,1.75rem)]"
              >
                a full-stack developer driven by crafting striking and unforgettable projects
              </p>
            </FadeIn>

            {/* Center Floating Action Pill containing Services & View Projects */}
            <FadeIn delay={0.5} y={20} className="w-full sm:w-auto flex justify-center sm:absolute sm:left-[38%] md:sm:left-[40%] sm:-translate-x-1/2 sm:-bottom-3 md:sm:-bottom-4 z-30 pointer-events-auto mb-6 sm:mb-0">
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center p-1 sm:p-1.5 rounded-full bg-[#0C0C0C]/80 backdrop-blur-xl border border-white shadow-[0_10px_30px_rgba(0,0,0,0.6)] group"
              >
                <a
                  href="/services"
                  className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-[#0C0C0C] font-semibold tracking-wide uppercase text-xs sm:text-sm hover:scale-105 transition-all duration-300 whitespace-nowrap shadow-md"
                >
                  Services
                </a>
                <a
                  href="/#projects"
                  className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-white font-semibold tracking-wide uppercase text-xs sm:text-sm hover:text-white hover:bg-white/10 transition-all duration-300 whitespace-nowrap ml-1"
                >
                  View Projects
                </a>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
