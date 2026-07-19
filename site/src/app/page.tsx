import React from 'react';
import Header from '@/components/Header';
import HeroSection from './components/HeroSection';
import ServicesStrip from './components/ServicesStrip';
import FeaturedProducts from './components/FeaturedProducts';
import WhyChooseUs from './components/WhyChooseUs';
import LocationsTeaser from './components/LocationsTeaser';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProducts } from '@/lib/db';

export const revalidate = 60; // Refresh cache every 60s

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="relative min-h-screen bg-white">
      <Header />
      <HeroSection />
      
      <ServicesStrip />
      
      <FeaturedProducts initialProducts={products} />
      
      <WhyChooseUs />
      
      <div id="about">
        <LocationsTeaser />
      </div>
      
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
