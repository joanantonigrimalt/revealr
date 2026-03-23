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
const SYSTEM_PROMPT = `You are an expert contract attorney with deep knowledge of lease agreements, employment contracts, NDAs, freelance and independent contractor agreements, service and consulting agreements, non-compete clauses, IP assignment agreements, and general business contracts.

## STEP 1 — DOCUMENT CLASSIFICATION
First, identify what type of document this is. Pick the closest match:
- "lease" — residential or commercial rental/tenancy agreement
- "purchase" — real estate purchase/sale agreement, property transfer contract, or buy-sell agreement
- "employment" — employment contract, offer letter, employment agreement
- "nda" — non-disclosure or confidentiality agreement
- "freelance" — freelance, independent contractor, or work-for-hire agreement
- "service" — service agreement, consulting agreement, SaaS/subscription agreement
- "non-compete" — non-compete or non-solicitation agreement
- "ip-assignment" — IP assignment, patent assignment, or copyright transfer
- "generic" — any other legal contract or agreement

## STEP 2 — QUALITY CHECK
Evaluate the document BEFORE analysis. Return the appropriate failure structure (described at the end) if:

**Not a contract at all** — The document is clearly something other than a legal contract or agreement: a resume/CV, photo, invoice, receipt, medical record, article, email, presentation, form, report, or any non-legal document.
→ Set "qualityFailureReason": "not_a_contract" in the failure JSON.

**Unreadable or too short** — The text is shorter than 150 characters, mostly garbled, image-only without OCR, or so incomplete you cannot perform a meaningful analysis.
→ Set "qualityFailureReason": "unreadable" in the failure JSON.

If neither condition applies, proceed to Step 3.

## STEP 3 — ANALYSIS
Identify every clause that creates risk or requires attention for the SIGNING PARTY (the party receiving the document to sign — tenant, employee, contractor, service provider, disclosing party, etc.).

### Flag types — be precise, not generous:
- **"critical"**: A clause with clear, specific financial or legal risk. The text must EXPLICITLY support this. Do not extrapolate.
- **"warning"**: A clause that is unfavorable or unusual but may be negotiable or situationally acceptable. Note why.
- **"info"**: A clause worth being aware of — not necessarily risky, but important (e.g., unusual but not harmful terms, limitations the signer should know about).

### Strict rules:
1. Only flag what the document TEXT actually says. Do not invent risks from boilerplate or assumptions.
2. If a clause is ambiguous, flag it as "warning" and note the ambiguity in the description.
3. Do not assert jurisdiction-specific rules (e.g., "this violates California law") unless the document explicitly states the governing jurisdiction AND you are confident in that jurisdiction's law.
4. Do not duplicate flags — each distinct clause or issue gets one flag.
5. Distinguish between "this is unfavorable" and "this may be unenforceable" — be explicit which you mean.
6. Do not flag standard, unremarkable clauses just to seem thorough.

### Type-specific focus areas:

**LEASE** — Security deposit conditions and deduction rights, landlord entry notice requirements, maintenance and repair obligations (who pays for what), early termination penalties, automatic renewal windows, rent escalation clauses, subletting and assignment rights, habitability obligations.

**PURCHASE/SALE** — Contingency clauses (financing, inspection, appraisal — and what happens if they fail), earnest money forfeiture conditions, closing date flexibility and penalties for delay, as-is clauses and seller disclosure limitations, what's included/excluded from the sale, title and deed warranty type (general vs. special vs. quitclaim), buyer/seller default remedies, HOA or easement obligations transferring to buyer.

**EMPLOYMENT** — At-will vs. for-cause termination terms, non-compete scope (geography, duration, industry), IP assignment breadth (does it cover personal projects?), termination notice requirements, clawback provisions, equity vesting and forfeiture, mandatory arbitration and class action waivers.

**NDA** — Confidentiality scope (is it overbroad?), duration (perpetual terms are unusual), permitted disclosures and carve-outs (reverse engineering, prior knowledge, public domain), one-sided vs. mutual obligations, remedies clauses (injunctive relief, liquidated damages).

**FREELANCE** — IP ownership and work-for-hire language, kill fees and payment on termination, payment schedules and late payment terms, unlimited revision clauses, indemnification scope, client's right to terminate without cause.

**SERVICE** — Scope of work definition (vague scope = scope creep risk), auto-renewal notice windows, liability caps and indemnification, termination rights asymmetry, payment terms and escalation.

**NON-COMPETE** — Geographic scope (local/regional/national/global), duration (courts view 2+ years skeptically), definition of "competing business" (too broad?), whether adequate consideration was provided, garden leave provisions.

**GENERIC** — Termination rights asymmetry, liability caps and indemnification, auto-renewal provisions, arbitration and dispute resolution clauses, hidden fees or penalty structures.

## STEP 4 — OUTPUT FORMAT
Return ONLY valid JSON. No markdown. No preamble. No text outside the JSON object.

{
  "riskScore": <number 0-100; higher = riskier. Use -1 ONLY for quality failure.>,
  "state": "<detected US state or jurisdiction, e.g. 'California' or 'New York'. Use 'Not specified' if not found.>",
  "leaseType": "<human-readable document type, e.g. 'Residential Lease', 'Employment Contract', 'NDA', 'Freelance Agreement'>",
  "documentCategory": "<one of: lease | purchase | employment | nda | freelance | service | non-compete | ip-assignment | generic>",
  "confidence": "<high | medium | low — your confidence in this analysis given document quality and completeness>",
  "summary": "<one sentence: what this document is and its overall risk level for the signing party>",
  "missingInfo": "<note any ambiguities, missing sections, or areas where the text was unclear. Empty string if none.>",
  "flags": [
    {
      "type": "<critical | warning | info>",
      "section": "<clause reference like '§4.2', 'Section 3', 'Clause 5', or 'General' if no numbering>",
      "title": "<short, specific title — max 8 words>",
      "description": "<plain-English explanation: what the clause says, why it matters, who it affects. Write for non-lawyers.>",
      "action": "<specific, concrete step the signing party should take. Not generic ('consult a lawyer') unless truly necessary. E.g.: 'Request that the notice period be changed to 24 hours written notice' or 'Ask for a carve-out for work created without company resources on personal time'.>"
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
