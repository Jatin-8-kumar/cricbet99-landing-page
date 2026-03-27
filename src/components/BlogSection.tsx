import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ArrowRight, ChevronLeft, Share2, Clock } from 'lucide-react';

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
  const [posts, setPosts] = useState(POSTS);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('publishedPosts') || '[]');
    // Filter out duplicates (by title or slug)
    const combined = [...POSTS];
    savedPosts.forEach((sp: any) => {
      if (!combined.some(p => p.title === sp.title)) {
        combined.push(sp);
      }
    });
    setPosts(combined);
  }, []);

  if (selectedPost) {
    return (
      <section className="min-h-screen py-32 px-6 bg-obsidian relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              setSelectedPost(null);
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-12 hover:scale-105 transition-transform"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Insights
          </motion.button>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-4">
                <span className="bg-gold text-obsidian px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {selectedPost.category}
                </span>
                <div className="flex items-center gap-4 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    {selectedPost.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    5 Min Read
                  </div>
                </div>
              </div>

              <h1 className="font-outfit text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                {selectedPost.title}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
            >
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-invert prose-gold max-w-none"
            >
              <div 
                className="text-white/70 text-lg leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: selectedPost.content || selectedPost.excerpt }}
              />
            </motion.div>

            <div className="pt-12 border-t border-white/5 flex justify-between items-center">
               <div className="flex items-center gap-4">
                 <button className="p-3 rounded-2xl glass border-white/5 hover:border-gold/30 text-white/40 hover:text-gold transition-all">
                   <Share2 className="w-5 h-5" />
                 </button>
               </div>
               <button 
                 onClick={() => {
                   setSelectedPost(null);
                   window.scrollTo(0, 0);
                 }}
                 className="bg-gold text-obsidian px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
               >
                 Close Article
               </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
          {posts.map((post, i) => (
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
                  <button 
                    onClick={() => {
                      setSelectedPost(post);
                      window.scrollTo(0, 0);
                    }}
                    className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest group/btn"
                  >
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
