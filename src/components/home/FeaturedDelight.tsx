import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import { getProductBySlug } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export default async function FeaturedDelight() {
  const product = (await getProductBySlug('seedra')) ?? (await getProductBySlug('chocolate-peanut-butter'));
  if (!product) return null;
  const cheapest = [...product.variants].sort((a, b) => a.price - b.price)[0];

  return (
    <section className="section-py">
      <div className="container-mf">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left — image with circular badge */}
          <div className="relative">
            <div
              className="relative rounded-[1.5rem] overflow-hidden aspect-[5/4]"
              style={{ backgroundColor: 'var(--mf-blue-soft)' }}
            >
              <ProductImage
                src={product.heroImage}
                alt={product.name.en}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                fallbackText={product.name.en.slice(0, 8)}
              />
            </div>
            {/* Rotating circular badge */}
            <div
              className="absolute -top-5 -left-2 md:-left-5 w-24 h-24 rounded-full flex items-center justify-center text-center"
              style={{ backgroundColor: 'var(--mf-yellow)' }}
            >
              <span className="font-display text-[0.7rem] leading-tight px-2" style={{ color: 'var(--mf-espresso)' }}>
                FUN FOR THE WHOLE FAMILY
              </span>
            </div>
          </div>

          {/* Right — copy */}
          <div>
            <h2 className="font-display mb-5" style={{ color: 'var(--mf-espresso)', fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', lineHeight: 1 }}>
              YOUR ONLY<br />DOSE OF DELIGHT
            </h2>

            <p className="text-label mb-3" style={{ color: 'var(--mf-orange)' }}>Featured item —</p>

            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0" style={{ backgroundColor: 'var(--mf-cream)' }}>
                <ProductImage
                  src={product.heroImage}
                  alt={product.name.en}
                  fill
                  sizes="64px"
                  className="object-cover"
                  fallbackText="MF"
                />
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-bold text-base" style={{ color: 'var(--mf-espresso)' }}>{product.name.en}</p>
                  <p className="text-sm" style={{ color: 'var(--mf-graphite)' }}>{product.tagline.en.split('.')[0]}</p>
                </div>
                <div className="pl-4 border-l-2" style={{ borderColor: 'var(--mf-mist)' }}>
                  <span className="font-display text-2xl" style={{ color: 'var(--mf-orange)' }}>
                    {formatPrice(cheapest.price)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-base leading-relaxed mb-6 max-w-md" style={{ color: 'var(--mf-graphite)' }}>
              {product.shortDescription.en}
            </p>

            <Link href={`/products/${product.slug}`} className="btn-primary">
              Shop {product.name.en.split(' ')[0]} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
