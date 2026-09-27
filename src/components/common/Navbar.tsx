import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles, Snowflake } from 'lucide-react';

interface NavbarProps {
  onRequestSample: () => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestSample, onOpenCalculator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Products', path: '/products' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          isScrolled
            ? 'py-3 bg-[#F8FBFC]/90 backdrop-blur-md border-b border-[#B9E3F9]/50 shadow-[0_10px_30px_rgba(15,23,42,0.05)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#A8E6CF] via-[#14B8A6] to-[#0F172A] p-[1.5px] shadow-[0_0_15px_rgba(20,184,166,0.35)]">
              <div className="w-full h-full bg-[#F8FBFC] rounded-[10px] flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-[#14B8A6] group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black tracking-[0.14em] text-lg sm:text-xl text-[#0F172A] leading-none flex items-center gap-1">
                LEAFORA <span className="text-[#14B8A6]">FRESH</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#0F172A]/50 uppercase mt-0.5">
                LUXURY FROZEN CUISINE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md border border-[#B9E3F9]/60 rounded-full px-3 py-1.5 shadow-xs">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all duration-200 ${
                    active
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-[#0F172A]/70 hover:text-[#0F172A] hover:bg-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* ROI Model Calculator */}
            <button
              onClick={onOpenCalculator}
              className="text-xs font-semibold text-[#0F172A]/75 hover:text-[#14B8A6] px-3 py-2 rounded-full transition-colors flex items-center gap-1.5 hover:bg-white/60 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>ROI Model</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onRequestSample}
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0F172A] text-white text-xs font-bold tracking-wide overflow-hidden shadow-[0_4px_16px_rgba(15,23,42,0.18)] hover:shadow-[0_6px_24px_rgba(20,184,166,0.35)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span className="relative z-10">Request Sample Shipper</span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-[#A8E6CF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#14B8A6] to-[#0F172A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onRequestSample}
              className="px-3.5 py-1.5 rounded-full bg-[#0F172A] text-white text-[11px] font-bold shadow-xs cursor-pointer"
            >
              Sample
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/90 border border-[#B9E3F9]/60 text-[#0F172A] shadow-xs cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-35 bg-[#0F172A]/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#F8FBFC] shadow-2xl p-6 pt-24 flex flex-col justify-between transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold tracking-widest text-[#14B8A6] uppercase">
              PAGES
            </span>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-heading font-semibold py-2.5 px-3 rounded-xl border-b border-[#B9E3F9]/30 flex items-center justify-between ${
                      active
                        ? 'bg-[#0F172A] text-white'
                        : 'text-[#0F172A] hover:text-[#14B8A6]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className={`w-4 h-4 ${active ? 'text-[#A8E6CF]' : 'text-[#0F172A]/40'}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#B9E3F9]/40">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="w-full py-3 rounded-xl border border-[#14B8A6]/40 text-[#0F172A] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#14B8A6]" />
              <span>Kitchen ROI Calculator</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestSample();
              }}
              className="w-full py-3.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Request Sample Box</span>
              <ArrowUpRight className="w-4 h-4 text-[#A8E6CF]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
