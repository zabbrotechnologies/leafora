import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../../data/mockData';
import { X, CheckCircle2, ShieldCheck, ThermometerSnowflake, PackageCheck, Send } from 'lucide-react';

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({ isOpen, onClose }) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['peas', 'corn', 'broccoli']);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    businessType: 'Restaurant / Bistro',
    expectedVolume: '100kg - 500kg / month',
    address: '',
    notes: '',
  });

  if (!isOpen) return null;

  const toggleProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      if (selectedProducts.length > 1) {
        setSelectedProducts(selectedProducts.filter((p) => p !== id));
      }
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/70 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#F8FBFC] rounded-3xl shadow-2xl border border-white/80 overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#B9E3F9]/60 flex items-center justify-center text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all shadow-sm"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' ? (
          <div className="p-6 sm:p-10">
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full frost-badge text-[11px] font-mono font-bold tracking-wider text-[#0F172A] uppercase mb-2">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>COMPLIMENTARY CRYOGENIC COLD SHIPPER</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0F172A] tracking-tight">
                Order Your Professional Sample Box
              </h3>
              <p className="text-xs sm:text-sm text-[#0F172A]/70 mt-1">
                Delivered in a vacuum-insulated dry-ice container at -20°C straight to your kitchen door for sensory tasting.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Selection */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                  Select Products For Your Tasting Flight:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRODUCTS_DATA.map((product) => {
                    const isSelected = selectedProducts.includes(product.id);
                    return (
                      <button
                        type="button"
                        key={product.id}
                        onClick={() => toggleProduct(product.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all duration-200 flex items-center justify-between text-xs ${
                          isSelected
                            ? 'bg-emerald-50/80 border-[#14B8A6] text-[#0F172A] font-bold shadow-xs'
                            : 'bg-white border-[#B9E3F9]/60 text-[#0F172A]/70 hover:border-[#14B8A6]/50'
                        }`}
                      >
                        <span className="truncate">{product.name}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0F172A]/70 uppercase mb-1">
                    Executive Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Chef Marcus Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B9E3F9]/80 text-xs text-[#0F172A] focus:outline-none focus:border-[#14B8A6]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0F172A]/70 uppercase mb-1">
                    Company / Establishment *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. L’Oasis Dining Group"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B9E3F9]/80 text-xs text-[#0F172A] focus:outline-none focus:border-[#14B8A6]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0F172A]/70 uppercase mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="chef@establishment.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B9E3F9]/80 text-xs text-[#0F172A] focus:outline-none focus:border-[#14B8A6]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0F172A]/70 uppercase mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B9E3F9]/80 text-xs text-[#0F172A] focus:outline-none focus:border-[#14B8A6]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0F172A]/70 uppercase mb-1">
                    Sector / Operation
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B9E3F9]/80 text-xs text-[#0F172A] focus:outline-none focus:border-[#14B8A6]"
                  >
                    <option>Restaurant / Bistro</option>
                    <option>Hotel & Banqueting</option>
                    <option>Café & Brunch Bar</option>
                    <option>Airline / Event Catering</option>
                    <option>Gourmet Retailer / Buyer</option>
                    <option>Home Gourmet Enthusiast</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0F172A]/70 uppercase mb-1">
                    Estimated Monthly Volume
                  </label>
                  <select
                    value={formData.expectedVolume}
                    onChange={(e) => setFormData({ ...formData, expectedVolume: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B9E3F9]/80 text-xs text-[#0F172A] focus:outline-none focus:border-[#14B8A6]"
                  >
                    <option>&lt; 100 kg / month (Sample test)</option>
                    <option>100kg - 500kg / month</option>
                    <option>500kg - 2,500kg / month</option>
                    <option>2,500kg+ (Contract Bulk)</option>
                  </select>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-[11px] font-mono font-bold text-[#0F172A]/70 uppercase mb-1">
                  Kitchen Delivery Address (Cold Freight Compatible) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, kitchen receiving dock / suite, city, postal code..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#B9E3F9]/80 text-xs text-[#0F172A] focus:outline-none focus:border-[#14B8A6]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] text-[#0F172A]/60 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
                  <span>Zero charge • No credit card required</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0F172A] text-white font-bold text-xs tracking-wider uppercase hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Cold Sample Shipper</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-[#14B8A6] flex items-center justify-center text-[#14B8A6] mb-2 shadow-lg animate-bounce">
              <PackageCheck className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold text-[#14B8A6] tracking-widest uppercase">
              CONFIRMATION #GLC-{Math.floor(100000 + Math.random() * 900000)}
            </span>

            <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0F172A]">
              Your Cold Sample Shipper is Being Packed!
            </h3>

            <p className="text-xs sm:text-sm text-[#0F172A]/70 max-w-md leading-relaxed">
              Thank you, <strong>{formData.fullName || 'Chef'}</strong>. Your custom tasting selection has been assigned to Cryogenic Cold-Hub Dispatch. Expect delivery in insulated dry-ice packaging within 24–48 hours.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-[#B9E3F9]/60 max-w-sm w-full text-left text-xs space-y-1 my-2 shadow-xs">
              <div className="flex justify-between text-[#0F172A]/60">
                <span>Selected Lines:</span>
                <strong className="text-[#0F172A]">{selectedProducts.length} Products</strong>
              </div>
              <div className="flex justify-between text-[#0F172A]/60">
                <span>Shipping Temp:</span>
                <strong className="text-[#14B8A6]">-18°C Controlled</strong>
              </div>
              <div className="flex justify-between text-[#0F172A]/60">
                <span>Telemetry Status:</span>
                <strong className="text-emerald-600">Active Sensor Logger</strong>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-2 px-8 py-3 rounded-full bg-[#0F172A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
