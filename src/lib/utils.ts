import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return `৳${amount.toLocaleString('en-BD')}`;
}

export function calculateSavings(original: number, discounted: number): number {
  return Math.round(((original - discounted) / original) * 100);
}

export function buildWhatsAppMessage(items: CartWhatsAppItem[], customerInfo?: { name?: string; phone?: string }): string {
  const lines: string[] = ['*MINDFUEL অর্ডার*', ''];

  items.forEach((item, i) => {
    lines.push(`${i + 1}. ${item.name} × ${item.qty} — ৳${item.total}`);
  });

  const total = items.reduce((sum, item) => sum + item.total, 0);
  lines.push('');
  lines.push(`*মোট: ৳${total}*`);

  if (customerInfo?.name) {
    lines.push('');
    lines.push(`নাম: ${customerInfo.name}`);
  }
  if (customerInfo?.phone) {
    lines.push(`ফোন: ${customerInfo.phone}`);
  }

  lines.push('');
  lines.push('ডেলিভারি ঠিকানা: (এখানে লিখুন)');

  return encodeURIComponent(lines.join('\n'));
}

interface CartWhatsAppItem {
  name: string;
  qty: number;
  total: number;
}
