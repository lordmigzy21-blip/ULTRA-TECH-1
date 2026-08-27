import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import HexPattern from '@/components/ui/HexPattern';

export default function WhyChooseUs() {
  const proofPoints = [
    {
      title: 'Équipements Authentiques',
      description: 'Chaque machine est testée, nettoyée et vérifiée dans notre atelier d\'Akwa avant mise en vente.',
      tag: 'Atelier Akwa',
      image: '/assets/images/story_ordinateur.jpg',
    },
    {
      title: 'Équipe & Expertise Locale',
      description: 'Nos techniciens vous conseillent directement en boutique ou via WhatsApp sans intermédiaire.',
      tag: 'Équipe Ultra Tech',
      image: '/assets/images/story_team.jpg',
    },
  ];

  return (
    <section className="py-24 bg-[#0A0E1A] text-white relative overflow-hidden border-t border-b border-white/10">
      {/* Subtle Hexagon Brand Pattern */}
      <HexPattern opacity={0.05} />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Colonne Gauche : Engagements & Tactile Proofs */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-3">
            <span className="text-[#5B9BF0] text-xs font-bold uppercase tracking-widest block">
              Engagement &amp; Transparence
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight text-balance">
              Pourquoi Douala Choisit Ultra Tech
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed text-pretty">
              Pas d&apos;intermédiaire impersonnel : nous sommes un vrai magasin à Akwa avec des techniciens passionnés prêts à vous accueillir.
            </p>
          </div>

          {/* Tactile Real-Photo Cards instead of generic icon-in-circle boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {proofPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-[#101526] rounded-2xl border border-white/10 overflow-hidden shadow-lg group hover:border-[#5B9BF0]/40 transition-colors duration-300"
              >
                <div className="photo-brand-grade relative h-36 w-full overflow-hidden">
                  <AppImage
                    src={point.image}
                    alt={point.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0A0E1A]/80 backdrop-blur-md text-[#5B9BF0] font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10 z-10">
                    {point.tag}
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  <h3 className="font-heading font-bold text-base text-white text-pretty">
                    {point.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed text-pretty">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne Droite : Impact & Stats */}
        <div className="lg:col-span-6 relative">
          <div className="bg-[#101526] p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl space-y-8 relative">
            
            {/* Hexagon motif corner badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-white tracking-tight">
                  Ultra Tech en Chiffres
                </h3>
                <p className="text-xs text-gray-400 mt-1">Impact réel sur le terrain à Douala</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#28469E]/30 border border-[#5B9BF0]/30 flex items-center justify-center text-[#5B9BF0]">
                <Icon name="ShieldCheckIcon" size={24} aria-hidden="true" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1 border-l-2 border-[#5B9BF0] pl-4">
                <p className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">98%</p>
                <p className="font-bold text-xs text-[#5B9BF0] uppercase tracking-wider">Clients Satisfaits</p>
                <p className="text-[11px] text-gray-400 leading-normal">Sur +1000 interventions à Douala.</p>
              </div>
              <div className="space-y-1 border-l-2 border-[#28469E] pl-4">
                <p className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">+5 ans</p>
                <p className="font-bold text-xs text-[#5B9BF0] uppercase tracking-wider">D&apos;Expérience</p>
                <p className="text-[11px] text-gray-400 leading-normal">Dans le service informatique &amp; logiciel.</p>
              </div>
              <div className="space-y-1 border-l-2 border-[#28469E] pl-4">
                <p className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">0%</p>
                <p className="font-bold text-xs text-[#5B9BF0] uppercase tracking-wider">Frais Cachés</p>
                <p className="text-[11px] text-gray-400 leading-normal">Devis clairs et validés avant travaux.</p>
              </div>
              <div className="space-y-1 border-l-2 border-[#5B9BF0] pl-4">
                <p className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">100%</p>
                <p className="font-bold text-xs text-[#5B9BF0] uppercase tracking-wider">Garantie Qualité</p>
                <p className="text-[11px] text-gray-400 leading-normal">Accompagnement après-vente garanti.</p>
              </div>
            </div>

            {/* Direct Contact Banner */}
            <div className="bg-[#0A0E1A] rounded-2xl p-5 border border-white/10 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-white">Besoin d&apos;un conseil personnalisé ?</p>
                <p className="text-[11px] text-gray-400">Passez en boutique ou échangez sur WhatsApp.</p>
              </div>
              <a
                href="https://wa.me/237676886733"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-2.5 bg-[#25D366] hover:bg-green-600 text-white font-bold text-xs rounded-full transition-colors flex items-center gap-1.5"
              >
                <Icon name="PhoneIcon" size={14} className="fill-current" aria-hidden="true" />
                WhatsApp
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
