import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WhatsAppHub() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !showPopup && !hasBeenClosed) {
        setShowPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showPopup, hasBeenClosed]);

  const handleClose = () => {
    setShowPopup(false);
    setHasBeenClosed(true);
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="glass p-8 rounded-[2.5rem] border-gold/30 shadow-[0_0_50px_rgba(246,196,69,0.2)] max-w-[320px] w-full relative z-10"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,211,102,0.4)]">
                  <MessageCircle className="w-10 h-10 text-white fill-white" />
                </div>

                <div className="mb-4">
                  <img
                    src="https://cricbet99india.com/wp-content/uploads/2025/03/cricbet99-min-2-2-300x72-1.webp"
                    alt="Cricbet99 Logo"
                    className="h-8 mx-auto mb-2"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-gold font-outfit text-sm font-black italic uppercase tracking-widest">Support</span>
                </div>

                <div className="text-neon-green text-xs flex items-center gap-2 uppercase font-bold tracking-[0.2em] mb-6">
                  <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  Online Now
                </div>

                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  Welcome to the elite club! Get your <span className="text-gold font-bold">100% Welcome Bonus</span> instantly. Message us to get your ID now!
                </p>

                <a
                  href="https://wa.me/yournumber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#25D366] text-white text-center py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#128C7E] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25D366]/20"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        {/* Button 1: Main */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass px-4 py-2 rounded-full text-gold font-bold text-xs shadow-xl"
          >
            Get New ID
          </motion.div>
          <motion.a
            href="https://wa.me/yournumber1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.5)] cursor-pointer"
          >
            <MessageCircle className="w-8 h-8 text-white fill-white" />
          </motion.a>
        </div>

        {/* Button 2: Deposit/Withdraw */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass px-4 py-2 rounded-full text-gold font-bold text-xs shadow-xl"
          >
            Deposit/Withdraw
          </motion.div>
          <motion.a
            href="https://wa.me/yournumber2"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-[#128C7E] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(18,140,126,0.5)] cursor-pointer"
          >
            <MessageCircle className="w-8 h-8 text-white fill-white" />
          </motion.a>
        </div>

        {/* Button 3: Customer Care */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass px-4 py-2 rounded-full text-gold font-bold text-xs shadow-xl"
          >
            24/7 Support
          </motion.div>
          <motion.a
            href="https://wa.me/yournumber3"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-14 h-14 bg-obsidian border border-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.3)] cursor-pointer"
          >
            <MessageCircle className="w-8 h-8 text-[#25D366] fill-[#25D366]/20" />
          </motion.a>
        </div>
      </div>

    </>
  );
}
