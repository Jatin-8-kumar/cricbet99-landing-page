import { motion } from 'motion/react';
import { Smartphone, Download, Apple, PlayCircle } from 'lucide-react';

export default function MobileAppSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto glass p-10 md:p-20 rounded-[4rem] border-gold/30 bg-gradient-to-br from-gold/10 to-transparent">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-full aspect-[9/16] max-w-[300px] mx-auto glass rounded-[3rem] border-gold/40 p-4 shadow-2xl relative z-10">
               <div className="w-full h-full bg-obsidian rounded-[2.5rem] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-gold/20 to-transparent" />
                  <div className="absolute top-8 left-0 right-0 text-center px-4">
                    <img 
                      src="https://cricbet99india.com/wp-content/uploads/2025/03/cricbet99-min-2-2-300x72-1.webp" 
                      alt="Cricbet99 Logo" 
                      className="h-8 mx-auto mb-2"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Official App</div>
                  </div>
                  <div className="absolute bottom-10 left-6 right-6 space-y-3">
                    <div className="h-2 w-full bg-gold/20 rounded-full" />
                    <div className="h-2 w-2/3 bg-gold/20 rounded-full" />
                    <div className="h-10 w-full bg-gold rounded-xl" />
                  </div>
               </div>
            </div>
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-gold/10 blur-3xl rounded-full" />
          </motion.div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border-gold/20 text-gold text-xs font-bold uppercase tracking-widest">
              <Smartphone className="w-4 h-4" />
              Bet on the Go
            </div>
            <h2 className="font-outfit text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              Download <span className="text-gold">Mobile App</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              The Cricbet99 App provides mobile betting easily. Android and iOS compatible, the app will make sure that the user is able to monitor live scores, bet, and explore games wherever they are.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 bg-white text-obsidian px-6 py-3 rounded-2xl font-bold hover:bg-gold transition-colors">
                <PlayCircle className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[10px] uppercase leading-none opacity-60">Get it on</div>
                  <div className="text-sm">Google Play</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-white text-obsidian px-6 py-3 rounded-2xl font-bold hover:bg-gold transition-colors">
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[10px] uppercase leading-none opacity-60">Download on the</div>
                  <div className="text-sm">App Store</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
