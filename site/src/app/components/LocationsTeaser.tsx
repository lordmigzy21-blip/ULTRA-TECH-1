import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import HexPattern from '@/components/ui/HexPattern';

export default function LocationsTeaser() {
  return (
    <section id="contact" className="py-24 bg-[#0A0E1A] text-white relative overflow-hidden border-t border-white/10">
      <HexPattern opacity={0.04} />

      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[#5B9BF0] text-xs font-bold uppercase tracking-widest block">Où nous trouver</span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white tracking-tight text-balance">
            Notre Boutique &amp; Atelier à Douala
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed text-pretty">
            Accueillez vos projets et retirez vos commandes au cœur du quartier des affaires à Akwa.
          </p>
        </div>

        {/* Akwa Featured Shop Showcase */}
        <div className="max-w-4xl mx-auto bg-[#101526] rounded-3xl border border-white/15 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 items-center">
          
          {/* Shop Photo with duotone grade */}
          <div className="md:col-span-5 photo-brand-grade relative aspect-square sm:aspect-[4/3] md:aspect-auto h-full min-h-[260px] overflow-hidden">
            <AppImage
              src="/assets/images/story_akwa.jpeg"
              alt="Boutique Ultra Tech Akwa Galeries du Congo Douala"
              fill
              className="object-cover"
            />
            <span className="absolute top-4 left-4 bg-[#0A0E1A]/90 text-[#5B9BF0] font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/15 z-10">
              📍 Emplacement Akwa
            </span>
          </div>

          {/* Details */}
          <div className="md:col-span-7 p-8 md:p-10 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div>
                <h3 className="font-heading font-black text-2xl text-white">Ultra Tech Akwa</h3>
                <p className="text-xs font-semibold text-[#5B9BF0] mt-1">Galeries du Congo · Boutique N30, Akwa, Douala</p>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed">
                Situé au centre des affaires pour vos achats d&apos;ordinateurs portables, dépannages express et rendez-vous professionnels.
              </p>

              <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-white/10">
                <p className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                  Ouvert du Lundi au Samedi : 8h00 – 18h30
                </p>
                <p className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#5B9BF0]" aria-hidden="true" />
                  Prestations : Vente, Dépannage, Réseau &amp; Vidéosurveillance
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/237676886733?text=Bonjour%20Ultra%20Tech%20Akwa!%20Je%20souhaite%20obtenir%20des%20informations%20ou%20venir%20en%20boutique."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25D366] hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-md"
              >
                <Icon name="PhoneIcon" size={16} className="fill-current" aria-hidden="true" />
                Contacter Boutique Akwa
              </a>
              <a
                href="tel:+237676886733"
                className="px-5 py-3.5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs rounded-full transition-colors"
              >
                +237 676 886 733
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
