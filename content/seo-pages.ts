// ─────────────────────────────────────────────────────────────────────────────
// content/seo-pages.ts
// Single source of truth for all 20 programmatic SEO pages.
// To add a page: append one SEOPage object to the array below.
// ─────────────────────────────────────────────────────────────────────────────

export type Intent =
  | 'transaccional'
  | 'comercial'
  | 'problem-aware'
  | 'informacional-comercial';

export type Difficulty = 'baja-media' | 'media' | 'media-alta';
export type Monetization = 'alto' | 'medio-alto' | 'medio';
export type Priority = 'alta' | 'media-alta' | 'media';
export type Cluster =
  | 'lease-rental'
  | 'employment-job'
  | 'nda-restrictive'
  | 'service-freelance'
  | 'contract-review'
  | 'purchase-real-estate';
export type SeverityLevel = 'CRITICAL' | 'WARNING' | 'INFO';

export interface FAQ {
  question: string;
  answer: string;
}

export interface InternalLink {
  href: string;
  anchor: string;
}

export interface CheckItem {
  title: string;
  description: string;
}

export interface SampleFlag {
  severity: SeverityLevel;
  section: string;
  title: string;
  body: string;
  action?: string;
}

export interface WhoItem {
  role: string;
  description: string;
}

export interface SEOPage {
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: Intent;
  difficulty: Difficulty;
  monetization: Monetization;
  priority: Priority;
  cluster: Cluster;
  hubPage: string;
  title: string;
  metaDescription: string;
  h1: string;
  h2s: [string, string, string];
  intro: string;
  checksTitle: string;
  checks: CheckItem[];
  sampleDocumentLabel: string;
  sampleFlags: SampleFlag[];
  whoThisIsFor: WhoItem[];
  whyReviewStat: string;
  faqs: FAQ[];
  relatedPages: InternalLink[];
  ctaPrimary: string;
  ctaSecondary?: string;
  ctaMicrocopy: string;
  disclaimer: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA — 20 pages
// ─────────────────────────────────────────────────────────────────────────────

export const seoPages: SEOPage[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'lease-agreement-analyzer',
    primaryKeyword: 'lease agreement analyzer',
    secondaryKeywords: [
      'ai lease review tool',
      'apartment lease clause checker',
      'upload lease for analysis',
      'lease document analyzer',
      'check lease clauses online',
      'rental agreement checker',
      'automated lease review',
    ],
    intent: 'transaccional',
    difficulty: 'media',
    monetization: 'alto',
    priority: 'alta',
    cluster: 'lease-rental',
    hubPage: '/lease-agreement-analyzer',
    title: 'Lease Agreement Analyzer — Review Any Lease with AI in 60 Seconds | Revealr',
    metaDescription:
      'Upload your lease for a full AI risk analysis. Revealr scores it 0–100 and flags every risky clause in plain English. Know what to ask before signing.',
    h1: 'Lease Agreement Analyzer — Review Any Lease with AI in 60 Seconds',
    h2s: [
      'What Does a Lease Agreement Analyzer Actually Check?',
      'Clauses Revealr Flags in Real Lease Agreements',
      'Why Analyze Your Lease Before Signing — Not After',
    ],
    intro:
      "Revealr reads every clause in your lease and flags anything that could cost you money, limit your rights, or trap you into unfavorable terms. You get a risk score from 0–100, plain-English explanations for every flagged clause, and a list of recommended actions — all in under 60 seconds. No law degree required.",
    checksTitle: 'What Revealr checks in your lease',
    checks: [
      { title: 'Security deposit conditions', description: 'Non-refundable language, deduction rights, return deadlines' },
      { title: 'Early termination penalties', description: 'Fee amounts, calculation methods, notice requirements' },
      { title: 'Landlord entry and inspection rights', description: 'Notice periods, frequency, emergency vs routine access' },
      { title: 'Automatic renewal traps', description: 'Notice windows, price changes, auto-rollover provisions' },
      { title: 'Maintenance responsibilities', description: 'Who pays for what, appliance coverage, habitability duties' },
      { title: 'Habitability and utility clauses', description: 'Heat, water, structural obligations, utility responsibility' },
    ],
    sampleDocumentLabel: 'Lease Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§14.3',
        title: 'Non-Refundable Security Deposit',
        body: 'This lease designates the full $2,500 security deposit as non-refundable regardless of property condition at move-out. In most states, security deposits must be returned minus documented damage. This clause likely violates tenant protection laws in your jurisdiction.',
      },
      {
        severity: 'WARNING',
        section: '§8.1',
        title: 'Automatic Lease Renewal',
        body: 'Your lease automatically renews for 12 months unless you provide written notice 60 days before expiration. Missing this deadline commits you to another full year at potentially higher rent.',
      },
    ],
    whoThisIsFor: [
      { role: 'First-time renters', description: "Signing your first lease and not sure what to look for" },
      { role: 'Tenants moving to a new unit', description: "You have a lease in hand and need to review it before signing" },
      { role: 'Landlords and property managers', description: "Reviewing lease templates for compliance and fairness" },
    ],
    whyReviewStat:
      'The average U.S. renter signs a lease worth $18,000–$30,000 per year. A single missed clause — a non-refundable deposit, an early termination fee, an unreasonable entry provision — can cost hundreds or thousands of dollars.',
    faqs: [
      {
        question: 'How accurate is an AI lease analyzer?',
        answer:
          'AI lease analysis catches most standard red flags — non-refundable deposit language, unreasonable penalty clauses, overbroad landlord entry rights — with high accuracy. It cannot replace a lawyer for complex disputes, but for standard residential leases it is an effective first review.',
      },
      {
        question: 'Can I use this to analyze a commercial lease?',
        answer:
          'Revealr works best on residential leases but can analyze commercial agreements too. Commercial leases often have more complex clauses — we flag the most common risks and note where professional legal advice is strongly recommended.',
      },
      {
        question: 'What file formats does Revealr accept?',
        answer:
          'You can upload a PDF or paste your lease text directly. Most standard lease documents work immediately.',
      },
      {
        question: 'Is my lease document kept private?',
        answer:
          'Your document is processed securely and never shared with third parties. Documents are deleted from our servers after analysis.',
      },
      {
        question: "Do I need to read the full lease before uploading?",
        answer:
          "No — that is the point. Upload your lease, let Revealr read it, then focus your attention on the specific clauses it flags as risky.",
      },
    ],
    relatedPages: [
      { href: '/security-deposit-clause-checker', anchor: 'check your security deposit clause' },
      { href: '/lease-red-flags-before-signing', anchor: '12 lease red flags checklist' },
      { href: '/landlord-entry-notice-clause', anchor: 'landlord entry rights explained' },
      { href: '/blog/how-to-review-a-lease-before-signing', anchor: 'guide: how to review a lease' },
      { href: '/blog/common-lease-red-flags', anchor: 'guide: lease red flags explained' },
    ],
    ctaPrimary: 'Upload Your Lease — Get Your Risk Report',
    ctaSecondary: 'See a Sample Report',
    ctaMicrocopy: '$19 · Instant · No account required',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. It is not a substitute for legal advice. For complex disputes or high-stakes agreements, consult a licensed attorney in your jurisdiction.',
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'analyze-my-lease',
    primaryKeyword: 'analyze my lease',
    secondaryKeywords: [
      'upload my lease for analysis',
      'check my lease online',
      'what does my lease say',
      'read my lease for me',
      'lease checker online free',
      'how to understand my lease',
      'lease document reader',
    ],
    intent: 'transaccional',
    difficulty: 'baja-media',
    monetization: 'alto',
    priority: 'alta',
    cluster: 'lease-rental',
    hubPage: '/lease-agreement-analyzer',
    title: 'Analyze My Lease Online — Upload It, Get Plain-English Results in 60 Seconds',
    metaDescription:
      'Upload your lease for a clause-by-clause AI breakdown. Revealr highlights risky parts and tells you what to ask or negotiate before you sign. Instant results.',
    h1: 'Analyze My Lease — Upload It and Know Exactly What It Says',
    h2s: [
      'What the Analysis Shows You, Step by Step',
      'The Clauses Most Tenants Miss — Until It\'s Too Late',
      'What to Do After You Get Your Results',
    ],
    intro:
      "You have a lease. It's 14 pages. You have 48 hours to sign. Revealr reads it in 60 seconds and shows you the parts you need to pay attention to — the early termination fees, the automatic renewals, the repair responsibilities, the deposit terms — in plain English, with a recommended action for each one.",
    checksTitle: 'What your lease analysis includes',
    checks: [
      { title: 'Full document read-through', description: 'Every clause, every section — not just a keyword scan' },
      { title: 'Early termination fee amount', description: 'Exact penalty if you need to break the lease early' },
      { title: 'Automatic renewal window', description: 'When you must give notice to avoid renewing involuntarily' },
      { title: 'Deposit refund conditions', description: 'What you need to do to get your deposit back in full' },
      { title: 'Repair and maintenance obligations', description: 'What falls on you vs. your landlord to fix and pay for' },
      { title: 'Landlord access rights', description: 'When and how the landlord can enter your unit' },
    ],
    sampleDocumentLabel: 'Residential Lease',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§11.4',
        title: 'Early Termination Fee — 3 Months\' Rent',
        body: 'If you break this lease for any reason before the end of the term, you owe the equivalent of 3 months\' rent ($6,900) as a liquidated damages fee, regardless of how much notice you give or whether the landlord re-rents the unit immediately. This is above average and may not be fully enforceable depending on your state.',
      },
      {
        severity: 'WARNING',
        section: '§6.2',
        title: 'Tenant Responsible for All Repairs Under $250',
        body: 'You are responsible for the cost of any repair or maintenance item under $250, including appliance malfunctions not caused by normal use. This means a broken dishwasher or malfunctioning thermostat could be your financial responsibility. Clarify this scope before signing.',
      },
    ],
    whoThisIsFor: [
      { role: 'Anyone with a lease in hand right now', description: 'You received a lease and need to understand it before the deadline to sign' },
      { role: 'Tenants who skimmed their last lease', description: "You've had issues before and want to be more careful this time" },
      { role: 'People moving to a new city', description: "You're not familiar with local norms and want a safety check on the terms" },
    ],
    whyReviewStat:
      "The average U.S. lease contains 6–8 clauses that directly affect your financial obligations during the tenancy. Most tenants can identify 1–2 of them without help. The rest become surprises.",
    faqs: [
      {
        question: 'What file format do I need to upload?',
        answer:
          'PDF works best. Word documents (.doc, .docx) are also supported. If your lease was emailed as a PDF, you can upload it directly. Photos of printed leases also work, though text-based files give more accurate results.',
      },
      {
        question: 'How long does the analysis take?',
        answer:
          'Most standard residential leases (under 30 pages) are fully analyzed in under 60 seconds. Longer or image-based documents may take up to 90 seconds.',
      },
      {
        question: 'What exactly does the report show me?',
        answer:
          'You get a risk score from 0–100, a list of flagged clauses organized by severity (Critical, Warning, Info), a plain-English explanation of each flag, and a specific recommended action. The report is also available as a downloadable PDF.',
      },
      {
        question: 'Can I analyze a lease I already signed?',
        answer:
          "Yes — and it's still useful. Knowing what your lease says helps you respond correctly if disputes arise. If you signed something with an illegal clause, you may not be bound by it regardless.",
      },
      {
        question: 'What if the analysis comes back with no flags?',
        answer:
          "A clean report is genuinely good news — it means your lease doesn't contain obvious red flags. You still receive the full breakdown of what each clause means, so you know what you've agreed to.",
      },
      {
        question: 'Is this the same as having a lawyer review my lease?',
        answer:
          "No — Revealr provides an AI-assisted first pass, not legal advice. For complex leases or high-value situations, consulting a local tenant's rights attorney is still recommended. Revealr helps you go into that conversation knowing which specific clauses to ask about.",
      },
    ],
    relatedPages: [
      { href: '/lease-agreement-analyzer', anchor: 'full lease agreement analyzer' },
      { href: '/lease-red-flags-before-signing', anchor: '12 lease red flags to check' },
      { href: '/security-deposit-clause-checker', anchor: 'check your security deposit terms' },
      { href: '/blog/how-to-review-a-lease-before-signing', anchor: 'guide: how to review a lease' },
    ],
    ctaPrimary: 'Upload My Lease Now',
    ctaSecondary: 'What Does a Report Look Like?',
    ctaMicrocopy: 'Upload your lease · Get results in 60 sec · $19 to unlock full report',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. It is not a substitute for legal advice. Lease law varies by state — consult a licensed attorney for complex disputes.',
  },

  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'security-deposit-clause-checker',
    primaryKeyword: 'security deposit clause checker',
    secondaryKeywords: [
      'non-refundable security deposit clause',
      'security deposit red flags lease',
      'is my security deposit clause legal',
      'security deposit withholding clause',
      'security deposit deduction rights',
      'check security deposit terms',
      'security deposit dispute prevention',
    ],
    intent: 'problem-aware',
    difficulty: 'baja-media',
    monetization: 'alto',
    priority: 'alta',
    cluster: 'lease-rental',
    hubPage: '/lease-agreement-analyzer',
    title: "Security Deposit Clause Checker — Is Your Deposit at Risk? | Revealr",
    metaDescription:
      'Check your security deposit clause with AI. Revealr flags illegal terms, non-refundable language, and unfair deduction rights before you sign your lease.',
    h1: 'Security Deposit Clause Checker — Know If Your Deposit Is Protected',
    h2s: [
      'What Makes a Security Deposit Clause Risky or Illegal?',
      'What Revealr Checks in Your Security Deposit Terms',
      'How to Protect Your Security Deposit Before You Move In',
    ],
    intro:
      "Security deposits are one of the most disputed parts of any rental agreement — and one sentence in your lease can determine whether you get yours back. Revealr reads your security deposit clause against standard tenant protections and flags language that could legally or practically cost you your deposit before you even move in.",
    checksTitle: 'What Revealr checks in security deposit terms',
    checks: [
      { title: '"Non-refundable" deposit language', description: 'Blanket non-refundable clauses are unenforceable in most states' },
      { title: 'Vague wear and tear definitions', description: 'Undefined "normal wear and tear" enables excessive deductions' },
      { title: 'Landlord deduction rights', description: 'Overly broad deduction lists that go beyond documented damage' },
      { title: 'Return deadline provisions', description: 'Missing or excessively long deposit return timelines' },
      { title: 'Deposit amount vs legal maximum', description: 'Deposits exceeding 1–2 months rent may violate state law' },
    ],
    sampleDocumentLabel: 'Lease Security Deposit Clause',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§5.2',
        title: 'Non-Refundable Security Deposit',
        body: 'This clause states the $2,500 security deposit is non-refundable under any circumstances. This language is unenforceable in most states and violates tenant protection statutes. Do not sign without negotiating this clause.',
      },
      {
        severity: 'WARNING',
        section: '§5.6',
        title: 'No Deposit Return Timeline Specified',
        body: "This lease does not specify when your security deposit will be returned after move-out. Most states require return within 14–30 days with an itemized statement of any deductions. Without a stated deadline, there is no contractual basis to enforce timely return.",
        action: 'Request a specific return deadline — 21 days after move-out is standard and reasonable to ask for.',
      },
    ],
    whoThisIsFor: [
      { role: 'Tenants reviewing a new lease', description: "You want to make sure your deposit is legally protected before handing it over" },
      { role: 'Renters who have had deposit disputes before', description: "You know how costly a bad deposit clause can be" },
      { role: 'First-time renters', description: "You want to understand exactly what your deposit covers and when you get it back" },
    ],
    whyReviewStat:
      "Security deposit disputes are the single most common landlord-tenant conflict in the U.S. — and most of them start with a lease clause that was never reviewed before signing.",
    faqs: [
      {
        question: 'Is it legal for a landlord to say a deposit is non-refundable?',
        answer:
          'In most U.S. states, security deposits must be returned minus documented damage, making a blanket "non-refundable" clause unenforceable. However, fees labeled as "move-in fees" or "administrative fees" can legitimately be non-refundable. Revealr flags this distinction.',
      },
      {
        question: 'What is "normal wear and tear" and why does it matter?',
        answer:
          'Normal wear and tear (minor scuffs, carpet aging, small nail holes) cannot be deducted from a security deposit in most jurisdictions. If your lease does not define this or gives the landlord broad deduction rights, it is a significant red flag.',
      },
      {
        question: 'How much can a landlord charge for a security deposit?',
        answer:
          'Most states cap security deposits at 1–2 months rent. Revealr flags clauses where the deposit amount or terms may exceed legal limits.',
      },
      {
        question: 'What if my lease does not mention a return deadline?',
        answer:
          'Most states require deposits to be returned within 14–30 days of move-out. A lease that does not address this does not protect you. Revealr notes missing provisions.',
      },
      {
        question: 'Can I negotiate security deposit terms before signing?',
        answer:
          "Yes — and this is exactly why reviewing before signing matters. Revealr's report tells you which terms are negotiable and what language to request instead.",
      },
    ],
    relatedPages: [
      { href: '/lease-agreement-analyzer', anchor: 'analyze your full lease' },
      { href: '/lease-red-flags-before-signing', anchor: 'other lease red flags to watch for' },
      { href: '/maintenance-responsibility-in-lease', anchor: 'who is responsible for repairs and damage' },
    ],
    ctaPrimary: 'Check My Security Deposit Clause',
    ctaSecondary: 'See a Sample Deposit Analysis',
    ctaMicrocopy: 'Upload your lease · Results in 60 seconds · $19',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Security deposit laws vary by state and locality. Consult a tenant rights organization or attorney for specific legal advice.',
  },

  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'lease-red-flags-before-signing',
    primaryKeyword: 'lease red flags before signing',
    secondaryKeywords: [
      'warning signs in a rental lease',
      'risky clauses in lease agreement',
      'lease checklist before signing',
      'bad lease clauses to watch for',
      'apartment lease warning signs',
      'lease clauses that cost tenants money',
      'what to look for before signing a lease',
    ],
    intent: 'informacional-comercial',
    difficulty: 'baja-media',
    monetization: 'alto',
    priority: 'alta',
    cluster: 'lease-rental',
    hubPage: '/lease-agreement-analyzer',
    title: '12 Lease Red Flags to Check Before You Sign — Warning Signs That Cost Tenants Money',
    metaDescription:
      'These 12 lease clauses are the most common sources of disputes and financial loss for tenants. Check your lease for every one of them before you sign.',
    h1: '12 Lease Red Flags to Check Before You Sign',
    h2s: [
      'The Clauses That Appear Most Often in Disputed Leases',
      'What Each Red Flag Could Actually Cost You',
      'How to Check Your Lease Before the Signing Deadline',
    ],
    intro:
      "Not all lease problems look like problems. The clauses that hurt tenants most don't say \"we're going to take your money\" — they say things like \"landlord reserves the right to\" or \"tenant agrees that\" buried in paragraph 14. These are the 12 warning signs that come up most often when tenants end up in disputes — and what to do when you find them.",
    checksTitle: 'The 12 red flags this page covers',
    checks: [
      { title: 'Non-refundable deposit clause', description: 'Blanket "non-refundable" language — illegal in most states but you still have to fight it' },
      { title: 'Automatic renewal with long notice window', description: '60–90 days\' notice required, with no calendar reminder built in' },
      { title: 'Landlord entry without adequate notice', description: 'Entry rights broader than what state law requires' },
      { title: 'Early termination fee above 2 months\' rent', description: 'Fees disproportionate to actual damages may be unenforceable' },
      { title: 'Tenant responsible for all repairs under $X', description: 'Open-ended repair liability with a threshold that covers real appliances' },
      { title: 'Automatic rent increase at renewal', description: 'Rent hike with no cap, no notice requirement, and no negotiation window' },
      { title: 'Self-help eviction language', description: 'Clauses letting the landlord remove belongings or change locks without court order' },
      { title: 'Waiver of right to quiet enjoyment', description: 'Any language waiving your statutory right to peaceful occupancy' },
      { title: 'Mandatory arbitration clause', description: 'Restricts your ability to use small claims court or tenant tribunal' },
      { title: 'Joint and several liability without carve-outs', description: 'Each roommate owes 100% of rent — including for others who stop paying' },
      { title: 'Vague "damage" definition', description: 'Language that allows landlord discretion to deduct anything as damage' },
      { title: 'Unilateral lease modification clause', description: 'Landlord can change rules mid-tenancy with minimal notice' },
    ],
    sampleDocumentLabel: 'Apartment Lease Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§7.3',
        title: 'Landlord Self-Help Eviction Permitted',
        body: 'This lease states that upon any breach of lease terms, the landlord may "take possession of the premises and remove tenant\'s property by any lawful means." Self-help eviction — removing belongings or changing locks without a court order — is illegal in nearly every U.S. state. This clause is likely unenforceable, but its presence signals how this landlord approaches tenant rights.',
      },
      {
        severity: 'WARNING',
        section: '§4.5',
        title: 'Automatic Renewal — 75-Day Notice Required',
        body: 'Your lease automatically renews for another 12-month term unless you provide written notice 75 days before the expiration date. That\'s 2.5 months\' notice. Most state laws require 30 days. Mark your calendar immediately and set two reminders.',
      },
    ],
    whoThisIsFor: [
      { role: 'Renters doing due diligence before signing', description: 'You want a checklist of what to look for — not just a tool to upload your lease' },
      { role: 'Tenants who had a bad experience in a previous rental', description: 'You know what a problem clause can cost and want to catch them earlier this time' },
      { role: 'Parents helping adult children review their first lease', description: 'You want to know what questions to ask and which clauses need attention' },
    ],
    whyReviewStat:
      "Security deposits and early termination fees account for the majority of small claims court cases between landlords and tenants in the U.S. In most cases, the dispute could have been avoided — or the tenant would have negotiated differently — if the clause had been reviewed before signing.",
    faqs: [
      {
        question: 'Which of these red flags are dealbreakers vs. negotiable?',
        answer:
          'Non-refundable deposit clauses, self-help eviction language, and waivers of quiet enjoyment are usually dealbreakers or require removal before signing. Automatic renewal windows, early termination fees, and repair thresholds are commonly negotiable — most landlords will adjust them when asked directly.',
      },
      {
        question: 'Can a landlord legally enforce a clause that seems unfair?',
        answer:
          'Not always. Clauses that violate state statute — like non-refundable deposits where state law prohibits them, or self-help eviction provisions — are unenforceable regardless of whether you signed. The problem is that you often don\'t learn this until after a dispute. Knowing in advance gives you the option to not sign or to negotiate.',
      },
      {
        question: 'What if I find multiple red flags in the same lease?',
        answer:
          'Multiple red flags in a single lease are rarely accidental — they usually reflect the landlord\'s general approach to tenant relationships. One or two negotiable flags: ask for changes. Several CRITICAL flags alongside refusal to negotiate: seriously reconsider signing.',
      },
      {
        question: 'How do I bring up a red flag clause with my landlord?',
        answer:
          'Direct and factual works best: "I noticed clause 9 says the security deposit is non-refundable — most state laws require deposits to be returned minus documented damage, so I\'d like to update this to standard language before signing." You\'re not accusing anyone of bad faith; you\'re asking for a standard term.',
      },
      {
        question: 'I already signed a lease with a red flag clause. Now what?',
        answer:
          "First, research whether the specific clause is enforceable in your state — some aren't, even if you signed. Second, document everything (move-in photos, written communications). Third, for CRITICAL clauses, consult a local tenant's rights organization — many offer free advice.",
      },
    ],
    relatedPages: [
      { href: '/lease-agreement-analyzer', anchor: 'run a full AI check on your lease' },
      { href: '/security-deposit-clause-checker', anchor: 'check your security deposit clause specifically' },
      { href: '/landlord-entry-notice-clause', anchor: 'understand landlord entry rights' },
      { href: '/blog/common-lease-red-flags', anchor: 'guide: common lease red flags explained' },
    ],
    ctaPrimary: 'Check My Lease for These Red Flags',
    ctaSecondary: 'See What a Report Looks Like',
    ctaMicrocopy: 'Upload your lease · AI flags the risky clauses · $19 full report',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Tenant protections vary significantly by state and locality. This content is not legal advice — consult a licensed attorney or local tenant rights organization for specific guidance.',
  },

  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'employment-contract-review',
    primaryKeyword: 'employment contract review',
    secondaryKeywords: [
      'review employment contract before signing',
      'employment agreement review tool',
      'ai employment contract review',
      'job contract clause checker',
      'employment contract red flags',
      'what to look for in employment contract',
      'employment contract risk assessment',
    ],
    intent: 'comercial',
    difficulty: 'media',
    monetization: 'alto',
    priority: 'alta',
    cluster: 'employment-job',
    hubPage: '/employment-contract-review',
    title: 'Employment Contract Review — Understand Every Clause Before You Sign | Revealr',
    metaDescription:
      "Upload your employment contract and get a full AI clause-by-clause review. Revealr flags non-competes, IP clauses, termination terms, and more — in 60 seconds.",
    h1: "Employment Contract Review — Understand What You're Signing Before Day One",
    h2s: [
      'What Should You Actually Review in an Employment Contract?',
      'Clauses Revealr Flags in Employment Agreements',
      'Why $19 Is Worth It Before a Six-Figure Commitment',
    ],
    intro:
      "An employment contract is one of the most significant legal commitments you'll make. It defines your rights, your restrictions, and what you own — including what you create on your own time. Revealr reads every clause and flags what could limit your career, your income, or your intellectual property long after you've left the job.",
    checksTitle: 'What Revealr checks in employment contracts',
    checks: [
      { title: 'Non-compete and non-solicitation scope', description: 'Geographic reach, duration, and industry breadth of restrictions' },
      { title: 'IP ownership provisions', description: 'Who keeps what you build — including work done outside company hours' },
      { title: 'At-will vs for-cause termination', description: 'What it actually takes to fire you and what you get when they do' },
      { title: 'Bonus and equity clawback clauses', description: 'Repayment obligations triggered by voluntary or involuntary departure' },
      { title: 'Mandatory arbitration agreements', description: 'Clauses that waive your right to sue in court' },
      { title: 'Probationary period conditions', description: 'Reduced protections or altered terms during initial employment' },
    ],
    sampleDocumentLabel: 'Employment Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§11.2',
        title: 'Intellectual Property Assignment',
        body: "This clause assigns all inventions, software, and creative works to the company, including work done outside company hours and on personal equipment, if they relate in any way to the company's current or prospective business. This is overbroad and could restrict your personal projects and side income.",
      },
      {
        severity: 'WARNING',
        section: '§9.1',
        title: 'Mandatory Arbitration',
        body: 'All disputes arising from employment must be resolved through binding arbitration. You waive your right to a jury trial and to participate in class action lawsuits against the company.',
      },
    ],
    whoThisIsFor: [
      { role: 'New employees before day one', description: "You received a contract and need to understand it before signing" },
      { role: 'Employees switching jobs', description: "You want to compare terms and know what you're giving up or gaining" },
      { role: 'First-time professionals', description: "This is your first formal employment contract and you want a guide" },
    ],
    whyReviewStat:
      "Employment contracts are typically written by company lawyers whose job is to protect the company. Every clause that benefits the employee is one they did not include — unless you asked.",
    faqs: [
      {
        question: 'What are the most common red flags in employment contracts?',
        answer:
          'Overbroad non-compete clauses, IP assignment covering work done outside company hours, mandatory arbitration waiving your right to sue, and clawback clauses on bonuses and signing bonuses are the most frequent high-risk items.',
      },
      {
        question: 'Can I negotiate an employment contract?',
        answer:
          "Yes — more often than most employees realize. Non-compete geography, IP carve-outs for personal projects, and notice period length are commonly negotiated. Revealr's report shows you which clauses are worth pushing back on.",
      },
      {
        question: 'Is it worth reviewing if the company says the contract is standard?',
        answer:
          '"Standard" is not the same as fair or favorable. Standard employment contracts are written to protect the company, not the employee. A review tells you exactly where the asymmetry is.',
      },
      {
        question: 'Does Revealr work for executive employment agreements?',
        answer:
          "Yes. Revealr flags clause-level risks in all employment contracts. For complex executive agreements with equity structures, we recommend using the report as a starting point and sharing it with an employment attorney.",
      },
      {
        question: 'How is this different from asking a lawyer?',
        answer:
          "Revealr gives you an instant first-pass analysis for $19. A lawyer can then focus their time (and your money) on the specific clauses we flagged, rather than reading the whole document.",
      },
    ],
    relatedPages: [
      { href: '/job-offer-review', anchor: 'review your job offer letter first' },
      { href: '/non-compete-agreement-review', anchor: 'check your non-compete scope' },
      { href: '/termination-clause-review', anchor: 'check your termination clause' },
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'guide: employment contract checklist' },
      { href: '/blog/non-compete-clause-explained', anchor: 'guide: non-compete clauses explained' },
    ],
    ctaPrimary: 'Review My Employment Contract',
    ctaSecondary: 'See a Sample Employment Contract Analysis',
    ctaMicrocopy: '$19 · Full clause analysis · Results in 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Employment law varies significantly by state and country. For high-stakes employment disputes, consult a licensed employment attorney.',
  },

  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'job-offer-review',
    primaryKeyword: 'job offer review',
    secondaryKeywords: [
      'review job offer letter',
      'job offer letter red flags',
      'offer letter checklist before accepting',
      'job offer clause checker',
      'what to look for in a job offer',
      'review offer letter online',
      'job offer terms to negotiate',
    ],
    intent: 'transaccional',
    difficulty: 'baja-media',
    monetization: 'alto',
    priority: 'alta',
    cluster: 'employment-job',
    hubPage: '/employment-contract-review',
    title: "Job Offer Review — Check Your Offer Letter Before You Accept | Revealr",
    metaDescription:
      "Got a job offer? Upload your offer letter to Revealr and check for non-competes, at-will language, bonus clawbacks, and red flags — before you say yes.",
    h1: "Job Offer Review — Check Your Offer Letter Before You Accept",
    h2s: [
      "What's Actually in a Job Offer Letter?",
      'Red Flags Revealr Finds in Job Offer Letters',
      'What to Negotiate After Getting Your Job Offer Reviewed',
    ],
    intro:
      "A job offer letter looks simple — salary, start date, role. But buried in the same document can be a non-compete, a signing bonus clawback, or at-will employment language that strips you of protections you thought you had. Revealr reviews your offer letter in 60 seconds so you know exactly what you're accepting before you say yes.",
    checksTitle: 'What Revealr checks in job offer letters',
    checks: [
      { title: 'At-will employment language', description: 'What it means and how it affects your job security' },
      { title: 'Surprise non-compete clauses', description: 'Non-competes buried in offer letters before you even start' },
      { title: 'Signing bonus clawback provisions', description: 'Repayment obligations if you leave within 1–2 years' },
      { title: 'Compensation and equity terms', description: 'Vesting schedules, strike prices, bonus eligibility conditions' },
      { title: 'Start date and probationary period', description: 'Reduced protections or altered terms during initial period' },
    ],
    sampleDocumentLabel: 'Job Offer Letter',
    sampleFlags: [
      {
        severity: 'WARNING',
        section: '§3.4',
        title: 'Signing Bonus Repayment',
        body: "If you voluntarily resign or are terminated for cause within 18 months, you must repay 100% of the $15,000 signing bonus. This is a significant financial obligation. Revealr recommends negotiating this to a pro-rated repayment schedule.",
      },
      {
        severity: 'CRITICAL',
        section: '§7.1',
        title: 'Broad Non-Compete in Offer Letter',
        body: "This offer letter includes a non-compete clause restricting you from working for any competitor in the same industry for 12 months after leaving. You are agreeing to this restriction before you have even started. Request a geographic or role-specific limitation.",
      },
    ],
    whoThisIsFor: [
      { role: 'Job seekers with an offer in hand', description: "You have 48–72 hours to decide and want to review before committing" },
      { role: 'Candidates negotiating comp', description: "You want to know what terms are standard vs negotiable" },
      { role: 'First-time employees', description: "You have never received a formal offer letter before" },
    ],
    whyReviewStat:
      "Most offer letter negotiations happen within 24–72 hours of receipt. That is your entire window to understand what you are agreeing to and push back on anything asymmetric.",
    faqs: [
      {
        question: 'Is a job offer letter legally binding?',
        answer:
          'Yes, in some respects. If provisions like non-competes or IP assignment are included in the offer letter, those can be binding from day one. The offer letter is a legal document.',
      },
      {
        question: "What's the difference between an offer letter and an employment contract?",
        answer:
          'An offer letter outlines basic terms (salary, role, start date). An employment contract is a more detailed legal document. Some companies use only offer letters; others follow up with full contracts. Review both if you receive both.',
      },
      {
        question: 'Should I negotiate before or after accepting?',
        answer:
          "Before. Once you have accepted, your leverage decreases significantly. Revealr's report gives you specific clauses to flag and language to propose during negotiation.",
      },
      {
        question: 'What if my offer letter says employment is at-will?',
        answer:
          "At-will employment means the company can terminate you at any time for any legal reason. This is very common in the US but understanding it upfront matters for evaluating job security.",
      },
      {
        question: 'What is a signing bonus clawback and should I worry about it?',
        answer:
          "A clawback clause requires you to repay your signing bonus if you leave within a certain period (usually 1–2 years). It is contractually enforceable and worth knowing before you accept.",
      },
    ],
    relatedPages: [
      { href: '/employment-contract-review', anchor: 'review your full employment contract' },
      { href: '/non-compete-agreement-review', anchor: 'understand any non-compete in your offer' },
      { href: '/termination-clause-review', anchor: 'check the termination terms' },
    ],
    ctaPrimary: 'Review My Job Offer Now',
    ctaSecondary: 'See a Sample Offer Letter Analysis',
    ctaMicrocopy: 'Know before you accept · $19 · Results in 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Employment law varies by state. For complex offer negotiations, consider consulting an employment attorney.',
  },

  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'nda-review',
    primaryKeyword: 'nda review',
    secondaryKeywords: [
      'non-disclosure agreement review',
      'check nda before signing',
      'nda clause checker',
      'is my nda enforceable',
      'nda red flags',
      'nda confidentiality clause review',
      'review nda online tool',
    ],
    intent: 'comercial',
    difficulty: 'media',
    monetization: 'alto',
    priority: 'alta',
    cluster: 'nda-restrictive',
    hubPage: '/nda-review',
    title: "NDA Review — Know What You're Agreeing to Keep Secret | Revealr",
    metaDescription:
      "Upload your NDA and get a full AI risk review. Revealr flags overbroad confidentiality definitions, one-sided terms, and clauses that could haunt you for years.",
    h1: "NDA Review — Know What You're Agreeing to Keep Secret",
    h2s: [
      'What Makes an NDA Risky or Unenforceable?',
      'What Revealr Checks in Non-Disclosure Agreements',
      'Should You Ever Sign an NDA Without Reviewing It?',
    ],
    intro:
      "NDAs get signed constantly — for job interviews, freelance work, business meetings, and investment discussions. Most people sign them without reading a word. But an overbroad confidentiality clause, a perpetual duration, or a buried non-solicitation can limit what you say, where you work, and who you work with for years. Revealr reviews every clause and flags what needs your attention.",
    checksTitle: 'What Revealr checks in NDAs',
    checks: [
      { title: 'Confidentiality definition scope', description: 'Whether the definition is specific or so broad it captures everything' },
      { title: 'Duration and expiration', description: 'Perpetual or indefinite NDAs flagged — standard is 1–3 years' },
      { title: 'Mutual vs one-sided terms', description: 'NDAs labeled "mutual" that only protect one party in practice' },
      { title: 'Liquidated damages clauses', description: 'Pre-set financial penalties that may be disproportionate' },
      { title: 'Non-solicitation buried in the NDA', description: 'Work restrictions hiding inside confidentiality agreements' },
      { title: 'Assignment to third parties', description: 'Whether your obligations can be transferred without your consent' },
    ],
    sampleDocumentLabel: 'Non-Disclosure Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§2.1',
        title: 'Overbroad Definition of Confidential Information',
        body: "This NDA defines confidential information as 'any and all information disclosed in any form, whether oral, written, or by any other means.' This definition is so broad it could include information you already knew, information that is publicly available, or conversations that have nothing to do with the business relationship. Request a narrower definition with explicit exclusions.",
      },
      {
        severity: 'WARNING',
        section: '§6.1',
        title: 'No Expiration Date — Obligations May Be Perpetual',
        body: "This NDA does not specify a duration. Without a stated end date, your confidentiality obligations could be interpreted as indefinite. Industry standard is 2–3 years for general business information. Trade secret protections can legitimately last longer, but should be limited to specifically identified trade secrets.",
        action: 'Request a specific termination date or duration clause — 2–3 years from execution is standard for most business contexts.',
      },
    ],
    whoThisIsFor: [
      { role: 'Employees signing NDAs before starting', description: "You received an NDA as part of your onboarding package" },
      { role: 'Freelancers and contractors', description: "A client asked you to sign an NDA before sharing a brief" },
      { role: 'Anyone entering a business discussion', description: "You are meeting with a potential partner or investor who sent an NDA" },
    ],
    whyReviewStat:
      "NDAs are the most commonly signed legal document in professional life — and the least reviewed. A poorly understood NDA can restrict what you say, who you work with, and what you share for years after the relationship ends.",
    faqs: [
      {
        question: 'What should an NDA normally cover?',
        answer:
          "A fair NDA defines confidential information specifically, sets a reasonable duration (1–3 years is standard), includes mutual obligations if it's labeled 'mutual,' and excludes publicly available information from the definition.",
      },
      {
        question: 'Can an NDA last forever?',
        answer:
          "Some NDAs include perpetual confidentiality provisions, particularly for trade secrets. Whether this is reasonable depends on context. Revealr flags unusually long or indefinite terms.",
      },
      {
        question: "What's the difference between a mutual and a one-sided NDA?",
        answer:
          "A mutual NDA obligates both parties to keep each other's information confidential. A one-sided NDA only protects one party. Some NDAs are labeled 'mutual' but are one-sided in practice — Revealr checks for this.",
      },
      {
        question: 'What are the consequences of violating an NDA?',
        answer:
          "Liquidated damages (pre-set financial penalties), injunctions, and actual damages. Revealr flags when an NDA's damages provisions are disproportionate or aggressive.",
      },
      {
        question: 'Does signing an NDA prevent me from reporting illegal activity?',
        answer:
          "No. An NDA cannot legally prevent you from reporting illegal activity to authorities. However, some NDAs use language that implies this. Revealr flags clauses that may be attempting to silence whistleblowers.",
      },
      {
        question: 'Can I negotiate an NDA?',
        answer:
          "Yes. Narrowing the definition of confidential information, setting a shorter duration, and adding explicit carve-outs for prior knowledge are all common and reasonable requests.",
      },
    ],
    relatedPages: [
      { href: '/non-compete-agreement-review', anchor: 'check non-competes in the same agreement' },
      { href: '/ip-assignment-agreement-review', anchor: 'IP assignment clauses alongside NDAs' },
      { href: '/employment-contract-review', anchor: 'review your full employment contract' },
      { href: '/blog/common-nda-red-flags', anchor: 'guide: NDA red flags to watch for' },
      { href: '/blog/how-to-read-an-nda', anchor: 'guide: how to read an NDA clause by clause' },
    ],
    ctaPrimary: 'Review My NDA',
    ctaSecondary: 'See a Sample NDA Analysis',
    ctaMicrocopy: '$19 · Full clause review · Instant results',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. NDA enforceability varies by jurisdiction. For NDAs involving trade secrets or significant business relationships, consult a licensed attorney.',
  },

  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'termination-clause-review',
    primaryKeyword: 'termination clause review',
    secondaryKeywords: [
      'early termination clause in lease',
      'termination clause in employment contract',
      'at-will termination clause',
      'termination clause red flags',
      'what does termination clause mean',
      'lease break clause review',
      'termination clause checker',
    ],
    intent: 'problem-aware',
    difficulty: 'baja-media',
    monetization: 'alto',
    priority: 'alta',
    cluster: 'contract-review',
    hubPage: '/review-contract-before-signing',
    title: "Termination Clause Review — Know the Real Cost of Breaking Your Contract | Revealr",
    metaDescription:
      "Upload your contract and let Revealr review the termination clause. We check lease break penalties, at-will terms, clawbacks, and survival provisions.",
    h1: "Termination Clause Review — Know the Real Cost of Walking Away",
    h2s: [
      'What Should a Termination Clause Actually Say?',
      'What Revealr Finds in Termination Clauses',
      'Termination in Leases vs Employment Contracts',
    ],
    intro:
      "Most people never think about the termination clause until they need to exit a contract. By then, it is too late to negotiate. Whether you are reviewing a lease or an employment agreement, the termination clause determines how much it will cost you to leave — and what obligations follow you after you do.",
    checksTitle: 'What Revealr checks in termination clauses',
    checks: [
      { title: 'Early termination penalties', description: 'Fee amounts, caps, and calculation methods in leases' },
      { title: 'For-cause vs at-will language', description: 'What justifies termination and what protection you have' },
      { title: 'Clawback clauses on termination', description: 'Bonus or equity repayment triggered by leaving' },
      { title: 'Required notice periods', description: 'How much warning is needed and whether it is mutual' },
      { title: 'Survival clauses', description: 'Which obligations continue after the contract ends' },
    ],
    sampleDocumentLabel: 'Contract Termination Clause',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§16.1',
        title: 'Early Termination Fee',
        body: "If you terminate this lease before month 10, you owe rent for all remaining months plus a $1,500 administrative fee. This is significantly above market standard and may be challengeable in your jurisdiction. Revealr recommends asking for a 2-month buyout cap.",
      },
      {
        severity: 'WARNING',
        section: '§16.3',
        title: 'Asymmetric Notice Period',
        body: "You are required to provide 60 days written notice before terminating this agreement. The other party has no equivalent obligation and may exit on 14 days notice. This asymmetry means you bear the full cost of planning around the relationship's end while the other party does not.",
        action: 'Request that notice requirements be made mutual — 30 days for both parties is standard and reasonable.',
      },
    ],
    whoThisIsFor: [
      { role: 'Tenants who may need to break a lease', description: "You are signing a lease but unsure if you will stay the full term" },
      { role: 'Employees evaluating a new job', description: "You want to understand the exit terms before committing" },
      { role: 'Anyone uncertain about a long-term commitment', description: "You want to know the cost of leaving before you sign" },
    ],
    whyReviewStat:
      "Early termination disputes are among the most costly contract conflicts for individuals. A single unreviewed termination clause can cost 2–3 months rent or thousands in employment clawbacks.",
    faqs: [
      {
        question: 'What is an early termination penalty in a lease?',
        answer:
          'A fee you must pay if you break your lease before the end date. Common amounts are 1–3 months rent. Revealr flags clauses where the penalty seems disproportionate or where the calculation method is unclear.',
      },
      {
        question: 'What does at-will employment mean for termination?',
        answer:
          'The employer can terminate you at any time for any legal reason. Understanding at-will status is critical when evaluating job security — and some contracts say "at-will" while also including termination procedures that limit this.',
      },
      {
        question: 'What is a survival clause?',
        answer:
          'A provision that says certain obligations (confidentiality, non-compete, IP assignment) continue to apply after the contract ends. Revealr checks which obligations survive and for how long.',
      },
      {
        question: 'Can I negotiate a termination clause before signing?',
        answer:
          "Yes. Adding a cap to lease termination fees or requiring cause for employment termination are both negotiable in many situations. Revealr identifies where your termination clause is most aggressive.",
      },
      {
        question: 'What happens if a termination clause is unenforceable?',
        answer:
          "Courts may void unreasonable termination penalties. But litigation is expensive. It is better to negotiate before signing than to challenge it later.",
      },
    ],
    relatedPages: [
      { href: '/lease-agreement-analyzer', anchor: 'analyze your full lease' },
      { href: '/employment-contract-review', anchor: 'review your full employment contract' },
      { href: '/review-contract-before-signing', anchor: 'what else to check before signing any contract' },
      { href: '/blog/early-termination-fee-clause', anchor: 'guide: early termination fee clauses explained' },
    ],
    ctaPrimary: 'Review My Termination Clause',
    ctaSecondary: 'Analyze My Full Contract',
    ctaMicrocopy: 'Works for leases and employment contracts · $19 · 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Termination clause enforceability varies by state and contract type. Consult a licensed attorney for specific legal advice.',
  },

  // ── 9 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'lease-renewal-review',
    primaryKeyword: 'lease renewal review',
    secondaryKeywords: [
      'lease renewal terms checker',
      'review lease renewal notice',
      'lease renewal red flags',
      'automatic lease renewal clause',
      'review lease before renewing',
      'renew my lease checklist',
      'lease renewal clause changes',
    ],
    intent: 'transaccional',
    difficulty: 'baja-media',
    monetization: 'medio-alto',
    priority: 'media-alta',
    cluster: 'lease-rental',
    hubPage: '/lease-agreement-analyzer',
    title: "Lease Renewal Review — Check What Changed Before You Re-Sign | Revealr",
    metaDescription:
      "Don't re-sign your lease renewal without checking it first. Revealr flags new rent increases, changed entry terms, deposit changes, and renewal traps.",
    h1: "Lease Renewal Review — Check Your Renewal Terms Before You Re-Sign",
    h2s: [
      "What Changes When Your Lease Renews?",
      "What Revealr Flags in Lease Renewal Agreements",
      "Don't Re-Sign Until You've Checked These Clauses",
    ],
    intro:
      "A lease renewal is not just the same lease for one more year. Landlords can — and often do — change terms at renewal: raising rent, adding fees, tightening entry policies, or removing concessions from the original lease. Revealr reads your renewal agreement and tells you exactly what is different, what is risky, and what is worth pushing back on before you sign again.",
    checksTitle: 'What Revealr checks in lease renewals',
    checks: [
      { title: 'Rent increase provisions', description: 'New automatic increase clauses or changed amounts' },
      { title: 'Entry and inspection changes', description: 'Shorter notice periods or expanded landlord access' },
      { title: 'New pet, guest, or subletting restrictions', description: 'Policy changes that affect how you use the unit' },
      { title: 'Altered security deposit terms', description: 'New deposit requirements or changed refund conditions' },
      { title: 'Auto-renewal penalty traps', description: 'Notice windows that are shorter or less forgiving than before' },
    ],
    sampleDocumentLabel: 'Lease Renewal Agreement',
    sampleFlags: [
      {
        severity: 'WARNING',
        section: '§3.1',
        title: 'Annual Rent Increase Provision Added',
        body: "This renewal adds a clause allowing your landlord to increase rent by up to 8% on any anniversary date with 30 days notice. This provision was not in your original lease. In rent-stabilized markets, this may require local review.",
      },
      {
        severity: 'WARNING',
        section: '§7.2',
        title: 'Landlord Entry Notice Reduced from 48 to 24 Hours',
        body: "Your original lease required 48 hours written notice before landlord entry. This renewal reduces that window to 24 hours — the legal minimum in many states, but a meaningful reduction in practice. This is worth flagging before you re-sign.",
        action: 'Request that the original 48-hour written notice provision be reinstated. Most landlords will agree to this without pushback.',
      },
    ],
    whoThisIsFor: [
      { role: 'Tenants who received a renewal notice', description: "Your landlord sent you renewal paperwork and you want to check it" },
      { role: 'Long-term renters re-signing', description: "You have lived there for years and assume the terms are the same" },
      { role: 'Tenants considering whether to stay', description: "You want to understand the terms before deciding to renew or move" },
    ],
    whyReviewStat:
      "Lease renewals are treated as routine by most tenants — but landlords know that a tenant who has already moved in is less likely to push back on new terms. Renewal is when term changes get quietly introduced.",
    faqs: [
      {
        question: 'Is a lease renewal the same as my original lease?',
        answer:
          'Not necessarily. Many lease renewals include updated terms. Even if it references the original lease, amendments and addenda can change important provisions. Always review a renewal document before signing.',
      },
      {
        question: 'Can my landlord raise the rent at renewal?',
        answer:
          'Yes, in most markets without rent control. Revealr flags unusual or excessive rent increase clauses and notes where local regulations may apply.',
      },
      {
        question: "What if I don't sign the renewal but stay in the apartment?",
        answer:
          "In most states, you'll become a month-to-month tenant. This gives you more flexibility but may change your rent terms and protections. Revealr notes what your lease says about holdover tenancy.",
      },
      {
        question: 'Should I negotiate my lease renewal?',
        answer:
          "Absolutely. Renewals are underrated negotiation opportunities. Revealr's report gives you specific clauses to challenge and language to propose.",
      },
      {
        question: 'My landlord says the renewal is identical to the original. Should I still review it?',
        answer:
          "Yes. 'Identical' does not mean no changes, and even if it is identical, reviewing confirms that and gives you peace of mind.",
      },
    ],
    relatedPages: [
      { href: '/lease-agreement-analyzer', anchor: 'compare with your original lease analysis' },
      { href: '/lease-red-flags-before-signing', anchor: 'lease red flags to watch for at renewal' },
      { href: '/maintenance-responsibility-in-lease', anchor: 'check maintenance terms in your renewal' },
    ],
    ctaPrimary: 'Review My Lease Renewal',
    ctaSecondary: 'See a Sample Renewal Analysis',
    ctaMicrocopy: 'Upload your renewal document · $19 · Instant results',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Lease renewal rights vary by state and locality. Consult a tenant rights organization for specific guidance.',
  },

  // ── 10 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'rental-lease-review',
    primaryKeyword: 'rental lease review',
    secondaryKeywords: [
      'how to review a rental lease',
      'apartment lease review guide',
      'what to look for in a rental agreement',
      'rental agreement review checklist',
      'reviewing a lease for the first time',
      'residential lease review',
      'rental lease clauses explained',
    ],
    intent: 'informacional-comercial',
    difficulty: 'media',
    monetization: 'alto',
    priority: 'media-alta',
    cluster: 'lease-rental',
    hubPage: '/lease-agreement-analyzer',
    title: "Rental Lease Review: 8 Clauses Every Renter Must Check Before Signing",
    metaDescription:
      "Before signing a rental lease, check these 8 clauses. Revealr's AI flags deposit traps, illegal entry provisions, hidden fees, and auto-renewal terms.",
    h1: "Rental Lease Review — 8 Clauses Most Renters Miss Before Signing",
    h2s: [
      "The 8 Rental Lease Clauses That Cause the Most Tenant Problems",
      "What a Rental Lease AI Analysis Actually Flags",
      "How to Use Revealr to Review a Rental Lease in 60 Seconds",
    ],
    intro:
      "Rental leases are written by landlords or their attorneys. The language is designed to protect the property owner — not you. Most tenants focus on the rent amount and move-in date, then sign without reading the security deposit terms, early termination penalties, maintenance obligations, or automatic renewal clauses that will govern the next 12+ months of their life. Revealr reads every clause and surfaces the ones that create real risk — before you commit.",
    checksTitle: 'What Revealr flags in rental lease agreements',
    checks: [
      { title: 'Security deposit terms and deduction rights', description: 'Non-refundable fees disguised as deposits, and vague "any damage" deduction language' },
      { title: 'Landlord entry notice requirements', description: 'Notice periods below the 24-hour legal minimum, or verbal-only notice clauses' },
      { title: 'Early termination fees and penalties', description: 'Flat-fee penalties, rent acceleration clauses, and subletting restrictions' },
      { title: 'Automatic renewal provisions', description: 'Month-to-month traps and notice windows that are unreasonably short' },
      { title: 'Maintenance and repair obligations', description: 'Clauses that shift landlord habitability responsibilities to tenants' },
      { title: 'Utilities and hidden costs', description: 'Common-area fees, utility caps, and charges not reflected in the headline rent' },
      { title: 'Pet and guest policies', description: 'Restrictions and fees that create liability for ordinary household situations' },
      { title: 'Dispute resolution terms', description: 'Mandatory arbitration clauses that limit your legal options if a dispute arises' },
    ],
    sampleDocumentLabel: 'Residential Rental Lease',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§8.3',
        title: 'Security Deposit — Deductions for "Any Damage"',
        body: "This clause permits the landlord to deduct from your security deposit for 'any damage or wear to the premises,' without distinguishing between tenant damage and normal wear and tear. Normal wear and tear (minor scuffs, carpet aging, faded paint) cannot legally be charged to tenants in most states. This language creates a basis for disputing your entire deposit at move-out.",
        action: 'Request that the clause be amended to exclude normal wear and tear, or document pre-existing conditions in detail before move-in.',
      },
      {
        severity: 'WARNING',
        section: '§11.2',
        title: 'Automatic Renewal with 30-Day Notice Window',
        body: "This lease automatically renews for 12 months unless written cancellation notice is provided at least 30 days before expiration. Missing this window by even one day locks you into another full year at the renewal rate.",
        action: 'Set a calendar reminder at least 45 days before lease expiration to decide whether to renew or give notice.',
      },
    ],
    whoThisIsFor: [
      { role: 'First-time renters', description: "You are renting for the first time and do not know which clauses are standard vs problematic" },
      { role: 'Renters moving to a new city or state', description: "Lease standards and tenant protections vary significantly by location" },
      { role: 'Anyone reviewing a renewal or new lease', description: "Even experienced renters benefit from a clause-level check before committing to another term" },
    ],
    whyReviewStat:
      "Security deposit disputes and early termination disputes are the two most common landlord-tenant conflicts — and both almost always trace back to lease clauses the tenant did not fully understand before signing.",
    faqs: [
      {
        question: 'How long should it take to review a rental lease?',
        answer:
          "A thorough manual review of a standard lease takes 2–4 hours. With Revealr, you get a complete AI risk analysis in under 60 seconds — then you focus your reading time on the specific clauses it flags.",
      },
      {
        question: "What are the most common mistakes tenants make when reviewing a lease?",
        answer:
          "Focusing on rent and move-in date while skipping security deposit deduction terms, entry rights, maintenance obligations, automatic renewal clauses, and early termination penalties.",
      },
      {
        question: 'Can a landlord legally deduct for normal wear and tear?',
        answer:
          "No. In all U.S. states, landlords cannot charge tenants for normal wear and tear (minor scuffs, carpet aging, faded paint). Lease clauses that permit deductions for 'any damage' are a common dispute trigger that Revealr flags.",
      },
      {
        question: 'What if I cannot understand the legal language in my lease?',
        answer:
          "Revealr translates every flagged clause into plain English — explaining what the clause means for you in practice, not just what it says.",
      },
      {
        question: 'Is it too late to review my lease after signing?',
        answer:
          "No. Reviewing a signed lease helps you understand your rights for the rest of the tenancy, especially before a move-out, dispute, or renewal decision.",
      },
    ],
    relatedPages: [
      { href: '/lease-agreement-analyzer', anchor: 'use the lease agreement analyzer' },
      { href: '/security-deposit-clause-checker', anchor: 'check your security deposit clause' },
      { href: '/lease-red-flags-before-signing', anchor: 'common lease red flags' },
    ],
    ctaPrimary: 'Review My Rental Lease',
    ctaSecondary: 'See the Full Checklist',
    ctaMicrocopy: 'AI-powered · $19 · Takes 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Tenant rights and lease standards vary by state and locality.',
  },

  // ── 11 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'non-compete-agreement-review',
    primaryKeyword: 'non-compete agreement review',
    secondaryKeywords: [
      'review non-compete clause',
      'non-compete enforceability checker',
      'is my non-compete enforceable',
      'non-compete red flags',
      'how broad is my non-compete',
      'non-compete scope analysis',
      'non-compete agreement checker',
    ],
    intent: 'comercial',
    difficulty: 'media',
    monetization: 'alto',
    priority: 'media-alta',
    cluster: 'nda-restrictive',
    hubPage: '/nda-review',
    title: "Non-Compete Agreement Review — Understand How Far Your Restrictions Reach | Revealr",
    metaDescription:
      "Upload your non-compete agreement. Revealr checks geographic scope, duration, industry restrictions, and enforceability red flags — before you sign or leave.",
    h1: "Non-Compete Agreement Review — Understand How Far Your Non-Compete Really Reaches",
    h2s: [
      "What Makes a Non-Compete Agreement Enforceable?",
      "What Revealr Flags in Non-Compete Agreements",
      "Should You Sign a Non-Compete Without Getting It Reviewed?",
    ],
    intro:
      "Non-compete agreements can follow you for years after you leave a job. They determine where you can work, who you can work for, and what roles you can take. The scope — geography, industry definition, duration — determines how restrictive it actually is in practice. Revealr reads your non-compete and flags what is aggressive, what is standard, and what is potentially unenforceable.",
    checksTitle: 'What Revealr checks in non-compete agreements',
    checks: [
      { title: 'Geographic scope', description: 'Whether restrictions are local, regional, national, or global' },
      { title: 'Duration', description: '6 months to 2+ years — courts view longer terms with skepticism' },
      { title: 'Industry and role breadth', description: 'How broadly "competing business" is defined' },
      { title: 'Consideration for signing', description: 'Whether you received anything of value in exchange for the restriction' },
      { title: 'Garden leave provisions', description: 'Whether you are compensated during the restriction period' },
    ],
    sampleDocumentLabel: 'Non-Compete Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§4.1',
        title: 'Overbroad Restricted Territory',
        body: "This non-compete applies to any geographic region where the company conducts or plans to conduct business — effectively making it national or global in scope. Courts in most states would view this as overbroad. Request a specific state or regional limitation.",
      },
      {
        severity: 'WARNING',
        section: '§4.3',
        title: '24-Month Restriction Period — Above Standard',
        body: "This non-compete restricts you for 24 months after leaving the company. Courts in most states view 6–12 months as the enforceable standard. A 24-month restriction, particularly combined with the broad geographic scope, may be difficult to enforce in full — but challenging it requires legal action and creates uncertainty during your job search.",
        action: 'Request a reduction to 12 months, which is more defensible and reflects the typical industry standard.',
      },
    ],
    whoThisIsFor: [
      { role: 'Employees receiving a non-compete', description: "You are being asked to sign before starting a new role" },
      { role: 'Professionals considering leaving a job', description: "You want to understand what restrictions apply after you leave" },
      { role: 'Job candidates evaluating offers', description: "Your offer includes a non-compete and you want to understand it before accepting" },
    ],
    whyReviewStat:
      "An overbroad non-compete can effectively prevent you from working in your field for 1–2 years. Understanding its scope before signing determines whether you have room to negotiate or need to walk away.",
    faqs: [
      {
        question: 'Are non-compete agreements enforceable?',
        answer:
          "It depends heavily on the state. California does not enforce non-competes at all. Most other states enforce them if they are reasonable in scope, duration, and geography. Revealr flags red flags and notes relevant enforceability context.",
      },
      {
        question: 'What is a reasonable non-compete duration?',
        answer:
          "Courts generally view 6–12 months as reasonable. 2+ years is increasingly hard to defend. Revealr flags unusually long durations.",
      },
      {
        question: 'What if my non-compete covers the entire country?',
        answer:
          "Nationwide non-competes are generally disfavored by courts unless the business has a genuine national presence and the employee had senior access to national operations.",
      },
      {
        question: 'What is garden leave?',
        answer:
          "A provision where you are paid during your non-compete period but not required to work. Revealr notes whether your non-compete includes compensation for the restriction period.",
      },
      {
        question: 'Can I negotiate a non-compete before signing?',
        answer:
          "Yes. Geographic scope, duration, and the definition of 'competing business' are all negotiable. Many employers expect candidates to push back on aggressive terms.",
      },
    ],
    relatedPages: [
      { href: '/nda-review', anchor: 'review the NDA that came with your non-compete' },
      { href: '/employment-contract-review', anchor: 'review your full employment contract' },
      { href: '/ip-assignment-agreement-review', anchor: 'check your IP assignment too' },
      { href: '/blog/non-compete-clause-explained', anchor: 'guide: non-compete clauses explained' },
    ],
    ctaPrimary: 'Review My Non-Compete Agreement',
    ctaSecondary: 'See a Sample Non-Compete Analysis',
    ctaMicrocopy: '$19 · Instant · Know what you are restricted from doing',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Non-compete enforceability varies significantly by state. Consult an employment attorney for high-stakes situations.',
  },

  // ── 12 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'freelance-contract-review',
    primaryKeyword: 'freelance contract review',
    secondaryKeywords: [
      'review freelance agreement',
      'freelance contract red flags',
      'freelance contract checklist',
      'freelance contract clause checker',
      'protect yourself as a freelancer',
      'freelance agreement review online',
      'freelance contract IP clause',
    ],
    intent: 'comercial',
    difficulty: 'baja-media',
    monetization: 'alto',
    priority: 'media-alta',
    cluster: 'service-freelance',
    hubPage: '/freelance-contract-review',
    title: "Freelance Contract Review — Protect Your Work and Get Paid What You're Owed",
    metaDescription:
      "Upload your freelance contract. Revealr flags IP ownership traps, payment issues, unlimited revision clauses, and kill fee language — before you start work.",
    h1: "Freelance Contract Review — Protect Your Work Before the Project Starts",
    h2s: [
      "What Should Every Freelance Contract Include?",
      "Clauses That Cost Freelancers the Most",
      "How Revealr Protects Freelancers Before They Start Work",
    ],
    intro:
      "Freelance contracts are written by clients — which means they are written to protect the client. IP ownership that strips you of your work, payment terms with no late fees, kill fees that leave you with nothing, and revision clauses with no limits are all standard in client-drafted agreements. Revealr reads your freelance contract and surfaces the clauses that most commonly disadvantage the freelancer, so you can push back before you start the work.",
    checksTitle: 'What Revealr checks in freelance contracts',
    checks: [
      { title: 'IP ownership and work-for-hire', description: 'Who owns the work — including rejected concepts and preliminary drafts' },
      { title: 'Payment terms and late fees', description: 'When you get paid, how, and whether late fees protect you' },
      { title: 'Kill fee and cancellation terms', description: 'What you receive if the client cancels mid-project' },
      { title: 'Revision clauses', description: 'Whether revisions are limited or can continue indefinitely' },
      { title: 'Non-solicitation of clients', description: 'Whether the contract restricts your other client relationships' },
    ],
    sampleDocumentLabel: 'Freelance Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§6.1',
        title: 'Overbroad Intellectual Property Assignment',
        body: "All work product created under this agreement, including preliminary and rejected concepts, is assigned to the client as work-for-hire. This clause transfers even work created before this contract on related topics. Add a carve-out for pre-existing materials and rejected concepts.",
      },
      {
        severity: 'WARNING',
        section: '§4.2',
        title: 'No Kill Fee Provision',
        body: "This contract does not include a kill fee or cancellation compensation clause. If the client cancels the project after you have begun work, you have no contractual right to payment. Add a kill fee of 25–50% of the project value.",
      },
    ],
    whoThisIsFor: [
      { role: 'Freelancers reviewing a client contract', description: "The client sent you an agreement and you want to check it before signing" },
      { role: 'Designers, writers, and developers', description: "Your work is valuable and you want to make sure you retain the rights you should" },
      { role: 'New freelancers', description: "This is your first freelance contract and you want to understand what is standard" },
    ],
    whyReviewStat:
      "Most freelance contract disputes involve one of four issues: unpaid invoices, IP ownership conflicts, scope creep, or cancelled projects with no compensation. All four are preventable with a thorough contract review before work begins.",
    faqs: [
      {
        question: 'Who owns the work I create as a freelancer?',
        answer:
          "By default, as an independent contractor, you retain copyright in your work unless you assign it in writing. Many freelance contracts include work-for-hire language or IP assignment clauses that transfer all rights to the client. Revealr flags when this is overly broad.",
      },
      {
        question: 'What is a kill fee in a freelance contract?',
        answer:
          "A kill fee is compensation paid if the client cancels the project after work has begun. Many freelance contracts do not include one, leaving you uncompensated for work already done. Revealr flags missing or inadequate kill fee provisions.",
      },
      {
        question: 'What does "unlimited revisions" mean in a contract?',
        answer:
          "It means the client can request changes indefinitely at no extra charge. This is one of the most common ways freelancers lose money. Revealr flags open-ended revision clauses.",
      },
      {
        question: 'What payment terms are standard for freelance contracts?',
        answer:
          "Net-30 is common, but net-15 or 50% upfront / 50% on delivery is preferable. Revealr flags contracts with no payment timeline, no late fee provision, or payment only upon client approval.",
      },
      {
        question: 'Can a freelance contract prevent me from working with other clients?',
        answer:
          "Only if it includes an exclusivity or non-solicitation clause. Revealr flags exclusivity provisions and non-solicitation of clients or employees.",
      },
    ],
    relatedPages: [
      { href: '/service-agreement-review', anchor: 'review your service agreement' },
      { href: '/independent-contractor-agreement-review', anchor: 'contractor agreement review' },
      { href: '/consulting-agreement-review', anchor: 'consulting agreement review' },
      { href: '/blog/freelance-contract-mistakes', anchor: 'guide: freelance contract mistakes to avoid' },
      { href: '/blog/consulting-agreement-red-flags', anchor: 'guide: consulting agreement red flags' },
    ],
    ctaPrimary: 'Review My Freelance Contract',
    ctaSecondary: 'See a Sample Freelance Analysis',
    ctaMicrocopy: 'Protect your work and your income · $19 · Instant',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Freelance contract law varies by jurisdiction. For significant project values or IP disputes, consult a contracts attorney.',
  },

  // ── 13 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'service-agreement-review',
    primaryKeyword: 'service agreement review',
    secondaryKeywords: [
      'review service contract online',
      'service agreement red flags',
      'service contract clause checker',
      'service agreement termination clause',
      'scope of work in service contract',
      'liability clause in service agreement',
      'service agreement checklist',
    ],
    intent: 'comercial',
    difficulty: 'media',
    monetization: 'medio-alto',
    priority: 'media-alta',
    cluster: 'service-freelance',
    hubPage: '/freelance-contract-review',
    title: "Service Agreement Review — Know What You're Committing to Before You Start | Revealr",
    metaDescription:
      "Upload your service agreement and let Revealr flag scope creep risks, liability exposure, auto-renewal traps, and payment terms that favor the other side.",
    h1: "Service Agreement Review — Know Your Rights and Obligations Before You Start",
    h2s: [
      "What Does a Service Agreement Actually Obligate You To?",
      "Clauses Revealr Flags in Service Agreements",
      "What to Negotiate in a Service Agreement Before Signing",
    ],
    intro:
      "Service agreements define the entire commercial relationship: what you will deliver, what you will be paid, what happens if something goes wrong, and how the relationship ends. A vague scope of work clause, an aggressive liability provision, or a one-sided termination right can cost you months of unpaid work or expose you to claims you did not anticipate.",
    checksTitle: 'What Revealr checks in service agreements',
    checks: [
      { title: 'Scope of work definitions', description: 'Vague language that enables scope creep and unlimited obligations' },
      { title: 'Liability and indemnification', description: 'One-sided indemnification clauses that transfer all risk to you' },
      { title: 'Payment terms and late fees', description: 'When payment is due and whether late delivery has consequences' },
      { title: 'Termination without cause', description: 'Whether the other party can exit with no compensation for work in progress' },
      { title: 'Auto-renewal provisions', description: 'Short notice windows that lock you into another term automatically' },
    ],
    sampleDocumentLabel: 'Service Agreement',
    sampleFlags: [
      {
        severity: 'WARNING',
        section: '§8.3',
        title: 'Asymmetric Termination for Convenience',
        body: "The client may terminate this agreement at any time with 7 days written notice, with no obligation to pay for work in progress or future contracted periods. You have no equivalent right to exit. This is significantly asymmetric and should be made mutual.",
      },
      {
        severity: 'WARNING',
        section: '§2.1',
        title: 'Scope of Work Defined by Reference to Proposal — Version Unspecified',
        body: "Your service obligations are defined by reference to an attached 'proposal document,' without specifying which version applies or what governs in case of conflict between the proposal and this agreement. Vague scope definitions are the primary enabler of scope creep — the client can point to any proposal version to justify expanded work.",
        action: 'Attach the specific agreed proposal as Exhibit A and add language stating that in case of conflict, this agreement controls.',
      },
    ],
    whoThisIsFor: [
      { role: 'Service providers and agencies', description: "You provide services under a formal agreement and want to check the terms" },
      { role: 'Small business owners', description: "You are entering a service contract with a client or vendor" },
      { role: 'Professionals signing vendor agreements', description: "You are on the receiving end of a service contract written by the other party" },
    ],
    whyReviewStat:
      "Scope creep, payment disputes, and unexpected liability claims are the three most common causes of service agreement conflicts. All three are traceable to specific contract clauses that were vague, one-sided, or missing entirely.",
    faqs: [
      {
        question: 'What should every service agreement include?',
        answer:
          "A precise scope of work, payment terms with milestones or due dates, a liability cap, termination rights for both parties, IP ownership provisions, and a dispute resolution process.",
      },
      {
        question: 'What is scope creep and how does a contract cause it?',
        answer:
          "Scope creep happens when deliverables expand beyond what was agreed. Vague scope of work definitions invite this. Revealr flags open-ended scope language.",
      },
      {
        question: 'What is an indemnification clause in a service agreement?',
        answer:
          "A clause where one party agrees to cover the other's losses in certain situations. One-sided indemnification clauses are a significant risk. Revealr flags asymmetric indemnification.",
      },
      {
        question: 'Can a service agreement terminate me without cause?',
        answer:
          "Many service agreements include a termination-for-convenience clause. If this exists for the other party but not for you, it is worth flagging.",
      },
      {
        question: 'What is an auto-renewal clause in a service agreement?',
        answer:
          "A provision that automatically renews the contract for another period unless you give advance notice of cancellation. Missing the notice window locks you in. Revealr flags auto-renewals with short or unclear notice windows.",
      },
    ],
    relatedPages: [
      { href: '/freelance-contract-review', anchor: 'review your freelance contract' },
      { href: '/consulting-agreement-review', anchor: 'consulting-specific agreement review' },
      { href: '/termination-clause-review', anchor: 'check the termination clause in detail' },
      { href: '/blog/service-agreement-vs-employment-contract', anchor: 'guide: service agreement vs employment contract' },
    ],
    ctaPrimary: 'Review My Service Agreement',
    ctaSecondary: 'See a Sample Service Agreement Analysis',
    ctaMicrocopy: '$19 · Works for any service contract type · 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Service agreement law varies by jurisdiction and industry. Consult a contracts attorney for high-value engagements.',
  },

  // ── 14 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'independent-contractor-agreement-review',
    primaryKeyword: 'independent contractor agreement review',
    secondaryKeywords: [
      '1099 contractor contract review',
      'IC agreement red flags',
      'contractor agreement clause checker',
      'independent contractor vs employee contract',
      'contractor agreement IP clause',
      'misclassification risk in contractor agreement',
      'review 1099 contract online',
    ],
    intent: 'comercial',
    difficulty: 'media',
    monetization: 'medio-alto',
    priority: 'media-alta',
    cluster: 'service-freelance',
    hubPage: '/freelance-contract-review',
    title: "Independent Contractor Agreement Review — Understand Your Rights as a Contractor | Revealr",
    metaDescription:
      "Upload your IC agreement. Revealr checks for misclassification risks, IP ownership, exclusivity, payment terms, and exit rights — before you start working.",
    h1: "Independent Contractor Agreement Review — Understand What You're Agreeing to as a Contractor",
    h2s: [
      "What Makes an Independent Contractor Agreement Different?",
      "What Revealr Checks in IC Agreements",
      "Why Contractor Agreements Are More Complex Than They Look",
    ],
    intro:
      "Independent contractor agreements look simple but carry significant legal complexity. Misclassification risk, overbroad IP clauses, hidden exclusivity requirements, and one-sided exit rights are common problems that Revealr surfaces before you start work and before they become disputes.",
    checksTitle: 'What Revealr checks in contractor agreements',
    checks: [
      { title: 'Misclassification risk indicators', description: 'Clauses that look more like employment than contracting' },
      { title: 'IP ownership and work-for-hire', description: 'What you create and who owns it in the contractor context' },
      { title: 'Exclusivity provisions', description: 'Whether you are restricted from working with other clients' },
      { title: 'Payment structure and dispute terms', description: 'Net terms, late fees, and invoice acceptance procedures' },
      { title: 'Termination and project exit', description: 'Notice periods, kill fees, and early exit consequences' },
    ],
    sampleDocumentLabel: 'Independent Contractor Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§5.4',
        title: 'Exclusivity Plus Set Hours — Misclassification Risk',
        body: "This agreement prohibits you from performing services for any other client in the same industry sector without written approval. Combined with §2.1 (required availability during business hours), this raises potential employee misclassification risk under IRS guidelines.",
      },
      {
        severity: 'WARNING',
        section: '§6.2',
        title: 'Payment Conditional on Client Approval — No Dispute Process',
        body: "Payment is due within 30 days of the client's approval of deliverables. This agreement does not define what 'approval' means, what happens if the client does not respond, or what dispute process applies if payment is withheld. Without a defined approval mechanism, your invoice timeline is effectively at the client's discretion.",
        action: 'Request a deemed-approval clause: if the client does not approve or raise objections within 7 business days of delivery, the work is considered accepted and payment becomes due.',
      },
    ],
    whoThisIsFor: [
      { role: '1099 contractors', description: "You work as an independent contractor and want to review your agreement" },
      { role: 'Professionals transitioning from employment to contracting', description: "You want to understand the differences and risks" },
      { role: 'Contractors working with larger companies', description: "The company has a legal team and you want to be on equal footing" },
    ],
    whyReviewStat:
      "Independent contractor agreements are increasingly used by companies to avoid employment obligations. The risk is not just legal — misclassification can result in back taxes and loss of contractor status.",
    faqs: [
      {
        question: 'What is employee misclassification risk in a contractor agreement?',
        answer:
          "If a contractor agreement contains terms that look more like employment (set hours, required tools, single-client exclusivity), the IRS and state agencies may reclassify you as an employee — with tax implications for both parties.",
      },
      {
        question: 'Does an IC agreement give the company ownership of my work?',
        answer:
          "Only if it includes a work-for-hire or IP assignment clause. These are common in IC agreements and can be very broad. Revealr identifies the scope of IP transfer.",
      },
      {
        question: 'Can I work for other clients under an IC agreement?',
        answer:
          "Only if the agreement allows it. Exclusivity clauses in contractor agreements are more common than many contractors realize. Revealr flags these provisions.",
      },
      {
        question: 'What payment terms are standard in IC agreements?',
        answer:
          "Net-30 to Net-45 is common. Many IC agreements lack late payment penalties or clear invoice acceptance procedures. Revealr flags payment terms that leave you exposed.",
      },
      {
        question: 'What happens if the company terminates my contract early?',
        answer:
          "Depends on the termination clause. Some provide notice and kill fees; others allow immediate termination with no further obligation. Revealr shows you which you are signing.",
      },
    ],
    relatedPages: [
      { href: '/freelance-contract-review', anchor: 'also applies to freelance contracts' },
      { href: '/ip-assignment-agreement-review', anchor: 'understand the IP assignment in your agreement' },
      { href: '/non-compete-agreement-review', anchor: 'check any non-compete provisions' },
      { href: '/blog/independent-contractor-misclassification', anchor: 'guide: independent contractor misclassification risks' },
    ],
    ctaPrimary: 'Review My Contractor Agreement',
    ctaSecondary: 'See a Sample IC Agreement Analysis',
    ctaMicrocopy: '$19 · For 1099 contractors and IC professionals · 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Independent contractor classification is a complex legal and tax issue. Consult a tax or employment attorney for specific guidance.',
  },

  // ── 15 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'ip-assignment-agreement-review',
    primaryKeyword: 'ip assignment agreement review',
    secondaryKeywords: [
      'intellectual property assignment clause review',
      'ip rights in employment contract',
      'who owns my work contract',
      'check ip assignment clause',
      'ip assignment red flags',
      'work-for-hire clause checker',
      'side project ip clause review',
    ],
    intent: 'problem-aware',
    difficulty: 'baja-media',
    monetization: 'medio-alto',
    priority: 'media-alta',
    cluster: 'nda-restrictive',
    hubPage: '/nda-review',
    title: "IP Assignment Agreement Review — Know What Intellectual Property You're Giving Away | Revealr",
    metaDescription:
      "Upload your IP assignment agreement. Revealr checks if you're signing away more than intended — including side projects, future inventions, and prior work.",
    h1: "IP Assignment Agreement Review — Make Sure You're Not Giving Away More Than You Think",
    h2s: [
      "What Does an IP Assignment Agreement Actually Transfer?",
      "What Revealr Looks for in IP Assignment Clauses",
      "When IP Assignment Language Crosses the Line",
    ],
    intro:
      "Most IP assignment clauses in employment and contractor agreements are broader than people realize. They often cover work created outside company hours, on personal equipment, and only tangentially related to the company's business. Revealr reads your IP assignment language and tells you exactly what you are transferring — including whether it could affect your personal projects, startup ideas, or creative work.",
    checksTitle: 'What Revealr checks in IP assignment agreements',
    checks: [
      { title: 'Pre-existing IP coverage', description: 'Whether the clause captures work you created before the agreement' },
      { title: 'Work-for-hire vs assignment distinction', description: 'Different legal implications with similar practical outcomes' },
      { title: 'Side projects and personal work', description: 'Whether your after-hours work is covered by the clause' },
      { title: 'IP carve-outs', description: 'Whether prior work and personal projects are explicitly excluded' },
      { title: 'Irrevocability and compensation', description: 'Whether you are compensated for the transfer and whether it can be undone' },
    ],
    sampleDocumentLabel: 'IP Assignment Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§3.2',
        title: 'Overbroad Pre-Invention Assignment',
        body: "This clause assigns to the company all inventions, works, and developments conceived by you during the employment period that 'relate to or are useful in connection with the company's current or reasonably anticipated business.' This language is broad enough to potentially cover work you create on weekends using personal equipment.",
      },
      {
        severity: 'WARNING',
        section: '§3.5',
        title: 'No Carve-Out for Pre-Existing Personal Projects',
        body: "This agreement does not include a schedule or exhibit listing pre-existing IP you wish to retain. Without an explicit exclusion, prior work that 'relates to' the company's business could be captured by the assignment clause in §3.2. Documenting your pre-existing work before signing is the most reliable way to protect it.",
        action: 'Before signing, prepare a written list of personal projects, side work, or prior IP you want to retain. Ask to attach it as Exhibit A with language stating those items are excluded from the assignment.',
      },
    ],
    whoThisIsFor: [
      { role: 'Employees reviewing their employment contract', description: "You want to know whether your side projects or personal work are at risk" },
      { role: 'Contractors signing agreements with IP clauses', description: "You create work and want to understand what you retain" },
      { role: 'Founders and entrepreneurs', description: "You are about to sign something and want to protect your pre-existing IP" },
    ],
    whyReviewStat:
      "IP assignment clauses have been the source of some of the most significant employment disputes — including employees who unknowingly assigned ownership of work that later became valuable personal projects or companies.",
    faqs: [
      {
        question: 'Does my employer own everything I create while I work for them?',
        answer:
          "Only if you have an IP assignment or work-for-hire clause that says so. Even then, some states restrict employer IP assignment for work created on personal time without company resources.",
      },
      {
        question: 'What is a pre-invention assignment clause?',
        answer:
          "A clause that assigns to your employer any inventions you conceive during your employment that relate to the company's business. Many employees do not realize this can cover ideas they had before starting.",
      },
      {
        question: "What's the difference between work-for-hire and IP assignment?",
        answer:
          "Work-for-hire means the company is legally the original author. IP assignment means you created it and then transferred the rights. Both achieve similar outcomes but have different legal implications.",
      },
      {
        question: 'Can I protect my side projects before signing?',
        answer:
          "Yes. Documenting and disclosing your pre-existing work before signing can establish what is excluded. Revealr recommends what to negotiate and document before signing an IP-heavy agreement.",
      },
      {
        question: 'What is an IP carve-out?',
        answer:
          "Language that explicitly excludes certain work from the IP assignment — typically personal projects created outside work hours without company resources. Revealr flags agreements that lack these carve-outs.",
      },
    ],
    relatedPages: [
      { href: '/nda-review', anchor: 'review the NDA attached to your IP agreement' },
      { href: '/employment-contract-review', anchor: 'review your full employment contract' },
      { href: '/independent-contractor-agreement-review', anchor: 'IP assignment in contractor agreements' },
    ],
    ctaPrimary: 'Review My IP Assignment Agreement',
    ctaSecondary: 'Check the IP Clause in My Employment Contract',
    ctaMicrocopy: 'Know what you own and what you have transferred · $19',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. IP assignment law varies by state and jurisdiction. For significant IP assets, consult an intellectual property attorney.',
  },

  // ── 16 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'consulting-agreement-review',
    primaryKeyword: 'consulting agreement review',
    secondaryKeywords: [
      'consulting contract review online',
      'consulting agreement red flags',
      'consulting contract clause checker',
      'consulting agreement IP clause',
      'consulting deliverables clause',
      'consulting agreement payment terms',
      'review consulting contract before signing',
    ],
    intent: 'comercial',
    difficulty: 'media',
    monetization: 'medio-alto',
    priority: 'media',
    cluster: 'service-freelance',
    hubPage: '/freelance-contract-review',
    title: "Consulting Agreement Review — Protect Your Work, IP, and Fees as a Consultant | Revealr",
    metaDescription:
      "Upload your consulting agreement and let Revealr check deliverable definitions, IP ownership, payment terms, exclusivity, and exit rights before you sign.",
    h1: "Consulting Agreement Review — Check What You're Committing to as a Consultant",
    h2s: [
      "What Should a Consulting Agreement Include?",
      "What Revealr Flags in Consulting Agreements",
      "Clauses Consultants Miss That Cost Them Later",
    ],
    intro:
      "Consulting agreements are written by clients and tend to be vague where vagueness benefits them. Acceptance criteria that the client alone controls, IP clauses that capture your methodology and frameworks, non-solicitation provisions that block you from serving similar clients — these are the provisions that experienced consultants know to flag. Revealr gives you the same analysis in 60 seconds.",
    checksTitle: 'What Revealr checks in consulting agreements',
    checks: [
      { title: 'Deliverables and acceptance criteria', description: 'Whether acceptance is objective or at client sole discretion' },
      { title: 'IP ownership of methodology', description: 'Whether your frameworks and processes are transferred to the client' },
      { title: 'Confidentiality and non-compete scope', description: 'How long and how broadly restrictions apply after the engagement' },
      { title: 'Payment and invoice terms', description: 'When you get paid and what triggers the payment obligation' },
      { title: 'Exclusivity and non-solicitation', description: 'Whether you can serve competing or similar clients' },
    ],
    sampleDocumentLabel: 'Consulting Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§7.1',
        title: 'IP Assignment Covers Consulting Methodology',
        body: "This agreement assigns to the client all work product 'and related materials, processes, and methodologies developed or used in connection with this engagement.' This language is broad enough to capture your consulting frameworks, templates, and processes — not just the deliverables specific to this project. If these are core to your practice, this clause could restrict how you serve future clients.",
        action: 'Request that the IP assignment be limited to deliverables created specifically for this client, with an explicit carve-out for pre-existing methodologies and frameworks.',
      },
      {
        severity: 'WARNING',
        section: '§4.2',
        title: 'Subjective Deliverable Acceptance',
        body: "Acceptance of all deliverables is subject to the client's sole and exclusive satisfaction. This language gives the client complete discretion to reject work and withhold payment. Request objective acceptance criteria and a defined review period.",
      },
    ],
    whoThisIsFor: [
      { role: 'Independent consultants', description: "You work on project-based engagements and need to review client contracts" },
      { role: 'Management and strategy consultants', description: "Your agreements involve complex deliverables and IP questions" },
      { role: 'Consulting firms reviewing client MSAs', description: "You want a quick first-pass on a new master service agreement" },
    ],
    whyReviewStat:
      "The most expensive consulting disputes involve deliverable rejection, IP ownership over frameworks, and post-engagement non-solicitation enforcement. All three start with contract language that was not reviewed before signing.",
    faqs: [
      {
        question: 'Who owns my consulting methodology if the contract includes an IP clause?',
        answer:
          "Broad IP assignment clauses may attempt to capture your frameworks, templates, and processes — not just the work product delivered to the client. Revealr distinguishes between assignment of deliverables vs proprietary methods.",
      },
      {
        question: 'What is an acceptance clause and why does it matter?',
        answer:
          "An acceptance clause defines when a deliverable is considered complete and triggers payment. If acceptance is at the sole discretion of the client, payment can be withheld indefinitely. Revealr flags this.",
      },
      {
        question: 'Can a consulting agreement prevent me from working with other clients?',
        answer:
          "Yes, through exclusivity or non-solicitation clauses. Revealr identifies how broad these restrictions are and whether they are standard for your type of engagement.",
      },
      {
        question: 'What payment terms should I expect in a consulting agreement?',
        answer:
          "Milestone-based payments or monthly retainers with net-30 are standard. Performance-only payment significantly increases your financial risk. Revealr flags payment structures that leave you exposed.",
      },
      {
        question: 'What happens if the consulting engagement is cancelled mid-project?',
        answer:
          "Depends entirely on the termination clause. Revealr checks whether you are protected by a kill fee, notice period, or payment for work in progress.",
      },
    ],
    relatedPages: [
      { href: '/service-agreement-review', anchor: 'also review your service agreement' },
      { href: '/ip-assignment-agreement-review', anchor: 'check how the IP clause affects your methodology' },
      { href: '/non-compete-agreement-review', anchor: 'review any non-compete in the agreement' },
      { href: '/blog/consulting-agreement-red-flags', anchor: 'guide: consulting agreement red flags' },
    ],
    ctaPrimary: 'Review My Consulting Agreement',
    ctaSecondary: 'See a Sample Consulting Agreement Analysis',
    ctaMicrocopy: 'For independent consultants and consulting firms · $19 · 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Consulting agreement law varies by jurisdiction. For high-value engagements, consult a contracts attorney.',
  },

  // ── 17 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'landlord-entry-notice-clause',
    primaryKeyword: 'landlord entry notice clause',
    secondaryKeywords: [
      'landlord right to entry in lease',
      'landlord can enter without notice',
      'illegal landlord entry clause',
      'minimum notice for landlord entry',
      'landlord inspection notice clause',
      'tenant rights landlord entry',
      'check landlord entry clause',
    ],
    intent: 'problem-aware',
    difficulty: 'baja-media',
    monetization: 'medio',
    priority: 'media',
    cluster: 'lease-rental',
    hubPage: '/lease-agreement-analyzer',
    title: "Landlord Entry Notice Clause — What Your Lease Must Say to Be Legal | Revealr",
    metaDescription:
      "Most states require 24–48 hours notice before landlord entry. Revealr checks your lease and flags insufficient notice and overbroad inspection rights.",
    h1: "Landlord Entry Notice Clause — What Your Lease Must Say to Be Legal",
    h2s: [
      "What the Law Actually Requires for Landlord Entry",
      "Entry Clauses Revealr Flags as Problematic",
      "How to Negotiate a Stronger Entry Rights Clause Before You Sign",
    ],
    intro:
      "Most U.S. states require landlords to provide at least 24 hours written notice before entering a rental unit — except in genuine emergencies. Yet many leases include entry clauses that quietly shrink this window to a few hours, allow verbal notice only, define 'emergency' broadly enough to cover routine inspections, or grant landlords unrestricted access rights. These clauses often go unread until there is already a conflict. Revealr reads your entry clause and tells you whether it meets legal minimums before you sign.",
    checksTitle: 'What Revealr checks in landlord entry clauses',
    checks: [
      { title: 'Notice period vs legal minimum', description: 'Whether the clause meets the 24–48 hour written notice standard required in most states' },
      { title: 'Written vs verbal notice', description: 'Verbal-only notice requirements are typically below the legal minimum and harder to document' },
      { title: 'Emergency entry definition', description: 'Whether "emergency" is defined narrowly or applied broadly enough to cover routine access' },
      { title: 'Entry hours and permitted frequency', description: 'Clauses permitting entry at any hour or more than once per month for routine inspections' },
      { title: 'Inspection scope and purpose', description: 'Whether inspections require advance notice and a stated reason, or grant open-ended access' },
      { title: 'Right to quiet enjoyment', description: 'Whether entry provisions conflict with your statutory right to undisturbed occupancy' },
    ],
    sampleDocumentLabel: 'Lease Entry Clause',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§7.3',
        title: 'Entry Notice Below Legal Minimum — Verbal Only',
        body: "This clause permits the landlord to enter the premises upon 4 hours verbal notice for any reason, including periodic inspection. Most states require a minimum of 24 hours written notice. Verbal notice is also harder to document if a dispute arises. This clause is likely below the legal standard and conflicts with your right to quiet enjoyment.",
        action: 'Request 24-hour written (or email) notice as a condition for any non-emergency entry, and ask that emergency entry be defined specifically.',
      },
      {
        severity: 'WARNING',
        section: '§7.5',
        title: 'Routine Inspections — No Frequency Limit',
        body: "This clause permits the landlord to conduct routine inspections at any time with advance notice, with no limit on frequency. While periodic inspections are normal, an unlimited right to inspect can effectively override your right to quiet enjoyment if exercised frequently.",
        action: 'Request a cap of one routine inspection per quarter and require that the purpose of each inspection be stated in the notice.',
      },
    ],
    whoThisIsFor: [
      { role: 'Tenants reviewing a new lease', description: "You want to check your privacy rights before signing" },
      { role: 'Renters who have had landlord access issues before', description: "You want to make sure the terms are clear and legal" },
      { role: 'Anyone concerned about their right to privacy at home', description: "You want to know what your landlord is actually allowed to do" },
    ],
    whyReviewStat:
      "Landlord entry disputes are the second most common landlord-tenant conflict after security deposit issues. Most start with an entry clause that the tenant did not read before signing.",
    faqs: [
      {
        question: 'How much notice does a landlord legally have to give before entering?',
        answer:
          "In most U.S. states, 24 hours written notice is the minimum. Some states require 48 hours. Revealr checks your lease clause and flags notice periods that are below the legal minimum.",
      },
      {
        question: 'Can a landlord enter without any notice in an emergency?',
        answer:
          "Yes. Emergency entry is generally permitted without notice. But emergency must be genuine — not a lease clause that redefines it to include routine inspections.",
      },
      {
        question: 'What is the right to quiet enjoyment?',
        answer:
          "A tenant's legal right to use their home without unreasonable interference from the landlord. Excessive entry rights in a lease can violate this right.",
      },
      {
        question: 'Can I negotiate the landlord entry clause?',
        answer:
          "Yes. Asking for 48-hour written notice and restricting entry to business hours are both reasonable requests that responsible landlords typically agree to.",
      },
      {
        question: 'My lease says the landlord can enter at any time for inspections. Is that legal?',
        answer:
          "In most states, no. A clause allowing unrestricted entry without notice is likely unenforceable — but you may still end up in a dispute. Revealr flags this language.",
      },
    ],
    relatedPages: [
      { href: '/lease-agreement-analyzer', anchor: 'analyze your full lease' },
      { href: '/lease-red-flags-before-signing', anchor: 'other lease red flags to watch for' },
      { href: '/maintenance-responsibility-in-lease', anchor: 'check maintenance and repair terms too' },
    ],
    ctaPrimary: 'Check My Landlord Entry Clause',
    ctaSecondary: 'Analyze My Full Lease',
    ctaMicrocopy: '$19 · Instant · Know your rights before you sign',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Landlord entry notice requirements vary by state. Consult a tenant rights organization for specific guidance.',
  },

  // ── 18 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'maintenance-responsibility-in-lease',
    primaryKeyword: 'maintenance responsibility in lease',
    secondaryKeywords: [
      'who is responsible for repairs in rental',
      'tenant vs landlord maintenance lease',
      'maintenance clause in rental agreement',
      'appliance repair responsibility lease',
      'pest control responsibility in lease',
      'maintenance obligation renter',
      'lease repair clause checker',
    ],
    intent: 'informacional-comercial',
    difficulty: 'baja-media',
    monetization: 'medio',
    priority: 'media',
    cluster: 'lease-rental',
    hubPage: '/lease-agreement-analyzer',
    title: "Maintenance Responsibility in Lease — What Your Landlord Must Fix vs What Falls on You | Revealr",
    metaDescription:
      "Who pays for repairs in your rental? Revealr flags maintenance clauses that illegally shift habitability obligations to tenants before you sign the lease.",
    h1: "Maintenance Responsibility in Lease — What Landlords Must Fix vs What Falls on You",
    h2s: [
      "The Legal Baseline: What Landlords Are Always Responsible For",
      "Lease Clauses That Illegally Shift Maintenance Obligations to Tenants",
      "How to Read Your Maintenance Clause Before Signing",
    ],
    intro:
      "In every U.S. state, landlords are legally required to maintain habitable conditions — working heat, plumbing, structural integrity, pest control. These obligations cannot be waived by a lease clause. But many leases include maintenance provisions that blur this line: requiring tenants to handle HVAC servicing, appliance repairs, or even minor structural issues up to a dollar threshold. Revealr reads your maintenance clause against state habitability standards and flags where your lease pushes beyond what is legally enforceable.",
    checksTitle: 'What Revealr checks in lease maintenance clauses',
    checks: [
      { title: 'Blanket tenant repair obligations', description: '"Tenant responsible for all repairs and maintenance" — likely partially unenforceable' },
      { title: 'Dollar-threshold maintenance splits', description: 'Clauses making tenants pay for repairs under $X, which often capture habitability systems' },
      { title: 'Appliance maintenance and replacement', description: 'Who is responsible for servicing or replacing appliances that came with the unit' },
      { title: 'HVAC, plumbing, and heating systems', description: 'Major habitability systems that remain landlord responsibility regardless of lease language' },
      { title: 'Pest control responsibility', description: 'Pest infestations are a habitability issue — landlords cannot shift this to tenants' },
      { title: 'Normal wear vs tenant damage', description: 'Vague language that blurs the distinction in the landlord\'s favor at move-out' },
    ],
    sampleDocumentLabel: 'Lease Maintenance Clause',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§9.1',
        title: 'Tenant Responsible for "All Repairs and Maintenance"',
        body: "This clause requires the tenant to 'maintain the premises in good repair and be responsible for all repairs and maintenance during the tenancy.' A blanket tenant repair obligation of this scope is at least partially unenforceable: landlords cannot contractually waive their legal duty to maintain habitable conditions (working heat, plumbing, structural integrity). This clause creates a basis for the landlord to dispute responsibility for major system failures.",
        action: 'Request that the clause be limited to minor cosmetic repairs and explicitly carve out habitability-related systems (HVAC, plumbing, electrical, structural).',
      },
      {
        severity: 'WARNING',
        section: '§9.4',
        title: 'Tenant Responsible for Repairs Under $500 — Including HVAC',
        body: "This clause makes the tenant responsible for all maintenance and repairs under $500, including HVAC filter replacement and appliance servicing. While minor maintenance is reasonable for tenants to handle, HVAC systems are a habitability-related component in most states and typically remain landlord responsibility regardless of cost.",
        action: 'Request that the $500 threshold explicitly excludes HVAC maintenance, heating, and plumbing — or that those systems be listed as landlord responsibilities.',
      },
    ],
    whoThisIsFor: [
      { role: 'Tenants reviewing a new lease', description: "You want to understand who pays for what before you sign" },
      { role: 'Renters in a dispute about repairs', description: "You want to know what your lease actually says you are responsible for" },
      { role: 'First-time renters', description: "You have never rented before and want to understand standard maintenance obligations" },
    ],
    whyReviewStat:
      "Maintenance-related disputes are the leading cause of security deposit deductions. Understanding who is responsible for what before moving in can save significant money at move-out.",
    faqs: [
      {
        question: 'What is a landlord legally required to maintain?',
        answer:
          "In all U.S. states, landlords must maintain habitable conditions: working heat, plumbing, structural integrity, and protection from the elements. Any lease that waives these responsibilities is generally unenforceable.",
      },
      {
        question: 'Am I responsible for appliance repairs as a tenant?',
        answer:
          "Usually not for major appliances that came with the unit. But some leases try to shift this responsibility to tenants. Revealr flags these clauses.",
      },
      {
        question: 'Who is responsible for pest control?',
        answer:
          "Generally the landlord, as pests are considered a habitability issue. But leases often try to make tenants responsible. Revealr flags this shift.",
      },
      {
        question: 'What is "normal wear and tear" and how does it relate to maintenance?',
        answer:
          "Normal wear and tear (minor scuffs, faded paint, carpet aging) is expected and cannot be charged to tenants. Leases that blur this distinction in the landlord's favor are a red flag.",
      },
      {
        question: 'What if my lease says I am responsible for "all repairs"?',
        answer:
          "A blanket tenant responsibility for all repairs is likely at least partially unenforceable. State habitability laws override lease terms. Revealr flags this language.",
      },
    ],
    relatedPages: [
      { href: '/lease-agreement-analyzer', anchor: 'analyze your full lease' },
      { href: '/security-deposit-clause-checker', anchor: 'maintenance disputes often affect your deposit' },
      { href: '/landlord-entry-notice-clause', anchor: 'check your landlord entry rights too' },
    ],
    ctaPrimary: 'Check Maintenance Terms in My Lease',
    ctaSecondary: 'Analyze My Full Lease',
    ctaMicrocopy: 'Know before a dispute starts · $19 · 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Landlord maintenance obligations vary by state. Consult a tenant rights organization for specific guidance.',
  },

  // ── 19 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'review-contract-before-signing',
    primaryKeyword: 'review contract before signing',
    secondaryKeywords: [
      'what to check before signing a contract',
      'how to review a contract yourself',
      'contract review checklist before signing',
      'things to look for in any contract',
      'should I review a contract before signing',
      'contract review tips',
      'review legal document before signing',
    ],
    intent: 'informacional-comercial',
    difficulty: 'media',
    monetization: 'medio-alto',
    priority: 'media',
    cluster: 'contract-review',
    hubPage: '/review-contract-before-signing',
    title: "How to Review a Contract Before Signing — 6 Clauses That Always Matter | Revealr",
    metaDescription:
      "Check these 6 clauses before signing any contract. Revealr flags termination asymmetry, auto-renewals, liability shifts, and arbitration waivers in 60 seconds.",
    h1: "How to Review a Contract Before Signing — 6 Clauses That Always Matter",
    h2s: [
      "Why Every Contract Is Written Against You (Until You Read It)",
      "The 6 Clause Types That Create the Most Post-Signing Problems",
      "How to Use AI to Review Any Contract in 60 Seconds",
    ],
    intro:
      "Every contract is drafted by the other side — and every first draft protects their interests, not yours. That is not dishonest; it is just how contracts work. The question is whether you read it before signing. Most people do not. They skim the headline terms (price, dates, deliverables) and sign without reading the termination clause, the liability provision, the auto-renewal window, or the arbitration waiver that eliminates their right to sue. Revealr reads every clause and surfaces the specific language you need to negotiate before you commit.",
    checksTitle: 'The 6 clause types Revealr checks in any contract',
    checks: [
      { title: 'Termination rights and exit asymmetry', description: 'Whether you and the other party have equal or unequal exit rights under the contract' },
      { title: 'Automatic renewal provisions', description: 'Notice windows, price escalation rights, and conditions for non-renewal' },
      { title: 'Liability caps and indemnification', description: 'Who bears the financial risk when something goes wrong — and whether that risk is capped' },
      { title: 'Dispute resolution and arbitration waivers', description: 'Binding arbitration clauses and class action waivers that limit your legal options' },
      { title: 'Hidden fees, penalties, and clawbacks', description: 'Financial obligations buried in the body of the agreement that are not in the headline terms' },
      { title: 'Scope of obligations and deliverables', description: 'Vague or unlimited obligation clauses that create open-ended commitments on your side' },
    ],
    sampleDocumentLabel: 'Service Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§11',
        title: 'Asymmetric Termination Rights — You Are Locked In',
        body: "You may only terminate this agreement for material breach, with a 30-day cure period. The other party may terminate for convenience with 14 days written notice. This clause gives the other party a free exit while locking you in to a high bar for termination. If the relationship deteriorates, you bear all the exit cost.",
        action: 'Request mutual termination for convenience with a reasonable notice period (30 days) on both sides.',
      },
      {
        severity: 'WARNING',
        section: '§6',
        title: 'Auto-Renewal with 90-Day Cancellation Window',
        body: "This contract automatically renews for 12 months unless written cancellation notice is provided at least 90 days before the renewal date. A 90-day notice window is unusually long — most standard agreements use 30 days. Missing this window by even a week locks you into another year.",
        action: 'Request a 30-day cancellation notice window, or at minimum add a calendar reminder for 120 days before renewal.',
      },
      {
        severity: 'WARNING',
        section: '§14.2',
        title: 'Mandatory Arbitration — Class Action Waiver',
        body: "All disputes must be resolved through binding arbitration. You waive your right to a jury trial and your right to participate in any class action. Arbitration tends to favor the party that uses it frequently (businesses) over one-time claimants.",
        action: 'Ask if this clause is negotiable. For consumer contracts, some jurisdictions limit the enforceability of mandatory arbitration clauses.',
      },
    ],
    whoThisIsFor: [
      { role: 'Anyone about to sign any contract', description: "Lease, employment offer, NDA, service agreement, freelance contract — this checklist applies to all of them" },
      { role: 'People who have signed without reading before', description: "You want to avoid the experience of discovering a problematic clause after the fact" },
      { role: 'Business owners and freelancers', description: "You receive contracts regularly and want a fast first-pass before diving into the details" },
    ],
    whyReviewStat:
      "A single overlooked clause — an auto-renewal, a liability waiver, an arbitration requirement — can have consequences that last years and cost far more than any reasonable review would have taken.",
    faqs: [
      {
        question: 'Do I need a lawyer to review a contract before signing?',
        answer:
          "Not for every contract. For standard leases, employment offers, NDAs, and service agreements, Revealr flags the most important risks in 60 seconds. For high-stakes, complex, or high-value agreements, consulting a licensed attorney remains advisable.",
      },
      {
        question: 'What happens if I sign a contract without reviewing it?',
        answer:
          "You are legally bound to all its terms — including ones you did not understand or notice. Some clauses may be unenforceable, but challenging them requires legal action. Prevention is far cheaper than remedy.",
      },
      {
        question: 'What is the single most important clause to check in any contract?',
        answer:
          "The termination clause. It determines how difficult and expensive it is to exit the agreement if things go wrong. Check it before anything else — then look at liability, auto-renewal, and arbitration.",
      },
      {
        question: 'Can I negotiate a contract after receiving the first draft?',
        answer:
          "Almost always yes. Most first drafts are written to protect the drafter. Revealr tells you exactly which clauses to push back on and what to ask for — giving you a specific starting point for negotiation rather than a general unease.",
      },
      {
        question: 'Can I review a contract I have already signed?',
        answer:
          "Yes. Understanding an existing contract helps you know your rights and obligations — especially before a dispute, a renewal decision, or a request to exit.",
      },
    ],
    relatedPages: [
      { href: '/contract-risk-checker', anchor: 'check your contract risk score' },
      { href: '/lease-agreement-analyzer', anchor: 'analyzing a lease specifically' },
      { href: '/employment-contract-review', anchor: 'reviewing an employment contract' },
      { href: '/blog/how-to-read-a-contract-with-ai', anchor: 'guide: how to read any contract with AI' },
    ],
    ctaPrimary: 'Upload My Contract for Review',
    ctaSecondary: 'See What a Contract Review Looks Like',
    ctaMicrocopy: 'Works for any document type · $19 · 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. It is not a substitute for legal advice. Consult a licensed attorney for complex or high-stakes agreements.',
  },

  // ── 20 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'contract-risk-checker',
    primaryKeyword: 'contract risk checker',
    secondaryKeywords: [
      'contract risk assessment tool',
      'ai contract risk score',
      'check contract for risks online',
      'contract risk analysis',
      'contract red flags checker',
      'document risk analyzer',
      'contract risk rating',
    ],
    intent: 'comercial',
    difficulty: 'media-alta',
    monetization: 'medio-alto',
    priority: 'media',
    cluster: 'contract-review',
    hubPage: '/review-contract-before-signing',
    title: "Contract Risk Checker — Get a Risk Score for Any Contract in 60 Seconds | Revealr",
    metaDescription:
      "Upload any contract and Revealr gives you a 0–100 risk score, flags risky clauses by severity, and tells you what to renegotiate — instantly. $19, no subscription.",
    h1: "Contract Risk Checker — Get a Risk Score for Any Contract in 60 Seconds",
    h2s: [
      "How Does a Contract Risk Score Work?",
      "What Revealr Assesses in Your Contract Risk Report",
      "What a High-Risk Contract Score Means — and What to Do Next",
    ],
    intro:
      "Not all contract risks are equal. A Revealr risk report gives every contract a 0–100 risk score based on the severity and number of flagged clauses — CRITICAL risks score highest, WARNING moderate, INFO lowest. You get a clear visual of where your contract stands, what is driving the score, and what to do about each flag before you sign.",
    checksTitle: 'What goes into a Revealr risk score',
    checks: [
      { title: 'CRITICAL flag detection', description: 'Clauses that create serious financial or legal exposure' },
      { title: 'WARNING flag detection', description: 'Provisions that are unfavorable but not necessarily deal-breakers' },
      { title: 'INFO flag detection', description: 'Terms worth knowing about even if not immediately risky' },
      { title: 'Clause severity weighting', description: 'CRITICAL flags contribute more to the score than warnings' },
      { title: 'Risk band classification', description: 'LOW (0–30), MEDIUM (31–60), HIGH (61–100) risk bands with color coding' },
    ],
    sampleDocumentLabel: 'Contract',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§11.2',
        title: 'IP Assignment — Includes Outside Work',
        body: "All inventions created during employment are assigned to the company, including work unrelated to company business. Score impact: HIGH. Recommended action: Request a carve-out for personal projects and work created without company resources.",
      },
      {
        severity: 'WARNING',
        section: '§15.1',
        title: 'Mandatory Arbitration',
        body: "All disputes must be resolved through binding arbitration. You waive your right to a jury trial. Score impact: MEDIUM.",
      },
    ],
    whoThisIsFor: [
      { role: 'Anyone evaluating a contract before signing', description: "You want a clear, scored assessment of what you are about to agree to" },
      { role: 'Professionals who review contracts regularly', description: "You want a fast first-pass tool before diving into the details" },
      { role: 'People who want to understand risk level at a glance', description: "The risk score gives you an immediate sense of whether this contract deserves more scrutiny" },
    ],
    whyReviewStat:
      "A contract risk score gives you an objective starting point for any negotiation. Instead of guessing which clauses to push back on, you have a prioritized list — CRITICAL first, then WARNING.",
    faqs: [
      {
        question: 'How is the contract risk score calculated?',
        answer:
          "Revealr's AI evaluates each clause against known risk patterns — terms that favor one party asymmetrically, provisions that exceed legal standards, language that commonly leads to disputes. Each flag contributes to the overall 0–100 score.",
      },
      {
        question: 'What does a score above 70 mean?',
        answer:
          "A score above 70 indicates multiple significant risk factors. It does not mean you cannot sign — it means there are specific clauses worth pushing back on or understanding clearly before you do.",
      },
      {
        question: 'Can Revealr check any type of contract?',
        answer:
          "Yes. Revealr is trained on leases, employment agreements, NDAs, service agreements, contractor agreements, and more. For very specialized contracts, we flag general risk patterns but recommend specialist review.",
      },
      {
        question: 'How accurate is the risk score?',
        answer:
          "Revealr is designed to catch common and significant risks reliably. It may miss very unusual clause constructions or jurisdiction-specific nuance. The report is a first-pass analysis, not a substitute for legal advice on complex matters.",
      },
      {
        question: 'What should I do with a high-risk score?',
        answer:
          "Start with the CRITICAL flags. Use the recommended action for each one as your negotiation agenda. For very high scores or complex contracts, share the Revealr report with an attorney as briefing material.",
      },
    ],
    relatedPages: [
      { href: '/review-contract-before-signing', anchor: 'learn what to look for in any contract' },
      { href: '/lease-agreement-analyzer', anchor: 'risk check a lease specifically' },
      { href: '/employment-contract-review', anchor: 'employment contract risk check' },
      { href: '/blog/ai-vs-lawyer-contract-review', anchor: 'guide: AI vs lawyer contract review' },
    ],
    ctaPrimary: "Check My Contract's Risk Score",
    ctaSecondary: 'See a Sample Risk Report',
    ctaMicrocopy: 'Any contract type · $19 · 0–100 risk score · 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. A risk score is not legal advice. For high-stakes contracts, consult a licensed attorney.',
  },

  // ── 21 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'purchase-agreement-review',
    primaryKeyword: 'purchase agreement review',
    secondaryKeywords: [
      'review purchase agreement online',
      'real estate contract review',
      'buy sell agreement checker',
      'purchase contract analysis',
      'real estate purchase agreement clauses',
      'ai purchase agreement review',
      'home purchase contract review',
    ],
    intent: 'comercial',
    difficulty: 'media',
    monetization: 'alto',
    priority: 'alta',
    cluster: 'purchase-real-estate',
    hubPage: '/purchase-agreement-review',
    title: 'Purchase Agreement Review — Check Any Buy/Sell Contract Before Closing | Revealr',
    metaDescription:
      'Upload your purchase agreement and get an AI analysis in minutes. Revealr flags contingency risks, earnest money issues, as-is disclaimers, and closing traps.',
    h1: 'Purchase Agreement Review — Understand What You\'re Signing Before Closing',
    h2s: [
      'The 6 Clauses in Every Purchase Agreement That Deserve Closer Attention',
      'What Revealr Checks in Purchase and Sale Agreements',
      'How to Use a Purchase Agreement Review to Negotiate Better Terms',
    ],
    intro:
      'Purchase agreements are written by the selling party\'s attorney — which means the defaults favor the seller. Contingency windows that expire before you can act, earnest money terms that are hard to get back, and as-is disclaimers that eliminate recourse are standard in many agreements. Revealr reads your purchase contract and surfaces the clauses that most commonly create problems for buyers before closing day.',
    checksTitle: 'What Revealr checks in purchase agreements',
    checks: [
      { title: 'Contingency clauses', description: 'Financing, inspection, and appraisal contingencies — and what happens if they are not met or expire' },
      { title: 'Earnest money terms', description: 'Conditions under which your deposit is at risk or non-refundable' },
      { title: 'As-is disclaimers', description: 'Seller disclosure limitations and what recourse you have after closing' },
      { title: 'Closing date and delay penalties', description: 'How flexible the closing date is and what happens if either party needs more time' },
      { title: 'Inclusions and exclusions', description: 'What fixtures, appliances, or items are (and are not) included in the sale' },
      { title: 'Buyer and seller default remedies', description: 'What each party can do if the other fails to perform — and how asymmetric those remedies are' },
    ],
    sampleDocumentLabel: 'Residential Purchase Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§6.2',
        title: 'Earnest Money: Non-Refundable After 3 Days',
        body: 'Earnest money becomes non-refundable 3 business days after signing, even if the financing contingency has not yet expired. This creates a window where you could lose your deposit while still working to secure a loan.',
        action: 'Request that earnest money remain refundable through the financing contingency deadline, not on a separate shorter timeline.',
      },
      {
        severity: 'WARNING',
        section: '§4.1',
        title: 'Inspection Contingency: 7-Day Window Only',
        body: 'The inspection period is 7 calendar days from acceptance. This is a short window for scheduling inspections, reviewing reports, and negotiating repairs. Many markets allow 10–14 days.',
        action: 'Request 10–14 days for the inspection contingency, or confirm you can schedule an inspector within 2–3 days of signing.',
      },
    ],
    whoThisIsFor: [
      { role: 'Homebuyers reviewing their purchase contract', description: 'You want to understand contingency deadlines, earnest money exposure, and default terms before you sign' },
      { role: 'Real estate investors', description: 'You review purchase agreements regularly and want a fast first-pass tool to flag unusual or one-sided terms' },
      { role: 'Anyone making their first property purchase', description: 'Real estate contracts are long and complex. A plain-English review helps you ask the right questions before closing' },
    ],
    whyReviewStat:
      'Purchase agreements can be 20–40 pages with dozens of contingencies, deadlines, and default clauses. Missing a single deadline — like a financing contingency expiration — can put your earnest money at risk.',
    faqs: [
      {
        question: 'What is a purchase agreement and why should I review it?',
        answer:
          'A purchase agreement (also called a buy-sell agreement or purchase and sale agreement) is the legally binding contract that governs a property transaction. It sets contingency deadlines, defines what is included in the sale, and specifies what happens if either party fails to perform. Reviewing it before signing helps you understand your rights and obligations before you are committed.',
      },
      {
        question: 'What are the most important clauses to check in a purchase agreement?',
        answer:
          'The most consequential clauses are typically: (1) financing contingency — when it expires and what triggers it; (2) inspection contingency — how many days you have and what "unsatisfactory" means; (3) earnest money terms — when it becomes non-refundable and under what conditions it is returned; (4) as-is language — what seller disclosures are excluded; (5) default remedies — what each party can recover if the other backs out.',
      },
      {
        question: 'Can Revealr analyze any real estate purchase agreement?',
        answer:
          'Yes. Revealr is designed to work with standard residential and commercial purchase agreements. Upload the document in PDF or Word format and the AI will identify the key risk patterns. For jurisdiction-specific nuances or complex commercial transactions, we recommend reviewing the Revealr output with a real estate attorney.',
      },
      {
        question: 'Is this a substitute for a real estate attorney?',
        answer:
          'No. Revealr provides an AI-assisted first-pass analysis to help you understand the key terms and identify clauses worth questioning. For high-value transactions, we strongly recommend working with a licensed real estate attorney who can advise on your specific jurisdiction and circumstances.',
      },
      {
        question: 'What is the earnest money clause and why does it matter?',
        answer:
          'The earnest money clause defines the deposit you put down to demonstrate serious intent to purchase. It specifies when the deposit is refundable (usually tied to contingency deadlines) and what happens if you or the seller backs out. Getting this wrong can mean losing your deposit even if the deal falls through for a legitimate reason.',
      },
    ],
    relatedPages: [
      { href: '/contract-risk-checker', anchor: 'check any contract for risk' },
      { href: '/review-contract-before-signing', anchor: 'what to look for in any contract before signing' },
      { href: '/lease-agreement-analyzer', anchor: 'review a rental lease instead' },
    ],
    ctaPrimary: 'Review My Purchase Agreement',
    ctaSecondary: 'See a Sample Report',
    ctaMicrocopy: 'Any purchase agreement · $19 · plain-English analysis · 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. It is not a substitute for advice from a licensed real estate attorney. Always consult a qualified professional before signing a purchase agreement.',
  },

  // ── 22 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-contract-review',
    primaryKeyword: 'ai contract review',
    secondaryKeywords: [
      'ai contract analysis',
      'upload contract for review',
      'contract review tool online',
      'automated contract review',
      'ai document review',
      'contract checker online',
      'review any contract with ai',
    ],
    intent: 'transaccional',
    difficulty: 'media',
    monetization: 'alto',
    priority: 'alta',
    cluster: 'contract-review',
    hubPage: '/review-contract-before-signing',
    title: 'AI Contract Review — Upload Any Contract, Get Plain-English Analysis | Revealr',
    metaDescription:
      'AI contract review in 60 seconds. Upload any contract and get a risk score, flagged clauses, plain-English explanations, and a full action plan. $19 one-time.',
    h1: 'AI Contract Review — Upload Any Contract, Get Plain-English Analysis',
    h2s: [
      'What Does AI Contract Review Actually Check?',
      'How Revealr Flags Clauses in Real Contracts',
      'Who Uses AI Contract Review — and Why',
    ],
    intro:
      'Most contract review tools are built for legal teams and cost $40–500/month. Revealr is built for the person signing — one document, one price, plain-English results in 60 seconds. Upload any contract and get a risk score, every risky clause flagged by severity, a plain-English explanation of what each clause means for you, and a specific action for each flag.',
    checksTitle: 'What Revealr checks in any contract',
    checks: [
      { title: 'Termination rights', description: 'Which party can terminate, for what reasons, with how much notice — and whether those rights are symmetric' },
      { title: 'Auto-renewal clauses', description: 'Contracts that roll over automatically unless cancelled — and the notice window required to opt out' },
      { title: 'Liability caps and indemnification', description: 'Limits on what each party can recover, and who indemnifies whom for what' },
      { title: 'Payment terms and penalties', description: 'When payment is due, how late fees are calculated, and what triggers penalty clauses' },
      { title: 'IP assignment language', description: 'Whether work you create is assigned to the other party — and how broad that assignment is' },
      { title: 'Arbitration and dispute clauses', description: 'Whether you waive court access, class action rights, or jury trial rights in disputes' },
    ],
    sampleDocumentLabel: 'Service Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§8.1',
        title: 'Unilateral Termination Right',
        body: 'One party can terminate this agreement with 7 days notice for any reason. The other party requires 30 days written notice plus documented cause. This asymmetry puts one side at a significant disadvantage — a 7-day window leaves little time to find alternatives.',
        action: 'Request symmetric termination terms — both parties on the same notice period and conditions, or mutual termination for cause with equivalent notice.',
      },
      {
        severity: 'WARNING',
        section: '§12.3',
        title: 'Auto-Renewal With Short Notice Window',
        body: 'This contract renews automatically for 12 months unless either party cancels at least 45 days before the expiry date. Most auto-renewal clauses require 30 days notice. A 45-day window is easy to miss, particularly for annual contracts.',
        action: 'Note the exact cancellation deadline in your calendar at month 10. If the window is unreasonably short, request a reduction to 30 days.',
      },
    ],
    whoThisIsFor: [
      { role: 'Anyone reviewing a client contract', description: 'You received a contract from a client or employer and need to understand what you are agreeing to before signing' },
      { role: 'First-time signers who want clarity', description: 'You have never reviewed a contract closely and want a structured breakdown of what the key clauses actually mean' },
      { role: 'Anyone who got a contract and does not know where to start', description: 'You have a PDF in your inbox and a deadline to sign. Revealr reads it first — you focus on what matters' },
    ],
    whyReviewStat:
      'Most contract disputes trace back to clauses that were present from the start — just unread. A single asymmetric termination clause, an auto-renewal trap, or an overbroad IP assignment can create obligations that last months or years beyond what you intended.',
    faqs: [
      {
        question: 'What types of contracts can AI review?',
        answer:
          'Revealr can review leases, employment contracts, NDAs, freelance and independent contractor agreements, service agreements, consulting agreements, purchase agreements, non-compete agreements, and most other legal documents. The AI identifies the document type and applies the most relevant analysis framework.',
      },
      {
        question: 'How accurate is AI contract analysis?',
        answer:
          'AI contract analysis is highly consistent at detecting common risk patterns — asymmetric termination rights, auto-renewal clauses, overbroad IP assignments, arbitration waivers, and similar clause types. It cannot account for jurisdiction-specific statutes or fact-specific circumstances the way a licensed attorney can, and should not be used as a substitute for legal advice in high-stakes situations.',
      },
      {
        question: 'How is this different from tools like LawGeex or Kira?',
        answer:
          'LawGeex, Kira, and similar platforms are enterprise tools built for legal teams — they require onboarding, training, and typically cost hundreds or thousands of dollars per month. Revealr is designed for the individual signing a single document. One upload, one price, immediate results.',
      },
      {
        question: "Can I use this for any country's contracts?",
        answer:
          "Yes. Revealr detects risk language regardless of jurisdiction. It identifies the governing law and tailors its analysis accordingly. Jurisdiction-specific legal references are most precise for US, UK, and Australian contracts, but the tool flags structural risks in contracts from any country.",
      },
      {
        question: 'What happens to my document after analysis?',
        answer:
          'Your document is deleted from our servers immediately after the analysis is complete. We do not store your documents, and we do not use them to train AI models.',
      },
    ],
    relatedPages: [
      { href: '/contract-red-flags', anchor: 'the most common contract red flags' },
      { href: '/sign-contract-checklist', anchor: '10-point checklist before signing' },
      { href: '/review-contract-before-signing', anchor: 'how to review any contract' },
      { href: '/blog/how-to-read-a-contract-with-ai', anchor: 'guide: how to read a contract with AI' },
      { href: '/blog/what-to-check-in-an-employment-contract', anchor: 'guide: what to check in an employment contract' },
    ],
    ctaPrimary: 'Upload Your Contract — See Your Risk Score',
    ctaSecondary: 'See how it works',
    ctaMicrocopy: 'Any contract type · $19 · Results in 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. It is not a substitute for legal advice. Consult a licensed attorney for complex or high-stakes agreements.',
  },

  // ── 23 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'contract-red-flags',
    primaryKeyword: 'contract red flags',
    secondaryKeywords: [
      'contract warning signs',
      'red flags in contracts',
      'contract clauses to watch',
      'what to look for in a contract',
      'contract risk signs',
      'common bad contract clauses',
      'contract terms to avoid',
    ],
    intent: 'informacional-comercial',
    difficulty: 'media',
    monetization: 'medio-alto',
    priority: 'media-alta',
    cluster: 'contract-review',
    hubPage: '/review-contract-before-signing',
    title: 'Contract Red Flags — Clauses to Watch Before You Sign | Revealr',
    metaDescription:
      'Know the contract red flags most people miss until it is too late. Revealr scans for unilateral rights, auto-renewals, IP grabs, and arbitration waivers. $19.',
    h1: 'Contract Red Flags — The Clauses That Most Commonly Cost People Money',
    h2s: [
      'The Six Most Common Contract Red Flags',
      'How Red Flag Clauses Look in Real Contracts',
      'Who Should Be Scanning for Contract Red Flags',
    ],
    intro:
      "Every contract is written by the other party's lawyer. The defaults protect them, not you. These are the clauses they include that most people miss — and what they actually mean for you. Revealr scans for all of them automatically and flags any that appear in your contract, in plain English, with a recommended action for each.",
    checksTitle: 'Red flags Revealr checks for in every contract',
    checks: [
      { title: 'Automatic renewal with short notice window', description: 'Contract rolls over for another full term unless you cancel within a specific (often short) window' },
      { title: 'Unilateral amendment rights', description: 'One party can change the terms with minimal notice — continued use or non-response counts as acceptance' },
      { title: 'Broad IP assignment language', description: 'Work you create may be assigned to the other party — including work created outside your normal scope' },
      { title: 'Mandatory arbitration waiving court rights', description: 'You waive your right to sue in court, to a jury trial, and to join class actions' },
      { title: 'Asymmetric termination rights', description: 'One party can exit with short notice; the other requires long notice or documented cause' },
      { title: 'Vague "reasonable costs" language', description: '"Reasonable expenses" without defined caps creates open-ended financial exposure' },
    ],
    sampleDocumentLabel: 'Service Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§3.1',
        title: 'Unilateral Right to Amend Terms',
        body: 'The company can change the terms of this agreement with 14 days notice. You have no right to object — continued use of the service or continued performance constitutes acceptance of the new terms. This clause allows material changes to your obligations without mutual consent.',
        action: 'Request a mutual amendment clause requiring written consent from both parties before any changes take effect.',
      },
      {
        severity: 'WARNING',
        section: '§15.2',
        title: 'Mandatory Arbitration — No Court Access',
        body: 'All disputes must be resolved through binding private arbitration. You waive your right to a jury trial and to join a class action lawsuit. Arbitration is generally faster but limits discovery rights and appeal options significantly.',
        action: 'Understand this before signing — it limits your legal options if a dispute arises. Consider requesting mutual opt-out rights from the arbitration clause.',
      },
    ],
    whoThisIsFor: [
      { role: 'Anyone who received a contract and wants to know what to look for', description: 'You have a contract in hand and want to scan for the most common risks before signing' },
      { role: 'People who have been burned by contract clauses before', description: 'You have experienced the cost of a clause you did not understand — and want to avoid repeating it' },
      { role: 'First-time renters, employees, or freelancers', description: 'You are new to a contract type and want to know what the standard risks are before agreeing to anything' },
    ],
    whyReviewStat:
      'The clauses that create the most post-signing disputes — automatic renewal traps, asymmetric termination rights, and overbroad IP assignments — rarely appear in bold type. They are buried in standard-looking boilerplate that most people read once and quickly move past.',
    faqs: [
      {
        question: 'What is a contract red flag?',
        answer:
          'A contract red flag is a clause that creates disproportionate risk for one party — typically through asymmetric obligations, hidden financial exposure, or terms that allow the other party to change or exit the agreement unilaterally. Common examples include automatic renewal clauses with short cancellation windows, mandatory arbitration waivers, and overbroad IP assignments.',
      },
      {
        question: 'Are red flags always dealbreakers?',
        answer:
          "Not always. Some red flags are standard in certain industries and negotiable with a simple request. Others — like a mandatory arbitration waiver in a high-value agreement — may be worth walking away from if the other party refuses to remove them. The key is to identify them before signing, not after.",
      },
      {
        question: 'What is the most common red flag in lease agreements?',
        answer:
          'The most common lease red flag is the automatic renewal clause — specifically a short cancellation window (45–90 days) that is easy to miss. Missing the deadline commits you to another full year at potentially higher rent.',
      },
      {
        question: 'What is the most common red flag in employment contracts?',
        answer:
          "Overbroad IP assignment language is the most commonly overlooked employment contract red flag. Many employment agreements assign all work created 'in connection with the company's business' — language that can extend to after-hours personal projects and side businesses.",
      },
      {
        question: 'Can I ask to remove a red flag clause?',
        answer:
          'Yes. Most red flag clauses are negotiable, especially in service, freelance, and lease agreements. The key is to identify the specific clause, understand what it means, and make a concrete written request — for example, asking for symmetric termination terms, or requesting a carve-out in an IP assignment clause.',
      },
    ],
    relatedPages: [
      { href: '/ai-contract-review', anchor: 'scan your contract with AI' },
      { href: '/review-contract-before-signing', anchor: 'how to review any contract before signing' },
      { href: '/contract-risk-checker', anchor: 'check your contract risk score' },
      { href: '/blog/common-lease-red-flags', anchor: 'guide: common lease red flags' },
      { href: '/blog/common-nda-red-flags', anchor: 'guide: common NDA red flags' },
    ],
    ctaPrimary: 'Upload Your Contract — Check for Red Flags',
    ctaSecondary: 'See a sample report',
    ctaMicrocopy: 'Any contract type · $19 · Results in 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. It is not a substitute for legal advice. Consult a licensed attorney for complex disputes or high-stakes agreements.',
  },

  // ── 24 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'sign-contract-checklist',
    primaryKeyword: 'what to check before signing a contract',
    secondaryKeywords: [
      'contract signing checklist',
      'before you sign a contract',
      'contract review checklist',
      'sign contract checklist',
      'things to check in a contract',
      'contract checklist online',
      'how to review a contract checklist',
    ],
    intent: 'informacional-comercial',
    difficulty: 'baja-media',
    monetization: 'medio-alto',
    priority: 'media-alta',
    cluster: 'contract-review',
    hubPage: '/review-contract-before-signing',
    title: 'What to Check Before Signing a Contract — 10-Point Checklist | Revealr',
    metaDescription:
      'A plain-English 10-point checklist for reviewing any contract before signing. Upload yours and Revealr checks all 10 automatically in 60 seconds. $19.',
    h1: 'What to Check Before Signing Any Contract — A Plain-English Checklist',
    h2s: [
      'The 10-Point Contract Review Checklist',
      'Checklist Items as They Appear in Real Contracts',
      'Who This Checklist Is For',
    ],
    intro:
      'Most contract disputes trace back to clauses that were there from the start — just unread. This checklist covers the 10 things worth checking before you sign anything. Revealr automates all 10 checks in 60 seconds — you review the flags it surfaces and decide what to negotiate.',
    checksTitle: 'The 10-point checklist Revealr runs on every contract',
    checks: [
      { title: 'Who are the parties and are they correctly named?', description: 'Verify legal entity names, addresses, and roles match what you agreed to verbally' },
      { title: 'What is the start date and end date?', description: 'Confirm the term is what you expect — and whether the agreement is indefinite' },
      { title: 'Is there an automatic renewal clause?', description: 'Does the contract renew by default, and what notice is required to cancel on time?' },
      { title: 'What are the termination terms for each party?', description: 'Who can exit, for what reasons, with how much notice — and are those terms the same for both?' },
      { title: 'What payments are required and when?', description: 'Amounts, due dates, late payment fees, and escalation mechanisms' },
      { title: 'Who owns any work or IP created?', description: 'Does the agreement include IP assignment, work-for-hire, or license language?' },
      { title: 'What are the dispute resolution terms?', description: 'Court, arbitration, or mediation — and in which jurisdiction?' },
      { title: 'Are there any non-compete or non-solicitation clauses?', description: 'Restrictions that limit your work options after the agreement ends' },
      { title: 'What happens if either party breaches?', description: 'Cure periods, remedies, liquidated damages, and termination consequences' },
      { title: 'Are there any hidden fees or penalties?', description: 'Early exit fees, administrative fees, clawback provisions, or penalty multipliers' },
    ],
    sampleDocumentLabel: 'Service Agreement',
    sampleFlags: [
      {
        severity: 'WARNING',
        section: '§2.1',
        title: 'No Defined End Date',
        body: 'This agreement has no expiration date and continues indefinitely until one party gives written notice to terminate. Without a defined term, you may be bound longer than intended and have no natural exit point built into the contract.',
        action: 'Request a fixed initial term (e.g. 12 months) with an option to renew, rather than an open-ended agreement.',
      },
      {
        severity: 'WARNING',
        section: '§5.3',
        title: 'Payment Terms Undefined',
        body: 'Payment is due "upon completion of deliverables" with no defined timeline, milestone criteria, or invoice process. Vague payment terms are a common source of disputes about when obligations are triggered.',
        action: 'Request specific payment dates, milestone definitions, or invoice net terms (e.g. Net 30 from invoice date).',
      },
    ],
    whoThisIsFor: [
      { role: 'Anyone about to sign any type of contract', description: 'You want a structured process for reviewing a contract so you do not miss anything important' },
      { role: 'People who want a concrete checklist to follow', description: 'You prefer a step-by-step framework rather than reading an entire document blind' },
      { role: 'First-time signers who do not know where to start', description: 'You received a contract and are not sure which clauses matter most — this checklist tells you where to focus' },
    ],
    whyReviewStat:
      'The most consequential clauses in most contracts — termination terms, renewal provisions, and payment penalties — are typically in the middle pages, not the beginning. A structured checklist ensures you look for them specifically rather than skimming past them.',
    faqs: [
      {
        question: 'How long should it take to review a contract?',
        answer:
          'A standard one-page freelance agreement can be reviewed in 5–10 minutes manually. A full employment contract (10–20 pages) takes 45–90 minutes for a thorough manual read. With Revealr, the AI reads the full document in under 60 seconds and surfaces only the clauses that need your attention.',
      },
      {
        question: 'Should I always have a lawyer review a contract?',
        answer:
          "Not for every contract. For routine documents — standard residential leases, typical freelance agreements, basic NDAs — a structured self-review plus AI analysis is usually sufficient. For high-value agreements, complex commercial deals, or documents with unusual terms, a licensed attorney's review is strongly recommended.",
      },
      {
        question: "What if I don't understand a clause?",
        answer:
          "Start with Revealr's plain-English explanation of the clause. If still unclear, ask the other party to explain their intent in writing — their answer often clarifies whether the clause is standard or a negotiating point. For high-stakes ambiguity, consult an attorney before signing.",
      },
      {
        question: 'Can I negotiate any contract?',
        answer:
          'Most contracts are more negotiable than they appear. Standard residential leases, freelance agreements, and service contracts are routinely amended before signing. The key is identifying which specific clauses you want changed and making concrete, written requests.',
      },
      {
        question: 'What is the most important thing to check in any contract?',
        answer:
          'Termination and renewal terms are arguably the most important clauses in most contracts. They define how long you are obligated, how you can exit, and what it costs to leave early. Automatic renewal clauses and asymmetric exit rights are the most common sources of post-signing disputes.',
      },
    ],
    relatedPages: [
      { href: '/contract-red-flags', anchor: 'the most common contract red flags' },
      { href: '/ai-contract-review', anchor: 'run an AI review on your contract' },
      { href: '/review-contract-before-signing', anchor: 'how to review any contract before signing' },
      { href: '/blog/how-to-read-a-contract-with-ai', anchor: 'guide: how to read a contract with AI' },
      { href: '/blog/freelance-contract-mistakes', anchor: 'guide: common freelance contract mistakes' },
    ],
    ctaPrimary: 'Upload Your Contract — Get a Full Checklist in 60 Seconds',
    ctaSecondary: 'See contract red flags',
    ctaMicrocopy: 'Any contract type · $19 · Results in 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. It is not a substitute for legal advice. For high-value or complex agreements, consult a licensed attorney.',
  },

  // ── 25 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'job-offer-letter-review',
    primaryKeyword: 'job offer letter review',
    secondaryKeywords: [
      'review job offer letter',
      'what to check in a job offer',
      'job offer letter analysis',
      'job offer clause checker',
      'signing bonus clawback review',
      'offer letter non-compete check',
      'ai job offer review',
    ],
    intent: 'comercial',
    difficulty: 'media',
    monetization: 'alto',
    priority: 'media-alta',
    cluster: 'employment-job',
    hubPage: '/employment-contract-review',
    title: 'Job Offer Letter Review — What to Check Before You Accept | Revealr',
    metaDescription:
      'Review your job offer letter before you accept. Revealr checks for clawbacks, non-competes, IP terms, and at-will clauses in plain English. $19 one-time.',
    h1: 'Job Offer Letter Review — What to Check Before You Accept the Role',
    h2s: [
      'What a Job Offer Letter Review Checks',
      'Clauses Most People Miss in Offer Letters',
      'Who Should Review Their Offer Letter Before Accepting',
    ],
    intro:
      "A job offer letter is not just a formality. It can include at-will clauses, signing bonus clawbacks, hidden non-competes, and IP terms that affect your career long after you leave. Revealr reads every clause before you sign — so you accept the role knowing exactly what you are agreeing to.",
    checksTitle: 'What Revealr checks in job offer letters',
    checks: [
      { title: 'At-will employment language', description: 'Whether employment can be terminated at any time for any reason — and whether that applies to both parties equally' },
      { title: 'Signing bonus repayment terms', description: 'Clawback conditions, repayment timelines, and whether involuntary termination triggers repayment' },
      { title: 'Non-compete and non-solicitation clauses', description: 'Geographic scope, duration, and industry restrictions — many candidates do not notice these in offer letters' },
      { title: 'IP assignment scope', description: 'What intellectual property you assign to the company — and whether it extends to personal projects and side work' },
      { title: 'Start date and probationary period terms', description: 'Trial period conditions, different termination rights during probation, and review thresholds' },
      { title: 'Benefits and equity vesting conditions', description: 'Cliff vesting dates, acceleration provisions, and what happens to unvested equity if you leave' },
    ],
    sampleDocumentLabel: 'Job Offer Letter',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§4.2',
        title: 'Signing Bonus Clawback — 24 Months',
        body: 'If you leave within 24 months of your start date for any reason — including layoff — you must repay the full signing bonus. This clawback applies equally to voluntary resignation and involuntary termination without cause, creating financial risk in an unstable employment market.',
        action: 'Request that the clawback obligation not apply in cases of involuntary termination, layoff, or company-initiated role elimination.',
      },
      {
        severity: 'WARNING',
        section: '§7.1',
        title: 'Non-Compete Included in Offer Letter',
        body: 'This offer letter includes a non-compete clause restricting you from working for competitors or starting a competing business for 12 months after employment ends. Non-competes are frequently included in offer letters without being separately highlighted — and are enforceable depending on jurisdiction.',
        action: 'Review the geographic scope and definition of "competitor" carefully. Request a narrower definition or shorter duration if the scope is broad.',
      },
    ],
    whoThisIsFor: [
      { role: 'Candidates who received a job offer and want to understand it', description: 'You want to know exactly what you are agreeing to before accepting — including the clauses that are easy to miss' },
      { role: 'People switching jobs who want to compare terms', description: 'You want to check non-compete and IP terms in your new offer against your current contract before resigning' },
      { role: 'Anyone who received an offer with a signing bonus or equity', description: 'Signing bonuses and equity vesting have detailed conditions — clawbacks, cliff dates, and forfeiture terms — worth reviewing carefully' },
    ],
    whyReviewStat:
      'Job offer letters often include the same legally binding clauses as full employment contracts — including non-compete restrictions, IP assignments, and clawback provisions — but are formatted to look like simple welcome documents, which reduces the scrutiny most candidates give them.',
    faqs: [
      {
        question: "What's the difference between a job offer letter and an employment contract?",
        answer:
          "A job offer letter outlines the key terms of employment — role, start date, salary, and benefits — and is typically shorter and less formal than a full employment contract. However, it is legally binding and often includes clauses like at-will employment, non-compete restrictions, IP assignments, and signing bonus clawbacks that have significant legal consequences.",
      },
      {
        question: 'Is a job offer letter legally binding?',
        answer:
          "Yes, in most jurisdictions a signed job offer letter is a legally enforceable contract. The specific terms — including at-will clauses, signing bonus conditions, and non-compete restrictions — are binding once you sign. This is why reviewing it before accepting matters.",
      },
      {
        question: 'What should I negotiate in a job offer letter?',
        answer:
          "Start with the terms most likely to create future obligations: signing bonus clawback timeline (does it exclude layoffs?), non-compete scope (is the geography or duration too broad?), and IP assignment language (does it cover personal projects?). Salary and start date are also negotiable but tend to get the most attention at the expense of the legal terms.",
      },
      {
        question: 'Can an offer letter include a non-compete?',
        answer:
          "Yes. Non-compete clauses are frequently included in offer letters, often in the final pages where candidates are less likely to read carefully. They are just as enforceable as non-competes in full employment contracts — and in some jurisdictions, the consideration for the non-compete is the job offer itself.",
      },
      {
        question: 'What is a signing bonus clawback?',
        answer:
          "A signing bonus clawback is a clause that requires you to repay some or all of your signing bonus if you leave the company within a defined period — typically 12–24 months. The riskiest clawbacks apply equally to voluntary resignation and involuntary termination, meaning you could owe money back even if the company lays you off.",
      },
    ],
    relatedPages: [
      { href: '/employment-contract-review', anchor: 'full employment contract review' },
      { href: '/non-compete-agreement-review', anchor: 'check your non-compete clause' },
      { href: '/termination-clause-review', anchor: 'review your termination clause' },
      { href: '/blog/job-offer-letter-vs-employment-contract', anchor: 'guide: offer letter vs employment contract' },
      { href: '/blog/non-compete-clause-explained', anchor: 'guide: non-compete clauses explained' },
    ],
    ctaPrimary: "Upload Your Offer Letter — See What's In It",
    ctaSecondary: 'Full employment contract review',
    ctaMicrocopy: 'Any offer letter · $19 · Results in 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Employment law varies significantly by jurisdiction. Consult a licensed employment attorney for complex situations.',
  },

  // ── 26 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'rental-agreement-review',
    primaryKeyword: 'rental agreement review',
    secondaryKeywords: [
      'review rental agreement',
      'rental agreement checker',
      'review my rental contract',
      'rental lease review tool',
      'ai rental agreement analysis',
      'check rental agreement clauses',
      'rental contract analysis online',
    ],
    intent: 'transaccional',
    difficulty: 'baja-media',
    monetization: 'alto',
    priority: 'alta',
    cluster: 'lease-rental',
    hubPage: '/lease-agreement-analyzer',
    title: 'Rental Agreement Review — Check Your Lease Before You Sign | Revealr',
    metaDescription:
      'Upload your rental agreement for a full AI review. Revealr flags deposit clauses, auto-renewal traps, entry rights, and early exit costs. $19 one-time.',
    h1: "Rental Agreement Review — Know What You're Agreeing To Before You Move In",
    h2s: [
      'What a Rental Agreement Review Actually Checks',
      'Clauses Revealr Flags in Real Rental Agreements',
      'Who Should Review Their Rental Agreement Before Signing',
    ],
    intro:
      "Rental agreements are written by landlords and property managers. The defaults protect them, not you. Revealr reads every clause and flags what could cost you your deposit, lock you into an unwanted renewal, or limit your rights as a tenant — all in under 60 seconds.",
    checksTitle: 'What Revealr checks in your rental agreement',
    checks: [
      { title: 'Security deposit refund conditions', description: 'Non-refundable language, deduction rights, and return deadlines — and whether they comply with standard tenant protections' },
      { title: 'Early termination costs', description: 'Exact penalty if you need to leave before the end of the term — and whether that penalty is above the standard' },
      { title: 'Automatic renewal notice window', description: 'When you must give notice to avoid rolling over into another full term' },
      { title: 'Landlord entry rights and notice', description: 'How much notice the landlord must give before entering your unit and under what circumstances' },
      { title: 'Maintenance and repair responsibilities', description: 'Who pays for what — appliances, HVAC, minor repairs — and what counts as normal wear and tear' },
      { title: 'Subletting and occupancy restrictions', description: 'Whether you can sublet, have additional occupants, or use the space for purposes beyond personal residence' },
    ],
    sampleDocumentLabel: 'Rental Agreement',
    sampleFlags: [
      {
        severity: 'CRITICAL',
        section: '§5.1',
        title: 'Security Deposit Designated Non-Refundable',
        body: 'This rental agreement designates the full security deposit as non-refundable regardless of property condition at move-out. In most US states, security deposits are required by law to be refundable minus documented damage. A blanket non-refundable clause is generally unenforceable — but having it in writing may still complicate a dispute.',
        action: 'Request that this clause be replaced with standard refundable deposit language, specifying permitted deductions and a return deadline.',
      },
      {
        severity: 'WARNING',
        section: '§3.2',
        title: '60-Day Notice Required to Avoid Auto-Renewal',
        body: 'This rental agreement auto-renews for 12 months unless you provide 60 days written notice before the expiry date. Most standard leases require 30 days notice. A 60-day window is easy to miss — missing it commits you to another full year at potentially higher rent.',
        action: 'Note the exact cancellation deadline in your calendar immediately. If the notice window is unreasonably long, request a reduction to 30 days.',
      },
    ],
    whoThisIsFor: [
      { role: 'Renters who just received a rental agreement', description: 'You have a lease in hand and want to review it before the deadline to sign' },
      { role: 'First-time renters who do not know what to look for', description: 'You have never signed a rental agreement and want to understand what the standard risks are' },
      { role: 'Anyone moving to a new city and signing remotely', description: "You are not familiar with local norms and cannot easily negotiate in person — a structured review helps you identify what to push back on" },
    ],
    whyReviewStat:
      "Rental agreements vary widely in how landlord-friendly their terms are. Security deposit deductions, automatic renewal traps, and maintenance responsibility shifts are the most common sources of tenant disputes — and all are typically established in the original lease agreement.",
    faqs: [
      {
        question: "What's the difference between a rental agreement and a lease?",
        answer:
          "A rental agreement is typically month-to-month, while a lease is for a fixed term (usually 12 months). Both are legally binding contracts that define deposit terms, maintenance obligations, entry rights, and termination conditions. Both should be reviewed before signing.",
      },
      {
        question: 'Can a landlord keep my entire security deposit?',
        answer:
          "In most US states, landlords can only deduct from a security deposit for documented damage beyond normal wear and tear, unpaid rent, and costs explicitly allowed under the lease. A blanket non-refundable deposit clause is generally unenforceable, but disputing it after the fact is time-consuming. Revealr flags these clauses so you can request the correct language before signing.",
      },
      {
        question: 'What happens if I break a rental agreement early?',
        answer:
          "This depends entirely on your early termination clause. Some agreements require you to pay 1–3 months' rent as a penalty. Others require you to pay through the end of the lease minus any rent recovered from a new tenant. Revealr identifies the specific early termination terms in your agreement and flags anything above standard.",
      },
      {
        question: 'What is a holdover clause?',
        answer:
          "A holdover clause defines what happens if you stay in the rental unit beyond the end of your lease term without signing a renewal. Many holdover clauses convert the tenancy to month-to-month, but some allow the landlord to charge significantly higher rent for the holdover period. Revealr flags these terms.",
      },
      {
        question: 'Should I sign a rental agreement without reviewing it?',
        answer:
          "No. Rental agreements contain legally binding clauses about deposit deductions, early exit penalties, and maintenance responsibilities that can cost you money if you do not understand them before signing. A quick AI review before signing is significantly less expensive than a dispute after.",
      },
    ],
    relatedPages: [
      { href: '/lease-agreement-analyzer', anchor: 'use the full lease agreement analyzer' },
      { href: '/security-deposit-clause-checker', anchor: 'check your security deposit clause' },
      { href: '/lease-red-flags-before-signing', anchor: 'lease red flags to watch for' },
      { href: '/blog/how-to-review-a-lease-before-signing', anchor: 'guide: how to review a lease before signing' },
      { href: '/blog/common-lease-red-flags', anchor: 'guide: common lease red flags' },
    ],
    ctaPrimary: 'Upload Your Rental Agreement — See Your Risk Score',
    ctaSecondary: 'Full lease agreement analyzer',
    ctaMicrocopy: 'Any rental agreement · $19 · Results in 60 seconds',
    disclaimer:
      'Revealr provides AI-assisted document analysis for informational purposes only. Tenant rights and rental regulations vary by state and locality. Consult a licensed attorney or tenant rights organization for jurisdiction-specific guidance.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getPageBySlug(slug: string): SEOPage | undefined {
  return seoPages.find((p) => p.slug === slug);
}

export function getPagesByCluster(cluster: Cluster): SEOPage[] {
  return seoPages.filter((p) => p.cluster === cluster);
}

export function getAllSlugs(): string[] {
  return seoPages.map((p) => p.slug);
}
