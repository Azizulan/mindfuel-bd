import Link from 'next/link';
import { ArrowRight, FlaskConical, X, Check } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import { getProductBySlug } from '@/data/products';

export default function HomepageHero() {
  const featured = getProductBySlug('seedra') ?? getProductBySlug('classic-peanut-butter-smooth');

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--mf-cobalt-deep)' }}
    >
      {/* Background gradient orbs */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 30%, var(--mf-mint) 0%, transparent 45%), radial-gradient(circle at 85% 75%, var(--mf-amber) 0%, transparent 40%)',
        }}
      />

      <div className="container-mf relative z-10 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: 'rgba(94,234,212,0.15)', border: '1px solid rgba(94,234,212,0.3)' }}>
              <FlaskConical size={14} style={{ color: 'var(--mf-mint)' }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--mf-mint)' }}>
                BCSIR LAB TESTED · MADE IN BANGLADESH
              </span>
            </div>

            <h1 className="font-serif-display text-white mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.02, fontWeight: 600 }}>
              Real food.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 500 }}>For families who actually</span><br />
              <span style={{ color: 'var(--mf-amber)' }}>read the label.</span>
            </h1>

            <p className="font-bn text-lg mb-6 max-w-md" style={{ color: 'var(--mf-mint-soft)', opacity: 0.85 }}>
              আসল খাবার। বাংলাদেশে তৈরি। যে পরিবার লেবেল পড়ে দেখে — তাদের জন্য।
            </p>

            <p className="text-base mb-8 max-w-md leading-relaxed" style={{ color: 'var(--mf-mint-soft)', opacity: 0.75 }}>
              No palm oil. No added sugar. No preservatives you can&apos;t pronounce.
              Just peanut butter, granola, nuts, and Seedra — the way real food should be.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/shop" className="btn-primary text-base py-4 px-7">
                Shop the Range <ArrowRight size={18} />
              </Link>
              <Link
                href="/real-vs-fake"
                className="inline-flex items-center justify-center gap-2 text-white font-semibold py-4 px-6 rounded-full transition-colors hover:bg-white/10 cursor-pointer"
                style={{ border: '2px solid rgba(255,255,255,0.2)' }}
              >
                See the real vs fake report
              </Link>
            </div>

            {/* Trust stats */}
            <div
              className="grid grid-cols-3 gap-2 sm:gap-4 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
            >
              {[
                { num: '23k+', label: 'happy customers' },
                { num: '4.8★', label: 'average rating' },
                { num: 'Zero', label: 'palm oil. Ever.' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white leading-none">{stat.num}</p>
                  <p className="text-xs mt-1.5" style={{ color: 'var(--mf-mint-soft)', opacity: 0.6 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Comparison teaser card */}
          <div className="relative">
            <div
              className="relative rounded-3xl overflow-hidden p-6 md:p-7"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Featured product image */}
              {featured && (
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-5"
                  style={{ backgroundColor: 'var(--mf-cream)' }}>
                  <ProductImage
                    src={featured.heroImage}
                    alt={featured.name.en}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    fallbackText={featured.name.en.slice(0, 8)}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: 'var(--mf-amber)', color: 'var(--mf-cobalt-deep)' }}>
                    SUMMER HERO
                  </span>
                </div>
              )}

              {/* Mini comparison */}
              <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: 'var(--mf-amber)' }}>
                The real vs fake test
              </p>
              <div className="space-y-2.5">
                {[
                  { label: 'No palm oil', mf: true, others: false },
                  { label: 'No added sugar', mf: true, others: false },
                  { label: 'BCSIR lab tested', mf: true, others: false },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <span className="text-white font-medium">{row.label}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Check size={16} style={{ color: 'var(--mf-mint)' }} />
                        <span className="text-xs font-semibold" style={{ color: 'var(--mf-mint)' }}>MF</span>
                      </div>
                      <div className="flex items-center gap-1.5 opacity-60">
                        <X size={16} style={{ color: 'var(--mf-danger)' }} />
                        <span className="text-xs" style={{ color: 'var(--mf-mint-soft)' }}>Others</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/real-vs-fake"
                className="inline-flex items-center gap-1.5 text-sm font-semibold mt-5 hover:gap-2 transition-all cursor-pointer"
                style={{ color: 'var(--mf-mint)' }}
              >
                Full comparison <ArrowRight size={14} />
              </Link>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-3 -left-3 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg"
              style={{ backgroundColor: 'var(--mf-amber)', color: 'var(--mf-cobalt-deep)' }}
            >
              <span className="text-xl font-extrabold">9/12</span>
              <span className="text-xs font-semibold leading-tight">local PBs<br />contain palm oil</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
