'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '@/types';

interface Props {
  faqs: FAQ[];
}

export default function ProductFAQ({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="section-py" style={{ backgroundColor: 'var(--mf-cream)' }}>
      <div className="container-mf max-w-3xl">
        <div className="text-center mb-10">
          <span className="text-label" style={{ color: 'var(--mf-cobalt)' }}>GOT QUESTIONS?</span>
          <h2 className="text-h2 mt-2">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: 'var(--mf-mist)', backgroundColor: 'white' }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold pr-4" style={{ color: 'var(--mf-ink)' }}>
                  {faq.question.en}
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 transition-transform"
                  style={{
                    color: 'var(--mf-cobalt)',
                    transform: open === i ? 'rotate(180deg)' : 'none',
                  }}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 border-t" style={{ borderColor: 'var(--mf-mist)' }}>
                  <p className="text-sm leading-relaxed pt-4" style={{ color: 'var(--mf-graphite)' }}>
                    {faq.answer.en}
                  </p>
                  {faq.answer.bn && (
                    <p className="font-bn text-sm leading-relaxed mt-2" style={{ color: 'var(--mf-graphite)' }}>
                      {faq.answer.bn}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
