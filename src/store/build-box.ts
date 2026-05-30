import { create } from 'zustand';

interface VariantQty {
  sku: string;
  qty: number;
}

interface BuildBoxStore {
  stackSize: 1 | 3 | 6;
  freeGiftId: string | null;
  selectedVariants: VariantQty[];
  isSubscription: boolean;
  setStackSize: (size: 1 | 3 | 6) => void;
  setFreeGift: (id: string) => void;
  setVariantQty: (sku: string, qty: number) => void;
  toggleSubscription: () => void;
  totalSelected: () => number;
  reset: () => void;
}

export const useBuildBox = create<BuildBoxStore>((set, get) => ({
  stackSize: 3,
  freeGiftId: null,
  selectedVariants: [],
  isSubscription: false,

  setStackSize: (size) => set({ stackSize: size, selectedVariants: [] }),

  setFreeGift: (id) => set({ freeGiftId: id }),

  setVariantQty: (sku, qty) => {
    set((state) => {
      const existing = state.selectedVariants.find((v) => v.sku === sku);
      if (existing) {
        if (qty === 0) {
          return {
            selectedVariants: state.selectedVariants.filter((v) => v.sku !== sku),
          };
        }
        return {
          selectedVariants: state.selectedVariants.map((v) =>
            v.sku === sku ? { ...v, qty } : v
          ),
        };
      }
      if (qty > 0) {
        return {
          selectedVariants: [...state.selectedVariants, { sku, qty }],
        };
      }
      return state;
    });
  },

  toggleSubscription: () =>
    set((state) => ({ isSubscription: !state.isSubscription })),

  totalSelected: () => {
    return get().selectedVariants.reduce((sum, v) => sum + v.qty, 0);
  },

  reset: () =>
    set({
      stackSize: 3,
      freeGiftId: null,
      selectedVariants: [],
      isSubscription: false,
    }),
}));
