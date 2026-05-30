import SiteLayout from '@/components/layout/SiteLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story — Why MINDFUEL Exists',
  description: 'The story behind MINDFUEL — a Bangladeshi real-food brand built by a founder who got tired of buying imported products when Bangladesh had everything needed to make them.',
};

export default function OurStoryPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section
        className="py-20 md:py-32"
        style={{ backgroundColor: 'var(--mf-cobalt-deep)' }}
      >
        <div className="container-mf max-w-3xl">
          <span className="text-label" style={{ color: 'var(--mf-mint)' }}>OUR STORY</span>
          <h1 className="text-display-l text-white mt-4 mb-6">
            Why I started MINDFUEL — and why it took me longer than I expected.
          </h1>
          <p className="text-lg" style={{ color: 'var(--mf-mint-soft)', opacity: 0.8 }}>
            A Bangladeshi founder. A simple question. A long journey to real food.
          </p>
        </div>
      </section>

      {/* Story fragments */}
      <section className="section-py">
        <div className="container-mf max-w-3xl">
          <div className="flex flex-col gap-16">
            {/* Fragment 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div
                className="aspect-square rounded-2xl flex items-center justify-center text-6xl"
                style={{ backgroundColor: 'var(--mf-cream)' }}
              >
                🧠
              </div>
              <div>
                <span className="text-label text-xs" style={{ color: 'var(--mf-cobalt)' }}>THE QUESTION</span>
                <h2 className="text-h2 mt-2 mb-4">
                  &ldquo;Why are we paying 5x more for imported peanut butter — when Bangladesh grows the peanuts?&rdquo;
                </h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mf-graphite)' }}>
                  That was the question that started everything. Reading ingredient labels on imported peanut butters. Palm oil as the second ingredient. Added sugar. Preservatives. And a price tag that made no sense for a country that produces peanuts locally.
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <blockquote
              className="border-l-4 pl-6 py-4 text-xl font-medium"
              style={{ borderColor: 'var(--mf-amber)', color: 'var(--mf-ink)' }}
            >
              &ldquo;Bangladesh doesn&apos;t need to import healthy food. We just needed someone to actually make it — properly, transparently, here.&rdquo;
            </blockquote>

            {/* Fragment 2 */}
            <div>
              <span className="text-label text-xs" style={{ color: 'var(--mf-cobalt)' }}>THE PROBLEM WE FOUND</span>
              <h2 className="text-h2 mt-2 mb-4">
                Local peanut butters weren&apos;t clean either.
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--mf-graphite)' }}>
                We tested what was available. Most local brands used palm oil to extend shelf life and cut costs. Many added refined sugar. None had independent lab verification. The &quot;healthy&quot; label was marketing, not fact.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mf-graphite)' }}>
                That&apos;s when we decided: if we want real food in Bangladesh, we have to make it ourselves.
              </p>
            </div>

            {/* Fragment 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-label text-xs" style={{ color: 'var(--mf-cobalt)' }}>THE PROMISE</span>
                <h2 className="text-h2 mt-2 mb-4">
                  Real ingredients. Transparent process. BCSIR verified.
                </h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--mf-graphite)' }}>
                  We built our own facility. We source from traceable Bangladeshi farms. We test every batch at BCSIR before it ships. Not because we have to — because we want you to trust what you eat.
                </p>
                <p className="font-bn text-base mt-4" style={{ color: 'var(--mf-graphite)' }}>
                  আমরা বিশ্বাস করি আপনি জানার অধিকার রাখেন আপনার খাবারে কী আছে।
                </p>
              </div>
              <div
                className="aspect-square rounded-2xl flex items-center justify-center text-6xl"
                style={{ backgroundColor: 'var(--mf-mint-soft)' }}
              >
                🏭
              </div>
            </div>

            {/* Fragment 4 */}
            <div
              className="p-8 rounded-2xl text-center"
              style={{ backgroundColor: 'var(--mf-cobalt)', color: 'white' }}
            >
              <p className="text-2xl font-bold mb-3">23,000+ orders later.</p>
              <p className="text-base" style={{ color: 'var(--mf-mint-soft)', opacity: 0.85 }}>
                We&apos;re still making the same peanut butter. Same ingredients. Same promise. Just more of it — and now with granola, muesli, nuts, seeds, and Seedra fiber drink. The brand has grown. The values haven&apos;t changed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
