'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Truck, Lock } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { useCart } from '@/store/cart';
import { formatPrice, buildWhatsAppMessage } from '@/lib/utils';
import { trackWhatsAppOrder } from '@/lib/analytics';
import { FREE_DELIVERY_THRESHOLD } from '@/lib/checkout';
import ProductImage from '@/components/ui/ProductImage';
import { getProductBySlug, getCrossSellProducts } from '@/data/products';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQty, total, itemCount } = useCart();
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '8801XXXXXXXXX';

  const cartTotal = total();
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cartTotal);
  const progressPct = Math.min(100, (cartTotal / FREE_DELIVERY_THRESHOLD) * 100);

  const handleWhatsAppOrder = () => {
    const waItems = items.map((item) => ({
      name: `${item.name} (${item.variantLabel})`,
      qty: item.qty,
      total: item.price * item.qty,
    }));
    trackWhatsAppOrder(cartTotal);
    window.open(`https://wa.me/${waNumber}?text=${buildWhatsAppMessage(waItems)}`, '_blank');
  };

  /* ---------- Empty state ---------- */
  if (items.length === 0) {
    const bestseller = getProductBySlug('classic-peanut-butter-smooth');
    return (
      <SiteLayout>
        <div className="section-py">
          <div className="container-mf max-w-3xl text-center">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
              style={{ backgroundColor: 'var(--mf-blue-soft)', color: '#1C4A54' }}
            >
              <ShoppingBag size={28} strokeWidth={1.75} />
            </div>
            <h1 className="text-h2 mb-2">Your stack is empty.</h1>
            <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--mf-graphite)' }}>
              Let&apos;s build it with real food — start with our bestseller.
            </p>
            {bestseller && (
              <Link
                href={`/products/${bestseller.slug}`}
                className="group inline-flex items-center gap-4 p-4 pr-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                style={{ borderColor: 'var(--mf-mist)', backgroundColor: 'white' }}
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: 'var(--mf-cream)' }}>
                  <ProductImage src={bestseller.heroImage} alt={bestseller.name.en} fill className="object-cover" sizes="80px" fallbackText="MF" />
                </div>
                <div className="text-left">
                  <span className="badge badge-amber text-xs mb-1">Bestseller</span>
                  <p className="font-bold text-base" style={{ color: 'var(--mf-ink)' }}>{bestseller.name.en}</p>
                  <p className="text-sm" style={{ color: 'var(--mf-orange)' }}>
                    From {formatPrice([...bestseller.variants].sort((a, b) => a.price - b.price)[0].price)}
                  </p>
                </div>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--mf-brown)' }} />
              </Link>
            )}
            <div className="mt-6">
              <Link href="/shop" className="text-sm font-bold underline" style={{ color: 'var(--mf-brown)' }}>
                Or browse all products →
              </Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  /* ---------- Cross-sell ---------- */
  const inCartSlugs = new Set(items.map((i) => i.productSlug));
  const crossSell = getCrossSellProducts(
    [...new Set(items.flatMap((i) => getProductBySlug(i.productSlug)?.crossSellSlugs ?? []))]
  ).filter((p) => !inCartSlugs.has(p.slug)).slice(0, 4);

  return (
    <SiteLayout>
      {/* pb gives room for the mobile sticky bar */}
      <div className="section-py pb-32 lg:pb-20">
        <div className="container-mf">
          <h1 className="text-h2 mb-1">Your Cart</h1>
          <p className="text-sm mb-6" style={{ color: 'var(--mf-graphite)' }}>
            {itemCount()} item{itemCount() !== 1 ? 's' : ''} in your stack
          </p>

          {/* Free-delivery progress */}
          <div className="mb-6 p-4 rounded-2xl" style={{ backgroundColor: 'var(--mf-blue-soft)' }}>
            <p className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: '#1C4A54' }}>
              <Truck size={16} />
              {remainingForFreeDelivery > 0
                ? <>Add <span className="font-display">{formatPrice(remainingForFreeDelivery)}</span> more for FREE delivery!</>
                : <>You&apos;ve unlocked FREE delivery! 🎉</>}
            </p>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ backgroundColor: 'var(--mf-green)', width: `${progressPct}%` }} />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 min-w-0">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-3 min-w-0">
              {items.map((item) => (
                <div
                  key={item.variantSku}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border"
                  style={{ borderColor: 'var(--mf-mist)', backgroundColor: 'white' }}
                >
                  <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden relative" style={{ backgroundColor: 'var(--mf-cream)' }}>
                    <ProductImage src={item.image} alt={item.name} fill className="object-cover" sizes="96px" fallbackText="MF" />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-sm leading-tight" style={{ color: 'var(--mf-ink)' }}>{item.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--mf-graphite)' }}>{item.variantLabel}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantSku)}
                        className="shrink-0 w-9 h-9 -mt-1 -mr-1 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} style={{ color: 'var(--mf-danger)' }} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Big thumb-friendly stepper */}
                      <div className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: 'var(--mf-cream)' }}>
                        <button
                          onClick={() => updateQty(item.variantSku, item.qty - 1)}
                          className="w-9 h-9 rounded-full flex items-center justify-center bg-white cursor-pointer active:scale-95 transition-transform"
                          style={{ border: '1px solid var(--mf-mist)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.variantSku, item.qty + 1)}
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform"
                          style={{ backgroundColor: 'var(--mf-brown)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                      <span className="font-display text-lg" style={{ color: 'var(--mf-brown)' }}>
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cross-sell */}
              {crossSell.length > 0 && (
                <div className="mt-6 min-w-0">
                  <p className="text-label mb-3" style={{ color: 'var(--mf-orange)' }}>Complete your stack</p>
                  <div className="horizontal-scroll">
                    {crossSell.map((p) => {
                      const cheapest = [...p.variants].sort((a, b) => a.price - b.price)[0];
                      return (
                        <Link
                          key={p.slug}
                          href={`/products/${p.slug}`}
                          className="shrink-0 w-36 rounded-2xl overflow-hidden border bg-white transition-transform hover:-translate-y-0.5"
                          style={{ borderColor: 'var(--mf-mist)' }}
                        >
                          <div className="relative aspect-square" style={{ backgroundColor: 'var(--mf-cream)' }}>
                            <ProductImage src={p.heroImage} alt={p.name.en} fill className="object-cover" sizes="144px" fallbackText="MF" />
                          </div>
                          <div className="p-2.5">
                            <p className="text-xs font-bold leading-tight line-clamp-2" style={{ color: 'var(--mf-ink)' }}>{p.name.en}</p>
                            <p className="text-xs mt-1 font-bold" style={{ color: 'var(--mf-orange)' }}>{formatPrice(cheapest.price)}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Summary (desktop sidebar) */}
            <div>
              <div
                className="rounded-2xl p-6 lg:sticky lg:top-24"
                style={{ backgroundColor: 'var(--mf-cream)', border: '1px solid var(--mf-mist)' }}
              >
                <h2 className="text-h3 mb-5">Order Summary</h2>
                <div className="flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--mf-graphite)' }}>Subtotal ({itemCount()} items)</span>
                    <span className="font-semibold">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--mf-graphite)' }}>Delivery</span>
                    <span style={{ color: cartTotal >= FREE_DELIVERY_THRESHOLD ? 'var(--mf-green)' : 'var(--mf-graphite)' }}>
                      {cartTotal >= FREE_DELIVERY_THRESHOLD ? 'FREE' : 'At checkout'}
                    </span>
                  </div>
                </div>
                <div className="border-t mt-3 pt-3" style={{ borderColor: 'var(--mf-mist)' }}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total</span>
                    <span className="font-display text-2xl" style={{ color: 'var(--mf-brown)' }}>{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="btn-primary w-full mt-5 py-4 text-base"
                >
                  Checkout <ArrowRight size={18} />
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 rounded-full text-white font-bold text-sm transition-transform hover:scale-[1.02] cursor-pointer"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle size={18} /> Order on WhatsApp
                </button>

                {/* Trust strip */}
                <div className="mt-5 flex flex-col gap-2 text-xs" style={{ color: 'var(--mf-graphite)' }}>
                  <span className="flex items-center gap-2"><ShieldCheck size={14} style={{ color: 'var(--mf-green)' }} /> 100% money-back guarantee</span>
                  <span className="flex items-center gap-2"><Truck size={14} style={{ color: 'var(--mf-green)' }} /> Cash on delivery available</span>
                  <span className="flex items-center gap-2"><Lock size={14} style={{ color: 'var(--mf-green)' }} /> Your details stay private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky checkout bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 border-t"
        style={{
          backgroundColor: 'white',
          borderColor: 'var(--mf-mist)',
          boxShadow: '0 -4px 16px rgba(46,31,21,0.1)',
          paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <p className="text-xs" style={{ color: 'var(--mf-graphite)' }}>Total</p>
            <p className="font-display text-xl leading-none" style={{ color: 'var(--mf-brown)' }}>{formatPrice(cartTotal)}</p>
          </div>
          <button onClick={() => router.push('/checkout')} className="btn-primary flex-1 py-3.5 text-base">
            Checkout <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </SiteLayout>
  );
}
