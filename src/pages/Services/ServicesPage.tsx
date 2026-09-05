import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FolderGit2,
  MessageCircle,
  Sparkles,
  ChevronDown,
  Tag,
  ArrowUpRight,
  MessageSquare,
  Palette,
  Code2,
  Rocket,
  Wrench,
  ShieldCheck,
} from 'lucide-react';
import LetsTalkModal from '../../components/LetsTalkModal';

interface ServiceCardItem {
  id: string;
  title: string;
  category: 'web' | 'app' | 'pwa';
  badge: string;
  description: string;
  price: string;
  rawPrice: string;
  image: string;
  viewWorkUrl: string;
  prefilledMessage: string;
}

const serviceCards: ServiceCardItem[] = [
  {
    id: 'web-service',
    title: 'Website Design & Development',
    category: 'web',
    badge: 'Full-Stack Web',
    description:
      'High-converting, responsive websites, landing pages, and full-stack web platforms built with React, Next.js, and ultra-fast edge loading.',
    price: '₹2,999 - ₹69,999',
    rawPrice: '2999 - 69999',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/web%20service.webp',
    viewWorkUrl: '/projects?category=web',
    prefilledMessage:
      "Hi Muna, I'm interested in your Website Design & Development service (Estimated Price: ₹2,999 - ₹69,999). Let's discuss my project requirements!",
  },
  {
    id: 'app-service',
    title: 'App Design & Development',
    category: 'app',
    badge: 'iOS & Android',
    description:
      'Native-grade cross-platform mobile apps for iOS and Android engineered with Flutter, pixel-perfect UI, 60/120 FPS animations, and offline sync.',
    price: '₹5,999 - ₹99,999',
    rawPrice: '5999 - 99999',
    image: 'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/flutter%20service.webp',
    viewWorkUrl: '/projects?category=app',
    prefilledMessage:
      "Hi Muna, I'm interested in your App Design & Development service (Estimated Price: ₹5,999 - ₹99,999). Let's discuss my project requirements!",
  },
  {
    id: 'pwa-service',
    title: 'PWA Design & Development',
    category: 'pwa',
    badge: 'Progressive Web App',
    description:
      'Installable app-like experiences with Service Worker caching, complete offline functionality, web push notifications, and zero app store fees.',
    price: '₹3,999 - ₹79,999',
    rawPrice: '3999 - 79999',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    viewWorkUrl: '/projects',
    prefilledMessage:
      "Hi Muna, I'm interested in your Progressive Web App (PWA) Design service (Estimated Price: ₹3,999 - ₹79,999). Let's discuss my project requirements!",
  },
];

const lifecycleSteps = [
  {
    step: '01',
    title: "User Let's Talk",
    subtitle: 'Discovery & Consultation',
    icon: MessageSquare,
    desc: 'Initial requirement gathering, feature scoping, tech stack selection, and transparent quote agreement.',
  },
  {
    step: '02',
    title: 'UI/UX Prototyping',
    subtitle: 'Design & Wireframing',
    icon: Palette,
    desc: 'Interactive Figma wireframes, component design system, user experience flow, and design approval.',
  },
  {
    step: '03',
    title: 'Full-Stack Build',
    subtitle: 'Engineering & APIs',
    icon: Code2,
    desc: 'Type-safe production code, state management, database schemas, animations, and API integrations.',
  },
  {
    step: '04',
    title: 'Delivery & Launch',
    subtitle: 'Production Handoff',
    icon: Rocket,
    desc: 'Rigorous testing, cloud deployment, App Store/Vercel release, and full 100% IP code repository handoff.',
  },
  {
    step: '05',
    title: 'Maintenance',
    subtitle: 'Ongoing Care • ₹599/mo',
    icon: Wrench,
    desc: 'Continuous monitoring, routine security patches, cloud hosting support, and bug fixes at just ₹599/month.',
  },
];

const faqs = [
  {
    question: 'How do project pricing tiers work within the estimated range?',
    answer:
      'Pricing is tailored to project scope: landing pages and portfolio websites start at the lower tier, while custom web applications with authenticated dashboards, database schemas, dynamic APIs, and payment gateways scale towards the upper tier.',
  },
  {
    question: 'What does the ₹599/month maintenance fee cover?',
    answer:
      'The optional ₹599/month maintenance fee covers ongoing hosting management, framework and dependency updates, routine security patches, uptime monitoring, and small content or bug-fix adjustments so your product remains running flawlessly.',
  },
  {
    question: 'Can you build cross-platform apps for both iOS and Android simultaneously?',
    answer:
      'Yes, absolutely. Utilizing Flutter and React Native, we compile a unified, high-performance codebase targeting both Apple iOS and Google Android, saving up to 40% in engineering costs while maintaining native fluidity.',
  },
  {
    question: 'What is included with the Service Request?',
    answer:
      'Every project includes complete UI/UX wireframing, production-ready code, testing across device formats, deployment setup, and a 30-day post-launch warranty with full IP ownership handed over to you.',
  },
  {
    question: 'How quickly can we start after Let’s Talk?',
    answer:
      'Once we discuss your requirements and finalize the scope, project kickoff typically occurs within 24 to 48 hours.',
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<{ isOpen: boolean; defaultMessage: string }>({
    isOpen: false,
    defaultMessage: '',
  });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleOpenModal = (message: string) => {
    setModalState({
      isOpen: true,
      defaultMessage: message,
    });
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit pb-24 relative z-50">
      {/* Sticky Header / Navigation */}
      <div className="sticky top-0 z-40 bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-[#D7E2EA]/10 w-full pt-20 sm:pt-24 pb-4 px-5 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase text-white">
              The service we offer
            </h1>
          </div>

          {/* Back Button Only Icon */}
          <button
            onClick={handleBack}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105 group flex-shrink-0"
            title="Go back to previous page"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto mt-8 sm:mt-12 px-5 sm:px-10 md:px-16 lg:px-24 flex flex-col gap-16 sm:gap-20">
        {/* 3 Card Design in One Line */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {serviceCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#111113] border border-white/10 p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group shadow-[0_15px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {/* Card Image */}
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden relative mb-5 bg-black/40 border border-white/5">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-white/90 border border-white/10 uppercase tracking-wider">
                  {card.badge}
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col flex-1">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light leading-relaxed mb-5 line-clamp-3">
                  {card.description}
                </p>

                {/* Price & Maintenance Section */}
                <div className="mt-auto mb-5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-white/50 text-xs font-semibold uppercase tracking-wider">
                      <Tag className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Estimated Price</span>
                    </div>
                    <span className="text-sm sm:text-base font-black text-emerald-400 font-mono tracking-tight">
                      {card.price}
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-white/40 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-sky-400" />
                      Maintenance Fees
                    </span>
                    <span className="text-white/80 font-mono font-semibold">
                      ₹599/month
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Work & Service Request */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10">
                {/* View Work Button */}
                <a
                  href={card.viewWorkUrl}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-colors duration-300 text-center"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span className="truncate">View Work</span>
                </a>

                {/* Service Request Button with Pre-filled Text */}
                <button
                  onClick={() => handleOpenModal(card.prefilledMessage)}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-[#D7E2EA] text-[#0C0C0C] font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.15)] text-center group/btn"
                >
                  <MessageCircle className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                  <span className="truncate">Service Request</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engineering Lifecycle: Circle Timeline Design */}
        <div className="flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/60 mb-2">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Milestone Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
              Engineering Lifecycle Circle
            </h2>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/60 mt-1.5 font-light">
              A continuous milestone cycle from your initial message through to delivery and long-term maintenance.
            </p>
          </div>

          {/* Desktop Circle Timeline Flow (>= 1024px) */}
          <div className="hidden lg:block relative mt-4">
            {/* Connecting Horizontal Path between circles */}
            <div className="absolute top-[64px] left-[7%] right-[7%] h-[2px] bg-gradient-to-r from-emerald-500/40 via-sky-500/40 to-purple-500/40 z-0" />

            <div className="grid grid-cols-5 gap-4 relative z-10 items-start">
              {lifecycleSteps.map((item) => {
                const Icon = item.icon;
                const isMaintenance = item.step === '05';
                return (
                  <div key={item.step} className="flex flex-col items-center text-center group">
                    {/* Circle Node Container */}
                    <div className="relative mb-5 flex items-center justify-center">
                      {/* Outer Orbit Pulse Ring */}
                      <div
                        className={`w-32 h-32 rounded-full border-2 ${
                          isMaintenance
                            ? 'border-sky-400/60 shadow-[0_0_35px_rgba(56,189,248,0.25)] bg-gradient-to-b from-[#182635] to-[#0E1520]'
                            : 'border-white/15 group-hover:border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] bg-gradient-to-b from-[#1A1A1E] to-[#101013]'
                        } flex flex-col items-center justify-center p-3 relative transition-all duration-300 group-hover:scale-105`}
                      >
                        {/* Step Number Tag */}
                        <div
                          className={`absolute -top-3 px-3 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider ${
                            isMaintenance ? 'bg-sky-400 text-black' : 'bg-white text-black'
                          } shadow-md`}
                        >
                          Step {item.step}
                        </div>

                        {/* Centered Icon with Glow */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 text-white group-hover:scale-110 transition-transform ${
                            isMaintenance ? 'bg-sky-500/20 text-sky-300' : 'bg-white/10'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Step Title in Circle */}
                        <span className="text-xs font-black uppercase tracking-tight text-white line-clamp-1 px-1">
                          {item.title}
                        </span>
                        <span
                          className={`text-[10px] font-mono ${
                            isMaintenance ? 'text-sky-400 font-bold' : 'text-white/45'
                          }`}
                        >
                          {isMaintenance ? '₹599/mo' : item.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Description Box */}
                    <div
                      className={`w-full max-w-[210px] p-3.5 rounded-2xl ${
                        isMaintenance
                          ? 'bg-sky-500/10 border border-sky-500/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]'
                          : 'bg-white/[0.02] border border-white/10 group-hover:border-white/20'
                      } flex flex-col items-center text-center transition-colors`}
                    >
                      <h4 className="text-xs font-extrabold uppercase text-white mb-1 tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#D7E2EA]/70 font-light leading-relaxed mb-2">
                        {item.desc}
                      </p>
                      {isMaintenance && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-300 bg-sky-400/10 px-2.5 py-0.5 rounded-full border border-sky-400/20 mt-auto">
                          <ShieldCheck className="w-3 h-3" />
                          Maintenance: ₹599/mo
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile & Tablet Vertical Circle Timeline (< 1024px) */}
          <div className="block lg:hidden relative pl-6 sm:pl-8 border-l-2 border-white/10 ml-6 sm:ml-8 space-y-8 my-2">
            {lifecycleSteps.map((item) => {
              const Icon = item.icon;
              const isMaintenance = item.step === '05';
              return (
                <div key={item.step} className="relative flex items-start gap-4 sm:gap-6 group">
                  {/* Left Circle Node on Line */}
                  <div
                    className={`absolute -left-[35px] sm:-left-[43px] w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 ${
                      isMaintenance
                        ? 'border-sky-400 bg-[#0E1520] text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                        : 'border-white/20 bg-[#121215] text-white'
                    } flex flex-col items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-[9px] font-mono font-bold opacity-60 mt-0.5">
                      {item.step}
                    </span>
                  </div>

                  {/* Right Content Card */}
                  <div
                    className={`flex-1 p-4 sm:p-5 rounded-2xl ${
                      isMaintenance
                        ? 'bg-sky-500/10 border border-sky-500/30'
                        : 'bg-white/[0.02] border border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                      <h4 className="text-sm sm:text-base font-extrabold uppercase text-white">
                        {item.title}
                      </h4>
                      <span
                        className={`text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                          isMaintenance ? 'bg-sky-400 text-black' : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {item.subtitle}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light leading-relaxed">
                      {item.desc}
                    </p>
                    {isMaintenance && (
                      <div className="mt-2.5 pt-2 border-t border-sky-500/20 flex items-center gap-1.5 text-xs font-bold text-sky-300">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Ongoing Maintenance: ₹599/month</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner CTA */}
        <div className="rounded-3xl sm:rounded-[40px] bg-gradient-to-r from-zinc-900 to-[#121215] border border-white/15 p-8 sm:p-12 text-center flex flex-col items-center gap-6 shadow-[0_20px_80px_rgba(0,0,0,0.7)] relative overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              Ready To Bring Your Vision To Life?
            </h2>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mt-2 font-light">
              Let's schedule a consultation to discuss project architecture, deliverables, and optional ₹599/month ongoing maintenance.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button
              onClick={() =>
                handleOpenModal(
                  "Hi Muna, I'd like to schedule a consultation for an upcoming app/web project. Let's talk!"
                )
              }
              className="px-6 sm:px-8 py-3 rounded-full bg-white text-[#0C0C0C] font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-[#D7E2EA] transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <span>Let's Talk About Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="/#projects"
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-xs sm:text-sm border border-white/10 transition-colors"
            >
              Explore Portfolio
            </a>
          </div>
        </div>

        {/* Technical FAQ Section (Moved to Last, Without Box Design) */}
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pt-4 pb-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-bold mb-1 block">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/60 font-light mt-1">
              Everything you need to know about pricing, deliverables, and the ₹599/month maintenance support.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-white/10 mt-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="py-5">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-[#D7E2EA] transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-white/50 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="overflow-hidden">
                      <p className="pt-3 text-xs sm:text-sm text-[#D7E2EA]/70 font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reusable Contact Modal */}
      <LetsTalkModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        defaultMessage={modalState.defaultMessage}
      />
    </div>
  );
}
