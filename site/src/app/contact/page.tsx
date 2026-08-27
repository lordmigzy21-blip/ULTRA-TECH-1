import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LocationsTeaser from '../components/LocationsTeaser';

export const metadata: Metadata = {
  title: 'Contact — Boutique Akwa',
  description:
    'Contactez Ultra Tech Multiservice à Douala : WhatsApp, téléphone et adresse de notre boutique à Akwa (Galeries du Congo). Horaires et prise de rendez-vous.',
  keywords: [
    'contact Ultra Tech Douala',
    'boutique Akwa Galeries du Congo',
    'Ultra Tech Akwa téléphone',
    'WhatsApp informatique Douala',
  ],
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Header />
      <section className="bg-muted pt-32 pb-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <span className="text-primary text-xs font-bold uppercase tracking-widest block">Nous contacter</span>
          <h1 className="font-extrabold text-3xl md:text-5xl text-accent tracking-tight text-balance">
            Parlons de Votre Projet Tech
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed text-pretty">
            Besoin d&apos;un ordinateur, d&apos;une réparation ou d&apos;un devis pour vos locaux ? Contactez directement l&apos;une de nos deux boutiques à Douala par WhatsApp ou téléphone.
          </p>
        </div>
      </section>
      <LocationsTeaser />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
