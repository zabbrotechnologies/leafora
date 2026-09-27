import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ThermometerSnowflake,
  Globe2,
  Sparkles,
  Snowflake,
} from 'lucide-react';

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
    <footer className="relative bg-[#0F172A] text-[#F8FBFC] pt-20 pb-12 overflow-hidden border-t border-white/10 z-20">
      {/* Background Cold Bloom */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial from-[#14B8A6]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-radial from-[#A8E6CF]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Live Cold-Chain Telemetry Ticker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mb-16">
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#14B8A6]"></span>
            </span>
            <span className="font-mono text-[#A8E6CF] font-semibold tracking-wider uppercase">
              CONTINUOUS CRYOGENIC COLD-CHAIN TELEMETRY
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-white/70 text-[11px]">
            <span className="flex items-center gap-1.5">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-[#14B8A6]" />
              Core IQF Lock: <strong className="text-white">-40.0°C</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-[#B9E3F9]" />
              Transit Reefers: <strong className="text-white">-18.0°C Verified</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A8E6CF]" />
              Bio-Potency Retention: <strong className="text-[#A8E6CF]">98.4%</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1: Brand & Charter */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#A8E6CF] to-[#14B8A6] p-[1.5px]">
                <div className="w-full h-full bg-[#0F172A] rounded-[9px] flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-[#14B8A6] group-hover:rotate-45 transition-transform" />
                </div>
              </div>
              <span className="font-heading font-black tracking-[0.14em] text-2xl text-white">
                LEAFORA <span className="text-[#14B8A6]">FRESH</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-sm">
              Leafora Fresh provides high-yield cryogenically locked culinary staples, pure coconut blocks, and stone-crushed masala cubes for gourmet restaurants and modern kitchens.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 max-w-sm pt-2">
              <span className="text-xs font-semibold text-white/90">
                Receive Wholesale Harvest & Formulation Updates:
              </span>
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email..."
                  required
                  className="w-full pl-4 pr-24 py-2.5 rounded-xl bg-white/[0.07] border border-white/15 text-white placeholder:text-white/40 text-xs focus:outline-none focus:border-[#14B8A6] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-4 py-1.5 rounded-lg bg-[#14B8A6] text-[#0F172A] font-bold text-xs hover:bg-[#A8E6CF] transition-colors cursor-pointer"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#A8E6CF] mt-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Subscribed to Leafora Fresh harvest bulletins.</span>
                </div>
              )}
            </form>
          </div>

          {/* Col 2: Navigation & Company */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-[#14B8A6]">
              COMPANY
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-white/75">
              <li>
                <Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={scrollToTop} className="hover:text-white transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop} className="hover:text-white transition-colors">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="text-[#A8E6CF] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Kitchen ROI Model</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialty Lines */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-[#14B8A6]">
              SPECIALTY HARVESTS
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-white/75">
              <li>
                <Link to="/products/frozen-coconut" onClick={scrollToTop} className="hover:text-white transition-colors">
                  Frozen Coconut Blocks
                </Link>
              </li>
              <li>
                <Link to="/products/frozen-greens" onClick={scrollToTop} className="hover:text-white transition-colors">
                  Blanched Farm Greens
                </Link>
              </li>
              <li>
                <Link to="/products/masala-cubes" onClick={scrollToTop} className="hover:text-white transition-colors">
                  Ginger-Garlic-Chilli Cubes
                </Link>
              </li>
              <li>
                <Link to="/products/curry-base-cubes" onClick={scrollToTop} className="hover:text-white transition-colors">
                  Onion-Tomato Curry Base
                </Link>
              </li>
              <li>
                <Link to="/products/sweet-peas" onClick={scrollToTop} className="hover:text-white transition-colors">
                  Sweet Baby Green Peas
                </Link>
              </li>
              <li>
                <Link to="/products/sweet-corn" onClick={scrollToTop} className="hover:text-white transition-colors">
                  Super-Sweet Corn Kernels
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="flex flex-col gap-3.5">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-[#14B8A6]">
              DIRECT CONTACT
            </h4>
            <div className="flex flex-col gap-3 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                <span>Cold-Chain Regional Hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#14B8A6] transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#14B8A6] shrink-0" />
                <a href="mailto:contact@leaforafresh.com" className="hover:text-[#14B8A6] transition-colors">
                  contact@leaforafresh.com
                </a>
              </div>
              <button
                onClick={onRequestSample}
                className="mt-2 w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs transition-all text-center cursor-pointer"
              >
                Request Sample Shipper
              </button>
            </div>
          </div>
        </div>

        {/* Certifications Bar */}
        <div className="py-6 border-y border-white/10 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-white/50 tracking-wider uppercase">
            CERTIFIED COLD-CHAIN INTEGRITY:
          </span>
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 font-medium">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">100% Traceable Sourcing</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">Zero Artificial Preservatives</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">Non-GMO Verified Crops</span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">Fluidized -40°C IQF</span>
          </div>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Leafora Fresh. All rights reserved.</span>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
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
