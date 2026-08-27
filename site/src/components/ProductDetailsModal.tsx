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
    const text = `Bonjour Ultra Tech! 👋 Je souhaite commander le produit suivant :\n\n• *${product.name}*\n• Catégorie : ${product.category}\n• Prix : ${product.price.toLocaleString('fr-CM')} FCFA\n\nEst-il toujours disponible en magasin à Akwa ?`;
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
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-[#101526] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row relative border border-border dark:border-white/15 z-10 max-h-[90vh] md:max-h-[85vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-[#0A0E1A]/80 backdrop-blur-sm border border-border dark:border-white/20 flex items-center justify-center hover:bg-muted dark:hover:bg-white/10 hover:scale-105 active:scale-95 transition-all shadow-sm text-accent dark:text-white"
            aria-label="Fermer"
          >
            <Icon name="XMarkIcon" size={18} />
          </button>

          {/* Left Side: Images Gallery */}
          <div className="w-full md:w-1/2 bg-muted/30 dark:bg-[#0A0E1A] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border dark:border-white/10 min-h-[320px] md:min-h-0">
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
                      className="object-contain max-w-full max-h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                    />
                  </motion.div>
                </div>
              ) : (
                <div className="text-muted-foreground dark:text-gray-400 flex flex-col items-center gap-2">
                  <Icon name="PhotoIcon" size={48} className="opacity-25" />
                  <span className="text-xs">Aucune image</span>
                </div>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 p-2.5 rounded-full bg-white/90 dark:bg-[#101526]/90 border border-border dark:border-white/20 text-accent dark:text-white hover:scale-105 active:scale-95 transition-all shadow-sm"
                    aria-label="Image précédente"
                  >
                    <Icon name="ChevronRightIcon" size={16} className="rotate-180" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 p-2.5 rounded-full bg-white/90 dark:bg-[#101526]/90 border border-border dark:border-white/20 text-accent dark:text-white hover:scale-105 active:scale-95 transition-all shadow-sm"
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
                    className={`w-12 h-12 rounded-xl bg-white dark:bg-[#101526] border overflow-hidden flex-shrink-0 flex items-center justify-center transition-all p-1 ${
                      idx === activeImageIndex
                        ? 'border-primary ring-2 ring-primary/20 scale-105'
                        : 'border-border dark:border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="object-contain max-w-full max-h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Product Details */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-none dark:text-white">
            <div className="space-y-4">
              {/* Category & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-[#5B9BF0] uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex gap-1.5">
                  {isOutOfStock ? (
                    <span className="bg-red-500/20 text-red-400 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-red-500/30">
                      Rupture
                    </span>
                  ) : (
                    <span className="bg-green-500/20 text-green-400 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-green-500/30">
                      En Stock Akwa
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-[#28469E]/30 text-[#5B9BF0] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#5B9BF0]/30">
                      Vedette
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Price */}
              <div className="space-y-1.5">
                <h2 className="font-heading font-black text-xl md:text-2xl text-accent dark:text-white leading-snug">
                  {product.name}
                </h2>
                <div className="font-heading font-black text-2xl text-primary dark:text-[#5B9BF0]">
                  {product.price.toLocaleString('fr-CM')} <span className="text-sm font-bold text-gray-400">FCFA</span>
                </div>
              </div>

              {/* Characteristics / Description */}
              <div className="space-y-2 pt-2 border-t border-border dark:border-white/10">
                <h3 className="text-xs font-bold text-accent dark:text-gray-300 uppercase tracking-wider">Caractéristiques</h3>
                <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-h-[160px] md:max-h-[220px] overflow-y-auto pr-2 custom-scrollbar whitespace-pre-wrap">
                  {product.description || "Aucune caractéristique spécifiée."}
                </div>
              </div>

              {videos.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border dark:border-white/10">
                  <h3 className="text-xs font-bold text-accent dark:text-gray-300 uppercase tracking-wider">Vidéos</h3>
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
            <div className="mt-6 pt-4 border-t border-border dark:border-white/10 flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-3.5 border border-border dark:border-white/20 text-center rounded-full font-bold text-xs hover:bg-muted dark:hover:bg-white/10 text-accent dark:text-white transition-all flex-1"
              >
                Fermer
              </button>
              <a
                href={isOutOfStock ? '#' : getWhatsAppLink()}
                target={isOutOfStock ? '_self' : '_blank'}
                rel={isOutOfStock ? '' : 'noopener noreferrer'}
                className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex-2 text-white shadow-md ${
                  isOutOfStock
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-btn-whatsapp hover:bg-green-600 hover:scale-[1.02] active:scale-[0.98]'
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
