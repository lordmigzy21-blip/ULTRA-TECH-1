import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AboutContent from './components/AboutContent';

export const metadata: Metadata = {
  title: 'À Propos — Notre Boutique & Atelier à Douala',
  description:
    'Découvrez Ultra Tech Multiservice : boutique informatique à Akwa, préparation de machines reconditionnées, équipe passionnée et vidéos authentiques de notre atelier à Douala.',
  keywords: [
    'Ultra Tech Douala',
    'boutique informatique Akwa',
    'atelier reconditionnement PC Douala',
    'magasin tech Cameroun',
  ],
  alternates: {
    canonical: '/a-propos',
  },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-ultra-dark-blue-800">
      <Header />
      <section className="bg-muted dark:bg-ultra-dark-blue-700 pt-32 pb-12 border-b border-border dark:border-ultra-dark-blue-600">
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <span className="text-primary text-xs font-bold uppercase tracking-widest block">Qui sommes-nous</span>
          <h1 className="font-extrabold text-3xl md:text-5xl text-accent dark:text-blue-100 tracking-tight text-balance">
            Ultra Tech, Votre Partenaire Tech de Confiance
          </h1>
          <p className="text-sm text-muted-foreground dark:text-blue-300/70 max-w-2xl leading-relaxed text-pretty">
            Depuis Douala, nous vendons du matériel informatique fiable, réparons vos équipements et développons des solutions sur mesure. Notre équipe vous accueille avec transparence et expertise dans deux boutiques.
          </p>
        </div>
      </section>
      <AboutContent />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
