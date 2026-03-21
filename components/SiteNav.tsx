import Link from 'next/link';

export default function SiteNav() {
  return (
    <header role="banner">
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-[#f0ece8] bg-white"
      >
        <Link
          href="/"
          aria-label="Revealr homepage"
          className="text-xl font-bold tracking-tight text-[#1a1814]"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          reveal<span className="text-[#e8572a]">r</span>
        </Link>

        <div className="hidden sm:flex items-center gap-8 text-sm text-[#6b6560] font-medium">
          <Link href="/rental-lease-review" className="hover:text-[#1a1814] transition-colors">
            Lease Review
          </Link>
          <Link href="/employment-contract-review" className="hover:text-[#1a1814] transition-colors">
            Employment
          </Link>
          <Link href="/nda-review" className="hover:text-[#1a1814] transition-colors">
            NDA
          </Link>
          <Link href="/freelance-contract-review" className="hover:text-[#1a1814] transition-colors">
            Freelance
          </Link>
          <Link href="/contract-risk-checker" className="hover:text-[#1a1814] transition-colors">
            Risk Checker
          </Link>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1.5 bg-[#1a1814] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-colors"
          style={{ fontFamily: "'Epilogue', sans-serif" }}
        >
          Analyze My Contract <span className="text-[#e8572a] ml-0.5">→</span>
        </Link>
      </nav>
    </header>
  );
}
