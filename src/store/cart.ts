import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (sku: string) => void;
  updateQty: (sku: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.variantSku === item.variantSku);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantSku === item.variantSku
                  ? { ...i, qty: i.qty + item.qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (sku) => {
        set((state) => ({
          items: state.items.filter((i) => i.variantSku !== sku),
        }));
      },

      updateQty: (sku, qty) => {
        if (qty <= 0) {
          get().removeItem(sku);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.variantSku === sku ? { ...i, qty } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      total: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.qty, 0);
      },

      itemCount: () => {
        return get().items.reduce((sum, item) => sum + item.qty, 0);
      },
    }),
    {
      name: 'mindfuel-cart',
    }
  )
);
