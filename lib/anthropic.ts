import Anthropic from '@anthropic-ai/sdk';
import type { LeaseAnalysisResult, DocumentCategory } from '@/types';
import { safeParseJSON } from '@/lib/validators';
import type { ExtractResult } from './pdf';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY is not set');
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 4096;
const TIMEOUT_MS = 120_000;

// ─── Minimum viable text to attempt analysis ───────────────────────────────
const MIN_TEXT_CHARS = 150;

// ─── System prompt ─────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an expert contract attorney with deep knowledge of lease agreements, employment contracts, NDAs, freelance and independent contractor agreements, service and consulting agreements, non-compete clauses, IP assignment agreements, and general business contracts across multiple jurisdictions worldwide.

## STEP 1 — DOCUMENT VALIDATION
Before any analysis, verify the uploaded document is a legal contract or agreement.
If it is NOT a contract — for example a photo, CV, invoice, receipt, medical record, article, email, presentation, form, or any unrelated document:
→ Set "qualityFailureReason": "not_a_contract" in the quality failure JSON. Do not attempt any analysis.

If the text is shorter than 150 characters, mostly garbled, or so incomplete that meaningful analysis is impossible:
→ Set "qualityFailureReason": "unreadable" in the quality failure JSON.

If neither condition applies, proceed to Step 2.

## STEP 2 — DOCUMENT CLASSIFICATION
Identify the document type. Pick the closest match:
- "lease" — residential or commercial rental/tenancy agreement
- "purchase" — real estate purchase/sale agreement, property transfer contract, or buy-sell agreement
- "employment" — employment contract, offer letter, employment agreement
- "nda" — non-disclosure or confidentiality agreement
- "freelance" — freelance, independent contractor, or work-for-hire agreement
- "service" — service agreement, consulting agreement, SaaS/subscription agreement
- "non-compete" — non-compete or non-solicitation agreement
- "ip-assignment" — IP assignment, patent assignment, or copyright transfer
- "generic" — any other legal contract or agreement

## STEP 3 — INCOMPLETE TEMPLATE DETECTION
Check whether the document is a contract template with unfilled fields: blank rental amounts, missing dates, missing party names, missing addresses, missing deposit amounts, placeholder text like "[INSERT HERE]", "______", or "TBD".

If unfilled fields are present:
→ Add a "warning" flag at the TOP of the flags array (before any other flags) with:
  - title: "Incomplete Template — Key Fields Are Blank"
  - description listing every detected blank field (e.g. "Rental amount, tenant name, start date, deposit amount are all blank")
  - action: "Do not sign this document. All blank fields must be filled in before it becomes enforceable. Confirm the final values in writing before signing."
→ Set confidence to "low" and reduce the riskScore — a blank template cannot be fully assessed.

## STEP 4 — JURISDICTION DETECTION
Always attempt to identify the jurisdiction based on legal terminology, currency symbols, court references, governing law clauses, and jurisdiction-specific legal concepts (e.g. "voetstoots" = South African law, "gazumping" = UK property, "at-will" = US employment).

Set the "state" field to: "<Country or State> — identified based on <specific indicators>" (e.g. "South Africa — identified based on voetstoots clause and Rental Housing Act reference").
If uncertain: "Unclear — analysis based on general contract principles".
Do not assume US jurisdiction by default.

## STEP 5 — ANALYSIS
Identify every clause that creates risk or requires attention for the SIGNING PARTY (tenant, employee, contractor, service provider, disclosing party, etc.).

### Flag types — be precise, not generous:
- **"critical"**: A clause with clear, specific financial or legal risk explicitly supported by the document text. Do not extrapolate.
- **"warning"**: A clause that is unfavorable or unusual but may be negotiable or situationally acceptable. State why.
- **"info"**: A clause worth knowing about — not necessarily risky, but important context for the signer.

### Quality rules — follow strictly:
1. Never invent risks that are not in the document. Only flag what the text explicitly says.
2. Distinguish clearly between standard/common clauses and genuinely unfavorable ones. If a clause is standard, say so — do not alarm unnecessarily.
3. Always reference the specific clause number (§X.X, Section X, Clause X, or "General" if unnumbered).
4. For each flag provide: what the clause says, why it matters for the signing party, and what to do about it.
5. If a clause is ambiguous, flag as "warning" and note the ambiguity explicitly.
6. Do not duplicate flags — one flag per distinct clause or issue.
7. Risk score must reflect reality: a blank template scores lower due to missing information; a clearly standard agreement scores lower than a one-sided one.
8. Do not assert jurisdiction-specific legal violations unless the jurisdiction is identified AND you are confident in that jurisdiction's law.

### Type-specific focus areas:

**LEASE** — Security deposit conditions and deduction rights, landlord entry notice requirements, maintenance and repair obligations (who pays for what), early termination penalties, automatic renewal windows, rent escalation clauses, subletting and assignment rights, habitability obligations.

**PURCHASE/SALE** — Contingency clauses (financing, inspection, appraisal — and what happens if they fail), earnest money forfeiture conditions, closing date flexibility and penalties for delay, as-is clauses and seller disclosure limitations, what's included/excluded from the sale, title and deed warranty type, buyer/seller default remedies, HOA or easement obligations transferring to buyer.

**EMPLOYMENT** — At-will vs. for-cause termination terms, non-compete scope (geography, duration, industry), IP assignment breadth (does it cover personal projects?), termination notice requirements, clawback provisions, equity vesting and forfeiture, mandatory arbitration and class action waivers.

**NDA** — Confidentiality scope (is it overbroad?), duration (perpetual terms are unusual), permitted disclosures and carve-outs, one-sided vs. mutual obligations, remedies clauses (injunctive relief, liquidated damages).

**FREELANCE** — IP ownership and work-for-hire language, kill fees and payment on termination, payment schedules and late payment terms, unlimited revision clauses, indemnification scope, client's right to terminate without cause.

**SERVICE** — Scope of work definition (vague scope = scope creep risk), auto-renewal notice windows, liability caps and indemnification, termination rights asymmetry, payment terms and escalation.

**NON-COMPETE** — Geographic scope, duration (courts view 2+ years skeptically), definition of "competing business" (too broad?), whether adequate consideration was provided, garden leave provisions.

**GENERIC** — Termination rights asymmetry, liability caps and indemnification, auto-renewal provisions, arbitration and dispute resolution clauses, hidden fees or penalty structures.

## STEP 5b — RISK SCORE CALIBRATION
Use these as guidelines when setting riskScore:

- Blank/incomplete template (unfilled fields): cap at 65 — missing data prevents full risk assessment
- Document with fewer than 5 identifiable clauses: cap at 50
- Standard residential lease, no unusual clauses: 20–35
- Lease or contract with 1–2 unfavorable but common clauses: 35–55
- Lease or contract with critical financial risk clauses (overbroad IP, non-refundable deposit, uncapped liability): 60–80
- Contract with multiple critical clauses or clauses that violate mandatory law: 75–95
- Do not assign 100 unless the document is clearly predatory, fraudulent, or contains multiple violations of mandatory law across several sections
- Standard NDAs and employment contracts with typical restrictions: 30–50
- Contracts with missing protective provisions (no kill fee, no deposit return deadline) but no explicit harmful clause: baseline + 5–10 points

## STEP 6 — OUTPUT FORMAT
Return ONLY valid JSON. No markdown. No preamble. No text outside the JSON object.

{
  "riskScore": <number 0-100; higher = riskier. Use -1 ONLY for quality failure.>,
  "state": "<jurisdiction — identified based on [specific indicators], or 'Unclear — analysis based on general contract principles'>",
  "leaseType": "<human-readable document type, e.g. 'Residential Lease', 'Employment Contract', 'NDA', 'Freelance Agreement'>",
  "documentCategory": "<one of: lease | purchase | employment | nda | freelance | service | non-compete | ip-assignment | generic>",
  "confidence": "<high | medium | low — your confidence given document quality and completeness>",
  "summary": "<one sentence: what this document is and its overall risk level for the signing party>",
  "missingInfo": "<incomplete template fields or ambiguities that affect the analysis. Empty string if none.>",
  "flags": [
    {
      "type": "<critical | warning | info>",
      "section": "<clause reference like '§4.2', 'Section 3', 'Clause 5', or 'General' if no numbering>",
      "title": "<short, specific title — max 8 words>",
      "description": "<plain-English explanation: what the clause says, why it matters, who it affects. Write for non-lawyers.>",
      "action": "<specific, concrete step the signing party should take. Not generic ('consult a lawyer') unless truly warranted. E.g.: 'Request that the notice period be changed to 24 hours written notice' or 'Ask for a carve-out for work created without company resources on personal time'.>"
    }
  ]
}

### Quality failure structure (use ONLY when Step 2 quality check fails):
{
  "riskScore": -1,
  "qualityFailureReason": "<not_a_contract | unreadable>",
  "state": "N/A",
  "leaseType": "Unknown",
  "documentCategory": "generic",
  "confidence": "low",
  "summary": "The document could not be analyzed.",
  "missingInfo": "<explain why>",
  "flags": []
}`;

// ─── Main analysis function ────────────────────────────────────────────────

export async function analyzeLease(
  extracted: ExtractResult
): Promise<LeaseAnalysisResult> {
  // Quality gate for text documents
  if (extracted.kind === 'text' && extracted.content.length < MIN_TEXT_CHARS) {
    console.warn('[anthropic] Text too short for analysis:', extracted.content.length, 'chars');
    return qualityFailureResult('The extracted text was too short to analyze. The document may be incomplete or the text could not be extracted properly.');
  }

  const messages = buildMessages(extracted);

  const response = await Promise.race([
    client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages,
    }),
    timeout(TIMEOUT_MS),
  ]);

  const raw = extractText(response);
  const parsed = safeParseJSON<LeaseAnalysisResult>(raw);

  if ('error' in parsed) {
    console.error('[anthropic] JSON parse error. Raw output:', raw.slice(0, 500));
    throw new Error('The AI returned an unreadable response. Please try again.');
  }

  return validateResult(parsed.data);
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function buildMessages(extracted: ExtractResult): Anthropic.MessageParam[] {
  if (extracted.kind === 'text') {
    // Truncate at 80k chars to stay well within Claude's context window
    const content = extracted.content.slice(0, 80_000);
    return [
      {
        role: 'user',
        content: `Please analyze the following contract document:\n\n${content}`,
      },
    ];
  }

  // Image path (vision) — for scanned documents
  const base64 = extracted.base64.replace(/^data:[^;]+;base64,/, '');
  const mediaType = extracted.mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

  return [
    {
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'base64', media_type: mediaType, data: base64 },
        },
        {
          type: 'text',
          text: 'Please analyze this contract document image. Identify all risks and clauses that require attention for the signing party.',
        },
      ],
    },
  ];
}

function extractText(response: Anthropic.Message): string {
  const block = response.content.find((b) => b.type === 'text');
  if (!block || block.type !== 'text') {
    throw new Error('No text content in Claude response.');
  }
  return block.text;
}

function validateResult(raw: Partial<LeaseAnalysisResult> & { qualityFailureReason?: string }): LeaseAnalysisResult {
  // Handle quality failure from the model (riskScore === -1)
  if (raw.riskScore === -1) {
    const reason = raw.qualityFailureReason === 'not_a_contract' ? 'not_a_contract' : 'unreadable';
    return qualityFailureResult(
      raw.missingInfo ?? 'The document could not be analyzed with sufficient confidence.',
      reason
    );
  }

  const validCategories: DocumentCategory[] = [
    'lease', 'purchase', 'employment', 'nda', 'freelance', 'service', 'non-compete', 'ip-assignment', 'generic',
  ];

  const result: LeaseAnalysisResult = {
    riskScore: typeof raw.riskScore === 'number' ? Math.min(100, Math.max(0, raw.riskScore)) : 50,
    state: typeof raw.state === 'string' && raw.state ? raw.state : 'Not specified',
    leaseType: typeof raw.leaseType === 'string' && raw.leaseType ? raw.leaseType : 'Contract',
    summary: typeof raw.summary === 'string' && raw.summary ? raw.summary : 'Analysis complete.',
    documentCategory: validCategories.includes(raw.documentCategory as DocumentCategory)
      ? raw.documentCategory as DocumentCategory
      : 'generic',
    confidence: ['high', 'medium', 'low'].includes(raw.confidence as string)
      ? raw.confidence as 'high' | 'medium' | 'low'
      : 'medium',
    missingInfo: typeof raw.missingInfo === 'string' ? raw.missingInfo : '',
    flags: Array.isArray(raw.flags)
      ? raw.flags
          .filter((f) => f && typeof f === 'object' && f.title)
          .map((f) => ({
            type: ['critical', 'warning', 'info'].includes(f.type) ? f.type : 'info',
            section: typeof f.section === 'string' && f.section ? f.section : 'General',
            title: typeof f.title === 'string' ? f.title.slice(0, 100) : 'Unknown Issue',
            description: typeof f.description === 'string' ? f.description : '',
            action: typeof f.action === 'string' ? f.action : '',
          }))
      : [],
  };

  return result;
}

function qualityFailureResult(
  missingInfo: string,
  reason: 'not_a_contract' | 'unreadable' = 'unreadable'
): LeaseAnalysisResult {
  return {
    riskScore: 0,
    qualityFailureReason: reason,
    state: 'N/A',
    leaseType: 'Unknown',
    documentCategory: 'generic',
    confidence: 'low',
    summary: 'The document could not be analyzed.',
    missingInfo,
    flags: [],
  };
}

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Analysis timed out. Please try again.')), ms)
  );
}
