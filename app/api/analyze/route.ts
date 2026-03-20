import { NextRequest, NextResponse } from 'next/server';
import { getFile } from '@/lib/storage';
import { extractContent } from '@/lib/pdf';
import { analyzeLease } from '@/lib/anthropic';

export const runtime = 'nodejs';
export const maxDuration = 120;

// POST /api/analyze — runs analysis (no payment required, result returned to client)
export async function POST(req: NextRequest) {
  try {
    const { fileKey, fileName } = await req.json() as {
      fileKey: string;
      fileName: string;
    };

    if (!fileKey || !fileName) {
      return NextResponse.json({ error: 'Missing fileKey or fileName.' }, { status: 400 });
    }

    // Read file from storage
    let buffer: Buffer;
    try {
      buffer = await getFile(fileKey);
    } catch {
      return NextResponse.json(
        { error: 'Could not retrieve your document. The session may have expired — please upload again.' },
        { status: 404 }
      );
    }

    // Extract text / image
    const ext = fileName.split('.').pop()?.toLowerCase() ?? '';
    const mimeMap: Record<string, string> = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
    };
    const mimeType = mimeMap[ext] ?? 'application/pdf';

    let extracted;
    try {
      extracted = await extractContent(buffer, mimeType, fileName);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to read document.';
      return NextResponse.json({ error: msg }, { status: 422 });
    }

    // Run Claude analysis
    let result;
    try {
      result = await analyzeLease(extracted);
    } catch (err) {
      console.error('[analyze]', err);
      const msg = err instanceof Error ? err.message : 'AI analysis failed.';
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('[analyze]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
