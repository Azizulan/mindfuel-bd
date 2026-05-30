'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronDown, ChevronRight, MessageCircle, Truck } from 'lucide-react';
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
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '8801XXXXXXXXX';

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-50"
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

      {/* ===== Mobile slide-in drawer ===== */}
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(46,31,21,0.55)' }}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`md:hidden fixed top-0 right-0 z-50 h-full w-[86%] max-w-[360px] flex flex-col transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: 'var(--mf-cream)', boxShadow: '-12px 0 40px rgba(46,31,21,0.25)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-[68px] shrink-0" style={{ borderBottom: '1px solid var(--mf-mist)' }}>
          <span className="flex items-center gap-1">
            <span className="font-display text-xl" style={{ color: 'var(--mf-espresso)' }}>MINDFUEL</span>
            <span className="w-1.5 h-1.5 rounded-full mb-1" style={{ backgroundColor: 'var(--mf-yellow)' }} />
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: 'var(--mf-mist)' }}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Primary nav */}
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3.5 font-bold text-lg group"
                style={{ color: 'var(--mf-espresso)', borderBottom: '1px solid var(--mf-mist)' }}
              >
                {link.label}
                <ChevronRight size={18} className="opacity-40 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </nav>

          {/* Shop categories */}
          <p className="text-label text-xs mt-6 mb-3" style={{ color: 'var(--mf-orange)' }}>Shop by category</p>
          <div className="grid grid-cols-2 gap-2.5">
            {shopCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-3.5 rounded-2xl text-sm font-bold transition-transform active:scale-95"
                style={{ backgroundColor: 'white', color: 'var(--mf-espresso)', border: '1px solid var(--mf-mist)' }}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Sticky footer CTAs */}
        <div className="shrink-0 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]" style={{ borderTop: '1px solid var(--mf-mist)' }}>
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-bold" style={{ color: 'var(--mf-green)' }}>
            <Truck size={14} /> Free delivery on orders over ৳1500
          </div>
          <Link href="/shop" onClick={() => setMobileOpen(false)} className="btn-primary w-full py-3.5 text-base mb-2.5">
            Shop the Range
          </Link>
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hello MINDFUEL! I'd like to place an order.")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-white font-bold text-sm"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle size={18} /> Order on WhatsApp
          </a>
        </div>
      </aside>
    </header>
  );
}
