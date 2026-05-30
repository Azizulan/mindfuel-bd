import type { FreeGift } from '@/types';

export const freeGifts: FreeGift[] = [
  {
    id: 'spoon',
    label: { en: 'MINDFUEL Branded Spoon', bn: 'MINDFUEL ব্র্যান্ডেড চামচ' },
    image: '/images/gifts/spoon.jpg',
    inStock: true,
  },
  {
    id: 'seedra-sample',
    label: { en: 'Seedra Sample Sachet (3 serves)', bn: 'সিড্‌রা স্যাম্পল স্যাচেট (৩ সার্ভিং)' },
    image: '/images/gifts/seedra-sample.jpg',
    inStock: true,
  },
  {
    id: 'recipe-booklet',
    label: { en: 'MINDFUEL Recipe Booklet', bn: 'MINDFUEL রেসিপি বুকলেট' },
    image: '/images/gifts/recipe-booklet.jpg',
    inStock: false,
  },
  {
    id: 'tote-bag',
    label: { en: 'MINDFUEL Cotton Tote Bag', bn: 'MINDFUEL কটন টোট ব্যাগ' },
    image: '/images/gifts/tote-bag.jpg',
    inStock: false,
  },
];
