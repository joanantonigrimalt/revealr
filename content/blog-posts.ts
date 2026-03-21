// ─────────────────────────────────────────────────────────────────────────────
// content/blog-posts.ts
// Blog content hub — 10 articles supporting SEO clusters.
// Each post is a proper article (not just a stub) with real headings,
// intro, sections, and contextual links to the relevant landing pages.
// ─────────────────────────────────────────────────────────────────────────────

export type BlogCategory =
  | 'lease'
  | 'employment'
  | 'nda'
  | 'freelance'
  | 'general';

export interface BlogSection {
  h2: string;
  paragraphs: string[];
  h3s?: { heading: string; body: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;               // Full title — NO brand suffix (template adds it)
  metaDescription: string;
  h1: string;
  category: BlogCategory;
  publishedAt: string;         // ISO 8601
  updatedAt?: string;
  excerpt: string;             // 1-2 sentence summary for the blog index
  readingTime: number;         // minutes
  relatedLanding: { href: string; anchor: string };
  relatedPosts: { href: string; anchor: string }[];
  sections: BlogSection[];
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA — 10 articles
// ─────────────────────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-review-a-lease-before-signing',
    title: 'How to Review a Lease Before Signing (The Complete Guide)',
    metaDescription:
      'Step-by-step guide to reviewing a rental lease before you sign. Learn which clauses to read carefully, common red flags, and how AI can help you avoid costly mistakes.',
    h1: 'How to Review a Lease Before Signing',
    category: 'lease',
    publishedAt: '2025-01-15',
    updatedAt: '2025-03-01',
    excerpt:
      'Most tenants sign a lease in under 10 minutes. Here\'s how to actually review it — and what to look for before you commit.',
    readingTime: 8,
    relatedLanding: { href: '/lease-agreement-analyzer', anchor: 'Lease Agreement Analyzer' },
    relatedPosts: [
      { href: '/blog/common-lease-red-flags', anchor: 'Common Lease Red Flags' },
      { href: '/blog/security-deposit-clause-explained', anchor: 'Security Deposit Clause Explained' },
      { href: '/blog/early-termination-fee-clause', anchor: 'Early Termination Fee Explained' },
    ],
    sections: [
      {
        h2: 'Why Most People Don\'t Read Their Lease (And Pay for It)',
        paragraphs: [
          'The average U.S. residential lease is 12–20 pages. Most tenants sign it within 24–48 hours of receiving it, often under implicit pressure not to lose the apartment. A 2023 survey found that over 60% of renters have encountered a clause they didn\'t notice until after moving in — and of those, more than half resulted in a financial dispute.',
          'Leases are written to protect landlords, not tenants. That\'s not a conspiracy — it\'s just the reality of who drafts them. Standard clauses like "tenant is responsible for all repairs under $200" or "security deposit is non-refundable" can cost you hundreds or thousands of dollars if you don\'t notice them upfront.',
        ],
      },
      {
        h2: 'The 8 Things You Must Check in Every Lease',
        paragraphs: [
          'Not all lease clauses matter equally. Here are the ones that cause the most problems:',
        ],
        h3s: [
          {
            heading: '1. Security deposit terms',
            body: 'Understand what portion is refundable, under what conditions deductions are allowed, and the return deadline (most states require 14–30 days). Watch for "non-refundable cleaning fee" language — in many states, this is unenforceable.',
          },
          {
            heading: '2. Early termination clause',
            body: 'If you need to leave before the lease ends, what does it cost? Some leases charge two months\' rent; others require you to pay until a new tenant is found. Understand this before you sign.',
          },
          {
            heading: '3. Automatic renewal provision',
            body: 'Many leases automatically renew for another full term unless you give 30–60 days\' written notice before expiration. Missing this window can lock you in for another year.',
          },
          {
            heading: '4. Landlord entry rights',
            body: 'State law sets minimum notice requirements (typically 24–48 hours), but some leases override this with broader entry rights. Check what your lease says versus what your state requires.',
          },
          {
            heading: '5. Rent increase provisions',
            body: 'Fixed-term leases lock in rent for the term; month-to-month arrangements allow increases with proper notice. But some leases include clauses allowing increases mid-term or at renewal with minimal notice.',
          },
          {
            heading: '6. Maintenance and repair responsibilities',
            body: 'Understand who is responsible for appliances, HVAC filters, pest control, and minor repairs. "Tenant responsible for all repairs under $X" clauses are common and easy to miss.',
          },
          {
            heading: '7. Pet, subletting, and occupancy clauses',
            body: 'These affect your flexibility throughout the tenancy. Subletting restrictions matter if you travel; occupancy limits affect having guests or a roommate.',
          },
          {
            heading: '8. Dispute resolution and attorney fees',
            body: 'Some leases require binding arbitration instead of court, or include clauses that make the tenant pay the landlord\'s attorney fees even if the tenant wins. These are significant.',
          },
        ],
      },
      {
        h2: 'How to Use AI to Review a Lease',
        paragraphs: [
          'AI tools like Revealr can read your entire lease and surface potential risks in seconds — faster and more consistently than most people can manage manually after a long day of apartment hunting.',
          'An AI lease analyzer won\'t replace legal advice for high-stakes disputes, but it will: catch clauses you might miss when skimming, explain legal language in plain English, score the overall risk level, and suggest what to negotiate or ask the landlord before signing.',
          'The most productive workflow: upload your lease, review the AI flags, research any that concern you, and ask the landlord to clarify or modify problematic clauses before signing. Most landlords are willing to negotiate language when asked directly.',
        ],
      },
      {
        h2: 'What to Do If You Find a Problem Clause',
        paragraphs: [
          'Finding a red flag doesn\'t mean you can\'t sign the lease. It means you have information to work with. Your options are: (1) ask the landlord to remove or amend the clause, (2) get written clarification on how they actually apply it, (3) factor the risk into your decision, or (4) walk away.',
          'Most landlords will remove or soften genuinely unreasonable clauses — especially if you frame it as wanting clarity rather than confrontation. "I noticed clause 14 says the deposit is non-refundable — can we change that to standard state law terms?" is a reasonable ask.',
          'If a landlord refuses to modify a clause that appears to violate state tenant protection law, that\'s useful information about what working with that landlord might be like.',
        ],
      },
      {
        h2: 'Limitations: What a Lease Review Tool Can\'t Tell You',
        paragraphs: [
          'AI analysis and even careful reading can\'t tell you: whether the landlord actually follows the lease\'s terms, what the local rental market is like, whether the unit has unresolved maintenance issues, or whether specific clauses are actually enforceable in your jurisdiction.',
          'For leases with unusually complex language, high-value properties, or clauses that seem clearly illegal, a local tenant\'s rights organization or attorney consultation is worth the time.',
        ],
      },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'common-lease-red-flags',
    title: 'Common Lease Red Flags: 10 Clauses to Watch Out For',
    metaDescription:
      'These 10 lease clauses cost tenants money every year. Learn what to look for, why each clause is problematic, and what to do if your lease contains them.',
    h1: 'Common Lease Red Flags: 10 Clauses to Watch Out For',
    category: 'lease',
    publishedAt: '2025-01-22',
    excerpt:
      'From non-refundable deposits to overbroad landlord entry rights — these are the clauses that most commonly lead to disputes and financial loss.',
    readingTime: 7,
    relatedLanding: { href: '/lease-red-flags-before-signing', anchor: 'Lease Red Flags Checker' },
    relatedPosts: [
      { href: '/blog/how-to-review-a-lease-before-signing', anchor: 'How to Review a Lease Before Signing' },
      { href: '/blog/security-deposit-clause-explained', anchor: 'Security Deposit Clause Explained' },
      { href: '/blog/landlord-entry-clause-explained', anchor: 'Landlord Entry Clause Explained' },
    ],
    sections: [
      {
        h2: 'Why Lease Clauses Matter More Than You Think',
        paragraphs: [
          'A lease is a legally binding contract worth tens of thousands of dollars over its term. Yet most tenants spend more time researching a restaurant than reviewing the document that governs their home for the next year or more.',
          'These are the 10 clauses that appear most frequently in legal disputes and tenant complaints — and what to do if you find them.',
        ],
      },
      {
        h2: 'The 10 Most Problematic Lease Clauses',
        paragraphs: [''],
        h3s: [
          {
            heading: '1. Non-refundable security deposit',
            body: 'In most U.S. states, security deposits must be returned minus documented damage. A clause declaring the entire deposit "non-refundable" or calling it a "non-refundable cleaning fee" may violate state law — but you still have to fight to get it back. Ask the landlord to change this to standard state-law language before signing.',
          },
          {
            heading: '2. Automatic renewal with long notice windows',
            body: 'Leases that renew automatically for another full term unless you give 60–90 days\' notice before expiration are a trap for distracted tenants. Set a calendar reminder the day you sign.',
          },
          {
            heading: '3. Overbroad landlord entry rights',
            body: 'Many states require 24–48 hours\' notice before landlord entry (except emergencies). A lease clause saying the landlord may enter "at any time for any reason" likely violates your state\'s law — but you\'d have to enforce it.',
          },
          {
            heading: '4. Automatic rent increases',
            body: 'Some leases include a provision that rent increases by a fixed percentage at renewal or annually, even during a fixed term. Know the numbers before you sign.',
          },
          {
            heading: '5. Tenant-pays-all maintenance up to large amounts',
            body: '"Tenant is responsible for all repairs and maintenance costing less than $300" sounds minor until your refrigerator breaks. Understand what\'s covered and what isn\'t.',
          },
          {
            heading: '6. Joint and several liability without clear limits',
            body: 'If you\'re co-signing with roommates, "joint and several liability" means each tenant is 100% responsible for the full rent. If a roommate stops paying, you\'re on the hook for their share.',
          },
          {
            heading: '7. Lease guaranty clauses',
            body: 'Some leases require a guarantor even when the tenant qualifies independently, or the guaranty extends beyond the initial term. Make sure your guarantor understands their full exposure.',
          },
          {
            heading: '8. Mandatory arbitration',
            body: 'Clauses requiring disputes to go to binding arbitration instead of small claims court or tenant tribunal eliminate some of your most effective low-cost options as a tenant.',
          },
          {
            heading: '9. Attorney\'s fee clauses that only protect the landlord',
            body: 'Watch for one-way attorney\'s fee clauses — the tenant pays the landlord\'s fees if they lose, but the landlord doesn\'t pay the tenant\'s fees. Truly mutual clauses aren\'t inherently bad.',
          },
          {
            heading: '10. Liquidated damages for early termination far above actual damages',
            body: 'An early termination fee of 2+ months\' rent may not be enforceable in all jurisdictions if it\'s disproportionate to the landlord\'s actual damages. Know the number before you sign and research enforceability in your state.',
          },
        ],
      },
      {
        h2: 'What to Do When You Find Red Flags',
        paragraphs: [
          'Finding these clauses doesn\'t automatically mean the landlord is acting in bad faith — many are pulled from standard form leases without much thought. Ask for changes before signing. Most landlords will agree to bring unusual clauses in line with standard state practice.',
          'If the landlord refuses to negotiate any problematic terms, document your request and their refusal. That record can matter later.',
        ],
      },
    ],
  },

  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'landlord-entry-clause-explained',
    title: 'Landlord Entry Clause Explained: What Your Lease Should (and Shouldn\'t) Say',
    metaDescription:
      'Understand landlord entry clauses in rental leases. Learn what notice is legally required, which clauses go too far, and how to protect your right to privacy as a tenant.',
    h1: 'Landlord Entry Clause Explained',
    category: 'lease',
    publishedAt: '2025-02-03',
    excerpt:
      'Every lease includes entry rights — but not all are legal. Here\'s what your landlord can and can\'t do, and how to spot overreaching language.',
    readingTime: 5,
    relatedLanding: { href: '/landlord-entry-notice-clause', anchor: 'Landlord Entry Clause Checker' },
    relatedPosts: [
      { href: '/blog/common-lease-red-flags', anchor: 'Common Lease Red Flags' },
      { href: '/blog/how-to-review-a-lease-before-signing', anchor: 'How to Review a Lease Before Signing' },
    ],
    sections: [
      {
        h2: 'What a Landlord Entry Clause Is',
        paragraphs: [
          'Every residential lease includes language about when and how a landlord can enter the rental unit. This matters because your right to "quiet enjoyment" — the right to live in your home without unreasonable interference — is a fundamental tenant protection in every U.S. state.',
          'The entry clause defines the boundaries of that right. When it\'s written too broadly, it can effectively void your privacy protections.',
        ],
      },
      {
        h2: 'What State Law Typically Requires',
        paragraphs: [
          'Most U.S. states require landlords to provide advance written notice — typically 24 to 48 hours — before entering a rental unit for non-emergency reasons. The exact requirement varies by state: California requires 24 hours, New York requires "reasonable" notice, Texas requires "reasonable" notice interpreted as 24 hours in practice.',
          'Emergency entry (fire, flooding, gas leak, imminent danger) is generally allowed without notice in all states. Landlords typically also have the right to enter for: repairs requested by the tenant, inspections required by law, showing the unit to prospective tenants or buyers (with notice), and pest control.',
        ],
      },
      {
        h2: 'Lease Language That Should Concern You',
        paragraphs: [
          'Watch for these patterns in entry clauses:',
        ],
        h3s: [
          {
            heading: 'No notice required for inspections',
            body: '"Landlord may enter at any time to inspect the property" — without a notice requirement — violates most states\' tenant protection statutes and is likely unenforceable. But you still have to deal with it.',
          },
          {
            heading: 'Frequent or unscheduled inspections',
            body: 'Clauses allowing monthly inspections or "periodic inspections at landlord\'s discretion" can create harassment situations. Normal landlord entry rights don\'t include routine surveillance.',
          },
          {
            heading: 'Notice shorter than state law minimum',
            body: 'A lease requiring only "same-day notice" in a state that mandates 24 hours doesn\'t override state law — but proves the landlord either didn\'t know or didn\'t care about their legal obligations.',
          },
        ],
      },
      {
        h2: 'What Good Entry Clause Language Looks Like',
        paragraphs: [
          'A fair entry clause will: specify the required notice period (matching or exceeding state law), list the legitimate reasons for entry, carve out genuine emergencies, and describe how notice is given (written, text, phone).',
          'If your lease lacks a clear entry clause altogether, state law defaults apply — which is generally fine for tenants in states with strong tenant protections.',
        ],
      },
    ],
  },

  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'security-deposit-clause-explained',
    title: 'Security Deposit Clause Explained: What\'s Legal and What Isn\'t',
    metaDescription:
      'Learn what landlords can legally do with your security deposit, what deductions are allowed, when it must be returned, and how to spot illegal non-refundable deposit clauses.',
    h1: 'Security Deposit Clause Explained',
    category: 'lease',
    publishedAt: '2025-02-10',
    excerpt:
      'Security deposits are the single most common source of tenant-landlord disputes. Here\'s what the law says — and what your lease should say.',
    readingTime: 6,
    relatedLanding: { href: '/security-deposit-clause-checker', anchor: 'Security Deposit Clause Checker' },
    relatedPosts: [
      { href: '/blog/common-lease-red-flags', anchor: 'Common Lease Red Flags' },
      { href: '/blog/early-termination-fee-clause', anchor: 'Early Termination Fee Clause' },
    ],
    sections: [
      {
        h2: 'What Security Deposits Are (and Aren\'t)',
        paragraphs: [
          'A security deposit is a payment made to the landlord at the start of a tenancy to cover potential damages or unpaid rent. It is not a fee — it is your money held in trust. The landlord doesn\'t own it until they have a documented, legitimate claim to a specific portion.',
          'This distinction matters because it determines what the landlord can do with it, how they must hold it (in many states, in a separate account), and how quickly they must return it.',
        ],
      },
      {
        h2: 'Allowed vs. Not-Allowed Deductions',
        paragraphs: [
          'Landlords can generally deduct for: unpaid rent, damage beyond normal wear and tear (holes in walls, broken fixtures, stained carpet from spills vs. normal aging), cleaning required to restore the unit to move-in condition, and unreturned keys or key replacement costs.',
          'Landlords cannot deduct for: normal wear and tear (minor scuffs, carpet wear from normal use, small nail holes), pre-existing damage, repairs needed regardless of tenant occupancy, or general property improvements.',
        ],
      },
      {
        h2: 'Non-Refundable Deposit Clauses: The Most Common Problem',
        paragraphs: [
          'Some leases declare the security deposit (or part of it) "non-refundable" upfront, or describe it as a "non-refundable cleaning fee." In most states, this language is illegal — landlords cannot pre-determine that a deposit is non-refundable before seeing the condition of the unit at move-out.',
          'If you see this language in your lease, ask the landlord to remove it before signing. If they refuse, document your request and research your state\'s specific tenant protection laws — you may have grounds to recover the deposit regardless of what the lease says.',
        ],
      },
      {
        h2: 'Return Deadlines and What Happens If They\'re Missed',
        paragraphs: [
          'State law specifies how quickly a landlord must return your deposit after move-out — typically 14 to 30 days, along with an itemized list of any deductions. If a landlord misses this deadline or provides an inadequate itemization, most states allow tenants to recover 2–3x the deposit amount as a penalty.',
          'When you move out, always do a documented walkthrough, take dated photos of every room, and send a written move-out notice. This creates the record you\'d need if there\'s a dispute.',
        ],
      },
    ],
  },

  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'early-termination-fee-clause',
    title: 'Early Termination Fee Clause: What You Can (and Can\'t) Be Charged',
    metaDescription:
      'Everything you need to know about early termination fees in rental leases — what\'s enforceable, what states limit them, and how to negotiate before signing.',
    h1: 'Early Termination Fee Clause in Rental Leases',
    category: 'lease',
    publishedAt: '2025-02-17',
    excerpt:
      'Early termination fees can cost you thousands. Here\'s what\'s enforceable, what isn\'t, and how to read this clause before you sign.',
    readingTime: 5,
    relatedLanding: { href: '/lease-renewal-review', anchor: 'Lease Renewal Review Tool' },
    relatedPosts: [
      { href: '/blog/common-lease-red-flags', anchor: 'Common Lease Red Flags' },
      { href: '/blog/how-to-review-a-lease-before-signing', anchor: 'How to Review a Lease Before Signing' },
    ],
    sections: [
      {
        h2: 'What an Early Termination Clause Does',
        paragraphs: [
          'An early termination clause — also called a break clause or lease buyout clause — defines what happens if you need to leave before the lease ends. Without such a clause, you may be liable for rent through the entire remaining lease term.',
          'The clause typically specifies a fixed fee (e.g., two months\' rent), a formula (e.g., rent remaining minus landlord\'s re-leasing costs), or a specific notice requirement to trigger a lower penalty.',
        ],
      },
      {
        h2: 'The Landlord\'s Duty to Mitigate',
        paragraphs: [
          'In most states, landlords have a legal duty to mitigate damages — meaning they must make reasonable efforts to re-rent the unit after a tenant vacates, rather than letting it sit empty and billing the departing tenant for the full remaining term.',
          'A fixed early termination fee that doesn\'t account for re-leasing may overstate the landlord\'s actual damages. Some courts won\'t enforce early termination fees that are grossly disproportionate to the landlord\'s real loss.',
        ],
      },
      {
        h2: 'What to Look for in Your Lease',
        paragraphs: [
          'When reviewing an early termination clause: (1) Know the exact dollar amount or formula. (2) Understand what notice is required to exercise the early termination option. (3) Check whether the fee applies regardless of circumstances (job loss, medical emergency, domestic violence) — some states require exceptions. (4) See if the fee is in addition to or instead of remaining rent obligations.',
        ],
      },
      {
        h2: 'How to Negotiate Early Termination Terms',
        paragraphs: [
          'Before signing, you can ask a landlord to: cap the early termination fee at one or two months\' rent, add a clause allowing termination without penalty in specific circumstances (e.g., job relocation), or specify that the fee is the exclusive remedy (so the landlord can\'t pursue remaining rent on top of the fee).',
          'Most landlords will negotiate reasonable early termination language — especially for high-quality tenants. The best time to negotiate is before you sign, not after you\'ve already given notice.',
        ],
      },
    ],
  },

  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'what-to-check-in-an-employment-contract',
    title: 'What to Check in an Employment Contract Before You Sign',
    metaDescription:
      'Key clauses to review in any employment contract — compensation, non-compete, IP assignment, termination, and more. A practical guide for employees.',
    h1: 'What to Check in an Employment Contract Before You Sign',
    category: 'employment',
    publishedAt: '2025-01-29',
    excerpt:
      'Employment contracts contain clauses that affect your career for years after signing. Here\'s what to actually read — and what to push back on.',
    readingTime: 7,
    relatedLanding: { href: '/employment-contract-review', anchor: 'Employment Contract Review Tool' },
    relatedPosts: [
      { href: '/blog/common-nda-red-flags', anchor: 'Common NDA Red Flags' },
      { href: '/blog/freelance-contract-mistakes', anchor: 'Freelance Contract Mistakes' },
    ],
    sections: [
      {
        h2: 'Why Employment Contracts Deserve More Attention Than They Get',
        paragraphs: [
          'Most people spend more time negotiating salary than reading the contract they\'re asked to sign. This is backwards: the contract governs what happens when things go wrong — when you leave, when you\'re let go, when there\'s a dispute about who owns your work.',
          'Employment contracts are written by the employer\'s legal team to protect the employer. That doesn\'t make them unfair by default — but it means you need to read them with that context in mind.',
        ],
      },
      {
        h2: 'The 7 Most Important Employment Contract Clauses',
        paragraphs: [''],
        h3s: [
          {
            heading: '1. Compensation and benefits',
            body: 'Confirm the exact base salary, bonus structure (discretionary vs. guaranteed, based on what metrics), equity terms (cliff, vesting schedule, exercise window, what happens on acquisition), and any deferred compensation. Verbal promises that aren\'t in the contract aren\'t enforceable.',
          },
          {
            heading: '2. At-will employment vs. term contract',
            body: 'Most U.S. employment is at-will — either party can end it at any time. If you\'re being hired for a defined term, understand what triggers early termination and what compensation is owed if the employer ends the contract early.',
          },
          {
            heading: '3. Non-compete agreement',
            body: 'Non-competes restrict where you can work after leaving. They vary enormously in scope — some cover only direct competitors for 6 months; others are industry-wide for 2 years. Several states (California, Minnesota, Oklahoma) refuse to enforce them. Know what you\'re agreeing to and research enforceability in your state.',
          },
          {
            heading: '4. IP and invention assignment',
            body: 'Most employment contracts include an IP assignment clause stating that anything you create during your employment — or sometimes related to your employer\'s business — belongs to the employer. Check whether this extends to work done on personal time and your own equipment. Some states require "moonlighting carve-outs."',
          },
          {
            heading: '5. Non-solicitation agreement',
            body: 'These restrict you from recruiting former colleagues or soliciting former clients after you leave. They\'re separate from non-competes and often more enforceable. Understand the scope, duration, and geography.',
          },
          {
            heading: '6. Termination and severance',
            body: 'What notice is required from each side? Is severance offered, and if so, under what conditions? Does the employer\'s right to terminate "for cause" include a broad subjective definition? Severance agreements often require you to sign a release of claims — understand what you\'d be waiving.',
          },
          {
            heading: '7. Arbitration clause',
            body: 'Many employment contracts require mandatory arbitration of disputes, which waives your right to sue in court or join a class action. This can significantly affect your options if there\'s a wage dispute, discrimination claim, or wrongful termination.',
          },
        ],
      },
      {
        h2: 'What You Can Actually Negotiate',
        paragraphs: [
          'Most employees assume employment contracts are take-it-or-leave-it. Many terms are negotiable, especially: the scope and duration of non-compete clauses, IP assignment exclusions for personal projects, severance terms and triggers, and the definition of "for cause" termination.',
          'The negotiation is much easier before you sign than after you\'ve started. Employers expect reasonable negotiation from professional candidates.',
        ],
      },
    ],
  },

  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'common-nda-red-flags',
    title: 'Common NDA Red Flags: What to Look for Before You Sign',
    metaDescription:
      'Not all NDAs are standard. These are the clauses that make non-disclosure agreements one-sided or unusually risky — and what you can do about them.',
    h1: 'Common NDA Red Flags: What to Watch For',
    category: 'nda',
    publishedAt: '2025-02-05',
    excerpt:
      'NDAs can be reasonable confidentiality agreements or career-limiting traps. Here\'s how to tell the difference.',
    readingTime: 6,
    relatedLanding: { href: '/nda-review', anchor: 'NDA Review Tool' },
    relatedPosts: [
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'What to Check in an Employment Contract' },
      { href: '/blog/freelance-contract-mistakes', anchor: 'Freelance Contract Mistakes' },
    ],
    sections: [
      {
        h2: 'What NDAs Are Designed to Do',
        paragraphs: [
          'Non-disclosure agreements protect legitimately confidential information — trade secrets, proprietary processes, client lists, unreleased product details. A well-drafted NDA is a reasonable part of most business relationships.',
          'The problem is that NDAs are frequently used overbroadly: to silence employees about workplace conditions, to prevent workers from using general industry knowledge, or to create indefinite confidentiality obligations that outlive their purpose.',
        ],
      },
      {
        h2: 'Six NDA Clauses That Deserve Scrutiny',
        paragraphs: [''],
        h3s: [
          {
            heading: '1. Overly broad definition of "confidential information"',
            body: '"All information shared or discussed" is nearly unlimited. A reasonable NDA defines confidential information specifically — marked documents, designated categories, trade secrets. Unlimited scope can prevent you from discussing your general professional experience.',
          },
          {
            heading: '2. No exclusions for public information',
            body: 'Standard NDAs exclude information that\'s already public, independently developed, or received from a third party without restriction. If your NDA lacks these exclusions, it may attempt to claim confidentiality over information anyone can Google.',
          },
          {
            heading: '3. Excessive duration',
            body: 'Most legitimate NDAs last 2–5 years for general confidential information; trade secrets can be indefinite. An NDA requiring lifetime confidentiality for general business discussions is unusual and may be unenforceable.',
          },
          {
            heading: '4. One-way obligations only',
            body: 'If you\'re sharing your confidential information with the other party, a mutual NDA protects both sides. A one-way NDA that only binds you — when you\'re sharing equally — is worth negotiating.',
          },
          {
            heading: '5. Restrictions on discussing wages, working conditions, or protected conduct',
            body: 'In the U.S., the National Labor Relations Act protects employees\' rights to discuss wages and working conditions. NDAs cannot legally prohibit this. Some states have additional protections against NDAs that silence reports of illegal workplace activity.',
          },
          {
            heading: '6. Indemnification without cap',
            body: 'Some NDAs require the disclosing party to indemnify the other for any breach damages with no cap. This can expose you to unlimited liability for an inadvertent disclosure. Capped indemnification tied to actual proven damages is more reasonable.',
          },
        ],
      },
      {
        h2: 'How to Approach NDA Negotiation',
        paragraphs: [
          'Asking for NDA modifications is normal and expected in professional contexts. Common reasonable asks: narrow the definition of confidential information, add standard exclusions, shorten the term, make it mutual, exclude legally protected discussions.',
          'If a counterparty refuses any changes to a sweeping NDA, that tells you something about how they approach the underlying business relationship.',
        ],
      },
    ],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'freelance-contract-mistakes',
    title: 'Freelance Contract Mistakes That Cost You Time and Money',
    metaDescription:
      'The most common freelance contract mistakes — missing payment terms, vague scope, IP ownership gaps — and how to fix them before signing.',
    h1: 'Freelance Contract Mistakes That Cost You Time and Money',
    category: 'freelance',
    publishedAt: '2025-02-12',
    excerpt:
      'Most freelance disputes trace back to contract language written (or missing) before the project started. Here\'s what to get right.',
    readingTime: 7,
    relatedLanding: { href: '/freelance-contract-review', anchor: 'Freelance Contract Review Tool' },
    relatedPosts: [
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'What to Check in an Employment Contract' },
      { href: '/blog/common-nda-red-flags', anchor: 'Common NDA Red Flags' },
    ],
    sections: [
      {
        h2: 'Why Freelancers Under-Contract',
        paragraphs: [
          'Freelancers often avoid contract discussions out of fear of seeming difficult or losing the work. This is backwards: a clear contract protects the client as much as it protects you, and clients who resist basic contract terms are often the ones who cause problems later.',
          'These are the mistakes that appear most often in freelance disputes.',
        ],
      },
      {
        h2: 'The 7 Most Common Freelance Contract Mistakes',
        paragraphs: [''],
        h3s: [
          {
            heading: '1. No defined scope of work',
            body: '"Website redesign" or "marketing support" aren\'t scopes — they\'re descriptions of a category of work. A contract without a specific, enumerated list of deliverables invites scope creep, disputes about what was included, and clients who interpret the project to mean whatever\'s convenient.',
          },
          {
            heading: '2. Missing or vague payment terms',
            body: 'Specify: the exact amount or rate, the invoicing schedule, the payment method, and the consequence of late payment. A contract that says "payment upon completion" with no deadline puts all the leverage on the client side.',
          },
          {
            heading: '3. No IP ownership clause',
            body: 'In the U.S., absent a work-for-hire clause or IP assignment, creative work belongs to the creator by default. This means clients may not own what you delivered — which can cause problems for them and liability for you if the deliverable gets used commercially. Address ownership explicitly: who owns what, and when does ownership transfer (typically upon final payment).',
          },
          {
            heading: '4. Unlimited revision clauses',
            body: '"Revisions until you\'re satisfied" with no limit or process is a recipe for an unbounded project. Specify the number of revision rounds included, what constitutes a revision vs. a new request, and what happens if revisions exceed the included amount.',
          },
          {
            heading: '5. No kill fee',
            body: 'If a client cancels a project midway through, a kill fee protects you from losing all compensation for completed work. Typical kill fees are 25–50% of the remaining project value.',
          },
          {
            heading: '6. Vague or missing approval/acceptance process',
            body: 'When is work "done"? What happens if the client doesn\'t respond to a deliverable? Define the approval process, timelines for client feedback, and what happens if deadlines are missed.',
          },
          {
            heading: '7. No dispute resolution clause',
            body: 'Specify what law governs the contract, how disputes are resolved (negotiation, mediation, arbitration, court), and which jurisdiction applies. Without this, a dispute over a $2,000 project can become a legal geography puzzle.',
          },
        ],
      },
      {
        h2: 'Using AI to Review Client-Provided Contracts',
        paragraphs: [
          'When a client provides a contract, it\'s written by their legal team to protect their interests. An AI contract review can quickly surface the clauses that are most one-sided — overbroad IP assignments, liability caps that only run one way, payment terms that favor the client — so you know what to push back on before signing.',
        ],
      },
    ],
  },

  // ── 9 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'automatic-rent-increase-clause',
    title: 'Automatic Rent Increase Clause: What Tenants Need to Know',
    metaDescription:
      'Some leases include automatic rent increase provisions that raise your rent at renewal with minimal notice. Here\'s how to spot them and what to do.',
    h1: 'Automatic Rent Increase Clause in Leases',
    category: 'lease',
    publishedAt: '2025-02-19',
    excerpt:
      'Automatic rent escalations are buried in lease renewal language. Here\'s how they work, when they\'re legal, and how to negotiate them out.',
    readingTime: 4,
    relatedLanding: { href: '/lease-renewal-review', anchor: 'Lease Renewal Review Tool' },
    relatedPosts: [
      { href: '/blog/common-lease-red-flags', anchor: 'Common Lease Red Flags' },
      { href: '/blog/how-to-review-a-lease-before-signing', anchor: 'How to Review a Lease Before Signing' },
    ],
    sections: [
      {
        h2: 'What Automatic Rent Increase Clauses Look Like',
        paragraphs: [
          'These clauses appear most often in renewal provisions or in the base lease terms. Common forms: a fixed annual percentage increase (e.g., "rent increases by 3% annually"), a CPI-linked increase (tied to the Consumer Price Index), or a market-rate adjustment at renewal.',
          'The danger isn\'t the increase itself — landlords can raise rent at renewal with proper notice in almost all jurisdictions. The danger is signing a lease that pre-commits you to increases you haven\'t approved, often with minimal notice.',
        ],
      },
      {
        h2: 'When Automatic Increases Are Legal',
        paragraphs: [
          'In most jurisdictions without rent control, landlords can raise rent at renewal or with proper statutory notice (typically 30–60 days). A lease term that specifies the renewal rent in advance is generally legal — it\'s essentially pre-negotiated.',
          'Rent-controlled jurisdictions impose different rules. If you\'re in a rent-stabilized building in New York, a rent-controlled unit in California, or a jurisdiction with rent increase caps, a lease clause that exceeds the legal maximum is unenforceable regardless of what you signed.',
        ],
      },
      {
        h2: 'What to Do If Your Lease Has This Clause',
        paragraphs: [
          'Before signing, you can: ask for the clause to be removed (making any renewal rent subject to negotiation at the time), negotiate a cap on the increase percentage, or request that increases require 60+ days\' notice even if legally a shorter period is required.',
          'At minimum, understand the numbers. If rent is $2,000/month and the clause says 5% annual increases, that\'s $2,600/month in Year 5. That\'s worth knowing before you sign.',
        ],
      },
    ],
  },

  // ── 10 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-read-a-contract-with-ai',
    title: 'How to Read a Contract with AI: What It Can (and Can\'t) Do',
    metaDescription:
      'AI contract review tools can help you identify risks faster — but they have real limitations. Here\'s how to use them effectively and what to verify yourself.',
    h1: 'How to Read a Contract with AI: Benefits, Limits, and Best Practices',
    category: 'general',
    publishedAt: '2025-03-01',
    excerpt:
      'AI can review a 20-page contract in 60 seconds. Here\'s what that actually means — and what it doesn\'t.',
    readingTime: 6,
    relatedLanding: { href: '/contract-risk-checker', anchor: 'Contract Risk Checker' },
    relatedPosts: [
      { href: '/blog/how-to-review-a-lease-before-signing', anchor: 'How to Review a Lease Before Signing' },
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'What to Check in an Employment Contract' },
    ],
    sections: [
      {
        h2: 'What AI Contract Review Actually Does',
        paragraphs: [
          'Modern AI models can read and analyze contract text with remarkable speed and breadth. In 30–90 seconds, a good AI tool can: identify clauses that commonly create problems for signatories, compare language against typical standard practices, flag provisions that deviate significantly from the norm, and explain what flagged language means in plain English.',
          'This is genuinely useful. Most people can\'t read a 20-page contract carefully when they\'re tired, excited about a new apartment, or eager to start a new job. AI provides a consistent, systematic first pass that human reviewers under time pressure often miss.',
        ],
      },
      {
        h2: 'What AI Contract Review Cannot Do',
        paragraphs: [
          'AI tools are not lawyers and cannot: provide legal advice specific to your situation, tell you whether a clause is enforceable in your specific jurisdiction, evaluate negotiating strategy given the specific counterparty, assess the practical risk given market context, or predict how a court would interpret ambiguous language.',
          'An AI saying "this clause is unusual" is different from a lawyer saying "this clause is unenforceable in your state because of X statute." Both are useful, but they\'re different things.',
        ],
      },
      {
        h2: 'The Right Way to Use AI for Contract Review',
        paragraphs: [
          'Best practice: use AI as your first-pass, human review as your second, and legal consultation as your third (for high-stakes agreements).',
          'Step 1: Upload the contract to an AI review tool. Read every flag it produces. Step 2: For each flagged clause, decide: is this a dealbreaker? Something to negotiate? Something I can accept? Step 3: For genuinely complex, high-value, or career-affecting contracts, consult a lawyer who specializes in that area. The AI analysis will make that consultation faster and more focused.',
        ],
      },
      {
        h2: 'Privacy Considerations When Using AI Contract Tools',
        paragraphs: [
          'Your contract contains sensitive information — your name, address, employer, financial terms, and sometimes trade secrets. Before uploading to any AI tool, check: how the document is stored, whether it\'s used for training, and how long it\'s retained.',
          'Reputable tools like Revealr encrypt documents in transit, process them only for the purpose of generating your analysis, and delete them after the report is complete. Read the privacy policy before uploading any document with sensitive information.',
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getRecentBlogPosts(limit = 6): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
