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
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants.find((v) => v.inStock) ?? product.variants[0]
  );
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

  /* Title + rating — shown ABOVE the image on mobile, in the right column on desktop */
  const TitleBlock = ({ className = '' }: { className?: string }) => (
    <div className={className}>
      <span className="text-label text-xs" style={{ color: 'var(--mf-orange)' }}>
        {product.category.replace(/-/g, ' ').toUpperCase()}
      </span>
      <h1
        className="font-display mt-1.5"
        style={{ color: 'var(--mf-espresso)', fontSize: 'clamp(1.75rem, 7vw, 3.5rem)', lineHeight: 1.02 }}
      >
        {product.name.en}
      </h1>
      <p className="font-bn text-base mt-1" style={{ color: 'var(--mf-graphite)' }}>
        {product.name.bn}
      </p>
      {/* Rating */}
      <div className="flex items-center gap-2 mt-2.5">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={15}
              style={{ color: 'var(--mf-orange)', fill: i < Math.floor(product.rating) ? 'var(--mf-orange)' : 'none' }}
            />
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
          {/* Mobile-only title (above image) */}
          <TitleBlock className="lg:hidden mb-3" />

          {/* Image column */}
          <div className="space-y-3">
            <div
              className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden"
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
                  (e.target as HTMLImageElement).src = `https://placehold.co/600x600/FBF5E9/4A3122?text=${encodeURIComponent(product.name.en)}`;
                }}
              />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.badges.map((badge) => (
                  <span
                    key={badge.label}
                    className="badge"
                    style={{
                      backgroundColor:
                        badge.color === 'amber' ? 'var(--mf-yellow)'
                        : badge.color === 'mint' ? 'var(--mf-blue)'
                        : badge.color === 'danger' ? 'var(--mf-danger)'
                        : 'var(--mf-brown)',
                      color: badge.color === 'amber' ? 'var(--mf-espresso)' : badge.color === 'mint' ? '#1C4A54' : 'white',
                    }}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnails (compact on mobile) */}
            {product.galleryImages.length > 0 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {[product.heroImage, ...product.galleryImages].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className="shrink-0 w-14 h-14 lg:w-20 lg:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer"
                    style={{ borderColor: mainImage === img ? 'var(--mf-brown)' : 'var(--mf-mist)' }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt=""
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/FBF5E9/4A3122?text=MF'; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info / buy column */}
          <div className="flex flex-col gap-4 mt-5 lg:mt-0">
            {/* Desktop-only title */}
            <TitleBlock className="hidden lg:block" />

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-display text-3xl" style={{ color: 'var(--mf-brown)' }}>
                {formatPrice(selectedVariant.price)}
              </span>
              {selectedVariant.comparePrice && (
                <>
                  <span className="text-lg line-through" style={{ color: 'var(--mf-graphite)', opacity: 0.5 }}>
                    {formatPrice(selectedVariant.comparePrice)}
                  </span>
                  <span className="badge badge-green">Save {savings}%</span>
                </>
              )}
            </div>

            {/* Variant selector */}
            {product.variants.length > 1 && (
              <div>
                <p className="text-sm font-bold mb-2" style={{ color: 'var(--mf-graphite)' }}>Size / Variant</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.sku}
                      onClick={() => setSelectedVariant(v)}
                      disabled={!v.inStock}
                      className="px-4 py-2.5 rounded-full text-sm font-bold border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      style={{
                        borderColor: selectedVariant.sku === v.sku ? 'var(--mf-brown)' : 'var(--mf-mist)',
                        backgroundColor: selectedVariant.sku === v.sku ? 'var(--mf-brown)' : 'transparent',
                        color: selectedVariant.sku === v.sku ? 'white' : 'var(--mf-ink)',
                      }}
                    >
                      {v.label.en}{!v.inStock && ' (Out)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock line */}
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
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant.inStock}
                className="btn-primary flex-1 text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to cart · {formatPrice(selectedVariant.price)}
              </button>
              <Link
                href="#build-box"
                className="btn-secondary flex-1 text-base py-4 text-center flex items-center justify-center gap-2"
              >
                Build my box <ArrowRight size={16} />
              </Link>
            </div>

            {/* Tagline — supporting detail, sits below the buy controls */}
            <p className="text-base font-bold" style={{ color: 'var(--mf-graphite)' }}>
              {product.tagline.en}
            </p>

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
