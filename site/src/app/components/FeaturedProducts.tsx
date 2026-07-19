'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product, getProducts } from '@/lib/db';
import Icon from '@/components/ui/AppIcon';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((allProducts) => {
      const featured = allProducts.filter((p) => p.featured && p.stock_quantity > 0).slice(0, 4);
      setProducts(featured);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3" />
        <p className="font-bold text-sm">Chargement des produits…</p>
      </div>
    );
  }

  if (products.length === 0) {
    return null; // Don't render section if there are no featured products
  }

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Titre de section */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="space-y-2">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block">Notre catalogue</span>
            <h2 className="font-extrabold text-3xl md:text-4xl text-accent tracking-tight text-balance">
              Produits en Vedette
            </h2>
          </div>
          <Link
            href="/boutique"
            className="flex items-center gap-2 text-primary font-bold text-sm hover:underline group transition-colors duration-200"
          >
            Voir toute la boutique
            <Icon name="ChevronRightIcon" size={16} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
