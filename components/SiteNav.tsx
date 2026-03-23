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
          className="flex items-center gap-1.5 group"
        >
          {/* Lettermark badge */}
          <div className="w-7 h-7 rounded-md bg-[#1a1814] flex items-center justify-center flex-shrink-0">
            <span className="text-[#e8572a] font-bold text-sm leading-none" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>r</span>
          </div>
          <span className="text-[1.1rem] font-bold tracking-tight text-[#1a1814]" style={{ fontFamily: "var(--font-epilogue), system-ui, sans-serif" }}>
            reveal<span className="text-[#e8572a]">r</span>
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-7 text-sm text-[#6b6560] font-medium">
          <Link href="/lease-agreement-analyzer" className="hover:text-[#1a1814] transition-colors">
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
          <Link href="/purchase-agreement-review" className="hover:text-[#1a1814] transition-colors">
            Purchase
          </Link>
          <Link href="/blog" className="hover:text-[#1a1814] transition-colors">
            Resources
          </Link>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1.5 bg-[#1a1814] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-black transition-colors"
          style={{ fontFamily: "var(--font-epilogue), system-ui, sans-serif" }}
        >
          Analyze My Contract <span className="text-[#e8572a] ml-0.5">→</span>
        </Link>
      </nav>
    </header>
  );
}
