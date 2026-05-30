'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { useCart } from '@/store/cart';
import { formatPrice, buildWhatsAppMessage } from '@/lib/utils';
import ProductImage from '@/components/ui/ProductImage';
import { getProductBySlug } from '@/data/products';

export default function CartPage() {
  const { items, removeItem, updateQty, total, itemCount } = useCart();
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '8801XXXXXXXXX';

  const handleWhatsAppOrder = () => {
    const waItems = items.map((item) => ({
      name: `${item.name} (${item.variantLabel})`,
      qty: item.qty,
      total: item.price * item.qty,
    }));
    const msg = buildWhatsAppMessage(waItems);
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
  };

  const cartTotal = total();
  const freeDeliveryThreshold = 1500;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartTotal);

  if (items.length === 0) {
    const bestseller = getProductBySlug('classic-peanut-butter-smooth');
    return (
      <SiteLayout>
        <div className="section-py">
          <div className="container-mf max-w-3xl text-center">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
              style={{ backgroundColor: 'var(--mf-mint-soft)', color: '#0F766E' }}
            >
              <ShoppingBag size={28} strokeWidth={1.75} />
            </div>
            <h2 className="text-h2 mb-2">Your stack is empty.</h2>
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
                  <ProductImage
                    src={bestseller.heroImage}
                    alt={bestseller.name.en}
                    fill
                    className="object-cover"
                    sizes="80px"
                    fallbackText="MF"
                  />
                </div>
                <div className="text-left">
                  <span className="badge badge-amber text-xs mb-1">Bestseller</span>
                  <p className="font-bold text-base" style={{ color: 'var(--mf-ink)' }}>{bestseller.name.en}</p>
                  <p className="text-sm" style={{ color: 'var(--mf-cobalt)' }}>
                    From {formatPrice([...bestseller.variants].sort((a, b) => a.price - b.price)[0].price)}
                  </p>
                </div>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--mf-cobalt)' }} />
              </Link>
            )}

            <div className="mt-6">
              <Link href="/shop" className="text-sm font-semibold underline" style={{ color: 'var(--mf-cobalt)' }}>
                Or browse all products →
              </Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="section-py">
        <div className="container-mf">
          <h1 className="text-h2 mb-8">Your Cart ({itemCount()} items)</h1>

          {/* Free delivery progress */}
          {remainingForFreeDelivery > 0 && (
            <div
              className="mb-6 p-4 rounded-xl"
              style={{ backgroundColor: 'var(--mf-mint-soft)' }}
            >
              <p className="text-sm font-semibold" style={{ color: '#0F766E' }}>
                Add {formatPrice(remainingForFreeDelivery)} more for FREE delivery!
              </p>
              <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    backgroundColor: '#0F766E',
                    width: `${Math.min(100, (cartTotal / freeDeliveryThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.variantSku}
                  className="flex gap-4 p-4 rounded-2xl border"
                  style={{ borderColor: 'var(--mf-mist)', backgroundColor: 'var(--mf-cream)' }}
                >
                  {/* Image */}
                  <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden relative" style={{ backgroundColor: 'var(--mf-mist)' }}>
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      fallbackText="MF"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--mf-ink)' }}>{item.name}</p>
                      <p className="text-xs" style={{ color: 'var(--mf-graphite)' }}>{item.variantLabel}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.variantSku, item.qty - 1)}
                          className="w-7 h-7 rounded-full border flex items-center justify-center"
                          style={{ borderColor: 'var(--mf-mist)' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.variantSku, item.qty + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: 'var(--mf-cobalt)' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold" style={{ color: 'var(--mf-cobalt)' }}>
                          {formatPrice(item.price * item.qty)}
                        </span>
                        <button
                          onClick={() => removeItem(item.variantSku)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          aria-label="Remove"
                        >
                          <Trash2 size={16} style={{ color: 'var(--mf-danger)' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div>
              <div
                className="rounded-2xl p-6 sticky top-24"
                style={{ backgroundColor: 'var(--mf-cream)', border: '1px solid var(--mf-mist)' }}
              >
                <h3 className="text-h3 mb-5">Order Summary</h3>
                <div className="flex flex-col gap-3 text-sm">
                  {items.map((item) => (
                    <div key={item.variantSku} className="flex justify-between">
                      <span style={{ color: 'var(--mf-graphite)' }}>
                        {item.name} × {item.qty}
                      </span>
                      <span>{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-1" style={{ borderColor: 'var(--mf-mist)' }}>
                    <div className="flex justify-between font-semibold">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--mf-graphite)' }}>
                      <span>Delivery</span>
                      <span>{cartTotal >= freeDeliveryThreshold ? 'FREE' : 'Calculated at checkout'}</span>
                    </div>
                  </div>
                  <div className="border-t pt-3" style={{ borderColor: 'var(--mf-mist)' }}>
                    <div className="flex justify-between font-extrabold text-lg">
                      <span>Total</span>
                      <span style={{ color: 'var(--mf-cobalt)' }}>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  {/* WhatsApp primary CTA */}
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-full text-white font-bold text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <MessageCircle size={18} />
                    Order on WhatsApp →
                  </button>
                  <p className="text-xs text-center" style={{ color: 'var(--mf-graphite)' }}>
                    Fast, easy — get order confirmation in minutes
                  </p>
                </div>

                <div className="mt-4 p-3 rounded-xl text-xs text-center" style={{ backgroundColor: 'var(--mf-mint-soft)', color: '#0F766E' }}>
                  🔒 100% Money-Back Guarantee · BCSIR Lab Tested
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
