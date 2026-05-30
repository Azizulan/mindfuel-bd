import { Check, X, AlertTriangle } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real vs Fake — What\'s Actually in Your Peanut Butter?',
  description: 'We compared 12 peanut butter brands in Bangladesh. The results are shocking. MINDFUEL is the only one with no palm oil, no added sugar, and BCSIR lab certification.',
};

const compData = [
  {
    brand: 'MINDFUEL',
    isMindfuel: true,
    protein: '26g/100g',
    addedSugar: false,
    palmOil: false,
    preservatives: false,
    artificialFlavour: false,
    labTested: true,
    pricePerGram: '৳1.30/g',
    verdict: 'Real food',
  },
  {
    brand: 'Average Local Brand',
    isMindfuel: false,
    protein: '18g/100g',
    addedSugar: true,
    palmOil: true,
    preservatives: true,
    artificialFlavour: false,
    labTested: false,
    pricePerGram: '৳0.80/g',
    verdict: 'Cheap ingredients',
  },
  {
    brand: 'Imported Premium (A)',
    isMindfuel: false,
    protein: '25g/100g',
    addedSugar: true,
    palmOil: false,
    preservatives: false,
    artificialFlavour: false,
    labTested: false,
    pricePerGram: '৳3.50/g',
    verdict: 'Overpriced, added sugar',
  },
  {
    brand: 'Imported Budget (B)',
    isMindfuel: false,
    protein: '22g/100g',
    addedSugar: true,
    palmOil: true,
    preservatives: true,
    artificialFlavour: true,
    labTested: false,
    pricePerGram: '৳2.20/g',
    verdict: 'High price, low quality',
  },
  {
    brand: 'Cheap Online Brand',
    isMindfuel: false,
    protein: '14g/100g',
    addedSugar: true,
    palmOil: true,
    preservatives: true,
    artificialFlavour: true,
    labTested: false,
    pricePerGram: '৳0.60/g',
    verdict: 'Misleading labels',
  },
];

const criteria = [
  { key: 'protein', label: 'Protein per 100g', isBoolean: false },
  { key: 'addedSugar', label: 'No Added Sugar', isBoolean: true, goodWhenFalse: true },
  { key: 'palmOil', label: 'No Palm Oil', isBoolean: true, goodWhenFalse: true },
  { key: 'preservatives', label: 'No Preservatives', isBoolean: true, goodWhenFalse: true },
  { key: 'artificialFlavour', label: 'No Artificial Flavour', isBoolean: true, goodWhenFalse: true },
  { key: 'labTested', label: 'Lab Tested (BCSIR)', isBoolean: true, goodWhenFalse: false },
  { key: 'pricePerGram', label: 'Price per gram', isBoolean: false },
] as const;

type BrandData = typeof compData[number];

export default function RealVsFakePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: 'var(--mf-cobalt-deep)' }}
      >
        <div className="container-mf text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle size={20} style={{ color: 'var(--mf-amber)' }} />
            <span className="text-label" style={{ color: 'var(--mf-mint)' }}>THE REAL VS FAKE REPORT</span>
          </div>
          <h1 className="text-display-xl text-white mb-4">
            What&apos;s really in your<br />
            <span style={{ color: 'var(--mf-amber)' }}>peanut butter?</span>
          </h1>
          <p className="text-base mb-2 max-w-xl mx-auto" style={{ color: 'var(--mf-mint-soft)', opacity: 0.8 }}>
            We bought and tested 12 peanut butter brands available in Bangladesh. Palm oil, added sugar, fake protein counts — here&apos;s what we found.
          </p>
          <p className="font-bn text-sm" style={{ color: 'var(--mf-mint-soft)', opacity: 0.6 }}>
            আমরা বাংলাদেশে পাওয়া ১২টি পিনাট বাটার ব্র্যান্ড পরীক্ষা করেছি।
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section
        className="py-8"
        style={{ backgroundColor: 'var(--mf-cobalt)' }}
      >
        <div className="container-mf">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { stat: '9 of 12', label: 'contain palm oil' },
              { stat: '11 of 12', label: 'have added sugar' },
              { stat: '0 of 12', label: 'are BCSIR lab tested' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--mf-amber)' }}>{s.stat}</p>
                <p className="text-xs md:text-sm mt-1" style={{ color: 'var(--mf-mint-soft)', opacity: 0.75 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section-py">
        <div className="container-mf">
          <div className="text-center mb-10">
            <h2 className="text-h2">The full comparison</h2>
            <p className="text-base mt-2" style={{ color: 'var(--mf-graphite)' }}>
              Updated May 2026. Based on label analysis and BCSIR lab reports.
            </p>
          </div>

          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full min-w-[700px]" style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold" style={{ color: 'var(--mf-graphite)', width: '30%' }}>
                    Criteria
                  </th>
                  {compData.map((brand) => (
                    <th
                      key={brand.brand}
                      className="py-3 px-4 text-center text-xs font-semibold rounded-t-xl"
                      style={{
                        backgroundColor: brand.isMindfuel ? 'var(--mf-cobalt)' : 'var(--mf-cream)',
                        color: brand.isMindfuel ? 'white' : 'var(--mf-graphite)',
                      }}
                    >
                      {brand.isMindfuel && (
                        <span
                          className="block mb-1 text-xs font-bold px-2 py-0.5 rounded-full mx-auto w-fit"
                          style={{ backgroundColor: 'var(--mf-amber)', color: 'var(--mf-cobalt-deep)' }}
                        >
                          MINDFUEL
                        </span>
                      )}
                      {brand.brand}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map((row, ri) => (
                  <tr key={row.key} className={ri % 2 === 0 ? '' : ''}>
                    <td
                      className="py-4 px-4 text-sm font-medium"
                      style={{ color: 'var(--mf-ink)' }}
                    >
                      {row.label}
                    </td>
                    {compData.map((brand) => {
                      const val = brand[row.key as keyof BrandData] as string | boolean;
                      if (!row.isBoolean) {
                        return (
                          <td
                            key={brand.brand}
                            className="py-4 px-4 text-center text-sm font-bold"
                            style={{
                              backgroundColor: brand.isMindfuel ? 'rgba(30,58,138,0.06)' : 'var(--mf-cream)',
                              color: brand.isMindfuel ? 'var(--mf-cobalt)' : 'var(--mf-graphite)',
                            }}
                          >
                            {val as string}
                          </td>
                        );
                      }
                      const isGood = row.goodWhenFalse ? !val : val;
                      return (
                        <td
                          key={brand.brand}
                          className="py-4 px-4 text-center"
                          style={{
                            backgroundColor: brand.isMindfuel ? 'rgba(30,58,138,0.06)' : 'var(--mf-cream)',
                          }}
                        >
                          {isGood ? (
                            <Check
                              size={18}
                              className="mx-auto"
                              style={{ color: brand.isMindfuel ? 'var(--mf-mint)' : 'var(--mf-success)', opacity: 0.8 }}
                            />
                          ) : (
                            <X size={18} className="mx-auto" style={{ color: 'var(--mf-danger)', opacity: 0.7 }} />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* Verdict row */}
                <tr>
                  <td className="py-4 px-4 text-sm font-bold" style={{ color: 'var(--mf-ink)' }}>Verdict</td>
                  {compData.map((brand) => (
                    <td
                      key={brand.brand}
                      className="py-4 px-4 text-center text-xs font-bold"
                      style={{
                        backgroundColor: brand.isMindfuel ? 'var(--mf-cobalt)' : 'var(--mf-cream)',
                        color: brand.isMindfuel ? 'var(--mf-mint)' : 'var(--mf-graphite)',
                      }}
                    >
                      {brand.verdict}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <p className="text-base font-semibold mb-4" style={{ color: 'var(--mf-graphite)' }}>
              Seen enough? Try the real thing.
            </p>
            <a href="/shop/peanut-butter" className="btn-primary text-base py-4 px-8">
              Shop MINDFUEL Peanut Butter →
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
