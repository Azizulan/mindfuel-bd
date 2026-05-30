import Link from 'next/link';
import { ArrowRight, Sprout, Factory, PackageCheck, type LucideIcon } from 'lucide-react';

type Step = { Icon: LucideIcon; label: string; desc: string };

const steps: Step[] = [
  { Icon: Sprout, label: 'Source', desc: 'Traceable Bangladeshi ingredients' },
  { Icon: Factory, label: 'Process', desc: 'Our own facility, no outsourcing' },
  { Icon: PackageCheck, label: 'Pack & Test', desc: 'BCSIR certified before it ships' },
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
              className="inline-flex items-center gap-2 mt-4 font-semibold text-sm hover:gap-3 transition-all"
              style={{ color: 'var(--mf-cobalt)' }}
            >
              See the full factory story <ArrowRight size={16} />
            </Link>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 max-w-[100px]">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--mf-mint-soft)', color: '#0F766E' }}
                >
                  <step.Icon size={28} strokeWidth={1.75} />
                </div>
                <p className="font-bold text-sm" style={{ color: 'var(--mf-ink)' }}>{step.label}</p>
                <p className="text-xs leading-tight" style={{ color: 'var(--mf-graphite)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
