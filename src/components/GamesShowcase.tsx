import { motion } from 'motion/react';
import { 
  Trophy, 
  Dices, 
  Gamepad2, 
  Zap, 
  Star, 
  Crown, 
  Target, 
  Flame,
  Coins,
  Sword,
  Shield,
  Heart,
  Club,
  Spade,
  Diamond
} from 'lucide-react';
import CategoryCard from './CategoryCard';

const games = [
  {
    title: "IPL 2026",
    icon: <Trophy className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    category: "Cricket"
  },
  {
    title: "T20 World Cup",
    icon: <Zap className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800",
    category: "Cricket"
  },
  {
    title: "Live Roulette",
    icon: <Dices className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=800",
    category: "Casino"
  },
  {
    title: "Blackjack Pro",
    icon: <Spade className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&q=80&w=800",
    category: "Casino"
  },
  {
    title: "Teen Patti",
    icon: <Crown className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&q=80&w=800",
    category: "Casino"
  },
  {
    title: "Andar Bahar",
    icon: <Star className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?auto=format&fit=crop&q=80&w=800",
    category: "Casino"
  },
  {
    title: "Aviator",
    icon: <Gamepad2 className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1559627814-4d0c75748d73?auto=format&fit=crop&q=80&w=800",
    category: "Casino"
  },
  {
    title: "Baccarat",
    icon: <Club className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?auto=format&fit=crop&q=80&w=800",
    category: "Casino"
  },
  {
    title: "Dragon Tiger",
    icon: <Flame className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1508612761958-e931d843bdd5?auto=format&fit=crop&q=80&w=800",
    category: "Casino"
  },
  {
    title: "Test Series",
    icon: <Target className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    category: "Cricket"
  },
  {
    title: "Poker Elite",
    icon: <Heart className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
    category: "Casino"
  },
  {
    title: "Crazy Time",
    icon: <Coins className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=800",
    category: "Casino"
  },
  {
    title: "Big Bash League",
    icon: <Sword className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800",
    category: "Cricket"
  },
  {
    title: "Slot Mania",
    icon: <Diamond className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=800",
    category: "Casino"
  },
  {
    title: "PSL 2026",
    icon: <Shield className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    category: "Cricket"
  }
];

export default function GamesShowcase() {
  return (
    <section className="py-24 px-6 bg-obsidian relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block glass px-4 py-1 rounded-full border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4"
          >
            Premium Entertainment
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-outfit text-4xl md:text-6xl font-black italic uppercase text-white mb-6"
          >
            Explore <span className="text-gold">Cricket & Casino</span> Universe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Dive into the most immersive betting experience with over 100+ live games, 
            instant withdrawals, and 24/7 VIP support.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, idx) => (
            <CategoryCard
              key={idx}
              title={game.title}
              icon={game.icon}
              image={game.image}
              className={idx % 2 === 0 ? "lg:mt-8" : ""}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold text-obsidian px-10 py-4 rounded-full font-black text-xl uppercase tracking-widest shadow-[0_0_30px_rgba(246,196,69,0.3)]"
          >
            View All Games
          </motion.button>
        </div>
      </div>
    </section>
  );
}
