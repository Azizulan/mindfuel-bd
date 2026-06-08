import SiteLayout from '@/components/layout/SiteLayout';
import HomepageHero from '@/components/home/HomepageHero';
import FeaturedDelight from '@/components/home/FeaturedDelight';
import ProductsDaily from '@/components/home/ProductsDaily';
import ArtFormFeature from '@/components/home/ArtFormFeature';
import WhySpecial from '@/components/home/WhySpecial';
import VillainTeaser from '@/components/home/VillainTeaser';
import StatsBand from '@/components/home/StatsBand';
import { getAllProducts } from '@/data/products';

export const revalidate = 60;

export default async function HomePage() {
  const allProducts = await getAllProducts();

  return (
    <SiteLayout>
      {/* Hero — chunky bakery headline + product on yellow card */}
      <HomepageHero />

      {/* Your only dose of delight — featured item */}
      <FeaturedDelight />

      {/* Real food we make daily — category pills + carousel */}
      <ProductsDaily products={allProducts} />

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
