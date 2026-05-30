'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const messages = [
  '৳১৫০০-এর উপরে অর্ডারে বিনামূল্যে ডেলিভারি — FREE delivery on orders above ৳1500',
  'বান্ডেল + সাবস্ক্রিপশনে ২৫% পর্যন্ত সাশ্রয় করুন — Save up to 25% with bundles',
  'সীমিত গ্রীষ্মকালীন স্টক — সিড্‌রা ম্যাংগো ফ্লেভার ফিরে এসেছে — Seedra Mango back in stock',
  'BCSIR পরীক্ষিত — No palm oil. No added sugar. Real food guaranteed.',
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
      className="relative z-50 text-center py-2.5 px-10 text-sm font-medium"
      style={{ backgroundColor: 'var(--mf-cobalt)', color: 'var(--mf-mint-soft)' }}
    >
      <div
        key={current}
        className="transition-all duration-500"
        style={{ animation: 'fadeIn 0.4s ease' }}
      >
        {messages[current]}
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
