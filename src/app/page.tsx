import SiteLayout from '@/components/layout/SiteLayout';
import HomepageHero from '@/components/home/HomepageHero';
import FeaturedDelight from '@/components/home/FeaturedDelight';
import ProductsDaily from '@/components/home/ProductsDaily';
import ArtFormFeature from '@/components/home/ArtFormFeature';
import WhySpecial from '@/components/home/WhySpecial';
import VillainTeaser from '@/components/home/VillainTeaser';
import StatsBand from '@/components/home/StatsBand';

export default function HomePage() {
  return (
    <SiteLayout>
      {/* Hero — chunky bakery headline + product on yellow card */}
      <HomepageHero />

      {/* Your only dose of delight — featured item */}
      <FeaturedDelight />

      {/* Real food we make daily — category pills + carousel */}
      <ProductsDaily />

      {/* Why real food is worth the effort — dark feature */}
      <ArtFormFeature />

      {/* Why MINDFUEL is special — showcase + testimonial */}
      <WhySpecial />

      {/* Real vs Fake teaser */}
      <VillainTeaser />

      {/* Stats band — rating + tags */}
      <StatsBand />
    </SiteLayout>
  );
}
