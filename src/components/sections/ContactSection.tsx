import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRODUCTS_DATA } from '../../data/mockData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const channelsRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: 'general',
    product: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Header smooth fade up
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Form card lift
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Channels column staggered slide
      if (channelsRef.current && channelsRef.current.children.length > 0) {
        gsap.fromTo(
          channelsRef.current.children,
          { opacity: 0, x: 25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: channelsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      ref={containerRef}
      id="reach-us"
      className="py-20 md:py-28 bg-[#F8F6F5] border-t border-[#E4DDD4] scroll-mt-24 overflow-hidden"
    >
      <div id="contact" className="scroll-mt-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
            <span className="w-5 h-[1.5px] bg-[#8DA256] rounded-full" />
            <span>Direct Inquiries & Supply</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#22241D] leading-tight tracking-tight">
            Reach Leafora Fresh.
          </h2>
          <p className="text-base sm:text-lg text-[#575D4E] leading-relaxed">
            Have questions regarding our harvest staples, culinary test samples, retail distribution, or bulk commercial cartons? We reply directly to every inquiry.
          </p>
        </div>

        {/* 2-Column Grid: Left Form, Right Contact Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Interactive Form Card (Clean Single Border) */}
          <div ref={formCardRef} className="lg:col-span-7 rounded-3xl bg-white border border-[#E4DDD4] p-6 sm:p-10 shadow-xs">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#8DA256]" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-[#22241D]">
                  Message Received
                </h3>
                <p className="text-sm text-[#575D4E] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong className="text-[#22241D]">{formData.name}</strong>. Our culinary supply desk will contact you at{' '}
                  <strong className="text-[#22241D]">{formData.email}</strong> within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        enquiryType: 'general',
                        product: '',
                        message: '',
                      });
                    }}
                    className="px-6 py-3 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold hover:bg-[#48572B] transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                      Full Name <span className="text-[#8DA256]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                      Email Address <span className="text-[#8DA256]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Inquiry Type Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] focus:outline-none focus:border-[#374321] transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="product-sample">Chef Sample Kit / Tasting</option>
                      <option value="commercial-supply">Commercial Kitchen & B2B Supply</option>
                      <option value="retail-distribution">Retail & Supermarket Distribution</option>
                    </select>
                  </div>
                </div>

                {/* Product of Interest */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Product Focus (Optional)
                  </label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] focus:outline-none focus:border-[#374321] transition-colors"
                  >
                    <option value="">Select a harvest staple...</option>
                    {PRODUCTS_DATA.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} — {p.category}
                      </option>
                    ))}
                    <option value="All Harvest Essentials">All Harvest Essentials (Full Catalog)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Requirements / Note
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your kitchen requirements, estimated pack volume, or delivery location..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold tracking-wide hover:bg-[#48572B] transition-all duration-200 shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8DA256]" />
                  </button>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#575D4E]">
                    <ShieldCheck className="w-4 h-4 text-[#8DA256]" />
                    <span>Direct response within 24h</span>
                  </div>
                </div>

              </form>
            )}
          </div>

          {/* Right: Direct Kitchen Communication Channels */}
          <div ref={channelsRef} className="lg:col-span-5 space-y-6">
            
            {/* Direct Cards (Single Border) */}
            <div className="rounded-3xl bg-white border border-[#E4DDD4] p-6 sm:p-7 space-y-4">
              <h3 className="text-base font-heading font-bold text-[#22241D]">
                Direct Contact Desk
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-[#575D4E]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F8F6F5] border border-[#E4DDD4] text-[#374321] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#8DA256]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8DA256] block">
                      General & Orders
                    </span>
                    <a href="mailto:contact@leaforafresh.com" className="font-semibold text-[#22241D] hover:underline">
                      contact@leaforafresh.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F8F6F5] border border-[#E4DDD4] text-[#374321] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#8DA256]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8DA256] block">
                      Direct Support Line
                    </span>
                    <a href="tel:+919840012345" className="font-semibold text-[#22241D] hover:underline">
                      +91 98400 12345
                    </a>
                    <span className="text-[11px] text-[#575D4E] block">Mon–Sat: 8:00 AM – 7:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cryogenic Hubs & Origin Belts */}
            <div className="rounded-3xl bg-white border border-[#E4DDD4] p-6 sm:p-7 space-y-4">
              <h3 className="text-base font-heading font-bold text-[#22241D]">
                Regional Freezing Hubs
              </h3>
              
              <div className="space-y-3 text-xs text-[#575D4E]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F8F6F5] border border-[#E4DDD4] text-[#374321] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#8DA256]" />
                  </div>
                  <div>
                    <strong className="text-[#22241D] block">Pollachi & Anaimalai Belt</strong>
                    <span>Tamil Nadu 642001 — Coconut and fresh herbs cryogenic processing</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F8F6F5] border border-[#E4DDD4] text-[#374321] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#8DA256]" />
                  </div>
                  <div>
                    <strong className="text-[#22241D] block">Palakkad Agronomic Zone</strong>
                    <span>Kerala 678001 — Farm greens, drumstick leaves, and vegetable flash lock</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F8F6F5] border border-[#E4DDD4] text-[#374321] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#8DA256]" />
                  </div>
                  <div>
                    <strong className="text-[#22241D] block">Cold-Chain Dispatch</strong>
                    <span>Daily refrigerated reefers at -18°C dispatched across South & West India</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
