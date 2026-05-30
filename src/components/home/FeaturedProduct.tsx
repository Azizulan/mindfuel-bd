import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface Props {
  product: Product;
}

export default function FeaturedProduct({ product }: Props) {
  const cheapest = [...product.variants].sort((a, b) => a.price - b.price)[0];

  return (
    <section className="section-py">
      <div className="container-mf">
        <div className="text-center mb-8">
          <span className="text-label" style={{ color: 'var(--mf-cobalt)' }}>FEATURED THIS SEASON</span>
        </div>
        <div
          className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 8px 32px rgba(15,23,42,0.1)' }}
        >
          {/* Image */}
          <div
            className="relative aspect-square md:aspect-auto"
            style={{ backgroundColor: 'var(--mf-amber-soft)', minHeight: 280 }}
          >
            <ProductImage
              src={product.heroImage}
              alt={product.name.en}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              fallbackText={product.name.en.slice(0, 8)}
            />
            {product.badges[0] && (
              <span
                className="absolute top-4 left-4 badge"
                style={{
                  backgroundColor: 'var(--mf-amber)',
                  color: 'var(--mf-cobalt-deep)',
                }}
              >
                {product.badges[0].label}
              </span>
            )}
          </div>

          {/* Info */}
          <div
            className="flex flex-col justify-center p-8 md:p-12"
            style={{ backgroundColor: 'var(--mf-cream)' }}
          >
            <span className="text-label mb-3" style={{ color: 'var(--mf-cobalt)' }}>
              {product.category.replace(/-/g, ' ').toUpperCase()}
            </span>
            <h2 className="text-h2 mb-2">{product.name.en}</h2>
            <p className="font-bn text-base mb-4" style={{ color: 'var(--mf-graphite)' }}>
              {product.tagline.bn}
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--mf-graphite)' }}>
              {product.shortDescription.en}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    style={{ color: 'var(--mf-amber)', fill: i < Math.floor(product.rating) ? 'var(--mf-amber)' : 'none' }}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm" style={{ color: 'var(--mf-graphite)' }}>({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-extrabold" style={{ color: 'var(--mf-cobalt)' }}>
                From {formatPrice(cheapest.price)}
              </span>
              {cheapest.comparePrice && (
                <span className="text-base line-through" style={{ color: 'var(--mf-graphite)', opacity: 0.5 }}>
                  {formatPrice(cheapest.comparePrice)}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/products/${product.slug}`}
                className="btn-primary flex items-center gap-2"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                href={`/products/${product.slug}#build-box`}
                className="btn-secondary flex items-center gap-2"
              >
                Build my box
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
