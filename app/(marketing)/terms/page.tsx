import type { Metadata } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://getrevealr.com';
const EFFECTIVE_DATE = 'January 1, 2025';

export const metadata: Metadata = {
  title: 'Terms of Service — Revealr',
  description:
    'Revealr Terms of Service. Revealr is an AI analysis tool, not a law firm. Results are informational only and do not constitute legal advice.',
  alternates: { canonical: `${APP_URL}/terms` },
  robots: { index: true, follow: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-xl font-bold text-[#1a1814] mb-4"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-[#444] leading-relaxed">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="bg-[#faf9f7] min-h-screen py-14 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#e8572a] uppercase tracking-widest mb-3">Legal</p>
          <h1
            className="text-[#1a1814] font-bold mb-3"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Terms of Service
          </h1>
          <p className="text-sm text-[#9c9590]">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <p className="text-[#444] leading-relaxed mb-10">
          These Terms of Service govern your use of Revealr, operated at {APP_URL}. By using the service, you agree to
          these terms. If you do not agree, do not use the service.
        </p>

        <Section title="1. What Revealr is">
          <p>Revealr is an AI-powered software tool that analyzes uploaded documents and generates informational reports about potential risks or unusual clauses. Revealr is not a law firm. It does not provide legal advice. Using Revealr does not create an attorney-client relationship.</p>
          <p>The output of Revealr is for informational purposes only. It is not a substitute for the advice of a licensed attorney in your jurisdiction. You should not make legal decisions based solely on Revealr's output.</p>
        </Section>

        <Section title="2. Eligibility">
          <p>You must be at least 18 years of age to use Revealr. By using the service, you represent that you meet this requirement.</p>
        </Section>

        <Section title="3. Use of the service">
          <p>You agree to use Revealr only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Upload documents you do not have the right to share</li>
            <li>Upload documents containing information about third parties without their consent where applicable</li>
            <li>Attempt to reverse engineer, scrape, or systematically extract data from the service</li>
            <li>Use the service in any way that violates applicable law</li>
            <li>Misrepresent the output of Revealr as legal advice or as the opinion of a licensed attorney</li>
          </ul>
        </Section>

        <Section title="4. Payments and refunds">
          <p>The full contract analysis report is available for a one-time payment of $19 USD per document, processed through Stripe. The preview is free with no purchase required.</p>
          <p>Due to the nature of digital services, reports are generally non-refundable once generated and delivered. If you experience a technical issue that prevented delivery of your report, contact us at hello@getrevealr.com and we will address it.</p>
        </Section>

        <Section title="5. Accuracy and disclaimer">
          <p>Revealr's AI analyzes documents based on general patterns and common risk factors. It may miss nuanced or jurisdiction-specific issues. It may flag clauses that are standard in some contexts. It does not know the specific laws of your jurisdiction unless that context is apparent from the document.</p>
          <p><strong>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</strong></p>
          <p>We do not warrant that the service will be uninterrupted, error-free, or that any particular risk or clause will be identified.</p>
        </Section>

        <Section title="6. Limitation of liability">
          <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, REVEALR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS OR DATA, ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
          <p>OUR TOTAL LIABILITY FOR ANY CLAIMS UNDER THESE TERMS SHALL NOT EXCEED THE AMOUNT YOU PAID TO US FOR THE SPECIFIC TRANSACTION GIVING RISE TO THE CLAIM.</p>
        </Section>

        <Section title="7. Intellectual property">
          <p>Revealr and its underlying technology, design, and content are owned by Revealr. You retain all rights to the documents you upload. By uploading a document, you grant us a limited license to process it for the sole purpose of generating your analysis.</p>
          <p>The analysis report generated for your document is yours. You may use it for your personal or professional purposes.</p>
        </Section>

        <Section title="8. Privacy">
          <p>Our Privacy Policy governs how we collect and handle your data. It is incorporated into these Terms by reference. Please read it before uploading any documents.</p>
        </Section>

        <Section title="9. Modifications">
          <p>We may update these Terms from time to time. Changes will be posted on this page with a revised effective date. Continued use of the service after changes constitutes acceptance of the updated Terms.</p>
        </Section>

        <Section title="10. Governing law">
          <p>These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Delaware, or through binding arbitration as mutually agreed.</p>
        </Section>

        <Section title="11. Contact">
          <p>For questions about these Terms: <strong>hello@getrevealr.com</strong></p>
        </Section>
      </div>
    </main>
  );
}
