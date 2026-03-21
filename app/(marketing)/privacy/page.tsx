import type { Metadata } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://revealr.io';
const EFFECTIVE_DATE = 'January 1, 2025';

export const metadata: Metadata = {
  title: 'Privacy Policy — Revealr',
  description:
    'How Revealr collects, uses, and protects your data. We process your documents only to generate your analysis and delete them after. We don\'t sell your data.',
  alternates: { canonical: `${APP_URL}/privacy` },
  robots: { index: true, follow: false }, // privacy pages shouldn't be aggressively crawled
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-xl font-bold text-[#1a1814] mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-[#444] leading-relaxed">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="bg-[#faf9f7] min-h-screen py-14 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#e8572a] uppercase tracking-widest mb-3">Legal</p>
          <h1
            className="text-[#1a1814] font-bold mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-[#9c9590]">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <p className="text-[#444] leading-relaxed mb-10">
          Revealr ("we", "us", "our") operates the website at {APP_URL}. This Privacy Policy describes how we collect,
          use, and protect information when you use our service. We take data privacy seriously — especially because
          you're trusting us with sensitive legal documents.
        </p>

        <Section title="1. Information we collect">
          <p><strong>Documents you upload.</strong> When you use Revealr, you upload a contract or legal document. We receive and temporarily store this file to generate your analysis. We do not retain documents after the analysis is complete.</p>
          <p><strong>Email address.</strong> You provide your email address to receive your report. We use this only to deliver your analysis. We do not send unsolicited marketing emails without your consent.</p>
          <p><strong>Payment information.</strong> Payments are processed by Stripe. We do not receive or store your credit card number. Stripe's privacy policy governs payment data.</p>
          <p><strong>Usage data.</strong> We collect standard server logs (IP address, browser type, pages visited, timestamps) to operate and improve the service. This data is not linked to your uploaded documents or email.</p>
        </Section>

        <Section title="2. How we use your information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Process your uploaded document and generate a risk analysis report</li>
            <li>Deliver your report via email</li>
            <li>Process payment for the full report</li>
            <li>Diagnose technical issues and improve the service</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>We do not use your uploaded documents to train AI models. We do not sell, rent, or share your personal data with third parties for their marketing purposes.</p>
        </Section>

        <Section title="3. Document handling and retention">
          <p>Your uploaded document is encrypted in transit using TLS (Transport Layer Security). It is stored temporarily on our infrastructure (Vercel Blob) solely for the purpose of generating your analysis.</p>
          <p>Documents are deleted from our servers after the analysis is complete and the report is generated. We do not retain copies of your documents after delivery.</p>
          <p>Analysis results (the flags and risk score we generated) are stored temporarily to allow you to access your dashboard and, if applicable, receive a PDF report. These results are associated with your session and email address, not retained indefinitely.</p>
        </Section>

        <Section title="4. Third-party services">
          <p>We use the following third-party services to operate Revealr:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong>Vercel</strong> — hosting, edge functions, and blob storage (vercel.com)</li>
            <li><strong>Anthropic (Claude API)</strong> — AI analysis of your document (anthropic.com)</li>
            <li><strong>Stripe</strong> — payment processing (stripe.com)</li>
            <li><strong>Resend</strong> — transactional email delivery (resend.com)</li>
          </ul>
          <p>Each of these providers has their own privacy policy governing how they handle data. Your document content is transmitted to Anthropic's API for analysis. Anthropic's API usage policies prohibit using API inputs for model training by default.</p>
        </Section>

        <Section title="5. Cookies and tracking">
          <p>We use minimal tracking. Our site may use session cookies required for basic functionality. We do not use third-party advertising tracking cookies or behavioral profiling.</p>
          <p>Standard server logs capture IP addresses and request metadata for security and operational purposes. This data is not sold or used for advertising.</p>
        </Section>

        <Section title="6. Your rights">
          <p>Depending on your jurisdiction, you may have rights to access, correct, or delete personal data we hold about you. To exercise these rights, contact us at <strong>hello@revealr.io</strong>.</p>
          <p>Because we do not maintain persistent user accounts and delete documents after analysis, most requests can be addressed by confirming there is no retained data to provide, correct, or delete.</p>
        </Section>

        <Section title="7. Data security">
          <p>We implement industry-standard security measures: TLS encryption in transit, access controls on our infrastructure, and minimal data retention. No internet transmission is 100% secure, and we cannot guarantee absolute security. We encourage you not to upload documents containing information beyond what is necessary for the analysis.</p>
        </Section>

        <Section title="8. Children's privacy">
          <p>Revealr is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, contact us at hello@revealr.io.</p>
        </Section>

        <Section title="9. Changes to this policy">
          <p>We may update this Privacy Policy from time to time. We will post the updated policy on this page with a revised effective date. Continued use of the service after changes constitutes acceptance of the updated policy.</p>
        </Section>

        <Section title="10. Contact">
          <p>Questions about this Privacy Policy can be directed to: <strong>hello@revealr.io</strong></p>
        </Section>
      </div>
    </main>
  );
}
