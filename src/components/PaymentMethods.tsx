import { motion } from 'motion/react';
import { CreditCard, Wallet, Landmark, Zap, MessageCircle } from 'lucide-react';

const METHODS = [
  { name: "UPI", icon: <Zap className="text-gold" />, desc: "Instant transfers via PhonePe, GPay, Paytm" },
  { name: "Net Banking", icon: <Landmark className="text-gold" />, desc: "Secure transfers from all major Indian banks" },
  { name: "E-Wallets", icon: <Wallet className="text-gold" />, desc: "Fast deposits via popular digital wallets" },
  { name: "Cards", icon: <CreditCard className="text-gold" />, desc: "Visa, Mastercard, and RuPay supported" },
];

export default function PaymentMethods() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-outfit text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
          Deposit & <span className="text-gold">Withdrawal</span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Cricbet99 provides quick and safe deposits and withdrawals. Your money is credited instantaneously.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METHODS.map((method, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            className="glass p-8 rounded-3xl border-gold/10 hover:border-gold/30 transition-all text-center"
          >
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              {method.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 font-outfit">{method.name}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{method.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full border-neon-green/20 text-neon-green text-sm font-bold">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          Average Withdrawal Time: 15-30 Minutes
        </div>
        <motion.a
          href="https://wa.me/yournumber"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#25D366] text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-[#25D366]/20"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          Deposit via WhatsApp
        </motion.a>
      </div>
    </section>
  );
}
