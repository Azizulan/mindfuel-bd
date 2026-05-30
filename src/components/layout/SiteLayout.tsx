import PromoBar from './PromoBar';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-frame">
      <div className="site-card flex flex-col min-h-[calc(100vh-1.5rem)]">
        <PromoBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <WhatsAppFloat />
    </div>
  );
}
