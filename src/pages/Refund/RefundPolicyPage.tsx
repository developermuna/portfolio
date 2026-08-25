import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import FadeIn from '../../components/common/FadeIn';

const RefundPolicyPage = () => {
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
              Return & Refund Policy
            </h1>
            <p className="text-gray-400 font-medium tracking-widest text-xs sm:text-sm uppercase">
              Last Updated: August 24, 2026
            </p>
          </motion.div>
          
          <a 
            href="/" 
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
            
            <p className="text-base sm:text-lg text-[#D7E2EA]">
              I want to make my payment and service terms clear before you purchase a service. Please review this policy before making a payment.
            </p>

            {/* Highlighted Section: No Returns */}
            <section className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="text-amber-400 flex-shrink-0" size={24} />
                <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide">
                  1. No Returns After Purchase
                </h2>
              </div>
              <p className="mb-3 text-gray-300">
                Services, digital products, development work, design work, and other services purchased through this website cannot be physically returned.
              </p>
              <p className="text-gray-300 font-normal">
                Once a service or project has been confirmed and payment has been made, it cannot be returned.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                2. Refunds
              </h2>
              <p className="mb-3">
                Payments are generally non-refundable once a service or project has been confirmed or work has started.
              </p>
              <p>
                However, if a refund is required by applicable law or a refund has been specifically agreed upon in writing, the situation will be reviewed accordingly.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                3. Cancellation After Work Begins
              </h2>
              <p>
                If you cancel a project after work has already started, the amount already paid may not be refundable because time, resources, development work, design work, or other project-related work may already have been used.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                4. Changes and Revisions
              </h2>
              <p className="mb-3">
                If revisions are included in your selected service, they will be provided according to the scope discussed before the project begins.
              </p>
              <p>
                If you request major changes or additional features that were not part of the original requirements, they may require additional payment.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                5. Duplicate or Incorrect Payments
              </h2>
              <p className="mb-3">
                If you accidentally make the same payment more than once or believe you have been charged incorrectly, please contact me as soon as possible and provide the relevant payment or transaction details.
              </p>
              <p>
                I will review the transaction and take appropriate action.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                6. Failed Payments
              </h2>
              <p className="mb-3">
                If money has been deducted from your account but the payment shows as failed or the service was not confirmed, please contact me with the transaction details.
              </p>
              <p>
                The payment status will be checked with the relevant payment provider before any action is taken.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                7. How to Contact Me
              </h2>
              <p className="mb-3">
                If you have any questions about payments, cancellations, or refunds, please contact me through the Contact section of this website.
              </p>
              <p>
                Please include relevant details such as your name, email address, order/project information, and payment reference when contacting me about a payment issue.
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-colors">
              <h2 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-3 border-b border-white/10 pb-2">
                8. Policy Updates
              </h2>
              <p>
                This Return & Refund Policy may be updated from time to time. Any changes will be published on this page with an updated "Last Updated" date.
              </p>
            </section>

          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
