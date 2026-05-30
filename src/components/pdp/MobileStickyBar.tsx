'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product, Variant } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/store/cart';

interface Props {
  product: Product;
  defaultVariant: Variant;
}

export default function MobileStickyBar({ product, defaultVariant }: Props) {
  const [visible, setVisible] = useState(false);
  const addItem = useCart((s) => s.addItem);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAdd = () => {
    addItem({
      productSlug: product.slug,
      variantSku: defaultVariant.sku,
      name: product.name.en,
      variantLabel: defaultVariant.label.en,
      price: defaultVariant.price,
      qty: 1,
      image: product.heroImage,
    });
  };

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 border-t"
      style={{
        backgroundColor: 'white',
        borderColor: 'var(--mf-mist)',
        boxShadow: '0 -4px 16px rgba(15,23,42,0.08)',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs font-medium truncate" style={{ color: 'var(--mf-graphite)' }}>
            {product.name.en}
          </p>
          <p className="text-lg font-extrabold" style={{ color: 'var(--mf-ink)' }}>
            {formatPrice(defaultVariant.price)}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="btn-primary flex items-center gap-2 py-3 px-5"
          disabled={!defaultVariant.inStock}
        >
          <ShoppingCart size={16} />
          Add to stack
        </button>
      </div>
    </div>
  );
}
