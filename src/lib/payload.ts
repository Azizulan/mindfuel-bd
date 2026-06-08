import 'server-only';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { Product } from '@/types';

/* Memoised Payload Local API client (server-only). */
let cached: ReturnType<typeof getPayload> | null = null;
export function getPayloadClient() {
  if (!cached) cached = getPayload({ config });
  return cached;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Map a Payload `products` document back into the storefront `Product` shape. */
export function payloadDocToProduct(doc: any): Product {
  return {
    slug: doc.slug,
    name: doc.name ?? { en: '', bn: '' },
    category: doc.category,
    flavorGroup: doc.flavorGroup || undefined,
    flavorName: doc.flavorName?.en || doc.flavorName?.bn ? doc.flavorName : undefined,
    flavorColor: doc.flavorColor || undefined,
    tagline: doc.tagline ?? { en: '', bn: '' },
    shortDescription: doc.shortDescription ?? { en: '', bn: '' },
    longDescription: doc.longDescription ?? { en: '', bn: '' },
    variants: (doc.variants ?? []).map((v: any) => ({
      sku: v.sku,
      label: v.label ?? { en: v.size, bn: v.size },
      size: v.size,
      price: v.price,
      comparePrice: v.comparePrice ?? undefined,
      inStock: v.inStock ?? true,
    })),
    heroImage: doc.heroImage || '',
    galleryImages: (doc.galleryImages ?? []).map((g: any) => g.url).filter(Boolean),
    nutritionFacts: doc.nutritionFacts ?? {
      servingSize: '', calories: 0, protein: 0, carbs: 0, fat: 0,
    },
    ingredients: {
      en: (doc.ingredients?.en ?? []).map((i: any) => i.item).filter(Boolean),
      bn: (doc.ingredients?.bn ?? []).map((i: any) => i.item).filter(Boolean),
    },
    allergens: (doc.allergens ?? []).map((a: any) => a.name).filter(Boolean),
    keyBenefits: (doc.keyBenefits ?? []).map((b: any) => ({ icon: b.icon, label: b.label })),
    comparisonRow: doc.comparisonRow ?? {
      protein: '', addedSugar: false, palmOil: false, preservatives: false, labTested: true, pricePerGram: '',
    },
    faqs: (doc.faqs ?? []).map((f: any) => ({ question: f.question, answer: f.answer })),
    crossSellSlugs: (doc.crossSellSlugs ?? []).map((c: any) => c.slug).filter(Boolean),
    badges: (doc.badges ?? []).map((b: any) => ({ label: b.label, color: b.color })),
    seasonalTags: doc.seasonalTags ?? [],
    rating: doc.rating ?? 0,
    reviewCount: doc.reviewCount ?? 0,
  };
}
