import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const footerNav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Email', href: 'mailto:munakousalya@example.com' },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] relative z-[60] overflow-hidden rounded-t-[40px] sm:rounded-t-[60px] md:rounded-t-[80px] -mt-10 sm:-mt-16"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-gradient-to-b from-[#D7E2EA]/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 pt-16 sm:pt-24 pb-6 flex flex-col items-center">
        
        {/* TOP: Large CTA */}
        <div className="flex flex-col items-center text-center max-w-4xl w-full mb-20 sm:mb-28">
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
            <motion.a
              href="mailto:munakousalya@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-[#D7E2EA] text-[#0C0C0C] rounded-full overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
              <span className="font-bold uppercase tracking-widest text-xs sm:text-sm relative z-10">
                Start a Conversation
              </span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          </FadeIn>
        </div>

        {/* MIDDLE: Footer Navigation */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 mb-12 lg:mb-16">
          
          {/* Brand */}
          <FadeIn delay={0.3} y={20} className="md:col-span-5 flex flex-col gap-3">
            <h3 className="font-kanit font-bold text-xl sm:text-2xl tracking-tight text-[#D7E2EA] uppercase">
              Muna Kousalya
            </h3>
            <p className="text-[#D7E2EA]/50 font-light text-xs sm:text-sm leading-relaxed max-w-xs">
              Full-Stack Developer &bull; UI Designer &bull; Creative Technologist
            </p>
          </FadeIn>

          {/* Navigation Links */}
          <FadeIn delay={0.4} y={20} className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-[#D7E2EA]/40 text-[10px] font-bold uppercase tracking-[0.2em]">Navigation</h4>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              {footerNav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#D7E2EA]/80 font-medium text-xs sm:text-sm hover:text-[#D7E2EA] transition-colors duration-300 w-max group relative"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D7E2EA] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </FadeIn>

          {/* Connect Links */}
          <FadeIn delay={0.5} y={20} className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-[#D7E2EA]/40 text-[10px] font-bold uppercase tracking-[0.2em]">Connect</h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#D7E2EA]/80 font-medium text-xs sm:text-sm hover:text-[#D7E2EA] transition-all duration-300 hover:translate-x-2 w-max"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </FadeIn>

        </div>

        {/* BOTTOM: Copyright & Signature */}
        <FadeIn delay={0.6} className="w-full pt-6 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#D7E2EA]/40 text-[10px] font-medium uppercase tracking-widest text-center sm:text-left">
          <span>&copy; 2026 Muna Kousalya. All rights reserved.</span>
          <span>Built with passion, creativity & code.</span>
        </FadeIn>

      </div>
    </section>
  );
};

export default ContactSection;
