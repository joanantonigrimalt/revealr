/**
 * Server-side bypass helper — NEVER import this from client components.
 *
 * Two bypass mechanisms:
 *
 * 1. Global dev bypass — active when:
 *    - NODE_ENV !== 'production'  (local dev — always safe)
 *    - OR REVEALR_DEV_BYPASS=true (explicit admin flag in Vercel env)
 *
 * 2. Admin email bypass — active when the supplied email is listed in:
 *    REVEALR_ADMIN_EMAILS=email1@example.com,email2@example.com
 *    (comma-separated, set as Vercel env var — never commit to code)
 *
 * Both are server-only. The client only ever sees { bypassed: boolean }.
 */

export type BypassReason = 'dev-env' | 'admin-flag' | 'admin-email' | 'none';

export interface BypassResult {
  bypassed: boolean;
  reason: BypassReason;
}

/** Global bypass — active in dev or when REVEALR_DEV_BYPASS=true */
function isGlobalBypassEnabled(): boolean {
  return (
    process.env.NODE_ENV !== 'production' ||
    process.env.REVEALR_DEV_BYPASS === 'true'
  );
}

/** Email-specific bypass — checks REVEALR_ADMIN_EMAILS env var */
function isEmailInAdminList(email: string): boolean {
  const allowlist = process.env.REVEALR_ADMIN_EMAILS ?? '';
  if (!allowlist.trim() || !email.trim()) return false;
  const emails = allowlist
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return emails.includes(email.trim().toLowerCase());
}

/**
 * Main bypass check.
 * Pass the user's email (if known) to enable email-specific bypass.
 */
export function checkBypass(email?: string): BypassResult {
  // Dev environment always bypasses
  if (process.env.NODE_ENV !== 'production') {
    return { bypassed: true, reason: 'dev-env' };
  }

  // Explicit admin flag
  if (process.env.REVEALR_DEV_BYPASS === 'true') {
    return { bypassed: true, reason: 'admin-flag' };
  }

  // Email allowlist check
  if (email && isEmailInAdminList(email)) {
    return { bypassed: true, reason: 'admin-email' };
  }

  return { bypassed: false, reason: 'none' };
}

/** Legacy helper — kept for backward compat with existing usages */
export function isBypassEnabled(): boolean {
  return isGlobalBypassEnabled();
}
