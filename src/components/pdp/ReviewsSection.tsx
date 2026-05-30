'use client';

import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import type { Review } from '@/types';
import reviewsData from '@/data/reviews.json';

interface Props {
  productSlug: string;
  rating: number;
  reviewCount: number;
}

export default function ReviewsSection({ productSlug, rating, reviewCount }: Props) {
  const allReviews = (reviewsData as Review[]).filter((r) => r.productSlug === productSlug);
  const [filter, setFilter] = useState<'all' | 'verified' | 'helpful'>('all');
  const [shown, setShown] = useState(3);

  const filtered = allReviews.filter((r) => {
    if (filter === 'verified') return r.verified;
    if (filter === 'helpful') return r.helpful > 50;
    return true;
  });

  const starDist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: allReviews.filter((r) => Math.round(r.rating) === s).length,
  }));

  return (
    <section id="reviews" className="section-py">
      <div className="container-mf">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Rating summary */}
          <div>
            <h2 className="text-h2 mb-6">Customer Reviews</h2>
            <div className="flex items-start gap-4 mb-6">
              <span className="text-6xl font-extrabold" style={{ color: 'var(--mf-cobalt)' }}>
                {rating}
              </span>
              <div className="pt-3">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      style={{
                        color: 'var(--mf-amber)',
                        fill: i < Math.floor(rating) ? 'var(--mf-amber)' : 'none',
                      }}
                    />
                  ))}
                </div>
                <p className="text-sm" style={{ color: 'var(--mf-graphite)' }}>
                  Based on {reviewCount} reviews
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {starDist.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm w-4 text-right" style={{ color: 'var(--mf-graphite)' }}>
                    {star}
                  </span>
                  <Star size={12} style={{ color: 'var(--mf-amber)', fill: 'var(--mf-amber)' }} />
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--mf-mist)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: 'var(--mf-amber)',
                        width: allReviews.length ? `${(count / allReviews.length) * 100}%` : '0%',
                      }}
                    />
                  </div>
                  <span className="text-sm w-4" style={{ color: 'var(--mf-graphite)' }}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews list */}
          <div className="lg:col-span-2">
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(['all', 'verified', 'helpful'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setShown(3); }}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all cursor-pointer"
                  style={{
                    borderColor: filter === f ? 'var(--mf-cobalt)' : 'var(--mf-mist)',
                    backgroundColor: filter === f ? 'var(--mf-cobalt)' : 'transparent',
                    color: filter === f ? 'white' : 'var(--mf-graphite)',
                  }}
                >
                  {f === 'all' ? 'All Reviews' : f === 'verified' ? 'Verified' : 'Most Helpful'}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="py-12 text-center" style={{ color: 'var(--mf-graphite)' }}>
                No reviews yet for this filter.
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {filtered.slice(0, shown).map((review) => (
                  <div
                    key={review.id}
                    className="p-5 rounded-2xl border"
                    style={{ borderColor: 'var(--mf-mist)', backgroundColor: 'var(--mf-cream)' }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold" style={{ color: 'var(--mf-ink)' }}>
                            {review.customerName}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--mf-graphite)' }}>
                            {review.location}
                          </span>
                          {review.verified && (
                            <span className="badge badge-mint text-xs">Verified</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              style={{
                                color: 'var(--mf-amber)',
                                fill: i < review.rating ? 'var(--mf-amber)' : 'none',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs shrink-0" style={{ color: 'var(--mf-graphite)' }}>
                        {new Date(review.date).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--mf-ink)' }}>
                      {review.body}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <ThumbsUp size={14} style={{ color: 'var(--mf-graphite)' }} />
                      <span className="text-xs" style={{ color: 'var(--mf-graphite)' }}>
                        {review.helpful} found this helpful
                      </span>
                    </div>
                  </div>
                ))}

                {shown < filtered.length && (
                  <button
                    onClick={() => setShown((s) => s + 6)}
                    className="btn-secondary w-full py-3"
                  >
                    Load more reviews
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
