import Link from 'next/link';

const TOOL_CATEGORIES = [
  {
    label: 'Lease & Rental',
    links: [
      { href: '/lease-agreement-analyzer', label: 'Lease Agreement Analyzer' },
      { href: '/rental-lease-review', label: 'Rental Lease Review' },
      { href: '/analyze-my-lease', label: 'Analyze My Lease' },
      { href: '/lease-red-flags-before-signing', label: 'Lease Red Flags' },
      { href: '/security-deposit-clause-checker', label: 'Security Deposit' },
      { href: '/lease-renewal-review', label: 'Lease Renewal Review' },
      { href: '/landlord-entry-notice-clause', label: 'Landlord Entry Clause' },
      { href: '/maintenance-responsibility-in-lease', label: 'Maintenance Responsibility' },
    ],
  },
  {
    label: 'Employment & Job',
    links: [
      { href: '/employment-contract-review', label: 'Employment Contract Review' },
      { href: '/job-offer-review', label: 'Job Offer Review' },
      { href: '/termination-clause-review', label: 'Termination Clause Review' },
    ],
  },
  {
    label: 'NDA & Restrictive',
    links: [
      { href: '/nda-review', label: 'NDA Review' },
      { href: '/non-compete-agreement-review', label: 'Non-Compete Review' },
      { href: '/ip-assignment-agreement-review', label: 'IP Assignment Review' },
    ],
  },
  {
    label: 'Freelance & Services',
    links: [
      { href: '/freelance-contract-review', label: 'Freelance Contract Review' },
      { href: '/service-agreement-review', label: 'Service Agreement Review' },
      { href: '/independent-contractor-agreement-review', label: 'Contractor Agreement' },
      { href: '/consulting-agreement-review', label: 'Consulting Agreement' },
    ],
  },
  {
    label: 'Contract Review',
    links: [
      { href: '/review-contract-before-signing', label: 'Review Before Signing' },
      { href: '/contract-risk-checker', label: 'Contract Risk Checker' },
    ],
  },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/blog', label: 'Resources' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

const RESOURCE_LINKS = [
  { href: '/blog/how-to-review-a-lease-before-signing', label: 'How to Review a Lease' },
  { href: '/blog/common-lease-red-flags', label: 'Lease Red Flags Guide' },
  { href: '/blog/what-to-check-in-an-employment-contract', label: 'Employment Contract Guide' },
  { href: '/blog/common-nda-red-flags', label: 'NDA Red Flags Guide' },
  { href: '/blog/freelance-contract-mistakes', label: 'Freelance Contract Guide' },
  { href: '/blog/how-to-read-a-contract-with-ai', label: 'AI Contract Review Guide' },
];

export default function SiteFooter() {
  return (
    <footer role="contentinfo" className="border-t border-[#e8e4df] bg-white pt-12 pb-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Top row: logo/description + tool links */}
        <div className="flex flex-col md:flex-row gap-10 pb-10 border-b border-[#f0ece8]">

          {/* Brand column */}
          <div className="md:w-52 flex-shrink-0">
            <Link
              href="/"
              className="font-bold text-[#1a1814] text-lg"
              style={{ fontFamily: "var(--font-epilogue), system-ui, sans-serif" }}
            >
              reveal<span className="text-[#e8572a]">r</span>
            </Link>
            <p className="text-xs text-[#9c9590] mt-3 leading-relaxed">
              AI-powered contract analysis for tenants, employees, and freelancers. Know what you're signing.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 mt-5 bg-[#e8572a] hover:bg-[#c94820] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              Analyze a Contract →
            </Link>

            {/* Company links */}
            <div className="mt-6">
              <p className="text-xs font-bold text-[#1a1814] uppercase tracking-wider mb-2">Company</p>
              <ul className="space-y-1.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#6b6560] hover:text-[#e8572a] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tool categories */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {TOOL_CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <h3 className="text-xs font-bold text-[#1a1814] uppercase tracking-wider mb-3">
                  {cat.label}
                </h3>
                <ul className="space-y-2">
                  {cat.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs text-[#6b6560] hover:text-[#e8572a] transition-colors leading-relaxed block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Resources row */}
        <div className="py-7 border-b border-[#f0ece8]">
          <p className="text-xs font-bold text-[#1a1814] uppercase tracking-wider mb-3">Contract Guides</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {RESOURCE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[#6b6560] hover:text-[#e8572a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom: disclaimer + copyright */}
        <div className="pt-6">
          <p className="text-xs text-[#9c9590] leading-relaxed max-w-4xl">
            <strong className="font-semibold text-[#6b6560]">Disclaimer:</strong> Revealr is an AI-powered tool
            designed to help users identify potential risks in contracts and documents before signing. It does not
            constitute legal advice and is not a substitute for consultation with a licensed attorney in your
            jurisdiction. Results may vary depending on document quality, format, and applicable local law. Always
            verify flagged clauses with a qualified legal professional for complex or high-stakes agreements.
          </p>
          <p className="text-xs text-[#9c9590] mt-3">
            © {new Date().getFullYear()} Revealr. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
