/* Seed Payload Products via the REST API of the running dev server.
   Run:  npx tsx src/seed-rest.ts
   Env:  SEED_URL (default http://localhost:3200), SEED_EMAIL, SEED_PASSWORD */

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as productsModule from './data/products';

const BASE = process.env.SEED_URL || 'http://localhost:3200';
const EMAIL = process.env.SEED_EMAIL || 'admin@mindfuel.bd';
const PASSWORD = process.env.SEED_PASSWORD || 'MindFuel2026!';

const mod = productsModule as any;
const products: any[] = (mod.default?.products ?? mod.products) as any[];

function mapProduct(p: any) {
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    flavorGroup: p.flavorGroup,
    flavorName: p.flavorName,
    flavorColor: p.flavorColor,
    tagline: p.tagline,
    shortDescription: p.shortDescription,
    longDescription: p.longDescription,
    rating: p.rating,
    reviewCount: p.reviewCount,
    heroImage: p.heroImage,
    galleryImages: (p.galleryImages ?? []).map((url: string) => ({ url })),
    variants: (p.variants ?? []).map((v: any) => ({
      sku: v.sku,
      label: v.label,
      size: v.size,
      price: v.price,
      comparePrice: v.comparePrice,
      inStock: v.inStock,
    })),
    badges: (p.badges ?? []).map((b: any) => ({ label: b.label, color: b.color })),
    seasonalTags: p.seasonalTags ?? [],
    crossSellSlugs: (p.crossSellSlugs ?? []).map((slug: string) => ({ slug })),
    allergens: (p.allergens ?? []).map((name: string) => ({ name })),
    keyBenefits: (p.keyBenefits ?? []).map((b: any) => ({ icon: b.icon, label: b.label })),
    faqs: (p.faqs ?? []).map((f: any) => ({ question: f.question, answer: f.answer })),
    ingredients: p.ingredients
      ? {
          en: (p.ingredients.en ?? []).map((item: string) => ({ item })),
          bn: (p.ingredients.bn ?? []).map((item: string) => ({ item })),
        }
      : undefined,
    nutritionFacts: p.nutritionFacts,
    comparisonRow: p.comparisonRow,
  };
}

async function main() {
  if (!products?.length) throw new Error('No products found in data module');

  // 1. Log in
  const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.status} ${await loginRes.text()}`);
  const { token } = await loginRes.json();
  const auth = { Authorization: `JWT ${token}`, 'Content-Type': 'application/json' };

  // 2. Find existing slugs to avoid duplicates
  const existingRes = await fetch(`${BASE}/api/products?limit=200&depth=0`, { headers: auth });
  const existing = await existingRes.json();
  const existingSlugs = new Set((existing.docs ?? []).map((d: any) => d.slug));

  // 3. Create each product
  let created = 0, skipped = 0;
  for (const p of products) {
    if (existingSlugs.has(p.slug)) { skipped++; continue; }
    const res = await fetch(`${BASE}/api/products`, {
      method: 'POST',
      headers: auth,
      body: JSON.stringify(mapProduct(p)),
    });
    if (res.ok) {
      created++;
      console.log(`  ✓ ${p.slug}`);
    } else {
      console.log(`  ✗ ${p.slug} — ${res.status} ${(await res.text()).slice(0, 200)}`);
    }
  }
  console.log(`\nDone. Created ${created}, skipped ${skipped} (already existed).`);
}

main().catch((e) => { console.error(e); process.exit(1); });
