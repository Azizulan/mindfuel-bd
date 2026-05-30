import SiteLayout from '@/components/layout/SiteLayout';
import HomepageHero from '@/components/home/HomepageHero';
import SeasonalBand from '@/components/home/SeasonalBand';
import CategoryTiles from '@/components/home/CategoryTiles';
import WhyMINDFUEL from '@/components/home/WhyMINDFUEL';
import FeaturedProduct from '@/components/home/FeaturedProduct';
import VillainTeaser from '@/components/home/VillainTeaser';
import { getProductBySlug, getFeaturedProducts } from '@/data/products';
import { currentSeason } from '@/data/seasonal';

export default function HomePage() {
  const seasonalProduct = getProductBySlug(currentSeason.heroProductSlug);
  const featuredProducts = getFeaturedProducts();
  const heroProduct = seasonalProduct ?? featuredProducts[0];

  return (
    <SiteLayout>
      {/* §6.2 Hero */}
      <HomepageHero />

      {/* §6.3 Seasonal band */}
      <SeasonalBand />

      {/* §6.4 Category tiles */}
      <CategoryTiles />

      {/* §6.5 Why MINDFUEL exists */}
      <WhyMINDFUEL />

      {/* §6.6 Featured product */}
      {heroProduct && <FeaturedProduct product={heroProduct} />}

      {/* §6.7 Real vs Fake teaser */}
      <VillainTeaser />

      {/* §6.11 Email capture — handled in Footer */}
    </SiteLayout>
  );
}
