'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight, AlertCircle } from 'lucide-react';
import type { Product, Variant } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/store/cart';

interface Props {
  product: Product;
}

export default function ProductHero({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
  const [mainImage, setMainImage] = useState(product.heroImage);
  const addItem = useCart((s) => s.addItem);

  const handleAddToCart = () => {
    addItem({
      productSlug: product.slug,
      variantSku: selectedVariant.sku,
      name: product.name.en,
      variantLabel: selectedVariant.label.en,
      price: selectedVariant.price,
      qty: 1,
      image: product.heroImage,
    });
  };

  const savings = selectedVariant.comparePrice
    ? Math.round(((selectedVariant.comparePrice - selectedVariant.price) / selectedVariant.comparePrice) * 100)
    : 0;

  return (
    <section className="section-py">
      <div className="container-mf">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left — Images */}
          <div className="space-y-4">
            <div
              className="relative aspect-square rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--mf-cream)' }}
            >
              <Image
                src={mainImage}
                alt={product.name.en}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/600x600/FAF7F2/1E3A8A?text=${encodeURIComponent(product.name.en)}`;
                }}
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badges.map((badge) => (
                  <span
                    key={badge.label}
                    className="badge"
                    style={{
                      backgroundColor:
                        badge.color === 'amber'
                          ? 'var(--mf-amber)'
                          : badge.color === 'mint'
                          ? 'var(--mf-mint)'
                          : badge.color === 'danger'
                          ? 'var(--mf-danger)'
                          : 'var(--mf-cobalt)',
                      color: badge.color === 'amber' ? 'var(--mf-cobalt-deep)' : 'white',
                    }}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnail row */}
            {product.galleryImages.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                <button
                  onClick={() => setMainImage(product.heroImage)}
                  className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    mainImage === product.heroImage ? 'border-mf-cobalt' : 'border-transparent'
                  }`}
                  style={{ borderColor: mainImage === product.heroImage ? 'var(--mf-cobalt)' : 'var(--mf-mist)' }}
                >
                  <Image
                    src={product.heroImage}
                    alt=""
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/80x80/FAF7F2/1E3A8A?text=IMG`;
                    }}
                  />
                </button>
                {product.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all"
                    style={{ borderColor: mainImage === img ? 'var(--mf-cobalt)' : 'var(--mf-mist)' }}
                  >
                    <Image
                      src={img}
                      alt=""
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/80x80/FAF7F2/1E3A8A?text=IMG`;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Info */}
          <div className="flex flex-col gap-5">
            {/* Eyebrow */}
            <span className="text-label" style={{ color: 'var(--mf-cobalt)' }}>
              {product.category.replace(/-/g, ' ').toUpperCase()}
            </span>

            {/* Product name */}
            <div>
              <h1
                className="font-serif-display"
                style={{
                  color: 'var(--mf-ink)',
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                  lineHeight: 1.05,
                  fontWeight: 600,
                }}
              >
                {product.name.en}
              </h1>
              <p className="font-bn text-lg mt-2" style={{ color: 'var(--mf-graphite)' }}>
                {product.name.bn}
              </p>
            </div>

            {/* Tagline */}
            <p className="text-lg font-semibold" style={{ color: 'var(--mf-graphite)' }}>
              {product.tagline.en}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    style={{
                      color: 'var(--mf-amber)',
                      fill: i < Math.floor(product.rating) ? 'var(--mf-amber)' : 'none',
                    }}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <Link
                href="#reviews"
                className="text-sm underline"
                style={{ color: 'var(--mf-cobalt)' }}
              >
                {product.reviewCount.toLocaleString()} reviews
              </Link>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold" style={{ color: 'var(--mf-ink)' }}>
                {formatPrice(selectedVariant.price)}
              </span>
              {selectedVariant.comparePrice && (
                <>
                  <span className="text-lg line-through" style={{ color: 'var(--mf-graphite)', opacity: 0.5 }}>
                    {formatPrice(selectedVariant.comparePrice)}
                  </span>
                  <span className="badge badge-mint">Save {savings}%</span>
                </>
              )}
            </div>

            {/* Variant selector */}
            {product.variants.length > 1 && (
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--mf-graphite)' }}>
                  Size / Variant
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.sku}
                      onClick={() => setSelectedVariant(v)}
                      disabled={!v.inStock}
                      className="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        borderColor: selectedVariant.sku === v.sku ? 'var(--mf-cobalt)' : 'var(--mf-mist)',
                        backgroundColor: selectedVariant.sku === v.sku ? 'var(--mf-cobalt)' : 'transparent',
                        color: selectedVariant.sku === v.sku ? 'white' : 'var(--mf-ink)',
                      }}
                    >
                      {v.label.en}
                      {!v.inStock && ' (Out)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Urgency line */}
            {!selectedVariant.inStock ? (
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--mf-danger)' }}>
                <AlertCircle size={16} />
                Out of stock for this size
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--mf-success)' }}>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                In Stock · Ships within 24 hours
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant.inStock}
                className="btn-primary flex-1 text-base py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to my stack
              </button>
              <Link
                href="#build-box"
                className="btn-secondary flex-1 text-base py-3.5 text-center flex items-center justify-center gap-2"
              >
                Build my box <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['BCSIR Lab Tested', 'No Palm Oil', 'Made in BD', '100% Money-Back'].map((t) => (
                <span key={t} className="badge badge-mint text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
