import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { currentSeason } from '@/data/seasonal';
import { getProductBySlug } from '@/data/products';

export default function SeasonalBand() {
  const product = getProductBySlug(currentSeason.heroProductSlug);

  return (
    <section
      className="py-8"
      style={{ backgroundColor: currentSeason.heroBandBg, borderBottom: `2px solid ${currentSeason.heroBandText}30` }}
    >
      <div className="container-mf">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-label text-xs" style={{ color: currentSeason.heroBandText, opacity: 0.6 }}>
              SUMMER 2026 HERO
            </span>
            <p className="text-base font-semibold mt-1 max-w-xl" style={{ color: currentSeason.heroBandText }}>
              ☀️ {currentSeason.heroBandCopy.en}
            </p>
            <p className="font-bn text-sm mt-0.5" style={{ color: currentSeason.heroBandText, opacity: 0.75 }}>
              {currentSeason.heroBandCopy.bn}
            </p>
          </div>
          <Link
            href={`/products/${currentSeason.heroProductSlug}`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
            style={{ backgroundColor: currentSeason.heroBandText, color: 'white' }}
          >
            {currentSeason.heroBandCta.en} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
