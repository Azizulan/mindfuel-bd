'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/store/cart';

const navLinks = [
  { label: 'Shop', href: '/shop', hasChildren: true },
  { label: 'Bundles', href: '/bundles' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Real vs Fake', href: '/real-vs-fake' },
  { label: 'Journal', href: '/journal' },
];

const shopCategories = [
  { label: 'Peanut Butter', href: '/shop/peanut-butter' },
  { label: 'Granola', href: '/shop/granola' },
  { label: 'Muesli', href: '/shop/muesli' },
  { label: 'Nuts', href: '/shop/nuts' },
  { label: 'Seeds', href: '/shop/seeds' },
  { label: 'Seedra (Fiber Drink)', href: '/products/seedra' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const itemCount = useCart((s) => s.itemCount());

  return (
    <header
      className="sticky top-0 z-20"
      style={{ backgroundColor: 'var(--mf-cream)' }}
    >
      <div className="container-mf">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span
              className="font-display text-2xl tracking-tight"
              style={{ color: 'var(--mf-espresso)' }}
            >
              MINDFUEL
            </span>
            <span
              className="w-2 h-2 rounded-full mb-1"
              style={{ backgroundColor: 'var(--mf-yellow)' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasChildren ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-bold rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                    style={{ color: 'var(--mf-espresso)' }}
                  >
                    {link.label}
                    <ChevronDown size={14} className="transition-transform" style={{ transform: shopOpen ? 'rotate(180deg)' : 'none' }} />
                  </button>
                  {shopOpen && (
                    <div
                      className="absolute top-full left-0 pt-1 min-w-52 z-30"
                    >
                      <div
                        className="bg-white rounded-2xl py-2"
                        style={{ boxShadow: '0 12px 32px rgba(46,31,21,0.16)', border: '1px solid var(--mf-mist)' }}
                      >
                        {shopCategories.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className="block px-4 py-2.5 text-sm font-medium hover:bg-black/5 transition-colors"
                            style={{ color: 'var(--mf-espresso)' }}
                          >
                            {cat.label}
                          </Link>
                        ))}
                        <div className="border-t mt-1 pt-1" style={{ borderColor: 'var(--mf-mist)' }}>
                          <Link
                            href="/shop"
                            className="block px-4 py-2.5 text-sm font-bold"
                            style={{ color: 'var(--mf-orange)' }}
                          >
                            All Products →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-bold rounded-full hover:bg-black/5 transition-colors"
                  style={{ color: 'var(--mf-espresso)' }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Wrapper toggles visibility — .btn-primary forces display:inline-flex,
                so `hidden` must live on a non-button parent to actually hide it. */}
            <span className="hidden md:inline-flex">
              <Link href="/shop" className="btn-primary text-sm py-2.5 px-5">
                Start Snacking
              </Link>
            </span>

            {/* Cart box */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-11 h-11 rounded-2xl transition-colors hover:opacity-90"
              style={{ backgroundColor: 'var(--mf-espresso)' }}
              aria-label={`Cart, ${itemCount} items`}
            >
              <ShoppingCart size={18} style={{ color: 'var(--mf-cream)' }} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-extrabold flex items-center justify-center"
                  style={{ backgroundColor: 'var(--mf-yellow)', color: 'var(--mf-espresso)' }}
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-2xl cursor-pointer"
              style={{ backgroundColor: 'var(--mf-mist)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden" style={{ backgroundColor: 'var(--mf-cream)' }}>
          <nav className="container-mf pb-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-2 font-bold text-base border-b"
                style={{ color: 'var(--mf-espresso)', borderColor: 'var(--mf-mist)' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              {shopCategories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="py-2 px-3 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: 'var(--mf-mist)', color: 'var(--mf-espresso)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
