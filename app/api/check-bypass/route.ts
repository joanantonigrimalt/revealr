import { NextResponse } from 'next/server';
import { isBypassEnabled } from '@/lib/bypass';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // must read env vars at request time, not build time

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
