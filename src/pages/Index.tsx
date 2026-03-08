import Hero from '@/components/landing/Hero';
import ProductStory from '@/components/landing/ProductStory';
import Demo from '@/components/landing/Demo';
import Footer from '@/components/landing/Footer';
import LandingNav from '@/components/landing/LandingNav';

export default function Index() {
  return (
    <div className="min-h-screen">
      <LandingNav />
      <main className="pt-16">
        <Hero />
        <ProductStory />
        <Demo />
      </main>
      <Footer />
    </div>
  );
}
