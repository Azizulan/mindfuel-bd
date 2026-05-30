import { Check, X, AlertTriangle } from 'lucide-react';
import type { Product } from '@/types';

interface Props {
  product: Product;
}

const competitors = [
  {
    name: 'Average Local Brand',
    protein: '18g/100g',
    addedSugar: true,
    palmOil: true,
    preservatives: true,
    labTested: false,
    pricePerGram: '৳0.80/g',
  },
  {
    name: 'Imported Premium',
    protein: '24g/100g',
    addedSugar: true,
    palmOil: false,
    preservatives: false,
    labTested: false,
    pricePerGram: '৳3.50/g',
  },
  {
    name: 'Cheap Online Brand',
    protein: '15g/100g',
    addedSugar: true,
    palmOil: true,
    preservatives: true,
    labTested: false,
    pricePerGram: '৳0.60/g',
  },
];

const rows = [
  { key: 'protein', label: 'Protein per 100g', isBoolean: false },
  { key: 'addedSugar', label: 'No Added Sugar', isBoolean: true, invertForCompetitor: true },
  { key: 'palmOil', label: 'No Palm Oil', isBoolean: true, invertForCompetitor: true },
  { key: 'preservatives', label: 'No Preservatives', isBoolean: true, invertForCompetitor: true },
  { key: 'labTested', label: 'Lab Tested', isBoolean: true },
  { key: 'pricePerGram', label: 'Price per gram', isBoolean: false },
] as const;

interface CompRow {
  protein: string;
  addedSugar: boolean;
  palmOil: boolean;
  preservatives: boolean;
  labTested: boolean;
  pricePerGram: string;
  [key: string]: string | boolean;
}

export default function ComparisonTable({ product }: Props) {
  const mindfuel: CompRow = {
    protein: product.comparisonRow.protein,
    addedSugar: !product.comparisonRow.addedSugar,
    palmOil: !product.comparisonRow.palmOil,
    preservatives: !product.comparisonRow.preservatives,
    labTested: product.comparisonRow.labTested,
    pricePerGram: product.comparisonRow.pricePerGram,
  };

  return (
    <section
      id="comparison"
      className="section-py"
      style={{ backgroundColor: 'var(--mf-cream)' }}
    >
      <div className="container-mf">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: 'var(--mf-amber-soft)' }}>
            <AlertTriangle size={14} style={{ color: '#92400E' }} />
            <span className="text-xs font-bold tracking-wide" style={{ color: '#92400E' }}>
              THE REAL VS FAKE COMPARISON
            </span>
          </div>
          <h2 className="text-h2 font-serif-display" style={{ color: 'var(--mf-ink)', fontWeight: 600 }}>
            Most local brands won&apos;t show you this table.
          </h2>
          <p className="mt-3 text-base" style={{ color: 'var(--mf-graphite)' }}>
            We will. Because real food has nothing to hide.
          </p>
        </div>

        {/* Table */}
        <div
          className="overflow-x-auto -mx-5 px-5 lg:mx-0 lg:px-0 rounded-2xl bg-white"
          style={{ boxShadow: '0 4px 16px rgba(15,23,42,0.06)', border: '1px solid var(--mf-mist)' }}
        >
          <table className="w-full min-w-[640px]" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--mf-mist)' }}>
                <th className="py-5 px-5 text-left text-sm font-semibold" style={{ color: 'var(--mf-graphite)', width: '32%' }}>
                  What you&apos;re comparing
                </th>
                <th
                  className="py-5 px-5 text-center relative"
                  style={{
                    backgroundColor: 'var(--mf-cobalt)',
                    color: 'white',
                    borderLeft: '4px solid var(--mf-amber)',
                  }}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-extrabold"
                      style={{ backgroundColor: 'var(--mf-amber)', color: 'var(--mf-cobalt-deep)' }}
                    >
                      MINDFUEL
                    </span>
                    <span className="text-xs font-medium leading-tight" style={{ color: 'var(--mf-mint-soft)' }}>
                      {product.name.en}
                    </span>
                  </div>
                </th>
                {competitors.map((c) => (
                  <th
                    key={c.name}
                    className="py-5 px-4 text-center text-xs font-medium"
                    style={{ color: 'var(--mf-graphite)' }}
                  >
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={row.key}
                  style={{
                    backgroundColor: ri % 2 === 0 ? 'white' : 'var(--mf-cream)',
                  }}
                >
                  <td className="py-4 px-5 text-sm font-medium" style={{ color: 'var(--mf-ink)' }}>
                    {row.label}
                  </td>
                  {/* MINDFUEL — highlighted column */}
                  <td
                    className="py-4 px-5 text-center"
                    style={{
                      backgroundColor: 'rgba(94,234,212,0.12)',
                      borderLeft: '4px solid var(--mf-amber)',
                    }}
                  >
                    {row.isBoolean ? (
                      mindfuel[row.key] === true ? (
                        <Check size={20} className="mx-auto" style={{ color: 'var(--mf-success)' }} strokeWidth={3} />
                      ) : (
                        <X size={20} className="mx-auto" style={{ color: 'var(--mf-danger)' }} strokeWidth={3} />
                      )
                    ) : (
                      <span className="text-sm font-extrabold" style={{ color: 'var(--mf-cobalt)' }}>
                        {mindfuel[row.key] as string}
                      </span>
                    )}
                  </td>
                  {/* Competitors */}
                  {competitors.map((c) => {
                    const val = c[row.key as keyof typeof c];
                    const displayVal = row.isBoolean
                      ? row.key === 'addedSugar' || row.key === 'palmOil' || row.key === 'preservatives'
                        ? !val
                        : val
                      : null;
                    return (
                      <td key={c.name} className="py-4 px-4 text-center">
                        {row.isBoolean ? (
                          displayVal === true ? (
                            <Check size={18} className="mx-auto" style={{ color: 'var(--mf-success)', opacity: 0.7 }} />
                          ) : (
                            <X size={18} className="mx-auto" style={{ color: 'var(--mf-danger)', opacity: 0.7 }} />
                          )
                        ) : (
                          <span className="text-sm font-medium" style={{ color: 'var(--mf-graphite)' }}>
                            {val as string}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/real-vs-fake"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
            style={{ color: 'var(--mf-cobalt)' }}
          >
            See what&apos;s really in your peanut butter — full comparison →
          </a>
        </div>
      </div>
    </section>
  );
}
