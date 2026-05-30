import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export default function VillainTeaser() {
  return (
    <section
      className="py-12 md:py-16"
      style={{ backgroundColor: 'var(--mf-cobalt)' }}
    >
      <div className="container-mf">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={18} style={{ color: 'var(--mf-amber)' }} />
              <span className="text-label text-xs" style={{ color: 'var(--mf-mint)' }}>
                THE REAL VS FAKE REPORT
              </span>
            </div>
            <h2 className="text-h2 text-white mb-3">
              Most local peanut butters contain palm oil and added sugar.
              <span style={{ color: 'var(--mf-amber)' }}> Ours don&apos;t.</span>
            </h2>
            <p className="text-base mb-2" style={{ color: 'var(--mf-mint-soft)', opacity: 0.8 }}>
              We compared 12 peanut butter brands available in Bangladesh. The results might surprise you.
            </p>
            <p className="font-bn text-sm" style={{ color: 'var(--mf-mint-soft)', opacity: 0.65 }}>
              আপনার পিনাট বাটারে আসলে কী আছে — দেখে নিন।
            </p>
          </div>
          <div className="flex flex-col gap-4 shrink-0">
            {[
              { stat: '9 out of 12', label: 'local PBs contain palm oil' },
              { stat: '11 out of 12', label: 'have added sugar' },
              { stat: '0 out of 12', label: 'are BCSIR lab tested' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <span className="text-2xl font-extrabold" style={{ color: 'var(--mf-amber)' }}>
                  {item.stat}
                </span>
                <span className="text-sm" style={{ color: 'var(--mf-mint-soft)', opacity: 0.85 }}>
                  {item.label}
                </span>
              </div>
            ))}
            <Link
              href="/real-vs-fake"
              className="btn-primary mt-2 justify-center"
            >
              See the full comparison <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
