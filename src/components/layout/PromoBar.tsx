'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const messages = [
  '৳১৫০০-এর উপরে অর্ডারে বিনামূল্যে ডেলিভারি — FREE delivery over ৳1500',
  'বান্ডেল + সাবস্ক্রিপশনে ২৫% পর্যন্ত সাশ্রয় — Save up to 25% with bundles',
  'সীমিত গ্রীষ্মকালীন স্টক — সিড্‌রা ম্যাংগো ফিরে এসেছে — Seedra Mango back in stock',
];

export default function PromoBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="relative z-30 text-center py-2.5 px-10 text-xs sm:text-sm font-semibold rounded-t-[1.75rem] md:rounded-t-[2.25rem]"
      style={{ backgroundColor: 'var(--mf-purple)', color: '#FFFFFF' }}
    >
      <div key={current} style={{ animation: 'fadeIn 0.4s ease' }}>
        {messages[current]}
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="Dismiss promo banner"
      >
        <X size={15} />
      </button>
    </div>
  );
}
