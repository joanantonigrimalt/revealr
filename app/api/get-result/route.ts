import { NextRequest, NextResponse } from 'next/server';
import { getFile } from '@/lib/storage';

export const runtime = 'nodejs';

// GET /api/get-result?key=xxx — retrieves a stored analysis result
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key') ?? '';

  if (!key) {
    return NextResponse.json({ error: 'Missing key.' }, { status: 400 });
  }

  try {
    const buffer = await getFile(key);
    const parsed = JSON.parse(buffer.toString('utf-8'));
    return NextResponse.json(parsed);
  } catch (err) {
    console.error('[get-result]', err);
    return NextResponse.json({ error: 'Result not found or expired.' }, { status: 404 });
  }
}
