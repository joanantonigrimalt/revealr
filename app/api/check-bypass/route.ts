import { NextRequest, NextResponse } from 'next/server';
import { checkBypass } from '@/lib/bypass';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // must read env vars at request time, not build time

/**
 * GET /api/check-bypass?email=user@example.com
 *
 * Returns { bypassed: boolean } — never reveals the mechanism or the allowlist.
 *
 * Email param is optional. When provided:
 *   - Checked against REVEALR_ADMIN_EMAILS env var (comma-separated list)
 *   - If matched, full analysis unlocked without Stripe
 *   - Bypass usage is logged server-side for auditability
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email') ?? undefined;

    const { bypassed, reason } = checkBypass(email);

    // Server-side audit log for admin email bypass
    if (bypassed && reason === 'admin-email') {
      console.log(`[bypass] Admin email bypass used — email: ${email} — ${new Date().toISOString()}`);
    } else if (bypassed && reason === 'admin-flag') {
      console.log(`[bypass] Admin flag bypass active — ${new Date().toISOString()}`);
    }

    return NextResponse.json({ bypassed });
  } catch {
    return NextResponse.json({ bypassed: false });
  }
}
