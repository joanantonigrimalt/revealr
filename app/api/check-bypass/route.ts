import { NextRequest, NextResponse } from 'next/server';
import { isBypassEnabled } from '@/lib/bypass';

export const runtime = 'nodejs';

/**
 * POST /api/check-bypass
 * Body: { email: string }
 *
 * Returns { bypassed: boolean } — never reveals the mechanism or config.
 * In production without REVEALR_DEV_BYPASS this always returns { bypassed: false }.
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json() as { email?: string };

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ bypassed: false });
    }

    const bypassed = isBypassEnabled(email);
    return NextResponse.json({ bypassed });
  } catch {
    // Never expose errors — just return false
    return NextResponse.json({ bypassed: false });
  }
}
