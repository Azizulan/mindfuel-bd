import Link from 'next/link';
import { Star } from 'lucide-react';

const tags = [
  { label: 'Peanut Butter', href: '/shop/peanut-butter' },
  { label: 'Granola', href: '/shop/granola' },
  { label: 'Seedra', href: '/products/seedra' },
  { label: 'Mixed Nuts', href: '/shop/nuts' },
  { label: 'Seed Mix', href: '/shop/seeds' },
];

export default function StatsBand() {
  return (
    <section className="container-mf py-4 pb-10">
      <div
        className="rounded-[1.75rem] md:rounded-[2rem] p-8 md:p-12"
        style={{ backgroundColor: 'var(--mf-blue)' }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left — big statement */}
          <div>
            <h2 className="font-display mb-4" style={{ color: 'var(--mf-espresso)', fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', lineHeight: 0.98 }}>
              WITH REAL INGREDIENTS, EVERYTHING IS GOOD!
            </h2>
            <Link href="/shop" className="btn-primary mt-2">
              Shop the Range
            </Link>
          </div>

          {/* Right — rating + tags */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-display text-5xl" style={{ color: 'var(--mf-espresso)' }}>4.83</span>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} style={{ color: 'var(--mf-orange)', fill: 'var(--mf-orange)' }} />
                  ))}
                </div>
                <p className="text-sm font-semibold" style={{ color: 'var(--mf-espresso)' }}>
                  Based on 4,350+ reviews
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.href}
                  href={tag.href}
                  className="px-4 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105"
                  style={{ backgroundColor: 'var(--mf-cream)', color: 'var(--mf-espresso)' }}
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
