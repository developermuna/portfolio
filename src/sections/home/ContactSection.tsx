import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../../components/common/FadeIn';
import { Mail, Phone, MapPin, Download } from 'lucide-react';
import LetsTalkModal from '../../components/LetsTalkModal';

const Github = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/><path d="M9 18c-4.5 1.5-5-2.5-7-3"/></svg>
);

const Linkedin = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

const Instagram = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const WhatsApp = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.065-.301-.15-1.265-.466-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.502.097-.206.05-.389-.024-.539-.073-.15-.673-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.21 2.095 3.18 5.076 4.465.709.305 1.262.488 1.694.624.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.016-1.426.248-.705.248-1.31.174-1.439-.074-.13-.273-.205-.573-.355zM12.004 2c-5.463 0-9.897 4.437-9.897 9.9 0 1.748.456 3.451 1.321 4.957L1.996 22l5.289-1.389c1.455.795 3.111 1.214 4.719 1.214 5.462 0 9.897-4.437 9.897-9.9 0-5.463-4.435-9.9-9.897-9.9m0 18.15c-1.48 0-2.932-.397-4.2-1.15l-.3-.178-3.125.82 .833-3.045-.196-.312a8.214 8.214 0 0 1-1.267-4.384c0-4.551 3.704-8.256 8.255-8.256 4.552 0 8.256 3.705 8.256 8.256 0 4.55-3.704 8.255-8.256 8.255"/>
  </svg>
);

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Condition', href: '/terms' },
  { label: 'Return Policy', href: '/refund' },
];

const socialLinks = [
  { icon: <MapPin size={18} />, href: 'https://maps.app.goo.gl/zDko6VWzriWEHHLF7', external: false },
  { icon: <Github size={18} />, href: 'https://github.com/', external: true },
  { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/muna-kousalya/', external: true },
  { icon: <Instagram size={18} />, href: 'https://www.instagram.com/serenity__de_m_on/', external: true },
];

const ContactSection = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] relative z-[60] overflow-hidden rounded-t-[40px] sm:rounded-t-[60px] md:rounded-t-[80px] -mt-10 sm:-mt-16 min-h-[calc(100vh-70px)] flex flex-col justify-between"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-gradient-to-b from-[#D7E2EA]/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 md:px-16 lg:px-20 pt-16 sm:pt-24 pb-6 flex flex-col items-center flex-grow">
        
        {/* TOP: Large CTA */}
        <div className="flex flex-col items-center text-center max-w-4xl w-full mb-10 sm:mb-20 flex-grow justify-center">
          <FadeIn delay={0} y={40}>
            <h2 className="font-kanit font-black leading-none tracking-tight text-[10vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] uppercase text-[#D7E2EA] mb-4">
              Let's Build<br />Something Great.
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.1} y={30}>
            <p className="text-[#D7E2EA]/60 font-light text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Have an idea, project, or opportunity in mind? Let's turn it into a modern digital experience.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <motion.button
              type="button"
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-[#D7E2EA] text-[#0C0C0C] rounded-full overflow-hidden cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
              <span className="font-bold uppercase tracking-widest text-sm sm:text-base relative z-10">
                Start a Conversation
              </span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </motion.button>
          </FadeIn>
        </div>

        {/* MIDDLE: Footer Links */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 mb-8 lg:mb-12">
          
          {/* Brand & Contact Info */}
          <FadeIn delay={0.3} y={20} className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-1">
              <img 
                src="https://pub-300810ae570e4983a2a928a706ef0133.r2.dev/Portfolio/Assets/logo.png" 
                alt="Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  window.location.hash = '#home';
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (window.confirm('open admin page')) {
                    window.location.hash = '#admin';
                  }
                }}
              />
              <h3 className="font-kanit font-bold text-xl sm:text-2xl tracking-tight text-[#D7E2EA] uppercase">
                Muna Kousalya
              </h3>
            </div>
            
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:blacksdevil2004@gmail.com"
                className="flex items-center gap-3 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors w-max"
              >
                <Mail size={16} />
                <span className="font-light text-sm">blacksdevil2004@gmail.com</span>
              </a>
              <a 
                href="tel:9040405798"
                className="flex items-center gap-3 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors w-max"
              >
                <Phone size={16} />
                <span className="font-light text-sm">+91 9040405798</span>
              </a>
              <a 
                href="https://wa.me/919040405798"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors w-max"
              >
                <WhatsApp size={16} />
                <span className="font-light text-sm">WhatsApp Me</span>
              </a>
            </div>
          </FadeIn>

          {/* Legal & Connect Group for mobile layout */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-7 gap-8 md:gap-6">
            
            {/* Legal Links */}
            <FadeIn delay={0.4} y={20} className="col-span-1 md:col-span-4 flex flex-col gap-4">
              <h4 className="text-[#D7E2EA]/40 text-xs font-bold uppercase tracking-[0.2em]">Legal</h4>
              <div className="flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[#D7E2EA]/80 font-medium text-xs sm:text-sm hover:text-[#D7E2EA] transition-colors duration-300 w-max group relative cursor-pointer"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D7E2EA] transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </FadeIn>

            {/* Connect Icons */}
            <FadeIn delay={0.5} y={20} className="col-span-1 md:col-span-3 flex flex-col gap-4">
              <h4 className="text-[#D7E2EA]/40 text-xs font-bold uppercase tracking-[0.2em]">Connect</h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-[#D7E2EA]/80 p-2 bg-[#D7E2EA]/5 rounded-full hover:bg-[#D7E2EA]/10 hover:text-[#D7E2EA] transition-all duration-300 hover:scale-110 flex items-center justify-center"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </FadeIn>

          </div>

          {/* App Install Button */}
          {deferredPrompt && (
            <FadeIn delay={0.55} y={20} className="w-full mt-10 sm:mt-16 flex justify-center pb-4">
              <button 
                onClick={handleInstallClick}
                className="flex items-center gap-2 bg-[#D7E2EA] text-[#0C0C0C] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 shadow-xl"
              >
                <Download size={18} />
                Install App
              </button>
            </FadeIn>
          )}

        </div>

        {/* BOTTOM: Copyright & Signature */}
        <FadeIn delay={0.6} className="w-full pt-6 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#D7E2EA]/40 text-xs font-medium uppercase tracking-widest text-center sm:text-left">
          <span>&copy; 2026 Muna Kousalya. All rights reserved.</span>
          <span>Built with passion, creativity & code.</span>
        </FadeIn>

      </div>

      <LetsTalkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultMessage="Hi Muna, I'd like to talk about a project or collaboration."
      />
    </section>
  );
};

export default ContactSection;
