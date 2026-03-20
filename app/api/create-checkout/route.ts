import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICE_CENTS, CURRENCY, PRODUCT_NAME } from '@/lib/stripe';

export const runtime = 'nodejs';

// POST /api/create-checkout — creates Stripe session; analysis runs AFTER payment
export async function POST(req: NextRequest) {
  try {
    const { fileKey, email, fileName } = await req.json() as {
      fileKey: string;
      email: string;
      fileName: string;
    };

    if (!fileKey || !email || !fileName) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: PRODUCT_NAME,
              description: `Full lease analysis report for ${fileName}`,
            },
            unit_amount: PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      metadata: { fileKey, email, fileName },
      success_url: `${appUrl}/dashboard?unlocked=1&file=${encodeURIComponent(fileKey)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fileName)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard?cancelled=1&file=${encodeURIComponent(fileKey)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fileName)}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[create-checkout]', err);
    const msg = err instanceof Error ? err.message : 'Failed to create checkout session.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
