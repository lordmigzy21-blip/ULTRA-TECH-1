import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ServicesStrip from '../components/ServicesStrip';

export const metadata: Metadata = {
  title: 'Services Informatiques à Douala',
  description:
    'Ultra Tech Multiservice à Douala : vente électronique, développement logiciel, maintenance informatique, sécurité réseau, vidéosurveillance et infographie. Devis gratuit par WhatsApp.',
  keywords: [
    'services informatiques Douala',
    'développement logiciel Cameroun',
    'maintenance informatique Douala',
    'vidéosurveillance Douala',
    'sécurité réseau Cameroun',
    'infographie Douala',
  ],
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Header />
      <section className="bg-muted pt-32 pb-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <span className="text-primary text-xs font-bold uppercase tracking-widest block">Ultra Tech Multiservice</span>
          <h1 className="font-extrabold text-3xl md:text-5xl text-accent tracking-tight text-balance">
            Nos Services Tech à Douala
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed text-pretty">
            De la vente de matériel informatique à la sécurisation de vos locaux, Ultra Tech accompagne particuliers et entreprises à Douala avec des prestations professionnelles et un suivi de proximité.
          </p>
        </div>
      </section>
      <ServicesStrip />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
