'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

const categoryPills = [
  { label: 'Peanut Butter', href: '/shop/peanut-butter', count: 3, color: 'var(--mf-brown)', text: 'var(--mf-cream)' },
  { label: 'Granola', href: '/shop/granola', count: 2, color: 'var(--mf-orange)', text: '#fff' },
  { label: 'Muesli', href: '/shop/muesli', count: 2, color: 'var(--mf-green)', text: '#fff' },
  { label: 'Nuts', href: '/shop/nuts', count: 2, color: 'var(--mf-yellow)', text: 'var(--mf-espresso)' },
  { label: 'Seeds', href: '/shop/seeds', count: 1, color: 'var(--mf-blue)', text: '#1C4A54' },
  { label: 'Seedra', href: '/products/seedra', count: 1, color: 'var(--mf-purple)', text: '#fff' },
];

const cardBgs = ['var(--mf-orange-soft)', 'var(--mf-blue-soft)', 'var(--mf-amber-soft)', 'var(--mf-green-soft)'];

export default function ProductsDaily({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const preferred = ['classic-peanut-butter-smooth', 'granola-honey-nut', 'spicy-nut-mix', 'chocolate-peanut-butter', 'seedra', 'mixed-nuts'];
  const featured = products
    .filter((p) => preferred.includes(p.slug))
    .sort((a, b) => preferred.indexOf(a.slug) - preferred.indexOf(b.slug));

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="section-py" style={{ backgroundColor: 'var(--mf-cream)' }}>
      <div className="container-mf">
        {/* Header + pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <h2 className="font-display" style={{ color: 'var(--mf-espresso)', fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', lineHeight: 1 }}>
            REAL FOOD WE<br />MAKE DAILY —
          </h2>
          <div className="flex flex-wrap gap-2 max-w-md">
            {categoryPills.map((pill) => (
              <Link
                key={pill.href}
                href={pill.href}
                className="inline-flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 rounded-full text-sm font-bold transition-transform hover:scale-105"
                style={{ backgroundColor: pill.color, color: pill.text }}
              >
                {pill.label}
                <span
                  className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-[0.65rem]"
                  style={{ backgroundColor: 'rgba(0,0,0,0.18)' }}
                >
                  {pill.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div ref={scrollRef} className="horizontal-scroll pb-2">
            {featured.map((product, i) => {
              const cheapest = [...product.variants].sort((a, b) => a.price - b.price)[0];
              return (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group shrink-0 w-[280px] rounded-[1.5rem] overflow-hidden p-4 transition-transform hover:-translate-y-1"
                  style={{ backgroundColor: cardBgs[i % cardBgs.length] }}
                >
                  <div className="relative aspect-square rounded-[1.25rem] overflow-hidden mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
                    <ProductImage
                      src={product.heroImage}
                      alt={product.name.en}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-105 transition-transform"
                      fallbackText={product.name.en.slice(0, 8)}
                    />
                  </div>
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star size={13} style={{ color: 'var(--mf-orange)', fill: 'var(--mf-orange)' }} />
                    <span className="text-xs font-bold" style={{ color: 'var(--mf-espresso)' }}>{product.rating}</span>
                    <span className="text-xs" style={{ color: 'var(--mf-graphite)' }}>({product.reviewCount})</span>
                  </div>
                  <p className="font-display text-lg leading-tight mb-1" style={{ color: 'var(--mf-espresso)' }}>
                    {product.name.en}
                  </p>
                  <p className="font-bold" style={{ color: 'var(--mf-orange)' }}>From {formatPrice(cheapest.price)}</p>
                </Link>
              );
            })}
          </div>

          {/* Arrows */}
          <div className="flex gap-2 mt-5 justify-center lg:justify-start">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: 'var(--mf-espresso)', color: 'var(--mf-cream)' }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: 'var(--mf-yellow)', color: 'var(--mf-espresso)' }}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
