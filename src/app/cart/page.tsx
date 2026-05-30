'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { useCart } from '@/store/cart';
import { formatPrice, buildWhatsAppMessage } from '@/lib/utils';

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
    return (
      <SiteLayout>
        <div className="section-py flex flex-col items-center justify-center min-h-96">
          <ShoppingBag size={48} style={{ color: 'var(--mf-mist)' }} className="mb-4" />
          <h2 className="text-h2 mb-2">Your stack is empty.</h2>
          <p className="text-base mb-6" style={{ color: 'var(--mf-graphite)' }}>
            Let&apos;s build it with real food.
          </p>
          <Link href="/shop" className="btn-primary">Browse Products →</Link>
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
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/80x80/E2E8F0/334155?text=MF`;
                      }}
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
