import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FadeIn from '../../components/common/FadeIn';
import { type ServiceData, services } from '../../data/services';
import LetsTalkModal from '../../components/LetsTalkModal';
import { ArrowRight, MessageCircle, FolderGit2, ExternalLink } from 'lucide-react';

const STACK_OFFSET = 18;

interface ServiceCardProps {
  service: ServiceData & {
    badge?: string;
    actionType?: 'page' | 'external';
    targetUrl?: string;
  };
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
}

const ServiceCard = ({
  service,
  index,
  totalCards,
  progress,
}: ServiceCardProps) => {
  const navigate = useNavigate();
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);

  const remainingCards = totalCards - 1;
  const segmentSize = remainingCards > 0 ? 1 / remainingCards : 1;

  // When subsequent cards slide in (card 0 is already visible initially)
  const slideStart = Math.max(0, (index - 1) * segmentSize);
  const slideEnd = Math.min(1, slideStart + segmentSize * 0.7);

  // Y: card 0 stays at 0, while subsequent cards slide in from 1200px below
  const yInput = index === 0 ? [0, 1] : [slideStart, Math.max(slideStart + 0.01, slideEnd)];
  const yOutput = index === 0 ? [0, 0] : [1200, 0];
  const y = useTransform(progress, yInput, yOutput);

  // Scale: shrink slightly when subsequent cards stack on top (strictly monotonic ranges!)
  const targetScale = 1 - (totalCards - 1 - index) * 0.04;
  const scaleInput = index === 0
    ? [0, 0.7, 1]
    : [0, Math.max(0.01, slideStart), Math.min(0.99, slideEnd), 1];
  const scaleOutput = index === 0
    ? [1, targetScale, targetScale]
    : [1, 1, targetScale, targetScale];
  const scale = useTransform(progress, scaleInput, scaleOutput);

  const handlePrimaryAction = () => {
    if (service.actionType === 'external' && service.targetUrl) {
      window.open(service.targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      navigate('/services');
    }
  };

  const isExternal = service.actionType === 'external';

  return (
    <>
      <motion.div
        className="absolute left-0 right-0 mx-auto w-[92%] sm:w-[78%] lg:w-[68%] xl:w-[62%] rounded-[30px] sm:rounded-[40px] md:rounded-[50px]
          border-2 border-[#0C0C0C]/12 bg-white
          p-4 sm:p-6 md:p-8 flex flex-col origin-top max-h-[64vh] sm:max-h-none cursor-default"
        style={{
          y,
          scale,
          top: index * STACK_OFFSET,
          bottom: 0,
          zIndex: index + 1,
          boxShadow: '0 25px 70px -15px rgba(0,0,0,0.22)',
          willChange: 'transform',
        } as any}
      >
        {/* Top row */}
        <div className="flex items-center justify-between gap-4 sm:gap-6 md:gap-8 mb-3 sm:mb-5 md:mb-6 flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-5 md:gap-7 min-w-0">
            <span
              className="font-black text-[#0C0C0C] leading-none select-none flex-shrink-0"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 92px)' }}
            >
              {service.number}
            </span>
            <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[#0C0C0C] font-extrabold uppercase tracking-tight truncate"
                  style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.85rem)' }}
                >
                  {service.name}
                </span>
                {service.badge && (
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0C0C0C]/5 text-[#0C0C0C]/70 border border-[#0C0C0C]/10 whitespace-nowrap">
                    {service.badge}
                  </span>
                )}
              </div>
              <div className="block">
                <span
                  className="text-[#0C0C0C]/80 font-normal leading-relaxed max-w-xl line-clamp-2"
                  style={{ fontSize: 'clamp(0.82rem, 1.25vw, 1.05rem)' }}
                >
                  {service.description}
                </span>
              </div>
            </div>
          </div>

          {/* Quick interactive action indicator */}
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0C0C0C]/5 hover:bg-[#0C0C0C] text-[#0C0C0C] hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-wider flex-shrink-0 group"
          >
            <span>View Service</span>
            {isExternal ? (
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>

        {/* Bottom row - interactive action cards + image showcase */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 flex-1 min-h-0">
          {/* Left column - Action Buttons */}
          <div className="w-full sm:w-[42%] flex flex-col gap-2.5 sm:gap-3 md:gap-3.5 flex-shrink-0">
            {/* Primary Action Button */}
            {isExternal ? (
              <a
                href={service.targetUrl || '/interior'}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full h-[44px] sm:h-auto sm:flex-1 min-h-[44px] rounded-[18px] sm:rounded-[28px] md:rounded-[32px] bg-[#0C0C0C] flex flex-row items-center justify-center gap-2 sm:gap-3 group transition-all duration-300 hover:bg-[#1C1C1F] border border-[#0C0C0C]/10 overflow-hidden px-4 shadow-sm"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-[#D7E2EA] font-extrabold uppercase tracking-widest whitespace-nowrap text-xs sm:text-sm md:text-base">
                  View Service
                </span>
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-[#D7E2EA] group-hover:scale-110 transition-transform duration-300" strokeWidth={2.2} />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/services')}
                className="relative w-full h-[44px] sm:h-auto sm:flex-1 min-h-[44px] rounded-[18px] sm:rounded-[28px] md:rounded-[32px] bg-[#0C0C0C] flex flex-row items-center justify-center gap-2 sm:gap-3 group transition-all duration-300 hover:bg-[#1C1C1F] border border-[#0C0C0C]/10 overflow-hidden px-4 shadow-sm"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-[#D7E2EA] font-extrabold uppercase tracking-widest whitespace-nowrap text-xs sm:text-sm md:text-base">
                  View Service
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#D7E2EA] group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.2} />
              </button>
            )}

            {/* View Work Button */}
            <a
              href={service.slug === 'interior' ? '/projects?category=interior' : '/projects'}
              className="relative w-full h-[42px] sm:h-auto sm:flex-1 min-h-[42px] rounded-[18px] sm:rounded-[28px] md:rounded-[32px] bg-[#0C0C0C] flex flex-row items-center justify-center gap-2 sm:gap-3 group transition-all duration-300 hover:bg-[#1C1C1F] border border-[#0C0C0C]/10 overflow-hidden px-4 shadow-sm"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-[#D7E2EA] font-extrabold uppercase tracking-widest whitespace-nowrap text-xs sm:text-sm md:text-base">
                View Work
              </span>
              <FolderGit2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#D7E2EA] group-hover:scale-110 transition-transform duration-300" strokeWidth={2.2} />
            </a>

            {/* Let's Talk Button */}
            <button
              type="button"
              onClick={() => setIsTalkModalOpen(true)}
              className="relative w-full h-[42px] sm:h-auto sm:flex-1 min-h-[42px] rounded-[18px] sm:rounded-[28px] md:rounded-[32px] bg-[#F2F4F7] hover:bg-[#E5E8EB] flex flex-row items-center justify-center gap-2 sm:gap-3 group transition-all duration-300 border border-[#0C0C0C]/10 overflow-hidden px-4 shadow-sm"
            >
              <span className="text-[#0C0C0C] font-extrabold uppercase tracking-widest whitespace-nowrap text-xs sm:text-sm md:text-base">
                {"Let's Talk"}
              </span>
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#0C0C0C] group-hover:scale-110 transition-transform duration-300" strokeWidth={2.2} />
            </button>
          </div>

          {/* Right column - Interactive Image Showcase */}
          <div
            onClick={handlePrimaryAction}
            className="w-full sm:w-[58%] flex-1 min-h-[140px] sm:min-h-0 relative rounded-[20px] sm:rounded-[32px] md:rounded-[38px] overflow-hidden group cursor-pointer border border-[#0C0C0C]/10 shadow-inner"
          >
            <img
              src={service.col2Image}
              alt={`${service.name} showcase`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Interactive Hover Overlay */}
            <div className="absolute inset-0 bg-[#0C0C0C]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
              <div className="px-4 py-2 rounded-full bg-white/95 text-[#0C0C0C] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span>View Service</span>
                {isExternal ? (
                  <ExternalLink className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <LetsTalkModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
        defaultMessage={service.defaultMessage}
      />
    </>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const measure = () => setIsMobile(window.innerWidth < 768);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef as any,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] relative z-40"
      style={{
        height: isMobile
          ? `${(services.length + 1) * 75}vh`
          : `${(services.length + 1) * 105}vh`,
      }}
    >
      {/* Sticky viewport-pinned container */}
      <div className="sticky top-0 h-screen flex flex-col
        px-4 sm:px-8 md:px-10
        pt-20 sm:pt-28 md:pt-32
        pb-6 sm:pb-8 md:pb-10
        overflow-hidden"
      >
        <FadeIn delay={0} y={40}>
          <div className="text-center mb-5 sm:mb-7 md:mb-10 flex-shrink-0">
            <h2
              className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 60px)' }}
            >
              Services
            </h2>
            <p className="text-[#0C0C0C]/60 text-xs sm:text-sm md:text-base font-normal mt-2">
              Bespoke digital engineering & 3D architectural interior design
            </p>
          </div>
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
