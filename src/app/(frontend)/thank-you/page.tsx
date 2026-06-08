'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, Package, Truck, Phone, MessageCircle, Copy, ShoppingBag,
} from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import ProductImage from '@/components/ui/ProductImage';
import { useOrder } from '@/store/order';
import { formatPrice } from '@/lib/utils';
import { ZONE_LABELS, ZONE_ETA } from '@/lib/checkout';

const PAYMENT_LABELS: Record<string, string> = {
  cod: 'Cash on Delivery',
  bkash: 'bKash',
  nagad: 'Nagad',
};

export default function ThankYouPage() {
  const order = useOrder((s) => s.lastOrder);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '8801XXXXXXXXX';

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <SiteLayout>
        <div className="section-py text-center"><p style={{ color: 'var(--mf-graphite)' }}>Loading…</p></div>
      </SiteLayout>
    );
  }

  /* No order in session — graceful fallback */
  if (!order) {
    return (
      <SiteLayout>
        <div className="section-py">
          <div className="container-mf max-w-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5" style={{ backgroundColor: 'var(--mf-cream)', color: 'var(--mf-brown)' }}>
              <ShoppingBag size={28} />
            </div>
            <h1 className="text-h2 mb-2">No recent order found</h1>
            <p className="text-base mb-6" style={{ color: 'var(--mf-graphite)' }}>
              Looks like there&apos;s nothing to show here yet. Let&apos;s fix that.
            </p>
            <Link href="/shop" className="btn-primary">Start Shopping</Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const copyOrderId = () => {
    navigator.clipboard?.writeText(order.orderId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const steps = [
    { icon: <CheckCircle2 size={18} />, label: 'Order placed', done: true },
    { icon: <Phone size={18} />, label: 'We call to confirm', done: false },
    { icon: <Package size={18} />, label: 'Packed & shipped', done: false },
    { icon: <Truck size={18} />, label: `Delivered (${ZONE_ETA[order.customer.zone]})`, done: false },
  ];

  return (
    <SiteLayout>
      <div className="section-py">
        <div className="container-mf max-w-2xl">
          {/* Confirmation header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: 'var(--mf-green-soft)' }}>
              <CheckCircle2 size={40} style={{ color: 'var(--mf-green)' }} />
            </div>
            <h1 className="font-display mb-2" style={{ color: 'var(--mf-espresso)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              ORDER CONFIRMED!
            </h1>
            <p className="text-base" style={{ color: 'var(--mf-graphite)' }}>
              Thank you, {order.customer.name.split(' ')[0]}! We&apos;ve received your order and will call{' '}
              <span className="font-semibold" style={{ color: 'var(--mf-ink)' }}>{order.customer.phone}</span> shortly to confirm.
            </p>
            <p className="font-bn text-sm mt-2" style={{ color: 'var(--mf-graphite)' }}>
              ধন্যবাদ! আপনার অর্ডার পেয়েছি — শীঘ্রই কনফার্ম করতে কল করব।
            </p>
          </div>

          {/* Order number */}
          <div className="flex items-center justify-between gap-3 p-4 rounded-2xl mb-6" style={{ backgroundColor: 'var(--mf-cream)', border: '1px solid var(--mf-mist)' }}>
            <div>
              <p className="text-xs" style={{ color: 'var(--mf-graphite)' }}>Order number</p>
              <p className="font-display text-xl" style={{ color: 'var(--mf-brown)' }}>{order.orderId}</p>
            </div>
            <button onClick={copyOrderId} className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold cursor-pointer transition-colors" style={{ backgroundColor: 'white', color: 'var(--mf-brown)', border: '1px solid var(--mf-mist)' }}>
              <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Progress steps */}
          <div className="p-5 rounded-2xl mb-6 bg-white" style={{ border: '1px solid var(--mf-mist)' }}>
            <h2 className="text-h3 mb-4">What happens next</h2>
            <div className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: step.done ? 'var(--mf-green)' : 'var(--mf-mist)', color: step.done ? 'white' : 'var(--mf-graphite)' }}
                  >
                    {step.icon}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: step.done ? 'var(--mf-ink)' : 'var(--mf-graphite)' }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Order details */}
          <div className="p-5 rounded-2xl mb-6 bg-white" style={{ border: '1px solid var(--mf-mist)' }}>
            <h2 className="text-h3 mb-4">Order details</h2>
            <div className="flex flex-col gap-3 mb-4">
              {order.items.map((item) => (
                <div key={item.variantSku} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0" style={{ backgroundColor: 'var(--mf-cream)' }}>
                    <ProductImage src={item.image} alt={item.name} fill className="object-cover" sizes="48px" fallbackText="MF" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold leading-tight truncate" style={{ color: 'var(--mf-ink)' }}>{item.name}</p>
                    <p className="text-xs" style={{ color: 'var(--mf-graphite)' }}>{item.variantLabel} × {item.qty}</p>
                  </div>
                  <span className="text-sm font-bold shrink-0">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-sm border-t pt-3" style={{ borderColor: 'var(--mf-mist)' }}>
              <div className="flex justify-between"><span style={{ color: 'var(--mf-graphite)' }}>Subtotal</span><span className="font-semibold">{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between"><span style={{ color: 'var(--mf-graphite)' }}>Delivery</span><span className="font-semibold" style={{ color: order.delivery === 0 ? 'var(--mf-green)' : 'var(--mf-ink)' }}>{order.delivery === 0 ? 'FREE' : formatPrice(order.delivery)}</span></div>
              <div className="flex justify-between"><span style={{ color: 'var(--mf-graphite)' }}>Payment</span><span className="font-semibold">{PAYMENT_LABELS[order.paymentMethod]}{order.trxId ? ` · ${order.trxId}` : ''}</span></div>
            </div>
            <div className="flex justify-between items-center border-t mt-3 pt-3" style={{ borderColor: 'var(--mf-mist)' }}>
              <span className="font-bold">Total</span>
              <span className="font-display text-2xl" style={{ color: 'var(--mf-brown)' }}>{formatPrice(order.total)}</span>
            </div>

            {/* Delivery address */}
            <div className="mt-4 pt-4 border-t text-sm" style={{ borderColor: 'var(--mf-mist)' }}>
              <p className="font-bold mb-1">Delivering to</p>
              <p style={{ color: 'var(--mf-graphite)' }}>{order.customer.name} · {order.customer.phone}</p>
              <p style={{ color: 'var(--mf-graphite)' }}>{order.customer.address}</p>
              <p style={{ color: 'var(--mf-graphite)' }}>{ZONE_LABELS[order.customer.zone]}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi MINDFUEL! My order ${order.orderId} — I have a question.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-white font-bold text-sm transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle size={18} /> Questions? Chat on WhatsApp
            </a>
            <Link href="/shop" className="btn-secondary flex-1 justify-center py-3.5">
              Continue Shopping
            </Link>
          </div>

          <p className="text-center text-xs mt-6" style={{ color: 'var(--mf-graphite)' }}>
            A confirmation has been saved. Keep your order number handy for any questions.
          </p>
        </div>
      </div>
    </SiteLayout>
  );
}
