'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductDetailsModal from '@/components/ProductDetailsModal';
import { Product, getProductMainImage } from '@/lib/db';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface FeaturedProductsProps {
  initialProducts: Product[];
}

export default function FeaturedProducts({ initialProducts }: FeaturedProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featured = initialProducts
    .filter((p) => p.featured && p.stock_quantity > 0)
    .slice(0, 5);

  if (featured.length === 0) {
    return null;
  }

  const mainSpotlight = featured[0];
  const remainingFeatured = featured.slice(1, 5);

  const getWhatsAppLink = (product: Product) => {
    const text = `Bonjour Ultra Tech! 👋 Je souhaite commander le produit suivant :\n\n• *${product.name}*\n• Prix : ${product.price.toLocaleString('fr-CM')} FCFA\n\nEst-il disponible en boutique Akwa ?`;
    return `https://wa.me/237676886733?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-24 bg-[#0A0E1A] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Titre de section */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="space-y-2">
            <span className="text-[#5B9BF0] text-xs font-bold uppercase tracking-widest block">Matériel Testé &amp; Garanti</span>
            <h2 className="font-heading font-black text-3xl md:text-5xl text-white tracking-tight text-balance">
              Sélection Équipements Vedettes
            </h2>
          </div>
          <Link
            href="/boutique"
            className="flex items-center gap-2 text-[#5B9BF0] font-bold text-sm hover:underline group transition-colors duration-200"
          >
            Explorer tout le catalogue ({initialProducts.length})
            <Icon name="ChevronRightIcon" size={16} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>
        </div>

        {/* ── Spotlight Featured Banner Card + Sub-grid ── */}
        <div className="space-y-8">
          
          {/* Spotlight Hero Card */}
          {mainSpotlight && (
            <div className="bg-[#101526] rounded-3xl border border-white/15 p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#28469E] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                ⭐ Coup de Cœur Boutique
              </div>

              {/* Photo spotlight */}
              <div
                onClick={() => setSelectedProduct(mainSpotlight)}
                className="lg:col-span-5 relative aspect-square bg-[#0A0E1A] rounded-2xl p-6 flex items-center justify-center cursor-pointer border border-white/10 group overflow-hidden"
              >
                <AppImage
                  src={getProductMainImage(mainSpotlight.image_url)}
                  alt={mainSpotlight.name}
                  width={340}
                  height={340}
                  className="object-contain group-hover:scale-105 transition-transform duration-300 max-h-full"
                />
              </div>

              {/* Infos spotlight */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#5B9BF0] uppercase tracking-widest block mb-2">
                    {mainSpotlight.category}
                  </span>
                  <h3
                    onClick={() => setSelectedProduct(mainSpotlight)}
                    className="font-heading font-black text-2xl sm:text-3xl text-white hover:text-[#5B9BF0] transition-colors cursor-pointer leading-tight text-pretty"
                  >
                    {mainSpotlight.name}
                  </h3>
                  <p className="text-sm text-gray-300 mt-3 leading-relaxed text-pretty max-w-xl">
                    {mainSpotlight.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-white/10">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Prix Net</span>
                    <span className="font-heading font-black text-2xl sm:text-3xl text-white">
                      {mainSpotlight.price.toLocaleString('fr-CM')}&nbsp;<span className="text-xs font-bold text-[#5B9BF0]">FCFA</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProduct(mainSpotlight)}
                      className="px-5 py-3 rounded-full border border-white/20 text-white font-bold text-xs hover:bg-white/10 transition-colors"
                    >
                      Caractéristiques
                    </button>
                    <a
                      href={getWhatsAppLink(mainSpotlight)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Icon name="PhoneIcon" size={14} className="fill-current" aria-hidden="true" />
                      Commander
                    </a>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Remaining Featured Products Grid */}
          {remainingFeatured.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {remainingFeatured.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} onOpenDetails={setSelectedProduct} />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Details Modal */}
      <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
