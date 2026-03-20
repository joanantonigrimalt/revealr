import type { SupportedMimeType } from '@/types';

// ─── File validation ──────────────────────────────────────────────────────────

export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

export const ALLOWED_MIME_TYPES: SupportedMimeType[] = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
];

export const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];

export const MIME_EXTENSION_MAP: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

export type FileValidationResult =
  | { valid: true }
  | { valid: false; error: string };

export function validateFile(
  name: string,
  size: number,
  mimeType: string
): FileValidationResult {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';

  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `File type ".${ext}" is not supported. Please upload a PDF, DOC, DOCX, JPG, or PNG.`,
    };
  }

  if (!ALLOWED_MIME_TYPES.includes(mimeType as SupportedMimeType)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a valid lease document.',
    };
  }

  if (size > MAX_FILE_SIZE_BYTES) {
    const mb = (size / 1024 / 1024).toFixed(1);
    return {
      valid: false,
      error: `File is too large (${mb} MB). Maximum allowed size is 20 MB.`,
    };
  }

  return { valid: true };
}

// ─── Email validation ─────────────────────────────────────────────────────────

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ─── JSON parsing with cleanup ────────────────────────────────────────────────

export function safeParseJSON<T>(raw: string): { data: T } | { error: string } {
  // First attempt: direct parse
  try {
    return { data: JSON.parse(raw) as T };
  } catch {}

  // Second attempt: extract JSON object from surrounding text
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return { data: JSON.parse(jsonMatch[0]) as T };
    } catch {}
  }

  // Third attempt: strip markdown code fences
  const stripped = raw
    .replace(/^```(?:json)?\s*/m, '')
    .replace(/\s*```\s*$/m, '')
    .trim();
  try {
    return { data: JSON.parse(stripped) as T };
  } catch {}

  return { error: 'Could not parse JSON from Claude response.' };
}
