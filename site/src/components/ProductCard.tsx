'use client';

import React, { useEffect, useState } from 'react';
import AppImage from './ui/AppImage';
import Icon from './ui/AppIcon';
import { Product, getSettings } from '@/lib/db';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [phone, setPhone] = useState('237676886733');

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings && settings.whatsapp_number_1) {
        setPhone(settings.whatsapp_number_1);
      }
    });
  }, []);

  const getWhatsAppLink = () => {
    const text = `Bonjour Ultra Tech! 👋 Je souhaite commander le produit suivant :\n\n• *${product.name}*\n• Catégorie : ${product.category}\n• Prix : ${product.price.toLocaleString('fr-CM')} FCFA\n\nEst-il toujours disponible en magasin ?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const isOutOfStock = product.stock_quantity === 0;

  return (
    <div className="bg-white rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
      {/* Container d'image */}
      <div className="relative w-full aspect-square bg-muted p-6 flex items-center justify-center overflow-hidden">
        <AppImage
          src={product.image_url}
          alt={product.name}
          width={280}
          height={280}
          className="object-contain group-hover:scale-105 transition-transform duration-300 max-h-full"
        />
        
        {/* Badge de stock */}
        {isOutOfStock ? (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Rupture
          </span>
        ) : product.featured ? (
          <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Vedette
          </span>
        ) : null}
      </div>

      {/* Détails du produit */}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5 block">
          {product.category}
        </span>
        <h3 className="font-extrabold text-base text-accent line-clamp-2 leading-snug flex-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed h-8">
          {product.description}
        </p>

        {/* Prix et Action */}
        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Prix</span>
            <span className="font-extrabold text-base text-accent leading-none mt-1">
              {product.price.toLocaleString('fr-CM')} <span className="text-xs font-bold">FCFA</span>
            </span>
          </div>

          <a
            href={isOutOfStock ? '#' : getWhatsAppLink()}
            target={isOutOfStock ? '_self' : '_blank'}
            rel={isOutOfStock ? '' : 'noopener noreferrer'}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wide transition-all ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105 active:scale-95'
            }`}
            onClick={(e) => {
              if (isOutOfStock) e.preventDefault();
            }}
          >
            <Icon name="PhoneIcon" size={14} className="fill-current" />
            Commander
          </a>
        </div>
      </div>
    </div>
  );
}
