import React from 'react';
import AppLogo from './ui/AppLogo';
import AppImage from './ui/AppImage';
import Icon from './ui/AppIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-white pt-20 pb-10 border-t border-dark-blue-2">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Colonne 1 : Logo & Description */}
        <div className="space-y-5">
          <AppLogo showText={true} className="text-white filter brightness-0 invert" />
          <p className="text-sm text-gray-300 leading-relaxed text-pretty">
            Votre univers technologie à Douala. Vente de matériel informatique de haute qualité, prestations de services et développement de solutions logicielles sur mesure.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com/Ultra-tech multiservice"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark-blue-2 flex items-center justify-center hover:bg-primary transition-colors duration-200"
              aria-label="Notre page Facebook"
            >
              <Icon name="FacebookIcon" size={18} aria-hidden="true" />
            </a>
            <a
              href="https://instagram.com/Ultra-tech multiservice"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark-blue-2 flex items-center justify-center hover:bg-primary transition-colors duration-200"
              aria-label="Notre compte Instagram"
            >
              <Icon name="InstagramIcon" size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Colonne 2 : Services */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-sm uppercase tracking-wider text-primary">Nos Services</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Vente d&apos;Électronique</li>
            <li>Développement Logiciel</li>
            <li>Prestations Informatiques</li>
            <li>Sécurité Réseau</li>
            <li>Vidéosurveillance</li>
            <li>Infographie & Design</li>
          </ul>
        </div>

        {/* Colonne 3 : Localisation */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-sm uppercase tracking-wider text-primary">Nos Boutiques</h4>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <Icon name="MapPinIcon" size={18} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold text-white">Akwa (Douala)</p>
                <p className="text-xs text-gray-400">Boutique N30, Galeries du Congo, Douala, Cameroun</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="MapPinIcon" size={18} className="text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-bold text-white">Nkouabang (Douala)</p>
                <p className="text-xs text-gray-400">Carrefour Nkouabang, Douala, Cameroun</p>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne 4 : Contact */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-sm uppercase tracking-wider text-primary">Contact & Infos</h4>
          <div className="space-y-3.5 text-sm text-gray-300">
            <a href="tel:+237676886733" className="flex items-center gap-2.5 hover:text-primary transition-colors duration-200">
              <Icon name="PhoneIcon" size={16} className="text-primary" aria-hidden="true" />
              +237 676 886 733
            </a>
            <a href="tel:+237657941527" className="flex items-center gap-2.5 hover:text-primary transition-colors duration-200">
              <Icon name="PhoneIcon" size={16} className="text-primary" aria-hidden="true" />
              +237 657 941 527
            </a>
            <a href="mailto:ultra.tech.multiservice@gmail.com" className="flex items-center gap-2.5 hover:text-primary transition-colors duration-200">
              <Icon name="MailIcon" size={16} className="text-primary" aria-hidden="true" />
              ultra.tech.multiservice@gmail.com
            </a>
          </div>
        </div>

      </div>

      {/* Barre de copyright, Crédit M-TECH & Deerflow */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-dark-blue-2 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span>© {currentYear} Ultra Tech Multiservice. Tous droits réservés.</span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <a 
            href="https://deerflow.tech" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] text-gray-500 hover:text-primary transition-colors duration-200 flex items-center gap-0.5"
            title="Created By Deerflow"
          >
            ✦ Deerflow
          </a>
        </div>
        
        {/* Crédit Développeur M-TECH */}
        <div className="flex items-center gap-2.5 bg-dark-blue-2/40 px-4 py-2 rounded-2xl border border-dark-blue-2">
          <span className="text-[11px] text-gray-400">
            site conçu et développé par
          </span>
          <a 
            href="tel:+237676886733" 
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity duration-200"
            title="Contacter le développeur M-TECH"
          >
            <AppImage
              src="/assets/images/mtech_logo.png"
              alt="M-TECH Logo"
              width={55}
              height={18}
              className="object-contain filter brightness-0 invert"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
