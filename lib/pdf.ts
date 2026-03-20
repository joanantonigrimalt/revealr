// File text extraction for different formats

// ─── PDF ─────────────────────────────────────────────────────────────────────

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Dynamic import keeps this server-only
  const pdfParse = (await import('pdf-parse')).default;
  const result = await pdfParse(buffer);
  if (!result.text || result.text.trim().length < 50) {
    throw new Error('Could not extract readable text from the PDF. The file may be scanned or image-based.');
  }
  return result.text.trim();
}

// ─── DOCX ─────────────────────────────────────────────────────────────────────

export async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  const mammoth = await import('mammoth');
  const result = await mammoth.extractRawText({ buffer });
  if (!result.value || result.value.trim().length < 50) {
    throw new Error('Could not extract text from the Word document.');
  }
  return result.value.trim();
}

// ─── Image (base64 for Claude vision) ────────────────────────────────────────

export function imageToBase64(buffer: Buffer, mimeType: string): string {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

export type ExtractResult =
  | { kind: 'text'; content: string }
  | { kind: 'image'; base64: string; mimeType: string };

export async function extractContent(
  buffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<ExtractResult> {
  const ext = fileName.split('.').pop()?.toLowerCase() ?? '';

  if (mimeType === 'application/pdf' || ext === 'pdf') {
    const text = await extractTextFromPDF(buffer);
    return { kind: 'text', content: text };
  }

  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    ext === 'docx'
  ) {
    const text = await extractTextFromDOCX(buffer);
    return { kind: 'text', content: text };
  }

  if (mimeType === 'application/msword' || ext === 'doc') {
    // mammoth can handle some older .doc files
    try {
      const text = await extractTextFromDOCX(buffer);
      return { kind: 'text', content: text };
    } catch {
      throw new Error(
        'Legacy .doc files are not supported. Please convert to .docx or PDF and re-upload.'
      );
    }
  }

  if (mimeType === 'image/jpeg' || mimeType === 'image/png' || ['jpg', 'jpeg', 'png'].includes(ext)) {
    const base64 = imageToBase64(buffer, mimeType);
    return { kind: 'image', base64, mimeType };
  }

  throw new Error(`Unsupported file type: ${mimeType}`);
}
