import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const steps = [
  { emoji: '🌱', label: 'Source', desc: 'Traceable Bangladeshi ingredients' },
  { emoji: '🏭', label: 'Process', desc: 'Our own facility, no outsourcing' },
  { emoji: '📦', label: 'Pack & Test', desc: 'BCSIR certified before it ships' },
];

export default function ProcessMini() {
  return (
    <section className="section-py">
      <div className="container-mf">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-label" style={{ color: 'var(--mf-cobalt)' }}>OUR PROCESS</span>
            <h2 className="text-h2 mt-2 max-w-sm">
              Embarrassingly transparent. That&apos;s the point.
            </h2>
            <Link
              href="/our-process"
              className="inline-flex items-center gap-2 mt-4 font-semibold text-sm"
              style={{ color: 'var(--mf-cobalt)' }}
            >
              See the full factory story <ArrowRight size={16} />
            </Link>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: 'var(--mf-mint-soft)' }}
                >
                  {step.emoji}
                </div>
                <p className="font-bold text-sm" style={{ color: 'var(--mf-ink)' }}>{step.label}</p>
                <p className="text-xs max-w-[90px]" style={{ color: 'var(--mf-graphite)' }}>{step.desc}</p>
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute"
                    style={{ width: 32, height: 2, backgroundColor: 'var(--mf-mist)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
