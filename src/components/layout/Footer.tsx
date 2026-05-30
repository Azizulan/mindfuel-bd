'use client';

import Link from 'next/link';
import { MessageCircle, ExternalLink } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'Peanut Butter', href: '/shop/peanut-butter' },
    { label: 'Granola & Muesli', href: '/shop/granola' },
    { label: 'Nuts & Seeds', href: '/shop/nuts' },
    { label: 'Seedra Fiber Drink', href: '/products/seedra' },
    { label: 'Bundles', href: '/bundles' },
  ],
  Brand: [
    { label: 'Our Story', href: '/our-story' },
    { label: 'Our Process', href: '/our-process' },
    { label: 'The Science', href: '/science' },
    { label: 'Real vs Fake', href: '/real-vs-fake' },
    { label: 'Journal', href: '/journal' },
  ],
  Help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping Policy', href: '/legal/shipping' },
    { label: 'Returns', href: '/legal/returns' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
  ],
};

export default function Footer() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801XXXXXXXXX';

  return (
    <footer style={{ backgroundColor: 'var(--mf-cobalt-deep)', color: 'var(--mf-mint-soft)' }}>
      {/* Email capture band */}
      <div
        className="py-12"
        style={{ backgroundColor: 'var(--mf-cobalt)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="container-mf">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-h3 text-white mb-2">Get 10% off your first order</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--mf-mint-soft)', opacity: 0.85 }}>
              Weekly real-food tips + exclusive deals for MINDFUEL insiders.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-full text-sm bg-white text-gray-900 outline-none focus:ring-2"
                style={{ ringColor: 'var(--mf-amber)' } as React.CSSProperties}
              />
              <button type="submit" className="btn-primary shrink-0">
                Get 10% Off →
              </button>
            </form>
            <p className="text-xs mt-3 opacity-60">
              No spam. Unsubscribe anytime. We hate fake emails as much as fake food.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-mf py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="font-extrabold text-sm" style={{ color: 'var(--mf-cobalt)' }}>MF</span>
              </div>
              <span className="font-extrabold text-lg text-white">MINDFUEL</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--mf-mint-soft)', opacity: 0.7 }}>
              Bangladesh&apos;s trusted real-food brand. No palm oil. No added sugar. BCSIR lab tested.
            </p>
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors"
              style={{ backgroundColor: '#25D366', color: 'white' }}
            >
              <MessageCircle size={16} />
              Order via WhatsApp
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-label text-white mb-4">{category}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                      style={{ color: 'var(--mf-mint-soft)', opacity: 0.7 } as React.CSSProperties}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-xs opacity-50">
            © 2026 MINDFUEL. Made with care in Bangladesh. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: 'Instagram', href: 'https://instagram.com/mindfuelbd' },
              { label: 'Facebook', href: 'https://facebook.com/mindfuelbd' },
              { label: 'YouTube', href: 'https://youtube.com/@mindfuelbd' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity text-white text-xs"
                aria-label={s.label}
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
