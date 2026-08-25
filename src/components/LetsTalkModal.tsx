import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { 
  validateContactInput, 
  sendContactForm, 
  getCooldownRemaining,
  type FormValidationResult 
} from '../services/emailService';

interface LetsTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMessage: string;
}

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

export default function LetsTalkModal({ isOpen, onClose, defaultMessage }: LetsTalkModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormValidationResult['errors']>({});
  const [cooldown, setCooldown] = useState(0);

  // Update message, reset status, and lock/unlock scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMessage(defaultMessage);
      setStatus('idle');
      setStatusMessage('');
      setFieldErrors({});
      setCooldown(getCooldownRemaining());
      
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

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Close modal on Escape key or navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleNavigation = () => onClose();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [isOpen, onClose]);

  const handleFieldBlur = (field: 'name' | 'email' | 'message') => {
    const validation = validateContactInput(name, email, message);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: validation.errors[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Check cooldown
    const remainingCooldown = getCooldownRemaining();
    if (remainingCooldown > 0) {
      setCooldown(remainingCooldown);
      setStatus('error');
      setStatusMessage(`Please wait ${remainingCooldown}s before sending another message.`);
      return;
    }

    // Client-side validation
    const validation = validateContactInput(name, email, message);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setStatus('error');
      setStatusMessage('Please fix the errors above before submitting.');
      return;
    }

    if (!formRef.current) return;

    setStatus('sending');
    setStatusMessage('');
    setFieldErrors({});

    try {
      const result = await sendContactForm(formRef.current);
      if (result.success) {
        setStatus('success');
        setStatusMessage(result.message);
        setName('');
        setEmail('');
        setMessage('');
        setHoneypot('');
        setCooldown(getCooldownRemaining());
      } else {
        setStatus('error');
        setStatusMessage(result.message);
        if (result.cooldownRemaining) {
          setCooldown(result.cooldownRemaining);
        }
      }
    } catch {
      setStatus('error');
      setStatusMessage('Unable to send your message right now. Please try again later.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000000] flex items-center justify-center px-4">
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
            className="relative w-full max-w-lg bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 modal-container max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl sm:text-3xl font-kanit font-black uppercase text-white mb-2">
              Let's Talk
            </h3>
            <p className="text-[#D7E2EA]/60 text-sm mb-6">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            {/* Status Feedback Banner */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-start gap-3"
                role="status"
              >
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                <span>{statusMessage}</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3"
                role="alert"
              >
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{statusMessage}</span>
              </motion.div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* Anti-spam Honeypot Field (invisible to screen readers & regular users) */}
              <div 
                aria-hidden="true" 
                style={{ 
                  opacity: 0, 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  height: 0, 
                  width: 0, 
                  zIndex: -1, 
                  overflow: 'hidden' 
                }}
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Hidden Date Field for EmailJS Template */}
              <input
                type="hidden"
                name="date"
                value={new Date().toLocaleString()}
              />

              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="user_name" className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-bold">
                  Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  onBlur={() => handleFieldBlur('name')}
                  disabled={status === 'sending'}
                  className={`w-full bg-[#1A1A1A] border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                    fieldErrors.name ? 'border-rose-500/60 focus:border-rose-500' : 'border-white/5 focus:border-white/20'
                  }`}
                  placeholder="John Doe"
                />
                {fieldErrors.name && (
                  <p className="text-xs text-rose-400 mt-0.5">{fieldErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="user_email" className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-bold">
                  Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  onBlur={() => handleFieldBlur('email')}
                  disabled={status === 'sending'}
                  className={`w-full bg-[#1A1A1A] border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                    fieldErrors.email ? 'border-rose-500/60 focus:border-rose-500' : 'border-white/5 focus:border-white/20'
                  }`}
                  placeholder="john@example.com"
                />
                {fieldErrors.email && (
                  <p className="text-xs text-rose-400 mt-0.5">{fieldErrors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-bold">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={3000}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (fieldErrors.message) setFieldErrors(prev => ({ ...prev, message: undefined }));
                  }}
                  onBlur={() => handleFieldBlur('message')}
                  disabled={status === 'sending'}
                  rows={5}
                  className={`w-full bg-[#1A1A1A] border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors resize-none ${
                    fieldErrors.message ? 'border-rose-500/60 focus:border-rose-500' : 'border-white/5 focus:border-white/20'
                  }`}
                  placeholder="Tell me about your project or inquiry..."
                />
                {fieldErrors.message && (
                  <p className="text-xs text-rose-400 mt-0.5">{fieldErrors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending' || cooldown > 0}
                className="mt-4 flex items-center justify-center gap-2 w-full bg-white text-[#0C0C0C] font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : cooldown > 0 ? (
                  <span>Wait {cooldown}s</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
