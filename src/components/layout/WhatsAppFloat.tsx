'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801XXXXXXXXX';
  const message = encodeURIComponent(
    'হ্যালো MINDFUEL! আমি একটি অর্ডার করতে চাই। / Hello MINDFUEL! I\'d like to place an order.'
  );

  return (
    <a
      href={`https://wa.me/${waNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-30 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg text-white text-sm font-semibold transition-transform hover:scale-105 hover:shadow-xl"
      style={{ backgroundColor: '#25D366', boxShadow: '0 8px 24px rgba(37,211,102,0.4)' }}
      aria-label="Order via WhatsApp"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">Order on WhatsApp</span>
    </a>
  );
}
