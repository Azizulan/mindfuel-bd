import Link from 'next/link';
import {
  Nut,
  Droplets,
  Wheat,
  CircleDot,
  Sprout,
  Package,
  type LucideIcon,
} from 'lucide-react';

type Category = {
  name: string;
  Icon: LucideIcon;
  href: string;
  bg: string;
  color: string;
  desc: string;
};

const categories: Category[] = [
  { name: 'Peanut Butter', Icon: Nut, href: '/shop/peanut-butter', bg: 'var(--mf-mint-soft)', color: '#0F766E', desc: 'Classic, Crunchy, Chocolate' },
  { name: 'Seedra', Icon: Droplets, href: '/products/seedra', bg: 'var(--mf-amber-soft)', color: '#92400E', desc: 'Fiber Drink Premix' },
  { name: 'Granola & Muesli', Icon: Wheat, href: '/shop/granola', bg: '#DBEAFE', color: 'var(--mf-cobalt)', desc: 'Honey Nut, Berry, Classic' },
  { name: 'Nuts', Icon: CircleDot, href: '/shop/nuts', bg: '#FEF3C7', color: '#92400E', desc: 'Mixed, Spicy Nut Mix' },
  { name: 'Seeds & Mixes', Icon: Sprout, href: '/shop/seeds', bg: '#D1FAE5', color: '#065F46', desc: 'Seed Mix, Daily Nutrition' },
  { name: 'Bundles', Icon: Package, href: '/bundles', bg: '#EDE9FE', color: '#5B21B6', desc: 'Breakfast Box, Gift Box' },
];

export default function CategoryTiles() {
  return (
    <section className="section-py">
      <div className="container-mf">
        <div className="text-center mb-10">
          <span className="text-label" style={{ color: 'var(--mf-cobalt)' }}>SHOP BY CATEGORY</span>
          <h2 className="text-h2 mt-2">Everything real. Nothing fake.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex flex-col gap-3 p-5 md:p-6 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              style={{ backgroundColor: cat.bg }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: 'white', color: cat.color }}
              >
                <cat.Icon size={24} strokeWidth={2} />
              </div>
              <div>
                <p className="font-bold text-base" style={{ color: cat.color }}>{cat.name}</p>
                <p className="text-xs mt-0.5" style={{ color: cat.color, opacity: 0.7 }}>{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
