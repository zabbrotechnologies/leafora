import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/mockData';
import {
  ArrowLeft,
  ArrowUpRight,
  Snowflake,
  ShieldCheck,
  ThermometerSnowflake,
  Sparkles,
  Utensils,
  Package,
  Check,
} from 'lucide-react';

interface ProductDetailPageProps {
  onRequestSample: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onRequestSample }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS_DATA.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="min-h-screen pt-36 pb-24 bg-[#F8FBFC] text-[#0F172A] flex items-center justify-center">
        <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center mx-auto mb-4">
            <Snowflake className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-heading font-black">Product Not Found</h1>
          <p className="text-xs sm:text-sm text-[#0F172A]/70 mt-2 mb-6">
            The requested product could not be located in our active catalogue.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F172A] text-white text-xs font-bold hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Products</span>
          </Link>
        </div>
      </main>
    );
  }

  // Related products from same or different categories
  const relatedProducts = PRODUCTS_DATA.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className="relative min-h-screen pt-28 sm:pt-36 pb-24 bg-[#F8FBFC] text-[#0F172A] z-20 overflow-hidden">
      {/* Background Soft Glow matching product hero color */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[70vw] h-[500px] rounded-full filter blur-3xl pointer-events-none opacity-20 transition-all duration-700 -z-10"
        style={{ backgroundColor: product.heroColor || '#14B8A6' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Back Link & Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F172A]/70 hover:text-[#14B8A6] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-[#0F172A]/50">
            <Link to="/" className="hover:text-[#0F172A]">
              HOME
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#0F172A]">
              PRODUCTS
            </Link>
            <span>/</span>
            <span className="text-[#14B8A6] font-bold">{product.name.toUpperCase()}</span>
          </div>
        </div>

        {/* Master Product Showcase Grid */}
        <div className="glass-panel rounded-3xl p-6 sm:p-12 shadow-2xl border border-[#B9E3F9]/60 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Big Product Photography & Visual Indicators */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#0F172A]/5 relative shadow-xl group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent pointer-events-none" />

              {/* Overlaid Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#0F172A]/85 backdrop-blur-md text-white text-xs font-mono font-semibold tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                  {product.badge}
                </span>
              </div>

              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono font-bold text-[#0F172A] shadow-xs flex items-center gap-1">
                  <ThermometerSnowflake className="w-3.5 h-3.5 text-[#14B8A6]" />
                  {product.freezeTemp.split(' ')[0]}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                <span className="text-[#A8E6CF] font-bold">{product.category}</span>
                <span className="opacity-80">SHELF LIFE: {product.shelfLife}</span>
              </div>
            </div>

            {/* Quick Cold-Chain Verification Pill */}
            <div className="p-4 rounded-2xl bg-white/80 border border-[#B9E3F9]/60 shadow-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#14B8A6] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Cryogenic Cold-Chain Protocol Active</span>
              </div>
              <span className="font-mono text-[#0F172A]/60 text-[11px]">100% Traceable Origin</span>
            </div>
          </div>

          {/* Right Column: Deep Specifications & Details */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#14B8A6] uppercase block mb-1">
                ORIGIN: {product.harvestWindow}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0F172A] tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-[#0F172A]/75 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* 4 Nutritional & Bio-Potency Highlights */}
            <div>
              <h3 className="text-xs font-mono font-bold text-[#0F172A]/60 uppercase tracking-widest mb-3">
                BIO-POTENCY & QUALITY TELEMETRY
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.nutritionalHighlights.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-white/90 border border-[#B9E3F9]/60 shadow-xs flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-mono text-[#0F172A]/50 uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-base sm:text-lg font-heading font-black text-[#0F172A] mt-1">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pack Formats */}
            {product.packSizes && product.packSizes.length > 0 && (
              <div>
                <h3 className="text-xs font-mono font-bold text-[#0F172A]/60 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>AVAILABLE COMMERCIAL & RETAIL FORMATS</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.packSizes.map((pack, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white/90 border border-[#B9E3F9]/60 text-[#0F172A] text-xs font-medium font-mono"
                    >
                      {pack}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Culinary Pairings */}
            <div>
              <h3 className="text-xs font-mono font-bold text-[#0F172A]/60 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>RECOMMENDED CULINARY APPLICATIONS</span>
              </h3>
              <div className="space-y-1.5">
                {product.culinaryPairings.map((pair, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#0F172A]/85">
                    <Check className="w-3.5 h-3.5 text-[#14B8A6] shrink-0 mt-0.5" />
                    <span>{pair}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Actions & Dynamic Enquiries */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#B9E3F9]/40">
              <Link
                to={`/contact?product=${encodeURIComponent(product.name)}&type=product-sample`}
                className="px-7 py-3.5 rounded-full bg-[#0F172A] text-white text-xs font-bold tracking-wide hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all flex items-center gap-2 shadow-md"
              >
                <span>Enquire About {product.name}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                onClick={onRequestSample}
                className="px-6 py-3.5 rounded-full bg-white text-[#0F172A] text-xs font-bold tracking-wide border border-[#B9E3F9]/60 hover:bg-white shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Request Sample Shipper</span>
              </button>
            </div>
          </div>
        </div>

        {/* Supporting Related Products Carousel */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0F172A]">
              Explore Other Specialty Harvests
            </h3>
            <Link
              to="/products"
              className="text-xs font-semibold text-[#14B8A6] hover:underline flex items-center gap-1"
            >
              <span>View Complete Range</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                to={`/products/${rel.id}`}
                className="glass-panel rounded-3xl p-5 shadow-lg border border-[#B9E3F9]/60 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#0F172A]/5 relative mb-4">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0F172A]/80 text-white text-[10px] font-mono">
                    {rel.badge}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#14B8A6] font-bold uppercase block">
                    {rel.category}
                  </span>
                  <h4 className="text-lg font-heading font-bold text-[#0F172A] mt-0.5">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-[#0F172A]/70 mt-1 line-clamp-2">
                    {rel.subtitle || rel.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#B9E3F9]/40 flex items-center justify-between text-xs font-bold text-[#14B8A6]">
                  <span>Inspect Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
