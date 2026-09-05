import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Layers,
  Box,
  CheckCircle2,
  Clock,
  Home,
} from 'lucide-react';
import LetsTalkModal from '../../components/LetsTalkModal';

export default function InteriorComingSoonPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Interior Design & 3D Visualization | Coming Soon';
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#E4E4E7] font-kanit relative overflow-x-hidden selection:bg-white selection:text-black">
      {/* Background Architectural Grid Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-[#09090B]" />
      </div>

      {/* Top Studio Bar */}
      <header className="sticky top-0 z-40 bg-[#09090B]/85 backdrop-blur-xl border-b border-white/10 px-5 sm:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black text-sm">
              <Compass className="w-4 h-4 text-black" />
            </div>
            <div>
              <span className="font-extrabold uppercase tracking-widest text-xs sm:text-sm text-white">
                Muna Spatial Studio
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] text-white/40 font-mono">
                // 3D & Interior Architecture
              </span>
            </div>
          </div>

          <a
            href="/"
            className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Developer Portfolio</span>
          </a>
        </div>
      </header>

      {/* Hero / Coming Soon Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20 flex flex-col items-center text-center">
        {/* Animated Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(251,191,36,0.1)]"
        >
          <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Under Construction • Launching Soon</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white max-w-4xl mb-6"
        >
          The website is coming soon
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 max-w-2xl text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10"
        >
          We are putting the final touches on our dedicated interior design and 3D architectural visualization platform. Soon you will be able to explore photorealistic renderings, spatial blueprints, and immersive 3D walkthroughs.
        </motion.p>

        {/* Launch Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-md p-5 rounded-2xl bg-white/[0.03] border border-white/10 mb-12 flex flex-col gap-3"
        >
          <div className="flex justify-between text-xs font-mono text-white/60">
            <span>Website Development</span>
            <span className="text-white font-bold">85% Complete</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-white/40 pt-1">
            <span>Spatial Rendering Engine</span>
            <span>Target Domain: interior.munakousalya.online</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-20"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-[#D7E2EA] transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-black" />
            <span>Inquire About Interior Project</span>
          </button>

          <a
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-xs sm:text-sm border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </a>
        </motion.div>

        {/* Preview / Sneak Peek Grid */}
        <div className="w-full text-left">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs uppercase tracking-widest text-white/50 font-extrabold">
              Sneak Peek // What We Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: Box,
                title: 'Photorealistic 3D Renders',
                desc: 'Ultra-high-resolution architectural renderings capturing natural illumination, ray-traced materials, and exact textures.',
                badge: 'Cycles & V-Ray',
                image:
                  'https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/interior%20service.webp',
              },
              {
                icon: Layers,
                title: 'Spatial Planning & CAD',
                desc: 'Detailed 2D/3D floor layouts, ergonomic space optimization, and structural blueprints for modern residential and luxury interiors.',
                badge: 'SketchUp & Revit',
                image:
                  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop',
              },
              {
                icon: Compass,
                title: 'Bespoke Interior Concepts',
                desc: 'Custom mood boards, furniture curation, lighting design, and material specification tailored to your architectural vision.',
                badge: 'Conceptual Design',
                image:
                  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden flex flex-col group hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-full h-44 relative overflow-hidden bg-black/40">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/10">
                      {card.badge}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-base font-bold text-white uppercase">{card.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed mb-4">
                      {card.desc}
                    </p>
                    <div className="mt-auto flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Available for consultation</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Contact Box */}
        <div className="mt-16 w-full p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase">
              Have an urgent interior or 3D visualization project?
            </h3>
            <p className="text-xs sm:text-sm text-white/50 font-light mt-0.5">
              Direct discussions are open while the website platform is being finalized.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-white text-black font-extrabold uppercase tracking-wider text-xs hover:bg-[#D7E2EA] transition-colors flex-shrink-0"
          >
            Contact Muna Directly
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-5 text-center text-xs text-white/40 font-light">
        <p>© {new Date().getFullYear()} Muna Kousalya. All rights reserved. Interior Studio Platform launching soon.</p>
      </footer>

      {/* Contact Modal */}
      <LetsTalkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultMessage="Hi Muna, I saw your Interior Design studio preview page. I have an upcoming interior / 3D architectural project and would love to discuss details!"
      />
    </div>
  );
}
