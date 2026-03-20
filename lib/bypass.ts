/**
 * Server-side bypass helper — NEVER import this from client components.
 *
 * Bypass is active when:
 *   - NODE_ENV !== 'production'  (local dev, always safe)
 *   OR
 *   - REVEALR_DEV_BYPASS=true   (explicit opt-in, e.g. staging / admin)
 *
 * Additionally, if DEV_BYPASS_EMAILS is set, ONLY those emails are bypassed.
 * If DEV_BYPASS_EMAILS is not set, any email is bypassed (local dev only).
 *
 * In Vercel Production without REVEALR_DEV_BYPASS this function always returns false.
 */
export function isBypassEnabled(email: string): boolean {
  const isDevEnv    = process.env.NODE_ENV !== 'production';
  const hasBypassFlag = process.env.REVEALR_DEV_BYPASS === 'true';

  // Hard gate: neither local dev nor explicit flag → no bypass ever
  if (!isDevEnv && !hasBypassFlag) return false;

  const rawList = process.env.DEV_BYPASS_EMAILS ?? '';
  const allowedEmails = rawList
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  // No whitelist → allow any email (only reachable in non-production anyway)
  if (allowedEmails.length === 0) return true;

  // Whitelist defined → must match
  return allowedEmails.includes(email.trim().toLowerCase());
}
