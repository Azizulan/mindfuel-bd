import ProductImage from '@/components/ui/ProductImage';
import { getProductBySlug } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export default function WhySpecial() {
  const pb = getProductBySlug('classic-peanut-butter-smooth');
  const choc = getProductBySlug('chocolate-peanut-butter');
  const cheapest = choc ? [...choc.variants].sort((a, b) => a.price - b.price)[0] : null;

  return (
    <section className="section-py">
      <div className="container-mf">
        <h2 className="font-display max-w-2xl mb-10" style={{ color: 'var(--mf-espresso)', fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', lineHeight: 1.02 }}>
          WHY MINDFUEL IS SO SPECIAL TO BANGLADESHI FAMILIES?
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Card 1 — product image */}
          <div className="rounded-[1.5rem] overflow-hidden relative aspect-square" style={{ backgroundColor: 'var(--mf-blue-soft)' }}>
            {pb && (
              <ProductImage
                src={pb.heroImage}
                alt={pb.name.en}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                fallbackText="MF"
              />
            )}
          </div>

          {/* Card 2 — offer block */}
          <div
            className="rounded-[1.5rem] p-7 flex flex-col justify-between"
            style={{ backgroundColor: 'var(--mf-brown)', color: 'var(--mf-cream)' }}
          >
            <div>
              <h3 className="font-display text-2xl leading-tight mb-3">TASTE THE REAL, CLEAN INGREDIENTS</h3>
              <p className="text-sm" style={{ opacity: 0.8 }}>
                Just peanuts, real cocoa, honey, oats and seeds — nothing you can&apos;t pronounce.
              </p>
            </div>
            {cheapest && (
              <p className="font-display text-3xl mt-6" style={{ color: 'var(--mf-yellow)' }}>
                {formatPrice(cheapest.price)}
              </p>
            )}
          </div>

          {/* Card 3 — image + combo badge + testimonial */}
          <div className="flex flex-col gap-5">
            <div className="rounded-[1.5rem] overflow-hidden relative aspect-[4/3]" style={{ backgroundColor: 'var(--mf-amber-soft)' }}>
              {choc && (
                <ProductImage
                  src={choc.heroImage}
                  alt={choc.name.en}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  fallbackText="MF"
                />
              )}
              <span className="absolute top-3 right-3 badge badge-green">COMBO</span>
            </div>
            <blockquote
              className="rounded-[1.5rem] p-5 text-sm"
              style={{ backgroundColor: 'var(--mf-cream)', border: '1px solid var(--mf-mist)' }}
            >
              <p className="mb-3 leading-relaxed" style={{ color: 'var(--mf-espresso)' }}>
                &ldquo;Real food is a craft. We make it the slow, honest way — and you can taste the difference.&rdquo;
              </p>
              <footer className="font-bold text-xs" style={{ color: 'var(--mf-orange)' }}>— The MINDFUEL Kitchen</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
