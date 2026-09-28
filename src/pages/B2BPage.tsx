import React, { useState } from 'react';
import { Package, TrendingDown, Truck, CheckCircle2, ArrowRight, Layers, Building2, PhoneCall } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/mockData';

interface BulkFormat {
  name: string;
  targetUser: string;
  packSizes: string;
  boxWeight: string;
  features: string[];
}

const BULK_FORMATS: BulkFormat[] = [
  {
    name: 'Chef Service Pouches',
    targetUser: 'Boutique Restaurants & Cafes',
    packSizes: '1.0 kg & 2.5 kg pouches',
    boxWeight: '10 kg Master Outer (10 x 1kg / 4 x 2.5kg)',
    features: [
      'Heavy-duty food-grade resealable barrier film',
      'Portioned for rapid line station replenishment',
      'Minimizes freezer footprint in compact kitchens',
    ],
  },
  {
    name: 'Commissary Master Bulk',
    targetUser: 'Cloud Kitchens & Central Production',
    packSizes: '5.0 kg & 10.0 kg vacuum liners',
    boxWeight: '20 kg Corrugated Export Box',
    features: [
      'Calibrated for automated hopper and batch kettles',
      'Lowest unit cost per kilogram',
      'Barcode tracked batch traceability with lab COA',
    ],
  },
  {
    name: 'Retail Display Shippers',
    targetUser: 'Gourmet Groceries & Modern Trade',
    packSizes: '200g, 250g & 400g retail trays',
    boxWeight: '24 units per shelf-ready inner tray',
    features: [
      'High-impact matte soft-touch finish',
      'FSSAI & GS1 barcode compliant retail graphics',
      'Tear-notch tamper-evident acoustic seal',
    ],
  },
];

export const B2BPage: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    kitchenType: 'Fine Dining / Heritage Restaurant',
    monthlyVolume: '100 – 500 kg',
    selectedProducts: [] as string[],
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleProduct = (prodName: string) => {
    setFormData((prev) => {
      const exists = prev.selectedProducts.includes(prodName);
      return {
        ...prev,
        selectedProducts: exists
          ? prev.selectedProducts.filter((p) => p !== prodName)
          : [...prev.selectedProducts, prodName],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <main className="relative min-h-screen pt-32 pb-24 bg-[#F8F6F5] text-[#22241D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-16 sm:space-y-20">
        
        {/* Page Hero Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
              <span className="w-5 h-[1.5px] bg-[#8DA256] rounded-full" />
              <span>COMMERCIAL FOODSERVICE & INDUSTRIAL SUPPLY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#22241D] leading-tight tracking-tight">
              B2B Supply & Chef Cartons.
            </h1>

            <p className="text-lg sm:text-xl text-[#575D4E] leading-relaxed">
              Eliminate prep labor bottlenecks and spot-market produce inflation. We deliver certified harvest-locked produce directly to commercial kitchens, caterers, and cloud facilities across South & West India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#b2b-form"
              className="px-7 py-3.5 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold tracking-wide hover:bg-[#48572B] transition-colors shadow-xs flex items-center gap-2"
            >
              <span>Request Chef Sample Kit</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8DA256]" />
            </a>
          </div>
        </div>

        {/* 4 Core B2B Value Proposition Cards (Clean Single Border Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-3xl bg-white border border-[#E4DDD4] p-7 flex flex-col justify-between space-y-5 shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-[#8DA256]" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#22241D]">
                Price Stability
              </h3>
              <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
                Hedge against erratic produce price spikes with fixed 6 or 12-month farm contract pricing.
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#8DA256]">
              Fixed Annual Pricing
            </span>
          </div>

          <div className="rounded-3xl bg-white border border-[#E4DDD4] p-7 flex flex-col justify-between space-y-5 shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center">
                <Package className="w-5 h-5 text-[#8DA256]" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#22241D]">
                100% Usable Yield
              </h3>
              <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
                No stem disposal, peel shrinkage, or sorting wastage. Every single paid gram goes into production.
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#8DA256]">
              Zero Scrap Discard
            </span>
          </div>

          <div className="rounded-3xl bg-white border border-[#E4DDD4] p-7 flex flex-col justify-between space-y-5 shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#8DA256]" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#22241D]">
                Batch Uniformity
              </h3>
              <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
                Maintain standard recipe consistency across multiple kitchen outlets without chef variation.
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#8DA256]">
              Standardized Dosage
            </span>
          </div>

          <div className="rounded-3xl bg-white border border-[#E4DDD4] p-7 flex flex-col justify-between space-y-5 shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#8DA256]" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#22241D]">
                -18°C Cold Chain
              </h3>
              <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
                Continuous digital data logger tracking from cryogenic blast tunnel to your kitchen walk-in freezer.
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#8DA256]">
              Certified Reefer Fleet
            </span>
          </div>
        </div>

        {/* Commercial Packaging Formats (Clean Single Border Cards) */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#22241D] tracking-tight">
              Commercial Packaging Formats
            </h2>
            <p className="text-sm text-[#575D4E]">
              Calibrated pack sizes designed for chef lines, high-speed commissaries, and retail distributors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BULK_FORMATS.map((fmt) => (
              <div
                key={fmt.name}
                className="rounded-3xl bg-white border border-[#E4DDD4] p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs"
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8DA256]">
                      {fmt.targetUser}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-[#22241D]">
                      {fmt.name}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] space-y-1 text-xs">
                    <div className="font-semibold text-[#22241D]">
                      Pouch: <span className="font-normal text-[#575D4E]">{fmt.packSizes}</span>
                    </div>
                    <div className="font-semibold text-[#22241D]">
                      Master Case: <span className="font-normal text-[#575D4E]">{fmt.boxWeight}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 pt-2 text-xs text-[#575D4E]">
                    {fmt.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8DA256] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <a
                    href="#b2b-form"
                    className="w-full py-2.5 rounded-full bg-[#F3EFEA] hover:bg-[#374321] hover:text-[#F8F6F5] text-[#22241D] text-xs font-bold text-center border border-[#E4DDD4] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Request Spec Sheet</span>
                    <ArrowRight className="w-3 h-3 text-[#8DA256]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B2B Quotation & Sample Inquiry Form (Single Clean Border Card) */}
        <div id="b2b-form" className="rounded-3xl bg-white border border-[#E4DDD4] p-6 sm:p-10 md:p-12 shadow-xs scroll-mt-28">
          <div className="max-w-3xl mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
              <Building2 className="w-4 h-4" />
              <span>DIRECT WHOLESALE DESK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#22241D] tracking-tight">
              Request Commercial Pricing & Tasting Kit
            </h2>
            <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
              Fill out your establishment details below. We dispatch chilled test kits with frozen coconut blocks, stone-crushed cubes, and greens directly to professional culinary teams.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#8DA256]" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#22241D]">
                Wholesale Request Received
              </h3>
              <p className="text-sm text-[#575D4E] max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-[#22241D]">{formData.contactName}</strong> from <strong className="text-[#22241D]">{formData.businessName || 'your kitchen'}</strong>. Our Foodservice Accounts Director will contact you at <strong className="text-[#22241D]">{formData.email}</strong> within 1 business day with price schedules and sample dispatch details.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold hover:bg-[#48572B] transition-colors"
                >
                  Submit Another Wholesale Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Business Name & Contact Person */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Business / Brand Name <span className="text-[#8DA256]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Malabar Heritage Kitchens / CloudBite Foods"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Chef / Contact Person <span className="text-[#8DA256]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="e.g. Chef Vikramaditya Roy"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Official Email <span className="text-[#8DA256]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. chef@kitchengroup.com"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Phone / WhatsApp <span className="text-[#8DA256]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98400 98765"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Kitchen Type, Monthly Volume & City */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Operation Format
                  </label>
                  <select
                    value={formData.kitchenType}
                    onChange={(e) => setFormData({ ...formData, kitchenType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] focus:outline-none focus:border-[#374321] transition-colors"
                  >
                    <option value="Fine Dining / Heritage Restaurant">Fine Dining / Heritage Restaurant</option>
                    <option value="Cloud Kitchen / Multi-Brand Delivery">Cloud Kitchen / Multi-Brand Delivery</option>
                    <option value="Hotel & Resort Chain">Hotel & Resort Chain</option>
                    <option value="Catering & Institutional Banquet">Catering & Institutional Banquet</option>
                    <option value="Supermarket / Retail Chain">Supermarket / Retail Chain</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Estimated Monthly Volume
                  </label>
                  <select
                    value={formData.monthlyVolume}
                    onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] focus:outline-none focus:border-[#374321] transition-colors"
                  >
                    <option value="Under 100 kg / Pilot">Under 100 kg / Pilot Trial</option>
                    <option value="100 – 500 kg">100 – 500 kg per month</option>
                    <option value="500 kg – 2 Tonnes">500 kg – 2 Tonnes per month</option>
                    <option value="2+ Tonnes / Enterprise">2+ Tonnes / Master Contract</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                    Delivery Hub City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Bengaluru / Chennai / Kochi"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors"
                  />
                </div>
              </div>

              {/* Products of Interest Checkboxes */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                  Select Products for Sample Evaluation
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {PRODUCTS_DATA.map((p) => {
                    const isSelected = formData.selectedProducts.includes(p.name);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => toggleProduct(p.name)}
                        className={`p-3 rounded-2xl text-left border transition-all text-xs font-medium cursor-pointer ${
                          isSelected
                            ? 'bg-[#374321] text-white border-[#374321]'
                            : 'bg-[#F8F6F5] text-[#22241D] border-[#E4DDD4] hover:bg-white'
                        }`}
                      >
                        <div className="font-bold truncate">{p.name}</div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-[#A8E6CF]' : 'text-[#575D4E]'}`}>
                          {p.category}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#22241D] block">
                  Special Requirements or Custom Cut Specs
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about specific dish requirements, delivery frequency, or custom packaging preferences..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F5] border border-[#E4DDD4] text-xs sm:text-sm text-[#22241D] placeholder:text-[#575D4E]/50 focus:outline-none focus:border-[#374321] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-9 py-4 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold tracking-wide hover:bg-[#48572B] transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Transmitting Request...' : 'Submit Commercial Request'}</span>
                  <ArrowRight className="w-4 h-4 text-[#8DA256]" />
                </button>

                <div className="flex items-center gap-2 text-xs text-[#575D4E]">
                  <PhoneCall className="w-4 h-4 text-[#8DA256]" />
                  <span>Wholesale Desk: <a href="tel:+919840012345" className="font-bold text-[#22241D] hover:underline">+91 98400 12345</a></span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </main>
  );
};
