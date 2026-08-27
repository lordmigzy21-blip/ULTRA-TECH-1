import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProducts } from '@/lib/db';
import FeaturedProducts from './components/FeaturedProducts';
import HeroSection from './components/HeroSection';
import HomeIntroduction from './components/HomeIntroduction';

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="relative min-h-screen bg-white dark:bg-ultra-dark-blue-800">
      <Header />
      <HeroSection />
      <HomeIntroduction />
      <FeaturedProducts initialProducts={products} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
