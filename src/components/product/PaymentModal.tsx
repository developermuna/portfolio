import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import type { Product } from '../../hooks/useSupabaseData';
import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const PaymentModal = ({ isOpen, onClose, product }: PaymentModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false);

  if (!product) return null;

  const upiId = 'your_upi_id@upi'; // Placeholder UPI ID
  const price = product.Price || 0;
  // Use a free QR Code generator API for the UPI link
  const upiUrl = `upi://pay?pa=${upiId}&pn=Seller&am=${price}&cu=INR&tn=Payment for ${product.title}`;
  const encodedUpiUrl = encodeURIComponent(upiUrl);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedUpiUrl}`;

  const handleSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#111111] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            <div className="p-6 sm:p-8 flex flex-col items-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <CheckCircle2 size={80} className="text-green-500 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                  <p className="text-gray-400 text-center">Thank you for your purchase. We will process your order shortly.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2 text-center">Complete Purchase</h3>
                  <p className="text-gray-400 text-sm mb-6 text-center">
                    Scan the QR code to pay for <strong>{product.title}</strong>
                  </p>

                  <div className="bg-white p-4 rounded-2xl mb-6">
                    <img src={qrCodeUrl} alt="UPI QR Code" className="w-48 h-48 object-contain" />
                  </div>

                  <div className="text-center mb-8">
                    <span className="text-gray-400 text-sm block mb-1">Amount to pay</span>
                    <span className="text-3xl font-black text-white">₹{price.toLocaleString()}</span>
                  </div>

                  <div className="w-full space-y-3">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider text-center mb-4">Or pay using installed apps</p>
                    <div className="grid grid-cols-2 gap-3">
                      <a 
                        href={upiUrl}
                        className="flex items-center justify-center py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
                      >
                        Google Pay
                      </a>
                      <a 
                        href={upiUrl}
                        className="flex items-center justify-center py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
                      >
                        PhonePe
                      </a>
                      <a 
                        href={upiUrl}
                        className="flex items-center justify-center py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
                      >
                        Paytm
                      </a>
                      <a 
                        href={upiUrl}
                        className="flex items-center justify-center py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
                      >
                        Other UPI App
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleSuccess}
                    className="w-full mt-6 py-4 rounded-xl bg-[#D7E2EA] text-[#0C0C0C] font-bold uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    I have paid
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
