import Anthropic from '@anthropic-ai/sdk';
import type { LeaseAnalysisResult } from '@/types';
import { safeParseJSON } from '@/lib/validators';
import type { ExtractResult } from './pdf';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY is not set');
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Model specified by the project requirements
const MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 4096;
const TIMEOUT_MS = 120_000; // 2 minutes

const SYSTEM_PROMPT = `You are an expert tenant rights attorney. Analyze this lease agreement and identify every clause that could harm the tenant.

For each issue found, return:
- type: "critical" | "warning" | "info"
- section: clause reference (e.g. "§4.2")
- title: short title
- description: plain-English explanation of the risk
- action: what the tenant should do

Also return:
- riskScore: number 0-100 (100 = extremely risky)
- state: detected US state if mentioned
- leaseType: type of lease detected
- summary: one sentence overview

Return ONLY valid JSON, no markdown, no preamble.
Schema:
{
  "riskScore": number,
  "state": string,
  "leaseType": string,
  "summary": string,
  "flags": [{ "type": string, "section": string, "title": string, "description": string, "action": string }]
}`;

// ─── Main analysis function ───────────────────────────────────────────────────

export async function analyzeLease(
  extracted: ExtractResult
): Promise<LeaseAnalysisResult> {
  const messages: Anthropic.MessageParam[] = buildMessages(extracted);

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildMessages(extracted: ExtractResult): Anthropic.MessageParam[] {
  if (extracted.kind === 'text') {
    return [
      {
        role: 'user',
        content: `Please analyze the following lease agreement:\n\n${extracted.content}`,
      },
    ];
  }

  // Image (vision)
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
          text: 'Please analyze this lease agreement image and identify all tenant risks.',
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

function validateResult(raw: Partial<LeaseAnalysisResult>): LeaseAnalysisResult {
  const result: LeaseAnalysisResult = {
    riskScore: typeof raw.riskScore === 'number' ? Math.min(100, Math.max(0, raw.riskScore)) : 50,
    state: typeof raw.state === 'string' ? raw.state : 'Unknown',
    leaseType: typeof raw.leaseType === 'string' ? raw.leaseType : 'Residential Lease',
    summary: typeof raw.summary === 'string' ? raw.summary : 'Analysis complete.',
    flags: Array.isArray(raw.flags)
      ? raw.flags
          .filter((f) => f && typeof f === 'object')
          .map((f) => ({
            type: ['critical', 'warning', 'info'].includes(f.type) ? f.type : 'info',
            section: typeof f.section === 'string' ? f.section : '§N/A',
            title: typeof f.title === 'string' ? f.title : 'Unknown Issue',
            description: typeof f.description === 'string' ? f.description : '',
            action: typeof f.action === 'string' ? f.action : '',
          }))
      : [],
  };

  return result;
}

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Claude API request timed out.')), ms)
  );
}
