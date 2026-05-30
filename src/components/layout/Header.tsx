'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/store/cart';
import { cn } from '@/lib/utils';

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
      className="sticky top-0 z-40 bg-white border-b"
      style={{ borderColor: 'var(--mf-mist)' }}
    >
      <div className="container-mf">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--mf-cobalt)' }}
            >
              <span className="text-white font-extrabold text-sm leading-none">MF</span>
            </div>
            <span
              className="font-extrabold text-xl tracking-tight hidden sm:block"
              style={{ color: 'var(--mf-cobalt)' }}
            >
              MINDFUEL
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasChildren ? (
                <div key={link.href} className="relative group">
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-600 rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ color: 'var(--mf-ink)' }}
                    onMouseEnter={() => setShopOpen(true)}
                    onMouseLeave={() => setShopOpen(false)}
                  >
                    {link.label}
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  {shopOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border py-2 min-w-48 z-50"
                      style={{ borderColor: 'var(--mf-mist)', boxShadow: '0 8px 24px rgba(15,23,42,0.1)' }}
                      onMouseEnter={() => setShopOpen(true)}
                      onMouseLeave={() => setShopOpen(false)}
                    >
                      {shopCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                          style={{ color: 'var(--mf-ink)' }}
                        >
                          {cat.label}
                        </Link>
                      ))}
                      <div className="border-t mt-1 pt-1" style={{ borderColor: 'var(--mf-mist)' }}>
                        <Link
                          href="/shop"
                          className="block px-4 py-2.5 text-sm font-600 transition-colors"
                          style={{ color: 'var(--mf-cobalt)' }}
                        >
                          All Products →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--mf-ink)' }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={20} style={{ color: 'var(--mf-ink)' }} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: 'var(--mf-amber)' }}
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Order CTA */}
            <Link href="/shop" className="btn-primary hidden sm:inline-flex text-sm py-2 px-4">
              Shop Now
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: 'var(--mf-mist)', backgroundColor: 'var(--mf-cream)' }}
        >
          <nav className="container-mf py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-2 font-medium text-base border-b"
                style={{ color: 'var(--mf-ink)', borderColor: 'var(--mf-mist)' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              {shopCategories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="py-2 px-3 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: 'var(--mf-mist)', color: 'var(--mf-graphite)' }}
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
