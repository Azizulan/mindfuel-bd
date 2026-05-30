import Link from 'next/link';
import { Leaf, Eye, Heart } from 'lucide-react';

const pillars = [
  {
    icon: <Leaf size={28} />,
    title: 'Real Ingredients',
    titleBn: 'আসল উপাদান',
    desc: 'No palm oil. No added sugar. No preservatives you can\'t pronounce. We list every ingredient because we\'re proud of every one.',
    link: '/our-process',
    linkLabel: 'See our ingredients →',
  },
  {
    icon: <Eye size={28} />,
    title: 'Transparent Process',
    titleBn: 'স্বচ্ছ প্রক্রিয়া',
    desc: 'Our own facility. BCSIR lab-tested before every batch ships. We invite you to see everything — because real food hides nothing.',
    link: '/our-process',
    linkLabel: 'Tour the factory →',
  },
  {
    icon: <Heart size={28} />,
    title: 'Made for Bangladeshi Families',
    titleBn: 'বাংলাদেশি পরিবারের জন্য',
    desc: 'Built from the ground up for our families\' tastes, nutrition needs, and budget. Local ingredients. Local standards. Real love.',
    link: '/our-story',
    linkLabel: 'Read our story →',
  },
];

export default function WhyMINDFUEL() {
  return (
    <section className="section-py" style={{ backgroundColor: 'var(--mf-cream)' }}>
      <div className="container-mf">
        <div className="text-center mb-12">
          <span className="text-label" style={{ color: 'var(--mf-cobalt)' }}>WHY WE EXIST</span>
          <h2 className="text-h2 mt-2">
            MINDFUEL isn&apos;t just another food brand.
          </h2>
          <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: 'var(--mf-graphite)' }}>
            It&apos;s a promise that real food — made transparently, tested rigorously, built for your family — can exist right here in Bangladesh.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-white"
              style={{ boxShadow: '0 4px 16px rgba(15,23,42,0.06)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--mf-cobalt)', color: 'white' }}
              >
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-h3">{pillar.title}</h3>
                <p className="font-bn text-sm mt-0.5" style={{ color: 'var(--mf-graphite)' }}>{pillar.titleBn}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--mf-graphite)' }}>
                {pillar.desc}
              </p>
              <Link
                href={pillar.link}
                className="text-sm font-semibold mt-auto"
                style={{ color: 'var(--mf-cobalt)' }}
              >
                {pillar.linkLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
