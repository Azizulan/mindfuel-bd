import type { Review } from '@/types';
import reviewsData from '@/data/reviews.json';
import { Star } from 'lucide-react';

interface Props {
  productSlug: string;
}

export default function Testimonial({ productSlug }: Props) {
  const reviews = (reviewsData as Review[]).filter((r) => r.productSlug === productSlug && r.helpful > 100);
  const hero = reviews[0] ?? (reviewsData as Review[]).find((r) => r.helpful > 100);
  if (!hero) return null;

  return (
    <section
      className="py-16"
      style={{ backgroundColor: 'var(--mf-cobalt)' }}
    >
      <div className="container-mf max-w-3xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                style={{ color: 'var(--mf-amber)', fill: 'var(--mf-amber)' }}
              />
            ))}
          </div>
          <blockquote
            className="font-serif-display text-white mb-6"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              lineHeight: 1.25,
            }}
          >
            &ldquo;{hero.body}&rdquo;
          </blockquote>
          <p className="text-sm font-semibold" style={{ color: 'var(--mf-mint)' }}>
            — {hero.customerName}, {hero.location}
          </p>
          {hero.verified && (
            <span className="badge badge-mint mt-3 inline-flex">Verified Purchase</span>
          )}
        </div>
      </div>
    </section>
  );
}
