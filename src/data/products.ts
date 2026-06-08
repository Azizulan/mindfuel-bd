import 'server-only';
import type { Product } from '@/types';
import { getPayloadClient, payloadDocToProduct } from '@/lib/payload';

/* All product reads now come from Payload (the CMS is the source of truth).
   These run on the server at build/request time and map docs to the
   storefront Product type, so storefront components stay unchanged. */

export async function getAllProducts(): Promise<Product[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({ collection: 'products', limit: 200, depth: 1, sort: 'createdAt' });
  return res.docs.map(payloadDocToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const payload = await getPayloadClient();
  const res = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1, depth: 1 });
  const doc = res.docs[0];
  return doc ? payloadDocToProduct(doc) : undefined;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({ collection: 'products', where: { category: { equals: category } }, limit: 200, depth: 1 });
  return res.docs.map(payloadDocToProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.badges.some((b) => b.label === 'Best Seller' || b.label === 'Summer Hero'));
}

export async function getCrossSellProducts(slugs: string[]): Promise<Product[]> {
  if (!slugs.length) return [];
  const payload = await getPayloadClient();
  const res = await payload.find({ collection: 'products', where: { slug: { in: slugs } }, limit: 50, depth: 1 });
  // preserve requested order
  const bySlug = new Map(res.docs.map((d) => [d.slug as string, payloadDocToProduct(d)]));
  return slugs.map((s) => bySlug.get(s)).filter((p): p is Product => Boolean(p));
}

/** All flavours in the same flavour line (incl. the product itself). Pure — pass the full list in. */
export function getFlavorSiblings(allProducts: Product[], product: Product): Product[] {
  if (!product.flavorGroup) return [];
  const group = allProducts.filter((p) => p.flavorGroup === product.flavorGroup);
  return group.length > 1 ? group : [];
}
