import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const certifications = [
  {
    title: 'Full-Stack Web Development',
    issuer: 'Coursera / Meta',
    date: '2023',
    description: 'Comprehensive certification covering front-end and back-end development, responsive design, and database management.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Advanced React Patterns',
    issuer: 'Frontend Masters',
    date: '2023',
    description: 'Deep dive into advanced React concepts, performance optimization, and custom hooks architecture.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Cloud Computing Fundamentals',
    issuer: 'AWS Training',
    date: '2022',
    description: 'Foundational knowledge of cloud concepts, core services, security, architecture, pricing, and support.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'UI/UX Design Masterclass',
    issuer: 'Design+Code',
    date: '2024',
    description: 'Advanced techniques in user interface design, user experience research, and prototyping with Figma.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Node.js Microservices',
    issuer: 'Udemy',
    date: '2024',
    description: 'Building scalable microservices architecture using Node.js, Express, Docker, and Kubernetes.',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'TypeScript for Professionals',
    issuer: 'Codecademy',
    date: '2023',
    description: 'Mastering strong typing in JavaScript applications to build robust, error-free production codebases.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Modern CSS Frameworks',
    issuer: 'Pluralsight',
    date: '2022',
    description: 'Deep understanding of utility-first CSS, Tailwind architecture, and modern CSS-in-JS solutions.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Database Architecture',
    issuer: 'MongoDB University',
    date: '2021',
    description: 'Designing scalable NoSQL schemas, performance tuning, and advanced aggregation pipelines.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
  }
];

const CertificationsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    
    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const maxIndex = Math.max(0, certifications.length - cardsToShow);

  // Ensure index stays within bounds on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 3500); // 3.5s delay
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50 || velocity.x < -500) {
      nextSlide();
    } else if (swipe > 50 || velocity.x > 500) {
      prevSlide();
    }
  };

  return (
    <section
      id="certifications"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        -mt-10 sm:-mt-12 md:-mt-14 relative z-40
        py-12 sm:py-20 md:py-32 overflow-hidden"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight
            mb-10 sm:mb-16 md:mb-20 px-5"
          style={{ fontSize: 'clamp(2rem, 5vw, 60px)' }}
        >
          Achievements
        </h2>
      </FadeIn>

      <div 
        className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Hover Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 md:left-4 md:right-4 flex justify-between z-20 pointer-events-none">
          <button 
            onClick={prevSlide}
            className={`pointer-events-auto w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#161616]/80 hover:bg-[#D7E2EA]/10 backdrop-blur-md border border-[#D7E2EA]/10 text-[#D7E2EA] transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0 md:-translate-x-6 lg:-translate-x-10' : 'opacity-0 translate-x-4'}`}
            aria-label="Previous achievement"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={nextSlide}
            className={`pointer-events-auto w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#161616]/80 hover:bg-[#D7E2EA]/10 backdrop-blur-md border border-[#D7E2EA]/10 text-[#D7E2EA] transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0 md:translate-x-6 lg:translate-x-10' : 'opacity-0 -translate-x-4'}`}
            aria-label="Next achievement"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden w-full relative">
          <div className="-mx-3 sm:-mx-4">
            <motion.div 
              className="flex cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${(100 / certifications.length) * currentIndex}%` }}
              transition={{ type: 'spring', stiffness: 250, damping: 30, mass: 1 }}
              style={{ width: `${(certifications.length / cardsToShow) * 100}%` }}
            >
              {certifications.map((cert, i) => (
                <div 
                  key={i} 
                  className="px-3 sm:px-4"
                  style={{ width: `${100 / certifications.length}%` }}
                >
                  {/* Card Content */}
                  <div className="bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 rounded-3xl p-5 sm:p-6 h-full flex flex-col gap-4 hover:bg-[#D7E2EA]/10 transition-colors duration-300 group select-none">
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-2 relative pointer-events-none">
                      <div className="absolute inset-0 bg-[#D7E2EA]/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                      <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" draggable="false" />
                    </div>
                    <div className="flex justify-between items-start gap-4 pointer-events-none">
                      <span className="text-[#D7E2EA]/50 font-medium tracking-widest uppercase text-xs sm:text-sm">
                        {cert.date}
                      </span>
                      <span className="bg-[#D7E2EA]/10 text-[#D7E2EA] px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                        {cert.issuer}
                      </span>
                    </div>
                    <h3 className="text-[#D7E2EA] font-semibold text-lg sm:text-xl md:text-2xl uppercase tracking-wide mt-1 pointer-events-none">
                      {cert.title}
                    </h3>
                    <p className="text-[#D7E2EA]/60 font-light leading-relaxed flex-grow text-sm sm:text-base pointer-events-none">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-10 md:mt-14">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-6 sm:w-8 bg-[#D7E2EA]' : 'w-1.5 sm:w-2 bg-[#D7E2EA]/30 hover:bg-[#D7E2EA]/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
