/**
 * Server-side bypass helper — NEVER import this from client components.
 *
 * Bypass is active when:
 *   - NODE_ENV !== 'production'  (local dev — always safe, never on Vercel)
 *   OR
 *   - REVEALR_DEV_BYPASS=true   (explicit admin opt-in)
 *
 * The flag itself is the security gate. Knowing it exists and having access to
 * set it on Vercel is already admin-only. No email check needed.
 *
 * In Vercel Production without REVEALR_DEV_BYPASS this always returns false.
 */
export function isBypassEnabled(): boolean {
  const isDevEnv      = process.env.NODE_ENV !== 'production';
  const hasBypassFlag = process.env.REVEALR_DEV_BYPASS === 'true';
  return isDevEnv || hasBypassFlag;
}
