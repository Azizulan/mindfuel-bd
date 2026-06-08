import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import { getProductBySlug } from '@/data/products';

export default async function HomepageHero() {
  const featured = await getProductBySlug('classic-peanut-butter-smooth');

  return (
    <section className="container-mf pt-6 pb-4">
      <div
        className="relative rounded-[1.75rem] md:rounded-[2rem] overflow-hidden px-6 md:px-12 py-10 md:py-14"
        style={{ backgroundColor: 'var(--mf-cream)', border: '1px solid var(--mf-mist)' }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left — copy */}
          <div>
            <h1 className="font-display leading-[0.92] mb-5" style={{ color: 'var(--mf-espresso)', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              EAT THE{' '}
              <span className="relative inline-block">
                <span style={{ color: 'var(--mf-orange)' }}>REAL</span>
                <span
                  className="absolute -top-3 -right-10 badge badge-green text-[0.6rem] rotate-6 hidden sm:inline-flex"
                >
                  TASTY
                </span>
              </span>
              <br />
              GOOD{' '}
              <span className="relative inline-block">
                STUFF
                <span
                  className="absolute -top-2 -right-12 badge badge-orange text-[0.6rem] -rotate-6 hidden sm:inline-flex"
                >
                  NO PALM OIL
                </span>
              </span>
            </h1>

            <p className="text-lg font-bold mb-2" style={{ color: 'var(--mf-espresso)' }}>
              Real peanut butter, granola & Seedra —{' '}
              <span
                className="px-2 py-0.5 rounded-full text-sm"
                style={{ backgroundColor: 'var(--mf-blue)', color: '#1C4A54' }}
              >
                BCSIR LAB TESTED
              </span>
            </p>
            <p className="text-base mb-3 max-w-md" style={{ color: 'var(--mf-graphite)' }}>
              We&apos;re literally obsessed with feeding your family the real thing. No palm oil, no added sugar, nothing fake.
            </p>
            <p className="font-bn text-sm mb-7 max-w-md" style={{ color: 'var(--mf-graphite)' }}>
              আসল খাবার — যে পরিবার লেবেল পড়ে দেখে, তাদের জন্য।
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/shop" className="btn-primary text-base py-3.5 px-7">
                Order Now <ArrowRight size={18} />
              </Link>
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 font-bold text-sm underline-offset-4 hover:underline"
                style={{ color: 'var(--mf-espresso)' }}
              >
                Recipe Blog <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right — product on yellow card */}
          <div className="relative">
            <div
              className="relative rounded-[1.5rem] overflow-hidden aspect-[4/3] lg:aspect-square"
              style={{ backgroundColor: 'var(--mf-yellow)' }}
            >
              {featured && (
                <ProductImage
                  src={featured.heroImage}
                  alt={featured.name.en}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  fallbackText="MINDFUEL"
                />
              )}
            </div>
            {/* Floating sparkle accent */}
            <div
              className="absolute -top-3 -left-3 w-12 h-12 rounded-full hidden md:flex items-center justify-center rotate-12"
              style={{ backgroundColor: 'var(--mf-orange)' }}
            >
              <Sparkles size={20} className="text-white" />
            </div>
            {/* Floating stat badge */}
            <div
              className="absolute -bottom-4 -right-2 md:right-6 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg"
              style={{ backgroundColor: 'var(--mf-espresso)', color: 'var(--mf-cream)' }}
            >
              <span className="font-display text-xl" style={{ color: 'var(--mf-yellow)' }}>4.8★</span>
              <span className="text-xs font-semibold leading-tight">from 2,000+<br />happy orders</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
