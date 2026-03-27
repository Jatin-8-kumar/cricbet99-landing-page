import { motion } from 'motion/react';
import { Trophy, Users, Timer } from 'lucide-react';

const MATCHES = [
  {
    league: "IPL 2026",
    team1: "MI",
    team2: "CSK",
    score1: "185/4",
    score2: "142/2",
    overs: "15.4",
    status: "Live",
    odds1: "1.85",
    odds2: "2.10"
  },
  {
    league: "T20 World Cup",
    team1: "IND",
    team2: "PAK",
    score1: "210/3",
    score2: "0/0",
    overs: "20.0",
    status: "Innings Break",
    odds1: "1.45",
    odds2: "3.20"
  }
];

export default function LiveMatchTracker() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-neon-green text-xs font-bold uppercase tracking-widest mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-neon-green animate-flicker" />
            Live Action
          </motion.div>
          <h2 className="font-outfit text-4xl md:text-7xl font-black italic uppercase tracking-tighter">
            MATCH <span className="text-gold">TRACKER</span>
          </h2>
        </div>
        <p className="text-white/40 text-sm md:text-base max-w-md md:text-right">
          Real-time odds and scores for the biggest matches in the world. 
          Bet live and win big with Cricbet99.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {MATCHES.map((match, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            className="glass p-6 md:p-8 rounded-[2.5rem] border-gold/10 hover:border-gold/30 transition-all group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Trophy className="w-32 h-32" />
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{match.league}</span>
              <div className="flex items-center gap-2 bg-neon-green/10 px-3 py-1 rounded-full">
                <Timer className="w-3 h-3 text-neon-green" />
                <span className="text-neon-green text-[10px] font-bold uppercase tracking-widest">{match.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black font-outfit mb-2">{match.team1}</div>
                <div className="text-gold font-bold text-lg">{match.score1}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-white/20 font-black text-2xl italic">VS</div>
                <div className="text-white/40 text-[10px] uppercase mt-2">{match.overs} OV</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black font-outfit mb-2">{match.team2}</div>
                <div className="text-gold font-bold text-lg">{match.score2}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass bg-white/5 p-4 rounded-2xl text-center border-white/5 group-hover:border-gold/20 transition-colors">
                <div className="text-white/40 text-[10px] uppercase mb-1">Back {match.team1}</div>
                <div className="text-2xl font-black font-outfit text-gold">{match.odds1}</div>
              </div>
              <div className="glass bg-white/5 p-4 rounded-2xl text-center border-white/5 group-hover:border-gold/20 transition-colors">
                <div className="text-white/40 text-[10px] uppercase mb-1">Back {match.team2}</div>
                <div className="text-2xl font-black font-outfit text-gold">{match.odds2}</div>
              </div>
            </div>

            <button className="w-full mt-6 py-4 bg-white/5 hover:bg-gold hover:text-obsidian rounded-2xl font-bold uppercase tracking-widest text-xs transition-all border border-white/10 hover:border-gold">
              Bet Now
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
