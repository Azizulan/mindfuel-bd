import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getAllProducts, getFlavorSiblings } from '@/data/products';
import SiteLayout from '@/components/layout/SiteLayout';
import ProductHero from '@/components/pdp/ProductHero';
import QuickValueProps from '@/components/pdp/QuickValueProps';
import BuildBox from '@/components/pdp/BuildBox';
import Testimonial from '@/components/pdp/Testimonial';
import ComparisonTable from '@/components/pdp/ComparisonTable';
import BenefitsBlock from '@/components/pdp/BenefitsBlock';
import ProcessMini from '@/components/pdp/ProcessMini';
import ProductFAQ from '@/components/pdp/ProductFAQ';
import ReviewsSection from '@/components/pdp/ReviewsSection';
import CrossSell from '@/components/pdp/CrossSell';
import MobileStickyBar from '@/components/pdp/MobileStickyBar';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const cheapest = [...product.variants].sort((a, b) => a.price - b.price)[0];

  return {
    title: `${product.name.en} — ${product.tagline.en.split('.')[0]}`,
    description: product.shortDescription.en.slice(0, 155),
    openGraph: {
      title: `${product.name.en} | MINDFUEL`,
      description: product.shortDescription.en,
      images: [{ url: product.heroImage, width: 1200, height: 630, alt: product.name.en }],
      type: 'website',
    },
    other: {
      'product:price:amount': cheapest.price.toString(),
      'product:price:currency': 'BDT',
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getAllProducts();
  const siblings = getFlavorSiblings(allProducts, product);
  const defaultVariant = product.variants.find((v) => v.inStock) ?? product.variants[0];

  return (
    <SiteLayout>
      {/* §5.2 Hero */}
      <ProductHero product={product} siblings={siblings} />

      {/* §5.3 Quick value props */}
      <QuickValueProps product={product} />

      {/* §5.4 Build-a-box */}
      <BuildBox product={product} />

      {/* §5.5 Testimonial */}
      <Testimonial productSlug={product.slug} />

      {/* §5.7 Comparison table */}
      <ComparisonTable product={product} />

      {/* §5.8 Benefits */}
      <BenefitsBlock benefits={product.keyBenefits} />

      {/* §5.9 Process mini */}
      <ProcessMini />

      {/* §5.10 FAQs */}
      <ProductFAQ faqs={product.faqs} />

      {/* §5.11 Reviews */}
      <ReviewsSection
        productSlug={product.slug}
        rating={product.rating}
        reviewCount={product.reviewCount}
      />

      {/* §5.12 Cross-sell */}
      <CrossSell crossSellSlugs={product.crossSellSlugs} />

      {/* §5.14 Mobile sticky bar */}
      <MobileStickyBar product={product} defaultVariant={defaultVariant} />
    </SiteLayout>
  );
}
