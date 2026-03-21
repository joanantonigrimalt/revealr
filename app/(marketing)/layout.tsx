import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]" style={{ fontFamily: "'Epilogue', sans-serif" }}>
      <SiteNav />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
