import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const TermsConditionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit pb-20 relative z-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-[#D7E2EA]/10 w-full pt-20 sm:pt-24 pb-6 px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase leading-none mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              Terms & Conditions
            </h1>
            <p className="text-gray-400 font-medium tracking-widest text-xs sm:text-sm uppercase">
              Last Updated: August 24, 2026
            </p>
          </motion.div>
          
          <a 
            href="#home" 
            className="flex items-center justify-center gap-2 text-[#0C0C0C] bg-[#D7E2EA] hover:bg-white px-5 py-2.5 rounded-full transition-colors group w-max text-xs sm:text-sm shadow-xl"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold tracking-wide uppercase">Back to Home</span>
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto mt-12 px-6 sm:px-12">
        <FadeIn delay={0.2}>
          <div className="space-y-8 text-gray-400 font-light leading-relaxed">
            
            <div className="bg-[#D7E2EA]/5 border border-white/10 rounded-2xl p-6 text-base sm:text-lg text-white font-normal">
              By using this website, you agree to the terms described below. If you do not agree with these terms, please do not use the website.
            </div>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                1. About This Website
              </h2>
              <p className="mb-3">
                This website is my personal portfolio. It is used to showcase my skills, projects, experience, achievements, and the services I offer.
              </p>
              <p>
                Some projects shown on the website may be personal projects, academic projects, concept projects, or work completed for clients.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                2. Services
              </h2>
              <p className="mb-3">
                If I offer development, design, consulting, or other services through this website, the project requirements, pricing, timeline, deliverables, and other details will be discussed and agreed upon before the work begins.
              </p>
              <p>
                A service or project will only be considered confirmed after the required agreement and/or payment has been completed.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                3. Payments
              </h2>
              <p className="mb-3">
                Where payment is required, you must make the payment using the payment method provided on the website or the payment method agreed upon with me.
              </p>
              <p>
                The applicable price and payment terms will be communicated before the service or project is confirmed.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                4. Using My Website and Content
              </h2>
              <p className="mb-3">
                You are welcome to view and explore this website for personal and professional purposes.
              </p>
              <p className="mb-3">
                However, you should not copy, reproduce, redistribute, sell, or reuse my original website design, source code, written content, graphics, or other original materials without permission.
              </p>
              <p>
                You must also not attempt to damage the website, gain unauthorized access, upload malicious code, or use the website for illegal or fraudulent activities.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                5. Intellectual Property
              </h2>
              <p className="mb-3">
                Unless specifically mentioned otherwise, the original design, source code, graphics, written content, branding, and other materials created for this website belong to me or their respective owners.
              </p>
              <p>
                Third-party libraries, frameworks, logos, trademarks, APIs, images, and other third-party materials remain the property of their respective owners.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                6. Portfolio Projects
              </h2>
              <p className="mb-3">
                The projects displayed in my portfolio are presented to demonstrate my skills and experience.
              </p>
              <p>
                Some projects may be demonstrations, concepts, personal projects, academic projects, or client work. Project information may change or be updated over time.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                7. External Links
              </h2>
              <p className="mb-3">
                My website may contain links to external websites such as GitHub, LinkedIn, project websites, payment providers, or other third-party services.
              </p>
              <p>
                I am not responsible for the content, security, availability, or privacy practices of those external websites.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                8. Website Information
              </h2>
              <p className="mb-3">
                I try to keep the information on this website accurate and up to date. However, there may occasionally be errors, outdated information, or missing information.
              </p>
              <p>
                I may update, change, or remove website content, services, prices, or features at any time.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                9. Limitation of Responsibility
              </h2>
              <p>
                I am not responsible for losses or problems caused by the misuse of this website, third-party services, technical problems outside my control, or information obtained from external websites.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                10. Changes to These Terms
              </h2>
              <p>
                These Terms & Conditions may be updated from time to time. Any updated version will be published on this page.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                11. Contact
              </h2>
              <p>
                If you have any questions about these Terms & Conditions, please contact me through the Contact section of this website.
              </p>
            </section>

          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
