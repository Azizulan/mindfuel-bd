import { notFound } from 'next/navigation';
import SiteLayout from '@/components/layout/SiteLayout';
import { getProductsByCategory, products } from '@/data/products';
import Link from 'next/link';
import { Star } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import { formatPrice } from '@/lib/utils';
import type { Product, ProductCategory } from '@/types';

interface Props {
  params: Promise<{ category: string }>;
}

const categoryLabels: Record<string, string> = {
  'peanut-butter': 'Peanut Butter',
  granola: 'Granola',
  muesli: 'Muesli',
  nuts: 'Nuts',
  seeds: 'Seeds & Mixes',
  'functional-drink': 'Functional Drink',
};

const validCategories = Object.keys(categoryLabels);

export async function generateStaticParams() {
  return validCategories.map((cat) => ({ category: cat }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const label = categoryLabels[category];
  if (!label) return {};
  return {
    title: `${label} — Real Food | MINDFUEL`,
    description: `Browse MINDFUEL's ${label.toLowerCase()} range. No palm oil, no added sugar, BCSIR lab tested.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!validCategories.includes(category)) notFound();

  const label = categoryLabels[category];
  const categoryProducts = getProductsByCategory(category as ProductCategory);

  return (
    <SiteLayout>
      <div className="section-py">
        <div className="container-mf">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6" style={{ color: 'var(--mf-graphite)' }}>
            <Link href="/shop" className="hover:underline">Shop</Link>
            {' / '}
            <span>{label}</span>
          </nav>

          <div className="mb-10">
            <span className="text-label" style={{ color: 'var(--mf-cobalt)' }}>{label.toUpperCase()}</span>
            <h1 className="text-h2 mt-2">MINDFUEL {label}</h1>
            <p className="text-base mt-2" style={{ color: 'var(--mf-graphite)' }}>
              {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''} — all BCSIR lab tested, no palm oil.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categoryProducts.map((product) => (
              <CategoryProductCard key={product.slug} product={product} />
            ))}
          </div>

          {categoryProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg" style={{ color: 'var(--mf-graphite)' }}>Coming soon.</p>
              <Link href="/shop" className="btn-primary mt-4 inline-flex">← See all products</Link>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}

function CategoryProductCard({ product }: { product: Product }) {
  const cheapest = [...product.variants].sort((a, b) => a.price - b.price)[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border transition-all hover:shadow-lg"
      style={{ borderColor: 'var(--mf-mist)', backgroundColor: 'white' }}
    >
      <div className="relative aspect-square" style={{ backgroundColor: 'var(--mf-cream)' }}>
        <ProductImage
          src={product.heroImage}
          alt={product.name.en}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
          sizes="(max-width: 768px) 50vw, 25vw"
          fallbackText={product.name.en.slice(0, 8)}
        />
        {product.badges[0] && (
          <span
            className="absolute top-3 left-3 badge text-xs"
            style={{
              backgroundColor: product.badges[0].color === 'amber' ? 'var(--mf-amber)' : 'var(--mf-mint)',
              color: product.badges[0].color === 'amber' ? 'var(--mf-cobalt-deep)' : '#0F766E',
            }}
          >
            {product.badges[0].label}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <p className="text-sm font-semibold" style={{ color: 'var(--mf-ink)' }}>{product.name.en}</p>
        <p className="font-bn text-xs" style={{ color: 'var(--mf-graphite)' }}>{product.name.bn}</p>
        <div className="flex items-center gap-1">
          <Star size={12} style={{ color: 'var(--mf-amber)', fill: 'var(--mf-amber)' }} />
          <span className="text-xs">{product.rating} ({product.reviewCount})</span>
        </div>
        <span className="font-extrabold text-base" style={{ color: 'var(--mf-cobalt)' }}>
          From {formatPrice(cheapest.price)}
        </span>
      </div>
    </Link>
  );
}
