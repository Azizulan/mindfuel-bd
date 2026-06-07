import type { DeliveryZone } from '@/store/order';

/* === Buy-more-and-save tiers (no subscription — not popular in BD) ===
   Edit these to change the quantity discounts shown on every product page. */
export type BuyTier = { qty: number; off: number; label: string };

export const BUY_TIERS: BuyTier[] = [
  { qty: 1, off: 0, label: 'Single jar' },
  { qty: 2, off: 10, label: 'Buy 2 — save 10%' },
  { qty: 3, off: 15, label: 'Buy 3 — save 15%' },
];

/** Discounted unit price for a given tier. */
export function tierUnitPrice(basePrice: number, off: number): number {
  return Math.round(basePrice * (1 - off / 100));
}

/* === BD delivery rules — edit these to change pricing site-wide === */
export const FREE_DELIVERY_THRESHOLD = 1500;

export const DELIVERY_FEES: Record<DeliveryZone, number> = {
  'dhaka-inside': 60,
  'dhaka-outside': 120,
};

export const ZONE_LABELS: Record<DeliveryZone, string> = {
  'dhaka-inside': 'Inside Dhaka',
  'dhaka-outside': 'Outside Dhaka',
};

export const ZONE_ETA: Record<DeliveryZone, string> = {
  'dhaka-inside': '24–48 hours',
  'dhaka-outside': '2–4 business days',
};

/** Returns delivery fee after applying the free-delivery threshold. */
export function deliveryFee(subtotal: number, zone: DeliveryZone): number {
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
  return DELIVERY_FEES[zone];
}

/** bKash / Nagad merchant numbers (configurable via env). */
export const PAYMENT_NUMBERS = {
  bkash: process.env.NEXT_PUBLIC_BKASH_NUMBER || '01XXXXXXXXX',
  nagad: process.env.NEXT_PUBLIC_NAGAD_NUMBER || '01XXXXXXXXX',
};
