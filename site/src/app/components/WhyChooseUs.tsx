import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function WhyChooseUs() {
  const benefits = [
    {
      title: 'Équipements Authentiques',
      description: 'Tous nos ordinateurs, téléphones et accessoires proviennent de canaux certifiés avec une garantie locale.',
      icon: 'ShieldCheckIcon',
    },
    {
      title: 'Expertise Technique',
      description: 'Nos techniciens certifiés résolvent vos problèmes matériels et logiciels les plus complexes à Douala.',
      icon: 'WrenchIcon',
    },
    {
      title: 'Service Ultra Rapide',
      description: 'Prenez rendez-vous en ligne et discutez instantanément sur WhatsApp pour un diagnostic rapide.',
      icon: 'PhoneIcon',
    },
    {
      title: 'Meilleur Rapport Qualité/Prix',
      description: 'Nous proposons les tarifs les plus compétitifs du marché de Douala sans aucun compromis sur la qualité.',
      icon: 'CheckCircleIcon',
    },
  ];

  return (
    <section className="py-24 bg-muted/40 dark:bg-ultra-dark-blue-700 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Colonne Gauche : Contenu */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block">Pourquoi nous faire confiance</span>
            <h2 className="font-extrabold text-3xl md:text-4xl text-accent dark:text-blue-100 tracking-tight leading-tight text-balance">
              L&apos;Excellence Technologique à Douala
            </h2>
            <p className="text-sm text-muted-foreground dark:text-blue-300/70 leading-relaxed text-pretty">
              Ultra Tech Multiservice est le partenaire idéal pour les entreprises et les particuliers recherchant la performance et la fiabilité. Nous ne faisons pas que vendre du matériel, nous construisons des relations durables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-sky-light text-primary flex items-center justify-center">
                  <Icon name={benefit.icon} size={22} aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-base text-accent dark:text-blue-100 text-pretty">
                  {benefit.title}
                </h3>
                <p className="text-xs text-muted-foreground dark:text-blue-300/70 leading-relaxed text-pretty">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne Droite : Visuel */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-[3rem] transform rotate-3" />
          <div className="bg-white dark:bg-ultra-dark-blue-800 p-8 md:p-12 rounded-[3rem] border border-border dark:border-ultra-dark-blue-600 shadow-xl space-y-8 relative z-10">
            <h3 className="font-extrabold text-2xl text-accent dark:text-blue-100 tracking-tight text-balance">
              Ultra Tech en Chiffres
            </h3>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-4xl md:text-5xl font-black text-primary tracking-tight">98&nbsp;%</p>
                <p className="font-bold text-xs text-accent dark:text-blue-200 uppercase tracking-wider">Clients Satisfaits</p>
                <p className="text-[10px] text-muted-foreground dark:text-blue-300/70 leading-normal text-pretty">Sur plus de 1000 interventions à Douala.</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl md:text-5xl font-black text-accent tracking-tight">+5&nbsp;ans</p>
                <p className="font-bold text-xs text-primary uppercase tracking-wider">D&apos;Expérience</p>
                <p className="text-[10px] text-muted-foreground leading-normal text-pretty">Dans le service informatique et logiciel.</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl md:text-5xl font-black text-accent tracking-tight">0&nbsp;%</p>
                <p className="font-bold text-xs text-primary uppercase tracking-wider">Frais Cachés</p>
                <p className="text-[10px] text-muted-foreground leading-normal text-pretty">Tous nos devis sont clairs et validés avant travaux.</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl md:text-5xl font-black text-primary tracking-tight">100&nbsp;%</p>
                <p className="font-bold text-xs text-accent uppercase tracking-wider">Garantie Qualité</p>
                <p className="text-[10px] text-muted-foreground leading-normal text-pretty">Remplacement ou ajustement immédiat.</p>
              </div>
            </div>

            <div className="bg-sky-light rounded-3xl p-5 border border-primary/15 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                <Icon name="PhoneIcon" size={18} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold text-accent dark:text-blue-100">Besoin d&apos;un conseil personnalisé ?</p>
                <a
                  href="https://wa.me/237676886733"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-extrabold text-primary hover:underline transition-colors duration-200"
                >
                  Discuter avec un conseiller Ultra Tech
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
