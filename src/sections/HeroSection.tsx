import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

const TOTAL_FRAMES = 92;

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      // Format number to 4 digits: 0001, 0002...
      const frameNumber = String(i).padStart(4, '0');
      img.src = `/my-video/${frameNumber}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Set up scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress (0-1) to frame index (0-100)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

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
              // OPTIMIZATION 1: Set canvas internal resolution to match the image's native resolution.
              if (canvas.width !== img.naturalWidth) {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
              }

              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(img, 0, 0, canvas.width, canvas.height);
              
              try {
                // OPTIMIZATION 2: Fast Luma Keying
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                const len = data.length;
                
                for (let i = 0; i < len; i += 4) {
                  const r = data[i];
                  const g = data[i+1];
                  const b = data[i+2];
                  
                  // Advanced Luma Keying: Smoothstep transition for a perfectly clear edge
                  const maxColor = Math.max(r, g, b);
                  if (maxColor < 32) {
                    data[i+3] = 0; // Completely remove background JPEG noise
                  } else if (maxColor < 48) {
                    // Smoothstep interpolation for high-quality anti-aliasing on the edges
                    const t = (maxColor - 32) / 16;
                    data[i+3] = Math.round(t * t * (3 - 2 * t) * 255);
                  } else {
                    data[i+3] = 255; // Keep the subject (hair, face, etc.) 100% solidly opaque
                  }
                }
                context.putImageData(imageData, 0, 0);
                lastDrawnIndex = index;
              } catch (e) {
                lastDrawnIndex = index;
              }
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
    <section ref={containerRef} className="h-[300vh] relative z-10 bg-[#0C0C0C]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col pt-20 sm:pt-24 overflow-hidden">
        
        {/* Hero Heading (Moved to back, z-0) */}
        <div className="absolute top-20 sm:top-24 left-0 w-full px-6 md:px-10 z-0 flex flex-col items-center justify-start h-full pt-10">
          <FadeIn delay={0.15} y={40} className="overflow-hidden w-full text-center">
            <h1
              className="hero-heading font-black uppercase tracking-tight leading-none
                whitespace-nowrap w-full
                text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]
                text-[#D7E2EA]"
            >
              Hi, i&apos;m muna
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.25} y={20} className="w-full overflow-hidden mt-2 sm:mt-4 opacity-70">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
              className="flex whitespace-nowrap text-[#D7E2EA] font-black uppercase tracking-tight leading-none text-[6vw] sm:text-[7vw] md:text-[8vw] lg:text-[9vw]"
            >
              <span className="pr-8">a fullstack developer, construction & interior , app developer, ai assist software developer • </span>
              <span className="pr-8">a fullstack developer, construction & interior , app developer, ai assist software developer • </span>
              <span className="pr-8">a fullstack developer, construction & interior , app developer, ai assist software developer • </span>
              <span className="pr-8">a fullstack developer, construction & interior , app developer, ai assist software developer • </span>
            </motion.div>
          </FadeIn>
        </div>
        
        {/* Full-screen Canvas Animation (Brought forward, z-10) */}
        {/* Removed mix-blend-screen because we are now making the black pixels genuinely transparent via Luma Keying! */}
        <div className="absolute inset-0 pt-20 sm:pt-24 z-10 flex justify-center items-center pointer-events-none">
          {/* Show loading state until enough images are loaded */}
          {imagesLoaded < TOTAL_FRAMES * 0.2 && (
            <div className="absolute inset-0 flex items-center justify-center text-[#D7E2EA]/50 font-medium tracking-widest text-sm uppercase z-10">
              Loading... {Math.round((imagesLoaded / TOTAL_FRAMES) * 100)}%
            </div>
          )}
          
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className={`w-full h-full object-cover object-top sm:object-[center_10%] grayscale transition-opacity duration-500 ${imagesLoaded >= TOTAL_FRAMES * 0.2 ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Main hero area (Bottom bar) */}
        <div className="flex-1 relative z-20 flex flex-col justify-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 pointer-events-auto">
          <div className="flex justify-between items-end w-full">
            <FadeIn delay={0.35} y={20}>
              <p
                className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug
                  max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
                style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
              >
                a full-stack developer driven by crafting striking and unforgettable projects
              </p>
            </FadeIn>

            <FadeIn delay={0.5} y={20}>
              <ContactButton />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
