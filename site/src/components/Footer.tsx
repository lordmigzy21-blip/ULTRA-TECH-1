import React from 'react';
import AppLogo from './ui/AppLogo';
import AppImage from './ui/AppImage';
import Icon from './ui/AppIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-white pt-16 pb-8 border-t border-dark-blue-2">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Colonne 1 : Logo & Description */}
        <div className="space-y-4">
          <AppLogo showText={true} className="text-white filter brightness-0 invert" />
          <p className="text-sm text-gray-300 leading-relaxed">
            Votre univers technologie à Douala. Vente de matériel informatique de haute qualité, prestations de services et développement de solutions logicielles sur mesure.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com/Ultra-tech multiservice"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark-blue-2 flex items-center justify-center hover:bg-primary transition-colors"
              title="Facebook"
            >
              <Icon name="FacebookIcon" size={18} />
            </a>
            <a
              href="https://instagram.com/Ultra-tech multiservice"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-dark-blue-2 flex items-center justify-center hover:bg-primary transition-colors"
              title="Instagram"
            >
              <Icon name="InstagramIcon" size={18} />
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
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-2.5">
              <Icon name="MapPinIcon" size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Akwa (Douala)</p>
                <p className="text-xs text-gray-400">Boutique N30, Galeries du Congo, Douala, Cameroun</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Icon name="MapPinIcon" size={18} className="text-primary flex-shrink-0 mt-0.5" />
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
          <div className="space-y-3 text-sm text-gray-300">
            <a href="tel:+237676886733" className="flex items-center gap-2.5 hover:text-primary transition-colors">
              <Icon name="PhoneIcon" size={16} className="text-primary" />
              +237 676 886 733
            </a>
            <a href="tel:+237657941527" className="flex items-center gap-2.5 hover:text-primary transition-colors">
              <Icon name="PhoneIcon" size={16} className="text-primary" />
              +237 657 941 527
            </a>
            <a href="mailto:ultra.tech.multiservice@gmail.com" className="flex items-center gap-2.5 hover:text-primary transition-colors">
              <Icon name="MailIcon" size={16} className="text-primary" />
              ultra.tech.multiservice@gmail.com
            </a>
          </div>
        </div>

      </div>

      {/* Barre de copyright et Crédit M-TECH */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-dark-blue-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400">
          © {currentYear} Ultra Tech Multiservice. Tous droits réservés.
        </p>
        
        {/* Crédit Développeur M-TECH */}
        <div className="flex items-center gap-2.5 bg-dark-blue-2/40 px-4 py-2 rounded-2xl border border-dark-blue-2">
          <span className="text-xs text-gray-400">
            site conçu et développé par
          </span>
          <a 
            href="tel:+237676886733" 
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
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
