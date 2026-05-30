import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { formatPrice } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MINDFUEL Bundles — Save Up to 25%',
  description: 'Curated MINDFUEL bundles for every occasion — Breakfast Box, Snack Stack, Family Box, Gift Box. Save up to 25% vs buying individually.',
};

const bundles = [
  {
    id: 'breakfast-box',
    name: 'The Breakfast Box',
    emoji: '🌅',
    desc: 'Everything you need for a real-food Bangladeshi morning. Granola or muesli + classic peanut butter + Seedra fiber drink.',
    products: ['Honey Nut Granola (350g)', 'Classic PB Smooth (400g)', 'Seedra Original (300g)'],
    originalPrice: 1590,
    bundlePrice: 1290,
    saving: 300,
    savingPct: 19,
    bg: '#DBEAFE',
    color: 'var(--mf-cobalt)',
    tag: 'Most Popular',
  },
  {
    id: 'snack-stack',
    name: 'The Snack Stack',
    emoji: '🍿',
    desc: 'Real snacks for real people. Mixed nuts + spicy nut mix + seed mix. No junk. Just clean crunch.',
    products: ['Mixed Nuts Premium (150g)', 'Spicy Nut Mix (150g)', 'Seed Mix (250g)'],
    originalPrice: 980,
    bundlePrice: 790,
    saving: 190,
    savingPct: 19,
    bg: 'var(--mf-cream)',
    color: 'var(--mf-ink)',
    tag: null,
  },
  {
    id: 'family-box',
    name: 'The Family Box',
    emoji: '👨‍👩‍👧‍👦',
    desc: 'One box for the whole family. Peanut butters for the kids, Seedra for the adults, granola for everyone.',
    products: ['Classic PB Smooth (400g)', 'Chocolate PB (200g)', 'Honey Nut Granola (350g)', 'Seedra Lemon (300g)'],
    originalPrice: 2180,
    bundlePrice: 1720,
    saving: 460,
    savingPct: 21,
    bg: 'var(--mf-mint-soft)',
    color: '#0F766E',
    tag: 'Best Value',
  },
  {
    id: 'gift-box',
    name: 'The Gift Box',
    emoji: '🎁',
    desc: 'Premium gift set — all five MINDFUEL products in beautiful packaging. Perfect for Eid, birthdays, or corporate gifting.',
    products: ['Classic PB Smooth (200g)', 'Chocolate PB (200g)', 'Honey Nut Granola (350g)', 'Spicy Nut Mix (150g)', 'Seedra Original (300g)'],
    originalPrice: 2000,
    bundlePrice: 1590,
    saving: 410,
    savingPct: 21,
    bg: '#EDE9FE',
    color: '#5B21B6',
    tag: 'Eid Special',
  },
];

export default function BundlesPage() {
  return (
    <SiteLayout>
      <div className="section-py">
        <div className="container-mf">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="text-label" style={{ color: 'var(--mf-cobalt)' }}>CURATED BUNDLES</span>
            <h1 className="text-display-l mt-2 mb-3">
              Stack more.<br />
              <span style={{ color: 'var(--mf-amber)' }}>Save more.</span>
            </h1>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--mf-graphite)' }}>
              Curated for every family member, every occasion, every budget. Up to 25% off vs buying individually.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className="rounded-3xl overflow-hidden flex flex-col"
                style={{ backgroundColor: bundle.bg, boxShadow: '0 4px 16px rgba(15,23,42,0.08)' }}
              >
                <div className="p-8 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{bundle.emoji}</span>
                    {bundle.tag && (
                      <span
                        className="badge badge-amber text-xs shrink-0"
                        style={{ backgroundColor: 'var(--mf-amber)', color: 'var(--mf-cobalt-deep)' }}
                      >
                        {bundle.tag}
                      </span>
                    )}
                  </div>
                  <h2 className="text-h2 mb-2" style={{ color: bundle.color }}>{bundle.name}</h2>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: bundle.color, opacity: 0.75 }}>
                    {bundle.desc}
                  </p>
                  <ul className="flex flex-col gap-1.5 mb-6">
                    {bundle.products.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm" style={{ color: bundle.color }}>
                        <span>✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold" style={{ color: bundle.color }}>
                      {formatPrice(bundle.bundlePrice)}
                    </span>
                    <span className="text-base line-through opacity-40" style={{ color: bundle.color }}>
                      {formatPrice(bundle.originalPrice)}
                    </span>
                    <span className="badge badge-mint text-xs">Save {bundle.savingPct}%</span>
                  </div>
                </div>
                <div className="px-8 pb-8">
                  <Link
                    href={`/products/${bundle.id}`}
                    className="btn-primary w-full justify-center text-sm py-3"
                  >
                    Order via WhatsApp <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-12 p-6 rounded-2xl text-center"
            style={{ backgroundColor: 'var(--mf-cobalt-deep)', color: 'white' }}
          >
            <p className="text-base font-semibold mb-2">Want a custom bundle?</p>
            <p className="text-sm mb-4" style={{ color: 'var(--mf-mint-soft)', opacity: 0.8 }}>
              Corporate orders, Eid hampers, office gifting — we do custom quantities and packaging.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '8801XXXXXXXXX'}?text=${encodeURIComponent('Hello MINDFUEL! I\'d like to discuss a custom bundle order.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              WhatsApp us for custom orders
            </a>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
