import React from 'react';
import type { Metadata } from 'next';
import { getProducts, getProductMainImage } from '@/lib/db';
import BoutiqueContent from './components/BoutiqueContent';

export const revalidate = 60; // Refresh cache every 60s

export const metadata: Metadata = {
  title: 'Boutique Ultra Tech — Ordinateurs & Accessoires à Douala',
  description: 'Achetez nos ordinateurs portables reconditionnés (HP, Dell, Microsoft Surface) et accessoires informatiques de qualité au meilleur prix à Douala, Cameroun.',
  alternates: {
    canonical: '/boutique',
  },
  openGraph: {
    title: 'Boutique Ultra Tech — Ordinateurs & Accessoires à Douala',
    description: 'Achetez nos ordinateurs portables reconditionnés (HP, Dell, Microsoft Surface) et accessoires informatiques de qualité au meilleur prix à Douala, Cameroun.',
    url: '/boutique',
    type: 'website',
  },
  twitter: {
    title: 'Boutique Ultra Tech — Ordinateurs & Accessoires à Douala',
    description: 'Achetez nos ordinateurs portables reconditionnés (HP, Dell, Microsoft Surface) et accessoires informatiques de qualité au meilleur prix à Douala, Cameroun.',
  }
};

export default async function BoutiquePage() {
  const products = await getProducts();

  // Create JSON-LD Product structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Catalogue de Produits — Ultra Tech",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.description || undefined,
        "image": getProductMainImage(product.image_url) || undefined,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "XAF",
          "itemCondition": "https://schema.org/RefurbishedCondition",
          "availability": product.stock_quantity > 0 
            ? "https://schema.org/InStock" 
            : "https://schema.org/OutOfStock"
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BoutiqueContent initialProducts={products} />
    </>
  );
}
