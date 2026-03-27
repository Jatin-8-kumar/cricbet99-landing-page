import { motion } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: "How long does signup take?",
    a: "The registration process is instant. Verification usually takes a few minutes, allowing you to start betting almost immediately."
  },
  {
    q: "What is a Cricbet99 ID?",
    a: "A Cricbet99 ID is a unique, one-time identifier provided upon registration. It allows you to log in safely, monitor your bets, and claim rewards across the platform."
  },
  {
    q: "Can I use the Cricbet99 App after signup?",
    a: "Yes! Once you've registered, you can download and log in to the Cricbet99 App on both Android and iOS devices using your unique ID."
  },
  {
    q: "How do I claim the 100% bonus?",
    a: "The 100% Welcome Bonus is automatically credited to your account after your first successful deposit. It doubles your initial betting potential instantly."
  },
  {
    q: "Are deposits and withdrawals secure?",
    a: "Absolutely. We use encrypted financial transactions and two-step verification to ensure all your funds and personal details are 100% safe."
  },
  {
    q: "Is personal information safe?",
    a: "Yes, Cricbet99 prioritizes account security. All accounts are authenticated, and we monitor activity to prevent any unauthorized access."
  },
  {
    q: "What should I do if I face signup issues?",
    a: "Our customer support team is available 24/7 via WhatsApp. Just click the WhatsApp icon on our site for instant assistance with any registration issues."
  },
  {
    q: "Can I use multiple devices for betting?",
    a: "Yes, you can use your Cricbet99 ID to log in on multiple devices, including smartphones, tablets, and desktops, ensuring a seamless betting experience."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="font-outfit text-4xl font-extrabold italic uppercase tracking-tighter text-center mb-12">
        Expert <span className="text-gold">FAQ</span>
      </h2>
      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
            className="glass rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-6 flex items-center justify-between text-left hover:bg-gold/5 transition-colors"
            >
              <span className="font-bold text-lg">{faq.q}</span>
              <motion.div
                animate={{ rotate: openIdx === idx ? 180 : 0 }}
              >
                <ChevronDown className="w-5 h-5 text-gold" />
              </motion.div>
            </button>
            <motion.div
              initial={false}
              animate={{ height: openIdx === idx ? "auto" : 0, opacity: openIdx === idx ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-0 text-white/70 leading-relaxed">
                {faq.a}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
