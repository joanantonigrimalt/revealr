import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  typescript: true,
});

export const PRICE_CENTS = 1900; // $19.00
export const CURRENCY = 'usd';
export const PRODUCT_NAME = 'Contract Analysis Report — Revealr';

// ─── Create checkout session ──────────────────────────────────────────────────

export async function createCheckoutSession(params: {
  email: string;
  fileKey: string;
  fileName: string;
  appUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const { email, fileKey, fileName, appUrl } = params;

  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: PRODUCT_NAME,
            description: `AI-powered contract analysis for ${fileName}`,
          },
          unit_amount: PRICE_CENTS,
        },
        quantity: 1,
      },
    ],
    metadata: {
      email,
      fileKey,
      fileName,
    },
    success_url: `${appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}&file=${encodeURIComponent(fileKey)}&name=${encodeURIComponent(fileName)}`,
    cancel_url: `${appUrl}/?cancelled=1`,
  });
}

// ─── Verify payment ───────────────────────────────────────────────────────────

export async function verifyPayment(sessionId: string): Promise<{
  paid: boolean;
  email: string;
  fileKey: string;
  fileName: string;
}> {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const paid = session.payment_status === 'paid';
  const email = (session.metadata?.email ?? session.customer_email ?? '');
  const fileKey = session.metadata?.fileKey ?? '';
  const fileName = session.metadata?.fileName ?? 'lease.pdf';

  return { paid, email, fileKey, fileName };
}
