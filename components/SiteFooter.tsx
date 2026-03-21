import Link from 'next/link';

const FOOTER_CATEGORIES = [
  {
    label: 'Lease & Rental',
    links: [
      { href: '/lease-agreement-analyzer', label: 'Lease Agreement Analyzer' },
      { href: '/analyze-my-lease', label: 'Analyze My Lease' },
      { href: '/rental-lease-review', label: 'Rental Lease Review' },
      { href: '/lease-red-flags-before-signing', label: 'Lease Red Flags' },
      { href: '/security-deposit-clause-checker', label: 'Security Deposit Checker' },
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
      { href: '/non-compete-agreement-review', label: 'Non-Compete Agreement Review' },
      { href: '/ip-assignment-agreement-review', label: 'IP Assignment Agreement Review' },
    ],
  },
  {
    label: 'Freelance & Services',
    links: [
      { href: '/freelance-contract-review', label: 'Freelance Contract Review' },
      { href: '/service-agreement-review', label: 'Service Agreement Review' },
      { href: '/independent-contractor-agreement-review', label: 'Contractor Agreement Review' },
      { href: '/consulting-agreement-review', label: 'Consulting Agreement Review' },
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

export default function SiteFooter() {
  return (
    <footer role="contentinfo" className="border-t border-[#e8e4df] bg-white pt-12 pb-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Top row: logo + description */}
        <div className="flex flex-col md:flex-row gap-10 pb-10 border-b border-[#f0ece8]">
          <div className="md:w-56 flex-shrink-0">
            <Link
              href="/"
              className="font-bold text-[#1a1814] text-lg"
              style={{ fontFamily: "'Epilogue', sans-serif" }}
            >
              reveal<span className="text-[#e8572a]">r</span>
            </Link>
            <p className="text-xs text-[#9c9590] mt-3 leading-relaxed">
              AI-powered contract analysis for tenants, employees, and freelancers. Identify every risky clause before you sign.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 mt-5 bg-[#e8572a] hover:bg-[#c94820] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              Analyze a Contract →
            </Link>
          </div>

          {/* Link categories grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {FOOTER_CATEGORIES.map((cat) => (
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

        {/* Bottom row: disclaimer + copyright */}
        <div className="pt-6">
          <p className="text-xs text-[#9c9590] leading-relaxed max-w-4xl">
            <strong className="font-semibold text-[#6b6560]">Disclaimer:</strong> Revealr is an AI-powered tool designed to help users identify potential risks in contracts and documents before signing. It does not constitute legal advice and is not a substitute for consultation with a licensed attorney in your jurisdiction. Results may vary depending on document quality, format, and applicable local law. Always verify flagged clauses with a qualified legal professional for complex or high-stakes agreements.
          </p>
          <p className="text-xs text-[#9c9590] mt-3">
            © {new Date().getFullYear()} Revealr. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
