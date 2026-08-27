import React from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import Icon from './ui/AppIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent dark:bg-ultra-dark-blue-900 text-white border-t border-dark-blue-2/60 transition-colors">
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AppLogo showText={false} className="filter brightness-0 invert h-10 w-auto" />
              <div>
                <h3 className="font-extrabold text-base text-white leading-tight">Ultra Tech Multiservice</h3>
                <p className="text-xs text-sky-200/80">Douala · Akwa & Nkouabang</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Votre partenaire de confiance à Douala pour la vente de matériel informatique neuf et reconditionné, la réparation express et l'installation de vidéosurveillance.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://facebook.com/Ultra-tech multiservice"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook Ultra Tech"
              >
                <Icon name="FacebookIcon" size={16} aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/Ultra-tech multiservice"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram Ultra Tech"
              >
                <Icon name="InstagramIcon" size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-sky-300 uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Catalogue Équipements', href: '/boutique' },
                { label: 'Nos Services & Solutions', href: '/services' },
                { label: 'À Propos de Nous', href: '/a-propos' },
                { label: 'Prendre Rendez-vous', href: '/rdv' },
                { label: 'Contact & Agences', href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-primary/60 group-hover:translate-x-1 transition-transform">›</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-bold text-sm text-sky-300 uppercase tracking-wider mb-4">Nos Spécialités</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span> Vente PC Portables & Desktops
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span> Maintenance & Réparation Express
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span> Sécurité & Vidéosurveillance
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span> Développement Logiciel & Web
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">•</span> Infographie & Communication
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Agences */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-sky-300 uppercase tracking-wider mb-4">Contact & Agences</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <Icon name="MapPinIcon" size={18} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>Akwa (Face ancienne mairie) & Nkouabang, Douala</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Icon name="PhoneIcon" size={18} className="text-primary shrink-0" aria-hidden="true" />
                <a href="tel:+237676886733" className="hover:text-primary transition-colors font-medium">
                  +237 676 886 733
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Icon name="EnvelopeIcon" size={18} className="text-primary shrink-0" aria-hidden="true" />
                <a href="mailto:contact@ultratech.cm" className="hover:text-primary transition-colors">
                  contact@ultratech.cm
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/rdv"
                  className="inline-flex items-center gap-2 text-xs font-bold bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                >
                  <Icon name="CalendarIcon" size={14} aria-hidden="true" />
                  Prendre un rendez-vous
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-white/10 bg-dark-blue-2/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-400">
            <span>© {currentYear} Ultra Tech Multiservice. Tous droits réservés.</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/conditions-generales" className="hover:text-white transition-colors">
              Conditions Générales
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">
              Politique de Confidentialité
            </Link>
          </div>

          {/* Developer Credits */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Développé par</span>
            <a
              href="tel:+237676886733"
              className="hover:opacity-90 transition-opacity"
              title="M-TECH"
            >
              <video
                src="/assets/videos/mtech_logo.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="M-TECH logo animé"
                className="h-7 w-auto object-contain rounded"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
