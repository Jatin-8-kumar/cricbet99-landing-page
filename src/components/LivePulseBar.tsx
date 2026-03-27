import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

const MATCHES = [
  { teams: "IND vs AUS", odds: "1.85 | 2.10", status: "LIVE" },
  { teams: "ENG vs NZ", odds: "1.90 | 1.95", status: "LIVE" },
  { teams: "SA vs PAK", odds: "1.75 | 2.25", status: "LIVE" },
  { teams: "MI vs CSK", odds: "1.80 | 2.05", status: "LIVE" },
];

export default function LivePulseBar() {
  return (
    <div className="w-full bg-obsidian/80 backdrop-blur-md border-y border-gold/20 py-3 overflow-hidden">
      <motion.div 
        className="flex whitespace-nowrap gap-12 items-center"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...MATCHES, ...MATCHES, ...MATCHES].map((match, idx) => (
          <div key={idx} className="flex items-center gap-4 px-6 border-r border-gold/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-flicker" />
              <span className="text-neon-green font-bold text-xs tracking-widest">LIVE</span>
            </div>
            <span className="font-outfit font-bold text-white uppercase tracking-tight">{match.teams}</span>
            <span className="font-mono text-gold font-bold">{match.odds}</span>
            <Activity className="w-4 h-4 text-gold/50" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
