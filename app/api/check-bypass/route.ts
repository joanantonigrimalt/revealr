import { NextRequest, NextResponse } from 'next/server';
import { isBypassEnabled } from '@/lib/bypass';

export const runtime = 'nodejs';

/**
 * GET /api/check-bypass
 *
 * Returns { bypassed: boolean } — never reveals the mechanism or config.
 * In production without REVEALR_DEV_BYPASS this always returns { bypassed: false }.
 */
export async function GET() {
  try {
    const bypassed = isBypassEnabled();
    return NextResponse.json({ bypassed });
  } catch {
    return NextResponse.json({ bypassed: false });
  }
}
