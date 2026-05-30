/* Lightweight dataLayer push helper for GA4 / GTM / Meta Pixel.
   Safe to call on the client; no-ops on the server. */

type AnalyticsParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: AnalyticsParams[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function trackBeginCheckout(value: number, itemCount: number): void {
  track('begin_checkout', { currency: 'BDT', value, item_count: itemCount });
}

export function trackPurchase(order: {
  orderId: string;
  value: number;
  delivery: number;
  itemCount: number;
  paymentMethod: string;
}): void {
  track('purchase', {
    currency: 'BDT',
    transaction_id: order.orderId,
    value: order.value,
    shipping: order.delivery,
    item_count: order.itemCount,
    payment_method: order.paymentMethod,
  });
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', { currency: 'BDT', value: order.value });
  }
}

export function trackWhatsAppOrder(value: number): void {
  track('whatsapp_order_clicked', { currency: 'BDT', value });
}
