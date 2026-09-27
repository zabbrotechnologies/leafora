import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Package,
  ShieldCheck,
} from 'lucide-react';
import { PRODUCTS_DATA } from '../data/mockData';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialProduct = searchParams.get('product') || '';
  const initialType = searchParams.get('type') || 'general';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    enquiryType: initialProduct ? 'product-sample' : initialType,
    selectedProduct: initialProduct,
    businessType: 'restaurant',
    expectedVolume: 'under-500kg',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const prodParam = searchParams.get('product');
    const typeParam = searchParams.get('type');
    if (prodParam) {
      setFormData((prev) => ({
        ...prev,
        selectedProduct: prodParam,
        enquiryType: 'product-sample',
      }));
    } else if (typeParam) {
      setFormData((prev) => ({
        ...prev,
        enquiryType: typeParam,
      }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate real submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      enquiryType: 'general',
      selectedProduct: '',
      businessType: 'restaurant',
      expectedVolume: 'under-500kg',
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <main className="relative min-h-screen pt-28 sm:pt-36 pb-24 bg-[#F8FBFC] text-[#0F172A] z-20 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] rounded-full ambient-glow-cyan opacity-25 filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Page Hero */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full frost-badge text-xs font-semibold tracking-wider text-[#0F172A] uppercase mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
            <span>Commercial & Consumer Inquiries • Leafora Fresh</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#0F172A] tracking-tight">
            Connect With Our Team.
          </h1>
          <p className="text-base sm:text-lg text-[#0F172A]/75 mt-4 leading-relaxed">
            Whether you require commercial cold-chain wholesale distribution, custom pack sizing, or sample shippers for kitchen trials, our specialists are ready to assist.
          </p>
        </div>

        {/* Master Form & Contact Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Dynamic Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#B9E3F9]/60 bg-white/95">
              {isSubmitted ? (
                /* Success State */
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-[#A8E6CF] text-[#14B8A6] flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0F172A]">
                    Enquiry Received Successfully
                  </h3>
                  <p className="text-sm text-[#0F172A]/75 max-w-md mt-3 leading-relaxed">
                    Thank you, <span className="font-bold text-[#0F172A]">{formData.fullName || 'valued partner'}</span>. Our cold-chain team has received your enquiry regarding{' '}
                    <span className="font-bold text-[#14B8A6]">
                      {formData.selectedProduct || formData.enquiryType}
                    </span>{' '}
                    and will respond within 1 business day.
                  </p>

                  <div className="flex items-center gap-3 mt-8">
                    <button
                      onClick={handleResetForm}
                      className="px-6 py-3 rounded-full bg-[#0F172A] text-white text-xs font-bold hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                    <Link
                      to="/products"
                      className="px-6 py-3 rounded-full bg-white text-[#0F172A] text-xs font-bold border border-[#B9E3F9]/60 hover:bg-white transition-all"
                    >
                      Browse Catalogue
                    </Link>
                  </div>
                </div>
              ) : (
                /* Active Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-heading font-black text-[#0F172A]">
                      Send an Enquiry
                    </h2>
                    <p className="text-xs sm:text-sm text-[#0F172A]/70 mt-1">
                      Fill out the details below and we will tailor our response to your requirements.
                    </p>
                  </div>

                  {/* Enquiry Type Selector Tabs */}
                  <div>
                    <label className="text-xs font-mono font-bold text-[#0F172A]/70 uppercase block mb-2">
                      Enquiry Purpose *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'general', label: 'General Inquiry' },
                        { id: 'product-sample', label: 'Product Sample' },
                        { id: 'business-enquiry', label: 'Commercial B2B' },
                        { id: 'distributor', label: 'Distribution' },
                        { id: 'institutional', label: 'Catering / Hotel' },
                        { id: 'other', label: 'Other Request' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, enquiryType: type.id })}
                          className={`px-3 py-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                            formData.enquiryType === type.id
                              ? 'bg-[#0F172A] text-white shadow-xs'
                              : 'bg-[#F8FBFC] hover:bg-white text-[#0F172A]/70 border border-[#B9E3F9]/60'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional Pre-selected Product */}
                  {formData.enquiryType === 'product-sample' && (
                    <div className="p-4 rounded-2xl bg-[#14B8A6]/10 border border-[#14B8A6]/30">
                      <label className="text-xs font-mono font-bold text-[#14B8A6] uppercase block mb-2 flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5" />
                        <span>Select Product for Sample Shipper</span>
                      </label>
                      <select
                        value={formData.selectedProduct}
                        onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#B9E3F9]/80 text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50"
                      >
                        <option value="">-- Choose from our specialty line --</option>
                        {PRODUCTS_DATA.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} ({p.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono font-bold text-[#0F172A]/70 uppercase block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Chef / Buyer Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#B9E3F9]/70 text-xs font-medium text-[#0F172A] placeholder:text-[#0F172A]/35 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono font-bold text-[#0F172A]/70 uppercase block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="contact@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#B9E3F9]/70 text-xs font-medium text-[#0F172A] placeholder:text-[#0F172A]/35 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50 shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Phone and Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono font-bold text-[#0F172A]/70 uppercase block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#B9E3F9]/70 text-xs font-medium text-[#0F172A] placeholder:text-[#0F172A]/35 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono font-bold text-[#0F172A]/70 uppercase block mb-1.5">
                        Company / Kitchen Name
                      </label>
                      <input
                        type="text"
                        placeholder="Restaurant / Hotel / Outlet Name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#B9E3F9]/70 text-xs font-medium text-[#0F172A] placeholder:text-[#0F172A]/35 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50 shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-mono font-bold text-[#0F172A]/70 uppercase block mb-1.5">
                      Message / Special Specifications
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please mention your required volume, delivery frequency, or custom packaging format..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#B9E3F9]/70 text-xs font-medium text-[#0F172A] placeholder:text-[#0F172A]/35 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50 shadow-2xs resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#0F172A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Official Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Verified Contact Cards & Hub Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Connect Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-[#B9E3F9]/60 space-y-6 bg-white/90">
              <span className="text-xs font-mono font-bold tracking-widest text-[#14B8A6] uppercase block">
                COMMUNICATION CHANNELS
              </span>
              <h3 className="text-2xl font-heading font-black text-[#0F172A]">
                Direct Commercial Support
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#B9E3F9]/50 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#0F172A]/50 uppercase block">
                      EMAIL DESK
                    </span>
                    <a
                      href="mailto:contact@leaforafresh.com"
                      className="text-xs sm:text-sm font-bold text-[#0F172A] hover:text-[#14B8A6] transition-colors"
                    >
                      contact@leaforafresh.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#B9E3F9]/50 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#0F172A]/50 uppercase block">
                      COMMERCIAL HELPLINE
                    </span>
                    <a
                      href="tel:+919876543210"
                      className="text-xs sm:text-sm font-bold text-[#0F172A] hover:text-[#14B8A6] transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#B9E3F9]/50 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#0F172A]/50 uppercase block">
                      DISPATCH & SUPPORT HOURS
                    </span>
                    <span className="text-xs font-semibold text-[#0F172A]">
                      Monday – Saturday: 08:00 AM – 07:00 PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cold-Chain Distribution Guarantee Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] text-white shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6]/40 text-[#A8E6CF] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-heading font-bold text-white">
                Guaranteed Cold-Chain Logistics
              </h4>
              <p className="text-xs text-white/75 leading-relaxed">
                All sample boxes and commercial shipments are packed with thermal insulation and phase-change cryo-packs to maintain continuous -18°C integrity throughout regional transit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
