export type BilingualText = {
  en: string;
  bn: string;
};

export type Variant = {
  sku: string;
  label: BilingualText;
  size: string;
  price: number;
  comparePrice?: number;
  inStock: boolean;
  image?: string;
};

export type NutritionFacts = {
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
};

export type Benefit = {
  icon: string;
  label: BilingualText;
  description?: BilingualText;
};

export type ComparisonRow = {
  protein: string;
  addedSugar: boolean;
  palmOil: boolean;
  preservatives: boolean;
  labTested: boolean;
  pricePerGram: string;
};

export type FAQ = {
  question: BilingualText;
  answer: BilingualText;
};

export type Badge = {
  label: string;
  color: 'amber' | 'mint' | 'cobalt' | 'danger';
};

export type SeasonTag = 'summer' | 'monsoon' | 'winter' | 'ramadan' | 'always-on';

export type ProductCategory =
  | 'peanut-butter'
  | 'granola'
  | 'muesli'
  | 'nuts'
  | 'seeds'
  | 'functional-drink'
  | 'bundle';

export type Product = {
  slug: string;
  name: BilingualText;
  category: ProductCategory;
  tagline: BilingualText;
  shortDescription: BilingualText;
  longDescription: BilingualText;
  variants: Variant[];
  heroImage: string;
  galleryImages: string[];
  nutritionFacts: NutritionFacts;
  ingredients: { en: string[]; bn: string[] };
  allergens: string[];
  keyBenefits: Benefit[];
  comparisonRow: ComparisonRow;
  faqs: FAQ[];
  crossSellSlugs: string[];
  badges: Badge[];
  seasonalTags: SeasonTag[];
  rating: number;
  reviewCount: number;
};

export type CartItem = {
  productSlug: string;
  variantSku: string;
  name: string;
  variantLabel: string;
  price: number;
  qty: number;
  image: string;
};

export type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (sku: string) => void;
  updateQty: (sku: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
};

export type BuildBoxState = {
  stackSize: 1 | 3 | 6;
  freeGiftId: string | null;
  selectedVariants: { sku: string; qty: number }[];
  isSubscription: boolean;
  setStackSize: (size: 1 | 3 | 6) => void;
  setFreeGift: (id: string) => void;
  setVariantQty: (sku: string, qty: number) => void;
  toggleSubscription: () => void;
  totalSelected: () => number;
};

export type FreeGift = {
  id: string;
  label: BilingualText;
  image: string;
  inStock: boolean;
};

export type Review = {
  id: string;
  productSlug: string;
  customerName: string;
  location: string;
  rating: number;
  date: string;
  body: string;
  bodyBn?: string;
  verified: boolean;
  helpful: number;
  photo?: string;
};
