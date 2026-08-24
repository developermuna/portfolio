import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const PrivacyPolicyPage = () => {
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
              Privacy Policy
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
          <div className="prose prose-invert prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed prose-headings:text-white prose-headings:uppercase prose-headings:tracking-wide prose-headings:font-semibold max-w-none">
            
            <p className="text-lg mb-8">
              Welcome to my portfolio website. Your privacy is important to me. This Privacy Policy explains what information I may collect when you use this website, why I collect it, and how I use and protect it.
            </p>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-white/10 pb-2">1. Information I May Collect</h2>
              <p className="mb-4">
                When you contact me, request a service, submit a form, or interact with certain features of the website, I may collect information such as your name, email address, phone number, project requirements, and other information that you choose to provide.
              </p>
              <p>
                The website may also automatically collect basic technical information such as your browser type, device type, IP address, and general website usage information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-white/10 pb-2">2. How I Use Your Information</h2>
              <p className="mb-4">I may use the information you provide to:</p>
              <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-400 font-light">
                <li>Respond to your messages and inquiries.</li>
                <li>Understand your project or service requirements.</li>
                <li>Provide requested services.</li>
                <li>Communicate with you about your project or order.</li>
                <li>Process payments when applicable.</li>
                <li>Provide customer support.</li>
                <li>Improve the website and user experience.</li>
                <li>Protect the website from fraud, abuse, or unauthorized activity.</li>
              </ul>
              <p>
                I do not sell or rent your personal information to other people or companies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-white/10 pb-2">3. Payment Information</h2>
              <p className="mb-4">
                If you make a payment through a third-party payment gateway, your payment information may be processed directly by that payment provider.
              </p>
              <p>
                I do not ask for or intentionally store sensitive payment information such as your UPI PIN, banking password, CVV, or complete card details on this website.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-white/10 pb-2">4. Cookies</h2>
              <p className="mb-4">
                This website may use cookies or similar technologies to remember preferences, improve website performance, understand how visitors use the website, and provide certain features.
              </p>
              <p>
                You can manage or disable cookies through your browser settings.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-white/10 pb-2">5. Third-Party Services</h2>
              <p className="mb-4">
                Some parts of this website may use third-party services such as hosting providers, payment gateways, authentication services, analytics tools, cloud storage, or communication services.
              </p>
              <p>
                These services may process information according to their own privacy policies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-white/10 pb-2">6. How I Protect Your Information</h2>
              <p className="mb-4">
                I take reasonable steps to protect the information you provide and prevent unauthorized access, misuse, or disclosure.
              </p>
              <p>
                However, no website or online service can guarantee complete security.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-white/10 pb-2">7. How Long I Keep Your Information</h2>
              <p>
                I keep personal information only for as long as reasonably necessary to provide services, communicate with you, maintain appropriate business records, resolve issues, or meet legal requirements.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-white/10 pb-2">8. Your Privacy Choices</h2>
              <p>
                If you want to know what personal information I have about you, correct your information, or request deletion where applicable, you can contact me using the contact details available on this website.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-white/10 pb-2">9. Changes to This Privacy Policy</h2>
              <p>
                I may update this Privacy Policy from time to time. If I make changes, the updated version will be published on this page along with a new "Last Updated" date.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl sm:text-2xl mb-4 border-b border-white/10 pb-2">10. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy or how your information is handled, please contact me through the Contact section of this website.
              </p>
            </section>
            
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
