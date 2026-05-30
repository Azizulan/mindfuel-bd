import { Leaf, FlaskConical, Zap, Star } from 'lucide-react';
import type { Product } from '@/types';

interface Props {
  product: Product;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'flask': return <FlaskConical size={24} />;
    case 'zap': return <Zap size={24} />;
    case 'star': return <Star size={24} />;
    default: return <Leaf size={24} />;
  }
};

const defaultProps = [
  { icon: 'leaf', label: 'Real Food. No Junk.' },
  { icon: 'flask', label: 'BCSIR Lab Tested' },
  { icon: 'zap', label: 'High Protein / Fiber' },
  { icon: 'star', label: '4.8★ from 2,000+ orders' },
];

export default function QuickValueProps({ product }: Props) {
  const props = product.keyBenefits.slice(0, 4);

  return (
    <section
      className="py-8 border-y"
      style={{ borderColor: 'var(--mf-mist)', backgroundColor: 'var(--mf-cream)' }}
    >
      <div className="container-mf">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(props.length >= 4 ? props : defaultProps).slice(0, 4).map((prop, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 py-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--mf-cobalt)', color: 'white' }}
              >
                {getIcon('icon' in prop ? (prop as { icon: string }).icon : '')}
              </div>
              <span className="text-sm font-semibold leading-tight" style={{ color: 'var(--mf-ink)' }}>
                {'label' in prop && typeof prop.label === 'object'
                  ? (prop.label as { en: string }).en
                  : (prop as { label: string }).label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
