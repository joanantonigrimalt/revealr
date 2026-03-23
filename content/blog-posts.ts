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
        h2: 'A 10-Minute Lease Review Checklist',
        paragraphs: [
          'If you only have 10 minutes before signing, focus on these — in order of how often they cause financial disputes:',
        ],
        h3s: [
          {
            heading: 'Minutes 1–2: Security deposit',
            body: 'Find the security deposit clause. Confirm the amount, whether any portion is non-refundable, what deductions are allowed, and the return deadline. Write these down. If the lease says "non-refundable," that is a red flag worth raising before signing.',
          },
          {
            heading: 'Minutes 3–4: Early termination',
            body: 'Find the early termination section. Calculate the actual cost if you needed to leave 6 months early. Anything over two months\' rent is worth negotiating. "Pay until a new tenant is found" with no cap is particularly risky.',
          },
          {
            heading: 'Minutes 5–6: Automatic renewal',
            body: 'Find the renewal clause. Note the notice deadline — the date by which you must give written notice to avoid renewal. Calendar it immediately. A 60-day window in a 12-month lease means you need to decide in month 10.',
          },
          {
            heading: 'Minutes 7–8: Maintenance and entry',
            body: 'Find who is responsible for repairs. Any clause that assigns HVAC, pest control, or appliance maintenance to the tenant is worth clarifying in writing before signing. Then find the landlord entry clause and confirm it matches your state\'s notice requirement.',
          },
          {
            heading: 'Minutes 9–10: Fees and restrictions',
            body: 'Scan for any fees not discussed verbally: late fees (amount and grace period), pet fees, parking fees, storage fees. Check the guest and occupancy policy. Check whether subletting is allowed if you might need that flexibility.',
          },
        ],
      },
      {
        h2: 'Questions to Ask Your Landlord Before You Sign',
        paragraphs: [
          'Reading the lease is step one. These questions help you understand how the landlord actually operates — and signal that you are an informed tenant:',
          '"How are security deposit deductions handled at move-out, and can I get that in writing?" This tests whether the landlord has a fair process or a history of dispute.',
          '"If I need to leave before the lease ends, what is the actual process?" This clarifies whether they will actively re-rent the unit or simply bill you until the end of the term.',
          '"Is there anything in this lease that has led to disputes with previous tenants?" An honest landlord will tell you. A defensive reaction is itself informative.',
          '"Can we document the current condition of the unit before I move in?" A move-in checklist, signed by both parties with photos, protects you from false damage claims at move-out. Any resistance to this is a signal.',
          'Landlords who respond to these questions with irritation or evasion are telling you something important about what the tenancy might be like.',
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
      {
        h2: 'Employment Contract Red Flags to Watch For',
        paragraphs: [
          'Some contract terms are worth flagging immediately — not necessarily as deal-breakers, but as things that warrant a direct conversation before you sign.',
        ],
        h3s: [
          {
            heading: 'Non-compete covering your entire industry',
            body: 'A non-compete that bars you from working in your field for 12–24 months — regardless of your role or what you actually knew — is a career risk. Ask for geographic limits, a shorter term, or a carve-out for your existing clients and skills. In some states (California, Minnesota, North Dakota, Oklahoma) these are unenforceable regardless.',
          },
          {
            heading: 'IP assignment that extends to personal projects',
            body: 'If the clause assigns ownership of anything you create "relating to the company\'s business or anticipated business," it could cover side projects built on your own time. Ask for a written carve-out listing any pre-existing work you want to retain and excluding work done on personal equipment with no company resources.',
          },
          {
            heading: 'Clawback provisions on bonuses or equity',
            body: 'Some contracts let employers claw back bonuses or unvested equity if you leave within a certain period, are terminated for cause, or if financial results are restated. Read these carefully — "for cause" definitions are often broad, and clawback windows can extend years after the compensation was received.',
          },
          {
            heading: '"Garden leave" without compensation',
            body: 'Some contracts include a notice period during which the employer can place you on "garden leave" — barring you from working elsewhere but not requiring you to report in. If your contract has a 6-month notice period but only pays through 30 days, understand what the actual financial obligation is on each side.',
          },
        ],
      },
      {
        h2: 'An Employment Contract Review Checklist',
        paragraphs: [
          'Before signing any employment contract, work through this checklist:',
        ],
        h3s: [
          {
            heading: 'Compensation: confirm it in writing',
            body: 'Base salary, bonus (guaranteed vs. discretionary, tied to which metrics), equity (type, cliff, vesting schedule, acceleration on change of control, exercise window if options), benefits start date, and any signing bonus repayment obligations if you leave within a set period.',
          },
          {
            heading: 'Restrictive covenants: scope and enforceability',
            body: 'List every restriction: non-compete, non-solicitation of employees, non-solicitation of clients, non-disparagement. For each, note the duration, geographic scope, and definition of prohibited activity. Check whether your state enforces them. If the scope is broad, propose narrower language in writing.',
          },
          {
            heading: 'Termination: notice, cause, and severance',
            body: 'What constitutes "cause"? How much notice is required from each side? Is severance defined in the contract, or at employer discretion? If severance requires you to sign a release, ask to see the release template before you accept the job.',
          },
          {
            heading: 'Dispute resolution: arbitration and jurisdiction',
            body: 'If arbitration is required, note whether it\'s before JAMS, AAA, or another body, whether class actions are waived, and what law governs. Some arbitration clauses are more favorable to employees than others — this matters if you ever have a dispute over unpaid wages or discrimination.',
          },
        ],
      },
      {
        h2: 'The Cost of Not Reviewing Your Employment Contract',
        paragraphs: [
          'Employment contract disputes are among the most expensive legal matters individuals face. A non-compete that prevents you from working in your industry for a year has enormous financial impact. An IP assignment that transfers ownership of a side business you built before joining can cost far more than any bonus.',
          'Most employment lawyers offer free or low-cost consultations for contract review. For senior or specialized roles — or any contract with equity, non-competes, or unusual terms — an hour with an employment attorney before signing is cheap insurance.',
          'Even without legal counsel, running your contract through an AI contract analyzer before signing gives you a clear map of every clause that deserves attention. The goal isn\'t to make signing adversarial — it\'s to enter the relationship with eyes open.',
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
      {
        h2: 'Types of NDAs You\'re Likely to Encounter',
        paragraphs: [
          'Not all NDAs are the same document. Understanding which type you\'re signing affects how you should evaluate its terms.',
        ],
        h3s: [
          {
            heading: 'Pre-employment / interview NDAs',
            body: 'Signed before a job interview or hiring process. These are typically one-way (you agree not to disclose what you learn about the company) and limited in scope. Red flag: if the NDA includes IP assignment language or non-compete terms — those belong in an employment contract, not a pre-interview NDA.',
          },
          {
            heading: 'Employment NDAs',
            body: 'Incorporated into or attached to an employment contract. Often include the broadest obligations: confidentiality of all business information, assignment of work product, and sometimes non-solicitation. These benefit most from careful review because they govern a long-term relationship.',
          },
          {
            heading: 'Business partnership / vendor NDAs',
            body: 'Signed before sharing information with a potential partner, vendor, or investor. Should typically be mutual — both parties are sharing information. If you\'re asked to sign a one-way NDA before a business discussion where you\'ll be sharing your own ideas, propose making it mutual.',
          },
          {
            heading: 'Settlement NDAs',
            body: 'Signed as part of a legal settlement. These are often the most consequential: they may prevent you from discussing the facts of a dispute, naming the other party, or pursuing future claims. In the U.S., NDAs tied to settlements of sexual harassment or assault claims are now unenforceable under federal law. Know what you\'re agreeing to silence.',
          },
        ],
      },
      {
        h2: 'What You Cannot Be Forced to Keep Confidential',
        paragraphs: [
          'NDAs have real legal limits. Understanding these helps you push back on overbroad language from an informed position.',
          'In the United States, federal and most state laws protect your right to discuss wages and working conditions with coworkers — NDAs cannot override this. The Speak Out Act (2022) bars NDAs that prevent disclosure of sexual harassment and assault. Whistleblower protections in securities law, environmental law, and healthcare law override NDA obligations when reporting unlawful conduct to regulators.',
          'In the UK, "super-injunctions" and NDAs that prevent reporting of criminal conduct are increasingly unenforceable and may expose the drafter to contempt proceedings. EU member states have implemented the EU Trade Secrets Directive, which includes explicit exceptions for journalism, whistleblowing, and lawful disclosure.',
          'In practical terms: if an NDA attempts to prevent you from discussing illegal activity, reporting to law enforcement or regulatory bodies, or exercising statutory employment rights, those provisions are likely void — regardless of what the document says.',
        ],
      },
      {
        h2: 'Before You Sign Any NDA: A Quick Checklist',
        paragraphs: [
          'Run through these questions before signing any non-disclosure agreement:',
        ],
        h3s: [
          {
            heading: 'Is "confidential information" defined specifically?',
            body: 'Look for a concrete definition — marked documents, specific categories, named systems. "All information shared" is a red flag. Ask for a narrowed definition tied to actual trade secrets or specific business information.',
          },
          {
            heading: 'Are the standard exclusions present?',
            body: 'A properly drafted NDA excludes: information already public, information you independently developed, information you received from a third party without restriction, and information you\'re required to disclose by law. If these aren\'t in the document, add them.',
          },
          {
            heading: 'What is the duration?',
            body: '2–5 years is standard for general business information. Perpetual NDAs for non-trade-secret information are unusual. If the term is indefinite, propose a specific time limit with a carve-out for actual trade secrets.',
          },
          {
            heading: 'Should this be mutual?',
            body: 'If both parties will be sharing confidential information, the NDA should bind both. Ask who is disclosing and who is receiving. If the answer is "both of us," propose mutual obligations.',
          },
          {
            heading: 'What are the remedies?',
            body: 'Injunctive relief (a court order to stop disclosure) is standard and reasonable. Liquidated damages, criminal penalties, or uncapped indemnification for any breach are not. If the remedies section is aggressive, ask for actual damages language instead.',
          },
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

  // ── 11 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'non-compete-clause-explained',
    title: 'Non-Compete Clause Explained: What It Restricts and What You Can Push Back On',
    metaDescription:
      'Non-compete clauses can follow you for years after leaving a job. Here\'s what they actually restrict, when they\'re enforceable, and how to negotiate them.',
    h1: 'Non-Compete Clause Explained: What It Restricts and How to Push Back',
    category: 'employment',
    publishedAt: '2025-03-05',
    excerpt:
      'Non-competes range from unenforceable boilerplate to career-defining restrictions. Here\'s how to tell the difference — and what to do about it.',
    readingTime: 7,
    relatedLanding: { href: '/non-compete-agreement-review', anchor: 'Non-Compete Agreement Review Tool' },
    relatedPosts: [
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'What to Check in an Employment Contract' },
      { href: '/blog/ip-assignment-agreement-what-to-know', anchor: 'IP Assignment Agreement Explained' },
      { href: '/blog/common-nda-red-flags', anchor: 'Common NDA Red Flags' },
    ],
    sections: [
      {
        h2: 'What a Non-Compete Clause Actually Says',
        paragraphs: [
          'A non-compete agreement (or non-competition clause) restricts where you can work after leaving your current employer. Specifically, it prevents you from joining a competitor, starting a competing business, or sometimes working in the same industry, for a defined period and within a defined geography.',
          'Non-competes appear in employment contracts, offer letters, and sometimes in standalone agreements that get signed separately at onboarding. They often sit near non-solicitation and NDA provisions — a cluster of post-employment restrictions that many employees sign without reading carefully.',
        ],
      },
      {
        h2: 'How Enforceable Are Non-Compete Agreements?',
        paragraphs: [
          'This depends almost entirely on your state. The enforceability landscape in the U.S. varies dramatically:',
        ],
        h3s: [
          {
            heading: 'States that do not enforce non-competes at all',
            body: 'California, Minnesota, Oklahoma, and North Dakota effectively refuse to enforce employee non-competes. If you\'re employed in one of these states — and sometimes if you just live there, depending on the contract\'s governing law — a non-compete may be worthless.',
          },
          {
            heading: 'States with significant restrictions',
            body: 'Illinois, Massachusetts, and several others limit non-competes to higher-income employees, cap their duration, require additional consideration, or limit their geographic scope. Even in these states, courts scrutinize non-competes carefully.',
          },
          {
            heading: 'States that generally enforce reasonable non-competes',
            body: 'Most U.S. states will enforce a non-compete that is "reasonable" — typically meaning limited in duration (6–24 months), geography (the area where you actually worked), and scope (actual competitors, not entire industries). What\'s "reasonable" is litigated constantly.',
          },
        ],
      },
      {
        h2: 'What Makes a Non-Compete Overbroad',
        paragraphs: [
          'Even in states that enforce non-competes, courts sometimes decline to enforce provisions that go too far. Common overreach includes: industry-wide restrictions rather than just direct competitors, unlimited geography ("worldwide"), durations exceeding 2 years for most employees, restrictions on roles unrelated to the employee\'s actual job, and non-competes imposed on low-wage workers.',
          'Some courts will "blue pencil" an overbroad non-compete — rewriting it to be reasonable rather than voiding it entirely. Others void any non-compete that isn\'t already reasonable as written. Know your state\'s approach.',
        ],
      },
      {
        h2: 'How to Negotiate a Non-Compete Before Signing',
        paragraphs: [
          'Non-competes are more negotiable than most employees realize. Before signing: (1) Ask for the geographic restriction to match where you actually work, not a national or international scope. (2) Push for a shorter duration — 6–12 months is more defensible than 2 years for most roles. (3) Ask for a carve-out for your current clients, projects, or skills predating the employment. (4) Request a "garden leave" provision — salary continuation during the restricted period, making the restriction fairer to enforce. (5) Ask what happens to the non-compete if you\'re laid off (many states limit enforcement if you\'re terminated without cause).',
          'Employers expect negotiation on non-competes from candidates who have experience. The moment to negotiate is before you sign — not after you\'ve started or after you\'ve resigned.',
        ],
      },
      {
        h2: 'How Revealr Helps With Non-Compete Review',
        paragraphs: [
          'When you upload an employment contract or non-compete agreement to Revealr, the AI specifically identifies the scope of the restriction (geographic, industry, duration), flags language that is broader than typical, and suggests what to negotiate. This gives you a clear starting point for the conversation with the employer or their HR team.',
        ],
      },
    ],
  },

  // ── 12 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'ip-assignment-agreement-what-to-know',
    title: 'IP Assignment Agreements: What You\'re Giving Up When You Sign',
    metaDescription:
      'IP assignment clauses in employment contracts can claim ownership of work you do on your own time. Here\'s what to look for and what to push back on.',
    h1: 'IP Assignment Agreements: What You\'re Signing Away',
    category: 'employment',
    publishedAt: '2025-03-07',
    excerpt:
      'Most employment contracts include an IP assignment clause. Few employees read it carefully. Here\'s what it means for your side projects, inventions, and creative work.',
    readingTime: 6,
    relatedLanding: { href: '/ip-assignment-agreement-review', anchor: 'IP Assignment Agreement Review Tool' },
    relatedPosts: [
      { href: '/blog/non-compete-clause-explained', anchor: 'Non-Compete Clause Explained' },
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'What to Check in an Employment Contract' },
    ],
    sections: [
      {
        h2: 'What an IP Assignment Clause Does',
        paragraphs: [
          'An intellectual property assignment clause transfers ownership of intellectual property you create — code, designs, writing, inventions, processes — from you to your employer. This is expected for work you create as part of your job. The problem arises when the clause extends beyond your job scope.',
          'Overbroad IP assignment clauses attempt to claim ownership of: work done on your own time, on personal equipment, unrelated to your employer\'s business, or based on skills and knowledge you had before joining the company.',
        ],
      },
      {
        h2: 'What an Overbroad Clause Looks Like',
        paragraphs: [
          'A clause that says "Employee assigns to Company all inventions, works, and discoveries made during the term of employment, whether or not related to Company\'s business and whether or not made during work hours" is claiming everything you create for the duration of your employment.',
          'If you write a novel, develop a personal app, create music, or invent something in your garage — under this type of clause, your employer might claim ownership of it. Whether they\'d actually pursue this is a separate question; signing it without understanding it is a different risk.',
        ],
      },
      {
        h2: 'Statutory Protections That Limit IP Assignment',
        paragraphs: [
          'Several states have laws that limit what employers can claim through IP assignment. California, Delaware, Illinois, Minnesota, North Carolina, and Washington all have statutes limiting IP assignment to work actually related to the employer\'s business or made with company resources.',
          'Even in states with these protections, the burden often falls on the employee to assert them. Knowing the clause is overbroad — and having that documented before you sign — puts you in a stronger position.',
        ],
      },
      {
        h2: 'What to Negotiate: The Moonlighting Carve-Out',
        paragraphs: [
          'The most common and accepted negotiation is a "moonlighting carve-out" — a clause that explicitly excludes inventions and creative works made entirely on personal time, with personal equipment, and unrelated to the company\'s current or prospective business.',
          'Many employers will agree to this carve-out, especially for developers, designers, and writers who have existing side projects. The key is to negotiate it before you sign, ideally with a list of your current personal projects attached as an exhibit.',
        ],
      },
      {
        h2: 'Using Revealr to Review an IP Assignment Clause',
        paragraphs: [
          'Revealr specifically flags overbroad IP assignment language, including provisions that extend beyond work hours or relate to areas outside your employer\'s actual business. If your employment contract contains this clause, the AI will identify what it covers and suggest what a more reasonable limitation would look like.',
        ],
      },
    ],
  },

  // ── 13 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'service-agreement-vs-employment-contract',
    title: 'Service Agreement vs. Employment Contract: Key Differences That Affect Your Rights',
    metaDescription:
      'Service agreements and employment contracts look similar but create very different legal relationships. Here\'s what changes and why it matters for taxes, benefits, and protections.',
    h1: 'Service Agreement vs. Employment Contract: What\'s the Difference?',
    category: 'freelance',
    publishedAt: '2025-03-10',
    excerpt:
      'The difference between a service agreement and an employment contract isn\'t just semantics — it determines your tax obligations, legal protections, and benefit eligibility.',
    readingTime: 6,
    relatedLanding: { href: '/service-agreement-review', anchor: 'Service Agreement Review Tool' },
    relatedPosts: [
      { href: '/blog/independent-contractor-misclassification', anchor: 'Independent Contractor Misclassification' },
      { href: '/blog/freelance-contract-mistakes', anchor: 'Freelance Contract Mistakes' },
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'What to Check in an Employment Contract' },
    ],
    sections: [
      {
        h2: 'The Fundamental Difference',
        paragraphs: [
          'An employment contract creates an employer-employee relationship. A service agreement (or contractor agreement) creates a business-to-business relationship between two independent parties. The document you sign determines which relationship you\'re in — and which comes with more rights, protections, and obligations.',
          'The practical consequences: employment = payroll taxes withheld, benefits eligibility, labor law protections, unemployment insurance. Service agreement = you handle your own taxes, no employer benefits, more flexibility, but also more exposure.',
        ],
      },
      {
        h2: 'Key Differences in What Each Agreement Contains',
        paragraphs: [''],
        h3s: [
          {
            heading: 'Control and direction',
            body: 'Employment contracts give the employer control over how, when, and where you work. Service agreements specify what you deliver (outcomes/deliverables) rather than how you produce them. If a service agreement looks like it\'s directing your hourly schedule and daily tasks, it may actually describe an employment relationship regardless of what the document calls it.',
          },
          {
            heading: 'IP ownership',
            body: 'Employment contracts typically assign all work-related IP to the employer. Service agreements can be structured either way — as work-for-hire (client owns the output) or with the contractor retaining rights and licensing usage. The default under copyright law often favors the creator, not the client.',
          },
          {
            heading: 'Termination',
            body: 'Employment contracts often include notice periods, severance provisions, and cause requirements. Service agreements typically end when the project is complete or either party gives notice per the agreement\'s terms. "At-will" in a service agreement context means the client can end the engagement immediately — which has very different financial implications than at-will employment.',
          },
          {
            heading: 'Non-compete and exclusivity',
            body: 'Service agreements sometimes include exclusivity clauses — restrictions on working with competitors during the engagement. These are different from non-competes: they apply during the active relationship, not after. Still worth reading carefully, especially if you work with multiple clients in the same industry.',
          },
        ],
      },
      {
        h2: 'When a Service Agreement Looks Like Employment (And Why That\'s a Problem)',
        paragraphs: [
          'Worker misclassification — labeling someone a contractor when they\'re functionally an employee — is illegal and creates liability for employers. But it also creates problems for workers: you can be denied benefits and protections you\'re legally entitled to, and you\'ll be responsible for taxes that should have been withheld.',
          'Red flags in a "service agreement" that actually describes employment: fixed work hours with no flexibility, requirement to work exclusively at a specific location, supervision of methods not just outcomes, equipment provided by the client, inability to work for other clients without permission.',
        ],
      },
      {
        h2: 'How to Review a Service Agreement Before Signing',
        paragraphs: [
          'Whether you\'re a freelancer reviewing a client contract or a business engaging a contractor, Revealr can review your service agreement and flag clauses that are unusually one-sided, that may describe an employment relationship rather than a contractor relationship, or that contain non-compete/exclusivity provisions worth understanding before you commit.',
        ],
      },
    ],
  },

  // ── 14 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-negotiate-a-lease',
    title: 'How to Negotiate a Lease: What Landlords Actually Agree To Change',
    metaDescription:
      'Most tenants never negotiate their lease. Most landlords are open to it on specific terms. Here\'s what to ask for, how to ask, and when to walk away.',
    h1: 'How to Negotiate a Lease: A Practical Guide for Tenants',
    category: 'lease',
    publishedAt: '2025-03-12',
    excerpt:
      'Lease negotiation is more common than tenants think — and most landlords will adjust reasonable terms when asked directly. Here\'s what to target.',
    readingTime: 7,
    relatedLanding: { href: '/lease-agreement-analyzer', anchor: 'Lease Agreement Analyzer' },
    relatedPosts: [
      { href: '/blog/how-to-review-a-lease-before-signing', anchor: 'How to Review a Lease Before Signing' },
      { href: '/blog/common-lease-red-flags', anchor: 'Common Lease Red Flags' },
      { href: '/blog/lease-early-termination-negotiation-guide', anchor: 'Lease Early Termination Negotiation Guide' },
    ],
    sections: [
      {
        h2: 'The Biggest Myth About Lease Negotiation',
        paragraphs: [
          'Most tenants assume leases are take-it-or-leave-it. Landlords are often presented as the party with all the power. The reality: most landlords use standard form leases they didn\'t draft themselves, and many clauses exist because no one ever asked to change them.',
          'Vacancy is expensive for landlords. A good tenant who asks for reasonable changes is still more valuable than an empty unit. This gives you more negotiating leverage than you probably think — especially after you\'ve been approved.',
        ],
      },
      {
        h2: 'What Landlords Commonly Agree to Change',
        paragraphs: [''],
        h3s: [
          {
            heading: 'Security deposit terms',
            body: 'Non-refundable deposit language is the most commonly removed clause when tenants request it. Landlords who actually understand tenant protection law often already know this clause creates more legal exposure than protection for them.',
          },
          {
            heading: 'Early termination clause',
            body: 'The fee amount (2→1 month\'s rent), the calculation method (flat fee → pro-rated), and the circumstances (adding exceptions for job relocation or medical emergency) are all commonly negotiable. Most landlords would rather have a clear, reasonable early termination process than a tenant who abandons a unit.',
          },
          {
            heading: 'Automatic renewal notice window',
            body: 'If the required notice is 60+ days, many landlords will agree to 30 days. This is the most common automatic renewal complaint and most landlords don\'t have a strong reason to require extra-long notice.',
          },
          {
            heading: 'Landlord entry notice',
            body: 'If your state requires 24 hours and the lease says "reasonable notice," asking for 24 hours in writing is almost always accepted. If the lease requires less than state law, simply note that state law governs regardless.',
          },
          {
            heading: 'Pet policy adjustments',
            body: 'Pet bans are sometimes negotiable for specific animals, especially with a pet deposit or pet rent. Breed and weight restrictions are less commonly negotiated but worth asking about for large dogs.',
          },
        ],
      },
      {
        h2: 'What Landlords Rarely Change (and Why)',
        paragraphs: [
          'Rent amount after approval is rarely reduced in hot markets. Base lease term length is usually fixed. Building-wide rules (no smoking, no subletting, move-in procedures) are rarely individualized. Utilities billing structure almost never changes.',
          'Knowing what\'s negotiable vs. not helps you focus your asks on the terms that will actually move.',
        ],
      },
      {
        h2: 'How to Frame the Negotiation',
        paragraphs: [
          'Don\'t frame it as a dispute. Frame it as wanting clarity. "I noticed clause 12 says the deposit is non-refundable — I\'d like to update that to standard language requiring return within 30 days minus documented damage" lands better than "this clause is illegal."',
          'Make your requests in writing (email is fine). This creates a record and gives the landlord time to respond without feeling put on the spot. Keep the list short — 2–3 focused requests are more likely to be accepted than a comprehensive redline.',
          'Use your lease analysis as your guide. Revealr\'s report identifies which clauses are non-standard, which are potentially unenforceable, and suggests specific alternative language. This gives you a fact-based starting point rather than a general complaint.',
        ],
      },
      {
        h2: 'When to Walk Away',
        paragraphs: [
          'A landlord who refuses to modify a clause that appears to violate state law is worth noting. That\'s not necessarily a reason to walk away on its own, but combined with other signals (slow to respond, defensive about standard requests, evasive about property condition), it tells you something about the relationship you\'re entering.',
        ],
      },
    ],
  },

  // ── 15 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'consulting-agreement-red-flags',
    title: 'Consulting Agreement Red Flags: What to Watch for Before You Sign',
    metaDescription:
      'Consulting agreements contain clauses that can limit your other clients, claim your IP, or create unlimited liability. Here\'s what to check before signing.',
    h1: 'Consulting Agreement Red Flags: What to Check Before You Commit',
    category: 'freelance',
    publishedAt: '2025-03-14',
    excerpt:
      'Client-provided consulting agreements are written to protect the client. These are the clauses that most commonly work against independent consultants.',
    readingTime: 6,
    relatedLanding: { href: '/consulting-agreement-review', anchor: 'Consulting Agreement Review Tool' },
    relatedPosts: [
      { href: '/blog/freelance-contract-mistakes', anchor: 'Freelance Contract Mistakes' },
      { href: '/blog/service-agreement-vs-employment-contract', anchor: 'Service Agreement vs. Employment Contract' },
      { href: '/blog/independent-contractor-misclassification', anchor: 'Independent Contractor Misclassification' },
    ],
    sections: [
      {
        h2: 'Why Consulting Agreements Deserve Careful Review',
        paragraphs: [
          'Consulting agreements are almost always drafted by the client\'s legal team. Their job is to protect the client — which means every clause that limits your rights, claims your IP, or expands your liability was written intentionally. Not out of bad faith, but because it\'s the client\'s document.',
          'As an independent consultant, you may be signing many of these agreements over a career. The risks compound across engagements. These are the clauses worth scrutinizing.',
        ],
      },
      {
        h2: 'Six Red Flags in Consulting Agreements',
        paragraphs: [''],
        h3s: [
          {
            heading: '1. Overbroad IP assignment',
            body: 'The most common consulting agreement issue: a clause assigning all IP created during the engagement to the client, including pre-existing tools, frameworks, or methods you bring to the work. A reasonable IP clause transfers deliverables; an overbroad one claims your underlying methodology.',
          },
          {
            heading: '2. Exclusivity or non-compete during the engagement',
            body: 'Some consulting agreements prohibit working with clients in the same industry during the engagement — not after, but during. For a consultant serving multiple clients in a specialized field, this can be a business-stopper. It\'s not always visible upfront; look for language about "competitive conflicts" or "exclusivity."',
          },
          {
            heading: '3. Unlimited indemnification',
            body: 'Indemnification clauses require you to cover the client\'s losses if something goes wrong. Unlimited indemnification — no cap, no limitations on covered claims — means your personal exposure could far exceed the value of the contract. Negotiate a cap at the fee amount or the amount covered by your professional liability insurance.',
          },
          {
            heading: '4. Unilateral termination without notice or pay',
            body: '"Client may terminate this agreement immediately for any reason" with no kill fee or notice period leaves you with no compensation for work in progress. A 2-week notice period or kill fee equal to hours already worked is a reasonable ask.',
          },
          {
            heading: '5. Vague approval / acceptance process',
            body: 'If the agreement doesn\'t define when deliverables are accepted, the client can request endless revisions without triggering final payment. Define what "accepted" means, who approves, and what the timeline is.',
          },
          {
            heading: '6. Client-favorable governing law',
            body: 'A consulting agreement that puts you (in California) under the laws of a state with different contractor protections or worse arbitration rules is worth noting. You may be able to negotiate governing law to your state.',
          },
        ],
      },
      {
        h2: 'Using Revealr to Review a Consulting Agreement',
        paragraphs: [
          'Revealr identifies overbroad IP clauses, unlimited indemnification, exclusivity provisions, and unfavorable termination terms in consulting agreements. Upload your agreement and get a plain-English breakdown of the clauses most likely to affect you — before you sign.',
        ],
      },
    ],
  },

  // ── 16 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'what-is-a-non-solicitation-agreement',
    title: 'Non-Solicitation Agreement Explained: What It Covers and How Long It Lasts',
    metaDescription:
      'Non-solicitation clauses restrict who you can recruit and who you can work with after leaving a job. Here\'s what they cover, how enforceable they are, and when to push back.',
    h1: 'Non-Solicitation Agreement Explained',
    category: 'nda',
    publishedAt: '2025-03-17',
    excerpt:
      'Non-solicitation clauses are commonly bundled with NDAs and non-competes but work differently. Here\'s what they actually restrict.',
    readingTime: 5,
    relatedLanding: { href: '/nda-review', anchor: 'NDA Review Tool' },
    relatedPosts: [
      { href: '/blog/common-nda-red-flags', anchor: 'Common NDA Red Flags' },
      { href: '/blog/non-compete-clause-explained', anchor: 'Non-Compete Clause Explained' },
    ],
    sections: [
      {
        h2: 'What a Non-Solicitation Agreement Restricts',
        paragraphs: [
          'A non-solicitation agreement (NSA) prevents you from soliciting two groups of people after you leave a job: (1) the company\'s employees — you can\'t recruit your former colleagues to join a new employer or your own venture, and (2) the company\'s clients — you can\'t reach out to former clients to bring your business elsewhere.',
          'These are separate restrictions that may appear together in one clause or in separate clauses. It\'s worth understanding which ones you\'re agreeing to.',
        ],
      },
      {
        h2: 'Non-Solicitation vs. Non-Compete: What\'s the Difference?',
        paragraphs: [
          'Non-competes restrict where you can work. Non-solicitation clauses restrict who you can recruit and whose business you can pursue. The key practical difference: a non-compete says you can\'t work for a competitor; a non-solicitation clause says you can work for anyone but can\'t bring former colleagues or clients with you.',
          'Non-solicitation clauses are generally considered more enforceable than non-competes because they\'re more narrowly drawn. Courts that won\'t enforce a broad non-compete may still enforce a reasonable non-solicitation restriction.',
        ],
      },
      {
        h2: 'When Non-Solicitation Clauses Cross the Line',
        paragraphs: [
          'Legitimate non-solicitation clauses restrict active targeting of specific former clients or colleagues. Overbroad ones try to prevent: general marketing or advertising that happens to reach former clients, responding to unsolicited outreach from former clients, or working with any former client even if they seek you out independently.',
          'Duration matters too. 6–12 months is commonly enforceable. 2+ years for broad non-solicitation of clients is increasingly scrutinized.',
        ],
      },
      {
        h2: 'What to Review Before Signing',
        paragraphs: [
          'When you see a non-solicitation clause: check how "clients" are defined (just current clients, or prospects too?), how "employees" are defined (all employees, or just those you worked with?), what counts as solicitation (active outreach, or any contact?), and the duration.',
          'Using Revealr to review an employment contract or NDA that contains non-solicitation language surfaces the scope of the restriction and flags terms that are broader than typical — giving you a specific starting point for negotiation.',
        ],
      },
    ],
  },

  // ── 17 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'job-offer-letter-vs-employment-contract',
    title: 'Job Offer Letter vs. Employment Contract: What\'s Different and Why It Matters',
    metaDescription:
      'Job offer letters and employment contracts both define your employment terms, but they have different legal weight and different clauses to watch for. Here\'s what changes.',
    h1: 'Job Offer Letter vs. Employment Contract: Key Differences',
    category: 'employment',
    publishedAt: '2025-03-19',
    excerpt:
      'An offer letter and an employment contract aren\'t the same thing — and what\'s missing from an offer letter can matter as much as what\'s in it.',
    readingTime: 5,
    relatedLanding: { href: '/job-offer-review', anchor: 'Job Offer Review Tool' },
    relatedPosts: [
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'What to Check in an Employment Contract' },
      { href: '/blog/non-compete-clause-explained', anchor: 'Non-Compete Clause Explained' },
    ],
    sections: [
      {
        h2: 'What a Job Offer Letter Is (and Isn\'t)',
        paragraphs: [
          'A job offer letter is a written summary of the basic terms of employment: title, start date, salary, reporting structure, and sometimes benefits. It\'s usually a short document — 1–3 pages — and often not written by a lawyer.',
          'Offer letters are generally considered binding as to the terms they state. But because they\'re short, they leave many things undefined — and what\'s undefined gets filled in by other agreements you\'ll sign, company policy, or state employment law.',
        ],
      },
      {
        h2: 'What a Full Employment Contract Adds',
        paragraphs: [
          'A full employment agreement goes significantly further: it includes at-will vs. term provisions, detailed compensation structure (bonus triggers, equity terms, vesting), IP assignment, non-compete and non-solicitation restrictions, dispute resolution (arbitration clauses), termination provisions and severance terms, and confidentiality obligations.',
          'The critical point: many companies include non-compete and IP assignment clauses in the offer letter itself — before you\'ve even started — alongside the compensation details. It\'s easy to focus on the salary number and miss the non-compete buried two pages later.',
        ],
      },
      {
        h2: 'What\'s Missing From Offer Letters (And Why That Matters)',
        paragraphs: [
          'When an offer letter is silent on something, it\'s not automatically resolved in your favor. Silence on termination terms usually means at-will employment. Silence on bonus structure usually means discretionary. Silence on IP ownership usually gets resolved by a later agreement you\'ll be asked to sign at onboarding.',
          'The onboarding agreements — typically a package including an IP assignment, arbitration agreement, and sometimes a non-compete — are often presented as routine paperwork on your first day. By then, you\'ve already left your previous job.',
        ],
      },
      {
        h2: 'Using Revealr to Review an Offer Letter',
        paragraphs: [
          'Revealr reviews offer letters specifically: identifying at-will language, signing bonus clawback provisions, equity terms that need clarification, and non-compete clauses that shouldn\'t be in an offer letter at all. Upload your offer letter and get a breakdown of what the terms actually mean — before you accept.',
        ],
      },
    ],
  },

  // ── 18 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'independent-contractor-misclassification',
    title: 'Independent Contractor Misclassification: What It Is and How to Spot It in Your Contract',
    metaDescription:
      'Being classified as a contractor when you\'re actually an employee costs you benefits, protections, and money. Here\'s how to spot misclassification in your agreement.',
    h1: 'Independent Contractor Misclassification: How to Spot It in Your Agreement',
    category: 'freelance',
    publishedAt: '2025-03-21',
    excerpt:
      'Misclassification as an independent contractor can cost you thousands in taxes and benefits. Here\'s how to tell if your contract reflects your actual working relationship.',
    readingTime: 6,
    relatedLanding: { href: '/independent-contractor-agreement-review', anchor: 'Independent Contractor Agreement Review Tool' },
    relatedPosts: [
      { href: '/blog/service-agreement-vs-employment-contract', anchor: 'Service Agreement vs. Employment Contract' },
      { href: '/blog/freelance-contract-mistakes', anchor: 'Freelance Contract Mistakes' },
    ],
    sections: [
      {
        h2: 'What Worker Misclassification Is',
        paragraphs: [
          'Worker misclassification occurs when someone who functions as an employee is classified and paid as an independent contractor. The label in the contract doesn\'t determine the actual legal relationship — the substance of the working arrangement does.',
          'For the misclassified worker: no employer payroll tax contributions, no benefits, no unemployment insurance, no workers\' compensation, and often fewer legal protections. The contractor is responsible for paying self-employment taxes on the full income (vs. splitting FICA with an employer).',
        ],
      },
      {
        h2: 'The Tests Courts Use to Determine Employment Status',
        paragraphs: [
          'Different states and federal agencies use different tests, but the core factors are similar:',
        ],
        h3s: [
          {
            heading: 'Behavioral control',
            body: 'Does the company control how, when, and where you do the work? Employees are directed; contractors control their own process. A contract that dictates your daily schedule, requires you to be on-call, or mandates specific work methods looks like employment.',
          },
          {
            heading: 'Financial control',
            body: 'Can you work for multiple clients? Are you free to make a profit or loss? Do you invest in your own equipment and tools? Employees receive a fixed salary; contractors can operate at a profit or loss and typically have multiple revenue sources.',
          },
          {
            heading: 'Relationship permanence',
            body: 'Is the relationship indefinite, or project-based? Long-term exclusive engagements where the "contractor" works alongside employees doing similar work often look like employment regardless of the contract label.',
          },
        ],
      },
      {
        h2: 'Red Flags in Contractor Agreements That Signal Misclassification',
        paragraphs: [
          'Contract language that suggests potential misclassification: fixed work hours or schedules, requirement to work at a specific company location full-time, prohibition on other clients without approval, employer-provided equipment as the exclusive work arrangement, supervisor overseeing daily tasks rather than reviewing deliverables, and indefinite engagement with no defined project scope or end date.',
        ],
      },
      {
        h2: 'What to Do If You Suspect Misclassification',
        paragraphs: [
          'If your working arrangement looks more like employment than contracting: research your state\'s classification test (California\'s ABC test is notably strict), document how the work actually functions in practice, and consider whether to raise the issue directly or consult an employment attorney. The IRS Form SS-8 allows workers to formally request a classification determination.',
          'Using Revealr to review an independent contractor agreement can surface clauses that describe employment-like control — giving you a concrete, documented basis for raising the classification question.',
        ],
      },
    ],
  },

  // ── 19 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-read-an-nda',
    title: 'How to Read an NDA Before You Sign: A Plain-English Walkthrough',
    metaDescription:
      'NDAs are common, but few people read them carefully. Here\'s a clause-by-clause guide to what matters, what\'s standard, and what you should push back on.',
    h1: 'How to Read an NDA Before You Sign',
    category: 'nda',
    publishedAt: '2025-03-24',
    excerpt:
      'NDAs look standard until they\'re not. Here\'s how to read one from start to finish — and what the key clauses actually mean.',
    readingTime: 7,
    relatedLanding: { href: '/nda-review', anchor: 'NDA Review Tool' },
    relatedPosts: [
      { href: '/blog/common-nda-red-flags', anchor: 'Common NDA Red Flags' },
      { href: '/blog/what-is-a-non-solicitation-agreement', anchor: 'Non-Solicitation Agreement Explained' },
      { href: '/blog/non-compete-clause-explained', anchor: 'Non-Compete Clause Explained' },
    ],
    sections: [
      {
        h2: 'Start With Who Is Bound and What Is Covered',
        paragraphs: [
          'The first thing to establish: is this a one-way NDA (only you are bound) or a mutual NDA (both parties are bound)? If you\'re sharing confidential information too — your ideas, your code, your business plans — a one-way NDA doesn\'t protect you.',
          'Next, read the definition of "Confidential Information." A definition that covers all information shared or discussed without limitation is almost unlimited in scope. A reasonable definition covers: specifically marked confidential materials, named categories (trade secrets, customer lists, financial projections), and information disclosed in specific contexts (board meetings, due diligence).',
        ],
      },
      {
        h2: 'The Standard Exclusions (And Why They Matter)',
        paragraphs: [
          'Every well-drafted NDA has standard exclusions from confidentiality obligations. Look for: (1) Information already publicly known. (2) Information you knew before receiving it from this party. (3) Information you independently developed without reference to the confidential material. (4) Information received from a third party with no confidentiality obligation. (5) Disclosures required by law or court order.',
          'If an NDA lacks these exclusions, it may try to claim confidentiality over information you already knew or information that\'s publicly available. This isn\'t enforceable, but creates friction.',
        ],
      },
      {
        h2: 'Permitted Uses and Permitted Disclosures',
        paragraphs: [
          'What can you do with the confidential information? The NDA should specify: only to evaluate the business relationship, only to persons who need to know for that purpose, and that those persons are also bound by confidentiality.',
          'Permitted disclosure to lawyers, accountants, and advisors who are already bound by professional confidentiality obligations is standard and reasonable.',
        ],
      },
      {
        h2: 'Duration: How Long Are You Bound?',
        paragraphs: [
          'A typical NDA lasts 2–5 years. "Perpetual" confidentiality for general business information is unusual and increasingly difficult to enforce. Trade secrets can be protected indefinitely under law without needing a contract — so an NDA doesn\'t need to be perpetual to protect legitimate trade secrets.',
          'Check whether the NDA distinguishes between general confidential information (finite term) and actual trade secrets (indefinite). This is good practice and signals a well-drafted agreement.',
        ],
      },
      {
        h2: 'What Happens When the NDA Ends or the Relationship Does',
        paragraphs: [
          'Does the NDA require return or destruction of confidential materials? Is there a certification of destruction? What happens to digital files? These provisions matter more in practice than they seem on paper.',
          'Also check: what survives termination of the agreement? Confidentiality obligations for information that was shared should survive even if the NDA expires — otherwise the confidentiality protection disappears retroactively.',
        ],
      },
      {
        h2: 'Using Revealr to Review an NDA',
        paragraphs: [
          'Revealr reviews NDA clauses for overbroad definitions, missing standard exclusions, one-way obligations when mutuality would be appropriate, and excessive duration. Upload your NDA and get a plain-English breakdown of what you\'re agreeing to before you sign.',
        ],
      },
    ],
  },

  // ── 20 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'lease-early-termination-negotiation-guide',
    title: 'Lease Early Termination: How to Negotiate an Exit Before Your Term Ends',
    metaDescription:
      'Need to break your lease early? Here\'s how to negotiate an exit — from invoking your lease clause to requesting a mutual release — and what it typically costs.',
    h1: 'Lease Early Termination: How to Negotiate an Exit Before Your Term Ends',
    category: 'lease',
    publishedAt: '2025-03-26',
    excerpt:
      'Breaking a lease costs money — but how much depends on what\'s in your lease and how you handle the exit. Here\'s how to negotiate the best outcome.',
    readingTime: 7,
    relatedLanding: { href: '/lease-renewal-review', anchor: 'Lease Renewal Review Tool' },
    relatedPosts: [
      { href: '/blog/early-termination-fee-clause', anchor: 'Early Termination Fee Clause' },
      { href: '/blog/how-to-negotiate-a-lease', anchor: 'How to Negotiate a Lease' },
      { href: '/blog/how-to-review-a-lease-before-signing', anchor: 'How to Review a Lease Before Signing' },
    ],
    sections: [
      {
        h2: 'Read Your Lease Clause First',
        paragraphs: [
          'Before contacting your landlord, know exactly what your lease says about early termination. Three possible situations: (1) Your lease has an early termination clause with a defined fee and process — follow it. (2) Your lease has no early termination clause — you\'re technically liable for rent through the end of the term, but there may be negotiated alternatives. (3) Your lease is ambiguous — this gives you room to negotiate.',
          'If you don\'t have a copy of your lease, request it from your landlord or property management company immediately.',
        ],
      },
      {
        h2: 'What You Can Legally Owe If You Break a Lease',
        paragraphs: [
          'In most U.S. states, landlords have a duty to mitigate — meaning they must make reasonable efforts to re-rent the unit, rather than collecting rent from you while leaving it vacant. Your liability is theoretically capped at the rent lost until they find a new tenant.',
          'A fixed early termination fee in your lease predetermines this — often at 1–2 months\' rent, which may be more or less than the actual mitigation period. The fee is a negotiated estimate of damages.',
        ],
      },
      {
        h2: 'Legal Grounds That May Allow You to Break Without Penalty',
        paragraphs: [
          'Certain circumstances allow lease termination without penalty regardless of what your lease says:',
        ],
        h3s: [
          {
            heading: 'Active military service',
            body: 'The Servicemembers Civil Relief Act (SCRA) allows active-duty military personnel to terminate a lease with 30 days\' written notice after receiving deployment orders.',
          },
          {
            heading: 'Uninhabitable conditions',
            body: 'If a landlord fails to maintain habitable conditions — no heat, significant water damage, pest infestation — you may be able to claim constructive eviction and terminate without penalty. Document everything first.',
          },
          {
            heading: 'Domestic violence, sexual assault, or stalking',
            body: 'Most states allow survivors to terminate a lease early (often with 30 days\' notice) without penalty when safety is the reason.',
          },
          {
            heading: 'Landlord breach of the lease',
            body: 'If the landlord has materially violated the lease — illegal entry, failure to repair, harassment — you may have grounds to terminate based on their breach.',
          },
        ],
      },
      {
        h2: 'How to Negotiate an Early Exit Without a Legal Ground',
        paragraphs: [
          'If you don\'t have legal grounds, negotiation is your path. Approach it from the landlord\'s perspective: what do they actually care about? A consistent rental income stream and a good tenant for the replacement. Help them solve that problem.',
          'Effective approaches: offer to find a qualified replacement tenant yourself, offer to pay until the unit is re-rented (capped at a reasonable period), offer a lump sum early termination payment if it\'s less than remaining rent, or negotiate a move-out timeline that gives the landlord maximum lead time to re-rent.',
          'Get any agreement in writing — a signed lease termination agreement or written confirmation of the terms. Verbal agreements are difficult to enforce if the landlord later claims you still owe more.',
        ],
      },
    ],
  },

  // ── 21 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-vs-lawyer-contract-review',
    title: 'AI Contract Review vs. a Lawyer: When to Use Each',
    metaDescription:
      'AI contract review is fast, affordable, and available 24/7. Lawyers provide jurisdiction-specific advice. Here\'s when to use each — and when you need both.',
    h1: 'AI Contract Review vs. a Lawyer: When to Use Each',
    category: 'general',
    publishedAt: '2025-03-01',
    excerpt:
      'AI can surface risk patterns in seconds. Lawyers provide legal advice. Understanding the difference helps you use both tools appropriately.',
    readingTime: 6,
    relatedLanding: { href: '/contract-risk-checker', anchor: 'Contract Risk Checker' },
    relatedPosts: [
      { href: '/blog/how-to-read-a-contract-with-ai', anchor: 'How to Read a Contract with AI' },
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'What to Check in an Employment Contract' },
    ],
    sections: [
      {
        h2: 'The Core Difference',
        paragraphs: [
          'AI contract analysis and legal advice serve different purposes. Conflating them leads to either overreliance on AI (signing documents that needed a lawyer) or underutilizing AI (paying $300 for a lawyer to read a standard NDA).',
          'AI tools like Revealr identify patterns in contract language — clauses that are unusual, one-sided, or commonly cause problems. A licensed attorney provides legal advice: they can tell you whether a specific clause is enforceable in your jurisdiction, what your options are in a dispute, and what legal exposure you carry.',
        ],
      },
      {
        h2: 'What AI Contract Review Does Well',
        paragraphs: [
          'AI is fast, affordable, and available immediately. For most standard contracts, the significant risks are in predictable places: security deposit language, non-compete scope, IP assignment, automatic renewal windows, arbitration clauses.',
        ],
        h3s: [
          {
            heading: 'Rapid risk identification across the full document',
            body: 'A 20-page contract takes an AI model seconds to read. It will surface clause-level issues that a rushed human reviewer might miss — especially in footnotes, addenda, and cross-references.',
          },
          {
            heading: 'Plain-English translation of legal language',
            body: 'AI is particularly useful for explaining what a clause actually means in practical terms. "The party of the first part shall indemnify and hold harmless" can be translated into "you agree to cover their legal costs if someone sues them over something you did."',
          },
          {
            heading: 'Preparation for negotiation',
            body: 'The output of an AI analysis — specific clause references, plain-English descriptions, suggested alternatives — gives you a structured starting point for negotiation. You go in knowing exactly what to push back on.',
          },
          {
            heading: 'Flagging documents that need a lawyer',
            body: 'An AI review that identifies multiple critical flags in a high-value contract is itself a signal that professional review is warranted. The AI helps you triage, not replace, legal judgment.',
          },
        ],
      },
      {
        h2: 'What Only a Lawyer Can Do',
        paragraphs: [
          'Legal advice is not the same as contract analysis. A lawyer provides a professional opinion about your specific situation, under the law of your specific jurisdiction, based on facts only you can provide.',
        ],
        h3s: [
          {
            heading: 'Jurisdiction-specific advice',
            body: 'Non-compete enforceability varies dramatically by state. California refuses to enforce them; Texas enforces them narrowly; New York has an evolving standard. An AI can flag a non-compete as broad — only a lawyer in your jurisdiction can tell you whether it\'s legally binding on you.',
          },
          {
            heading: 'Advice that accounts for your specific situation',
            body: 'Your negotiating leverage, the counterparty\'s history, what you\'ve already said in writing, what your industry norms are — none of this is in the contract document. A lawyer incorporates this context into their advice.',
          },
          {
            heading: 'Representation if there\'s a dispute',
            body: 'If a clause is later disputed, you want documented legal advice from a professional who can represent you. An AI output is not a legal opinion and carries no professional liability.',
          },
          {
            heading: 'Complex multi-party or high-value transactions',
            body: 'Business acquisitions, large commercial leases, equity agreements, and any contract with significant financial or legal exposure warrant professional review regardless of what any AI tool finds.',
          },
        ],
      },
      {
        h2: 'A Practical Decision Framework',
        paragraphs: [
          'Use AI first for almost any contract. It costs $19 and takes 60 seconds. If the AI finds no critical flags and the contract is routine, you may not need a lawyer at all.',
          'Escalate to a lawyer when: the AI surfaces multiple critical flags; the contract involves significant assets, equity, or IP; you\'re in a disputed situation; or you need advice that accounts for your jurisdiction\'s specific laws.',
          'The most effective approach for high-stakes contracts: run an AI review first, then bring the flagged clauses to a lawyer. This makes the professional consultation faster and more focused — and typically cuts the billable time significantly.',
        ],
      },
    ],
  },

  // ── 22 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-negotiate-an-employment-contract',
    title: 'How to Negotiate an Employment Contract: A Practical Guide',
    metaDescription:
      'Most employment contracts are negotiable. Here\'s what to push back on, how to frame requests professionally, and which terms matter most for your long-term career.',
    h1: 'How to Negotiate an Employment Contract',
    category: 'employment',
    publishedAt: '2025-03-05',
    excerpt:
      'Employment contracts are not take-it-or-leave-it. Most terms can be negotiated — if you know what to ask for and how to ask.',
    readingTime: 7,
    relatedLanding: { href: '/employment-contract-review', anchor: 'Employment Contract Review Tool' },
    relatedPosts: [
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'What to Check in an Employment Contract' },
      { href: '/blog/non-compete-clause-explained', anchor: 'Non-Compete Clause Explained' },
    ],
    sections: [
      {
        h2: 'Why Most People Don\'t Negotiate',
        paragraphs: [
          'There are two reasons employees don\'t push back on employment contracts. First, they assume the document is standard and non-negotiable. Second, they don\'t want to seem difficult during what feels like a final stage of the hiring process.',
          'Both assumptions are wrong. Most employment contracts are drafted to favor the employer by default — because no one pushes back. And employers expect negotiation from professional candidates. A candidate who never asks questions about the contract is not reassuring; they\'re just signing away leverage.',
        ],
      },
      {
        h2: 'The Most Negotiable Terms',
        paragraphs: ['Not everything in an employment contract has equal flexibility. Focus your energy on terms with the highest long-term impact.'],
        h3s: [
          {
            heading: 'Non-compete scope and geography',
            body: 'This is the most important term to negotiate for most professional roles. Request a defined list of direct competitors rather than a broad industry exclusion. Negotiate the geographic scope down to where you actually work — "nationwide" is rarely justified. Push for a shorter duration: 6 months is more common than 2 years in jurisdictions that enforce these clauses.',
          },
          {
            heading: 'IP assignment and personal project carve-outs',
            body: 'If you have existing side projects, a business, or creative work you developed before this job, request a written carve-out by name before you sign. Generic "work done on personal time with personal resources" carve-outs are better than nothing but may not protect specific projects. Get your projects listed explicitly.',
          },
          {
            heading: 'Severance and notice periods',
            body: 'At-will employment means either party can terminate with no notice by default. If you\'re accepting a role with career risk — leaving a stable position, relocating, taking below-market salary for equity — negotiate explicit severance terms and notice requirements. Even 4–8 weeks of severance is meaningful.',
          },
          {
            heading: 'Equity terms',
            body: 'If the offer includes stock options or RSUs, the contract details matter: vesting schedule, cliff, acceleration on change of control, exercise window after departure. A 30-day exercise window on departure is standard but potentially limiting; 90–180 days is better. Double-trigger acceleration (vesting accelerates if the company is acquired AND you\'re let go) protects against a common scenario.',
          },
          {
            heading: 'Bonus structure',
            body: 'If a bonus is "discretionary," it can be reduced to zero. Push for objective metrics tied to the bonus (e.g., "50% of bonus is paid if company achieves X, 50% based on personal OKRs"). Ask what the payout history has been. Get it in writing.',
          },
        ],
      },
      {
        h2: 'How to Frame Negotiation Requests',
        paragraphs: [
          'Professional negotiation is matter-of-fact, not adversarial. You\'re not asking for special treatment — you\'re asking for terms you can sign in good conscience.',
          'Useful framing: "I noticed the non-compete covers all technology companies nationwide for 24 months. I\'d like to discuss narrowing the scope to [specific companies/region] and reducing the term to 12 months." Specific, calm, and focused on a concrete outcome.',
          'Ask for modifications in writing over email. This creates a record and gives the other side time to get HR or legal to respond. In-person pushback is harder to action and easier to dismiss.',
          'Know your walk-away point before you start. The leverage you have in negotiation depends on how badly each side needs the deal. If you have competing offers, say so — it\'s relevant and not aggressive.',
        ],
      },
      {
        h2: 'What Employers Rarely Change',
        paragraphs: [
          'Some terms are harder to negotiate: mandatory arbitration clauses are often company policy and HR does not have authority to change them. At-will employment status in at-will states is similarly fixed in most cases.',
          'That doesn\'t mean you shouldn\'t try — just calibrate your expectations and don\'t make these dealbreakers unless they genuinely are.',
        ],
      },
    ],
  },

  // ── 23 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-review-a-purchase-agreement',
    title: 'How to Review a Purchase Agreement Before Closing',
    metaDescription:
      'What to check in a real estate purchase agreement before you sign: contingencies, earnest money, as-is clauses, closing terms, and what the AI flags most often.',
    h1: 'How to Review a Purchase Agreement Before Closing',
    category: 'general',
    publishedAt: '2025-03-10',
    excerpt:
      'A real estate purchase agreement is one of the largest contracts most people ever sign. Here\'s what to check before closing.',
    readingTime: 7,
    relatedLanding: { href: '/purchase-agreement-review', anchor: 'Purchase Agreement Review Tool' },
    relatedPosts: [
      { href: '/blog/how-to-review-a-lease-before-signing', anchor: 'How to Review a Lease Before Signing' },
      { href: '/blog/how-to-read-a-contract-with-ai', anchor: 'How to Read a Contract with AI' },
    ],
    sections: [
      {
        h2: 'Why Purchase Agreements Get Less Attention Than They Deserve',
        paragraphs: [
          'The average home purchase involves multiple simultaneous pressures: competing buyers, tight timelines, excited agents, and the emotional weight of a major decision. In this environment, the 30-page purchase agreement often gets less scrutiny than the home inspection report.',
          'Purchase agreements are not standard documents. Every deal involves negotiated terms, and the defaults favor the party whose agent drafted the contract. Understanding the key clauses before you sign — not after — is the only way to know what you\'ve actually agreed to.',
        ],
      },
      {
        h2: 'The 7 Clauses That Matter Most in a Purchase Agreement',
        paragraphs: [''],
        h3s: [
          {
            heading: '1. Contingency clauses',
            body: 'Financing, inspection, and appraisal contingencies are your legal escape routes if things go wrong. Understand what triggers each contingency, the deadline to invoke it, and what happens to your earnest money if you walk. Waiving contingencies is common in competitive markets but carries real risk — a failed appraisal without an appraisal contingency leaves you either making up the difference in cash or losing your deposit.',
          },
          {
            heading: '2. Earnest money and forfeiture conditions',
            body: 'Earnest money (typically 1–3% of the purchase price) demonstrates commitment and is typically credited at closing. But under what conditions does the seller keep it? If you back out for a reason not covered by a contingency, you typically forfeit the deposit. Understand the exact forfeiture conditions before you write the check.',
          },
          {
            heading: '3. As-is clauses and seller disclosure limitations',
            body: '"As-is" sales limit what you can demand of the seller after inspection. The seller still has disclosure obligations, but an as-is clause waives your right to ask for repairs or renegotiate price based on inspection findings. Know whether this is in your contract before the inspection period starts.',
          },
          {
            heading: '4. Closing date flexibility and delay penalties',
            body: 'Closing dates are often tight. If your financing is delayed or title issues arise, what are the consequences? Some agreements allow for reasonable extensions; others impose per-day penalties or allow the other party to cancel. Understand the timeline and who bears the cost of a delay.',
          },
          {
            heading: '5. What\'s included and excluded from the sale',
            body: 'Fixtures are generally included; personal property is not. But "fixtures" is often disputed. The contract should list specific items that are included (appliances, window treatments, built-ins) or excluded (specific light fixtures, garage equipment). Verbal agreements about what stays don\'t survive closing.',
          },
          {
            heading: '6. Title warranty type',
            body: 'A general warranty deed provides the strongest title guarantee — the seller warrants title against all claims, even those predating their ownership. A special warranty deed only warrants against claims arising during the seller\'s ownership. A quitclaim deed provides no warranty. Know what you\'re getting.',
          },
          {
            heading: '7. Default remedies',
            body: 'If the buyer defaults, the seller typically keeps the earnest money. If the seller defaults, the buyer can typically demand specific performance (force the sale) or sue for damages. Understand both scenarios and what your actual remedies are.',
          },
        ],
      },
      {
        h2: 'Before You Sign: A Quick Checklist',
        paragraphs: [
          'Run through these before countersigning any purchase agreement: (1) Are all contingencies present and is the timeline realistic? (2) Is the earnest money amount and forfeiture condition clear? (3) Does the agreement specify what\'s included in the sale? (4) What is the exact closing date and what happens if it\'s missed? (5) Is there an as-is clause, and if so, what are the remaining inspection rights?',
          'Real estate transactions are complex enough that professional review — by a real estate attorney or experienced agent — is typically warranted. Use an AI review as a first pass to understand the document and identify specific clauses to discuss with your attorney.',
        ],
      },
    ],
  },

  // ── 24 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'what-is-at-will-employment',
    title: 'What Is At-Will Employment? What It Actually Means for You',
    metaDescription:
      'At-will employment means either party can end the job at any time, for any reason, with no notice required. Here\'s what it actually means — and what it doesn\'t.',
    h1: 'What Is At-Will Employment? What It Actually Means',
    category: 'employment',
    publishedAt: '2025-03-12',
    excerpt:
      'Most U.S. employment is at-will, but the term is often misunderstood. Here\'s what it means, what it doesn\'t protect you from, and what to negotiate.',
    readingTime: 5,
    relatedLanding: { href: '/employment-contract-review', anchor: 'Employment Contract Review Tool' },
    relatedPosts: [
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'What to Check in an Employment Contract' },
      { href: '/blog/how-to-negotiate-an-employment-contract', anchor: 'How to Negotiate an Employment Contract' },
    ],
    sections: [
      {
        h2: 'The Basic Definition',
        paragraphs: [
          'At-will employment means that either the employer or the employee can end the employment relationship at any time, for any reason, without providing advance notice or legal justification.',
          'This is the default rule in 49 U.S. states. (Montana is the exception — it has a "good cause" termination standard after a probationary period.) Unless your employment contract explicitly overrides it, you are almost certainly an at-will employee in the U.S.',
        ],
      },
      {
        h2: 'What At-Will Employment Does NOT Mean',
        paragraphs: ['At-will is frequently misunderstood as meaning employers can do anything. That\'s not accurate.'],
        h3s: [
          {
            heading: 'It doesn\'t override anti-discrimination law',
            body: 'You cannot be fired because of your race, sex, national origin, religion, disability, age (if over 40), or other protected characteristics under federal law. State and local laws add additional categories. "At-will" is not a defense for discriminatory termination.',
          },
          {
            heading: 'It doesn\'t override retaliation protections',
            body: 'Firing an employee for reporting workplace safety violations (OSHA), filing a wage complaint, or whistleblowing on illegal activity is illegal regardless of at-will status. Many states add additional retaliation protections.',
          },
          {
            heading: 'It doesn\'t void contractual promises',
            body: 'If your employment contract includes severance terms, notice requirements, or cause-based termination standards, those override the at-will default for that specific employer-employee relationship. At-will is the default, not a trump card.',
          },
          {
            heading: 'It doesn\'t eliminate implied contract claims',
            body: 'In some states, employer handbooks, verbal promises, or past practices can create implied contractual rights — even without a written employment contract. "We never fire people without a performance improvement plan first" can create a legal expectation in some jurisdictions.',
          },
        ],
      },
      {
        h2: 'What At-Will Employment Means in Practice',
        paragraphs: [
          'In practice, at-will means your employer can let you go without severance, without notice, and without explaining why — as long as the reason isn\'t legally prohibited.',
          'This is why negotiating severance and notice terms explicitly in your employment contract matters. An at-will agreement with contractual severance and 30-day notice obligations on both sides is very different from a pure at-will arrangement.',
        ],
      },
      {
        h2: 'When to Negotiate Away from Pure At-Will',
        paragraphs: [
          'If you\'re leaving a stable job, relocating, or accepting below-market compensation for equity or other benefits, you\'re taking on career risk. In these situations, negotiating explicit severance terms is reasonable and common.',
          'Consider requesting: a defined notice period on both sides (30–60 days), severance of 1–3 months if terminated without cause, and a specific definition of "cause" so termination for cause isn\'t used to avoid paying severance. These are negotiable terms at the offer stage — significantly less so after you\'ve started.',
        ],
      },
    ],
  },

  // ── 25 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-review-a-freelance-contract',
    title: 'How to Review a Freelance Contract Before Signing',
    metaDescription:
      'A freelance contract checklist: what to check in payment terms, IP ownership, revision clauses, termination rights, and how to push back on unfavorable terms.',
    h1: 'How to Review a Freelance Contract Before Signing',
    category: 'freelance',
    publishedAt: '2025-03-15',
    excerpt:
      'Most freelance disputes trace back to the contract. Here\'s what to check — and push back on — before the project starts.',
    readingTime: 6,
    relatedLanding: { href: '/freelance-contract-review', anchor: 'Freelance Contract Review Tool' },
    relatedPosts: [
      { href: '/blog/freelance-contract-mistakes', anchor: 'Freelance Contract Mistakes' },
      { href: '/blog/ip-assignment-agreement-what-to-know', anchor: 'IP Assignment: What to Know' },
    ],
    sections: [
      {
        h2: 'Why Freelance Contract Review Is Different',
        paragraphs: [
          'Employment contracts protect one relationship. Freelance contracts define a commercial transaction — and often, the freelancer has less leverage and less familiarity with contract language than the client.',
          'The risk in a poorly drafted freelance contract is usually specific: you do the work, the client doesn\'t pay, or you deliver the work and they own more than you realized. Most freelance disputes are entirely predictable from reading the contract before starting.',
        ],
      },
      {
        h2: 'The 6 Most Important Clauses in Any Freelance Contract',
        paragraphs: [''],
        h3s: [
          {
            heading: '1. IP ownership and work-for-hire',
            body: 'This is the highest-risk clause for most creative and technical freelancers. Work-for-hire language means the client owns everything you create from the moment of creation. If the contract assigns ownership of preliminary concepts, rejected drafts, and tools/processes you developed for the project — not just the final deliverable — you may be giving away significant IP. Negotiate ownership down to final approved deliverables and retain rights to tools and methodologies.',
          },
          {
            heading: '2. Payment schedule and late payment terms',
            body: 'When is payment due? What triggers the invoice? What happens if payment is late? A contract that says "payment within 30 days of project completion" is less protective than "payment within 14 days of invoice date." Late payment fees (1.5–2% per month is standard) create an incentive for timely payment and compensation for delays.',
          },
          {
            heading: '3. Kill fee',
            body: 'If the client cancels the project after work has started, are you compensated? A kill fee (typically 25–50% of the contracted amount for work completed) protects you from losing revenue on opportunity cost. Many client-provided contracts omit kill fees entirely.',
          },
          {
            heading: '4. Revision limits',
            body: '"Revisions until client satisfaction" is unlimited scope. Define the number of revision rounds (2 is standard), what constitutes a revision versus a new request, and what additional rounds cost. This single clause is responsible for a significant portion of scope creep in creative projects.',
          },
          {
            heading: '5. Termination rights asymmetry',
            body: 'Can the client terminate the project at any time for any reason? What are you owed if they do? A contract that lets the client terminate without cause and owe you only completed work devalues your scheduling commitment. At minimum, negotiate for a kill fee and payment for all deliverables in progress at the time of termination.',
          },
          {
            heading: '6. Indemnification scope',
            body: 'Indemnification clauses hold you responsible for losses the client suffers due to your work. Broad indemnification language ("any claim arising from the deliverables") can expose you to liability for things outside your control. Negotiate indemnification to cover only your direct negligence or breach — not general claims related to the use of your work.',
          },
        ],
      },
      {
        h2: 'Before You Sign: A Practical Checklist',
        paragraphs: [
          'Before signing any freelance contract: (1) Confirm the payment amount, schedule, and late fee terms are explicit. (2) Read the IP ownership section carefully and understand exactly what you\'re transferring. (3) Check for a revision cap and make sure it\'s defined. (4) Look for a kill fee — if there isn\'t one, add it. (5) Check what happens if the client is late to provide feedback or approvals (timeline extension rights protect you). (6) Check whether the non-disparagement clause is mutual.',
          'Client-provided contracts are written by or for the client. That\'s not an accusation — it\'s just context. Your job is to read it with that lens and ask for changes that make the agreement fair to both sides.',
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
