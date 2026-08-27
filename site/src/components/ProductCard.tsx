import React, { useEffect, useState } from 'react';
import AppImage from './ui/AppImage';
import Icon from './ui/AppIcon';
import { Product, getSettings, getProductMainImage } from '@/lib/db';

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetails }: ProductCardProps) {
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
  const mainImage = getProductMainImage(product.image_url);

  return (
    <div className="bg-white dark:bg-ultra-dark-blue-700 rounded-3xl border border-border dark:border-ultra-dark-blue-600 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-[transform,box-shadow] duration-300 flex flex-col group h-full">
      {/* Container d'image clickable */}
      <div 
        onClick={() => onOpenDetails?.(product)}
        className="relative w-full aspect-square bg-muted/50 dark:bg-ultra-dark-blue-800/60 p-6 flex items-center justify-center overflow-hidden cursor-pointer"
      >
        <AppImage
          src={mainImage}
          alt={product.name}
          width={280}
          height={280}
          className="object-contain group-hover:scale-105 transition-transform duration-300 max-h-full"
        />
        
        {/* Badge de stock */}
        {isOutOfStock ? (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
            Rupture
          </span>
        ) : product.featured ? (
          <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            Vedette
          </span>
        ) : null}
      </div>

      {/* Détails du produit */}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5 block">
          {product.category}
        </span>
        <h3 
          onClick={() => onOpenDetails?.(product)}
          className="font-extrabold text-base text-accent dark:text-blue-100 line-clamp-2 leading-snug flex-1 group-hover:text-primary transition-colors duration-200 text-pretty cursor-pointer"
        >
          {product.name}
        </h3>
        
        <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed h-8 text-pretty">
          {product.description}
        </p>

        {/* Prix et Action */}
        <div className="mt-5 pt-4 border-t border-border dark:border-ultra-dark-blue-600 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-400 dark:text-blue-400/60 uppercase tracking-wider">Prix</span>
            <span className="font-extrabold text-base text-accent dark:text-blue-100 leading-none mt-1 whitespace-nowrap">
              {product.price.toLocaleString('fr-CM')}&nbsp;<span className="text-xs font-bold">FCFA</span>
            </span>
          </div>

          <div className="flex gap-2">
            {onOpenDetails && (
              <button
                onClick={() => onOpenDetails(product)}
                className="flex items-center justify-center p-2.5 rounded-2xl bg-muted border border-border text-accent hover:bg-border transition-colors"
                title="Voir les détails et caractéristiques"
              >
                <Icon name="SearchIcon" size={14} aria-hidden="true" />
              </button>
            )}
            <a
              href={isOutOfStock ? '#' : getWhatsAppLink()}
              target={isOutOfStock ? '_self' : '_blank'}
              rel={isOutOfStock ? '' : 'noopener noreferrer'}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wide transition-[transform,background-color] duration-200 ${
                isOutOfStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105 active:scale-95'
              }`}
              onClick={(e) => {
                if (isOutOfStock) e.preventDefault();
              }}
            >
              <Icon name="PhoneIcon" size={14} className="fill-current" aria-hidden="true" />
              Commander
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
