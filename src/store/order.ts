import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@/types';

export type PaymentMethod = 'cod' | 'bkash' | 'nagad';
export type DeliveryZone = 'dhaka-inside' | 'dhaka-outside';

export interface CompletedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    address: string;
    zone: DeliveryZone;
    notes?: string;
  };
  paymentMethod: PaymentMethod;
  trxId?: string;
  subtotal: number;
  delivery: number;
  total: number;
}

interface OrderStore {
  lastOrder: CompletedOrder | null;
  setOrder: (order: CompletedOrder) => void;
  clearOrder: () => void;
}

export const useOrder = create<OrderStore>()(
  persist(
    (set) => ({
      lastOrder: null,
      setOrder: (order) => set({ lastOrder: order }),
      clearOrder: () => set({ lastOrder: null }),
    }),
    {
      name: 'mindfuel-last-order',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.sessionStorage : (undefined as unknown as Storage)
      ),
    }
  )
);

export function generateOrderId(): string {
  const date = new Date();
  const ymd = `${date.getFullYear().toString().slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `MF${ymd}-${rand}`;
}
