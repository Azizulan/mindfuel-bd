'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ChevronDown, ChevronUp, Lock, ShieldCheck, Truck, MessageCircle,
  Banknote, Smartphone, Check, ArrowLeft,
} from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import ProductImage from '@/components/ui/ProductImage';
import { useCart } from '@/store/cart';
import { useOrder, generateOrderId, type PaymentMethod, type DeliveryZone } from '@/store/order';
import { formatPrice, buildWhatsAppMessage } from '@/lib/utils';
import { trackBeginCheckout, trackPurchase, trackWhatsAppOrder } from '@/lib/analytics';
import { deliveryFee, ZONE_LABELS, ZONE_ETA, PAYMENT_NUMBERS, FREE_DELIVERY_THRESHOLD } from '@/lib/checkout';

const schema = z
  .object({
    name: z.string().min(2, 'Please enter your full name'),
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, 'Enter a valid 11-digit number (e.g. 01712345678)'),
    zone: z.enum(['dhaka-inside', 'dhaka-outside']),
    address: z.string().min(10, 'Please enter your full delivery address'),
    notes: z.string().optional(),
    paymentMethod: z.enum(['cod', 'bkash', 'nagad']),
    trxId: z.string().optional(),
  })
  .refine((d) => d.paymentMethod === 'cod' || (d.trxId && d.trxId.trim().length >= 6), {
    message: 'Enter the transaction ID after sending payment',
    path: ['trxId'],
  });

type FormValues = z.infer<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, itemCount, clearCart } = useCart();
  const setOrder = useOrder((s) => s.setOrder);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '8801XXXXXXXXX';

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const placedRef = useRef(false);

  const subtotal = total();

  const {
    register, handleSubmit, watch, formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { zone: 'dhaka-inside', paymentMethod: 'cod' },
  });

  const zone = watch('zone') as DeliveryZone;
  const paymentMethod = watch('paymentMethod') as PaymentMethod;
  const delivery = useMemo(() => deliveryFee(subtotal, zone), [subtotal, zone]);
  const grandTotal = subtotal + delivery;

  useEffect(() => { setMounted(true); }, []);

  // Redirect to cart if empty (after mount so persisted cart hydrates).
  // Skip when we've just placed an order — that flow clears the cart on purpose
  // and navigates to /thank-you.
  useEffect(() => {
    if (mounted && items.length === 0 && !placedRef.current) router.replace('/cart');
  }, [mounted, items.length, router]);

  useEffect(() => {
    if (mounted && items.length > 0) trackBeginCheckout(subtotal, itemCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  if (!mounted || items.length === 0) {
    return (
      <SiteLayout>
        <div className="section-py text-center">
          <p style={{ color: 'var(--mf-graphite)' }}>Loading your cart…</p>
        </div>
      </SiteLayout>
    );
  }

  const onSubmit = (data: FormValues) => {
    setSubmitting(true);
    placedRef.current = true;
    const order = {
      orderId: generateOrderId(),
      createdAt: new Date().toISOString(),
      items,
      customer: { name: data.name, phone: data.phone, address: data.address, zone: data.zone, notes: data.notes },
      paymentMethod: data.paymentMethod,
      trxId: data.trxId,
      subtotal,
      delivery,
      total: grandTotal,
    };

    // Fire-and-forget webhook (if configured)
    const endpoint = process.env.NEXT_PUBLIC_WEBHOOK_ORDER_ENDPOINT;
    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      }).catch(() => {});
    }

    trackPurchase({
      orderId: order.orderId,
      value: grandTotal,
      delivery,
      itemCount: itemCount(),
      paymentMethod: data.paymentMethod,
    });

    setOrder(order);
    clearCart();
    router.push('/thank-you');
  };

  const handleWhatsApp = () => {
    const waItems = items.map((i) => ({ name: `${i.name} (${i.variantLabel})`, qty: i.qty, total: i.price * i.qty }));
    trackWhatsAppOrder(grandTotal);
    window.open(`https://wa.me/${waNumber}?text=${buildWhatsAppMessage(waItems)}`, '_blank');
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl text-base bg-white border outline-none transition-colors';
  const inputStyle = { borderColor: 'var(--mf-mist)' } as React.CSSProperties;

  return (
    <SiteLayout>
      <div className="section-py pb-36 lg:pb-20">
        <div className="container-mf max-w-5xl">
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm font-bold mb-4" style={{ color: 'var(--mf-brown)' }}>
            <ArrowLeft size={16} /> Back to cart
          </Link>
          <h1 className="text-h2 mb-6">Checkout</h1>

          {/* Collapsible order summary — mobile first */}
          <button
            onClick={() => setSummaryOpen((o) => !o)}
            className="lg:hidden w-full flex items-center justify-between p-4 rounded-2xl mb-4 cursor-pointer"
            style={{ backgroundColor: 'var(--mf-cream)', border: '1px solid var(--mf-mist)' }}
            aria-expanded={summaryOpen}
          >
            <span className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--mf-brown)' }}>
              {summaryOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              {summaryOpen ? 'Hide' : 'Show'} order summary
            </span>
            <span className="font-display text-xl" style={{ color: 'var(--mf-brown)' }}>{formatPrice(grandTotal)}</span>
          </button>

          {summaryOpen && (
            <div className="lg:hidden mb-6">
              <OrderSummary items={items} subtotal={subtotal} delivery={delivery} grandTotal={grandTotal} zone={zone} />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
            {/* LEFT — form */}
            <div className="flex flex-col gap-6">
              {/* Contact */}
              <section className="p-5 rounded-2xl bg-white" style={{ border: '1px solid var(--mf-mist)' }}>
                <h2 className="text-h3 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-extrabold text-white shrink-0" style={{ backgroundColor: 'var(--mf-brown)' }}>1</span>
                  Contact
                </h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-1.5">Full name</label>
                    <input id="name" {...register('name')} className={inputClass} style={inputStyle} placeholder="e.g. Rumana Akter" autoComplete="name" />
                    {errors.name && <p className="text-xs mt-1 font-medium" style={{ color: 'var(--mf-danger)' }}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold mb-1.5">Phone (for delivery)</label>
                    <input
                      id="phone" {...register('phone')} className={inputClass} style={inputStyle}
                      placeholder="01712345678" type="tel" inputMode="numeric" autoComplete="tel" maxLength={11}
                    />
                    {errors.phone && <p className="text-xs mt-1 font-medium" style={{ color: 'var(--mf-danger)' }}>{errors.phone.message}</p>}
                  </div>
                </div>
              </section>

              {/* Delivery */}
              <section className="p-5 rounded-2xl bg-white" style={{ border: '1px solid var(--mf-mist)' }}>
                <h2 className="text-h3 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-extrabold text-white shrink-0" style={{ backgroundColor: 'var(--mf-brown)' }}>2</span>
                  Delivery
                </h2>
                <div className="flex flex-col gap-4">
                  {/* Zone — big tappable cards */}
                  <div>
                    <span className="block text-sm font-bold mb-2">Delivery area</span>
                    <div className="grid grid-cols-2 gap-3">
                      {(['dhaka-inside', 'dhaka-outside'] as DeliveryZone[]).map((z) => (
                        <label
                          key={z}
                          className="relative flex flex-col gap-1 p-4 rounded-xl border-2 cursor-pointer transition-all"
                          style={{ borderColor: zone === z ? 'var(--mf-brown)' : 'var(--mf-mist)', backgroundColor: zone === z ? 'var(--mf-cream)' : 'white' }}
                        >
                          <input type="radio" value={z} {...register('zone')} className="sr-only" />
                          <span className="font-bold text-sm" style={{ color: 'var(--mf-ink)' }}>{ZONE_LABELS[z]}</span>
                          <span className="text-xs" style={{ color: 'var(--mf-graphite)' }}>{ZONE_ETA[z]}</span>
                          <span className="text-xs font-bold mt-1" style={{ color: 'var(--mf-orange)' }}>
                            {subtotal >= FREE_DELIVERY_THRESHOLD ? 'FREE' : formatPrice(deliveryFee(0, z))}
                          </span>
                          {zone === z && (
                            <span className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--mf-brown)' }}>
                              <Check size={12} className="text-white" />
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-bold mb-1.5">Full address</label>
                    <textarea
                      id="address" {...register('address')} rows={3} className={inputClass} style={inputStyle}
                      placeholder="House / road / area, city, landmark…" autoComplete="street-address"
                    />
                    {errors.address && <p className="text-xs mt-1 font-medium" style={{ color: 'var(--mf-danger)' }}>{errors.address.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-bold mb-1.5">Order notes <span className="font-normal" style={{ color: 'var(--mf-graphite)' }}>(optional)</span></label>
                    <input id="notes" {...register('notes')} className={inputClass} style={inputStyle} placeholder="Any delivery instructions?" />
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="p-5 rounded-2xl bg-white" style={{ border: '1px solid var(--mf-mist)' }}>
                <h2 className="text-h3 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-extrabold text-white shrink-0" style={{ backgroundColor: 'var(--mf-brown)' }}>3</span>
                  Payment
                </h2>
                <div className="flex flex-col gap-3">
                  <PaymentOption value="cod" current={paymentMethod} register={register} icon={<Banknote size={20} />} title="Cash on Delivery" desc="Pay when your order arrives. Most popular." />
                  <PaymentOption value="bkash" current={paymentMethod} register={register} icon={<Smartphone size={20} />} title="bKash" desc={`Send Money to ${PAYMENT_NUMBERS.bkash}`} />
                  <PaymentOption value="nagad" current={paymentMethod} register={register} icon={<Smartphone size={20} />} title="Nagad" desc={`Send Money to ${PAYMENT_NUMBERS.nagad}`} />
                </div>

                {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                  <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--mf-amber-soft)' }}>
                    <p className="text-sm font-bold mb-2" style={{ color: 'var(--mf-espresso)' }}>
                      Send {formatPrice(grandTotal)} to {paymentMethod === 'bkash' ? PAYMENT_NUMBERS.bkash : PAYMENT_NUMBERS.nagad} ({paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} · Send Money)
                    </p>
                    <label htmlFor="trxId" className="block text-sm font-bold mb-1.5">Transaction ID (TrxID)</label>
                    <input id="trxId" {...register('trxId')} className={inputClass} style={inputStyle} placeholder="e.g. 9H7A2B1C4D" autoCapitalize="characters" />
                    {errors.trxId && <p className="text-xs mt-1 font-medium" style={{ color: 'var(--mf-danger)' }}>{errors.trxId.message}</p>}
                  </div>
                )}
              </section>

              {/* WhatsApp alt */}
              <button
                type="button" onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 py-3.5 rounded-full text-white font-bold text-sm transition-transform hover:scale-[1.01] cursor-pointer"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle size={18} /> Prefer to order on WhatsApp instead?
              </button>
            </div>

            {/* RIGHT — sticky summary (desktop) */}
            <div className="hidden lg:block">
              <div className="lg:sticky lg:top-24">
                <OrderSummary items={items} subtotal={subtotal} delivery={delivery} grandTotal={grandTotal} zone={zone} />
                <button type="submit" disabled={submitting} className="btn-primary w-full mt-4 py-4 text-base disabled:opacity-60">
                  {submitting ? 'Placing order…' : `Place Order · ${formatPrice(grandTotal)}`}
                </button>
                <TrustStrip />
              </div>
            </div>

            {/* Mobile sticky place-order bar */}
            <div
              className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 border-t"
              style={{ backgroundColor: 'white', borderColor: 'var(--mf-mist)', boxShadow: '0 -4px 16px rgba(46,31,21,0.1)', paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  <p className="text-xs" style={{ color: 'var(--mf-graphite)' }}>Total</p>
                  <p className="font-display text-xl leading-none" style={{ color: 'var(--mf-brown)' }}>{formatPrice(grandTotal)}</p>
                </div>
                <button type="submit" disabled={submitting} className="btn-primary flex-1 py-3.5 text-base disabled:opacity-60">
                  {submitting ? 'Placing…' : 'Place Order'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
}

/* ---------- sub-components ---------- */

function PaymentOption({
  value, current, register, icon, title, desc,
}: {
  value: PaymentMethod;
  current: PaymentMethod;
  register: ReturnType<typeof useForm<FormValues>>['register'];
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  const active = current === value;
  return (
    <label
      className="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
      style={{ borderColor: active ? 'var(--mf-brown)' : 'var(--mf-mist)', backgroundColor: active ? 'var(--mf-cream)' : 'white' }}
    >
      <input type="radio" value={value} {...register('paymentMethod')} className="sr-only" />
      <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: active ? 'var(--mf-brown)' : 'var(--mf-mist)', color: active ? 'white' : 'var(--mf-graphite)' }}>
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-bold text-sm" style={{ color: 'var(--mf-ink)' }}>{title}</span>
        <span className="block text-xs" style={{ color: 'var(--mf-graphite)' }}>{desc}</span>
      </span>
      <span
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
        style={{ borderColor: active ? 'var(--mf-brown)' : 'var(--mf-mist)' }}
      >
        {active && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--mf-brown)' }} />}
      </span>
    </label>
  );
}

function OrderSummary({
  items, subtotal, delivery, grandTotal, zone,
}: {
  items: ReturnType<typeof useCart.getState>['items'];
  subtotal: number;
  delivery: number;
  grandTotal: number;
  zone: DeliveryZone;
}) {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--mf-cream)', border: '1px solid var(--mf-mist)' }}>
      <h2 className="text-h3 mb-4">Order Summary</h2>
      <div className="flex flex-col gap-3 mb-4">
        {items.map((item) => (
          <div key={item.variantSku} className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0" style={{ backgroundColor: 'white' }}>
              <ProductImage src={item.image} alt={item.name} fill className="object-cover" sizes="48px" fallbackText="MF" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[0.65rem] font-bold flex items-center justify-center text-white" style={{ backgroundColor: 'var(--mf-brown)' }}>
                {item.qty}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold leading-tight truncate" style={{ color: 'var(--mf-ink)' }}>{item.name}</p>
              <p className="text-xs" style={{ color: 'var(--mf-graphite)' }}>{item.variantLabel}</p>
            </div>
            <span className="text-sm font-bold shrink-0">{formatPrice(item.price * item.qty)}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 text-sm border-t pt-3" style={{ borderColor: 'var(--mf-mist)' }}>
        <div className="flex justify-between"><span style={{ color: 'var(--mf-graphite)' }}>Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between">
          <span style={{ color: 'var(--mf-graphite)' }}>Delivery ({ZONE_LABELS[zone]})</span>
          <span className="font-semibold" style={{ color: delivery === 0 ? 'var(--mf-green)' : 'var(--mf-ink)' }}>{delivery === 0 ? 'FREE' : formatPrice(delivery)}</span>
        </div>
      </div>
      <div className="flex justify-between items-center border-t mt-3 pt-3" style={{ borderColor: 'var(--mf-mist)' }}>
        <span className="font-bold">Total</span>
        <span className="font-display text-2xl" style={{ color: 'var(--mf-brown)' }}>{formatPrice(grandTotal)}</span>
      </div>
    </div>
  );
}

function TrustStrip() {
  return (
    <div className="mt-5 flex flex-col gap-2 text-xs" style={{ color: 'var(--mf-graphite)' }}>
      <span className="flex items-center gap-2"><Lock size={14} style={{ color: 'var(--mf-green)' }} /> Your details are private &amp; secure</span>
      <span className="flex items-center gap-2"><ShieldCheck size={14} style={{ color: 'var(--mf-green)' }} /> 100% money-back guarantee</span>
      <span className="flex items-center gap-2"><Truck size={14} style={{ color: 'var(--mf-green)' }} /> BCSIR lab-tested, ships in 24h</span>
    </div>
  );
}
