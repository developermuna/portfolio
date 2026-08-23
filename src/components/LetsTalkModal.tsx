import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LetsTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMessage: string;
}

export default function LetsTalkModal({ isOpen, onClose, defaultMessage }: LetsTalkModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Update message and lock/unlock scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMessage(defaultMessage);
      // Lock scroll
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      // Unlock scroll
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    }

    return () => {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [isOpen, defaultMessage]);

  // Close modal automatically if the user clicks any link or button outside the modal
  useEffect(() => {
    if (!isOpen) return;
    
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // If it's a click on the backdrop, the backdrop's onClick will handle it
      if (target.classList.contains('modal-backdrop')) return;
      
      // Check if they clicked a button or link
      const clickedInteractive = target.closest('a, button');
      const isInsideModal = target.closest('.modal-container');
      
      if (clickedInteractive && !isInsideModal) {
        onClose();
      }
    };

    // Use capture phase to ensure it runs before React event delegation
    window.addEventListener('click', handleGlobalClick, { capture: true });
    
    // Fallback: also listen to hashchange just in case
    const handleHashChange = () => onClose();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true });
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the mailto link
    const targetEmail = "blacksdevil2004@gmail.com";
    const subject = encodeURIComponent(`New Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    // Open default mail client
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0C0C0C]/80 backdrop-blur-sm cursor-pointer modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 modal-container"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl sm:text-3xl font-kanit font-black uppercase text-white mb-2">
              Let's Talk
            </h3>
            <p className="text-[#D7E2EA]/60 text-sm mb-6">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-bold">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-bold">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-bold">Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-4 flex items-center justify-center gap-2 w-full bg-white text-[#0C0C0C] font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <span>Send Message</span>
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
