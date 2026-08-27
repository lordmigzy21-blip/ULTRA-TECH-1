'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import HexPattern from '@/components/ui/HexPattern';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#0A0E1A] text-white overflow-hidden pt-28 pb-20 border-b border-white/10">
      {/* ── Hexagon geometric background pattern ── */}
      <HexPattern opacity={0.06} />

      {/* ── Brand accent gradient line at top ── */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CAE8E8] via-[#28469E] to-[#5B9BF0]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── Left Column: Asymmetric Text Content (7 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Local shop badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/15 backdrop-blur-sm text-xs font-semibold text-[#5B9BF0]">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              📍 Boutique & Atelier · Akwa, Douala
            </div>

            {/* Architectural Headline (Space Grotesk) */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] text-balance">
              Le matériel informatique & les services tech <span className="text-[#5B9BF0]">de confiance</span> à Douala.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed text-pretty">
              Vente d&apos;ordinateurs portables reconditionnés, téléphones, sécurité réseau, vidéosurveillance et maintenance dans notre boutique d&apos;Akwa.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/boutique"
                className="px-7 py-4 bg-[#28469E] hover:bg-[#28469E]/90 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-2"
              >
                Explorer le Catalogue
                <Icon name="ArrowRightIcon" size={16} aria-hidden="true" />
              </Link>

              <a
                href="https://wa.me/237676886733?text=Bonjour%20Ultra%20Tech!%20Je%20souhaite%20en%20savoir%20plus%20sur%20vos%20produits%20et%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 bg-[#25D366] hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-2"
              >
                <Icon name="PhoneIcon" size={16} className="fill-current" aria-hidden="true" />
                Contact Direct WhatsApp
              </a>
            </div>

            {/* Tactile Trust Indicators */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-gray-400">
              <div>
                <p className="font-bold text-white text-sm">100% Vérifié</p>
                <p className="text-[11px] mt-0.5">Testé avant vente</p>
              </div>
              <div>
                <p className="font-bold text-white text-sm">Atelier Akwa</p>
                <p className="text-[11px] mt-0.5">Dépannage express</p>
              </div>
              <div>
                <p className="font-bold text-white text-sm">Garantie locale</p>
                <p className="text-[11px] mt-0.5">Service après-vente</p>
              </div>
            </div>

          </motion.div>

          {/* ── Right Column: Authentic Real Shop Frame (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Hexagon geometric frame border */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#101526]">
              {/* Real shop photo with brand duotone color grade */}
              <div className="photo-brand-grade relative aspect-[4/3] sm:aspect-square w-full">
                <AppImage
                  src="/assets/images/story_akwa.jpeg"
                  alt="La boutique Ultra Tech à Akwa Douala"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Real Shop Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#0A0E1A]/90 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center justify-between">
                <div>
                  <p className="font-heading font-extrabold text-sm text-white">Boutique Akwa</p>
                  <p className="text-xs text-gray-300">Galeries du Congo · Douala</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#28469E]/30 text-[#5B9BF0] flex items-center justify-center border border-[#5B9BF0]/30">
                  <Icon name="MapPinIcon" size={18} aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Geometric cubic accent tag */}
            <div className="absolute -top-4 -right-4 bg-[#28469E] text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-lg border border-white/20 uppercase tracking-widest hidden sm:block">
              Magasin Réel &amp; Équipe
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
