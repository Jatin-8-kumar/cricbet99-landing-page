import { motion } from 'motion/react';
import { Calendar, ArrowRight, ChevronLeft } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    title: "IPL 2026 Opening Match: KKR vs RCB – Full Preview, Date, Time & Squad Analysis",
    excerpt: "The biggest cricket festival in the world, the Indian Premier League (IPL) 2026, is all set to begin with an exciting opening clash...",
    date: "March 27, 2026",
    category: "IPL 2026",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop"
  }
];

export default function BlogSection({ onBack }: { onBack?: () => void }) {
  return (
    <section id="blog" className="min-h-screen py-32 px-6 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-12 hover:scale-105 transition-transform"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </motion.button>
        )}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-gold/30 text-gold text-xs font-bold uppercase tracking-widest"
            >
              Latest Updates
            </motion.div>
            <h2 className="font-outfit text-4xl md:text-7xl font-black italic uppercase tracking-tighter">
              CRICBET99 <span className="text-gold">INSIGHTS</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm uppercase tracking-widest leading-relaxed">
            Stay ahead of the game with expert analysis, match previews, and exclusive betting tips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-[2rem] border-gold/10 overflow-hidden group hover:border-gold/30 transition-all flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-obsidian px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-white/30 text-[10px] uppercase font-bold tracking-widest mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-gold" />
                    {post.date}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-gold transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-white/50 text-sm mb-8 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <button className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest group/btn">
                    Read Full Analysis 
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
