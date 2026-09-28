import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { LeaforaLogo } from './LeaforaLogo';

interface NavbarProps {
  onRequestSample?: () => void;
  onOpenCalculator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Products', path: '/products' },
    { label: 'Culinary Guide', path: '/culinary-guide' },
    { label: 'Our Story', path: '/about' },
    { label: 'B2B Supply', path: '/b2b' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    return location.pathname.startsWith(path);
  };

  const handleReachUsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname === '/') {
      const elem = document.getElementById('reach-us');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#reach-us');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#F8F6F5]/95 backdrop-blur-md border-b border-[#E4DDD4] shadow-[0_4px_24px_-4px_rgba(55,67,33,0.06)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="transition-transform duration-200 hover:opacity-95 shrink-0"
          >
            <LeaforaLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F3EFEA] border border-[#E4DDD4] rounded-full px-3 py-1.5 shadow-2xs">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                    active
                      ? 'bg-[#374321] text-[#F8F6F5] shadow-xs'
                      : 'text-[#22241D]/75 hover:text-[#22241D] hover:bg-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA: Reach Us Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleReachUsClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-semibold tracking-wide hover:bg-[#48572B] transition-all duration-200 shadow-xs cursor-pointer"
            >
              <span>Reach Us</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8DA256]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full bg-[#F3EFEA] border border-[#E4DDD4] text-[#22241D] hover:bg-white transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#22241D]/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-[#F8F6F5] border-t border-[#E4DDD4] rounded-t-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DDD4]">
              <LeaforaLogo size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full text-[#22241D]/70 hover:bg-[#F3EFEA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`text-sm font-semibold px-4 py-3 rounded-2xl transition-colors ${
                      active
                        ? 'bg-[#374321] text-[#F8F6F5]'
                        : 'text-[#22241D] hover:bg-[#F3EFEA]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2">
              <button
                onClick={handleReachUsClick}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#374321] text-[#F8F6F5] font-semibold text-sm shadow-md cursor-pointer"
              >
                <span>Reach Us</span>
                <ArrowUpRight className="w-4 h-4 text-[#8DA256]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
