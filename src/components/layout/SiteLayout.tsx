import PromoBar from './PromoBar';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
