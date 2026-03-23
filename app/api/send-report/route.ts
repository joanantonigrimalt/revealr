import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildEmailHTML, buildEmailText } from '@/lib/report';
import type { EmailReportPayload } from '@/types';

export const runtime = 'nodejs';

if (!process.env.RESEND_API_KEY) {
  console.warn('[send-report] RESEND_API_KEY is not set — emails will not be sent');
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = 'Revealr <reports@getrevealr.com>';
const REPLY_TO = 'support@getrevealr.com';

export async function POST(req: NextRequest) {
  try {
    const body: EmailReportPayload = await req.json();
    const { email, result, fileName, sessionId, fileKey } = body;

    if (!email || !result || !fileName) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!resend) {
      // Dev fallback: log but don't fail the request
      console.log('[send-report] Skipping email send (no RESEND_API_KEY). Would send to:', email);
      return NextResponse.json({ success: true, message: 'Email skipped in dev mode.' });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://getrevealr.com';

    const html = buildEmailHTML({ result, fileName, appUrl, sessionId, fileKey });
    const text = buildEmailText(result, fileName);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      reply_to: REPLY_TO,
      subject: 'Your Revealr Contract Analysis is Ready',
      html,
      text,
    });

    if (error) {
      console.error('[send-report] Resend error:', error);
      // Non-fatal: caller shows report on screen anyway
      return NextResponse.json(
        { error: 'We could not send your email. Your report is available here.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Report sent successfully.' });
  } catch (err) {
    console.error('[send-report]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
