import Link from 'next/link';
import { Star } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import SiteLayout from '@/components/layout/SiteLayout';
import { getAllProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

const categoryLabels: Record<string, string> = {
  'peanut-butter': 'Peanut Butter',
  granola: 'Granola',
  muesli: 'Muesli',
  nuts: 'Nuts',
  seeds: 'Seeds & Mixes',
  'functional-drink': 'Functional Drink',
};

export const metadata = {
  title: 'Shop All Real Food Products | MINDFUEL',
  description: 'Browse MINDFUEL\'s full range — peanut butter, granola, muesli, nuts, seeds, and Seedra fiber drink. No palm oil. No added sugar. BCSIR lab tested.',
};

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getAllProducts();
  return (
    <SiteLayout>
      <div className="section-py">
        <div className="container-mf">
          {/* Header */}
          <div className="mb-10">
            <span className="text-label" style={{ color: 'var(--mf-cobalt)' }}>SHOP ALL PRODUCTS</span>
            <h1 className="text-h2 mt-2">Real food. Nothing hidden.</h1>
            <p className="text-base mt-2" style={{ color: 'var(--mf-graphite)' }}>
              {products.length} products — all BCSIR lab tested, no palm oil, no added sugar where stated.
            </p>
          </div>

          {/* Category filter chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="badge badge-cobalt cursor-pointer">All</span>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <Link
                key={key}
                href={`/shop/${key}`}
                className="badge cursor-pointer hover:bg-blue-100 transition-colors"
                style={{ backgroundColor: 'var(--mf-mist)', color: 'var(--mf-graphite)' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function ProductCard({ product }: { product: Product }) {
  const cheapest = [...product.variants].sort((a, b) => a.price - b.price)[0];
  const savings = cheapest.comparePrice
    ? Math.round(((cheapest.comparePrice - cheapest.price) / cheapest.comparePrice) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border transition-all hover:shadow-lg hover:-translate-y-0.5"
      style={{ borderColor: 'var(--mf-mist)', backgroundColor: 'white' }}
    >
      <div
        className="relative aspect-square overflow-hidden"
        style={{ backgroundColor: 'var(--mf-cream)' }}
      >
        <ProductImage
          src={product.heroImage}
          alt={product.name.en}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
          fallbackText={product.name.en.slice(0, 8)}
        />
        {product.badges[0] && (
          <span
            className="absolute top-3 left-3 badge text-xs"
            style={{
              backgroundColor:
                product.badges[0].color === 'amber' ? 'var(--mf-amber)' :
                product.badges[0].color === 'danger' ? 'var(--mf-danger)' :
                product.badges[0].color === 'mint' ? 'var(--mf-mint)' : 'var(--mf-cobalt)',
              color:
                product.badges[0].color === 'amber' ? 'var(--mf-cobalt-deep)' : 'white',
            }}
          >
            {product.badges[0].label}
          </span>
        )}
        {savings > 0 && (
          <span className="absolute top-3 right-3 badge badge-mint text-xs">
            -{savings}%
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2">
        <span className="text-label text-xs" style={{ color: 'var(--mf-cobalt)' }}>
          {categoryLabels[product.category] ?? product.category}
        </span>
        <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--mf-ink)' }}>
          {product.name.en}
        </p>
        <p className="font-bn text-xs" style={{ color: 'var(--mf-graphite)' }}>
          {product.name.bn}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <Star size={12} style={{ color: 'var(--mf-amber)', fill: 'var(--mf-amber)' }} />
          <span className="text-xs font-semibold">{product.rating}</span>
          <span className="text-xs" style={{ color: 'var(--mf-graphite)' }}>({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-extrabold text-base" style={{ color: 'var(--mf-cobalt)' }}>
            {formatPrice(cheapest.price)}
          </span>
          {cheapest.comparePrice && (
            <span className="text-xs line-through" style={{ color: 'var(--mf-graphite)', opacity: 0.5 }}>
              {formatPrice(cheapest.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
