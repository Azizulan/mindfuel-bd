'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, AlertCircle, Check, ShoppingBag } from 'lucide-react';
import type { Product, Variant } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/store/cart';
import { getFlavorSiblings } from '@/data/products';
import { BUY_TIERS, tierUnitPrice } from '@/lib/checkout';

interface Props {
  product: Product;
}

export default function ProductHero({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants.find((v) => v.inStock) ?? product.variants[0]
  );
  const [tierQty, setTierQty] = useState<number>(1);
  const [mainImage, setMainImage] = useState(product.heroImage);
  const addItem = useCart((s) => s.addItem);

  const siblings = getFlavorSiblings(product);
  const activeTier = BUY_TIERS.find((t) => t.qty === tierQty) ?? BUY_TIERS[0];
  const unitPrice = tierUnitPrice(selectedVariant.price, activeTier.off);
  const lineTotal = unitPrice * activeTier.qty;
  const savings = selectedVariant.comparePrice
    ? Math.round(((selectedVariant.comparePrice - selectedVariant.price) / selectedVariant.comparePrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      productSlug: product.slug,
      variantSku: selectedVariant.sku,
      name: product.name.en,
      variantLabel: selectedVariant.label.en,
      price: unitPrice,
      qty: activeTier.qty,
      image: product.heroImage,
    });
  };

  const TitleBlock = ({ className = '' }: { className?: string }) => (
    <div className={className}>
      <span className="text-label text-xs" style={{ color: 'var(--mf-orange)' }}>
        {product.category.replace(/-/g, ' ').toUpperCase()}
      </span>
      <h1 className="font-display mt-1.5" style={{ color: 'var(--mf-espresso)', fontSize: 'clamp(1.75rem, 7vw, 3.5rem)', lineHeight: 1.02 }}>
        {product.name.en}
      </h1>
      <p className="font-bn text-base mt-1" style={{ color: 'var(--mf-graphite)' }}>{product.name.bn}</p>
      <div className="flex items-center gap-2 mt-2.5">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={15} style={{ color: 'var(--mf-orange)', fill: i < Math.floor(product.rating) ? 'var(--mf-orange)' : 'none' }} />
          ))}
        </div>
        <span className="text-sm font-bold">{product.rating}</span>
        <Link href="#reviews" className="text-sm underline" style={{ color: 'var(--mf-graphite)' }}>
          {product.reviewCount.toLocaleString()} reviews
        </Link>
      </div>
    </div>
  );

  return (
    <section className="pt-3 pb-8 lg:py-16">
      <div className="container-mf">
        <div className="lg:grid lg:grid-cols-2 lg:gap-14 lg:items-start">
          <TitleBlock className="lg:hidden mb-3" />

          {/* Image */}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--mf-cream)' }}>
              <Image
                src={mainImage}
                alt={product.name.en}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/600x600/FBF5E9/4A3122?text=${encodeURIComponent(product.name.en)}`; }}
              />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.badges.map((badge) => (
                  <span key={badge.label} className="badge" style={{
                    backgroundColor: badge.color === 'amber' ? 'var(--mf-yellow)' : badge.color === 'mint' ? 'var(--mf-blue)' : badge.color === 'danger' ? 'var(--mf-danger)' : 'var(--mf-brown)',
                    color: badge.color === 'amber' ? 'var(--mf-espresso)' : badge.color === 'mint' ? '#1C4A54' : 'white',
                  }}>{badge.label}</span>
                ))}
              </div>
            </div>
            {product.galleryImages.length > 0 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {[product.heroImage, ...product.galleryImages].map((img, i) => (
                  <button key={i} onClick={() => setMainImage(img)}
                    className="shrink-0 w-14 h-14 lg:w-20 lg:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer"
                    style={{ borderColor: mainImage === img ? 'var(--mf-brown)' : 'var(--mf-mist)' }} aria-label={`View image ${i + 1}`}>
                    <Image src={img} alt="" width={80} height={80} className="object-cover w-full h-full"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/FBF5E9/4A3122?text=MF'; }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buy box */}
          <div className="flex flex-col gap-4 mt-5 lg:mt-0">
            <TitleBlock className="hidden lg:block" />

            {/* Flavour swatches */}
            {siblings.length > 1 && (
              <div>
                <p className="text-sm font-bold mb-2" style={{ color: 'var(--mf-graphite)' }}>
                  Flavour: <span style={{ color: 'var(--mf-espresso)' }}>{product.flavorName?.en}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {siblings.map((s) => {
                    const isActive = s.slug === product.slug;
                    return (
                      <Link
                        key={s.slug}
                        href={`/products/${s.slug}`}
                        scroll={false}
                        title={s.flavorName?.en}
                        aria-label={s.flavorName?.en}
                        className="relative w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                        style={{
                          backgroundColor: s.flavorColor ?? 'var(--mf-mist)',
                          outline: isActive ? '2.5px solid var(--mf-espresso)' : '2px solid var(--mf-mist)',
                          outlineOffset: '2px',
                        }}
                      >
                        {isActive && <Check size={18} style={{ color: 'white', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))' }} />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.variants.length > 1 && (
              <div>
                <p className="text-sm font-bold mb-2" style={{ color: 'var(--mf-graphite)' }}>Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button key={v.sku} onClick={() => setSelectedVariant(v)} disabled={!v.inStock}
                      className="px-4 py-2.5 rounded-full text-sm font-bold border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      style={{
                        borderColor: selectedVariant.sku === v.sku ? 'var(--mf-brown)' : 'var(--mf-mist)',
                        backgroundColor: selectedVariant.sku === v.sku ? 'var(--mf-brown)' : 'transparent',
                        color: selectedVariant.sku === v.sku ? 'white' : 'var(--mf-ink)',
                      }}>
                      {v.label.en}{!v.inStock && ' (Out)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Buy-more-and-save tiers */}
            <div>
              <p className="text-sm font-bold mb-2" style={{ color: 'var(--mf-graphite)' }}>Buy more, save more</p>
              <div className="grid grid-cols-3 gap-2">
                {BUY_TIERS.map((tier) => {
                  const isActive = tier.qty === tierQty;
                  const tUnit = tierUnitPrice(selectedVariant.price, tier.off);
                  return (
                    <button key={tier.qty} onClick={() => setTierQty(tier.qty)}
                      className="relative flex flex-col items-center gap-0.5 p-3 rounded-xl border-2 transition-all cursor-pointer"
                      style={{
                        borderColor: isActive ? 'var(--mf-brown)' : 'var(--mf-mist)',
                        backgroundColor: isActive ? 'var(--mf-cream)' : 'white',
                      }}>
                      {tier.off > 0 && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[0.6rem] font-extrabold whitespace-nowrap"
                          style={{ backgroundColor: 'var(--mf-green)', color: 'white' }}>
                          SAVE {tier.off}%
                        </span>
                      )}
                      <span className="font-display text-lg" style={{ color: 'var(--mf-espresso)' }}>{tier.qty === 1 ? '1 Jar' : `${tier.qty} Jars`}</span>
                      <span className="text-xs font-bold" style={{ color: isActive ? 'var(--mf-orange)' : 'var(--mf-graphite)' }}>
                        {formatPrice(tUnit)}/jar
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price + stock */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-display text-3xl" style={{ color: 'var(--mf-brown)' }}>{formatPrice(lineTotal)}</span>
              {selectedVariant.comparePrice && activeTier.off === 0 && (
                <>
                  <span className="text-lg line-through" style={{ color: 'var(--mf-graphite)', opacity: 0.5 }}>{formatPrice(selectedVariant.comparePrice)}</span>
                  <span className="badge badge-green">Save {savings}%</span>
                </>
              )}
              {activeTier.off > 0 && (
                <span className="badge badge-green">You save {formatPrice(selectedVariant.price * activeTier.qty - lineTotal)}</span>
              )}
            </div>

            {!selectedVariant.inStock ? (
              <div className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--mf-danger)' }}>
                <AlertCircle size={16} /> Out of stock for this size
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--mf-success)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--mf-success)' }} />
                In Stock · Ships within 24 hours
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleAddToCart} disabled={!selectedVariant.inStock}
                className="btn-primary flex-1 text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed">
                <ShoppingBag size={18} /> Add to bag · {formatPrice(lineTotal)}
              </button>
              <Link href="#build-box" className="btn-secondary flex-1 text-base py-4 text-center flex items-center justify-center gap-2">
                Build a 3 or 6-pack
              </Link>
            </div>

            {/* Tagline */}
            <p className="text-base font-bold" style={{ color: 'var(--mf-graphite)' }}>{product.tagline.en}</p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2">
              {['BCSIR Lab Tested', 'No Palm Oil', 'Made in BD', '100% Money-Back'].map((t) => (
                <span key={t} className="badge badge-mint text-xs">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
