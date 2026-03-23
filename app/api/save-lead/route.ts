import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://getrevealr.com';
const FROM_EMAIL = 'Revealr <reports@getrevealr.com>';

// POST /api/save-lead
// Body: { email, fileKey, fileName }
// Sends immediate email + schedules 24h and 72h reminders via Resend
export async function POST(req: NextRequest) {
  try {
    const { email, fileKey, fileName, flagCount, riskScore } = await req.json() as {
      email: string;
      fileKey: string;
      fileName: string;
      flagCount?: number;
      riskScore?: number;
    };

    if (!email || !fileKey || !fileName) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Build checkout URL — we create it server-side so the email has a direct link
    const checkoutUrl = `${APP_URL}/dashboard?file=${encodeURIComponent(fileKey)}&name=${encodeURIComponent(fileName)}`;

    if (!resend) {
      console.log('[save-lead] RESEND_API_KEY not set. Would send lead email to:', email);
      return NextResponse.json({ success: true });
    }

    const immediateSubject = flagCount
      ? `Your contract has ${flagCount} issue${flagCount > 1 ? 's' : ''} flagged — unlock your full report`
      : 'Your contract analysis is waiting';

    const reminder24hSubject = flagCount
      ? `Your contract has ${flagCount} issues flagged — unlock your full report`
      : 'Still thinking? Your contract analysis is ready';

    // ── 1. Immediate email ────────────────────────────────────────────────────
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: immediateSubject,
      html: buildLeadEmail({ fileName, checkoutUrl, variant: 'immediate', flagCount, riskScore }),
    });

    // ── 2. 24h reminder ───────────────────────────────────────────────────────
    const in24h = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: reminder24hSubject,
      html: buildLeadEmail({ fileName, checkoutUrl, variant: 'reminder_24h', flagCount, riskScore }),
      scheduledAt: in24h,
    } as Parameters<typeof resend.emails.send>[0]);

    // ── 3. 72h final email ────────────────────────────────────────────────────
    const in72h = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: 'Your analysis expires soon',
      html: buildLeadEmail({ fileName, checkoutUrl, variant: 'expiry_72h' }),
      scheduledAt: in72h,
    } as Parameters<typeof resend.emails.send>[0]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[save-lead]', err);
    // Non-fatal: don't break the UX
    return NextResponse.json({ success: true });
  }
}

// ─── Email templates ──────────────────────────────────────────────────────────

function buildLeadEmail(params: {
  fileName: string;
  checkoutUrl: string;
  variant: 'immediate' | 'reminder_24h' | 'expiry_72h';
  flagCount?: number;
  riskScore?: number;
}): string {
  const { fileName, checkoutUrl, variant, flagCount, riskScore } = params;

  const flagLine = flagCount
    ? `We found <strong>${flagCount} issue${flagCount > 1 ? 's' : ''}</strong>${riskScore !== undefined ? ` (Risk Score: ${riskScore}/100)` : ''} in <strong>${fileName}</strong> that you should review before signing.`
    : `We've analyzed <strong>${fileName}</strong> and found potential issues you should know about before signing.`;

  const copy = {
    immediate: {
      headline: 'Your contract analysis is ready.',
      body: flagLine,
      subtext: 'Your analysis is ready. Unlock it for $19.',
      cta: 'Unlock Full Report — $19',
    },
    reminder_24h: {
      headline: flagCount ? `${flagCount} issue${flagCount > 1 ? 's' : ''} found — still thinking?` : 'Still thinking about that contract?',
      body: flagCount
        ? `Your AI analysis of <strong>${fileName}</strong> flagged ${flagCount} issue${flagCount > 1 ? 's' : ''} you should know about. Risk score, full action plan, and clause-level flags — all waiting for you.`
        : `Your AI analysis of <strong>${fileName}</strong> is still waiting. Risk score, flagged clauses, and a full action plan — all ready for you.`,
      subtext: 'Your analysis is ready. Unlock it for $19.',
      cta: 'Unlock My Analysis — $19',
    },
    expiry_72h: {
      headline: 'Your analysis expires soon.',
      body: `Your contract analysis for <strong>${fileName}</strong> will no longer be available shortly. Don't sign without reviewing it first.`,
      subtext: 'One-time payment. No subscription. Instant access.',
      cta: 'Unlock Before It Expires — $19',
    },
  }[variant];

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1a1814;">
  <div style="max-width:540px;margin:0 auto;padding:40px 24px;">
    <div style="font-size:20px;font-weight:700;color:#1a1814;margin-bottom:32px;">
      reveal<span style="color:#e8572a;">r</span>
    </div>
    <h1 style="font-size:24px;font-weight:700;color:#1a1814;margin:0 0 16px;line-height:1.3;">${copy.headline}</h1>
    <p style="font-size:15px;color:#6b6560;line-height:1.6;margin:0 0 24px;">${copy.body}</p>
    <p style="font-size:14px;color:#9c9590;margin:0 0 28px;">${copy.subtext}</p>
    <a href="${checkoutUrl}"
       style="display:inline-block;background:#e8572a;color:#fff;padding:14px 32px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;letter-spacing:-0.01em;">
      ${copy.cta}
    </a>
    <div style="margin-top:40px;padding-top:24px;border-top:1px solid #e8e4df;color:#9c9590;font-size:12px;line-height:1.6;">
      <p style="margin:0;">This analysis was generated by AI. It is for informational purposes only and does not constitute legal advice.</p>
      <p style="margin:8px 0 0;">© ${new Date().getFullYear()} Revealr · <a href="${APP_URL}" style="color:#9c9590;">getrevealr.com</a></p>
    </div>
  </div>
</body>
</html>`;
}
