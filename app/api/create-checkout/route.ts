import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { saveFile } from '@/lib/storage';
import { validateFile } from '@/lib/validators';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get('file');
    const email = (formData.get('email') as string | null)?.trim() ?? '';

    // ── Validate inputs ──────────────────────────────────────────────────────

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const validation = validateFile(file.name, file.size, file.type);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // ── Save file to storage ────────────────────────────────────────────────

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileKey = await saveFile(buffer, file.name);

    // ── Create Stripe Checkout session ──────────────────────────────────────

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const session = await createCheckoutSession({
      email,
      fileKey,
      fileName: file.name,
      appUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[create-checkout]', err);
    const message = err instanceof Error ? err.message : 'Internal server error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
