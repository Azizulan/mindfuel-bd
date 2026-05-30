import { Check, X } from 'lucide-react';
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
    name: 'Cheap Online Brands',
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

type RowKey = typeof rows[number]['key'];

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
      style={{ backgroundColor: 'var(--mf-cobalt-deep)' }}
    >
      <div className="container-mf">
        <div className="text-center mb-10">
          <span className="text-label" style={{ color: 'var(--mf-mint)' }}>THE REAL VS FAKE COMPARISON</span>
          <h2 className="text-h2 mt-2 text-white">
            Most local brands won&apos;t show you this table.
          </h2>
          <p className="mt-3 text-base" style={{ color: 'var(--mf-mint-soft)', opacity: 0.8 }}>
            We will. Because real food has nothing to hide.
          </p>
        </div>

        {/* Table — horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full min-w-[600px]" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th className="py-4 px-4 text-left text-sm font-semibold" style={{ color: 'var(--mf-mint-soft)', opacity: 0.6, width: '30%' }}>
                  What you&apos;re comparing
                </th>
                <th
                  className="py-4 px-4 text-center text-sm font-bold rounded-t-xl"
                  style={{ backgroundColor: 'var(--mf-cobalt)', color: 'white' }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ backgroundColor: 'var(--mf-amber)', color: 'var(--mf-cobalt-deep)' }}
                    >
                      MINDFUEL
                    </span>
                    {product.name.en}
                  </div>
                </th>
                {competitors.map((c) => (
                  <th
                    key={c.name}
                    className="py-4 px-4 text-center text-sm font-medium"
                    style={{ color: 'var(--mf-mint-soft)', opacity: 0.6 }}
                  >
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row.key}>
                  <td
                    className="py-4 px-4 text-sm font-medium"
                    style={{
                      color: 'var(--mf-mint-soft)',
                      borderTop: ri === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {row.label}
                  </td>
                  {/* MINDFUEL */}
                  <td
                    className="py-4 px-4 text-center"
                    style={{
                      backgroundColor: 'rgba(30,58,138,0.5)',
                      borderTop: ri === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {row.isBoolean ? (
                      mindfuel[row.key] === true ? (
                        <Check
                          size={20}
                          className="mx-auto"
                          style={{ color: 'var(--mf-mint)' }}
                        />
                      ) : (
                        <X size={20} className="mx-auto" style={{ color: 'var(--mf-danger)' }} />
                      )
                    ) : (
                      <span className="text-sm font-bold text-white">{mindfuel[row.key] as string}</span>
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
                      <td
                        key={c.name}
                        className="py-4 px-4 text-center"
                        style={{ borderTop: ri === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}
                      >
                        {row.isBoolean ? (
                          displayVal === true ? (
                            <Check size={20} className="mx-auto" style={{ color: 'var(--mf-success)', opacity: 0.7 }} />
                          ) : (
                            <X size={20} className="mx-auto" style={{ color: 'var(--mf-danger)', opacity: 0.8 }} />
                          )
                        ) : (
                          <span className="text-sm font-medium" style={{ color: 'var(--mf-mint-soft)', opacity: 0.7 }}>
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
            className="inline-flex items-center gap-2 text-sm font-semibold underline"
            style={{ color: 'var(--mf-mint)' }}
          >
            See what&apos;s really in your peanut butter — full comparison →
          </a>
        </div>
      </div>
    </section>
  );
}
