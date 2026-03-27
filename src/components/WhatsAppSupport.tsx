import { motion } from 'motion/react';
import { MessageCircle, ShieldCheck, CreditCard, UserPlus, Headset, Zap, ChevronRight } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';


const DEPARTMENTS = [
  {
    name: "Get New ID",
    desc: "Instant ID generation",
    icon: <UserPlus className="w-6 h-6" />,
    color: "bg-[#25D366]",
    link: "https://wa.me/yournumber1"
  },
  {
    name: "Deposit/Withdraw",
    desc: "Fastest transactions",
    icon: <CreditCard className="w-6 h-6" />,
    color: "bg-[#128C7E]",
    link: "https://wa.me/yournumber2"
  },
  {
    name: "VIP Support",
    desc: "Exclusive elite help",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "bg-gold text-obsidian",
    link: "https://wa.me/yournumber3"
  },
  {
    name: "General Inquiry",
    desc: "24/7 Expert assistance",
    icon: <Headset className="w-6 h-6" />,
    color: "bg-obsidian border border-gold/30",
    link: "https://wa.me/yournumber4"
  }
];

export default function WhatsAppSupport() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-obsidian">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gold/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-6"
          >
            <MessageCircle className="w-4 h-4" />
            Direct Support
          </motion.div>
          <h2 className="font-outfit text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
            CONNECT VIA <span className="text-gold">WHATSAPP</span>
          </h2>
          <p className="text-white/40 text-sm md:text-lg uppercase tracking-widest">Choose a department for instant help</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS.map((dept, i) => (
            <motion.a
              key={i}
              href={dept.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ delay: i * 0.1 }}
              className={`glass p-8 rounded-[2rem] border-gold/10 flex flex-col items-center text-center group hover:border-gold/50 transition-all`}
            >
              <div className={`w-16 h-16 ${dept.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform`}>
                {dept.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 font-outfit text-white">{dept.name}</h3>
              <p className="text-white/50 text-sm mb-6">{dept.desc}</p>
              <div className="mt-auto flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest">
                Chat Now <MessageCircle className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
           <WhatsAppButton text="Get Started with Official ID" size="lg" variant="secondary" />
        </div>
      </div>
    </section>
  );
}
