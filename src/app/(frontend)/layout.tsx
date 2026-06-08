import type { Metadata } from 'next';
import { Manrope, Hind_Siliguri, Lilita_One } from 'next/font/google';
import '../globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  variable: '--font-hind-siliguri',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const lilitaOne = Lilita_One({
  subsets: ['latin'],
  variable: '--font-lilita',
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: {
    default: 'MINDFUEL — Real Food. Made in Bangladesh.',
    template: '%s | MINDFUEL',
  },
  description:
    'MINDFUEL makes real food for Bangladeshi families. Peanut butter, granola, muesli, nuts, and Seedra fiber drink — no palm oil, no added sugar, BCSIR lab tested.',
  keywords: [
    'peanut butter bangladesh',
    'real food bangladesh',
    'granola bangladesh',
    'healthy food dhaka',
    'BCSIR tested',
    'no palm oil peanut butter',
    'mindfuel',
  ],
  openGraph: {
    siteName: 'MINDFUEL',
    locale: 'en_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mindfuelbd.com'),
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${hindSiliguri.variable} ${lilitaOne.variable}`}
    >
      <body className="min-h-screen text-mf-ink antialiased" style={{ backgroundColor: 'var(--mf-espresso)' }}>
        {children}
      </body>
    </html>
  );
}
