import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, RefreshCw, Globe, ShieldCheck, Loader2 } from 'lucide-react';

interface EmbeddedWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
}

export default function EmbeddedWebsiteModal({
  isOpen,
  onClose,
  url = 'https://interior.munakousalya.online',
  title = 'Interior Design & 3D Architecture',
}: EmbeddedWebsiteModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  // Lock scroll and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen, onClose]);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100010] flex items-center justify-center p-2 sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Window Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="relative w-full max-w-7xl h-[92vh] max-h-[1000px] flex flex-col rounded-2xl sm:rounded-3xl bg-[#111113] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Browser Bar */}
            <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 bg-[#18181B] border-b border-white/10 flex-shrink-0 gap-2">
              {/* Traffic Lights & Title */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#FF5F56] hover:opacity-80 transition-opacity"
                    title="Close"
                  />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/90">
                  <Globe className="w-4 h-4 text-[#D7E2EA]/70 hidden sm:inline" />
                  <span className="truncate max-w-[130px] sm:max-w-[260px] font-semibold">{title}</span>
                </div>
              </div>

              {/* URL Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-black/40 border border-white/10 text-[11px] sm:text-xs text-white/70 max-w-[200px] sm:max-w-md truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="truncate font-mono tracking-tight">{url}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={handleRefresh}
                  className="p-1.5 sm:p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  title="Reload website"
                >
                  <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded-xl text-white/70 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  title="Close viewer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Content / Iframe Area */}
            <div className="relative flex-1 w-full h-full bg-[#0C0C0C] overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0C0C0C] z-10 gap-3">
                  <div className="relative flex items-center justify-center">
                    <Loader2 className="w-9 h-9 text-[#D7E2EA] animate-spin" />
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm font-medium tracking-wide">
                    Loading Interior Website...
                  </p>
                  <p className="text-white/40 text-[11px] sm:text-xs">
                    Connecting to {url}
                  </p>
                </div>
              )}

              <iframe
                key={iframeKey}
                src={url}
                title={title}
                onLoad={() => setIsLoading(false)}
                className="w-full h-full border-0 bg-[#0C0C0C]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
              />
            </div>

            {/* Bottom Bar Info / Fast Actions */}
            <div className="px-4 py-2 bg-[#141416] border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-white/50 gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Embedded In-Site Viewer</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Want full-screen experience?</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-medium hover:underline flex items-center gap-1"
                >
                  Open in New Tab <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
