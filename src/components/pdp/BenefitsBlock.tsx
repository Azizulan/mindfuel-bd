import {
  Leaf, FlaskConical, Zap, Ban, Factory, Shield,
  Droplets, Wheat, Apple
} from 'lucide-react';
import type { Benefit } from '@/types';

interface Props {
  benefits: Benefit[];
}

const iconMap: Record<string, React.ReactNode> = {
  leaf: <Leaf size={24} />,
  flask: <FlaskConical size={24} />,
  zap: <Zap size={24} />,
  ban: <Ban size={24} />,
  factory: <Factory size={24} />,
  shield: <Shield size={24} />,
  droplets: <Droplets size={24} />,
  grain: <Wheat size={24} />,
  wheat: <Wheat size={24} />,
  fruit: <Apple size={24} />,
};

export default function BenefitsBlock({ benefits }: Props) {
  return (
    <section className="section-py">
      <div className="container-mf">
        <div className="text-center mb-10">
          <span className="text-label" style={{ color: 'var(--mf-cobalt)' }}>WHY MINDFUEL</span>
          <h2 className="text-h2 mt-2">Real food. Nothing hidden.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-3 p-5 rounded-2xl"
              style={{ backgroundColor: 'var(--mf-cream)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--mf-mint-soft)', color: 'var(--mf-cobalt)' }}
              >
                {iconMap[benefit.icon] ?? <Leaf size={24} />}
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--mf-ink)' }}>
                  {benefit.label.en}
                </p>
                {benefit.description && (
                  <p className="text-xs mt-0.5" style={{ color: 'var(--mf-graphite)' }}>
                    {benefit.description.en}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
