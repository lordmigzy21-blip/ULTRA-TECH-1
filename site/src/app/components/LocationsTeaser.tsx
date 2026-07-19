import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function LocationsTeaser() {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-primary text-xs font-bold uppercase tracking-widest block">Où nous trouver</span>
          <h2 className="font-extrabold text-3xl md:text-4xl text-accent tracking-tight">
            Nos Boutiques à Douala
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Nous vous accueillons dans deux points stratégiques de Douala pour la vente de matériel informatique, le retrait de vos commandes et vos réparations.
          </p>
        </div>

        {/* Localisations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Akwa */}
          <div className="bg-white rounded-3xl border border-border p-8 hover:shadow-lg transition-all duration-300 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-light text-primary flex items-center justify-center">
                  <Icon name="MapPinIcon" size={20} />
                </div>
                <h3 className="font-extrabold text-xl text-accent">Ultra Tech Akwa</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Boutique N30, Galeries du Congo, Akwa, Douala. Idéalement situé au cœur du quartier des affaires pour un accès rapide.
              </p>
              <div className="space-y-2 text-xs text-accent font-semibold pt-2">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Lundi - Samedi : 8h00 - 18h30
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Prestations : Vente & Dépannage
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/237676886733?text=Bonjour%20Ultra%20Tech%20Akwa!%20Je%20souhaite%20obtenir%20des%20informations%20ou%20venir%20en%20boutique."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full text-center py-3.5 bg-accent text-white font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-dark-blue-2 transition-colors block"
            >
              Contacter Boutique Akwa
            </a>
          </div>

          {/* Nkouabang */}
          <div className="bg-white rounded-3xl border border-border p-8 hover:shadow-lg transition-all duration-300 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-light text-primary flex items-center justify-center">
                  <Icon name="MapPinIcon" size={20} />
                </div>
                <h3 className="font-extrabold text-xl text-accent">Ultra Tech Nkouabang</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Carrefour Nkouabang, Douala. Pour mieux servir notre clientèle résidant à l&apos;Est de la ville et les environs.
              </p>
              <div className="space-y-2 text-xs text-accent font-semibold pt-2">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Lundi - Samedi : 8h30 - 19h00
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Prestations : Vente, Dépannage & Réseau
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/237657941527?text=Bonjour%20Ultra%20Tech%20Nkouabang!%20Je%20souhaite%20obtenir%20des%20informations%20ou%20venir%20en%20boutique."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full text-center py-3.5 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-sky-600 transition-colors block"
            >
              Contacter Boutique Nkouabang
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
