import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { LeaforaLogo } from './LeaforaLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Products', path: '/products' },
    { label: 'Culinary Guide', path: '/culinary-guide' },
    { label: 'Our Story', path: '/about' },
    { label: 'B2B Supply', path: '/b2b' },
    { label: 'Reach Us', path: '/#reach-us' },
  ];

  const productLinks = [
    { label: 'Frozen Coconut', path: '/products/frozen-coconut' },
    { label: 'Frozen Greens', path: '/products/frozen-greens' },
    { label: 'Masala Cubes', path: '/products/masala-cubes' },
    { label: 'Curry Base Cubes', path: '/products/curry-base-cubes' },
  ];

  return (
    <footer className="bg-[#22241D] text-[#DED6CC] pt-16 pb-12 border-t border-[#374321]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" onClick={scrollToTop} className="inline-block">
              <LeaforaLogo variant="dark" size="md" />
            </Link>
            <p className="text-sm text-[#DED6CC]/80 leading-relaxed max-w-sm">
              Leafora Fresh brings you ready-to-use coconut blocks, stone-crushed masala cubes, and tender farm greens flash-frozen within hours of harvest. Pure ingredients, zero kitchen prep waste, direct into your pan.
            </p>
            <div className="pt-2">
              <a
                href="mailto:contact@leaforafresh.com"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#8DA256] hover:text-[#F8F6F5] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>contact@leaforafresh.com</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F8F6F5]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    onClick={scrollToTop}
                    className="text-[#DED6CC]/70 hover:text-[#F8F6F5] transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F8F6F5]">
              Harvest Staples
            </h4>
            <ul className="space-y-2 text-xs">
              {productLinks.map((prod) => (
                <li key={prod.label}>
                  <Link
                    to={prod.path}
                    onClick={scrollToTop}
                    className="text-[#DED6CC]/70 hover:text-[#F8F6F5] transition-colors inline-flex items-center gap-1.5 py-0.5"
                  >
                    <span>{prod.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#8DA256]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DED6CC]/60">
          <span>© {new Date().getFullYear()} Leafora Fresh. All rights reserved.</span>
          <span>Pure ingredients frozen at the moment of harvest.</span>
        </div>
      </div>
    </footer>
  );
};
