import { motion } from 'motion/react';
import { Trophy, ArrowUpRight } from 'lucide-react';

const WINNERS = [
  { name: "Rahul ****", amount: "₹4,50,000", game: "Cricket Exchange" },
  { name: "Suresh ****", amount: "₹1,20,000", game: "Live Casino" },
  { name: "Amit ****", amount: "₹85,000", game: "Aviator" },
  { name: "Vikram ****", amount: "₹2,10,000", game: "Football" },
  { name: "Priya ****", amount: "₹55,000", game: "Roulette" },
];

export default function Leaderboard() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <Trophy className="w-10 h-10 text-gold" />
        <h2 className="font-outfit text-4xl font-extrabold italic uppercase tracking-tighter">
          Winner's <span className="text-gold">Leaderboard</span>
        </h2>
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="grid grid-cols-3 p-6 border-b border-gold/20 bg-gold/5 font-bold uppercase text-xs tracking-widest text-gold/70">
          <span>Player</span>
          <span>Amount</span>
          <span>Game</span>
        </div>
        <div className="divide-y divide-gold/10">
          {WINNERS.map((winner, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
              className="grid grid-cols-3 p-6 items-center hover:bg-gold/5 transition-colors group cursor-default"
            >
              <span className="font-bold text-white">{winner.name}</span>
              <span className="font-mono text-neon-green font-bold">{winner.amount}</span>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                {winner.game}
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
