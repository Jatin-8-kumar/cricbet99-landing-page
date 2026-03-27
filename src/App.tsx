/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Trophy, 
  ShieldCheck, 
  Clock, 
  Headset, 
  Dices, 
  Plane, 
  Gamepad2,
  ChevronRight,
  Star,
  Zap,
  Crown,
  CheckCircle2,
  ArrowDown,
  ArrowUp,
  MessageCircle,
  Sparkles,
  Lock,
  X
} from 'lucide-react';

import BlogEditor from './components/BlogEditor';

import ThreeScene from './components/ThreeScene';
import GamesShowcase from './components/GamesShowcase';
import LivePulseBar from './components/LivePulseBar';
import CategoryCard from './components/CategoryCard';
import Leaderboard from './components/Leaderboard';
import FAQ from './components/FAQ';
import SEOContent from './components/SEOContent';
import WhatsAppHub from './components/WhatsAppHub';
import WhatsAppSupport from './components/WhatsAppSupport';
import SignupGuide from './components/SignupGuide';
import SecuritySection from './components/SecuritySection';
import MobileAppSection from './components/MobileAppSection';
import PaymentMethods from './components/PaymentMethods';
import LiveMatchTracker from './components/LiveMatchTracker';
import WhatsAppButton from './components/WhatsAppButton';
import BlogSection from './components/BlogSection';



function ServiceExcellence() {
  const features = [
    { id: "01", title: "15-Min Withdrawal", desc: "Fastest payouts in India", icon: <Clock /> },
    { id: "02", title: "24/7 Live Support", desc: "Expert help anytime", icon: <Headset /> },
    { id: "03", title: "100% Safe & Secure", desc: "Licensed exchange platform", icon: <ShieldCheck /> },
  ];

  return (
    <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-transparent to-gold/5">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            className="flex flex-col items-center text-center group"
          >
            <motion.div 
              whileInView={{ rotateY: 360 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="text-6xl md:text-8xl font-black font-outfit text-gold/10 group-hover:text-gold/20 transition-colors mb-[-30px] md:mb-[-40px]"
            >
              {f.id}
            </motion.div>
            <div className="glass p-6 md:p-8 rounded-3xl w-full relative z-10 hover:border-gold/50 transition-all duration-500">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-4 md:mb-6 mx-auto">
                {f.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 font-outfit">{f.title}</h3>
              <p className="text-white/50 text-sm md:text-base">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-32 z-50 w-12 h-12 rounded-full bg-gold text-obsidian flex items-center justify-center shadow-[0_0_20px_rgba(246,196,69,0.5)] hover:scale-110 transition-transform"

        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [view, setView] = useState<'landing' | 'editor' | 'blog'>('landing');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [showLogin, setShowLogin] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const { scrollYProgress } = useScroll();

  
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    mass: 0.8,
    restDelta: 0.0001
  });

  const [scrollVal, setScrollVal] = useState(0);
  
  const heroOpacity = useTransform(smoothScroll, [0, 0.1], [1, 0]);
  const heroScale = useTransform(smoothScroll, [0, 0.1], [1, 0.9]);
  const heroY = useTransform(smoothScroll, [0, 0.1], [0, -50]);



  // Sync scroll progress to state for ThreeScene
  useEffect(() => {
    return smoothScroll.on("change", (latest) => {
      setScrollVal(latest);
    });
  }, [smoothScroll]);

  if (view === 'editor') {
    return (
      <>
        <BlogEditor />
        <button 
          onClick={() => setView('landing')}
          className="fixed bottom-8 left-8 z-[100] glass px-6 py-3 rounded-full border-gold/30 text-gold font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-2xl"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Landing
        </button>
      </>
    );
  }

  if (view === 'blog') {
    return (
      <div className="min-h-screen font-sans selection:bg-gold selection:text-obsidian overflow-x-hidden scroll-smooth">
        <BlogSection onBack={() => setView('landing')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-gold selection:text-obsidian overflow-x-hidden scroll-smooth">
      {/* Admin Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-obsidian/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass p-8 rounded-[2.5rem] border-gold/20 w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setShowLogin(false)}
                className="absolute top-6 right-6 p-2 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="font-outfit text-2xl font-black italic uppercase tracking-wider text-center">Member <span className="text-gold">Login</span></h3>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.2em]">Cricbet99 Official Login</p>
              </div>

              <div className="space-y-4">
                <div>
                   <label className="text-[10px] text-white/20 uppercase font-black tracking-widest pl-1 mb-2 block">Username</label>
                   <input 
                    type="text" 
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                    placeholder="Enter Username"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all text-sm font-bold"
                  />
                </div>
                <div>
                   <label className="text-[10px] text-white/20 uppercase font-black tracking-widest pl-1 mb-2 block">Password</label>
                   <input 
                    type="password" 
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:border-gold/50 outline-none transition-all text-sm font-bold"
                  />
                </div>

                <button 
                  onClick={() => {
                    if (loginUser === 'sonu2026IPL' && loginPass === 'IPL2026') {
                      setIsAdmin(true);
                      localStorage.setItem('isAdmin', 'true');
                      setShowLogin(false);
                      setView('editor');
                    } else {
                      alert('Invalid Credentials');
                    }
                  }}
                  className="w-full bg-gold text-obsidian py-5 mt-4 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gold/10"
                >
                  Confirm Login
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto cursor-pointer" onClick={() => setView('landing')}>
          <Trophy className="w-8 h-8 md:w-10 md:h-10 text-gold" />
          <span className="font-outfit text-2xl md:text-3xl font-black italic uppercase tracking-tighter">Cric<span className="text-gold">bet</span>99</span>
        </div>

        <nav className="flex items-center gap-4 md:gap-8 pointer-events-auto ml-4">
          <button onClick={() => setView('landing')} className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-gold transition-colors">Home</button>
          <button onClick={() => setView('blog')} className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-gold transition-colors">Insights</button>
        </nav>
        
        <div className="flex-1" />

        <button 
          onClick={() => isAdmin ? setView('editor') : setShowLogin(true)}
          className="pointer-events-auto glass border-gold/30 text-gold px-4 py-2 md:px-8 md:py-3 rounded-full font-black text-[10px] md:text-sm uppercase tracking-widest hover:bg-gold hover:text-obsidian transition-all shadow-xl whitespace-nowrap"
        >
          {isAdmin ? 'Dashboard' : 'Login'}
        </button>
      </header>

      {/* Full Page 3D Background with Scroll Progress */}
      <ThreeScene scrollProgress={scrollVal} />

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative h-screen flex flex-col items-center justify-start pt-8 md:pt-16 px-6 text-center overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <img 
              src="https://cricbet99india.com/wp-content/uploads/2025/03/cricbet99-min-2-2-300x72-1.webp" 
              alt="Cricbet99 Logo" 
              className="h-16 md:h-24 lg:h-32 mx-auto drop-shadow-[0_0_30px_rgba(246,196,69,0.5)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4 inline-block glass px-4 md:px-6 py-2 rounded-full border-gold/40 text-gold font-bold text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em]"
          >
            India's Most Trusted Exchange 2026
          </motion.div>

          <p className="text-white/80 text-sm sm:text-lg md:text-2xl max-w-3xl mx-auto mb-8 md:mb-10 font-medium tracking-wide leading-relaxed px-4">
            Unleash the power of 3D interactive betting. Get your <span className="text-gold font-bold">Cricbet99 Official ID</span> 
            instantly and join the elite league of winners.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
            <motion.a
              href="https://wa.me/yournumber"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(37, 211, 102, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-[#25D366] text-white px-6 md:px-10 py-4 md:py-5 rounded-full font-black text-base md:text-xl uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle className="w-6 h-6 fill-white" />
              Get ID via WhatsApp
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.a>
            <div className="w-full sm:w-auto flex items-center justify-center gap-3 glass px-6 py-4 rounded-full border-gold/30">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-neon-green animate-flicker" />
              <span className="text-neon-green font-bold text-[10px] md:text-sm uppercase tracking-widest">Live: 12,405 Players Winning</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em]">Explore Universe</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-gold" />
          </motion.div>
        </motion.div>
      </motion.section>

      <LivePulseBar />

      <LiveMatchTracker />

      <SignupGuide />

      {/* VIP Membership Section - Unique Content */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gold/5 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Crown className="w-4 h-4" />
              Elite Access
            </motion.div>
            <div className="mb-6">
              <img 
                src="https://cricbet99india.com/wp-content/uploads/2025/03/cricbet99-min-2-2-300x72-1.webp" 
                alt="Cricbet99 Logo" 
                className="h-10 md:h-16 mx-auto mb-4"
                referrerPolicy="no-referrer"
              />
              <span className="text-gold font-outfit text-2xl md:text-4xl font-black italic uppercase tracking-widest">VIP CLUB</span>
            </div>
            <p className="text-white/60 max-w-2xl mx-auto text-base md:text-xl">
              Elevate your game to the professional level. Our VIP members enjoy exclusive perks, 
              personalized support, and higher limits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Silver Tier", 
                perks: ["5% Weekly Cashback", "Priority Support", "Basic Bonus Pack"],
                price: "Free for Active Users",
                icon: <Zap className="text-white/50" />
              },
              { 
                title: "Gold Tier", 
                perks: ["10% Weekly Cashback", "Dedicated Manager", "Premium Bonus Pack", "Instant Withdrawals"],
                price: "Invite Only",
                icon: <Star className="text-gold" />,
                featured: true
              },
              { 
                title: "Platinum Tier", 
                perks: ["15% Weekly Cashback", "VIP Concierge", "Elite Bonus Pack", "Zero Limit Withdrawals", "Luxury Gifts"],
                price: "High Rollers Only",
                icon: <Crown className="text-royal-red" />
              }
            ].map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`glass p-8 md:p-10 rounded-[2.5rem] border-gold/10 relative group ${tier.featured ? 'border-gold/50 bg-gold/5' : ''}`}
              >
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-obsidian px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {tier.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black font-outfit mb-2">{tier.title}</h3>
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-8">{tier.price}</p>
                <ul className="space-y-4 mb-10">
                  {tier.perks.map((perk, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-neon-green" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <WhatsAppButton 
                   text={`Join ${tier.title}`}
                   variant={tier.featured ? 'primary' : 'outline'}
                   size="md"
                   className="w-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GamesShowcase />

      <MobileAppSection />

      <ServiceExcellence />

      {/* Unique Why Us Section */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6 md:space-y-8"
            >
              <h2 className="font-outfit text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                WHY THE <span className="text-gold underline decoration-royal-red underline-offset-8">PROS</span> CHOOSE US
              </h2>
              <p className="text-white/70 text-base md:text-xl leading-relaxed">
                In a world of ordinary betting sites, Cricbet99 is the <span className="text-gold font-bold italic">G.O.A.T</span>. 
                We don't just offer IDs; we offer a gateway to a high-octane gaming lifestyle. 
                Our 3D engine ensures you're not just watching the game—you're living it.
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  "Zero Lag Betting Engine",
                  "VIP Priority Withdrawals",
                  "Exclusive IPL 2026 Insights",
                  "Anti-Fraud Shield Technology"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4 group">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold group-hover:scale-150 transition-transform" />
                    <span className="font-outfit font-bold text-base md:text-lg uppercase tracking-wider group-hover:text-gold transition-colors">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-8">
                <WhatsAppButton text="Get Your Pro ID Now" size="lg" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gold/20 blur-3xl rounded-full" />
              <div className="glass p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border-gold/40 relative">
                <div className="text-center space-y-4">
                  <div className="text-4xl md:text-6xl font-black font-outfit text-gold animate-flicker">99.9%</div>
                  <div className="text-white/50 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm">Uptime Reliability</div>
                  <div className="h-px bg-gold/20 w-full my-6 md:my-8" />
                  <div className="text-4xl md:text-6xl font-black font-outfit text-neon-green">15 MIN</div>
                  <div className="text-white/50 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm">Average Payout Time</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SecuritySection />

      <PaymentMethods />
      
      <Leaderboard />

      {/* Testimonials Section - Unique Content */}
      <section className="py-24 md:py-32 px-6 bg-gold/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-outfit text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
              VOICES OF <span className="text-gold">WINNERS</span>
            </h2>
            <p className="text-white/40 text-sm md:text-lg uppercase tracking-widest">What our elite players say</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Rahul S.", role: "VIP Gold Member", text: "Cricbet99 is the only platform that actually pays out in 15 minutes. The 3D interface is just a bonus!" },
              { name: "Amit K.", role: "Pro Bettor", text: "The odds here are consistently better than any other exchange. Highly recommended for serious players." },
              { name: "Priya M.", role: "Casino Enthusiast", text: "Live casino experience is top-notch. No lag, great dealers, and instant deposits. Love it!" }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl border-gold/10 relative"
              >
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-white/70 italic mb-6">"{t.text}"</p>
                <div>
                  <div className="font-bold font-outfit text-white">{t.name}</div>
                  <div className="text-gold text-[10px] uppercase font-bold tracking-widest">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 flex flex-col items-center gap-6">
            <h3 className="text-xl md:text-2xl font-bold font-outfit uppercase tracking-wider text-white/80">Ready to join the elite?</h3>
            <WhatsAppButton text="Join the Winners Club" size="xl" />
          </div>
        </div>
      </section>


      {/* Blog section removed from home as requested */}

      <SEOContent />

      <WhatsAppSupport />

      <FAQ />

      {/* Footer */}
      <footer className="py-16 md:py-24 px-6 border-t border-gold/10 bg-obsidian text-center">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <img 
              src="https://cricbet99india.com/wp-content/uploads/2025/03/cricbet99-min-2-2-300x72-1.webp" 
              alt="Cricbet99 Logo" 
              className="h-12 md:h-16 mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-left">
             <div className="space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">Explore</h4>
                <ul className="text-white/40 text-[10px] uppercase space-y-2 font-bold tracking-widest">
                  <li><button onClick={() => setView('landing')} className="hover:text-gold">Home</button></li>
                  <li><a href="#" className="hover:text-gold">About Us</a></li>
                  <li><button onClick={() => setView('blog')} className="hover:text-gold">Blog</button></li>
                  <li><button onClick={() => setShowLogin(true)} className="hover:text-gold outline-none underline decoration-gold/0 hover:decoration-gold/100 transition-all">Login</button></li>
                  <li><a href="#" className="hover:text-gold">Sign Up</a></li>
                </ul>
             </div>
             <div className="space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">Quick Links</h4>
                <ul className="text-white/40 text-[10px] uppercase space-y-2 font-bold tracking-widest">
                  <li><a href="#" className="hover:text-gold">Terms & Conditions</a></li>
                  <li><a href="#" className="hover:text-gold">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-gold">Responsible Betting</a></li>
                  <li><a href="#" className="hover:text-gold">Disclaimer</a></li>
                </ul>
             </div>
             <div className="space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">Support</h4>
                <ul className="text-white/40 text-[10px] uppercase space-y-2 font-bold tracking-widest">
                  <li><a href="#" className="hover:text-gold">Customer Care</a></li>
                  <li><a href="#" className="hover:text-gold">FAQ</a></li>
                  <li><a href="#" className="hover:text-gold">Sitemap</a></li>
                  <li><button onClick={() => setView('blog')} className="hover:text-gold">Blog</button></li>
                </ul>
             </div>
             <div className="space-y-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">Connect</h4>
                <div className="flex flex-col gap-4">
                    <WhatsAppButton text="Chat" size="sm" className="w-full" />
                    <div className="flex gap-4">
                       <a href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer shadow-lg">
                         <MessageCircle className="w-5 h-5 fill-white" />
                       </a>
                       <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/40 hover:text-gold transition-colors cursor-pointer">F</div>
                       <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/40 hover:text-gold transition-colors cursor-pointer">I</div>
                       <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/40 hover:text-gold transition-colors cursor-pointer">T</div>
                    </div>
                 </div>
             </div>
          </div>

          <div className="glass p-6 rounded-2xl mb-12 text-left">
             <h4 className="text-gold font-bold uppercase text-[10px] tracking-widest mb-4">Keywords</h4>
             <p className="text-white/20 text-[8px] leading-relaxed uppercase tracking-widest">
               Cricbet99 | Cricbet 99 | Cricbet99 App | Football Bettng | Cricbet99 ID | Cricbet99 Win | Cricbet99 Green | Cribet99 | Tennis Betting | Cricbet99 New ID | Cricket 99 com login | Cricbet99 Casino Games | cricbet99 game sign up | Cric99 | Online Betting ID | M Cricbet99 Login | Online Cricket ID | Cricbet99 Phone Number | Cricbet99 Bonuses | www cricbet99 club | Cricbets99 | https://cricbet99.win | cricket 99 club | Cricbet99 Club | cricket 99 login | Cricbet999 | Cricbet99 India Official | Cricbet 99 Online Support | cricbet 99 win | Cricbet99 Offers | Cricbet99 क्लब लॉगिन | welcome to cricbet99 | cricbett99 | cricket exchange | Cricbet99india.in | cricbet99.id | Cricbet99 sign up | cricbet | cricbet99.club login | cricketbet999 | Cricbet99 Official | Cricbet99 vs Other Platforms | Cricbet99 Customer Support | IPL cricket ID | Cricbet99 क्लब | https cricbet99 game | Cricbet99 whatsapp number | crickbet99 | cricbet99.com login | Cricbet99.biz | cricbet99.green login | cricbet99id | https cricbet99.win green | https://cricbet99.green | 99cricbet | www cricbet99 win login | Cricbet99 लॉगिन | Www Cricbet99 com login | cricbet99 green login | Cricbet99 Bet | Cricbet99 Win login | Cricket99 apk | Cricbet99.com Register | Cricbet99.win | cricbet99 link login | Cricbet99 Payment Methods | Cricbet 99 Registration | Cricket Betting | cricbet99.win login | cribet 99.com | Crichet99 Review | Cricbet99 india | cricbet99.club | Cricbet99 Com Login | Cricbet99 Club Login | Http Cricbet99 | cricbet99 link | Cricbet99a | Http M Cricbet 99 | Https M Cric Bet 99 | Cricbet99 Register Number | M Cricbet99 | cricket 99.club | Cricbet99 Gold | My Cricbet99 Game ID | Cric Bet 99 | Cricket99 | Cricket 99 | Cic bet 99 | Cricbet99.green | cricbet99. club | cricbet99 website | cricbet99 online | cricbet99 आईडी लॉगिन | cricbeto9 live | cricbet9 phone number | Cricbet99 Com | cricket99 login
             </p>
          </div>

          <div className="space-y-4 text-white/30 text-[10px] md:text-xs">
            <p>Contact Us on WhatsApp – +916205096950 | Email Us: support@cricbet99india.com</p>
            <p className="max-w-3xl mx-auto">
              Online gaming involves risk. Users must be 18+ and comply with local laws. We promote responsible gaming practices. If you are located in Telangana, Orissa, Assam, Sikkim, or Nagaland, please exit the website immediately.
            </p>
            <p className="pt-8 border-t border-gold/5">
              © 2024 https://cricbet99india.com/ | All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <WhatsAppHub />
      <ScrollToTop />
    </div>
  );
}
