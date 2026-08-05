import React from 'react';
import Header from '@/components/Header';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { getProducts } from '@/lib/db';

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();

  const quickLinks = [
    { href: '/services', label: 'Nos Services', desc: 'Développement, maintenance, vidéosurveillance…', icon: 'WrenchIcon' },
    { href: '/a-propos', label: 'À Propos', desc: 'Vidéos de l\'atelier et notre équipe', icon: 'VideoIcon' },
    { href: '/boutique', label: 'Boutique', desc: 'Ordinateurs reconditionnés & accessoires', icon: 'ShoppingBagIcon' },
    { href: '/contact', label: 'Contact', desc: 'Akwa & Nkouabang — WhatsApp direct', icon: 'MapPinIcon' },
  ];

  return (
    <main className="relative min-h-screen bg-white">
      <Header />
      <HeroSection />

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group bg-white rounded-3xl border border-border p-6 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-light text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon name={link.icon} size={22} />
              </div>
              <h2 className="font-extrabold text-base text-accent group-hover:text-primary transition-colors">{link.label}</h2>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedProducts initialProducts={products} />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
