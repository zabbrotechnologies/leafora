import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/mockData';
import { ArrowLeft, ArrowUpRight, Check, Package, Utensils, ShieldCheck } from 'lucide-react';

interface ProductDetailPageProps {
  onRequestSample?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS_DATA.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="min-h-screen pt-36 pb-24 bg-[#F8F6F5] text-[#22241D] flex items-center justify-center">
        <div className="bg-white rounded-3xl p-10 text-center max-w-md mx-4 border border-[#E4DDD4] shadow-md space-y-4">
          <h1 className="text-2xl font-heading font-black">Harvest Item Not Found</h1>
          <p className="text-xs sm:text-sm text-[#575D4E]">
            The requested product could not be located in our active catalogue.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold hover:bg-[#48572B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Products</span>
          </Link>
        </div>
      </main>
    );
  }

  // Related products (excluding the current product)
  const relatedProducts = PRODUCTS_DATA.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className="relative min-h-screen pt-32 pb-24 bg-[#F8F6F5] text-[#22241D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#575D4E] hover:text-[#22241D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <nav className="flex items-center gap-2 text-xs text-[#575D4E]">
            <Link to="/" className="hover:text-[#22241D]">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#22241D]">
              Products
            </Link>
            <span>/</span>
            <span className="text-[#22241D] font-semibold">{product.name}</span>
          </nav>
        </div>

        {/* Main Product Feature Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
          
          {/* Left Column: Product Photography */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl overflow-hidden bg-white border border-[#E4DDD4] shadow-[0_12px_36px_-10px_rgba(55,67,33,0.08)]">
              <div className="aspect-[4/3] sm:aspect-[1/1] overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-[#22241D]/80 backdrop-blur-xs text-[#F8F6F5] text-xs font-bold uppercase tracking-wider">
                  {product.badge}
                </div>
              </div>
            </div>

            {/* Quick Origin & Freezing Facts */}
            <div className="p-5 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8DA256] block">
                  HARVEST BELT
                </span>
                <span className="font-semibold text-[#22241D]">
                  {product.harvestWindow}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8DA256] block">
                  FREEZING METHOD
                </span>
                <span className="font-semibold text-[#22241D]">
                  {product.freezeTemp}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Product Information & Enquiry CTA */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
                <span className="w-5 h-[1.5px] bg-[#8DA256] rounded-full" />
                <span>{product.category}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#22241D] tracking-tight">
                {product.name}
              </h1>
              <p className="text-base sm:text-lg text-[#575D4E] font-medium leading-relaxed">
                {product.subtitle || product.tagline}
              </p>
            </div>

            {/* Full Verified Description */}
            <p className="text-sm sm:text-base text-[#575D4E] leading-relaxed pt-2">
              {product.description}
            </p>

            {/* Primary Action Button: Dynamic Product Enquiry */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to={`/contact?product=${encodeURIComponent(product.name)}&type=product-inquiry`}
                className="px-8 py-4 rounded-full bg-[#374321] text-[#F8F6F5] text-xs sm:text-sm font-bold tracking-wide hover:bg-[#48572B] transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <span>Enquire About {product.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8DA256]" />
              </Link>
            </div>

            {/* Available Pack Sizes */}
            <div className="pt-4 border-t border-[#E4DDD4] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#22241D]">
                <Package className="w-4 h-4 text-[#8DA256]" />
                <span>Available Pack Configurations</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.packSizes.map((pack) => (
                  <span
                    key={pack}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-[#E4DDD4] text-xs text-[#22241D] font-medium"
                  >
                    {pack}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Verified Highlights */}
            {product.nutritionalHighlights && (
              <div className="pt-4 border-t border-[#E4DDD4] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#22241D]">
                  <ShieldCheck className="w-4 h-4 text-[#8DA256]" />
                  <span>Harvest Quality Standards</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {product.nutritionalHighlights.map((stat) => (
                    <div key={stat.label} className="p-3 rounded-xl bg-white border border-[#E4DDD4]">
                      <span className="text-[10px] uppercase font-semibold text-[#575D4E] block">
                        {stat.label}
                      </span>
                      <span className="text-sm font-bold text-[#22241D]">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Culinary Uses */}
            {product.culinaryPairings && (
              <div className="pt-4 border-t border-[#E4DDD4] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#22241D]">
                  <Utensils className="w-4 h-4 text-[#8DA256]" />
                  <span>Recommended Culinary Uses</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#575D4E]">
                  {product.culinaryPairings.map((pairing) => (
                    <li key={pairing} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8DA256] mt-0.5 shrink-0" />
                      <span>{pairing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>

        {/* Related Products Section */}
        <div className="pt-16 border-t border-[#E4DDD4] space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-heading font-black text-[#22241D]">
              Other Harvest Staples
            </h3>
            <Link
              to="/products"
              className="text-xs font-bold text-[#374321] hover:underline flex items-center gap-1"
            >
              <span>View All Range</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                to={`/products/${rel.id}`}
                className="group rounded-3xl bg-white border border-[#E4DDD4] p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#F8F6F5] mb-4">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#8DA256]">
                    {rel.category}
                  </span>
                  <h4 className="text-lg font-heading font-bold text-[#22241D] group-hover:text-[#374321]">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-[#575D4E] line-clamp-2">
                    {rel.subtitle || rel.tagline}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E4DDD4] flex items-center justify-between text-xs font-bold text-[#374321]">
                  <span>View Details</span>
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
