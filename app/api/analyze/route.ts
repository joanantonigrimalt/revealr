import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/stripe';
import { getFile, deleteFile } from '@/lib/storage';
import { extractContent } from '@/lib/pdf';
import { analyzeLease } from '@/lib/anthropic';

export const runtime = 'nodejs';
export const maxDuration = 120; // Claude can take up to 2 minutes

// ─── GET /api/analyze?session_id=&file=&step=verify ──────────────────────────
// Used by dashboard to verify payment and get email before POST analysis
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id') ?? '';
  const step = searchParams.get('step');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id.' }, { status: 400 });
  }

  try {
    const { paid, email } = await verifyPayment(sessionId);

    if (!paid) {
      return NextResponse.json(
        { error: 'Payment not completed. Please complete your purchase to access the report.' },
        { status: 402 }
      );
    }

    return NextResponse.json({ paid: true, email });
  } catch (err) {
    console.error('[analyze:GET]', err);
    return NextResponse.json({ error: 'Could not verify payment. Please try again.' }, { status: 500 });
  }
}

// ─── POST /api/analyze ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, fileKey, fileName } = body as {
      sessionId: string;
      fileKey: string;
      fileName: string;
    };

    if (!sessionId || !fileKey) {
      return NextResponse.json({ error: 'Missing sessionId or fileKey.' }, { status: 400 });
    }

    // ── Verify payment ────────────────────────────────────────────────────────
    const { paid, email } = await verifyPayment(sessionId);
    if (!paid) {
      return NextResponse.json(
        { error: 'Payment not verified. Please complete your purchase.' },
        { status: 402 }
      );
    }

    // ── Read file from storage ────────────────────────────────────────────────
    let buffer: Buffer;
    try {
      buffer = await getFile(fileKey);
    } catch (err) {
      console.error('[analyze:POST] getFile error:', err);
      return NextResponse.json(
        { error: 'Could not retrieve your document. The session may have expired. Please upload again.' },
        { status: 404 }
      );
    }

    // ── Extract text / image content ──────────────────────────────────────────
    // Determine MIME type from fileKey or fileName
    const name = fileName || fileKey;
    const ext = name.split('.').pop()?.toLowerCase() ?? '';
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
      extracted = await extractContent(buffer, mimeType, name);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to read document.';
      return NextResponse.json({ error: msg }, { status: 422 });
    }

    // ── Analyze with Claude ───────────────────────────────────────────────────
    let analysisResult;
    try {
      analysisResult = await analyzeLease(extracted);
    } catch (err) {
      console.error('[analyze:POST] Claude error:', err);
      const msg = err instanceof Error ? err.message : 'AI analysis failed.';
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    // ── Clean up file (best-effort) ──────────────────────────────────────────
    deleteFile(fileKey).catch((e) => console.warn('[analyze:POST] cleanup failed:', e));

    return NextResponse.json(analysisResult);
  } catch (err) {
    console.error('[analyze:POST]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
