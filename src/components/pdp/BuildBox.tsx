'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, Minus, Plus, Truck, Gift } from 'lucide-react';
import type { Product } from '@/types';
import { freeGifts } from '@/data/free-gifts';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/store/cart';

interface VariantQty { sku: string; qty: number }

const STACK_OPTIONS: { size: 1 | 3 | 6; label: string; discount: number; tag?: string }[] = [
  { size: 1, label: 'Single', discount: 0 },
  { size: 3, label: '3-Pack', discount: 10, tag: 'Most Popular' },
  { size: 6, label: '6-Pack', discount: 20 },
];

interface Props {
  product: Product;
}

export default function BuildBox({ product }: Props) {
  const [stackSize, setStackSize] = useState<1 | 3 | 6>(3);
  const [freeGiftId, setFreeGiftId] = useState<string | null>(null);
  const [selected, setSelected] = useState<VariantQty[]>([]);
  const addItem = useCart((s) => s.addItem);

  const totalSelected = selected.reduce((s, v) => s + v.qty, 0);
  const remaining = stackSize - totalSelected;

  const setVariantQty = (sku: string, delta: number) => {
    setSelected((prev) => {
      const existing = prev.find((v) => v.sku === sku);
      const currentQty = existing?.qty ?? 0;
      const newQty = Math.max(0, currentQty + delta);
      const newTotal = prev.reduce((s, v) => s + (v.sku === sku ? 0 : v.qty), 0) + newQty;
      if (newQty > currentQty && newTotal > stackSize) return prev;
      if (newQty === 0) return prev.filter((v) => v.sku !== sku);
      if (existing) return prev.map((v) => (v.sku === sku ? { ...v, qty: newQty } : v));
      return [...prev, { sku, qty: newQty }];
    });
  };

  const basePrice = product.variants[0].price;
  const stackDiscount = STACK_OPTIONS.find((o) => o.size === stackSize)?.discount ?? 0;
  const totalDiscount = stackDiscount;
  const originalTotal = basePrice * stackSize;
  const discountedTotal = Math.round(originalTotal * (1 - totalDiscount / 100));
  const savedAmount = originalTotal - discountedTotal;

  const handleAddToCart = () => {
    if (selected.length === 0) return;
    selected.forEach(({ sku, qty }) => {
      const variant = product.variants.find((v) => v.sku === sku);
      if (!variant) return;
      addItem({
        productSlug: product.slug,
        variantSku: sku,
        name: product.name.en,
        variantLabel: variant.label.en,
        price: Math.round(variant.price * (1 - totalDiscount / 100)),
        qty,
        image: product.heroImage,
      });
    });
  };

  return (
    <section id="build-box" className="section-py" style={{ backgroundColor: 'var(--mf-cream)' }}>
      <div className="container-mf">
        <div className="text-center mb-8">
          <span className="text-label" style={{ color: 'var(--mf-orange)' }}>STOCK UP &amp; SAVE</span>
          <h2 className="text-h2 mt-2" style={{ color: 'var(--mf-espresso)' }}>
            Build a 3 or 6-pack. Save up to 20%.
          </h2>
        </div>

        {/* Progress bar */}
        {(() => {
          const step1Done = true;
          const step2Done = !!freeGiftId;
          const step3Done = totalSelected >= stackSize;
          const progressPct = (Number(step1Done) + Number(step2Done) + Number(step3Done)) / 3 * 100;
          return (
            <div className="max-w-2xl mx-auto mb-10" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100} aria-label="Build-a-box progress">
              <div className="flex items-center justify-between mb-2 px-1">
                {[
                  { n: 1, label: 'Size', done: step1Done },
                  { n: 2, label: 'Free gift', done: step2Done },
                  { n: 3, label: 'Variants', done: step3Done },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                      style={{
                        backgroundColor: s.done ? 'var(--mf-success)' : 'var(--mf-mist)',
                        color: s.done ? 'white' : 'var(--mf-graphite)',
                      }}
                    >
                      {s.done ? <Check size={14} /> : s.n}
                    </span>
                    <span
                      className="text-xs font-semibold hidden sm:inline"
                      style={{ color: s.done ? 'var(--mf-ink)' : 'var(--mf-graphite)' }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--mf-mist)' }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%`, backgroundColor: 'var(--mf-success)' }}
                />
              </div>
            </div>
          );
        })()}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Steps */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Step 1 — Stack size */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 16px rgba(15,23,42,0.06)' }}>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base font-extrabold text-white shadow-sm"
                  style={{ backgroundColor: 'var(--mf-cobalt)' }}
                >1</span>
                <h3 className="text-h3">Choose your stack size</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {STACK_OPTIONS.map((opt) => (
                  <button
                    key={opt.size}
                    onClick={() => { setStackSize(opt.size); setSelected([]); }}
                    className="relative flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all"
                    style={{
                      borderColor: stackSize === opt.size ? 'var(--mf-cobalt)' : 'var(--mf-mist)',
                      backgroundColor: stackSize === opt.size ? '#EFF6FF' : 'white',
                    }}
                  >
                    {opt.tag && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: 'var(--mf-amber)', color: 'var(--mf-cobalt-deep)' }}
                      >
                        {opt.tag}
                      </span>
                    )}
                    <span className="text-2xl font-extrabold" style={{ color: 'var(--mf-ink)' }}>
                      {opt.size === 1 ? '1' : `×${opt.size}`}
                    </span>
                    <span className="text-sm font-semibold">{opt.label}</span>
                    {opt.discount > 0 && (
                      <span className="badge badge-mint text-xs">Save {opt.discount}%</span>
                    )}
                    <span className="text-xs mt-1" style={{ color: 'var(--mf-graphite)' }}>
                      {formatPrice(Math.round(basePrice * (1 - opt.discount / 100)))} each
                    </span>
                  </button>
                ))}
              </div>

              {/* Free delivery nudge (replaces subscription) */}
              <div
                className="mt-4 flex items-center gap-3 p-4 rounded-xl"
                style={{ backgroundColor: 'var(--mf-green-soft)' }}
              >
                <Truck size={18} style={{ color: 'var(--mf-green)' }} />
                <p className="text-sm font-bold" style={{ color: '#3F5E22' }}>
                  Bigger packs unlock bigger savings — plus free delivery over ৳1500.
                </p>
              </div>
            </div>

            {/* Step 2 — Free gift */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 16px rgba(15,23,42,0.06)' }}>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base font-extrabold text-white shadow-sm"
                  style={{ backgroundColor: freeGiftId ? 'var(--mf-success)' : 'var(--mf-cobalt)' }}
                >{freeGiftId ? <Check size={16} /> : 2}</span>
                <h3 className="text-h3">Pick your free gift</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {freeGifts.map((gift) => (
                  <button
                    key={gift.id}
                    onClick={() => gift.inStock && setFreeGiftId(gift.id)}
                    disabled={!gift.inStock}
                    className="relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all disabled:opacity-50"
                    style={{
                      borderColor: freeGiftId === gift.id ? 'var(--mf-cobalt)' : 'var(--mf-mist)',
                      backgroundColor: freeGiftId === gift.id ? '#EFF6FF' : 'white',
                    }}
                  >
                    {!gift.inStock && (
                      <div
                        className="absolute inset-0 flex items-center justify-center rounded-xl"
                        style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                      >
                        <span className="text-xs font-bold" style={{ color: 'var(--mf-danger)' }}>SOLD OUT</span>
                      </div>
                    )}
                    {freeGiftId === gift.id && (
                      <div
                        className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--mf-cobalt)' }}
                      >
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'var(--mf-mint-soft)', color: '#0F766E' }}
                    >
                      <Gift size={22} strokeWidth={2} />
                    </div>
                    <span className="text-xs font-medium text-center leading-tight" style={{ color: 'var(--mf-ink)' }}>
                      {gift.label.en}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 — Choose variants */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 4px 16px rgba(15,23,42,0.06)' }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base font-extrabold text-white shadow-sm"
                    style={{ backgroundColor: totalSelected >= stackSize ? 'var(--mf-success)' : 'var(--mf-cobalt)' }}
                  >{totalSelected >= stackSize ? <Check size={16} /> : 3}</span>
                  <h3 className="text-h3">Choose your variants</h3>
                </div>
                <span
                  className="text-sm font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: remaining === 0 ? 'var(--mf-mint-soft)' : 'var(--mf-amber-soft)',
                    color: remaining === 0 ? '#0F766E' : '#92400E',
                  }}
                >
                  {remaining === 0 ? '✓ Full stack!' : `${remaining} more to add`}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {product.variants.filter((v) => v.inStock).map((variant) => {
                  const qty = selected.find((v) => v.sku === variant.sku)?.qty ?? 0;
                  return (
                    <div
                      key={variant.sku}
                      className="flex items-center justify-between p-4 rounded-xl border"
                      style={{ borderColor: qty > 0 ? 'var(--mf-cobalt)' : 'var(--mf-mist)' }}
                    >
                      <div>
                        <p className="font-semibold" style={{ color: 'var(--mf-ink)' }}>{variant.label.en}</p>
                        <p className="text-sm" style={{ color: 'var(--mf-graphite)' }}>
                          {formatPrice(Math.round(variant.price * (1 - totalDiscount / 100)))} each
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setVariantQty(variant.sku, -1)}
                          disabled={qty === 0}
                          className="w-8 h-8 rounded-full border flex items-center justify-center transition-all disabled:opacity-30"
                          style={{ borderColor: 'var(--mf-mist)' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center font-bold">{qty}</span>
                        <button
                          onClick={() => setVariantQty(variant.sku, 1)}
                          disabled={totalSelected >= stackSize}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-30"
                          style={{ backgroundColor: 'var(--mf-cobalt)' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky order summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div
              className="bg-white rounded-2xl p-6 flex flex-col gap-4"
              style={{ boxShadow: '0 8px 24px rgba(15,23,42,0.1)' }}
            >
              <h3 className="text-h3">Your stack</h3>

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--mf-graphite)' }}>Original ({stackSize}×)</span>
                  <span>{formatPrice(originalTotal)}</span>
                </div>
                {stackDiscount > 0 && (
                  <div className="flex justify-between" style={{ color: 'var(--mf-success)' }}>
                    <span>Bundle discount ({stackDiscount}%)</span>
                    <span>−{formatPrice(Math.round(originalTotal * stackDiscount / 100))}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-3" style={{ borderColor: 'var(--mf-mist)' }}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base">Total</span>
                  <span className="text-2xl font-extrabold" style={{ color: 'var(--mf-cobalt)' }}>
                    {formatPrice(discountedTotal)}
                  </span>
                </div>
                {savedAmount > 0 && (
                  <p className="text-sm mt-1" style={{ color: 'var(--mf-success)' }}>
                    You save {formatPrice(savedAmount)} ({totalDiscount}% off)
                  </p>
                )}
              </div>

              {freeGiftId && (
                <div
                  className="flex items-center gap-2 p-3 rounded-xl text-sm font-medium"
                  style={{ backgroundColor: 'var(--mf-mint-soft)', color: '#0F766E' }}
                >
                  <Gift size={16} />
                  <span>Free gift included!</span>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={totalSelected < stackSize}
                className="btn-primary w-full py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {totalSelected < stackSize
                  ? `Add ${remaining} more to continue`
                  : 'Add to cart →'}
              </button>

              <p className="text-xs text-center" style={{ color: 'var(--mf-graphite)' }}>
                Free delivery on orders above ৳1500
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
