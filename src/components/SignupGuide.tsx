import { motion } from 'motion/react';
import { UserPlus, Smartphone, Gift, ShieldCheck, CreditCard, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { title: "Visit Official Site", desc: "Go to cricbet99.win or trusted domains.", icon: <Smartphone /> },
  { title: "Click Signup", desc: "Find the register button on the homepage.", icon: <UserPlus /> },
  { title: "Fill Details", desc: "Enter name, mobile, and secure password.", icon: <CheckCircle2 /> },
  { title: "Verify Account", desc: "Enter the OTP received via SMS/Email.", icon: <ShieldCheck /> },
  { title: "Deposit Funds", desc: "Use UPI, Net Banking, or Wallets.", icon: <CreditCard /> },
  { title: "Claim 100% Bonus", desc: "Get your first deposit doubled instantly.", icon: <Gift /> },
];

export default function SignupGuide() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <div className="mb-6">
          <img 
            src="https://cricbet99india.com/wp-content/uploads/2025/03/cricbet99-min-2-2-300x72-1.webp" 
            alt="Cricbet99 Logo" 
            className="h-10 md:h-14 mx-auto mb-4"
            referrerPolicy="no-referrer"
          />
          <span className="text-gold font-outfit text-xl md:text-2xl font-black italic uppercase tracking-widest">Signup Guide</span>
        </div>
        <p className="text-white/60 max-w-2xl mx-auto">
          Registration at Cricbet99 is the primary step to a safe, sound, and thrilling online gambling experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            className="glass p-8 rounded-3xl border-gold/10 hover:border-gold/40 transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <span className="text-4xl font-black font-outfit text-gold/10">0{i + 1}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 font-outfit text-white">{step.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 glass p-8 md:p-12 rounded-[3rem] border-gold/20 bg-gold/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-outfit text-3xl font-bold mb-6">Why Signup on Cricbet99?</h3>
            <ul className="space-y-4">
              {[
                "Secure and Verified Accounts",
                "Access to Cricbet99 Mobile App",
                "100% Welcome Bonus on First Deposit",
                "Wide Range of Betting Options",
                "Easy & Instant Transactions"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center md:text-left">
            <p className="text-white/60 italic mb-8">
              "Registration at Cricbet99 is the primary step to a safe, sound, and thrilling online gambling experience. Golden Play is a site that enables you to do all that on the site, whether you are a fan of cricket, other sports, or casino games."
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold text-obsidian px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm"
            >
              Get Your ID Now
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
