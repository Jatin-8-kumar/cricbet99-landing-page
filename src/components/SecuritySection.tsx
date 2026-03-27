import { motion } from 'motion/react';
import { Shield, Lock, Eye, Zap, Smartphone, HeartHandshake } from 'lucide-react';

export default function SecuritySection() {
  return (
    <section className="py-24 px-6 bg-gold/5 border-y border-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <h2 className="font-outfit text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              Security & <span className="text-gold">Account Safety</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Cricbet99 prioritizes account security. Our platform uses high-end encryption to ensure all your data and transactions are 100% secure.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: <Lock className="text-gold" />, text: "Two-step verification for login" },
                { icon: <Shield className="text-gold" />, text: "Secure password management" },
                { icon: <Zap className="text-gold" />, text: "Encrypted financial transactions" },
                { icon: <Eye className="text-gold" />, text: "Account activity monitoring" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 glass p-4 rounded-2xl border-gold/10">
                  {item.icon}
                  <span className="text-sm font-bold text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glass p-10 rounded-[3rem] border-gold/20 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <HeartHandshake className="w-10 h-10 text-neon-green" />
                <h3 className="font-outfit text-2xl font-bold uppercase">Responsible Gaming</h3>
              </div>
              <p className="text-white/60 mb-8 leading-relaxed">
                Cricbet99 encourages users to bet responsibly. We promote safe and enjoyable betting experiences through self-limiting tools and expert guidance.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Setting personal deposit and betting limits",
                  "Avoiding chasing losses",
                  "Understanding the risks associated with betting",
                  "Using self-limiting tools if needed"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-1 h-1 rounded-full bg-neon-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="text-neon-green font-bold uppercase tracking-widest text-xs hover:underline underline-offset-4">
                Know More About Responsible Gaming
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-neon-green/10 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
