import { NextRequest, NextResponse } from 'next/server';
import { saveFile } from '@/lib/storage';
import type { LeaseAnalysisResult } from '@/types';

export const runtime = 'nodejs';

// POST /api/save-result — persists analysis result so it survives the Stripe redirect
export async function POST(req: NextRequest) {
  try {
    const { result, fileName } = await req.json() as {
      result: LeaseAnalysisResult;
      fileName: string;
    };

    if (!result || !fileName) {
      return NextResponse.json({ error: 'Missing result or fileName.' }, { status: 400 });
    }

    const json = JSON.stringify({ result, fileName, savedAt: new Date().toISOString() });
    const buffer = Buffer.from(json, 'utf-8');
    const resultKey = await saveFile(buffer, `result-${Date.now()}.json`);

    return NextResponse.json({ resultKey });
  } catch (err) {
    console.error('[save-result]', err);
    return NextResponse.json({ error: 'Failed to save result.' }, { status: 500 });
  }
}
