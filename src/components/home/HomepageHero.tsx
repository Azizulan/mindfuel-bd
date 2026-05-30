import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';

export default function HomepageHero() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center"
      style={{ backgroundColor: 'var(--mf-cobalt-deep)' }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, var(--mf-mint) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--mf-amber) 0%, transparent 40%)',
        }}
      />

      <div className="container-mf relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <span
              className="badge badge-mint text-xs mb-4 inline-flex"
            >
              🇧🇩 Made in Bangladesh · BCSIR Lab Tested
            </span>
            <h1 className="text-display-xl text-white mb-4">
              Real food.<br />
              Made in Bangladesh.<br />
              <span style={{ color: 'var(--mf-amber)' }}>For families who care.</span>
            </h1>
            <p className="font-bn text-lg mb-6" style={{ color: 'var(--mf-mint-soft)', opacity: 0.85 }}>
              আসল খাবার। বাংলাদেশে তৈরি। যে পরিবার লেবেল পড়ে দেখে — তাদের জন্য।
            </p>
            <p className="text-base mb-8 max-w-md" style={{ color: 'var(--mf-mint-soft)', opacity: 0.75 }}>
              Peanut butter, granola, muesli, nuts, and Seedra fiber drink — no palm oil, no added sugar, lab tested at BCSIR. Because your family deserves the real thing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/shop" className="btn-primary text-base py-4 px-8">
                Shop the Range <ArrowRight size={18} />
              </Link>
              <Link
                href="/our-process"
                className="inline-flex items-center gap-2 text-white font-semibold py-4 px-6 hover:opacity-80 transition-opacity"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <Play size={16} className="ml-0.5" />
                </div>
                See how we make it
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-10 pt-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              {[
                { num: '23,000+', label: 'happy customers' },
                { num: '4.8★', label: 'average rating' },
                { num: '0', label: 'palm oil ever' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-white">{stat.num}</p>
                  <p className="text-xs" style={{ color: 'var(--mf-mint-soft)', opacity: 0.6 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Product grid visual */}
          <div className="relative hidden lg:grid grid-cols-2 gap-4">
            {[
              { color: 'var(--mf-mint-soft)', text: 'Classic PB Smooth', emoji: '🥜' },
              { color: 'var(--mf-amber-soft)', text: 'Seedra Fiber Drink', emoji: '🌿' },
              { color: '#DBEAFE', text: 'Honey Nut Granola', emoji: '🌾' },
              { color: '#F3E8FF', text: 'Choc Peanut Butter', emoji: '🍫' },
            ].map((card, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 p-6"
                style={{ backgroundColor: card.color }}
              >
                <span className="text-4xl">{card.emoji}</span>
                <p className="text-sm font-bold text-center" style={{ color: 'var(--mf-ink)' }}>{card.text}</p>
                <span className="badge badge-mint text-xs">Real Food</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
