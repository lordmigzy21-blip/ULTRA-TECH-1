import React from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import Icon from './ui/AppIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent dark:bg-ultra-dark-blue-800 text-white border-t border-dark-blue-2">
      {/* Main compact row */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center gap-6 justify-between">

        {/* Logo + tagline */}
        <div className="flex items-center gap-3">
          <AppLogo showText={false} className="filter brightness-0 invert" />
          <div>
            <p className="font-extrabold text-sm text-white leading-none">Ultra Tech Multiservice</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Douala · Akwa & Nkouabang</p>
          </div>
        </div>

        {/* Quick nav */}
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {[
            { label: 'Catalogue', href: '/boutique' },
            { label: 'Services', href: '/services' },
            { label: 'À propos', href: '/a-propos' },
            { label: 'Contact', href: '/contact' },
            { label: 'Rendez-vous', href: '/rdv' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-gray-300 hover:text-primary transition-colors duration-200 font-semibold"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact & social */}
        <div className="flex items-center gap-4">
          <a href="tel:+237676886733" className="text-xs text-gray-300 hover:text-primary transition-colors font-semibold flex items-center gap-1.5">
            <Icon name="PhoneIcon" size={13} className="text-primary" aria-hidden="true" />
            +237 676 886 733
          </a>
          <a
            href="https://facebook.com/Ultra-tech multiservice"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-dark-blue-2 flex items-center justify-center hover:bg-primary transition-colors duration-200"
            aria-label="Facebook"
          >
            <Icon name="FacebookIcon" size={14} aria-hidden="true" />
          </a>
          <a
            href="https://instagram.com/Ultra-tech multiservice"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-dark-blue-2 flex items-center justify-center hover:bg-primary transition-colors duration-200"
            aria-label="Instagram"
          >
            <Icon name="InstagramIcon" size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-blue-2">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500">
            <span>© {currentYear} Ultra Tech Multiservice.</span>
            <Link href="/conditions-generales" className="hover:text-white transition-colors">Conditions générales</Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
          {/* Developer credit */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500">Développé par</span>
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
                className="h-8 w-auto object-contain rounded-sm"
              />
            </a>
            <a
              href="https://deerflow.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-gray-500 hover:text-primary transition-colors"
            >
              ✦ Deerflow
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
