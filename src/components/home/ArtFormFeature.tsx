import Link from 'next/link';
import { ArrowRight, Wheat } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import { getProductBySlug } from '@/data/products';

export default async function ArtFormFeature() {
  const product = await getProductBySlug('granola-honey-nut');

  return (
    <section className="container-mf py-4">
      <div
        className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] p-6 md:p-10"
        style={{ backgroundColor: 'var(--mf-espresso)' }}
      >
        {/* decorative wheat */}
        <Wheat
          size={220}
          className="absolute -right-10 -bottom-10 opacity-[0.06] pointer-events-none"
          style={{ color: 'var(--mf-cream)' }}
          aria-hidden="true"
        />

        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Image */}
          <div className="relative rounded-[1.5rem] overflow-hidden aspect-[5/4]" style={{ backgroundColor: 'var(--mf-brown)' }}>
            {product && (
              <ProductImage
                src={product.heroImage}
                alt="Made with care at MINDFUEL"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                fallbackText="MINDFUEL"
              />
            )}
          </div>

          {/* Copy */}
          <div>
            <h2 className="font-display text-white mb-4" style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', lineHeight: 1.02 }}>
              WHY REAL FOOD IS WORTH THE EXTRA EFFORT
            </h2>
            <p className="text-base leading-relaxed mb-6 max-w-md" style={{ color: 'var(--mf-cream)', opacity: 0.8 }}>
              Anyone can add palm oil and sugar to cut costs. We don&apos;t. Every batch is made in our own facility,
              with traceable Bangladeshi ingredients, and tested at BCSIR before it reaches your family. That&apos;s the difference between food made fast and food made right.
            </p>
            <Link href="/our-process" className="btn-primary">
              Learn Our Process <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
