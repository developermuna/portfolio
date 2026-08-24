import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';

import { type ServiceData, services } from '../data/portfolioData';

const STACK_OFFSET = 18;

import { useState } from 'react';
import LetsTalkModal from '../components/LetsTalkModal';
import { ArrowRight, MessageCircle, ShoppingCart } from 'lucide-react';

const ServiceCard = ({
  service,
  index,
  totalCards,
  progress,
}: {
  service: ServiceData;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const remainingCards = totalCards - 1;
  const segmentSize = remainingCards > 0 ? 1 / remainingCards : 1;

  // When subsequent cards slide in (card 0 is already visible initially)
  const slideStart = Math.max(0, (index - 1) * segmentSize);
  const slideEnd = Math.min(1, slideStart + segmentSize * 0.7);

  // Y: card 0 starts at 0, while cards 1, 2, 3 slide in from 1200px below
  const ySlide = useTransform(progress, [slideStart, slideEnd], [1200, 0]);
  const y = index === 0 ? 0 : ySlide;

  // Scale: shrink slightly when subsequent cards stack on top
  const targetScale = 1 - (totalCards - 1 - index) * 0.04;
  const scaleStart = index === 0 ? 0 : Math.max(0, (index - 1) * segmentSize);
  const scaleEnd = Math.min(scaleStart + segmentSize * 0.5, 1);
  const scale = useTransform(
    progress,
    [0, scaleStart, scaleEnd, 1],
    [1, 1, targetScale, targetScale]
  );

  return (
    <>
      <motion.div
        className="absolute left-0 right-0 mx-auto w-[92%] sm:w-[75%] lg:w-[65%] xl:w-[60%] rounded-[30px] sm:rounded-[40px] md:rounded-[50px]
          border-2 border-[#0C0C0C]/12 bg-white
          p-4 sm:p-5 md:p-6 flex flex-col origin-top max-h-[75vh] sm:max-h-none"
        style={{
          y,
          scale,
          top: index * STACK_OFFSET,
          bottom: 0,
          zIndex: index + 1,
          boxShadow: '0 20px 60px -15px rgba(0,0,0,0.18)',
          willChange: 'transform',
        }}
      >
        {/* Top row */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 mb-3 sm:mb-4 md:mb-5 flex-shrink-0">
          <span
            className="font-black text-[#0C0C0C] leading-none"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 100px)' }}
          >
            {service.number}
          </span>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span
              className="text-[#0C0C0C] font-medium uppercase"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.8rem)' }}
            >
              {service.name}
            </span>
            <div className="block">
              <span
                className="text-[#0C0C0C] font-light leading-relaxed max-w-lg line-clamp-2"
                style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)' }}
              >
                {service.description}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row - image grid, fills remaining space */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 min-h-0">
          {/* Left column - Buttons (100% mobile, 40% desktop) */}
          <div className="w-full sm:w-[40%] flex flex-col gap-3 sm:gap-4 flex-shrink-0">
            
            {/* Top Button Block (Let's Talk) */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative w-full flex-none h-[60px] sm:h-auto sm:flex-1 min-h-0 rounded-[20px] sm:rounded-[32px] md:rounded-[40px] bg-[#0C0C0C] flex flex-row items-center justify-center gap-3 sm:gap-4 group transition-all duration-300 hover:bg-[#1A1A1A] border border-[#0C0C0C]/10 overflow-hidden px-4 sm:p-4"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-[#D7E2EA] font-black uppercase tracking-widest whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-2xl">
                Let's Talk
              </span>
              <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7 text-[#D7E2EA] group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
            </button>

            {/* Middle Button Block (Buy Product) */}
            <a 
              href={`#all-products?category=${service.slug}`}
              className="relative w-full flex-none h-[60px] sm:h-auto sm:flex-1 min-h-0 rounded-[20px] sm:rounded-[32px] md:rounded-[40px] bg-[#0C0C0C] flex flex-row items-center justify-center gap-3 sm:gap-4 group transition-all duration-300 hover:bg-[#1A1A1A] border border-[#0C0C0C]/10 overflow-hidden px-4 sm:p-4"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-[#D7E2EA] font-black uppercase tracking-widest whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-2xl">
                Buy Product
              </span>
              <ShoppingCart className="w-5 h-5 sm:w-7 sm:h-7 text-[#D7E2EA] group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
            </a>

            {/* Bottom Button Block (View Work) */}
            <a 
              href={`#all-projects?category=${service.slug}`}
              className="relative w-full flex-none h-[60px] sm:h-auto sm:flex-1 min-h-0 rounded-[20px] sm:rounded-[32px] md:rounded-[40px] bg-[#0C0C0C] flex flex-row items-center justify-center gap-3 sm:gap-4 group transition-all duration-300 hover:bg-[#1A1A1A] border border-[#0C0C0C]/10 overflow-hidden px-4 sm:p-4"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-[#D7E2EA] font-black uppercase tracking-widest whitespace-nowrap text-base sm:text-lg md:text-xl lg:text-2xl">
                View Work
              </span>
              <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 text-[#D7E2EA] group-hover:translate-x-2 transition-transform duration-300" strokeWidth={2} />
            </a>

          </div>

          {/* Right column - Image (100% mobile, 60% desktop) */}
          <div className="w-full sm:w-[60%] flex-1 min-h-[140px] sm:min-h-0">
            <img
              src={service.col2Image}
              alt={`${service.name} main`}
              className="w-full h-full object-cover rounded-[20px] sm:rounded-[32px] md:rounded-[40px]"
            />
          </div>
        </div>
      </motion.div>

      <LetsTalkModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultMessage={service.defaultMessage} 
      />
    </>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] relative z-40"
      style={{ height: isMobile ? `${(services.length + 1) * 70}vh` : `${(services.length + 1) * 100}vh` }}
    >
      {/* Sticky viewport-pinned container */}
      <div className="sticky top-0 h-screen flex flex-col
        px-5 sm:px-8 md:px-10
        pt-24 sm:pt-28 md:pt-32
        pb-6 sm:pb-8 md:pb-10
        overflow-hidden"
      >
        <FadeIn delay={0} y={40}>
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight
              mb-6 sm:mb-8 md:mb-12 flex-shrink-0"
            style={{ fontSize: 'clamp(2rem, 5vw, 60px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* Card stacking area */}
        <div className="relative flex-1 min-h-0">
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={i}
              totalCards={services.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
