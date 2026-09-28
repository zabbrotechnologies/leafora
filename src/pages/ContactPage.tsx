import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/mockData';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialProduct = searchParams.get('product') || '';
  const initialType = searchParams.get('type') || 'general';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: initialProduct ? 'product-sample' : initialType,
    product: initialProduct,
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
        product: prodParam,
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
    }, 600);
  };

  return (
    <main className="relative min-h-screen pt-32 pb-24 bg-[#F8F6F5] text-[#22241D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
            <span className="w-6 h-[1.5px] bg-[#8DA256] rounded-full" />
            <span>Get In Touch</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-heading font-black text-[#22241D] tracking-tight">
            Contact Leafora Fresh
          </h1>

          <p className="text-base sm:text-lg text-[#575D4E] leading-relaxed">
            Have a question about our harvest staples, retail distribution, or kitchen supply? Send us a note and we will reply directly.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-[#374321]">
            <Mail className="w-4 h-4 text-[#8DA256]" />
            <a href="mailto:contact@leaforafresh.com" className="hover:underline">
              contact@leaforafresh.com
            </a>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white rounded-3xl border border-[#E4DDD4] p-6 sm:p-10 md:p-12 shadow-[0_12px_40px_-10px_rgba(55,67,33,0.06)]">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#8DA256]" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#22241D]">
                Thank you for reaching out
              </h3>
              <p className="text-sm text-[#575D4E] max-w-md mx-auto leading-relaxed">
                Your message has been received. Our team will review your inquiry
                {formData.product ? ` regarding ${formData.product}` : ''} and contact you at{' '}
                <strong className="text-[#22241D]">{formData.email}</strong> shortly.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold hover:bg-[#48572B] transition-colors"
                >
                  Return to Products
                </Link>
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
                  className="px-6 py-3 rounded-full bg-[#F3EFEA] text-[#22241D] text-xs font-bold border border-[#E4DDD4] hover:bg-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Full Name <span className="text-[#8DA256]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Email Address <span className="text-[#8DA256]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Enquiry Type Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Enquiry Type
                  </label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-sm text-[#22241D] focus:outline-none focus:border-[#374321] transition-colors"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="product-sample">Product Sample / Tasting</option>
                    <option value="commercial-supply">Commercial Kitchen Supply</option>
                    <option value="retail-distribution">Retail Distribution</option>
                  </select>
                </div>
              </div>

              {/* Product Selection (Pre-populated if coming from product page!) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                  Product of Interest {formData.product && <span className="text-[#8DA256] text-[11px] font-normal lowercase">(auto-selected)</span>}
                </label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-sm text-[#22241D] focus:outline-none focus:border-[#374321] transition-colors"
                >
                  <option value="">Select a product (optional)...</option>
                  {PRODUCTS_DATA.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                  <option value="Complete Harvest Range">Complete Harvest Range</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                  Message or Quantity Details
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share any specific requirements, pack size preferences, or delivery locations..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold tracking-wide hover:bg-[#48572B] transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
                  <ArrowRight className="w-4 h-4 text-[#8DA256]" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </main>
  );
};
