import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICE_CENTS, CURRENCY, PRODUCT_NAME } from '@/lib/stripe';

export const runtime = 'nodejs';

/**
 * POST /api/create-checkout
 * 
 * Creates a Stripe Checkout session.
 * 
 * On success, redirects to /success (NOT /dashboard) where:
 * 1. Session ID is validated with Stripe
 * 2. Payment status is confirmed
 * 3. Google Ads conversion is tracked ONLY if payment is confirmed
 * 4. User is redirected to /dashboard to start analysis
 * 
 * This separation ensures Google Ads conversion tracking is triggered
 * ONLY after server-side validation of successful payment.
 */
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
              description: `Full contract analysis report for ${fileName}`,
            },
            unit_amount: PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      metadata: { fileKey, email, fileName },
      // ── Redirect to /success for validation (not /dashboard) ────────────────────
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&file=${encodeURIComponent(fileKey)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fileName)}`,
      cancel_url: `${appUrl}/dashboard?cancelled=1&file=${encodeURIComponent(fileKey)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fileName)}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[create-checkout]', err);
    const msg = err instanceof Error ? err.message : 'Failed to create checkout session.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

