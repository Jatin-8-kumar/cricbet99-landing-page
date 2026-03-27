export default function SEOContent() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-gold/10">
      <div className="prose prose-invert max-w-none">
        <h2 className="font-outfit text-4xl font-extrabold italic uppercase tracking-tighter mb-8">
          Cricbet99: India's Premier <span className="text-gold">Cricket Exchange 2026</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 text-white/70 leading-relaxed text-lg">
          <div className="space-y-6">
            <p>
              Welcome to the future of online gaming with <strong>Cricbet99 Signup</strong>. As we move into 2026, the landscape of cricket betting in India has evolved, and Cricbet99 stands at the forefront as the most trusted and interactive platform. Whether you're looking for an <strong>Official Cricket ID</strong> or the most competitive odds for <strong>IPL 2026 Betting</strong>, our platform offers an unparalleled experience.
            </p>
            <p>
              Our <strong>Next-Gen 3D Interactive Landing Page</strong> is just the beginning. Once you step into the Cricbet99 universe, you gain access to a world-class <strong>Cricket Exchange</strong> where transparency and user trust are our top priorities. We understand the pulse of the Indian bettor, which is why we've optimized every aspect of our service to be fast, secure, and rewarding.
            </p>
            <p>
              Why choose Cricbet99? It's simple. We offer the fastest <strong>Instant Withdrawal Betting Site</strong> experience in the country. No more waiting for days to enjoy your winnings. With our 15-minute withdrawal guarantee, your money is always within your reach.
            </p>
          </div>
          
          <div className="space-y-6">
            <p>
              Beyond cricket, our <strong>Live Casino India</strong> section brings the thrill of Las Vegas straight to your screen. From high-stakes Roulette to immersive Card games, our 3D animations and live dealers provide a realistic casino atmosphere. For those who love fast-paced action, our <strong>Crash Games</strong> like Aviator offer instant thrills and massive multipliers.
            </p>
            <p>
              Security is the cornerstone of Cricbet99. Our platform uses advanced encryption protocols to protect your data. When you register for a <strong>Cricbet99 Official ID</strong>, you're joining a community of millions who value safety and fair play. Our 24/7 customer support via WhatsApp ensures that help is always just a message away.
            </p>
            <p>
              Don't miss out on the <strong>IPL 2026</strong> season. Get your ID today and take advantage of our 100% Welcome Bonus. Experience the synergy of technology and sports at Cricbet99 – where every bet is a step towards a jackpot.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Users", value: "2M+" },
            { label: "Daily Winners", value: "50k+" },
            { label: "Withdrawal Time", value: "15 Min" },
            { label: "Support", value: "24/7" },
          ].map((stat, i) => (
            <div key={i} className="glass p-6 rounded-2xl text-center">
              <div className="text-gold text-3xl font-black font-outfit">{stat.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-widest mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
