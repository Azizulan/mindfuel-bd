export const currentSeason = {
  heroProduct: 'seedra',
  heroProductSlug: 'seedra',
  heroBandCopy: {
    en: 'Beat the summer heat with Seedra — 8g fiber, zero sugar, real gut relief in 30 seconds.',
    bn: 'সিড্‌রা দিয়ে গ্রীষ্মের গরম থেকে বাঁচুন — ৮গ্রাম ফাইবার, চিনি শূন্য, ৩০ সেকেন্ডে আসল হজমের সমাধান।',
  },
  heroBandCta: {
    en: 'Try Seedra →',
    bn: 'সিড্‌রা দেখুন →',
  },
  heroBandColor: 'amber' as const,
  heroBandBg: '#FEF3C7',
  heroBandText: '#92400E',
  startDate: '2026-05-01',
  endDate: '2026-09-30',
};

export type SeasonConfig = typeof currentSeason;
