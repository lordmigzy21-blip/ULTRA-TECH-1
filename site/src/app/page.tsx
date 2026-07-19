import React from 'react';
import Header from '@/components/Header';
import HeroSection from './components/HeroSection';
import ServicesStrip from './components/ServicesStrip';
import FeaturedProducts from './components/FeaturedProducts';
import WhyChooseUs from './components/WhyChooseUs';
import LocationsTeaser from './components/LocationsTeaser';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <Header />
      <HeroSection />
      
      <ServicesStrip />
      
      <FeaturedProducts />
      
      <WhyChooseUs />
      
      <div id="about">
        <LocationsTeaser />
      </div>
      
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
