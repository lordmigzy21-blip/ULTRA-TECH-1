'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppImage from './ui/AppImage';
import Icon from './ui/AppIcon';
import { Product, getSettings, getProductAllImages, getProductAllVideos } from '@/lib/db';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [phone, setPhone] = useState('237676886733');

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
    }
  }, [product]);

  useEffect(() => {
    getSettings().then((settings) => {
      if (settings && settings.whatsapp_number_1) {
        setPhone(settings.whatsapp_number_1);
      }
    });
  }, []);

  if (!product) return null;

  const images = getProductAllImages(product.image_url);
  const videos = getProductAllVideos(product.video_url);
  const isOutOfStock = product.stock_quantity === 0;

  const getWhatsAppLink = () => {
    const text = `Bonjour Ultra Tech! 👋 Je souhaite commander le produit suivant :\n\n• *${product.name}*\n• Catégorie : ${product.category}\n• Prix : ${product.price.toLocaleString('fr-CM')} FCFA\n\nEst-il toujours disponible en magasin ?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-8">
        {/* Background Blur Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row relative border border-border z-10 max-h-[90vh] md:max-h-[85vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-muted hover:scale-105 active:scale-95 transition-all shadow-sm text-accent"
            aria-label="Fermer"
          >
            <Icon name="XMarkIcon" size={18} />
          </button>

          {/* Left Side: Images Gallery */}
          <div className="w-full md:w-1/2 bg-muted/30 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border min-h-[320px] md:min-h-0">
            <div className="relative flex-1 flex items-center justify-center">
              {/* Active Image Preview */}
              {images.length > 0 ? (
                <div className="w-full aspect-square max-h-[250px] md:max-h-[380px] flex items-center justify-center p-4">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={images[activeImageIndex]}
                      alt={product.name}
                      className="object-contain max-w-full max-h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
                    />
                  </motion.div>
                </div>
              ) : (
                <div className="text-muted-foreground flex flex-col items-center gap-2">
                  <Icon name="PhotoIcon" size={48} className="opacity-25" />
                  <span className="text-xs">Aucune image</span>
                </div>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 p-2.5 rounded-full bg-white/90 border border-border hover:bg-white text-accent hover:scale-105 active:scale-95 transition-all shadow-sm"
                    aria-label="Image précédente"
                  >
                    <Icon name="ChevronRightIcon" size={16} className="rotate-180" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 p-2.5 rounded-full bg-white/90 border border-border hover:bg-white text-accent hover:scale-105 active:scale-95 transition-all shadow-sm"
                    aria-label="Image suivante"
                  >
                    <Icon name="ChevronRightIcon" size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Gallery Thumbnails List */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4 overflow-x-auto py-1 px-2 max-w-full">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 rounded-xl bg-white border overflow-hidden flex-shrink-0 flex items-center justify-center transition-all p-1 ${
                      idx === activeImageIndex
                        ? 'border-primary ring-2 ring-primary/20 scale-105'
                        : 'border-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="object-contain max-w-full max-h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Product Details */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-none">
            <div className="space-y-4">
              {/* Category & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex gap-1.5">
                  {isOutOfStock ? (
                    <span className="bg-red-100 text-red-600 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Rupture
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      En Stock
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-sky-light text-primary text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Vedette
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Price */}
              <div className="space-y-1.5">
                <h2 className="font-extrabold text-xl md:text-2xl text-accent leading-snug">
                  {product.name}
                </h2>
                <div className="text-2xl font-black text-primary">
                  {product.price.toLocaleString('fr-CM')} <span className="text-sm font-extrabold">FCFA</span>
                </div>
              </div>

              {/* Characteristics / Description */}
              <div className="space-y-2 pt-2 border-t border-border">
                <h3 className="text-xs font-bold text-accent uppercase tracking-wider">Caractéristiques</h3>
                <div className="text-sm text-gray-600 leading-relaxed max-h-[160px] md:max-h-[220px] overflow-y-auto pr-2 custom-scrollbar whitespace-pre-wrap">
                  {product.description || "Aucune caractéristique spécifiée."}
                </div>
              </div>

              {videos.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <h3 className="text-xs font-bold text-accent uppercase tracking-wider">Vidéos</h3>
                  <div className="space-y-3">
                    {videos.map((videoUrl, idx) => (
                      <video
                        key={idx}
                        src={videoUrl}
                        controls
                        className="w-full rounded-xl bg-black max-h-40"
                        preload="metadata"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-3.5 border border-border text-center rounded-2xl font-bold text-xs hover:bg-muted text-accent transition-all flex-1"
              >
                Fermer
              </button>
              <a
                href={isOutOfStock ? '#' : getWhatsAppLink()}
                target={isOutOfStock ? '_self' : '_blank'}
                rel={isOutOfStock ? '' : 'noopener noreferrer'}
                className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex-2 text-white shadow-md ${
                  isOutOfStock
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-green-500 hover:bg-green-600 hover:scale-[1.02] active:scale-[0.98]'
                }`}
                onClick={(e) => {
                  if (isOutOfStock) e.preventDefault();
                }}
              >
                <Icon name="PhoneIcon" size={14} className="fill-current" />
                Commander sur WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
