import React, { useState } from 'react';
import { ArrowUp, CheckCircle, Mail, MapPin, Phone, ShieldCheck, ThermometerSnowflake, Globe2, Sparkles } from 'lucide-react';

interface FooterProps {
  onRequestSample: () => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestSample, onOpenCalculator }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0F172A] text-[#F8FBFC] pt-24 pb-12 overflow-hidden border-t border-white/10">
      {/* Background Cold Bloom */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial from-[#14B8A6]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-radial from-[#A8E6CF]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Live Cold-Chain Telemetry Ticker */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#14B8A6]"></span>
            </span>
            <span className="font-mono text-[#A8E6CF] font-semibold tracking-wider uppercase">
              LIVE GLOBAL COLD-CHAIN TELEMETRY
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-white/70 text-[11px]">
            <span className="flex items-center gap-1.5">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-[#14B8A6]" />
              Core Tunnel: <strong className="text-white">-40.2°C</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-[#B9E3F9]" />
              Active Reefers: <strong className="text-white">142 In-Transit</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A8E6CF]" />
              Integrity Index: <strong className="text-[#A8E6CF]">99.98%</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Col 1: Brand & Charter */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#A8E6CF] to-[#14B8A6] p-[1.5px]">
                <div className="w-full h-full bg-[#0F172A] rounded-[9px] flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#14B8A6]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93" />
                  </svg>
                </div>
              </div>
              <span className="font-heading font-black tracking-[0.14em] text-2xl text-white">
                LEAFORA <span className="text-[#14B8A6]">FRESH</span>
              </span>
            </div>

            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              Leafora Fresh delivers luxury frozen cuisine, capturing authentic Indian soul using gourmet cold-press art.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 max-w-sm">
              <span className="text-xs font-semibold text-white/90 tracking-wide">
                Receive Wholesale Harvest & Recipe Updates:
              </span>
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="w-full pl-4 pr-28 py-3 rounded-xl bg-white/[0.07] border border-white/15 text-white placeholder:text-white/40 text-xs focus:outline-none focus:border-[#14B8A6] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-2 rounded-lg bg-[#14B8A6] text-[#0F172A] font-bold text-xs hover:bg-[#A8E6CF] transition-colors"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#A8E6CF] mt-1 animate-fadeIn">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Welcome to Leafora Fresh cuisine.</span>
                </div>
              )}
            </form>
          </div>

          {/* Col 2: What We Offer */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-[#14B8A6]">
              WHAT WE OFFER
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/75">
              <li><a href="#products" className="hover:text-white transition-colors">Frozen Coconut Blocks</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Frozen Greens (Palak, Methi, Coriander)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Masala Cubes (Ginger-Garlic-Chilli)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Curry Base Cubes (Onion-Tomato)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Petits Pois Royale</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Sweet Corn Kernels</a></li>
            </ul>
          </div>

          {/* Col 3: Kitchens */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-[#14B8A6]">
              KITCHEN SOLUTIONS
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/75">
              <li><a href="#kitchens" className="hover:text-white transition-colors">Homestyle Indian Cooking</a></li>
              <li><a href="#kitchens" className="hover:text-white transition-colors">Fine Dining & Indian Bistros</a></li>
              <li><a href="#kitchens" className="hover:text-white transition-colors">Catering & Banqueting</a></li>
              <li><a href="#kitchens" className="hover:text-white transition-colors">Cloud Kitchens & QSRs</a></li>
              <li><a href="#b2b" className="hover:text-white transition-colors">Wholesale & Bulk Supply</a></li>
              <li>
                <button onClick={onOpenCalculator} className="text-[#A8E6CF] hover:underline flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Kitchen ROI Calculator</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect With Us */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-[#14B8A6]">
              CONNECT WITH US
            </h4>
            <div className="flex flex-col gap-3.5 text-xs text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>Chennai, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <span>+91 22 1234 5678</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <span>hello@leaforafresh.com</span>
              </div>
              <button
                onClick={onRequestSample}
                className="mt-2 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs tracking-wide transition-all text-center"
              >
                Browse Wholesale & Retail Packs
              </button>
            </div>
          </div>
        </div>

        {/* Certifications Bar */}
        <div className="py-8 border-y border-white/10 flex flex-wrap items-center justify-between gap-6">
          <span className="text-xs font-medium text-white/50 tracking-wider uppercase">
            CERTIFIED STANDARDS & PURITY:
          </span>
          <div className="flex flex-wrap items-center gap-6 text-xs text-white/80 font-medium">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">100% Pure Cold-Press</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">Zero Artificial Preservatives</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">ISO 22000 Food Safety</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">FSSAI Certified</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">Cryo-Locked at -40°C</span>
          </div>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span>© 2026 Leafora Fresh. All rights reserved.</span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-[#A8E6CF]">Made with care in Mumbai</span>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#14B8A6] group-hover:text-[#0F172A] transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
