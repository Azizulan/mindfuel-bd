import Link from 'next/link';
import { Star } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import type { Product } from '@/types';
import { getCrossSellProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';

interface Props {
  crossSellSlugs: string[];
}

export default async function CrossSell({ crossSellSlugs }: Props) {
  const products = await getCrossSellProducts(crossSellSlugs);
  if (products.length === 0) return null;

  return (
    <section className="section-py" style={{ backgroundColor: 'var(--mf-cream)' }}>
      <div className="container-mf">
        <div className="mb-8">
          <span className="text-label" style={{ color: 'var(--mf-cobalt)' }}>COMPLETE YOUR STACK</span>
          <h2 className="text-h2 mt-2">Goes great with this</h2>
        </div>

        <div className="horizontal-scroll">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const cheapest = [...product.variants].sort((a, b) => a.price - b.price)[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="shrink-0 w-56 rounded-2xl overflow-hidden border transition-all hover:shadow-lg flex flex-col"
      style={{ borderColor: 'var(--mf-mist)', backgroundColor: 'white' }}
    >
      <div
        className="relative aspect-square"
        style={{ backgroundColor: 'var(--mf-cream)' }}
      >
        <ProductImage
          src={product.heroImage}
          alt={product.name.en}
          fill
          className="object-cover"
          sizes="224px"
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
      <div className="p-4 flex flex-col gap-2">
        <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--mf-ink)' }}>
          {product.name.en}
        </p>
        <div className="flex items-center gap-1">
          <Star size={12} style={{ color: 'var(--mf-amber)', fill: 'var(--mf-amber)' }} />
          <span className="text-xs font-semibold">{product.rating}</span>
          <span className="text-xs" style={{ color: 'var(--mf-graphite)' }}>({product.reviewCount})</span>
        </div>
        <p className="text-base font-extrabold" style={{ color: 'var(--mf-cobalt)' }}>
          {formatPrice(cheapest.price)}
        </p>
      </div>
    </Link>
  );
}
