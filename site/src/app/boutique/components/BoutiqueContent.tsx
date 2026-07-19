'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import ProductDetailsModal from '@/components/ProductDetailsModal';
import { Product } from '@/lib/db';
import Icon from '@/components/ui/AppIcon';

const CATEGORIES = ['Tous', 'Ordinateurs', 'Téléphones', 'Périphériques', 'Accessoires'];

interface BoutiqueContentProps {
  initialProducts: Product[];
}

export default function BoutiqueContent({ initialProducts }: BoutiqueContentProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync state if initialProducts changes (e.g. on revalidation)
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    let result = products;

    // Filtre par catégorie
    if (selectedCategory !== 'Tous') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filtre par recherche
    if (search.trim() !== '') {
      const term = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (p.description && p.description.toLowerCase().includes(term))
      );
    }

    setFilteredProducts(result);
  }, [search, selectedCategory, products]);

  return (
    <main className="relative min-h-screen bg-white">
      <Header />
      
      {/* Hero Boutique */}
      <section className="bg-muted pt-32 pb-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <span className="text-primary text-xs font-bold uppercase tracking-widest block">Notre catalogue</span>
          <h1 className="font-extrabold text-3xl md:text-5xl text-accent tracking-tight text-balance">
            Boutique Ultra Tech
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed text-pretty">
            Parcourez nos ordinateurs portables professionnels reconditionnés et nos accessoires informatiques de qualité à Douala.
          </p>
        </div>
      </section>

      {/* Catalog & Filters */}
      <section className="py-20 max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Barre de recherche et filtres */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          
          {/* Catégories */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wide transition-[background-color,color,box-shadow] duration-200 ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-muted border border-border text-accent hover:bg-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Recherche */}
          <div className="relative flex-1 md:max-w-xs">
            <input
              type="text"
              aria-label="Rechercher un produit"
              placeholder="Rechercher un produit…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            <div className="absolute left-4 top-3.5 text-gray-400">
              <Icon name="SearchIcon" size={16} aria-hidden="true" />
            </div>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-accent transition-colors duration-200"
                aria-label="Effacer la recherche"
              >
                <Icon name="XMarkIcon" size={16} aria-hidden="true" />
              </button>
            )}
          </div>

        </div>

        {/* Liste des produits */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground border border-dashed border-border rounded-[2rem] space-y-3">
            <Icon name="ShoppingBagIcon" size={48} className="mx-auto opacity-35" aria-hidden="true" />
            <h3 className="font-extrabold text-lg text-accent">Aucun produit trouvé</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">Essayez d&apos;ajuster vos critères de recherche ou changez de catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} onOpenDetails={setSelectedProduct} />
              </div>
            ))}
          </div>
        )}

      </section>

      <Footer />
      <WhatsAppButton />

      {/* Details Modal */}
      <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </main>
  );
}
